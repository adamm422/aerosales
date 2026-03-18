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
      <div className="relative">
        {/* Górne tło - flaga */}
        <div
          className="h-80 relative"
          style={{
            backgroundImage: `url(${offer.flaga})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay dla lepszej czytelności tekstu */}
          <div className="absolute inset-0 bg-black/40"></div>
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
          <div className={`rounded-lg shadow-lg -mt-12 relative z-10 transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
            <div className="grid grid-cols-5 divide-x divide-gray-200">
              {/* Skąd */}
              <div className="py-4 px-2 text-center">
                <img src={AirplaneTakeoffIcon} alt="Skąd" className="mx-auto mb-2 w-7 h-7" />
                <p className={`text-base mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Skąd</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>{offer.kodWylotu === 'WMI' ? 'Modlin' : offer.kodWylotu}</p>
              </div>

              {/* Dokąd */}
              <div className="py-4 px-2 text-center">
                <img src={AirplaneLandingIcon} alt="Dokąd" className="mx-auto mb-2 w-7 h-7" />
                <p className={`text-base mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Dokąd</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>{offer.miasto.split(' ')[0]}</p>
              </div>

              {/* Kiedy */}
              <div className="py-4 px-2 text-center">
                <img src={CalendarIcon} alt="Kiedy" className="mx-auto mb-2 w-7 h-7" />
                <p className={`text-base mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Kiedy</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>
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
              <div className="py-4 px-2 text-center">
                <img src={BackpackIcon} alt="Przesiadki" className="mx-auto mb-2 w-7 h-7" />
                <p className={`text-base mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Liczba przesiadek</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>{offer.przesiadki}</p>
              </div>

              {/* Długość podróży */}
              <div className="py-4 px-2 text-center">
                <img src={ClockIcon} alt="Długość podróży" className="mx-auto mb-2 w-7 h-7" />
                <p className={`text-base mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Długość podróży</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>{offer.czas}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className={`rounded-xl shadow-lg p-6 transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
          <div className="grid grid-cols-3 gap-6">
            {/* Bilety */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Ticket size={20} className={isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'} />
                <span className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'}`}>Bilety</span>
              </div>
              <a
                href="https://www.ryanair.com/pl/pl"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#d4a574] hover:bg-[#c49464] text-[#1a1a1a] font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Kup bilet #1
              </a>
            </div>

            {/* Polecany nocleg */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Bed size={20} className={isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'} />
                <span className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'}`}>Polecany nocleg</span>
              </div>
              <button className={`block w-full border-2 font-semibold py-3 px-4 rounded-lg transition-colors ${isDarkMode ? 'border-gray-600 text-gray-200 hover:border-[#d4a574]' : 'border-gray-300 text-[#1a1a1a] hover:border-[#d4a574]'}`}>
                Niedługo
              </button>
            </div>

            {/* Bądź na bieżąco */}
            <div className={`text-center pl-6 ${isDarkMode ? 'border-l border-gray-700' : 'border-l border-gray-200'}`}>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Users size={20} className={isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'} />
                <span className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-[#1a1a1a]'}`}>Bądź na bieżąco</span>
              </div>
              <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Zaobserwuj nas na social mediach żeby być na bieżąco z promocjami lotniczymi i nie przegapić okazji!
              </p>
              <button className="block w-full bg-[#4a4a3a] hover:bg-[#3a3a2a] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <span>➤</span> Dołączam do społeczeństwa
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-6xl mx-auto px-4 mt-8 pb-12">
        <div className={`rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
          <div className="grid grid-cols-2">
            {/* Lewa strona - opis */}
            <div className="p-8">
              <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>Kreta</h2>
              

              {/* Opis */}
              <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Kreta – największa grecka wyspa, perła Morza Śródziemnego. Słynie z malowniczych plaż,
                starożytnych ruin Knossos, wąwozu Samaria i urokliwych miasteczek jak Chania i Rethymno.
                Doskonałe miejsce na wakacje pełne słońca, historii i greckiej gościnności.
              </p>

              {/* Co warto zobaczyć */}
              <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-[#1a1a1a]'}`}>Co warto zobaczyć</h3>
              <ul className="space-y-2">
                {attractions.map((attraction, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Star size={16} className="text-[#d4a574]" />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{attraction}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prawa strona - zdjęcia */}
            <div className={`relative ${isDarkMode ? 'bg-[#252525]' : 'bg-gray-100'}`}>
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
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-[#1a1a1a]'}`}
        >
          <ArrowLeft size={20} />
          Wróć do ofert
        </Link>
      </div>
    </div>
  );
}

export default OfferPage;