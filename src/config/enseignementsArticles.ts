export interface EnseignementArticle {
  slug: string;
  title: string;
  author: string;
  authorBio: string;
  category: string; // matches the slug in categories
  categoryLabel: string;
  excerpt: string;
  content: string; // HTML content
  date: string;
}

export const enseignementsArticles: EnseignementArticle[] = [
  // ========== LITURGIE ==========
  {
    slug: "liturgie-et-culture",
    title: "Liturgie et Culture : la liturgie dans nos traditions",
    author: "Abbé Appolinaire Kouakou Yao Adams",
    authorBio: "Prêtre du diocèse de Bondoukou en Côte d'Ivoire, professeur dans plusieurs Grands séminaires et Instituts religieux, membre de la Commission nationale de liturgie et de chants sacrés.",
    category: "liturgie",
    categoryLabel: "Liturgie",
    excerpt: "Le lien étroit entre la célébration de la foi par le rite liturgique et la culture, porteuse des traditions des fidèles du Christ.",
    date: "2026-01-15",
    content: `
      <p class="lead">« Viendra le moment où l'Église défendra seul l'homme et la culture. » Cette affirmation du Cardinal Henri Newman traduit bien le lien étroit qui existe entre la culture et la communauté croyante. Mieux, entre la célébration de la foi par le rite liturgique et la culture, porteuse des traditions des fidèles du Christ.</p>

      <p>Avec cette pensée du liturgiste Louis BOUYER, nous déduisons le lien étroit entre la Liturgie comprise « comme l'exercice de la fonction sacerdotale de Jésus Christ, puisqu'en elle par des signes sensibles, est signifiée et réalisée d'une manière propre à chacun d'eux la sanctification de l'homme, et est exercé par le corps mystique de Jésus Christ, c'est-à-dire le Chef et par ses membres, le culte public intégral » (SC n°7 ; n°26) et la culture de laquelle la liturgie elle-même ne pourrait se détacher.</p>

      <blockquote>« La liturgie n'est rien d'autre que le rassemblement de l'humanité dans la maison du Père. C'est cette fête des Noces de l'Agneau à laquelle tous sont appelés pour être réconciliés dans le Corps de son Unique Fils. »<cite>— Louis Bouyer, <em>Architecture et liturgie</em></cite></blockquote>

      <p>De fait, la liturgie comme l'a affirmé Romano Guardini « introduit toute l'ampleur de la vérité dans la prière ; en effet, elle n'est autre que le dogme prié, la vérité revécue dans la prière ». C'est le cheminement dans lequel nous mène la liturgie. Elle est la source réelle et efficace de la rencontre avec Dieu et de son agir dans le quotidien de l'homme.</p>

      <h2>Culture et liturgie : un dialogue essentiel</h2>

      <p>Si la culture est définie comme « le dynamisme social particulier par lequel un groupe humain vit, sent, entre en relation, s'organise, célèbre et communique la vie », elle est intrinsèquement liée à l'homme dans sa situation concrète. La culture donne à l'homme la capacité de réflexion sur lui-même. C'est elle qui fait de nous des êtres spécifiquement humains, relationnels, critiques et engagés de façon éthique.</p>

      <p>Dès lors, « la liturgie et le dialogue culturel sont des sujets étroitement liés. » Être fidèle au Christ en lui étant contemporain suppose que toute culture comme lieu d'épanouissement de la vie est en même temps moyen d'expression et communication de Dieu.</p>

      <h2>Le caractère ecclésial de la liturgie</h2>

      <p>Le caractère ecclésial de la liturgie renvoie à la nature de la liturgie comme un acte de culte accompli par l'Église en tant que communauté organisée et visible, plutôt que par des individus isolés. Ce concept souligne que la liturgie est intrinsèquement communautaire, façonnée et régie par l'autorité de l'Église.</p>

      <p>Le Concile Vatican II à travers <em>Sacrosanctum Concilium</em> se veut clair : « l'Église, dans les domaines qui ne touchent pas la foi ou le bien de toute la communauté, ne désire pas même, dans la liturgie, imposer la forme rigide d'un libellé unique : bien au contraire, elle cultive les qualités et les dons des divers peuples et elle les développe. »</p>

      <p>En fin de compte, parler de la liturgie et de la tradition, c'est parler d'une forme d'épousailles entre les rites par lesquels l'Église exprime sa foi dans l'humus de la culture qui n'est autre chose que le chemin de la rencontre entre le Divin et l'Humain en Jésus Christ.</p>
    `,
  },
  {
    slug: "theologie-de-la-liturgie",
    title: "La Théologie de la Liturgie",
    author: "Abbé Pierre Angbéni Kablan",
    authorBio: "Liturgiste, Prêtre du Diocèse de Grand-Bassam (Côte d'Ivoire).",
    category: "liturgie",
    categoryLabel: "Liturgie",
    excerpt: "Des rubriques de la liturgie à une vision théologique : découvrez les quatre pistes fondamentales de la théologie liturgique.",
    date: "2026-01-20",
    content: `
      <p class="lead">En relisant le document du Concile Vatican II, et en nous attardant surtout sur le document liturgique <em>Sacrosanctum Concilium</em>, nous décelons beaucoup de richesses qui nous aident à dégager certains indices susceptibles de construire la théologie de la liturgie.</p>

      <p>Avec le mouvement liturgique et <em>Sacrosanctum Concilium</em>, il y a un passage assez important des rubriques de la liturgie à une vision théologique de la liturgie. La liturgie, réduite à une certaine époque comme rubriques, fait désormais place à la liturgie vue comme valeur théologique.</p>

      <h2>1. La piste christologique</h2>

      <p>À travers SC n°7, « nous découvrons que le Christ est toujours présent dans son Église… » : deux mots sont ici importants à retenir : <strong>présence</strong> et <strong>sacerdotal</strong>. Si le Christ est présent dans la liturgie, cela signifie que la liturgie n'est pas un effet de la venue du Christ dans l'histoire, mais que la liturgie <em>est</em> la venue de Jésus-Christ.</p>

      <p>Cette présence n'est pas seulement effet, mais fruit de la présence du Christ. Dans la liturgie, il n'y a pas l'effet du Christ, mais il y a la cause même de la grâce : le Christ. Un christologue ne peut pas faire sa propre matière sans interroger la liturgie qui est présence du Christ.</p>

      <h2>2. La piste sotériologique</h2>

      <p><em>Sacrosanctum Concilium</em> n°6 dit : « Comme le Christ fut envoyé… » La liturgie est action : c'est l'histoire du salut, entendue non comme pensée et annonce, mais comme action historique salvifique. L'agir dont il est question ici n'est pas pour la morale ; il s'agit plutôt de l'agir sacramentel liturgique.</p>

      <h2>3. La piste ecclésiologique</h2>

      <p>Selon SC n°10, la liturgie montre le sens de l'Église et dit pourquoi elle existe. La liturgie est source et sommet. Affirmer que la liturgie est source et sommet signifie faire comprendre le sens de l'Église. L'Église est, parce qu'elle est engendrée, causée par la liturgie.</p>

      <h2>4. La piste eschatologique</h2>

      <p>Avec <em>Lumen Gentium</em> n°50, dans la liturgie terrestre, nous participons, en goûtant d'avance à celle céleste. Le futur est essentiel de façon générale ; la liturgie entretient un rapport essentiel avec le futur. Nous recueillons dans le moment de la célébration ce qui n'est pas encore advenu.</p>

      <p>La théologie liturgique porte à considérer la célébration comme sommet où le fidèle « fait théologie », en ce sens qu'il vit le mystère du Christ, en fait l'expérience et s'en nourrit.</p>
    `,
  },
  {
    slug: "unite-liturgie-et-mission",
    title: "Unité profonde entre la liturgie et la mission : implications théologiques",
    author: "Sœur Beblai G. Rolande Marie-Laurence",
    authorBio: "Missiologue, enseignante à l'ICMA, à l'UMCI, à l'ISTHA, à l'ITCJ et à l'UCAO.",
    category: "liturgie",
    categoryLabel: "Liturgie",
    excerpt: "Comment coopérer à la mission en étant envoyé pour vivre le mystère du Christ dans la liturgie ?",
    date: "2026-02-01",
    content: `
      <p class="lead">L'annonce a toujours une priorité dans la mission. L'Église ne peut se soustraire au mandat explicite du Christ ; elle ne peut pas priver les hommes de la Bonne Nouvelle que Dieu les aime et qu'il les sauve. Le message évangélique s'est déployé dans la célébration liturgique ; ne serait-ce pas la source de notre foi ?</p>

      <h2>I. La dimension missionnaire de la liturgie</h2>

      <p>La dimension missionnaire de la liturgie se laisse entrevoir à partir de la Parole de Dieu et l'Eucharistie, la catéchèse, et l'homélie. L'homélie, forme éminente de prédication, fait partie intégrante de la liturgie (SC 52).</p>

      <p>La liturgie et la mission recentrent avec force la vie chrétienne autour de l'Eucharistie et de la croix du Christ. Les principaux acteurs de la liturgie sont en réalité les missionnaires : animateurs, choristes, prêtres, servants d'autel, instrumentalistes, service d'ordre et d'accueil.</p>

      <h2>L'Eucharistie, une mission de tous les baptisés</h2>

      <p>Après avoir reçu la liturgie de la Parole et l'Eucharistie, chaque chrétien est appelé à annoncer, à proclamer l'Évangile à ceux qui ne le connaissent pas. Et c'est cela la <em>missio ad gentes</em>.</p>

      <blockquote>« La mission renouvelle l'Église, renforce la foi et l'identité chrétienne, donne un regain d'enthousiasme et des motivations nouvelles. »<cite>— Saint Jean-Paul II, <em>Redemptoris Missio</em> n°12</cite></blockquote>

      <h2>Dimension contemplative : unité dans la diversité</h2>

      <p>La dimension missionnaire de la liturgie a une portée pastorale et contemplative. Cette dimension crée l'unité dans la diversité au travers de la prière d'un corps vivant et diversifié de tous les baptisés. Sainte Thérèse de Lisieux, proclamée patronne des missions par le pape Pie XI sans jamais sortir de son couvent, en est un modèle.</p>

      <p>Pour être un bon prédicateur, il faut être un bon orant ; il faut avoir une vie de liturgie bien ancrée en Christ, sinon, la prédication est vide, privée de sens. Il faut qu'elle prenne sa source dans la liturgie, dans la prière pour être profonde et transformer les cœurs.</p>
    `,
  },
  {
    slug: "petite-histoire-de-la-liturgie",
    title: "Petite histoire de la liturgie",
    author: "Source : Théo, L'Encyclopédie catholique",
    authorBio: "Théo, L'Encyclopédie catholique pour tous, Droguet-Ardant/Fayard, Paris, 1992.",
    category: "liturgie",
    categoryLabel: "Liturgie",
    excerpt: "La liturgie chrétienne date des débuts du christianisme. Retracez son évolution à travers les siècles.",
    date: "2026-02-05",
    content: `
      <p class="lead">La liturgie chrétienne date des débuts du christianisme. Elle s'est créée naturellement, par la nécessité pour les croyants de prier en commun. Elle s'enracine dans la liturgie juive.</p>

      <p>Au cours des temps, elle devait évidemment subir d'innombrables transformations. Ainsi, dans l'Église franque, sous les derniers mérovingiens, de multiples usages avaient cours simultanément.</p>

      <h2>L'unification sous Charlemagne</h2>

      <p>Charlemagne unifia la liturgie romaine ; celle-ci fut rendue partout obligatoire, mais les évêques et les conciles particuliers conservaient le droit d'y introduire des modifications jugées opportunes. Dès lors, les liturgies particulières, aux XIV<sup>e</sup> et XV<sup>e</sup> siècles notamment, allèrent se multipliant.</p>

      <h2>La réforme du Concile de Trente</h2>

      <p>Au XVI<sup>e</sup> siècle, le Concile de Trente n'eut pas le temps de statuer sur la liturgie ; c'est au Pape Pie V que revint la charge d'introduire une réforme imposant un type de liturgie unique pour l'ensemble du monde latin (en 1568 et 1570). C'est à partir de cette époque que la réglementation de la liturgie devint l'affaire du Saint-Siège.</p>

      <h2>Depuis le Concile Vatican II</h2>

      <p>Depuis le Concile Vatican II, les assemblées épiscopales des différents pays ont compétence pour déterminer les adaptations appropriées aux mentalités locales. Après des siècles de centralisation et d'uniformisation, une certaine diversification est donc de nouveau encouragée par l'Église pour mieux répondre aux besoins des différentes cultures.</p>

      <p>Les Églises d'Orient ont conservé la diversité de leurs rites. Les décisions en matière liturgique reviennent toujours, pour les lignes principales, au Saint-Siège, par la publication de documents spéciaux du Dicastère pour le culte divin et la discipline des sacrements.</p>
    `,
  },

  // ========== FONDEMENTS DE LA FOI ==========
  {
    slug: "dieu-trinite-mystere-de-communion",
    title: "Dieu Trinité : mystère de communion et fondement de l'être",
    author: "Père Anzian Pierre, O.P.",
    authorBio: "Dominicain, Docteur en Théologie et en Philosophie, Enseignant-chercheur à l'UCAO-UUA.",
    category: "fondements-foi",
    categoryLabel: "Fondements de la Foi",
    excerpt: "Dieu n'est pas un solitaire absolu, mais une communion de Personnes. Une relecture du mystère trinitaire à la lumière de la tradition chrétienne.",
    date: "2026-02-10",
    content: `
      <p class="lead">Parler de Dieu Trinité, c'est s'aventurer au cœur du mystère le plus profond du christianisme. Dieu n'est pas un solitaire absolu, mais une communion de Personnes : Père, Fils et Esprit Saint. Cette affirmation touche à la structure même de l'être, du monde et de la relation.</p>

      <h2>Chapitre I : La révélation de Dieu comme relation</h2>

      <h3>La révélation trinitaire dans l'histoire du salut</h3>

      <p>La foi chrétienne au Dieu Un et Trine ne naît pas d'un raisonnement abstrait, mais d'une expérience historique : celle de Jésus-Christ. Les premiers chrétiens ont rencontré en Jésus non seulement un prophète, mais le Fils de Dieu, en relation unique avec le Père.</p>

      <p>Le Nouveau Testament témoigne abondamment. Jésus parle de son Père (Jn 5, 19). Il promet l'envoi de l'Esprit Saint. Il demande de baptiser « au nom du Père, du Fils, et du Saint-Esprit » (Mt 28, 19). Paul débute ses lettres par cette formule trinitaire : « La grâce du Seigneur Jésus-Christ, l'amour de Dieu et la communion du Saint-Esprit soient avec vous tous » (2 Co 13, 13).</p>

      <h3>La Trinité comme structure ontologique de l'amour</h3>

      <p>Le concept de « Trinité » nous vient de Tertullien (160-240). Les Pères Cappadociens ont approfondi ce mystère en distinguant l'<em>ousia</em> (l'essence divine) et les <em>hypostases</em> (les personnes). Dieu est un dans son être, mais triple dans ses relations.</p>

      <blockquote>« Dieu est amour » (1 Jn 4, 8), et l'amour suppose un autre. Le Dieu trinitaire est pleinement amour parce qu'il est relation éternelle.</blockquote>

      <h2>Chapitre II : La Trinité comme clé de l'existence humaine</h2>

      <h3>L'homme image de Dieu : être en relation</h3>

      <p>Si Dieu est Trinité, alors l'homme créé à son image est fondamentalement relationnel. « Il n'est pas bon que l'homme soit seul » (Gn 2, 18). L'individualisme moderne, qui exalte l'autonomie au détriment de la communion, est une négation de notre structure trinitaire.</p>

      <p>La Trinité nous enseigne que la différence n'est pas une menace, mais une richesse. Le Père n'est pas le Fils, et pourtant ils sont un. L'uniformité tue la communion ; la différence la rend possible.</p>

      <p>Croire en Dieu Trinité, c'est croire que l'amour est plus fort que la solitude, que la relation est plus vraie que la possession, que la communion est plus profonde que l'uniformité.</p>
    `,
  },
  {
    slug: "de-religionis-a-propos-de-religion",
    title: "De religionis : À propos de religion",
    author: "Anonyme",
    authorBio: "Article de réflexion théologique sur la nature et le sens de la religion.",
    category: "fondements-foi",
    categoryLabel: "Fondements de la Foi",
    excerpt: "La religion est la matérialisation d'un mystère qui dépasse l'homme. Une approche globale du phénomène religieux.",
    date: "2026-02-15",
    content: `
      <p class="lead">Quand Marx affirme que « La religion est l'opium du peuple », il le dit à posteriori, après une certaine expérience de la religion. Mais cette affirmation pèche par manque d'objectivité. L'homme n'est pas étranger à la religion, c'est une part de lui ; c'est une réalité à la fois intrinsèque et culturelle.</p>

      <h2>I. Généralités sur la religion</h2>

      <p>Le sentiment religieux est aussi vieux que le monde. La notion de divinité est présente chez presque tous les peuples connus. Elle a évolué selon les contextes tout en conservant les mêmes caractéristiques : foi, assemblées, rites, cultes, offrandes, sacrifices.</p>

      <p>La religion qui vient du latin <em>religare</em> pour dire <em>relier</em>, est un lien établi entre l'homme et le sacré. L'expérience religieuse est celle du sacré. Le sentiment religieux est d'appartenance à une société que les rites renforcent.</p>

      <h2>II. Religion, foi et raison</h2>

      <blockquote>« La foi et la raison sont comme les deux ailes qui permettent à l'esprit humain de s'élever vers la contemplation de la vérité. »<cite>— Saint Jean-Paul II, <em>Fides et Ratio</em></cite></blockquote>

      <p>La religion est certes chose du cœur, mais il y a des raisons de croire. Foi et raison ne se contredisent pas, au contraire, elles s'appellent et se complètent. La foi sans la raison est aveugle, et la raison sans la foi est stérile.</p>

      <h2>III. Les religions aujourd'hui</h2>

      <p>On s'accorde pour parler de trois religions révélées : le judaïsme, le christianisme et l'islam. Le christianisme confesse un Dieu en trois Personnes : le Père, le Fils et le Saint-Esprit. Cet héritage est porté par l'Église catholique romaine chargée d'annoncer l'Évangile du salut.</p>

      <p>La religion est la matérialisation d'un mystère qui dépasse l'homme. En science comme en religion, c'est le plus qui fait la différence dans sa logique, sa cohérence et sa crédibilité. Cette originalité, on la retrouve dans le christianisme plus qu'ailleurs.</p>
    `,
  },
  {
    slug: "perception-du-dieu-chretien-aujourd-hui",
    title: "La perception du Dieu chrétien aujourd'hui : entre héritage, crise et renouveau",
    author: "Père Anzian Pierre, O.P.",
    authorBio: "Dominicain, Docteur en Théologie et en Philosophie, Enseignant-chercheur à l'UCAO-UUA.",
    category: "fondements-foi",
    categoryLabel: "Fondements de la Foi",
    excerpt: "La figure de Dieu dans le christianisme semble vaciller. Une réflexion sur la perception du Dieu chrétien entre crise et renouveau.",
    date: "2026-02-20",
    content: `
      <p class="lead">La figure de Dieu dans le christianisme a traversé les siècles, modelant les civilisations, inspirant les arts, structurant les sociétés. Pourtant, à l'époque contemporaine, cette figure semble vaciller dans l'imaginaire collectif. Dieu n'est plus seulement le Tout-Puissant du catéchisme, mais aussi un mystère interrogé, une présence contestée, une absence ressentie.</p>

      <h2>Chapitre I : Crise de la représentation</h2>

      <h3>La sécularisation et le recul des institutions</h3>

      <p>L'un des phénomènes majeurs est la sécularisation. Ce processus, amorcé en Occident depuis les Lumières, consiste en une autonomisation des sphères sociales par rapport à la religion. Dieu n'est plus le garant de l'ordre social, ni le fondement de la vérité scientifique.</p>

      <h3>La modernité critique et la déconstruction</h3>

      <p>Nietzsche proclame la « mort de Dieu », non comme événement théologique, mais comme constat culturel. Des théologiens contemporains ont proposé des relectures : Dieu vulnérable (Moltmann), Dieu souffrant (Sölle). Ces approches cherchent à réconcilier la foi avec l'expérience humaine.</p>

      <h2>Chapitre II : Vers une reconfiguration</h2>

      <h3>Le retour du spirituel</h3>

      <p>Paradoxalement, la sécularisation n'a pas éradiqué le besoin de spiritualité. La mystique chrétienne retrouve une actualité : Maître Eckhart, Thérèse d'Avila, Jean de la Croix inspirent une spiritualité de l'union, du silence, de la contemplation.</p>

      <h3>Dieu comme relation et mystère</h3>

      <p>La théologie contemporaine insiste sur la dimension relationnelle de Dieu : Dieu Trinité comme communion, Dieu créateur comme partenaire, Dieu Esprit comme souffle. Le Dieu chrétien est un Dieu de relation, non de domination.</p>

      <p>Croire en Dieu aujourd'hui, c'est accepter de vivre une tension féconde entre héritage et quête, entre mystère et proximité, entre tradition et renouvellement. C'est entrer dans une relation vivante, ouverte à la profondeur.</p>
    `,
  },

  // ========== VIE SPIRITUELLE ==========
  {
    slug: "vie-consacree-prophetie-de-la-presence",
    title: "30ème Journée de la Vie Consacrée : prophétie de la présence",
    author: "Sr. Désirée-Ghislaine G., FSSCC",
    authorBio: "Religieuse de la congrégation FSSCC.",
    category: "vie-spirituelle",
    categoryLabel: "Vie Spirituelle",
    excerpt: "La vie consacrée là où la dignité est blessée et où la foi est mise à l'épreuve. Une chance inestimable pour l'Église.",
    date: "2026-02-02",
    content: `
      <p class="lead">Chaque 2 février, l'Église s'arrête pour rendre grâce. Elle contemple avec reconnaissance la vie de milliers de religieux et religieuses qui, à la suite du Christ, ont choisi de tout donner. Instituée en 1997 par le pape saint Jean-Paul II, la Journée de la Vie Consacrée s'inscrit dans la lumière de la Présentation de Jésus au Temple.</p>

      <h2>Une présence prophétique</h2>

      <p>La Vie Consacrée apparaît à la lumière de sa présence prophétique comme une chance inestimable pour l'Église et pour le monde. Une chance fragile, parfois méconnue, mais d'une fécondité profonde. Elle rappelle que l'Évangile ne se transmet pas d'abord par des stratégies ou des discours, mais par des vies offertes, enracinées dans des lieux où l'espérance semble la plus menacée.</p>

      <blockquote>Là où la dignité humaine est blessée, la présence fidèle des personnes consacrées devient un signe silencieux mais puissant : quelqu'un croit encore en l'homme, quelqu'un ose rester.</blockquote>

      <h2>Un choix quotidien</h2>

      <p>Demeurer au cœur des conflits, de la pauvreté, de l'exclusion ou de la solitude n'est ni naïveté ni héroïsme abstrait. C'est un choix quotidien, souvent obscur, fait de patience, d'écoute et de gestes modestes qui recréent du lien. La vie consacrée dit au monde que la paix commence par la proximité, que la réconciliation naît souvent d'une présence humble et persévérante.</p>

      <h2>Une interpellation pour l'Église</h2>

      <p>Cette admiration est aussi une interpellation. Car la vie consacrée questionne l'Église elle-même : croit-elle encore à la force prophétique de la gratuité, du silence, de la fidélité sans retour immédiat ? Elle interpelle également notre société, tentée par la performance et l'efficacité.</p>

      <p>Par la diversité de ses formes, la vie consacrée offre au monde une parole vivante d'espérance. Elle n'impose rien, mais elle montre qu'une autre manière de vivre est possible. Elle n'est pas seulement un don précieux : elle est un appel adressé à tous.</p>

      <p><strong>Célébrons et prions pour tou(te)s les consacré(e)s. Que Dieu les bénisse et leur accorde de vivre leur vocation dans une joyeuse persévérance !</strong></p>
    `,
  },
  {
    slug: "anthropologie-biblique-che-cosa-e-l-uomo",
    title: "L'anthropologie à la lumière de Che cosa è l'uomo",
    author: "Anonyme",
    authorBio: "Article de réflexion sur l'anthropologie biblique à la lumière du document de la Commission Biblique Pontificale.",
    category: "fondements-foi",
    categoryLabel: "Fondements de la Foi",
    excerpt: "Qu'est-ce que l'homme pour que tu penses à lui ? Une vision profonde de l'identité humaine, sa dignité et sa vocation.",
    date: "2026-02-25",
    content: `
      <p class="lead">Face à la démesure de l'univers, l'homme pourrait se sentir minuscule. Pourtant, une question traverse le Psaume 8 : « Qu'est-ce que l'homme pour que tu penses à lui, le fils d'un homme, que tu en prennes souci ? » Cette interrogation constitue l'un des axes majeurs du document <em>Che cosa è l'uomo</em>, publié le 30 septembre 2019.</p>

      <h2>L'homme dans le projet divin</h2>

      <p>L'homme n'est pas un accident de l'histoire, ni un simple élément de la nature. Il est un être voulu, aimé, placé dans le projet divin qui le dépasse et le révèle. L'homme n'est pas défini par des catégories philosophiques, mais à partir de sa relation vivante avec Dieu.</p>

      <p>Le psaume 8 ne commence pas par l'homme mais par Dieu. L'anthropologie biblique n'est pas centrée sur l'homme, mais sur Dieu qui pense à l'homme.</p>

      <h2>Créé à l'image de Dieu</h2>

      <blockquote>« Dieu créa l'homme à son image, à l'image de Dieu il le créa, il les créa homme et femme. » (Gn 1, 27)</blockquote>

      <p>Être à l'image de Dieu n'est pas une qualité statique mais une vocation dynamique. La dignité humaine est « inconditionnelle » : ce n'est pas du propre de l'homme, c'est de la pure, libre et gracieuse volonté Divine.</p>

      <h2>L'alliance : axe central</h2>

      <p>Face à la fragilité de l'homme, Dieu reste fidèle. L'alliance est l'axe central de la relation entre Dieu et l'homme. Abraham : l'homme convoqué. Israël : la dignité du peuple. La loi : une pédagogie de liberté.</p>

      <p>Jésus-Christ est le Sommet de l'anthropologie biblique. Il est à la fois révélation de Dieu et révélation de l'homme. Saint Irénée résume : <em>« La gloire de Dieu, c'est l'homme vivant ; et la vie de l'homme, c'est la vision de Dieu. »</em></p>

      <p>L'être humain est défini par l'initiative de Dieu qui se tourne vers lui. Un être de relation appelé à répondre librement à l'amour reçu. Sa vérité n'est ni dans l'autosuffisance, ni dans la performance, mais dans cette parole fondatrice par laquelle Dieu se souvient de lui.</p>
    `,
  },
  {
    slug: "le-dieu-juif",
    title: "Le Dieu juif !",
    author: "Père Jean-Marc Abel KAMLAN",
    authorBio: "Exégète, Grand Séminaire de Gagnoa.",
    category: "fondements-foi",
    categoryLabel: "Fondements de la Foi",
    excerpt: "Une plongée dans l'expérience d'Israël avec le Dieu unique, à travers l'Ancien et le Nouveau Testament jusqu'à la pleine révélation en Jésus-Christ.",
    date: "2026-03-05",
    content: `
      <p class="lead">Voici un titre qui à bien des égards pourrait paraître polémique et équivoque. Parler d'un Dieu juif voudrait dire qu'il y aurait aussi un Dieu africain, tout comme il y aurait un Dieu chinois ou encore un Dieu américain. Non, il n'y a pas une multiplicité de dieux : il y a bel et bien un seul Dieu, immuable, omniscient et omnipotent, dont la transcendance n'exclut pas l'immanence.</p>

      <p>De ce Dieu, le peuple juif en tant que peuple de l'Alliance, en a fait le premier l'expérience, à tâtons, à travers ombres et lumières, échecs et victoires, avant la pleine, définitive et complète révélation accomplie en Jésus-Christ. C'est le fruit de cette expérience, consignée dans les Saintes Écritures, que nous nous proposons de faire ressortir.</p>

      <h2>1. Dans l'Ancien Testament</h2>

      <h3>1.1. L'existence de Dieu</h3>

      <p>La réalité de l'existence de Dieu est confessée dans les écrits vétérotestamentaires non pas comme le fruit d'un raisonnement philosophique mais comme une vérité allant de soi. Les miracles de Dieu sur les éléments de la nature, ou dans la vie de l'homme, ne sont pas rappelés pour prouver son existence mais pour affermir la foi des hommes (Ex 4,1-8 ; Is 40,5) ou pour faire naître leur louange (Ps 19,8-10 ; Is 40,27-31).</p>

      <p>Il s'agit moins de spéculer sur la nature de Dieu que de montrer aux hommes la vérité de sa présence et de sa proximité : <strong>Dieu est et vit avec eux.</strong></p>

      <h3>1.2. Les attributs de Dieu</h3>

      <p>Plusieurs noms émergent, ce qui montre que Dieu est plus considéré comme un être personnel qu'une réalité évanescente et abstraite. Mais plus qu'un homme, il est puissant et immortel : YHWH est Dieu et non un homme (Os 11, 9).</p>

      <h3>La puissance de Dieu</h3>

      <p>Elle est exprimée à travers le nom très ancien de « puissant de Jacob » (Gn 49,24 ; Is 1,24 ; 60,16) et louée dans les plus anciens cantiques (Ex 15,3 ; Ps 24,8). Cette puissance, Dieu l'exerce de manière jalouse sur son peuple en tant que maître, et sur le monde entier en tant que Seigneur. Par son intervention puissante lors de la délivrance d'Égypte, il a montré la réalité d'un Dieu qui est et qui agit (Ex 3,14).</p>

      <h3>Dieu est vivant</h3>

      <p>Cette vie est un bien propre dont les anciennes formules de serment font état : « Dieu est vivant » (1 S 14,39-45 ; 1 R 17,12). Par là, il se distingue des divinités cananéennes de la nature qui subissent le cycle annuel de la mort et de la renaissance, car lui ne meurt pas (Ha 1,12). Seul le Dieu vivant auquel l'Israélite se confie est la source de la vie (Ps 36,10).</p>

      <h3>La sainteté de Dieu</h3>

      <p>L'attribut qui caractérise le plus la nature de Dieu, c'est la sainteté. Dieu est confessé comme le « Saint » (Is 40,25 ; Ha 3,3), le « Saint d'Israël » (Is 1,4 ; 5,19.24), le « trois fois Saint » (Is 6,3).</p>

      <blockquote>Cette sainteté signifie que Dieu est séparé de toute chose et qu'il est élevé au-dessus de tout ce qui est créé et faible. Il est le tout Autre (Is 40,25 ; 46,5), l'indicible, devant qui l'homme est conscient de n'être que cendre et poussière.</blockquote>

      <p>Cette sainteté métaphysique reçoit, surtout chez les prophètes, un caractère moral : sa colère n'est pas inexorable (Os 11,9) ; sa sainteté se montre dans sa justice (Is 5,6) ; elle est offensée par l'infidélité d'Israël ; et elle se révèle dans la constance de son amour (Os 11,9).</p>

      <h2>2. Dans le Nouveau Testament</h2>

      <h3>2.1. L'héritage vétérotestamentaire</h3>

      <p>Dans le NT, on rencontre pour le moins la même notion de Dieu que dans l'AT : « Dieu des pères » (Ac 3,13 ; 5,30), « d'Abraham, Isaac et Jacob » (Mt 22,32), « d'Israël » (Mt 15,31 ; Lc 1,68), « notre Dieu » (Mc 12,29 ; Ac 2,39). Cependant le Nouveau Testament a moins d'anthropomorphismes.</p>

      <h3>2.2. Les attributs de Dieu</h3>

      <h3>Dieu Père</h3>

      <p>La paternité divine remonte déjà à l'AT où Dieu est Père d'Israël ou des justes parmi eux. Mais cette filiation va évoluer avec Jésus et les apôtres qui enseignent que Dieu est le Père de <strong>tous les hommes</strong>, sans distinction entre Juifs et non-Juifs ou entre pécheurs et justes (Mt 5,45 ; Lc 6,32-36 ; Ac 17,28).</p>

      <h3>Amour</h3>

      <p>S'il est vrai que les prophètes et les psalmistes l'avaient souvent chanté (Os 3,1 ; 11,1 ; Jr 31,3 ; Is 43,4), c'est seulement dans le NT que cet amour est affirmé avec autant d'insistance. Dieu aime tous les hommes sans distinction, au point de donner son Fils pour eux (Jn 3,16). Ce Fils bien-aimé est la « révélation de la bonté de Dieu et de son amour » (Tt 3,4).</p>

      <h2>3. La pleine et définitive révélation en Jésus-Christ</h2>

      <p>Avec Jésus, nous avons la plénitude de l'être divin. Le Dieu invisible et inaccessible s'est révélé dans le Verbe fait chair (Jn 1,18). Instrument de la révélation du Père, parce qu'il est dans le Père et que le Père est en lui, Jésus par ses paroles et par ses actes va montrer le visage plein de miséricorde de Dieu qui sait emprunter les chemins des hommes pour venir à leur rencontre.</p>

      <blockquote>En Jésus, la toute-puissance de Dieu et sa transcendance se révèlent être au service d'un amour qui prend plaisir à pardonner en multipliant les occasions de conversion et de repentir.</blockquote>

      <p>Jésus montre finalement que ce qui fait la grandeur de Dieu, c'est sa capacité non seulement à entrer en relation avec l'homme mais aussi à se rendre tellement présent à lui qu'il puisse sentir et expérimenter sa proximité bienfaisante et salvifique. Il est l'accès le plus autorisé et le plus sûr pour expérimenter pleinement la présence et l'action de Dieu.</p>
    `,
  },
  {
    slug: "homme-vu-par-les-philosophes",
    title: "L'homme vu par les philosophes : vers une promotion de la dignité humaine dans l'humilité",
    author: "Elvis Aubin KLAOUROU",
    authorBio: "Enseignant Permanent à la Faculté de Philosophie UCAO-UUA.",
    category: "fondements-foi",
    categoryLabel: "Fondements de la Foi",
    excerpt: "De Platon à Heidegger, un parcours philosophique sur l'homme : être tendu entre ciel et terre, entre raison et désir, à la quête d'une dignité dans l'humilité.",
    date: "2026-03-12",
    content: `
      <p class="lead">Observer le XXIᵉ siècle, c'est discerner l'ambivalence d'un horizon à la fois lumineux et menaçant. Dans nos tropiques africaines comme ailleurs, l'humanité oscille entre l'exultation des prouesses technologiques et l'angoisse ontologique d'un être happé par la vitesse, privé de la douceur fragile qui relie au Tout Autre.</p>

      <p>Asphyxié par un rythme imposé, l'homme s'interroge : n'a-t-il pas besoin d'un instant d'authenticité, d'une redécouverte de son <em>esse</em>, de cette vérité que la sagesse philosophique n'a cessé de dévoiler ?</p>

      <h2>1. L'homme à travers les âges philosophiques</h2>

      <p>Depuis l'Antiquité grecque, l'homme est contemplé comme un cosmos en miniature. Chez Platon, il apparaît comme un être double, déchiré entre le sensible et l'intelligible. Dans le <em>Phèdre</em>, il est comparé à un attelage ailé dont l'âme aspire à s'élever vers le monde des Idées :</p>

      <blockquote>« L'âme est semblable à un attelage ailé et son cocher dirige deux chevaux. »<cite>— Platon, Phèdre, 246a</cite></blockquote>

      <p>Aristote prolonge cette vision en définissant l'homme comme <em>zoon logon echon</em>, un « animal doué de logos » (<em>Politique</em>, I, 2), destiné par nature à la vie en cité. Quant aux stoïciens, tels Épictète, ils déplacent la réflexion vers l'intériorité : « Ce qui trouble les hommes, ce ne sont pas les choses, mais les jugements qu'ils portent sur les choses » (<em>Manuel</em>, §5).</p>

      <h3>L'homme médiéval : imago Dei</h3>

      <p>Le Moyen Âge pose l'homme comme <em>imago Dei</em>, image de Dieu, reflet de la transcendance dans la finitude. Saint Augustin écrit :</p>

      <blockquote>« Tu nous as faits pour toi, Seigneur, et notre cœur est sans repos tant qu'il ne repose en toi. »<cite>— Saint Augustin, Confessions, I, 1</cite></blockquote>

      <p>À sa suite, Thomas d'Aquin, dans une synthèse entre Aristote et la théologie chrétienne, affirme que l'homme est composé d'âme et de corps, ordonné à la béatitude par la connaissance de Dieu (<em>Somme théologique</em>, Ia, q. 12, art. 1).</p>

      <h3>L'homme moderne : la subjectivité</h3>

      <p>Avec la modernité, une autre orientation s'impose : l'homme n'est plus perçu que dans sa rationalité. Descartes inaugure le règne du <em>cogito</em> : « Je pense, donc je suis ». Kant voit en lui un être autonome, capable de légiférer moralement : « Agis de telle sorte que tu traites l'humanité […] toujours en même temps comme une fin, et jamais simplement comme un moyen. »</p>

      <h3>L'homme contemporain : décentré</h3>

      <p>Nietzsche annonce que l'homme cesse d'être le centre du monde : « L'homme est une corde tendue entre la bête et le surhumain ». Heidegger le décrit comme <em>Dasein</em>, être-pour-la-mort, jeté dans le monde. Foucault, dans <em>Les mots et les choses</em>, annonce la fin de l'homme comme figure centrale du savoir.</p>

      <h2>2. Deux voies classiques pour saisir l'homme</h2>

      <h3>L'homme produit du milieu</h3>

      <p>La première thèse classique présente l'homme comme produit des influences du milieu. Possédant un corps soumis à la causalité des événements, il n'aurait pas le choix de ce qui lui arrive. Descartes écrit dans le <em>Traité de l'homme</em> : « le corps n'est autre chose qu'une statue ou machine de terre, que Dieu forme tout exprès, pour faire qu'elle marche, qu'elle mange, qu'elle respire ».</p>

      <h3>L'homme essentiellement esprit</h3>

      <p>Merleau-Ponty propose une seconde thèse : l'homme est libre parce qu'il est essentiellement esprit. Bergson souligne : « la conscience correspond exactement à la puissance de choix dont l'être vivant dispose ». Rousseau ajoute : « Conscience ! conscience ! instinct divin, immortel et céleste voix […] juge infaillible du bien et du mal qui rend l'homme semblable à Dieu ».</p>

      <h2>3. Vers une métaphysique de la parenté</h2>

      <p>Maurice Merleau-Ponty marque son désaccord avec ces deux thèses. La première est insuffisante : si l'homme était un objet, il n'aurait aucune compétence et ne pourrait se représenter le monde. Mais définir l'homme par son seul esprit ne serait pas exact non plus. <strong>L'homme est autant esprit que corps</strong>, et c'est son corps qui le lie à la terre.</p>

      <blockquote>L'homme est un être en tension, un vivant entre deux infinis. Il est à la fois poussière et prière, instinct et offrande, cri et silence. Il est ce paradoxe vivant, ce « composé bizarre » dont parlait Pascal, capable de Dieu et pourtant si prompt à la chute.</blockquote>

      <p>Cette métaphysique est celle de la parenthèse. Elle suspend le jugement, elle ouvre un espace d'écoute, elle accueille l'ambivalence sans vouloir la résoudre trop vite. Elle sait, avec Montaigne, que « chaque homme porte en soi la forme entière de l'humaine condition ».</p>

      <p>L'éthique de la parenté n'est pas une morale molle. C'est une exigence de lucidité et de tendresse. Elle appelle à une dignité humble — non proclamée, mais vécue. Elle s'enracine dans cette vérité que Zundel pressentait : <em>« L'homme ne devient lui-même qu'en se donnant. »</em></p>

      <p>S'engager dans cette voie, c'est choisir de penser l'homme non comme un projet à dominer, mais comme une énigme à aimer. C'est faire de l'humilité une lumière, de la fragilité une force, et de la parenthèse — ce lieu de suspension, d'accueil, de respiration — le berceau d'une humanité réconciliée.</p>
    `,
  },
  {
    slug: "homme-aujourdhui-reponse-theologique",
    title: "L'homme d'aujourd'hui : réponse théologique",
    author: "Théologien CEDF",
    authorBio: "Réflexion théologique sur l'homme contemporain.",
    category: "fondements-foi",
    categoryLabel: "Fondements de la Foi",
    excerpt: "L'homme d'aujourd'hui à la lumière de la théologie : créé à l'image de Dieu, être relationnel, libre et responsable, en dialogue avec la modernité.",
    date: "2026-03-18",
    content: `
      <p class="lead">La théologie, comme « discours rationnel sur la divinité », touche également l'homme compris dans la création. Théologiquement parlant, l'homme d'aujourd'hui est défini par sa double nature (corps et esprit) et sa création à l'image de Dieu, doté de liberté de choix et d'une relation fondamentale avec le divin.</p>

      <h2>I. Caractéristiques théologiques de l'homme</h2>

      <h3>1. Création à l'image de Dieu</h3>

      <p>L'affirmation de l'homme créé à l'image de Dieu trouve ses origines dans le livre de la Genèse. Cette « image de Dieu » confère à l'être humain une dignité unique, une capacité de relation avec lui et une nature à la fois corporelle et spirituelle.</p>

      <p>L'homme et la femme sont créés à l'image de Dieu, ce qui fonde leur dignité et leur originalité par rapport au reste de la création. Cette ressemblance s'exprime dans :</p>

      <p><strong>L'intelligence et l'esprit</strong> : L'homme partage avec Dieu l'intelligence, le pouvoir créateur et la capacité à entretenir des relations.</p>

      <p><strong>Le pouvoir créateur</strong> : L'homme imite son Créateur en construisant des cités, des navires, des maisons, et en créant des œuvres d'art.</p>

      <p><strong>Le libre arbitre, la domination et la responsabilité</strong> : La capacité à choisir entre le bien et le mal est une manifestation de l'image de Dieu.</p>

      <p><strong>La nature corporelle et spirituelle</strong> : L'homme est une unité de corps et d'âme. L'unité de l'esprit humain, de l'âme et du corps est souvent comparée à la Trinité (Père, Fils et Saint-Esprit).</p>

      <blockquote>La théologie reconnaît que l'homme, bien que créé à l'image de Dieu, en raison du péché, n'est pas une copie parfaite et que cette image est souvent « blessée ». Pour la théologie, cette image est restaurée par Jésus-Christ, pleine image de Dieu.</blockquote>

      <h3>2. Être relationnel</h3>

      <p>L'homme est un être de relation, sa nature et son existence sont définies en partie par sa relation avec Dieu, avec les autres, et avec le monde. L'homme est créé relationnel à l'image d'un Dieu en communion, et son épanouissement se réalise dans la relation avec Dieu et ses semblables.</p>

      <p>Le mystère de l'Incarnation, où Dieu se fait homme, révèle que <strong>Dieu se met à la hauteur de l'homme pour lui permettre de s'élever vers lui.</strong> La dimension relationnelle de l'homme n'est pas une facette de sa vie, mais sa nature même.</p>

      <h3>3. Double nature : corps et âme/esprit</h3>

      <p>L'homme est à la fois un être matériel (corps) et spirituel (esprit), une unité qui le distingue des animaux. Cette double nature peut se comprendre de deux manières principales : la dualité humaine (nature physique et spirituelle) et le dogme de l'union des natures divine et humaine en la Personne de Jésus-Christ.</p>

      <h3>4. Capacité de choix</h3>

      <p>Contrairement aux animaux guidés par leurs instincts, l'homme a la capacité de choisir, une liberté qui est au cœur de son être. Créé libre et responsable, mais déchu par le péché original, il est appelé à être racheté par le Christ pour retrouver sa pleine vocation. <strong>Sa liberté s'épanouit quand elle est tournée vers Dieu.</strong></p>

      <h3>5. Intégrité et imperfection</h3>

      <p>Le péché impacte tout ce qui constitue l'homme, créant une situation de dualité constante, où l'homme vit simultanément comme « juste » et « pécheur » (<em>simul iustus et peccator</em>). L'homme est créé bon, mais son être est affecté par le péché originel, le rendant imparfait et soumis à la souffrance et à la mort.</p>

      <h3>6. Égalité fondamentale</h3>

      <p>L'égalité fondamentale de l'homme découle de sa création à l'image de Dieu, ce qui lui confère une dignité intrinsèque et égale à celle de tout autre être humain. Cette égalité implique une obligation de traiter chacun sans discrimination fondée sur le sexe, l'origine sociale ou la race.</p>

      <h2>II. Défis et opportunités de l'homme contemporain</h2>

      <h3>1. Dialogue entre théologie et modernité</h3>

      <p>Le dialogue entre l'homme et la modernité dans la théologie se caractérise par une tension entre la foi et la raison, l'individu et la communauté, et l'engagement envers le monde et la recherche de transcendance.</p>

      <p>Certains courants théologiques perçoivent la modernité comme une source de problèmes — perte de sens, déclin des liens sociaux — et proposent la religion comme un rempart. D'autres théologiens voient dans la modernité l'opportunité d'un dialogue constructif, soulignant que la citoyenneté dans le « royaume de Dieu » implique une responsabilité pour le présent et l'avenir.</p>

      <h3>2. Le « Dieu crucifié » et la gratuité</h3>

      <p>Le mystère de Dieu et le mystère de l'homme sont liés indissolublement. La gratuité du don de Dieu, manifestée par la crucifixion de Jésus, implique que le salut et la vie éternelle sont des dons immérités offerts par grâce, et non des récompenses obtenues par les œuvres.</p>

      <blockquote>« Vous avez reçu gratuitement, donnez gratuitement ! » (Matthieu 10, 8)</blockquote>

      <p>Cette idée appelle à une réponse de gratuité dans les relations humaines, encourageant l'amour désintéressé, l'humilité et le partage de ce que l'on a reçu gratuitement.</p>

      <h3>3. Remise en cause de l'utilité de Dieu</h3>

      <p>L'homme moderne, se sentant plus autonome, questionne la fonction et l'utilité de Dieu. Pour certains, l'utilité de Dieu réside dans sa capacité à donner un sens à l'existence, à offrir un cadre moral. Dieu fournit un cadre de valeurs et de principes moraux qui aide l'homme à distinguer le bien du mal.</p>

      <p>La remise en question de la foi peut être une partie normale du cheminement, qui mène à un approfondissement de la foi et à une recherche plus ardente de Dieu. Le doute est une occasion de renforcer la foi, tandis que l'utilité de Dieu est perçue comme une source de sens, d'harmonie, de soutien face aux épreuves et un guide moral.</p>

      <h2>Conclusion</h2>

      <p>L'utilité de Dieu pour l'homme moderne est complexe et varie selon les perspectives, allant de la quête de sens et de l'harmonie intérieure à la recherche de réponses morales et d'une perspective de vie. La théologie offre Dieu à l'homme comme un fondement pour le sens de la vie, un sens du sacré, et un but ultime qui transcende le monde matériel, tout en procurant une espérance de vie après la mort.</p>

      <p>Et la foi est une source de force face aux difficultés, d'encadrement moral et de conseils pratiques pour les relations et la vie quotidienne avec la Sainte Trinité. <strong>Dieu est le même hier, aujourd'hui et demain.</strong></p>
    `,
  },
];

// Helper to get articles by category
export const getArticlesByCategory = (categorySlug: string) =>
  enseignementsArticles.filter((a) => a.category === categorySlug);

// Helper to get article by slug
export const getArticleBySlug = (slug: string) =>
  enseignementsArticles.find((a) => a.slug === slug);
