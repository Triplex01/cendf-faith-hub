// Données de démonstration pour le mode hors WordPress
// Ces données s'affichent automatiquement quand WordPress n'est pas connecté

import basiliqueCover from "@/assets/basilique-notredame.jpg";
import reunionImage from "@/assets/reunion-eglise.jpg";
import teachingImage from "@/assets/teaching-priest.jpg";
import archivesImage from "@/assets/archives.jpg";
import radioImage from "@/assets/radio-studio.jpg";
import basiliqueRome from "@/assets/basilique-rome.jpg";
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro.jpg";
import interieurBasilique from "@/assets/interieur-basilique.jpg";

// Articles de démonstration
export const demoPosts = [
  {
    id: 1,
    date: new Date().toISOString(),
    slug: "celebration-de-noel-2024",
    title: { rendered: "Grande célébration de Noël 2024" },
    excerpt: { rendered: "<p>Rejoignez-nous pour une célébration exceptionnelle de la nativité du Christ avec toute la communauté.</p>" },
    content: { rendered: "<p>Cette année, notre église organise une célébration spéciale de Noël avec des chants de louange, une représentation de la nativité et un moment de partage fraternel.</p>" },
    featured_media: 1,
    categories: [1],
    _embedded: {
      "wp:featuredmedia": [{ source_url: reunionImage, alt_text: "Célébration de Noël" }],
      author: [{ name: "Père Emmanuel", avatar_urls: {} }]
    }
  },
  {
    id: 2,
    date: new Date(Date.now() - 86400000).toISOString(),
    slug: "retraite-spirituelle-janvier",
    title: { rendered: "Retraite spirituelle de janvier" },
    excerpt: { rendered: "<p>Une semaine de recueillement et de prière pour bien commencer l'année nouvelle.</p>" },
    content: { rendered: "<p>Notre retraite annuelle de janvier vous invite à un temps de ressourcement spirituel profond.</p>" },
    featured_media: 2,
    categories: [1],
    _embedded: {
      "wp:featuredmedia": [{ source_url: basiliqueRome, alt_text: "Retraite spirituelle" }],
      author: [{ name: "Sœur Marie", avatar_urls: {} }]
    }
  },
  {
    id: 3,
    date: new Date(Date.now() - 172800000).toISOString(),
    slug: "inauguration-nouvelle-chapelle",
    title: { rendered: "Inauguration de la nouvelle chapelle" },
    excerpt: { rendered: "<p>La nouvelle chapelle Notre-Dame de la Paix sera inaugurée ce dimanche.</p>" },
    content: { rendered: "<p>Après deux ans de travaux, nous avons l'honneur de vous inviter à l'inauguration de notre nouvelle chapelle.</p>" },
    featured_media: 3,
    categories: [2],
    _embedded: {
      "wp:featuredmedia": [{ source_url: basiliqueCover, alt_text: "Nouvelle chapelle" }],
      author: [{ name: "Père Pierre", avatar_urls: {} }]
    }
  },
  {
    id: 4,
    date: new Date(Date.now() - 259200000).toISOString(),
    slug: "formation-catechistes",
    title: { rendered: "Formation des catéchistes 2025" },
    excerpt: { rendered: "<p>Inscrivez-vous à la formation annuelle pour les catéchistes de notre diocèse.</p>" },
    content: { rendered: "<p>Cette formation approfondie permettra aux catéchistes de mieux accompagner les enfants dans leur découverte de la foi.</p>" },
    featured_media: 4,
    categories: [3],
    _embedded: {
      "wp:featuredmedia": [{ source_url: teachingImage, alt_text: "Formation catéchistes" }],
      author: [{ name: "Père Jean", avatar_urls: {} }]
    }
  }
];

// Événements de démonstration
export const demoEvents = [
  {
    id: 1,
    title: { rendered: "Messe de minuit - Noël" },
    content: { rendered: "<p>Célébration solennelle de la naissance du Christ.</p>" },
    acf: {
      date: "2024-12-24",
      time: "23:30",
      location: "Cathédrale Notre-Dame"
    },
    _embedded: {
      "wp:featuredmedia": [{ source_url: interieurBasilique, alt_text: "Messe de Noël" }]
    }
  },
  {
    id: 2,
    title: { rendered: "Concert de gospel" },
    content: { rendered: "<p>Soirée de louange avec la chorale internationale.</p>" },
    acf: {
      date: "2025-01-15",
      time: "19:00",
      location: "Église Saint-Paul"
    },
    _embedded: {
      "wp:featuredmedia": [{ source_url: radioImage, alt_text: "Concert gospel" }]
    }
  },
  {
    id: 3,
    title: { rendered: "Retraite des jeunes" },
    content: { rendered: "<p>Week-end de ressourcement pour les 18-35 ans.</p>" },
    acf: {
      date: "2025-02-08",
      time: "09:00",
      location: "Centre spirituel Saint-Ignace"
    },
    _embedded: {
      "wp:featuredmedia": [{ source_url: reunionImage, alt_text: "Retraite jeunes" }]
    }
  },
  {
    id: 4,
    title: { rendered: "Pèlerinage diocésain" },
    content: { rendered: "<p>Pèlerinage annuel au sanctuaire marial.</p>" },
    acf: {
      date: "2025-03-20",
      time: "06:00",
      location: "Départ de la paroisse"
    },
    _embedded: {
      "wp:featuredmedia": [{ source_url: basiliqueYamoussoukro, alt_text: "Pèlerinage" }]
    }
  }
];

// Enseignements de démonstration
export const demoTeachings = [
  {
    id: 1,
    title: { rendered: "Les fondements de la foi chrétienne" },
    content: { rendered: "<p>Une série d'enseignements sur les bases de notre foi.</p>" },
    acf: {
      author: "Père Emmanuel",
      duration: "45 min",
      category: "Fondements",
      date: new Date().toISOString()
    },
    _embedded: {
      "wp:featuredmedia": [{ source_url: teachingImage, alt_text: "Enseignement" }]
    }
  },
  {
    id: 2,
    title: { rendered: "La prière du cœur" },
    content: { rendered: "<p>Découvrez la richesse de la prière contemplative.</p>" },
    acf: {
      author: "Sœur Marie",
      duration: "30 min",
      category: "Prière",
      date: new Date().toISOString()
    },
    _embedded: {
      "wp:featuredmedia": [{ source_url: interieurBasilique, alt_text: "Prière" }]
    }
  },
  {
    id: 3,
    title: { rendered: "L'Évangile de Marc" },
    content: { rendered: "<p>Étude approfondie de l'Évangile selon Saint Marc.</p>" },
    acf: {
      author: "Père Pierre",
      duration: "60 min",
      category: "Bible",
      date: new Date().toISOString()
    },
    _embedded: {
      "wp:featuredmedia": [{ source_url: archivesImage, alt_text: "Bible" }]
    }
  }
];

// Documents de démonstration
export const demoDocuments = [
  {
    id: 1,
    title: { rendered: "Lettre pastorale 2024" },
    content: { rendered: "<p>Message de l'évêque pour l'année pastorale.</p>" },
    acf: {
      file_url: "#",
      file_type: "PDF",
      file_size: "2.5 MB",
      category: "Lettres pastorales",
      date: new Date().toISOString()
    }
  },
  {
    id: 2,
    title: { rendered: "Programme catéchétique" },
    content: { rendered: "<p>Guide pour l'année de catéchèse.</p>" },
    acf: {
      file_url: "#",
      file_type: "PDF",
      file_size: "1.8 MB",
      category: "Catéchèse",
      date: new Date().toISOString()
    }
  },
  {
    id: 3,
    title: { rendered: "Chants liturgiques" },
    content: { rendered: "<p>Recueil des chants pour les célébrations.</p>" },
    acf: {
      file_url: "#",
      file_type: "PDF",
      file_size: "5.2 MB",
      category: "Liturgie",
      date: new Date().toISOString()
    }
  }
];

// Podcasts de démonstration
export const demoPodcasts = [
  {
    id: 1,
    title: { rendered: "Homélie du 4ème dimanche de l'Avent" },
    content: { rendered: "<p>Réflexion sur les lectures du jour.</p>" },
    acf: {
      audio_url: "https://example.com/podcast1.mp3",
      duration: "15 min",
      episode_number: 52,
      host: "Père Emmanuel",
      date: new Date().toISOString()
    },
    _embedded: {
      "wp:featuredmedia": [{ source_url: teachingImage, alt_text: "Homélie" }]
    }
  },
  {
    id: 2,
    title: { rendered: "Méditation du matin" },
    content: { rendered: "<p>Un moment de prière pour commencer la journée.</p>" },
    acf: {
      audio_url: "https://example.com/podcast2.mp3",
      duration: "10 min",
      episode_number: 51,
      host: "Sœur Claire",
      date: new Date().toISOString()
    },
    _embedded: {
      "wp:featuredmedia": [{ source_url: interieurBasilique, alt_text: "Méditation" }]
    }
  }
];

// Programmes radio de démonstration
export const demoPrograms = [
  {
    id: 1,
    title: { rendered: "Louange du matin" },
    content: { rendered: "<p>Commencez la journée dans la louange.</p>" },
    acf: {
      time_slot: "06:00 - 08:00",
      day_of_week: "Tous les jours",
      host: "Frère Paul",
      type: "Louange"
    }
  },
  {
    id: 2,
    title: { rendered: "La Parole du jour" },
    content: { rendered: "<p>Méditation sur l'Évangile du jour.</p>" },
    acf: {
      time_slot: "12:00 - 12:30",
      day_of_week: "Lundi - Vendredi",
      host: "Père Emmanuel",
      type: "Enseignement"
    }
  },
  {
    id: 3,
    title: { rendered: "Chapelet en direct" },
    content: { rendered: "<p>Prions ensemble le chapelet.</p>" },
    acf: {
      time_slot: "18:00 - 18:30",
      day_of_week: "Tous les jours",
      host: "Communauté",
      type: "Prière"
    }
  }
];

// Archives de démonstration
export const demoArchives = [
  {
    id: 1,
    date: "2023-12-25",
    slug: "noel-2023",
    title: { rendered: "Célébration de Noël 2023" },
    excerpt: { rendered: "<p>Retour sur les festivités de Noël 2023.</p>" },
    content: { rendered: "<p>Une belle célébration avec toute la communauté.</p>" },
    _embedded: {
      "wp:featuredmedia": [{ source_url: reunionImage, alt_text: "Noël 2023" }]
    }
  },
  {
    id: 2,
    date: "2023-04-09",
    slug: "paques-2023",
    title: { rendered: "Vigile pascale 2023" },
    excerpt: { rendered: "<p>La nuit de Pâques en images.</p>" },
    content: { rendered: "<p>Une veillée pascale inoubliable.</p>" },
    _embedded: {
      "wp:featuredmedia": [{ source_url: interieurBasilique, alt_text: "Pâques 2023" }]
    }
  }
];

// Vérifier si WordPress est configuré
export const isWordPressConfigured = (): boolean => {
  const wpUrl = import.meta.env.VITE_WORDPRESS_URL;
  return !!wpUrl && wpUrl !== "https://votre-site-wordpress.com" && wpUrl.startsWith("http");
};

// Mode démo actif
export const isDemoMode = (): boolean => !isWordPressConfigured();
