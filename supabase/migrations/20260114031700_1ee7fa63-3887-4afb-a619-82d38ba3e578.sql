-- Fix security: Ensure site_settings table has proper RLS for anonymous denial
-- Drop existing policies and recreate with proper security

-- First, check if policies exist and recreate them properly
DROP POLICY IF EXISTS "Admins can view settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can update settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can insert settings" ON public.site_settings;

-- Create policies that explicitly require authentication
-- Only admins can view site settings
CREATE POLICY "Only admins can view site_settings" 
ON public.site_settings 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Only admins can insert site settings
CREATE POLICY "Only admins can insert site_settings" 
ON public.site_settings 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Only admins can update site settings
CREATE POLICY "Only admins can update site_settings" 
ON public.site_settings 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Only admins can delete site settings
CREATE POLICY "Only admins can delete site_settings" 
ON public.site_settings 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);