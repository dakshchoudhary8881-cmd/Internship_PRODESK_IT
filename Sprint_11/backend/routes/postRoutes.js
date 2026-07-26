const express = require("express");
const router = express.Router();
const { getPosts, createPost, deletePost } = require("../controllers/postController");
const upload = require("../middleware/uploadMiddleware");

router.get("/", getPosts);
router.post("/", upload.single("image"), createPost);
router.delete("/:id", deletePost);

module.exports = router;
