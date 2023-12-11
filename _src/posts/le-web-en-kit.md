---
title: "Le web en kit"
date: "2015-10-30T10:11:52"
modified: "2015-11-04T11:21:28"
permalink: "le-web-en-kit/index.html"
excerpt: "<p>Le web, c&#700;est compliqué. Je dirais même plus&nbsp;: c&#700;est la jungle. De multiples sources, de multiples protocoles d&#700;échange de données, de multiple manière d&#700;accéder aux contenus. Et aussi plein de gens qui fabriquent des morceaux de web. Ceux-là sont un minimum flemmards —&nbsp;je le sais bien, j&#700;en fais partie. Alors régulièrement, nous cédons à la facilité et cela produit des perturbations dans La Force. Un exemple&nbsp;? Les sites <code>-webkit-</code> <i>only</i>. Parlons-en&nbsp;! <a href="https://www.ffoodd.fr/le-web-en-kit/" aria-hidden="true">Lire la suite de «&nbsp;Le web en kit&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Beaucoup de gens qui fabriquent le web se sont plaints de lʼhégémonie dʼ<abbr lang="en" title="Internet Explorer">IE</abbr>6.</p>
<p>Pour protester, ils se sont rués sur les nouveaux arrivants : Firefox et Chrome. Puis les produits Apple ont débarqué, apportant avec eux Safari. Cʼétait encore une révolution — et de fait, le nouvel endroit ou aller. Or Safari fonctionne sur la même base que Chrome, à savoir le moteur de rendu Webkit. Et petit à petit, nous nous sommes retrouvés <strong>avec un nouveau monopole</strong>.</p>
<p>Malheureusement, on ne casse pas un monopole avec un monopole. Car tous ces gens qui se sont rués sur les navigateurs WebKit ont produit des morceaux de web qui ne sont pas inter-opérables : on ne pouvait sʼen servir (voire simplement y accéder) autrement <strong>quʼavec un sésame estampillé WebKit</strong>.</p>
<h2>Microsoft et Edge</h2>
<p>De façon parfaitement sensée, Microsoft — qui détenait environ 95% des parts de marché des navigateurs web (ce qui lui est reproché) — a voulu faire table rase du passé pour en finir avec la mauvaise réputation de son navigateur vedette<sup aria-describedby="note-1" id="lien-1" data-note="Jʼaime rappeler aux gens qui pestent après IE quʼil est ma foi fort probable quʼils fissent partie des 95% dʼinternautes qui naviguaient avec. Ça pique."><a class="scroll print-hidden" href="https://www.ffoodd.fr/le-web-en-kit/#note-1" title="Jʼaime rappeler aux gens qui pestent après IE quʼil est ma foi fort probable quʼils fissent partie des 95% dʼinternautes qui naviguaient avec. Ça pique.">[1]</a></sup>. Ils ont donc conçu Edge avec pour objectif principal de servir un maximum de sites correctement à leurs utilisateurs. Et pour ça, ils devaient gérer les sites conçus pour WebKit.</p>
<p><a href="http://blogs.windows.com/msedgedev/2015/06/17/building-a-more-interoperable-web-with-microsoft-edge/"><strong>Alors ils font passer Edge pour WebKit.</strong></a></p>
<h2>Le <i lang="en">-webkit-only</i></h2>
<h3>Les préfixes vendeurs</h3>
<p>Vous commencez à flairer lʼarnaque, pas vrai ? Edge interprète désormais les <abbr lang="en" title="Cascading StyleSheet">CSS</abbr> préfixées par <code>-webkit-</code>. Bon allez, si ça nʼest que ça cʼest de bonne guerre !</p>
<p>Sauf que… <strong>Non</strong>. Ça ne sʼarrête pas à ça.</p>
<h3>Les propriétés hors spécification</h3>
<p>Pendant très longtemps, Chrome et Safari ont implémenté des nouveautés avant de les proposer aux concepteurs des spécifications — notamment des propriétés et valeurs CSS. Ça permet de mettre un peu de pression sur le processus de spécification et de tenir en haleine les développeurs.</p>
<p>Parmi ces nouveautés, la valeur <code>text</code> pour la propriété <code>background-clip</code>.</p>
<p>Cette propriété fait partie intégrante de <a href="https://drafts.csswg.org/css-backgrounds-3/#the-background-clip">la spécification (en anglais</a>) depuis longtemps. La valeur <code>text</code> a été <a href="https://www.webkit.org/blog/164/background-clip-text/">proposée en 2008 par WebKit (en anglais)</a>, et nʼétait — jusquʼà preuve du contraire — supportée que par les navigateurs basés sur WebKit.</p>
<h2>Edge gère !</h2>
<p>Edge lʼinterprète, cette valeur exotique —&nbsp;et sans souci. Jʼai découvert ça inopinément, en me disant que <a href="http://nimbupani.com/using-background-clip-for-text-with-css-fallback.html">la solution de repli proposée par Divya Manian (en anglais)</a> était robuste. En terme de logique, elle est imparable : lʼarrière-plan est conçu pour ne sʼappliquer que si le clip est interprété, car l&#700;ensemble est préfixé par <code>-webkit-</code>. Voyez plutôt&nbsp;:</p>
<pre><code class="language-css"><br />
[class=&quot;rainbow&quot;] {<br />
  color: #fff;<br />
  display: inline-block;<br />
  /* -webkit-only: Chrome, Safari, Opera */  <br />
  background: -webkit-linear-gradient(…);<br />
  background: -o-linear-gradient(…);<br />
  -webkit-text-fill-color: transparent;<br />
  -webkit-background-clip: text;<br />
}<br />
</code></pre>
<p>Mais Edge considère désormais les préfixes <code>-webkit-</code> comme des <i>aliases</i>, et les mange tout crus. Ça aurait pu être un problème dans ce cas précis, puisque théoriquement la paire <code>background-clip: text;</code> nʼest reconnue que par les navigateurs basés sur WebKit. Là encore : <strong>surprise</strong> ! Edge lʼapplique sans rechigner.</p>
<h3>Cas isolé ?</h3>
<p>De nombreuses techniques ont vu le jour et nʼont vécu que pour WebKit. Je mʼinterroge donc : parmi ces techniques que nous pensons réservées à WebKit, <strong>combien dʼautres encore ont atterri dans Edge discrètement ?</strong></p>
<h2>Et Windows Phone, on en parle 😄 ?</h2>
<p>Et bien… En quelque sorte ! Pour clarifier, précisons que jʼutilise Windows Phone 8.1, qui embarque IE11. Dʼaprès mes lectures sur le blog technique de Edge, ce mécanisme dʼinterprétation des préfixes vendeurs <code>-webkit-</code> nʼest inclus que dans Edge — en tout cas, il nʼy est fait aucune mention du cousin IE11.</p>
<p>Figurez-vous que <strong>cʼest pourtant le cas</strong> (je suis sûr que vous nʼavez rien vu venir, avec mes gros sabots 😇). Enfin… <strong>Presque</strong>.</p>
<h3>Le cas qui pique</h3>
<p><a href="https://www.ffoodd.fr/ie9-sur-wp7-et-font-face-je-taime-moi-non-plus/">Une fois nʼest pas coutume</a>, Windows Phone et son IE représentent une configuration particulière. En lʼoccurrence, IE11 interprète les valeurs <code>-webkit-linear-gradient(…)</code> mais est incapable dʼappliquer la valeur <code>text</code> pour la proriété <code>background-clip</code>. Oups 🙈 !</p>
<h2>Captures à lʼappui</h2>
<p>Dans un monde merveilleux et homogène, nous « devrions » voir ceci :</p>
<p><figure class="wp-caption pa1 aligncenter" role="group" itemscope itemtype="http://schema.org/ImageObject"><img loading="lazy" decoding="async" id="attachment_1704" itemprop="contentURL" aria-describedby="wp-caption--attachment_1704" class="size-medium wp-image-1704" src="/images/2015/10/chrome-300x31.png" alt="Capture dʼécran de Chrome" width="300" height="31" srcset="https://www.ffoodd.fr/wp-content/uploads/2015/10/chrome-300x31.png 300w, https://www.ffoodd.fr/wp-content/uploads/2015/10/chrome.png 708w" sizes="(max-width: 300px) 100vw, 300px" /><figcaption class="wp-caption-text pt1 small" id="wp-caption--attachment_1704" itemprop="description">Un arc-en-ciel incrusté au texte en CSS, visible sur les navigateurs WebKit et Edge</figcaption></figure></p>
<p>Et, le cas échéant si votre navigateur est allergique aux arc-en-ciels, voici le résultat attendu :</p>
<p><figure class="wp-caption pa1 aligncenter" role="group" itemscope itemtype="http://schema.org/ImageObject"><img loading="lazy" decoding="async" id="attachment_1705" itemprop="contentURL" aria-describedby="wp-caption--attachment_1705" class="size-medium wp-image-1705" src="/images/2015/10/firefox-300x30.png" alt="Capture dʼécran sur Firefox" width="300" height="30" srcset="https://www.ffoodd.fr/wp-content/uploads/2015/10/firefox-300x30.png 300w, https://www.ffoodd.fr/wp-content/uploads/2015/10/firefox.png 706w" sizes="(max-width: 300px) 100vw, 300px" /><figcaption class="wp-caption-text pt1 small" id="wp-caption--attachment_1705" itemprop="description">Le texte est simplement blanc sur Firefox et IE, pas dʼarc-en-ciel à lʼhorizon</figcaption></figure></p>
<p>Jusque là, tout va bien. La mécanique est belle, aucun danger grâce à la solution de repli évoquée précédemment. Maintenant, cassons tout ! Voici le rendu sur IE11 <strong>et <i lang="en">UC Browser</i></strong> sur Windows Phone 8.1 :</p>
<p><figure class="wp-caption pa1 aligncenter" role="group" itemscope itemtype="http://schema.org/ImageObject"><img loading="lazy" decoding="async" id="attachment_1706" itemprop="contentURL" aria-describedby="wp-caption--attachment_1706" class="size-medium wp-image-1706" src="/images/2015/10/windowsphone-300x169.jpg" alt="capture dʼécran sur Windows Phone 8.1" width="300" height="169" srcset="https://www.ffoodd.fr/wp-content/uploads/2015/10/windowsphone-300x169.jpg 300w, https://www.ffoodd.fr/wp-content/uploads/2015/10/windowsphone-1024x576.jpg 1024w, https://www.ffoodd.fr/wp-content/uploads/2015/10/windowsphone.jpg 1280w" sizes="(max-width: 300px) 100vw, 300px" /><figcaption class="wp-caption-text pt1 small" id="wp-caption--attachment_1706" itemprop="description">Le texte est blanc, mais lʼarrière-plan arc-en-ciel est appliqué</figcaption></figure></p>
<p>Difficile de garantir quoi que ce soit dans ces conditions. <i>A priori</i> ce problème nʼexiste pas dans les versions antérieures de Windows Phone, et il faut noter que la version bureau dʼIE11 nʼapplique pas lʼarrière-plan !</p>
<p>Si vous voulez tester par vous-mêmes ou compléter mes propos, nʼhésitez pas à dupliquer <a href="http://dabblet.com/gist/08fddf3666c39ebc62ca">mon dabblet</a>.</p>
<p>Et pour ceux qui rigolent dans le fond, sachez que <a href="http://gs.statcounter.com/#mobile_os-FR-monthly-201507-201509-bar">Windows Phone représente 4% de parts de marché des systèmes dʼexploitation sur mobile en France, entre juillet et septembre 2015 (en anglais)</a>. Ce nʼest pas négligeable, si tant est quʼon admette négliger une population<sup aria-describedby="note-2" id="lien-2" data-note="Je mettrais dʼailleurs ma main a couper quʼen réalité ce chiffre est déjà sous-estimé, à en croire mes yeux de lynx qui officient dans le tramway, le bus ou le TER à Nantes"><a class="scroll print-hidden" href="https://www.ffoodd.fr/le-web-en-kit/#note-2" title="Je mettrais dʼailleurs ma main a couper quʼen réalité ce chiffre est déjà sous-estimé, à en croire mes yeux de lynx qui officient dans le tramway, le bus ou le TER à Nantes">[2]</a></sup>.</p>
