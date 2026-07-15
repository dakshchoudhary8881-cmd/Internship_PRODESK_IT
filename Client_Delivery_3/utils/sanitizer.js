const xss = require("xss");

const xssOptions = {
  whiteList: {},
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "style"],
};

const sanitizeString = (value) => {
  if (typeof value !== "string") return value;
  return xss(value.trim(), xssOptions);
};

const sanitizeBody = (body) => {
  const sanitized = {};
  const keys = Object.keys(body);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    sanitized[key] = sanitizeString(body[key]);
  }

  return sanitized;
};

module.exports = { sanitizeString, sanitizeBody };
