import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SortBar from './components/SortBar';
import OffersGrid from './components/OffersGrid';
import GradientText from './components/GradientText';
import { motion } from 'motion/react';

function App() {
  // Detekcja systemowego motywu
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  // Nasłuchiwanie zmian motywu systemowego
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'}`}>
      <Header
        isDarkMode={isDarkMode}
        onThemeChange={setIsDarkMode}
      />
      <Hero isDarkMode={isDarkMode} />
      
      {/* Biały box nachodzący na Hero */}
      <motion.div
        className="max-w-7xl mx-auto px-4 -mt-28 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={`${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'} rounded-2xl shadow-lg p-6`}>
          <div className="mb-4">
            <GradientText
              colors={isDarkMode ? ["#ffffff", "#4f034c", "#B19EEF", "#ffffff"] : ["#000000", "#4f034c", "#B19EEF", "#000000"]}
              animationSpeed={8}
              showBorder={false}
              className="text-3xl md:text-4xl font-bold"
            >
              Okazje lotnicze
            </GradientText>
          </div>
          <SortBar isDarkMode={isDarkMode} />
          <OffersGrid isDarkMode={isDarkMode} />
        </div>
      </motion.div>
      
      {/* Dodatkowe padding na dole */}
      <div className="h-8"></div>
    </div>
  );
}

export default App;
