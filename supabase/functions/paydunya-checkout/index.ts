import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MASTER_KEY = Deno.env.get("PAYDUNYA_MASTER_KEY");
    const PRIVATE_KEY = Deno.env.get("PAYDUNYA_PRIVATE_KEY");
    const TOKEN = Deno.env.get("PAYDUNYA_TOKEN");

    if (!MASTER_KEY || !PRIVATE_KEY || !TOKEN) {
      throw new Error("PayDunya keys not configured");
    }

    const { items, totalAmount, customerName, customerEmail, customerPhone } = await req.json();

    // Validate inputs
    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "Panier vide" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return new Response(JSON.stringify({ error: "Montant invalide" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!customerPhone || customerPhone.length < 8) {
      return new Response(JSON.stringify({ error: "Numéro de téléphone invalide" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build invoice items for PayDunya
    const invoiceItems: Record<string, { name: string; quantity: number; unit_price: string; total_price: string; description: string }> = {};
    items.forEach((item: { name: string; quantity: number; price: number; id: number }, index: number) => {
      invoiceItems[`item_${index}`] = {
        name: item.name,
        quantity: item.quantity,
        unit_price: String(item.price),
        total_price: String(item.price * item.quantity),
        description: item.name,
      };
    });

    // Create PayDunya checkout invoice
    const response = await fetch("https://app.paydunya.com/sandbox-api/v1/checkout-invoice/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "PAYDUNYA-MASTER-KEY": MASTER_KEY,
        "PAYDUNYA-PRIVATE-KEY": PRIVATE_KEY,
        "PAYDUNYA-TOKEN": TOKEN,
      },
      body: JSON.stringify({
        invoice: {
          items: invoiceItems,
          taxes: {},
          total_amount: totalAmount,
          description: `Commande CEDF - ${items.length} article(s)`,
        },
        store: {
          name: "CEDF Boutique",
          tagline: "Commission Épiscopale pour la Doctrine de la Foi",
          phone: "0787830395",
          postal_address: "Abidjan, Côte d'Ivoire",
          website_url: "https://cendf-faith-hub.lovable.app",
        },
        custom_data: {
          customer_name: customerName || "",
          customer_email: customerEmail || "",
          customer_phone: customerPhone,
        },
        actions: {
          cancel_url: "https://cendf-faith-hub.lovable.app/boutique",
          return_url: "https://cendf-faith-hub.lovable.app/boutique?payment=success",
          callback_url: "https://cendf-faith-hub.lovable.app/boutique",
        },
      }),
    });

    const data = await response.json();
    console.log("PayDunya response:", JSON.stringify(data));

    if (data.response_code === "00" && data.token) {
      return new Response(
        JSON.stringify({
          success: true,
          token: data.token,
          url: data.response_text,
          mode: "test",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      console.error("PayDunya error:", JSON.stringify(data));
      return new Response(
        JSON.stringify({
          success: false,
          error: data.response_text || "Erreur lors de la création de la facture",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Checkout error:", error);
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
