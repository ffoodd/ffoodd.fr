---
title: "Découvrez le calcul magique"
date: "2015-03-30T14:30:04"
modified: "2016-01-07T16:12:06"
permalink: "decouvrez-le-calcul-magique/index.html"
excerpt: "<p>Vous souvenez-vous de cette expression fort courante il y a quelques années, le fameux «&nbsp;nombre magique&nbsp;»&nbsp;? Cette pratique a tendance à disparaître depuis l’avènement du <i lang="en">responsive design</i> et le besoin de souplesse, que ne permettait pas un <code>height:&amp;nbsp;42px;</code>. Mais les nouvelles propriétés CSS et le support des navigateurs m’ont permis de rencontrer le niveau deux de ce sortilège&nbsp;: le <strong>calcul magique</strong>. Venez voir, c’est rigolo&nbsp;! <a href="https://www.ffoodd.fr/decouvrez-le-calcul-magique/" aria-hidden="true">Lire la suite de «&nbsp;Découvrez le calcul magique&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Et ça, c’était pas terrible. Non, vraiment pas. On cherchait frénétiquement à obtenir le même rendu sur tous les navigateurs et tous les écrans. Aujourd’hui, c’est drôle —&nbsp;à l’époque, c’était le nerf de la guerre.</p>
<h2>Les valeurs uniques</h2>
<p>Cette recherche de perfection était régulièrement entravée par plusieurs limitations techniques&nbsp;:</p>
<ul>
<li>les <strong>styles par défaut des navigateurs</strong> différaient, parfois beaucoup —&nbsp;ce problème a été résolu à coup de <i lang="en">reset</i> ou de <i lang="en">normalize</i>&nbsp;;</li>
<li>les unités relatives étaient parfois compliquées à manœuvrer, à cause d’<strong>inconsistances dans les valeurs calculées</strong> par les navigateurs (notamment la question des arrondis) mais ces derniers ont plutôt bien corrigé le tir, depuis&nbsp;;</li>
<li><strong>les unités différentes</strong>, difficiles à manipuler ensemble (<code>px</code>, <code>%</code>, <code>em</code>, etc.)&nbsp;;</li>
<li>l’<strong>incompréhension des modèles de boîte</strong>,  au moment ou tout le monde blâmait le mode <i lang="en">quirks</i> d’<abbr lang="en" title="Internet Explorer">IE</abbr> avant de l’adopter massivement sous sa forme <abbr lang="en" title="Cascading StyleSheet">CSS</abbr> (<code>box-sizing: border-box;</code>, pour ceux qui se posent la question).</li>
</ul>
<p>Pour l’intégrateur, ces différents tracas pouvaient être résolus de la même façon&nbsp;: des valeurs absolues en pixels, de préférence. Ainsi ajustions-nous nos largeurs, marges internes et marges externes <strong>au pixel près</strong>.</p>
<p>Désormais il est relativement rare d’en arriver à ces extrémités, grâce aux nombreux outils qui sont apparus ces dernières années. Il en est un en particulier qui aide bien, lorsque <code>box-sizing</code> ne suffit pas&nbsp;: la fonction <code>calc()</code>.</p>
<h2>La fonction calc() à la rescousse</h2>
<p>Pour faire simple —&nbsp;vous la connaissez sûrement déjà&nbsp;— elle permet de réaliser des calculs simples directement dans les styles, <strong>en mixant les unités</strong>.</p>
<p>Dans un écosystème rempli de nombres magiques et d’intégration <i lang="en">pixel perfect</i>, une reprise partielle du code peut s’avérer extrêmement fastidieuse. </p>
<p>En l’occurrence, c’était mon cas lors d’un <abbr lang="en" title="Proof of Concept">POC</abbr> l’an dernier. Je devais travailler un gabarit souple en surcouche d’une structure figée, <strong>sans accès au <abbr lang="en" title="Document Object Model">DOM</abbr></strong>.</p>
<p>Ce fut relativement simple à l’exception d’un point&nbsp;: il fallait un bloc image avec titre superposé, qui prenne les deux tiers de la largeur du site —&nbsp;largeur devenue relative, je le rappelle&nbsp;— en partant de la colonne centrale. Jusque là, ça va&nbsp;! Le point vraiment compliqué est que le bloc de la colonne de droite devait suffisamment se décaler en hauteur pour laisser la place à ce nouveau contenu, tout en respectant le ratio de l’image constituant ce nouvel élément —&nbsp;puisqu’elle sera souple également. Ah, et pour s’amuser un peu visuellement, il faudrait conserver un rappel visuel du colonage au-dessus du nouveau bloc&nbsp;!</p>
<p>Bien, utilisons une bordure en haut pour gérer le décalage&nbsp;!</p>
<p><strong>Ça commence à faire un certain nombre de calculs, vous ne trouvez pas&nbsp;?</strong></p>
<h2>La situation complexe</h2>
<p>Textuellement, ça n’est pas forcément évident. Voici une petite illustration, dans laquelle la zone blanche est le nouvel élément, et le bloc rouge est la bordure dont je devais ajuster la dimension&nbsp;:</p>
<p><figure class="wp-caption pa1 aligncenter" role="group" itemscope itemtype="http://schema.org/ImageObject"><img loading="lazy" decoding="async" id="attachment_1541" itemprop="contentURL" aria-describedby="wp-caption--attachment_1541" src="/images/2015/03/calc-300x209.png" alt="Représentation graphique des proportions entre les blocs" width="300" height="209" class="size-medium wp-image-1541" srcset="https://www.ffoodd.fr/wp-content/uploads/2015/03/calc-300x209.png 300w, https://www.ffoodd.fr/wp-content/uploads/2015/03/calc.png 1001w" sizes="(max-width: 300px) 100vw, 300px" /><figcaption class="wp-caption-text pt1 small" id="wp-caption--attachment_1541" itemprop="description">Représentation graphique des proportions entre les blocs</figcaption></figure></p>
<p>Finalement, je suis parvenu à simplifier le calcul en tournant autour du ratio de l’image utilisée (en blanc sur le schéma), soit <strong>431:950</strong>. Il s’agissait donc d’exprimer la hauteur de la bordure selon 3 valeurs&nbsp;:</p>
<ol>
<li>la proportion en largeur que représente ce nouveau bloc par rapport au <i lang="en">viewport</i>, soit <code>72%</code>&nbsp;;</li>
<li>le ratio de l’image utilisée, en l’occurrence <code>431/950</code>&nbsp;;</li>
<li>le décalage supplémentaire à ajouter au-dessus et en-dessous pour l’esthétisme, ici <code>4.8em</code>.</li>
</ol>
<h2>La magie opère</h2>
<p>Et voilà comment on aboutit à&nbsp;:</p>
<pre><code class="language-css">aside {<br />
  border-top-width: calc( 72vw * 431 / 950 + 4.8em);<br />
}</code></pre>
<p>Grâce à ce calcul, le décalage reste correct et proportionnel au reste de l’écran, et l’aspect graphique est homogène dans tous les contextes d’affichage.</p>
<h2>Les suppléments</h2>
<p>Depuis ce POC, j’ai découvert le travail de <a href="http://gasteroprod.com/">Nicolas Hoizey</a> sur <a href="https://github.com/nhoizey/esviji" hreflang="en">esviji V2</a>, qui utilise <a href="https://github.com/nhoizey/esviji/blob/master/src/sass/_screen.scss" hreflang="en">les ratios, les calculs et les unités de viewport</a> pour atteindre un degré d’adaptation aux écrans extraordinaire. Je vous conseille de garder un œil sur son projet, et surtout de parcourir <a href="https://gist.github.com/nhoizey/f31cf92114a376a23155" hreflang="en">la feuille de styles générée</a> qui est remarquablement écrite&nbsp;!</p>
