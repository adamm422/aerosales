import { ChevronDown, Search } from 'lucide-react';

function SortBar({ isDarkMode }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 justify-end">
      {/* Wyszukiwarka z lupką - po lewej */}
      <div className="relative flex-1 sm:w-60 sm:flex-none">
        <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Wyszukaj kierunek..."
          className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:border-transparent ${
            isDarkMode
              ? 'bg-[#252525] border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-700 placeholder-gray-400'
          }`}
        />
      </div>

      {/* Sortowanie - obok wyszukiwarki */}
      <div className="relative flex-1 sm:flex-none">
        <select className={`appearance-none border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:border-transparent cursor-pointer ${
          isDarkMode
            ? 'bg-[#252525] border-gray-600 text-white'
            : 'bg-white border-gray-300 text-gray-700'
        }`}>
          <option>Sortuj według: Najnowsze</option>
          <option>Sortuj według: Cena rosnąco</option>
          <option>Sortuj według: Cena malejąco</option>
        </select>
        <ChevronDown
          size={16}
          className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
        />
      </div>
    </div>
  );
}

export default SortBar;
