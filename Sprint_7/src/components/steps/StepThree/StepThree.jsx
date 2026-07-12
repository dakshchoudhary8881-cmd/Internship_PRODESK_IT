import { useState } from 'react';
import Card from '../../common/Card/Card';
import Modal from '../../common/Modal/Modal';
import './StepThree.css';

export default function StepThree({ formData, onSubmit, isSubmitting = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const maskedPassword = formData.password ? '•'.repeat(Math.min(formData.password.length, 12)) : '';

  const handleConfirmSubmit = () => {
    setIsModalOpen(false);
    onSubmit();
  };

  return (
    <div className="step-three">
      <div className="step-three__header">
        <h2 className="step-three__title">Review & Confirm</h2>
        <p className="step-three__subtitle">Please verify your details before finalizing Vision registration</p>
      </div>

      <div className="step-three__cards">
        <Card hoverEffect={true} className="review-card">
          <div className="review-card__header">
            <span className="review-card__icon" aria-hidden="true">👤</span>
            <h3 className="review-card__title">Personal Information</h3>
          </div>
          <dl className="review-card__grid">
            <div className="review-card__item">
              <dt className="review-card__label">Full Name</dt>
              <dd className="review-card__value">{formData.name || '—'}</dd>
            </div>
            <div className="review-card__item">
              <dt className="review-card__label">Email Address</dt>
              <dd className="review-card__value">{formData.email || '—'}</dd>
            </div>
            <div className="review-card__item">
              <dt className="review-card__label">Phone Number</dt>
              <dd className="review-card__value">{formData.phone || '—'}</dd>
            </div>
            <div className="review-card__item">
              <dt className="review-card__label">Country</dt>
              <dd className="review-card__value">{formData.country || '—'}</dd>
            </div>
          </dl>
        </Card>

        <Card hoverEffect={true} className="review-card">
          <div className="review-card__header">
            <span className="review-card__icon" aria-hidden="true">🔒</span>
            <h3 className="review-card__title">Account Details</h3>
          </div>
          <dl className="review-card__grid">
            <div className="review-card__item">
              <dt className="review-card__label">Username</dt>
              <dd className="review-card__value">{formData.username || '—'}</dd>
            </div>
            <div className="review-card__item">
              <dt className="review-card__label">Password</dt>
              <dd className="review-card__value review-card__value--mono">{maskedPassword || '—'}</dd>
            </div>
            <div className="review-card__item">
              <dt className="review-card__label">Account Role</dt>
              <dd className="review-card__value">
                <span className="review-card__badge">{formData.role || '—'}</span>
              </dd>
            </div>
          </dl>
        </Card>
      </div>

      <div className="step-three__terms">
        <span className="step-three__terms-icon" aria-hidden="true">🛡️</span>
        <p className="step-three__terms-text">
          By clicking <strong>Submit Application</strong>, you confirm that these details are accurate and agree to our Vision Terms of Service & Privacy Policy.
        </p>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="Confirm Submission"
        confirmText="Confirm & Submit"
        cancelText="Review Again"
        isLoading={isSubmitting}
        confirmVariant="primary"
      >
        <p>
          You are about to create your Vision account as <strong>{formData.username}</strong> ({formData.email}).
        </p>
        <p style={{ marginTop: '12px' }}>
          Please confirm that all your details are correct. Once submitted, your Vision profile will be initialized.
        </p>
      </Modal>

      <button
        id="trigger-submit-modal"
        type="button"
        className="sr-only"
        onClick={() => setIsModalOpen(true)}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
