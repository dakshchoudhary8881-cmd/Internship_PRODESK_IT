import React from 'react';
import Button from './Button';

const EmptyState = ({ title, description, actionText, onAction }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-5) var(--space-3)',
    textAlign: 'center',
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--radius-md)',
    border: '1px dashed var(--color-border)',
    margin: 'var(--space-3) 0',
  };

  const titleStyle = {
    marginBottom: 'var(--space-1)',
    color: 'var(--color-black)',
  };

  const descStyle = {
    color: 'var(--color-medium-gray)',
    marginBottom: 'var(--space-3)',
    maxWidth: '400px',
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>{title}</h3>
      <p style={descStyle}>{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction}>{actionText}</Button>
      )}
    </div>
  );
};

export default EmptyState;
