-- Fix infinite admin loading: adjust user_roles RLS so admins can manage roles, and users can read their own roles.

-- Remove overly restrictive policy that blocks non-admin role reads.
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- Admins can do everything on user_roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Users (including admins/editors) can read their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);