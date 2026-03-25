import { useState } from 'react';
import { Globe } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ThemeSwitch from './ThemeSwitch';
import { useLanguage } from '../i18n/LanguageContext';

const languages = [
  { code: 'pl', label: 'PL' },
  { code: 'en', label: 'EN' }
];
const currencies = ['PLN', 'USD', 'EUR'];

function Header({ onThemeChange, isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, currency, setCurrency, t } = useLanguage();
  const navigate = useNavigate();
  const { lang } = useParams();

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    // Zmień URL na nowy język
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(pl|en)/, `/${newLang}`);
    navigate(newPath);
  };

  // Pobierz aktualny kod języka do wyświetlenia
  const currentLangLabel = languages.find(l => l.code === language)?.label || 'PL';

  return (
    <header className="w-full h-16 bg-[#1a1a1a] z-50 relative">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo - LEFT */}
        <Link to={`/${language}/`} className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
          <img src="/logo.png?v=2" alt="aerosales" className="h-18 w-auto" />
          <div className="text-white leading-none text-xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
            <div>Aero</div>
            <div>Sales</div>
          </div>
        </Link>

        {/* Language/Currency Dropdown + ThemeSwitch - RIGHT */}
        <div className="flex items-center gap-4">
          {/* Language/Currency Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 text-white text-base px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Globe size={18} />
              <span>{currentLangLabel} • {currency}</span>
            </button>
            
            {/* Dropdown Menu with both options side by side */}
            <div
              className={`absolute left-[calc(50%+13px)] -translate-x-1/2 top-full mt-0 bg-[#1a1a1a] rounded-b-lg overflow-hidden shadow-lg transition-all duration-200 ease-out origin-top ${
                isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
              }`}
            >
              <div className="flex">
                {/* Language Section */}
                <div className="border-r border-white/10">
                  <div className="px-3 py-1 text-xs text-white/40 uppercase text-center">{t('language')}</div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-center hover:bg-white/10 transition-colors text-sm ${
                        language === lang.code ? 'text-[#4dabf7]' : 'text-white/80'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
                
                {/* Currency Section */}
                <div>
                  <div className="px-3 py-1 text-xs text-white/40 uppercase text-center">{t('currency')}</div>
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`w-full px-4 py-2 text-center hover:bg-white/10 transition-colors text-sm whitespace-nowrap ${
                        currency === curr ? 'text-[#4dabf7]' : 'text-white/80'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Theme Switch */}
          <ThemeSwitch 
            checked={isDarkMode}
            onChange={onThemeChange}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
