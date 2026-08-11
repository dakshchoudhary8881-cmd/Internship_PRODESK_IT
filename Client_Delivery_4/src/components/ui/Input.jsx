import React, { useId } from 'react';

const Input = React.forwardRef(({ 
  label, 
  error, 
  id, 
  className = '', 
  ...props 
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)',
    marginBottom: 'var(--space-2)',
  };

  const labelStyle = {
    fontWeight: '500',
    fontSize: '0.875rem',
    color: 'var(--color-dark-gray)',
  };

  const inputStyle = {
    padding: '8px 12px',
    borderRadius: 'var(--radius-md)',
    border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-border)'}`,
    fontSize: '1rem',
    width: '100%',
    transition: 'border-color 0.2s',
  };

  const errorStyle = {
    color: 'var(--color-error)',
    fontSize: '0.75rem',
    marginTop: '2px',
  };

  return (
    <div style={containerStyle} className={className}>
      {label && <label htmlFor={inputId} style={labelStyle}>{label}</label>}
      <input
        ref={ref}
        id={inputId}
        style={inputStyle}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <span id={errorId} style={errorStyle} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
