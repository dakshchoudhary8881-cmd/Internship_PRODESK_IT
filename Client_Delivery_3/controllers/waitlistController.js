const waitlistModel = require("../models/waitlistModel");
const { sanitizeBody } = require("../utils/sanitizer");
const { logInteraction } = require("../utils/analytics");
const { simulateDelay } = require("../utils/delay");

const getAllPlayers = async (req, res, next) => {
  try {
    await simulateDelay();

    const { game, status, name, sort } = req.query;
    const hasFilters = game || status || name;

    let entries = hasFilters
      ? waitlistModel.filterEntries({ game, status, name })
      : waitlistModel.getAllEntries();

    if (sort) {
      entries = waitlistModel.sortEntries(entries, sort);
    }

    return res.status(200).json({
      success: true,
      message: "Waitlist entries retrieved successfully",
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    return next(error);
  }
};

const getPlayerById = async (req, res, next) => {
  try {
    await simulateDelay();

    const { id } = req.params;
    const entry = waitlistModel.getEntryById(id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Waitlist entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Waitlist entry retrieved successfully",
      data: entry,
    });
  } catch (error) {
    return next(error);
  }
};

const createPlayer = async (req, res, next) => {
  try {
    await simulateDelay();

    const sanitized = sanitizeBody(req.body);
    const { name, game, players, phone, status } = sanitized;

    const newEntry = waitlistModel.createEntry({
      name,
      game,
      players: parseInt(players, 10) || players,
      phone,
      status,
    });

    logInteraction("POST", { id: newEntry.id, name: newEntry.name });

    return res.status(201).json({
      success: true,
      message: "Player added to waitlist successfully",
      data: newEntry,
    });
  } catch (error) {
    return next(error);
  }
};

const updatePlayer = async (req, res, next) => {
  try {
    await simulateDelay();

    const { id } = req.params;
    const existing = waitlistModel.getEntryById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Waitlist entry not found",
      });
    }

    const sanitized = sanitizeBody(req.body);
    const allowedFields = ["name", "game", "players", "phone", "status"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (sanitized[field] !== undefined) {
        updates[field] =
          field === "players"
            ? parseInt(sanitized[field], 10) || sanitized[field]
            : sanitized[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
        errors: [],
      });
    }

    const updatedEntry = waitlistModel.updateEntry(id, updates);

    logInteraction("PUT", { id: updatedEntry.id, name: updatedEntry.name });

    return res.status(200).json({
      success: true,
      message: "Player updated successfully",
      data: updatedEntry,
    });
  } catch (error) {
    return next(error);
  }
};

const deletePlayer = async (req, res, next) => {
  try {
    await simulateDelay();

    const { id } = req.params;
    const removed = waitlistModel.deleteEntry(id);

    if (!removed) {
      return res.status(404).json({
        success: false,
        message: "Waitlist entry not found",
      });
    }

    logInteraction("DELETE", { id: removed.id, name: removed.name });

    return res.status(200).json({
      success: true,
      message: "Player removed successfully",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
