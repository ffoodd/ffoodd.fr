---
layout: "template/post.njk"
title: "La schizophrénie sémantique"
date: "2012-05-11T17:19:25"
modified: "2013-10-18T09:56:22"
permalink: "la-schizophrenie-semantique-dun-logo/index.html"
excerpt: "Comme beaucoup d’intégrateurs, je me suis heurté à la schizophrénie sémantique du logo. Vous rêvez de l’inclure dans un h1 plein de bon texte pour le SEO, mais m**d* ! Votre logo est une image. Que dois-je faire, Docteur ? De nombreux remèdes ont vu le jour pour combattre ce symptôme, à tel point que […]"
format: "standard"
tags: "posts"
---
Comme beaucoup d’intégrateurs, je me suis heurté à la **schizophrénie sémantique** du logo. Vous rêvez de l’inclure dans un h1 plein de bon texte pour le SEO, mais m\*\*d\* ! Votre logo est une image.

## Que dois-je faire, Docteur ?

De nombreux remèdes ont vu le jour pour combattre ce symptôme, à tel point que l’excellent Chris Coyier en a érigé un [mémorial](http://css-tricks.com/examples/ImageReplacement/).  
De mon côté, j’ai beaucoup apprécié l’élégance et la légèreté de la [proposition](http://nicolasgallagher.com/another-css-image-replacement-technique/) de Nicolas Gallagher, notamment utilisée dans le fameux [HTML5 Boilerplate](http://html5boilerplate.com/). Et c’est cette option que j’utilise et recommande.

## Mais ça démange encore !

Il reste un symptôme gênant : l’image elle-même. On se retrouve avec un fichier à charger – et donc une **requête HTTP supplémentaire** – et qui nécessitera de **refaire** l’image en cas de modification. Ennuyeux. Mais deux techniques supplémentaires viennent à notre rescousse : **@font-face** et **base64**.

## @font-face

Une astuce relativement simple a vu le jour récemment, qui permet d’incorporer des images dans un seul fichier et pouvoir les styler via CSS : les icon-fonts. Cette technique est plébiscitée en ce moment, et j’ai donc eu tout le loisir de me documenter :

* [Icon Fonts are Awesome](http://css-tricks.com/examples/IconFont/) de Chris Coyier
* [Icon Fonts](http://trentwalton.com/2012/05/04/icon-fonts/) de Trent Walton
* [Displaying Icons with Fonts and Data- Attributes](http://24ways.org/2011/displaying-icons-with-fonts-and-data-attributes) de John Hicks
* [ICÔNES “@FONT-FACE” ET ACCESSIBILITÉ](http://blog.goetter.fr/post/18017100624/icones-font-face-et-accessibilite) par Raphaël Goetter

Certains points sont abordés, notamment pourquoi le SVG ne suffit pas actuellement ( indice : IE8 ) mais aussi la question de l’accessibilité. J’ai d’abord été attiré par l’implémentation de Trent Walton de son logo. Mais dans une correction de son billet, Raphaël Goetter a ajouté une proposition de Keyamoon pour son outil [IcoMoon](http://keyamoon.com/icomoon/#toHome). Cette solution est particulièrement propre car il s’agit simplement d’ajouter **un attribut** à la balise visée. J’adopte !

À noter cependant : pour inclure une image dans une typographie, il est nécessaire de disposer d’un outil efficace – et ça n’est pas si simple. Il existe un [tutoriel intéressant](http://www.webdesignerdepot.com/2012/01/how-to-make-your-own-icon-webfont/) pour y parvenir, ou encore le site [Fontstruct](http://fontstruct.com/) qui vous permet de dessiner directement vos caractères.  
  
Je tiens à remercier [Damien Collot](http://damien-collot.com/) pour l’aide qu’il m’a apporté sur le sujet.

## Base64

Au fil de mes pérégrinations, j’ai un jour remarqué cette option sur le générateur de kits @font-face de [font-squirrel](http://www.fontsquirrel.com/) : encoder en Base64. Quelques rapides recherches – et cet [excellent article sur Alsacréations](http://www.alsacreations.com/article/lire/1439-data-uri-schema.html) – m’ont appris qu’encoder un petit fichier en Base64 permettait d’économiser une requête HTTP : Eurêka !

## Résultat

Ne cherchez plus, c’est la technique que j’ai utilisée sur le logo de ce site. En HTML cela donne simplement :

```markup

<h1>
  <a data-icon="a">Gaël Poupard</a>
</h1>
```

et en css :

```css

@font-face {
  font-family: ’logo’;
  src: url(’font/logo.eot’);
  src: local(’?’), url(data:font/woff;charset=utf-8;base64,...;
  font-weight: normal;
  font-style: normal;
}
h1 a {
  font: 0/0 a;
  text-decoration: none;
}
h1 a:before {
  content: attr(data-icon);
  font: 200px/250px ’logo’;
  text-decoration: none;
}
```

Et c’est tout ! Le résultat est particulièrement propre et simple. Il nécessite un travail préparatoire assez long, mais c’est une mécanique intéressante à connaître.

## Conclusion

Trois techniques relativement avancées permettent d’obtenir cet excellent résultat. Le logo est :

1.  encodé en **Base64** : pas de requête HTTP
2.  appelé via **@font-face** : maniable en CSS
3.  inclus dans un **h1** : sémantiquement intéressant
4.  dispose d’un texte de remplacement **pertinent** : optimisé pour le référencement

Le principal inconvénient est le **support d’IE8** : il ne reconnaît que les fichiers .eot dans @font-face, ce qui nous force à ajouter un fichier .eot difficile à convertir en Base64. Mais si vous pouvez m’y aider, je suis tout ouï !