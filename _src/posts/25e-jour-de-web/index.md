---
layout: "template/post.njk"
title: "25e jour de web"
date: "2024-11-18"
permalink: "25e-jour-de-web/index.html"
excerpt: "Pour la deuxième année consécutive, je me suis occupé au sein de l’association Paris Web de l’intégration graphique du thème annuel des 24 Jours de Web, le calendrier de l’avent des gens qui font le web d’après."
description: "Les 24 Jours de Web viennent de se terminer. Je vous raconte les péripéties de l’intégration du thème annuel&nbsp;?"
tags: ["posts"]
commentsOpen: "true"
---

C’est un exercice très intéressant, car nous avons deux contraintes très spécifiques pour le thème visuel annuel&nbsp;:

1. le format calendrier&nbsp;: 24 cases à ouvrir, une par jour… 
2. l’illustration, réalisée bénévolement après un appel sur nos différents réseaux sociaux —&nbsp;et généralement reçue moins de quinze jours avant l’ouverture du calendrier&nbsp;!

Et plus les contraintes sont exotiques, plus les solutions sont astucieuses&nbsp;!

C’était une très chouette expérience [en 2023](https://www.24joursdeweb.fr/2023), avec l’illustration de [Sophie Rocher](https://sophie-rocher.com/) qui m’a inspiré un calendrier tout en fenêtres et en lumières. Je me suis beaucoup amusé et vous invite à jeter un œil aux CSS.

Pour 2024, [Laure Février](https://laurefevrier.myportfolio.com/) nous a gratifiés d’une illustration riche en décorations&nbsp;: boules de Noël, couleurs, chats et lutins&nbsp;! Maintenant, à moi de jouer pour en extraire la substantifique moelle et réaliser une intégration cohérente qui tire parti et mette en valeur l’illustration de Laure.

## S’inspirer de l’illustration

    les blobs → https://codepen.io/LekovicMilos/pen/omVzYv

    les boules de Noël en CSS : 

    aspect-ratio: 1 et border-radius: 50% pour le cercle

    radial-gradient() et box-shadow pour la sphère

    conic-gradient() et mask-image pour le reflet

    et du color-mix() pour ajuster la couleur de la boule et de ses effets à une seule couleur en entrée :)


## Les animations

## Les boules en CSS

    D’abord avec offset-path et offset-distance : simple et logique, mais peu performant à cette échelle, même avec will-change. Lightouse était pas content, même si Firefox rendait ça à la perfection.

    https://github.com/Paris-Web/24jdw-kirby/pull/7/commits/c5e2101c439b818eec8e7bf268379c0bd0981624#diff-d15ce1134a5c1da4dd0e1abe1ec13ebd8598bb08da6bf732d33c87a3e0a96218R326-R347

    Donc reprise et re-calcul pour utiliser transform, avec de la rotation.  La clé résidant dans un transform-origin négatif (50% -300%) ! Une animation légère (de 3deg à -3deg) et un délai différent toutes les trois boules (sur une ligne de 4) rend le tout très organique.




Pour le header.svg
Embarqué via background-image en CSS !

    D'abord avec <animateTransform> : galère à comprendre, notamment que ça prend effet sur le parent et que le x des rotate (dans values) devait correspondre à celui du transform-origin

    https://github.com/Paris-Web/24jdw-kirby/pull/7/commits/c5e2101c439b818eec8e7bf268379c0bd0981624#diff-2a6713c990b3e052cee02368c43574c55d1689b91b68601b0fd96502b08afb67R1595-R1596

    https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform#rotate

    À cumuler avec la translation : additive="sum"


Quand tout à coup : prefers-reduced-motion. Pour désactiver les animations, impossible d’utiliser la méthode JavaScript svg.pauseAnimations() puisque le SVG est embarqué via CSS : il ngest pas dans le DOM.

L’astuce que j’ai trouvée est de définir un display: contents sur l’élément <g> animé : <animateTransform> perd sa cible et devient donc inerte.

Oui mais… Safari :) Ce dernier n’affiche plus du tout les groupes affublés d’un display: contents, que ce soit sur Epiphany ou Safari Technology Preview 209.
→ https://bugs.webkit.org/show_bug.cgi?id=284634

Re-changement de stratégie : on va utiliser des animations et transformations CSS dans le CSS dans le CSS !

La même animation que pour les boules est récupérée et adaptée (https://github.com/Paris-Web/24jdw-kirby/pull/7/commits/a5c1bd131d0f96682e7b046576967182dc51b90c#diff-2a6713c990b3e052cee02368c43574c55d1689b91b68601b0fd96502b08afb67R1585-R1589), en composant les transformations pour conserver le translate indispensable au bon placement des boules.

Mais là, surprise : les boules semblent suivre la même animation, comme si l’origine de la rotation était la même pour les 4 !

Après quelques recherches, j’ai découvert qu’il fallait indiquer transform-box: fill-box aux éléments dans un SVG pour que transform-origin ait un effet sur eux, sans quoi c’est en réalité la viewBox qu sert d’origine à toutes les transformations CSS au sein d’un SVG !

Et voilà !


++ Bouton pour stopper les animations : animation-play-state à paused
++ bug dans les devtools webkit / chromium : https://bugs.webkit.org/show_bug.cgi?id=283894 + https://issues.chromium.org/issues/381770607
++ rotate au lieu de transform: rotate pour les perfs (bof)
++ scinder le SVG en plusieurs parties, pour animer les groupes dans le CSS principal au lieu du CSS interne au SVG. (perf ++ sur Chromium, cf screenshot)

