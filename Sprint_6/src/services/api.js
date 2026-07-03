const BASE_URL = 'https://dummyjson.com';

/**
 * Fetch all products with pagination support
 */
export const fetchProducts = async (limit = 30, skip = 0) => {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
};

/**
 * Fetch a single product by its ID
 */
export const fetchProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product details for ID ${id}`);
  }
  return response.json();
};

/**
 * Fetch list of all product category names/objects
 */
export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch product categories');
  }
  return response.json();
};

/**
 * Fetch products filtered by category slug
 */
export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/products/category/${category}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products for category: ${category}`);
  }
  return response.json();
};

/**
 * Search products by search keyword query
 */
export const searchProducts = async (query) => {
  const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to search products');
  }
  return response.json();
};
