import { STORAGE_KEY, STORAGE_STEP_KEY, INITIAL_FORM_DATA } from '../constants/onboardingConstants';

export function saveFormProgress(formData, step) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      localStorage.setItem(STORAGE_STEP_KEY, step.toString());
    }
  } catch (error) {
    console.warn('Failed to save progress to localStorage:', error);
  }
}

export function loadFormProgress() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedStep = localStorage.getItem(STORAGE_STEP_KEY);
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const step = savedStep ? parseInt(savedStep, 10) : 1;
        return {
          formData: { ...INITIAL_FORM_DATA, ...parsedData },
          step: isNaN(step) || step < 1 || step > 3 ? 1 : step,
          hasSavedProgress: true,
        };
      }
    }
  } catch (error) {
    console.warn('Failed to load progress from localStorage:', error);
  }
  
  return {
    formData: { ...INITIAL_FORM_DATA },
    step: 1,
    hasSavedProgress: false,
  };
}

export function clearFormProgress() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_STEP_KEY);
    }
  } catch (error) {
    console.warn('Failed to clear localStorage:', error);
  }
}
