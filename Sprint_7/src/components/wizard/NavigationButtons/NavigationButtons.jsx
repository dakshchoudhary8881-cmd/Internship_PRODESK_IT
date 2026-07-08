import Button from '../../common/Button/Button';
import './NavigationButtons.css';

export default function NavigationButtons({
  currentStep,
  isValid = true,
  onBack,
  onNext,
  onSubmit,
  isSubmitting = false,
}) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === 3;

  return (
    <div className="wizard-navigation">
      {!isFirstStep ? (
        <Button
          variant="secondary"
          onClick={onBack}
          disabled={isSubmitting}
          ariaLabel="Go back to previous step"
        >
          &lt; Back
        </Button>
      ) : (
        <div className="wizard-navigation__spacer" />
      )}

      {!isLastStep ? (
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!isValid || isSubmitting}
          ariaLabel="Advance to next step"
        >
          Next Step &gt;
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
          ariaLabel="Submit onboarding application"
        >
          Submit Application ✓
        </Button>
      )}
    </div>
  );
}
