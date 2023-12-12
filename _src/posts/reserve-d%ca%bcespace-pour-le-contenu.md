---
title: "Réserve d’espace pour le contenu"
date: "2015-12-03T12:30:49"
modified: "2015-12-09T09:28:45"
permalink: "reserve-d%ca%bcespace-pour-le-contenu/index.html"
description: [""]
excerpt: "Cet effet consiste à utiliser en guise dʼindicateur de chargement un élément graphique ayant les mêmes caractéristiques visuelles — hauteur, largeur, lignes, blocs… — que le contenu en cours de chargement. Vous le connaissez probablement déjà car cʼest ce quʼutilisent Facebook et Medium, entre autres. Et cʼest quand même vachement mieux quʼun gif qui tourne en rond. [Lire la suite de « Réserve d’espace pour le contenu » →](https://www.ffoodd.fr/reserve-d%ca%bcespace-pour-le-contenu/)"
format: "standard"
alternate: [""]
---
C’est ce quʼutilisent notamment Facebook et Medium, dont le contenu respecte un gabarit constant. En terme dʼinterface, ça me semble **vraiment plus agréable** que le classique _ouroboros_.

Et figurez-vous que pour le moment, tous **les retours sont extrêmement positifs**. En session de test utilisateurs, la plupart des testeurs lʼont remarqué et ont tenu à le signaler comme un élément «&nbsp;très agréable&nbsp;». Moi qui pensait mʼamuser à suivre un effet de mode à la mords-moi-le-nœud et être passé du côté obscur de la Force, me voilà confondu. Cet effet semble conférer une réelle valeur ajoutée à **lʼexpérience utilisateur**, alors jʼaie envie de vous montrer ce quʼil y a sous le capot afin de partager et dʼaméliorer encore tout ça.

## Quelques recherches pour démarrer

Bon, bizarrement, je nʼai pas trouvé beaucoup de ressources pour faire ce truc. La plus visible est [une expérimentation sur codePen](http://codepen.io/Mestika/pen/ByNYBa) qui est franchement sale. Une soupe de `div`, chacune positionnée en absolu et calée au pixel près. En revanche lʼarticle de lʼapprenti magicien est **relativement** intéressant&nbsp;: «&nbsp;[_Facebook content placeholder deconstruction_](http://cloudcannon.com/deconstructions/2014/11/15/facebook-content-placeholder-deconstruction.html)&nbsp;». Très relativement, hein. Ça manque cruellement de référence donc si vous avez, elles mʼintéressent&nbsp;!

En revanche il lie un autre article un peu plus intéressant qui aborde le sujet de lʼexpérience utilisateur&nbsp;: «&nbsp;[_Making Wait Times Feel Shorter_](http://usabilitypost.com/2009/01/23/making-wait-times-feel-shorter/)&nbsp;» de Dmitry Fadeyev. Jʼen retiens surtout la dernière phrase&nbsp;:

> This isn’t just simple courtesy, watching the progress bar move makes time fly faster.

Je traduis sommairement&nbsp;: ce nʼest pas une simple question de courtoisie, regarder lʼindicateur de progression fait passer le temps plus vite. Ma foi, ça a du sens. Dans cet article, lʼauteur préconise également de spécifier le délai dʼattente quand cʼest possible afin que lʼutilisateur **sache à quoi sʼattendre**. Et bien cet effet de faux contenu en attendant le contenu réel donne une indication plus précise du format de données que lʼon attend et nous permet dʼ**anticiper la lecture du contenu** et de **nous projeter dans son parcours**.

## Faire plus simple

### Utiliser un élément graphique

Tout ça est bien joli, mais niveau code cʼest quand même assez moyen (à mon goût en tout cas). Par exemple nous parlons ici dʼun effet purement graphique —&nbsp;voire esthétique&nbsp;— alors pourquoi utiliser des éléments HTML pour le fabriquer&nbsp;? Un élément graphique semble plus adapté, et ô comble de joie il est possible dʼutiliser des images en HTML depuis 1994.

### Prévoir une alternative

Cʼest un **visuel porteur dʼinformations**, et à ce titre il doit disposer dʼune **alternative textuelle pertinente**. Je vous laisse (re)lire le critère associé du RGAA qui, comme pour témoigner de son importance, porte le doux nom de [critère 1.1](http://references.modernisation.gouv.fr/referentiel-technique-0#title-critre-11-a-chaque-image-a-t-elle-une-alternative-textuelle-). Ce point nʼest _a priori_ pas très complexe à mettre en œuvre.

### Faire passer le temps

Il ne faudrait pas omettre que lʼobjectif est avant tout de faire patienter lʼutilisateur de la manière la plus agréable possible. Pour cela nous évitons le (très frustrant) petit disque qui tourne en rond, cʼest déjà bien. Mais **si lʼexpérience peut sʼavérer agréable**, ce serait encore mieux&nbsp;! À cette unique fin, je vais suivre les exemples de Facebook et Medium qui ont mis en place un effet de balayage lumineux afin de cadencer le temps dʼattente.

## Super&nbsp;! Ça donne quoi&nbsp;?

### Créer lʼimage dʼattente

Pour démarrer, on va choisir un contenu quʼon pourrait attendre. Jʼen ai choisi un assez connu et avec un gabarit familier et reconnaissable&nbsp;: la carte de profil sur Twitter.

![Ma carte de profil sur Twitter](/images/2015/12/profil-twitter-300x202.png)

La carte de profil indique le nom, le pseudonyme et l’avatar Twitter, mais aussi les nombres de tweets, d’abonnements et d’abonnés.

Cʼest donc la-dessus que va se baser la création du visuel dʼattente. Sur le principe, je me contente de créer un bloc en aplat gris par élément, afin de **représenter sa masse visuelle**[\[1\]](https://www.ffoodd.fr/reserve-d%ca%bcespace-pour-le-contenu/#note-1 "Cʼest le même principe que le gris typographique en composition de page."). Étant donné que je suis flemmard, jʼimporte simplement une capture du bloc à reproduire dans Illustrator, et redessine «&nbsp;par-dessus&nbsp;» chaque bloc. Ça permet entre autre chose de **conserver un ratio de un pour un**, ce qui présente un fort intérêt dans ce cas.

![Gabarit de carte de profil twitter](/images/2015/12/twitter-placeholder-300x201.png)

Gabarit de carte de profil twitter représenté en masses colorées

Bon, jʼadmets également avoir exporté un SVG plutôt quʼune bête image bitmap. Pour tout vous dire ça nʼest pas nécessairement le meilleur choix, étant donné que pour une image aussi simple **le SVG est plus lourd** quʼun PNG bien optimisé et quʼ**on perd nécessairement en support navigateur**.

### Implémenter une alternative accessible

Pour celui-ci aucun mérite, puisque lʼaccessibilité des SVG commence à être bien documentée. Je vous laisse farfouiller un peu les artères du web pour trouver votre bonheur —&nbsp;personnellement jʼai abouti à ceci&nbsp;:

```markup

<svg viewBox="0 0 320 215" width="320" height="215"
   aria-labelledby="title desc" role="img"
   xmlns="http://www.w3.org/2000/svg"> 
  <title id="title">Chargement en cours…</title>
  <desc id="desc">La carte de profil est en chemin !</desc>
  <path role="presentation" d="…" />
</svg>
```

Je vous passe les détails sordides des multiples `<path>` dans le SVG, vous pourrez jouer avec dans la démo —&nbsp;et accessoirement, cʼest une partie que vous devrez personnaliser, donc… Mais normalement ce magnifique assortiment de `<title>` et `<desc>` liés au SVG _via_ `aria-labelledby` fait lʼaffaire et rend le tout intelligible.

### Implémenter une animation

#### On est dans du SVG

À lʼaube du premier jour, jeune et fougueux que jʼétais, je me suis dit «&nbsp;Yay, dans du SVG, je vais enfin pouvoir jouer avec SMIL&nbsp;». _Que nenni_&nbsp;!

Deux (plutôt) bonnes raisons de sʼen dispenser&nbsp;:

1.  [Le support est très moyen](http://caniuse.com/#search=SMIL), notamment absent des navigateurs Microsoft&nbsp;;
2.  Chrome et Opéra lancent (depuis deux ou trois versions) une alerte dans la console lorsquʼon utilise SMIL, quʼils considèrent déprécié et dont ils vont abandonner le support un beau matin.

Ça nʼest guère glorieux, même si [un charmant tutoriel en anglais](http://designmodo.com/animate-svg-gradients/) me montrait quʼon pouvait facilement animer un dégradé en remplissage dʼun SVG. Dommage.

#### Mais on fait du CSS

Cʼest donc finalement vers les animations CSS que je dois me tourner. Cʼest moins rigolo puisque je connais déjà, mais au moins [le support est excellent](http://caniuse.com/#search=animation).

En revanche **impossible dʼanimer _via_ CSS le remplissage dʼun SVG**. Le SVG sera donc rempli en aplat, et il va falloir se débrouiller autrement pour lʼeffet de balayage. Voilà comment jʼai réssolu la chose&nbsp;:

* un dégradé linéaire allant du transparent au transparent —&nbsp;afin de profiter du merveilleux SVG derrière&nbsp;— en passant par une étape de blanc pour apporter la lumière en ce bas-monde&nbsp;;
* une dimension dʼarrière-plan pour ajuster la mise en scène du dégradé&nbsp;;
* et finalement, une animation dont la seule préoccupation est de déplacer lʼarrière-plan.

Cʼest donc un poil plus complexe que de simplement remplir le SVG avec un dégradé qui sʼanime tout seul, mais bon&nbsp;! En revanche il ne vous aura probablement pas échappé quʼil nous faut cette animation **devant** le SVG. Et pour cela un pseudo-élément serait fort agréable. Malheureusement [SVG est un élément remplacé](https://github.com/ffoodd/a11y.css/blob/master/README-fr.md#cas-particuliers-et-problèmes-connus), ce qui empêche de lui appliquer un pseudo-élément. Pour pouvoir implémenter lʼanimation, il nous faut donc un élément conteneur qui portera le pseudo-élément (ce même conteneur qui pourrait fort bien vous servir dans un contexte adaptatif ou simplement pour la mise en page).

## La démonstration

En supposant que vous utilisez une division comme conteneur, voici les styles du pseudo-élément&nbsp;:

```css

div::after {
  animation: placeholder 2s linear infinite;
  background-image: 
  linear-gradient( 
  110deg, 
  rgba( 255, 255, 255, 0) 10%, 
  rgba( 255, 255, 255, .33) 30%, 
  rgba( 255, 255, 255, 0) 60% 
  );
  background-size: 20em 13.4375em;
  bottom: 0;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
}
```

Un détail peut vous surprendre&nbsp;: je nʼutilise pas le mot-clé `transparent` mais la notation `rgba( 255, 255, 255, 0 )`. Peut-être le savez-vous déjà mais le mot-clé qui semble définir la transparence est en réalité une notation raccourcie de `rgba( 0, 0, 0, 0 )`, [comme le précise la spécification du module «&nbsp;Couleurs&nbsp;» de CSS3](http://www.w3.org/TR/css3-color/#transparent). Ça nʼa lʼair de rien comme ça, mais ça a son importance si vous appliquez un dégradé —&nbsp;disons du blanc au transparent, par exemple&nbsp;— et que vous regardez le résultat sur Safari&nbsp;: il interpole le dégradé en tendant vers le noir (ce qui est relativement logique) et vous donne donc un intermédiaire immonde entre votre blanc nacré et votre transparence parfaite. Un gros pâté noir, quoi. **Bref, cʼest moche**. Utiliser le blanc avec une opacité nulle résout facilement ce travers.

Ensuite pour animer le dégradé, cʼest plutôt simple puisque vous avez déjà vu lʼappel à lʼanimation `placeholder`, pour une durée de deux secondes et en boucle. Elle se contente de déplacer le fond dʼune distance équivalente à la largeur du bloc, afin de générer une véritable boucle visuelle.

```css

@keyframes placeholder {  
  from { 
  background-position: -10em 0; 
  } to { 
  background-position: 10em 0; 
  }
}
```

**Et voilà&nbsp;!**

Si vous souhaitez jouer avec ou le reprendre, [vous trouverez le tout sur Dabblet](http://dabblet.com/gist/466b6a47db1b4ac14ecb). Rien de bien complexe, mais cʼest tellement simple et efficace quʼil serait dommage de sʼen priver&nbsp;😇