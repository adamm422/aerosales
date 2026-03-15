// =====================================
// KLIENT API - FRONTEND
// =====================================
// Bezpieczny klient do komunikacji z własnym API
// NIGDY nie wywołuje zewnętrznych API bezpośrednio!

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Bezpieczny wrapper dla fetch
 * Automatycznie obsługuje błędy i bezpieczeństwo
 */
class ApiClient {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }
  
  /**
   * Ustaw token autoryzacyjny
   */
  setAuthToken(token) {
    this.authToken = token;
  }
  
  /**
   * Usuń token autoryzacyjny
   */
  clearAuthToken() {
    this.authToken = null;
  }
  
  /**
   * Przygotuj headers
   */
  getHeaders() {
    const headers = { ...this.defaultHeaders };
    
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }
    
    return headers;
  }
  
  /**
   * Wykonaj zapytanie GET
   */
  async get(endpoint, options = {}) {
    return this.request('GET', endpoint, null, options);
  }
  
  /**
   * Wykonaj zapytanie POST
   */
  async post(endpoint, data, options = {}) {
    return this.request('POST', endpoint, data, options);
  }
  
  /**
   * Wykonaj zapytanie PUT
   */
  async put(endpoint, data, options = {}) {
    return this.request('PUT', endpoint, data, options);
  }
  
  /**
   * Wykonaj zapytanie DELETE
   */
  async delete(endpoint, options = {}) {
    return this.request('DELETE', endpoint, null, options);
  }
  
  /**
   * Główna metoda do wykonywania zapytań
   */
  async request(method, endpoint, data = null, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config = {
      method,
      headers: this.getHeaders(),
      ...options,
    };
    
    if (data && method !== 'GET') {
      config.body = JSON.stringify(data);
    }
    
    try {
      const response = await fetch(url, config);
      
      // Parsowanie odpowiedzi
      let result;
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        result = await response.json();
      } else {
        result = await response.text();
      }
      
      // Obsługa błędów HTTP
      if (!response.ok) {
        // Nie logujemy szczegółów w produkcji
        console.error('API Error:', {
          status: response.status,
          message: typeof result === 'object' ? result.error : result,
        });
        
        throw new ApiError(
          typeof result === 'object' ? result.error : 'Wystąpił błąd',
          response.status
        );
      }
      
      return result;
      
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Błąd sieci lub inny
      console.error('Network Error:', error);
      throw new ApiError('Brak połączenia z serwerem', 0);
    }
  }
  
  // =====================
  // SPECJALNE ENDPOINTY
  // =====================
  
  /**
   * Wywołanie AI przez proxy (bezpieczne!)
   */
  async callAI(prompt, options = {}) {
    return this.post('/ai', {
      prompt,
      model: options.model || 'gpt-3.5-turbo',
      temperature: options.temperature || 0.7,
      maxTokens: options.maxTokens || 500,
    });
  }
  
  /**
   * Pobierz oferty lotów
   */
  async getOffers(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.get(`/offers${query ? `?${query}` : ''}`);
  }
  
  /**
   * Wyślij formularz kontaktowy
   */
  async sendContactForm(data) {
    return this.post('/contact', data);
  }
}

/**
 * Klasa błędu API
 */
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

// Singleton instance
export const apiClient = new ApiClient();

export default ApiClient;
export { ApiError };