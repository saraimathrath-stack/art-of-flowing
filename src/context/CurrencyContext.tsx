import React, { createContext, useContext, useEffect, useState } from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  formatCurrency: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  formatCurrency: () => ""
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<string>(loadFromLocalStorage("currency", "USD"));

  const formatCurrency = (amount: number) => {
    const currencySymbols: { [key: string]: string } = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥',
      'CAD': 'C$',
      'CNY': '¥'
    };
    const symbol = currencySymbols[currency] || '$';
    return `${symbol}${amount.toLocaleString()}`;
  };

  const handleSetCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
    saveToLocalStorage("currency", newCurrency);
  };

  // Listen for currency changes from other tabs/components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "currency" && e.newValue) {
        setCurrency(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency: handleSetCurrency,
      formatCurrency
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};
