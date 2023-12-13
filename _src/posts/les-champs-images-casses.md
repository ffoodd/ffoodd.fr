---
title: "Les champs images cassés"
date: "2016-03-31T10:27:00"
modified: "2016-03-31T10:27:00"
permalink: "les-champs-images-casses/index.html"
excerpt: "Il y a quelques jours, [Ire Aderinokun](http://bitsofco.de/) a dévoilé que les images cassées supportaient les pseudo-éléments. En bossant sur [a11y.css](https://github.com/ffoodd/a11y.css), je me suis aperçu que ça valait également pour les champs images. [Lire la suite de «&nbsp;Les champs images cassés&nbsp;» →](https://www.ffoodd.fr/les-champs-images-casses/)"
format: "standard"
---
[Ire Aderinokun](http://bitsofco.de/) a brisé un mythe il y a quelques jours à propos des pseudos-éléments sur la balise `img`.

## On récapitule, pour ceux du fond

Lʼélément `img` est ce quʼon appelle **un élément remplacé**. Je vous conseille à ce propos la lecture de «&nbsp;[Qu’est-ce qu’un élément remplacé&nbsp;?](http://la-cascade.ghost.io/quest-ce-quun-element-remplace/)&nbsp;», traduction en français sur La Cascade de «&nbsp;[What The Heck Is A Replaced Element?](https://demosthenes.info/blog/461/What-The-Heck-Is-A-Replaced-Element#)&nbsp;» écrit par [Dudley Storey](https://twitter.com/dudleystorey).

Cela signifie que la balise nʼest fonctionnelle que si le contenu qui est censé le remplacer est présent. Pour la plupart des éléments remplacés, ça a peu dʼincidence puisque cʼest le système qui sʼen charge —&nbsp;cʼest notamment le cas des éléments de formulaire tels que `input`, `textarea` ou `select`.

En revanche dʼautres éléments ont besoin quʼon leur dise par quoi ils vont être remplacés, et le système nʼintervient pas. Cʼest donc le cas des `img`. Ainsi, si malencontreusement la source est introuvable, lʼélément nʼest pas remplacé et peut alors supporter les pseudos-éléments. Voilà, vous savez tout.

## Le test de la source manquante dans a11y.css

Comble de lʼironie, ça fait bientôt deux ans que jʼapplique [un test dans a11y.css pour vérifier que la source est mentionnée](http://ffoodd.github.io/a11y.css/errors.html#no-src).[^1]

[^1]: Impossible de vérifier, lorsque la source est présente, quʼelle est bel et bien valide. Dommage.

Mais alors, se pourrait-il que cette astuce fonctionne également sur ce type de champ&nbsp;? **Et bien oui.** Je vous ai préparé [un codePen de démonstration avec le champ de type image](http://codepen.io/ffoodd/pen/vGJPLe).

Ce nʼest pas une révolution —&nbsp;et globalement personne ne sʼen servira&nbsp;— mais allez savoir.

Notons tout de même que si la technique est amusante, **vous ne devriez jamais avoir à vous en servir et vous assurer systématiquement que vos images sont bien là**. Les alternatives sont primordiales, mais si vous nʼavez pas dʼimage à afficher, mettez du texte 🙂