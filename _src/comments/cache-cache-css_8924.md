---
date: "2016-10-21T09:11:26"
author_name: "Gaël Poupard"
author_url: ""
author_avatar: "https://secure.gravatar.com/avatar/76dde5fd394081aa4261802372fe2e33?s=48&d=mm&r=g"
---
Bonjour Michel,

J'utilise systématiquement `!important` sur les classes utilitaires qui ont vocation à figer une propriété, ce qui est le cas ici. L'objectif étant que même incorporé dans un environnement sauvage (plusieurs bibliothèques de styles, des styles supplémentaires rédigés à la main par un débutant, etc.) ces styles soient appliqués. Vous utilisez cette classe pour masquer visuellement un élément': si cela n'est plus le cas, retirez la classe au lieu de surcharger le style.

Si d'aventure la personne qui intervient est tentée de retirer le `!important` — ou d'en ajouter pour le surcharger — elle commet une erreur : c'est la classe sur l'élément HTML qu'elle devrait retirer.

[Harry Roberts a écrit un article intéressant sur ce sujet, dans lequel il parle d'immuabilité](http://csswizardry.com/2016/05/the-importance-of-important/).

C'est de l'ordre du choix, évidemment rien ne vous oblige à les conserver si cela va à l'encontre de vos pratiques.