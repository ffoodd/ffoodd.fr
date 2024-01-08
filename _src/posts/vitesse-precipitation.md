---
layout: "template/post.njk"
title: "Vitesse & Précipitation"
date: "2012-05-18T15:02:06"
modified: "2012-05-19T11:41:27"
permalink: "vitesse-precipitation/index.html"
excerpt: "Les transitions représentent une formidable avancée en matière de CSS, dans le but de s’affranchir du javascript pour les interactions simples. Je ne vais pas vous faire l’offense de vous présenter les transitions CSS, mais avant d’évoquer le sujet principal, j’aimerais faire une piqûre de rappel sur les origines des transitions. Au commencement Dans une […]"
format: "standard"
tags: "posts"
---
Les transitions représentent une formidable avancée en matière de CSS, dans le but de s’affranchir du javascript pour les interactions simples. Je ne vais pas vous faire l’offense de vous présenter les transitions CSS, mais avant d’évoquer le sujet principal, j’aimerais faire une piqûre de rappel sur les origines des transitions.

## Au commencement

Dans une époque ( pas si ) reculée, javascript était indispensable dès lors qu’on envisageait une interaction. Dan Cederholm s’en souvient dans son livre «&nbsp;[CSS3 FOR WEBDESIGNERS](http://www.abookapart.com/products/css3-for-web-designers)&nbsp;» disponible en Français [aux éditions Eyrolles](http://www.eyrolles.com/Informatique/Livre/css3-pour-les-web-designers-9782212129878).

> It was 1997 and I was sitting in a terribly run-down apartment in beautiful Allston, Massachusetts. A typical late night of viewing source and teaching myself HTML followed a day of packing CDs at a local record label for peanuts (hence the run-down apartment). I’m sure you can relate.
> 
> One triumphant night, I pumped my fist in sweet victory. I’d just successfully coded my first JavaScript image rollover. Remember those?
> 
> I still remember the amazement of seeing a crudely designed button graphic I’d cobbled together “swap” to a different one when hovered over by the mouse. I barely had a clue as to what I was doing at the time, but making something on the page successfully change, dynamically, was, well…magical.

Le :hover a été une première bénédiction – malgré ses différends avec IE7 – et on a enfin pu se passer de javascript pour les roll-over. Les transitions constituent une nouvelle étape dans l’évolution des interactions, mais comme toute avancée il faut d’abord essuyer les plâtres.

## Sans transition, le problème :

Si l’utilisation des transitions est claire et limpide, leur présence au sein du CSS implique une nouvelle dimension : **le temps**. Hors vous n’êtes pas sans savoir qu’une page web, ça met du temps à se charger. Pas beaucoup certes, mais suffisamment pour que **le chargement soit perceptible à l’œil nu**.

Hors comme le décrit Chris Coyier dans [son article](http://css-tricks.com/transitions-only-after-page-load/), lorsqu’une page se charge elle se dessine progressivement. Certains éléments sont déplacés via CSS – à l’aide de position, float ou margin pour ne citer qu’eux. Concrètement, votre navigateur place d’abord ces éléments dans le flux, puis les déplace à l’endroit spécifié en CSS ; c’est la que le bas blesse, puisque si ces éléments sont dotés de transition, **on les voit se positionner**.

Ces pauvres navigateurs n’y peuvent rien. Il leur faudrait prioriser l’application des CSS par couches : grille de positionnement, aspect visuel, puis dimension temporelle… Pas besoin d’être expert pour comprendre la difficulté. Mais en l’état, il y a **confusion entre vitesse et précipitation**.

## Temporisation

L’article «&nbsp;[Transitions only after page load](http://css-tricks.com/transitions-only-after-page-load/)&nbsp;» sur Css-Tricks inclut la solution proposée par&nbsp;**Chris Coyier**, très simple : une classe preload annule les transitions, et lorsque la page est chargée on la retire via Jquery. C’est extrêmement futé ! Mais elle implique de charger Jquery et ça, c’est dommage.

**J’ai donc entrepris d’effectuer la même action, mais en javascript pur**. Quelques interférences font varier le fonctionnement, comme par exemple l’impossibilité ( à ma connaissance ) de cibler une valeur dans un attribut. Or mon attribut «&nbsp;class&nbsp;» m’est utile : j’ai donc préféré utiliser un id. La syntaxe javascript, insérée juste avant la fermeture du body, est la suivante :

// <!\[CDATA\[
  function init() {
  "use strict";
  document.getElementById("preload").removeAttribute("id");
  }
  window.onload = init;
// \]\]>

Et c’est tout ! Pas besoin de librairie ou framework : juste 5 lignes à la fin du corps du document, et **le tour est joué**.

## Contrepartie

J’ai remarqué un **problème de compatibilité avec IE8 et Safari**, tandis que les autres navigateurs appliquent parfaitement ce code. Ce n’est qu’un demi-problème puisque de toute façon, IE8 ne comprend pas les transitions. C’est un peu plus gênant pour Safari, mais je n’ai pas encore trouvé l’astuce : si quelqu’un en connaît une ou en trouve une, je suis preneur !!