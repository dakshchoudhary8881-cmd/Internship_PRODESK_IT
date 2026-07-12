import { useEffect } from 'react';
import { useStepValidation } from '../../../hooks/useStepValidation';
import { stepTwoSchema } from '../../../schemas/onboardingSchema';
import { ROLE_OPTIONS } from '../../../constants/onboardingConstants';
import Input from '../../common/Input/Input';
import Password from '../../common/Password/Password';
import Select from '../../common/Select/Select';
import FormLayout from '../../common/FormLayout/FormLayout';
import PasswordChecklist from './PasswordChecklist';
import './StepTwo.css';

export default function StepTwo({ formData, onDataChange, onValidChange, onNext }) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useStepValidation(stepTwoSchema, {
    username: formData.username || '',
    password: formData.password || '',
    confirmPassword: formData.confirmPassword || '',
    role: formData.role || '',
  });

  const watchedValues = watch();

  useEffect(() => {
    onDataChange({
      username: watchedValues.username || '',
      password: watchedValues.password || '',
      confirmPassword: watchedValues.confirmPassword || '',
      role: watchedValues.role || '',
    });
  }, [watchedValues.username, watchedValues.password, watchedValues.confirmPassword, watchedValues.role, onDataChange]);

  useEffect(() => {
    onValidChange(isValid);
  }, [isValid, onValidChange]);

  const handleFormSubmit = handleSubmit(() => {
    if (isValid) {
      onNext();
    }
  });

  return (
    <div className="step-two">
      <div className="step-two__header">
        <h2 className="step-two__title">Security & Role Setup</h2>
        <p className="step-two__subtitle">Secure your account and select your Vision access level</p>
      </div>

      <FormLayout onSubmit={handleFormSubmit} onAdvanceEnd={handleFormSubmit}>
        <div className="form-row-2col">
          <Input
            label="Username (no spaces)"
            name="username"
            icon="🆔"
            register={register}
            error={errors.username?.message}
            value={watchedValues.username}
            autoComplete="username"
            autoFocus={true}
          />

          <Select
            label="Account Role"
            name="role"
            icon="💼"
            options={ROLE_OPTIONS}
            register={register}
            error={errors.role?.message}
            value={watchedValues.role}
          />
        </div>

        <div className="step-two__password-section">
          <div className="form-row-2col">
            <Password
              label="Password"
              name="password"
              icon="🔒"
              register={register}
              error={errors.password?.message}
              value={watchedValues.password}
            />

            <Password
              label="Confirm Password"
              name="confirmPassword"
              icon="🔐"
              register={register}
              error={errors.confirmPassword?.message}
              value={watchedValues.confirmPassword}
            />
          </div>

          <PasswordChecklist password={watchedValues.password || ''} />
        </div>
      </FormLayout>
    </div>
  );
}
