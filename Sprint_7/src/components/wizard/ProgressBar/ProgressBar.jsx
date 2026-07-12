import './ProgressBar.css';

export default function ProgressBar({ currentStep = 1, totalSteps = 3 }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="wizard-progress" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
      <div className="wizard-progress__header">
        <span className="wizard-progress__step-text">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="wizard-progress__percentage">{percentage}%</span>
      </div>

      <div className="wizard-progress__track">
        <div
          className="wizard-progress__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
