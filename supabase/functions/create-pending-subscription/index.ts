// Creates a pending_subscriptions row (server-side, no RLS exposure)
// and returns a Genius Pay checkout URL. Account is provisioned only
// when the payment webhook fires.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const PLAN_AMOUNT: Record<string, number> = {
  digital: 5000,
  paper: 10000,
  premium: 15000,
};

interface Body {
  full_name: string;
  email: string;
  phone: string;
  country: string;
  plan: 'digital' | 'paper' | 'premium';
  password: string;
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = (await req.json()) as Body;

    // Validation
    if (!body.full_name || body.full_name.trim().length < 2 || body.full_name.length > 120)
      return bad('Nom invalide');
    if (!body.email || !isEmail(body.email) || body.email.length > 200)
      return bad('Email invalide');
    if (!body.phone || body.phone.length < 6 || body.phone.length > 30)
      return bad('Téléphone invalide');
    if (!body.country || body.country.length > 4)
      return bad('Pays invalide');
    if (!body.password || body.password.length < 8 || body.password.length > 128)
      return bad('Mot de passe trop court (min. 8)');
    const plan = body.plan;
    const amount = PLAN_AMOUNT[plan];
    if (!amount) return bad('Formule invalide');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Check existing user
    const { data: list } = await supabase.auth.admin.listUsers();
    if (list?.users?.some((u) => u.email?.toLowerCase() === body.email.toLowerCase())) {
      return bad('Un compte existe déjà avec cet email. Connectez-vous.', 409);
    }

    const { data: pending, error: insErr } = await supabase
      .from('pending_subscriptions')
      .insert({
        email: body.email.toLowerCase(),
        full_name: body.full_name.trim(),
        phone: body.phone,
        country: body.country,
        plan,
        amount,
        password_hash: body.password, // used only inside webhook with service role
      })
      .select()
      .single();

    if (insErr || !pending) {
      console.error('insert error', insErr);
      return bad('Erreur création abonnement', 500);
    }

    const apiKey = Deno.env.get('GENIUS_API_KEY');
    const apiSecret = Deno.env.get('GENIUS_API_SECRET');
    if (!apiKey || !apiSecret) return bad('Configuration paiement manquante', 500);

    const origin = req.headers.get('origin') || 'https://cedfci.org';
    const projectRef = Deno.env.get('SUPABASE_URL')!.split('//')[1].split('.')[0];
    const webhookUrl = `https://${projectRef}.functions.supabase.co/genius-webhook`;

    const payload = {
      amount,
      currency: 'XOF',
      description: `Abonnement Credo ${plan} - CEDF`,
      customer: {
        name: body.full_name,
        email: body.email,
        phone: body.phone,
        country: body.country,
      },
      metadata: { pending_id: pending.id, plan },
      success_url: `${origin}/paiement-succes?ref={REFERENCE}`,
      error_url: `${origin}/paiement-echec?ref={REFERENCE}`,
      webhook_url: webhookUrl,
      callback_url: webhookUrl,
    };

    const res = await fetch('https://pay.genius.ci/api/v1/merchant/payments', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'X-API-Secret': apiSecret,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const gData = await res.json().catch(() => ({}));
    if (!res.ok || !gData?.success) {
      console.error('Genius error', res.status, gData);
      return bad(gData?.message || 'Erreur création paiement', 502);
    }

    const result = gData.data ?? {};
    const reference = result.reference;
    const checkout_url = result.checkout_url || result.payment_url;

    // Persist reference for webhook lookup
    await supabase.from('pending_subscriptions')
      .update({ reference }).eq('id', pending.id);

    return new Response(JSON.stringify({ success: true, checkout_url, reference }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('exception', e);
    return bad('Erreur serveur', 500);
  }
});

function bad(msg: string, status = 400) {
  return new Response(JSON.stringify({ error: msg }), {
    status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
