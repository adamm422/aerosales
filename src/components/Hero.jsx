import { useState } from 'react';
import { Mail, Phone, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

function Hero({ isDarkMode }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
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
            {t('heroTitle')}
          </motion.h1>
          <motion.p
            className="text-lg text-white/90 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {t('heroSubtitle')}
          </motion.p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="relative inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg group hover:scale-105 active:scale-95 cursor-pointer"
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
              {t('contactUs')}
            </span>
          </button>
        </div>
      </section>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            className={`rounded-2xl p-8 max-w-md w-full shadow-2xl relative ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsContactModalOpen(false)}
              className={`absolute top-4 right-4 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <X size={24} />
            </button>

            {/* Title */}
            <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
              {t('contactTitle')}
            </h2>

            {/* Contact Info */}
            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:kontakt@aerosales.pl"
                className={`flex items-center gap-4 p-4 rounded-xl transition-colors group ${isDarkMode ? 'bg-[#2a2a2a] hover:bg-[#333]' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <div className="w-12 h-12 bg-[#d4a574]/20 rounded-full flex items-center justify-center group-hover:bg-[#d4a574]/30 transition-colors">
                  <Mail className="text-[#d4a574]" size={24} />
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('email')}</p>
                  <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>kontakt@aerosales.pl</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+48577530532"
                className={`flex items-center gap-4 p-4 rounded-xl transition-colors group ${isDarkMode ? 'bg-[#2a2a2a] hover:bg-[#333]' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <div className="w-12 h-12 bg-[#d4a574]/20 rounded-full flex items-center justify-center group-hover:bg-[#d4a574]/30 transition-colors">
                  <Phone className="text-[#d4a574]" size={24} />
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('phone')}</p>
                  <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>+48 577 530 532</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;
