const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const mongoose = require("mongoose");

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const statsRoutes = require("./routes/statsRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authorRoutes = require("./routes/authorRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "🚀 The Data Hub v2 API is running successfully!",
    version: "2.0.0",
    documentation: "/api",
  });
});

app.get("/api", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to The Data Hub v2 API",
    endpoints: {
      posts: "/api/posts",
      users: "/api/users",
      stats: "/api/stats",
      categories: "/api/categories/top",
      authors: "/api/authors/top",
      health: "/api/health",
    },
  });
});

app.get("/api/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStates = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  };

  const isDbHealthy = dbState === 1;

  return res.status(isDbHealthy ? 200 : 503).json({
    success: true,
    message: "Health check completed.",
    data: {
      server: "Running",
      database: dbStates[dbState] || "Unknown",
      uptime: `${Math.floor(process.uptime())}s`,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      dbHost: isDbHealthy ? mongoose.connection.host : null,
      dbName: isDbHealthy ? mongoose.connection.name : null,
    },
  });
});

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/authors", authorRoutes);

app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

app.use(errorHandler);

module.exports = app;
