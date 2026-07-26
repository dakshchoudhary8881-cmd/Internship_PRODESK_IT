const express = require("express");
const router = express.Router();
const { getTopCategories } = require("../controllers/postController");

router.get("/top", getTopCategories);

module.exports = router;
