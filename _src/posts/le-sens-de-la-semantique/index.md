---
layout: "template/post.njk"
title: "Le sens de la sémantique"
date: "2016-06-24T16:06:10"
modified: "2016-06-27T12:42:49"
permalink: "le-sens-de-la-semantique/index.html"
excerpt: "Encore une réflexion ce matin, dans le train, sur les changements de conception des styles qui remuent notre milieu en 2016."
tags: ["posts"]
description: "Utiliser des éléments <abbr lang=\"en\" title=\"HyperText Markup Language\">HTML</abbr> pour leur aspect visuel ou utiliser des attributs de présentation sont de mauvaises pratiques."
---
Mais probablement pas pour les raisons auxquelles vous pourriez penser de prime abord, je pense. Attention, ceci nʼest quʼune réflexion et sera peut-être truffée dʼerreurs, pleine de non sens et de raccourcis.

## La séparation du fond et de la forme

Ce principe est assez clair. Parfois on lʼassocie également à un autre principe, celui de la répartition des responsabilités —&nbsp;en anglais, _separation of concern_&nbsp;— et on aboutit généralement à celui de la responsabilité unique —&nbsp;_single responsibility_, toujours chez nos amis anglophones.

Dans mes langages dʼaffection que sont le HTML et le CSS, ça se traduit actuellement par les CSS atomiques —&nbsp;dont jʼai déjà parlé, et sur lesquels je vous invite à vous renseigner.

En développement web et notamment sur le _front-end_, la conception MV\* en est le digne représentant. Sommairement, chaque couche a une responsabilité précise&nbsp;:

* le modèle est celui des données (pures et dures)&nbsp;;
* la vue est lʼinterface utilisateur&nbsp;;
* et le reste sert à manipuler tout ça comme un marionnettiste —&nbsp;la plupart du temps, on parle de contrôleur.

Super, le tour du propriétaire est terminé. Vous voulez mon avis&nbsp;? **Cʼest nul et non applicable aux couches HTML et CSS.**

## Lʼimportance du HTML

Un rapide cours dʼhistoire est déjà fait dans lʼintroduction de lʼarticle. Le mauvais emploi de balises HTML à des fins de présentation a traumatisé pas mal de monde, il y a de ça 10 ou 15 ans. Les tableaux, les éléments —&nbsp;coucou `font`, `big`, `blink`, `center`, `marquee` ou `spacer`&nbsp;— et attributs dédiés en sont pour beaucoup.

Là encore, je souhaite nuancer&nbsp;: ce ne sont que des outils. Les ouvriers qui sʼen sont servis ont fait nʼimporte quoi avec. Cʼest ça, la véritable histoire. On sʼest donc mis en tête de récupérer un vieux principe de programmation et de lʼappliquer tant bien que mal sur HTML et CSS en disant&nbsp;:

> HTML est le fond, CSS est la forme&nbsp;.[^1]

[^1]: Toute ressemblance avec le slogan dʼune enseigne de sport est parfaitement fortuite.



Cʼétait un moyen simple et efficace dʼéjecter du versant HTML ce qui avait trait à la présentation. Et ça, c’était bien. En effet le HTML doit être employé pour sa sémantique, **le sens quʼil apporte au contenu quʼil balise**. Car cʼest tout ce quʼest censé faire ce langage&nbsp;: décrire le contenu sur le plan sémantique.  
**  
Utiliser des propriétés de style dans le HTML revient à corrompre la sémantique**&nbsp;: le contenu ne sera plus marqué correctement et pourra donc être mal interprété. Et ça, cʼest mal.

### En quoi est-ce contradictoire avec la séparation fond/forme&nbsp;?

Jʼai esquissé pourquoi il fallait éviter de mettre des informations de styles dans le HTML. Cʼétait pas trop compliqué.

Cependant aujourdʼhui, cet argumentaire ressurgit pour justifier lʼutilisation de classes partout, tout le temps, dans nos CSS. On nous recommande de ne pas utiliser de sélecteurs dʼéléments ou dʼattributs —&nbsp;voire même dʼimbrications comme `ul > li`&nbsp;— car elles induisent un lien trop fort avec le HTML et enfreigne donc ce concept de séparation du fond et de la forme.

Précisons mon avis sur le sujet&nbsp;: **ce principe ne vaut pas pour les CSS**. Je poursuis sur ma lancée.

## À quoi sert le style&nbsp;?

Selon moi, il sert à hiérarchiser visuellement les éléments les uns des autres. Un «&nbsp;gros titre&nbsp;», les «&nbsp;petites lignes&nbsp;»… Ces expressions décrivent un contenu dʼaprès leur aspect visuel mais aussi et surtout, leur (relative) importance sémantique.

Pour résumer le fond de ma pensé&nbsp;: si un élément est important sémantiquement côté HTML, il devrait avoir **une représentation visuelle qui reflète cette importance**.

Pourquoi&nbsp;?

Mais ma bonne dame, parce que sinon vous induirez une distinction entre diverses méthodes de lecture de votre contenu —&nbsp;entre les technologies qui lisent le code (les robots, les lecteurs d’écrans, les moteurs en tous genres) et celles qui regardent le style (les personnes bien voyantes, les captures dʼécran, et certains moteurs tels que les outils de test de régression visuelle). Et ça, cʼest pas terrible. Cʼest même plutôt pourri, à mon avis.

En fait jʼirais encore plus loin&nbsp;: si vous séparez trop votre forme de votre fond&nbsp;.[^2]

[^2]: Notez lʼordre des termes fond/forme, forme/fond.



**Lʼaspect graphique devrait renforcer la structure de lʼinformation et la hiérarchisation des contenus**, pas la gommer ni la falsifier.

## Encore un peu dʼhistoire

Au fait, vous souvenez-vous que CSS est ce qu’on appelle un langage descriptif&nbsp;? Dʼailleurs, les plus vieux dʼentre vous se rappelleront sans doute quʼà lʼorigine **CSS nʼétait pas destiné aux styles visuels** mais à la description de la présentation du contenu. Et non, ce nʼest pas pareil. Cela comprenait lʼaspect graphique, mais aussi [dʼautres médias oubliés, de nos jours](https://www.w3.org/TR/CSS2/media.html#media-types). Voyez plutôt.

* La vocalisation avec le média `speech` —&nbsp;on parlait de feuille de styles orales (en CSS1, le média se nommait dʼailleurs `aural`), qui comprenaient le contrôle du volume, de la vitesse, mais aussi du type de voix (masculine ou féminine, par exemple). [Jetez un œil à lʼappendice à la spécification CSS2 (en anglais)](https://www.w3.org/TR/CSS2/aural.html). Tout ceci nʼa jamais vraiment été implémenté, sauf par Opéra il y a fort longtemps.
* Le braille, avec les médias `braille` et `embossed`, qui permettaient de contrôler respectivement le rendu par une plage de lecture braille et par une imprimante braille.
* Les projecteurs grâce au média `projection`, ainsi que les écrans de télévision avec le média `tv`.
* Les téléscripteurs (ou prompteurs), terminaux et tous les systèmes avec des capacités dʼaffichage limitées aux fontes monospaces avec le média `tty`.

Dès la deuxième partie des années 90, les personnes travaillant sur la spécification CSS envisageaient cette multitude de façon dʼaccéder au contenu. Et aujourdʼhui on se gausse de faire un site qui sʼaffiche sur la plupart des écrans…

## Morale de lʼhistoire

Simplifions.

**CSS ne devrait pas être utilisé pour altérer lʼimportance sémantique d’un contenu.** Et par extension, utiliser les sélecteurs dʼéléments ou dʼattributs semble une bonne idée. Je reformule au cas où&nbsp;: séparer le fond de la forme est une bonne idée, mais pas séparer la forme du fond. **La forme dépend du fond, là où le fond ne dépend pas de la forme**.

Pour ceux qui ont tenu jusque là, je vous invite à prendre le temps de lire [la page Wikipédia dédiée à CSS](https://fr.wikipedia.org/wiki/Feuilles_de_style_en_cascade). Cʼest fort intéressant&nbsp;.[^3]

[^3]: Par exemple, on y apprend que le mécanisme de la cascade tant décrié de nos jours par lʼécosystème des développeurs JS est conçu pour permettre aux utilisateurs dʼappliquer leurs propres styles. Cʼest oublié, mais ça nʼen reste pas moins génial.

