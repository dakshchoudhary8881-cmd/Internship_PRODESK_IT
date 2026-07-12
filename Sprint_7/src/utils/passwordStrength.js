export function evaluatePassword(password = '') {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const passedCount = Object.values(checks).filter(Boolean).length;

  let level = 'Weak';
  let percentage = 0;

  if (passedCount === 5) {
    level = 'Strong';
    percentage = 100;
  } else if (passedCount >= 3) {
    level = 'Medium';
    percentage = 60;
  } else if (passedCount > 0) {
    level = 'Weak';
    percentage = 30;
  }

  return {
    checks,
    passedCount,
    level,
    percentage,
    isValid: passedCount === 5,
  };
}
