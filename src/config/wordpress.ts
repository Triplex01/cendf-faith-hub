// Configuration WordPress API
// ========================================
// Configuration flexible : local vs production
// ========================================

// URLs préconfigurées
const WORDPRESS_URLS = {
  local: "http://cendf-ci.local",
  production: "https://cedfci.org",
};

// Détection automatique de l'environnement
const detectEnvironment = (): "local" | "production" => {
  // En développement Vite (localhost:xxxx ou preview.lovable)
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host.includes("lovable") || host.includes("127.0.0.1")) {
      return "local";
    }
  }
  // En production
  return "production";
};

// URL WordPress actuelle basée sur l'environnement
const getWordPressUrl = (): string => {
  // Priorité 1: Variable d'environnement explicite
  if (import.meta.env.VITE_WORDPRESS_URL) {
    return import.meta.env.VITE_WORDPRESS_URL;
  }
  // Priorité 2: Détection automatique
  const env = detectEnvironment();
  return WORDPRESS_URLS[env];
};

export const WORDPRESS_CONFIG = {
  // URL de base de l'API WordPress REST (automatique)
  baseUrl: getWordPressUrl(),
  
  // URLs préconfigurées pour référence/debug
  urls: WORDPRESS_URLS,
  
  // Environnement détecté
  environment: detectEnvironment(),
  
  // Endpoints de l'API
  endpoints: {
    posts: "/wp-json/wp/v2/posts",
    pages: "/wp-json/wp/v2/pages",
    categories: "/wp-json/wp/v2/categories",
    tags: "/wp-json/wp/v2/tags",
    media: "/wp-json/wp/v2/media",
    // Custom Post Types (ACF)
    events: "/wp-json/wp/v2/events",
    podcasts: "/wp-json/wp/v2/podcasts",
    programs: "/wp-json/wp/v2/programs",
    animators: "/wp-json/wp/v2/animators",
    documents: "/wp-json/wp/v2/documents",
    archives: "/wp-json/wp/v2/archives",
    teachings: "/wp-json/wp/v2/teachings",
  },
  
  // Options par défaut pour les requêtes
  defaultParams: {
    per_page: 10,
    _embed: true, // Inclure les médias et auteurs
  },
};

// Debug: afficher la config en développement
if (import.meta.env.DEV) {
  console.log("[WordPress Config]", {
    environment: WORDPRESS_CONFIG.environment,
    baseUrl: WORDPRESS_CONFIG.baseUrl,
  });
}

// Types pour les données WordPress
export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
      avatar_urls: Record<string, string>;
    }>;
  };
  acf?: Record<string, unknown>; // Champs ACF personnalisés
}

export interface WPEvent {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    date: string;
    time: string;
    location: string;
    organizer?: string;
  };
  _embedded?: WPPost["_embedded"];
}

export interface WPPodcast {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    audio_url: string;
    duration: string;
    episode_number: number;
    host: string;
    date: string;
  };
  _embedded?: WPPost["_embedded"];
}

export interface WPProgram {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    time_slot: string;
    day_of_week: string;
    host: string;
    type: string;
  };
}

export interface WPAnimator {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    role: string;
    bio: string;
    photo?: string;
  };
  _embedded?: WPPost["_embedded"];
}

export interface WPDocument {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    file_url: string;
    file_type: string;
    file_size: string;
    category: string;
    date: string;
  };
}

export interface WPTeaching {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    author: string;
    duration: string;
    audio_url?: string;
    video_url?: string;
    category: string;
    date: string;
  };
  _embedded?: WPPost["_embedded"];
}
