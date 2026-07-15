const { v4: uuidv4 } = require("uuid");
const waitlistData = require("../data/waitlistData");

const getAllEntries = () => {
  return [...waitlistData];
};

const getEntryById = (id) => {
  return waitlistData.find((entry) => entry.id === id) || null;
};

const createEntry = ({ name, game, players, phone, status }) => {
  const now = new Date().toISOString();
  const newEntry = {
    id: uuidv4(),
    name,
    game,
    players,
    phone,
    status: status || "waiting",
    createdAt: now,
    updatedAt: now,
  };

  const duplicate = waitlistData.find((entry) => entry.id === newEntry.id);
  if (duplicate) {
    newEntry.id = uuidv4();
  }

  waitlistData.push(newEntry);
  return newEntry;
};

const updateEntry = (id, updates) => {
  const index = waitlistData.findIndex((entry) => entry.id === id);
  if (index === -1) {
    return null;
  }

  const existing = waitlistData[index];
  const updatedEntry = {
    ...existing,
    ...updates,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };

  waitlistData[index] = updatedEntry;
  return updatedEntry;
};

const deleteEntry = (id) => {
  const index = waitlistData.findIndex((entry) => entry.id === id);
  if (index === -1) {
    return null;
  }

  const [removed] = waitlistData.splice(index, 1);
  return removed;
};

const filterEntries = (query) => {
  let results = [...waitlistData];

  const { game, status, name } = query;

  if (game) {
    results = results.filter(
      (entry) => entry.game.toLowerCase() === game.toLowerCase()
    );
  }

  if (status) {
    results = results.filter(
      (entry) => entry.status.toLowerCase() === status.toLowerCase()
    );
  }

  if (name) {
    results = results.filter((entry) =>
      entry.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return results;
};

const sortEntries = (entries, sortBy) => {
  const validSortFields = ["name", "id", "createdAt"];
  const field = validSortFields.includes(sortBy) ? sortBy : "createdAt";

  return entries.sort((a, b) => {
    if (a[field] < b[field]) return -1;
    if (a[field] > b[field]) return 1;
    return 0;
  });
};

module.exports = {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
  filterEntries,
  sortEntries,
};
