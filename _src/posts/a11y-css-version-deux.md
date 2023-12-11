---
title: "a11y.css, version deux"
date: "2015-03-02T19:45:32"
modified: "2021-03-05T17:11:08"
permalink: "a11y-css-version-deux/index.html"
excerpt: "<p>Déjà deux ans depuis la première version d’<abbr title="Alix">a11y.css</abbr>. Mon intérêt et mon investissement n’ont pas changé, mais le sujet a énormément avancé sous l’impulsion de <a href="http://www.7studio.fr/">Xavier Zalawa</a>, <a href="http://hugogiraudel.com/">Hugo Giraudel</a>, <a href="http://www.kloh.ch/">Luc Poupard</a>, <a href="http://www.heydonworks.com/">Heydon Pickering</a>, <a href="http://gaetanbonnot.fr/">Gaëtan Bonnot</a>, <a href="https://twitter.com/goetsu">Romain Gervois</a>, <a href="https://github.com/a5e">Antoine</a> et <a href="https://github.com/olamedia">olamedia</a>. Cet apport de compétences variées a considérablement affûté cet outil. Voyons ça en détail ! <a href="https://www.ffoodd.fr/a11y-css-version-deux/" aria-hidden="true">Lire la suite de «&nbsp;a11y.css, version deux&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Ainsi depuis la toute première mouture (en <abbr title="Cascading StyleSheet">CSS</abbr>) de cette feuille de style de diagnostic, beaucoup de choses ont changé. Voyons ça en détail&nbsp;🙂</p>
<h2>Corrections multiples</h2>
<p>Comme vous pourrez le voir <a href="https://github.com/ffoodd/a11y.css/issues?q=is%3Aissue+is%3Aclosed">sur Github</a>, pas moins de 97 issues ont été résolues. Cela a été possible grâce aux retours de quelques personnes, que je tiens à citer et remercier à nouveau&nbsp;:</p>
<ul>
<li><a href="https://twitter.com/KittyGiraudel">Kitty Giraudel</a>&nbsp;;</li>
<li><a href="https://twitter.com/7studio">Xavier Zalawa</a>&nbsp;;</li>
<li><a href="https://twitter.com/heydonworks">Heydon Pickering</a>&nbsp;;</li>
<li><a href="https://twitter.com/klohFR">Luc Poupard</a>&nbsp;;</li>
<li><a href="https://twitter.com/GaetanBt">Gaëtan Bonnot</a>&nbsp;;</li>
<li><a href="https://github.com/a5e">Antoine</a>&nbsp;;</li>
<li><a href="https://twitter.com/goetsu">Aurélien Levy</a>&nbsp;;</li>
<li><a href="https://github.com/olamedia">Olamedia</a>&nbsp;;</li>
<li><a href="http://bveneman.nl/">Bart Veneman</a>.</li>
</ul>
<p>Entre les bugs et les découvertes diverses, la <strong>qualité</strong> et la <strong>pertinence</strong> d’<abbr title="Alix">a11y.css</abbr> ont considérablement progressé.</p>
<h3>Compteurs <abbr title="Cascading StyleSheet">CSS</abbr></h3>
<p>Les compteurs sont au nombre des améliorations simples mais utiles —&nbsp;ces choses parfois qualifiées de <em>quick win</em>. Même si l’idée cheminait dans mon esprit depuis longtemps, c’est l’implémentation dans <a href="https://yahoo.github.io/debugCSS/">le DebugCSS de Yahoo</a> qui a produit le déclic.</p>
<p>Les fonctions CSS de compteurs font partie des outils qui trouvent rarement un contexte d’utilisation pertinent. Pour une fois, c’est le cas&nbsp;!</p>
<h2>Personnalisation</h2>
<p>Après la fastidieuse relecture <a href="https://github.com/ffoodd/a11y.css/blob/master/README-fr.md#r%C3%A9f%C3%A9rences-et-inspirations">de mes différentes sources</a>, ce qui n’était qu’un simple fichier CSS de diagnostic est devenu un <strong>système complexe basé sur Sass</strong> —&nbsp;dont le fichier de sortie final compressé pèse 80<abbr title="kilobyte">kb</abbr> !</p>
<p>Il devenait indispensable de permettre aux utilisateurs le désirant de charger seulement les portions qui leur sont utiles. Avec l’aide de <a href="http://kittygiraudel.com/">Kitty Giraudel</a>, deux mécanismes ont été mis en place.</p>
<h3>Générateur de <em>bookmarklet</em></h3>
<p>Il était déjà possible aux utilisateurs de Sass de ne compiler que les niveaux de critères qui les intéressaient. Désormais, ces fichiers nivelés sont mis <a href="https://github.com/ffoodd/a11y.css/tree/master/css">à disposition dans le projet</a>.</p>
<p>Le <em>bookmarklet</em> existait depuis quelques temps déjà, mais désormais un petit formulaire <a href="http://ffoodd.github.io/a11y.css/">sur le site de présentation</a> permet de le paramétrer <strong>en définissant le niveau minimum</strong> nécessaire.</p>
<h3>Désactivation de tests</h3>
<p>Pour que les utilisateurs de Sass aient toujours un intérêt à disposer du projet sur leur poste, mais aussi afin que les utilisateurs les plus avertis puissent personnaliser cet outil, Kitty a également <a href="https://github.com/ffoodd/a11y.css/blob/master/README-fr.md#d%C3%A9sactiver-des-tests">conçu une fonction</a> pour désactiver les tests au cas par cas. Par exemple, si vous voulez désactiver les erreurs à propos des mauvais <code>tabindex</code> et du <code>href</code> manquant, voici comment faire&nbsp;:</p>
<pre><code class="language-css"><br />
@include disable-errors(&quot;tab-order, no-href&quot;);<br />
</code></pre>
<p>Et ça, c’est plutôt pratique 😀&nbsp;!</p>
<h2>Traduction</h2>
<p>Pour celle-ci, je vais applaudir discrètement et vous renvoyer vers <a href="http://kittygiraudel.com/2014/10/22/translation-system-in-sass/">l’article écrit par Kitty (en anglais)</a> qui détaille le fonctionnement de son <strong>système de traduction en Sass</strong>.</p>
<p>Oui, vous avez bien lu :désormais <abbr title="Alix">a11y.css</abbr> est multilingue en demeurant écrit uniquement en Sass. Outre la portée accrue de façon incroyable suite au passage en anglais, l’exploit technique de Kitty est incroyable. J’en profite pour signaler la parution de son premier livre «&nbsp;CSS3&nbsp;: pratique du design web&nbsp;» <a href="http://www.eyrolles.com/Informatique/Livre/css3-9782212140231">en vente aux éditions Eyrolles</a>, que je vous recommande chaudement<sup aria-describedby="note-1" id="lien-1" data-note="Sans rire, le mec est un génie alors achetez son livre et lisez son blog."><a class="scroll print-hidden" href="https://www.ffoodd.fr/a11y-css-version-deux/#note-1" title="Sans rire, le mec est un génie alors achetez son livre et lisez son blog.">[1]</a></sup>.</p>
<h2>Documentation &amp; test</h2>
<p>Vous vous en doutez, le projet est devenu relativement complexe. Les solutions apportées par les différents contributeurs on tellement enrichi ce projet que même moi, je ne m’y retrouvais plus.</p>
<p>J’avais déjà mentionné lors de <a title="WP Tech 2014" href="https://www.ffoodd.fr/wp-tech-2014/">mon atelier au WP Tech</a> mon <strong>intérêt pour la documentation</strong>&nbsp;; c’est donc tout naturellement que j’ai cherché à documenter plus précisément <abbr title="Alix">a11y.css</abbr>. Et de mon point de vue, il y a deux aspects très différents à documenter&nbsp;:</p>
<ul>
<li>le <strong>contenu des tests</strong>&nbsp;: pourquoi ces critères, comment ont-ils été défini, quel est leur intérêt<sup aria-describedby="note-2" id="lien-2" data-note="Je ne l’ai pas encore dit mais un des objectifs du projet est clairement devenu l’apprentissage et l’accès aux savoirs. Asséner un message sans l’expliquer me parait inutile, tout comme appliquer religieusement le contenu du message n’est pas pertinent."><a class="scroll print-hidden" href="https://www.ffoodd.fr/a11y-css-version-deux/#note-2" title="Je ne l’ai pas encore dit mais un des objectifs du projet est clairement devenu l’apprentissage et l’accès aux savoirs. Asséner un message sans l’expliquer me parait inutile, tout comme appliquer religieusement le contenu du message n’est pas pertinent.">[2]</a></sup>&nbsp;?</li>
<li>la <strong>structure du projet Sass</strong>, ou pour parler le technicien&nbsp;: l’<abbr title="Application Programming Interface">API</abbr>.</li>
</ul>
<p>Premier chantier&nbsp;: trouver les outils adaptés&nbsp;!</p>
<h3>Hologram</h3>
<p>Ayant démarré ce projet seul et n’ayant pas imaginé le partager, les recherches qui m’avaient permis d’aboutir à certains tests n’étaient pas suffisamment documentées. J’ai donc étoffé les références de chaque test en indiquant, autant que faire se peut&nbsp;:</p>
<ul>
<li>Les bonnes pratiques Opquast&nbsp;;</li>
<li>Les critères et tests Accessiweb <abbr title="HyperText Markup Language">HTML</abbr>5 et <abbr title="Accessible Rich Internet Applications">ARIA</abbr>&nbsp;;</li>
<li>Les succès <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.0&nbsp;;</li>
<li>Les sources dans des projets équivalents.</li>
</ul>
<p>Ces ressources étant réunies, je souhaitais mettre à l’épreuve cet outil en mettant en place une <strong>page de démonstration</strong> qui servirait aussi à suivre les éventuelles régressions. Et parce qu’il ne s’agit pas seulement de pouvoir tester, mais également d’<strong>expliquer et de partager ces bonnes pratiques</strong>, un court descriptif du test était nécessaire.</p>
<p>Pour résumer, je cherchais donc un outil capable&nbsp;:</p>
<ol>
<li>D’afficher la description et les liens associés au test&nbsp;;</li>
<li>Un exemple de code HTML lisible ciblé par le test, et une version interprétée par le navigateur&nbsp;</li>
<li>La capacité d’organiser les nombreux tests présents.</li>
</ol>
<p>C’est là qu’intervient <a href="http://trulia.github.io/hologram/">Hologram</a>, une gem Ruby créée par Trulia. Elle m’a semblé parfaite puisqu’elle repose sur des commentaires CSS formatés pour générer la documentation. Son objectif premier est la création et la maintenance de guides de style, ce qui n’est pas si loin du sens premier d’a11y.css&nbsp;: <strong>gérer et maintenir un ensemble de pratiques</strong> à vérifier.</p>
<p>Hologram est incroyablement simple à manipuler, puisqu’une fois la gem installée il suffit de commenter son CSS de la façon suivante&nbsp;:</p>
<pre><code class="language-css"><br />
/*doc<br />
---<br />
title: &quot;[tabindex] &gt; 0&quot;<br />
name: tab-order<br />
category: Errors<br />
---<br />
The `[tabindex]` attribute should never be greater than 0.<br />
* &lt;https://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L337&gt;<br />
```html_example<br />
&lt;button tabindex=&quot;1&quot;&gt;Positive tabindex is bad&lt;/button&gt;<br />
```<br />
*/<br />
</code></pre>
<p>La syntaxe est intelligible, et reste utile sans Hologram pour générer la documentation. Un point que j’apprécie&nbsp;! Pour générer la documentation, c’est très simple&nbsp;:</p>
<pre><code class="language-css"><br />
hologram<br />
</code></pre>
<p><strong>Et voilà&nbsp;!</strong> Hologram génère un mini-site statique grâce à un jeu de ressources très simple. Il est ainsi possible de personnaliser l’entête, le pied-de-page et les ressources statiques pour aménager sa documentation à volonté. <strong>Magique</strong>&nbsp;🙂</p>
<p>Et puisque j’avais déjà créé une branche pour servir de présentation en ligne sur Github, j’ai ajouté ces nouveaux fichiers HTML afin d’en faire <strong>un véritable site de démonstration</strong>.</p>
<p>Jetez un œil au <a href="http://ffoodd.github.io/a11y.css/">site de démonstration d’a11y.css</a>&nbsp;!</p>
<h3>SassDoc</h3>
<p>Pour finir, l’architecture du projet s’étant alourdie d’options et de fonctionnalités, il fallait permettre aux utilisateurs de Sass de s’approprier plus facilement l’outil.</p>
<p>Par chance, la majorité de ces enrichissements étaient l’œuvre de Kitty Giraudel, qui s’avère aussi être le créateur de <a href="http://sassdoc.com/">SassDoc</a>. La personne a tendance à faire des trucs un peu fou en Sass, et cet outil de documentation correspond à la perfection aux besoins d’une API Sass.</p>
<p>Ni une ni deux, Kitty a mis en place SassDoc&nbsp;!</p>
<p>Et voilà un projet <strong>complètement documenté</strong>.</p>
<h2>Ce n’est pas fini&nbsp;!</h2>
<p>Il reste quelques sujets à avancer&nbsp;:</p>
<ul>
<li>Mettre à niveau SassDoc pour utiliser la V2&nbsp;;</li>
<li>Créer un thème SassDoc pour l’intégrer au site&nbsp;;</li>
<li>Essayer d’ajouter une version française de cette documentation —&nbsp;ce qui semble complexe&nbsp;;</li>
<li>Trouver une façon de cibler les éléments auto-fermants dans les tests génériques&nbsp;;</li>
<li>Chercher de nouveaux tests à ajouter :D.</li>
</ul>
<p>Et, bien sûr, maintenir tout ça dans le temps&nbsp;!</p>
<p>Je ne sais pas si ça se sent mais ce projet me passionne et je suis enchanté d’avoir pu <strong>partager mes réflexions, mes pratiques et mes idées</strong> avec toutes les personnes qui sont intervenues. J’ai énormément progressé grâce à ces échanges, et ma plus grande <strong>fierté </strong>est de voir a11y.css cité dans <a href="http://daisy.tetue.net/#debug">la section <em>debug</em> de la méthode Daisy</a>, créé par une personne que j’admire&nbsp;: <a href="http://romy.tetue.net/">Romy Duhem-Verdière</a>.</p>
