---
title: "Vitesse &#038; Précipitation"
date: "2012-05-18T15:02:06"
modified: "2012-05-19T11:41:27"
permalink: "vitesse-precipitation/index.html"
excerpt: "<p>Les transitions représentent une formidable avancée en matière de CSS, dans le but de s&rsquo;affranchir du javascript pour les interactions simples. Je ne vais pas vous faire l&rsquo;offense de vous présenter les transitions CSS, mais avant d&rsquo;évoquer le sujet principal, j&rsquo;aimerais faire une piqûre de rappel sur les origines des transitions. Au commencement Dans une [&hellip;] <a href="https://www.ffoodd.fr/vitesse-precipitation/" aria-hidden="true">Lire la suite de «&nbsp;Vitesse &#038; Précipitation&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Les transitions représentent une formidable avancée en matière de CSS, dans le but de s&rsquo;affranchir du javascript pour les interactions simples. Je ne vais pas vous faire l&rsquo;offense de vous présenter les transitions CSS, mais avant d&rsquo;évoquer le sujet principal, j&rsquo;aimerais faire une piqûre de rappel sur les origines des transitions.</p>
<h2>Au commencement</h2>
<p>Dans une époque ( pas si ) reculée, javascript était indispensable dès lors qu&rsquo;on envisageait une interaction. Dan Cederholm s&rsquo;en souvient dans son livre « <a href="http://www.abookapart.com/products/css3-for-web-designers" target="_blank">CSS3 FOR WEBDESIGNERS</a> » disponible en Français <a href="http://www.eyrolles.com/Informatique/Livre/css3-pour-les-web-designers-9782212129878" target="_blank">aux éditions Eyrolles</a>.</p>
<blockquote><p>It was 1997 and I was sitting in a terribly run-down apartment in beautiful Allston, Massachusetts. A typical late night of viewing source and teaching myself HTML followed a day of packing CDs at a local record label for peanuts (hence the run-down apartment). I’m sure you can relate.</p>
<p>One triumphant night, I pumped my fist in sweet victory. I’d just successfully coded my first JavaScript image rollover. Remember those?</p>
<p>I still remember the amazement of seeing a crudely designed button graphic I’d cobbled together “swap” to a different one when hovered over by the mouse. I barely had a clue as to what I was doing at the time, but making something on the page successfully change, dynamically, was, well…magical.</p></blockquote>
<p>Le :hover a été une première bénédiction &#8211; malgré ses différends avec IE7 &#8211; et on a enfin pu se passer de javascript pour les roll-over. Les transitions constituent une nouvelle étape dans l&rsquo;évolution des interactions, mais comme toute avancée il faut d&rsquo;abord essuyer les plâtres.</p>
<h2>Sans transition, le problème :</h2>
<p>Si l&rsquo;utilisation des transitions est claire et limpide, leur présence au sein du CSS implique une nouvelle dimension : <strong>le temps</strong>. Hors vous n&rsquo;êtes pas sans savoir qu&rsquo;une page web, ça met du temps à se charger. Pas beaucoup certes, mais suffisamment pour que<strong> le chargement soit perceptible à l&rsquo;œil nu</strong>.</p>
<p>Hors comme le décrit Chris Coyier dans <a href="http://css-tricks.com/transitions-only-after-page-load/" target="_blank">son article</a>, lorsqu&rsquo;une page se charge elle se dessine progressivement. Certains éléments sont déplacés via CSS &#8211; à l&rsquo;aide de position, float ou margin pour ne citer qu&rsquo;eux. Concrètement, votre navigateur place d&rsquo;abord ces éléments dans le flux, puis les déplace à l&rsquo;endroit spécifié en CSS ; c&rsquo;est la que le bas blesse, puisque si ces éléments sont dotés de transition, <strong>on les voit se positionner</strong>.</p>
<p>Ces pauvres navigateurs n&rsquo;y peuvent rien. Il leur faudrait prioriser l&rsquo;application des CSS par couches : grille de positionnement, aspect visuel, puis dimension temporelle&#8230; Pas besoin d&rsquo;être expert pour comprendre la difficulté. Mais en l&rsquo;état, il y a <strong>confusion entre vitesse et précipitation</strong>.</p>
<h2>Temporisation</h2>
<p>L&rsquo;article « <a href="http://css-tricks.com/transitions-only-after-page-load/" target="_blank">Transitions only after page load</a> » sur Css-Tricks inclut la solution proposée par <strong>Chris Coyier</strong>, très simple : une classe preload annule les transitions, et lorsque la page est chargée on la retire via Jquery. C&rsquo;est extrêmement futé ! Mais elle implique de charger Jquery et ça, c&rsquo;est dommage.</p>
<p><strong>J&rsquo;ai donc entrepris d&rsquo;effectuer la même action, mais en javascript pur</strong>. Quelques interférences font varier le fonctionnement, comme par exemple l&rsquo;impossibilité ( à ma connaissance ) de cibler une valeur dans un attribut. Or mon attribut « class » m&rsquo;est utile : j&rsquo;ai donc préféré utiliser un id. La syntaxe javascript, insérée juste avant la fermeture du body, est la suivante :</p>
<pre><script type="text/javascript">// <![CDATA[
  function init() {
    "use strict";
    document.getElementById("preload").removeAttribute("id");
  }
  window.onload = init;
// ]]></script></pre>
<p>Et c&rsquo;est tout ! Pas besoin de librairie ou framework : juste 5 lignes à la fin du corps du document, et <strong>le tour est joué</strong>.</p>
<h2>Contrepartie</h2>
<p>J&rsquo;ai remarqué un <strong>problème de compatibilité avec IE8 et Safari</strong>, tandis que les autres navigateurs appliquent parfaitement ce code. Ce n&rsquo;est qu&rsquo;un demi-problème puisque de toute façon, IE8 ne comprend pas les transitions. C&rsquo;est un peu plus gênant pour Safari, mais je n&rsquo;ai pas encore trouvé l&rsquo;astuce : si quelqu&rsquo;un en connaît une ou en trouve une, je suis preneur !!</p>
