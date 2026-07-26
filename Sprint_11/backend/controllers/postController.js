const Post = require("../models/Post");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching posts", error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, description, author } = req.body;
    let imageUrl = "";

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    if (!title || !description || !author) {
      return res.status(400).json({ message: "Title, description, and author are required" });
    }

    const newPost = await Post.create({
      title,
      description,
      author,
      imageUrl
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating post", error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", post: deletedPost });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting post", error: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  deletePost
};
