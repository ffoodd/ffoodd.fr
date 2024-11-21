---
layout: "template/post.njk"
title: "Les astuces derrière «&nbsp;l’Invasion du HTML mutant&nbsp;»"
date: "2024-11-18"
modified: "2024-11-18"
permalink: "astuces-ateliers-html-mutant/index.html"
excerpt: "L’atelier donné au devFest Nantes 2024 fut l’occasion d’explorer des astuces méconnues&nbsp;— que je partage avec plaisir&nbsp;!"
description: "Le 17 octobre dernier, j’animais au devFest Nantes un atelier intitulé «&nbsp;L’Invasion du HTML mutant&nbsp;»."
tags: ["posts"]
commentsOpen: "true"
draft: true
---

Un atelier devant par définition impliquer les participants, j’ai fait le choix de créer un mini-jeu en guise de support. C’est [un site statique disponible en ligne](https://www.ffoodd.fr/devfest.2024/jeu/), [open-sourcé sur GitHub](https://github.com/ffoodd/html-mutant) —&nbsp;pour que vous puissiez l’améliorer&nbsp;!

Quand je dis statique, c’est statique&nbsp;: le dépôt a une unique dépendance, [servor](https://github.com/lukejacksonn/servor), chargée de fournir un serveur HTTP basique pour travailler en local&nbsp; et servor n’a elle-même aucune dépendance. Le reste n’est que HTML, CSS et JavaScript.

Ça m’a permis de revenir aux fondamentaux, considérablement gagner en efficience&nbsp;; mais surtout… découvrir tout un tas de trucs et astuces&nbsp;!

## La mécanique du jeu

En démarrant le jeu, vous commencerez par personnaliser votre personnage. Le seul objectif de cette étape est de découvrir la structure visuelle d’un niveau, en vous permettant de vous impliquer personnellement dans le jeu. Les valeurs choisies seront appliquées dès que possible à tous les personnages du jeu, dans une sorte de représentation en miroir.

Après avoir choisi votre personnage, un niveau d’entraînement vous familiarise avec la mécanique très simple du jeu&nbsp;: une portion de code à compléter et soumettre, exécutée en direct, qui affecte la zone envahie progressivement par des mutants&nbsp;! Ce code est dans la plupart des niveaux les options passées à un `mutationObserver`, mais parfois aussi dans la fonction de rappel.

En cas d’échec comme en cas de réussite, une fenêtre modale vous informera. Parlons-en, de cette fenêtre modale&nbsp;!

## Les particularités de l’élément `<dialog>`

J’en parlais [en 2022 à Paris Web](https://www.paris-web.fr/2022/conferences/decouvrez-le-bon-html-et-economisez-du-js-et-du-css.php) puis [au devFest Nantes](https://devfest2022.gdgnantes.com/sessions/decouvrez_le_bon_html_et_economisez_du_js_et_du_css) dans mon sujet «&nbsp;[Découvrez "&nbsp;le bon HTML&nbsp;" et économisez du JS et du CSS&nbsp;](https://www.ffoodd.fr/devfest/#slide-1)», [l’élément `<dialog>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/dialog) est extrêmement intéressant et devrait à terme supplanter toutes els implémentations de fenêtres modales dans les différentes bibliothèques de composants.

Dans l’atelier, je m’en sers en plusieurs endroits&nbsp;:

1. pour afficher les règles du jeu dans l’écran d’accueil&nbsp;;
2. pour interrompre un niveau, quand le nombre de mutants dépasse la centaine&nbsp;;
3. pour informer d’un échec lors d’une soumission de code qui ne fonctionne pas&nbsp;;
4. pour informer de la réussite, dans le cas contraire —&nbsp;et permettre de passer au niveau suivant.

### Ouvrir la fenêtre

La plupart sont ouvertes programmatiquement, en réaction à un événement. Rien de plus simple&nbsp;: il suffit de récupérer une référence à l’élément `<dialog>` à l’aide de `querySelector()` ou une référence à un identifiant via l’accès aux propriétés nommées, ou [<i lang="en">named properties access</i> (en anglais)](https://html.spec.whatwg.org/multipage/nav-history-apis.html#named-access-on-the-window-object:html-elements-2), et d’invoquer [la méthode `showModal()` (sur MDN, en anglais)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal).

```js
document.querySelector('dialog').showModal();
```

#### Sans JavaScript externe

Une exception toutefois, pour éviter d’ajouter un écouteur d’événement inutile&nbsp;: la fenêtre des règles du jeu est invoquée grâce à un gestionnaire d’événement HTML `onclick`&nbsp;:

```html
<button type="button" onclick="rules.showModal()">Règles du jeu</button>
<dialog id="rules" role="dialog" aria-label="Règles du jeu"></dialog>
```

##### Aparté&nbsp;: la projection des identifiants HTML en objets globaux

Dans cet exemple, j’invoque l’ouverture de la fenêtre modale avec `rules.showModal()`, sans avoir défini la variable `rules`. Comment est-ce possible&nbsp;? En résumé, tout élément porteur d’un attribut `id` devient mécaniquement une propriété globale de l’objet `window`, et devient donc accessible directement par son nom. C’est spécifié sous le joli nom de [<i lang="en">Named Access on Window Object</i> (en anglais)](https://html.spec.whatwg.org/multipage/nav-history-apis.html#named-access-on-the-window-object).

C’est drôlement pratique, non&nbsp;? Figurez-vous que c’est aussi un vecteur d’attaque méconnu faisant partie d’un groupe sobrement intitulé [<i lang="en">DOM clobbering</i> (en anglais)](https://domclob.xyz/). Je vous encourage à parcourir [les recommandations de l’OWASP pour mitiger le <i lang="en">DOM clobbering</i> (en anglais)](https://cheatsheetseries.owasp.org/cheatsheets/DOM_Clobbering_Prevention_Cheat_Sheet.html).

#### Accessibilité

La méthode `showModal()` permet d’ouvrir une fenêtre modale, pas une simple boîte de dialogue —&nbsp;en respectant les exigences en matière d’accessibilité&nbsp;: la <i lang="en">focus</i> est mécaniquement piégé dedans, la fermeture est possible avec la touche <kbd>Échap</kbd>, etc.

### L’arrière-plan

Une fois la fenêtre modale ouverte, on peut s’appliquer à la styler. Là où moult bibliothèques de composants imposent une `<div>` (voire plusieurs) pour servir d’arrière-plan à la fenêtre, la version native est livrée avec [un pseudo-élément `::backdrop`](https://developer.mozilla.org/fr/docs/Web/CSS/::backdrop) qui s’étend naturellement sur tout le <i lang="en">viewport</i> et est promue, avec la fenêtre modale, par-dessus le reste de la page dans ce qui est spécifié sous le nom de <i lang="en">top layer</i>.

Vous n’avez plus qu’à lui appliquer une couleur, une opacité ou que sais-je encore. Dans le jeu, j’ai utilisé une propriété au nom évocateur de [`backdrop-filter`](https://developer.mozilla.org/fr/docs/Web/CSS/backdrop-filter) pour appliquer un effet de flou grisé sur l’arrière-plan.

```css
dialog::backdrop {
	backdrop-filter: grayscale(50%) blur(.25rem);
}
```

### Les dimensions

Ne maîtrisant pas le mode de consultation du jeu, j’ai utilisé un peu de CSS moderne pour la largeur de la fenêtre modale afin qu’elle ait une largeur fluide, mais avec des valeurs minimum et maximum.

```css
dialog {
	max-inline-size: clamp(50vw, 100%, 67.5rem);
}
```

La propriété  `max-inline-size` est la [propriété logique](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_logical_properties_and_values) correspondant à `max-width` dans le cas du Français. Et [la fonction `clamp()`](https://developer.mozilla.org/fr/docs/Web/CSS/clamp) est un petit bijou, dont j’abuse déjà copieusement dans [chaarts (en anglais)](https://ffoodd.github.io/chaarts/pie-charts.html) pour obtenir un pseudo-booléen en CSS en fonction d’une valeur, comme expliqué [slide 27 de ma conférence «&nbsp;Dessine-moi un graphique (en CSS)&nbsp;»](https://www.ffoodd.fr/devquest/#slide-27) donnée au [devFest Nantes 2023](https://devfest2023.gdgnantes.com/sessions/dessine_moi_un_graphique__en_css_/), [TNT #24](https://2024.touraine.tech/talk/ioc2x2nW4KV5zrt69ZQm) et [DevQuest 2024](https://www.devquest.fr/sessions/dessine-moi-un-graphique-en-CSS).

### Fermer la fenêtre

J’ai évoqué la capacité de fermer la modale avec la touche <kbd>Échap</kbd>, mais l’élément `<dialog>` tire d’autres super-pouvoirs du fait d’être natif, et notamment son association avec un élément `<form>`. C’est parfaitement naturel, puisqu’une fenêtre modale permet généralement de valider ou annuler une action associée à une saisie.

C’est pourquoi la valeur [`dialog` est ajoutée à la `method`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/form#method) de soumission d’un formulaire. Elle ne correspond pas à une méthode HTTP comme `get` ou `post`, mais bien à un contexte HTML, et permet de fermer directement la fenêtre modale parente. L’utilisation est fort simple&nbsp;:

```html
<form id="fermer" method="dialog">
```

Et, pour revenir à du HTML à l’ancienne&nbsp;: saviez-vous qu’un bouton à l’autre bout du DOM peut soumettre un formulaire&nbsp;? Il suffit de lui indiquer le formulaire à soumettre&nbsp;:

```html
<button form="fermer">Fermer la fenêtre</button>
```

Et voilà&nbsp;: c’est un bouton de type `submit` qui soumettra le formulaire avec l’identifiant `fermer`, qui lui-même fermera la fenêtre de dialogue. C’est beau, non&nbsp;? Et [cet attribut date (au moins) de 2006, dans les spécifications W3C des Web Forms (en anglais)](https://www.w3.org/TR/2006/WD-web-forms-2-20060821/#formAttribute) dont les premiers brouillons remontent à 2004..


## Les émojis

Pour cet atelier, j’avais besoin de méchants envahisseurs, et de décors. Clairement pas le temps de faire des illustrations à la main, ni les moyens d’acheter des visuels. Une quête sur les internets m’a appris que le type de visuels que je cherchais se nomme les <i lang="en">top down tileset</i>, ces petits décors et personnages généralement en 8-bit avec une perspective écrasée.

À force de regarder des visuels en 8-bit, j’ai fini par faire le lien avec une vieille habitude dans mes supports de conférences&nbsp;: les émojis décoratifs en fin de titre. Bon sang, mais c’est bien sûr&nbsp;! Des émojis&nbsp;!

Les émojis sont formidables. Ce sont des points Unicode, purement textuels, et extrêmement nombreux désormais avec des pelletées de nouveautés dans chaque version d’Unicode. Il y a même des variantes, composées en séquence&nbsp;!

### Les personnages

Le meilleur exemple de séquence Unicode à mon avis sont les personnages&nbsp;: le neutre Personne 🧑 peut devenir un homme 👨 ou une femme 👩 en y ajoutant le point unicode du genre masculin ♂️ ou féminin ♀️, séparé par une jointure de largeur zéro (<i lang="en">zero-width joiner</i>, `‍`).

Pour obtenir un pompier 👨‍🚒, on ajoute simplement un camion de pompier 🚒 à une personne 🧑&nbsp;! N’est-ce pas génial, franchement&nbsp;? Et on peut évidemment y ajouter le genre et le teint.

### La personnalisation

Ainsi [le premier palier permet de personnaliser le genre et le teint du héros](https://www.ffoodd.fr/devfest.2024/jeu/0-0/index.html).

Le formulaire n’est composé que de deux groupes de bouton radio, chacun ayant une valeur correspondant au point Unicode concerné.

```html
<fieldset>
	<legend>Genre</legend>
	<input type="radio" name="genre" id="feminin" value="♀️">
	<label for="feminin">Féminin</label>
	<input type="radio" name="genre" id="masculin" value="♂️">
	<label for="masculin">Masculin</label>
	<input type="radio" name="genre" id="neutre" value="" checked>
	<label for="neutre">Neutre</label>
</fieldset>
```

Lors de la soumission, les deux valeurs sélectionnées sont poussées dans le `localStorage` et ré-employées dès que possible dans la suite du jeu. Pour certains méchants, il suffit de concaténer le caractère du méchant avec les deux sélections&nbsp;: voilà comme un Mage 🧙 devient une Mage au teint sombre 🧙🏿‍♀️.

### Les décors

J’ai un peu lutté avec les décors, demandant même de l’aide à mon camarade Clément Étienne. Et finalement, je suis revenu aux émojis&nbsp;: certains ont un caractère paysager intéressant, il suffit de les agrandir un peu…

<p style="font-size:16rem;margin:0;padding:0;text-indent:0;text-align:center" role="presentation">🏔️</p>

### Les navigateurs

Les navigateurs et systèmes d’exploitation ont leur propre livrée d’émojis, avec des supports disparates et des rendus variés. Pour palier cet écueil, j’ai opté pour une solution très simple technologiquement parlant&nbsp;: une typographie. Et à ce jeu-là, j’avais déjà ma préférée&nbsp;: [la Twemoji-COLR par Mozilla (sur GitHub, en anglais)](https://github.com/mozilla/twemoji-colr).

Les utilisateurs de Mozilla ne verront pas grand chose de nouveau&nbsp;: elle est embarquée dans Firefox sous le nom de Twemoji Mozilla, ce qui permet de tenter d’utiliser la version locale en CSS.

```css
@font-face {
	font-display: swap;
	font-family: 'Twemoji Mozilla';
	font-style: normal;
	font-weight: 400;
	src: local('Twemoji Mozilla'), url('/assets/fonts/Twemoji.woff2') format('woff2');
}
```

Et le tour est joué&nbsp;: les utilisateurs de Firefox ne chargeront rien, et les autres téléchargeront une typographie pour afficher la même chose que Firefox. Choisissez mieux votre navigateur, la prochaine fois&nbsp;!

![Capture d’écran de l’inspecteur de Polices de Firefox, pour la Twemoji Mozilla.](/images/2024/11/firefox.png "Firefox indique bien « système » pour l’origine de la typographie." =348x102)

#### WebKit

Comme souvent quand je prépare un sujet, je me suis heurté à quelques limites des navigateurs. En l’occurrence, WebKit, le moteur de Safari et Epiphany, a des problèmes avec les variantes de teinte de la Twemoji-COLR. J’ai pu ouvrir [un ticket sur leur Bugzilla (en anglais)](https://bugs.webkit.org/show_bug.cgi?id=281739).

## La coloration syntaxique (sans JavaScript)

Dans la mécanique du jeu, des portions de code sont affichées (pour faire un «&nbsp;code à trous&nbsp;») et du code est saisi des éléments `<input>` et `<textarea>`.

Et pour lire et écrire du code, la coloration syntaxique est drôlement pratique et agréable&nbsp;! Mais charger un script tel que [PrismJS (en anglais)](https://prismjs.com/) ou [highlight.js (en anglais)](https://highlightjs.org/) m’a toujours semblé démesuré pour la valeur ajoutée. Le bloc de code se retrouve charcuté dans le DOM, où des `<span>` avec des classes plus ou moins lisibles saucissonnent chaque portion de texte en fonction de son rôle syntaxique. C’est carrément indigeste.

Mais au moment où je préparais cet atelier, Heikki Lotvonen a publié un article ahurissant&nbsp;: [<cite lang="en">Font with Built-In Syntax Highlighting</cite> (en anglais)](https://blog.glyphdrawing.club/font-with-built-in-syntax-highlighting/). C’est à mon sens, une petite révolution&nbsp;: une typographie tirant parti des fonctionnalités OpenType et notamment la table COLR. Fini les tartines de `<span>`, place à un code lisible et propre&nbsp;!

Si les détails d’implémentation OpenType vous intéressent, je vous encourage à lire l’article. De mon côté, je me suis focalisé sur la personnalisation de la palette, rendues possibles en CSS avec [`@font-palette-values` (sur MDN, en anglais)](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-palette-values) et la propriété [`override-colors` (sur MDN, en anglais)](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-palette-values/override-colors).

Voilà ce que ça donne pour le jeu, dans lequel je profite de l’utilisation de propriétés personnalisées CSS pour la gestion des couleurs&nbsp;:

```css
@font-palette-values --syntaxHighlighter {
	font-family: 'FontWithASyntaxHighlighter';
	override-colors:
		0 var(--foreground),
		4 rebeccapurple,
		5 var(--accent),
		7 var(--muted);
}
```

Le rendu est pas mal, non&nbsp;?

![Bloc de code avec coloration syntaxique et champs de formulaires.](/images/2024/11/code.png =480x158)

Et c’est de la pure amélioration progressive&nbsp;: si votre navigateur ne supporte pas la table COLR, la règle `@font-palette-values` ou la propriété `override-colors`, vous aurez juste du texte brut avec la <i lang="en">monospace</i> par défaut.

## Les <i lang="en">Space Invaders</i>

Le dernier point sur lequel je me suis beaucoup amusé, c’est le niveau des aliens. L’émoji <i lang="en">alien monster</i> 👾 ressemble beaucoup, beaucoup, beaucoup aux vaisseaux de <i lang="en">Space Invaders</i>. Pour un jeu d’invasion, ça tombe bien.

J’ai donc voulu assumer la référence&nbsp;: arrière-plan noir, animation des envahisseurs qui défilent vers le bas, et… un compteur de score.

### Les compteurs

Pour ceux qui font du CSS depuis longtemps, vous avez peut-être déjà entendu parler des [compteurs CSS](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_counter_styles/Using_CSS_counters). Notre score correspondra simplement au nombre d’aliens présents.

Cependant, si notre compteur commence à `1` et peut monter jusqu’à `100` —&nbsp;et sachant que le jeu original disposait d’un compteur sur cinq chiffres&nbsp;— le rendu ne sera ni élégant ni une belle citation. Heureusement, [CSS nous permet de personnaliser le style du compteur avec `@counter-style`](https://developer.mozilla.org/fr/docs/Web/CSS/@counter-style).

Pour obtenir un compteur sur cinq chiffres, affichant des `0` avant la valeur du compteur, voici la déclaration utilisée&nbsp;:

```css
@counter-style invasion {
	system: numeric;
	symbols: "0" "1" "2" "3" "4" "5" "6" "7" "8" "9";
	pad: 5 "0";
	speak-as: numbers;
}
```

#### WebKit (encore)

Là aussi, WebKit est limité&nbsp;: les compteurs CSS ne sont pas incrémentés quand on ajoute des éléments au DOM. C’est [Karl Dubost](https://la-grange.net/karl/) qui a ouvert [ce ticket sur Bugzilla (en anglais)](https://bugs.webkit.org/show_bug.cgi?id=281277).

### Les couleurs

Un autre point saillant pour citer visuellement <i lang="en">Space Invaders</i>, ce sont les couleurs vives. L’émoji utilisé vient avec une couleur qu’on ne peut pas surcharger, donc on va devoir l’altérer. Cette technique n’est pas récente, mais extrêmement utile&nbsp;: l’accumulation de [filtres CSS](https://developer.mozilla.org/fr/docs/Web/CSS/filter) pour atteindre la bonne couleur.

C’est un exercice compliqué, et je remercie Barrett Sonntag pour son [générateur de filtres pour convertir du noir vers un code héxadécimal (sur CodePen, en anglais)](https://codepen.io/sosuke/pen/Pjoqqp). La seule contrainte est de commencer par du noir ce qui se résout facilement en appliquant en premier `grayscale(100%) brightness(0%)`.

```css
mu-tant[type="invaders"]:nth-child(1n + 1) {
	filter: grayscale(100%) brightness(0%) invert(15%) sepia(90%) saturate(5339%) hue-rotate(6deg) brightness(96%) contrast(127%);
}

mu-tant[type="invaders"]:nth-child(2n + 1) {
	filter: grayscale(100%) brightness(0%) invert(66%) sepia(82%) saturate(4488%) hue-rotate(88deg) brightness(117%) contrast(129%);
}

mu-tant[type="invaders"]:nth-child(3n + 1) {
	filter: grayscale(100%) brightness(0%) invert(9%) sepia(90%) saturate(7442%) hue-rotate(247deg) brightness(91%) contrast(149%);
}

mu-tant[type="invaders"]:nth-child(4n + 1) {
	filter: grayscale(100%) brightness(0%) invert(91%) sepia(27%) saturate(1428%) hue-rotate(1deg) brightness(110%) contrast(104%);
}
```

C’est verbeux, mais ça fonctionne&nbsp;!

![Des lignes d’aliens aux couleurs vives sur un fond noir, et un score en haut à droite en monospace.](/images/2024/11/invaders.png "Plutôt ressemblant, non ?" =480x457)


## Les <i lang="en">Web Components</i>

Et dire que je n’ai parlé que de HTML et CSS, pour le moment… Je ne m’étendrai pas autant, mais côté JavaScript, je me suis (un peu trop) amusé avec les <i lang="en">Web Components</i>. En résumé&nbsp;:

- `<mu-tant>` est le composant qui affiche un mutant, et gère sa mutation&nbsp;: un changement d’attribut, de valeur d’attribut, de contenu, de descendance, etc. Le tout à intervalle irrégulier, et de façon désordonnée.
- `<code-runner>` étend la fonctionnalité du formulaire pour normaliser les réponses et les envoyer au `<play-ground>`. Pour le clin d’œil, l’événement qui permet de diffuser les réponses est intitulé `voightkampff`.
- `<play-ground>` est le composant le plus critique&nbsp;: il déclenche l’invasion, surveille l’événement `voightkampff`, exécute le code soumis, et donne le verdict (en ouvrant la fenêtre modale appropriée).

Dans tout ça, j’ai énormément joué avec les `mutationObserver`, les intervalles et les minuteurs, les émojis, et la génération de valeurs aléatoires.

## Conclusion

Si tout ce fatras vous rend curieux, je vous invite à visiter [le dépôt du jeu sur GitHub](https://github.com/ffoodd/html-mutant/tree/main) et à en faire ce que vous voulez&nbsp;!

![Niveau 2-1 : le fantôme, dans lequel il faut configurer les options du mutationObserver pour enrayer l’invasion. Les fantômes apparaissent sur un décor nuageux, au milieu duquel émerge un pont ressemblant au Golden Gate, à San Francisco.](/images/2024/11/invasion.png =480x276)

Et si vous vous lancez dans le jeu, je vous invite à consulter [les <i lang="en">slides</i> adossés au jeu](https://www.ffoodd.fr/devfest.2024/#slide-1). En avançant, vous verrez que chaque mutant a son slide. N’avancez pas trop vite, car le <i lang="en">slide</i> suivant donne la réponse…

Faites chauffer votre inspecteur&nbsp;!

