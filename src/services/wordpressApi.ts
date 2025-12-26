import { WORDPRESS_CONFIG, WPPost, WPEvent, WPPodcast, WPProgram, WPAnimator, WPDocument, WPTeaching } from "@/config/wordpress";

// Service API WordPress
class WordPressAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WORDPRESS_CONFIG.baseUrl;
  }

  // Méthode générique pour les requêtes
  private async fetchAPI<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Ajouter les paramètres par défaut
    const allParams = { ...WORDPRESS_CONFIG.defaultParams, ...params };
    
    Object.entries(allParams).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

    try {
      const response = await fetch(url.toString(), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("WordPress API fetch error:", error);
      throw error;
    }
  }

  // Articles / Actualités
  async getPosts(params?: { per_page?: number; page?: number; categories?: number; search?: string }): Promise<WPPost[]> {
    return this.fetchAPI<WPPost[]>(WORDPRESS_CONFIG.endpoints.posts, params);
  }

  async getPostBySlug(slug: string): Promise<WPPost | null> {
    const posts = await this.fetchAPI<WPPost[]>(WORDPRESS_CONFIG.endpoints.posts, { slug });
    return posts[0] || null;
  }

  async getPostById(id: number): Promise<WPPost> {
    return this.fetchAPI<WPPost>(`${WORDPRESS_CONFIG.endpoints.posts}/${id}`);
  }

  // Pages
  async getPages(params?: { per_page?: number; page?: number }): Promise<WPPost[]> {
    return this.fetchAPI<WPPost[]>(WORDPRESS_CONFIG.endpoints.pages, params);
  }

  async getPageBySlug(slug: string): Promise<WPPost | null> {
    const pages = await this.fetchAPI<WPPost[]>(WORDPRESS_CONFIG.endpoints.pages, { slug });
    return pages[0] || null;
  }

  // Catégories
  async getCategories(): Promise<Array<{ id: number; name: string; slug: string; count: number }>> {
    return this.fetchAPI(WORDPRESS_CONFIG.endpoints.categories);
  }

  // Événements (Custom Post Type)
  async getEvents(params?: { per_page?: number; page?: number }): Promise<WPEvent[]> {
    return this.fetchAPI<WPEvent[]>(WORDPRESS_CONFIG.endpoints.events, params);
  }

  async getEventById(id: number): Promise<WPEvent> {
    return this.fetchAPI<WPEvent>(`${WORDPRESS_CONFIG.endpoints.events}/${id}`);
  }

  // Podcasts (Custom Post Type)
  async getPodcasts(params?: { per_page?: number; page?: number; search?: string }): Promise<WPPodcast[]> {
    return this.fetchAPI<WPPodcast[]>(WORDPRESS_CONFIG.endpoints.podcasts, params);
  }

  async getPodcastById(id: number): Promise<WPPodcast> {
    return this.fetchAPI<WPPodcast>(`${WORDPRESS_CONFIG.endpoints.podcasts}/${id}`);
  }

  // Programmes Radio (Custom Post Type)
  async getPrograms(params?: { per_page?: number }): Promise<WPProgram[]> {
    return this.fetchAPI<WPProgram[]>(WORDPRESS_CONFIG.endpoints.programs, params);
  }

  // Animateurs (Custom Post Type)
  async getAnimators(params?: { per_page?: number }): Promise<WPAnimator[]> {
    return this.fetchAPI<WPAnimator[]>(WORDPRESS_CONFIG.endpoints.animators, params);
  }

  async getAnimatorById(id: number): Promise<WPAnimator> {
    return this.fetchAPI<WPAnimator>(`${WORDPRESS_CONFIG.endpoints.animators}/${id}`);
  }

  // Documents (Custom Post Type)
  async getDocuments(params?: { per_page?: number; page?: number; search?: string; category?: string }): Promise<WPDocument[]> {
    return this.fetchAPI<WPDocument[]>(WORDPRESS_CONFIG.endpoints.documents, params);
  }

  async getDocumentById(id: number): Promise<WPDocument> {
    return this.fetchAPI<WPDocument>(`${WORDPRESS_CONFIG.endpoints.documents}/${id}`);
  }

  // Archives (Custom Post Type)
  async getArchives(params?: { per_page?: number; page?: number; search?: string; year?: number }): Promise<WPPost[]> {
    return this.fetchAPI<WPPost[]>(WORDPRESS_CONFIG.endpoints.archives, params);
  }

  // Enseignements (Custom Post Type)
  async getTeachings(params?: { per_page?: number; page?: number; search?: string; category?: string }): Promise<WPTeaching[]> {
    return this.fetchAPI<WPTeaching[]>(WORDPRESS_CONFIG.endpoints.teachings, params);
  }

  async getTeachingById(id: number): Promise<WPTeaching> {
    return this.fetchAPI<WPTeaching>(`${WORDPRESS_CONFIG.endpoints.teachings}/${id}`);
  }

  // Médias
  async getMedia(id: number): Promise<{ source_url: string; alt_text: string }> {
    return this.fetchAPI(`${WORDPRESS_CONFIG.endpoints.media}/${id}`);
  }

  // Recherche globale
  async search(query: string, type?: string): Promise<WPPost[]> {
    const params: Record<string, string | number> = { search: query, per_page: 20 };
    const endpoint = type ? WORDPRESS_CONFIG.endpoints[type as keyof typeof WORDPRESS_CONFIG.endpoints] : WORDPRESS_CONFIG.endpoints.posts;
    return this.fetchAPI<WPPost[]>(endpoint, params);
  }
}

// Instance singleton
export const wordpressApi = new WordPressAPI();

// Export des types
export type { WPPost, WPEvent, WPPodcast, WPProgram, WPAnimator, WPDocument, WPTeaching };
