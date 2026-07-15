const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const waitlistRoutes = require("./routes/waitlistRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());

app.use(cors(config.cors));

app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: `Welcome to ${config.api.name}`,
    version: config.api.version,
    endpoints: {
      waitlist: `${config.api.prefix}/waitlist`,
    },
  });
});

app.use(`${config.api.prefix}/waitlist`, waitlistRoutes);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
