import { Clock, ArrowLeftRight, Plane } from 'lucide-react';
import { motion } from 'motion/react';

function OfferCard({ offer, isDarkMode }) {
  return (
    <motion.div
      className={`${isDarkMode ? 'bg-[#252525]' : 'bg-white'} rounded-xl shadow-sm overflow-hidden cursor-pointer`}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Górna część z flagą */}
      <div className="h-40 bg-cover bg-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${offer.flaga})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <motion.h3
            className="text-white font-bold text-lg"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {offer.miasto}
          </motion.h3>
        </div>
      </div>

      {/* Dolna część z informacjami */}
      <div className="p-4">
        {/* Daty */}
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {offer.dataWylotu} {'>'} {offer.dataPowrotu}
        </p>

        {/* Czas i przesiadki + cena */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{offer.czas}</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowLeftRight size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{offer.przesiadki}</span>
            </div>
          </div>
          <span className="text-[#d4a574] font-bold text-lg">{offer.cena}</span>
        </div>

        {/* Trasa z animowanym samolotem */}
        <div className={`flex items-center justify-center mt-3 pt-3 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-100'}`}>
          <span className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{offer.kodWylotu}</span>
          <span className={`mx-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
          <div className={`w-16 border-b-2 border-dashed ${isDarkMode ? 'border-gray-500' : 'border-gray-300'} relative`}>
            <motion.div
              className="absolute top-1/2 left-0 -translate-y-1/2"
              initial={{ x: 0, opacity: 0 }}
              whileHover={{ x: 64, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Plane size={12} className="text-[#d4a574]" />
            </motion.div>
          </div>
          <Plane size={16} className="text-[#d4a574] mx-1" />
          <div className={`w-16 border-b-2 border-dashed ${isDarkMode ? 'border-gray-500' : 'border-gray-300'}`}></div>
          <span className={`mx-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
          <span className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{offer.kodPrzylotu}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default OfferCard;
