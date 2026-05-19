
-- Pending subscriptions (created before payment, consumed by webhook after success)
CREATE TABLE IF NOT EXISTS public.pending_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text UNIQUE,
  email text NOT NULL,
  full_name text NOT NULL,
  phone text NOT NULL,
  country text NOT NULL DEFAULT 'CI',
  plan text NOT NULL DEFAULT 'digital',
  amount integer NOT NULL,
  password_hash text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  consumed_at timestamptz
);

ALTER TABLE public.pending_subscriptions ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write (no public access at all)
CREATE POLICY "Deny all to anon and authenticated" ON public.pending_subscriptions
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- Add tier requirement to documents (magazines reuse documents table)
ALTER TABLE public.documents
  ADD COLUMN IF NOT EXISTS tier_required text NOT NULL DEFAULT 'all';

-- Admin delete user function
CREATE OR REPLACE FUNCTION public.admin_delete_user(_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;
  DELETE FROM public.subscriptions WHERE user_id = _user_id;
  DELETE FROM public.user_roles WHERE user_id = _user_id;
  DELETE FROM public.profiles WHERE id = _user_id;
  DELETE FROM auth.users WHERE id = _user_id;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_delete_user(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_delete_user(uuid) TO authenticated;
