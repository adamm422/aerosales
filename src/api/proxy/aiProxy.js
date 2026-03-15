// =====================================
// AI PROXY - BEZPIECZNA WARSTWA POŚREDNICZĄCA
// =====================================
// Frontend → Twój API → OpenAI/External AI API
// Klucze API nigdy nie docierają do przeglądarki!

import { rateLimits } from '../middleware/rateLimit.js';
import { securityMiddleware } from '../middleware/security.js';
import { validateData, aiRequestSchema } from '../../validation/schemas.js';

/**
 * Główny handler dla AI Proxy
 * Uruchamiany jako Edge Function (Vercel/Cloudflare)
 */
export async function aiProxyHandler(request) {
  try {
    // 1. Sprawdź metodę HTTP
    if (request.method !== 'POST') {
      return jsonResponse(405, { error: 'Method not allowed' });
    }
    
    // 2. Security middleware (CORS, headers, body size)
    const security = await securityMiddleware({
      maxBodySize: 100 * 1024, // 100KB max
    })(request);
    
    if (!security.success) {
      return jsonResponse(security.status, { error: security.error }, security.headers);
    }
    
    // 3. Rate limiting (ważne dla AI - kosztuje!)
    const rateLimit = await rateLimits.ai(request);
    if (!rateLimit.success) {
      return jsonResponse(rateLimit.status, { error: rateLimit.error }, rateLimit.headers);
    }
    
    // 4. Parsuj body
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse(400, { error: 'Nieprawidłowy JSON' }, security.headers);
    }
    
    // 5. Walidacja danych wejściowych
    const validation = validateData(aiRequestSchema, body);
    if (!validation.success) {
      return jsonResponse(400, { error: validation.error }, security.headers);
    }
    
    const { prompt, model, temperature, maxTokens } = validation.data;
    
    // 6. Sprawdź autentykację (jeśli wymagana)
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return jsonResponse(401, { error: 'Wymagana autentykacja' }, security.headers);
    }
    
    // TODO: Weryfikacja tokenu (JWT/Supabase/Clerk)
    // const token = authHeader.slice(7);
    // const user = await verifyToken(token);
    
    // 7. Wywołaj AI API (klucz jest TYLKO na serwerze!)
    const aiResponse = await callOpenAI({
      prompt,
      model,
      temperature,
      maxTokens,
    });
    
    // 8. Zwróć odpowiedź
    return jsonResponse(200, {
      success: true,
      data: aiResponse,
    }, {
      ...security.headers,
      ...rateLimit.headers,
    });
    
  } catch (error) {
    // NIGDY nie zwracaj pełnego błędu do frontendu!
    console.error('AI Proxy Error:', error);
    
    return jsonResponse(500, {
      error: 'Wystąpił błąd podczas przetwarzania żądania',
    });
  }
}

/**
 * Wywołanie OpenAI API (serwer-side only!)
 */
async function callOpenAI({ prompt, model, temperature, maxTokens }) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY nie jest skonfigurowany');
  }
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'user', content: prompt },
      ],
      temperature,
      max_tokens: maxTokens,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }
  
  return response.json();
}

/**
 * Helper do tworzenia JSON response
 */
function jsonResponse(status, body, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

// Export dla Edge Function
export default aiProxyHandler;