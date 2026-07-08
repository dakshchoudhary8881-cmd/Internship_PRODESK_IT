import { useState } from 'react';
import './Password.css';

export default function Password({
  label,
  name,
  icon = '🔒',
  register,
  error,
  value = '',
  placeholder,
  autoComplete = 'new-password',
  disabled = false,
  ariaDescribedBy,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const isSuccess = hasValue && !error;

  let stateClass = '';
  if (error) stateClass = 'password-group--error';
  else if (isSuccess) stateClass = 'password-group--success';

  const errorId = error ? `${name}-error` : undefined;
  const describedBy = [errorId, ariaDescribedBy].filter(Boolean).join(' ') || undefined;

  let smartPlaceholder = placeholder;
  if (!smartPlaceholder || smartPlaceholder === ' ') {
    if (name === 'password') smartPlaceholder = 'Create a strong password';
    else if (name === 'confirmPassword') smartPlaceholder = 'Re-enter your password';
    else smartPlaceholder = 'Enter password...';
  }

  return (
    <div className={`password-group nexora-field ${stateClass}`}>
      {label && (
        <label htmlFor={name} className="nexora-field__label">
          {label}
        </label>
      )}

      <div className="password-group__wrapper">
        <span className="password-group__icon" aria-hidden="true">
          {icon}
        </span>

        <input
          id={name}
          type={showPassword ? 'text' : 'password'}
          className="password-group__field"
          placeholder={smartPlaceholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...(register ? register(name) : {})}
        />

        <button
          type="button"
          className="password-group__toggle"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>

      {error && (
        <p className="password-group__error" id={errorId} role="alert">
          <span aria-hidden="true">⚠️</span> {error}
        </p>
      )}
    </div>
  );
}
