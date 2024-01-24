---
layout: "template/post.njk"
title: "a11y.css, version deux"
date: "2015-03-02T19:45:32"
modified: "2021-03-05T17:11:08"
permalink: "a11y-css-version-deux/index.html"
excerpt: "Déjà deux ans depuis la première version d’a11y.css. Mon intérêt et mon investissement n’ont pas changé, mais le sujet a énormément avancé sous l’impulsion de [Xavier Zalawa](https://www.7studio.fr/), [Hugo Giraudel](https://hugogiraudel.com/), [Luc Poupard](https://www.kloh.ch/), [Heydon Pickering](https://www.heydonworks.com/), [Gaëtan Bonnot](https://gaetanbonnot.fr/), [Romain Gervois](https://twitter.com/goetsu), [Antoine](https://github.com/a5e) et [olamedia](https://github.com/olamedia). Cet apport de compétences variées a considérablement affûté cet outil. Voyons ça en détail !"
format: "standard"
tags: "posts"
description: "Ma volonté d’améliorer toujours plus mes pratiques et mes productions ne faiblissant pas, les itérations sur ce projet me tenant à cœur ont été productives. J’ai encore appris beaucoup, manipulé de nouveaux outils et fait de nouvelles rencontres."
---
Ainsi depuis la toute première mouture (en CSS) de cette feuille de style de diagnostic, beaucoup de choses ont changé. Voyons ça en détail&nbsp;🙂

## Corrections multiples

Comme vous pourrez le voir [sur Github](https://github.com/ffoodd/a11y.css/issues?q=is%3Aissue+is%3Aclosed), pas moins de 97 issues ont été résolues. Cela a été possible grâce aux retours de quelques personnes, que je tiens à citer et remercier à nouveau&nbsp;:

* [Kitty Giraudel](https://twitter.com/KittyGiraudel)&nbsp;;
* [Xavier Zalawa](https://twitter.com/7studio)&nbsp;;
* [Heydon Pickering](https://twitter.com/heydonworks)&nbsp;;
* [Luc Poupard](https://twitter.com/klohFR)&nbsp;;
* [Gaëtan Bonnot](https://twitter.com/GaetanBt)&nbsp;;
* [Antoine](https://github.com/a5e)&nbsp;;
* [Aurélien Levy](https://twitter.com/goetsu)&nbsp;;
* [Olamedia](https://github.com/olamedia)&nbsp;;
* [Bart Veneman](https://bveneman.nl/).

Entre les bugs et les découvertes diverses, la **qualité** et la **pertinence** d’a11y.css ont considérablement progressé.

### Compteurs CSS

Les compteurs sont au nombre des améliorations simples mais utiles —&nbsp;ces choses parfois qualifiées de _quick win_. Même si l’idée cheminait dans mon esprit depuis longtemps, c’est l’implémentation dans [le DebugCSS de Yahoo](https://yahoo.github.io/debugCSS/) qui a produit le déclic.

Les fonctions CSS de compteurs font partie des outils qui trouvent rarement un contexte d’utilisation pertinent. Pour une fois, c’est le cas&nbsp;!

## Personnalisation

Après la fastidieuse relecture [de mes différentes sources](https://github.com/ffoodd/a11y.css/blob/master/README-fr.md#r%C3%A9f%C3%A9rences-et-inspirations), ce qui n’était qu’un simple fichier CSS de diagnostic est devenu un **système complexe basé sur Sass** —&nbsp;dont le fichier de sortie final compressé pèse 80kb&nbsp;!

Il devenait indispensable de permettre aux utilisateurs le désirant de charger seulement les portions qui leur sont utiles. Avec l’aide de [Kitty Giraudel](https://kittygiraudel.com/), deux mécanismes ont été mis en place.

### Générateur de _bookmarklet_

Il était déjà possible aux utilisateurs de Sass de ne compiler que les niveaux de critères qui les intéressaient. Désormais, ces fichiers nivelés sont mis [à disposition dans le projet](https://github.com/ffoodd/a11y.css/tree/master/css).

Le _bookmarklet_ existait depuis quelques temps déjà, mais désormais un petit formulaire [sur le site de présentation](https://ffoodd.github.io/a11y.css/) permet de le paramétrer **en définissant le niveau minimum** nécessaire.

### Désactivation de tests

Pour que les utilisateurs de Sass aient toujours un intérêt à disposer du projet sur leur poste, mais aussi afin que les utilisateurs les plus avertis puissent personnaliser cet outil, Kitty a également [conçu une fonction](https://github.com/ffoodd/a11y.css/blob/master/README-fr.md#d%C3%A9sactiver-des-tests) pour désactiver les tests au cas par cas. Par exemple, si vous voulez désactiver les erreurs à propos des mauvais `tabindex` et du `href` manquant, voici comment faire&nbsp;:

```css

@include disable-errors("tab-order, no-href");
```

Et ça, c’est plutôt pratique 😀&nbsp;!

## Traduction

Pour celle-ci, je vais applaudir discrètement et vous renvoyer vers [l’article écrit par Kitty (en anglais)](https://kittygiraudel.com/2014/10/22/translation-system-in-sass/) qui détaille le fonctionnement de son **système de traduction en Sass**.

Oui, vous avez bien lu&nbsp;:désormais a11y.css est multilingue en demeurant écrit uniquement en Sass. Outre la portée accrue de façon incroyable suite au passage en anglais, l’exploit technique de Kitty est incroyable. J’en profite pour signaler la parution de son premier livre «&nbsp;CSS3&nbsp;: pratique du design web&nbsp;» [en vente aux éditions Eyrolles](https://www.eyrolles.com/Informatique/Livre/css3-9782212140231), que je vous recommande chaudement.[^1]

[^1]: Sans rire, le mec est un génie alors achetez son livre et lisez son blog.



## Documentation & test

Vous vous en doutez, le projet est devenu relativement complexe. Les solutions apportées par les différents contributeurs on tellement enrichi ce projet que même moi, je ne m’y retrouvais plus.

J’avais déjà mentionné lors de [mon atelier au WP Tech](https://www.ffoodd.fr/wp-tech-2014/ "WP Tech 2014") mon **intérêt pour la documentation**&nbsp;; c’est donc tout naturellement que j’ai cherché à documenter plus précisément a11y.css. Et de mon point de vue, il y a deux aspects très différents à documenter&nbsp;:

* le **contenu des tests**&nbsp;: pourquoi ces critères, comment ont-ils été défini, quel est leur intérêt.[^2]

[^2]: Je ne l’ai pas encore dit mais un des objectifs du projet est clairement devenu l’apprentissage et l’accès aux savoirs. Asséner un message sans l’expliquer me parait inutile, tout comme appliquer religieusement le contenu du message n’est pas pertinent.


* la **structure du projet Sass**, ou pour parler le technicien&nbsp;: l’API.

Premier chantier&nbsp;: trouver les outils adaptés&nbsp;!

### Hologram

Ayant démarré ce projet seul et n’ayant pas imaginé le partager, les recherches qui m’avaient permis d’aboutir à certains tests n’étaient pas suffisamment documentées. J’ai donc étoffé les références de chaque test en indiquant, autant que faire se peut&nbsp;:

* Les bonnes pratiques Opquast&nbsp;;
* Les critères et tests Accessiweb HTML5 et ARIA&nbsp;;
* Les succès WCAG 2.0&nbsp;;
* Les sources dans des projets équivalents.

Ces ressources étant réunies, je souhaitais mettre à l’épreuve cet outil en mettant en place une **page de démonstration** qui servirait aussi à suivre les éventuelles régressions. Et parce qu’il ne s’agit pas seulement de pouvoir tester, mais également d’**expliquer et de partager ces bonnes pratiques**, un court descriptif du test était nécessaire.

Pour résumer, je cherchais donc un outil capable&nbsp;:

1.  D’afficher la description et les liens associés au test&nbsp;;
2.  Un exemple de code HTML lisible ciblé par le test, et une version interprétée par le navigateur&nbsp;
3.  La capacité d’organiser les nombreux tests présents.

C’est là qu’intervient [Hologram](https://trulia.github.io/hologram/), une gem Ruby créée par Trulia. Elle m’a semblé parfaite puisqu’elle repose sur des commentaires CSS formatés pour générer la documentation. Son objectif premier est la création et la maintenance de guides de style, ce qui n’est pas si loin du sens premier d’a11y.css&nbsp;: **gérer et maintenir un ensemble de pratiques** à vérifier.

Hologram est incroyablement simple à manipuler, puisqu’une fois la gem installée il suffit de commenter son CSS de la façon suivante&nbsp;:

````css

/*doc
---
title: "[tabindex] > 0"
name: tab-order
category: Errors
---
The `[tabindex]` attribute should never be greater than 0.
* <https://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L337>
```html_example
<button tabindex="1">Positive tabindex is bad</button>
```
*/
````

La syntaxe est intelligible, et reste utile sans Hologram pour générer la documentation. Un point que j’apprécie&nbsp;! Pour générer la documentation, c’est très simple&nbsp;:

```css

hologram
```

**Et voilà&nbsp;!** Hologram génère un mini-site statique grâce à un jeu de ressources très simple. Il est ainsi possible de personnaliser l’entête, le pied-de-page et les ressources statiques pour aménager sa documentation à volonté. **Magique**&nbsp;🙂

Et puisque j’avais déjà créé une branche pour servir de présentation en ligne sur Github, j’ai ajouté ces nouveaux fichiers HTML afin d’en faire **un véritable site de démonstration**.

Jetez un œil au [site de démonstration d’a11y.css](https://ffoodd.github.io/a11y.css/)&nbsp;!

### SassDoc

Pour finir, l’architecture du projet s’étant alourdie d’options et de fonctionnalités, il fallait permettre aux utilisateurs de Sass de s’approprier plus facilement l’outil.

Par chance, la majorité de ces enrichissements étaient l’œuvre de Kitty Giraudel, qui s’avère aussi être le créateur de [SassDoc](https://sassdoc.com/). La personne a tendance à faire des trucs un peu fou en Sass, et cet outil de documentation correspond à la perfection aux besoins d’une API Sass.

Ni une ni deux, Kitty a mis en place SassDoc&nbsp;!

Et voilà un projet **complètement documenté**.

## Ce n’est pas fini&nbsp;!

Il reste quelques sujets à avancer&nbsp;:

* Mettre à niveau SassDoc pour utiliser la V2&nbsp;;
* Créer un thème SassDoc pour l’intégrer au site&nbsp;;
* Essayer d’ajouter une version française de cette documentation —&nbsp;ce qui semble complexe&nbsp;;
* Trouver une façon de cibler les éléments auto-fermants dans les tests génériques&nbsp;;
* Chercher de nouveaux tests à ajouter :D.

Et, bien sûr, maintenir tout ça dans le temps&nbsp;!

Je ne sais pas si ça se sent mais ce projet me passionne et je suis enchanté d’avoir pu **partager mes réflexions, mes pratiques et mes idées** avec toutes les personnes qui sont intervenues. J’ai énormément progressé grâce à ces échanges, et ma plus grande **fierté** est de voir a11y.css cité dans [la section _debug_ de la méthode Daisy](https://daisy.tetue.net/#debug), créé par une personne que j’admire&nbsp;: [Romy Duhem-Verdière](https://romy.tetue.net/).
