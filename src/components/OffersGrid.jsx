import OfferCard from './OfferCard';
import oferty from '../data/oferty.json';
import { motion } from 'motion/react';

function OffersGrid({ isDarkMode, sortOption, searchQuery }) {
  // Helper function to parse price string (e.g., "246 PLN" -> 246)
  const parsePrice = (priceStr) => {
    const match = priceStr.match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Helper function to parse date string (e.g., "6 kwietnia 2026" -> Date object)
  const parseDate = (dateStr) => {
    const monthNames = {
      'stycznia': 0, 'lutego': 1, 'marca': 2, 'kwietnia': 3,
      'maja': 4, 'czerwca': 5, 'lipca': 6, 'sierpnia': 7,
      'września': 8, 'października': 9, 'listopada': 10, 'grudnia': 11
    };
    
    const parts = dateStr.split(' ');
    if (parts.length >= 3) {
      const day = parseInt(parts[0], 10);
      const month = monthNames[parts[1].toLowerCase()];
      const year = parseInt(parts[2], 10);
      if (month !== undefined) {
        return new Date(year, month, day);
      }
    }
    return new Date(0);
  };

  // Filter offers based on search query
  const filteredOffers = searchQuery.trim()
    ? oferty.filter(offer =>
        offer.miasto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.kraj.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : oferty;

  // Sort offers based on selected option
  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return parsePrice(a.cena) - parsePrice(b.cena);
      case 'price-desc':
        return parsePrice(b.cena) - parsePrice(a.cena);
      case 'newest':
      default:
        // Sort by ID descending (higher ID = newer offer)
        return parseInt(b.id, 10) - parseInt(a.id, 10);
    }
  });
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <>
      {sortedOffers.length === 0 ? (
        <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p className="text-lg">Nie znaleziono ofert dla "{searchQuery}"</p>
          <p className="text-sm mt-2">Spróbuj wyszukać inną nazwę miasta lub kraju</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {sortedOffers.map((offer) => (
            <motion.div key={offer.id} variants={item}>
              <OfferCard offer={offer} isDarkMode={isDarkMode} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}

export default OffersGrid;
