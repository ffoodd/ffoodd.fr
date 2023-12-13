---
title: "expérience: inherit;"
date: "2012-07-18T15:32:46"
modified: "2016-03-01T09:52:18"
permalink: "css-experienceinherit/index.html"
excerpt: "Aujourd'hui, un stagiaire chargé d'une intégration m’annonce —&nbsp;fier de lui&nbsp;— qu'il a réussi à rendre sa page compatible avec IE8 à coup de _hacks_. Ceci n'est pas un article faisant l'éloge d'IE —&nbsp;ni un énième pamphlet dénonçant la huitième plaie d'Égypte&nbsp;— mais il illustre ce proverbe&nbsp;: **«&nbsp;Il n'y a pas de mauvais outils ; que des mauvais ouvriers.&nbsp;»** [Lire la suite de «&nbsp;expérience: inherit;&nbsp;» →](https://www.ffoodd.fr/css-experienceinherit/)"
format: "standard"
---
Ceci n’est pas un article faisant l’éloge d’IE —&nbsp;ni un énième pamphlet dénonçant la huitième plaie d’Égypte&nbsp;— mais il illustre ce proverbe&nbsp;: **«&nbsp;Il n’y a pas de mauvais outils ; que des mauvais ouvriers.&nbsp;»**

## La petite histoire

Mon cher stagiaire —&nbsp;comme tout le monde&nbsp;— pensait être un expert en recherche sur Google. Sa page ne s’affiche pas correctement sur IE uniquement, donc il cherche sur Google «&nbsp;Problème affichage Internet Explorer&nbsp;». Logique&nbsp;! C’est ainsi qu’un monde nouveau s’ouvre à lui&nbsp;: les hacks css. Adepte du Nutella, il m’en tartine donc une couche conséquente pour obtenir un affichage décent. Et Dieu sait que ça prend du temps…

L’affichage sur Chrome et Firefox était correct, aussi à aucun moment il n’a douté de ces deux-là. Or un bref coup d’œil sur son code source valait toutes les lectures foireuses sur comment hacker Internet Explorer&nbsp;: une balise `<a>` ouverte **avant** le `doctype`.

C’est alors que, comme Père Castor, j’ai raconté une histoire&nbsp;:

> Il y a fort, fort longtemps, de nombreux grouillots du web se plaignaient du vieux roi Internet Explorer. Si souvent qu’ils décidèrent d’ignorer le vieux roi, qui faisait rien que les embêter. C’est alors qu’une bande de chevaliers errants ont arrêté d’errer&nbsp;: Chrome, Firefox, Opéra, Safari pour ne citer qu’eux. Ils ont dit&nbsp;: “&nbsp;Ce roi déchu qui vous déçoit n’est pas assez bien pour vous. Viendez et nous vous guideront vers un royaume sans bug d’affichage.&nbsp;” Alors les grouillots les ont suivis et ont commencé, lentement mais sûrement, à oublier le vieux roi.

Attention, péripétie&nbsp;:

> Puis un jour, un péquin plus curieux que la moyenne a demandé aux preux chevaliers quel était leur secret pour un univers dénué d’erreur d’interprétation. Leur réponse fut éloquente&nbsp;: “&nbsp;Nous savons votre ignorance, et avons décidé de ne pas vous éduquer afin que jamais vous ne sachiez vous plaindre.&nbsp;”

Une pléthore d’écrits plaintifs et acerbes sur ce bon vieil IE ont été publiés. La plupart étaient justifiés. **Étaient.** Chaque problème a sa solution, et ces plaintes ont servis d’excuses à certains pour se résigner et arrêter de chercher la solution. Combien de fois ai-je pu dire et entendre «&nbsp;C’est la faute d’IE&nbsp;». Et pourtant, ce n’est pas un mauvais bougre&nbsp;: **il est aujourd’hui le seul navigateur à vous signaler que votre code source est absurde**. Si ce stagiaire n’avait pas eu la présence d’esprit —&nbsp;et l’ordre intimé&nbsp;— de vérifier sur IE, il n’aurait jamais su l’abomination qu’il avait engendrée.

## Un héritage à transmettre

J’estime avoir été bien éduqué grâce à des communautés comme [Alsacréations](http://www.alsacreations.com), [Openweb](http://openweb.eu.org/) ou [A List Apart](http://www.alistapart.com/), qui ne jurent que par les standards et la qualité web. Ce que je viens de vivre avec ce stagiaire m’a furieusement rappelé la tempête qui a balayé le monde du web ces derniers mois, lorsque Firefox et Opéra annoncèrent avec une mine dépitée le support du préfixe vendeur `-webkit-`&nbsp;:

* [Tous les navigateurs veulent implémenter le préfixe `-webkit-`](http://www.hteumeuleu.fr/tous-les-navigateurs-veulent-implementer-le-prefixe-webkit/) chez [@HTeuMeuLeu](https://twitter.com/HTeuMeuLeu)&nbsp;;
* [Call for action: the open web needs you **now**](http://www.glazman.org/weblog/dotclear/index.php?post/2012/02/09/CALL-FOR-ACTION:-THE-OPEN-WEB-NEEDS-YOU-NOW) par [Daniel Glazman](https://twitter.com/glazou)&nbsp;;
* [Bonnes pratiques CSS&nbsp;: le Web ouvert a besoin de vous](http://www.alsacreations.com/actu/lire/1394-web-ouvert-css-webkit.html) par [fvsch](https://twitter.com/fvsch) sur Alsacréations&nbsp;;
* [Vendor prefixes, the CSS WG and me](http://lea.verou.me/2012/02/vendor-prefixes-the-css-wg-and-me/) par [Lea Verou](https://twitter.com/LeaVerou).

La même erreur semble se répéter, simplement parce que les nouveaux arrivants —&nbsp;dont je fais partie&nbsp;— n’ont pas appris leur leçon d’histoire. Nous devons continuer à apprendre et enseigner&nbsp;: les bonnes pratiques ne vont pas de soi, elles s’apprennent et se découvrent au détour d’un blog. Rédiger un code source valide et réaliser une intégration de qualité en font partie et ne sont que les premières étapes.

Je pratique l’**amélioration perpétuelle**&nbsp;—pas progressive, perpétuelle.