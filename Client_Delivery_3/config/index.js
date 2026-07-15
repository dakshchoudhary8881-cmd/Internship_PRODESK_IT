const dotenv = require("dotenv");
dotenv.config();

const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  api: {
    prefix: "/api",
    version: "1.0.0",
    name: "Game Waitlist CRUD API with Route Parameters",
  },
  delay: {
    min: 300,
    max: 500,
  },
};

module.exports = config;
