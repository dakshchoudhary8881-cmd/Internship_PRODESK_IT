import React from "react";
import MenuCard from "./MenuCard";
import EmptyState from "./EmptyState";

export const Menu = ({ items, isMenuEmpty }) => {
  if (!items || items.length === 0) {
    if (isMenuEmpty) {
      return (
        <EmptyState
          message="No menu items available."
          description="Add your first menu item to begin managing the food truck menu."
        />
      );
    }
    return (
      <EmptyState
        message="No data found"
        description="We couldn't find any menu items matching your criteria. Try adjusting your search or category filter."
      />
    );
  }

  return (
    <section className="menu-grid-section" aria-label="Menu Items Grid">
      <div className="menu-grid">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Menu;
