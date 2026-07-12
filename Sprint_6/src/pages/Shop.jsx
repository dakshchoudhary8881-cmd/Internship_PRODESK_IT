import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

/**
 * Shop Page Component with full search, category filtering, and sorting
 */
const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters and sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    // Fetch all products and categories
    setLoading(true);
    setError(null);

    Promise.all([
      fetchProducts(100, 0),
      fetchCategories()
    ])
      .then(([prodData, catData]) => {
        setProducts(prodData.products || []);
        // dummyjson returns category objects or strings
        setCategories(catData || []);
      })
      .catch(err => {
        setError(err.message || 'Failed to fetch catalog.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Sync url param if changed externally
  useEffect(() => {
    const urlCat = searchParams.get('cat');
    if (urlCat && urlCat !== selectedCategory) {
      setSelectedCategory(urlCat);
    }
  }, [searchParams]);

  // Update URL params when category selector changes
  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setSelectedCategory(val);
    if (val === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', val);
    }
    setSearchParams(searchParams);
  };

  // Filter and Sort calculation using memoization
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter(item => {
        const catSlug = typeof selectedCategory === 'string' ? selectedCategory.toLowerCase() : '';
        return item.category?.toLowerCase() === catSlug;
      });
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(item =>
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.brand?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'discount') {
      list.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 6rem' }}>
      <div className="shop-header">
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Explore Our Catalog
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Browse over {products.length} premium products across multiple lifestyle categories.
        </p>
      </div>

      {/* Control Bar: Search, Category Filter, Sorting */}
      <div className="shop-controls">
        <div className="search-box">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search products by keyword, brand..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            aria-label="Filter by category"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((cat, idx) => {
              const slug = typeof cat === 'object' ? cat.slug : cat;
              const name = typeof cat === 'object' ? cat.name : cat;
              return (
                <option key={idx} value={slug}>
                  {name}
                </option>
              );
            })}
          </select>

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products"
          >
            <option value="default">Sort by: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated ★</option>
            <option value="discount">Best Discounts</option>
          </select>
        </div>
      </div>

      {/* Catalog Display Area */}
      {error && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--danger)' }}>Error Loading Catalog</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Retry Loading
          </button>
        </div>
      )}

      {loading ? (
        <Loader skeleton count={8} />
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>No matching products found</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Try adjusting your search filters or browse all categories.
          </p>
          <button
            className="btn btn-outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '1.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
          </div>
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
