import { WORDPRESS_CONFIG, WPPost, WPEvent, WPPodcast, WPProgram, WPAnimator, WPDocument, WPTeaching } from "@/config/wordpress";
import { 
  isDemoMode, 
  demoPosts, 
  demoEvents, 
  demoTeachings, 
  demoDocuments, 
  demoPodcasts, 
  demoPrograms, 
  demoArchives 
} from "@/config/demoData";

// Service API WordPress avec fallback données démo
class WordPressAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WORDPRESS_CONFIG.baseUrl;
  }

  // Vérifier si on est en mode démo
  private isDemo(): boolean {
    return isDemoMode();
  }

  // Méthode générique pour les requêtes
  private async fetchAPI<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    // En mode démo, on ne fait pas de requêtes
    if (this.isDemo()) {
      throw new Error("Demo mode - no API calls");
    }

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
    if (this.isDemo()) {
      let posts = [...demoPosts] as WPPost[];
      if (params?.per_page) {
        posts = posts.slice(0, params.per_page);
      }
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        posts = posts.filter(p => 
          p.title.rendered.toLowerCase().includes(searchLower) ||
          p.excerpt.rendered.toLowerCase().includes(searchLower)
        );
      }
      return posts;
    }
    return this.fetchAPI<WPPost[]>(WORDPRESS_CONFIG.endpoints.posts, params);
  }

  async getPostBySlug(slug: string): Promise<WPPost | null> {
    if (this.isDemo()) {
      return demoPosts.find(p => p.slug === slug) as WPPost || null;
    }
    const posts = await this.fetchAPI<WPPost[]>(WORDPRESS_CONFIG.endpoints.posts, { slug });
    return posts[0] || null;
  }

  async getPostById(id: number): Promise<WPPost> {
    if (this.isDemo()) {
      const post = demoPosts.find(p => p.id === id);
      if (!post) throw new Error("Post not found");
      return post as WPPost;
    }
    return this.fetchAPI<WPPost>(`${WORDPRESS_CONFIG.endpoints.posts}/${id}`);
  }

  // Pages
  async getPages(params?: { per_page?: number; page?: number }): Promise<WPPost[]> {
    if (this.isDemo()) {
      return [];
    }
    return this.fetchAPI<WPPost[]>(WORDPRESS_CONFIG.endpoints.pages, params);
  }

  async getPageBySlug(slug: string): Promise<WPPost | null> {
    if (this.isDemo()) {
      return null;
    }
    const pages = await this.fetchAPI<WPPost[]>(WORDPRESS_CONFIG.endpoints.pages, { slug });
    return pages[0] || null;
  }

  // Catégories
  async getCategories(): Promise<Array<{ id: number; name: string; slug: string; count: number }>> {
    if (this.isDemo()) {
      return [
        { id: 1, name: "Actualités", slug: "actualites", count: 10 },
        { id: 2, name: "Événements", slug: "evenements", count: 5 },
        { id: 3, name: "Formations", slug: "formations", count: 3 }
      ];
    }
    return this.fetchAPI(WORDPRESS_CONFIG.endpoints.categories);
  }

  // Événements (Custom Post Type)
  async getEvents(params?: { per_page?: number; page?: number }): Promise<WPEvent[]> {
    if (this.isDemo()) {
      let events = [...demoEvents] as WPEvent[];
      if (params?.per_page) {
        events = events.slice(0, params.per_page);
      }
      return events;
    }
    return this.fetchAPI<WPEvent[]>(WORDPRESS_CONFIG.endpoints.events, params);
  }

  async getEventById(id: number): Promise<WPEvent> {
    if (this.isDemo()) {
      const event = demoEvents.find(e => e.id === id);
      if (!event) throw new Error("Event not found");
      return event as WPEvent;
    }
    return this.fetchAPI<WPEvent>(`${WORDPRESS_CONFIG.endpoints.events}/${id}`);
  }

  // Podcasts (Custom Post Type)
  async getPodcasts(params?: { per_page?: number; page?: number; search?: string }): Promise<WPPodcast[]> {
    if (this.isDemo()) {
      let podcasts = [...demoPodcasts] as WPPodcast[];
      if (params?.per_page) {
        podcasts = podcasts.slice(0, params.per_page);
      }
      return podcasts;
    }
    return this.fetchAPI<WPPodcast[]>(WORDPRESS_CONFIG.endpoints.podcasts, params);
  }

  async getPodcastById(id: number): Promise<WPPodcast> {
    if (this.isDemo()) {
      const podcast = demoPodcasts.find(p => p.id === id);
      if (!podcast) throw new Error("Podcast not found");
      return podcast as WPPodcast;
    }
    return this.fetchAPI<WPPodcast>(`${WORDPRESS_CONFIG.endpoints.podcasts}/${id}`);
  }

  // Programmes Radio (Custom Post Type)
  async getPrograms(params?: { per_page?: number }): Promise<WPProgram[]> {
    if (this.isDemo()) {
      let programs = [...demoPrograms] as WPProgram[];
      if (params?.per_page) {
        programs = programs.slice(0, params.per_page);
      }
      return programs;
    }
    return this.fetchAPI<WPProgram[]>(WORDPRESS_CONFIG.endpoints.programs, params);
  }

  // Animateurs (Custom Post Type)
  async getAnimators(params?: { per_page?: number }): Promise<WPAnimator[]> {
    if (this.isDemo()) {
      return [];
    }
    return this.fetchAPI<WPAnimator[]>(WORDPRESS_CONFIG.endpoints.animators, params);
  }

  async getAnimatorById(id: number): Promise<WPAnimator> {
    if (this.isDemo()) {
      throw new Error("Animator not found in demo mode");
    }
    return this.fetchAPI<WPAnimator>(`${WORDPRESS_CONFIG.endpoints.animators}/${id}`);
  }

  // Documents (Custom Post Type)
  async getDocuments(params?: { per_page?: number; page?: number; search?: string; category?: string }): Promise<WPDocument[]> {
    if (this.isDemo()) {
      let documents = [...demoDocuments] as WPDocument[];
      if (params?.per_page) {
        documents = documents.slice(0, params.per_page);
      }
      if (params?.category) {
        documents = documents.filter(d => d.acf.category === params.category);
      }
      return documents;
    }
    return this.fetchAPI<WPDocument[]>(WORDPRESS_CONFIG.endpoints.documents, params);
  }

  async getDocumentById(id: number): Promise<WPDocument> {
    if (this.isDemo()) {
      const doc = demoDocuments.find(d => d.id === id);
      if (!doc) throw new Error("Document not found");
      return doc as WPDocument;
    }
    return this.fetchAPI<WPDocument>(`${WORDPRESS_CONFIG.endpoints.documents}/${id}`);
  }

  // Archives (Custom Post Type)
  async getArchives(params?: { per_page?: number; page?: number; search?: string; year?: number }): Promise<WPPost[]> {
    if (this.isDemo()) {
      let archives = [...demoArchives] as WPPost[];
      if (params?.per_page) {
        archives = archives.slice(0, params.per_page);
      }
      return archives;
    }
    return this.fetchAPI<WPPost[]>(WORDPRESS_CONFIG.endpoints.archives, params);
  }

  // Enseignements (Custom Post Type)
  async getTeachings(params?: { per_page?: number; page?: number; search?: string; category?: string }): Promise<WPTeaching[]> {
    if (this.isDemo()) {
      let teachings = [...demoTeachings] as WPTeaching[];
      if (params?.per_page) {
        teachings = teachings.slice(0, params.per_page);
      }
      if (params?.category) {
        teachings = teachings.filter(t => t.acf.category === params.category);
      }
      return teachings;
    }
    return this.fetchAPI<WPTeaching[]>(WORDPRESS_CONFIG.endpoints.teachings, params);
  }

  async getTeachingById(id: number): Promise<WPTeaching> {
    if (this.isDemo()) {
      const teaching = demoTeachings.find(t => t.id === id);
      if (!teaching) throw new Error("Teaching not found");
      return teaching as WPTeaching;
    }
    return this.fetchAPI<WPTeaching>(`${WORDPRESS_CONFIG.endpoints.teachings}/${id}`);
  }

  // Médias
  async getMedia(id: number): Promise<{ source_url: string; alt_text: string }> {
    if (this.isDemo()) {
      return { source_url: "", alt_text: "" };
    }
    return this.fetchAPI(`${WORDPRESS_CONFIG.endpoints.media}/${id}`);
  }

  // Recherche globale
  async search(query: string, type?: string): Promise<WPPost[]> {
    if (this.isDemo()) {
      const searchLower = query.toLowerCase();
      return demoPosts.filter(p => 
        p.title.rendered.toLowerCase().includes(searchLower) ||
        p.excerpt.rendered.toLowerCase().includes(searchLower)
      ) as WPPost[];
    }
    const params: Record<string, string | number> = { search: query, per_page: 20 };
    const endpoint = type ? WORDPRESS_CONFIG.endpoints[type as keyof typeof WORDPRESS_CONFIG.endpoints] : WORDPRESS_CONFIG.endpoints.posts;
    return this.fetchAPI<WPPost[]>(endpoint, params);
  }
}

// Instance singleton
export const wordpressApi = new WordPressAPI();

// Export des types
export type { WPPost, WPEvent, WPPodcast, WPProgram, WPAnimator, WPDocument, WPTeaching };
