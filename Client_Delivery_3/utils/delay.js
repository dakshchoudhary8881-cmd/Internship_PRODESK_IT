const config = require("../config");

const simulateDelay = () => {
  const { min, max } = config.delay;
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

module.exports = { simulateDelay };
