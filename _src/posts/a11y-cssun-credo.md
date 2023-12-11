---
title: "a11y.css&thinsp;:&nbsp;un crédo"
date: "2013-12-04T16:43:09"
modified: "2015-07-03T10:49:03"
permalink: "a11y-cssun-credo/index.html"
excerpt: "<p>Étant conscient de mes lacunes, je cherche constamment à améliorer la qualité des sites que je produis. Capitaliser sur les bonnes pratiques est une base, et c’est pourquoi j’ai «&nbsp;fabriqué&nbsp;» a11y.css. <a href="https://www.ffoodd.fr/a11y-cssun-credo/" aria-hidden="true">Lire la suite de «&nbsp;a11y.css&thinsp;:&nbsp;un crédo&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p><code>a11y.css</code> <sup aria-describedby="note-1" id="lien-1" data-note="a11y est la contraction de «&thinsp;Accessibility&thinsp;» : un «&thinsp;a&thinsp;» suivi de 11 caractères, et conclu par un «&thinsp;y&thinsp;»."><a class="scroll print-hidden" href="https://www.ffoodd.fr/a11y-cssun-credo/#note-1" title="a11y est la contraction de «&thinsp;Accessibility&thinsp;» : un «&thinsp;a&thinsp;» suivi de 11 caractères, et conclu par un «&thinsp;y&thinsp;».">[1]</a></sup>  me permet de surveiller lors de l’intégration les erreurs graves ou les améliorations possibles, et ça s’avère très agréable&thinsp;! Déjà utilisé au travail et sur mes projets «&thinsp;à-côté&thinsp;», puis soumis à la relecture et aux tests de <a href="https://twitter.com/GaetanBt" title="Gaëtan Bonnot sur Twitter (nouvelle fenêtre)" target="_blank">Gaëtan</a> et <a href="http://www.kloh.ch/" title="Le site personnel de Luc Poupard (nouvelle fenêtre)" target="_blank">Luc</a>, j’ai finalement décidé de vous le présenter. S’il est possible de l’améliorer encore, j’aimerais le faire :).</p>
<h2>Les références</h2>
<h3>Les projets reposant sur CSS</h3>
<p>Le premier projet de ce type que j’ai rencontré est <a href="http://red-root.com/sandbox/holmes/" title="Présentation de Holmes.css, en anglais (nouvelle fenêtre)" target="_blank">Holmes.css</a>. L’idée m’a rapidement séduit. Des projets similaires ont fleuri, dont&thinsp;:&nbsp;</p>
<ul>
<li><a href="https://github.com/karlgroves/diagnostic.css" title="Diagnostic.css sur GitHub (nouvelle fenêtre)" target="_blank">Diagnostic.css</a> par Karl Groves&thinsp;;</li>
<li><a href="https://github.com/nternetinspired/debug-css" title="Debug-CSS sur GitHub (nouvelle fenêtre)" target="_blank">Debug-css</a> par Seth Warburton.</li>
</ul>
<p>La découverte d’<a href="http://opquast.com/fr/" title="Le site OpQuast (nouvelle fenêtre)" target="_blank">OpQuast</a> et des <a href="http://checklists.opquast.com/fr/" title="Les bonnes pratiques d’OpQuast (nouvelle fenêtre)" target="_blank">bonnes pratiques</a> ayant accentué mon exigence, les outils précédemment cités m’ont semblé un peu légers.</p>
<h3>Les checklists</h3>
<p>Définir des <strong>«&thinsp;checklists qualités&thinsp;»</strong> est également une bonne idée, et les exemples lus dans <em>«&thinsp;Intégration web, les bonnes pratiques&thinsp;»</em> de <a href="https://twitter.com/schillinger" title="Corine Schillinger sur Twitter (nouvelle fenêtre)" target="_blank">Corinne Schillinger</a> ou dans le projet <a href="https://github.com/htmlzengarden/outline/blob/master/index.md" title="La checklist d’Outline sur GitHub (nouvelle fenêtre)" target="_blank">Outline</a> de <a href="https://twitter.com/htmlvv" title="Vincent Valentin sur Twitter (nouvelle fenêtre)" target="_blank">Vincent Valentin</a> m’ont persuadé de tenter cette solution. Cependant, c’est plus contraignant que les solutions de repérage en CSS, et légèrement différent puisqu’une solution CSS ne permettra pas d’évaluer la pertinence des textes ou solutions techniques. Les checklists sont également rapidement contextuelles à un projet, puisque les objectifs et contraintes peuvent varier&thinsp;&mdash;&thinsp;je cherchais plutôt un outil générique.</p>
<h3>Les solutions en ligne</h3>
<p>Les solutions automatisées en ligne sont également très utiles, mais ne permettent pas de faire un suivi au fil de l’eau. Je m’en sers lorsque je touche au but, à savoir en préambule à une recette complète. Voici une liste de ceux que j’affectionne particulièrement&thinsp;:&nbsp;</p>
<ul>
<li><a href="http://reporting.opquast.com/fr/" title="Le site d’OpQuast Reporting (nouvelle fenêtre)" target="_blank">OpQuast Reporting</a></li>
<li><a href="http://tanaguru.com/" title="Le site de Tanaguru (nouvelle fenêtre)" target="_blank">Tanaguru</a></li>
<li><a href="http://validator.w3.org/" title="Le service de validation du W3C (nouvelle fenêtre)" target="_blank">Le Validator</a> du <abbr title="World Wide Web Consortium" lang="en">W3C</abbr></li>
</ul>
<p>Mais à moins que vous ne soyez fan des allers-retours, ces services ne sont pas adaptés à une utilisation intensive.</p>
<h2>Une organisation lisible</h2>
<p>J’ai donc travaillé sur ce fichier CSS pendant un moment, égrainant les règles à tester, les façons d’afficher le message, etc. <a href="https://www.ffoodd.fr/sass-commencez-par-les-deux-s/" title="Sass : commencez par les deux « S »">Mon récent apprentissage de Sass</a> m’a permis d’organiser beaucoup plus précisément ce fichier, en définissant quatre degrés de gravité&thinsp;:&nbsp;</p>
<ul>
<li><strong>Les erreurs</strong>, dénoncées en rouge&thinsp;:&nbsp;principalement des attributs absents, vides ou très fortement déconseillés&thinsp;;</li>
<li><strong>Les alertes</strong>, signalées en jaune&thinsp;:&nbsp;notamment les éléments vides, les imbrications douteuses et les attributs sensibles&thinsp;;</li>
<li><strong>Les éléments &#038; attributs obsolètes</strong>, marqués en gris et relevés d’après <a href="http://www.w3.org/TR/html5/obsolete.html#obsolete" title="Liste des éléments et attributs obsolètes en HTML sur le site du W3C (nouvelle fenêtre)" target="_blank">la liste maintenue par le W3C</a>&thinsp;;</li>
<li><strong>Les conseils</strong>, mentionnés en vert. Il s’agit de simples suggestions d’utilisation de certains attributs, ou de bonnes pratiques méconnues.</li>
</ul>
<p>L’organisation du projet est simple&thinsp;:&nbsp;la feuille de style «&thinsp;reine&thinsp;» contient un mixin, quelques explications et des placeholders pour chaque degré de gravité. Des fichiers partiels sont importés en deux groupes&thinsp;:&nbsp;un pour les sélecteurs &mdash; pour la maintenabilité, c’est bien plus lisible ainsi &mdash; et un pour les messages eux-mêmes.</p>
<h2>Une cible précise</h2>
<p>Comme vous vous en doutez, cet outil n’est destiné qu’aux intégrateurs soucieux de la qualité de leur production. C’est pourquoi la compatibilité des sélecteurs et de l’affichage des messages ne prend pas en compte IE8 :D. </p>
<p>De plus, les messages sont affichés via un pseudo-élément <code>::after</code> &mdash; et vous le savez sûrement, mais <a href="http://www.karlgroves.com/2013/08/26/css-generated-content-is-not-content/" title="Article de Karl Groves sur le contenu généré en CSS (en anglais - nouvelle fenêtre)" target="_blank">les contenus générés via des pseudos-éléments ne sont pas du contenu.</a></p>
<p>Et pour que ça ne me gratte pas trop la rétine, j’ai également ajouté un effet de transition pour l’apparition du message.</p>
<h2>La documentation</h2>
<p>Reste une question à se poser&thinsp;:&nbsp;comment ai-je choisi les tests à effectuer, les formulations des messages et leur degré de gravité respectif ?</p>
<p>Pour faire simple, j’ai lu. Beaucoup. Les premières ressources ont été les projets similaires déjà cités, bien sûr. Puis je me suis inspiré des indications récurrentes obtenues sur Tanaguru ou OpQuast Reporting. La page du W3C listant les éléments obsolètes s’est imposée d’elle-même en tant que ressource complète pour un degré bien précis de vérification.</p>
<p>Et finalement, <a href="http://www.accessiweb.org/forumhtml5/index.php" title="(nouvelle fenêtre)" target="_blank">le forum de discussion du référentiel AccessiWeb pour sa version 2.2</a> (&thinsp;sous-titré <em>«&thinsp;Mesure de la conformité <abbr lang="en" title="Web Content Acessibility Guidelines">WCAG</abbr> 2.0 via le référentiel AccessiWeb 2.2 avec <abbr lang="en" title="HyperText Markup Language 5">HTML5</abbr>/<abbr lang="en" title="Accessible Rich Internet Application">ARIA</abbr>&thinsp;»</em>&thinsp;) que m’avait précédemment indiqué <a href="https://twitter.com/johan_ramon" title="Johan Ramon sur Twitter (nouvelle fenêtre)" target="_blank">Johan Ramon</a> m’a appris énormément.</p>
<p>Car oui&thinsp;:&nbsp;j’ai tout lu, tout détaillé. Pour chaque critère j’ai essayé d’en saisir le sens, les implications techniques et fonctionnelles, mais aussi ma capacité à les vérifier en CSS. C’est pourquoi les fichiers <code>.scss</code> sont plutôt bien documentés&thinsp;:&nbsp;chaque test indique, via un commentaire, le critère Accessiweb et/ou la bonne pratique OpQuast concerné(es).</p>
<p>Les tests susceptibles d’évoluer ou dont la vérification en CSS m’a semblé discutable ont été soit retirés, soit inclus aux conseils avec la mention utile concernant le contexte de rédaction du test en question.</p>
<h2>Une capitalisation indispensable</h2>
<p>Voilà, vous savez tout. J’estime ce projet suffisamment mûr pour être soumis aux regards de tous, en espérant que ceux-là me permettront d’enrichir encore cet outil qui m’aide déjà beaucoup.</p>
<p>J’ai peu détaillé l’origine concrète de ce projet et <strong>comment il est né d’un réel besoin</strong>. Il faut savoir que dans mon travail, je ne maîtrise pas toujours l’environnement de la phase d’intégration. Lorsqu’un nouveau projet est lancé, il peut parfois m’être imposé un thème (&thinsp;sur WordPress&thinsp;) ou une solution (&thinsp;Prestashop, si tu nous regardes&thinsp;)&thinsp;;&nbsp;et lorsqu’il s’agit d’une maintenance ou d’une refonte partielle, je ne vous raconte pas ce que je déterre parfois…</p>
<p>C’est dans ce cadre qu’<code>a11y.css</code> prend tout son sens. Car si vous maîtrisez parfaitement la chaîne de production, il ne pourra vous servir que de pense-bête (&thinsp;car vous aurez déjà appliqué toutes les bonnes pratiques, n’est-ce pas ?&thinsp;), surtout si vous automatisez ce type de tâches grâce à <a href="http://gruntjs.com/" title="Le site de Grunt, en anglais (nouvelle fenêtre)" target="_blank">Grunt</a> ou d’autres outils du même acabit.</p>
<p>Alors, qu’en dites-vous ?</p>
