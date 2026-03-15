// =====================================
// PRZYKŁADOWY EDGE FUNCTION
// =====================================
// Vercel Edge Function - działa na granicy sieci (CDN)
// https://vercel.com/docs/functions/edge-functions

import { rateLimits } from '../middleware/rateLimit.js';
import { securityMiddleware } from '../middleware/security.js';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // Security checks
  const security = await securityMiddleware()(request);
  if (!security.success) {
    return new Response(
      JSON.stringify({ error: security.error }),
      { status: security.status, headers: security.headers }
    );
  }
  
  // Rate limiting
  const rateLimit = await rateLimits.default(request);
  if (!rateLimit.success) {
    return new Response(
      JSON.stringify({ error: rateLimit.error }),
      { status: rateLimit.status, headers: rateLimit.headers }
    );
  }
  
  // Logika endpointu
  return new Response(
    JSON.stringify({ 
      message: 'Hello from secure edge function!',
      timestamp: new Date().toISOString(),
    }),
    { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...security.headers,
        ...rateLimit.headers,
      },
    }
  );
}