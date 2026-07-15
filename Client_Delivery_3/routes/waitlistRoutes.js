const express = require("express");
const router = express.Router();
const {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require("../controllers/waitlistController");
const {
  createValidationRules,
  updateValidationRules,
  validate,
} = require("../middleware/validation");

router.get("/", getAllPlayers);

router.get("/:id", getPlayerById);

router.post("/", createValidationRules(), validate, createPlayer);

router.put("/:id", updateValidationRules(), validate, updatePlayer);

router.delete("/:id", deletePlayer);

module.exports = router;
