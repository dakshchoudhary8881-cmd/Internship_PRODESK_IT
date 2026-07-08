import { useEffect } from 'react';
import { useStepValidation } from '../../../hooks/useStepValidation';
import { stepOneSchema } from '../../../schemas/onboardingSchema';
import { COUNTRY_OPTIONS } from '../../../constants/onboardingConstants';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';
import FormLayout from '../../common/FormLayout/FormLayout';
import './StepOne.css';

export default function StepOne({ formData, onDataChange, onValidChange, onNext }) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useStepValidation(stepOneSchema, {
    name: formData.name || '',
    email: formData.email || '',
    phone: formData.phone || '',
    country: formData.country || '',
  });

  const watchedValues = watch();

  useEffect(() => {
    onDataChange({
      name: watchedValues.name || '',
      email: watchedValues.email || '',
      phone: watchedValues.phone || '',
      country: watchedValues.country || '',
    });
  }, [watchedValues.name, watchedValues.email, watchedValues.phone, watchedValues.country, onDataChange]);

  useEffect(() => {
    onValidChange(isValid);
  }, [isValid, onValidChange]);

  const handleFormSubmit = handleSubmit(() => {
    if (isValid) {
      onNext();
    }
  });

  return (
    <div className="step-one">
      <div className="step-one__header">
        <h2 className="step-one__title">Personal Information</h2>
        <p className="step-one__subtitle">Tell us about yourself to personalize your account</p>
      </div>

      <FormLayout onSubmit={handleFormSubmit} onAdvanceEnd={handleFormSubmit}>
        <div className="form-row-2col">
          <Input
            label="Full Name"
            name="name"
            icon="👤"
            register={register}
            error={errors.name?.message}
            value={watchedValues.name}
            autoComplete="name"
            autoFocus={true}
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            icon="✉️"
            register={register}
            error={errors.email?.message}
            value={watchedValues.email}
            autoComplete="email"
          />
        </div>

        <div className="form-row-2col">
          <Input
            label="Phone Number (10 digits)"
            name="phone"
            type="tel"
            icon="📱"
            register={register}
            error={errors.phone?.message}
            value={watchedValues.phone}
            autoComplete="tel"
          />

          <Select
            label="Country"
            name="country"
            icon="🌍"
            options={COUNTRY_OPTIONS}
            register={register}
            error={errors.country?.message}
            value={watchedValues.country}
          />
        </div>
      </FormLayout>
    </div>
  );
}
