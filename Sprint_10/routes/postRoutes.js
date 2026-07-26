const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const validateObjectId = require("../middleware/validateObjectId");
const { validateCreatePost, validateUpdatePost } = require("../validators/postValidator");

router.get("/recent", postController.getRecentPosts);

router
  .route("/")
  .get(postController.getAllPosts)
  .post(validateCreatePost, postController.createPost);

router
  .route("/:id")
  .get(validateObjectId, postController.getPostById)
  .put(validateObjectId, validateUpdatePost, postController.updatePost)
  .delete(validateObjectId, postController.deletePost);

router.put("/:id/restore", validateObjectId, postController.restorePost);

router.patch("/:id/like", validateObjectId, postController.likePost);

module.exports = router;
