import React from 'react';

/**
 * Reusable Loader Component
 * Can render either a classic spinning circle or a product grid skeleton loader.
 */
const Loader = ({ text = 'Loading premium products...', skeleton = false, count = 6 }) => {
  if (skeleton) {
    return (
      <div className="products-grid">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="product-card"
            style={{ height: '420px', display: 'flex', flexDirection: 'column' }}
          >
            <div className="skeleton" style={{ width: '100%', height: '240px' }} />
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
              <div className="skeleton" style={{ width: '40%', height: '14px' }} />
              <div className="skeleton" style={{ width: '85%', height: '20px' }} />
              <div className="skeleton" style={{ width: '100%', height: '36px' }} />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto'
                }}
              >
                <div className="skeleton" style={{ width: '35%', height: '28px' }} />
                <div className="skeleton" style={{ width: '40%', height: '38px', borderRadius: '14px' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <div className="spinner" />
      {text && (
        <p style={{ marginTop: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default React.memo(Loader);
