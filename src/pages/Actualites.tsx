import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import HeroCarousel from "@/components/HeroCarousel";
import { Calendar, MapPin, Users, ArrowRight, Church, Heart, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePosts, useEvents, getFeaturedImage, formatWPDate, stripHtml } from "@/hooks/useWordPress";
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro.jpg";
import basiliqueRome from "@/assets/basilique-rome.jpg";
import basiliqueNotredame from "@/assets/basilique-notredame.jpg";
import reunionEglise from "@/assets/reunion-eglise.jpg";
import interieurBasilique from "@/assets/interieur-basilique.jpg";

// Images de fallback pour le carousel et les missions (contenu statique)
const carouselSlides = [
  {
    image: basiliqueYamoussoukro,
    title: "Basilique Notre-Dame de la Paix",
    subtitle: "Yamoussoukro, joyau de l'architecture chrétienne en Afrique",
  },
  {
    image: basiliqueRome,
    title: "Communion avec Rome",
    subtitle: "L'Église de Côte d'Ivoire unie au Saint-Père et à l'Église universelle",
  },
  {
    image: interieurBasilique,
    title: "Beauté de la Liturgie",
    subtitle: "Célébrer la gloire de Dieu à travers l'art sacré et les vitraux",
  },
  {
    image: reunionEglise,
    title: "L'Église en Mission",
    subtitle: "Formation et engagement pastoral au service du peuple de Dieu",
  },
];

const Actualites = () => {
  const { data: posts, isLoading: postsLoading, error: postsError } = usePosts({ per_page: 6 });
      </section>
    </PageLayout>
  );
};

export default Actualites;
