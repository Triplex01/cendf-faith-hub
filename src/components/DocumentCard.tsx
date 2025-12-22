import { Button } from '@/components/ui/button';
import { Download, FileText, File } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Document } from '@/graphql/types';

interface DocumentCardProps {
  document: Document;
  onDownload?: (url: string, title: string) => void;
}

/**
 * Composant de carte pour afficher un document
 */
export const DocumentCard = ({ document, onDownload }: DocumentCardProps) => {
  // Formatter la date
  const formattedDate = format(new Date(document.date), 'dd MMM yyyy', { locale: fr });

  // Récupérer la catégorie
  const category = document.documentCategories?.nodes?.[0]?.name || 'Document';

  // Extraire le texte de l'excerpt
  const cleanExcerpt = document.excerpt?.replace(/<[^>]*>/g, '').trim() || '';

  // Formater la taille du fichier
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const fileSize = document.documentFile?.fileSize 
    ? formatFileSize(document.documentFile.fileSize)
    : '';

  // Déterminer l'icône selon le type de fichier
  const getFileIcon = (mimeType?: string) => {
    if (!mimeType) return File;
    if (mimeType.includes('pdf')) return FileText;
    if (mimeType.includes('word') || mimeType.includes('document')) return FileText;
    return File;
  };

  const FileIcon = getFileIcon(document.documentFile?.mimeType);

  const handleDownload = () => {
    if (onDownload && document.documentFile?.mediaItemUrl) {
      onDownload(document.documentFile.mediaItemUrl, document.title);
    } else if (document.documentFile?.mediaItemUrl) {
      // Fallback: ouvrir dans un nouvel onglet
      window.open(document.documentFile.mediaItemUrl, '_blank');
    }
  };

  return (
    <div className="bg-card rounded-xl p-5 shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/30 group">
      <div className="flex items-start gap-4">
        {/* Icône du fichier */}
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-burgundy transition-all">
          <FileIcon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          {/* Catégorie */}
          <span className="inline-block px-2 py-1 bg-secondary/10 text-secondary rounded text-xs font-medium mb-2">
            {category}
          </span>

          {/* Titre */}
          <h3 className="font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {document.title}
          </h3>

          {/* Excerpt */}
          {cleanExcerpt && (
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {cleanExcerpt}
            </p>
          )}

          {/* Meta et Téléchargement */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{formattedDate}</span>
              {fileSize && <span className="font-medium">{fileSize}</span>}
            </div>

            <Button
              variant="burgundy"
              size="sm"
              onClick={handleDownload}
              disabled={!document.documentFile?.mediaItemUrl}
            >
              <Download className="w-4 h-4" />
              Télécharger
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
