import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2 } from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'CENDF - Conférence Épiscopale Nationale de Côte d\'Ivoire',
    siteDescription: 'Site officiel de la Conférence Épiscopale Nationale de Côte d\'Ivoire',
    contactEmail: 'contact@cendf.org',
    contactPhone: '+225 27 22 44 55 66',
    address: 'Abidjan, Côte d\'Ivoire',
    socialFacebook: '',
    socialTwitter: '',
    socialYoutube: '',
  });

  const handleSave = async () => {
    setSaving(true);
    
    // Simulate save - in real implementation, save to site_settings table
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: 'Succès',
      description: 'Paramètres enregistrés avec succès.',
    });
    
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Configuration générale du site</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
            <CardDescription>
              Paramètres de base du site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Nom du site</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings((prev) => ({ ...prev, siteName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings((prev) => ({ ...prev, siteDescription: e.target.value }))}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coordonnées</CardTitle>
            <CardDescription>
              Informations de contact
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email de contact</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings((prev) => ({ ...prev, contactEmail: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Téléphone</Label>
              <Input
                id="contactPhone"
                value={settings.contactPhone}
                onChange={(e) => setSettings((prev) => ({ ...prev, contactPhone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) => setSettings((prev) => ({ ...prev, address: e.target.value }))}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Réseaux sociaux</CardTitle>
            <CardDescription>
              Liens vers les réseaux sociaux
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="socialFacebook">Facebook</Label>
              <Input
                id="socialFacebook"
                value={settings.socialFacebook}
                onChange={(e) => setSettings((prev) => ({ ...prev, socialFacebook: e.target.value }))}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="socialTwitter">Twitter/X</Label>
              <Input
                id="socialTwitter"
                value={settings.socialTwitter}
                onChange={(e) => setSettings((prev) => ({ ...prev, socialTwitter: e.target.value }))}
                placeholder="https://twitter.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="socialYoutube">YouTube</Label>
              <Input
                id="socialYoutube"
                value={settings.socialYoutube}
                onChange={(e) => setSettings((prev) => ({ ...prev, socialYoutube: e.target.value }))}
                placeholder="https://youtube.com/..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>
              Sauvegardez vos modifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer les paramètres
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
