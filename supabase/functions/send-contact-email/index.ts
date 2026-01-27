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
  honeypot?: string;
  formStartTime?: number;
}

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 requests per hour per IP

const checkRateLimit = (ip: string): { allowed: boolean; remaining: number } => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count };
};

// Validation et nettoyage des entrées
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<[^>]*>/g, '')
    .slice(0, 2000);
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

// Échapper les caractères HTML
const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// URL du logo CEDF hébergé sur Supabase Storage
const LOGO_URL = "https://tcopofuxtzqpwryantou.supabase.co/storage/v1/object/public/email-assets/logo-cedf.png?v=1";

// Template email professionnel pour le formulaire de contact
const createContactEmailTemplate = (data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  clientIP: string;
}): string => {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message de contact - CEDF</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header avec logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #A90B0C 0%, #8B0A0B 100%); padding: 30px 40px; text-align: center;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td align="center">
                    <img src="${LOGO_URL}" alt="CEDF Logo" style="width: 80px; height: 80px; border-radius: 50%; background-color: #ffffff; padding: 8px; margin-bottom: 15px;"/>
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">
                      Commission Épiscopale pour la Doctrine de la Foi
                    </h1>
                    <p style="margin: 8px 0 0 0; color: #CD9804; font-size: 14px; font-weight: 600;">
                      Côte d'Ivoire
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Badge de catégorie -->
          <tr>
            <td style="padding: 25px 40px 0 40px;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td>
                    <span style="display: inline-block; background: linear-gradient(135deg, #CD9804 0%, #B8860B 100%); color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 8px 16px; border-radius: 20px;">
                      📬 Formulaire de Contact
                    </span>
                    <p style="margin: 12px 0 0 0; color: #666666; font-size: 13px;">
                      ${currentDate}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contenu principal -->
          <tr>
            <td style="padding: 25px 40px;">
              <h2 style="margin: 0 0 20px 0; color: #A90B0C; font-size: 20px; font-weight: 600; border-bottom: 2px solid #CD9804; padding-bottom: 10px;">
                Nouveau message reçu
              </h2>

              <!-- Informations de l'expéditeur -->
              <table role="presentation" style="width: 100%; background-color: #fafafa; border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Nom complet</span>
                          <p style="margin: 4px 0 0 0; color: #333333; font-size: 16px; font-weight: 600;">${escapeHtml(data.name)}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                          <p style="margin: 4px 0 0 0;">
                            <a href="mailto:${escapeHtml(data.email)}" style="color: #A90B0C; font-size: 16px; text-decoration: none; font-weight: 500;">${escapeHtml(data.email)}</a>
                          </p>
                        </td>
                      </tr>
                      ${data.phone ? `
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Téléphone</span>
                          <p style="margin: 4px 0 0 0; color: #333333; font-size: 16px; font-weight: 500;">${escapeHtml(data.phone)}</p>
                        </td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Sujet</span>
                          <p style="margin: 4px 0 0 0; color: #333333; font-size: 16px; font-weight: 600;">${escapeHtml(data.subject)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="background-color: #ffffff; border: 2px solid #e0e0e0; border-left: 4px solid #A90B0C; border-radius: 8px; padding: 20px;">
                <h3 style="margin: 0 0 12px 0; color: #A90B0C; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  Message
                </h3>
                <p style="margin: 0; color: #444444; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
              </div>

              <!-- Bouton de réponse -->
              <table role="presentation" style="width: 100%; margin-top: 25px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(data.email)}?subject=Re: ${encodeURIComponent(data.subject)}" 
                       style="display: inline-block; background: linear-gradient(135deg, #A90B0C 0%, #8B0A0B 100%); color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(169, 11, 12, 0.3);">
                      ✉️ Répondre à ${escapeHtml(data.name)}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #2a2a2a; padding: 25px 40px;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 8px 0; color: #CD9804; font-size: 14px; font-weight: 600;">
                      CEDF - Commission Épiscopale pour la Doctrine de la Foi
                    </p>
                    <p style="margin: 0; color: #888888; font-size: 12px; line-height: 1.6;">
                      Archidiocèse d'Abidjan - Plateau<br/>
                      Côte d'Ivoire
                    </p>
                    <hr style="border: none; border-top: 1px solid #444444; margin: 15px 0;"/>
                    <p style="margin: 0; color: #666666; font-size: 11px;">
                      IP de l'expéditeur: ${data.clientIP} | Message envoyé via le site web CEDF
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    const rateLimit = checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: "Trop de tentatives. Veuillez réessayer dans 1 heure.",
          retryAfter: 3600
        }),
        { 
          status: 429, 
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": "3600",
            "X-RateLimit-Remaining": "0",
            ...corsHeaders 
          } 
        }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Service email non configuré. Contactez-nous par téléphone." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const body = await req.json();
    const { name, email, phone, subject, message, honeypot, formStartTime }: ContactEmailRequest = body;

    // Honeypot check
    if (honeypot && honeypot.trim() !== "") {
      console.warn(`Honeypot triggered by IP: ${clientIP}`);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Timing check
    if (formStartTime) {
      const timeTaken = Date.now() - formStartTime;
      if (timeTaken < 3000) {
        console.warn(`Form submitted too quickly (${timeTaken}ms) by IP: ${clientIP}`);
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    // Validation des champs obligatoires
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Tous les champs obligatoires doivent être remplis" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Adresse email invalide" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const cleanName = sanitizeInput(name);
    const cleanSubject = sanitizeInput(subject);
    const cleanMessage = sanitizeInput(message);
    const cleanPhone = phone ? sanitizeInput(phone) : undefined;

    if (containsSuspiciousContent(cleanMessage) || containsSuspiciousContent(cleanSubject)) {
      console.warn(`Suspicious content detected from IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Le message contient des éléments non autorisés" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (cleanName.length < 2 || cleanSubject.length < 3 || cleanMessage.length < 10) {
      return new Response(
        JSON.stringify({ error: "Les champs ne respectent pas la longueur minimale requise" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailHtml = createContactEmailTemplate({
      name: cleanName,
      email,
      phone: cleanPhone,
      subject: cleanSubject,
      message: cleanMessage,
      clientIP
    });

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CEDF Contact <onboarding@resend.dev>",
        to: ["contact@cedfci.org"],
        reply_to: email,
        subject: `[CEDF Contact] ${cleanSubject}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend API error:", errorText);
      throw new Error("Erreur lors de l'envoi de l'email");
    }

    console.log(`Contact email sent successfully from IP: ${clientIP}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "X-RateLimit-Remaining": String(rateLimit.remaining),
        ...corsHeaders 
      },
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
