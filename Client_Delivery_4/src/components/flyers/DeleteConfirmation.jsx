import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, flyerName, isLoading = false }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete frequent flyer member?">
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <p>
          Are you sure you want to remove <strong>{flyerName}</strong>? This action cannot be undone.
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Spinner size="sm" />
              Deleting...
            </span>
          ) : (
            'Delete Member'
          )}
        </Button>
      </div>
    </Modal>

  );
};

export default DeleteConfirmation;
