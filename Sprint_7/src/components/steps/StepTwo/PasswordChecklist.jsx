import { evaluatePassword } from '../../../utils/passwordStrength';
import './PasswordChecklist.css';

export default function PasswordChecklist({ password = '' }) {
  const { checks, level, percentage } = evaluatePassword(password);
  const hasInput = password.length > 0;

  const requirements = [
    { key: 'length', label: 'Minimum 8 characters' },
    { key: 'uppercase', label: 'One uppercase letter (A-Z)' },
    { key: 'lowercase', label: 'One lowercase letter (a-z)' },
    { key: 'number', label: 'One number (0-9)' },
    { key: 'special', label: 'One special character (!@#$...)' },
  ];

  return (
    <div className="password-checklist" aria-label={`Password strength: ${level}`}>
      {hasInput && (
        <div className="password-strength">
          <div className="password-strength__header">
            <span className="password-strength__label">Strength:</span>
            <span className={`password-strength__level password-strength__level--${level.toLowerCase()}`}>
              {level}
            </span>
          </div>
          <div className="password-strength__track">
            <div
              className={`password-strength__bar password-strength__bar--${level.toLowerCase()}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      <ul className="password-checklist__list">
        {requirements.map((req) => {
          const isPassed = checks[req.key];
          return (
            <li
              key={req.key}
              className={`password-checklist__item ${
                isPassed ? 'password-checklist__item--passed' : 'password-checklist__item--pending'
              }`}
            >
              <span className="password-checklist__icon" aria-hidden="true">
                {isPassed ? '✓' : '○'}
              </span>
              <span className="password-checklist__text">{req.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
