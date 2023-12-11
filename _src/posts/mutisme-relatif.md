---
title: "Mutisme relatif"
date: "2014-05-17T11:59:35"
modified: "2015-07-03T10:48:05"
permalink: "mutisme-relatif/index.html"
excerpt: "<p>Restant muet depuis plusieurs semaines, il m’a semblé bon de faire un point sur le pourquoi du comment. Les changements opérés en quelques mois, les nouveautés à afficher ainsi que les projets en cours et à venir devraient me permettre de me projeter dans cette année qui s’annonce très riche ! <a href="https://www.ffoodd.fr/mutisme-relatif/" aria-hidden="true">Lire la suite de «&nbsp;Mutisme relatif&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Voici un résumé de mes activités des derniers mois, ainsi que de mes projets pour cette année. Je souhaite seulement signaler que cette baisse de régime dans mes publications n’est que temporaire.</p>
<h2>Les actualités</h2>
<h3>Le plan professionnel</h3>
<p>Le principal événement qui s’est produit est mon changement d’employeur&nbsp;: je travaille désormais chez Kosmos, toujours à Nantes. C’est un travail d’un tout autre genre que celui que j’effectuais pour l’<a title="(nouvelle fenêtre)" href="http://www.1-ter-net.com" target="_blank">agence 1-ter-net</a> puisque Kosmos est un éditeur de progiciel. Pour être plus précis je vais travailler sur le <em lang="en">front-end</em> de la solution K-d’école, afin d’en améliorer la qualité globale, l’accessibilité —&nbsp;et d’en faciliter la prise en main, la personnalisation et les évolutions futures.</p>
<p>J’apporte avec moi certaines compétences sur les aspects graphiques et ergonomiques qui participeront aussi à conserver un <em lang="en">front-end</em> et un <em lang="en">look &amp; feel</em> homogènes pour renforcer l’identité de la solution.</p>
<h3>Le plan personnel</h3>
<p>Après mon travail sur <a href="http://www.lanizanerie.com">La Nizanerie</a> l’an passé —&nbsp;qui reste un projet vivant&nbsp;— j’ai aidé à mettre en ligne le site du <a href="http://aupetitmarchenature.fr/">Petit Marché Nature</a> pour des amis. Ce fut plus un accompagnement qu’une création de site puisque nous nous sommes basés sur un thème Prestashop à peine revu.</p>
<p>J’ai également soutenu mon frère <a href="http://www.kloh.ch">Luc Poupard</a> (<abbr lang="en" title="Also known as">a.k.a</abbr> <a href="https://twitter.com/klohFR">KlohFR</a>) à personnaliser mon thème <a href="https://github.com/ffoodd/ffeeeedd">ffeeeedd</a> et à approfondir ses connaissances de WordPress, dans le cadre de son projet <a href="http://continuums.ma3yt.com/">Continuum(s)</a> mené avec son ami plasticien <a href="http://www.olivier-vary.com/">Olivier Vary</a> (<abbr lang="en" title="Also known as">a.k.a</abbr> <a href="https://twitter.com/Bendder08">Bendder</a>). C’est également un projet enrichissant puisque Luc a permis de faire évoluer mon thème, son fonctionnement et certaines extensions et ainsi gagner en qualité et en souplesse.</p>
<p>Ce qui m’amène aux projets personnels qui m’occupent, depuis longtemps et <em>a priori</em> encore pour un bon moment.</p>
<h2>Les projets</h2>
<h3>Les origines en 2013</h3>
<p>Nous parlions du thème WordPress que j’ai développé depuis plus d’un an et demi maintenant&nbsp;: je continue, et je creuse toujours plus. Beaucoup de choses ont évoluées depuis <a title="À venir : ffeeeedd" href="https://www.ffoodd.fr/a-venir-ffeeeedd/">ma première annonce</a>, notamment sur un plan technique.</p>
<p>Je suis dans un premier temps passé aux thèmes enfants, dont le mécanisme est un réel bénéfice pour quiconque veut modifier un thème. Je m’étais conçu un processus de travail tout à fait personnel, en deux temps&nbsp;:</p>
<ol>
<li><a href="https://github.com/ffoodd/ffeeeedd--developpement">ffeeeedd&#8211;développement</a> devait me permettre d’étendre facilement le thème parent, en ajoutant gabarits, scripts et styles directement&nbsp;;</li>
<li><a href="https://github.com/ffoodd/ffeeeedd--production">ffeeeedd&#8211;production</a> était la version optimisée pour la production&nbsp;: scripts et styles concaténés et minifiés à la main, sprites et images optimisés, etc.</li>
</ol>
<p>Ce mécanisme a très bien fonctionné pendant plusieurs mois, durant lesquels il a été utilisé sur plusieurs projets. Au fil du temps j’ai tout de même atteint certaines limites, et mes recherches m’ont amené deux réflexions parallèles&nbsp;:</p>
<ul>
<li>certaines évolutions que j’ajoutais au thème enfant dépendait plutôt du «&nbsp;territoire des extensions&nbsp;» dans WordPress&nbsp;;</li>
<li>mes procédures d’optimisation et de personnalisation des styles étaient lourdes et redondantes.</li>
</ul>
<h3>ffeeeedd&#8211;extensions</h3>
<p>Ce qui m’a naturellement conduit à développer une <a href="https://github.com/ffoodd/ffeeeedd--extensions">flotille d’extensions</a> afin de déporter certaines fonctionnalités vers des extensions, et d’en créer de nouvelles qui n’alourdiront pas inutilement le thème.</p>
<h3>ffeeeedd&#8211;sass</h3>
<p>Dans le même temps, j’ai complètement revu ma façon de travailler et me suis lentement mis à utiliser Sass, puis quelques portions de Compass. Je dis bien lentement puisque, <a href="https://www.ffoodd.fr/sass-commencez-par-les-deux-s/" title="Sass : commencez par les deux « S »">comme je l’ai fait remarquer dans un article</a> il y a quelques temps, j’ai tout fait pour éviter les pièges inhérents à ce type d’outils. Me faire gagner du temps, oui —&nbsp; mais sans perdre la qualité de mon travail. </p>
<p>J’abouti à <a href="https://github.com/ffoodd/ffeeeedd--sass">ffeeeedd&#8211;sass</a>, un thème enfant dont les styles s’appuient sur Sass, et ai utilisé PrePros pour homogénéiser facilement le traitement des scripts et des styles lors de leurs optimisations.</p>
<h3>ffeeeedd&#8211;racine</h3>
<p>Et pour parachever ce travail, un répertoire <a href="https://github.com/ffoodd/ffeeeedd--racine">ffeeeedd&#8211;racine</a> me permet de définir une configuration optimale de mon installation avec quelques légères modifications seulement.</p>
<h3>a11y.css</h3>
<p>Évidemment le thème enfant basé sur Sass embarque une version à jour de mon <a href="https://github.com/ffoodd/a11y.css">a11y.css</a> —&nbsp;qui est à mon sens ma plus belle réussite pour 2013. Ce projet a fédéré quelques personnes, m’a permis d’apprendre énormément de choses sur l’accessibilité en m’astreignant à lire plusieurs référentiels en entier, et j’ai fait de belles rencontres en en discutant.</p>
<p>Voilà ce qui m’a occupé la majeure partie de l’année 2013. Et le meilleur cas pratique que vous pourrez rencontrer pour l’ensemble de ce travail est le site que vous lisez actuellement.</p>
<p>Et il se pourrait que vous entendiez à nouveau parler de tout ça avant la fin 2014 🙂</p>
<h2>L’avenir</h2>
<p>Honnêtement, je vais travailler. Beaucoup. Mon nouvel emploi va me demander beaucoup de temps, de lectures et de recherches pour mener ce travail de front !</p>
<p>Mais parmi les choses dont je suis sûr, c’est que je vais aller à Paris Web cette année encore mais aussi assister au tout frais <a href="https://twitter.com/WPTechNantes">WPTech</a> qui va naître à Nantes fin 2014 —&nbsp;grâce à l’initiative de <a href="http://www.wabeo.fr">Willy Bahuaud</a> et <a href="http://www.seomix.fr">Daniel Roch</a>.</p>
<p>Alors, on se voit quand pour discuter de tout ça ?</p>
