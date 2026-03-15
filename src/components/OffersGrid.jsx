import OfferCard from './OfferCard';
import oferty from '../data/oferty.json';
import { motion } from 'motion/react';

function OffersGrid({ isDarkMode }) {
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
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
    >
      {oferty.map((offer) => (
        <motion.div key={offer.id} variants={item}>
          <OfferCard offer={offer} isDarkMode={isDarkMode} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default OffersGrid;
