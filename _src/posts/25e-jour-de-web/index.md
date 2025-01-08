---
layout: "template/post.njk"
title: "25e jour de web"
date: "2025-01-08"
permalink: "25e-jour-de-web/index.html"
excerpt: "Pour la deuxième année consécutive, je me suis occupé au sein de l’association Paris Web de l’intégration graphique du thème annuel des [24 Jours de Web](https://www.24joursdeweb.fr/), le calendrier de l’avent des gens qui font le web d’après."
description: "Les 24 Jours de Web viennent de se terminer. Je vous raconte les péripéties de l’intégration du thème annuel&nbsp;?"
tags: ["posts"]
commentsOpen: "true"
---

C’est un exercice très intéressant, car nous avons deux contraintes très spécifiques pour le thème visuel annuel&nbsp;:

1. **le format calendrier**&nbsp;: 24 cases à ouvrir, une par jour… 
2. **l’illustration**, réalisée bénévolement après un appel sur nos différents réseaux sociaux —&nbsp;et généralement reçue moins de quinze jours avant l’ouverture du calendrier&nbsp;!

Et plus les contraintes sont exotiques, plus les solutions sont astucieuses&nbsp;!

C’était une très chouette expérience [en 2023](https://www.24joursdeweb.fr/2023), avec l’illustration de [Sophie Rocher](https://sophie-rocher.com/) qui m’a inspiré un calendrier tout en fenêtres et en lumières. Je me suis beaucoup amusé et vous invite à jeter un œil aux CSS.

Pour 2024, [Laure Février](https://laurefevrier.myportfolio.com/) nous a gratifiés d’une illustration riche en décorations&nbsp;: boules de Noël, couleurs, chats et lutins&nbsp;! Maintenant, à moi de jouer pour en extraire la substantifique moelle et réaliser une intégration cohérente qui tire parti et mette en valeur l’illustration de Laure.

**Note**&nbsp;: certains exemples de code ne sont pas présents dans l’article, je vous encourage à inspecter le code directement [sur site](https://www.24joursdeweb.fr/).


## Le calendrier

### Les Blobs

Le premier élément qui nous a plu dans cette nouvelle illustration, c’est le «&nbsp;cadre&nbsp;» offert par la forme en arrière-plan. Appelons-le Blob.

Je savais en voyant cette forme que je pourrais mobiliser une astuce CSS rarement utile&nbsp;: le fait que `border-radius` est en réalité une propriété raccourcie. On trouve parfois une utilisation avec quatre valeurs, une pour chaque angle —&nbsp;par exemple `border-top-left-radius`… Mais saviez-vous que chacune de ces valeurs est également une propriété raccourcie, qui peut prendre deux valeurs&nbsp;?

La logique est simple&nbsp;: avec une seule valeur, vous définissez le rayon du cercle&nbsp;; avec deux valeurs, vous définissez les axes horizontaux et verticaux d’une ellipse.

Et si vous comptez bien, ça signifie que vous pouvez utiliser huit valeurs distinctes dans la propriété `border-radius`, et c’est drôlement pratique pour dessiner des formes irrégulières sans passer par un `path`.

Et puisque je suis un flemmard notoire, j’ai farfouillé les internets pour trouver un générateur de formes irrégulières basées sur `border-radius`. Évidemment, j’en ai trouvé plusieurs, et j’ai utilisé [celui de Milos Lekovic](https://codepen.io/LekovicMilos/pen/omVzYv) que [j’ai fourché pour définir une couleur d’arrière-plan](https://codepen.io/ffoodd/pen/RNbVRmR) au lieu d’appeler une image qui retourne une 404.

Ça donne quelque chose comme ça, répété pour chacune des 24 cases du calendrier&nbsp;:

```css
.calendar > :first-child {
	border-radius: 65% 35% 34% 66% / 58% 30% 70% 42%;
}
```


### Les boules de Noël

C’est le second élément le plus marquant dans l’illustration. Leur forme circulaire et leurs couleurs sont très présentes, et clairement un élément visuel sur lequel capitaliser. Il y en a quatre, et cette fréquence m’a immédiatement fait comprendre comment réutiliser cet élément visuel&nbsp;: **les numéros de chaque case**, symbole fort du calendrier de l’avent.

Il existe des solutions simples pour les quelques éléments de langages visuels présents dans les boules de l’illustration&nsp;:

* C’est un cercle&nbsp;: on utilise la même valeur pour la hauteur et la largeur afin d’avoir un carré parfait, puis `border-radius: 50%` pour un cercle.
* C’est une sphère&nbsp;: un `radial-gradient()` pour l’arrière-plan et `box-shadow` pour renforcer l’effet visuel de relief font très bien le boulot.
* C’est brillant&nbsp;: un `conic-gradient()` couplé à un `radial-gradient` en `mask-image` sur un pseudo-élément donne un reflet suffisamment convaincant.
* C’est coloré&nbsp;: la fonction `color-mix()` permet de décliner la couleur de la boule et de ses effets en fonction d’une seule couleur en entrée.

```css
.day-number {
	background: var(--color-number-bg) radial-gradient(circle at 66% 66%, #fff9, transparent 50%);
	border-color: color-mix(in srgb, var(--color-number-bg), #fff 50%);
	box-shadow: 0 0 1rem #fff;
	color: color-mix(in srgb, var(--color-number-bg), #000 50%);
}

.day:nth-child(3n + 1) { --color-number-bg: #eb8181; }
.day:nth-child(3n + 2) { --color-number-bg: #439d7d; }
.day:nth-child(3n + 3) { --color-number-bg: #ffed9f; }

.day-number::before {
	background: conic-gradient(transparent 10%, #fff 33% 66%, transparent 90%);
	border-radius: 50%;
	mask-image: radial-gradient(transparent 60%, #0003 60%);
}
```

L’accroche de la boule est une version simplifiée de celle dans l’illustration, simplement appliquée en image d’arrière-plan sur un pseudo-élément.

Et voilà, de jolies boules de Noël pour décorer notre calendrier&nbsp;!

---

C’est déjà très joli, mais ces boules suspendues ont clairement **envie de bouger**, non&nbsp;?


## Les animations

Je savais qu’une animation légère était possible —&nbsp;et clairement, il fallait que ça reste très léger pour ne pas donner envie de vomir à tout le monde…

Commençons par un cas simple.

### Les boules de Noël en CSS

Le mouvement de pendule, ou de balancier, est une animation que je n’ai pas eu l’occasion de travailler auparavant. Elle me paraissait relativement complexe, et une bonne candidate pour une technologie d’animation que je n’avais pu utiliser jusqu’à présent&nbsp;: [<em lang="en">motion path</em> en CSS](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_motion_path).

#### <i lang="en">Motion path</i>

C’est une spécification déjà datée, plutôt simple car inspirée de SVG, mais dont le support est disparate. En l’occurrence, l’utilisation de `offset-path` (pour le tracé de l’animation) et `offset-distance` (pour la position sur le tracé) suffit à atteindre la cible, avec un support satisfaisant.

```css
@keyframes balance {
	50% { offset-distance: 26%; }
}

.day-number {
	animation: balance 4s ease-in-out infinite;
	offset-distance: 24%;
	offset-path: ellipse(6.75rem 5rem at 50% -6%);
	offset-rotate: reverse;
	will-change: offset-distance;
}
```

Et voilà une animation de la position (de 24 à 26%) sur un tracé elliptique, qui se répète à l’infini.

Cependant, malgré l’utilisation de `will-change`, cette méthode d’animation est vraiment peu performante et Lighthouse indiquait clairement ce problème, perceptible à l’œil nu.

#### Retour aux transformations

Revenons-en aux basiques des animations CSS performantes&nbsp;: `transform`&nbsp;!

Après quelques nœuds au cerveau, j’ai pu appréhender le mouvement de pendule&nbsp;: c’est effectivement une simple rotation, mais avec un point d’origine éloigné à l’aide d’un `transform-origin: 50% -300%`.

Une rotation légère (de `3deg` à `-3deg`) et un délai différent toutes les trois boules (sur une ligne de 4) rend l’animation très organique, et relativement naturelle.

Une étape supplémentaire aurait pu permettre d’améliorer encore les performances&nbsp;: utiliser les propriétés individuelles de transformation à la place des fonctions (en l’occurrence `rotate` au lieu de `transform: rotate()`). Bien que mise en place, cette modification n’a eu qu’un effet négligeable sur les performances.


### L’entête

L’illustration elle-même, dans l’entête, était livrée au format SVG. C’est chouette car ça permet une grande souplesse dans l’implémentation.

Pour éviter de trop s’éloigner de l’intégration habituelle des thèmes annuels, j’ai conservé l’intégration de l’illustration en CSS via `background-image` et la fonction `url()`. Fort heureusement, des animations déclarées dans le SVG source sont exécutées même dans ce contexte, ce qui permet de travailler dans le fichier source directement.

#### Les animations SVG

Ma première initiative était d’utiliser [les animations SVG SMIL](https://developer.mozilla.org/fr/docs/Web/SVG/SVG_animation_with_SMIL), et notamment [l’élément `<animateTransform>`](https://developer.mozilla.org/fr/docs/Web/SVG/Element/animateTransform) pour animer [l’attribut `rotate`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform#rotate).

Je ne l’avais jamais employé et ai eu du mal à comprendre son fonctionnement, notamment que l’effet s’applique sur le parent et par conséquent que les coordonnées (par exemple, le `x` des rotations dans `values`) devaient correspondre au `transform-origin`.

```svg
<g transform-origin="200 0" transform="translate(-172)">
	<animateTransform values="-0.5 200 0;0.5 200 0;-0.5 200 0" 
										attributeName="transform" type="rotate" 
										dur="4s" repeatCount="indefinite" 
										additive="sum"/>
</g>
```

À noter que pour que les autres transformations (notamment la translation) soient cumulées avec la rotation animée, l’ajout de l’attribut `additive="sum"` est indispensable.

#### Désactiver les animations

On a beau être bénévoles, on essaie de faire au mieux —&nbsp;et en l’occurrence respecter les préférences utilisateur. Dans le cas des animations, le minimum sur le plan technique est d’honorer la <i lang="en">media query</i> `prefers-reduced-motion`.

Dans le cas de cette illustration, nous ne pouvons pas utiliser la méthode JavaScript `svg.pauseAnimations()` puisque le SVG est embarqué via CSS —&nbsp;il n’est pas dans le DOM.

L’astuce que j’ai trouvée dans les bas-fonds des internets est de définir un `display: contents` sur l’élément `<g class="boule">` animé&nbsp;: `<animateTransform>` perd sa cible et devient donc inerte. Ça fonctionne, et ça n’est **que** du CSS&nbsp;!

Cette portion de CSS est embarquée dans le SVG au sein d’un élément `<style>`.

```css
@media (prefers-reduced-motion: reduce) {
	.boule {
		display: contents;
	}
}
```

##### Mais… WebKit

WebKit (le moteur de rendu de Safari, notamment) n’affiche plus du tout les groupes affublés d’un `display: contents`, que ce soit sur Epiphany ou Safari <i lang="en">Technology Preview 209</i>.

C’est [le premier ticket de bug ouvert sur WebKit (en anglais)](https://bugs.webkit.org/show_bug.cgi?id=284634) dans le cadre de ce chantier. Cette astuce n’est donc pas viable pour le moment…

**Re-changement de stratégie**&nbsp;: on va utiliser des animations et transformations **CSS, dans le SVG, dans le CSS**&nbsp;! Ça n’est pas aussi compliqué qu’il y parait.

#### CSS dans SVG dans CSS

L’animation des boules est récupérée et adaptée aux groupes correspondants dans le SVG, en composant les transformations pour conserver le `translate` indispensable au bon placement des groupes dans l’illustration.


```css
.boule {
	transform-origin: 50% 0%;
	transform: var(--translate);
}

@media (prefers-reduced-motion: no-preference) {
	@keyframes balance{
		50% { transform: var(--translate) rotate(-3deg); }
	}

	.boule {
		animation: balance 6s ease-in-out infinite;
		transform: var(--translate) rotate(3deg);
	}
}
```

La translation étant propre à chacun des groupes, elle est définie à l’aide d’une propriété personnalisée sur l’élément lui-même —&nbsp;à l’instar du délai de l’animation&nbsp;:

```html
<g class="boule" style="--translate: translateX(-172px); animation-delay: .5s">
```

##### L’origine des animations CSS dans un SVG

Mais là, **surprise**&nbsp;: les boules semblent suivre la même animation, comme si l’origine de la rotation était la même pour les quatre&nbsp;!

Après quelques recherches, j’ai découvert qu’il fallait indiquer [`transform-box: fill-box`](https://developer.mozilla.org/fr/docs/Web/CSS/transform-box#fill-box) aux éléments dans un SVG pour que `transform-origin` ait un effet sur eux, sans quoi c’est en réalité la `viewBox` qui sert d’origine à toutes les transformations CSS au sein d’un SVG&nbsp;! Il suffisait de le savoir…

```css
.boule {
	transform-box: fill-box;
}
```

Et ça fonctionne&nbsp;!

#### Oui, mais…

En cherchant à vérifier le respect des préférences liées aux animations, j’ai pu constater que les émulateurs proposés dans les outils de développement de WebKit et Chromium ne propageaient pas l’état de la préférence aux SVG embarquées dans un `background-image` CSS —&nbsp;alors que c’est fonctionnel avec la préférence modifiée sur le système.

Voici donc [le bug numéro deux chez WebKit (en anglais)](https://bugs.webkit.org/show_bug.cgi?id=283894) et [le même bug chez Chromium (en anglais)](https://issues.chromium.org/issues/381770607).

Ce sont les derniers, promis.

#### <i lang="en">Plot twist</i>&nbsp;: les performances

Je récapitule&nbsp;:

1. Nous avons des animations qui fonctionnent en CSS, à la fois côté CSS global et à l’intérieur du SVG de l’illustration&nbsp;;
2. Elles respectent les préférences utilisateur&nbsp;;
3. Et utilisent les techniques d’animation recommandées pour de bonnes performances.

Pas mal, non&nbsp;?

Mais alors… **Pourquoi l’animation de l’illustration semble grippée**, sur Chromium et WebKit&nbsp;?

Figurez-vous que c’est un choix délibéré de ces moteurs de rendu. Il semble que l’utilisation d’animations CSS dans un SVG embarqué en CSS soit trop peu courant pour faire l’effort de les optimiser lors du rendu. **Je suis le seul à faire ce genre de choses, alors&nbsp;?**

Après une micro-formation avec Anthony Ricaud sur les outils de développement de Chromium, nous avons pu identifier le problème et avancer une correction possible&nbsp;: sortir les éléments animés du SVG principal pour que les animations soient effectivement dans le CSS global, et pas embarquées dans le SVG.

En exportant les quatre éléments à animer, j’ai pu les inclure dans des pseudos-éléments sans avoir à modifier le DOM. Parfait&nbsp;!

Reprendre les animations revenait presque à faire un copier-coller. J’ai surtout eu à **ajuster les dimensions et positions des boules pour chaque point de rupture**&nbsp;; jusqu’à présent, jouer avec les `background-size` et `background-position` suffisaient, mais ce n’est plus le cas. 

C’est assez verbeux (trop pour être affiché ici), mais ça permet en contrepartie de charger moins de SVG sur les petits écrans qui ne les affichent pas.


## Au-delà des préférences

Jusqu’à présent, les animations ne sont actives que si l’utilisateur n’a pas exprimé de préférence qui s’y oppose. Mais idéalement, chaque utilisateur doit pouvoir interrompre ou déclencher les animations sans devoir passer par les réglages de son système.

### Un bouton pour les interrompre toutes

Puisque toutes nos animations sont implémentées en CSS, une propriété magique permet d’en définir l’état&nbsp;: `animation-play-state`.

La fonctionnalité elle-même est plutôt simple, en s’appuyant sur un bouton.

```html
<button type="button" class="hero-button" aria-pressed="false">
	Stopper les animations
</button>
```

#### Une pincée de JavaScript

Difficile de s’en passer pour écouter le clic et mettre à jour une classe `.reduced-motion` sur le `<body>`, tout comme l’état du bouton avec `aria-pressed`.

```js
const pauseAnimations = () => {
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const button = document.querySelector('.hero-button');
    button.addEventListener('click', () => {
      document.body.classList.toggle('reduced-motion');
      const pressed = button.getAttribute('aria-pressed') === 'true' || false;
      button.setAttribute('aria-pressed', !pressed);
    }, { passive: true });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  pauseAnimations();
});
```

#### Un état personnalisé en CSS

Une propriété personnalisée permet de gouverner l’état de toutes les animations de façon cohérente.

```css
@media (prefers-reduced-motion: reduce) {
	.hero-button { display: none; }
}

@media (prefers-reduced-motion: no-preference) {
	.boule {
		animation: balance 6s ease-in-out infinite var(--state, running);
	}
	
	.reduced-motion {
		--state: paused;
	}
}
```

Rien de bien méchant finalement, mais… ça prend du temps&nbsp;! Et clairement, ça pourrait toujours être amélioré&nbsp;!

## Bilan

Ce travail est vraiment un <i lang="en">rush</i>, avec seulement quelques jours (travaillés de surcroît) pour proposer une intégration créative qui soit d’une qualité suffisante pour ne pas subir l’ire d’un lectorat exigeant, et parfois intransigeant.

Certaines fonctionnalités sont arrivées tardivement, après le lancement du calendrier —&nbsp;j’avais enchaîné plusieurs nuits très courtes avant le lancement pour finir dans les temps, et ça n’a pas suffi.

Mais **j’ai pu terminer en profitant des conseils des lecteurices, auteurices et camarades de discussion sur IRC** —&nbsp;qui furent très enrichissants&nbsp;: merci à tous ceux qui ont participé, j’espère qu’ils se reconnaitront&nbsp;!

**Post-Scriptum**&nbsp;: cet article est focalisé sur le défi de l’intégration du thème annuel, mais nous avons aussi fait le choix en amont de changer de CMS. Grâce à un impressionnant travail de Joachim Robert (qui s’est également fendu d’[un article rétrospectif sur la migration vers Kirby](https://blog.professeurjoachim.com/billet/2024-11-22-30-jours-de-kirby-pour-24-jours-de-web) que je vous encourage à lire), c’est un succès —&nbsp;mais ça ajouté au défi puisque nous avons eu beaucoup d’ajustements à faire sur l’intégration commune, notamment sur l’affichage du contenu riche des articles.
