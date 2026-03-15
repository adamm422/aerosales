// =====================================
// RATE LIMITING - OCHRONA PRZED ABUSE
// =====================================
// Zapobiega atakom DDoS i nadużyciom API

// Prosty in-memory store (dla produkcji użyj Redis)
const requestStore = new Map();

// Domyślne limity
const DEFAULT_WINDOW_MS = 60 * 1000; // 1 minuta
const DEFAULT_MAX_REQUESTS = 10;

/**
 * Middleware do rate limiting
 * @param {Object} options - Opcje konfiguracyjne
 * @param {number} options.windowMs - Okno czasowe w ms
 * @param {number} options.maxRequests - Maksymalna liczba zapytań w oknie
 * @param {string} options.keyPrefix - Prefix dla klucza (np. 'api', 'auth')
 */
export function rateLimit(options = {}) {
  const {
    windowMs = DEFAULT_WINDOW_MS,
    maxRequests = DEFAULT_MAX_REQUESTS,
    keyPrefix = 'api',
  } = options;

  return async function rateLimitMiddleware(request) {
    // Pobierz identyfikator użytkownika (IP lub user ID)
    const identifier = getClientIdentifier(request);
    const key = `${keyPrefix}:${identifier}`;
    
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Pobierz lub stwórz wpis
    let requests = requestStore.get(key) || [];
    
    // Usuń stare zapytania poza oknem czasowym
    requests = requests.filter(timestamp => timestamp > windowStart);
    
    // Sprawdź limit
    if (requests.length >= maxRequests) {
      const oldestRequest = requests[0];
      const retryAfter = Math.ceil((oldestRequest + windowMs - now) / 1000);
      
      return {
        success: false,
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
        },
        error: 'Przekroczono limit zapytań. Spróbuj ponownie za chwilę.',
      };
    }
    
    // Dodaj nowe zapytanie
    requests.push(now);
    requestStore.set(key, requests);
    
    // Czyszczenie starych wpisów (co 1000 zapytań)
    if (requestStore.size > 10000) {
      cleanupOldEntries(windowMs);
    }
    
    return {
      success: true,
      headers: {
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': (maxRequests - requests.length).toString(),
      },
    };
  };
}

/**
 * Pobierz identyfikator klienta
 */
function getClientIdentifier(request) {
  // W środowisku Edge Function (Cloudflare/Vercel)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  // Fallback
  return request.headers.get('cf-connecting-ip') || 
         request.headers.get('x-real-ip') || 
         'anonymous';
}

/**
 * Czyszczenie starych wpisów
 */
function cleanupOldEntries(windowMs) {
  const cutoff = Date.now() - windowMs;
  for (const [key, requests] of requestStore.entries()) {
    const validRequests = requests.filter(timestamp => timestamp > cutoff);
    if (validRequests.length === 0) {
      requestStore.delete(key);
    } else {
      requestStore.set(key, validRequests);
    }
  }
}

// Predefiniowane konfiguracje
export const rateLimits = {
  // Standardowe API
  default: rateLimit({
    windowMs: 60 * 1000,
    maxRequests: 30,
    keyPrefix: 'api',
  }),
  
  // AI/External API (droższe zapytania)
  ai: rateLimit({
    windowMs: 60 * 1000,
    maxRequests: 5,
    keyPrefix: 'ai',
  }),
  
  // Auth (logowanie/rejestracja)
  auth: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minut
    maxRequests: 5,
    keyPrefix: 'auth',
  }),
  
  // Upload plików
  upload: rateLimit({
    windowMs: 60 * 1000,
    maxRequests: 3,
    keyPrefix: 'upload',
  }),
};