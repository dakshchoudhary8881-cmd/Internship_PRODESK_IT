import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

/**
 * Protected Checkout Page Component supporting both Cart Checkout and Instant Buy Now
 */
const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const { user, addOrder } = useAuth();

  // Check if shopper initiated an Instant "Buy Now" flow for a single item
  const buyNowItem = location.state?.buyNowItem;

  // Determine active checkout items list and totals
  const displayItems = buyNowItem ? [buyNowItem] : cartItems;
  const displayTotalItems = buyNowItem ? buyNowItem.quantity : totalItems;
  const displayTotalPrice = buyNowItem ? (buyNowItem.price * buyNowItem.quantity) : totalPrice;

  // Delivery address starts completely empty as requested
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  // Comprehensive payment selection state
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Payment form fields
  const [upiDetails, setUpiDetails] = useState({
    app: 'gpay',
    upiId: ''
  });

  const [bankDetails, setBankDetails] = useState({
    bankName: 'HDFC',
    accountHolder: '',
    accountNumber: '',
    ifscCode: ''
  });

  const [cardDetails, setCardDetails] = useState({
    holderName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [processing, setProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const shippingCost = displayTotalPrice > 50 || displayTotalItems === 0 ? 0 : 9.99;
  const estimatedTax = displayTotalPrice * 0.08;
  const grandTotal = displayTotalPrice + shippingCost + estimatedTax;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (displayItems.length === 0) return;

    // Validate UPI ID if UPI selected
    if (paymentMethod === 'upi' && !upiDetails.upiId && upiDetails.app === 'custom') {
      alert('Please enter a valid Virtual Payment Address (UPI ID)');
      return;
    }

    setProcessing(true);
    // Simulate secure transaction confirmation delay
    setTimeout(() => {
      setProcessing(false);
      const randomOrderNum = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const newOrderRecord = {
        orderId: randomOrderNum,
        date: new Date().toLocaleDateString(),
        paymentType: paymentMethod.toUpperCase(),
        total: grandTotal.toFixed(2),
        status: 'In Dispatch Queue',
        items: displayItems
      };

      // Save order to customer history
      addOrder(newOrderRecord);

      setOrderSuccess({
        orderId: randomOrderNum,
        date: newOrderRecord.date,
        paymentType: newOrderRecord.paymentType,
        total: newOrderRecord.total,
        isBuyNow: !!buyNowItem
      });

      // Only clear global cart if checking out from the full shopping cart
      if (!buyNowItem) {
        clearCart();
      }
    }, 1500);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 6rem' }}>
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Secure Checkout</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Logged in as <strong style={{ color: 'var(--text-main)' }}>{user?.name || 'Guest User'}</strong> ({user?.email || 'guest@aurora.store'})
          </p>
        </div>

        {/* Mode indicator badge */}
        <div style={{ background: buyNowItem ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-subtle)', border: `1px solid ${buyNowItem ? 'var(--warning)' : 'var(--border-color)'}`, padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.2rem' }}>{buyNowItem ? '⚡' : '🛒'}</span>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: buyNowItem ? 'var(--warning)' : 'var(--text-main)' }}>
            {buyNowItem ? 'Instant Buy Now Order' : `Full Cart Checkout (${totalItems} items)`}
          </span>
          {buyNowItem && totalItems > 0 && (
            <button
              type="button"
              onClick={() => navigate('/checkout', { replace: true })}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 700, fontSize: '0.825rem', cursor: 'pointer', textDecoration: 'underline', marginLeft: '0.4rem' }}
            >
              Switch to Cart ({totalItems})
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="checkout-layout">
        {/* Left: Shipping & Payment Details */}
        <div>
          {/* Section 1: Delivery Address Form (Unfilled by default) */}
          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📍</span> Delivery Address
            </h3>

            <div className="form-group">
              <label className="form-label">Recipient Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-input"
                value={shippingAddress.fullName}
                onChange={handleAddressChange}
                placeholder="Enter recipient's full name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Street Address / Flat / House No.</label>
              <input
                type="text"
                name="street"
                className="form-input"
                value={shippingAddress.street}
                onChange={handleAddressChange}
                placeholder="House/Apartment No., Building, Street Name, Landmark"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">City / District</label>
                <input
                  type="text"
                  name="city"
                  className="form-input"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  placeholder="e.g. Mumbai, New York"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">State / Province</label>
                <input
                  type="text"
                  name="state"
                  className="form-input"
                  value={shippingAddress.state}
                  onChange={handleAddressChange}
                  placeholder="State"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">PIN / Postal Code</label>
                <input
                  type="text"
                  name="zip"
                  className="form-input"
                  value={shippingAddress.zip}
                  onChange={handleAddressChange}
                  placeholder="PIN Code"
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Mobile Number (For Delivery OTP & Updates)</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                value={shippingAddress.phone}
                onChange={handleAddressChange}
                placeholder="10-digit phone number"
                required
              />
            </div>
          </div>

          {/* Section 2: Comprehensive Payment Options */}
          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>💳</span> Payment Option
            </h3>

            {/* Payment Mode Selector Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.85rem', marginBottom: '1.75rem' }}>
              {[
                { id: 'upi', label: 'UPI / QR', icon: '⚡' },
                { id: 'netbanking', label: 'Net Banking / A/c', icon: '🏛️' },
                { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                { id: 'cod', label: 'Cash on Delivery', icon: '💵' }
              ].map(method => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  style={{
                    padding: '1rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${paymentMethod === method.id ? 'var(--primary)' : 'var(--border-color)'}`,
                    background: paymentMethod === method.id ? 'var(--primary-light)' : 'var(--bg-subtle)',
                    color: paymentMethod === method.id ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.925rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.3rem' }}>{method.icon}</div>
                  <div>{method.label}</div>
                </button>
              ))}
            </div>

            {/* 1. UPI / QR Option Details */}
            {paymentMethod === 'upi' && (
              <div style={{ background: 'var(--bg-subtle)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                  Select UPI App or Enter VPA ID
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  {[
                    { id: 'gpay', label: 'Google Pay', icon: '🔵' },
                    { id: 'phonepe', label: 'PhonePe', icon: '🟣' },
                    { id: 'paytm', label: 'Paytm', icon: '🔷' },
                    { id: 'custom', label: 'UPI ID', icon: '🆔' }
                  ].map(app => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setUpiDetails(prev => ({ ...prev, app: app.id }))}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        border: `1.5px solid ${upiDetails.app === app.id ? 'var(--primary)' : 'var(--border-color)'}`,
                        background: upiDetails.app === app.id ? 'var(--bg-surface)' : 'transparent',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        color: upiDetails.app === app.id ? 'var(--primary)' : 'var(--text-main)'
                      }}
                    >
                      <div>{app.icon}</div>
                      <div style={{ marginTop: '0.2rem' }}>{app.label}</div>
                    </button>
                  ))}
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Virtual Payment Address (UPI ID)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={upiDetails.upiId}
                    onChange={(e) => setUpiDetails({ ...upiDetails, upiId: e.target.value })}
                    placeholder="e.g. username@okaxis / mobile@ybl / name@icici"
                    required={upiDetails.app === 'custom'}
                  />
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '0.4rem' }}>
                    🔒 A payment request will be sent to your UPI App upon placing order.
                  </p>
                </div>
              </div>
            )}

            {/* 2. Bank Account / Net Banking Details */}
            {paymentMethod === 'netbanking' && (
              <div style={{ background: 'var(--bg-subtle)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                  Select Preferred Bank
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  {[
                    { id: 'HDFC', label: 'HDFC Bank' },
                    { id: 'ICICI', label: 'ICICI Bank' },
                    { id: 'SBI', label: 'State Bank (SBI)' },
                    { id: 'AXIS', label: 'Axis Bank' },
                    { id: 'KOTAK', label: 'Kotak Bank' },
                    { id: 'DIRECT', label: 'Direct A/c Transfer' }
                  ].map(bank => (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => setBankDetails(prev => ({ ...prev, bankName: bank.id }))}
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        border: `1.5px solid ${bankDetails.bankName === bank.id ? 'var(--primary)' : 'var(--border-color)'}`,
                        background: bankDetails.bankName === bank.id ? 'var(--bg-surface)' : 'transparent',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        color: bankDetails.bankName === bank.id ? 'var(--primary)' : 'var(--text-main)'
                      }}
                    >
                      {bank.label}
                    </button>
                  ))}
                </div>

                {bankDetails.bankName === 'DIRECT' ? (
                  <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Account Holder Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter full account holder name"
                        value={bankDetails.accountHolder}
                        onChange={(e) => setBankDetails({ ...bankDetails, accountHolder: e.target.value })}
                        required={paymentMethod === 'netbanking' && bankDetails.bankName === 'DIRECT'}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: 0 }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Account Number</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. 50100482938190"
                          value={bankDetails.accountNumber}
                          onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                          required={paymentMethod === 'netbanking' && bankDetails.bankName === 'DIRECT'}
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">IFSC Code</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. HDFC0001234"
                          value={bankDetails.ifscCode}
                          onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                          required={paymentMethod === 'netbanking' && bankDetails.bankName === 'DIRECT'}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                    ℹ️ You will be redirected to the secure <strong>{bankDetails.bankName} Bank</strong> portal after confirming your order.
                  </p>
                )}
              </div>
            )}

            {/* 3. Credit / Debit Card Details */}
            {paymentMethod === 'card' && (
              <div style={{ background: 'var(--bg-subtle)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <div className="form-group">
                  <label className="form-label">Cardholder Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Name exactly as printed on card"
                    value={cardDetails.holderName}
                    onChange={(e) => setCardDetails({ ...cardDetails, holderName: e.target.value })}
                    required={paymentMethod === 'card'}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="4532 •••• •••• ••••"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    required={paymentMethod === 'card'}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: 0 }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      required={paymentMethod === 'card'}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">CVV Security Code</label>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="•••"
                      maxLength={4}
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      required={paymentMethod === 'card'}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. Cash on Delivery */}
            {paymentMethod === 'cod' && (
              <div style={{ background: 'var(--bg-subtle)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>🤝</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Cash / UPI on Delivery Available</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                    Pay cash or scan courier partner's QR code when the package arrives at your doorstep.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="cart-summary">
          <h3 className="summary-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Order Summary</span>
            <span style={{ fontSize: '0.78rem', background: 'var(--bg-subtle)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', fontWeight: 600 }}>
              {buyNowItem ? '1 Item (Buy Now)' : `${totalItems} Items`}
            </span>
          </h3>

          <div style={{ maxHeight: '260px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
            {displayItems.map((item, idx) => (
              <div key={item.id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', fontSize: '0.925rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                  <img src={item.thumbnail} alt="" style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'contain', background: 'var(--bg-subtle)' }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px', fontWeight: 600 }}>
                    {item.title} × {item.quantity}
                  </span>
                </div>
                <span style={{ fontWeight: 700 }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Subtotal ({displayTotalItems} items)</span>
            <span>${displayTotalPrice.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Tax</span>
            <span>${estimatedTax.toFixed(2)}</span>
          </div>

          <div className="summary-row total">
            <span>Grand Total</span>
            <span style={{ color: 'var(--primary)' }}>${grandTotal.toFixed(2)}</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            style={{ width: '100%', marginTop: '1.5rem' }}
            loading={processing}
            disabled={displayItems.length === 0}
          >
            Place Order (${grandTotal.toFixed(2)})
          </Button>

          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '1rem' }}>
            🔒 100% Risk-Free Checkout. Guaranteed Satisfaction.
          </p>
        </div>
      </form>

      {/* Confirmation Popup Modal */}
      {orderSuccess && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(34, 197, 94, 0.15)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                margin: '0 auto 1.5rem'
              }}
            >
              🎉
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Order Placed Successfully!
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Thank you for your purchase, <strong style={{ color: 'var(--text-main)' }}>{shippingAddress.fullName || user?.name}</strong>! Your order has been confirmed.
            </p>

            <div style={{ background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                <strong style={{ color: 'var(--primary)' }}>{orderSuccess.orderId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order Type:</span>
                <strong>{orderSuccess.isBuyNow ? '⚡ Buy Now Order' : '🛒 Cart Order'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Mode:</span>
                <strong>{orderSuccess.paymentType}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order Date:</span>
                <strong>{orderSuccess.date}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Amount Paid:</span>
                <strong>${orderSuccess.total}</strong>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              style={{ width: '100%' }}
              onClick={() => navigate('/')}
            >
              Back To Home Page
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
