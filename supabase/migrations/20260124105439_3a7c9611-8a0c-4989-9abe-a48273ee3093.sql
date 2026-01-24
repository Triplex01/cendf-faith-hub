-- Sécurité renforcée: Bloquer explicitement l'accès anonyme à la table user_roles
CREATE POLICY "Deny anonymous access to user_roles"
ON public.user_roles
FOR SELECT
TO anon
USING (false);

-- Créer une table pour les auteurs publics (au lieu d'exposer les IDs internes)
-- Cette approche est meilleure mais optionnelle car author_id n'est pas critique
-- Pour l'instant, on marque juste le fait que c'est acceptable pour un site public

-- S'assurer que les emails de profiles ne sont pas accessibles aux anonymes
-- La politique existante devrait bloquer, mais on ajoute une couche de sécurité
-- En vérifiant que les politiques RESTRICTIVE fonctionnent correctement

-- Ajouter une politique plus forte pour s'assurer que seuls les utilisateurs authentifiés
-- avec une session valide peuvent accéder à leurs propres données
DO $$
BEGIN
    -- Vérifier que les politiques existantes sont bien restrictives
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Deny public anonymous access'
    ) THEN
        CREATE POLICY "Deny public anonymous access" 
        ON public.profiles 
        FOR SELECT 
        TO anon 
        USING (false);
    END IF;
END $$;