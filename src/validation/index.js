// =====================================
// INDEX WALIDACJI
// =====================================
// Centralny eksport wszystkich schematów walidacji

export {
  // Schematy
  offerIdSchema,
  sortSchema,
  paginationSchema,
  contactSchema,
  flightSearchSchema,
  fileUploadSchema,
  aiRequestSchema,
  
  // Funkcje
  validateData,
} from './schemas.js';

// Re-eksport jako domyślny
export { validateData as default } from './schemas.js';