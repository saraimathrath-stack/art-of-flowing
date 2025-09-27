export function saveToLocalStorage<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.warn("localStorage quota exceeded for key:", key);
      // Try to clear some space by removing old entries
      try {
        // Remove some old entries to make space
        const keys = Object.keys(window.localStorage);
        const oldKeys = keys.filter(k => k.includes('old-') || k.includes('temp-') || k.includes('cache-'));
        oldKeys.slice(0, 5).forEach(k => window.localStorage.removeItem(k));
        
        // Try again
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (retryError) {
        console.error("Failed to save to localStorage even after cleanup:", retryError);
        alert("Storage is full. Please clear some data or try a smaller image.");
      }
    } else {
      console.error("Failed to save to localStorage:", error);
    }
  }
}

export function loadFromLocalStorage<T>(key: string, fallback: T): T {
  const data = window.localStorage.getItem(key);
  if (!data) return fallback;
  try {
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

export function checkLocalStorageHealth(): boolean {
  try {
    // Test if localStorage is accessible and working
    const testKey = '__localStorage_test__';
    const testValue = 'test';
    window.localStorage.setItem(testKey, testValue);
    const retrieved = window.localStorage.getItem(testKey);
    window.localStorage.removeItem(testKey);
    return retrieved === testValue;
  } catch (error) {
    console.error('LocalStorage health check failed:', error);
    return false;
  }
}

export function getLocalStorageUsage(): { used: number; total: number; percentage: number } {
  try {
    let used = 0;
    for (let key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        used += window.localStorage[key].length + key.length;
      }
    }
    
    // Most browsers have a 5-10MB limit, we'll assume 5MB for calculation
    const total = 5 * 1024 * 1024; // 5MB in bytes
    const percentage = (used / total) * 100;
    
    return { used, total, percentage };
  } catch (error) {
    console.error('Error calculating localStorage usage:', error);
    return { used: 0, total: 0, percentage: 0 };
  }
}