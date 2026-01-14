-- Renforcer la sécurité des user_roles pour les utilisateurs authentifiés uniquement
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles authenticated" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);