import DOMPurify from 'dompurify';

/**
 * Configuration par défaut pour la sanitization HTML
 * Autorise uniquement les balises et attributs sûrs
 */
const defaultConfig = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 
    'a', 'img',
    'blockquote', 'pre', 'code',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'div', 'span', 'hr'
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'class', 'id',
    'target', 'rel', 'width', 'height'
  ],
  ALLOW_DATA_ATTR: false,
  ADD_ATTR: ['target'], // Permettre target pour les liens
  FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
};

/**
 * Nettoie le HTML pour prévenir les attaques XSS
 * @param html - Le HTML à nettoyer
 * @returns Le HTML sécurisé
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';
  
  // Configurer DOMPurify pour ajouter rel="noopener noreferrer" aux liens externes
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A') {
      const href = node.getAttribute('href');
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        node.setAttribute('target', '_blank');
        node.setAttribute('rel', 'noopener noreferrer');
      }
    }
    // Lazy loading pour les images
    if (node.tagName === 'IMG') {
      node.setAttribute('loading', 'lazy');
    }
  });

  return DOMPurify.sanitize(html, defaultConfig);
};

/**
 * Supprime complètement les balises HTML et retourne le texte brut
 * @param html - Le HTML à nettoyer
 * @returns Le texte brut
 */
export const stripHtml = (html: string): string => {
  if (!html) return '';
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
};

/**
 * Nettoie le HTML pour un affichage inline (pas de blocs)
 * @param html - Le HTML à nettoyer
 * @returns Le HTML inline sécurisé
 */
export const sanitizeInlineHtml = (html: string): string => {
  if (!html) return '';
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['strong', 'b', 'em', 'i', 'u', 'a', 'span'],
    ALLOWED_ATTR: ['href', 'title', 'class'],
    ALLOW_DATA_ATTR: false,
  });
};

export default sanitizeHtml;
