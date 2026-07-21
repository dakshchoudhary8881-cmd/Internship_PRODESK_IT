// ============================================
// routes/authorRoutes.js — Author Analytics Route
// ============================================
// Mounts at /api/authors — provides top authors
// ranked by post count and total likes.
// ============================================

const express = require("express");
const router = express.Router();
const { getTopAuthors } = require("../controllers/postController");

// ============================================
// GET /api/authors/top — Top 5 authors by post count
// ============================================
router.get("/top", getTopAuthors);

module.exports = router;
