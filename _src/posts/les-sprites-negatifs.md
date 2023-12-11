---
title: "Les sprites en réserve"
date: "2012-06-21T10:48:38"
modified: "2013-12-16T10:58:14"
permalink: "les-sprites-negatifs/index.html"
excerpt: "<p>L&rsquo;utilisation des sprites est connue de &#8211; presque &#8211; tous. Et dans le cas ou vous feriez partie du presque, voici un très bon article en français sur le sujet. Ma réflexion aujourd&rsquo;hui ne portera donc pas sur l&rsquo;intérêt des sprites, mais sur une façon de pousser plus loin la quête du moindre octet. La [&hellip;] <a href="https://www.ffoodd.fr/les-sprites-negatifs/" aria-hidden="true">Lire la suite de «&nbsp;Les sprites en réserve&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>L&rsquo;utilisation des sprites est connue de &#8211; presque &#8211; tous. Et dans le cas ou vous feriez partie du presque, voici un <a href="http://www.alsacreations.com/tuto/lire/1068-sprites-css-background-position.html" target="_blank">très bon article</a> en français sur le sujet. Ma réflexion aujourd&rsquo;hui ne portera donc pas sur l&rsquo;intérêt des sprites, mais sur une façon de pousser plus loin <strong>la quête du moindre octet</strong>.</p>
<h2>La Genèse</h2>
<p>Ce jour-là, je me suis heurté au problème suivant : une vaste iconographie en aplat coloré, dont chaque élément disposait de trois variations colorées. Pour des questions de <strong>performances</strong>, il était nécessaire d&rsquo;utiliser un sprite ; et la ou ça se complique, c&rsquo;est qu&rsquo;il était également question d&rsquo;<strong>accessibilité</strong>.</p>
<p>Mon premier écueil : la <strong>performance</strong>. Afin d&rsquo;intégrer les variations colorées, mon premier sprite contenait trois fois chaque icône. Pas très efficace…</p>
<h2>Et la lumière fut</h2>
<p>C&rsquo;est alors que j&rsquo;ai réalisé : ces icônes étaient systématiquement sur un fond blanc. <strong>Eurêka.</strong></p>
<p>En précisant un peu mes recherches, je suis tombé sur “<a href="http://coding.smashingmagazine.com/2010/10/31/transparent-css-sprites/" target="_blank">Transparent CSS Sprites</a>” par Trevor Morris. L&rsquo;idée est simple : puisque la seule variation est la couleur de l&rsquo;icône elle-même, il suffit de créer ce sprite en réservant la forme des icônes, ou plus simplement : en négatif. Voila un exemple plus concret :</p>
<p><img loading="lazy" decoding="async" class="alignnone size-full wp-image-637" title="Alors, heureux ?" alt="Le-super-sprite-de-la-mort-qui-tue" src="/images/2012/06/sprite.png" width="529" height="63" /></p>
<p>Tout est alors plus simple. <strong>Survolez cette image</strong> afin de vous en rendre compte, et observez-la dans votre outil de dev ou dans un nouvel onglet. Il suffit d&rsquo;appliquer un <strong>background-color</strong> à cette image et de le changer au <strong>:hover</strong> afin d&rsquo;obtenir le même résultat qu&rsquo;un déplacement du sprite. Le code &#8211; allégé en matière grasse :</p>
<pre>img { 
   background: #269;
   transition: all .3s linear;
}
img:hover { 
   background: #045175;
}</pre>
<p>Cette solution présente de multiples avantages :</p>
<ul>
<li>une image en deux couleurs est <strong>plus légère</strong>. On peut l&rsquo;optimiser en png-8 et 2 couleurs, voire en .gif. ( Attention cependant aux transparences relatives ).</li>
<li><strong>la simplicité</strong> des interactions : background suffit. Une seule et même position pour chaque pictogramme !</li>
<li>chaque icône n&rsquo;est présente qu&rsquo;<strong>une seule fois</strong> !</li>
</ul>
<p><label for="performance">Performance </label> : <input id="performance" type="checkbox" checked="checked" /></p>
<p>Mon second écueil : l&rsquo;<strong>accessibilité</strong>.</p>
<h2>Qui dit sprite dit sprite</h2>
<p>Effectivement, il reste nécessaire de <strong>“recadrer”</strong> ce sprite. Usuellement, on le fait via css en appelant le sprite dans une background-image. Le hic : sans texte d&rsquo;accompagnement, ce n&rsquo;est vraiment, vraiment pas accessible. La seule solution : <strong>une balise &lt; img / &gt;</strong>.</p>
<p>On peut le faire de façon très simple : un parent conteneur aux dimensions fixes et un overflow hidden. Il ne reste plus qu&rsquo;à déplacer l&rsquo;image au sein de ce parent grâce à d&rsquo;une position relative :</p>
<div id="clip"><img loading="lazy" decoding="async" class="alignnone size-full wp-image-637" title="Le-super-sprite-de-la-mort-qui-tue" alt="Et voila !" src="/images/2012/06/sprite.png" width="529" height="63" /></div>
<p><strong>Rien de plus simple !</strong><br />
<label for="accessibilité">Accessibilité </label> : <input id="accessibilité" type="checkbox" checked="checked" /></p>
<p>Pour conclure, la solution qui émerge est :</p>
<ul>
<li>utiliser un parent conteneur auquel on confère des dimensions et un overflow:hidden</li>
<li>appeler le sprite dans une balise &lt; img / &gt;, au sein de ce conteneur</li>
<li>lui attribuer une classe pour définir l&rsquo;icône précise &#8211; à laquelle correspondra une position.</li>
</ul>
<p>Cette technique repose sur certains pré-requis :</p>
<ol>
<li>des pictogrammes en aplats ou en dégradés &#8211; gérables avec background-color et background-image ;</li>
<li>un contexte visuel uniforme &#8211; ce superbe bleu uni dans mon exemple ;</li>
<li>la possibilité d&rsquo;ajouter un conteneur pour gérer l&rsquo;overflow et le positionnement relatif.</li>
</ol>
<p>À titre personnel, je n&rsquo;ai utilisé cette technique que sur un projet, particulièrement contraignant en terme de performances et d&rsquo;accessibilité &#8211; mais je compte l&rsquo;étendre à d&rsquo;autres projets. Correctement utilisée, elle peut permettre une <strong>optimisation massive d&rsquo;une iconographie riche</strong> &#8211; mais simple.</p>
