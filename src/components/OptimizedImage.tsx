import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: string;
}

/**
 * Composant d'image optimisée avec lazy loading et skeleton
 */
export const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  aspectRatio = '16/9'
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div 
        className={`bg-muted flex items-center justify-center ${className}`}
        style={{ aspectRatio }}
      >
        <div className="text-center text-muted-foreground">
          <ImageOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Image indisponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio }}>
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
