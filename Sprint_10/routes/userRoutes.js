// ============================================
// routes/userRoutes.js — User API Routes
// ============================================
// Maps HTTP verbs + paths to user controller handlers.
// Applies ObjectId validation middleware on :id routes
// and express-validator chains on create/update routes.
// ============================================

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validateObjectId = require("../middleware/validateObjectId");
const { validateCreateUser, validateUpdateUser } = require("../validators/userValidator");

// ============================================
// Core CRUD
// ============================================
router
  .route("/")
  .get(userController.getAllUsers)
  .post(validateCreateUser, userController.createUser);

router
  .route("/:id")
  .get(validateObjectId, userController.getUserById)
  .put(validateObjectId, validateUpdateUser, userController.updateUser)
  .delete(validateObjectId, userController.deleteUser);

module.exports = router;
