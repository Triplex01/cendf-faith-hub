-- Add explicit deny policy for anonymous users on profiles table
-- This provides defense in depth against potential RLS misconfigurations
CREATE POLICY "Block anonymous access to profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);