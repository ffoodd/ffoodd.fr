---
title: "Les éléments remplacés"
date: "2015-11-16T19:16:54"
modified: "2015-11-30T10:34:36"
permalink: "les-elements-remplaces/index.html"
excerpt: "<p>En travaillant sur <a href="http://ffoodd.github.io/a11y.css/" title="a11y.css sur Github (en anglais)">a11y.css</a>, les balises auto-fermantes et éléments remplacés <a href="https://github.com/ffoodd/a11y.css/blob/master/README-fr.md#cas-particuliers-et-probl%C3%A8mes-connus">m&#700;ont causé quelques tracas</a>. J&#700;en remets une couche aujourd&#700;hui avec un cas particulier au sein de ces cas particuliers&nbsp;: les <strong>boutons</strong>. <a href="https://www.ffoodd.fr/les-elements-remplaces/" aria-hidden="true">Lire la suite de «&nbsp;Les éléments remplacés&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Pourtant —&nbsp;et malgré le fait que <strong>la plupart</strong> des éléments remplacés soient des balises auto-fermantes&nbsp;— ça n&#700;est pas la même chose&nbsp;!</p>
<h2>Les mauvaises définitions</h2>
<h3>La définition de Dudley Storey</h3>
<p>La plus connue est celle proposée par Dudley Storey dans son article «&nbsp;<a href="http://thenewcode.com/461/What-The-Heck-Is-A-Replaced-Element" lang="en">What&rsquo;s A Replaced Element?</a>&nbsp;» (traduit en Français sur <a href="https://la-cascade.io/quest-ce-quun-element-remplace/">La Cascade</a>) que voici&nbsp;:</p>
<blockquote><p>Les éléments remplacés sont essentiellement des éléments qui ont des dimensions pré-déterminées, sans bénéficier de <abbr lang="en" title="Cascading StyleSheet">CSS</abbr>. Une autre façon de comprendre les éléments remplacés est “&nbsp;ce sont les éléments dont le contenu est remplacé par une source extérieure&nbsp;”.</p></blockquote>
<p>Il prend pour exemple l&#700;élément <code>input</code> qui, <strong>même vide</strong>, aura des dimensions intrinsèques —&nbsp;car le navigateur remplace l&#700;élément par un objet avec des dimensions par défaut pré-déterminées.</p>
<p>C&#700;est très bien, mais ça n&#700;est pas tout à fait ça. En réalité <strong>cette définition est orientée</strong> vers la conclusion de l&#700;article, qui précise que les éléments remplacés ne peuvent pas se voir appliquer de contenu généré à l&#700;aide de pseudo-élément.</p>
<p><strong>Figurez-vous que c&#700;est parfois possible.</strong> Il s&#700;agit d&#700;une simplification abusive.</p>
<h3>La référence de SitePoint</h3>
<p>SitePoint propose <a href="http://reference.sitepoint.com/css/replacedelements">une définition un peu plus pointue (en anglais)</a> indiquant qu&#700;un élément remplacé est un élément dont l&#700;apparence et les dimensions sont définies par une ressource externe. Les détails sont assez intéressants (notamment le dernier paragraphe sur le contexte <em lang="en">inline</em>) mais là encore c&#700;est <strong>en léger décalage avec la réalité</strong>.</p>
<p>En revanche ce qui est amusant, c&#700;est que <strong>la définition réelle est cachée dans le troisième paragraphe</strong>&nbsp;: «&nbsp;Les éléments remplacés peuvent également avoir des pré-requis de mise en forme imposés par l&#700;élément, <strong>hors du contrôle du CSS</strong>&nbsp;; par exemple, les contrôles de l&#700;interface utilisateur rendus pour les éléments de formulaires&nbsp;».</p>
<p>En fait ils ne se contentent pas de pouvoir.</p>
<h2>La spécification cachée</h2>
<p>Soyons honnête, elle est vraiment galère à trouver. Le <abbr lang="en" title="World Wide Web Consortium">W3C</abbr> précise <a href="http://www.w3.org/TR/CSS21/conform.html#replaced-element">dans CSS2.1 (en anglais)</a> qu&#700;un élément remplacé «&nbsp;est un élément dont le contenu est hors de la portée du modèle de mise en forme CSS&nbsp;». Si vous en avez le courage, <a href="http://www.w3.org/TR/html51/rendering.html#replaced-elements">la spécification <abbr lang="en" title="Hyper Text Markup Language">HTML</abbr>5</a> est plus absconse mais rejoint globalement ce qui est dit précédemment.</p>
<p><strong>Simple, non&nbsp;?</strong> Ça inclut effectivement les éléments qui ont des dimensions intrinsèques, même lorsqu&#700;elles peuvent être surchargées <em>via</em> CSS. <a href="https://github.com/ffoodd/a11y.css/blob/master/README-fr.md#cas-particuliers-et-problèmes-connus">La liste dont je dispose est documentée sur a11y.css</a>. Elle contient l&#700;ensemble des balises auto-fermantes, ainsi que les éléments de formulaires et les objets multimédias.</p>
<h2>Le cas des boutons</h2>
<p>Vous remarquerez que cette liste n&#700;inclut pas l&#700;élément <code>&lt;button&gt;</code>. Pour une bonne raison, à mon humble avis&nbsp;: cet élément n&#700;est pas un cas particulier dans la perspective de travail d&#700;a11y.css puisqu&#700;<strong>il accepte les pseudos-éléments.</strong></p>
<p>Voilà qui discrédite poliment la définition de Dudley Storey. Cela fait cependant de <code>&lt;button&gt;</code> une exception parmi les cas particuliers&hellip;</p>
<p>Cependant <a href="https://twitter.com/Nico3333fr/status/666185952608567296">comme Nicolas Hoffmann me l&#700;a indiqué</a>, <code>&lt;button&gt;</code> est bel et bien un élément remplacé. Fidèlement à la spécification, il dispose en effet de styles pré-définis —&nbsp;un savant mélange entre la vision de votre navigateur et celle de votre système d&#700;exploitation.</p>
<h2>La singularité</h2>
<p>Les éléments remplacés ont donc des dimensions intrinsèques, et ça inclut les boutons. Lorsque vous spécifiez une largeur sur un élément remplacé, <strong>vous écrasez sa largeur intrinsèque</strong>. Jusque là, tout va bien. Vous pouvez jouer avec une image, effectivement c&#700;est chouette.</p>
<p>Maintenant pour rigoler, prenez un <code>&lt;button&gt;</code> et affublez-le de ce CSS&nbsp;:</p>
<pre><code class="language-css"><br />
button {<br />
  display: inline;<br />
  width: 20em;<br />
}<br />
</code></pre>
<p>J&#700;avais tendance à penser que ce CSS ne produirait rien, puisqu&#700;<strong>on ne peut pas définir de dimension sur un élément <em lang="en">inline</em></strong>. Sauf qu&#700;un bouton a donc des dimensions intrinsèques qu&#700;on peut surcharger —&nbsp;alors même que ces styles sont considérés comme hors de portée de CSS. La magie opère&nbsp;: <strong>un bouton en ligne obéira à une définition de sa largeur</strong>.</p>
<p>Vous pouvez jouer avec <a href="http://dabblet.com/gist/d94397d5d22a7cc9c1eb">ce dabblet</a> pour vous en convaincre.</p>
<h2>Un réel problème&nbsp;?</h2>
<p>Probablement pas. Mais je me suis malgré tout retrouvé dans une situation enquiquinante. Je souhaitais tout bêtement mettre en place un soulignement amélioré en CSS à l&#700;aide d&#700;un dégradé et d&#700;une ombre. Or ce soulignement doit évidemment suivre le texte, y compris si ledit texte passe à la ligne. C&#700;est généralement aisé pour n&#700;importe quel élément&nbsp;: on le met en <code>display: inline;</code> et le tour est joué. <strong>Sauf que sur un bouton, ça ne fonctionne pas</strong>.</p>
<p>Heureusement, <a href="https://twitter.com/htmlvv/status/666184830456078336">Vincent m&#700;a donné une solution qui fonctionne</a>. Tant pis pour le bouton, c&#700;est le <code>&lt;span&gt;</code> qui aura droit à un soulignement amélioré.<br />
<strong><br />
Mais bon sang, quelle aventure pour un bête bouton qui ne veut pas se mettre en ligne&nbsp;!</strong></p>
