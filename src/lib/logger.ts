/**
 * Utilitaire de logging sécurisé
 * En production, les détails des erreurs sont masqués pour éviter les fuites d'information
 */

const isDev = import.meta.env.DEV;

export const logger = {
  /**
   * Log d'erreur sécurisé - masque les détails en production
   */
  error: (message: string, error?: unknown) => {
    if (isDev) {
      console.error(`[DEV] ${message}`, error);
    }
    // En production, on ne log pas les détails d'erreur dans la console
  },

  /**
   * Log d'avertissement - uniquement en développement
   */
  warn: (message: string, data?: unknown) => {
    if (isDev) {
      console.warn(`[DEV] ${message}`, data);
    }
  },

  /**
   * Log d'information - uniquement en développement
   */
  info: (message: string, data?: unknown) => {
    if (isDev) {
      console.log(`[DEV] ${message}`, data);
    }
  },

  /**
   * Log de debug - uniquement en développement
   */
  debug: (message: string, data?: unknown) => {
    if (isDev) {
      console.debug(`[DEV] ${message}`, data);
    }
  },
};

export default logger;
