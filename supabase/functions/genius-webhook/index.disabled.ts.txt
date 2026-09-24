// Genius Pay webhook: consumes pending_subscriptions on payment success
// and provisions the user account + active subscription server-side.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const PLAN_AMOUNT: Record<string, number> = {
  digital: 5000,
  paper: 10000,
  premium: 15000,
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const rawBody = await req.text();

    // Verify HMAC signature when webhook secret is configured
    const webhookSecret = Deno.env.get('GENIUS_WEBHOOK_SECRET');
    if (webhookSecret) {
      const sigHeader =
        req.headers.get('x-genius-signature') ||
        req.headers.get('x-webhook-signature') ||
        req.headers.get('x-signature') ||
        '';
      const provided = sigHeader.replace(/^sha256=/i, '').trim().toLowerCase();
      try {
        const key = await crypto.subtle.importKey(
          'raw',
          new TextEncoder().encode(webhookSecret),
          { name: 'HMAC', hash: 'SHA-256' },
          false,
          ['sign'],
        );
        const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody));
        const expected = Array.from(new Uint8Array(sig))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        if (!provided || provided !== expected) {
          console.warn('Invalid webhook signature', { provided: provided.slice(0, 8) });
          return new Response(JSON.stringify({ error: 'invalid signature' }), {
            status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } catch (e) {
        console.error('signature verify error', e);
        return new Response(JSON.stringify({ error: 'signature error' }), {
          status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    const body = JSON.parse(rawBody || '{}');
    const data = body?.data ?? body;
    const reference: string | undefined = data?.reference || data?.payment_reference || body?.reference;
    const status: string = (data?.status || body?.status || '').toString().toLowerCase();
    const amount = Number(data?.amount || body?.amount || 0);

    if (!reference) {
      return new Response(JSON.stringify({ error: 'Missing reference' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: pending, error: pErr } = await supabase
      .from('pending_subscriptions')
      .select('*')
      .eq('reference', reference)
      .maybeSingle();

    if (pErr || !pending) {
      console.warn('No pending row for reference', reference, pErr);
      return new Response(JSON.stringify({ ok: true, ignored: true }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (pending.status === 'consumed') {
      return new Response(JSON.stringify({ ok: true, already: true }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!['success', 'completed', 'paid'].includes(status)) {
      await supabase.from('pending_subscriptions').update({ status: 'failed' }).eq('id', pending.id);
      return new Response(JSON.stringify({ ok: true, status: 'failed' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify amount matches plan
    const expected = PLAN_AMOUNT[pending.plan] ?? 0;
    if (expected && amount && Math.abs(amount - expected) > 1) {
      console.error('Amount mismatch', { amount, expected });
      return new Response(JSON.stringify({ error: 'amount mismatch' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create the auth user (password from pending row)
    const { data: created, error: cErr } = await supabase.auth.admin.createUser({
      email: pending.email,
      password: pending.password_hash,
      email_confirm: true,
      user_metadata: { full_name: pending.full_name, phone: pending.phone, country: pending.country },
    });

    let userId = created?.user?.id;
    if (cErr || !userId) {
      // If user already exists, look it up
      const { data: list } = await supabase.auth.admin.listUsers();
      userId = list?.users?.find((u) => u.email === pending.email)?.id;
      if (!userId) {
        console.error('createUser failed', cErr);
        return new Response(JSON.stringify({ error: 'user creation failed' }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);

    await supabase.from('subscriptions').insert({
      user_id: userId,
      plan: pending.plan,
      status: 'active',
      billing_name: pending.full_name,
      billing_phone: pending.phone,
      payment_method: 'genius',
      end_date: endDate.toISOString(),
    });

    await supabase.from('pending_subscriptions')
      .update({ status: 'consumed', consumed_at: new Date().toISOString() })
      .eq('id', pending.id);

    // Best-effort confirmation email (existing function)
    supabase.functions.invoke('send-order-email', {
      body: {
        type: 'subscription',
        customer: { name: pending.full_name, email: pending.email, phone: pending.phone },
        product: { name: `Abonnement Credo ${pending.plan}`, price: pending.amount, quantity: 1 },
        paymentStatus: 'paid',
      },
    }).catch(() => {});

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('webhook error', e);
    return new Response(JSON.stringify({ error: 'server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
