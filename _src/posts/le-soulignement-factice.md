---
title: "Le soulignement factice"
date: "2015-11-20T15:16:37"
modified: "2017-01-20T11:20:39"
permalink: "le-soulignement-factice/index.html"
excerpt: "<p>Malgré l&#700;arrivée des fonctionnalités <em>OpenType</em> et <a href="http://caniuse.com/#feat=font-feature" title="leur support plus que décent (en anglais)">leur support plus que décent</a>, la typographie sur le web manque encore de raffinement si on compare ses possibilités dans le monde imprimé. Parmi les artefacts qui illustrent encore à ce jour la grossièreté de la <strong>typographie sur le web</strong>, le soulignement est le plus courant. Mais des techniques existent pour enrichir ce soulignement&nbsp;! <a href="https://www.ffoodd.fr/le-soulignement-factice/" aria-hidden="true">Lire la suite de «&nbsp;Le soulignement factice&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Je vous enjoins à lire la «&nbsp;<a href="http://letrainde13h37.fr/43/signaletique-hyperliens/">Signalétique des hyperliens</a>&nbsp;» sur le train de 13&nbsp;h&nbsp;37, par <a href="https://twitter.com/tetue">Romy Duhem-Verdière</a>. On y apprend notamment que —&nbsp;typographiquement parlant&nbsp;— le souligné n&#700;est d&#700;aucune utilité, sauf éventuellement à palier l&#700;absence d&#700;italique (ce qui est somme toute assez rare). En revanche sur le web, c&#700;est <strong>le meilleur moyen de signaler un lien</strong>.</p>
<h2>Graphiquement grossier</h2>
<p>Le souligné ordinaire est effectivement grossier&nbsp;: c&#700;est un reliquat des toutes premières typographies affichées sur un écran —&nbsp;que je n&#700;ai pas eu la chance de croiser. Vous pouvez le constater avec <u>cet exemple de souligné ordinaire</u><sup aria-describedby="note-1" id="lien-1" data-note="Percevez-vous comme ce soulignement est affordant&nbsp;? On a envie de cliquer dessus, pas vrai&nbsp;?"><a class="scroll print-hidden" href="https://www.ffoodd.fr/le-soulignement-factice/#note-1" title="Percevez-vous comme ce soulignement est affordant&nbsp;? On a envie de cliquer dessus, pas vrai&nbsp;?">[1]</a></sup> (un simple élément <code>&lt;u&gt;</code>).</p>
<p>Sur le plan visuel, le souligné croise les jambages inférieures, ce qui crée un attroupement inopportun de pixels qu&#700;on pourrait qualifier de «&nbsp;petits pâtés&nbsp;»<sup aria-describedby="note-2" id="lien-2" data-note="Terme technique issu d&#700;une longue histoire de la calligraphie à la plume (ou de l&#700;apprentissage de l&#700;écriture avec un stylo plume pour les plus jeunes d&#700;entre vous)."><a class="scroll print-hidden" href="https://www.ffoodd.fr/le-soulignement-factice/#note-2" title="Terme technique issu d&#700;une longue histoire de la calligraphie à la plume (ou de l&#700;apprentissage de l&#700;écriture avec un stylo plume pour les plus jeunes d&#700;entre vous).">[2]</a></sup>. <strong>C&#700;est disgracieux</strong>.</p>
<p>Quelques tentatives existaient déjà il y a fort longtemps, comme en témoigne <a href="http://alistapart.com/article/customunderlines">l&#700;article de Susan Robertson sur A List Apart</a> qui utilisait <code>background-image</code> pour mettre un une image répétée en guise de soulignement. Ça peut sembler étrange —&nbsp;notamment quand vous aurez vu les exemples animés&nbsp;— mais en 2004, c&#700;était parfaitement fabuleux.</p>
<h2>Le truchement <abbr title="Cascading styleSheet">CSS</abbr></h2>
<p>On ne peut malheureusement pas <strong>encore</strong> intervenir sur la propriété <code>text-decoration: underline;</code> de façon satisfaisante. Ce sera en revanche le cas un jour avec <code>text-decoration-skip: ink;</code> qui est <a href="https://drafts.csswg.org/css-text-decor-3/#text-decoration-skip-property">à l&#700;état de brouillon au <abbr title="World Wide Web Consortium">W3C</abbr> (en anglais)</a>. Il n&#700;existe actuellement aucun support de cette propriété, cependant <a href="https://css-tricks.com/almanac/properties/t/text-decoration-skip/">celle-ci est émulée sur les engins Apple omme le mentionne Chris Coyier sur CSS-Tricks (en anglais)</a>. En attendant, vous allez voir que Susan Robertson était déjà sur la bonne piste il y a 10 ans.</p>
<p>L&#700;astuce —&nbsp;<i>a priori</i> trouvée par Marcin Wichary pour Medium et expliquée dans «&nbsp;<a href="https://medium.com/designing-medium/crafting-link-underlines-on-medium-7c03a9274f9#.hhqigq2dq">Crafting link underlines on Medium</a>&nbsp;»&nbsp;— consiste à supprimer le <code>text-decoration</code> et le trucher à l&#700;aide d&#700;un dégradé pour la ligne, et d&#700;une ombre portée sur le texte pour «&nbsp;nettoyer les jambages&nbsp;». Comme Susan Robertson, nous allons nous servir de la propriété <code>background-image</code>, mais au lieu de charger un gif nous utiliserons la fonction <code>linear-gradient();</code>. Si vous n&#700;êtes pas encore familier avec les dégradés, prenez le temps de lire <a href="https://developer.mozilla.org/fr/docs/Web/CSS/linear-gradient">la page dédiée aux dégradés en CSS sur <abbr title="Mozilla Developper Network">MDN</abbr></a>.</p>
<h2>Du code, du code&nbsp;!</h2>
<p>J&#700;ai croisé plusieurs implémentations de cette solution, toutes très intéressantes mais aucune ne fonctionnant «&nbsp;telle quelle&nbsp;». En voici deux notables&nbsp;:</p>
<ul>
<li><a href="https://github.com/edwardtufte/tufte-css/blob/master/tufte.css#L237">la méthode utilisée par tufte-CSS (sur Github)</a>&nbsp;;</li>
<li><a href="https://eager.io/blog/smarter-link-underlines/">la réflexion menée par Adam Schwartz pour Eager (en anglais)</a> avec une illustration interactive particulièrement réussie.</li>
</ul>
<p>Ça donne suffisamment de matière pour avancer, donc j&#700;ai trituré tout ça jusqu&#700;à obtenir un résultat satisfaisant mes besoins. Vous en trouverez <a href="http://codepen.io/ffoodd/pen/jbRMqJ/">un aperçu rigolo sur CodePen</a>. Pour les feignasses, voici le CSS incriminé&nbsp;:</p>
<pre><code class="language-css"><br />
.underline {<br />
  text-decoration: underline;<br />
}<br />
<br />
.no-highcontrast.cssgradients .underline {<br />
  background: white 0 88% / 100% 0.1rem no-repeat content-box content-box;<br />
  background-image: <br />
    linear-gradient(<br />
      rgba(255, 255, 255, .67), <br />
      rgba(255, 255, 255, .67)<br />
    ), <br />
    linear-gradient(<br />
      currentColor, <br />
      currentColor<br />
    );<br />
  display: inline;<br />
  text-decoration: none;<br />
  text-shadow: <br />
    .05rem 0 0 white, <br />
   -.05rem 0 0 white, <br />
    .1rem 0 0 white, <br />
   -.1rem 0 0 white, <br />
    .2rem 0 0 white, <br />
   -.2rem 0 0 white;<br />
  width: auto;<br />
}<br />
<br />
/* Pour la sélection */<br />
/* https://developer.mozilla.org/en-US/docs/Web/CSS/::selection */<br />
.no-highcontrast.cssgradients .underline::-moz-selection {<br />
  background-color: black;<br />
  color: white;<br />
  text-shadow: none;<br />
}<br />
<br />
.no-highcontrast.cssgradients .underline::selection {<br />
  background-color: black;<br />
  color: white;<br />
  text-shadow: none;<br />
}<br />
<br />
@media screen and (-ms-high-contrast: active) {<br />
  .underline {<br />
    background: none !important;<br />
    text-decoration: underline !important;<br />
  }<br />
}<br />
</code></pre>
<p>Vous noterez les occurrences multiples de la couleur blanche —&nbsp;tant sous la forme du mot-clé <code>white</code> que de sa notation <code>rgba()</code>. Simplement parce que mon exemple à un arrière-plan blanc. Évidemment si votre texte repose sur un fond coloré, ces valeurs doivent <strong>respecter la couleur d&#700;arrière-plan</strong><sup aria-describedby="note-3" id="lien-3" data-note="Vous avez probablement déjà compris que si votre texte repose sur une image ou un dégradé, il n&#700;y aura probablement pas de salut pour votre soulignement."><a class="scroll print-hidden" href="https://www.ffoodd.fr/le-soulignement-factice/#note-3" title="Vous avez probablement déjà compris que si votre texte repose sur une image ou un dégradé, il n&#700;y aura probablement pas de salut pour votre soulignement.">[3]</a></sup>. Ça tombe bien, j&#700;en ai profité pour bricoler un <em>mixin</em> <abbr title="Syntactically Awesome StyleSheet">Sass</abbr><sup aria-describedby="note-4" id="lien-4" data-note="À vrai dire j&#700;ai également conçu le mixin pour Less&nbsp;: si vous le désirez, je vous le ferais parvenir."><a class="scroll print-hidden" href="https://www.ffoodd.fr/le-soulignement-factice/#note-4" title="À vrai dire j&#700;ai également conçu le mixin pour Less&nbsp;: si vous le désirez, je vous le ferais parvenir.">[4]</a></sup>, vous le trouverez <a href="http://codepen.io/ffoodd/pen/jbRMqJ/">sur le CodePen</a>. Le fonctionnement est très, très simple&nbsp;: la couleur d&#700;arrière-plan est une variable passée en argument du <em>mixin</em>, avec une valeur par défaut correspondant au blanc.</p>
<p>Petite astuce à prendre en considération, le second paramètre du <em>mixin</em> concerne la position du soulignement <strong>par rapport à la hauteur de l&#700;élément</strong>. Je ne suis pas parvenu à rendre ça dispensable, le changement de corps et de caractères entraînant une trop grande variation sur la hauteur de ligne. Dans mes différents cas, la position varie entre 88% et 96%.</p>
<h2>C&#700;est pas un peu verbeux&nbsp;?</h2>
<p><strong>Si</strong>. Pour plusieurs raisons que je tente de vous expliquer&nbsp;:</p>
<ul>
<li>les propriétés d&#700;arrière-plan sont très riches, avec dans la notation raccourcie&nbsp;:
<ul>
<li><code>background-color</code>&nbsp;</li>
<li><code>background-position</code>&nbsp;</li>
<li><code>background-size</code>&nbsp;</li>
<li><code>background-repeat</code>&nbsp;</li>
<li><code>background-origin</code>&nbsp;</li>
<li><code>background-clip</code>.</li>
</ul>
</li>
<li>deux dégradés, dont le premier (couleur d&#700;arrière-plan en semi-transparent) sert à alléger visuellement le second —&nbsp;qui utilise <code>currentColor</code> pour conserver la couleur du texte sur lequel il est appliqué&nbsp;;</li>
<li>l&#700;ombre sur le texte, dont le seul et unique objectif est d&#700;éviter la collision entre les jambages inférieurs et le soulignement&nbsp;;</li>
<li>et deux propriétés auxquelles vous ne vous attendiez peut-être pas&nbsp;: <code>display: inline;</code> et <code>width: auto;</code> dont l&#700;intérêt est de s&#700;assurer que notre charmant souligné suive bien le texte <strong>et uniquement le texte</strong><sup aria-describedby="note-5" id="lien-5" data-note="Sans cette astuce, certains éléments auraient un soulignement sur toute la largeur, même si le texte ne la remplit pas —&nbsp;et d&#700;autres éléments auraient un soulignement uniquement sur la dernière ligne, si d&#700;aventures ils fussent sur plusieurs lignes."><a class="scroll print-hidden" href="https://www.ffoodd.fr/le-soulignement-factice/#note-5" title="Sans cette astuce, certains éléments auraient un soulignement sur toute la largeur, même si le texte ne la remplit pas —&nbsp;et d&#700;autres éléments auraient un soulignement uniquement sur la dernière ligne, si d&#700;aventures ils fussent sur plusieurs lignes.">[5]</a></sup>&nbsp;;</li>
<li>les classes de tests du support des dégradés CSS et de l&#700;activation du mode de contrastes élevés.</li>
</ul>
<p>Ça fait beaucoup de code, mais tout est indispensable.</p>
<h2>Et l&#700;accessibilité&nbsp;?</h2>
<p>Pour commencer, il est nécessaire de mettre en place deux scripts fonctionnant sur le même principe&nbsp;:</p>
<ol>
<li>un test de fonctionnalité tel que <em>Modernizr</em> —&nbsp;<a href="https://modernizr.com/download?setclasses&amp;q=gradient">dont vous pouvez générer une version uniquement pour les dégradés CSS</a>&nbsp;— afin d&#700;appliquer ce CSS de soulignement uniquement si le navigateur supporte les dégradés&nbsp;;</li>
<li>un second test pour <strong>détecter l&#700;activation du mode de contrastes élevés</strong> —&nbsp;qui supprime les arrières-plans et laisserait donc nos éléments soulignés complètement nus et sans soulignement&nbsp;— mais qui détecte également si <strong>l&#700;utilisateur a personnalisé la couleur des liens</strong>&nbsp;: vous trouverez la source sur <a href="http://jsfiddle.net/karlgroves/XR8Su/6/">un JSFiddle de Karl Groves</a> du Paciello Group (qu&#700;il a lui-même récupéré de Hans Hillen) que j&#700;ai modifié afin de tester un lien plutôt qu&#700;une division.</li>
</ol>
<p>Les navigateurs ne supportant pas les dégradés ou étant utilisé conjointement au mode de contrastes élevés resteront avec leur bon vieux <code>text-decoration: underline;</code>.</p>
<p>Un autre cas pointu est à signaler&nbsp;: <strong>la sélection du texte en question</strong>. Il est impossible à ma connaissance de simplement supprimer les styles ajoutés (<code>unset</code> sert <em>a priori</em> à ça, mais son fonctionnement et son support ne sont pas convaincants). Il faut donc personnaliser la sélection, ce que je fais en inversant couleur d&#700;arrière-plan et couleur de texte et en supprimant l&#700;ombre sous le texte <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::selection">à l&#700;aide du pseudo-élément dédié (en anglais)</a>.</p>
<p>Merci à <a href="https://twitter.com/johan_ramon">Johan Ramon</a> pour m&#700;avoir rappelé à l&#700;ordre avec ces détails croustillants&nbsp;!</p>
<h2>Modifications</h2>
<h3>27 octobre 2016</h3>
<p>Une petite amélioration est apportée, de la manière suivante&nbsp;:</p>
<ul>
<li>si le navigateur gère <strong>les requêtes de fonctionnalités</strong> <em>via</em> <code>@supports</code> et qu&apos;il supporte <code>text-decoration-skip: ink;</code>, on applique cette propriété&nbsp;;</li>
<li>si le navigateur gère les requêtes de fonctionnalité mais pas la propriété, on applique le <code>background-image</code> lorsque le mode de contrastes élevés n&apos;est pas activé.</li>
</ul>
<p>Si ces ajouts vous intéressent, voici un peu de lecture supplémentaire&nbsp;:</p>
<ul>
<li><a href="https://developer.mozilla.org/fr/docs/Web/CSS/@supports"><code>@supports</code> sur <abbr title="Mozilla Developper Network">MDN</abbr></a>&nbsp;;</li>
<li><a href="https://developer.mozilla.org/fr/docs/Web/CSS/text-decoration-skip"><code>text-decoration-skip</code>, également sur <abbr title="Mozilla Developper Network">MDN</abbr></a>.</li>
</ul>
<p>Tout peut se résumer comme suit&nbsp;:</p>
<pre class="language-css">
<code class="language-css"><br />
@supports (text-decoration-skip: ink) {<br />
  text-decoration-skip: ink;<br />
}<br />
</code></pre>
<p>Le <a href="http://codepen.io/ffoodd/pen/jbRMqJ/">CodePen</a> est à jour pour que vous jetiez un œil, et je l&apos;ai <a href="https://gist.github.com/ffoodd/d4bee79e6af99c05f0a32542d66d5969">exporté dans un Gist</a> également.</p>
<p>Cet ajout a quelques effets notables&nbsp;:</p>
<ul>
<li>certains navigateurs sont désormais exclus par le manque de support de <code>@supports</code>, tels que le <em>Stock browser Adnroid</em>, <em>Blackberry Browser</em> ou <em>IE Mobile</em>. Ça me semble une bonne chose puisque ces styles sont relativement coûteux, ces vieux navigateurs mobiles seront épargnés&nbsp;;</li>
<li>seul Safari 9 supporte <code>text-decoration-skip: ink;</code>, et je ne suis pas certain que le rendu soit le même. Ce serait à tester et ajuster au cas par cas.</li>
</ul>
<p>Mais nous voilà avec un pied dans le futur&nbsp;!</p>
<h3>20 janvier 2017</h3>
<p><a href="https://twitter.com/7studio/status/822116634542374914">Xavier Zalawa rencontre un bug de Blink gênant</a> impliquant <code>currentColor</code> dans un <code>linear-gradient</code> en cas de changement d&apos;état. C&apos;est le cas dans ce soulignement factice&nbsp;: <code>currentColor</code> utilisé dans le background n&apos;est pas mis à jour lors du survol ou de la prise de focus, sans être répété—&nbsp;ce qui ruine littéralement l&apos;intérêt de </code>currentColor</code>…</p>
<p><a href="https://bugs.chromium.org/p/chromium/issues/detail?id=595467">Le bug est ouvert chez Chromium</a>.</p>
<p><a href="https://twitter.com/iamvdo/status/822130026384592898">Vincent De Oliveira a cependant trouvé une astuce pour le faire fonctionner sans devoir répéter la propriété</a> et ça, c&apos;est cool.</p>
<p>En repassant donc sur le <a href="http://codepen.io/ffoodd/pen/jbRMqJ">CodePen</a> pour le mettre à jour, je me suis également rendu compte que la <em>media query</em> <code>-ms-high-contrast: active</code> était inutile&nbsp;; je l&apos;ai donc supprimée. Cette requête n&apos;est comprise que par IE 11 et inférieur —&nbsp;cependant comme elle était imbriquée dans une règle </code>@supports</code> ces derniers ne pouvaient pas la lire. Hop, un peu de code en moins&nbsp;!</p>
