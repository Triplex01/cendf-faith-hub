import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash2, Loader2, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  roles: AppRole[];
}

const AdminUsers = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newRole, setNewRole] = useState<AppRole>('editor');
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const fetchProfiles = async () => {
    setLoading(true);

    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les utilisateurs.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const { data: rolesData } = await supabase.from('user_roles').select('*');

    const profilesWithRoles = (profilesData || []).map((profile) => ({
      ...profile,
      roles: (rolesData || [])
        .filter((r) => r.user_id === profile.id)
        .map((r) => r.role),
    }));

    setProfiles(profilesWithRoles);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleCreateUser = async () => {
    if (!newEmail || !newPassword) {
      toast({
        title: 'Erreur',
        description: 'Email et mot de passe requis.',
        variant: 'destructive',
      });
      return;
    }

    setCreating(true);

    // Create user via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: newEmail,
      password: newPassword,
      options: {
        data: { full_name: newFullName },
      },
    });

    if (authError) {
      toast({
        title: 'Erreur',
        description: authError.message,
        variant: 'destructive',
      });
      setCreating(false);
      return;
    }

    // Add role
    if (authData.user && newRole) {
      const { error: roleError } = await supabase.from('user_roles').insert([
        {
          user_id: authData.user.id,
          role: newRole,
        },
      ]);

      if (roleError) {
        console.error('Error adding role:', roleError);
      }
    }

    toast({
      title: 'Succès',
      description: 'Utilisateur créé avec succès.',
    });

    setDialogOpen(false);
    setNewEmail('');
    setNewPassword('');
    setNewFullName('');
    setNewRole('editor');
    setCreating(false);

    // Wait a moment for the trigger to create the profile
    setTimeout(fetchProfiles, 1000);
  };

  const handleAddRole = async (userId: string, role: AppRole) => {
    const { error } = await supabase.from('user_roles').insert([
      { user_id: userId, role },
    ]);

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter le rôle.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Succès',
        description: 'Rôle ajouté.',
      });
      fetchProfiles();
    }
  };

  const handleRemoveRole = async (userId: string, role: AppRole) => {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', role);

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de retirer le rôle.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Succès',
        description: 'Rôle retiré.',
      });
      fetchProfiles();
    }
  };

  const getRoleBadge = (role: AppRole) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-500">Admin</Badge>;
      case 'editor':
        return <Badge className="bg-blue-500">Éditeur</Badge>;
      case 'user':
        return <Badge variant="secondary">Utilisateur</Badge>;
      default:
        return <Badge>{role}</Badge>;
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
          <h1 className="text-3xl font-bold">Utilisateurs</h1>
          <p className="text-muted-foreground">Gérez les utilisateurs et leurs rôles</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Nouvel utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un utilisateur</DialogTitle>
              <DialogDescription>
                Créez un nouveau compte utilisateur avec un rôle.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nom complet</Label>
                <Input
                  id="fullName"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="Jean Dupont"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="jean@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe *</Label>
                <Input
                  id="password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select value={newRole} onValueChange={(value: AppRole) => setNewRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="editor">Éditeur</SelectItem>
                    <SelectItem value="user">Utilisateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateUser} disabled={creating}>
                {creating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création...
                  </>
                ) : (
                  'Créer'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {profiles.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">Aucun utilisateur</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôles</TableHead>
                <TableHead>Inscription</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">
                    {profile.full_name || '-'}
                  </TableCell>
                  <TableCell>{profile.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {profile.roles.length > 0 ? (
                        profile.roles.map((role) => (
                          <div key={role} className="flex items-center gap-1">
                            {getRoleBadge(role)}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 text-muted-foreground hover:text-destructive"
                              onClick={() => handleRemoveRole(profile.id, role)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <span className="text-muted-foreground">Aucun rôle</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(profile.created_at), 'dd MMM yyyy', { locale: fr })}
                  </TableCell>
                  <TableCell>
                    <Select onValueChange={(role: AppRole) => handleAddRole(profile.id, role)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Ajouter rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Éditeur</SelectItem>
                        <SelectItem value="user">Utilisateur</SelectItem>
                      </SelectContent>
                    </Select>
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

export default AdminUsers;
