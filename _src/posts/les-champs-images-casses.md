---
title: "Les champs images cassés"
date: "2016-03-31T10:27:00"
modified: "2016-03-31T10:27:00"
permalink: "les-champs-images-casses/index.html"
excerpt: "<p>Il y a quelques jours, <a href="http://bitsofco.de/" hreflang="en">Ire Aderinokun</a> a dévoilé que les images cassées supportaient les pseudo-éléments. En bossant sur <a href="https://github.com/ffoodd/a11y.css" hreflang="en">a11y.css</a>, je me suis aperçu que ça valait également pour les champs images. <a href="https://www.ffoodd.fr/les-champs-images-casses/" aria-hidden="true">Lire la suite de «&nbsp;Les champs images cassés&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p><a href="http://bitsofco.de/" hreflang="en">Ire Aderinokun</a> a brisé un mythe il y a quelques jours à propos des pseudos-éléments sur la balise <code>img</code>.</p>
<h2>On récapitule, pour ceux du fond</h2>
<p>Lʼélément <code>img</code> est ce quʼon appelle <strong>un élément remplacé</strong>. Je vous conseille à ce propos la lecture de «&nbsp;<a href="http://la-cascade.ghost.io/quest-ce-quun-element-remplace/">Qu’est-ce qu’un élément remplacé&nbsp;?</a>&nbsp;», traduction en français sur La Cascade de «&nbsp;<a href="https://demosthenes.info/blog/461/What-The-Heck-Is-A-Replaced-Element#" lang="en" hreflang="en">What The Heck Is A Replaced Element?</a>&nbsp;» écrit par <a href="https://twitter.com/dudleystorey">Dudley Storey</a>.</p>
<p>Cela signifie que la balise nʼest fonctionnelle que si le contenu qui est censé le remplacer est présent. Pour la plupart des éléments remplacés, ça a peu dʼincidence puisque cʼest le système qui sʼen charge —&nbsp;cʼest notamment le cas des éléments de formulaire tels que <code>input</code>, <code>textarea</code> ou <code>select</code>.</p>
<p>En revanche dʼautres éléments ont besoin quʼon leur dise par quoi ils vont être remplacés, et le système nʼintervient pas. Cʼest donc le cas des <code>img</code>. Ainsi, si malencontreusement la source est introuvable, lʼélément nʼest pas remplacé et peut alors supporter les pseudos-éléments. Voilà, vous savez tout.</p>
<h2>Le test de la source manquante dans a11y.css</h2>
<p>Comble de lʼironie, ça fait bientôt deux ans que jʼapplique <a href="http://ffoodd.github.io/a11y.css/errors.html#no-src" hreflang="en">un test dans a11y.css pour vérifier que la source est mentionnée</a><sup aria-describedby="note-1" id="lien-1" data-note="Impossible de vérifier, lorsque la source est présente, quʼelle est bel et bien valide. Dommage."><a class="scroll print-hidden" href="https://www.ffoodd.fr/les-champs-images-casses/#note-1" title="Impossible de vérifier, lorsque la source est présente, quʼelle est bel et bien valide. Dommage.">[1]</a></sup>. Ainsi en découvrant lʼarticle dʼIre Aderinokun, jʼai immédiatement pensé que je pourrais mʼen servir pour a11y.css. Ni une ni deux, je tente le diable. Cʼest là que jʼai constaté que ce test sʼappliquait également aux <code>input[type=&quot;image&quot;]</code>.</p>
<p>Mais alors, se pourrait-il que cette astuce fonctionne également sur ce type de champ&nbsp;? <strong>Et bien oui.</strong> Je vous ai préparé <a href="http://codepen.io/ffoodd/pen/vGJPLe">un codePen de démonstration avec le champ de type image</a>.</p>
<p>Ce nʼest pas une révolution —&nbsp;et globalement personne ne sʼen servira&nbsp;— mais allez savoir.</p>
<p>Notons tout de même que si la technique est amusante, <strong>vous ne devriez jamais avoir à vous en servir et vous assurer systématiquement que vos images sont bien là</strong>. Les alternatives sont primordiales, mais si vous nʼavez pas dʼimage à afficher, mettez du texte 🙂</p>
