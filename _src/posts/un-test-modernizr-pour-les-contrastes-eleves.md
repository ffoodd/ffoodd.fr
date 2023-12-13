---
title: "Un test Modernizr pour les contrastes élevés"
date: "2015-11-25T15:06:44"
modified: "2015-11-25T15:06:44"
permalink: "un-test-modernizr-pour-les-contrastes-eleves/index.html"
excerpt: "Comme promis dans le précédent article «&nbsp;[Le soulignement factice](http://www.ffoodd.fr/le-soulignement-factice/)&nbsp;», voici un portage sur Modernizr du test sur le mode contrastes élevés. Jʼattends votre avis&nbsp;! [Lire la suite de «&nbsp;Un test Modernizr pour les contrastes élevés&nbsp;» →](https://www.ffoodd.fr/un-test-modernizr-pour-les-contrastes-eleves/)"
format: "standard"
---
Malheureusement, il ne répond pas correctement lorsque lʼutilisateur a personnalisé les couleurs des liens ou utilise un thème navigateur aux contrastes élevés —&nbsp;ce que jʼai testé avec Firefox. En sus, et bien quʼil soit conçu de façon à renvoyer un booléen, il se couple difficilement avec un outil spécialisé tel que [Modernizr](https://modernizr.com/).

## Les changements

On va faire simple, puisque vous avez lʼexemple de Karl Groves en amont&nbsp;! Les seules modifications apportées sont&nbsp;:

* un peu de nettoyage, principalement des variables inutiles&nbsp;;
* lʼélément créé est un lien au lieu dʼune division&nbsp;;
* la condition finale pour renvoyer le booléen a été allégée.

## Le code

Pas de miracle, lʼajout de test dans Modernizr est [bien documenté](https://modernizr.com/docs#modernizr-addtest). Voici ce que jʼai réalisé —&nbsp;qui est probablement améliorable[\[1\]](https://www.ffoodd.fr/un-test-modernizr-pour-les-contrastes-eleves/#note-1 "Ceci est une invitation, toutes les aimables personnes qui apporteront leur aide auront droit à ma gratitude éternelle et plein de trucs dans ce goût-là.")&nbsp;— mais au moins, cʼest fonctionnel&nbsp;:

```javascript

Modernizr.addTest("highcontrast", function() {
  var objA = document.createElement("a"),
  strColor;
  objA.style.color = "rgb(31, 41, 59)";
  document.documentElement.appendChild(objA);
  strColor = document.defaultView ? document.defaultView.getComputedStyle(objA, null).color : objA.currentStyle.color;
  strColor = strColor.replace(/ /g, "");
  document.documentElement.removeChild(objA);
  return strColor !== "rgb(31,41,59)";
});
```

Rien de bien méchant&nbsp;😊 Jʼai créé [un CodePen dédié uniquement à ce test](http://codepen.io/ffoodd/pen/RWmmOO) avec quelques commentaires et une illustration basique en HTML.

## La couverture

Pour commencer, cette version est un test Modernizr. Nul besoin de télécharger tout la bibliothèque de tests cependant, sa seule et unique dépendance est la méthode `addTest()`, dont lʼoutil de construction personnalisée de Modernizr indique quʼelle pèse 2,53&nbsp;kB (et 1,08&nbsp;kB une fois compressé avec gzip).

Ensuite et pour le cas ou vous ne liriez pas couramment le JavaScript, le test procède ainsi&nbsp;:

1.  il crée un lien&nbsp;;
2.  il attache ce dernier au document&nbsp;
3.  il lʼaffuble dʼune couleur _via_ CSS&nbsp;;
4.  il récupère la valeur calculée pour la couleur du lien&nbsp;;
5.  il supprime le lien créé au début&nbsp;;
6.  et il renvoie finalement une affirmation quʼon peut formuler ainsi&nbsp;: «&nbsp;la couleur calculée est-elle égale à la couleur définie par le test&nbsp;?&nbsp;».

Le résultat est donc soit vrai, soit faux (cʼest le principe du [booléen](https://fr.wikipedia.org/wiki/Bool%C3%A9en)). Donc pour résumer, ce test vérifie que la couleur calculée par le navigateur correspond à la couleur quʼon lui demande&nbsp;: si ce nʼest pas le cas, lʼutilisateur interfère avec les styles envoyés dʼune manière ou dʼune autre. Les cas les plus courants sont **le mode de contrastes élevés** du système dʼexploitation, et **les styles utilisateurs** fournis par le navigateur sur demande de lʼutilisateur.

Ce test répond correctement dans deux cas précis identifiés&nbsp;:

* le mode de contrastes élevés de Windows, testé avec Edge et Firefox&nbsp;;
* les paramètres de personnalisation de thème et couleurs dans Firefox, sur tous les systèmes.

Il serait génial de tester plus avant dʼautres configurations, afin de préciser la couverture et de repérer dʼéventuels faux positifs ou négatifs. Jʼai créé [un Gist](https://gist.github.com/ffoodd/78f99204b5806e183574) dʼaprès le CodePen précédemment lié —&nbsp;nʼhésitez pas à le forker, le commenter, le triturer comme bon vous semble&nbsp;!