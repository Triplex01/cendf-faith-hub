-- Supprimer les politiques RLS redondantes sur site_settings
-- (la politique "Admins can manage settings" couvre déjà tout avec ALL)

DROP POLICY IF EXISTS "Only admins can delete site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Only admins can insert site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Only admins can update site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Only admins can view site_settings" ON public.site_settings;

-- Garder uniquement la politique consolidée:
-- "Admins can manage settings" (command: ALL) et "Only admins can view settings" (SELECT)
-- On supprime "Only admins can view settings" car "Admins can manage settings" couvre déjà
DROP POLICY IF EXISTS "Only admins can view settings" ON public.site_settings;