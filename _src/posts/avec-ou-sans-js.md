---
title: "Avec ou sans JS ?"
date: "2017-02-03T17:02:05"
modified: "2017-02-06T12:42:12"
permalink: "avec-ou-sans-js/index.html"
description: [""]
excerpt: "Vous est-il déjà arrivé de voir un élément se cacher dès que vous arrivez sur un site ? Rassurez-vous, ça n'est pas qu'il ne vous aime pas, non : son concepteur a simplement pensé que sans JavaScript, ce contenu devait être affiché. Et quand JavaScript est activé, il le cache. C'est malin ! Mais vous l’avez vu. [Lire la suite de « Avec ou sans JS ? » →](https://www.ffoodd.fr/avec-ou-sans-js/)"
format: "standard"
alternate: [""]
---
Vous avez déjà vécu ça, pas vrai&nbsp;?

## L'amélioration progressive

Quand on cherche à bien faire ces interactions qui affichent et masquent un élément à l'aide de JavaScript, une des fondations est de **s'assurer que le contenu soit accessible sans JavaScript**. Ça fait partie intégrante de l'amélioration progressive, que je synthétise comme suit&nbsp;:

1.  le HTML est propre, lisible, cohérent, et permet d'**accéder au contenu sans obstacle**&nbsp;;
2.  le CSS améliore **l'aspect graphique**, ordonne les éléments visuellement&nbsp;;
3.  le JS enrichit le tout d'une couche de **comportements** inexistants en HTML et CSS.

Or dans le cas d'un composant qui affiche ou masque un élément, le fonctionnement avant l'exécution du JS est donc d'avoir cet élément affiché par défaut. Ensuite —&nbsp;**et seulement une fois que le JS est fonctionnel**&nbsp;— on va pouvoir le manipuler pour masquer notre élément.

C'est là où le bât blesse. **Le temps que notre JS soit exécuté, nous voyons l'élément affiché** (même si ça ne dure qu'une fraction de seconde).

## La limite du JS

En l'occurrence, c'est son temps d'exécution —&nbsp;extrêmement dépendant de la machine et du navigateur de l'utilisateur.  
Plusieurs pistes existent pour palier ce problème&nbsp;:

1.  on peut par exemple **exécuter le plus tôt possible** le test d'activation du JS, qui consiste à transformer une classe `no-js` posée sur la balise `<html>`… Mais dans certains cas, ce la ne suffit pas&nbsp;;
2.  on peut également **abdiquer**&nbsp;: après tout, plus aucun référentiel n'exige d'alternative à JS&nbsp;;
3.  on peut aussi se la jouer _old school_ en **dupliquant le contenu masqué** dans une balise `<noscript>` —&nbsp;mais on ne se sent pas vraiment propre, après ça.

Comme le signale Lionel dans les commentaires, conserver la modification des classes dès le `<head>` reste une étape incontournable pour optimiser ce mécanisme. Un exemple&nbsp;:

```javascript

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');
```

Et en bonus, **on peut réfléchir et utiliser CSS**.

## Les styles à la rescousse

La base du fonctionnement que je propose est l'astuce utilisée par [Nicolas Hoffmann](https://www.nicolas-hoffmann.net/source/) sur [ses composants jQuery accessibles](https://a11y.nicolas-hoffmann.net/). _Grosso modo_, il effectue une transition sur `max-height` pour la partie animée, et sur `visibility` avec un délai pour **masquer réellement** le contenu[\[1\]](https://www.ffoodd.fr/avec-ou-sans-js/#note-1 "Il explique tout ça très bien dans la documentation de ses divers composants.").

J'aime beaucoup cette technique, dont le seul inconvénient —&nbsp;à mon avis&nbsp;— est d'animer `max-height`, ce qui nous oblige à utiliser un [chiffre magique](https://www.ffoodd.fr/decouvrez-le-calcul-magique/) pour une hauteur maximum inatteignable.

### L'état de base

Voici l'état de base de ma navigation&nbsp;:

```css
[id="nav"] {
  transform: translate3d(-100%, 0, 0);
  transition:
  transform 300ms ease-in 50ms,
  visibility 0s linear 300ms;
  visibility: hidden;
  width: 18.75rem;
  will-change: transform, visibility;
}
```

Elle est décalée vers la gauche de la totalité de sa largeur, afin de **sortir de l'écran**&nbsp;; et est masquée.

Notez que nous avons un délai sur nos deux transitions. Pour le moment, seul celui sur `visibility` est important, puisqu'il permet de faire coïncider le changement de visibilité avec la durée de la transformation.

### L'ouverture grâce à JS

Là, c'est tout bête. Le JS ajoute une classe `.is-opened` à la navigation, je m'en sers pour accrocher mes styles&nbsp;:

```css

.is-opened {
  transform: none;
  transition-delay: 0ms;
  visibility: visible;
}
```

Et pour ceux qui me connaissent, je désamorce une question&nbsp;: je n'utilise pas `:not([aria-hidden])`, car cet attribut est ajouté _via_ JS. Ainsi la navigation commencerait à apparaître au chargement, puis serait masquée après l'exécution du script —&nbsp;**exactement le comportement qu'on cherche à corriger**.

### Et si JS est désactivé

C'est là qu'on rigole&nbsp;! Lisez plutôt, je vous explique ensuite&nbsp;:

```css

@keyframes no-js {
  to {
  transform: none;
  transition-delay: 50ms, 0ms;
  visibility: visible;
  }
}

.no-js [id="nav"] {
  animation: 300ms ease-in 300ms forwards no-js;
}
```

Dans un premier temps, je définis la règle `@keyframes` pour mon animation. Son seul contenu est **l'état final**&nbsp;: pas de translation, l'élément est visible, et les délais de transition sont ajustés. [En terme de support](http://caniuse.com/#search=keyframes) on abandonne donc IE9 et ses aïeux, ainsi qu'Opéra Mini.

Dans un second temps, j'applique cette animation sur la navigation lorsque la balise `<html>` porte la classe `.no-js`. C'est sa classe par défaut, qui n'est retirée que si JS est activé.

Pour éviter que l'animation ne se joue pendant le chargement de la page, je lui intime l'ordre de **patienter** 300 millisecondes et de **durer** 300 millisecondes —&nbsp;soit un délai généralement suffisant pour que JS ait magouillé les classes sur `<html>`.

Et ceux qui ont déjà joué avec les animations le savent, elles reviennent par défaut à l'état initial (soit dans notre cas, le menu masqué). Bien sûr, ça ne va pas&nbsp;: j'ai donc précisé grâce au mot-clé `forwards` que l'animation devait **conserver son état final**.

Et voilà&nbsp;! **On profite en sus d'une bien jolie animation qui fait entrer notre navigation dans l'écran** au lieu de la fuir. Et une page animée avec JS désactivé, je trouve ça cool. 🙂

## Démonstration

Si vous êtes curieux de voir ce que ça donne ou de jouer avec, j’ai monté un [CodePen de démonstration](http://codepen.io/ffoodd/pen/apGqpQ) dans lequel vous pourrez lire le code.

Pour jouer avec le JS désactivé, vous devrez [consulter la vue complète](http://codepen.io/ffoodd/full/apGqpQ/)[\[2\]](https://www.ffoodd.fr/avec-ou-sans-js/#note-2 "CodePen affiche un bien joli message si vous désactivé JavaScript.").