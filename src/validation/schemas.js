import { z } from 'zod';

// =====================================
// SCHEMATY WALIDACJI (ZOD)
// =====================================
// Wszystkie dane wejściowe od użytkowników MUSZĄ przejść walidację

// Schemat dla zapytań AI (AI Proxy)
export const aiRequestSchema = z.object({
  prompt: z.string()
    .min(1, 'Prompt nie może być pusty')
    .max(4000, 'Prompt za długi (max 4000 znaków)')
    .trim(),
  model: z.enum(['gpt-4', 'gpt-4o', 'gpt-3.5-turbo']).default('gpt-3.5-turbo'),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().int().min(1).max(2000).default(500),
});

// Schemat dla ID oferty
export const offerIdSchema = z.string().uuid().or(z.string().min(1).max(50));

// Schemat dla sortowania
export const sortSchema = z.enum(['price-asc', 'price-desc', 'date-asc', 'date-desc']);

// Schemat dla paginacji
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Schemat dla kontaktu/formularza
export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Imię musi mieć min. 2 znaki')
    .max(100, 'Imię może mieć max. 100 znaków')
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s'-]+$/, 'Nieprawidłowe znaki w imieniu'),
  email: z.string()
    .email('Nieprawidłowy format email')
    .max(255, 'Email za długi'),
  message: z.string()
    .min(10, 'Wiadomość musi mieć min. 10 znaków')
    .max(5000, 'Wiadomość może mieć max. 5000 znaków')
    .trim(),
  phone: z.string()
    .regex(/^[\d\s\-+()]*$/, 'Nieprawidłowy format telefonu')
    .max(20)
    .optional(),
});

// Schemat dla wyszukiwania lotów
export const flightSearchSchema = z.object({
  origin: z.string().min(3).max(3).regex(/^[A-Z]{3}$/, 'Kod IATA musi mieć 3 wielkie litery'),
  destination: z.string().min(3).max(3).regex(/^[A-Z]{3}$/, 'Kod IATA musi mieć 3 wielkie litery'),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format daty: YYYY-MM-DD'),
  returnDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format daty: YYYY-MM-DD').optional(),
  passengers: z.coerce.number().int().min(1).max(9).default(1),
});

// Schemat dla uploadu plików (jeśli będzie potrzebny)
export const fileUploadSchema = z.object({
  filename: z.string().max(255),
  mimetype: z.enum(['image/jpeg', 'image/png', 'image/webp']),
  size: z.number().max(2 * 1024 * 1024, 'Maksymalny rozmiar pliku to 2MB'),
});

// Funkcja walidacji z bezpiecznym błędem
export function validateData(schema, data) {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    // Nie zwracamy szczegółów błędów walidacji do frontendu
    // Logujemy na serwerze, zwracamy ogólny komunikat
    console.error('Validation error:', result.error.format());
    
    return {
      success: false,
      error: 'Nieprawidłowe dane wejściowe. Sprawdź poprawność wprowadzonych informacji.',
    };
  }
  
  return {
    success: true,
    data: result.data,
  };
}