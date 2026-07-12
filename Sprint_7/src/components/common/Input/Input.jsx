import './Input.css';

export default function Input({
  label,
  name,
  type = 'text',
  icon,
  register,
  error,
  value = '',
  placeholder,
  autoComplete = 'off',
  disabled = false,
  autoFocus = false,
  ariaDescribedBy,
}) {
  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const isSuccess = hasValue && !error;

  let stateClass = '';
  if (error) stateClass = 'input-group--error';
  else if (isSuccess) stateClass = 'input-group--success';

  const errorId = error ? `${name}-error` : undefined;
  const describedBy = [errorId, ariaDescribedBy].filter(Boolean).join(' ') || undefined;

  let smartPlaceholder = placeholder;
  if (!smartPlaceholder || smartPlaceholder === ' ') {
    if (name === 'name') smartPlaceholder = 'e.g. Jordan Ellis';
    else if (name === 'email') smartPlaceholder = 'e.g. name@example.com';
    else if (name === 'phone') smartPlaceholder = 'e.g. (555) 123-4567';
    else if (name === 'username') smartPlaceholder = 'e.g. jordan_ellis';
    else smartPlaceholder = `Enter ${label ? label.toLowerCase().replace(/\s*\(.*?\)/g, '') : 'value'}...`;
  }

  return (
    <div className={`input-group nexora-field ${stateClass}`}>
      {label && (
        <label htmlFor={name} className="nexora-field__label">
          {label}
        </label>
      )}

      <div className="input-group__wrapper">
        {icon && (
          <span className="input-group__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        <input
          id={name}
          type={type}
          className="input-group__field"
          placeholder={smartPlaceholder}
          autoComplete={autoComplete}
          disabled={disabled}
          autoFocus={autoFocus}
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...(register ? register(name) : {})}
        />
      </div>

      {error && (
        <p className="input-group__error" id={errorId} role="alert">
          <span aria-hidden="true">⚠️</span> {error}
        </p>
      )}
    </div>
  );
}
