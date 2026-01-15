import { Helmet, HelmetProvider } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'event';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  noindex?: boolean;
  children?: React.ReactNode;
}

const SITE_NAME = "CENDF - Centre d'Enseignement de la Doctrine de la Foi";
const SITE_URL = "https://cedfci.org";
const DEFAULT_DESCRIPTION = "Commission Épiscopale pour la Doctrine de la Foi - Radio Espoir. Enseignements, documents, archives, radio et podcasts pour la communauté catholique en Côte d'Ivoire.";
const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`;
const DEFAULT_KEYWORDS = "CENDF, église catholique, doctrine, foi, enseignement, Côte d'Ivoire, radio catholique, podcasts chrétiens, Radio Espoir, Abidjan, enseignement catholique, homélie, prière";

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  noindex = false,
  children,
}: SEOProps) => {
  const fullTitle = title ? `${title} | CENDF` : SITE_NAME;
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Base Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author || "CENDF"} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:alt" content={title || SITE_NAME} />
      <meta property="og:site_name" content="CENDF" />
      <meta property="og:locale" content="fr_CI" />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@CENDF" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Additional SEO */}
      <meta name="geo.region" content="CI" />
      <meta name="geo.placename" content="Abidjan" />
      <meta name="geo.position" content="5.3599517;-4.0082563" />
      <meta name="ICBM" content="5.3599517, -4.0082563" />

      {children}
    </Helmet>
  );
};

export { HelmetProvider };
export default SEO;
