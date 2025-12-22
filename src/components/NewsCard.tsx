import { OptimizedImage } from './OptimizedImage';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Post } from '@/graphql/types';

interface NewsCardProps {
  post: Post;
  onReadMore?: (slug: string) => void;
}

/**
 * Composant de carte pour afficher une actualité
 */
export const NewsCard = ({ post, onReadMore }: NewsCardProps) => {
  const handleReadMore = () => {
    if (onReadMore) {
      onReadMore(post.slug);
    }
  };

  // Formatter la date
  const formattedDate = format(new Date(post.date), 'dd MMMM yyyy', { locale: fr });

  // Extraire le texte de l'excerpt (supprimer les balises HTML)
  const cleanExcerpt = post.excerpt?.replace(/<[^>]*>/g, '').trim() || '';

  // Récupérer la catégorie principale
  const category = post.categories?.nodes?.[0]?.name || 'Actualité';

  return (
    <article className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/30 group">
      {/* Image */}
      {post.featuredImage?.node?.sourceUrl && (
        <OptimizedImage
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText || post.title}
          className="h-48 group-hover:scale-105 transition-transform duration-500"
        />
      )}

      {/* Contenu */}
      <div className="p-6">
        {/* Meta informations */}
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
            {category}
          </span>
          <span className="text-muted-foreground text-sm flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </span>
        </div>

        {/* Titre */}
        <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {cleanExcerpt}
        </p>

        {/* Auteur et Lire la suite */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{post.author?.node?.name || 'Auteur'}</span>
          </div>
          <Button 
            variant="link" 
            className="p-0 h-auto text-primary gap-2"
            onClick={handleReadMore}
          >
            Lire la suite <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </article>
  );
};
