import { useRef } from 'react';
import { useEnterNavigation } from '../../../hooks/useEnterNavigation';
import './FormLayout.css';

export default function FormLayout({
  children,
  onSubmit,
  onAdvanceEnd,
  className = '',
  ariaLabel = 'Onboarding Step Form',
}) {
  const formRef = useRef(null);

  useEnterNavigation(formRef, onAdvanceEnd || onSubmit);

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className={`form-layout ${className}`.trim()}
      aria-label={ariaLabel}
    >
      {children}
    </form>
  );
}
