import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Ticket, Bed, Users, Star } from 'lucide-react';
import offers from '../data/oferty.json';
import AirplaneTakeoffIcon from '../assets/airplane-takeoff.svg';
import AirplaneLandingIcon from '../assets/airplane-landing.svg';
import CalendarIcon from '../assets/calendar-blank.svg';
import ClockIcon from '../assets/clock.svg';
import BackpackIcon from '../assets/backpack.svg';

function OfferPage({ isDarkMode }) {
  const { offerId } = useParams();
  const offer = offers.find(o => o.id === offerId);

  // Dane dla Krety (oferta #1)
  const attractions = [
    "Plaża Balos",
    "Wąwóz Samaria",
    "Stare Miasto w Chanii",
    "Plaża Elafonisi",
    "Knossos",
    "Port wenecki w Chanii"
  ];

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
                <img src={AirplaneTakeoffIcon} alt="Skąd" className={`mx-auto mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7 transition-all duration-300 ${isDarkMode ? 'invert brightness-0' : ''}`} />
                <p className={`text-xs md:text-base mb-0.5 md:mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Skąd</p>
                <p className={`text-base md:text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>{offer.kodWylotu === 'WMI' ? 'Modlin' : offer.kodWylotu}</p>
              </div>

              {/* Dokąd */}
              <div className="py-3 md:py-4 px-2 md:px-2 text-center">
                <img src={AirplaneLandingIcon} alt="Dokąd" className={`mx-auto mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7 transition-all duration-300 ${isDarkMode ? 'invert brightness-0' : ''}`} />
                <p className={`text-xs md:text-base mb-0.5 md:mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Dokąd</p>
                <p className={`text-base md:text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>{offer.miasto.split(' ')[0]}</p>
              </div>

              {/* Kiedy */}
              <div className="py-3 md:py-4 px-2 md:px-2 text-center">
                <img src={CalendarIcon} alt="Kiedy" className={`mx-auto mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7 transition-all duration-300 ${isDarkMode ? 'invert brightness-0' : ''}`} />
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
                <img src={BackpackIcon} alt="Przesiadki" className={`mx-auto mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7 transition-all duration-300 ${isDarkMode ? 'invert brightness-0' : ''}`} />
                <p className={`text-xs md:text-base mb-0.5 md:mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Przesiadki</p>
                <p className={`text-base md:text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>{offer.przesiadki}</p>
              </div>

              {/* Długość podróży */}
              <div className="py-3 md:py-4 px-2 md:px-2 text-center col-span-2 md:col-span-1">
                <img src={ClockIcon} alt="Czas" className={`mx-auto mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7 transition-all duration-300 ${isDarkMode ? 'invert brightness-0' : ''}`} />
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

      {/* Description Section */}
      <div className="max-w-6xl mx-auto px-4 mt-6 md:mt-8 pb-8 md:pb-12">
        <div className={`rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
          {/* Mobile: 1 kolumna (tekst na górze, zdjęcie na dole), Desktop: 2 kolumny */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Lewa strona - opis */}
            <div className="p-4 md:p-8 order-1">
              <h2 className={`text-2xl md:text-3xl font-bold mb-3 md:mb-4 ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>Kreta</h2>

              {/* Opis */}
              <p className={`mb-4 md:mb-6 leading-relaxed text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Kreta – największa grecka wyspa, perła Morza Śródziemnego. Słynie z malowniczych plaż,
                starożytnych ruin Knossos, wąwozu Samaria i urokliwych miasteczek jak Chania i Rethymno.
                Doskonałe miejsce na wakacje pełne słońca, historii i greckiej gościnności.
              </p>

              {/* Co warto zobaczyć */}
              <h3 className={`font-bold mb-3 md:mb-4 text-base md:text-lg ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>Co warto zobaczyć</h3>
              <ul className="space-y-2">
                {attractions.map((attraction, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Star size={14} className="text-[#d4a574] md:w-4 md:h-4" />
                    <span className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{attraction}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prawa strona - zdjęcia */}
            <div className={`relative h-64 md:h-auto ${isDarkMode ? 'bg-[#252525]' : 'bg-gray-100'} order-2`}>
              <img
                src="https://images.unsplash.com/photo-1580504144247-12c0d8ef596f?w=800&q=80"
                alt="Kreta"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Powrót */}
      <div className="max-w-6xl mx-auto px-4 pb-6 md:pb-8">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 text-sm md:text-base transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-[#1a1a1a]'}`}
        >
          <ArrowLeft size={18} className="md:w-5 md:h-5" />
          Wróć do ofert
        </Link>
      </div>
    </div>
  );
}

export default OfferPage;