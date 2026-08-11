import React from 'react';

const Button = React.forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  type = 'button',
  disabled,
  ...props 
}, ref) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-md)',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    border: '1px solid transparent',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--color-black)',
      color: 'var(--color-white)',
      borderColor: 'var(--color-black)',
    },
    secondary: {
      backgroundColor: 'var(--color-white)',
      color: 'var(--color-black)',
      borderColor: 'var(--color-border)',
    },
    danger: {
      backgroundColor: 'var(--color-error)',
      color: 'var(--color-white)',
      borderColor: 'var(--color-error)',
    }
  };

  const sizes = {
    sm: { padding: '4px 12px', fontSize: '0.875rem' },
    md: { padding: '8px 16px', fontSize: '1rem' },
    lg: { padding: '12px 24px', fontSize: '1.125rem' }
  };

  const variantStyle = variants[variant] || variants.primary;
  const sizeStyle = sizes[size] || sizes.md;

  const style = {
    ...baseStyles,
    ...variantStyle,
    ...sizeStyle,
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  return (
    <button
      ref={ref}
      type={type}
      style={style}
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
