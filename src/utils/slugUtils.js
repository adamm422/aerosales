/**
 * Utility functions for generating and managing offer slugs
 * Format: miasto1, miasto2, miasto3, etc.
 */

import offers from '../data/oferty.json';

/**
 * Normalizuje nazwę miasta do formatu URL-friendly
 * - usuwa polskie znaki
 * - zamienia spacje na puste stringi
 * - usuwa nawiasy i ich zawartość
 * - konwertuje do małych liter
 */
export function normalizeCityName(cityName) {
  const polishChars = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
    'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N',
    'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
  };

  // Usuń zawartość nawiasów
  let normalized = cityName.replace(/\s*\([^)]*\)/g, '');
  
  // Zamień polskie znaki
  normalized = normalized.split('').map(char => polishChars[char] || char).join('');
  
  // Usuń spacje i konwertuj do małych liter
  normalized = normalized.replace(/\s+/g, '').toLowerCase();
  
  // Usuń wszystkie znaki specjalne (zostaw tylko litery i cyfry)
  normalized = normalized.replace(/[^a-z0-9]/g, '');
  
  return normalized;
}

/**
 * Generuje mapę slugów dla wszystkich ofert
 * Format: slug -> offer
 * Zapewnia unikalność slugów w formacie miasto1, miasto2, itd.
 */
export function generateOfferSlugs() {
  const slugMap = new Map();
  const cityCounters = {};

  // Sortuj oferty po ID (zakładamy, że wcześniejsze ID = starsza oferta)
  const sortedOffers = [...offers].sort((a, b) => parseInt(a.id) - parseInt(b.id));

  sortedOffers.forEach(offer => {
    // Obsługa zarówno starej struktury (miasto) jak i nowej (dokad)
    const cityName = offer.dokad || offer.miasto || 'destynacja';
    const baseSlug = normalizeCityName(cityName);
    
    // Zainicjalizuj licznik dla tego miasta
    if (!cityCounters[baseSlug]) {
      cityCounters[baseSlug] = 0;
    }
    
    // Zwiększ licznik i wygeneruj slug
    cityCounters[baseSlug]++;
    const uniqueSlug = `${baseSlug}${cityCounters[baseSlug]}`;
    
    slugMap.set(uniqueSlug, offer);
  });

  return slugMap;
}

/**
 * Pobiera ofertę na podstawie sluga
 */
export function getOfferBySlug(slug) {
  const slugMap = generateOfferSlugs();
  return slugMap.get(slug);
}

/**
 * Generuje slug dla konkretnej oferty
 */
export function getSlugForOffer(offerId) {
  const slugMap = generateOfferSlugs();
  
  for (const [slug, offer] of slugMap.entries()) {
    if (offer.id === offerId) {
      return slug;
    }
  }
  
  return null;
}

/**
 * Pobiera wszystkie dostępne slugi
 */
export function getAllSlugs() {
  const slugMap = generateOfferSlugs();
  return Array.from(slugMap.keys());
}
