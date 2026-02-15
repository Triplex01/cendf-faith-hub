-- Fix storage policy: restrict uploads to admins only
DROP POLICY IF EXISTS "Admins can upload email assets" ON storage.objects;

CREATE POLICY "Admins can upload email assets"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'email-assets' 
  AND has_role(auth.uid(), 'admin'::app_role)
);