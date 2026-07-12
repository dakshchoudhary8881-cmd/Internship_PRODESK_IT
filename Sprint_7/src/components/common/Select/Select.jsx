import './Select.css';

export default function Select({
  label,
  name,
  icon,
  options = [],
  register,
  error,
  value = '',
  disabled = false,
  ariaDescribedBy,
}) {
  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const isSuccess = hasValue && !error;

  let stateClass = '';
  if (error) stateClass = 'select-group--error';
  else if (isSuccess) stateClass = 'select-group--success';

  const errorId = error ? `${name}-error` : undefined;
  const describedBy = [errorId, ariaDescribedBy].filter(Boolean).join(' ') || undefined;

  let placeholderText = 'Select option...';
  if (name === 'country') placeholderText = 'Select your country';
  else if (name === 'role') placeholderText = 'Select account type';

  return (
    <div className={`select-group nexora-field ${stateClass}`}>
      {label && (
        <label htmlFor={name} className="nexora-field__label">
          {label}
        </label>
      )}

      <div className="select-group__wrapper">
        {icon && (
          <span className="select-group__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        <select
          id={name}
          className={`select-group__field ${hasValue ? 'has-value' : ''}`}
          disabled={disabled}
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...(register ? register(name) : {})}
        >
          <option value="" disabled hidden>
            {placeholderText}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="select-group__chevron" aria-hidden="true">
          ▾
        </span>
      </div>

      {error && (
        <p className="select-group__error" id={errorId} role="alert">
          <span aria-hidden="true">⚠️</span> {error}
        </p>
      )}
    </div>
  );
}
