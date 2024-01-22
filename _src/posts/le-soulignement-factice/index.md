---
layout: "template/post.njk"
title: "Le soulignement factice"
date: "2015-11-20T15:16:37"
modified: "2017-01-20T11:20:39"
permalink: "le-soulignement-factice/index.html"
excerpt: "Malgré lʼarrivée des fonctionnalités _OpenType_ et [leur support plus que décent](http://caniuse.com/#feat=font-feature 'leur support plus que décent (en anglais)'), la typographie sur le web manque encore de raffinement si on compare ses possibilités dans le monde imprimé. Parmi les artefacts qui illustrent encore à ce jour la grossièreté de la **typographie sur le web**, le soulignement est le plus courant. Mais des techniques existent pour enrichir ce soulignement&nbsp;!"
format: "standard"
tags: "posts"
description: "Le soulignement standard sur le web est si laid que la plupart des sites le suppriment purement et simplement. Il est pourtant indispensable pour identifier ce qui différencie le texte de l&#700;imprimé&nbsp;: les hyperliens."
---
Je vous enjoins à lire la «&nbsp;[Signalétique des hyperliens](http://letrainde13h37.fr/43/signaletique-hyperliens/)&nbsp;» sur le train de 13&nbsp;h&nbsp;37, par [Romy Duhem-Verdière](https://twitter.com/tetue). On y apprend notamment que —&nbsp;typographiquement parlant&nbsp;— le souligné nʼest dʼaucune utilité, sauf éventuellement à palier lʼabsence dʼitalique (ce qui est somme toute assez rare). En revanche sur le web, cʼest **le meilleur moyen de signaler un lien**.

## Graphiquement grossier

Le souligné ordinaire est effectivement grossier&nbsp;: cʼest un reliquat des toutes premières typographies affichées sur un écran —&nbsp;que je nʼai pas eu la chance de croiser. Vous pouvez le constater avec cet exemple de souligné ordinaire.[^1]

[^1]: Percevez-vous comme ce soulignement est affordant&nbsp;? On a envie de cliquer dessus, pas vrai&nbsp;?



Sur le plan visuel, le souligné croise les jambages inférieures, ce qui crée un attroupement inopportun de pixels quʼon pourrait qualifier de «&nbsp;petits pâtés&nbsp;».[^2]

[^2]: Terme technique issu dʼune longue histoire de la calligraphie à la plume (ou de lʼapprentissage de lʼécriture avec un stylo plume pour les plus jeunes dʼentre vous).



Quelques tentatives existaient déjà il y a fort longtemps, comme en témoigne [lʼarticle de Susan Robertson sur A List Apart](http://alistapart.com/article/customunderlines) qui utilisait `background-image` pour mettre un une image répétée en guise de soulignement. Ça peut sembler étrange —&nbsp;notamment quand vous aurez vu les exemples animés&nbsp;— mais en 2004, cʼétait parfaitement fabuleux.

## Le truchement CSS

On ne peut malheureusement pas **encore** intervenir sur la propriété `text-decoration: underline;` de façon satisfaisante. Ce sera en revanche le cas un jour avec `text-decoration-skip: ink;` qui est [à lʼétat de brouillon au W3C (en anglais)](https://drafts.csswg.org/css-text-decor-3/#text-decoration-skip-property). Il nʼexiste actuellement aucun support de cette propriété, cependant [celle-ci est émulée sur les engins Apple omme le mentionne Chris Coyier sur CSS-Tricks (en anglais)](https://css-tricks.com/almanac/properties/t/text-decoration-skip/). En attendant, vous allez voir que Susan Robertson était déjà sur la bonne piste il y a 10 ans.

Lʼastuce —&nbsp;_a priori_ trouvée par Marcin Wichary pour Medium et expliquée dans «&nbsp;[Crafting link underlines on Medium](https://medium.com/designing-medium/crafting-link-underlines-on-medium-7c03a9274f9#.hhqigq2dq)&nbsp;»&nbsp;— consiste à supprimer le `text-decoration` et le trucher à lʼaide dʼun dégradé pour la ligne, et dʼune ombre portée sur le texte pour «&nbsp;nettoyer les jambages&nbsp;». Comme Susan Robertson, nous allons nous servir de la propriété `background-image`, mais au lieu de charger un gif nous utiliserons la fonction `linear-gradient();`. Si vous nʼêtes pas encore familier avec les dégradés, prenez le temps de lire [la page dédiée aux dégradés en CSS sur MDN](https://developer.mozilla.org/fr/docs/Web/CSS/linear-gradient).

## Du code, du code&nbsp;!

Jʼai croisé plusieurs implémentations de cette solution, toutes très intéressantes mais aucune ne fonctionnant «&nbsp;telle quelle&nbsp;». En voici deux notables&nbsp;:

* [la méthode utilisée par tufte-CSS (sur Github)](https://github.com/edwardtufte/tufte-css/blob/master/tufte.css#L237)&nbsp;;
* [la réflexion menée par Adam Schwartz pour Eager (en anglais)](https://eager.io/blog/smarter-link-underlines/) avec une illustration interactive particulièrement réussie.

Ça donne suffisamment de matière pour avancer, donc jʼai trituré tout ça jusquʼà obtenir un résultat satisfaisant mes besoins. Vous en trouverez [un aperçu rigolo sur CodePen](http://codepen.io/ffoodd/pen/jbRMqJ/). Pour les feignasses, voici le CSS incriminé&nbsp;:

```css

.underline {
  text-decoration: underline;
}

.no-highcontrast.cssgradients .underline {
  background: white 0 88% / 100% 0.1rem no-repeat content-box content-box;
  background-image: 
  linear-gradient(
  rgba(255, 255, 255, .67), 
  rgba(255, 255, 255, .67)
  ), 
  linear-gradient(
  currentColor, 
  currentColor
  );
  display: inline;
  text-decoration: none;
  text-shadow: 
  .05rem 0 0 white, 
 -.05rem 0 0 white, 
  .1rem 0 0 white, 
 -.1rem 0 0 white, 
  .2rem 0 0 white, 
 -.2rem 0 0 white;
  width: auto;
}

/* Pour la sélection */
/* https://developer.mozilla.org/en-US/docs/Web/CSS/::selection */
.no-highcontrast.cssgradients .underline::-moz-selection {
  background-color: black;
  color: white;
  text-shadow: none;
}

.no-highcontrast.cssgradients .underline::selection {
  background-color: black;
  color: white;
  text-shadow: none;
}

@media screen and (-ms-high-contrast: active) {
  .underline {
  background: none !important;
  text-decoration: underline !important;
  }
}
```

Vous noterez les occurrences multiples de la couleur blanche —&nbsp;tant sous la forme du mot-clé `white` que de sa notation `rgba()`. Simplement parce que mon exemple à un arrière-plan blanc. Évidemment si votre texte repose sur un fond coloré, ces valeurs doivent **respecter la couleur dʼarrière-plan**.[^3]

[^3]: Vous avez probablement déjà compris que si votre texte repose sur une image ou un dégradé, il nʼy aura probablement pas de salut pour votre soulignement.



Petite astuce à prendre en considération, le second paramètre du _mixin_ concerne la position du soulignement **par rapport à la hauteur de lʼélément**. Je ne suis pas parvenu à rendre ça dispensable, le changement de corps et de caractères entraînant une trop grande variation sur la hauteur de ligne. Dans mes différents cas, la position varie entre 88% et 96%.

## Cʼest pas un peu verbeux&nbsp;?

**Si**. Pour plusieurs raisons que je tente de vous expliquer&nbsp;:

* les propriétés dʼarrière-plan sont très riches, avec dans la notation raccourcie&nbsp;:
  * `background-color`&nbsp;
  * `background-position`&nbsp;
  * `background-size`&nbsp;
  * `background-repeat`&nbsp;
  * `background-origin`&nbsp;
  * `background-clip`.
* deux dégradés, dont le premier (couleur dʼarrière-plan en semi-transparent) sert à alléger visuellement le second —&nbsp;qui utilise `currentColor` pour conserver la couleur du texte sur lequel il est appliqué&nbsp;;
* lʼombre sur le texte, dont le seul et unique objectif est dʼéviter la collision entre les jambages inférieurs et le soulignement&nbsp;;
* et deux propriétés auxquelles vous ne vous attendiez peut-être pas&nbsp;: `display: inline;` et `width: auto;` dont lʼintérêt est de sʼassurer que notre charmant souligné suive bien le texte **et uniquement le texte**.[^5]

[^5]: Sans cette astuce, certains éléments auraient un soulignement sur toute la largeur, même si le texte ne la remplit pas —&nbsp;et dʼautres éléments auraient un soulignement uniquement sur la dernière ligne, si dʼaventures ils fussent sur plusieurs lignes.


* les classes de tests du support des dégradés CSS et de lʼactivation du mode de contrastes élevés.

Ça fait beaucoup de code, mais tout est indispensable.

## Et lʼaccessibilité&nbsp;?

Pour commencer, il est nécessaire de mettre en place deux scripts fonctionnant sur le même principe&nbsp;:

1.  un test de fonctionnalité tel que _Modernizr_ —&nbsp;[dont vous pouvez générer une version uniquement pour les dégradés CSS](https://modernizr.com/download?setclasses&q=gradient)&nbsp;— afin dʼappliquer ce CSS de soulignement uniquement si le navigateur supporte les dégradés&nbsp;;
2.  un second test pour **détecter lʼactivation du mode de contrastes élevés** —&nbsp;qui supprime les arrières-plans et laisserait donc nos éléments soulignés complètement nus et sans soulignement&nbsp;— mais qui détecte également si **lʼutilisateur a personnalisé la couleur des liens**&nbsp;: vous trouverez la source sur [un JSFiddle de Karl Groves](http://jsfiddle.net/karlgroves/XR8Su/6/) du Paciello Group (quʼil a lui-même récupéré de Hans Hillen) que jʼai modifié afin de tester un lien plutôt quʼune division.

Les navigateurs ne supportant pas les dégradés ou étant utilisé conjointement au mode de contrastes élevés resteront avec leur bon vieux `text-decoration: underline;`.

Un autre cas pointu est à signaler&nbsp;: **la sélection du texte en question**. Il est impossible à ma connaissance de simplement supprimer les styles ajoutés (`unset` sert _a priori_ à ça, mais son fonctionnement et son support ne sont pas convaincants). Il faut donc personnaliser la sélection, ce que je fais en inversant couleur dʼarrière-plan et couleur de texte et en supprimant lʼombre sous le texte [à lʼaide du pseudo-élément dédié (en anglais)](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection).

Merci à [Johan Ramon](https://twitter.com/johan_ramon) pour mʼavoir rappelé à lʼordre avec ces détails croustillants&nbsp;!

## Modifications

### 27 octobre 2016

Une petite amélioration est apportée, de la manière suivante&nbsp;:

* si le navigateur gère **les requêtes de fonctionnalités** _via_ `@supports` et qu’il supporte `text-decoration-skip: ink;`, on applique cette propriété&nbsp;;
* si le navigateur gère les requêtes de fonctionnalité mais pas la propriété, on applique le `background-image` lorsque le mode de contrastes élevés n’est pas activé.

Si ces ajouts vous intéressent, voici un peu de lecture supplémentaire&nbsp;:

* [`@supports` sur MDN](https://developer.mozilla.org/fr/docs/Web/CSS/@supports)&nbsp;;
* [`text-decoration-skip`, également sur MDN](https://developer.mozilla.org/fr/docs/Web/CSS/text-decoration-skip).

Tout peut se résumer comme suit&nbsp;:

```css

@supports (text-decoration-skip: ink) {
  text-decoration-skip: ink;
}
```

Le [CodePen](http://codepen.io/ffoodd/pen/jbRMqJ/) est à jour pour que vous jetiez un œil, et je l’ai [exporté dans un Gist](https://gist.github.com/ffoodd/d4bee79e6af99c05f0a32542d66d5969) également.

Cet ajout a quelques effets notables&nbsp;:

* certains navigateurs sont désormais exclus par le manque de support de `@supports`, tels que le _Stock browser Adnroid_, _Blackberry Browser_ ou _IE Mobile_. Ça me semble une bonne chose puisque ces styles sont relativement coûteux, ces vieux navigateurs mobiles seront épargnés&nbsp;;
* seul Safari 9 supporte `text-decoration-skip: ink;`, et je ne suis pas certain que le rendu soit le même. Ce serait à tester et ajuster au cas par cas.

Mais nous voilà avec un pied dans le futur&nbsp;!

### 20 janvier 2017

[Xavier Zalawa rencontre un bug de Blink gênant](https://twitter.com/7studio/status/822116634542374914) impliquant `currentColor` dans un `linear-gradient` en cas de changement d’état. C’est le cas dans ce soulignement factice&nbsp;: `currentColor` utilisé dans le background n’est pas mis à jour lors du survol ou de la prise de focus, sans être répété—&nbsp;ce qui ruine littéralement l’intérêt de currentColor…

[Le bug est ouvert chez Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=595467).

[Vincent De Oliveira a cependant trouvé une astuce pour le faire fonctionner sans devoir répéter la propriété](https://twitter.com/iamvdo/status/822130026384592898) et ça, c’est cool.

En repassant donc sur le [CodePen](http://codepen.io/ffoodd/pen/jbRMqJ) pour le mettre à jour, je me suis également rendu compte que la _media query_ `-ms-high-contrast: active` était inutile&nbsp;; je l’ai donc supprimée. Cette requête n’est comprise que par IE 11 et inférieur —&nbsp;cependant comme elle était imbriquée dans une règle @supports ces derniers ne pouvaient pas la lire. Hop, un peu de code en moins&nbsp;!