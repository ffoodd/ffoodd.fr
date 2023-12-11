---
title: "AccesSlide&nbsp;: la prise en main"
date: "2015-05-24T11:06:51"
modified: "2015-05-26T09:03:59"
permalink: "accesslide-la-prise-en-main/index.html"
excerpt: "<p>Auriez-vous ‒&nbsp;par hasard&nbsp;‒ déjà cherché une solution pour créer des diaporamas accessibles&nbsp;? De nombreuses solutions existent, mais aucune n’était réellement satisfaisante… C’est désormais le cas avec <a href="http://accesslide.net/">AccesSlide</a>, dont j’avais découvert l’existence après le petit jeu du 1<sup>er</sup> avril organisé par <a href="http://www.access42.net/">Access42</a>. Ma première prise en main a été très agréable alors me voilà lancé dans quelques explications et une démonstration pour en vanter les mérites&nbsp;! <a href="https://www.ffoodd.fr/accesslide-la-prise-en-main/" aria-hidden="true">Lire la suite de «&nbsp;AccesSlide&nbsp;: la prise en main&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Access42 est la société créée conjointement par Armony Altinier (rédactrice du livre «&nbsp;Accessibilité web&nbsp;» dont j’ai écrit <a href="https://www.ffoodd.fr/lecture-accessibilite-web/">un compte-rendu de lecture</a>) et Jean-Pierre Villain après qu’ils aient remporté le marché de refonte du <abbr title="Référentiel Général d’Accessibilité pour les Administrations">RGAA</abbr>3. Ils ont été rapidement rejoint par Sylvie Duchateau et Audrey Maniez.</p>
<p>Si vous ne connaissez pas ces noms, sachez qu’ils sont <strong>incontournables dans le domaine de l’accessibilité numérique en France</strong>. Et c’est peu dire&nbsp;!</p>
<h2>Premier contact</h2>
<p>Pour commencer, je tiens à signaler la manière tout à fait <strong>attractive</strong> qu’a trouvé d’Access42 pour communiquer sur ce nouvel outil&nbsp;: c’est suite à ma participation à leur <a href="http://access42.net/MAJ-Jeu-concours-le-secret-de-la-licorne.html">jeu-concours&nbsp;: le secret de la licorne</a> que j’ai reçu un mail signalant dans un premier temps <a href="https://github.com/access42/AccesSlide">le dépôt Github d’AccesSlide</a>. </p>
<p>C’est bête, mais ça donne envie de regarder&nbsp;! Étant donné que j’avais déjà cherché une solution lors de la préparation de mon atelier pour le <a href="http://2014.wptech.fr/">WP Tech</a> et que je prépare une conférence pour le <a href="http://2015.wpmx.org/">WPMX</a>, je me suis lancé dans l’utilisation de cet outil.</p>
<p>De prime abord, <strong>cette solution est très riche</strong>. Le <strong>sommaire</strong> ainsi que <strong>les réglages utilisateurs</strong> sont de très gros atouts pour ce système de diaporama.</p>
<p><strong>Commençons par créer le contenu &nbsp;!</strong></p>
<h2>La contribution</h2>
<p>Partie cruciale s’il en est, AccesSlide permet de rédiger ces slides de façon extrêmement simple, en imposant <strong>très peu de contraintes sur le balisage</strong>. Il suffit d’une section avec la bonne classe, et le tour est joué&nbsp;:</p>
<pre><code class="language-markup">&lt;section class=&quot;slide&quot;&gt; [votre diapo] &lt;/section&gt;</code></pre>
<p>Il est difficile de faire plus simple, et c’est équivalent en terme d’efficacité aux solutions populaires telles que <a href="http://lab.hakim.se/reveal-js/#/" hreflang="en">Reveal.js</a>. <strong>Ainsi pour la saisie du contenu, c’est top&nbsp;!</strong></p>
<h2>La personnalisation</h2>
<p>L’équipe d’Access42 a gardé cet aspect important pour l’appropriation en tête, <strong>et c’est tant mieux</strong>. Un système de thèmes fonctionne très bien, ce qui m’a permis d’implémenter très rapidement des styles qui correspondent à la fois à ce site mais aussi à ma précédente présentation. Quelques ajustements ont évidemment été nécessaires, mais rien de bien compliqué.</p>
<p>Je dois même avouer avoir été agréablement surpris par la facilité de personnalisation, car la majorité des styles structurels sont cloisonnés dans un fichier principal et <strong>évite toute forme de collision désagréable</strong>.</p>
<h2>Mon thème</h2>
<p>Ni une, ni deux&nbsp;: j’ai donc créé mon thème. Voici donc <a href="https://www.ffoodd.fr/wp-tech/">le support de mon atelier du WP Tech</a> refondu en utilisant AccesSlide. Qu’en pensez-vous&nbsp;?</p>
<p>Pour rester fidèle à ma première présentation —&nbsp;mais aussi pour essayer de creuser un peu plus&nbsp;— je suis allé faire quelques modifications plus profondes.</p>
<h3>Les pictogrammes en <abbr lang="en" title="Scalable Vector Graphics">SVG</abbr></h3>
<p>Mon dada du moment. Les boutons et liens icônes sont intégrés à l’aide d’une police d’icône dans la version «&nbsp;officielle&nbsp;» proposée par Access42. Personnellement, je n’aime pas cette technique, que je trouve moins robuste qu’une bonne vieille balise image avec une source vectorielle. J’ai donc changé la façon de gérer ces boutons. Ça m’amène à une première remarque d’ordre général, mais sans être expert <strong>je pense que le javascript peut encore être amélioré</strong> car on trouve beaucoup de répétitions.</p>
<p>Pour information, il s’avère que si une balise image a une source svg, il faut ajouter le rôle image afin que VoiceOver accède à l’alternative textuelle&nbsp;:</p>
<pre><code class="language-markup">&lt;img src=&quot;*.svg&quot; alt=&quot;Quel essai !&quot; role=&quot;img&quot; <br />
     width=&quot;8&quot; height=&quot;8&quot; /&gt;</code></pre>
<p>Étant donné que ça ne constitue pas un effort insurmontable ni même complexe, je préfère toujours cette version (qui fonctionne à partir d’<abbr lang="en" title="Internet Explorer">IE</abbr>9).</p>
<p>Un petit coucou et un grand merci à Nicolas Hoffmann qui, suite  à mon interrogation, a permis de confirmer ce diagnostic en haranguant la plèbe sur Twitter. Lisez <a href="https://twitter.com/Nico3333fr/status/601687531218931712">le fil de discussion</a>, c’est très intéressant !</p>
<h3>La transition en <abbr lang="en" title="Cascading StyleSheet">CSS</abbr></h3>
<p>J’avais particulièrement apprécié la gestion des transitions sur Reveal.js, plutôt simple et efficace à l’aide de CSS. Aucun des effets proposés par AccesSlide ne correspondaient à celui que j’utilisais précédemment, alors je l’ai re-créé et ajouté&nbsp;!</p>
<p>Là encore, <strong>ce fut extrêmement facile</strong> en déclarant la nouvelle animation <a href="https://github.com/access42/AccesSlide/blob/master/AccesSlide.js#L63" hreflang="en">conformément aux isntructions laissées dans le fichier javascript principal</a>. Côté utilisateur, vous pourrez voir cette animation en la choisissant dans les réglages&nbsp;: je l’ai nommée «&nbsp;Coulisse vers la gauche&nbsp;» puisque c’est ce qu’elle fait&nbsp;!</p>
<p>Ainsi le conteneur principal se voit affubler d’un attribut <code>data-effect</code> dont la valeur est le nom de l’effet. Il n’en faut pas plus pour appliquer la transition CSS de mes rêves (même si je dois avouer devoir truander un peu afin de ne pas toucher aux fichiers originels)&nbsp;:</p>
<pre><code class="language-css">[data-effect=&quot;ffoodd&quot;] .slide {<br />
  display: block !important;<br />
  opacity: 0;<br />
  margin: .5rem;<br />
  position: absolute;<br />
  top: 0 !important;<br />
  visibility: hidden;<br />
  transform-style: preserve-3d;<br />
  transition: <br />
    transform-origin .8s cubic-bezier(.26, .86, .44, .985),<br />
    transform .8s cubic-bezier(.26, .86, .44, .985),<br />
    visibility .8s cubic-bezier(.26, .86, .44, .985),<br />
    opacity .8s cubic-bezier(.26, .86, .44, .985);<br />
}<br />
<br />
[data-effect=&quot;ffoodd&quot;] .slide[style*=&quot;display: none&quot;] {<br />
  opacity: 0;<br />
  pointer-events: none;<br />
  position: absolute;<br />
  transform: translate3d( -150%, 0, 0 );<br />
  visibility: hidden;<br />
}<br />
<br />
/* C’est là que je truande :P */<br />
[data-effect=&quot;ffoodd&quot;] .slide[style*=&quot;display: block&quot;] {<br />
  opacity: 1          !important;<br />
  position: relative  !important;<br />
  visibility: visible !important;<br />
}<br />
<br />
[data-effect=&quot;ffoodd&quot;] .slide[style*=&quot;display: block&quot;] ~ .slide[style*=&quot;display: none&quot;] {<br />
  transform: translate3d( 150%, 0, 0 );<br />
}</code></pre>
<p>Et puis pour le fun, j’ai ajouté une animation au chargement de la page&nbsp;:</p>
<pre><code class="language-css">@keyframes move-up {<br />
  from {<br />
    transform: translateY( 100% ) translateZ( 0 );<br />
    opacity: 0;<br />
  }<br />
}<br />
<br />
[data-effect=&quot;ffoodd&quot;] #wrapper {<br />
  animation: move-up .8s cubic-bezier(.165, .840, .440, 1);<br />
}</code></pre>
<p>Et le tour est joué&nbsp;☺.</p>
<h2>Participez&nbsp;!</h2>
<p>Pour le moment mon thème est trop éloigné de la solution originelle pour que je puisse le proposer simplement, mais avec un peu de réécriture ce devrait être faisable (tout comme l’animation). <strong>Je tenterai de les proposer à Access42 dès que mon temps libre me le permettra</strong>&nbsp;!</p>
<p>Même si je ne m’en suis pas servi, je tiens également à souligner l’utilisation de fichiers partiels et du post-processeur <a href="http://www.myth.io/" hreflang="en">Myth</a> pour générer les sources. Le découpage en fichiers partiels rend l’orientation dans les fichiers encore plus clair. Côté compilation, une configuration basique pour Grunt est aussi mise à disposition.</p>
<p><strong>Tout est fait pour que quiconque puisse s’approprier la solution rapidement.</strong></p>
<p>Ah oui au fait, il y a d’autres fonctionnalités que je n’ai même pas évoquées&nbsp;:</p>
<ul>
<li>les styles pour l’impression&nbsp;;</li>
<li>le responsive&nbsp;;</li>
<li>un mode plan&nbsp;;</li>
<li>un système d’internationalisation géré <i>via</i> javascript.</li>
</ul>
<p>Plutôt pas mal, non&nbsp;☺&nbsp;?</p>
<p><strong>Alors à votre tour de contribuer</strong>&nbsp;: <a href="https://github.com/access42/AccesSlide" hreflang="en">AccesSlide est sur Github</a>&nbsp;!</p>
<h2>Épilogue</h2>
<p>Il me reste un point important remonté par <a href="http://anysurfer.be/fr">Sophie Schuermans</a> concernant l’aspect responsive que j’ai un peu endommagé. Et je tiens également à remercier <a href="http://www.nicolas-hoffmann.net/source/">Nicolas Hoffmann</a> pour sa relecture attentive et ses conseils, ainsi qu’<a href="http://accessiblog.fr/">Olivier Nourry</a> pour son intérêt&nbsp;!</p>
