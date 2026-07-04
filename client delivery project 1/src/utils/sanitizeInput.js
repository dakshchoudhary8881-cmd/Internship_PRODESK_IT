/**
 * Sanitizes user input string by stripping HTML tags, removing `<` and `>`,
 * trimming leading/trailing whitespace, and collapsing multiple internal spaces.
 *
 * @param {string} input - The raw string input from user
 * @returns {string} - The sanitized clean string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== "string") {
    return "";
  }

  // 1. Remove script/style tags and their contents completely
  let sanitized = input.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "");
  
  // 2. Strip all remaining HTML tags
  sanitized = sanitized.replace(/<[^>]*>?/gm, "");
  
  // 3. Remove any leftover < or > symbols
  sanitized = sanitized.replace(/[<>]/g, "");

  // 4. Collapse multiple spaces into a single space
  sanitized = sanitized.replace(/\s+/g, " ");

  // 5. Trim whitespace from start and end
  return sanitized.trim();
};
