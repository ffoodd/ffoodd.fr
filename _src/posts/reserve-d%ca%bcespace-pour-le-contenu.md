---
title: "Réserve d’espace pour le contenu"
date: "2015-12-03T12:30:49"
modified: "2015-12-09T09:28:45"
permalink: "reserve-d%ca%bcespace-pour-le-contenu/index.html"
excerpt: "<p>Cet effet consiste à utiliser en guise d&#700;indicateur de chargement un élément graphique ayant les mêmes caractéristiques visuelles —&nbsp;hauteur, largeur, lignes, blocs&hellip;&nbsp;— que le contenu en cours de chargement. Vous le connaissez probablement déjà car c&#700;est ce qu&#700;utilisent Facebook et Medium, entre autres. Et c&#700;est quand même vachement mieux qu&#700;un gif qui tourne en rond. <a href="https://www.ffoodd.fr/reserve-d%ca%bcespace-pour-le-contenu/" aria-hidden="true">Lire la suite de «&nbsp;Réserve d’espace pour le contenu&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>C&rsquo;est ce qu&#700;utilisent notamment Facebook et Medium, dont le contenu respecte un gabarit constant. En terme d&#700;interface, ça me semble <strong>vraiment plus agréable</strong> que le classique <i>ouroboros</i>.</p>
<p>Et figurez-vous que pour le moment, tous <strong>les retours sont extrêmement positifs</strong>. En session de test utilisateurs, la plupart des testeurs lʼont remarqué et ont tenu à le signaler comme un élément «&nbsp;très agréable&nbsp;». Moi qui pensait mʼamuser à suivre un effet de mode à la mords-moi-le-nœud et être passé du côté obscur de la Force, me voilà confondu. Cet effet semble conférer une réelle valeur ajoutée à <strong>lʼexpérience utilisateur</strong>, alors jʼaie envie de vous montrer ce quʼil y a sous le capot afin de partager et dʼaméliorer encore tout ça.</p>
<h2>Quelques recherches pour démarrer</h2>
<p>Bon, bizarrement, je nʼai pas trouvé beaucoup de ressources pour faire ce truc. La plus visible est <a href="http://codepen.io/Mestika/pen/ByNYBa" hreflang="en">une expérimentation sur codePen</a> qui est franchement sale. Une soupe de <code>div</code>, chacune positionnée en absolu et calée au pixel près. En revanche lʼarticle de lʼapprenti magicien est <strong>relativement</strong> intéressant&nbsp;: «&nbsp;<a lang="en" href="http://cloudcannon.com/deconstructions/2014/11/15/facebook-content-placeholder-deconstruction.html" hreflang="en"><em>Facebook content placeholder deconstruction</em></a>&nbsp;». Très relativement, hein. Ça manque cruellement de référence donc si vous avez, elles mʼintéressent !</p>
<p>En revanche il lie un autre article un peu plus intéressant qui aborde le sujet de lʼexpérience utilisateur&nbsp;: «&nbsp;<a href="http://usabilitypost.com/2009/01/23/making-wait-times-feel-shorter/"><em>Making Wait Times Feel Shorter</em></a>&nbsp;» de Dmitry Fadeyev. Jʼen retiens surtout la dernière phrase&nbsp;:</p>
<blockquote lang="en"><p>This isn’t just simple courtesy, watching the progress bar move makes time fly faster.</p></blockquote>
<p>Je traduis sommairement&nbsp;: ce nʼest pas une simple question de courtoisie, regarder lʼindicateur de progression fait passer le temps plus vite. Ma foi, ça a du sens. Dans cet article, lʼauteur préconise également de spécifier le délai dʼattente quand cʼest possible afin que lʼutilisateur <strong>sache à quoi sʼattendre</strong>. Et bien cet effet de faux contenu en attendant le contenu réel donne une indication plus précise du format de données que lʼon attend et nous permet dʼ<strong>anticiper la lecture du contenu</strong> et de <strong>nous projeter dans son parcours</strong>.</p>
<h2>Faire plus simple</h2>
<h3>Utiliser un élément graphique</h3>
<p>Tout ça est bien joli, mais niveau code cʼest quand même assez moyen (à mon goût en tout cas). Par exemple nous parlons ici dʼun effet purement graphique —&nbsp;voire esthétique&nbsp;— alors pourquoi utiliser des éléments <abbr lang="en" title="HyperText Markup Language">HTML</abbr> pour le fabriquer&nbsp;? Un élément graphique semble plus adapté, et ô comble de joie il est possible dʼutiliser des images en HTML depuis 1994.</p>
<h3>Prévoir une alternative</h3>
<p>Cʼest un <strong>visuel porteur dʼinformations</strong>, et à ce titre il doit disposer dʼune <strong>alternative textuelle pertinente</strong>. Je vous laisse (re)lire le critère associé du <abbr title="Référentiel Général d'Accessibilité pour les Administrations">RGAA</abbr> qui, comme pour témoigner de son importance, porte le doux nom de <a href="http://references.modernisation.gouv.fr/referentiel-technique-0#title-critre-11-a-chaque-image-a-t-elle-une-alternative-textuelle-">critère 1.1</a>. Ce point nʼest <i>a priori</i> pas très complexe à mettre en œuvre.</p>
<h3>Faire passer le temps</h3>
<p>Il ne faudrait pas omettre que lʼobjectif est avant tout de faire patienter lʼutilisateur de la manière la plus agréable possible. Pour cela nous évitons le (très frustrant) petit disque qui tourne en rond, cʼest déjà bien. Mais <strong>si lʼexpérience peut sʼavérer agréable</strong>, ce serait encore mieux&nbsp;! À cette unique fin, je vais suivre les exemples de Facebook et Medium qui ont mis en place un effet de balayage lumineux afin de cadencer le temps d&#700;attente.</p>
<h2>Super&nbsp;! Ça donne quoi&nbsp;?</h2>
<h3>Créer l&#700;image d&#700;attente</h3>
<p>Pour démarrer, on va choisir un contenu quʼon pourrait attendre. Jʼen ai choisi un assez connu et avec un gabarit familier et reconnaissable&nbsp;: la carte de profil sur Twitter.</p>
<p><figure class="wp-caption pa1 aligncenter" role="group" itemscope itemtype="http://schema.org/ImageObject"><img loading="lazy" decoding="async" id="attachment_1849" itemprop="contentURL" aria-describedby="wp-caption--attachment_1849" src="/images/2015/12/profil-twitter-300x202.png" alt="Ma carte de profil sur Twitter" width="300" height="202" class="size-medium wp-image-1849" srcset="https://www.ffoodd.fr/wp-content/uploads/2015/12/profil-twitter-300x202.png 300w, https://www.ffoodd.fr/wp-content/uploads/2015/12/profil-twitter.png 320w" sizes="(max-width: 300px) 100vw, 300px" /><figcaption class="wp-caption-text pt1 small" id="wp-caption--attachment_1849" itemprop="description">La carte de profil indique le nom, le pseudonyme et l&rsquo;avatar Twitter, mais aussi les nombres de tweets, d&rsquo;abonnements et d&rsquo;abonnés.</figcaption></figure></p>
<p>C&#700;est donc la-dessus que va se baser la création du visuel d&#700;attente. Sur le principe, je me contente de créer un bloc en aplat gris par élément, afin de <strong>représenter sa masse visuelle</strong><sup aria-describedby="note-1" id="lien-1" data-note="C&#700;est le même principe que le gris typographique en composition de page."><a class="scroll print-hidden" href="https://www.ffoodd.fr/reserve-d%ca%bcespace-pour-le-contenu/#note-1" title="C&#700;est le même principe que le gris typographique en composition de page.">[1]</a></sup>. Étant donné que je suis flemmard, j&#700;importe simplement une capture du bloc à reproduire dans Illustrator, et redessine «&nbsp;par-dessus&nbsp;» chaque bloc. Ça permet entre autre chose de <strong>conserver un ratio de un pour un</strong>, ce qui présente un fort intérêt dans ce cas.</p>
<p><figure class="wp-caption pa1 aligncenter" role="group" itemscope itemtype="http://schema.org/ImageObject"><img loading="lazy" decoding="async" id="attachment_1853" itemprop="contentURL" aria-describedby="wp-caption--attachment_1853" src="/images/2015/12/twitter-placeholder-300x201.png" alt="Gabarit de carte de profil twitter" width="300" height="201" class="size-medium wp-image-1853" srcset="https://www.ffoodd.fr/wp-content/uploads/2015/12/twitter-placeholder-300x201.png 300w, https://www.ffoodd.fr/wp-content/uploads/2015/12/twitter-placeholder.png 318w" sizes="(max-width: 300px) 100vw, 300px" /><figcaption class="wp-caption-text pt1 small" id="wp-caption--attachment_1853" itemprop="description">Gabarit de carte de profil twitter représenté en masses colorées</figcaption></figure></p>
<p>Bon, j&#700;admets également avoir exporté un <abbr lang="en" title="Scalable Vector Graphic">SVG</abbr> plutôt qu&#700;une bête image bitmap. Pour tout vous dire ça n&#700;est pas nécessairement le meilleur choix, étant donné que pour une image aussi simple <strong>le SVG est plus lourd</strong> qu&#700;un PNG bien optimisé et qu&#700;<strong>on perd nécessairement en support navigateur</strong>.</p>
<h3>Implémenter une alternative accessible</h3>
<p>Pour celui-ci aucun mérite, puisque l&#700;accessibilité des SVG commence à être bien documentée. Je vous laisse farfouiller un peu les artères du web pour trouver votre bonheur —&nbsp;personnellement j&#700;ai abouti à ceci&nbsp;:</p>
<pre><code class="language-markup"><br />
&lt;svg viewBox=&quot;0 0 320 215&quot; width=&quot;320&quot; height=&quot;215&quot;<br />
     aria-labelledby=&quot;title desc&quot; role=&quot;img&quot;<br />
     xmlns=&quot;http://www.w3.org/2000/svg&quot;&gt; <br />
  &lt;title id=&quot;title&quot;&gt;Chargement en cours…&lt;/title&gt;<br />
  &lt;desc id=&quot;desc&quot;&gt;La carte de profil est en chemin !&lt;/desc&gt;<br />
  &lt;path role=&quot;presentation&quot; d=&quot;…&quot; /&gt;<br />
&lt;/svg&gt;<br />
</code></pre>
<p>Je vous passe les détails sordides des multiples <code>&lt;path&gt;</code> dans le SVG, vous pourrez jouer avec dans la démo —&nbsp;et accessoirement, c&#700;est une partie que vous devrez personnaliser, donc&hellip; Mais normalement ce magnifique assortiment de <code>&lt;title&gt;</code> et <code>&lt;desc&gt;</code> liés au SVG <i>via</i> <code>aria-labelledby</code> fait l&#700;affaire et rend le tout intelligible.</p>
<h3>Implémenter une animation</h3>
<h4>On est dans du SVG</h4>
<p>À l&#700;aube du premier jour, jeune et fougueux que j&#700;étais, je me suis dit «&nbsp;Yay, dans du SVG, je vais enfin pouvoir jouer avec <abbr lang="en" title="Synchronized Multimedia Integration Language">SMIL</abbr>&nbsp;». <em>Que nenni</em>&nbsp;!</p>
<p>Deux (plutôt) bonnes raisons de s&#700;en dispenser&nbsp;:</p>
<ol>
<li><a href="http://caniuse.com/#search=SMIL" hreflang="en">Le support est très moyen</a>, notamment absent des navigateurs Microsoft&nbsp;;</li>
<li>Chrome et Opéra lancent (depuis deux ou trois versions) une alerte dans la console lorsqu&#700;on utilise SMIL, qu&#700;ils considèrent déprécié et dont ils vont abandonner le support un beau matin.</li>
</ol>
<p>Ça n&#700;est guère glorieux, même si <a href="http://designmodo.com/animate-svg-gradients/" hreflang="en">un charmant tutoriel en anglais</a> me montrait qu&#700;on pouvait facilement animer un dégradé en remplissage d&#700;un SVG. Dommage.</p>
<h4>Mais on fait du CSS</h4>
<p>C&#700;est donc finalement vers les animations CSS que je dois me tourner. C&#700;est moins rigolo puisque je connais déjà, mais au moins <a href="http://caniuse.com/#search=animation" hreflang="en">le support est excellent</a>.</p>
<p>En revanche <strong>impossible d&#700;animer <i>via</i> CSS le remplissage d&#700;un SVG</strong>. Le SVG sera donc rempli en aplat, et il va falloir se débrouiller autrement pour l&#700;effet de balayage. Voilà comment j&#700;ai réssolu la chose&nbsp;:</p>
<ul>
<li>un dégradé linéaire allant du transparent au transparent —&nbsp;afin de profiter du merveilleux SVG derrière&nbsp;— en passant par une étape de blanc pour apporter la lumière en ce bas-monde&nbsp;;</li>
<li>une dimension d&#700;arrière-plan pour ajuster la mise en scène du dégradé&nbsp;;</li>
<li>et finalement, une animation dont la seule préoccupation est de déplacer l&#700;arrière-plan.</li>
</ul>
<p>C&#700;est donc un poil plus complexe que de simplement remplir le SVG avec un dégradé qui s&#700;anime tout seul, mais bon&nbsp;! En revanche il ne vous aura probablement pas échappé qu&#700;il nous faut cette animation <strong>devant</strong> le SVG. Et pour cela un pseudo-élément serait fort agréable. Malheureusement <a href="https://github.com/ffoodd/a11y.css/blob/master/README-fr.md#cas-particuliers-et-problèmes-connus">SVG est un élément remplacé</a>, ce qui empêche de lui appliquer un pseudo-élément. Pour pouvoir implémenter l&#700;animation, il nous faut donc un élément conteneur qui portera le pseudo-élément (ce même conteneur qui pourrait fort bien vous servir dans un contexte adaptatif ou simplement pour la mise en page).</p>
<h2>La démonstration</h2>
<p>En supposant que vous utilisez une division comme conteneur, voici les styles du pseudo-élément&nbsp;:</p>
<pre><code class="language-css"><br />
div::after {<br />
  animation: placeholder 2s linear infinite;<br />
  background-image: <br />
    linear-gradient( <br />
      110deg, <br />
      rgba( 255, 255, 255, 0) 10%, <br />
      rgba( 255, 255, 255, .33) 30%, <br />
      rgba( 255, 255, 255, 0) 60% <br />
    );<br />
    background-size: 20em 13.4375em;<br />
    bottom: 0;<br />
    content: &quot;&quot;;<br />
    left: 0;<br />
    position: absolute;<br />
    right: 0;<br />
    top: 0;<br />
    z-index: 2;<br />
}</code></pre>
<p>Un détail peut vous surprendre&nbsp;: je n&#700;utilise pas le mot-clé <code>transparent</code> mais la notation <code>rgba( 255, 255, 255, 0 )</code>. Peut-être le savez-vous déjà mais le mot-clé qui semble définir la transparence est en réalité une notation raccourcie de <code>rgba( 0, 0, 0, 0 )</code>, <a href="http://www.w3.org/TR/css3-color/#transparent" hreflang="en">comme le précise la spécification du module «&nbsp;Couleurs&nbsp;» de CSS3</a>. Ça n&#700;a l&#700;air de rien comme ça, mais ça a son importance si vous appliquez un dégradé —&nbsp;disons du blanc au transparent, par exemple&nbsp;— et que vous regardez le résultat sur Safari&nbsp;: il interpole le dégradé en tendant vers le noir (ce qui est relativement logique) et vous donne donc un intermédiaire immonde entre votre blanc nacré et votre transparence parfaite. Un gros pâté noir, quoi. <strong>Bref, c&#700;est moche</strong>. Utiliser le blanc avec une opacité nulle résout facilement ce travers.</p>
<p>Ensuite pour animer le dégradé, c&#700;est plutôt simple puisque vous avez déjà vu l&#700;appel à l&#700;animation <code>placeholder</code>, pour une durée de deux secondes et en boucle. Elle se contente de déplacer le fond d&#700;une distance équivalente à la largeur du bloc, afin de générer une véritable boucle visuelle.</p>
<pre><code class="language-css"><br />
@keyframes placeholder {  <br />
  from { <br />
    background-position: -10em 0; <br />
  } to { <br />
    background-position: 10em 0; <br />
  }<br />
}</code></pre>
<p><strong>Et voilà&nbsp;!</strong></p>
<p>Si vous souhaitez jouer avec ou le reprendre, <a href="http://dabblet.com/gist/466b6a47db1b4ac14ecb">vous trouverez le tout sur Dabblet</a>. Rien de bien complexe, mais c&#700;est tellement simple et efficace qu&#700;il serait dommage de s&#700;en priver&nbsp;&#128519;</p>
