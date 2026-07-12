import React, { useState } from "react";

export const Header = ({
  totalItems,
  totalCategories,
  averagePrice,
  onClearMenu,
  hasItems,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmYes = () => {
    onClearMenu();
    setShowConfirm(false);
  };

  const handleConfirmNo = () => {
    setShowConfirm(false);
  };

  return (
    <header className="dashboard-header" aria-label="Application Header">
      <div className="header-main">
        <div className="header-titles">
          <span className="header-subtitle">Digital Menu Management System</span>
          <h1 className="header-title">Food Truck Menu</h1>
          <p className="header-description">
            Manage, Search and Add Menu Items Efficiently
          </p>
        </div>

        {hasItems && (
          <div className="header-actions">
            {!showConfirm ? (
              <button
                type="button"
                className="btn-clear-menu"
                onClick={handleClearClick}
                aria-label="Clear all menu items"
              >
                Clear Menu
              </button>
            ) : (
              <div className="clear-confirm-box" role="alertdialog" aria-label="Confirm clear menu">
                <span className="confirm-text">Are you sure?</span>
                <div className="confirm-buttons">
                  <button
                    type="button"
                    className="btn-confirm-yes"
                    onClick={handleConfirmYes}
                    aria-label="Confirm yes clear menu"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn-confirm-no"
                    onClick={handleConfirmNo}
                    aria-label="Cancel clear menu"
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="header-stats" aria-label="Menu Statistics">
        <div className="stat-card">
          <span className="stat-label">Total Items</span>
          <span className="stat-value">{totalItems}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Categories</span>
          <span className="stat-value">{totalCategories}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Average Price</span>
          <span className="stat-value">₹{averagePrice}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
