import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterEmailRequest {
  email: string;
  honeypot?: string;
  formStartTime?: number;
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 10; // Max 10 newsletter signups per hour per IP

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

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 100;
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

// Template email professionnel pour inscription newsletter
const createNewsletterEmailTemplate = (data: {
  email: string;
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
  <title>Nouvelle inscription newsletter - CEDF</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header avec logo et branding -->
          <tr>
            <td style="background: linear-gradient(135deg, #CD9804 0%, #B8860B 100%); padding: 30px 40px; text-align: center;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td align="center">
                    <div style="width: 70px; height: 70px; background-color: #ffffff; border-radius: 50%; display: inline-block; margin-bottom: 15px;">
                      <img src="https://tcopofuxtzqpwryantou.supabase.co/storage/v1/object/public/email-assets/logo-cedf.png" alt="CEDF Logo" style="width: 50px; height: 50px; margin-top: 10px;" onerror="this.style.display='none'"/>
                    </div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">
                      Commission Épiscopale pour la Doctrine de la Foi
                    </h1>
                    <p style="margin: 8px 0 0 0; color: #A90B0C; font-size: 14px; font-weight: 600; background-color: rgba(255,255,255,0.9); padding: 4px 12px; border-radius: 12px; display: inline-block;">
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
                    <span style="display: inline-block; background: linear-gradient(135deg, #A90B0C 0%, #8B0A0B 100%); color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 8px 16px; border-radius: 20px;">
                      📰 Inscription Newsletter
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
              <h2 style="margin: 0 0 20px 0; color: #CD9804; font-size: 20px; font-weight: 600; border-bottom: 2px solid #A90B0C; padding-bottom: 10px;">
                🎉 Nouvelle inscription !
              </h2>

              <!-- Message de bienvenue -->
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; padding: 25px; margin-bottom: 20px; text-align: center;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #A90B0C 0%, #8B0A0B 100%); border-radius: 50%; margin: 0 auto 15px auto; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 28px;">🙏</span>
                </div>
                <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.6;">
                  Un nouveau fidèle souhaite recevoir les actualités spirituelles de la CEDF !
                </p>
              </div>

              <!-- Informations du nouvel abonné -->
              <table role="presentation" style="width: 100%; background-color: #ffffff; border: 2px solid #CD9804; border-radius: 12px;">
                <tr>
                  <td style="padding: 25px;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 10px 0;">
                          <span style="color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Adresse email</span>
                          <p style="margin: 8px 0 0 0;">
                            <a href="mailto:${escapeHtml(data.email)}" style="color: #A90B0C; font-size: 18px; text-decoration: none; font-weight: 600;">${escapeHtml(data.email)}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Actions -->
              <table role="presentation" style="width: 100%; margin-top: 25px;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 15px 0; color: #666666; font-size: 14px;">
                      Ajoutez cet email à votre liste de diffusion newsletter
                    </p>
                    <a href="mailto:${escapeHtml(data.email)}?subject=Bienvenue dans la newsletter CEDF&body=Cher(e) fidèle,%0A%0AMerci pour votre inscription à notre newsletter !%0A%0AVous recevrez désormais nos actualités spirituelles, événements et enseignements.%0A%0AQue Dieu vous bénisse,%0ACEDF" 
                       style="display: inline-block; background: linear-gradient(135deg, #CD9804 0%, #B8860B 100%); color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(205, 152, 4, 0.3);">
                      ✉️ Envoyer un email de bienvenue
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Statistiques rapides -->
          <tr>
            <td style="padding: 0 40px 25px 40px;">
              <div style="background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); border-radius: 12px; padding: 20px; text-align: center;">
                <p style="margin: 0; color: #CD9804; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                  📊 Information technique
                </p>
                <p style="margin: 10px 0 0 0; color: #888888; font-size: 12px;">
                  IP: ${data.clientIP} | Source: Site web CEDF
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #A90B0C; padding: 25px 40px;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 8px 0; color: #CD9804; font-size: 14px; font-weight: 600;">
                      CEDF - Commission Épiscopale pour la Doctrine de la Foi
                    </p>
                    <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 12px; line-height: 1.6;">
                      Archidiocèse d'Abidjan - Plateau<br/>
                      Côte d'Ivoire
                    </p>
                    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.2); margin: 15px 0;"/>
                    <p style="margin: 0; color: rgba(255,255,255,0.6); font-size: 11px;">
                      Notification automatique du système d'inscription newsletter
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
      console.warn(`Newsletter rate limit exceeded for IP: ${clientIP}`);
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
            ...corsHeaders 
          } 
        }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Service email non configuré." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const body = await req.json();
    const { email, honeypot, formStartTime }: NewsletterEmailRequest = body;

    // Honeypot check
    if (honeypot && honeypot.trim() !== "") {
      console.warn(`Newsletter honeypot triggered by IP: ${clientIP}`);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Timing check
    if (formStartTime) {
      const timeTaken = Date.now() - formStartTime;
      if (timeTaken < 2000) {
        console.warn(`Newsletter form submitted too quickly (${timeTaken}ms) by IP: ${clientIP}`);
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    if (!email) {
      return new Response(
        JSON.stringify({ error: "L'adresse email est requise" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Adresse email invalide" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailHtml = createNewsletterEmailTemplate({
      email: email.trim().toLowerCase(),
      clientIP
    });

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CEDF Newsletter <onboarding@resend.dev>",
        to: ["contact@cedfci.org"],
        subject: `[CEDF Newsletter] Nouvelle inscription: ${email}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend API error:", errorText);
      throw new Error("Erreur lors de l'envoi de la notification");
    }

    console.log(`Newsletter signup notification sent for: ${email} from IP: ${clientIP}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        ...corsHeaders 
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue";
    console.error("Error processing newsletter signup:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
