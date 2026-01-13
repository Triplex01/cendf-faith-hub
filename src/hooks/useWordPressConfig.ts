import { useState, useEffect } from 'react';
import { WORDPRESS_CONFIG } from '@/config/wordpress';

interface WordPressConfig {
  site: {
    name: string;
    description: string;
    url: string;
    adminEmail: string;
  };
  theme: {
    url: string;
    version: string;
  };
  radio: {
    streamUrl: string;
    name: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook: string;
    youtube: string;
    twitter: string;
    instagram: string;
    whatsapp: string;
  };
  features: {
    pwa: boolean;
    offline: boolean;
  };
}

interface UseWordPressConfigReturn {
  config: WordPressConfig | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Configuration par défaut (mode démo)
const defaultConfig: WordPressConfig = {
  site: {
    name: 'CENDF - Radio Espoir',
    description: 'Commission Épiscopale pour la Doctrine de la Foi - Première radio catholique de Côte d\'Ivoire',
    url: window.location.origin,
    adminEmail: 'contact@cendf-ci.org',
  },
  theme: {
    url: '',
    version: '1.0.0',
  },
  radio: {
    streamUrl: 'https://stream.radioespoir.ci/live',
    name: 'Radio Espoir',
  },
  contact: {
    email: 'contact@cendf-ci.org',
    phone: '+225 27 22 44 35 28',
    address: 'Cocody II Plateaux, 8XMH+5X9, Abidjan, Côte d\'Ivoire',
  },
  social: {
    facebook: 'https://facebook.com/radioespoir',
    youtube: 'https://youtube.com/@radioespoir',
    twitter: '',
    instagram: '',
    whatsapp: '+225 07 07 07 07 07',
  },
  features: {
    pwa: false,
    offline: false,
  },
};

// Vérifier si on a une config WordPress injectée
const getInjectedConfig = (): Partial<WordPressConfig> | null => {
  if (typeof window !== 'undefined' && (window as any).CENDF_CONFIG) {
    const injected = (window as any).CENDF_CONFIG;
    return {
      site: {
        name: injected.siteName || defaultConfig.site.name,
        description: injected.siteDescription || defaultConfig.site.description,
        url: injected.siteUrl || defaultConfig.site.url,
        adminEmail: defaultConfig.site.adminEmail,
      },
      theme: {
        url: injected.themeUrl || '',
        version: injected.version || '1.0.0',
      },
    };
  }
  return null;
};

export function useWordPressConfig(): UseWordPressConfigReturn {
  const [config, setConfig] = useState<WordPressConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConfig = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // D'abord, vérifier la config injectée par WordPress
      const injectedConfig = getInjectedConfig();
      
      // Essayer de récupérer la config depuis l'API WordPress
      const response = await fetch(`${WORDPRESS_CONFIG.baseUrl}/wp-json/cendf/v1/config`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const apiConfig = await response.json();
        // Fusionner avec la config injectée
        setConfig({
          ...defaultConfig,
          ...apiConfig,
          ...(injectedConfig || {}),
        });
      } else {
        // Utiliser la config injectée ou par défaut
        setConfig({
          ...defaultConfig,
          ...(injectedConfig || {}),
        });
      }
    } catch (err) {
      // En mode démo ou erreur, utiliser la config par défaut
      const injectedConfig = getInjectedConfig();
      setConfig({
        ...defaultConfig,
        ...(injectedConfig || {}),
      });
      
      // Ne pas définir d'erreur en mode démo
      if (WORDPRESS_CONFIG.baseUrl && !WORDPRESS_CONFIG.baseUrl.includes('localhost')) {
        setError(err instanceof Error ? err : new Error('Erreur de chargement de la configuration'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return {
    config,
    isLoading,
    error,
    refetch: fetchConfig,
  };
}

export default useWordPressConfig;
