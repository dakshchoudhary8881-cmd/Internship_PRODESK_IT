const blogModel = require("../models/blogModel");

const getAll = async (req, res, next) => {
  try {
    const blogs = blogModel.getAllBlogs();
    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID. ID must be a number.",
      });
    }

    const blog = blogModel.getBlogById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: title, content, author.",
      });
    }

    const newBlog = blogModel.createBlog({ title, content, author });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      data: newBlog,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID. ID must be a number.",
      });
    }

    const { title, content, author } = req.body;

    if (!title && !content && !author) {
      return res.status(400).json({
        success: false,
        message:
          "At least one field is required to update: title, content, or author.",
      });
    }

    const updatedBlog = blogModel.updateBlog(id, { title, content, author });

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: `Blog with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
      data: updatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID. ID must be a number.",
      });
    }

    const deletedBlog = blogModel.deleteBlog(id);

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: `Blog with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
      data: deletedBlog,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
