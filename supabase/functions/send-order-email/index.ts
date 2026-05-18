import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOGO_URL = "https://tcopofuxtzqpwryantou.supabase.co/storage/v1/object/public/email-assets/logo-cedf.png?v=1";
const CEDF_EMAIL = "contact@cedfci.org";

type OrderType = "magazine" | "subscription";

interface OrderEmailRequest {
  type: OrderType;
  customer: {
    name: string;
    email: string;
    phone?: string;
    city?: string;
    address?: string;
  };
  product: {
    name: string;
    plan?: string;          // for subscription: digital / paper / premium
    quantity?: number;
    price: number;          // XOF
  };
  reference?: string;
  paymentStatus?: "pending" | "paid";
}

const esc = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(Math.round(n)) + " FCFA";

const renderEmail = (opts: {
  audience: "client" | "admin";
  data: OrderEmailRequest;
}) => {
  const { audience, data } = opts;
  const isMag = data.type === "magazine";
  const date = new Date().toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });

  const badgeLabel = isMag ? "📕 Commande Magazine" : "⭐ Nouvel Abonnement";
  const badgeColor = isMag ? "#A90B0C" : "#CD9804";

  const title = audience === "client"
    ? (isMag ? "Merci pour votre commande !" : "Bienvenue parmi les abonnés Credo")
    : (isMag ? "Nouvelle commande de magazine" : "Nouvel abonnement Credo");

  const intro = audience === "client"
    ? (isMag
        ? `Bonjour ${esc(data.customer.name)},<br/>Nous avons bien reçu votre commande. Notre équipe vous contactera pour la livraison de votre magazine.`
        : `Bonjour ${esc(data.customer.name)},<br/>Merci d'avoir souscrit à <strong>Credo</strong>. Votre abonnement est en cours d'activation.`)
    : (isMag
        ? `Une nouvelle commande de magazine a été passée sur le site CEDF.`
        : `Un nouvel abonnement a été souscrit sur le site CEDF.`);

  const customerBlock = `
    <table role="presentation" style="width:100%;background:#fafafa;border-radius:12px;margin:16px 0;">
      <tr><td style="padding:18px;">
        <p style="margin:0 0 4px;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">Client</p>
        <p style="margin:0 0 12px;color:#222;font-size:15px;font-weight:600;">${esc(data.customer.name)}</p>
        <p style="margin:0;color:#444;font-size:13px;line-height:1.6;">
          ✉ <a href="mailto:${esc(data.customer.email)}" style="color:#A90B0C;text-decoration:none;">${esc(data.customer.email)}</a><br/>
          ${data.customer.phone ? `📞 ${esc(data.customer.phone)}<br/>` : ""}
          ${data.customer.city ? `📍 ${esc(data.customer.city)}` : ""}
          ${data.customer.address ? `<br/>🏠 ${esc(data.customer.address)}` : ""}
        </p>
      </td></tr>
    </table>`;

  const productBlock = `
    <table role="presentation" style="width:100%;background:#fff;border:2px solid #e6e6e6;border-left:4px solid ${badgeColor};border-radius:8px;margin:8px 0 16px;">
      <tr><td style="padding:18px;">
        <p style="margin:0 0 4px;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">${isMag ? "Magazine commandé" : "Formule d'abonnement"}</p>
        <p style="margin:0 0 10px;color:#222;font-size:16px;font-weight:700;">${esc(data.product.name)}</p>
        ${data.product.plan ? `<p style="margin:0;color:#666;font-size:13px;">Formule : <strong style="color:#A90B0C;">${esc(data.product.plan)}</strong></p>` : ""}
        <hr style="border:none;border-top:1px dashed #ddd;margin:14px 0;"/>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="color:#666;font-size:13px;">Montant${isMag ? "" : " annuel"}</span>
          <span style="color:#A90B0C;font-size:22px;font-weight:700;">${fmt(data.product.price)}</span>
        </div>
        ${data.reference ? `<p style="margin:12px 0 0;color:#888;font-size:11px;">Référence : <span style="font-family:monospace;color:#444;">${esc(data.reference)}</span></p>` : ""}
        ${data.paymentStatus ? `<p style="margin:6px 0 0;"><span style="display:inline-block;background:${data.paymentStatus === "paid" ? "#16a34a" : "#f59e0b"};color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:10px;text-transform:uppercase;">${data.paymentStatus === "paid" ? "Payé" : "En attente de paiement"}</span></p>` : ""}
      </td></tr>
    </table>`;

  const nextSteps = audience === "client"
    ? `
      <h3 style="margin:24px 0 10px;color:#A90B0C;font-size:14px;text-transform:uppercase;letter-spacing:.5px;">Prochaines étapes</h3>
      <ol style="margin:0;padding-left:18px;color:#444;font-size:14px;line-height:1.8;">
        ${isMag
          ? `<li>Confirmation du paiement</li><li>Préparation de votre magazine</li><li>Livraison ou contact pour le retrait</li>`
          : `<li>Activation de votre abonnement sous 24h</li><li>Envoi de vos identifiants par email</li><li>Réception des prochaines parutions</li>`
        }
      </ol>
      <p style="margin:20px 0 0;color:#666;font-size:13px;">Une question ? Écrivez-nous à <a href="mailto:${CEDF_EMAIL}" style="color:#A90B0C;">${CEDF_EMAIL}</a> ou appelez le <strong>07 79 10 45 15</strong>.</p>`
    : "";

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
<table role="presentation" style="width:100%;border-collapse:collapse;"><tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" style="width:100%;max-width:600px;background:#fff;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,.08);overflow:hidden;">
    <tr><td style="background:linear-gradient(135deg,#A90B0C 0%,#8B0A0B 100%);padding:28px 36px;text-align:center;">
      <img src="${LOGO_URL}" alt="CEDF" style="width:72px;height:72px;border-radius:50%;background:#fff;padding:8px;margin-bottom:12px;"/>
      <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">Commission Épiscopale pour la Doctrine de la Foi</h1>
      <p style="margin:6px 0 0;color:#CD9804;font-size:13px;font-weight:600;">Côte d'Ivoire</p>
    </td></tr>
    <tr><td style="padding:22px 36px 0;">
      <span style="display:inline-block;background:${badgeColor};color:#fff;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:7px 14px;border-radius:20px;">${badgeLabel}</span>
      <p style="margin:10px 0 0;color:#888;font-size:12px;">${date}</p>
    </td></tr>
    <tr><td style="padding:18px 36px 28px;">
      <h2 style="margin:0 0 14px;color:#A90B0C;font-size:22px;font-weight:700;border-bottom:2px solid #CD9804;padding-bottom:10px;">${esc(title)}</h2>
      <p style="margin:0;color:#444;font-size:14px;line-height:1.7;">${intro}</p>
      ${customerBlock}
      ${productBlock}
      ${nextSteps}
    </td></tr>
    <tr><td style="background:#2a2a2a;padding:22px 36px;text-align:center;">
      <p style="margin:0 0 6px;color:#CD9804;font-size:13px;font-weight:600;">CEDF — Commission Épiscopale pour la Doctrine de la Foi</p>
      <p style="margin:0;color:#999;font-size:11px;line-height:1.6;">Archidiocèse d'Abidjan · Côte d'Ivoire<br/>
      <a href="mailto:${CEDF_EMAIL}" style="color:#CD9804;text-decoration:none;">${CEDF_EMAIL}</a></p>
    </td></tr>
  </table>
</td></tr></table></body></html>`;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      return new Response(JSON.stringify({ error: "Email service non configuré" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const body = (await req.json()) as OrderEmailRequest;

    if (!body?.type || !["magazine", "subscription"].includes(body.type))
      return new Response(JSON.stringify({ error: "Type invalide" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    if (!body.customer?.name || !body.customer?.email || !body.product?.name || typeof body.product?.price !== "number")
      return new Response(JSON.stringify({ error: "Champs manquants" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.customer.email))
      return new Response(JSON.stringify({ error: "Email invalide" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });

    const subjectClient = body.type === "magazine"
      ? `Confirmation de votre commande Credo`
      : `Bienvenue — Votre abonnement Credo (${body.product.plan || ""})`;
    const subjectAdmin = body.type === "magazine"
      ? `[CEDF] Nouvelle commande — ${body.customer.name}`
      : `[CEDF] Nouvel abonnement (${body.product.plan || ""}) — ${body.customer.name}`;

    const from = "CEDF Credo <contact@cedfci.org>";

    const send = (to: string[], subject: string, html: string, reply_to?: string) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, subject, html, ...(reply_to ? { reply_to } : {}) }),
      });

    const [r1, r2] = await Promise.all([
      send([body.customer.email], subjectClient, renderEmail({ audience: "client", data: body }), CEDF_EMAIL),
      send([CEDF_EMAIL], subjectAdmin, renderEmail({ audience: "admin", data: body }), body.customer.email),
    ]);

    if (!r1.ok || !r2.ok) {
      const e1 = !r1.ok ? await r1.text() : null;
      const e2 = !r2.ok ? await r2.text() : null;
      console.error("Resend errors", { e1, e2 });
      // Don't fail hard if at least one succeeded
      if (!r1.ok && !r2.ok) {
        return new Response(JSON.stringify({ error: "Envoi email échoué", details: e1 || e2 }), {
          status: 502, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur serveur";
    console.error("send-order-email error", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
