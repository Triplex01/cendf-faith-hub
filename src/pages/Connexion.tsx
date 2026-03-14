import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Mail, Lock, BookOpen, Eye, EyeOff } from "lucide-react";
import logoCendf from "@/assets/logo-cendf.png";
import basiliqueImg from "@/assets/basilique-yamoussoukro-new.jpg";

const Connexion = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    navigate("/espace-abonne");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "Erreur de connexion", description: "Email ou mot de passe incorrect.", variant: "destructive" });
    } else {
      toast({ title: "Bienvenue !", description: "Connexion réussie." });
      navigate("/espace-abonne");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img src={basiliqueImg} alt="Basilique" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/90" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-center">
          <BookOpen className="w-16 h-16 text-secondary mb-6" />
          <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            Magazine <span className="text-secondary italic">Credo</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg font-secondary max-w-md leading-relaxed">
            Votre espace personnel pour accéder à tous les numéros de la revue et gérer votre abonnement.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px w-12 bg-secondary/40" />
            <span className="text-secondary/80 text-sm font-medium tracking-widest uppercase">CEDF</span>
            <div className="h-px w-12 bg-secondary/40" />
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/">
              <img src={logoCendf} alt="CEDF" className="h-16 mx-auto mb-6" />
            </Link>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Espace Abonné
            </h1>
            <p className="text-muted-foreground text-sm">
              Connectez-vous pour accéder à vos magazines
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Adresse email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
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

            <Button
              type="submit"
              variant="burgundy"
              className="w-full h-12 text-base gap-2"
              disabled={loading}
            >
              <LogIn className="w-4 h-4" />
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-8 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Pas encore abonné ?{" "}
              <Link to="/inscription" className="text-primary font-semibold hover:underline">
                Créer un compte
              </Link>
            </p>
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
