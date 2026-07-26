const Post = require("../models/Post");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const ApiFeatures = require("../utils/ApiFeatures");

const createPost = asyncHandler(async (req, res) => {
  const { title, content, category, tags, image, authorId, likes } = req.body;

  const authorExists = await User.findById(authorId);
  if (!authorExists) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${authorId} not found. Cannot create post without a valid author.`,
    });
  }

  const post = await Post.create({
    title,
    content,
    category,
    tags: tags || [],
    image: image || "",
    authorId,
    likes: likes || 0,
  });

  const populatedPost = await Post.findById(post._id).populate(
    "authorId",
    "name email avatar"
  );

  return res.status(201).json({
    success: true,
    message: "Post created successfully.",
    data: populatedPost,
  });
});

const getAllPosts = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(
    Post.find().populate("authorId", "name email avatar"),
    req.query
  )
    .filter()
    .search()
    .sort();

  await features.paginate();

  const posts = await features.query;

  return res.status(200).json({
    success: true,
    message: "Posts retrieved successfully.",
    count: posts.length,
    pagination: features.pagination,
    data: posts,
  });
});

const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    _id: req.params.id,
    isDeleted: false,
  }).populate("authorId", "name email avatar");

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${req.params.id} not found.`,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Post retrieved successfully.",
    data: post,
  });
});

const updatePost = asyncHandler(async (req, res) => {
  let post = await Post.findOne({ _id: req.params.id, isDeleted: false });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${req.params.id} not found.`,
    });
  }

  if (req.body.authorId) {
    const authorExists = await User.findById(req.body.authorId);
    if (!authorExists) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${req.body.authorId} not found.`,
      });
    }
  }

  const allowedFields = ["title", "content", "category", "tags", "image", "authorId", "likes"];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      post[field] = req.body[field];
    }
  });

  await post.save();

  post = await Post.findById(post._id).populate("authorId", "name email avatar");

  return res.status(200).json({
    success: true,
    message: "Post updated successfully.",
    data: post,
  });
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id, isDeleted: false });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${req.params.id} not found.`,
    });
  }

  post.isDeleted = true;
  post.deletedAt = new Date();
  await post.save();

  return res.status(200).json({
    success: true,
    message: "Post deleted successfully (soft delete).",
    data: {
      id: post._id,
      title: post.title,
      deletedAt: post.deletedAt,
    },
  });
});

const restorePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id, isDeleted: true });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Deleted post with ID ${req.params.id} not found.`,
    });
  }

  post.isDeleted = false;
  post.deletedAt = null;
  await post.save();

  const restoredPost = await Post.findById(post._id).populate(
    "authorId",
    "name email avatar"
  );

  return res.status(200).json({
    success: true,
    message: "Post restored successfully.",
    data: restoredPost,
  });
});

const getRecentPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("authorId", "name email avatar");

  return res.status(200).json({
    success: true,
    message: "Recent posts retrieved successfully.",
    count: posts.length,
    data: posts,
  });
});

const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, isDeleted: false },
    { $inc: { likes: 1 } },
    { new: true }
  ).populate("authorId", "name email avatar");

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${req.params.id} not found.`,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Post liked successfully.",
    data: post,
  });
});

const getStats = asyncHandler(async (req, res) => {
  const totalPosts = await Post.countDocuments({ isDeleted: false });
  const deletedPosts = await Post.countDocuments({ isDeleted: true });
  const totalUsers = await User.countDocuments();

  const uniqueCategories = await Post.distinct("category", { isDeleted: false });
  const totalCategories = uniqueCategories.length;

  const totalLikes = await Post.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: null, total: { $sum: "$likes" } } },
  ]);
  const avgReadingTime = await Post.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: null, avg: { $avg: "$readingTime" } } },
  ]);

  return res.status(200).json({
    success: true,
    message: "Database statistics retrieved successfully.",
    data: {
      totalPosts,
      totalUsers,
      totalCategories,
      totalLikes: totalLikes.length > 0 ? totalLikes[0].total : 0,
      deletedPosts,
      averageReadingTime: avgReadingTime.length > 0 ? Math.round(avgReadingTime[0].avg * 10) / 10 : 0,
    },
  });
});

const getTopCategories = asyncHandler(async (req, res) => {
  const categories = await Post.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    { $project: { _id: 0, category: "$_id", count: 1 } },
  ]);

  return res.status(200).json({
    success: true,
    message: "Top categories retrieved successfully.",
    data: categories,
  });
});

const getTopAuthors = asyncHandler(async (req, res) => {
  const authors = await Post.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: "$authorId", postCount: { $sum: 1 }, totalLikes: { $sum: "$likes" } } },
    { $sort: { postCount: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "author",
      },
    },
    { $unwind: "$author" },
    {
      $project: {
        _id: 0,
        authorId: "$_id",
        name: "$author.name",
        email: "$author.email",
        avatar: "$author.avatar",
        postCount: 1,
        totalLikes: 1,
      },
    },
  ]);

  return res.status(200).json({
    success: true,
    message: "Top authors retrieved successfully.",
    data: authors,
  });
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  restorePost,
  getRecentPosts,
  likePost,
  getStats,
  getTopCategories,
  getTopAuthors,
};
