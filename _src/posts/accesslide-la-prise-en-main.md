---
title: "AccesSlide : la prise en main"
date: "2015-05-24T11:06:51"
modified: "2015-05-26T09:03:59"
permalink: "accesslide-la-prise-en-main/index.html"
description: [""]
excerpt: "Auriez-vous ‒ par hasard ‒ déjà cherché une solution pour créer des diaporamas accessibles ? De nombreuses solutions existent, mais aucune n’était réellement satisfaisante… C’est désormais le cas avec [AccesSlide](http://accesslide.net/), dont j’avais découvert l’existence après le petit jeu du 1er avril organisé par [Access42](http://www.access42.net/). Ma première prise en main a été très agréable alors me voilà lancé dans quelques explications et une démonstration pour en vanter les mérites ! [Lire la suite de « AccesSlide : la prise en main » →](https://www.ffoodd.fr/accesslide-la-prise-en-main/)"
format: "standard"
alternate: [""]
---
Access42 est la société créée conjointement par Armony Altinier (rédactrice du livre «&nbsp;Accessibilité web&nbsp;» dont j’ai écrit [un compte-rendu de lecture](https://www.ffoodd.fr/lecture-accessibilite-web/)) et Jean-Pierre Villain après qu’ils aient remporté le marché de refonte du RGAA3\. Ils ont été rapidement rejoint par Sylvie Duchateau et Audrey Maniez.

Si vous ne connaissez pas ces noms, sachez qu’ils sont **incontournables dans le domaine de l’accessibilité numérique en France**. Et c’est peu dire&nbsp;!

## Premier contact

Pour commencer, je tiens à signaler la manière tout à fait **attractive** qu’a trouvé d’Access42 pour communiquer sur ce nouvel outil&nbsp;: c’est suite à ma participation à leur [jeu-concours&nbsp;: le secret de la licorne](http://access42.net/MAJ-Jeu-concours-le-secret-de-la-licorne.html) que j’ai reçu un mail signalant dans un premier temps [le dépôt Github d’AccesSlide](https://github.com/access42/AccesSlide).

C’est bête, mais ça donne envie de regarder&nbsp;! Étant donné que j’avais déjà cherché une solution lors de la préparation de mon atelier pour le [WP Tech](http://2014.wptech.fr/) et que je prépare une conférence pour le [WPMX](http://2015.wpmx.org/), je me suis lancé dans l’utilisation de cet outil.

De prime abord, **cette solution est très riche**. Le **sommaire** ainsi que **les réglages utilisateurs** sont de très gros atouts pour ce système de diaporama.

**Commençons par créer le contenu &nbsp;!**

## La contribution

Partie cruciale s’il en est, AccesSlide permet de rédiger ces slides de façon extrêmement simple, en imposant **très peu de contraintes sur le balisage**. Il suffit d’une section avec la bonne classe, et le tour est joué&nbsp;:

```markup
<section class="slide"> [votre diapo] </section>
```

Il est difficile de faire plus simple, et c’est équivalent en terme d’efficacité aux solutions populaires telles que [Reveal.js](http://lab.hakim.se/reveal-js/#/). **Ainsi pour la saisie du contenu, c’est top&nbsp;!**

## La personnalisation

L’équipe d’Access42 a gardé cet aspect important pour l’appropriation en tête, **et c’est tant mieux**. Un système de thèmes fonctionne très bien, ce qui m’a permis d’implémenter très rapidement des styles qui correspondent à la fois à ce site mais aussi à ma précédente présentation. Quelques ajustements ont évidemment été nécessaires, mais rien de bien compliqué.

Je dois même avouer avoir été agréablement surpris par la facilité de personnalisation, car la majorité des styles structurels sont cloisonnés dans un fichier principal et **évite toute forme de collision désagréable**.

## Mon thème

Ni une, ni deux&nbsp;: j’ai donc créé mon thème. Voici donc [le support de mon atelier du WP Tech](https://www.ffoodd.fr/wp-tech/) refondu en utilisant AccesSlide. Qu’en pensez-vous&nbsp;?

Pour rester fidèle à ma première présentation —&nbsp;mais aussi pour essayer de creuser un peu plus&nbsp;— je suis allé faire quelques modifications plus profondes.

### Les pictogrammes en SVG

Mon dada du moment. Les boutons et liens icônes sont intégrés à l’aide d’une police d’icône dans la version «&nbsp;officielle&nbsp;» proposée par Access42. Personnellement, je n’aime pas cette technique, que je trouve moins robuste qu’une bonne vieille balise image avec une source vectorielle. J’ai donc changé la façon de gérer ces boutons. Ça m’amène à une première remarque d’ordre général, mais sans être expert **je pense que le javascript peut encore être amélioré** car on trouve beaucoup de répétitions.

Pour information, il s’avère que si une balise image a une source svg, il faut ajouter le rôle image afin que VoiceOver accède à l’alternative textuelle&nbsp;:

```markup
<img src="*.svg" alt="Quel essai !" role="img" 
   width="8" height="8" />
```

Étant donné que ça ne constitue pas un effort insurmontable ni même complexe, je préfère toujours cette version (qui fonctionne à partir d’IE9).

Un petit coucou et un grand merci à Nicolas Hoffmann qui, suite à mon interrogation, a permis de confirmer ce diagnostic en haranguant la plèbe sur Twitter. Lisez [le fil de discussion](https://twitter.com/Nico3333fr/status/601687531218931712), c’est très intéressant !

### La transition en CSS

J’avais particulièrement apprécié la gestion des transitions sur Reveal.js, plutôt simple et efficace à l’aide de CSS. Aucun des effets proposés par AccesSlide ne correspondaient à celui que j’utilisais précédemment, alors je l’ai re-créé et ajouté&nbsp;!

Là encore, **ce fut extrêmement facile** en déclarant la nouvelle animation [conformément aux isntructions laissées dans le fichier javascript principal](https://github.com/access42/AccesSlide/blob/master/AccesSlide.js#L63). Côté utilisateur, vous pourrez voir cette animation en la choisissant dans les réglages&nbsp;: je l’ai nommée «&nbsp;Coulisse vers la gauche&nbsp;» puisque c’est ce qu’elle fait&nbsp;!

Ainsi le conteneur principal se voit affubler d’un attribut `data-effect` dont la valeur est le nom de l’effet. Il n’en faut pas plus pour appliquer la transition CSS de mes rêves (même si je dois avouer devoir truander un peu afin de ne pas toucher aux fichiers originels)&nbsp;:

```css
[data-effect="ffoodd"] .slide {
  display: block !important;
  opacity: 0;
  margin: .5rem;
  position: absolute;
  top: 0 !important;
  visibility: hidden;
  transform-style: preserve-3d;
  transition: 
  transform-origin .8s cubic-bezier(.26, .86, .44, .985),
  transform .8s cubic-bezier(.26, .86, .44, .985),
  visibility .8s cubic-bezier(.26, .86, .44, .985),
  opacity .8s cubic-bezier(.26, .86, .44, .985);
}

[data-effect="ffoodd"] .slide[style*="display: none"] {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transform: translate3d( -150%, 0, 0 );
  visibility: hidden;
}

/* C’est là que je truande :P */
[data-effect="ffoodd"] .slide[style*="display: block"] {
  opacity: 1    !important;
  position: relative  !important;
  visibility: visible !important;
}

[data-effect="ffoodd"] .slide[style*="display: block"] ~ .slide[style*="display: none"] {
  transform: translate3d( 150%, 0, 0 );
}
```

Et puis pour le fun, j’ai ajouté une animation au chargement de la page&nbsp;:

```css
@keyframes move-up {
  from {
  transform: translateY( 100% ) translateZ( 0 );
  opacity: 0;
  }
}

[data-effect="ffoodd"] #wrapper {
  animation: move-up .8s cubic-bezier(.165, .840, .440, 1);
}
```

Et le tour est joué&nbsp;☺.

## Participez&nbsp;!

Pour le moment mon thème est trop éloigné de la solution originelle pour que je puisse le proposer simplement, mais avec un peu de réécriture ce devrait être faisable (tout comme l’animation). **Je tenterai de les proposer à Access42 dès que mon temps libre me le permettra**&nbsp;!

Même si je ne m’en suis pas servi, je tiens également à souligner l’utilisation de fichiers partiels et du post-processeur [Myth](http://www.myth.io/) pour générer les sources. Le découpage en fichiers partiels rend l’orientation dans les fichiers encore plus clair. Côté compilation, une configuration basique pour Grunt est aussi mise à disposition.

**Tout est fait pour que quiconque puisse s’approprier la solution rapidement.**

Ah oui au fait, il y a d’autres fonctionnalités que je n’ai même pas évoquées&nbsp;:

* les styles pour l’impression&nbsp;;
* le responsive&nbsp;;
* un mode plan&nbsp;;
* un système d’internationalisation géré _via_ javascript.

Plutôt pas mal, non&nbsp;☺&nbsp;?

**Alors à votre tour de contribuer**&nbsp;: [AccesSlide est sur Github](https://github.com/access42/AccesSlide)&nbsp;!

## Épilogue

Il me reste un point important remonté par [Sophie Schuermans](http://anysurfer.be/fr) concernant l’aspect responsive que j’ai un peu endommagé. Et je tiens également à remercier [Nicolas Hoffmann](http://www.nicolas-hoffmann.net/source/) pour sa relecture attentive et ses conseils, ainsi qu’[Olivier Nourry](http://accessiblog.fr/) pour son intérêt&nbsp;!