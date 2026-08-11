import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Spinner from '../ui/Spinner';
import { validateMemberForm } from '../../utils/validation';

const defaultFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  tier: 'Standard',
  points: 0,
  status: 'Active',
};

const FlyerForm = ({ isOpen, onClose, onSubmit, initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState(defaultFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData(defaultFormState);
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateMemberForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--space-2)',
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? 'Edit Member' : 'Add New Member'}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div style={formGridStyle}>
          <Input
            label="First Name *"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
            aria-required="true"
          />
          <Input
            label="Last Name *"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
            aria-required="true"
          />
        </div>

        <Input
          label="Email *"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          aria-required="true"
        />

        <div style={formGridStyle}>
          <Input
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <Input
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            error={errors.dateOfBirth}
          />
        </div>

        <div style={formGridStyle}>
          <Select
            label="Loyalty Tier *"
            name="tier"
            value={formData.tier}
            onChange={handleChange}
            error={errors.tier}
            options={['Standard', 'Silver', 'Gold', 'Platinum']}
            required
            aria-required="true"
          />
          <Input
            label="Points *"
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
            error={errors.points}
            required
            aria-required="true"
            min="0"
          />
        </div>

        <Select
          label="Status *"
          name="status"
          value={formData.status}
          onChange={handleChange}
          error={errors.status}
          options={['Active', 'Inactive']}
          required
          aria-required="true"
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Spinner size="sm" />
                Saving...
              </span>
            ) : (
              initialData ? 'Update Member' : 'Save Member'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FlyerForm;
