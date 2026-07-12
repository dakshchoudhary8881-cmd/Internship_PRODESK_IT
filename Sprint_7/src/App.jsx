import { useState, useCallback, useEffect } from 'react';
import { INITIAL_FORM_DATA } from './constants/onboardingConstants';
import { loadFormProgress, clearFormProgress } from './utils/storage';
import { useLocalStoragePersistence } from './hooks/useLocalStorage';
import ProgressBar from './components/wizard/ProgressBar/ProgressBar';
import StepIndicator from './components/wizard/StepIndicator/StepIndicator';
import ProfileCompletion from './components/wizard/ProfileCompletion/ProfileCompletion';
import NavigationButtons from './components/wizard/NavigationButtons/NavigationButtons';
import StepOne from './components/steps/StepOne/StepOne';
import StepTwo from './components/steps/StepTwo/StepTwo';
import StepThree from './components/steps/StepThree/StepThree';
import SuccessScreen from './components/steps/SuccessScreen/SuccessScreen';
import Toast from './components/common/Toast/Toast';
import './App.css';

export default function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [currentStep, setCurrentStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const { formData: savedData, step: savedStep, hasSavedProgress } = loadFormProgress();
    if (hasSavedProgress) {
      setFormData(savedData);
      setCurrentStep(savedStep);
      setToastMessage('Progress restored from previous session');
    }
  }, []);

  useLocalStoragePersistence(formData, currentStep, isSubmitted);

  const handleDataChange = useCallback((newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  const handleValidChange = useCallback((valid) => {
    setIsStepValid(valid);
  }, []);

  const handleNextStep = useCallback(() => {
    if (isStepValid && currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isStepValid, currentStep]);

  const handleBackStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const handleFinalSubmit = useCallback(() => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('=========================================');
      console.log('🚀 ENTERPRISE ONBOARDING FORM SUBMITTED:');
      console.log('=========================================');
      console.log(formData);
      console.log('=========================================');

      setIsSubmitting(false);
      setIsSubmitted(true);
      clearFormProgress();
      setToastMessage('Application successfully submitted! 🎉');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  }, [formData]);

  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
    setIsStepValid(false);
    setIsSubmitted(false);
    clearFormProgress();
    setToastMessage('Wizard reset. Start a new onboarding application.');
  }, []);

  return (
    <div className="app-container nexora-split-layout">
      {/* Left Sidebar / Hero Area */}
      <aside className="nexora-sidebar" aria-label="Vision Onboarding Information">
        <div className="nexora-sidebar__inner">
          <div className="nexora-brand">
            <div className="nexora-brand__icon-box" aria-hidden="true">
              <span className="nexora-brand__diamond">◆</span>
            </div>
            <span className="nexora-brand__text">Vision</span>
          </div>

          <div className="nexora-badge">
            <span className="nexora-badge__dot" aria-hidden="true" />
            <span className="nexora-badge__label">Secure Onboarding</span>
          </div>

          <h1 className="nexora-hero__title">
            Your journey starts <br />
            <span className="nexora-hero__highlight">here.</span>
          </h1>

          <p className="nexora-hero__desc">
            Set up your Vision account in just a few guided steps and unlock a workspace built for how your team actually works.
          </p>

          <ul className="nexora-features">
            <li className="nexora-features__item">
              <span className="nexora-features__icon" aria-hidden="true">🛡️</span>
              <span className="nexora-features__text">Secure account setup</span>
            </li>
            <li className="nexora-features__item">
              <span className="nexora-features__icon" aria-hidden="true">⏱️</span>
              <span className="nexora-features__text">Takes less than 3 minutes</span>
            </li>
            <li className="nexora-features__item">
              <span className="nexora-features__icon" aria-hidden="true">🔒</span>
              <span className="nexora-features__text">Your data stays protected</span>
            </li>
          </ul>
        </div>
      </aside>

      {/* Right Main Workspace Card Area */}
      <main className="nexora-workspace" role="main">
        <div className="wizard-card nexora-card">
          {!isSubmitted ? (
            <>
              {/* Top Gradient Progress Bar & Step Indicator */}
              <div className="nexora-card__header">
                <div className="nexora-progress-bar" role="progressbar" aria-valuenow={Math.round((currentStep / 3) * 100)} aria-valuemin={0} aria-valuemax={100}>
                  <div
                    className="nexora-progress-bar__fill"
                    style={{
                      width: currentStep === 1 ? '33.33%' : currentStep === 2 ? '66.66%' : '100%',
                    }}
                  />
                </div>
                <StepIndicator currentStep={currentStep} />
              </div>

              <div className="wizard-step-content" role="region" aria-label={`Step ${currentStep} form`}>
                {currentStep === 1 && (
                  <StepOne
                    formData={formData}
                    onDataChange={handleDataChange}
                    onValidChange={handleValidChange}
                    onNext={handleNextStep}
                  />
                )}

                {currentStep === 2 && (
                  <StepTwo
                    formData={formData}
                    onDataChange={handleDataChange}
                    onValidChange={handleValidChange}
                    onNext={handleNextStep}
                  />
                )}

                {currentStep === 3 && (
                  <StepThree
                    formData={formData}
                    onSubmit={handleFinalSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </div>

              <NavigationButtons
                currentStep={currentStep}
                isValid={isStepValid}
                onBack={handleBackStep}
                onNext={handleNextStep}
                onSubmit={() => {
                  const triggerBtn = document.getElementById('trigger-submit-modal');
                  if (triggerBtn) triggerBtn.click();
                }}
                isSubmitting={isSubmitting}
              />
            </>
          ) : (
            <SuccessScreen onReset={handleReset} />
          )}
        </div>
      </main>

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
