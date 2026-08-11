export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  // basic validation for a phone number (e.g., allow +, numbers, spaces, dashes, parens)
  // must be at least 10 digits/characters if provided
  if (!phone) return true; // Phone is optional in some cases, let caller check required
  const re = /^[\d\s+\-()]{10,20}$/;
  return re.test(phone);
};

export const validateMemberForm = (data) => {
  const errors = {};

  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  } else if (data.firstName.trim().length > 50) {
    errors.firstName = 'First name cannot exceed 50 characters';
  }

  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  } else if (data.lastName.trim().length > 50) {
    errors.lastName = 'Last name cannot exceed 50 characters';
  }

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Invalid phone number format';
  }

  if (!data.tier) {
    errors.tier = 'Loyalty tier is required';
  } else if (!['Standard', 'Silver', 'Gold', 'Platinum'].includes(data.tier)) {
    errors.tier = 'Invalid tier selected';
  }

  if (!data.status) {
    errors.status = 'Status is required';
  } else if (!['Active', 'Inactive'].includes(data.status)) {
    errors.status = 'Invalid status selected';
  }

  if (data.points === undefined || data.points === null || data.points === '') {
    errors.points = 'Points are required';
  } else {
    const pointsNum = Number(data.points);
    if (isNaN(pointsNum) || pointsNum < 0) {
      errors.points = 'Points must be a positive number or zero';
    }
  }

  return errors;
};
