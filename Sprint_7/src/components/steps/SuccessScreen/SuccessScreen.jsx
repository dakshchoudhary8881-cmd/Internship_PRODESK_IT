import Button from '../../common/Button/Button';
import './SuccessScreen.css';

export default function SuccessScreen({ onReset }) {
  const confettiParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: `${(i * 0.08).toFixed(2)}s`,
    left: `${Math.random() * 90 + 5}%`,
    color: ['#6366F1', '#22C55E', '#F59E0B', '#EF4444', '#EC4899', '#3B82F6'][i % 6],
  }));

  return (
    <div className="success-screen" role="region" aria-label="Registration Successful">
      <div className="success-screen__confetti-container" aria-hidden="true">
        {confettiParticles.map((p) => (
          <span
            key={p.id}
            className="success-screen__confetti-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              backgroundColor: p.color,
            }}
          />
        ))}
      </div>

      <div className="success-screen__icon-wrapper">
        <svg
          className="success-screen__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            className="success-screen__circle"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--success)"
            strokeWidth="4"
          />
          <path
            className="success-screen__check"
            d="M28 52 L42 66 L72 36"
            fill="none"
            stroke="var(--success)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 className="success-screen__title">Registration Successful</h2>
      <p className="success-screen__subtitle">
        Your Vision onboarding is complete! Your account has been initialized and is ready for use.
      </p>

      <div className="success-screen__action">
        <Button variant="primary" onClick={onReset} ariaLabel="Create another account and reset wizard">
          Create Another
        </Button>
      </div>
    </div>
  );
}
