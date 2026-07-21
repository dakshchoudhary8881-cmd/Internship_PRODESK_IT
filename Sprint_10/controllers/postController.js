// ============================================
// controllers/postController.js — Post CRUD + Bonus Routes
// ============================================
// Handles all business logic for the Post resource:
//   • CRUD (Create, Read, Update, Delete)
//   • Recent posts, soft delete / restore
//   • Like counter, statistics
//   • Top categories, search
// Uses asyncHandler so every function can be plain async/await
// without explicit try/catch blocks.
// ============================================

const Post = require("../models/Post");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const ApiFeatures = require("../utils/ApiFeatures");

// ============================================
// @desc    Create a new post
// @route   POST /api/posts
// @access  Public
// ============================================
const createPost = asyncHandler(async (req, res) => {
  const { title, content, category, tags, image, authorId, likes } = req.body;

  // Verify the author exists
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

  // Populate author info before returning
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

// ============================================
// @desc    Get all posts (with filter, search, sort, paginate)
// @route   GET /api/posts
// @access  Public
// ============================================
const getAllPosts = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(
    Post.find().populate("authorId", "name email avatar"),
    req.query
  )
    .filter()
    .search()
    .sort();

  // Paginate is async because it counts documents
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

// ============================================
// @desc    Get a single post by ID
// @route   GET /api/posts/:id
// @access  Public
// ============================================
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

// ============================================
// @desc    Update a post by ID
// @route   PUT /api/posts/:id
// @access  Public
// ============================================
const updatePost = asyncHandler(async (req, res) => {
  let post = await Post.findOne({ _id: req.params.id, isDeleted: false });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${req.params.id} not found.`,
    });
  }

  // If authorId is being changed, verify the new author exists
  if (req.body.authorId) {
    const authorExists = await User.findById(req.body.authorId);
    if (!authorExists) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${req.body.authorId} not found.`,
      });
    }
  }

  // Apply updates to the document and save (triggers pre-save hooks)
  const allowedFields = ["title", "content", "category", "tags", "image", "authorId", "likes"];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      post[field] = req.body[field];
    }
  });

  await post.save();

  // Re-fetch with populated author
  post = await Post.findById(post._id).populate("authorId", "name email avatar");

  return res.status(200).json({
    success: true,
    message: "Post updated successfully.",
    data: post,
  });
});

// ============================================
// @desc    Delete a post (soft delete)
// @route   DELETE /api/posts/:id
// @access  Public
// ============================================
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id, isDeleted: false });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${req.params.id} not found.`,
    });
  }

  // Soft delete — mark as deleted instead of removing from DB
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

// ============================================
// @desc    Restore a soft-deleted post
// @route   PUT /api/posts/:id/restore
// @access  Public
// ============================================
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

// ============================================
// @desc    Get recent posts (latest 3)
// @route   GET /api/posts/recent
// @access  Public
// ============================================
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

// ============================================
// @desc    Like a post (increment like counter)
// @route   PATCH /api/posts/:id/like
// @access  Public
// ============================================
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

// ============================================
// @desc    Get database statistics (posts, users, categories, likes)
// @route   GET /api/stats
// @access  Public
// ============================================
const getStats = asyncHandler(async (req, res) => {
  const totalPosts = await Post.countDocuments({ isDeleted: false });
  const deletedPosts = await Post.countDocuments({ isDeleted: true });
  const totalUsers = await User.countDocuments();

  // Count unique categories
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

// ============================================
// @desc    Get top categories (by post count)
// @route   GET /api/categories/top
// @access  Public
// ============================================
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

// ============================================
// @desc    Get top authors (by post count)
// @route   GET /api/authors/top
// @access  Public
// ============================================
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
