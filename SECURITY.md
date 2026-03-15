# 🔒 Dokumentacja Bezpieczeństwa

Ten dokument zawiera wszystkie zaimplementowane środki bezpieczeństwa w projekcie, zgodnie z wytycznymi z artykułu o bezpieczeństwie kodu AI.

## 📋 Spis treści

1. [Zarządzanie sekretami](#zarządzanie-sekretami)
2. [Architektura AI Proxy](#architektura-ai-proxy)
3. [Rate Limiting](#rate-limiting)
4. [Walidacja danych](#walidacja-danych)
5. [Ochrona przed atakami](#ochrona-przed-atakami)
6. [Checklist bezpieczeństwa](#checklist-bezpieczeństwa)

---

## Zarządzanie sekretami

### Pliki

| Plik | Opis |
|------|------|
| `.env` | Plik z sekretami (NIKDY nie commituj!) |
| `.env.example` | Szablon zmiennych (przykłady) |
| `.gitignore` | Wyklucza `.env` z repozytorium |
| `.cursorrules` | Zasady bezpieczeństwa dla AI |

### Zasady

1. **NIGDY nie hardkoduj kluczy** - używaj zmiennych środowiskowych
2. **Prefiksy** - w Vite tylko `VITE_` jest publiczny
3. **Backend only** - wszystkie klucze API bez prefiksu

```javascript
// ❌ ZAKAZANE
const API_KEY = "sk-abc123...";

// ✅ POPRAWNE
const API_KEY = import.meta.env.OPENAI_API_KEY;
```

---

## Architektura AI Proxy

### Struktura

```
Frontend (React) 
    ↓ (HTTP Request)
API Route (Edge Function)
    ↓ (Bezpieczne wywołanie)
External API (OpenAI/Stripe)
```

### Pliki

- `src/api/proxy/aiProxy.js` - Główny handler AI
- `src/api/client/apiClient.js` - Klient frontend
- `src/api/edge/hello.js` - Przykładowy Edge Function

### Zalety

- Klucz API nigdy nie dociera do przeglądarki
- Możliwość logowania i monitorowania
- Rate limiting przed AI API
- Centralne zarządzanie błędami

---

## Rate Limiting

### Konfiguracja

```javascript
// src/api/middleware/rateLimit.js

export const rateLimits = {
  default: 30 zapytań/minutę,    // Standardowe API
  ai: 5 zapytań/minutę,          // AI/External (kosztuje!)
  auth: 5 prób/15 minut,         // Logowanie
  upload: 3 pliki/minutę,        // Upload
};
```

### Użycie

```javascript
import { rateLimits } from '../middleware/rateLimit.js';

const rateLimit = await rateLimits.ai(request);
if (!rateLimit.success) {
  return jsonResponse(429, { error: 'Rate limit exceeded' });
}
```

---

## Walidacja danych

### Biblioteka

**Zod** - TypeScript-first schema validation

```bash
npm install zod
```

### Schematy

| Schemat | Użycie |
|---------|--------|
| `offerIdSchema` | ID oferty |
| `sortSchema` | Sortowanie |
| `contactSchema` | Formularz kontaktowy |
| `flightSearchSchema` | Wyszukiwanie lotów |
| `fileUploadSchema` | Upload plików |

### Przykład

```javascript
import { contactSchema, validateData } from '../validation/schemas.js';

const result = validateData(contactSchema, userData);
if (!result.success) {
  return { error: result.error };
}
// result.data zawiera bezpieczne, zweryfikowane dane
```

---

## Ochrona przed atakami

### Zaimplementowane zabezpieczenia

| Zagrożenie | Ochrona |
|------------|---------|
| XSS | Sanityzacja stringów, CSP headers |
| CSRF | CORS configuration |
| DoS | Rate limiting, limit rozmiaru body |
| File upload abuse | Walidacja typu i rozmiaru (max 2MB) |
| SVG attacks | Konwersja do WEBP |
| SQL Injection | Parametryzowane zapytania |
| Info leak | Ogólne komunikaty błędów |

### Security Headers

```javascript
// Automatycznie dodawane do każdej odpowiedzi
{
  'Content-Security-Policy': "default-src 'self'...",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}
```

---

## Checklist bezpieczeństwa

Przed każdym commitem upewnij się, że:

- [ ] **Brak hardcoded kluczy** - sprawdź wyszukiwaniem: `API_KEY`, `SECRET`, `TOKEN`
- [ ] **`.env` w `.gitignore`** - sprawdź czy plik jest ignorowany
- [ ] **Walidacja inputów** - każdy endpoint waliduje dane przez Zod
- [ ] **Rate limiting** - drogie endpointy mają limity
- [ ] **Bezpieczne błędy** - nie zwracasz stack trace do frontendu
- [ ] **CORS** - dozwolone tylko zaufane domeny
- [ ] **Dependencies** - `npm audit` nie wykrywa podatności

### Sprawdzenie kluczy w kodzie

```bash
# Wyszukaj potencjalne wycieki
grep -r "sk-" src/  # OpenAI keys
grep -r "pk_" src/  # Stripe keys
grep -r "password" src/ --include="*.js"
grep -r "secret" src/ --include="*.js"
```

---

## Szybka ściąga

### Dodanie nowego endpointu AI

1. Skopiuj `src/api/proxy/aiProxy.js`
2. Dostosuj schemat walidacji
3. Ustaw rate limiting na `rateLimits.ai`
4. Wywołaj zewnętrzne API używając `process.env.TWOJ_KLUCZ`

### Dodanie nowego schematu walidacji

1. Otwórz `src/validation/schemas.js`
2. Użyj `z.object({...})` do zdefiniowania pól
3. Dodaj walidację do endpointu

### Wyciek klucza - co robić?

1. **Natychmiast** unieważnij klucz w panelu dostawcy
2. Wygeneruj nowy klucz
3. Zaktualizuj `.env` (lokalnie i na serwerze)
4. Sprawdź logi na nieautoryzowane użycie

---

## Kontakt

W przypadku wykrycia podatności:
1. Nie publikuj publicznie
2. Skontaktuj się z zespołem
3. Postępuj zgodnie z procedurą incident response

---

*Ostatnia aktualizacja: 2026-03-15*
*Wersja dokumentu: 1.0*