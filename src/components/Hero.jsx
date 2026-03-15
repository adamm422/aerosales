import { Mail } from 'lucide-react';
import { motion } from 'motion/react';

function Hero({ isDarkMode }) {
  return (
    <section
      className="w-full h-[58vh] min-h-[460px] max-h-[540px] relative flex items-center justify-center"
      style={{
        backgroundImage: 'url(/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="text-center px-4 relative z-10">
        <motion.h1
          className="text-3xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          Znajdziemy dla Ciebie wymarzoną wycieczkę
        </motion.h1>
        <motion.p
          className="text-lg text-white/90 mb-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          Lot + hotel + atrakcje - szukamy kompletnych wycieczek zupełnie za darmo.
          Powiedz nam dokąd i kiedy chcesz jechać, a my znajdziemy najlepszą ofertę.
        </motion.p>
        <a
          href="mailto:kontakt@aerosales.pl"
          className="relative inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg group hover:scale-105 active:scale-95"
          style={{ transition: 'none' }}
        >
          {/* Glow effect behind */}
          <span
            className="absolute inset-0 rounded-lg blur-md scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-110"
            style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 123, 255, 0.3)' }}
          />
          {/* Background */}
          <span className={`absolute inset-0 rounded-lg ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`} />
          {/* Content */}
          <span className={`relative z-10 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#007bff]'}`}>
            <Mail size={20} />
            Napisz do nas
          </span>
        </a>
      </div>
    </section>
  );
}

export default Hero;
