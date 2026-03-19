import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, MapPin, Ticket, Bed, Users, Star, ChevronLeft, ChevronRight, Waves, Mountain, Landmark, Building2, Palmtree, Ship, Castle, Heart, Crown, Coffee, Trees, Columns, Cross, ShoppingBag, BookOpen, Store, Circle, Leaf, Shield, Sun, Flag, Flower2, Home, Umbrella, Footprints, Atom, Church } from 'lucide-react';
import { getOfferBySlug } from '../utils/slugUtils';
import AirplaneTakeoffIcon from '../assets/airplane-takeoff.svg';
import AirplaneLandingIcon from '../assets/airplane-landing.svg';
import CalendarIcon from '../assets/calendar-blank.svg';
import ClockIcon from '../assets/clock.svg';
import BackpackIcon from '../assets/backpack.svg';

// Mapa ikon dla atrakcji
const iconMap = {
  Waves, Mountain, Landmark, Building2, Palmtree, Ship, Castle, Heart, Crown, Coffee, Trees, Columns, Cross, ShoppingBag, BookOpen, Store, Circle, Leaf, Shield, Sun, Flag, Flower2, Home, Umbrella, Footprints, Atom, Church
};

function OfferPage({ isDarkMode }) {
  const { offerId } = useParams();
  const offer = getOfferBySlug(offerId);


  if (!offer) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto px-4 pt-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-[#1a1a1a]">Oferta nie została znaleziona</h1>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-[#d4a574] hover:text-[#c49464]"
            >
              <ArrowLeft size={20} />
              Wróć do strony głównej
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
              {offer.dataWylotu}
            </div>
            
            {/* Tytuł */}
            <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
              {offer.miasto.split(' ')[0]}
            </h1>
            <p className="text-2xl text-white/90 mb-6 drop-shadow-md">
              za <span className="font-bold text-[#d4a574]">{offer.cena.replace(' PLN', '')} PLN</span> w kwietniu
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
                <p className={`text-xs md:text-base mb-0.5 md:mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Skąd</p>
                <p className={`text-base md:text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>{offer.kodWylotu === 'WMI' ? 'Modlin' : offer.kodWylotu}</p>
              </div>

              {/* Dokąd */}
              <div className="py-3 md:py-4 px-2 md:px-2 text-center">
                <img src={AirplaneLandingIcon} alt="Dokąd" draggable="false" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }} className={`mx-auto mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7 transition-all duration-300 pointer-events-none select-none ${isDarkMode ? 'invert brightness-0' : ''}`} />
                <p className={`text-xs md:text-base mb-0.5 md:mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Dokąd</p>
                <p className={`text-base md:text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>{offer.miasto.split(' ')[0]}</p>
              </div>

              {/* Kiedy */}
              <div className="py-3 md:py-4 px-2 md:px-2 text-center">
                <img src={CalendarIcon} alt="Kiedy" draggable="false" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }} className={`mx-auto mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7 transition-all duration-300 pointer-events-none select-none ${isDarkMode ? 'invert brightness-0' : ''}`} />
                <p className={`text-xs md:text-base mb-0.5 md:mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Kiedy</p>
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
                <p className={`text-xs md:text-base mb-0.5 md:mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Przesiadki</p>
                <p className={`text-base md:text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>{offer.przesiadki}</p>
              </div>

              {/* Długość podróży */}
              <div className="py-3 md:py-4 px-2 md:px-2 text-center col-span-2 md:col-span-1">
                <img src={ClockIcon} alt="Czas" draggable="false" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }} className={`mx-auto mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7 transition-all duration-300 pointer-events-none select-none ${isDarkMode ? 'invert brightness-0' : ''}`} />
                <p className={`text-xs md:text-base mb-0.5 md:mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Czas lotu</p>
                <p className={`text-base md:text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>{offer.czas}</p>
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
                <span className={`font-bold text-sm md:text-base ${isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'}`}>Bilety</span>
              </div>
              <a
                href="https://www.ryanair.com/pl/pl"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#d4a574] hover:bg-[#c49464] text-[#1a1a1a] font-bold py-2.5 md:py-3 px-4 rounded-lg transition-colors text-sm md:text-base"
              >
                Kup bilet
              </a>
            </div>

            {/* Polecany nocleg */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
                <Bed size={18} className={`md:w-5 md:h-5 ${isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'}`} />
                <span className={`font-bold text-sm md:text-base ${isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'}`}>Nocleg</span>
              </div>
              <button className={`block w-full border-2 font-semibold py-2.5 md:py-3 px-4 rounded-lg transition-colors text-sm md:text-base ${isDarkMode ? 'border-gray-600 text-gray-200 hover:border-[#d4a574]' : 'border-gray-300 text-[#1a1a1a] hover:border-[#d4a574]'}`}>
                Niedługo
              </button>
            </div>

            {/* Bądź na bieżąco */}
            <div className={`text-center md:pl-6 ${isDarkMode ? 'md:border-l md:border-gray-700' : 'md:border-l md:border-gray-200'}`}>
              <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
                <Users size={18} className={`md:w-5 md:h-5 ${isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'}`} />
                <span className={`font-bold text-sm md:text-base ${isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'}`}>Społeczność</span>
              </div>
              <button className="block w-full bg-[#4a4a3a] hover:bg-[#3a3a2a] text-white font-semibold py-2.5 md:py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
                <span>➤</span> Dołączam
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
          to="/"
          className={`inline-flex items-center gap-2 text-sm md:text-base transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-[#1a1a1a]'}`}
        >
          <ArrowLeft size={20} />
          Wróć do wszystkich ofert
        </Link>
      </div>
    </div>
  );
}

// Komponent galerii destynacji
function DestinationGallery({ offer, isDarkMode }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = offer.zdjecia || [];
  const opis = offer.opis || '';
  const atrakcje = offer.atrakcje || [];
  const miastoName = offer.miasto.split(' ')[0];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!offer.opis) {
    return null; // Ukryj sekcję jeśli brak danych
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 md:mt-8 pb-8 md:pb-12">
      <div className={`rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
        {/* Nagłówek sekcji */}
        <div className={`px-4 md:px-8 py-4 md:py-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <h2 className={`text-xl md:text-2xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>
            <MapPin className="text-[#d4a574]" size={24} />
            Odkryj {miastoName}
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
              Co warto zobaczyć
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
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(offer.miasto)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-[#d4a574] hover:text-[#c49464] font-medium text-sm md:text-base transition-colors"
            >
              <MapPin size={18} />
              Zobacz na mapie
            </a>
          </div>

          {/* Prawa strona - galeria zdjęć */}
          <div className="relative order-1 lg:order-2 bg-[#0a0a0a]">
            {/* Główne zdjęcie */}
            <div className="relative h-64 md:h-80 lg:h-full min-h-[300px] lg:min-h-[500px]">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${miastoName} - zdjęcie ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-l"></div>

              {/* Strzałki nawigacji */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-10"
                    aria-label="Poprzednie zdjęcie"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-10"
                    aria-label="Następne zdjęcie"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Licznik zdjęć */}
              <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Miniaturki */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-[#d4a574] scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Miniatura ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferPage;
