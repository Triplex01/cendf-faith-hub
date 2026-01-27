-- Add explicit deny policy for public/anonymous access to site_settings
CREATE POLICY "Deny public anonymous access to site_settings"
ON public.site_settings
FOR SELECT
USING (false);

-- Note: The existing "Admins can manage settings" policy with ALL command 
-- will take precedence for authenticated admin users