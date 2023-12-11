---
title: "Les nouveautés dʼIE4"
date: "2016-12-08T16:28:58"
modified: "2016-12-08T16:28:58"
permalink: "les-nouveautes-d%ca%bcie4/index.html"
excerpt: "<p>L&apos;industrie web est dans un état d&apos;emballement général, qui voit son histoire s&apos;effacer plus vite qu&apos;elle ne s&apos;écrit. Et si on remontait vingt ans en arrière, pour voir de quoi demain aurait pu être fait&nbsp;? <a href="https://www.ffoodd.fr/les-nouveautes-d%ca%bcie4/" aria-hidden="true">Lire la suite de «&nbsp;Les nouveautés dʼIE4&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Elle apporte son lot de nouveautés à travers les filtres Microsoft, dont le plus connu concerne l&apos;opacité. Pour rappel, la spécification finale de <abbr title="Cascading StyleSheet">CSS</abbr>1 ne voit le jour que le 17 décembre 1996<sup aria-describedby="note-1" id="lien-1" data-note="Le 17 décembre, c&#039;est la Saint Gaël. Coïncidence ? Je ne crois pas."><a class="scroll print-hidden" href="https://www.ffoodd.fr/les-nouveautes-d%ca%bcie4/#note-1" title="Le 17 décembre, c&#039;est la Saint Gaël. Coïncidence ? Je ne crois pas.">[1]</a></sup>&nbsp;— et la standardisation n&apos;est pas encore un sujet de <em>hipster</em>.</p>
<h2>Les nouveautés graphiques</h2>
<p>Parmi les nouveaux filtres Microsoft débarqués en 4.0, il est stupéfiant de voir à quel point ils ressemblent aux toutes dernières fonctionnalités spécifiées dans <abbr title="Cascading StyleSheet">CSS</abbr> et <abbr title="HyperText Markup Language">HTML</abbr>&nbsp;:</p>
<ul>
<li>transformation&nbsp;;</li>
<li>filtres graphiques&nbsp;;</li>
<li>transition&nbsp;;</li>
<li>dégradés&nbsp;;</li>
<li>masques&nbsp;;</li>
<li>ombres…</li>
</ul>
<p>Oh, et <code>@font-face</code> est apparu dans IE4. Oui oui, en 1997. Vous vous souvenez de la révolution que c&apos;est devenu en 2009, et le battage médiatique autour de CSS 3&nbsp;? Ils devaient bien se marrer chez Microsoft, quand ils nous ont vus nous exciter comme des molécules en chaleur <strong>douze ans plus tard</strong>.</p>
<p>Et si d&apos;aventure ça vous gêne que ce fussent des filtres propriétaires Microsoft, je remets une couche de contexte —&nbsp;toujours pour ceux du fond, décidément&nbsp;: <strong>CSS 1 n&apos;existe officiellement que depuis quelques mois</strong>. La définition des propriétés et de leurs valeurs n&apos;en est qu&apos;à ses balbutiements<sup aria-describedby="note-2" id="lien-2" data-note="Pour faire un parallèle avec l&#039;histoire nord-américaine, l&#039;époque succédant à la déclaration d&#039;indépendance est le far-west, la ruée vers l&#039;or, tout ça…"><a class="scroll print-hidden" href="https://www.ffoodd.fr/les-nouveautes-d%ca%bcie4/#note-2" title="Pour faire un parallèle avec l&#039;histoire nord-américaine, l&#039;époque succédant à la déclaration d&#039;indépendance est le far-west, la ruée vers l&#039;or, tout ça…">[2]</a></sup>.</p>
<h2>Fonctionnalités hors-ligne</h2>
<p>Pas de blague. Internet Explorer 4 est la première version à évoquer la gestion de <strong>fonctionnalités hors-ligne</strong>. Nous sommes évidemment très loin des applications web progressives actuellement tendance —&nbsp;les fameuses <abbr title="Progressive Web Apps">PWA</abbr>, <i>bingo buzzword</i>&nbsp;— mais déjà en 1997, Microsoft en parlait&nbsp;:</p>
<ul>
<li><strong>mise en cache</strong> des pages consultées afin d&apos;améliorer l&apos;expérience sans connexion&nbsp;;</li>
<li>fonctionnalité d&apos;archivage de site, permettant «&nbsp;tout simplement&nbsp;» d&apos;<strong>enregistrer une copie du site</strong> sur votre ordinateur —&nbsp;et donc de le consulter sans connexion&nbsp;;</li>
<li>un type de site appelé <em>active channel</em> qui permettait de <strong>synchroniser un site en ligne avec une version enregistrée localement</strong>, hors ligne<sup aria-describedby="note-3" id="lien-3" data-note="J&#039;admets avoir du mal à comprendre cette technologie, je ne l&#039;ai jamais connue…"><a class="scroll print-hidden" href="https://www.ffoodd.fr/les-nouveautes-d%ca%bcie4/#note-3" title="J&#039;admets avoir du mal à comprendre cette technologie, je ne l&#039;ai jamais connue…">[3]</a></sup>.</li>
</ul>
<p>C&apos;est rigolo comme les thèmes abordés dans les notes de version sont les mêmes en 1997 qu&apos;en 2016, non&nbsp;?</p>
<h2>Transitions entre les pages</h2>
<p>Ça, c&apos;est vraiment l&apos;apothéose.</p>
<p>Vous connaissez peut-être déjà <a href="https://jakearchibald.com/">Jake Archibald</a>&nbsp;? Je l&apos;apprécie notamment pour son travail sur l&apos;optimisation des <abbr title="Scalable Vector Graphics">SVG</abbr>, mais il a produit beaucoup de choses très utiles.</p>
<p>En octobre 2016, il a créé <a href="https://github.com/jakearchibald/navigation-transitions/blob/master/README.md">un répertoire sur Github intitulé navigation-transition</a>, dans lequel il explore la complexité d&apos;effectuer des transitions entre les pages en respectant l&apos;historique de navigation.</p>
<p>C&apos;est chouette, il évoque <strong>des pistes en CSS</strong> lancées par Google en 2014 puis Mozilla en 2015, et sa propre exploration. Je suis sûr que ça en fait baver plus d&apos;un&nbsp;!</p>
<p>Je vous présente <a href="https://msdn.microsoft.com/en-us/library/ms532847(v=vs.85).aspx#Interpage_Transition">les transitions interpages</a> introduites par Microsoft dans Internet Explorer 4 en 1997. Concrètement, ce sont des filtres Microsoft utilisés dans des balises <code>meta</code>, comme suit&nbsp;:</p>
<pre class="language-markup">
<code class="language-markup"><br />
&lt;META http-equiv=&quot;Page-Enter&quot; <br />
  CONTENT=&quot;progid:DXImageTransform.Microsoft.Blinds(<br />
    Duration=4<br />
  )&quot; /&gt;<br />
&lt;META http-equiv=&quot;Page-Exit&quot; <br />
  CONTENT=&quot;progid:DXImageTransform.Microsoft.Slide(<br />
    Duration=2.500,<br />
    slidestyle=&#039;HIDE&#039;<br />
  )&quot; /&gt;<br />
</code></pre>
<p>C&apos;est pas beau, ça&nbsp;?</p>
<h2>De retour du passé</h2>
<p>Vous pensiez que le web de 1997 était révolu, et que tout ce que je viens de déterrer reste obsolète&nbsp;? Je vous présente mes deux trollons<sup aria-describedby="note-4" id="lien-4" data-note="Un trollon est un bébé troll, c&#039;est bien connu."><a class="scroll print-hidden" href="https://www.ffoodd.fr/les-nouveautes-d%ca%bcie4/#note-4" title="Un trollon est un bébé troll, c&#039;est bien connu.">[4]</a></sup>&nbsp;:</p>
<ul>
<li>la propriété <code>filter</code> fait désormais partie de la spécification CSS, seules les valeurs Microsoft ne sont donc plus standards. Personnellement, ça me fait beaucoup rigoler&nbsp;;</li>
<li>à l&rsquo;époque, il était possible d&apos;écrire des scripts dans CSS. Oui oui, chez Microsoft on faisait du JS dans du CSS<sup aria-describedby="note-5" id="lien-5" data-note="Nos fameux filtres, vous croyiez que ça fonctionnait comment ?"><a class="scroll print-hidden" href="https://www.ffoodd.fr/les-nouveautes-d%ca%bcie4/#note-5" title="Nos fameux filtres, vous croyiez que ça fonctionnait comment ?">[5]</a></sup>, pas l&apos;inverse&nbsp;! Notons que Netscape avait proposé <abbr title="JavaScript StyleSheet">JSSS</abbr> cependant —&nbsp;mais c&apos;est hors sujet.</li>
</ul>
<p>Alors pour paraphraser le Doc, je dirais seulement&nbsp;:</p>
<blockquote><p>Nom de d&apos;IE, Marty&nbsp;!</p></blockquote>
<h2>Vous êtes encore là&nbsp;?</h2>
<p>Pour les survivants qui sont parvenus jusqu&apos;au donjon, voici vos récompenses&nbsp;:</p>
<ul>
<li><a href="https://en.wikipedia.org/wiki/Internet_Explorer_4">la page Wikipédia d&apos;Internet Explorer 4 (en anglais)</a>&nbsp;;</li>
<li><a href="http://www.actden.com/ie4/">un site fabuleux pour découvrir IE4, en anglais</a> — qui n&apos;est pas sans rappeler ce fameux trombone pot de colle dans les produits Microsoft du début des années 2000&nbsp;;</li>
<li><a href="http://www.blooberry.com/indexdot/history/ie.htm">un historique d&apos;Internet Explorer 1 à 6, en anglais</a> —&nbsp;comme ça, vous avez le choix dans les dates&nbsp;;</li>
<li><a href="https://www.nicolas-hoffmann.net/tacamaca/">une page implémentant les transitions interpages</a><sup aria-describedby="note-6" id="lien-6" data-note="Un indice, il faut regarder le code source."><a class="scroll print-hidden" href="https://www.ffoodd.fr/les-nouveautes-d%ca%bcie4/#note-6" title="Un indice, il faut regarder le code source.">[6]</a></sup>, réalisées par Nicolas Hoffmann avant qu&apos;il ne sache distinguer le bien du mal.</li>
</ul>
<p>Voilà. Comme <strong>je me suis beaucoup amusé</strong> à rassembler toutes ces informations et à écrire cet article, je tiens à remercier <a href="https://www.paris-web.fr/2015/conferences/la-veille-techno-pour-les-vieux-croutons.php" title="Conférence intitulée « La veille techno pour les vieux croûtons » présentée par Thibault Jouannic à Paris Web le vendredi 02 octobre 2015">les vieux croûtons du web</a> qui ont éclairé ma lanterne lors de mes recherches. Ils se reconnaîtront, et si vous les cherchez vous trouverez la liste de leurs <em>nicknames</em> connectés au salon <code>##openweb</code> sur <abbr title="Internet Relay Chat">IRC</abbr>.</p>
<p>Merci les copains.</p>
