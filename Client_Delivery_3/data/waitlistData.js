const { v4: uuidv4 } = require("uuid");

const waitlistData = [
  {
    id: uuidv4(),
    name: "Daksh Choudhary",
    game: "Bowling",
    players: 4,
    phone: "9876543210",
    status: "waiting",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Rahul Sharma",
    game: "Laser Tag",
    players: 6,
    phone: "8765432109",
    status: "playing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Priya Verma",
    game: "Go Karting",
    players: 2,
    phone: "7654321098",
    status: "completed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

module.exports = waitlistData;
