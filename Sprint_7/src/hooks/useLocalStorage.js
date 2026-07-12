import { useEffect } from 'react';
import { saveFormProgress, clearFormProgress } from '../utils/storage';

export function useLocalStoragePersistence(formData, currentStep, isSubmitted) {
  useEffect(() => {
    if (isSubmitted) {
      clearFormProgress();
    } else {
      saveFormProgress(formData, currentStep);
    }
  }, [formData, currentStep, isSubmitted]);
}
