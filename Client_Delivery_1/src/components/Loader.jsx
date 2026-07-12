import React from "react";

export const Loader = () => {
  const skeletons = Array.from({ length: 8 }, (_, index) => index);

  return (
    <div className="loader-container" aria-label="Loading menu items" role="status">
      <div className="skeleton-grid">
        {skeletons.map((item) => (
          <div key={item} className="skeleton-card">
            <div className="card-top">
              <div className="skeleton-badge"></div>
            </div>
            <div className="skeleton-content">
              <div className="skeleton-title-wrapper">
                <div className="skeleton-icon"></div>
                <div className="skeleton-title"></div>
              </div>
              <div className="skeleton-price"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
