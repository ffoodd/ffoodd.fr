---
layout: "template/post.njk"
title: "Les nouveautés dʼIE4"
date: "2016-12-08T16:28:58"
modified: "2016-12-08T16:28:58"
permalink: "les-nouveautes-d%ca%bcie4/index.html"
excerpt: "L'industrie web est dans un état d'emballement général, qui voit son histoire s'effacer plus vite qu'elle ne s'écrit. Et si on remontait vingt ans en arrière, pour voir de quoi demain aurait pu être fait&nbsp;?"
format: "standard"
tags: "posts"
description: "En 1997, <abbr title=\"Internet Explorer\" lang=\"en\">IE</abbr>4 voit le jour et est la première version à dominer Netscape."
---
Elle apporte son lot de nouveautés à travers les filtres Microsoft, dont le plus connu concerne l’opacité. Pour rappel, la spécification finale de CSS1 ne voit le jour que le 17 décembre 1996.[^1]

[^1]: Le 17 décembre, c’est la Saint Gaël. Coïncidence ? Je ne crois pas.



## Les nouveautés graphiques

Parmi les nouveaux filtres Microsoft débarqués en 4.0, il est stupéfiant de voir à quel point ils ressemblent aux toutes dernières fonctionnalités spécifiées dans CSS et HTML&nbsp;:

* transformation&nbsp;;
* filtres graphiques&nbsp;;
* transition&nbsp;;
* dégradés&nbsp;;
* masques&nbsp;;
* ombres…

Oh, et `@font-face` est apparu dans IE4. Oui oui, en 1997. Vous vous souvenez de la révolution que c’est devenu en 2009, et le battage médiatique autour de CSS 3&nbsp;? Ils devaient bien se marrer chez Microsoft, quand ils nous ont vus nous exciter comme des molécules en chaleur **douze ans plus tard**.

Et si d’aventure ça vous gêne que ce fussent des filtres propriétaires Microsoft, je remets une couche de contexte —&nbsp;toujours pour ceux du fond, décidément&nbsp;: **CSS 1 n’existe officiellement que depuis quelques mois**. La définition des propriétés et de leurs valeurs n’en est qu’à ses balbutiements.[^2]

[^2]: Pour faire un parallèle avec l’histoire nord-américaine, l’époque succédant à la déclaration d’indépendance est le far-west, la ruée vers l’or, tout ça…



## Fonctionnalités hors-ligne

Pas de blague. Internet Explorer 4 est la première version à évoquer la gestion de **fonctionnalités hors-ligne**. Nous sommes évidemment très loin des applications web progressives actuellement tendance —&nbsp;les fameuses PWA, _bingo buzzword_&nbsp;— mais déjà en 1997, Microsoft en parlait&nbsp;:

* **mise en cache** des pages consultées afin d’améliorer l’expérience sans connexion&nbsp;;
* fonctionnalité d’archivage de site, permettant «&nbsp;tout simplement&nbsp;» d’**enregistrer une copie du site** sur votre ordinateur —&nbsp;et donc de le consulter sans connexion&nbsp;;
* un type de site appelé _active channel_ qui permettait de **synchroniser un site en ligne avec une version enregistrée localement**, hors ligne.[^3]

[^3]: J’admets avoir du mal à comprendre cette technologie, je ne l’ai jamais connue…



C’est rigolo comme les thèmes abordés dans les notes de version sont les mêmes en 1997 qu’en 2016, non&nbsp;?

## Transitions entre les pages

Ça, c’est vraiment l’apothéose.

Vous connaissez peut-être déjà [Jake Archibald](https://jakearchibald.com/)&nbsp;? Je l’apprécie notamment pour son travail sur l’optimisation des SVG, mais il a produit beaucoup de choses très utiles.

En octobre 2016, il a créé [un répertoire sur Github intitulé navigation-transition](https://github.com/jakearchibald/navigation-transitions/blob/master/README.md), dans lequel il explore la complexité d’effectuer des transitions entre les pages en respectant l’historique de navigation.

C’est chouette, il évoque **des pistes en CSS** lancées par Google en 2014 puis Mozilla en 2015, et sa propre exploration. Je suis sûr que ça en fait baver plus d’un&nbsp;!

Je vous présente [les transitions interpages](https://msdn.microsoft.com/en-us/library/ms532847(v=vs.85).aspx#Interpage_Transition) introduites par Microsoft dans Internet Explorer 4 en 1997. Concrètement, ce sont des filtres Microsoft utilisés dans des balises `meta`, comme suit&nbsp;:

```markup

<META http-equiv="Page-Enter" 
  CONTENT="progid:DXImageTransform.Microsoft.Blinds(
  Duration=4
  )" />
<META http-equiv="Page-Exit" 
  CONTENT="progid:DXImageTransform.Microsoft.Slide(
  Duration=2.500,
  slidestyle=’HIDE’
  )" />
```

C’est pas beau, ça&nbsp;?

## De retour du passé

Vous pensiez que le web de 1997 était révolu, et que tout ce que je viens de déterrer reste obsolète&nbsp;? Je vous présente mes deux trollons.[^4]

[^4]: Un trollon est un bébé troll, c’est bien connu.



* la propriété `filter` fait désormais partie de la spécification CSS, seules les valeurs Microsoft ne sont donc plus standards. Personnellement, ça me fait beaucoup rigoler&nbsp;;
* à l’époque, il était possible d’écrire des scripts dans CSS. Oui oui, chez Microsoft on faisait du JS dans du CSS.[^5]

[^5]: Nos fameux filtres, vous croyiez que ça fonctionnait comment ?



Alors pour paraphraser le Doc, je dirais seulement&nbsp;:

> Nom de d’IE, Marty&nbsp;!

## Vous êtes encore là&nbsp;?

Pour les survivants qui sont parvenus jusqu’au donjon, voici vos récompenses&nbsp;:

* [la page Wikipédia d’Internet Explorer 4 (en anglais)](https://en.wikipedia.org/wiki/Internet_Explorer_4)&nbsp;;
* [un site fabuleux pour découvrir IE4, en anglais](http://www.actden.com/ie4/) — qui n’est pas sans rappeler ce fameux trombone pot de colle dans les produits Microsoft du début des années 2000&nbsp;;
* [un historique d’Internet Explorer 1 à 6, en anglais](http://www.blooberry.com/indexdot/history/ie.htm) —&nbsp;comme ça, vous avez le choix dans les dates&nbsp;;
* [une page implémentant les transitions interpages](https://www.nicolas-hoffmann.net/tacamaca/).[^6]

[^6]: Un indice, il faut regarder le code source.



Voilà. Comme **je me suis beaucoup amusé** à rassembler toutes ces informations et à écrire cet article, je tiens à remercier [les vieux croûtons du web](https://www.paris-web.fr/2015/conferences/la-veille-techno-pour-les-vieux-croutons.php "Conférence intitulée « La veille techno pour les vieux croûtons » présentée par Thibault Jouannic à Paris Web le vendredi 02 octobre 2015") qui ont éclairé ma lanterne lors de mes recherches. Ils se reconnaîtront, et si vous les cherchez vous trouverez la liste de leurs _nicknames_ connectés au salon `##openweb` sur IRC.

Merci les copains.