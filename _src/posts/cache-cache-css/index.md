---
layout: "template/post.njk"
title: "Cache-cache CSS"
date: "2016-10-13T13:11:13"
modified: "2021-03-05T17:07:37"
permalink: "cache-cache-css/index.html"
excerpt: "Il existe une myriade de façon de masquer visuellement du texte en CSS tout en le maintenant accessible aux technologies d'assistance telles que les lecteurs d'écran. J'en agrège ici quelques-unes pour proposer une version que j'espère plus robuste."
format: "standard"
tags: "posts"
description: "Il m&apos;arrive souvent de devoir masquer visuellement du texte en le conservant accessible."
---
Et j’ai beau trouver ça idiot —&nbsp;masquer du texte pour certains utilisateurs et pas pour d’autres, ça me paraît incohérent avec l’accessibilité&nbsp;— c’est un besoin récurrent.

Il existe de nombreuses façons de faire, que je ne détaillerai pas ici. Depuis quelques années, lorsque je le peux, j’utilise celle de [Thierry Koblentz](https://twitter.com/thierrykoblentz) pour Yahoo! qui est décrite [sur le blog technique de Yahoo!](https://developer.yahoo.com/blogs/ydn/clip-hidden-content-better-accessibility-53456.html) [sur le blog de Thierry](https://cssmojo.com/hide-content-from-sighted-users/). C’est de loin la plus complète, et la seule à ma connaissance à supporter la direction de texte de droite à gauche.

Mais elle n’est pas exempte de problème, désormais.

## Propriété dépréciée

La «&nbsp;magie&nbsp;» de cette solution repose sur la propriété `clip`. Elle est simple à comprendre et très efficace. Seul bémol&nbsp;: `clip` est **déprécié par le module _[CSS masking](https://drafts.fxtf.org/css-masking-1/#clip-property)_** de niveau 1.

Pas de souci. La technique basée sur `clip` date un peu, il est normal qu’elle tombe en désuétude. La nouvelle spécification recommande l’utilisation de `clip-path` pour remplacer `clip`. Ce qui nous laisse pantois, puisque [le support de `clip-path` est encore tout à fait relatif](https://caniuse.com/#feat=css-clip-path). **Nous devons conserver `clip` et ajouter `clip-path` en guise d’amélioration progressive**.

Cependant la syntaxe est différente également. Après quelques recherches, [Yvain Liechti a proposé la version la plus courte pour obtenir le résultat attendu](https://twitter.com/ryuran78/status/778943389819604992)&nbsp;:

```css
clip-path: inset(50%);
```

Banco. Un problème résolu&nbsp;!

## Le texte ratatiné

[J. Renée Beach a signalé](https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe) que la propriété `width: 1px;` avait des effets négatifs sur le rendu du texte et par conséquent sa vocalisation par un lecteur d’écran.

La solution proposée est à la fois logique et simple&nbsp;: empêcher le texte de passer à la ligne et ainsi **garantir que les espaces entre les mots sont conservés**.

Une seule propriété suffit&nbsp;:

```css
white-space: nowrap;
```

Et voilà, second problème résolu.

## La totale

Voilà la version finale que je propose actuellement&nbsp;:

```css

.sr-only {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
}
```

### Avertissement

Normalement, vous ne devriez utiliser ceci **que pour du texte**. Autrement dit, il ne devrait jamais y avoir d’élément capable de recevoir le `:focus` dans un élément masqué de la sorte. Cela pourrait conduire à des comportements étonnants, puisque le navigateur cherchera à positionner le _scroll_ à l’endroit où est placé le `:focus`.

Cependant, si l’élément masqué peut lui-même recevoir le `:focus`, il nous faut pouvoir l’afficher de nouveau. **C’est généralement le cas pour les liens d’évitement**. Lisez [la technique G1 des WCAG](https://www.w3.org/TR/2013/NOTE-WCAG20-TECHS-20130905/G1) pour en savoir plus.

Pour ce genre de cas, [Bootstrap propose une classe supplémentaire](https://github.com/twbs/bootstrap/blob/v4-dev/scss/mixins/_screen-reader.scss) pour remettre à zéro nos valeurs de masquage.

C’est à mon avis la meilleure façon de faire —&nbsp;et étant donné les changements apportés sur la classe de masquage, cette seconde classe doit être revue elle aussi. Voici ma version&nbsp;:

```css

.sr-only-focusable:focus,
.sr-only-focusable:active {
  clip: auto !important;
  -webkit-clip-path: none !important;
    clip-path: none !important;
  height: auto !important;
  margin: auto !important;
  overflow: visible !important;
  width: auto !important;
  white-space: normal !important;
}
```

## Code et traduction

Vous pouvez retrouver ces classes à plusieurs endroits&nbsp;:

* [sur CodePen](https://codepen.io/ffoodd/pen/gwKZyq?editors=1100#)&nbsp;;
* [dans un Gist](https://gist.github.com/ffoodd/000b59f431e3e64e4ce1a24d5bb36034).

Qu’en dites-vous&nbsp;?

### Version anglaise

[Kitty Giraudel](https://twitter.com/KittyGiraudel) m’a fait l’honneur de [traduire cet article en anglais et le publier sur son blog](https://kittygiraudel.com/2016/10/13/css-hide-and-seek/). Merci&nbsp;!

## Modifications

### Les lecteurs d’écran sur mobile

19 octobre 2016

Ayant besoin de tests sur cette version pour vérifier qu’elle n’introduit pas de régressions, [Johan Ramon m’a remonté un bug étrange sur VoiceOver](https://twitter.com/johan_ramon/status/788372720224526336). En creusant un peu avec [Sylvain Pigeard](https://github.com/PigeardSylvain), il nous est apparu que `position: static` posait problème lors de la prise de focus d’un lien ayant la classe `.sr-only-focusable`.

Nous étions contents, lorsqu’en cherchant à avertir l’équipe de Bootstrap nous sommes tombés sur [un ticket ouvert récemment qui implique également TalkBack](https://github.com/twbs/bootstrap/issues/20732). [Patrick H. Lauke](https://twitter.com/patrick_h_lauke), en investiguant, a décelé de nombreuses incohérences dans la gestion du focus entre les diverses technologies d’assistance sur mobile. Il a ainsi ouvert des tickets un peu partout&nbsp;:

* [Narrator](https://microsoftaccessibility.uservoice.com/forums/307429-microsoft-accessibility-feedback/suggestions/16717318-focusable-elements-should-fire-focus-event-recei), le lecteur d’écran intégré à Windows 8, Windows 10 et Windows Phone&nbsp;;
* [TalkBack](https://bugs.chromium.org/p/chromium/issues/detail?id=657157), le lecteur d’écran intégré à Android, interfacé avec Chromium&nbsp;;
* [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1000082), qui tend à s’interfacer le mieux possible avec tous les lecteurs d’écran&nbsp;;
* [Webkit](https://bugs.webkit.org/show_bug.cgi?id=116046), le moteur de rendu de Safari&nbsp;;
* [Webkit](https://bugs.webkit.org/show_bug.cgi?id=163658), encore.

L’état des lieux est assez sombre&nbsp;: **les liens d’évitement ne marchent globalement pas sur les interfaces tactiles lorsqu’on utilise un lecteur d’écran**. Ô joie.

### Le référencement naturel

19 octobre 2016

[Steve Faulkner](https://twitter.com/stevefaulkner) —&nbsp;du [Paciello Group](https://www.paciellogroup.com/blog/)&nbsp;— a posé la question au forum de support pour _webmasters_ de Google&nbsp;: [les contextes supplémentaires pour utilisateurs malvoyants ont-ils un effet négatif sur le positionnement dans les résultats de recherche&nbsp;?](https://productforums.google.com/forum/#!msg/webmasters/YJcZUhtMIE4/XkOEzVakBAAJ)

Réponse courte&nbsp;: **non** Cependant étant donné que ce texte n’apparaît pas de prime abord il est considéré comme du contenu secondaire et a donc un très faible impact sur le positionnement, et c’est une excellente chose puisque cela dissuade d’en abuser.

### Les débordements inopinés

18 janvier 2019

De multiples problèmes de débordements ont été observés, notamment sur Chrome, lorsque les éléments masqués sont contenus dans un élément avec `overflow: auto;`. [Le problème est résolu dans Boosted](https://github.com/Orange-OpenSource/Orange-Boosted-Bootstrap/issues/84) en ajoutant `margin: -1px;`.
