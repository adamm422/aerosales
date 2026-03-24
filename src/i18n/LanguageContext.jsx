import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, currencyRates, currencySymbols } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Odczytaj zapisany język lub użyj domyślnego
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aerosales-language');
      if (saved) return saved;
      // Sprawdź ścieżkę URL
      const path = window.location.pathname;
      if (path.startsWith('/en/') || path === '/en') return 'en';
    }
    return 'pl';
  });

  const [currency, setCurrency] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aerosales-currency');
      if (saved) return saved;
    }
    return 'PLN';
  });

  // Zapisuj w localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem('aerosales-language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('aerosales-currency', currency);
  }, [currency]);

  // Funkcja tłumacząca
  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }, [language]);

  // Funkcja konwertująca cenę
  const convertPrice = useCallback((priceInPLN) => {
    const rate = currencyRates[currency] || 1;
    return Math.round(priceInPLN * rate);
  }, [currency]);

  // Funkcja formatująca cenę z symbolem waluty
  const formatPrice = useCallback((priceInPLN) => {
    const converted = convertPrice(priceInPLN);
    const symbol = currencySymbols[currency] || currency;
    if (currency === 'PLN') {
      return `${converted} ${symbol}`;
    }
    return `${symbol}${converted}`;
  }, [currency, convertPrice]);

  // Funkcja parsująca cenę ze stringa
  const parsePrice = useCallback((priceStr) => {
    const match = priceStr.match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 0;
  }, []);

  // Funkcja konwertująca i formatująca cenę ze stringa
  const convertAndFormatPrice = useCallback((priceStr) => {
    const priceInPLN = parsePrice(priceStr);
    return formatPrice(priceInPLN);
  }, [parsePrice, formatPrice]);

  // Tłumaczenie daty na angielski
  const translateDate = useCallback((dateStr) => {
    if (language === 'pl') return dateStr;
    
    const monthTranslations = translations.en.months;
    let translated = dateStr;
    
    for (const [plMonth, enMonth] of Object.entries(monthTranslations)) {
      translated = translated.replace(new RegExp(plMonth, 'gi'), enMonth);
    }
    
    return translated;
  }, [language]);

  const value = {
    language,
    setLanguage,
    currency,
    setCurrency,
    t,
    convertPrice,
    formatPrice,
    parsePrice,
    convertAndFormatPrice,
    translateDate,
    currencyRates,
    currencySymbols
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
