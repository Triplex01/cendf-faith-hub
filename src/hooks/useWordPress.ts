import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wordpressApi, WPPost, WPEvent, WPPodcast, WPProgram, WPAnimator, WPDocument, WPTeaching } from "@/services/wordpressApi";
import { WORDPRESS_CONFIG } from "@/config/wordpress";

// Query Keys
export const wpQueryKeys = {
  posts: ["wp", "posts"] as const,
  post: (slug: string) => ["wp", "post", slug] as const,
  postById: (id: number) => ["wp", "post", "id", id] as const,
  pages: ["wp", "pages"] as const,
  page: (slug: string) => ["wp", "page", slug] as const,
  categories: ["wp", "categories"] as const,
  events: ["wp", "events"] as const,
  event: (id: number) => ["wp", "event", id] as const,
  podcasts: ["wp", "podcasts"] as const,
  podcast: (id: number) => ["wp", "podcast", id] as const,
  programs: ["wp", "programs"] as const,
  animators: ["wp", "animators"] as const,
  animator: (id: number) => ["wp", "animator", id] as const,
  documents: ["wp", "documents"] as const,
  document: (id: number) => ["wp", "document", id] as const,
  archives: ["wp", "archives"] as const,
  teachings: ["wp", "teachings"] as const,
  teaching: (id: number) => ["wp", "teaching", id] as const,
  search: (query: string) => ["wp", "search", query] as const,
};

// Hook pour les articles/actualités
export const usePosts = (params?: { per_page?: number; page?: number; categories?: number; search?: string }) => {
  return useQuery({
    queryKey: [...wpQueryKeys.posts, params],
    queryFn: () => wordpressApi.getPosts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePost = (slug: string) => {
  return useQuery({
    queryKey: wpQueryKeys.post(slug),
    queryFn: () => wordpressApi.getPostBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePostById = (id: number) => {
  return useQuery({
    queryKey: wpQueryKeys.postById(id),
    queryFn: () => wordpressApi.getPostById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook pour les pages
export const usePages = (params?: { per_page?: number; page?: number }) => {
  return useQuery({
    queryKey: [...wpQueryKeys.pages, params],
    queryFn: () => wordpressApi.getPages(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePage = (slug: string) => {
  return useQuery({
    queryKey: wpQueryKeys.page(slug),
    queryFn: () => wordpressApi.getPageBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};

// Hook pour les catégories
export const useCategories = () => {
  return useQuery({
    queryKey: wpQueryKeys.categories,
    queryFn: () => wordpressApi.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook pour les événements
export const useEvents = (params?: { per_page?: number; page?: number }) => {
  return useQuery({
    queryKey: [...wpQueryKeys.events, params],
    queryFn: () => wordpressApi.getEvents(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useEvent = (id: number) => {
  return useQuery({
    queryKey: wpQueryKeys.event(id),
    queryFn: () => wordpressApi.getEventById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook pour les podcasts
export const usePodcasts = (params?: { per_page?: number; page?: number; search?: string }) => {
  return useQuery({
    queryKey: [...wpQueryKeys.podcasts, params],
    queryFn: () => wordpressApi.getPodcasts(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePodcast = (id: number) => {
  return useQuery({
    queryKey: wpQueryKeys.podcast(id),
    queryFn: () => wordpressApi.getPodcastById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook pour les programmes radio
export const usePrograms = (params?: { per_page?: number }) => {
  return useQuery({
    queryKey: [...wpQueryKeys.programs, params],
    queryFn: () => wordpressApi.getPrograms(params),
    staleTime: 30 * 60 * 1000, // 30 minutes - programmes changent rarement
  });
};

// Hook pour les animateurs
export const useAnimators = (params?: { per_page?: number }) => {
  return useQuery({
    queryKey: [...wpQueryKeys.animators, params],
    queryFn: () => wordpressApi.getAnimators(params),
    staleTime: 30 * 60 * 1000,
  });
};

export const useAnimator = (id: number) => {
  return useQuery({
    queryKey: wpQueryKeys.animator(id),
    queryFn: () => wordpressApi.getAnimatorById(id),
    enabled: !!id,
    staleTime: 30 * 60 * 1000,
  });
};

// Hook pour les documents
export const useDocuments = (params?: { per_page?: number; page?: number; search?: string; category?: string }) => {
  return useQuery({
    queryKey: [...wpQueryKeys.documents, params],
    queryFn: () => wordpressApi.getDocuments(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDocument = (id: number) => {
  return useQuery({
    queryKey: wpQueryKeys.document(id),
    queryFn: () => wordpressApi.getDocumentById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook pour les archives
export const useArchives = (params?: { per_page?: number; page?: number; search?: string; year?: number }) => {
  return useQuery({
    queryKey: [...wpQueryKeys.archives, params],
    queryFn: () => wordpressApi.getArchives(params),
    staleTime: 10 * 60 * 1000,
  });
};

// Hook pour les enseignements
export const useTeachings = (params?: { per_page?: number; page?: number; search?: string; category?: string }) => {
  return useQuery({
    queryKey: [...wpQueryKeys.teachings, params],
    queryFn: () => wordpressApi.getTeachings(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTeaching = (id: number) => {
  return useQuery({
    queryKey: wpQueryKeys.teaching(id),
    queryFn: () => wordpressApi.getTeachingById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook pour la recherche globale
export const useSearch = (query: string, type?: string) => {
  return useQuery({
    queryKey: [...wpQueryKeys.search(query), type],
    queryFn: () => wordpressApi.search(query, type),
    enabled: query.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutes pour les recherches
  });
};

// Utilitaire: normaliser une URL WordPress (https, relative, etc.)
export const resolveWordPressUrl = (url?: string | null): string | null => {
  if (!url) return null;

  // URL protocol-relative: //example.com/img.jpg
  if (url.startsWith("//")) {
    return `${window.location.protocol}${url}`;
  }

  // URL relative: /wp-content/uploads/...
  if (url.startsWith("/")) {
    const base = WORDPRESS_CONFIG.baseUrl.replace(/\/$/, "");
    return `${base}${url}`;
  }

  // Corriger le mix-content fréquent (WP en http mais site en https)
  if (url.startsWith("http://") && window.location.protocol === "https:") {
    return url.replace(/^http:\/\//, "https://");
  }

  return url;
};

// Hook utilitaire pour extraire l'image à la une
export const getFeaturedImage = (post: WPPost | WPEvent | WPPodcast | WPAnimator): string | null => {
  const raw = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  return resolveWordPressUrl(raw);
};

// Utilitaire: réparer les <img src> dans le HTML rendu par WordPress
export const normalizeWpHtmlImages = (html: string): string => {
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const imgs = Array.from(doc.querySelectorAll("img"));

    for (const img of imgs) {
      const src = img.getAttribute("src");
      const fixed = resolveWordPressUrl(src);
      if (fixed) img.setAttribute("src", fixed);

      // Bonus perf/SEO (sans casser WP): lazy + async
      if (!img.getAttribute("loading")) img.setAttribute("loading", "lazy");
      if (!img.getAttribute("decoding")) img.setAttribute("decoding", "async");
    }

    return doc.body.innerHTML;
  } catch {
    return html;
  }
};

// Hook utilitaire pour extraire le nom de l'auteur
export const getAuthorName = (post: WPPost): string => {
  if (post._embedded?.author?.[0]) {
    return post._embedded.author[0].name;
  }
  return "Auteur inconnu";
};

// Hook utilitaire pour formater la date
export const formatWPDate = (dateString: string, locale: string = "fr-FR"): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Hook utilitaire pour nettoyer le HTML
export const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

// Export des types
export type { WPPost, WPEvent, WPPodcast, WPProgram, WPAnimator, WPDocument, WPTeaching };
