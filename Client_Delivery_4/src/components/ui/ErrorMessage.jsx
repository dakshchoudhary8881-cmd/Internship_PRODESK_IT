import React from 'react';

const ErrorMessage = ({ message }) => {
  const containerStyle = {
    padding: 'var(--space-2)',
    backgroundColor: '#ffebee',
    border: '1px solid var(--color-error)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-error)',
    marginBottom: 'var(--space-2)',
  };

  if (!message) return null;

  return (
    <div style={containerStyle} role="alert">
      {message}
    </div>
  );
};

export default ErrorMessage;
