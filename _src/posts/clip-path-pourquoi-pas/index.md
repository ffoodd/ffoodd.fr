---
layout: "template/post.njk"
title: "Clip-path, pourquoi pas ?"
date: "2014-03-11T15:44:26"
modified: "2021-03-05T17:09:34"
permalink: "clip-path-pourquoi-pas/index.html"
excerpt: "Certaines propriétés voient régulièrement le jour en CSS mais leur appropriation par les intégrateurs est disparate&nbsp;: tantôt gadgets, utilisées à tort et à travers à cause d’un _buzz_ impromptu — souvent mal comprises, mal utilisées, avec peu ou pas de compatibilité; tantôt effrayantes tant elles relèvent de la science-fiction, et donc rarement employées malgré un support décent et une dégradation efficiente pour les navigateurs moins performants. `clip-path` fait partie du second groupe. Jetons-y un œil."
tags: ["posts"]
description: "D’ordinaire je ne suis pas un adepte de l’expérimentation des nouvelles propriétés&nbsp;: le pragmatisme lié aux contraintes de production dans mon travail rend l’effort relativement vain."
---
Mais lorsque [Kitty Giraudel](https://twitter.com/KittyGiraudel "Sur Twitter") a lancé son [CSS brain teaser](https://kittygiraudel.com/2014/02/19/the-magic-circle-a-css-brain-teaser/).[^1]

[^1]: Papa, Maman : j’aime les casses-têtes.



## Les spécifications actuelles

Ne connaissant que de très loin cette propriété, il a fallu me mettre à jour. `clip-path`, à l’instar de `clip`, sert à délimiter la zone d’affichage d’un contenu. Je m’oriente vers les spécifications pour compléter cet embryon de culture&nbsp;— et là, c’est le drame&nbsp;:

* [La spécification de la propriété](https://www.w3.org/TR/css-masking-1/#the-clip-path "en Anglais") `clip-path` au sein du module _CSS masking_, encore à l’état de brouillon;
* Qui nous renvoie [aux formes basiques](https://www.w3.org/TR/2013/WD-css-shapes-1-20130620/#basic-shapes-from-svg-syntax "en Anglais") en SVG;
* Tout cela en se référant sans arrêt à [l’élément SVG `ClipPath`](https://www.w3.org/TR/css-masking-1/#ClipPathElement "en Anglais");
* De fil en aiguille, citons également le module _Masking_ de la spécification SVG — et notamment [la section sur les _Clipping paths_](https://www.w3.org/TR/SVG/masking.html#ClippingPaths "en Anglais").

On peut d’ores et déjà noter une différence remarquable entre les états de ces deux spécifications&nbsp;: l’une est en brouillon, l’autre en recommandation. La spécification SVG est extrêmement aboutie et claire, les ressources ne manquent pas.[^2]

[^2]: Un petit « cocorico » s’impose pour féliciter Jérémie Patonnier, qui a grandement contribué à la documentation sur le Mozilla Developper Network notamment.



En revanche le module CSS est obscur. Il existe un lien étroit entre les deux spécifications, car le brouillon du module _CSS Masking_ s’appuie énormément sur la spécification SVG&nbsp;— et qu’en SVG il existe l’attribut `clip-path`. Ça génère des incompréhensions qui ne vont pas faciliter la prise en main de cette propriété.

Pour éclaircir un peu tout ça — et vous épargner la lecture des spécifications — vous devriez pouvoir écrire ceci pour utiliser une forme basique&nbsp;:

```css

.clip { 
  clip-path: circle( 50%, 50%, 5em );
}
```

Mais ceci devrait fonctionner également — en appelant un élément SVG&nbsp;:

```css

.clip { 
  clip-path: url(#circle);
}
```

## Les origines

Il faut sonder un peu les origines de ce module CSS pour en comprendre l’obscurité. Bien que déjà en cours d’élaboration dans le cadre technique du SVG, la possibilité de masquer des éléments en CSS existait depuis CSS 2.1 grâce à la propriété `clip`, désormais [dépréciée](https://www.w3.org/TR/css-masking-1/#clip-property "en Anglais").[^3]

[^3]: La propriété est dépréciée mais très bien supportée, et le W3C indique que les agents utilisateurs (navigateurs web) doivent la supporter malgré sa déprécation.



Cette propriété n’a jamais réellement trouvé son public, car elle a deux inconvénients majeurs&nbsp;:

1.  L’élément masqué doit être en position absolue;
2.  Le masque ne peut être que rectangulaire, et son placement est contre-intuitif.

Embêtant. Constatant les progrès possibles de cette fonctionnalité en CSS, c’est [le navigateur Safari qui a ouvert les hostilités en 2008](https://www.webkit.org/blog/181/css-masks/ "en Anglais") avec les propriétés `-webkit-mask-…` supportées [dès Safari 4](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariCSSRef/Articles/StandardCSSProperties.html#//apple_ref/doc/uid/TP30001266-SW17 "en Anglais"). Cette technique a rencontré un franc succès car elle permet d’utiliser une image comme masque. Malheureusement cette propriété n’était supportée que par le moteur de rendu Webkit.[^4]

[^4]: Je ne compte pas traiter du marronnier de « la guerre des navigateurs » ni du syndrome « Webkit only ».



Là, j’ai vu poindre le problème&nbsp;: la spécification CSS en cours d’élaboration mélange joyeusement les clips issus de SVG et la proposition de Safari.[^5]

[^5]: Fabriqué par Apple® en Californie.



## Des ressources dissonantes

Il est fort peu probable que personne avant moi ne s’y soit intéressé. Et en effet, quatre ressources principales sont indispensables pour appréhender `clip-path`&nbsp;:

* [CSS Masking](https://www.html5rocks.com/en/tutorials/masking/adobe/ "en Anglais") sur HTML5Rocks;
* L’article dédié sur [Web Platform Docs](https://docs.webplatform.org/wiki/css/properties/clip-path "en Anglais");
* Un tutoriel avancé sur [The Nitty Gritty](https://thenittygritty.co/css-masking "en Anglais");
* L’article de l’Avent par Vincent De Oliveira sur [24 jours de web](https://www.24joursdeweb.fr/2013/les-masques-css/);

Comme vous vous en apercevrez en les lisant, le contenu est disparate. La compatibilité navigateur est abordée différemment.[^6]

[^6]: La palme revient à HTML5Rocks qui détaille Chrome et Firefox, et oublie les autres.



À l’instar de la spécification qui intègre les clips **et** les masques, ces ressources présentent les deux techniques. Dommage car deux articles distincts auraient été bien plus clairs !

## Un bilan mitigé

Après avoir compulsé maladivement les spécifications, articles, tutoriaux et autres exemples pendant quelques jours, j’ai abouti à un exemple ressemblant à ceci&nbsp;:

```css

/**
 * 1. Définition d’une forme rectangulaire de repli pour les navigateurs ne supportant pas clip-path;
 * 2. Création d’une forme SVG basique, circulaire;
 * 3. Appel d’un fichier SVG contenant un élément clipPath. 
 */
.clip { 
  clip: rect( 7em, 30em, 17em, 20em ); /* 1 */
  -webkit-clip-path: circle( 50%, 50%, 5em ); /* 2 */
  clip-path: url(#circle); /* 3 */
}
```

Évidemment, cela implique un balisage précis côté HTML&nbsp;:

```markup

<p class="clip">
  ♬ Tout, tout, tout : vous saurez tout sur le clip-path ♬
</p>
<svg width="200" height="200">
  <defs>
  <clipPath id="circle">
  <circle cx="50%" cy="50%" r="80" />
  </clipPath>  
  </defs>
</svg>
```

Ainsi je tente de vous livrer un état des lieux aussi complet que possible.[^9]

[^9]: Je tiens à préciser que je n’ai aucune expertise en la matière : ce ne sont la que les conclusions trouvées par un intégrateur lambda.



* **Chrome 23, Safari 6.1 et Opéra 15** supportent `clip-path` sous toutes ses formes — incluant la définition de formes SVG basiques dans le CSS;
* **Firefox 4** supporte `clip-path` si on référence un élément SVG `clipPath`&nbsp;— ce qui implique d’ajouter un fichier SVG&nbsp;— en revanche vous serez obligés de définir des positions en unités absolues comme le `px` pour positionner votre clip si vous souhaitez éviter les bugs, et c’est bien dommage;
* **Opéra 7, Chrome 14, IE8 à 11 et Safari 1** se replient sur `clip`;
* **Une note sur IE9 à 11&nbsp;:** ces navigateurs supportent `clip-path` si on référence un élément SVG `clipPath`, à condition d’appliquer le clip sur un élément SVG. Il est envisageable d’intégrer la zone à clipper dans un élément `ForeignObject` au sein d’un SVG, mais ça devient trop tordu à mon goût;
* **Un mot sur IE4 à 7&nbsp;:** surpris vous êtes ? Ne le soyez pas, clip est reconnu sur IE4 à 7 (et même Netscape 4). Le hic, ce sont les pseudo-éléments que j’emploie dans mon exemple; ainsi en ajoutant un élément dédié dans le DOM, vous devriez pouvoir supporter IE4 facilement 😀 .

## Une solution correcte

Malgré le support disparate et le funambulisme nécessaire pour aboutir à un résultat viable, j’ai trouvé `clip-path` extrêmement intéressant — et notamment grâce à la dégradation possible à l’aide de `clip` sur de très vieux navigateurs et de façon simplissime.

Ce repli implique de perdre les formes personnalisées au profit d’un rectangle «&nbsp;simple&nbsp;», ce qui fut considéré comme acceptable lors de l’avènement de `border-radius` par exemple. Et je suppose que dans la plupart des cas, cette solution reste acceptable.

Vous trouverez donc ma solution au casse-tête proposé par Kitty [sur CodePen](https://codepen.io/ffoodd/pen/Eolkb "en Anglais"), détaillée, commentée, agrémentée de diverses précisions — en Anglais.

Tout retour sera le bienvenu 🙂 .

### Mise à jour

Moins d’une semaine avant la publication de mon article, le brouillon du W3C concernant la notation des formes basiques a évolué. Je cite [Vincent De Oliveira](https://twitter.com/iamvdo), qui a partagé l’information avec moi&nbsp;:

> Par contre, la notation des basic-shapes ont (encore) changées récemment! 😛 [dev.w3.org](https://dev.w3.org/csswg/css-shapes/#basic-shape-functions "en Anglais")

Ô joie. Merci à Vincent en tout cas !
