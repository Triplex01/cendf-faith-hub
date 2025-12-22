import PageLayout from "@/components/PageLayout";
import { TeachingCard } from "@/components/TeachingCard";
import { LoadingGrid, ErrorMessage, EmptyState } from "@/components/LoadingStates";
import { BookOpen, Users, GraduationCap, Heart, Cross, Church } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTeachings } from "@/hooks/useTeachings";
import teachingImage from "@/assets/teaching-priest.jpg";

const categories = [
  {
    icon: Cross,
    title: "Catéchèse",
    description: "Formation approfondie aux fondements de la foi catholique",
    count: 45,
  },
  {
    icon: BookOpen,
    title: "Doctrine Sociale",
    description: "L'enseignement de l'Église sur les questions sociales",
    count: 32,
  },
  {
    icon: Heart,
    title: "Vie Spirituelle",
    description: "Croître dans la prière et la vie intérieure",
    count: 58,
  },
  {
    icon: Church,
    title: "Liturgie",
    description: "Comprendre et vivre les célébrations de l'Église",
    count: 27,
  },
  {
    icon: Users,
    title: "Vie Familiale",
    description: "L'Église au service de la famille chrétienne",
    count: 39,
  },
  {
    icon: GraduationCap,
    title: "Formation Continue",
    description: "Approfondissement pour les catéchistes et animateurs",
    count: 21,
  },
];

const Enseignements = () => {
  // Récupérer les enseignements depuis WordPress via GraphQL
  const { teachings, loading, error, hasNextPage, loadMore } = useTeachings({ first: 9 });

  const handlePlay = (id: string) => {
    console.log('Play teaching:', id);
    // TODO: Implémenter le lecteur audio
  };

  const handleDownload = (id: string) => {
    console.log('Download teaching:', id);
    // TODO: Implémenter le téléchargement
  };

  return (
    <PageLayout 
      title="Enseignements" 
      subtitle="Nourrir votre foi par la Parole et la Doctrine"
      backgroundImage={teachingImage}
    >
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Categories Grid */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
              Catégories d'Enseignements
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-secondary/30 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-burgundy flex items-center justify-center group-hover:scale-110 transition-transform">
                      <cat.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {cat.description}
                      </p>
                      <span className="text-xs font-medium text-secondary">
                        {cat.count} enseignements
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Teachings - GraphQL Data */}
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
              Derniers Enseignements
            </h2>
            
            {/* Loading State */}
            {loading && <LoadingGrid count={9} type="teaching" />}
            
            {/* Error State */}
            {error && (
              <ErrorMessage 
                message="Impossible de charger les enseignements. Veuillez réessayer."
                onRetry={() => window.location.reload()}
              />
            )}
            
            {/* Empty State */}
            {!loading && !error && teachings.length === 0 && (
              <EmptyState 
                message="Aucun enseignement disponible pour le moment."
                icon={<BookOpen className="w-16 h-16 mx-auto" />}
              />
            )}
            
            {/* Teachings Grid */}
            {!loading && !error && teachings.length > 0 && (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teachings.map((teaching) => (
                    <TeachingCard 
                      key={teaching.id} 
                      teaching={teaching}
                      onPlay={handlePlay}
                      onDownload={handleDownload}
                    />
                  ))}
                </div>
                
                {/* Load More Button */}
                {hasNextPage && (
                  <div className="text-center mt-12">
                    <Button variant="outline" size="lg" onClick={loadMore}>
                      Charger plus d'enseignements
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Enseignements;
