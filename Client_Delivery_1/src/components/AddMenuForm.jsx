import React, { useState, useRef } from "react";
import { sanitizeInput } from "../utils/sanitizeInput";

export const AddMenuForm = ({ onAddItem, existingItems = [] }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Fast Food");
  const [price, setPrice] = useState("");

  // Error and success states
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Ref for returning focus to first input
  const nameInputRef = useRef(null);

  const categories = [
    "Fast Food",
    "Pizza",
    "Drinks",
    "Coffee",
    "Desserts",
    "Ice Cream",
    "Snacks",
    "Salads",
    "Seafood",
  ];

  const validate = (cleanName, cleanPrice) => {
    const newErrors = {};

    // Check empty Food Name
    if (!cleanName) {
      newErrors.name = "Food Name is required.";
    } else {
      // Check duplicate (case insensitive)
      const isDuplicate = existingItems.some(
        (item) => item.name.toLowerCase() === cleanName.toLowerCase()
      );
      if (isDuplicate) {
        newErrors.name = `${cleanName} already exists.`;
      }
    }

    // Check Category
    if (!category || category.trim() === "") {
      newErrors.category = "Category is required.";
    }

    // Check Price
    if (cleanPrice === "" || cleanPrice === null || cleanPrice === undefined) {
      newErrors.price = "Price is required.";
    } else {
      const numericPrice = Number(cleanPrice);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        newErrors.price = "Price must be a positive number greater than 0.";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");

    // Sanitize inputs
    const cleanName = sanitizeInput(name);
    const cleanPrice = sanitizeInput(price.toString());
    const cleanCategory = sanitizeInput(category);

    // Validate
    const validationErrors = validate(cleanName, cleanPrice);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear previous errors
    setErrors({});

    // Create new item (icon is automatically determined by category in MenuCard)
    const newItem = {
      id: Date.now(),
      name: cleanName,
      category: cleanCategory || "Fast Food",
      price: Number(cleanPrice),
    };

    // Append item
    onAddItem(newItem);

    // Analytics Log
    console.log("[Analytics] User interacted with React Components");

    // Better Form UX: Clear inputs
    setName("");
    setCategory("Fast Food");
    setPrice("");

    // Show success message
    setSuccessMessage("Menu item added successfully.");

    // Return focus to first input
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }

    // Auto hide success message after 4 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  return (
    <section className="add-form-section" aria-label="Add new menu item">
      <div className="form-card">
        <h2 className="form-title">Add New Menu Item</h2>
        <p className="form-subtitle">Expand your digital dashboard by adding items directly to the menu.</p>

        {successMessage && (
          <div className="alert-success" role="status" aria-live="polite">
            ✅ {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate aria-label="Add menu form">
          <div className="form-grid">
            {/* Food Name */}
            <div className="form-group">
              <label htmlFor="food-name" className="form-label">
                Food Name *
              </label>
              <input
                id="food-name"
                ref={nameInputRef}
                type="text"
                className={`form-input ${errors.name ? "input-error" : ""}`}
                placeholder="e.g., Gourmet Cheeseburger"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                aria-label="Food Name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span id="name-error" className="error-message" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="food-category" className="form-label">
                Category *
              </label>
              <select
                id="food-category"
                className={`form-select ${errors.category ? "input-error" : ""}`}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (errors.category) setErrors({ ...errors, category: null });
                }}
                aria-label="Category"
                aria-invalid={!!errors.category}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="error-message" role="alert">
                  {errors.category}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="form-group">
              <label htmlFor="food-price" className="form-label">
                Price (₹) *
              </label>
              <input
                id="food-price"
                type="number"
                step="0.01"
                min="1"
                className={`form-input ${errors.price ? "input-error" : ""}`}
                placeholder="e.g., 150"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (errors.price) setErrors({ ...errors, price: null });
                }}
                aria-label="Price in Rupees"
                aria-invalid={!!errors.price}
                aria-describedby={errors.price ? "price-error" : undefined}
              />
              {errors.price && (
                <span id="price-error" className="error-message" role="alert">
                  {errors.price}
                </span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" aria-label="Submit new menu item">
              + Add Menu Item
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddMenuForm;
