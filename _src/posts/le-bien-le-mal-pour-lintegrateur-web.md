---
title: "Le bien &#038; le mal pour l&rsquo;intégrateur web"
date: "2012-11-13T14:40:08"
modified: "2013-10-02T10:59:02"
permalink: "le-bien-le-mal-pour-lintegrateur-web/index.html"
excerpt: "<p>Il y a de bonnes &#038; de mauvaises solutions Une bonne idée le jour J peut être une mauvaise idée le D day. Au commencement de ffoodd, je voulais un fond simple mais avec un peu d&rsquo;impact : j&rsquo;ai donc choisi le motif très simple mais contrasté que vous avez sous les yeux. À l&rsquo;époque, [&hellip;] <a href="https://www.ffoodd.fr/le-bien-le-mal-pour-lintegrateur-web/" aria-hidden="true">Lire la suite de «&nbsp;Le bien &#038; le mal pour l&rsquo;intégrateur web&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<h2>Il y a de bonnes &#038; de mauvaises solutions</h2>
<p>Une bonne idée le <em>jour J</em> peut être une mauvaise idée le <em>D day</em>. Au commencement de ffoodd, je voulais un fond simple mais avec un peu d&rsquo;impact : j&rsquo;ai donc choisi le motif très simple mais contrasté que vous avez sous les yeux. À l&rsquo;époque, je rêvais de tester les dégradés radiaux en css &#8211; et j&rsquo;étais persuadé de pouvoir réaliser mon motif à l&rsquo;aide de cette technique. Ni une, ni deux : je le fais. Je tartine les préfixes navigateurs et la syntaxe non préfixée, et nous voilà partis.<strong> À bien y réfléchir, c&rsquo;était ma première erreur.</strong></p>
<p>Comme je suis méticuleux, je vérifie tout ça sur nos navigateurs adorés &#8211; et ô joie ! &#8211; Firefox freeze en voyant ça. Je me contente alors de retirer la ligne préfixée concernée, et tant pis pour lui : il aura un aplat. <strong>À bien y réfléchir, c&rsquo;était le premier avertissement.</strong></p>
<h2>Pardonnez-moi mon père car j&rsquo;ai péché</h2>
<p>Firefox 16 est apparu, apportant des nouveautés dont : le support des dégradés sans préfixe. Firefox a donc compris ma déclaration background-image, et ô miracle ! <strong>Il freeze toujours, une vraie salade.</strong></p>
<p>Je reprends alors mon code, et me demande : <strong>pourquoi diantre avoir utilisé un dégradé pour faire ça ?</strong> </p>
<ul>
<li>Mauvais support navigateur</li>
<li>Problème de performance évident</li>
<li>Syntaxe compliquée et instable ( à l&rsquo;époque )</li>
</ul>
<p>En tant qu&rsquo;intégrateur voulant atteindre un objectif, je n&rsquo;ai pas fait le meilleur choix. J&rsquo;ai donc repris le travail. J&rsquo;ai supprimé ce dégradé, créé le motif en <strong>png-8</strong> à <strong>2 couleurs</strong> ( 64 octets ! ) et vu le poids, je l&rsquo;ai même encodé en <strong>base64</strong>. Et voilà !</p>
<h2>La morale</h2>
<p>Désormais ce fond est :</p>
<ol>
<li>Compatible tous navigateurs jusqu&rsquo;à IE8</li>
<li>Trois fois plus légers</li>
<li>Beaucoup plus performant</li>
</ol>
<p>Ça n&rsquo;est certes pas grand chose, mais cette erreur de parcours témoigne de mon évolution dans ce métier. C&rsquo;était une mauvaise idée d&rsquo;appliquer ce motif en css pur, mais 18 mois plus tard, quand j&rsquo;ai vu ce bout de code, j&rsquo;ai su trouver <strong>la meilleure solution</strong>.</p>
<p>Je continue <a href="https://www.ffoodd.fr/css-experienceinherit/" title="css {    expérience:inherit; }">mon amélioration perpétuelle</a>.</p>
