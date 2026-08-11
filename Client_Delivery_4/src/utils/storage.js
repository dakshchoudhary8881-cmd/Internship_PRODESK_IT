const STORAGE_KEY = 'frequent_flyers_data';

export const getStoredFlyers = (defaultData = []) => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return defaultData;
    
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed : defaultData;
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return defaultData;
  }
};

export const setStoredFlyers = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to localStorage', error);
  }
};
