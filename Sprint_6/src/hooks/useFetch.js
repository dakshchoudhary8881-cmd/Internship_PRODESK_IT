import { useState, useEffect, useCallback } from 'react';

/**
 * Reusable custom hook for fetching data from an API or async function
 * @param {Function|string} fetcherOrUrl - Async fetch function or URL string
 * @param {Array} dependencies - React useEffect dependency array
 * @param {boolean} immediate - Whether to fetch immediately on mount
 */
export const useFetch = (fetcherOrUrl, dependencies = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (typeof fetcherOrUrl === 'function') {
        result = await fetcherOrUrl(...args);
      } else if (typeof fetcherOrUrl === 'string') {
        const res = await fetch(fetcherOrUrl);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        result = await res.json();
      }
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
  }, [fetcherOrUrl]);

  useEffect(() => {
    if (immediate) {
      executeFetch();
    }
  }, [...dependencies, immediate]);

  return { data, loading, error, refetch: executeFetch };
};

export default useFetch;
