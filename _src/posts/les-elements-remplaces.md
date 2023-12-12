---
title: "Les éléments remplacés"
date: "2015-11-16T19:16:54"
modified: "2015-11-30T10:34:36"
permalink: "les-elements-remplaces/index.html"
description: [""]
excerpt: "En travaillant sur [a11y.css](http://ffoodd.github.io/a11y.css/ "a11y.css sur Github (en anglais)"), les balises auto-fermantes et éléments remplacés [mʼont causé quelques tracas](https://github.com/ffoodd/a11y.css/blob/master/README-fr.md#cas-particuliers-et-probl%C3%A8mes-connus). Jʼen remets une couche aujourdʼhui avec un cas particulier au sein de ces cas particuliers : les **boutons**. [Lire la suite de « Les éléments remplacés » →](https://www.ffoodd.fr/les-elements-remplaces/)"
format: "standard"
alternate: [""]
---
Pourtant —&nbsp;et malgré le fait que **la plupart** des éléments remplacés soient des balises auto-fermantes&nbsp;— ça nʼest pas la même chose&nbsp;!

## Les mauvaises définitions

### La définition de Dudley Storey

La plus connue est celle proposée par Dudley Storey dans son article «&nbsp;[What’s A Replaced Element?](http://thenewcode.com/461/What-The-Heck-Is-A-Replaced-Element)&nbsp;» (traduit en Français sur [La Cascade](https://la-cascade.io/quest-ce-quun-element-remplace/)) que voici&nbsp;:

> Les éléments remplacés sont essentiellement des éléments qui ont des dimensions pré-déterminées, sans bénéficier de CSS. Une autre façon de comprendre les éléments remplacés est “&nbsp;ce sont les éléments dont le contenu est remplacé par une source extérieure&nbsp;”.

Il prend pour exemple lʼélément `input` qui, **même vide**, aura des dimensions intrinsèques —&nbsp;car le navigateur remplace lʼélément par un objet avec des dimensions par défaut pré-déterminées.

Cʼest très bien, mais ça nʼest pas tout à fait ça. En réalité **cette définition est orientée** vers la conclusion de lʼarticle, qui précise que les éléments remplacés ne peuvent pas se voir appliquer de contenu généré à lʼaide de pseudo-élément.

**Figurez-vous que cʼest parfois possible.** Il sʼagit dʼune simplification abusive.

### La référence de SitePoint

SitePoint propose [une définition un peu plus pointue (en anglais)](http://reference.sitepoint.com/css/replacedelements) indiquant quʼun élément remplacé est un élément dont lʼapparence et les dimensions sont définies par une ressource externe. Les détails sont assez intéressants (notamment le dernier paragraphe sur le contexte _inline_) mais là encore cʼest **en léger décalage avec la réalité**.

En revanche ce qui est amusant, cʼest que **la définition réelle est cachée dans le troisième paragraphe**&nbsp;: «&nbsp;Les éléments remplacés peuvent également avoir des pré-requis de mise en forme imposés par lʼélément, **hors du contrôle du CSS**&nbsp;; par exemple, les contrôles de lʼinterface utilisateur rendus pour les éléments de formulaires&nbsp;».

En fait ils ne se contentent pas de pouvoir.

## La spécification cachée

Soyons honnête, elle est vraiment galère à trouver. Le W3C précise [dans CSS2.1 (en anglais)](http://www.w3.org/TR/CSS21/conform.html#replaced-element) quʼun élément remplacé «&nbsp;est un élément dont le contenu est hors de la portée du modèle de mise en forme CSS&nbsp;». Si vous en avez le courage, [la spécification HTML5](http://www.w3.org/TR/html51/rendering.html#replaced-elements) est plus absconse mais rejoint globalement ce qui est dit précédemment.

**Simple, non&nbsp;?** Ça inclut effectivement les éléments qui ont des dimensions intrinsèques, même lorsquʼelles peuvent être surchargées _via_ CSS. [La liste dont je dispose est documentée sur a11y.css](https://github.com/ffoodd/a11y.css/blob/master/README-fr.md#cas-particuliers-et-problèmes-connus). Elle contient lʼensemble des balises auto-fermantes, ainsi que les éléments de formulaires et les objets multimédias.

## Le cas des boutons

Vous remarquerez que cette liste nʼinclut pas lʼélément `<button>`. Pour une bonne raison, à mon humble avis&nbsp;: cet élément nʼest pas un cas particulier dans la perspective de travail dʼa11y.css puisquʼ**il accepte les pseudos-éléments.**

Voilà qui discrédite poliment la définition de Dudley Storey. Cela fait cependant de `<button>` une exception parmi les cas particuliers…

Cependant [comme Nicolas Hoffmann me lʼa indiqué](https://twitter.com/Nico3333fr/status/666185952608567296), `<button>` est bel et bien un élément remplacé. Fidèlement à la spécification, il dispose en effet de styles pré-définis —&nbsp;un savant mélange entre la vision de votre navigateur et celle de votre système dʼexploitation.

## La singularité

Les éléments remplacés ont donc des dimensions intrinsèques, et ça inclut les boutons. Lorsque vous spécifiez une largeur sur un élément remplacé, **vous écrasez sa largeur intrinsèque**. Jusque là, tout va bien. Vous pouvez jouer avec une image, effectivement cʼest chouette.

Maintenant pour rigoler, prenez un `<button>` et affublez-le de ce CSS&nbsp;:

```css

button {
  display: inline;
  width: 20em;
}
```

Jʼavais tendance à penser que ce CSS ne produirait rien, puisquʼ**on ne peut pas définir de dimension sur un élément _inline_**. Sauf quʼun bouton a donc des dimensions intrinsèques quʼon peut surcharger —&nbsp;alors même que ces styles sont considérés comme hors de portée de CSS. La magie opère&nbsp;: **un bouton en ligne obéira à une définition de sa largeur**.

Vous pouvez jouer avec [ce dabblet](http://dabblet.com/gist/d94397d5d22a7cc9c1eb) pour vous en convaincre.

## Un réel problème&nbsp;?

Probablement pas. Mais je me suis malgré tout retrouvé dans une situation enquiquinante. Je souhaitais tout bêtement mettre en place un soulignement amélioré en CSS à lʼaide dʼun dégradé et dʼune ombre. Or ce soulignement doit évidemment suivre le texte, y compris si ledit texte passe à la ligne. Cʼest généralement aisé pour nʼimporte quel élément&nbsp;: on le met en `display: inline;` et le tour est joué. **Sauf que sur un bouton, ça ne fonctionne pas**.

Heureusement, [Vincent mʼa donné une solution qui fonctionne](https://twitter.com/htmlvv/status/666184830456078336). Tant pis pour le bouton, cʼest le `<span>` qui aura droit à un soulignement amélioré.  
**  
Mais bon sang, quelle aventure pour un bête bouton qui ne veut pas se mettre en ligne&nbsp;!**