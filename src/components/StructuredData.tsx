import { Helmet } from 'react-helmet-async';

interface OrganizationSchemaProps {
  name?: string;
  description?: string;
  logo?: string;
  url?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  telephone?: string;
  email?: string;
  sameAs?: string[];
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  image?: string;
  url?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

// Organization Schema for CENDF
export const OrganizationSchema = ({
  name = "CENDF - Centre d'Enseignement de la Doctrine de la Foi",
  description = "Commission Épiscopale pour la Doctrine de la Foi - Radio Espoir. Organisme catholique dédié à l'enseignement de la foi en Côte d'Ivoire.",
  logo = "https://cedfci.org/favicon.png",
  url = "https://cedfci.org",
  address = {
    streetAddress: "Cocody Riviera",
    addressLocality: "Abidjan",
    addressRegion: "Abidjan",
    postalCode: "01 BP 1287",
    addressCountry: "CI"
  },
  telephone = "+225 27 22 44 16 15",
  email = "cherifraboubacar@gmail.com",
  sameAs = [
    "https://www.facebook.com/cendfradioespoir",
    "https://www.youtube.com/@radioespoir"
  ]
}: OrganizationSchemaProps = {}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    name,
    description,
    url,
    logo: {
      "@type": "ImageObject",
      url: logo,
      width: 512,
      height: 512
    },
    image: logo,
    address: {
      "@type": "PostalAddress",
      ...address
    },
    telephone,
    email,
    sameAs,
    foundingDate: "1960",
    areaServed: {
      "@type": "Country",
      name: "Côte d'Ivoire"
    },
    memberOf: {
      "@type": "Organization",
      name: "Conférence des Évêques Catholiques de Côte d'Ivoire"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Article Schema
export const ArticleSchema = ({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url
}: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: {
      "@type": "ImageObject",
      url: image.startsWith('http') ? image : `https://cedfci.org${image}`
    },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author
    },
    publisher: {
      "@type": "Organization",
      name: "CENDF",
      logo: {
        "@type": "ImageObject",
        url: "https://cedfci.org/favicon.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url.startsWith('http') ? url : `https://cedfci.org${url}`
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Breadcrumb Schema
export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://cedfci.org${item.url}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Event Schema
export const EventSchema = ({
  name,
  description,
  startDate,
  endDate,
  location,
  image,
  url
}: EventSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate,
    endDate: endDate || startDate,
    location: {
      "@type": "Place",
      name: location,
      address: {
        "@type": "PostalAddress",
        addressLocality: location,
        addressCountry: "CI"
      }
    },
    image: image ? (image.startsWith('http') ? image : `https://cedfci.org${image}`) : undefined,
    url: url ? (url.startsWith('http') ? url : `https://cedfci.org${url}`) : undefined,
    organizer: {
      "@type": "Organization",
      name: "CENDF",
      url: "https://cedfci.org"
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode"
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// FAQ Schema
export const FAQSchema = ({ items }: FAQSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Website Schema
export const WebsiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://cedfci.org/#website",
    url: "https://cedfci.org",
    name: "CENDF - Centre d'Enseignement de la Doctrine de la Foi",
    description: "Commission Épiscopale pour la Doctrine de la Foi - Radio Espoir",
    publisher: {
      "@id": "https://cedfci.org/#organization"
    },
    inLanguage: "fr-CI",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://cedfci.org/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Radio Station Schema
export const RadioStationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    name: "Radio Espoir",
    url: "https://cedfci.org/radio",
    sameAs: ["https://radioespoir.ci"],
    broadcastAffiliateOf: {
      "@type": "Organization",
      name: "CENDF"
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Conférence des Évêques Catholiques de Côte d'Ivoire"
    },
    areaServed: {
      "@type": "Country",
      name: "Côte d'Ivoire"
    },
    broadcastFrequency: "94.8 FM",
    broadcastTimezone: "Africa/Abidjan"
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default {
  OrganizationSchema,
  ArticleSchema,
  BreadcrumbSchema,
  EventSchema,
  FAQSchema,
  WebsiteSchema,
  RadioStationSchema
};
