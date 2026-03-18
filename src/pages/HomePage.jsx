import Hero from '../components/Hero';
import SortBar from '../components/SortBar';
import OffersGrid from '../components/OffersGrid';
import GradientText from '../components/GradientText';
import { motion } from 'motion/react';

function HomePage({ isDarkMode }) {
  return (
    <>
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
    </>
  );
}

export default HomePage;