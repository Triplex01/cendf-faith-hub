import { OptimizedImage } from './OptimizedImage';
import { Button } from '@/components/ui/button';
import { Calendar, Play, Download } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Teaching } from '@/graphql/types';

interface TeachingCardProps {
  teaching: Teaching;
  onPlay?: (id: string) => void;
  onDownload?: (id: string) => void;
}

/**
 * Composant de carte pour afficher un enseignement
 */
export const TeachingCard = ({ teaching, onPlay, onDownload }: TeachingCardProps) => {
  // Formatter la date
  const formattedDate = format(new Date(teaching.date), 'dd MMMM yyyy', { locale: fr });

  // Récupérer la catégorie
  const category = teaching.teachingCategories?.nodes?.[0]?.name || 'Enseignement';

  // Extraire le texte de l'excerpt
  const cleanExcerpt = teaching.excerpt?.replace(/<[^>]*>/g, '').trim() || '';

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-secondary/30 group">
      {/* Image */}
      {teaching.featuredImage?.node?.sourceUrl && (
        <div className="relative">
          <OptimizedImage
            src={teaching.featuredImage.node.sourceUrl}
            alt={teaching.featuredImage.node.altText || teaching.title}
            className="h-40"
          />
          {/* Play overlay */}
          {onPlay && (
            <button
              onClick={() => onPlay(teaching.id)}
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </div>
            </button>
          )}
        </div>
      )}

      {/* Contenu */}
      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
            {category}
          </span>
          <span className="text-muted-foreground text-sm flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formattedDate}
          </span>
        </div>

        {/* Titre */}
        <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {teaching.title}
        </h3>

        {/* Excerpt */}
        {cleanExcerpt && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {cleanExcerpt}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {onPlay && (
            <Button
              variant="burgundy"
              size="sm"
              className="flex-1"
              onClick={() => onPlay(teaching.id)}
            >
              <Play className="w-4 h-4" />
              Écouter
            </Button>
          )}
          {onDownload && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(teaching.id)}
            >
              <Download className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
