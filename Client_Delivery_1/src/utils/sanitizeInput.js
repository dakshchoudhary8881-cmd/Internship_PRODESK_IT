export const sanitizeInput = (input) => {
  if (typeof input !== "string") {
    return "";
  }

  let sanitized = input.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "");
  
  sanitized = sanitized.replace(/<[^>]*>?/gm, "");
  
  sanitized = sanitized.replace(/[<>]/g, "");

  sanitized = sanitized.replace(/\s+/g, " ");
  return sanitized.trim();
};
