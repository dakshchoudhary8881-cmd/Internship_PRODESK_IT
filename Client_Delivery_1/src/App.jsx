import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Menu from "./components/Menu";
import AddMenuForm from "./components/AddMenuForm";
import Loader from "./components/Loader";
import "./App.css";

export function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const totalItems = menuItems.length;
  const categoriesSet = new Set(menuItems.map((item) => item.category));
  const totalCategories = categoriesSet.size;
  const averagePrice =
    totalItems > 0
      ? (menuItems.reduce((sum, item) => sum + item.price, 0) / totalItems).toFixed(2)
      : "0.00";

  const handleAddItem = (newItem) => {
    setMenuItems((prevItems) => [...prevItems, newItem]);
  };

  const handleClearMenu = () => {
    setMenuItems([]);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      search.trim() === "" ||
      item.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      item.category.toLowerCase().includes(search.trim().toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app-container">
      <Header
        totalItems={totalItems}
        totalCategories={totalCategories}
        averagePrice={averagePrice}
        onClearMenu={handleClearMenu}
        hasItems={totalItems > 0}
      />

      <main className="main-content">
        <AddMenuForm onAddItem={handleAddItem} existingItems={menuItems} />

        <SearchBar
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <Menu items={filteredItems} isMenuEmpty={menuItems.length === 0} />
        )}
      </main>

      <footer className="dashboard-footer" aria-label="Application Footer">
        <p>&copy; {new Date().getFullYear()} Food Truck Menu Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
