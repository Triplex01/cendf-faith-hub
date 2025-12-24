import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro.jpg";
import reunionEglise from "@/assets/reunion-eglise.jpg";
import interieurBasilique from "@/assets/interieur-basilique.jpg";
import basiliqueNotredame from "@/assets/basilique-notredame.jpg";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  image: string;
}

const articles: Record<string, Article> = {
  "message-noel-eveque": {
    id: "message-noel-eveque",
    title: "Message de Noël de Monseigneur l'Évêque",
    excerpt: "Un appel à la paix et à la réconciliation pour toute la communauté ivoirienne en cette période de fêtes.",
    content: `
      <p>Chers frères et sœurs en Christ,</p>
      
      <p>En cette période bénie de Noël, où nous célébrons la naissance de notre Seigneur Jésus-Christ, je vous adresse mes vœux les plus chaleureux de paix, de joie et d'espérance.</p>
      
      <h3>Un temps de grâce et de réconciliation</h3>
      <p>Noël est par excellence le temps de la réconciliation. Dieu s'est fait homme pour nous réconcilier avec Lui et les uns avec les autres. À l'image de cette initiative divine, je vous invite tous à faire un pas vers ceux avec qui vous pourriez avoir des différends. La paix dans nos familles, dans nos communautés et dans notre nation commence par des gestes concrets de pardon et de fraternité.</p>
      
      <h3>Solidarité avec les plus vulnérables</h3>
      <p>En cette fête de la Nativité, n'oublions pas nos frères et sœurs qui souffrent : les malades, les personnes âgées isolées, les familles dans la précarité, les jeunes en quête d'avenir. Le Christ est né dans la pauvreté pour nous rappeler que Dieu choisit les humbles. Que notre charité se manifeste concrètement envers ceux qui en ont le plus besoin.</p>
      
      <h3>Espérance pour la Côte d'Ivoire</h3>
      <p>Notre pays traverse des moments de défis, mais aussi d'opportunités. Je vous encourage à être des artisans de paix et de cohésion sociale, à refuser tout ce qui divise et à promouvoir tout ce qui unit. L'Église catholique en Côte d'Ivoire reste engagée aux côtés de tous les Ivoiriens pour bâtir une nation réconciliée et prospère.</p>
      
      <h3>Que la lumière de Noël brille dans vos cœurs</h3>
      <p>Que l'Enfant-Dieu, né à Bethléem, vous comble de ses bénédictions. Que la Vierge Marie, Mère de l'Église et Patronne de notre pays, intercède pour vous et pour toute la Côte d'Ivoire.</p>
      
      <p>Joyeux et Saint Noël à tous !</p>
      
      <p><em>+ Monseigneur Jean-Pierre Cardinal Kutwa<br/>Archevêque d'Abidjan</em></p>
    `,
    date: "20 Décembre 2025",
    category: "Message",
    author: "Mgr Jean-Pierre Kutwa",
    image: basiliqueYamoussoukro,
  },
  "ordination-pretres": {
    id: "ordination-pretres",
    title: "Ordination de 5 nouveaux prêtres",
    excerpt: "Une célébration joyeuse qui renforce le clergé diocésain et témoigne de la vitalité des vocations.",
    content: `
      <p>La cathédrale Notre-Dame du Plateau a vibré au rythme des chants de louange et d'action de grâce lors de l'ordination sacerdotale de cinq nouveaux prêtres pour le diocèse d'Abidjan.</p>
      
      <h3>Une célébration solennelle</h3>
      <p>C'est devant une assemblée nombreuse de fidèles, de familles et d'amis que Monseigneur l'Archevêque a procédé à l'imposition des mains et à la prière d'ordination, conférant ainsi le sacerdoce ministériel à ces cinq jeunes hommes qui ont répondu à l'appel du Seigneur.</p>
      
      <h3>Les nouveaux ordonnés</h3>
      <p>Les cinq nouveaux prêtres sont :</p>
      <ul>
        <li>Père Paul Kouassi - originaire de Bouaké</li>
        <li>Père Jean-Baptiste Konan - originaire d'Abidjan</li>
        <li>Père Emmanuel Tra - originaire de Daloa</li>
        <li>Père François Yao - originaire de Yamoussoukro</li>
        <li>Père Pierre Koffi - originaire de Man</li>
      </ul>
      
      <h3>Un signe d'espérance</h3>
      <p>Ces ordinations sont un signe fort de la vitalité des vocations en Côte d'Ivoire. Elles témoignent de la foi vivante de nos communautés et de l'engagement des jeunes au service de l'Église.</p>
      
      <p>Prions pour ces nouveaux prêtres afin qu'ils soient de bons pasteurs selon le cœur de Dieu.</p>
    `,
    date: "15 Décembre 2025",
    category: "Célébration",
    author: "Service Communication",
    image: reunionEglise,
  },
  "formation-catechistes": {
    id: "formation-catechistes",
    title: "Formation annuelle des catéchistes",
    excerpt: "Plus de 200 catéchistes se forment pour mieux transmettre la foi aux nouvelles générations.",
    content: `
      <p>Le Centre Pastoral Diocésain a accueilli cette semaine plus de 200 catéchistes venus de toutes les paroisses du diocèse pour leur session annuelle de formation.</p>
      
      <h3>Un programme enrichissant</h3>
      <p>Durant trois jours, les participants ont approfondi leur connaissance de la foi catholique à travers des conférences, des ateliers pratiques et des temps de prière et de partage.</p>
      
      <h3>Des thèmes d'actualité</h3>
      <p>Cette année, l'accent a été mis sur :</p>
      <ul>
        <li>La catéchèse des jeunes à l'ère du numérique</li>
        <li>L'accompagnement des familles</li>
        <li>La liturgie et les sacrements</li>
        <li>L'inculturation de la foi</li>
      </ul>
      
      <p>Les catéchistes repartent équipés et motivés pour leur mission d'évangélisation.</p>
    `,
    date: "10 Décembre 2025",
    category: "Formation",
    author: "Commission Catéchèse",
    image: interieurBasilique,
  },
  "action-caritative-noel": {
    id: "action-caritative-noel",
    title: "Grande action caritative de Noël",
    excerpt: "L'Église mobilise ses forces pour apporter joie et réconfort aux plus démunis.",
    content: `
      <p>À l'approche de Noël, les paroisses du diocèse se mobilisent pour une grande action de solidarité envers les personnes les plus vulnérables.</p>
      
      <h3>Des dons pour tous</h3>
      <p>Vêtements, denrées alimentaires, jouets pour les enfants, médicaments... Les fidèles ont répondu généreusement à l'appel à la solidarité lancé par le diocèse.</p>
      
      <h3>Distribution dans les quartiers</h3>
      <p>Des équipes de bénévoles sillonnent les quartiers défavorisés pour apporter ces dons directement aux familles dans le besoin, avec un mot d'encouragement et de fraternité.</p>
      
      <p>Merci à tous les donateurs et bénévoles qui font vivre la charité chrétienne au quotidien.</p>
    `,
    date: "18 Décembre 2025",
    category: "Charité",
    author: "Caritas Diocésaine",
    image: basiliqueNotredame,
  },
};

const relatedArticles = [
  { id: "ordination-pretres", title: "Ordination de 5 nouveaux prêtres", date: "15 Décembre 2025" },
  { id: "formation-catechistes", title: "Formation annuelle des catéchistes", date: "10 Décembre 2025" },
  { id: "action-caritative-noel", title: "Grande action caritative de Noël", date: "18 Décembre 2025" },
];

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : null;

  if (!article) {
    return (
      <PageLayout title="Article non trouvé" subtitle="Cet article n'existe pas ou a été supprimé.">
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <Link to="/actualites">
              <Button variant="burgundy" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour aux actualités
              </Button>
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={article.title} subtitle={article.excerpt}>
      <article className="py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/actualites" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour aux actualités
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden mb-8 shadow-elegant">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-[300px] md:h-[450px] object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  {article.date}
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  {article.author}
                </span>
                <span className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  {article.category}
                </span>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none text-foreground 
                  prose-headings:font-display prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:text-muted-foreground prose-li:mb-2
                  prose-strong:text-foreground
                  prose-em:text-primary"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Share Buttons */}
              <div className="mt-12 pt-8 border-t border-border">
                <h4 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-primary" />
                  Partager cet article
                </h4>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Articles similaires
                </h3>
                <div className="space-y-4">
                  {relatedArticles
                    .filter((a) => a.id !== article.id)
                    .map((related) => (
                      <Link
                        key={related.id}
                        to={`/actualites/${related.id}`}
                        className="block p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-card transition-all group"
                      >
                        <h4 className="font-display font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                          {related.title}
                        </h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {related.date}
                        </p>
                      </Link>
                    ))}
                </div>

                {/* Newsletter CTA */}
                <div className="mt-8 p-6 bg-gradient-burgundy rounded-xl text-primary-foreground">
                  <h4 className="font-display font-bold text-lg mb-2">
                    Restez informé
                  </h4>
                  <p className="text-sm text-primary-foreground/80 mb-4">
                    Recevez nos actualités directement dans votre boîte mail.
                  </p>
                  <Button variant="hero" size="sm" className="w-full">
                    S'abonner
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default ArticleDetail;
