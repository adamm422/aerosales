import { ChevronDown, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import oferty from '../data/oferty.json';

function SortBar({ isDarkMode, sortOption, onSortChange, searchQuery, onSearchChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Get unique destinations from offers
  const destinations = [...new Set(oferty.map(offer => `${offer.miasto}, ${offer.kraj}`))];

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const filtered = destinations.filter(dest =>
        dest.toLowerCase().includes(query)
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion.split(',')[0]); // Set only city name
    setShowSuggestions(false);
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const lowerQuery = query.toLowerCase();
    const lowerText = text.toLowerCase();
    const parts = [];
    let lastIndex = 0;
    let index = lowerText.indexOf(lowerQuery, lastIndex);
    
    while (index !== -1) {
      // Add text before match
      if (index > lastIndex) {
        parts.push(<span key={lastIndex}>{text.slice(lastIndex, index)}</span>);
      }
      // Add highlighted match
      parts.push(
        <span key={index} className="font-bold text-[#007bff]">
          {text.slice(index, index + query.length)}
        </span>
      );
      lastIndex = index + query.length;
      index = lowerText.indexOf(lowerQuery, lastIndex);
    }
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    }
    return parts;
  };
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 justify-end">
      {/* Wyszukiwarka z lupką - po lewej */}
      <div ref={containerRef} className="relative flex-1 sm:w-60 sm:flex-none">
        <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Wyszukaj kierunek..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => searchQuery.trim().length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:border-transparent ${
            isDarkMode
              ? 'bg-[#252525] border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-700 placeholder-gray-400'
          }`}
        />
        
        {/* Autocomplete suggestions */}
        {showSuggestions && (
          <div className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg border z-50 overflow-hidden ${
            isDarkMode
              ? 'bg-[#252525] border-gray-600'
              : 'bg-white border-gray-200'
          }`}>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  isDarkMode
                    ? 'text-white hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {highlightMatch(suggestion, searchQuery)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sortowanie - obok wyszukiwarki */}
      <div className="relative flex-1 sm:flex-none">
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className={`appearance-none border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:border-transparent cursor-pointer ${
          isDarkMode
            ? 'bg-[#252525] border-gray-600 text-white'
            : 'bg-white border-gray-300 text-gray-700'
        }`}>
          <option value="newest">Sortuj według: Najnowsze</option>
          <option value="price-asc">Sortuj według: Cena rosnąco</option>
          <option value="price-desc">Sortuj według: Cena malejąco</option>
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
