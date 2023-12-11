---
title: "Un test Modernizr pour les contrastes élevés"
date: "2015-11-25T15:06:44"
modified: "2015-11-25T15:06:44"
permalink: "un-test-modernizr-pour-les-contrastes-eleves/index.html"
excerpt: "<p>Comme promis dans le précédent article «&nbsp;<a href="http://www.ffoodd.fr/le-soulignement-factice/">Le soulignement factice</a>&nbsp;», voici un portage sur Modernizr du test sur le mode contrastes élevés. J&#700;attends votre avis&nbsp;! <a href="https://www.ffoodd.fr/un-test-modernizr-pour-les-contrastes-eleves/" aria-hidden="true">Lire la suite de «&nbsp;Un test Modernizr pour les contrastes élevés&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Malheureusement, il ne répond pas correctement lorsque l&#700;utilisateur a personnalisé les couleurs des liens ou utilise un thème navigateur aux contrastes élevés —&nbsp;ce que j&#700;ai testé avec Firefox. En sus, et bien qu&#700;il soit conçu de façon à renvoyer un booléen, il se couple difficilement avec un outil spécialisé tel que <a href="https://modernizr.com/" hreflang="en">Modernizr</a>.</p>
<h2>Les changements</h2>
<p>On va faire simple, puisque vous avez l&#700;exemple de Karl Groves en amont&nbsp;! Les seules modifications apportées sont&nbsp;:</p>
<ul>
<li>un peu de nettoyage, principalement des variables inutiles&nbsp;;</li>
<li>l&#700;élément créé est un lien au lieu d&#700;une division&nbsp;;</li>
<li>la condition finale pour renvoyer le booléen a été allégée.</li>
</ul>
<h2>Le code</h2>
<p>Pas de miracle, l&#700;ajout de test dans Modernizr est <a href="https://modernizr.com/docs#modernizr-addtest" hreflang="en">bien documenté</a>. Voici ce que j&#700;ai réalisé —&nbsp;qui est probablement améliorable<sup aria-describedby="note-1" id="lien-1" data-note="Ceci est une invitation, toutes les aimables personnes qui apporteront leur aide auront droit à ma gratitude éternelle et plein de trucs dans ce goût-là."><a class="scroll print-hidden" href="https://www.ffoodd.fr/un-test-modernizr-pour-les-contrastes-eleves/#note-1" title="Ceci est une invitation, toutes les aimables personnes qui apporteront leur aide auront droit à ma gratitude éternelle et plein de trucs dans ce goût-là.">[1]</a></sup>&nbsp;— mais au moins, c&#700;est fonctionnel&nbsp;:</p>
<pre><code class="language-javascript"><br />
Modernizr.addTest(&quot;highcontrast&quot;, function() {<br />
  var objA = document.createElement(&quot;a&quot;),<br />
      strColor;<br />
  objA.style.color = &quot;rgb(31, 41, 59)&quot;;<br />
  document.documentElement.appendChild(objA);<br />
  strColor = document.defaultView ? document.defaultView.getComputedStyle(objA, null).color : objA.currentStyle.color;<br />
  strColor = strColor.replace(/ /g, &quot;&quot;);<br />
  document.documentElement.removeChild(objA);<br />
  return strColor !== &quot;rgb(31,41,59)&quot;;<br />
});<br />
</code>
</pre>
<p>Rien de bien méchant&nbsp;😊 J&#700;ai créé <a href="http://codepen.io/ffoodd/pen/RWmmOO" hreflang="en">un CodePen dédié uniquement à ce test</a> avec quelques commentaires et une illustration basique en <abbr lang="en" title="HyperText Markup Language">HTML</abbr>.</p>
<h2>La couverture</h2>
<p>Pour commencer, cette version est un test Modernizr. Nul besoin de télécharger tout la bibliothèque de tests cependant, sa seule et unique dépendance est la méthode <code>addTest()</code>, dont l&#700;outil de construction personnalisée de Modernizr indique qu&#700;elle pèse 2,53&nbsp;<abbr lang="en" title="KyloByte">kB</abbr> (et 1,08&nbsp;kB une fois compressé avec gzip).</p>
<p>Ensuite et pour le cas ou vous ne liriez pas couramment le JavaScript, le test procède ainsi&nbsp;:</p>
<ol>
<li>il crée un lien&nbsp;;</li>
<li>il attache ce dernier au document&nbsp;</li>
<li>il l&#700;affuble d&#700;une couleur <i>via</i> <abbr lang="en" title="Cascading StyleSheet">CSS</abbr>&nbsp;;</li>
<li>il récupère la valeur calculée pour la couleur du lien&nbsp;;</li>
<li>il supprime le lien créé au début&nbsp;;</li>
<li>et il renvoie finalement une affirmation qu&#700;on peut formuler ainsi&nbsp;: «&nbsp;la couleur calculée est-elle égale à la couleur définie par le test&nbsp;?&nbsp;».</li>
</ol>
<p>Le résultat est donc soit vrai, soit faux (c&#700;est le principe du <a href="https://fr.wikipedia.org/wiki/Bool%C3%A9en">booléen</a>). Donc pour résumer, ce test vérifie que la couleur calculée par le navigateur correspond à la couleur qu&#700;on lui demande&nbsp;: si ce n&#700;est pas le cas, l&#700;utilisateur interfère avec les styles envoyés d&#700;une manière ou d&#700;une autre. Les cas les plus courants sont <strong>le mode de contrastes élevés</strong> du système d&#700;exploitation, et <strong>les styles utilisateurs</strong> fournis par le navigateur sur demande de l&#700;utilisateur.</p>
<p>Ce test répond correctement dans deux cas précis identifiés&nbsp;:</p>
<ul>
<li>le mode de contrastes élevés de Windows, testé avec Edge et Firefox&nbsp;;</li>
<li>les paramètres de personnalisation de thème et couleurs dans Firefox, sur tous les systèmes.</li>
</ul>
<p>Il serait génial de tester plus avant d&#700;autres configurations, afin de préciser la couverture et de repérer d&#700;éventuels faux positifs ou négatifs. J&#700;ai créé <a href="https://gist.github.com/ffoodd/78f99204b5806e183574">un Gist</a> d&#700;après le CodePen précédemment lié —&nbsp;n&#700;hésitez pas à le forker, le commenter, le triturer comme bon vous semble&nbsp;!</p>
