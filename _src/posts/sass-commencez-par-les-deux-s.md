---
title: "Sass : commencez par les deux « S »"
date: "2013-11-28T14:26:04"
modified: "2015-07-03T10:49:17"
permalink: "sass-commencez-par-les-deux-s/index.html"
excerpt: "La principale chose à savoir avant de se lancer dans l’apprentissage de Sass, c’est qu’il faut en premier lieu maîtriser les CSS. Les pièges sont multiples, et même Indiana Jones se ferait avoir&nbsp;! [Lire la suite de «&nbsp;Sass : commencez par les deux « S »&nbsp;» →](https://www.ffoodd.fr/sass-commencez-par-les-deux-s/)"
format: "standard"
---
Malheureusement, vous aurez peut-être déjà fait ce constat&thinsp;:&nbsp;ce réflexe n’est que trop rarement encouragé. J’ai beau parcourir des dizaines d’articles, de tutoriaux, de _frameworks_ CSS ou de Gist, trop peu font ce rappel&thinsp;:&nbsp;testez, relisez, améliorez, testez à nouveau et finalement améliorez encore. **Ça devrait se passer comme ça.** On peut argumenter qu’un bon intégrateur le ferait&thinsp;—&thinsp;mais c’est trop facile, non&nbsp;?

## Premier contact avec Sass

Après avoir lu énormément de ressources sur [Less](http://lesscss.org/ "Site du pré-processeur Less (nouvelle fenêtre)") puis Sass pendant longtemps, je ne m’étais toujours pas décidé à franchir le pas pour plusieurs raisons&thinsp;:

* le changement bien sûr&thinsp;:&nbsp;rien de plus naturel que la résistance au changement;
* la perspective d’une «&thinsp;naturalisation&thinsp;» des avancées intéressantes dans les évolutions prévues de CSS&thinsp;.[^1]

[^1]: Les calculs simples sont déjà là grâce à calc(), les variables sont à l’état de brouillon au W3C, etc.


* l’intérêt limité&thinsp;—&thinsp;ou imitable&thinsp;—&thinsp; de certaines fonctionnalités&thinsp;.[^2]

[^2]: Les placeholders, par exemple, sont limités puisqu’on peut créer ses propres classes transportables et modulables.



Dans l’ensemble, je pensais&thinsp;—&thinsp;et je pense toujours&thinsp;—&thinsp;que l’utilisation de Sass n’avait pas d’intérêt à mon échelle&thinsp;:&nbsp;petits projets, récupération de code, très peu de collaboration… J’y percevais plus de risques et d’inconvénients que d’avantages, et certaines de mes lectures le confirmaient.

L’évolution de mon projet personnel ffeeeedd conjointe à la lecture de l’excellent [CSS maintenables](http://www.css-maintenables.fr/ "Le site du livre CSS maintenables (nouvelle fenêtre)") puis de [Sass & Compass avancé](https://www.ffoodd.fr/sass-compass-avance/ "Sass & Compass avancé") m’ont finalement motivé&thinsp;:&nbsp;bien qu’à l’aise avec mon _workflow_, je voulais l’améliorer et Sass m’a semblé être l’outil idéal.

## Découvertes particulières

J’y suis allé pas à pas, dans l’ordre de la documentation. Des règles imbriquées aux fonctions, j’ai pris un temps considérable et me suis consciencieusement appliqué à découvrir le résultat de chacune des fonctionnalités&thinsp;.[^3]

[^3]: Soit dit en passant, je préfère ne pas passer à Compass tout de suite, je pense devoir manier Sass correctement avant d’ajouter un autre crayon à ma palette.



La définition de variables&thinsp;—&thinsp;et par extension, la structuration d’un projet&thinsp;—&thinsp;est un gain de clarté évident. La compilation automatique est un gain de temps remarquable, et la qualité est au rendez-vous. Les fonctions, mixins et autres boucles sont extrêmement intéressantes, mais on touche aussi aux limites de l’outil&thinsp;:&nbsp;**il faut de très, très bonnes bases en CSS pour s’en servir de façon optimale**.

Étendre une classe est un piège parfait, probablement le plus efficient en tant que piège&thinsp;;&nbsp;les nombreuses subtilités des fonctions et mixins peuvent également générer des erreurs très discrètement&thinsp;—&thinsp;et elles peuvent donc rester, pour peu que l’utilisateur ne soit pas consciencieux.

**Je ne gâcherais pourtant pas mon plaisir&thinsp;:&nbsp;créer des mixins, fonctions et placeholders pour factoriser mes feuilles de styles «&thinsp;sources&thinsp;» est terriblement agréable 😀 .**

## Une simplification, vraiment ?

Je suis encore en phase de découverte et pourtant me voilà sur ma faim&thinsp;:&nbsp;beaucoup de choses sont considérablement simplifiées, mais je garde l’impression que la complexité «&nbsp;d’avant&thinsp;»&nbsp;est simplement déportée vers les fonctionnalités dynamiques&thinsp;.[^4]

[^4]: Compass me semble d’ailleurs être un écueil remarquable pour le débutant, qui ne comprendra pas en profondeur le fonctionnement et la portée des mixins et fonctions proposées.



La distance «&thinsp;cognitive&thinsp;» entre les fonctions/mixins et leur contexte d’utilisation, ainsi que la séparation des feuilles de styles en fragments&thinsp;.[^5]

[^5]: Des «&thinsp;partials&thinsp;» dans le vocabulaire Sass



## Sass n’est qu’un outil

Vous connaissez le dicton&thinsp;:

> Il n’y a pas de mauvais outil, il n’y a que de mauvais ouvriers.

Et bien elle se vérifie avec Sass. Ce qui ne me convainquait pas l’an dernier ne me convainc toujours pas&thinsp;:&nbsp;les articles vantant les mérites des pré-processeurs sont relativement évasifs, et l’élan massif vers l’adoption de Sass me fait penser au [crime passionnel au pays des Toupoutous](http://www.youtube.com/watch?v=I8Qu7_unkg4 "Voir la vidéo sur Youtube (nouvelle fenêtre)").

Oui, Sass est un outil formidable qui peut grandement faciliter et accélerer votre travail d’intégration&thinsp;;&nbsp;oui, les possibilités semblent infinies&thinsp;;&nbsp;oui, son utilisation est plutôt simple…

Mais n’oublions que Sass reste un outil, et en tant que tel sa vocation est seulement de faciliter votre travail et pas d’en améliorer la qualité. **Ce n’est pas le marteau qui fait en sorte que le clou rentre droit, c’est votre geste.**