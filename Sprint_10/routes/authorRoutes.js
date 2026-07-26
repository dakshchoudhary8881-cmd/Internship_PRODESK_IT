const express = require("express");
const router = express.Router();
const { getTopAuthors } = require("../controllers/postController");

router.get("/top", getTopAuthors);

module.exports = router;
