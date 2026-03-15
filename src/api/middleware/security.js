// =====================================
// MIDDLEWARE BEZPIECZEŃSTWA
// =====================================
// Dodatkowe warstwy ochrony dla API

/**
 * Sprawdza czy request pochodzi z dozwolonej domeny (CORS)
 */
export function corsMiddleware(allowedOrigins = []) {
  return function(request) {
    const origin = request.headers.get('origin');
    
    // Jeśli nie ma origin (np. server-to-server), przepuść
    if (!origin) {
      return { success: true };
    }
    
    // W development przepuszczamy wszystko
    if (process.env.NODE_ENV === 'development') {
      return {
        success: true,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      };
    }
    
    // W produkcji sprawdzamy whitelistę
    if (allowedOrigins.includes(origin)) {
      return {
        success: true,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'true',
        },
      };
    }
    
    return {
      success: false,
      status: 403,
      error: 'Nieautoryzowany origin',
    };
  };
}

/**
 * Dodaje security headers do odpowiedzi
 */
export function securityHeaders() {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' https: data:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };
}

/**
 * Walidacja Content-Type
 */
export function validateContentType(allowedTypes = ['application/json']) {
  return function(request) {
    const contentType = request.headers.get('content-type') || '';
    
    // Dla GET/OPTIONS nie wymagamy Content-Type
    if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
      return { success: true };
    }
    
    const isValid = allowedTypes.some(type => contentType.includes(type));
    
    if (!isValid) {
      return {
        success: false,
        status: 415,
        error: 'Nieobsługiwany typ zawartości',
      };
    }
    
    return { success: true };
  };
}

/**
 * Sprawdza czy request nie jest za duży (DoS protection)
 */
export function checkBodySize(maxSize = 1024 * 1024) { // 1MB default
  return function(request) {
    const contentLength = parseInt(request.headers.get('content-length') || '0');
    
    if (contentLength > maxSize) {
      return {
        success: false,
        status: 413,
        error: 'Zbyt duży rozmiar żądania',
      };
    }
    
    return { success: true };
  };
}

/**
 * Sanityzacja stringów (podstawowa ochrona XSS)
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Główny middleware bezpieczeństwa - łączy wszystkie zabezpieczenia
 */
export function securityMiddleware(options = {}) {
  const {
    allowedOrigins = [],
    maxBodySize = 1024 * 1024,
    allowedContentTypes = ['application/json'],
  } = options;
  
  const cors = corsMiddleware(allowedOrigins);
  const contentType = validateContentType(allowedContentTypes);
  const bodySize = checkBodySize(maxBodySize);
  const headers = securityHeaders();
  
  return async function(request) {
    // Sprawdź CORS
    const corsResult = cors(request);
    if (!corsResult.success) return corsResult;
    
    // Sprawdź Content-Type
    const typeResult = contentType(request);
    if (!typeResult.success) return typeResult;
    
    // Sprawdź rozmiar
    const sizeResult = bodySize(request);
    if (!sizeResult.success) return sizeResult;
    
    return {
      success: true,
      headers: {
        ...headers,
        ...corsResult.headers,
      },
    };
  };
}