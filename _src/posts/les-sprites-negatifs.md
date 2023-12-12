---
title: "Les sprites en réserve"
date: "2012-06-21T10:48:38"
modified: "2013-12-16T10:58:14"
permalink: "les-sprites-negatifs/index.html"
description: [""]
excerpt: "L’utilisation des sprites est connue de – presque – tous. Et dans le cas ou vous feriez partie du presque, voici un très bon article en français sur le sujet. Ma réflexion aujourd’hui ne portera donc pas sur l’intérêt des sprites, mais sur une façon de pousser plus loin la quête du moindre octet. La \[…\] [Lire la suite de « Les sprites en réserve » →](https://www.ffoodd.fr/les-sprites-negatifs/)"
format: "standard"
alternate: [""]
---
L’utilisation des sprites est connue de – presque – tous. Et dans le cas ou vous feriez partie du presque, voici un [très bon article](http://www.alsacreations.com/tuto/lire/1068-sprites-css-background-position.html) en français sur le sujet. Ma réflexion aujourd’hui ne portera donc pas sur l’intérêt des sprites, mais sur une façon de pousser plus loin **la quête du moindre octet**.

## La Genèse

Ce jour-là, je me suis heurté au problème suivant : une vaste iconographie en aplat coloré, dont chaque élément disposait de trois variations colorées. Pour des questions de **performances**, il était nécessaire d’utiliser un sprite ; et la ou ça se complique, c’est qu’il était également question d’**accessibilité**.

Mon premier écueil : la **performance**. Afin d’intégrer les variations colorées, mon premier sprite contenait trois fois chaque icône. Pas très efficace…

## Et la lumière fut

C’est alors que j’ai réalisé : ces icônes étaient systématiquement sur un fond blanc. **Eurêka.**

En précisant un peu mes recherches, je suis tombé sur “[Transparent CSS Sprites](http://coding.smashingmagazine.com/2010/10/31/transparent-css-sprites/)” par Trevor Morris. L’idée est simple : puisque la seule variation est la couleur de l’icône elle-même, il suffit de créer ce sprite en réservant la forme des icônes, ou plus simplement : en négatif. Voila un exemple plus concret :

![Le-super-sprite-de-la-mort-qui-tue](/images/2012/06/sprite.png "Alors, heureux ?")

Tout est alors plus simple. **Survolez cette image** afin de vous en rendre compte, et observez-la dans votre outil de dev ou dans un nouvel onglet. Il suffit d’appliquer un **background-color** à cette image et de le changer au **:hover** afin d’obtenir le même résultat qu’un déplacement du sprite. Le code – allégé en matière grasse :

img { 
 background: #269;
 transition: all .3s linear;
}
img:hover { 
 background: #045175;
}

Cette solution présente de multiples avantages :

* une image en deux couleurs est **plus légère**. On peut l’optimiser en png-8 et 2 couleurs, voire en .gif. ( Attention cependant aux transparences relatives ).
* **la simplicité** des interactions : background suffit. Une seule et même position pour chaque pictogramme !
* chaque icône n’est présente qu’**une seule fois** !

Performance : 

Mon second écueil : l’**accessibilité**.

## Qui dit sprite dit sprite

Effectivement, il reste nécessaire de **“recadrer”** ce sprite. Usuellement, on le fait via css en appelant le sprite dans une background-image. Le hic : sans texte d’accompagnement, ce n’est vraiment, vraiment pas accessible. La seule solution : **une balise < img / >**.

On peut le faire de façon très simple : un parent conteneur aux dimensions fixes et un overflow hidden. Il ne reste plus qu’à déplacer l’image au sein de ce parent grâce à d’une position relative :

![Et voila !](/images/2012/06/sprite.png "Le-super-sprite-de-la-mort-qui-tue")

**Rien de plus simple !**  
Accessibilité : 

Pour conclure, la solution qui émerge est :

* utiliser un parent conteneur auquel on confère des dimensions et un overflow:hidden
* appeler le sprite dans une balise < img / >, au sein de ce conteneur
* lui attribuer une classe pour définir l’icône précise – à laquelle correspondra une position.

Cette technique repose sur certains pré-requis :

1.  des pictogrammes en aplats ou en dégradés – gérables avec background-color et background-image ;
2.  un contexte visuel uniforme – ce superbe bleu uni dans mon exemple ;
3.  la possibilité d’ajouter un conteneur pour gérer l’overflow et le positionnement relatif.

À titre personnel, je n’ai utilisé cette technique que sur un projet, particulièrement contraignant en terme de performances et d’accessibilité – mais je compte l’étendre à d’autres projets. Correctement utilisée, elle peut permettre une **optimisation massive d’une iconographie riche** – mais simple.