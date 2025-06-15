"use client";

import { useState, useEffect } from "react";

interface IconCache {
  [key: string]: {
    url: string;
    timestamp: number;
    error?: boolean;
  };
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const CACHE_KEY = "website_icon_cache";

export function useIconCache() {
  const [cache, setCache] = useState<IconCache>({});

  useEffect(() => {
    // Load cache from localStorage
    try {
      const savedCache = localStorage.getItem(CACHE_KEY);
      if (savedCache) {
        const parsedCache = JSON.parse(savedCache);
        // Clean expired entries
        const now = Date.now();
        const cleanCache = Object.entries(parsedCache).reduce(
          (acc, [key, value]) => {
            if (
              typeof value === "object" &&
              value !== null &&
              "timestamp" in value
            ) {
              const entry = value as IconCache[string];
              if (now - entry.timestamp < CACHE_DURATION) {
                acc[key] = entry;
              }
            }
            return acc;
          },
          {} as IconCache
        );
        setCache(cleanCache);
      }
    } catch (error) {
      console.error("Error loading icon cache:", error);
    }
  }, []);

  const getCachedIcon = (key: string): string | null => {
    const entry = cache[key];
    if (
      entry &&
      !entry.error &&
      Date.now() - entry.timestamp < CACHE_DURATION
    ) {
      return entry.url;
    }
    return null;
  };

  const setCachedIcon = (key: string, url: string, error = false) => {
    const newEntry = {
      url,
      timestamp: Date.now(),
      error,
    };

    const newCache = { ...cache, [key]: newEntry };
    setCache(newCache);

    // Save to localStorage
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(newCache));
    } catch (error) {
      console.error("Error saving icon cache:", error);
    }
  };

  const clearCache = () => {
    setCache({});
    localStorage.removeItem(CACHE_KEY);
  };

  return {
    getCachedIcon,
    setCachedIcon,
    clearCache,
  };
}
