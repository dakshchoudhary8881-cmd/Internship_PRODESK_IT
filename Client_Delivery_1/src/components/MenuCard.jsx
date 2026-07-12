import React from "react";
import CategoryIcon from "./CategoryIcon";

export const MenuCard = ({ item }) => {
  const { name, category, price } = item;
  const formattedPrice = typeof price === "number" ? price.toFixed(2) : Number(price || 0).toFixed(2);

  return (
    <article className="menu-card" aria-label={`Menu item: ${name}`}>
      <div className="card-top">
        <span className="card-badge">{category}</span>
      </div>
      <div className="card-body">
        <div className="card-title-wrapper">
          <CategoryIcon category={category} className="card-title-icon" size={22} />
          <h3 className="card-title">{name}</h3>
        </div>
      </div>
      <div className="card-footer">
        <span className="card-price-label">Price</span>
        <span className="card-price">₹{formattedPrice}</span>
      </div>
    </article>
  );
};

export default MenuCard;
