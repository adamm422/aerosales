import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import OfferPage from './pages/OfferPage';

function App() {
  // Odczytaj zapisany motyw lub użyj systemowego
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aerosales-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  // Zapisuj motyw przy każdej zmianie + sync z DOM
  useEffect(() => {
    localStorage.setItem('aerosales-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.style.backgroundColor = isDarkMode ? '#0a0a0a' : '#f5f5f5';
    document.body.style.backgroundColor = isDarkMode ? '#0a0a0a' : '#f5f5f5';
  }, [isDarkMode]);

  // Nasłuchiwanie zmian motywu systemowego (tylko jeśli nie ma zapisanego)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const saved = localStorage.getItem('aerosales-theme');
      if (!saved) setIsDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'}`}>
        <Header
          isDarkMode={isDarkMode}
          onThemeChange={setIsDarkMode}
        />
        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
          <Route path="/oferta/:offerId" element={<OfferPage isDarkMode={isDarkMode} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
