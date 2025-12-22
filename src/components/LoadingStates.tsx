import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Skeleton pour une carte d'actualité
 */
export const NewsCardSkeleton = () => (
  <div className="bg-card rounded-xl overflow-hidden shadow-card border border-border">
    <Skeleton className="h-48 w-full" />
    <div className="p-6">
      <div className="flex gap-3 mb-3">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-32" />
      </div>
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  </div>
);

/**
 * Skeleton pour une carte d'enseignement
 */
export const TeachingCardSkeleton = () => (
  <div className="bg-card rounded-xl overflow-hidden shadow-card border border-border">
    <Skeleton className="h-40 w-full" />
    <div className="p-5">
      <div className="flex justify-between mb-3">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-5 w-4/5 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 w-9" />
      </div>
    </div>
  </div>
);

/**
 * Skeleton pour une carte de document
 */
export const DocumentCardSkeleton = () => (
  <div className="bg-card rounded-xl p-5 shadow-card border border-border">
    <div className="flex items-start gap-4">
      <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
      <div className="flex-1">
        <Skeleton className="h-5 w-20 mb-2" />
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-3" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
    </div>
  </div>
);

/**
 * Grille de skeletons
 */
interface LoadingGridProps {
  count?: number;
  type?: 'news' | 'teaching' | 'document';
}

export const LoadingGrid = ({ count = 6, type = 'news' }: LoadingGridProps) => {
  const SkeletonComponent = 
    type === 'teaching' ? TeachingCardSkeleton :
    type === 'document' ? DocumentCardSkeleton :
    NewsCardSkeleton;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </div>
  );
};

/**
 * Spinner de chargement
 */
export const LoadingSpinner = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

/**
 * Message d'erreur
 */
interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ 
  message = 'Une erreur est survenue lors du chargement des données.', 
  onRetry 
}: ErrorMessageProps) => (
  <div className="bg-card rounded-xl p-8 shadow-card border border-destructive/50 text-center">
    <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
    <h3 className="font-display text-xl font-bold text-foreground mb-2">
      Erreur de chargement
    </h3>
    <p className="text-muted-foreground mb-6">{message}</p>
    {onRetry && (
      <Button variant="burgundy" onClick={onRetry}>
        Réessayer
      </Button>
    )}
  </div>
);

/**
 * Message de contenu vide
 */
interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

export const EmptyState = ({ 
  message = 'Aucun contenu disponible pour le moment.',
  icon
}: EmptyStateProps) => (
  <div className="bg-card rounded-xl p-12 shadow-card border border-border text-center">
    {icon && <div className="text-muted-foreground mb-4">{icon}</div>}
    <p className="text-muted-foreground text-lg">{message}</p>
  </div>
);
