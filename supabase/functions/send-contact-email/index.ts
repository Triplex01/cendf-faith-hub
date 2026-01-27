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
    // Reset or create new record
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
    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    // Check rate limit
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

    // Honeypot check - if filled, it's likely a bot
    if (honeypot && honeypot.trim() !== "") {
      console.warn(`Honeypot triggered by IP: ${clientIP}`);
      // Return success to not reveal detection (but don't send email)
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Timing check - form filled too quickly (less than 3 seconds) is suspicious
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
      console.warn(`Suspicious content detected from IP: ${clientIP}`);
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
            <br/>IP: ${clientIP}
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

    console.log(`Email sent successfully from IP: ${clientIP}`);

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
