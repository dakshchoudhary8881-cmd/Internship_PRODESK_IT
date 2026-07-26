const User = require("../models/User");
const Post = require("../models/Post");
const asyncHandler = require("../middleware/asyncHandler");

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, avatar, role } = req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: `A user with the email "${email}" already exists.`,
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: avatar || undefined,
    role: role || undefined,
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  return res.status(201).json({
    success: true,
    message: "User created successfully.",
    data: userResponse,
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit, 10) || 10));
  const skip = (page - 1) * limit;

  const totalDocuments = await User.countDocuments();
  const totalPages = Math.ceil(totalDocuments / limit);

  const users = await User.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    success: true,
    message: "Users retrieved successfully.",
    count: users.length,
    pagination: {
      currentPage: page,
      totalPages,
      totalDocuments,
      resultsPerPage: limit,
    },
    data: users,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("posts");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${req.params.id} not found.`,
    });
  }

  return res.status(200).json({
    success: true,
    message: "User retrieved successfully.",
    data: user,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${req.params.id} not found.`,
    });
  }

  if (req.body.email && req.body.email.toLowerCase() !== user.email) {
    const emailTaken = await User.findOne({ email: req.body.email.toLowerCase() });
    if (emailTaken) {
      return res.status(409).json({
        success: false,
        message: `A user with the email "${req.body.email}" already exists.`,
      });
    }
  }

  const allowedFields = ["name", "email", "password", "avatar", "role"];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });

  await user.save();

  const userResponse = user.toObject();
  delete userResponse.password;

  return res.status(200).json({
    success: true,
    message: "User updated successfully.",
    data: userResponse,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${req.params.id} not found.`,
    });
  }

  const postCount = await Post.countDocuments({ authorId: req.params.id, isDeleted: false });
  if (postCount > 0) {
    return res.status(400).json({
      success: false,
      message: `Cannot delete user. They still have ${postCount} active post(s). Delete or reassign their posts first.`,
    });
  }

  await User.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    message: "User deleted successfully.",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
