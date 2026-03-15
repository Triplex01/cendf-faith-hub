import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LogIn, Mail, Lock, Eye, EyeOff, KeyRound } from "lucide-react";
import logoCendf from "@/assets/logo-cendf.png";

const AdminLogin = () => {
  const { signIn, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  if (user && isAdmin) {
    navigate("/gestion");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "Accès refusé", description: "Identifiants incorrects.", variant: "destructive" });
    } else {
      // Role check will happen via AuthContext, redirect handled by layout
      navigate("/gestion");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/gestion/connexion`,
    });
    if (error) {
      toast({ title: "Erreur", description: "Impossible d'envoyer le lien.", variant: "destructive" });
    } else {
      setResetSent(true);
      toast({ title: "Email envoyé", description: "Vérifiez votre boîte mail." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(0_0%_8%)] via-[hsl(0_88%_20%)] to-[hsl(0_0%_8%)]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(43 93% 41%) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative w-full max-w-md mx-4">
        {/* Card */}
        <div className="bg-card/95 backdrop-blur-xl rounded-2xl border border-border shadow-2xl p-8 md:p-10">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center p-2">
              <img src={logoCendf} alt="CEDF" className="w-full h-full object-contain" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Gestion CEDF
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Accès réservé aux administrateurs
            </p>
          </div>

          {showReset ? (
            // Reset password form
            <div>
              {resetSent ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-secondary" />
                  </div>
                  <p className="text-foreground font-medium mb-2">Lien envoyé !</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Vérifiez votre boîte mail pour réinitialiser votre mot de passe.
                  </p>
                  <Button variant="outline" onClick={() => { setShowReset(false); setResetSent(false); }} className="gap-2">
                    Retour à la connexion
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div className="text-center mb-4">
                    <KeyRound className="w-10 h-10 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Entrez votre email pour recevoir un lien de réinitialisation.
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <Input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="admin@cedfci.org"
                      required
                      className="h-12"
                    />
                  </div>
                  <Button type="submit" variant="burgundy" className="w-full h-12 gap-2">
                    <Mail className="w-4 h-4" />
                    Envoyer le lien
                  </Button>
                  <button
                    type="button"
                    onClick={() => setShowReset(false)}
                    className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Retour à la connexion
                  </button>
                </form>
              )}
            </div>
          ) : (
            // Login form
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cedfci.org"
                  required
                  className="h-12"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  Mot de passe
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" variant="burgundy" className="w-full h-12 text-base gap-2" disabled={loading}>
                <LogIn className="w-4 h-4" />
                {loading ? "Connexion..." : "Se connecter"}
              </Button>

              <button
                type="button"
                onClick={() => setShowReset(true)}
                className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Mot de passe oublié ?
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-primary-foreground/40 mt-6">
          © {new Date().getFullYear()} Commission Épiscopale Doctrine de la Foi
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
