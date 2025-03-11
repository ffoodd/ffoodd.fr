---
layout: "template/post.njk"
title: "Masquage accessible de pointe"
date: "2025-03-11"
permalink: "masquage-accessible-de-pointe/index.html"
excerpt: "Depuis ma dernière partie de [cache-cache CSS](https://wwww.ffoodd.fr/cache-cache-css/), les choses ont changé&nbsp;— quelques cas tordus sont apparus."
description: "Depuis ma dernière partie de <a href='/cache-cache-css/'>cache-cache CSS</a>, les choses ont changé&nbsp;— quelques cas tordus sont apparus."
metadescription: "Depuis ma dernière partie de cache-cache CSS, les choses ont changé — quelques cas tordus sont apparus."
tags: ["posts"]
commentsOpen: "true"
---

La classe de masquage accessible `.visually-hidden` —&nbsp;anciennement `.sr-only` dans Bootstrap&nbsp;— a beaucoup évolué au fil du temps. C’est pour ça que j’ai publié [<cite>cache-cache CSS</cite>](/cache-cache-css/) il y a quelques années, qui récapitulait l’état de l’art à ce moment.

Mais il n’y a pas que les techniques CSS qui évoluent… Les navigateurs, aussi. Et parfois, ça requièrs de l’adaptation&nbsp;!

## Un cas légendaire

Louis-Maxime Piton —&nbsp;un des mainteneurs de [Boosted (en anglais)](https://boosted.orange.com/) et inévitablement contributeur à [Bootstrap (en anglais)](https://getbootstrap.com)&nbsp;— a [proposé un correctif (sur GitHub, en anglais)](https://github.com/twbs/bootstrap/pull/37533) il y a plus de deux ans pour contourner [un problème provoqué par le masquage accessible appliqué à une légende de tableau (sur StackOverflow, en anglais)](https://stackoverflow.com/questions/31057955/why-are-table-borders-not-collapsing-when-caption-is-positioned/32063028#32063028).

Les `caption`, lorsqu’ils sont en position absolue, sont considérés comme des cellules de tableaux anonymes&nbsp;— et ça met la grouille dans la fusion des bordures, l’indispensable `border-collapse: collapse`.

Le correctif proposé est simplissime, bien qu’il puisse théoriquement poser des problèmes&nbsp;: n’appliquer la position absolue que si l’élément n’est pas un `caption`. C’est l’état actuel [du <em lang="en">mixin</em> dans Bootstrap (sur GitHub, en anglais)](https://github.com/twbs/bootstrap/blob/53171ad564b2d01bff7613d7210e93a5197a367b/scss/mixins/_visually-hidden.scss).

En résumé, voici la modification&nbsp;:

```css
.visually-hidden:not(caption) {
	position: absolute !important;
}
```

## En cas de débordement

La semaine dernière, l’ami [Django Janny](https://www.djangojanny.net/) a relancé [le sujet sur Gist (en anglais) avec un cas marginal](https://gist.github.com/ffoodd/000b59f431e3e64e4ce1a24d5bb36034?permalink_comment_id=5468620#gistcomment-5468620)&nbsp;: un élément qui déborde, à l’intérieur d’un élément masqué visuellement.

En général, on ne masque qu’une portion de texte de cette façon&nbsp;: aucun élément bloc ne devrait s’y trouver&nbsp;— ni, en réalité, aucun enfant. La majorité du temps, le masquage accessible respecte implicitement les mêmes règles qu’un attribut `aria-label` par exemple&nbsp;: un texte simple et concis.

Mais c’est une règle implicite, et à ma connaissance aucune contre-indication n’a jamais été mentionnée quant à l’utilisation du masquage accessible sur une portion de DOM plus riche. Je l’ai par exemple fait lorsque j’ai amélioré les liens d’évitements sur [la documentation de Bootstrap (en anglais)](https://getbootstrap.com/docs/5.3/getting-started/introduction/), dont le conteneur est masqué visuellement —&nbsp;mais il apparaît à la prise de focus, nous faisant passer à côté du problème…

Depuis (au moins) 2019, les éléments en débordement deviennent focusables dans la plupart des navigateurs, pour palier un défaut d’accessibilité&nbsp;: ne pas pouvoir interagir avec un élément masqué par un débordement. [Cassey Lottman a retracé ce changement dans son article <cite lang="en">Elements with overflow: scroll become focusable</cite> (en anglais)](https://cassey.dev/til/2019-11-19-overflow-scroll-gets-focus/).

Ce qui, dans un élément masqué visuellement, devient un piège&nbsp;: on ne voit (évidemment) pas le focus.

La solution proposée par Django —&nbsp;et après quelques tests, la seule qui paraisse fonctionner&nbsp;— est d’[empêcher le débordement sur les enfants d’un élément masqué visuellement (sur CodePen, en anglais)](https://codepen.io/djangounet/pen/WbNpmMP?editors=1111)&nbsp;:

```css
.visually-hidden * {
	overflow: hidden !important;
}
```

## La totale

Voici donc la version mise à jour de la technique de masquage accessible&nbsp;:

```css
.visually-hidden {
	border: 0 !important;
	clip-path: inset(50%) !important;
	height: 1px !important;
	margin: -1px !important;
	overflow: hidden !important;
	padding: 0 !important;
	width: 1px !important;
	white-space: nowrap !important;
}

.visually-hidden:not(caption) {
	position: absolute !important;
}

.visually-hidden * {
	overflow: hidden !important;
}
```

J’en ai profité pour [proposer ce changement dans Bootstrap (sur GitHub, en anglais)](https://github.com/twbs/bootstrap/pull/41286) —&nbsp;en citant Django bien entendu&nbsp;— et pour mettre à jour [le Gist servant souvent de référence (en anglais)](https://gist.github.com/ffoodd/000b59f431e3e64e4ce1a24d5bb36034).

Notez par ailleurs quelques autres changements succincts&nbsp;:

1. J’ai renommé `.sr-only` en `.visually-hidden` pour me conformer aux usages des <em lang="en">frameworks</em> populaires,
2. Et nettoyé un peu le support de navigateurs anciens&nbsp;: plus de `clip` désormais, car [`clip-path` est très largement supporté](https://developer.mozilla.org/fr/docs/Web/CSS/clip-path).
3. La variante pour démasquer le contenu lors de la prise de focus n’est plus une remise à zéro, mais une autre classe conditionnée à l’état&nbsp;: `.visually-hidden-focusable:not(:focus):not(:focus-within)`, à l’instar de ce qui est fait [dans Bootstrap depuis cinq ans déjà (sur GitHub, en anglais)](https://github.com/twbs/bootstrap/pull/32440).



