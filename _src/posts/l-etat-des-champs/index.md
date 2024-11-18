---
layout: "template/post.njk"
title: "L’état des champs"
date: "2017-12-21T14:09:15"
modified: "2022-12-22T16:55:46"
permalink: "l-etat-des-champs/index.html"
excerpt: "Les champs de formulaire ont toujours été une gageure en terme de styles, qu’on parle des listes déroulantes, des cases à cocher, des boutons radios… Il est désormais plus simple de les personnaliser, mais il demeure quelques écueils tel que l'état invalide d'un champ requis lors du chargement de la page. Oups."
tags: ["posts"]
description: "Un champ requis et vide est invalide, n&apos;est-ce pas&nbsp;?"
---
Mais en arrivant sur la page, ledit champ est vide —&nbsp;et par conséquent, invalide.

## Le souci

Lorsque vous appliquez des styles à un champ invalide (en utilisant la pseudo-classe `:invalid`), ils seront donc appliqués dès le chargement de la page si ce champ est également affublé de l’attribut `required`. Dommage&nbsp;!

C’est ce qui a conduit [Stéphane Deschamps](https://nota-bene.org/) à ouvrir [une issue sur le Github du W3C](https://github.com/w3c/html/issues/1073).

### L’état indéterminé

Quelques échanges plus tard, on évoque l’existence de l’état indéterminé pour les cases à cocher, boutons radios et barres de progression [dans la spécification HTML5](https://www.w3.org/TR/html5/disabled-elements.html#selector-indeterminate) qui pourrait porter le statu quo sur l’invalidité de notre champ. Cet état est facile à cibler en CSS à l’aide de la pseudo-classe `:indeterminate`.

### Le brouillon du module 4 des sélecteurs

Dans [le brouillon du module de niveau 4 des sélecteurs CSS](https://drafts.csswg.org/selectors-4/#user-pseudos), une nouvelle pseudo-classe tente de résoudre ce problème&nbsp;: `:user-invalid`. Vous noterez par ailleurs que le paragraphe descriptif n’est pas à jour puisqu’il évoque la première dénomination de ce nouveau sélecteur, à savoir `:user-error`.

Mais vous l’aurez compris, il s’agit d’un brouillon et ce nouveau sélecteur est très loin d’avoir été implémenté où que ce soit.

## Un contournement possible

Une idée m’est venue en lisant un article du calendrier de l’avent Digitpaint intitulé [Fantastic form pseudo selectors](https://advent2017.digitpaint.nl/2/), dans lequel le premier exemple implémente un label flottant non pas au `:focus` sur le champ, mais lors du début de saisie grâce à la pseudo-classe `:placeholder-shown`. Génie&nbsp;!

Cette pseudo-classe est active uniquement lorsque le `placeholder` est affiché, autrement dit tant qu’aucune saisie n’a été effectuée dans le champ. Et ça, ça ressemble beaucoup à une partie de l’énoncé de notre problème du jour. Nous pourrions donc faire en sorte de **distinguer un champ invalide vierge d’un champ invalide ayant été saisi**, avec les sélecteurs suivants&nbsp;:

```css

input:invalid {
  box-shadow: none;
}

input:invalid:not(:focus) {
  box-shadow: 0 0 0 2px red;
}

input:invalid:placeholder-shown {
  box-shadow: none;
}
```

Et bien a priori, ça fonctionne&nbsp;!  
Et bonne nouvelle, [`:placeholder-shown` est décemment supporté](https://caniuse.com/#feat=css-placeholder-shown). Je vous ai même fait [un petit CodePen pour jouer](https://codepen.io/ffoodd/pen/PEzoYO).[^1]

[^1]: Amusez-vous à commenter le second sélecteur pour voir le comportement ordinaire.



### Remarques post-publication

* **Note**&nbsp;: Merci à [Vincent](https://vincent-valentin.name/) qui me fait réfléchir, [dans une discussion sur Twitter](https://twitter.com/htmlvv/status/943832913937928192).
* **Note**&nbsp;: [Gaëtan me signale](https://twitter.com/GaetanBt/status/943842968754061312) que sur Chrome, le placeholder ne peut pas être vide pour que cette astuce fonctionne.
* **Note**&nbsp;: [Johan me signale](https://twitter.com/johan_ramon/status/943844529597272065) que le comportement observé de visu était également vocalisé par les lecteurs d’écran. Là, ça devient vraiment gênant&nbsp;!

### Pourquoi pas `:not()`

Peut-être supposez-vous (à juste titre) qu’au lieu d’utiliser deux sélecteurs différents, nous pourrions styler directement les champs invalides dont le `placeholder` n’est pas affiché, grâce à `input:invalid:not(:placeholder-shown)`.

Le fait est que le support de `:invalid` est [bien meilleur](https://caniuse.com/#search=%3Ainvalid) que celui de `:placeholder-shown`&nbsp;; de plus, vous n’êtes pas sans savoir que CSS est un langage tolérant à l’erreur. Quand un navigateur rencontre un sélecteur qu’il ne comprend pas, **il ignore l’ensemble du bloc de déclaration concerné** —&nbsp;et ce pour une bonne raison&nbsp;: être capable d’appliquer les styles suivants.

Ainsi les navigateurs ne comprenant pas `:placeholder-shown` (Internet Explorer et Edge au premier rang) n’appliqueraient pas nos styles dédiés aux champs invalides. Et ça, a priori, ce n’est pas ce qu’on veut&nbsp;! Alors en utilisant deux sélecteurs, le seul inconvénient est que **les navigateurs ne comprenant pas le second sélecteur conservent leur comportement actuel**.

Et ça, c’est mieux.

## Au final

Je ne pense pas que ce soit une bonne idée, je tiens à le préciser. Cette combinaison n’a pas vocation à être employée de la sorte, ce n’est qu’un détournement un peu tordu, il est vrai. Mais bon, j’aime les petits défis en CSS, ne m’en voulez pas&nbsp;!

### Un précédent

Après de petites recherches sur les internets, j’ai trouvé plusieurs références à cette combinaison de sélecteurs antérieures à cet article, toutes remontant finalement à [un article sur la validation des formulaires en CSS](https://css-tricks.com/form-validation-ux-html-css/) rédigé par [Chris Coyier](https://twitter.com/chriscoyier) en 2016.[^2]

[^2]: Pour la question du support et de la tolérance à l’erreur, Chris Coyier préfère évoquer @supports plutôt que d’accumuler les sélecteurs. Ça ne me paraît pas nécessaire dans le cas présent, mais à réfléchir !



Un véritable _CSS trick_&nbsp;!
