import React from "react";

export const EmptyState = ({
  message = "No data found",
  description = "We couldn't find any menu items matching your criteria. Try adjusting your search or category filter.",
}) => {
  return (
    <div className="empty-state-container" role="region" aria-label="Empty state">
      <div className="empty-state-icon">
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          <path d="M9 17v-2m3 2v-4m3 4v-6" />
          <path d="M3 9h18" />
          <line x1="8" y1="13" x2="16" y2="13" strokeDasharray="2 2" />
        </svg>
      </div>
      <h3 className="empty-state-title">{message}</h3>
      <p className="empty-state-description">{description}</p>
    </div>
  );
};

export default EmptyState;
