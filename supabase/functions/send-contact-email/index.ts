import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Validation et nettoyage des entrées
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<[^>]*>/g, '') // Supprimer les balises HTML
    .slice(0, 2000); // Limiter la longueur
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 100;
};

const containsSuspiciousContent = (text: string): boolean => {
  const suspiciousPatterns = [
    /\[url=/i,
    /<a\s+href=/i,
    /javascript:/i,
    /data:text\/html/i,
    /onclick=/i,
    /onerror=/i,
  ];
  return suspiciousPatterns.some(pattern => pattern.test(text));
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Service email non configuré. Contactez-nous par téléphone." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const body = await req.json();
    const { name, email, phone, subject, message }: ContactEmailRequest = body;

    // Validation des champs obligatoires
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Tous les champs obligatoires doivent être remplis" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validation de l'email
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Adresse email invalide" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Nettoyage des entrées
    const cleanName = sanitizeInput(name);
    const cleanSubject = sanitizeInput(subject);
    const cleanMessage = sanitizeInput(message);
    const cleanPhone = phone ? sanitizeInput(phone) : undefined;

    // Vérification du contenu suspect
    if (containsSuspiciousContent(cleanMessage) || containsSuspiciousContent(cleanSubject)) {
      console.warn("Suspicious content detected in form submission");
      return new Response(
        JSON.stringify({ error: "Le message contient des éléments non autorisés" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validation de la longueur minimale
    if (cleanName.length < 2 || cleanSubject.length < 3 || cleanMessage.length < 10) {
      return new Response(
        JSON.stringify({ error: "Les champs ne respectent pas la longueur minimale requise" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Échapper les caractères HTML pour l'affichage sécurisé
    const escapeHtml = (str: string): string => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Nouveau message de contact</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #8B1538; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
            Nouveau message de contact - CENDF
          </h2>
          <table style="width: 100%; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Nom :</td>
              <td style="padding: 8px 0;">${escapeHtml(cleanName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email :</td>
              <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
            </tr>
            ${cleanPhone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Téléphone :</td>
              <td style="padding: 8px 0;">${escapeHtml(cleanPhone)}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Sujet :</td>
              <td style="padding: 8px 0;">${escapeHtml(cleanSubject)}</td>
            </tr>
          </table>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h3 style="margin-top: 0; color: #8B1538;">Message :</h3>
            <p style="white-space: pre-wrap;">${escapeHtml(cleanMessage)}</p>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            Ce message a été envoyé via le formulaire de contact du site CENDF.
          </p>
        </div>
      </body>
      </html>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CENDF Contact <onboarding@resend.dev>",
        to: ["cherifraboubacar@gmail.com"],
        reply_to: email,
        subject: `[CENDF Contact] ${cleanSubject}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend API error:", errorText);
      throw new Error("Erreur lors de l'envoi de l'email");
    }

    console.log("Email sent successfully to cherifraboubacar@gmail.com");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue";
    console.error("Error processing contact form:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
