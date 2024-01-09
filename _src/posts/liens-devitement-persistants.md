---
layout: "template/post.njk"
title: "Liens d’évitement persistants"
date: "2013-10-16T15:56:40"
modified: "2013-11-13T12:09:49"
permalink: "liens-devitement-persistants/index.html"
excerpt: "Paris Web a été pour moi l’occasion de rencontrer des professionnels aguerris et d’en apercevoir les expériences cumulées. Et une conférence m’a particulièrement appris : _«Accessibiliser avec subtilité»_ de [Johan Ramon](https://twitter.com/johan_ramon 'Profil Twitter de Johan Ramon (nouvelle fenêtre)') de la [société Atalan](http://www.atalan.fr/ 'LE site de la société Atalan (nouvelle fenêtre)')."
format: "standard"
tags: "posts"
description: "<a href=\"http://www.johanramon.fr\" target=\"_blank\" title=\"Le site de Johan Ramon (nouvelle fenêtre)\">Johan Ramon</a> propose quelques techniques simples à mettre en oeuvre et améliorant significativement l'accessibilité d'un site - et il a eu la bonté de <a href=\"http://www.johanramon.fr/accessibiliser-subtilite/\" target=\"_blank\" title=\"Les slides de la conférence de Johan Ramon (nouvelle fenêtre)\">mettre ses slides à disposition</a> (et en <abbr title=\"HyperText Markup Language\" lang=\"en\">HTML</abbr> s'il-vous-plaît)."
---
Parmi ces techniques, certaines m’étaient inconnues : une ignorance qui ne nuisait pas directement à l’accessibilité mais bel et bien au confort d’utilisation du site pour les personnes concernées. Voici donc deux techniques que j’ai mises en place suite à cette lecture passionnante.

## Les liens similaires

Il devient rapidement ennuyeux de parcourir une liste de liens (avec un lecteur d’écrans **et/ou** en tabulant) lorsque plusieurs liens consécutifs ont la même destination. Malheureusement, c’est le cas très souvent sur WordPress dans les boucles d’articles.

Et bien voici une bonne nouvelle : il est très simple de corriger ça, de façon totalement transparente pour tout le monde :

* **tabindex à -1 :** pour la navigation au clavier, cet attribut permet de retirer un lien tabulable de l’index de tabulation. En l’appliquant judicieusement dans votre liste d’articles, vous ne laissez ainsi qu’un seul lien – et arrêtez de polluer la navigation au clavier.
* **aria-hidden à true :** cet attribut permet de taire un élément dans les lecteurs d’écrans. La logique est la même que précédemment, à ceci près qu’on prendra soin de laisser le lien dont la vocalisation sera la plus pertinente : dans le cas d’une boucle WordPress, le lien présent dans les titres est idéal.

En appliquant cette technique correctement, on divise par deux ou trois le nombre de liens à parcourir dans une liste d’articles. Vos utilisateurs vous remercieront 🙂 .

## Les liens d’évitement

Je ne reviendrais pas sur les bases de cette technique, qui est plus que documentée sur le web.[^1]

[^1]: Un article de Jean-Pierre Villain sur Alsacréations - il date de 2006 et est toujours (presque) d’actualités : http://www.alsacreations.com/tuto/lire/572-Les-liens-d-evitement.htm



* La persistance des liens d’évitement après leur première prise de focus
* La mise en avant visuelle de la zone ciblée par le lien d’évitement

Concernant le second point, je ne l’ai pas encore implémenté sur ffoodd.fr pour la seule raison que je dois trouver un signifiant visuel cohérent avec mon design, mais ça ne saurait tarder 🙂 .

Cependant la persistance des liens m’a particulièrement intéressé, car c’est un point que je trouve réellement bénéfique pour le confort d’utilisation. Même si je ne me sers de la tabulation que pour tester mes intégrations, il m’a toujours semblé désagréable de «&nbsp;perdre&nbsp;» ces liens.

## La persistance des liens d’évitement

En recherchant plus d’informations sur cette technique, je suis tombé sur le blog de la société Atalan pour laquelle travaille Johan – et sur [un article dédié au sujet](http://blog.atalan.fr/des-liens-devitement-astucieux/ "Article sur les liens d’évitement astucieux (nouvelle fenêtre)"). Des ressources très intéressantes sont données, cependant toutes sont basées sur jQuery pour ajouter une classe aux liens après leur première prise de focus. **Dommage, je n’utilise pas jQuery sur ffoodd.fr.**

Voici donc le bout de code correspondant, en vanilla javascript :

```javascript

/* Lien d’évitement > Persistance de l’affichage
 * @see : http://blog.atalan.fr/des-liens-devitement-astucieux/
*/
[].forEach.call(document.querySelectorAll(".skip"), function(el) {
  el.addEventListener("focus", function() {
  el.classList.add("show");
  });
});
```

Et voilà ! Pour faire simple, je cible les liens disposant de la classe «&nbsp;skip&nbsp;» pour leur ajouter la classe «&nbsp;show&nbsp;» au focus. Et le CSS fait le reste.

À noter que «&nbsp;dans certains cas rares&nbsp;» Chrome et IE ne transportent pas le focus sur la cible du lien d’évitement lorsqu’il a été activé. Un petit script vient facilement s’assurer que le focus est bien transporté :

```javascript

/* Correction du bug des ancres sous Chrome
 * @see : http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
 * @see : http://blog.atalan.fr/des-liens-devitement-astucieux/
*/
window.addEventListener("hashchange", function(event) {
  var element = document.getElementById(location.hash.substring(1));
  if (element) {
    if (!/^(?:a|select|input|button)$/i.test(element.tagName)) {
    element.tabIndex = -1;
    }
    element.focus();
  }
}, false);
```

## La qualité de l’expérience

Ce sont certes des détails, mais ces détails améliorent le confort de navigation et rendent un site agréable : l’internaute appréciera cette expérience, et reviendra (pour peu que vos contenus soient à la hauteur).