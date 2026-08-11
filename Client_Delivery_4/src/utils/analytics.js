export const logAnalytics = (action, metadata = {}) => {
  const timestamp = new Date().toISOString();
  console.log(`[Analytics] User interacted with End-to-End Frequent Flyer Portal`);
  console.log(`Action: ${action}`);
  if (Object.keys(metadata).length > 0) {
    console.log(`Metadata:`, metadata);
  }
  console.log(`Timestamp: ${timestamp}`);
};
