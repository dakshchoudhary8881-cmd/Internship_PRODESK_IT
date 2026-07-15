const config = require("../config");

const logInteraction = (action, details = {}) => {
  const timestamp = new Date().toISOString();
  const message = `[Analytics] User interacted with ${config.api.name}`;
  console.log(`${message} | Action: ${action} | Time: ${timestamp}`, details);
};

module.exports = { logInteraction };
