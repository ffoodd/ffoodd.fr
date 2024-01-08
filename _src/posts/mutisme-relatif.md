---
layout: "template/post.njk"
title: "Mutisme relatif"
date: "2014-05-17T11:59:35"
modified: "2015-07-03T10:48:05"
permalink: "mutisme-relatif/index.html"
excerpt: "Restant muet depuis plusieurs semaines, il m’a semblé bon de faire un point sur le pourquoi du comment. Les changements opérés en quelques mois, les nouveautés à afficher ainsi que les projets en cours et à venir devraient me permettre de me projeter dans cette année qui s’annonce très riche !"
format: "standard"
tags: "posts"
---
Voici un&nbsp;résumé de&nbsp;mes activités des derniers mois, ainsi que de mes projets pour cette année. Je souhaite seulement signaler que cette baisse de régime dans mes publications n’est que temporaire.

## Les actualités

### Le plan professionnel

Le principal événement&nbsp;qui s’est produit&nbsp;est mon changement d’employeur&nbsp;: je travaille désormais chez Kosmos, toujours à Nantes. C’est un travail d’un tout autre genre que celui que j’effectuais pour l’[agence 1-ter-net](http://www.1-ter-net.com "(nouvelle fenêtre)")&nbsp;puisque Kosmos est un éditeur de progiciel. Pour être plus précis je vais travailler sur le _front-end_ de la solution K-d’école, afin d’en améliorer la qualité globale, l’accessibilité —&nbsp;et d’en faciliter la prise en main, la personnalisation et les évolutions futures.

J’apporte avec moi certaines compétences sur les aspects graphiques et ergonomiques qui participeront aussi à conserver un _front-end_ et un _look & feel_ homogènes pour&nbsp;renforcer l’identité de la solution.

### Le plan personnel

Après mon travail sur [La Nizanerie](http://www.lanizanerie.com) l’an passé —&nbsp;qui reste un projet vivant&nbsp;— j’ai aidé à mettre en ligne le site du [Petit Marché Nature](http://aupetitmarchenature.fr/)&nbsp;pour des amis. Ce fut plus un accompagnement qu’une création de site puisque nous nous sommes basés sur un thème Prestashop à peine revu.

J’ai également soutenu mon frère [Luc Poupard](http://www.kloh.ch)&nbsp;(a.k.a [KlohFR](https://twitter.com/klohFR)) à personnaliser mon thème [ffeeeedd](https://github.com/ffoodd/ffeeeedd) et à approfondir ses connaissances de WordPress, dans le cadre de son projet [Continuum(s)](http://continuums.ma3yt.com/)&nbsp;mené avec son ami plasticien&nbsp;[Olivier Vary](http://www.olivier-vary.com/)&nbsp;(a.k.a [Bendder](https://twitter.com/Bendder08)). C’est également un projet enrichissant puisque Luc a permis de faire évoluer mon thème, son fonctionnement et certaines extensions et ainsi gagner en qualité et en souplesse.

Ce qui m’amène aux projets personnels qui m’occupent, depuis longtemps et _a priori_ encore pour un bon moment.

## Les projets

### Les origines en 2013

Nous parlions du thème WordPress que j’ai développé depuis plus d’un an et demi maintenant&nbsp;: je continue, et je creuse toujours plus. Beaucoup de choses ont évoluées depuis [ma première annonce](https://www.ffoodd.fr/a-venir-ffeeeedd/ "À venir : ffeeeedd"), notamment sur un plan technique.

Je suis dans un premier temps passé aux thèmes enfants, dont le mécanisme est un réel bénéfice pour quiconque veut modifier un thème. Je m’étais conçu un processus de travail tout à fait personnel, en deux temps&nbsp;:

1.  [ffeeeedd–développement](https://github.com/ffoodd/ffeeeedd--developpement)&nbsp;devait me permettre d’étendre facilement le thème parent, en ajoutant gabarits, scripts et styles directement&nbsp;;
2.  [ffeeeedd–production](https://github.com/ffoodd/ffeeeedd--production)&nbsp;était la version optimisée pour la production&nbsp;: scripts et styles concaténés et minifiés à la main, sprites et images optimisés, etc.

Ce mécanisme a très bien fonctionné pendant plusieurs mois, durant lesquels il a été utilisé sur plusieurs projets. Au fil du temps j’ai tout de même atteint certaines limites, et mes recherches m’ont amené deux réflexions parallèles&nbsp;:

* certaines évolutions que j’ajoutais au thème enfant dépendait plutôt du «&nbsp;territoire des extensions&nbsp;» dans WordPress&nbsp;;
* mes procédures d’optimisation et de personnalisation des styles étaient lourdes et redondantes.

### ffeeeedd–extensions

Ce qui m’a naturellement conduit à développer une [flotille d’extensions](https://github.com/ffoodd/ffeeeedd--extensions) afin de déporter certaines fonctionnalités vers des extensions, et d’en créer de nouvelles qui n’alourdiront pas inutilement le thème.

### ffeeeedd–sass

Dans le même temps, j’ai complètement revu ma façon de travailler et me suis lentement mis à utiliser Sass, puis quelques portions de Compass. Je dis bien lentement puisque, [comme je l’ai fait remarquer dans un article](https://www.ffoodd.fr/sass-commencez-par-les-deux-s/ "Sass&thinsp;: commencez par les deux «&thinsp;S&thinsp;»") il y a quelques temps, j’ai tout fait pour éviter les pièges inhérents à ce type d’outils. Me faire gagner du temps, oui —&nbsp; mais sans perdre la qualité de mon travail.

J’abouti à [ffeeeedd–sass](https://github.com/ffoodd/ffeeeedd--sass), un thème enfant dont les styles s’appuient sur Sass, et ai utilisé PrePros pour homogénéiser facilement le traitement des scripts et des styles lors de leurs optimisations.

### ffeeeedd–racine

Et pour parachever ce travail, un répertoire [ffeeeedd–racine](https://github.com/ffoodd/ffeeeedd--racine) me permet de définir une configuration optimale de mon installation avec quelques légères modifications seulement.

### a11y.css

Évidemment le thème enfant basé sur Sass embarque une version à jour de mon [a11y.css](https://github.com/ffoodd/a11y.css) —&nbsp;qui est à mon sens ma plus belle réussite pour 2013. Ce projet a fédéré quelques personnes, m’a permis d’apprendre énormément de choses sur l’accessibilité en m’astreignant à lire plusieurs référentiels en entier, et j’ai fait de belles rencontres en en discutant.

Voilà ce qui m’a occupé la majeure partie de l’année 2013. Et le meilleur cas pratique que vous pourrez rencontrer pour l’ensemble de ce travail est le site que vous lisez actuellement.

Et il se pourrait que vous entendiez à nouveau parler de tout ça avant la fin 2014 🙂

## L’avenir

Honnêtement, je vais travailler. Beaucoup. Mon nouvel emploi va me demander beaucoup de temps, de lectures et de recherches pour mener ce travail de front !

Mais parmi les choses dont je suis sûr, c’est que je vais aller à Paris Web cette année encore mais aussi assister au tout frais [WPTech](https://twitter.com/WPTechNantes) qui va naître à Nantes fin 2014 —&nbsp;grâce à l’initiative de [Willy Bahuaud](http://www.wabeo.fr) et [Daniel Roch](http://www.seomix.fr).

Alors, on se voit quand pour discuter de tout ça ?