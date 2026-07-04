import React from "react";

/**
 * Clean monochrome SVG icons (Lucide React style) automatically mapped by Category.
 */
export const CategoryIcon = ({ category = "", className = "", size = 22 }) => {
  const normalized = category.trim().toLowerCase();

  const renderIconPath = () => {
    switch (normalized) {
      case "fast food":
        // Burger icon
        return (
          <>
            <path d="M4 15h16M4 11h16M6 11V8a6 6 0 0 1 12 0v3M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
          </>
        );
      case "pizza":
        // Pizza icon
        return (
          <>
            <path d="M15 11h.01M11 15h.01M16 16h.01M2 16l20 6-6-20A20 20 0 0 0 2 16" />
          </>
        );
      case "drinks":
        // Cup icon
        return (
          <>
            <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
            <line x1="6" y1="2" x2="6" y2="4" />
            <line x1="10" y1="2" x2="10" y2="4" />
            <line x1="14" y1="2" x2="14" y2="4" />
          </>
        );
      case "coffee":
        // Coffee icon
        return (
          <>
            <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
            <path d="M6 2v2M10 2v2M14 2v2" />
          </>
        );
      case "desserts":
        // Cake icon
        return (
          <>
            <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1M2 21h20M7 8v2M12 8v2M17 8v2M7 4h0.01M12 4h0.01M17 4h0.01" />
          </>
        );
      case "ice cream":
        // Ice Cream icon
        return (
          <>
            <path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11M17 7A5 5 0 0 0 7 7" />
          </>
        );
      case "snacks":
        // Fries icon
        return (
          <>
            <path d="M4 12h16a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2a1 1 0 0 1 1-1Z" />
            <path d="M6 12V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8M11 12V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v9M15 12V5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7" />
          </>
        );
      case "salads":
        // Leaf icon
        return (
          <>
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </>
        );
      case "seafood":
        // Fish icon
        return (
          <>
            <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
            <path d="M18 12v.01M11.5 12c-1-2.5-3-4-5.5-4-3 0-4 3-4 4s1 4 4 4c2.5 0 4.5-1.5 5.5-4Z" />
          </>
        );
      default:
        // Utensils icon
        return (
          <>
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
          </>
        );
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`category-icon ${className}`}
      aria-hidden="true"
    >
      {renderIconPath()}
    </svg>
  );
};

export default CategoryIcon;
