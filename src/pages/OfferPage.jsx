import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Ticket, Bed, Users, Star, Waves, Mountain, Landmark, Building2, Palmtree, Ship, Castle, Heart, Crown, Coffee, Trees, Columns, Cross, ShoppingBag, BookOpen, Store, Circle, Leaf, Shield, Sun, Flag, Flower2, Home, Umbrella, Footprints, Atom, Church } from 'lucide-react';
import { getOfferBySlug } from '../utils/slugUtils';
import AirplaneTakeoffIcon from '../assets/airplane-takeoff.svg';
import AirplaneLandingIcon from '../assets/airplane-landing.svg';
import CalendarIcon from '../assets/calendar-blank.svg';
import ClockIcon from '../assets/clock.svg';
import BackpackIcon from '../assets/backpack.svg';
import { useLanguage } from '../i18n/LanguageContext';

// Mapa ikon dla atrakcji
const iconMap = {
  Waves, Mountain, Landmark, Building2, Palmtree, Ship, Castle, Heart, Crown, Coffee, Trees, Columns, Cross, ShoppingBag, BookOpen, Store, Circle, Leaf, Shield, Sun, Flag, Flower2, Home, Umbrella, Footprints, Atom, Church
};

function OfferPage({ isDarkMode }) {
  const { offerId } = useParams();
  const offer = getOfferBySlug(offerId);
  const { language, t, convertAndFormatPrice, translateDate, translateCountry } = useLanguage();

  if (!offer) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'}`}>
        <div className="max-w-6xl mx-auto px-4 pt-20">
          <div className={`rounded-2xl shadow-lg p-8 text-center ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
            <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>{t('offerNotFound')}</h1>
            <Link
              to={`/${language}/`}
              className="inline-flex items-center gap-2 text-[#d4a574] hover:text-[#c49464]"
            >
              <ArrowLeft size={20} />
              {t('backToHome')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'}`}>
      {/* Hero Section - tło z flagą */}
      <div className="relative overflow-hidden">
        {/* Górne tło - flaga z lepszym skalowaniem */}
        <div
          className="h-[400px] md:h-[500px] relative"
          style={{
            backgroundImage: `url(${offer.flaga})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Gradient overlay dla lepszej widoczności flagi */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
          {/* Dodatkowy overlay dla lepszej czytelności tekstu */}
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="max-w-6xl mx-auto px-4 pt-12 relative z-10">
            {/* Data */}
            <div className="inline-block bg-[#d4a574] text-[#1a1a1a] px-3 py-1 rounded text-sm font-medium mb-4">
              {translateDate(offer.dataWylotu)}
            </div>
            
            {/* Tytuł */}
            <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
              {(offer.dokad || offer.miasto || 'Destynacja').split(' ')[0]}
            </h1>
            <p className="text-2xl text-white/90 mb-6 drop-shadow-md">
              {t('from')} <span className="font-bold text-[#d4a574]">{convertAndFormatPrice(offer.cena)}</span> {t('inApril')}
            </p>
          </div>
        </div>

        {/* Info bar - nachodzący na dół hero */}
        <div className="max-w-7xl mx-auto px-4">
          <div className={`rounded-lg shadow-lg -mt-8 md:-mt-12 relative z-10 transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
            {/* Mobile: 2 kolumny, Tablet: 3 kolumny, Desktop: 5 kolumn */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 divide-x divide-gray-200 md:divide-gray-200">
              {/* Skąd */}
              <div className="py-3 md:py-4 px-2 md:px-2 text-center">
                <img src={AirplaneTakeoffIcon} alt="Skąd" draggable="false" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }} className={`mx-auto mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7 transition-all duration-300 pointer-events-none select-none ${isDarkMode ? 'invert brightness-0' : ''}`} />
                <p className={`text-xs md:text-base mb-0.5 md:mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('departureFrom')}</p>
                <p className={`text-base md:text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>
                  {offer.skad || (offer.kodWylotu === 'WMI' ? 'Modlin' : offer.kodWylotu) || '???'}
                </p>
              </div>

              {/* Dokąd */}
              <div className="py-3 md:py-4 px-2 md:px-2 text-center">
                <img src={AirplaneLandingIcon} alt="Dokąd" draggable="false" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }} className={`mx-auto mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7 transition-all duration-300 pointer-events-none select-none ${isDarkMode ? 'invert brightness-0' : ''}`} />
                <p className={`text-xs md:text-base mb-0.5 md:mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('to')}</p>
                <p className={`text-base md:text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>
                  {(offer.dokad || offer.miasto || '???').split(' ')[0]}
                </p>
              </div>

              {/* Kiedy */}
              <div className="py-3 md:py-4 px-2 md:px-2 text-center">
                <img src={CalendarIcon} alt="Kiedy" draggable="false" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }} className={`mx-auto mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7 transition-all duration-300 pointer-events-none select-none ${isDarkMode ? 'invert brightness-0' : ''}`} />
                <p className={`text-xs md:text-base mb-0.5 md:mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('when')}</p>
                <p className={`text-base md:text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>
                  {(() => {
                    const months = {
                      'stycznia': '01', 'lutego': '02', 'marca': '03', 'kwietnia': '04',
                      'maja': '05', 'czerwca': '06', 'lipca': '07', 'sierpnia': '08',
                      'września': '09', 'października': '10', 'listopada': '11', 'grudnia': '12'
                    };
                    const formatDate = (dateStr) => {
                      const parts = dateStr.split(' ');
                      const day = parts[0].padStart(2, '0');
                      const month = months[parts[1]] || '01';
                      return `${day}.${month}`;
                    };
                    return `${formatDate(offer.dataWylotu)}-${formatDate(offer.dataPowrotu)}`;
                  })()}
                </p>
              </div>

              {/* Liczba przesiadek */}
              <div className="py-3 md:py-4 px-2 md:px-2 text-center">
                <img src={BackpackIcon} alt="Przesiadki" draggable="false" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }} className={`mx-auto mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7 transition-all duration-300 pointer-events-none select-none ${isDarkMode ? 'invert brightness-0' : ''}`} />
                <p className={`text-xs md:text-base mb-0.5 md:mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('transfers')}</p>
                <p className={`text-base md:text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>
                  {offer.przesiadki === '0' || offer.przesiadki === 'bez przesiadek' ? t('direct') : offer.przesiadki}
                </p>
              </div>

              {/* Długość podróży */}
              <div className="py-3 md:py-4 px-2 md:px-2 text-center col-span-2 md:col-span-1">
                <img src={ClockIcon} alt="Czas" draggable="false" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }} className={`mx-auto mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7 transition-all duration-300 pointer-events-none select-none ${isDarkMode ? 'invert brightness-0' : ''}`} />
                <p className={`text-xs md:text-base mb-0.5 md:mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('flightTime')}</p>
                <p className={`text-base md:text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>{offer.czasLotu || offer.czas || '???'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="max-w-6xl mx-auto px-4 mt-6 md:mt-8">
        <div className={`rounded-xl shadow-lg p-4 md:p-6 transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
          {/* Mobile: 1 kolumna, Desktop: 3 kolumny */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Bilety */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
                <Ticket size={18} className={`md:w-5 md:h-5 ${isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'}`} />
                <span className={`font-bold text-sm md:text-base ${isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'}`}>{t('tickets')}</span>
              </div>
              <a
                href={offer.link || 'https://www.ryanair.com/pl/pl'}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#d4a574] hover:bg-[#c49464] text-[#1a1a1a] font-bold py-2.5 md:py-3 px-4 rounded-lg transition-colors text-sm md:text-base"
              >
                {t('buyTicket')}
              </a>
            </div>

            {/* Polecany nocleg */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
                <Bed size={18} className={`md:w-5 md:h-5 ${isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'}`} />
                <span className={`font-bold text-sm md:text-base ${isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'}`}>{t('accommodation')}</span>
              </div>
              <button className={`block w-full border-2 font-semibold py-2.5 md:py-3 px-4 rounded-lg transition-colors text-sm md:text-base ${isDarkMode ? 'border-gray-600 text-gray-200 hover:border-[#d4a574]' : 'border-gray-300 text-[#1a1a1a] hover:border-[#d4a574]'}`}>
                {t('comingSoon')}
              </button>
            </div>

            {/* Bądź na bieżąco */}
            <div className={`text-center md:pl-6 ${isDarkMode ? 'md:border-l md:border-gray-700' : 'md:border-l md:border-gray-200'}`}>
              <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
                <Users size={18} className={`md:w-5 md:h-5 ${isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'}`} />
                <span className={`font-bold text-sm md:text-base ${isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'}`}>{t('community')}</span>
              </div>
              <button className="block w-full bg-[#4a4a3a] hover:bg-[#3a3a2a] text-white font-semibold py-2.5 md:py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
                <span>➤</span> {t('join')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section - Dynamic Destination Info */}
      <DestinationGallery offer={offer} isDarkMode={isDarkMode} />

      {/* Powrót */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <Link
          to={`/${language}/`}
          className={`inline-flex items-center gap-2 text-sm md:text-base transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-[#1a1a1a]'}`}
        >
          <ArrowLeft size={20} />
          {t('backToOffers')}
        </Link>
      </div>
    </div>
  );
}

// Komponent informacji o destynacji
function DestinationGallery({ offer, isDarkMode }) {
  const opis = offer.opis || '';
  const atrakcje = offer.atrakcje || [];
  const miastoName = (offer.dokad || offer.miasto || 'Destynacja').split(' ')[0];
  // Pobierz pierwsze zdjęcie lub użyj domyślnego
  const zdjecie = offer.zdjecia && offer.zdjecia.length > 0 ? offer.zdjecia[0] : null;
  const { t, language } = useLanguage();

  if (!offer.opis) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 md:mt-8 pb-8 md:pb-12">
      <div className={`rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
        {/* Nagłówek sekcji */}
        <div className={`px-4 md:px-8 py-4 md:py-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <h2 className={`text-xl md:text-2xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>
            <MapPin className="text-[#d4a574]" size={24} />
            {opis ? `${t('discover')} ${miastoName}` : t('details')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Lewa strona - opis i atrakcje */}
          <div className="p-4 md:p-8 order-2 lg:order-1">
            {/* Opis */}
            <p className={`mb-6 leading-relaxed text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {opis}
            </p>

            {/* Co warto zobaczyć */}
            <h3 className={`font-bold mb-4 text-base md:text-lg flex items-center gap-2 ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>
              <Star className="text-[#d4a574]" size={20} />
              {t('worthSeeing')}
            </h3>
            <ul className="space-y-3">
              {atrakcje.map((attraction, index) => {
                const IconComponent = iconMap[attraction.ikona] || Star;
                return (
                  <li key={index} className={`flex items-start gap-3 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-[#f5f5f5]'}`}>
                      <IconComponent size={16} className="text-[#d4a574]" />
                    </span>
                    <span className="mt-1">{attraction.nazwa}</span>
                  </li>
                );
              })}
            </ul>

            {/* Przycisk mapa */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(offer.dokad || offer.miasto || '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-[#d4a574] hover:text-[#c49464] font-medium text-sm md:text-base transition-colors"
            >
              <MapPin size={18} />
              {t('viewOnMap')}
            </a>
          </div>

          {/* Prawa strona - jedno zdjęcie */}
          {zdjecie && (
            <div className="relative order-1 lg:order-2">
              <img
                src={zdjecie}
                alt={`${miastoName}`}
                className="w-full h-64 md:h-80 lg:h-full min-h-[300px] lg:min-h-[500px] object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-l"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OfferPage;
