---
layout: "template/post.njk"
title: "HTML comme fondation"
date: "2022-12-22T16:53:57"
modified: "2022-12-22T16:54:59"
permalink: "html-comme-fondation/index.html"
excerpt: "Traduction de [ma contribution au calendrier de l’avent de HTMHell](https://www.htmhell.dev/adventcalendar/2022/17/)."
format: "standard"
tags: "posts"
---
**Note** : cet article est la traduction de [ma contribution au calendrier de l’avent de HTMHell, Modern HTML as a foundation for progressive enhancement](https://www.htmhell.dev/adventcalendar/2022/17/)&nbsp;!

Vous êtes peut-être familier avec le concept d’amélioration progressive. En résumé, c’est une méthode permettant de s’assurer que l’utilisateur dispose d’**une version viable** de votre page quelque soit son contexte —&nbsp;connexion limitée, navigateur désuet, etc.&nbsp;— mais aussi de rendre ladite page plus **résiliente** (par exemple aux erreurs JavaScript).

L’amélioration progressive débute par la base&nbsp;:

1.  le **contenu**,
2.  balisé avec **HTML**,
3.  stylé avec **CSS**,
4.  enrichi avec **JavaScript**,
5.  et amélioré pour l’accessibilité avec **ARIA** (en cas de besoin uniquement).

Chacune de ces étapes devrait fonctionner telle quelle et améliorer les étapes précédentes sans les abîmer. En d’autres termes, il vous faut rédiger votre HTML indépendamment du CSS ou du JavaScript que vous y appliquerez ensuite.

Cela étant dit, il paraît évident que mieux vous connaissez chaque étape de la liste, plus votre page devrait être robuste. **JavaScript est omniprésent** donc je présume que vous en êtes familier. **ARIA devient de plus en plus visible** depuis quelques années, donc on peut supposer que même sans connaître ARIA vous utilisez une bibliothèque ou un outil s’en occupant très bien. **CSS s’améliore constamment** et j’imagine que votre veille vous permet de découvrir des nouveautés quotidiennement ou presque…

Mais quid de HTML&nbsp;? Fait-il partie de votre **veille technique**&nbsp;? Voyez-vous fréquemment passer des nouveautés HTML dans vos flux d’information&nbsp;? Pas très souvent, je présume.

Mais voilà. HTML est un standard vivant donc les spécifications changent, les navigateurs améliorent leurs supports en permanence —&nbsp;avec [Interop 2022](https://wpt.fyi/interop-2022) par exemple —&nbsp;donc il y a des nouveautés, côté spécifications ou côté navigateurs&nbsp;; et certains d’entre eux sont destinés à devenir des versions natives de composants JavaScript basés sur un amas de `div` depuis des lustres.

Et si nous pouvions améliorer la couche HTML pour ce genre de composants, rendant le balisage plus résilient au passage&nbsp;?

**Avertissement**&nbsp;: il faut voir HTML comme **une fondation, en aucun cas un remplacement** de votre composant JavaScript existant. Si votre composant requière ARIA, ne tentez pas de l’implémenter sans. Autrement dit, tentez systématiquement de fournir la meilleure expérience utilisateur possible et ne vous préoccupez pas trop de l’expérience développeur. Vous pourriez être intéressé par [la série d’articles sur les composants sous-conçus d’Adrian Roselli](https://adrianroselli.com/2022/10/under-engineered-patterns-for-a11ytoconf.html#References).

Allons faire une ballade&nbsp;!

## `details` et `summary` comme base pour le motif de conception _disclosure_

Remémorez-vous ces boutons «&nbsp;Voir plus&nbsp;» qui font apparaître des contenus supplémentaires quand vous les activez. Rendre ce genre de composant accessible nécessite généralement que vous implémentiez le motif de conception ARIA _disclosure_, basé sur un bouton et l’attribut `aria-expanded` pour communiquer l’état.

`<details>` et `summary>` sont les candidats parfaits pour ça. Comme leur nom l’indique, ce motif de balisage va afficher un résumé (_summary_) et masquer les détails associés, mais les rendre disponibles lors de l’activation du résumé. [L’implémentation par les navigateurs](https://thepaciellogroup.github.io/AT-browser-tests/test-files/details-summary.html) et [le support](https://caniuse.com/details) sont excellents.

Ça semble plutôt sympa, non&nbsp;? Alors pourquoi s’embarrasser avec le motif de conception _disclosure_ et&nbsp;ne pas préférer utiliser `<details>` et `<summary>` systématiquement&nbsp;? Pour faire simple, les interactions ne sont pas exactement celles attendues par vos utilisateurs, et le support par les navigateurs et technologies d’assistance n’est pas encore idéal —&nbsp;[comme l’a démontré Scott O’Hara](https://www.scottohara.me/blog/2022/09/12/details-summary.html).

Mais alors… peut-on l’utiliser comme la fondation de notre motif de conception ARIA _disclosure_&nbsp;? [Découvrons ça (sur CodePen)](https://codepen.io/ffoodd/pen/XWYmmGj)&nbsp;!

Rien de magique ici&nbsp;: pour améliorer et harmoniser le support des technologies d’assistance, on transforme le motif HTML en _disclosure_ en ajoutant à l’élément `<summary>` le rôle `button` et l’attribut `aria-expanded` pour expliciter l’état, et en s’assurant que le contenu masqué l’est pour tout le monde avec l’attribut `hidden`. L’attribut `open` sur l’élément `<details>` se charge de tout ça nativement, mais [on ne peut pas se reposer dessus dès qu’on personnalise le marqueur triangle par défaut](https://www.scottohara.me/blog/2022/09/12/details-summary.html#impact-of-removing-the-default-disclosure-triangle) (ce qu’on fera à n’en pas douter)&nbsp;: on doit implémenter le motif de conception _disclosure_ complet pour éviter des restitutions incohérentes entre navigateurs et technologies d’assistance.

De plus, saviez-vous que les navigateurs basés sur Chromium permettent de trouver le contenu masqué par `<details>` lors d’une recherche sur la page&nbsp;? C’est une fonctionnalité qui va être standardisée en HTML avec [la valeur `until-found` pour l’attribut `hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden#the_hidden_until_found_state) mais ça n’est pas censé être le cas des contenus masqués par le motif de conception _disclosure_.

Comme vous l’avez peut-être compris, utiliser `<details>` et `<summary>` enrichis avec le motif de conception ARIA _disclosure_ ne fera aucune différence pour la plupart des utilisateurs… mais si d’aventure votre JS ou votre CSS ne fonctionne pas, votre balisage sémantique prendra le relai et restera interactif — avec toutes ses limitations actuelles dans les technologies d’assistance.

Faites d’ailleurs attention en utilisant ces éléments comme fondation&nbsp;: ils ne sont pas le bon choix [pour des accordéons](https://daverupert.com/2019/12/why-details-is-not-an-accordion/), [un menu déroulant](https://melsumner.github.io/details-as-a-menu), [un menu «&nbsp;burger&nbsp;»](https://cloudfour.com/thinks/a-details-element-as-a-burger-menu-is-not-accessible/), [un groupe d’onglets ou une fenêtre modale](https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html)… Restez sémantiques&nbsp;!

Et si je vous disais qu’il y a d’autres éléments HTML améliorables progressivement de la sorte&nbsp;? On jette un œil&nbsp;?

## `output` comme une _live region_

Avez-vous déjà eu besoin d’alimenter une _live region_ pour communiquer des changements aux utilisateurs de lecteurs d’écran —&nbsp;parfois [masquée visuellement en CSS](https://www.ffoodd.fr/cache-cache-css/)&nbsp;? C’est assez fréquent de nos jours, et vous retrouverez une gestion des _live regions_ dans la plupart des _frameworks_&nbsp;: Angular a un `LiveAnnouncer` dans son CDK Accessibilité, et [WordPress a un script interne `wp.a11y.speak()`](https://make.wordpress.org/accessibility/handbook/markup/wp-a11y-speak/)… [Les _live regions_ ARIA s’appuient sur trois rôles spécifiques&nbsp;: `status`, `log` et `alert`](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/ARIA_Live_Regions), chacune ayant un comportement légèrement différent.

Mais saviez-vous qu’un élément HTML est une _live region_ native, avec un rôle implicite `status`&nbsp;? [Je vous présente `<output>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/output)&nbsp;! [L’implémentation par les navigateurs est complète](https://thepaciellogroup.github.io/AT-browser-tests/test-files/output.html) et [le support est excellent](https://caniuse.com/mdn-html_elements_output). Cependant certains couples de navigateurs et technologies d’assistance précis sont défectueux, comme [Scott O’Hara (à nouveau) l’a démontré](https://www.scottohara.me/blog/2019/07/10/the-output-element.html).

[Rendons `<output>` encore plus robuste en le transformant en _live region_ ARIA (sur CodePen)](https://codepen.io/ffoodd/pen/rNvqGBB)&nbsp;!

Vous vous en souvenez peut-être, expliciter les rôles des éléments HTML était nécessaire il y a quelques années —&nbsp;pour les _landmarks_, principalement&nbsp;— afin d’améliorer le support des navigateurs et technologies d’assistance. C’est d’ailleurs toujours une pratique encouragée par [le critère 12.6 du RGAA](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/methode-rgaa/criteres/#crit-12-6). Nous nous sommes habitués à écrire `<main role="main">`, `<header role="banner">`, etc.

Un autre point positif avec `<output role="status">` est que ça vous permet de styler vos _live regions_ en sélectionnant l’élément `output`&nbsp;: spécificité moins élevée, et la possibilité d’appliquer des styles de base renforcés —&nbsp;avec _CSS containment_, par exemple&nbsp;?

### Une _live region_ particulière&nbsp;: le toast&nbsp;!

Il existe aussi un cas d’usage pour une _live region_ affichée visuellement. Je n’irais pas très loin sur le sujet, car il a déjà été traité dans un grand nombre d’articles de grande qualité&nbsp;:

* [Scott O’Hara l’a mentionné dans The Output Element](https://www.scottohara.me/blog/2019/07/10/the-output-element.html),
* une précision technique après [A toast to an accessible toast… abordant les considérations d’expérience utilisateur](https://www.scottohara.me/blog/2019/07/08/a-toast-to-a11y-toasts.html),
* mais aussi [Adrian Roselli avec Defining toast message](https://adrianroselli.com/2020/01/defining-toast-messages.html).

**Attention**&nbsp;: si votre toast ou votre _live region_ contient des éléments interactifs, vous devriez probablement utiliser un rôle `dialog` ou `alertdialog` au lieu d’un élément `<output>`. Cela dit… il y a peut-être un élément HTML plus indiqué pour ça&nbsp;!

## Une boîte de `dialog`

Je ne vais pas creuser beaucoup [l’élément `<dialog>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/dialog), mais explorons tout de même ce qu’il fait nativement comparé au [modèle de conception ARIA dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/)&nbsp;:

* il a un rôle `dialog` implicite,
* si on l’ouvre avec la méthode `showModal()`&nbsp;:
  * il a une propriété `aria-modal="true"` implicite,
  * il peut être fermé avec la touche Échap,
* il piège le focus en son sein —&nbsp;mais permet d’atteindre la fenêtre du navigateur, c’est toujours discuté…
* il restaure le focus à l’élément qui a déclenché l’ouverture, lors de sa fermeture,
* il rend le reste du document [`inert`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert) automatiquement.

Mais il y a plus&nbsp;! Voyez plutôt&nbsp;:

* [Le pseudo-élément `::backdrop`](https://developer.mozilla.org/fr/docs/Web/CSS/::backdrop) permet de styler l’arrière-plan superposé vraiment facilement.
* [La pseudo-classe `:modal`](https://developer.mozilla.org/fr/docs/Web/CSS/:modal) s’applique lorsque `<dialog>` est ouvert avec la méthode `showModal()`.
* Si votre boîte de dialogue contient un formulaire, utiliser l’attribut `method="dialog"` sur le formulaire permet à votre bouton de soumission de fermer la boîte de dialogue en transmettant les données.

L’élément `<dialog>` seul n’est pas (encore) suffisamment cohérent entre les différents navigateurs et technologies d’assistance, [comme Scott O’Hara (de nouveau) l’a remarqué](https://www.scottohara.me/blog/2019/03/05/open-dialog.html), mais vous avez saisi le principe&nbsp;: qu’en serait-il si on l’enrichissait en appliquant le motif de conception ARIA _dialog_, et en s’appuyant sur le comportement natif pour économiser quelques lignes de JavaScript&nbsp;?

C’est plus ou moins [ce qu’Adam Argyle a exploré avec son composant _dialog_ sur web.dev](https://web.dev/building-a-dialog-component/) avec quelques astuces sympathiques à apprendre —&nbsp;gardez cependant à l’esprit que [les contenus sur web.dev ne sont pas testés avec des technologies d’assistance ni contre les WCAG](https://twitter.com/aardrian/status/1586792250113232896).

[Construire un composant _dialog_ n’est vraiment pas évident](https://css-tricks.com/dialog-components-roll-your-own/), et [Kitty Giraudel a détaillé ce dont vous avez besoin pour faire un bon composant _dialog_](https://www.smashingmagazine.com/2021/07/accessible-dialog-from-scratch/). Depuis la rédaction de ces articles, le support de `<dialog>` s’est considérablement amélioré et [fait même partie&nbsp; d’Interop 2022](https://wpt.fyi/interop-2022), donc attendez-vous à ce que le support s’améliore encore en ces derniers jours de 2022.

C’est probablement l’exemple le moins évident, puisqu’en parlant d’amélioration progressive l’élément `<dialog>` pourrait être un mauvais choix&nbsp;: il ne peut tout bonnement pas fonctionner sans JavaScript. Mais si votre JavaScript est en panne pour une raison inopinée, vos écouteurs d’événement pourraient toujours fonctionner.

## Conclusion

HTML est incroyable. Ça n’est pas suffisant pour proposer un expérience accessible à tous les utilisateurs, comme [Dave Rupert l’a mis en exergue il y a deux dans HTML: the inaccessible parts](https://daverupert.com/2020/02/html-the-inaccessible-parts/) —&nbsp;bien que certains de ces exemples ne sont plus d’actualité, corrigés dans les navigateurs ou technologies d’assistance.

Mais ne pas être parfait est probablement toujours mieux qu’être neutre, n’est-ce pas&nbsp;?

Je crois que c’est le genre de choses qu’HTML permet&nbsp;: `<details>` et `<summary>` finiront par être implémentés et restitués de façon cohérente aux technologies d’assistance, rendant les enrichissements avec ARIA caduques. Le travail de Scott, du test très avancé aux articles de blogs et à l’ouverture de tickets de bug, est la voie à suivre. Les implémentations complètes dans les bibliothèques comme [a11y-dialog de Kitty Giraudel](https://a11y-dialog.netlify.app/) permettent de gagner en maturité et de clarifier les attentes pour ces composants. Et avec l’augmentation des usages, les navigateurs et technologies d’assistance vont certainement reconsidérer leurs priorisations, dans des opérations comme Interop ou [ARIA-AT](https://aria-at.w3.org/).

Alors utilisons, testons, et aidons les navigateurs et technologies d’assistance à supporter ces nouveaux éléments HTML !
