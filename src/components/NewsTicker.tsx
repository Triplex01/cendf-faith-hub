import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Megaphone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { isDemoMode } from "@/config/demoData";

interface NewsItem {
  id: number;
  text: string;
  link?: string;
}

// Données de démonstration pour le bandeau défilant
const demoNewsItems: NewsItem[] = [
  { id: 1, text: "🎄 Messe de minuit le 24 décembre à 23h30 à la Cathédrale Notre-Dame", link: "/actualites" },
  { id: 2, text: "📻 Écoutez Radio Espoir 24h/24 - La voix de la foi", link: "/radio" },
  { id: 3, text: "📚 Nouveaux enseignements disponibles sur la doctrine de la foi", link: "/enseignements" },
  { id: 4, text: "🙏 Retraite spirituelle du 8 au 10 janvier 2025 - Inscriptions ouvertes", link: "/actualites" },
  { id: 5, text: "📖 Téléchargez la lettre pastorale 2024 de Monseigneur l'Évêque", link: "/documents" },
];

// Récupérer les données du ticker depuis WordPress
const fetchTickerItems = async (): Promise<NewsItem[]> => {
  const wpUrl = import.meta.env.VITE_WORDPRESS_URL;
  if (!wpUrl) return demoNewsItems;
  
  try {
    const response = await fetch(`${wpUrl}/wp-json/cendf/v1/ticker`);
    if (!response.ok) throw new Error("Failed to fetch ticker");
    return await response.json();
  } catch {
    return demoNewsItems;
  }
};

interface NewsTickerProps {
  speed?: number;
  className?: string;
}

const NewsTicker = ({ speed = 50, className = "" }: NewsTickerProps) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Récupérer les données depuis WordPress ou utiliser les données de démo
  const { data: items = demoNewsItems } = useQuery({
    queryKey: ["ticker"],
    queryFn: fetchTickerItems,
    enabled: !isDemoMode(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Utiliser les données de démo si WordPress n'est pas configuré
  const tickerData = isDemoMode() ? demoNewsItems : items;

  // Doubler les items pour créer un effet de boucle continue
  const tickerItems = [...tickerData, ...tickerData];

  return (
    <div 
      className={`relative bg-primary overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Label fixe à gauche */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center bg-secondary px-4 shadow-lg">
        <Megaphone className="w-4 h-4 text-secondary-foreground mr-2" />
        <span className="text-sm font-bold text-secondary-foreground uppercase tracking-wide hidden sm:inline">
          Infos
        </span>
      </div>

      {/* Bandeau défilant */}
      <div className="py-3 pl-20 sm:pl-28 overflow-hidden">
        <div 
          className={`flex whitespace-nowrap ${isPaused ? '' : 'animate-marquee'}`}
          style={{
            animationDuration: `${tickerData.length * speed / 10}s`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {tickerItems.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              to={item.link || "#"}
              className="inline-flex items-center mx-8 text-primary-foreground hover:text-secondary transition-colors"
            >
              <span className="w-2 h-2 bg-secondary rounded-full mr-3 animate-pulse" />
              <span className="text-sm font-medium">{item.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
