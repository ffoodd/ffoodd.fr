---
layout: "template/post.njk"
title: "Sémantique de l’interaction"
date: "2011-03-05T11:52:36"
modified: "2013-10-03T10:14:18"
permalink: "semantique-de-l-interaction/index.html"
excerpt: "Saviez-vous que le langage entre êtres humains dépend à 80% des expressions physiques – même infimes ? Il en va de même pour les sites internet. Un internaute ressent – et comprend – un site grâce à son comportement : mouvements, animations, changements de couleurs, etc.. Les sites ont des sentiments, eux aussi !"
format: "standard"
tags: "posts"
---
Saviez-vous que le langage entre êtres humains dépend à 80% des expressions physiques – même infimes ? **Il en va de même pour les sites internet.** Un internaute ressent – et comprend – un site grâce à son comportement : mouvements, animations, changements de couleurs, etc…

## Les sites ont des sentiments, eux aussi

Et ils s’expriment afin de vous les transmettre : un décalage léger au survol, un changement subtil de couleur et une sensation de souffle vous parvient. Le site respire, s’agite, réagit. Il peut être d’une douceur surprenante comme d’une agressivité détonante, et rien ne l’empêche d’être incohérent – voire complétement fou. Ces caractéristiques, qu’elles soient maîtrisées ou non, ont un impact sur l’utilisation du site : les sensations varient, et par conséquent le confort de navigation, l’impression donnée, l’affection éprouvée par l’internaute varient eux aussi.

Mais soyez prudents : cela peut rendre votre site extrêmement attractif ou définitivement désagréable. Là encore, le même mécanisme opère – que l’on parle d’êtres humains ou de site : **la première impression est déterminante**.

## Au-delà de la technique

Il vous incombe de penser à cet aspect du site. D’après une ligne directrice ( le plus souvent décidée dans un brief créatif ), vous devez pouvoir déterminer ce qu’exprimera le site. **Doit-il être sympathique, serein, énergique…?**

Vous disposez alors de tout un panel de techniques css afin d’aboutir au résultat escompté, en veillant à ne pas produire de contresens. Vous pouvez vous pencher sur les transitions, les transformations, les animations ou encore les changements de couleurs pour arriver à vos fins. Les plus utiles seront malgré tout les pseudo-classes :hover et :focus.

## Le :hover pour la suggestion

Prenons l’exemple d’un accordéon.

Il est de bon ton d’indiquer visuellement l’existence de l’accordéon par une flèche vers le bas, ou encore un «&nbsp;+&nbsp;». On ajoute en général au :hover un _curseur pointeur_, qui suggère l’interaction potentielle avec cet élément.

Ceci est le comportement classique : il induit pour l’internaute que s’il clique à cet endroit, quelque chose se passera. **Pourquoi ne pas pousser un peu plus loin cette suggestion ?**

+

Suspense !! Que va-t’il se passer si je clique ?

Dans cet exemple, on suggère effectivement l’interaction mais on dévoile également l’étape suivante. Dévoiler pour attirer l’action : il s’agit du **mécanisme de la séduction**.

## Le :focus pour la signalisation

L’intérêt majeur du :focus concerne les éléments de formulaires : il permet d’indiquer quel est le champ sélectionné ( à savoir : celui qui se remplira si on pianote sur son clavier, même debout ). C’est peut-être un détail pour vous, mais c’est un facteur déterminant lors de la saisie d’un formulaire. Et sémantiquement parlant, cela signifie que **le site est attentif à vous** et à ce que vous souhaitez.

Le comportement basique des navigateurs basés sur Webkit est d’appliquer une ombre portée lors du :focus. Il s’agit d’un minimum syndical – dont le seul but est la signalisation de l’état – et n’a aucune prétention de communication. Malheureusement une partie sémantique est comprise dans les css, dont le choix des intitulés des pseudo-classes. Focus signifie, dans la langue de Shakespeare, concentration, mise au point. Hors appliquer une ombre portée est l’exacte inverse : cela rend la forme diffuse.

Voila ce que donnerait le comportement inverse :

une ombre portée qui s’intensifie au :hover, et disparait au :focus. Saupoudrez-y un peu de transition, et ce champ qui réagit à votre passage semble réellement faire une mise au point lorsque vous le sélectionnez. L’ombre est aspirée de manière fluide, et ce champ grossier devient organique, vivant. **Il vous écoute**.

## Toujours plus loin

Au-delà de la métaphore du vivant, ces interactions basiques définissent la personnalité d’un site : il convient alors de maîtriser ces aspects afin d’améliorer l’expérience utilisateur en véhiculant des sentiments. C’est que je tente humblement de faire sur ce site, en amenant un peu de fraîcheur et de surprise sur chaque page.

Cette problématique me donne matière à réflexion tous les jours, mais par bonheur certains grands designers m’inspirent régulièrement. Voici deux articles et un livre qui m’ont particulièrement intéressé sur le sujet :

* [**Motion/Emotion** par David Desandro](https://desandro.github.com/motion-emotion/)
* [**INTERACTION** par Dave Rupert](https://daverupert.com/2011/07/interaction/)
* [**Designing for emotion** par Aaron Walter](https://www.abookapart.com/products/designing-for-emotion)
