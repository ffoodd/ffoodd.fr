---
title: "WordPress 3.5 est médiaphobe"
date: "2013-01-16T11:23:48"
modified: "2013-10-02T10:58:00"
permalink: "wordpress-3-5-est-mediaphobe/index.html"
excerpt: "<p>Sauf que Dès ma première utilisation de cette nouvelle mouture je suis tombé sur un problème assez gênant : dans la fenêtre modale servant à insérer des médias depuis l&rsquo;éditeur, l&rsquo;ajout d&rsquo;un fichier me retourne une erreur en indiquant « Une erreur est survenue lors du téléchargement.Veuillez réessayer plus tard. » Malgré ça, ledit fichier a été [&hellip;] <a href="https://www.ffoodd.fr/wordpress-3-5-est-mediaphobe/" aria-hidden="true">Lire la suite de «&nbsp;WordPress 3.5 est médiaphobe&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<h2>Sauf que</h2>
<p>
Dès ma première utilisation de cette nouvelle mouture je suis tombé sur un problème assez gênant : dans la fenêtre modale servant à insérer des médias depuis l&rsquo;éditeur,  l&rsquo;ajout d&rsquo;un fichier me retourne une erreur en indiquant </p>
<blockquote><p>« Une erreur est survenue lors du téléchargement.<br />Veuillez réessayer plus tard. » </p></blockquote>
<p>Malgré ça, ledit fichier a été ajouté à la bibliothèque des médias. De plus, impossible de parcourir la bibliothèque et d&rsquo;insérer un fichier depuis cette même fenêtre modale ! Après une recherche rapide, il s&rsquo;avère que <a href="http://wordpress.org/search/bug+3.5+media+insert" title="Wordpress 3.5 media insert bug" target="_blank">je ne suis pas le premier à rencontrer ce problème</a>.</p>
<p>Or ce bug &#8211; connu depuis la bêta &#8211; peut avoir diverses origines :</p>
<ol>
<li>Le serveur utilise <em>mod_pagespeed</em></li>
<li>Un plugin interfère avec les scripts de l&rsquo;administration</li>
<li>Le thème retire la version de jQuery inclue, et en utilise une autre</li>
<li>Une erreur a pu se glisser dans certains fichiers, à vérifier via la console js du navigateur</li>
<li>Un mode DEBUG de WordPress « abusif »</li>
<li>La concaténation des fichiers de l&rsquo;administration trop agressive ou mal effectuée</li>
</ol>
<p>Miam ! Vous l&rsquo;aurez compris, beaucoup de ces causes potentielles tournent autour des fichiers javascript ( et la technologie Ajax utilisée dans ce cas ). Une multitude de parades ont été proposées sur le web, fonctionnant dans certains cas :</p>
<ul>
<li>Repasser au thème TwentyTwelve</li>
<li>Désactiver les plugins un par un</li>
<li>Désactiver <em>mod_pagespeed</em> ou un système de concaténation quelconque du js de l&rsquo;administration</li>
</ul>
<p>Ces solutions ont &#8211; dans beaucoup de cas &#8211; suffit à résoudre le bug, ou au moins à en identifier l&rsquo;origine afin de le corriger. <strong>Pas dans mon cas.</strong></p>
<h2>.htaccess</h2>
<p>
<strong>Après diverses pérégrinations dans les tréfonds de WordPress, j&rsquo;ai finalement trouvé la solution à mon cas : le .htaccess.</strong></p>
<p>Pour une raison ou pour une autre, appliquer le .htaccess que j&rsquo;ai l&rsquo;habitude d&rsquo;appliquer en production a suffit. C&rsquo;est donc un patch insignifiant, sauf que WordPress ne dispose pas &#8211; et ne crée pas &#8211; de .htaccess par lui-même. C&rsquo;est une habitude que j&rsquo;ai acquise pour des questions d&rsquo;environnement serveur, de <strong>performances</strong>, de <strong>qualité web</strong> et de types de fichiers à servir, mais qui n&rsquo;est pas connue de tout le monde.</p>
<p>À titre personnel, le .htaccess de base dont je me sers est un amalgame :</p>
<ul>
<li>du .htaccess disponible dans le <a href="http://html5boilerplate.com/" title="HTML5 Boilerplate" target="_blank">html5 Boilerplate</a></li>
<li>du .htaccess dédié à WordPress proposé par <a href="http://www.seomix.fr/guide-htaccess-performances-et-temps-de-chargement/" title="le .htaccess expliqué sur seo-mix" target="_blank">seo-mix</a></li>
</ul>
<p>Je suppose qu&rsquo;il s&rsquo;agit d&rsquo;un entête http ou d&rsquo;un type MIME incorrect qui nuit à la bonne compréhension du fichier par le serveur, sans toutefois en être sûr. Étant donné que j&rsquo;avais jusqu&rsquo;à présent l&rsquo;habitude d&rsquo;ajouter le .htaccess à la fin du développement, je me contenterais désormais de l&rsquo;ajouter <strong>dès le début du projet</strong>.</p>
<p><strong>De plus, il s&rsquo;agit d&rsquo;une bonne pratique nécessaire à la <a href="https://www.ffoodd.fr/tag/qualite-web/" title="Qualité web">qualité d&rsquo;un site web</a> : il est donc indispensable de disposer d&rsquo;un fichier .htaccess efficace.</strong></p>
