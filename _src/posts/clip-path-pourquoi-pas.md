---
title: "Clip-path, pourquoi pas ?"
date: "2014-03-11T15:44:26"
modified: "2021-03-05T17:09:34"
permalink: "clip-path-pourquoi-pas/index.html"
excerpt: "<p>Certaines propriétés voient régulièrement le jour en <abbr title="Cascading StyleSheet">CSS</abbr> mais leur appropriation par les intégrateurs est disparate&nbsp;: tantôt gadgets, utilisées à tort et à travers à cause d’un <i>buzz</i> impromptu — souvent mal comprises, mal utilisées, avec peu ou pas de compatibilité; tantôt effrayantes tant elles relèvent de la science-fiction, et donc rarement employées malgré un support décent et une dégradation efficiente pour les navigateurs moins performants. <code>clip-path</code> fait partie du second groupe. Jetons-y un œil. <a href="https://www.ffoodd.fr/clip-path-pourquoi-pas/" aria-hidden="true">Lire la suite de «&nbsp;Clip-path, pourquoi pas ?&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Mais lorsque <a title="Sur Twitter" href="https://twitter.com/KittyGiraudel">Kitty Giraudel</a> a lancé son <a href="http://kittygiraudel.com/2014/02/19/the-magic-circle-a-css-brain-teaser/"><abbr title="Cascading StyleSheet">CSS</abbr> brain teaser</a><sup aria-describedby="note-1" id="lien-1" data-note="Papa, Maman : j’aime les casses-têtes."><a class="scroll print-hidden" href="https://www.ffoodd.fr/clip-path-pourquoi-pas/#note-1" title="Papa, Maman : j’aime les casses-têtes.">[1]</a></sup> puis précisé sur Twitter qu’il apprécierait une solution utilisant <code>clip-path</code>, je me suis dit : pourquoi pas ?</p>
<h2>Les spécifications actuelles</h2>
<p>Ne connaissant que de très loin cette propriété, il a fallu me mettre à jour. <code>clip-path</code>, à l’instar de <code>clip</code>, sert à délimiter la zone d’affichage d’un contenu. Je m’oriente vers les spécifications pour compléter cet embryon de culture — et là, c’est le drame :</p>
<ul>
<li><a title="en Anglais" href="http://www.w3.org/TR/css-masking-1/#the-clip-path">La spécification de la propriété</a> <code>clip-path</code> au sein du module <i>CSS masking</i>, encore à l’état de brouillon;</li>
<li>Qui nous renvoie <a title="en Anglais" href="http://www.w3.org/TR/2013/WD-css-shapes-1-20130620/#basic-shapes-from-svg-syntax">aux formes basiques</a> en <abbr title="Scalable Vector Graphics">SVG</abbr>;</li>
<li>Tout cela en se référant sans arrêt à <a title="en Anglais" href="http://www.w3.org/TR/css-masking-1/#ClipPathElement">l’élément SVG <code>ClipPath</code></a>;</li>
<li>De fil en aiguille, citons également le module <i>Masking</i> de la spécification SVG — et notamment <a title="en Anglais" href="http://www.w3.org/TR/SVG/masking.html#ClippingPaths">la section sur les <i>Clipping paths</i></a>.</li>
</ul>
<p>On peut d’ores et déjà noter une différence remarquable entre les états de ces deux spécifications : l’une est en brouillon, l’autre en recommandation. La spécification SVG est extrêmement aboutie et claire, les ressources ne manquent pas<sup aria-describedby="note-2" id="lien-2" data-note="Un petit « cocorico » s’impose pour féliciter Jérémie Patonnier, qui a grandement contribué à la documentation sur le Mozilla Developper Network notamment."><a class="scroll print-hidden" href="https://www.ffoodd.fr/clip-path-pourquoi-pas/#note-2" title="Un petit « cocorico » s’impose pour féliciter Jérémie Patonnier, qui a grandement contribué à la documentation sur le Mozilla Developper Network notamment.">[2]</a></sup> et la compatibilité de cette technologie est très correcte.</p>
<p>En revanche le module CSS est obscur. Il existe un lien étroit entre les deux spécifications, car le brouillon du module <i>CSS Masking</i> s’appuie énormément sur la spécification SVG — et qu’en SVG il existe l’attribut <code>clip-path</code>. Ça génère des incompréhensions qui ne vont pas faciliter la prise en main de cette propriété.</p>
<p>Pour éclaircir un peu tout ça — et vous épargner la lecture des spécifications — vous devriez pouvoir écrire ceci pour utiliser une forme basique&nbsp;:</p>
<pre><code class="language-css"><br />
.clip { <br />
  clip-path: circle( 50%, 50%, 5em );<br />
}<br />
</code></pre>
<p>Mais ceci devrait fonctionner également — en appelant un élément SVG&nbsp;:</p>
<pre><code class="language-css"><br />
.clip { <br />
  clip-path: url(#circle);<br />
}<br />
</code></pre>
<h2>Les origines</h2>
<p>Il faut sonder un peu les origines de ce module CSS pour en comprendre l’obscurité. Bien que déjà en cours d’élaboration dans le cadre technique du SVG, la possibilité de masquer des éléments en CSS existait depuis CSS 2.1 grâce à la propriété <code>clip</code>, désormais <a title="en Anglais" href="http://www.w3.org/TR/css-masking-1/#clip-property">dépréciée</a><sup aria-describedby="note-3" id="lien-3" data-note="La propriété est dépréciée mais très bien supportée, et le W3C indique que les agents utilisateurs (navigateurs web) doivent la supporter malgré sa déprécation."><a class="scroll print-hidden" href="https://www.ffoodd.fr/clip-path-pourquoi-pas/#note-3" title="La propriété est dépréciée mais très bien supportée, et le W3C indique que les agents utilisateurs (navigateurs web) doivent la supporter malgré sa déprécation.">[3]</a></sup>.</p>
<p>Cette propriété n’a jamais réellement trouvé son public, car elle a deux inconvénients majeurs :</p>
<ol>
<li>L’élément masqué doit être en position absolue;</li>
<li>Le masque ne peut être que rectangulaire, et son placement est contre-intuitif.</li>
</ol>
<p>Embêtant. Constatant les progrès possibles de cette fonctionnalité en CSS, c’est <a title="en Anglais" href="https://www.webkit.org/blog/181/css-masks/">le navigateur Safari qui a ouvert les hostilités en 2008</a> avec les propriétés <code>-webkit-mask-…</code> supportées <a title="en Anglais" href="https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariCSSRef/Articles/StandardCSSProperties.html#//apple_ref/doc/uid/TP30001266-SW17">dès Safari 4</a>. Cette technique a rencontré un franc succès car elle permet d’utiliser une image comme masque. Malheureusement cette propriété n’était supportée que par le moteur de rendu Webkit<sup aria-describedby="note-4" id="lien-4" data-note="Je ne compte pas traiter du marronnier de « la guerre des navigateurs » ni du syndrome « Webkit only »."><a class="scroll print-hidden" href="https://www.ffoodd.fr/clip-path-pourquoi-pas/#note-4" title="Je ne compte pas traiter du marronnier de « la guerre des navigateurs » ni du syndrome « Webkit only ».">[4]</a></sup>.</p>
<p>Là, j’ai vu poindre le problème : la spécification CSS en cours d’élaboration mélange joyeusement les clips issus de SVG et la proposition de Safari<sup aria-describedby="note-5" id="lien-5" data-note="Fabriqué par Apple® en Californie."><a class="scroll print-hidden" href="https://www.ffoodd.fr/clip-path-pourquoi-pas/#note-5" title="Fabriqué par Apple® en Californie.">[5]</a></sup>. La distinction est abordée <a title="en Anglais" href="http://www.w3.org/TR/css-masking-1/#intro">dès le début du document</a> de spécification, mais je trouve que cette scission reste extrêmement troublante. Le <abbr title="World Wide Web Consortium">W3C</abbr> précise que <strong>les clips sont recommandés pour des raisons de souplesse et de performance</strong>, cependant les masques sont bien plus matures et simples à utiliser — ce qui fait naturellement pencher la balance du côté obscur.</p>
<h2>Des ressources dissonantes</h2>
<p>Il est fort peu probable que personne avant moi ne s’y soit intéressé. Et en effet, quatre ressources principales sont indispensables pour appréhender <code>clip-path</code> :</p>
<ul>
<li><a title="en Anglais" href="http://www.html5rocks.com/en/tutorials/masking/adobe/">CSS Masking</a> sur HTML5Rocks;</li>
<li>L’article dédié sur <a title="en Anglais" href="http://docs.webplatform.org/wiki/css/properties/clip-path">Web Platform Docs</a>;</li>
<li>Un tutoriel avancé sur <a title="en Anglais" href="http://thenittygritty.co/css-masking">The Nitty Gritty</a>;</li>
<li>L’article de l’Avent par Vincent De Oliveira sur <a href="http://www.24joursdeweb.fr/2013/les-masques-css/">24 jours de web</a>;</li>
</ul>
<p>Comme vous vous en apercevrez en les lisant, le contenu est disparate. La compatibilité navigateur est abordée différemment<sup aria-describedby="note-6" id="lien-6" data-note="La palme revient à HTML5Rocks qui détaille Chrome et Firefox, et oublie les autres."><a class="scroll print-hidden" href="https://www.ffoodd.fr/clip-path-pourquoi-pas/#note-6" title="La palme revient à HTML5Rocks qui détaille Chrome et Firefox, et oublie les autres.">[6]</a></sup>, le fonctionnement est vulgarisé avec plus ou moins de réussite<sup aria-describedby="note-7" id="lien-7" data-note="Un grand merci à The Nitty Gritty — sponsorisé par Doliprane®."><a class="scroll print-hidden" href="https://www.ffoodd.fr/clip-path-pourquoi-pas/#note-7" title="Un grand merci à The Nitty Gritty — sponsorisé par Doliprane®.">[7]</a></sup>, les exemples ne respectent même pas le contenu de l’article<sup aria-describedby="note-8" id="lien-8" data-note="Allez Web Platform Docs, on oublie pour cette fois."><a class="scroll print-hidden" href="https://www.ffoodd.fr/clip-path-pourquoi-pas/#note-8" title="Allez Web Platform Docs, on oublie pour cette fois.">[8]</a></sup>… C’est le moment ou on re-fait « cocorico » puisque la meilleure ressource est celle en Français, rédigée par <a href="http://blog.iamvdo.me/">Vincent De Oliveira</a> — avec l’avantage d’être également la plus récente.</p>
<p>À l’instar de la spécification qui intègre les clips <b>et</b> les masques, ces ressources présentent les deux techniques. Dommage car deux articles distincts auraient été bien plus clairs !</p>
<h2>Un bilan mitigé</h2>
<p>Après avoir compulsé maladivement les spécifications, articles, tutoriaux et autres exemples pendant quelques jours, j’ai abouti à un exemple ressemblant à ceci&nbsp;:</p>
<pre><code class="language-css"><br />
/**<br />
 * 1. Définition d’une forme rectangulaire de repli pour les navigateurs ne supportant pas clip-path;<br />
 * 2. Création d’une forme SVG basique, circulaire;<br />
 * 3. Appel d’un fichier SVG contenant un élément clipPath. <br />
 */<br />
.clip { <br />
  clip: rect( 7em, 30em, 17em, 20em ); /* 1 */<br />
  -webkit-clip-path: circle( 50%, 50%, 5em ); /* 2 */<br />
  clip-path: url(#circle); /* 3 */<br />
}<br />
</code></pre>
<p>Évidemment, cela implique un balisage précis côté <abbr title="HyperText Markup Language">HTML</abbr>&nbsp;:</p>
<pre><code class="language-markup"><br />
&lt;p class=&quot;clip&quot;&gt;<br />
  ♬ Tout, tout, tout : vous saurez tout sur le clip-path ♬<br />
&lt;/p&gt;<br />
&lt;svg width=&quot;200&quot; height=&quot;200&quot;&gt;<br />
  &lt;defs&gt;<br />
    &lt;clipPath id=&quot;circle&quot;&gt;<br />
      &lt;circle cx=&quot;50%&quot; cy=&quot;50%&quot; r=&quot;80&quot; /&gt;<br />
    &lt;/clipPath&gt;    <br />
  &lt;/defs&gt;<br />
&lt;/svg&gt;<br />
</code></pre>
<p>Ainsi je tente de vous livrer un état des lieux aussi complet que possible<sup aria-describedby="note-9" id="lien-9" data-note="Je tiens à préciser que je n’ai aucune expertise en la matière : ce ne sont la que les conclusions trouvées par un intégrateur lambda."><a class="scroll print-hidden" href="https://www.ffoodd.fr/clip-path-pourquoi-pas/#note-9" title="Je tiens à préciser que je n’ai aucune expertise en la matière : ce ne sont la que les conclusions trouvées par un intégrateur lambda.">[9]</a></sup>.</p>
<ul>
<li><b>Chrome 23, Safari 6.1 et Opéra 15</b> supportent <code>clip-path</code> sous toutes ses formes — incluant la définition de formes SVG basiques dans le CSS;</li>
<li><b>Firefox 4</b> supporte <code>clip-path</code> si on référence un élément SVG <code>clipPath</code> — ce qui implique d’ajouter un fichier SVG — en revanche vous serez obligés de définir des positions en unités absolues comme le <code>px</code> pour positionner votre clip si vous souhaitez éviter les bugs, et c’est bien dommage;</li>
<li><b>Opéra 7, Chrome 14, IE8 à 11 et Safari 1</b> se replient sur <code>clip</code>;</li>
<li><b>Une note sur IE9 à 11 :</b> ces navigateurs supportent <code>clip-path</code> si on référence un élément SVG <code>clipPath</code>, à condition d’appliquer le clip sur un élément SVG. Il est envisageable d’intégrer la zone à clipper dans un élément <code>ForeignObject</code> au sein d’un SVG, mais ça devient trop tordu à mon goût;</li>
<li><b>Un mot sur IE4 à 7 :</b> surpris vous êtes ? Ne le soyez pas, clip est reconnu sur IE4 à 7 (et même Netscape 4). Le hic, ce sont les pseudo-éléments que j’emploie dans mon exemple; ainsi en ajoutant un élément dédié dans le <abbr title="Document Object Model">DOM</abbr>, vous devriez pouvoir supporter IE4 facilement 😀 .</li>
</ul>
<h2>Une solution correcte</h2>
<p>Malgré le support disparate et le funambulisme nécessaire pour aboutir à un résultat viable, j’ai trouvé <code>clip-path</code> extrêmement intéressant — et notamment grâce à la dégradation possible à l’aide de <code>clip</code> sur de très vieux navigateurs et de façon simplissime.</p>
<p>Ce repli implique de perdre les formes personnalisées au profit d’un rectangle « simple », ce qui fut considéré comme acceptable lors de l’avènement de <code>border-radius</code> par exemple. Et je suppose que dans la plupart des cas, cette solution reste acceptable.</p>
<p>Vous trouverez donc ma solution au casse-tête proposé par Kitty <a title="en Anglais" href="http://codepen.io/ffoodd/pen/Eolkb">sur CodePen</a>, détaillée, commentée, agrémentée de diverses précisions — en Anglais.</p>
<p>Tout retour sera le bienvenu 🙂 .</p>
<h3>Mise à jour</h3>
<p>Moins d’une semaine avant la publication de mon article, le brouillon du W3C concernant la notation des formes basiques a évolué. Je cite <a href="https://twitter.com/iamvdo">Vincent De Oliveira</a>, qui a partagé l’information avec moi&nbsp;:</p>
<blockquote><p>Par contre, la notation des basic-shapes ont (encore) changées récemment! 😛 <a href="http://dev.w3.org/csswg/css-shapes/#basic-shape-functions" title="en Anglais">dev.w3.org</a></p></blockquote>
<p>Ô joie. Merci à Vincent en tout cas !</p>
