import React, { useId } from 'react';

const Select = React.forwardRef(({ 
  label, 
  error, 
  id, 
  options = [],
  className = '', 
  ...props 
}, ref) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;

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

  const selectStyle = {
    padding: '8px 12px',
    borderRadius: 'var(--radius-md)',
    border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-border)'}`,
    fontSize: '1rem',
    width: '100%',
    backgroundColor: 'var(--color-white)',
    cursor: 'pointer',
  };

  const errorStyle = {
    color: 'var(--color-error)',
    fontSize: '0.75rem',
    marginTop: '2px',
  };

  return (
    <div style={containerStyle} className={className}>
      {label && <label htmlFor={selectId} style={labelStyle}>{label}</label>}
      <select
        ref={ref}
        id={selectId}
        style={selectStyle}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      {error && (
        <span id={errorId} style={errorStyle} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
