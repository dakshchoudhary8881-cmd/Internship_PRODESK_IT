import React from 'react';
import Modal from '../ui/Modal';

const FlyerDetails = ({ flyer, isOpen, onClose }) => {
  if (!flyer) return null;

  const rowStyle = {
    display: 'flex',
    borderBottom: '1px solid var(--color-border)',
    padding: 'var(--space-2) 0',
  };

  const labelStyle = {
    width: '150px',
    fontWeight: '600',
    color: 'var(--color-dark-gray)',
    flexShrink: 0,
  };

  const valueStyle = {
    color: 'var(--color-black)',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Member Details">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={rowStyle}>
          <span style={labelStyle}>Member ID</span>
          <span style={valueStyle}>{flyer.id}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Full Name</span>
          <span style={valueStyle}>{flyer.firstName} {flyer.lastName}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Email</span>
          <span style={valueStyle}>{flyer.email}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Phone</span>
          <span style={valueStyle}>{flyer.phone || 'N/A'}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Date of Birth</span>
          <span style={valueStyle}>{flyer.dateOfBirth || 'N/A'}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Tier</span>
          <span style={valueStyle}>
            <span className={`badge ${flyer.tier === 'Platinum' || flyer.tier === 'Gold' ? 'active' : ''}`} style={
              flyer.tier === 'Standard' ? { backgroundColor: 'var(--color-light-gray)', color: 'var(--color-black)' } :
              flyer.tier === 'Silver' ? { backgroundColor: '#e0e0e0', color: 'var(--color-black)' } :
              flyer.tier === 'Gold' ? { backgroundColor: '#ffd700', color: 'var(--color-black)' } :
              { backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }
            }>
              {flyer.tier}
            </span>
          </span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Points</span>
          <span style={valueStyle}>{Number(flyer.points).toLocaleString()}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Status</span>
          <span style={valueStyle}>
            <span className={`badge ${flyer.status === 'Active' ? 'active' : 'inactive'}`}>
              {flyer.status}
            </span>
          </span>
        </div>
        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <span style={labelStyle}>Joined Date</span>
          <span style={valueStyle}>{flyer.joinedDate}</span>
        </div>
      </div>
    </Modal>
  );
};

export default FlyerDetails;
