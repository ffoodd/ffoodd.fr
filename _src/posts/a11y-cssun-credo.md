---
layout: "template/post.njk"
title: "a11y.css :&nbsp;un crédo"
date: "2013-12-04T16:43:09"
modified: "2015-07-03T10:49:03"
permalink: "a11y-cssun-credo/index.html"
excerpt: "Étant conscient de mes lacunes, je cherche constamment à améliorer la qualité des sites que je produis. Capitaliser sur les bonnes pratiques est une base, et c’est pourquoi j’ai «&nbsp;fabriqué&nbsp;» a11y.css."
format: "standard"
tags: "posts"
---
`a11y.css` .[^1]

[^1]: a11y est la contraction de «&thinsp;Accessibility&thinsp;» : un «&thinsp;a&thinsp;» suivi de 11 caractères, et conclu par un «&thinsp;y&thinsp;».



## Les références

### Les projets reposant sur CSS

Le premier projet de ce type que j’ai rencontré est [Holmes.css](http://red-root.com/sandbox/holmes/ "Présentation de Holmes.css, en anglais (nouvelle fenêtre)"). L’idée m’a rapidement séduit. Des projets similaires ont fleuri, dont&thinsp;:&nbsp;

* [Diagnostic.css](https://github.com/karlgroves/diagnostic.css "Diagnostic.css sur GitHub (nouvelle fenêtre)") par Karl Groves&thinsp;;
* [Debug-css](https://github.com/nternetinspired/debug-css "Debug-CSS sur GitHub (nouvelle fenêtre)") par Seth Warburton.

La découverte d’[OpQuast](http://opquast.com/fr/ "Le site OpQuast (nouvelle fenêtre)") et des [bonnes pratiques](http://checklists.opquast.com/fr/ "Les bonnes pratiques d’OpQuast (nouvelle fenêtre)") ayant accentué mon exigence, les outils précédemment cités m’ont semblé un peu légers.

### Les checklists

Définir des **«&thinsp;checklists qualités&thinsp;»** est également une bonne idée, et les exemples lus dans _«&thinsp;Intégration web, les bonnes pratiques&thinsp;»_ de [Corinne Schillinger](https://twitter.com/schillinger "Corine Schillinger sur Twitter (nouvelle fenêtre)") ou dans le projet [Outline](https://github.com/htmlzengarden/outline/blob/master/index.md "La checklist d’Outline sur GitHub (nouvelle fenêtre)") de [Vincent Valentin](https://twitter.com/htmlvv "Vincent Valentin sur Twitter (nouvelle fenêtre)") m’ont persuadé de tenter cette solution. Cependant, c’est plus contraignant que les solutions de repérage en CSS, et légèrement différent puisqu’une solution CSS ne permettra pas d’évaluer la pertinence des textes ou solutions techniques. Les checklists sont également rapidement contextuelles à un projet, puisque les objectifs et contraintes peuvent varier&thinsp;—&thinsp;je cherchais plutôt un outil générique.

### Les solutions en ligne

Les solutions automatisées en ligne sont également très utiles, mais ne permettent pas de faire un suivi au fil de l’eau. Je m’en sers lorsque je touche au but, à savoir en préambule à une recette complète. Voici une liste de ceux que j’affectionne particulièrement&thinsp;:&nbsp;

* [OpQuast Reporting](http://reporting.opquast.com/fr/ "Le site d’OpQuast Reporting (nouvelle fenêtre)")
* [Tanaguru](http://tanaguru.com/ "Le site de Tanaguru (nouvelle fenêtre)")
* [Le Validator](http://validator.w3.org/ "Le service de validation du W3C (nouvelle fenêtre)") du W3C

Mais à moins que vous ne soyez fan des allers-retours, ces services ne sont pas adaptés à une utilisation intensive.

## Une organisation lisible

J’ai donc travaillé sur ce fichier CSS pendant un moment, égrainant les règles à tester, les façons d’afficher le message, etc. [Mon récent apprentissage de Sass](https://www.ffoodd.fr/sass-commencez-par-les-deux-s/ "Sass&thinsp;: commencez par les deux «&thinsp;S&thinsp;»") m’a permis d’organiser beaucoup plus précisément ce fichier, en définissant quatre degrés de gravité&thinsp;:&nbsp;

* **Les erreurs**, dénoncées en rouge&thinsp;:&nbsp;principalement des attributs absents, vides ou très fortement déconseillés&thinsp;;
* **Les alertes**, signalées en jaune&thinsp;:&nbsp;notamment les éléments vides, les imbrications douteuses et les attributs sensibles&thinsp;;
* **Les éléments & attributs obsolètes**, marqués en gris et relevés d’après [la liste maintenue par le W3C](http://www.w3.org/TR/html5/obsolete.html#obsolete "Liste des éléments et attributs obsolètes en HTML sur le site du W3C (nouvelle fenêtre)")&thinsp;;
* **Les conseils**, mentionnés en vert. Il s’agit de simples suggestions d’utilisation de certains attributs, ou de bonnes pratiques méconnues.

L’organisation du projet est simple&thinsp;:&nbsp;la feuille de style «&thinsp;reine&thinsp;» contient un mixin, quelques explications et des placeholders pour chaque degré de gravité. Des fichiers partiels sont importés en deux groupes&thinsp;:&nbsp;un pour les sélecteurs — pour la maintenabilité, c’est bien plus lisible ainsi — et un pour les messages eux-mêmes.

## Une cible précise

Comme vous vous en doutez, cet outil n’est destiné qu’aux intégrateurs soucieux de la qualité de leur production. C’est pourquoi la compatibilité des sélecteurs et de l’affichage des messages ne prend pas en compte IE8 :D.

De plus, les messages sont affichés via un pseudo-élément `::after` — et vous le savez sûrement, mais [les contenus générés via des pseudos-éléments ne sont pas du contenu.](http://www.karlgroves.com/2013/08/26/css-generated-content-is-not-content/ "Article de Karl Groves sur le contenu généré en CSS (en anglais - nouvelle fenêtre)")

Et pour que ça ne me gratte pas trop la rétine, j’ai également ajouté un effet de transition pour l’apparition du message.

## La documentation

Reste une question à se poser&thinsp;:&nbsp;comment ai-je choisi les tests à effectuer, les formulations des messages et leur degré de gravité respectif ?

Pour faire simple, j’ai lu. Beaucoup. Les premières ressources ont été les projets similaires déjà cités, bien sûr. Puis je me suis inspiré des indications récurrentes obtenues sur Tanaguru ou OpQuast Reporting. La page du W3C listant les éléments obsolètes s’est imposée d’elle-même en tant que ressource complète pour un degré bien précis de vérification.

Et finalement, [le forum de discussion du référentiel AccessiWeb pour sa version 2.2](http://www.accessiweb.org/forumhtml5/index.php "(nouvelle fenêtre)") (&thinsp;sous-titré _«&thinsp;Mesure de la conformité WCAG 2.0 via le référentiel AccessiWeb 2.2 avec HTML5/ARIA&thinsp;»_&thinsp;) que m’avait précédemment indiqué [Johan Ramon](https://twitter.com/johan_ramon "Johan Ramon sur Twitter (nouvelle fenêtre)") m’a appris énormément.

Car oui&thinsp;:&nbsp;j’ai tout lu, tout détaillé. Pour chaque critère j’ai essayé d’en saisir le sens, les implications techniques et fonctionnelles, mais aussi ma capacité à les vérifier en CSS. C’est pourquoi les fichiers `.scss` sont plutôt bien documentés&thinsp;:&nbsp;chaque test indique, via un commentaire, le critère Accessiweb et/ou la bonne pratique OpQuast concerné(es).

Les tests susceptibles d’évoluer ou dont la vérification en CSS m’a semblé discutable ont été soit retirés, soit inclus aux conseils avec la mention utile concernant le contexte de rédaction du test en question.

## Une capitalisation indispensable

Voilà, vous savez tout. J’estime ce projet suffisamment mûr pour être soumis aux regards de tous, en espérant que ceux-là me permettront d’enrichir encore cet outil qui m’aide déjà beaucoup.

J’ai peu détaillé l’origine concrète de ce projet et **comment il est né d’un réel besoin**. Il faut savoir que dans mon travail, je ne maîtrise pas toujours l’environnement de la phase d’intégration. Lorsqu’un nouveau projet est lancé, il peut parfois m’être imposé un thème (&thinsp;sur WordPress&thinsp;) ou une solution (&thinsp;Prestashop, si tu nous regardes&thinsp;)&thinsp;;&nbsp;et lorsqu’il s’agit d’une maintenance ou d’une refonte partielle, je ne vous raconte pas ce que je déterre parfois…

C’est dans ce cadre qu’`a11y.css` prend tout son sens. Car si vous maîtrisez parfaitement la chaîne de production, il ne pourra vous servir que de pense-bête (&thinsp;car vous aurez déjà appliqué toutes les bonnes pratiques, n’est-ce pas ?&thinsp;), surtout si vous automatisez ce type de tâches grâce à [Grunt](http://gruntjs.com/ "Le site de Grunt, en anglais (nouvelle fenêtre)") ou d’autres outils du même acabit.

Alors, qu’en dites-vous ?