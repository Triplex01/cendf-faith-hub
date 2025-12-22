import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  exp: number;
  iat: number;
  iss: string;
  data: {
    user: {
      id: string;
    };
  };
}

const AUTH_TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * Récupère le token JWT depuis le localStorage
 */
export const getToken = (): string | null => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

/**
 * Stocke le token JWT dans le localStorage
 */
export const setToken = (token: string): void => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error setting token in localStorage:', error);
  }
};

/**
 * Supprime le token JWT du localStorage
 */
export const removeToken = (): void => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token from localStorage:', error);
  }
};

/**
 * Récupère le refresh token depuis le localStorage
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Stocke le refresh token dans le localStorage
 */
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

/**
 * Supprime le refresh token du localStorage
 */
export const removeRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Vérifie si le token JWT est valide (non expiré)
 */
export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Date.now() / 1000;
    
    // Vérifier si le token n'est pas expiré (avec une marge de 30 secondes)
    return decoded.exp > currentTime + 30;
  } catch (error) {
    console.error('Erreur lors du décodage du token:', error);
    return false;
  }
};

/**
 * Décode le token JWT et retourne les données
 */
export const decodeToken = (token: string): JWTPayload | null => {
  try {
    return jwtDecode<JWTPayload>(token);
  } catch (error) {
    console.error('Erreur lors du décodage du token:', error);
    return null;
  }
};

/**
 * Nettoie tous les tokens de l'authentification
 */
export const clearAuth = (): void => {
  removeToken();
  removeRefreshToken();
};
