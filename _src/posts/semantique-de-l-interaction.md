---
title: "Sémantique de l&rsquo;interaction"
date: "2011-03-05T11:52:36"
modified: "2013-10-03T10:14:18"
permalink: "semantique-de-l-interaction/index.html"
excerpt: "<p>Saviez-vous que le langage entre êtres humains dépend à 80% des expressions physiques &#8211; même infimes ? Il en va de même pour les sites internet. Un internaute ressent &#8211; et comprend &#8211; un site grâce à son comportement : mouvements, animations, changements de couleurs, etc.. Les sites ont des sentiments, eux aussi ! <a href="https://www.ffoodd.fr/semantique-de-l-interaction/" aria-hidden="true">Lire la suite de «&nbsp;Sémantique de l&rsquo;interaction&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Saviez-vous que le langage entre êtres humains dépend à 80% des expressions physiques &#8211; même infimes ? <strong>Il en va de même pour les sites internet.</strong> Un internaute ressent &#8211; et comprend &#8211; un site grâce à son comportement : mouvements, animations, changements de couleurs, etc…</p>
<h2>Les sites ont des sentiments, eux aussi</h2>
<p>Et ils s&rsquo;expriment afin de vous les transmettre : un décalage léger au survol, un changement subtil de couleur et une sensation de souffle vous parvient. Le site respire, s&rsquo;agite, réagit. Il peut être d&rsquo;une douceur surprenante comme d&rsquo;une agressivité détonante, et rien ne l&#8217;empêche d&rsquo;être incohérent &#8211; voire complétement fou. Ces caractéristiques, qu&rsquo;elles soient maîtrisées ou non, ont un impact sur l&rsquo;utilisation du site : les sensations varient, et par conséquent le confort de navigation, l&rsquo;impression donnée, l&rsquo;affection éprouvée par l&rsquo;internaute varient eux aussi.</p>
<p>Mais soyez prudents : cela peut rendre votre site extrêmement attractif ou définitivement désagréable. Là encore, le même mécanisme opère &#8211; que l&rsquo;on parle d&rsquo;êtres humains ou de site : <strong>la première impression est déterminante</strong>.</p>
<h2>Au-delà de la technique</h2>
<p>Il vous incombe de penser à cet aspect du site. D&rsquo;après une ligne directrice ( le plus souvent décidée dans un brief créatif ), vous devez pouvoir déterminer ce qu&rsquo;exprimera le site. <strong>Doit-il être sympathique, serein, énergique…?</strong></p>
<p>Vous disposez alors de tout un panel de techniques css afin d&rsquo;aboutir au résultat escompté, en veillant à ne pas produire de contresens. Vous pouvez vous pencher sur les transitions, les transformations, les animations ou encore les changements de couleurs pour arriver à vos fins. Les plus utiles seront malgré tout les pseudo-classes :hover et :focus.</p>
<h2>Le :hover pour la suggestion</h2>
<p>Prenons l&rsquo;exemple d&rsquo;un accordéon.</p>
<p>Il est de bon ton d&rsquo;indiquer visuellement l&rsquo;existence de l&rsquo;accordéon par une flèche vers le bas, ou encore un « + ». On ajoute en général au :hover un <em style="cursor: pointer;">curseur pointeur</em>, qui suggère l&rsquo;interaction potentielle avec cet élément.</p>
<p>Ceci est le comportement classique : il induit pour l&rsquo;internaute que s&rsquo;il clique à cet endroit, quelque chose se passera. <strong>Pourquoi ne pas pousser un peu plus loin cette suggestion ?</strong></p>
<div class="exemple"><a id="ouvrir"></a>+</p>
<div>Suspense !! Que va-t&rsquo;il se passer si je clique ?</div>
</div>
<p>Dans cet exemple, on suggère effectivement l&rsquo;interaction mais on dévoile également l&rsquo;étape suivante. Dévoiler pour attirer l&rsquo;action : il s&rsquo;agit du <strong>mécanisme de la séduction</strong>.</p>
<h2>Le :focus pour la signalisation</h2>
<p>L&rsquo;intérêt majeur du :focus concerne les éléments de formulaires : il permet d&rsquo;indiquer quel est le champ sélectionné ( à savoir : celui qui se remplira si on pianote sur son clavier, même debout ). C&rsquo;est peut-être un détail pour vous, mais c&rsquo;est un facteur déterminant lors de la saisie d&rsquo;un formulaire. Et sémantiquement parlant, cela signifie que <strong>le site est attentif à vous</strong> et à ce que vous souhaitez.</p>
<p>Le comportement basique des navigateurs basés sur Webkit est d&rsquo;appliquer une ombre portée lors du :focus. Il s&rsquo;agit d&rsquo;un minimum syndical &#8211; dont le seul but est la signalisation de l&rsquo;état &#8211; et n&rsquo;a aucune prétention de communication. Malheureusement une partie sémantique est comprise dans les css, dont le choix des intitulés des pseudo-classes. Focus signifie, dans la langue de Shakespeare, concentration, mise au point. Hors appliquer une ombre portée est l&rsquo;exacte inverse : cela rend la forme diffuse.</p>
<p>Voila ce que donnerait le comportement inverse :</p>
<div class="exemple"><input id="f" type="text" value="Mise au point" /></div>
<p>une ombre portée qui s&rsquo;intensifie au :hover, et disparait au :focus. Saupoudrez-y un peu de transition, et ce champ qui réagit à votre passage semble réellement faire une mise au point lorsque vous le sélectionnez. L&rsquo;ombre est aspirée de manière fluide, et ce champ grossier devient organique, vivant. <strong>Il vous écoute</strong>.</p>
<h2>Toujours plus loin</h2>
<p>Au-delà de la métaphore du vivant, ces interactions basiques définissent la personnalité d&rsquo;un site : il convient alors de maîtriser ces aspects afin d&rsquo;améliorer l&rsquo;expérience utilisateur en véhiculant des sentiments. C&rsquo;est que je tente humblement de faire sur ce site, en amenant un peu de fraîcheur et de surprise sur chaque page.</p>
<p>Cette problématique me donne matière à réflexion tous les jours, mais par bonheur certains grands designers m&rsquo;inspirent régulièrement. Voici deux articles et un livre qui m&rsquo;ont particulièrement intéressé sur le sujet :</p>
<ul>
<li><a href="http://desandro.github.com/motion-emotion/" target="_blank"><strong>Motion/Emotion</strong> par David Desandro</a></li>
<li><a href="http://daverupert.com/2011/07/interaction/" target="_blank"><strong>INTERACTION</strong> par Dave Rupert</a></li>
<li><a href="http://www.abookapart.com/products/designing-for-emotion" target="_blank"><strong>Designing for emotion</strong> par Aaron Walter</a></li>
</ul>
