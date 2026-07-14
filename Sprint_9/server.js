const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const requestLogger = require("./middleware/requestLogger");
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(requestLogger);

app.use("/", healthRoutes);
app.use("/blogs", blogRoutes);
app.use("/", authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Data Hub API server is running on http://localhost:${PORT}`);
});

module.exports = app;
