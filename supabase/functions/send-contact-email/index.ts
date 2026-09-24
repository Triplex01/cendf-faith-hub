// Service désactivé volontairement. Code d'origine : index.disabled.ts.txt
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
Deno.serve((req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  return new Response(JSON.stringify({ error: 'Service temporairement désactivé.' }), {
    status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
