---
title: "La schizophrénie sémantique"
date: "2012-05-11T17:19:25"
modified: "2013-10-18T09:56:22"
permalink: "la-schizophrenie-semantique-dun-logo/index.html"
excerpt: "<p>Comme beaucoup d&rsquo;intégrateurs, je me suis heurté à la schizophrénie sémantique du logo. Vous rêvez de l&rsquo;inclure dans un h1 plein de bon texte pour le SEO, mais m**d* ! Votre logo est une image. Que dois-je faire, Docteur ? De nombreux remèdes ont vu le jour pour combattre ce symptôme, à tel point que [&hellip;] <a href="https://www.ffoodd.fr/la-schizophrenie-semantique-dun-logo/" aria-hidden="true">Lire la suite de «&nbsp;La schizophrénie sémantique&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Comme beaucoup d&rsquo;intégrateurs, je me suis heurté à la <strong>schizophrénie sémantique</strong> du logo. Vous rêvez de l&rsquo;inclure dans un h1 plein de bon texte pour le SEO, mais m**d* ! Votre logo est une image.</p>
<h2>Que dois-je faire, Docteur ?</h2>
<p>De nombreux remèdes ont vu le jour pour combattre ce symptôme, à tel point que l&rsquo;excellent Chris Coyier en a érigé un <a href="http://css-tricks.com/examples/ImageReplacement/" target="_blank">mémorial</a>.<br />
De mon côté, j&rsquo;ai beaucoup apprécié l&rsquo;élégance et la légèreté de la <a href="http://nicolasgallagher.com/another-css-image-replacement-technique/" target="_blank">proposition</a> de Nicolas Gallagher, notamment utilisée dans le fameux <a href="http://html5boilerplate.com/" target="_blank">HTML5 Boilerplate</a>. Et c&rsquo;est cette option que j&rsquo;utilise et recommande.</p>
<h2>Mais ça démange encore !</h2>
<p>Il reste un symptôme gênant : l&rsquo;image elle-même. On se retrouve avec un fichier à charger &#8211; et donc une <strong>requête HTTP supplémentaire</strong> &#8211; et qui nécessitera de <strong>refaire</strong> l&rsquo;image en cas de modification. Ennuyeux. Mais deux techniques supplémentaires viennent à notre rescousse : <strong>@font-face</strong> et <strong>base64</strong>.</p>
<h2>@font-face</h2>
<p>Une astuce relativement simple a vu le jour récemment, qui permet d&rsquo;incorporer des images dans un seul fichier et pouvoir les styler via <abbr title="Cascading StyleSheet">CSS</abbr> : les icon-fonts. Cette technique est plébiscitée en ce moment, et j&rsquo;ai donc eu tout le loisir de me documenter :</p>
<ul>
<li><a href="http://css-tricks.com/examples/IconFont/" target="_blank">Icon Fonts are Awesome</a> de Chris Coyier</li>
<li><a href="http://trentwalton.com/2012/05/04/icon-fonts/" target="_blank">Icon Fonts</a> de Trent Walton</li>
<li><a href="http://24ways.org/2011/displaying-icons-with-fonts-and-data-attributes" target="_blank">Displaying Icons with Fonts and Data- Attributes</a> de John Hicks</li>
<li><a href="http://blog.goetter.fr/post/18017100624/icones-font-face-et-accessibilite" target="_blank">ICÔNES “@FONT-FACE” ET ACCESSIBILITÉ</a> par Raphaël Goetter</li>
</ul>
<p>Certains points sont abordés, notamment pourquoi le SVG ne suffit pas actuellement ( indice : IE8 ) mais aussi la question de l&rsquo;accessibilité. J&rsquo;ai d&rsquo;abord été attiré par l&rsquo;implémentation de Trent Walton de son logo. Mais dans une correction de son billet, Raphaël Goetter a ajouté une proposition de Keyamoon pour son outil <a href="http://keyamoon.com/icomoon/#toHome" target="_blank">IcoMoon</a>. Cette solution est particulièrement propre car il s&rsquo;agit simplement d&rsquo;ajouter <strong>un attribut</strong> à la balise visée. J&rsquo;adopte !</p>
<p>À noter cependant : pour inclure une image dans une typographie, il est nécessaire de disposer d&rsquo;un outil efficace &#8211; et ça n&rsquo;est pas si simple. Il existe un <a href="http://www.webdesignerdepot.com/2012/01/how-to-make-your-own-icon-webfont/" target="_blank">tutoriel intéressant</a> pour y parvenir, ou encore le site <a href="http://fontstruct.com/" target="_blank">Fontstruct</a> qui vous permet de dessiner directement vos caractères.<br />
<br />Je tiens à remercier <a href="http://damien-collot.com/" target="_blank">Damien Collot</a> pour l&rsquo;aide qu&rsquo;il m&rsquo;a apporté sur le sujet.</p>
<h2>Base64</h2>
<p>Au fil de mes pérégrinations, j&rsquo;ai un jour remarqué cette option sur le générateur de kits @font-face de <a href="http://www.fontsquirrel.com/" target="_blank">font-squirrel</a> : encoder en Base64. Quelques rapides recherches &#8211; et cet <a href="http://www.alsacreations.com/article/lire/1439-data-uri-schema.html" target="_blank">excellent article sur Alsacréations</a> &#8211; m&rsquo;ont appris qu&rsquo;encoder un petit fichier en Base64 permettait d&rsquo;économiser une requête HTTP : Eurêka !</p>
<h2>Résultat</h2>
<p>Ne cherchez plus, c&rsquo;est la technique que j&rsquo;ai utilisée sur le logo de ce site. En HTML cela donne simplement :</p>
<pre><code class="language-markup"><br />
&lt;h1&gt;<br />
  &lt;a data-icon=&quot;a&quot;&gt;Gaël Poupard&lt;/a&gt;<br />
&lt;/h1&gt;</code>
</pre>
<p>et en css :</p>
<pre><code class="language-css"><br />
@font-face {<br />
  font-family: &#039;logo&#039;;<br />
  src: url(&#039;font/logo.eot&#039;);<br />
  src: local(&#039;?&#039;), url(data:font/woff;charset=utf-8;base64,...;<br />
  font-weight: normal;<br />
  font-style: normal;<br />
}<br />
h1 a {<br />
  font: 0/0 a;<br />
  text-decoration: none;<br />
}<br />
h1 a:before {<br />
  content: attr(data-icon);<br />
  font: 200px/250px &#039;logo&#039;;<br />
  text-decoration: none;<br />
}</code>
</pre>
<p>Et c&rsquo;est tout ! Le résultat est particulièrement propre et simple. Il nécessite un travail préparatoire assez long, mais c&rsquo;est une mécanique intéressante à connaître. </p>
<h2>Conclusion</h2>
<p>Trois techniques relativement avancées permettent d&rsquo;obtenir cet excellent résultat. Le logo est : </p>
<ol>
<li>encodé en <strong>Base64</strong> : pas de requête HTTP</li>
<li>appelé via <strong>@font-face</strong> : maniable en CSS</li>
<li>inclus dans un <strong>h1</strong> : sémantiquement intéressant</li>
<li>dispose d&rsquo;un texte de remplacement <strong>pertinent</strong> : optimisé pour le référencement</li>
</ol>
<p>Le principal inconvénient est le <strong>support d&rsquo;IE8</strong> : il ne reconnaît que les fichiers .eot dans @font-face, ce qui nous force à ajouter un fichier .eot difficile à convertir en Base64. Mais si vous pouvez m&rsquo;y aider, je suis tout ouï !</p>
