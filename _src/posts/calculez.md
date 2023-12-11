---
title: "Calculez"
date: "2017-04-03T13:35:56"
modified: "2021-03-05T17:06:53"
permalink: "calculez/index.html"
excerpt: "<p>Parce que ça m&apos;horripile de croiser des largeurs de 33,33333&nbsp;% de nos jours. Vraiment. <a href="https://www.ffoodd.fr/calculez/" aria-hidden="true">Lire la suite de «&nbsp;Calculez&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Traditionnellement, quand on veut partager une largeur en trois portions égales, on écrit <code>width: 33.3333%;</code>. Alors oui, d&apos;accord, à l&apos;époque pré-industrielle nous n&apos;avions pas vraiment le choix. Mais aujourd&apos;hui&nbsp;?</p>
<h2>Les décimales arbitraires</h2>
<p>Savez-vous ce qui pêche avec les décimales&nbsp;? Plusieurs choses, en fait —&nbsp;à commencer par le fait que vous définissez <strong>arbitrairement</strong> à quelle décimale vous vous arrêtez…</p>
<h3>La précision</h3>
<p>Et bien oui, forcément&nbsp;: si vous faites <code>33.33333% × 3</code>, vous n&apos;obtenez pas 100&nbsp;%. <strong>Il vous manque 0.00001&nbsp;%</strong>. Négligeable&nbsp;? Peut-être.</p>
<h3>Les arrondis et la troncature</h3>
<p>Mais si je vous rappelle qu&apos;<abbr title="Internet Explorer">IE</abbr> <strong>tronque systématiquement les valeurs à la deuxième décimale</strong>, ça peut commencer à jouer un peu. En effet sur IE&nbsp;11 il vous manque donc <code>0.01 %</code> sur votre largeur totale.</p>
<p>Et si je vous rappelle que sur la même valeur, Chrome va <strong>arrondir à la treizième décimale</strong>&nbsp;? Plutôt compliqué à anticiper.</p>
<blockquote><p>Et alors&nbsp;?<br /><abbr title="On s'en fout">OSEF</abbr>&nbsp;!</p></blockquote>
<p>Admettons. On ne vit qu&apos;une fois, après tout…</p>
<p>C&rsquo;est probablement anecdotique effectivement, puisque dans le pire des cas vous n&apos;aurez qu&apos;un pixel de plus ou de moins. Cependant si ce «&nbsp;détail&nbsp;» vous intrigue, il est plutôt bien détaillé dans cet article d&apos;Alex Kilgour intitulé <a href="http://cruft.io/posts/percentage-calculations-in-ie/">Browser Rounding and Fractional Pixels</a>.</p>
<p>Personnellement, je me sens un peu sale en laissant traîner des valeurs arbitraires —&nbsp;comme je l&apos;ai déjà évoqué quand je parlais de <a href="https://www.ffoodd.fr/decouvrez-le-calcul-magique/">calcul magique</a>.</p>
<h2>La fonction calc</h2>
<p>Finis les tours de passe-passe&nbsp;: <code>calc()</code> vous permet d&apos;écrire de manière concise et <strong>précise</strong> une valeur égale à un tiers.</p>
<pre class="language-css">
<code class="language-css"><br />
.⅓ {<br />
  width: calc(100% / 3);<br />
}<br />
</code></pre>
<p>Et voilà<sup aria-describedby="note-1" id="lien-1" data-note="Au fait, si dans le bout de code le .⅓ vous choque, sachez que ça fonctionne — Kitty Giraudel a même déterré une expérience de Mathias Bynens à ce propos : https://mothereff.in/css-escapes#0%E2%85%93 — et que ça me paraît un excellent nom de classe pour exprimer un tiers. Pas vous ?"><a class="scroll print-hidden" href="https://www.ffoodd.fr/calculez/#note-1" title="Au fait, si dans le bout de code le .⅓ vous choque, sachez que ça fonctionne — Kitty Giraudel a même déterré une expérience de Mathias Bynens à ce propos : https://mothereff.in/css-escapes#0%E2%85%93 — et que ça me paraît un excellent nom de classe pour exprimer un tiers. Pas vous ?">[1]</a></sup>&nbsp;! Vous avez désormais <strong>une expression en CSS</strong> qui exprime clairement ce que vous voulez&nbsp;: un tiers de la largeur disponible. Plutôt cool, non&nbsp;?</p>
<h3>Compatibilité</h3>
<p>Et le top, c&apos;est la compatibilité&nbsp;: <strong>tout est au vert depuis IE&nbsp;9</strong>. Voyez plutôt le tableau sur <a href="http://caniuse.com/#search=calc">Can I Use?</a>. Les seules tâches qui subsistent concernent des navigateurs pour téléphones, pour lesquels on peut raisonnablement supposer qu&apos;un affichage d&apos;un tiers de la largeur ne sera pas utile.</p>
<p>Alors, demeure-t-il une raison valable d&apos;utiliser des valeurs décimales arbitraires, selon vous&nbsp;?</p>
