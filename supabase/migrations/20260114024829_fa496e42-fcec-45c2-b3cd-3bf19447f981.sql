-- Supprimer les anciennes politiques problématiques
DROP POLICY IF EXISTS "Anyone can view settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Créer des politiques sécurisées pour site_settings (admin seulement)
CREATE POLICY "Only admins can view settings" 
ON public.site_settings 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Mettre à jour les politiques profiles pour être plus restrictives
-- Seuls les utilisateurs authentifiés peuvent voir leur propre profil
-- Les admins peuvent voir tous les profils mais seulement en étant authentifiés
CREATE POLICY "Admins can view all profiles authenticated" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));