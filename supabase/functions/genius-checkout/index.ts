import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

interface CheckoutBody {
  amount: number;
  description?: string;
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    country?: string;
  };
  metadata?: Record<string, unknown>;
  success_url?: string;
  error_url?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = (await req.json()) as CheckoutBody;

    // Validation
    if (!body || typeof body.amount !== 'number' || body.amount < 200) {
      return new Response(
        JSON.stringify({ error: 'Montant invalide (minimum 200 XOF)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    if (body.description && body.description.length > 500) {
      return new Response(JSON.stringify({ error: 'Description trop longue' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = Deno.env.get('GENIUS_API_KEY');
    const apiSecret = Deno.env.get('GENIUS_API_SECRET');
    if (!apiKey || !apiSecret) {
      return new Response(JSON.stringify({ error: 'Configuration paiement manquante' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const payload = {
      amount: Math.round(body.amount),
      currency: 'XOF',
      description: body.description?.slice(0, 500) ?? 'Commande CEDF',
      customer: body.customer ?? {},
      metadata: body.metadata ?? {},
      success_url: body.success_url,
      error_url: body.error_url,
    };

    const response = await fetch('https://pay.genius.ci/api/v1/merchant/payments', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'X-API-Secret': apiSecret,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data?.success) {
      console.error('Genius Pay error', response.status, data);
      return new Response(
        JSON.stringify({
          error: data?.message || 'Erreur lors de la création du paiement',
          details: data,
        }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = data.data ?? {};
    return new Response(
      JSON.stringify({
        success: true,
        reference: result.reference,
        checkout_url: result.checkout_url || result.payment_url,
        amount: result.amount,
        status: result.status,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('genius-checkout exception', err);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
