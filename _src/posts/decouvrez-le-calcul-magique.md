---
layout: "template/post.njk"
title: "Découvrez le calcul magique"
date: "2015-03-30T14:30:04"
modified: "2016-01-07T16:12:06"
permalink: "decouvrez-le-calcul-magique/index.html"
excerpt: "Vous souvenez-vous de cette expression fort courante il y a quelques années, le fameux «&nbsp;nombre magique&nbsp;»&nbsp;? Cette pratique a tendance à disparaître depuis l’avènement du _responsive design_ et le besoin de souplesse, que ne permettait pas un `height:&nbsp;42px;`. Mais les nouvelles propriétés CSS et le support des navigateurs m’ont permis de rencontrer le niveau deux de ce sortilège&nbsp;: le **calcul magique**. Venez voir, c’est rigolo&nbsp;!"
format: "standard"
tags: "posts"
---
Et ça, c’était pas terrible. Non, vraiment pas. On cherchait frénétiquement à obtenir le même rendu sur tous les navigateurs et tous les écrans. Aujourd’hui, c’est drôle —&nbsp;à l’époque, c’était le nerf de la guerre.

## Les valeurs uniques

Cette recherche de perfection était régulièrement entravée par plusieurs&nbsp;limitations techniques&nbsp;:

* les **styles par défaut des navigateurs** différaient, parfois beaucoup&nbsp;—&nbsp;ce problème a été résolu à coup de _reset_ ou de _normalize_&nbsp;;
* les unités relatives étaient parfois compliquées à manœuvrer, à cause d’**inconsistances dans les valeurs calculées** par les navigateurs (notamment la question des arrondis) mais ces derniers ont plutôt bien corrigé le tir, depuis&nbsp;;
* **les unités différentes**, difficiles à manipuler ensemble (`px`, `%`, `em`, etc.)&nbsp;;
* l’**incompréhension des modèles de boîte**, &nbsp;au moment ou tout le monde blâmait le mode _quirks_ d’IE avant de l’adopter massivement sous sa forme CSS (`box-sizing: border-box;`, pour ceux qui se posent la question).

Pour l’intégrateur, ces différents tracas pouvaient être résolus de la même façon&nbsp;: des valeurs absolues en pixels, de préférence. Ainsi ajustions-nous nos largeurs, marges internes et marges externes **au pixel près**.

Désormais il est relativement rare d’en arriver à ces extrémités, grâce aux nombreux outils qui sont apparus ces dernières années. Il en est un en particulier qui aide bien, lorsque `box-sizing` ne suffit pas&nbsp;: la fonction `calc()`.

## La fonction calc() à la rescousse

Pour faire simple —&nbsp;vous la connaissez sûrement déjà&nbsp;— elle permet de réaliser des calculs simples directement dans les styles, **en mixant les unités**.

Dans un écosystème rempli de nombres magiques et d’intégration _pixel perfect_, une reprise partielle du code peut s’avérer extrêmement fastidieuse.

En l’occurrence, c’était mon cas lors d’un POC l’an dernier. Je devais travailler un gabarit souple en surcouche d’une structure figée, **sans accès au DOM**.

Ce fut relativement simple à l’exception d’un point&nbsp;: il fallait un bloc image avec titre superposé, qui prenne les deux tiers de la largeur du site —&nbsp;largeur devenue relative, je le rappelle&nbsp;— en partant de la colonne centrale. Jusque là, ça va&nbsp;! Le point vraiment compliqué est que le bloc de la colonne de droite devait suffisamment se décaler en hauteur pour laisser la place à ce nouveau contenu, tout en respectant le ratio de l’image constituant ce nouvel élément —&nbsp;puisqu’elle sera souple également. Ah, et pour s’amuser un peu visuellement, il faudrait conserver un rappel visuel du colonage au-dessus du nouveau bloc&nbsp;!

Bien, utilisons une bordure en haut pour gérer le décalage&nbsp;!

**Ça commence à faire un certain nombre de calculs, vous ne trouvez pas&nbsp;?**

## La situation complexe

Textuellement, ça n’est pas forcément évident. Voici une petite illustration, dans laquelle la zone blanche est le nouvel élément, et le bloc rouge est la bordure dont je devais ajuster la dimension&nbsp;:

![Représentation graphique des proportions entre les blocs](/images/2015/03/calc-300x209.png "Représentation graphique des proportions entre les blocs")

Finalement, je suis parvenu à simplifier le calcul en tournant autour du ratio de l’image utilisée (en blanc sur le schéma), soit **431:950**. Il s’agissait donc d’exprimer la hauteur de la bordure selon 3 valeurs&nbsp;:

1.  la proportion en largeur que représente ce nouveau bloc par rapport au _viewport_, soit `72%`&nbsp;;
2.  le ratio de l’image utilisée, en l’occurrence `431/950`&nbsp;;
3.  le décalage supplémentaire à ajouter au-dessus et en-dessous pour l’esthétisme, ici `4.8em`.

## La magie opère

Et voilà comment on aboutit à&nbsp;:

```css
aside {
  border-top-width: calc( 72vw * 431 / 950 + 4.8em);
}
```

Grâce à ce calcul, le décalage reste correct et proportionnel au reste de l’écran, et l’aspect graphique est homogène dans tous les contextes d’affichage.

## Les suppléments

Depuis ce POC, j’ai découvert le travail de [Nicolas Hoizey](http://gasteroprod.com/) sur [esviji V2](https://github.com/nhoizey/esviji), qui utilise [les ratios, les calculs et les unités de viewport](https://github.com/nhoizey/esviji/blob/master/src/sass/_screen.scss) pour atteindre un degré d’adaptation aux écrans extraordinaire. Je vous conseille de garder un œil sur son projet, et surtout de parcourir [la feuille de styles générée](https://gist.github.com/nhoizey/f31cf92114a376a23155) qui est remarquablement écrite&nbsp;!