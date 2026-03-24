import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import OfferPage from './pages/OfferPage';
import { useLanguage } from './i18n/LanguageContext';

// Wrapper dla stron z obsługą języka w URL
function LocalizedHomePage({ isDarkMode }) {
  const { lang } = useParams();
  const { setLanguage } = useLanguage();
  
  useEffect(() => {
    if (lang && (lang === 'pl' || lang === 'en')) {
      setLanguage(lang);
    }
  }, [lang, setLanguage]);
  
  return <HomePage isDarkMode={isDarkMode} />;
}

function LocalizedOfferPage({ isDarkMode }) {
  const { lang, offerId } = useParams();
  const { setLanguage } = useLanguage();
  
  useEffect(() => {
    if (lang && (lang === 'pl' || lang === 'en')) {
      setLanguage(lang);
    }
  }, [lang, setLanguage]);
  
  return <OfferPage isDarkMode={isDarkMode} offerId={offerId} />;
}

// Przekierowanie z głównej ścieżki na odpowiedni język
function RootRedirect() {
  const { language } = useLanguage();
  return <Navigate to={`/${language}/`} replace />;
}

function App() {
  const { language } = useLanguage();
  
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

  // Aktualizuj URL gdy zmienia się język
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const langMatch = currentPath.match(/^\/(pl|en)(\/|$)/);
      
      if (langMatch && langMatch[1] !== language) {
        const newPath = currentPath.replace(/^\/(pl|en)/, `/${language}`);
        window.history.replaceState(null, '', newPath);
      }
    }
  }, [language]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'}`}>
        <Header
          isDarkMode={isDarkMode}
          onThemeChange={setIsDarkMode}
        />
        <Routes>
          {/* Przekierowanie z głównej ścieżki */}
          <Route path="/" element={<RootRedirect />} />
          
          {/* Ścieżki z językiem */}
          <Route path="/:lang/" element={<LocalizedHomePage isDarkMode={isDarkMode} />} />
          <Route path="/:lang/oferta/:offerId" element={<LocalizedOfferPage isDarkMode={isDarkMode} />} />
          
          {/* Przekierowanie starych linków */}
          <Route path="/oferta/:offerId" element={<Navigate to={`/${language}/oferta/:offerId`} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
