import React from "react";

export const SearchBar = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  categories = [
    "All",
    "Fast Food",
    "Pizza",
    "Drinks",
    "Coffee",
    "Desserts",
    "Ice Cream",
    "Snacks",
    "Salads",
    "Seafood",
  ],
}) => {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <section className="search-filter-section" aria-label="Search and filter menu">
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            type="search"
            className="search-input"
            placeholder="Search menu items by name or category..."
            value={search}
            onChange={handleSearchChange}
            aria-label="Search menu items"
          />
          {search && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearch("")}
              aria-label="Clear search query"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="category-filters" role="group" aria-label="Filter by category">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
            aria-label={`Filter by ${category}`}
            aria-pressed={selectedCategory === category}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SearchBar;
