---
title: "Calculez"
date: "2017-04-03T13:35:56"
modified: "2021-03-05T17:06:53"
permalink: "calculez/index.html"
excerpt: "Parce que ça m'horripile de croiser des largeurs de 33,33333&nbsp;% de nos jours. Vraiment. [Lire la suite de «&nbsp;Calculez&nbsp;» →](https://www.ffoodd.fr/calculez/)"
format: "standard"
---
Traditionnellement, quand on veut partager une largeur en trois portions égales, on écrit `width: 33.3333%;`. Alors oui, d'accord, à l'époque pré-industrielle nous n'avions pas vraiment le choix. Mais aujourd'hui&nbsp;?

## Les décimales arbitraires

Savez-vous ce qui pêche avec les décimales&nbsp;? Plusieurs choses, en fait —&nbsp;à commencer par le fait que vous définissez **arbitrairement** à quelle décimale vous vous arrêtez…

### La précision

Et bien oui, forcément&nbsp;: si vous faites `33.33333% × 3`, vous n'obtenez pas 100&nbsp;%. **Il vous manque 0.00001&nbsp;%**. Négligeable&nbsp;? Peut-être.

### Les arrondis et la troncature

Mais si je vous rappelle qu'IE **tronque systématiquement les valeurs à la deuxième décimale**, ça peut commencer à jouer un peu. En effet sur IE&nbsp;11 il vous manque donc `0.01 %` sur votre largeur totale.

Et si je vous rappelle que sur la même valeur, Chrome va **arrondir à la treizième décimale**&nbsp;? Plutôt compliqué à anticiper.

> Et alors&nbsp;?  
> OSEF&nbsp;!

Admettons. On ne vit qu'une fois, après tout…

C’est probablement anecdotique effectivement, puisque dans le pire des cas vous n'aurez qu'un pixel de plus ou de moins. Cependant si ce «&nbsp;détail&nbsp;» vous intrigue, il est plutôt bien détaillé dans cet article d'Alex Kilgour intitulé [Browser Rounding and Fractional Pixels](http://cruft.io/posts/percentage-calculations-in-ie/).

Personnellement, je me sens un peu sale en laissant traîner des valeurs arbitraires —&nbsp;comme je l'ai déjà évoqué quand je parlais de [calcul magique](https://www.ffoodd.fr/decouvrez-le-calcul-magique/).

## La fonction calc

Finis les tours de passe-passe&nbsp;: `calc()` vous permet d'écrire de manière concise et **précise** une valeur égale à un tiers.

```css

.⅓ {
  width: calc(100% / 3);
}
```

Et voilà[\[1\]](https://www.ffoodd.fr/calculez/#note-1 "Au fait, si dans le bout de code le .⅓ vous choque, sachez que ça fonctionne — Kitty Giraudel a même déterré une expérience de Mathias Bynens à ce propos : https://mothereff.in/css-escapes#0%E2%85%93 — et que ça me paraît un excellent nom de classe pour exprimer un tiers. Pas vous ?")&nbsp;! Vous avez désormais **une expression en CSS** qui exprime clairement ce que vous voulez&nbsp;: un tiers de la largeur disponible. Plutôt cool, non&nbsp;?

### Compatibilité

Et le top, c'est la compatibilité&nbsp;: **tout est au vert depuis IE&nbsp;9**. Voyez plutôt le tableau sur [Can I Use?](http://caniuse.com/#search=calc). Les seules tâches qui subsistent concernent des navigateurs pour téléphones, pour lesquels on peut raisonnablement supposer qu'un affichage d'un tiers de la largeur ne sera pas utile.

Alors, demeure-t-il une raison valable d'utiliser des valeurs décimales arbitraires, selon vous&nbsp;?