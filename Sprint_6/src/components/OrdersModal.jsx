import React from 'react';
import ReactDOM from 'react-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

/**
 * My Orders History Popup Modal Component rendered via Portal
 */
const OrdersModal = ({ isOpen, onClose }) => {
  const { orders } = useAuth();

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 99999 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '640px',
          width: '90%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          position: 'relative',
          margin: 'auto',
          textAlign: 'left'
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            width: '34px',
            height: '34px',
            borderRadius: 'var(--radius-full)',
            fontSize: '1.1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)'
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <span style={{ fontSize: '1.8rem' }}>📦</span>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Your Orders History</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>View live dispatch and past delivery records</p>
          </div>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📭</div>
              <p>You haven't placed any orders yet.</p>
            </div>
          ) : (
            orders.map((order, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <strong style={{ color: 'var(--primary)', fontSize: '1.05rem', display: 'block' }}>
                      Order #{order.orderId}
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Ordered on {order.date} • Paid via {order.paymentType || 'Card'}
                    </span>
                  </div>

                  <span
                    style={{
                      background: order.status === 'Delivered' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                      color: order.status === 'Delivered' ? 'var(--success)' : 'var(--primary)',
                      padding: '0.35rem 0.8rem',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 700,
                      fontSize: '0.8rem'
                    }}
                  >
                    {order.status || 'In Dispatch Queue'}
                  </span>
                </div>

                {/* Ordered Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px dashed var(--border-color)', paddingTop: '0.85rem', marginBottom: '0.85rem' }}>
                  {order.items?.map((item, itemIdx) => (
                    <div key={itemIdx} style={{ display: 'flex', alignItems: 'center', justifyItems: 'space-between', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        {item.thumbnail && (
                          <img src={item.thumbnail} alt="" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'contain', background: 'var(--bg-surface)' }} />
                        )}
                        <span style={{ fontWeight: 600 }}>{item.title}</span>
                      </div>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', fontWeight: 700 }}>
                  <span>Total Amount Paid</span>
                  <span style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>${order.total}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Button variant="secondary" style={{ width: '100%' }} onClick={onClose}>
            Close History
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default OrdersModal;
