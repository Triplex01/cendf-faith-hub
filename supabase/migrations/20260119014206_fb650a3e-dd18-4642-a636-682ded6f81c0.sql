-- Ajouter une politique pour bloquer explicitement l'accès anonyme (non authentifié) à la table profiles
-- Cette politique refuse toute lecture par le rôle 'anon' (utilisateurs non connectés)

CREATE POLICY "Deny public anonymous access"
ON public.profiles
FOR SELECT
TO anon
USING (false);