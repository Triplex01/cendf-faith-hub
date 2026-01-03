import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  BookOpen,
  Sparkles,
  Minimize2
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Base de connaissances bibliques et du site
const knowledgeBase = {
  greetings: [
    "Bonjour ! Je suis l'assistant spirituel du CENDF. Comment puis-je vous aider dans votre cheminement de foi ?",
    "Que la paix du Seigneur soit avec vous ! Je suis là pour répondre à vos questions sur la foi, la Bible ou notre site.",
  ],
  bible: {
    "jean 3:16": "\"Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.\" - Jean 3:16",
    "psaume 23": "\"L'Éternel est mon berger : je ne manquerai de rien. Il me fait reposer dans de verts pâturages, Il me dirige près des eaux paisibles.\" - Psaume 23:1-2",
    "matthieu 5": "\"Heureux les pauvres en esprit, car le royaume des cieux est à eux ! Heureux les affligés, car ils seront consolés !\" - Matthieu 5:3-4 (Les Béatitudes)",
    "notre père": "Notre Père qui es aux cieux, que ton nom soit sanctifié, que ton règne vienne, que ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd'hui notre pain de ce jour. Pardonne-nous nos offenses, comme nous pardonnons aussi à ceux qui nous ont offensés. Et ne nous laisse pas entrer en tentation, mais délivre-nous du Mal. Amen.",
    "je vous salue marie": "Je vous salue Marie, pleine de grâce, le Seigneur est avec vous. Vous êtes bénie entre toutes les femmes, et Jésus, le fruit de vos entrailles, est béni. Sainte Marie, Mère de Dieu, priez pour nous pauvres pécheurs, maintenant et à l'heure de notre mort. Amen.",
    "acte de foi": "Mon Dieu, je crois fermement toutes les vérités que vous nous avez révélées et que vous nous enseignez par votre Église, parce que vous ne pouvez ni vous tromper, ni nous tromper.",
    "credo": "Je crois en Dieu, le Père tout-puissant, Créateur du ciel et de la terre. Et en Jésus-Christ, son Fils unique, notre Seigneur, qui a été conçu du Saint-Esprit, est né de la Vierge Marie...",
    "magnificat": "Mon âme exalte le Seigneur, exulte mon esprit en Dieu, mon Sauveur ! Il s'est penché sur son humble servante ; désormais tous les âges me diront bienheureuse...",
  },
  site: {
    enseignements: "Nos enseignements couvrent plusieurs domaines : les Fondements de la Foi, les Études Bibliques, la Vie Spirituelle, la Liturgie et la Vie Familiale. Visitez la page /enseignements pour découvrir tous nos contenus.",
    radio: "Notre Radio Espoir diffuse 24h/24 des enseignements, de la musique chrétienne et des émissions spirituelles. Écoutez-nous via le lecteur flottant ou sur la page /radio.",
    documents: "Retrouvez nos documents officiels, lettres pastorales, encycliques et homélies sur la page /documents. Vous pouvez les télécharger gratuitement.",
    contact: "Pour nous contacter, rendez-vous sur la page /contact. Nous sommes situés à Abidjan, Côte d'Ivoire.",
    mission: "Le CENDF (Commission Épiscopale Nationale pour la Doctrine de la Foi) a pour mission de promouvoir et défendre la doctrine catholique en Côte d'Ivoire.",
  },
  sacrements: {
    bapteme: "Le Baptême est le premier des sept sacrements. Il efface le péché originel et nous fait enfants de Dieu, membres de l'Église.",
    eucharistie: "L'Eucharistie est la source et le sommet de la vie chrétienne. Elle rend présent le sacrifice du Christ.",
    confirmation: "La Confirmation parfait la grâce du baptême et nous donne la force de l'Esprit Saint.",
    reconciliation: "Le sacrement de Réconciliation (confession) nous réconcilie avec Dieu après le péché.",
    mariage: "Le Mariage chrétien est l'alliance entre un homme et une femme, signe de l'amour du Christ pour l'Église.",
    ordre: "Le sacrement de l'Ordre consacre des hommes au ministère sacerdotal.",
    onction: "L'Onction des malades apporte réconfort et force spirituelle aux malades.",
  },
};

const generateResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Salutations
  if (lowerMessage.match(/^(bonjour|salut|hello|bonsoir|coucou)/)) {
    return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
  }
  
  // Recherche de versets bibliques
  for (const [key, verse] of Object.entries(knowledgeBase.bible)) {
    if (lowerMessage.includes(key)) {
      return verse;
    }
  }
  
  // Prières
  if (lowerMessage.includes("notre père") || lowerMessage.includes("pater")) {
    return knowledgeBase.bible["notre père"];
  }
  if (lowerMessage.includes("je vous salue") || lowerMessage.includes("ave maria")) {
    return knowledgeBase.bible["je vous salue marie"];
  }
  if (lowerMessage.includes("credo") || lowerMessage.includes("je crois en dieu")) {
    return knowledgeBase.bible["credo"];
  }
  
  // Sacrements
  for (const [key, info] of Object.entries(knowledgeBase.sacrements)) {
    if (lowerMessage.includes(key)) {
      return info;
    }
  }
  if (lowerMessage.includes("sacrement")) {
    return "Les sept sacrements de l'Église sont : le Baptême, la Confirmation, l'Eucharistie, la Réconciliation, l'Onction des malades, l'Ordre et le Mariage. Sur quel sacrement souhaitez-vous en savoir plus ?";
  }
  
  // Navigation du site
  if (lowerMessage.includes("enseignement") || lowerMessage.includes("formation")) {
    return knowledgeBase.site.enseignements;
  }
  if (lowerMessage.includes("radio") || lowerMessage.includes("écouter") || lowerMessage.includes("musique")) {
    return knowledgeBase.site.radio;
  }
  if (lowerMessage.includes("document") || lowerMessage.includes("télécharger")) {
    return knowledgeBase.site.documents;
  }
  if (lowerMessage.includes("contact") || lowerMessage.includes("joindre") || lowerMessage.includes("adresse")) {
    return knowledgeBase.site.contact;
  }
  if (lowerMessage.includes("mission") || lowerMessage.includes("cendf") || lowerMessage.includes("qui êtes")) {
    return knowledgeBase.site.mission;
  }
  
  // Questions de foi
  if (lowerMessage.includes("trinité")) {
    return "La Sainte Trinité est le mystère d'un seul Dieu en trois Personnes : le Père, le Fils et le Saint-Esprit. Chaque Personne est pleinement Dieu, et il n'y a qu'un seul Dieu.";
  }
  if (lowerMessage.includes("marie") || lowerMessage.includes("vierge")) {
    return "Marie est la Mère de Dieu (Theotokos), toujours Vierge. Elle a été conçue sans péché originel (Immaculée Conception) et a été élevée corps et âme au ciel (Assomption).";
  }
  if (lowerMessage.includes("pape") || lowerMessage.includes("vatican")) {
    return "Le Pape est le successeur de Saint Pierre et le chef visible de l'Église catholique. Il exerce le ministère pétrinien depuis Rome, au Vatican.";
  }
  if (lowerMessage.includes("messe") || lowerMessage.includes("liturgie")) {
    return "La Messe est la célébration centrale de la foi catholique. Elle comprend la Liturgie de la Parole et la Liturgie eucharistique, où le pain et le vin deviennent le Corps et le Sang du Christ.";
  }
  if (lowerMessage.includes("confession") || lowerMessage.includes("péché")) {
    return "La confession (sacrement de Réconciliation) est le moyen institué par le Christ pour obtenir le pardon des péchés commis après le baptême. Elle comprend : l'examen de conscience, la contrition, l'aveu des péchés et la satisfaction (pénitence).";
  }
  if (lowerMessage.includes("chapelet") || lowerMessage.includes("rosaire")) {
    return "Le chapelet est une prière mariale qui médite les mystères de la vie du Christ. Il comprend les mystères joyeux, lumineux, douloureux et glorieux. Réciter un chapelet complet c'est dire 5 dizaines de Je vous salue Marie.";
  }
  
  // Aide générale
  if (lowerMessage.includes("aide") || lowerMessage.includes("help") || lowerMessage.includes("?")) {
    return "Je peux vous aider avec :\n• Les passages bibliques (ex: 'Jean 3:16')\n• Les prières (ex: 'Notre Père')\n• Les sacrements\n• La navigation du site\n• Les questions de foi catholique\n\nQue souhaitez-vous savoir ?";
  }
  
  // Réponse par défaut
  return "Je ne suis pas sûr de comprendre votre question. Pourriez-vous la reformuler ? Je peux vous aider avec les passages bibliques, les prières, les sacrements ou la navigation sur notre site.";
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bonjour ! Je suis l'assistant spirituel du CENDF. 🙏\n\nJe peux vous aider à :\n• Trouver des passages bibliques\n• Réciter des prières\n• En savoir plus sur les sacrements\n• Naviguer sur notre site\n\nComment puis-je vous aider ?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simuler un délai de réponse
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-burgundy shadow-elegant flex items-center justify-center hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "500px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-6 z-50 w-[360px] bg-card border border-border rounded-2xl shadow-elegant overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-burgundy p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-primary-foreground">
                    Assistant Spirituel
                  </h3>
                  <p className="text-xs text-primary-foreground/70 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    En ligne
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                >
                  <Minimize2 className="w-4 h-4 text-primary-foreground" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                >
                  <X className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === "user"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                      </div>
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "bg-muted text-foreground rounded-tl-sm"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick actions */}
                <div className="px-4 py-2 border-t border-border bg-background">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {["Notre Père", "Jean 3:16", "Sacrements", "Radio"].map((action) => (
                      <button
                        key={action}
                        onClick={() => {
                          setInputValue(action);
                          handleSendMessage();
                        }}
                        className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-xs font-medium text-foreground whitespace-nowrap transition-colors"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Posez votre question..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      size="icon"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
