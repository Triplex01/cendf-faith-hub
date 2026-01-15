import { useLocation, Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  // Pas de logging en production pour éviter les fuites d'information

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center px-4">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          Oups ! Cette page n'existe pas
        </p>
        <p className="mb-8 text-muted-foreground">
          La page que vous recherchez a peut-être été déplacée ou n'existe plus.
        </p>
        <Link to="/">
          <Button variant="burgundy" className="gap-2">
            <Home className="w-4 h-4" />
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
