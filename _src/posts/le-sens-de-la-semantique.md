---
title: "Le sens de la sémantique"
date: "2016-06-24T16:06:10"
modified: "2016-06-27T12:42:49"
permalink: "le-sens-de-la-semantique/index.html"
excerpt: "<p>Encore une réflexion ce matin, dans le train, sur les changements de conception des styles qui remuent notre milieu en 2016. <a href="https://www.ffoodd.fr/le-sens-de-la-semantique/" aria-hidden="true">Lire la suite de «&nbsp;Le sens de la sémantique&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Mais probablement pas pour les raisons auxquelles vous pourriez penser de prime abord, je pense. Attention, ceci nʼest quʼune réflexion et sera peut-être truffée dʼerreurs, pleine de non sens et de raccourcis.</p>
<h2>La séparation du fond et de la forme</h2>
<p>Ce principe est assez clair. Parfois on lʼassocie également à un autre principe, celui de la répartition des responsabilités —&nbsp;en anglais, <i lang"en">separation of concern</i>&nbsp;— et on aboutit généralement à celui de la responsabilité unique —&nbsp;<i lang="en">single responsibility</i>, toujours chez nos amis anglophones.</p>
<p>Dans mes langages dʼaffection que sont le HTML et le <abbr lang="en" title="Cascading StyleSheet">CSS</abbr>, ça se traduit actuellement par les CSS atomiques —&nbsp;dont jʼai déjà parlé, et sur lesquels je vous invite à vous renseigner.</p>
<p>En développement web et notamment sur le <i lang="en">front-end</i>, la conception <abbr title="Modèle, Vue, et autre">MV*</abbr> en est le digne représentant. Sommairement, chaque couche a une responsabilité précise&nbsp;: </p>
<ul>
<li>le modèle est celui des données (pures et dures)&nbsp;;</li>
<li>la vue est lʼinterface utilisateur&nbsp;;</li>
<li>et le reste sert à manipuler tout ça comme un marionnettiste —&nbsp;la plupart du temps, on parle de contrôleur.</li>
</ul>
<p>Super, le tour du propriétaire est terminé. Vous voulez mon avis&nbsp;? <strong>Cʼest nul et non applicable aux couches HTML et CSS.</strong></p>
<h2>Lʼimportance du HTML</h2>
<p>Un rapide cours dʼhistoire est déjà fait dans lʼintroduction de lʼarticle. Le mauvais emploi de balises HTML à des fins de présentation a traumatisé pas mal de monde, il y a de ça 10 ou 15 ans. Les tableaux, les éléments —&nbsp;coucou <code>font</code>, <code>big</code>, <code>blink</code>, <code>center</code>, <code>marquee</code> ou <code>spacer</code>&nbsp;— et attributs dédiés en sont pour beaucoup.</p>
<p>Là encore, je souhaite nuancer&nbsp;: ce ne sont que des outils. Les ouvriers qui sʼen sont servis ont fait nʼimporte quoi avec. Cʼest ça, la véritable histoire. On sʼest donc mis en tête de récupérer un vieux principe de programmation et de lʼappliquer tant bien que mal sur HTML et CSS en disant&nbsp;:</p>
<blockquote><p>HTML est le fond, CSS est la forme&nbsp;<sup aria-describedby="note-1" id="lien-1" data-note="Toute ressemblance avec le slogan dʼune enseigne de sport est parfaitement fortuite."><a class="scroll print-hidden" href="https://www.ffoodd.fr/le-sens-de-la-semantique/#note-1" title="Toute ressemblance avec le slogan dʼune enseigne de sport est parfaitement fortuite.">[1]</a></sup></p></blockquote>
<p>Cʼétait un moyen simple et efficace dʼéjecter du versant HTML ce qui avait trait à la présentation. Et ça, c&rsquo;était bien. En effet le HTML doit être employé pour sa sémantique, <strong>le sens quʼil apporte au contenu quʼil balise</strong>. Car cʼest tout ce quʼest censé faire ce langage&nbsp;: décrire le contenu sur le plan sémantique.<br />
<strong><br />
Utiliser des propriétés de style dans le HTML revient à corrompre la sémantique</strong>&nbsp;: le contenu ne sera plus marqué correctement et pourra donc être mal interprété. Et ça, cʼest mal.</p>
<h3>En quoi est-ce contradictoire avec la séparation fond/forme&nbsp;?</h3>
<p>Jʼai esquissé pourquoi il fallait éviter de mettre des informations de styles dans le HTML. Cʼétait pas trop compliqué. </p>
<p>Cependant aujourdʼhui, cet argumentaire ressurgit pour justifier lʼutilisation de classes partout, tout le temps, dans nos CSS. On nous recommande de ne pas utiliser de sélecteurs dʼéléments ou dʼattributs —&nbsp;voire même dʼimbrications comme <code>ul &gt; li</code>&nbsp;— car elles induisent un lien trop fort avec le HTML et enfreigne donc ce concept de séparation du fond et de la forme.</p>
<p>Précisons mon avis sur le sujet&nbsp;: <strong>ce principe ne vaut pas pour les CSS</strong>. Je poursuis sur ma lancée.</p>
<h2>À quoi sert le style&nbsp;?</h2>
<p>Selon moi, il sert à hiérarchiser visuellement les éléments les uns des autres. Un «&nbsp;gros titre&nbsp;», les «&nbsp;petites lignes&nbsp;»… Ces expressions décrivent un contenu dʼaprès leur aspect visuel mais aussi et surtout, leur (relative) importance sémantique.</p>
<p>Pour résumer le fond de ma pensé&nbsp;: si un élément est important sémantiquement côté HTML, il devrait avoir <strong>une représentation visuelle qui reflète cette importance</strong>. </p>
<p>Pourquoi&nbsp;? </p>
<p>Mais ma bonne dame, parce que sinon vous induirez une distinction entre diverses méthodes de lecture de votre contenu —&nbsp;entre les technologies qui lisent le code (les robots, les lecteurs d&rsquo;écrans, les moteurs en tous genres) et celles qui regardent le style (les personnes bien voyantes, les captures dʼécran, et certains moteurs tels que les outils de test de régression visuelle). Et ça, cʼest pas terrible. Cʼest même plutôt pourri, à mon avis.</p>
<p>En fait jʼirais encore plus loin&nbsp;: si vous séparez trop votre forme de votre fond&nbsp;<sup aria-describedby="note-2" id="lien-2" data-note="Notez lʼordre des termes fond/forme, forme/fond."><a class="scroll print-hidden" href="https://www.ffoodd.fr/le-sens-de-la-semantique/#note-2" title="Notez lʼordre des termes fond/forme, forme/fond.">[2]</a></sup>, <strong>vous permettez à vos CSS de falsifier visuellement la hiérarchisation de vos contenus</strong>. Ceci nʼest, toujours à mon avis, pas souhaitable.</p>
<p><strong>Lʼaspect graphique devrait renforcer la structure de lʼinformation et la hiérarchisation des contenus</strong>, pas la gommer ni la falsifier.</p>
<h2>Encore un peu dʼhistoire</h2>
<p>Au fait, vous souvenez-vous que CSS est ce qu&rsquo;on appelle un langage descriptif&nbsp;? Dʼailleurs, les plus vieux dʼentre vous se rappelleront sans doute quʼà lʼorigine <strong>CSS nʼétait pas destiné aux styles visuels</strong> mais à la description de la présentation du contenu. Et non, ce nʼest pas pareil. Cela comprenait lʼaspect graphique, mais aussi <a href="https://www.w3.org/TR/CSS2/media.html#media-types" hreflang="en">dʼautres médias oubliés, de nos jours</a>. Voyez plutôt.</p>
<ul>
<li>La vocalisation avec le média <code>speech</code> —&nbsp;on parlait de feuille de styles orales (en CSS1, le média se nommait dʼailleurs <code>aural</code>), qui comprenaient le contrôle du volume, de la vitesse, mais aussi du type de voix (masculine ou féminine, par exemple). <a href="https://www.w3.org/TR/CSS2/aural.html" hreflang="en">Jetez un œil à lʼappendice à la spécification CSS2 (en anglais)</a>. Tout ceci nʼa jamais vraiment été implémenté, sauf par Opéra il y a fort longtemps.</li>
<li>Le braille, avec les médias <code>braille</code> et <code>embossed</code>, qui permettaient de contrôler respectivement le rendu par une plage de lecture braille et par une imprimante braille.</li>
<li>Les projecteurs grâce au média <code>projection</code>, ainsi que les écrans de télévision avec le média <code>tv</code>.</li>
<li>Les téléscripteurs (ou prompteurs), terminaux et tous les systèmes avec des capacités dʼaffichage limitées aux fontes monospaces avec le média <code>tty</code>.</li>
</ul>
<p>Dès la deuxième partie des années 90, les personnes travaillant sur la spécification CSS envisageaient cette multitude de façon dʼaccéder au contenu. Et aujourdʼhui on se gausse de faire un site qui sʼaffiche sur la plupart des écrans…</p>
<h2>Morale de lʼhistoire</h2>
<p>Simplifions. </p>
<p><strong>CSS ne devrait pas être utilisé pour altérer lʼimportance sémantique d&rsquo;un contenu.</strong> Et par extension, utiliser les sélecteurs dʼéléments ou dʼattributs semble une bonne idée. Je reformule au cas où&nbsp;: séparer le fond de la forme est une bonne idée, mais pas séparer la forme du fond. <strong>La forme dépend du fond, là où le fond ne dépend pas de la forme</strong>.</p>
<p>Pour ceux qui ont tenu jusque là, je vous invite à prendre le temps de lire <a href="https://fr.wikipedia.org/wiki/Feuilles_de_style_en_cascade">la page Wikipédia dédiée à CSS</a>. Cʼest fort intéressant&nbsp;<sup aria-describedby="note-3" id="lien-3" data-note="Par exemple, on y apprend que le mécanisme de la cascade tant décrié de nos jours par lʼécosystème des développeurs JS est conçu pour permettre aux utilisateurs dʼappliquer leurs propres styles. Cʼest oublié, mais ça nʼen reste pas moins génial."><a class="scroll print-hidden" href="https://www.ffoodd.fr/le-sens-de-la-semantique/#note-3" title="Par exemple, on y apprend que le mécanisme de la cascade tant décrié de nos jours par lʼécosystème des développeurs JS est conçu pour permettre aux utilisateurs dʼappliquer leurs propres styles. Cʼest oublié, mais ça nʼen reste pas moins génial.">[3]</a></sup>.</p>
