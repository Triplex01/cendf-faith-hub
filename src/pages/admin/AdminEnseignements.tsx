import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusCircle, Pencil, Trash2, Eye, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Enseignement {
  id: string;
  title: string;
  slug: string;
  status: string;
  category: string | null;
  author: string | null;
  created_at: string;
}

const AdminEnseignements = () => {
  const [enseignements, setEnseignements] = useState<Enseignement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEnseignements = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('enseignements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les enseignements.',
        variant: 'destructive',
      });
    } else {
      setEnseignements(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnseignements();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet enseignement ?')) return;

    const { error } = await supabase.from('enseignements').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer l\'enseignement.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Succès',
        description: 'Enseignement supprimé avec succès.',
      });
      fetchEnseignements();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">Publié</Badge>;
      case 'draft':
        return <Badge variant="secondary">Brouillon</Badge>;
      case 'archived':
        return <Badge variant="outline">Archivé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Enseignements</h1>
          <p className="text-muted-foreground">Gérez les enseignements et catéchèses</p>
        </div>
        <Button asChild>
          <Link to="/admin/enseignements/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvel enseignement
          </Link>
        </Button>
      </div>

      {enseignements.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground mb-4">Aucun enseignement pour le moment</p>
          <Button asChild>
            <Link to="/admin/enseignements/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Créer le premier enseignement
            </Link>
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enseignements.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.author || '-'}</TableCell>
                  <TableCell>{item.category || '-'}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    {format(new Date(item.created_at), 'dd MMM yyyy', { locale: fr })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/enseignements/${item.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/enseignements/${item.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminEnseignements;
