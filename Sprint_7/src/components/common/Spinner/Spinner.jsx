import './Spinner.css';

export default function Spinner({ size = 'medium', className = '', ariaLabel = 'Loading' }) {
  return (
    <div className={`spinner-container ${className}`} role="status" aria-label={ariaLabel}>
      <div className={`spinner spinner--${size}`} />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}
