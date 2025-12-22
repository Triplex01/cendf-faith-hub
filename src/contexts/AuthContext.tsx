import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { LOGIN_MUTATION, REFRESH_TOKEN_MUTATION } from '@/graphql/mutations';
import { GET_CURRENT_USER } from '@/graphql/queries';
import { 
  getToken, 
  setToken, 
  getRefreshToken, 
  setRefreshToken, 
  clearAuth, 
  isTokenValid 
} from '@/lib/auth';
import type { User, LoginResponse, RefreshTokenResponse, CurrentUserResponse } from '@/graphql/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAuthToken: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mutations
  const [loginMutation] = useMutation<LoginResponse>(LOGIN_MUTATION);
  const [refreshTokenMutation] = useMutation<RefreshTokenResponse>(REFRESH_TOKEN_MUTATION);

  // Query pour récupérer l'utilisateur actuel
  const { refetch: refetchCurrentUser } = useQuery<CurrentUserResponse>(GET_CURRENT_USER, {
    skip: true, // Ne pas exécuter automatiquement
  });

  /**
   * Vérifie l'authentification au montage du composant
   */
  const checkAuth = async () => {
    const token = getToken();
    
    if (!token || !isTokenValid(token)) {
      // Essayer de rafraîchir le token
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          await refreshAuthToken();
        } catch (err) {
          clearAuth();
          setUser(null);
        }
      } else {
        clearAuth();
        setUser(null);
      }
      setLoading(false);
      return;
    }

    // Récupérer les informations de l'utilisateur
    try {
      const { data } = await refetchCurrentUser();
      if (data?.viewer) {
        setUser(data.viewer);
      }
    } catch (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', err);
      clearAuth();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Fonction de connexion
   */
  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await loginMutation({
        variables: { username, password },
      });

      if (data?.login) {
        const { authToken, refreshToken: newRefreshToken, user: userData } = data.login;
        
        // Stocker les tokens
        setToken(authToken);
        setRefreshToken(newRefreshToken);
        
        // Définir l'utilisateur
        setUser(userData);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la connexion';
      setError(errorMessage);
      console.error('Erreur de connexion:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fonction de déconnexion
   */
  const logout = () => {
    clearAuth();
    setUser(null);
    setError(null);
    // Optionnel: Redirection vers la page d'accueil
    // window.location.href = '/';
  };

  /**
   * Fonction de rafraîchissement du token
   */
  const refreshAuthToken = async () => {
    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('Aucun refresh token disponible');
    }

    try {
      const { data } = await refreshTokenMutation({
        variables: { token: refreshToken },
      });

      if (data?.refreshJwtAuthToken) {
        const { authToken } = data.refreshJwtAuthToken;
        setToken(authToken);
      }
    } catch (err) {
      console.error('Erreur lors du rafraîchissement du token:', err);
      clearAuth();
      setUser(null);
      throw err;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    refreshAuthToken,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook personnalisé pour utiliser le contexte d'authentification
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  
  return context;
};
