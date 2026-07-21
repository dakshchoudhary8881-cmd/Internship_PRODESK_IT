// ============================================
// routes/statsRoutes.js — Database Statistics Route
// ============================================
// Mounts at /api/stats — provides aggregate statistics
// across the entire database (posts, users, categories, likes).
// ============================================

const express = require("express");
const router = express.Router();
const { getStats } = require("../controllers/postController");

// ============================================
// GET /api/stats — Database-wide statistics
// ============================================
router.get("/", getStats);

module.exports = router;
