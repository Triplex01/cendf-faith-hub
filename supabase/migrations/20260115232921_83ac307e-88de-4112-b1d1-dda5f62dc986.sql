-- Supprimer TOUTES les politiques existantes sur profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Block anonymous access to profiles" ON public.profiles;

-- S'assurer que RLS est activé
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Forcer RLS même pour le propriétaire de la table (sécurité maximale)
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;

-- Politique 1: Les utilisateurs authentifiés peuvent voir UNIQUEMENT leur propre profil
CREATE POLICY "Authenticated users view own profile only"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Politique 2: Les utilisateurs authentifiés peuvent mettre à jour UNIQUEMENT leur propre profil
CREATE POLICY "Authenticated users update own profile only"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Politique 3: Les utilisateurs authentifiés peuvent créer UNIQUEMENT leur propre profil
CREATE POLICY "Authenticated users insert own profile only"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Politique 4: Les utilisateurs authentifiés peuvent supprimer UNIQUEMENT leur propre profil
CREATE POLICY "Authenticated users delete own profile only"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = id);

-- Note: Aucune politique pour 'anon' = les utilisateurs anonymes n'ont AUCUN accès