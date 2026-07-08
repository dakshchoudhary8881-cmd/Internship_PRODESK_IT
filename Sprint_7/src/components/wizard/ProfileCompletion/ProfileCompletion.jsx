import './ProfileCompletion.css';

export default function ProfileCompletion({ formData }) {
  const fields = ['name', 'email', 'phone', 'country', 'username', 'password', 'role'];
  const filledFields = fields.filter((key) => {
    const val = formData[key];
    return val !== undefined && val !== null && String(val).trim().length > 0;
  });

  const completionPercent = Math.round((filledFields.length / fields.length) * 100);

  return (
    <div className="profile-completion" aria-label={`Profile setup ${completionPercent}% complete`}>
      <div className="profile-completion__badge">
        <span className="profile-completion__icon" aria-hidden="true">🎯</span>
        <span className="profile-completion__text">Profile Completion:</span>
        <span className="profile-completion__value">{completionPercent}%</span>
      </div>
      <div className="profile-completion__bar">
        <div className="profile-completion__fill" style={{ width: `${completionPercent}%` }} />
      </div>
    </div>
  );
}
