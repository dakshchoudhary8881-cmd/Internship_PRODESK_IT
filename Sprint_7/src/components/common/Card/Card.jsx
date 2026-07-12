import './Card.css';

export default function Card({
  children,
  header,
  footer,
  className = '',
  hoverEffect = false,
  role,
  ariaLabelledBy,
}) {
  return (
    <div
      className={`card ${hoverEffect ? 'card--hover' : ''} ${className}`.trim()}
      role={role}
      aria-labelledby={ariaLabelledBy}
    >
      {header && <div className="card__header">{header}</div>}
      <div className="card__body">{children}</div>
      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
}
