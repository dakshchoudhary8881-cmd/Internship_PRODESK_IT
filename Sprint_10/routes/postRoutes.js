// ============================================
// routes/postRoutes.js — Post API Routes
// ============================================
// Maps HTTP verbs + paths to post controller handlers.
// Applies ObjectId validation middleware on :id routes
// and express-validator chains on create/update routes.
// ============================================

const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const validateObjectId = require("../middleware/validateObjectId");
const { validateCreatePost, validateUpdatePost } = require("../validators/postValidator");

// ============================================
// Recent posts (must be ABOVE /:id to avoid collision)
// ============================================
router.get("/recent", postController.getRecentPosts);

// ============================================
// Core CRUD
// ============================================
router
  .route("/")
  .get(postController.getAllPosts)
  .post(validateCreatePost, postController.createPost);

router
  .route("/:id")
  .get(validateObjectId, postController.getPostById)
  .put(validateObjectId, validateUpdatePost, postController.updatePost)
  .delete(validateObjectId, postController.deletePost);

// ============================================
// Bonus: Restore soft-deleted post
// ============================================
router.put("/:id/restore", validateObjectId, postController.restorePost);

// ============================================
// Bonus: Like a post (PATCH per Sprint 10 spec)
// ============================================
router.patch("/:id/like", validateObjectId, postController.likePost);

module.exports = router;
