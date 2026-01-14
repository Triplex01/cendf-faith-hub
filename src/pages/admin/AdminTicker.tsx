import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Trash2, Loader2, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TickerItem {
  id: string;
  message: string;
  link: string | null;
  is_active: boolean;
  display_order: number;
}

const AdminTicker = () => {
  const [items, setItems] = useState<TickerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [newLink, setNewLink] = useState('');
  const { toast } = useToast();

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news_ticker')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger le ticker.',
        variant: 'destructive',
      });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async () => {
    if (!newMessage.trim()) return;

    const { error } = await supabase.from('news_ticker').insert([
      {
        message: newMessage,
        link: newLink || null,
        display_order: items.length,
      },
    ]);

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter l\'élément.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Succès',
        description: 'Élément ajouté au ticker.',
      });
      setNewMessage('');
      setNewLink('');
      fetchItems();
    }
  };

  const handleToggle = async (id: string, isActive: boolean) => {
    const { error } = await supabase
      .from('news_ticker')
      .update({ is_active: isActive })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier l\'élément.',
        variant: 'destructive',
      });
    } else {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, is_active: isActive } : item))
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;

    const { error } = await supabase.from('news_ticker').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer l\'élément.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Succès',
        description: 'Élément supprimé.',
      });
      fetchItems();
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
      <div>
        <h1 className="text-3xl font-bold">Ticker d'actualités</h1>
        <p className="text-muted-foreground">
          Gérez le bandeau défilant d'informations
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ajouter un message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="message">Message</Label>
              <Input
                id="message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Texte du message..."
              />
            </div>
            <div className="w-1/3">
              <Label htmlFor="link">Lien (optionnel)</Label>
              <Input
                id="link"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAdd}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">Aucun message dans le ticker</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Lien</TableHead>
                <TableHead className="w-24">Actif</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                  </TableCell>
                  <TableCell className="font-medium">{item.message}</TableCell>
                  <TableCell>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate block max-w-xs"
                      >
                        {item.link}
                      </a>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={item.is_active}
                      onCheckedChange={(checked) => handleToggle(item.id, checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

export default AdminTicker;
