// ============================================
// routes/categoryRoutes.js — Category Analytics Route
// ============================================
// Mounts at /api/categories — provides top categories
// ranked by post count across the database.
// ============================================

const express = require("express");
const router = express.Router();
const { getTopCategories } = require("../controllers/postController");

// ============================================
// GET /api/categories/top — Top 5 categories by post count
// ============================================
router.get("/top", getTopCategories);

module.exports = router;
