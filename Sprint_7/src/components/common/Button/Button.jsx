import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  isLoading = false,
  icon,
  className = '',
  fullWidth = false,
  ariaLabel,
}) {
  const buttonClass = `btn btn--${variant} ${fullWidth ? 'btn--full' : ''} ${
    isLoading ? 'btn--loading' : ''
  } ${className}`;

  return (
    <button
      type={type}
      className={buttonClass.trim()}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-busy={isLoading}
    >
      {isLoading && (
        <span className="btn__spinner" aria-hidden="true" />
      )}
      
      {!isLoading && icon && (
        <span className="btn__icon" aria-hidden="true">
          {icon}
        </span>
      )}

      <span className="btn__text">{children}</span>
    </button>
  );
}
