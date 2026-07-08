import { WIZARD_STEPS } from '../../../constants/onboardingConstants';
import './StepIndicator.css';

export default function StepIndicator({ currentStep = 1 }) {
  return (
    <nav className="step-indicator nexora-step-indicator" aria-label="Onboarding steps progress">
      <ol className="step-indicator__list">
        {WIZARD_STEPS.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          let stateClass = '';
          if (isCompleted) stateClass = 'step-indicator__circle--completed';
          else if (isActive) stateClass = 'step-indicator__circle--active';

          return (
            <li key={step.id} className="step-indicator__item">
              <div className="step-indicator__step-content">
                <div
                  className={`step-indicator__circle ${stateClass}`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <span className="step-indicator__check" aria-label={`Step ${step.id} completed`}>
                      ✓
                    </span>
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>

                <div className="step-indicator__labels">
                  <span
                    className={`step-indicator__title ${
                      isActive ? 'step-indicator__title--active' : ''
                    } ${isCompleted ? 'step-indicator__title--completed' : ''}`}
                  >
                    {step.title}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
