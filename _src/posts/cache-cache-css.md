---
title: "Cache-cache CSS"
date: "2016-10-13T13:11:13"
modified: "2021-03-05T17:07:37"
permalink: "cache-cache-css/index.html"
excerpt: "<p>Il existe une myriade de façon de masquer visuellement du texte en CSS tout en le maintenant accessible aux technologies d&apos;assistance telles que les lecteurs d&apos;écran. J&apos;en agrège ici quelques-unes pour proposer une version que j&apos;espère plus robuste. <a href="https://www.ffoodd.fr/cache-cache-css/" aria-hidden="true">Lire la suite de «&nbsp;Cache-cache CSS&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Et j&rsquo;ai beau trouver ça idiot —&nbsp;masquer du texte pour certains utilisateurs et pas pour d&rsquo;autres, ça me paraît incohérent avec l&rsquo;accessibilité&nbsp;— c&rsquo;est un besoin récurrent.</p>
<p>Il existe de nombreuses façons de faire, que je ne détaillerai pas ici. Depuis quelques années, lorsque je le peux, j&rsquo;utilise celle de <a href="https://twitter.com/thierrykoblentz">Thierry Koblentz</a> pour Yahoo! qui est décrite <del datetime="2017-02-27T12:14:30+00:00"><a href="https://developer.yahoo.com/blogs/ydn/clip-hidden-content-better-accessibility-53456.html">sur le blog technique de Yahoo!</a></del> <ins datetime="2017-02-27T12:14:30+00:00"><a href="http://cssmojo.com/hide-content-from-sighted-users/">sur le blog de Thierry</a></ins>. C&rsquo;est de loin la plus complète, et la seule à ma connaissance à supporter la direction de texte de droite à gauche.</p>
<p>Mais elle n&rsquo;est pas exempte de problème, désormais.</p>
<h2>Propriété dépréciée</h2>
<p>La «&nbsp;magie&nbsp;» de cette solution repose sur la propriété <code>clip</code>. Elle est simple à comprendre et très efficace. Seul bémol&nbsp;: <code>clip</code> est <strong>déprécié par le module <em><a href="https://drafts.fxtf.org/css-masking-1/#clip-property"><abbr title="Cascading StyleSheet">CSS</abbr> masking</a></em></strong> de niveau 1.</p>
<p>Pas de souci. La technique basée sur <code>clip</code> date un peu, il est normal qu&rsquo;elle tombe en désuétude. La nouvelle spécification recommande l&rsquo;utilisation de <code>clip-path</code> pour remplacer <code>clip</code>. Ce qui nous laisse pantois, puisque <a href="http://caniuse.com/#feat=css-clip-path">le support de <code>clip-path</code> est encore tout à fait relatif</a>. <strong>Nous devons conserver <code>clip</code> et ajouter <code>clip-path</code> en guise d&rsquo;amélioration progressive</strong>.</p>
<p>Cependant la syntaxe est différente également. Après quelques recherches, <a href="https://twitter.com/ryuran78/status/778943389819604992">Yvain Liechti a proposé la version la plus courte pour obtenir le résultat attendu</a>&nbsp;:</p>
<pre><code class="language-css">clip-path: inset(50%);</code></pre>
<p>Banco. Un problème résolu&nbsp;!</p>
<h2>Le texte ratatiné</h2>
<p><a href="https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe">J. Renée Beach a signalé</a> que la propriété <code class= »language-css »>width: 1px;</code> avait des effets négatifs sur le rendu du texte et par conséquent sa vocalisation par un lecteur d&rsquo;écran.</p>
<p>La solution proposée est à la fois logique et simple&nbsp;: empêcher le texte de passer à la ligne et ainsi <strong>garantir que les espaces entre les mots sont conservés</strong>.</p>
<p>Une seule propriété suffit&nbsp;:</p>
<pre><code class="language-css">white-space: nowrap;</code></pre>
<p>Et voilà, second problème résolu.</p>
<h2>La totale</h2>
<p>Voilà la version finale que je propose actuellement&nbsp;:</p>
<pre><code class="language-css"><br />
.sr-only {<br />
  border: 0 !important;<br />
  clip: rect(1px, 1px, 1px, 1px) !important;<br />
  -webkit-clip-path: inset(50%) !important;<br />
          clip-path: inset(50%) !important;<br />
  height: 1px !important;<br />
  margin: -1px !important;<br />
  overflow: hidden !important;<br />
  padding: 0 !important;<br />
  position: absolute !important;<br />
  width: 1px !important;<br />
  white-space: nowrap !important;<br />
}<br />
</code></pre>
<h3>Avertissement</h3>
<p>Normalement, vous ne devriez utiliser ceci <strong>que pour du texte</strong>. Autrement dit, il ne devrait jamais y avoir d&rsquo;élément capable de recevoir le <code>:focus</code> dans un élément masqué de la sorte. Cela pourrait conduire à des comportements étonnants, puisque le navigateur cherchera à positionner le <em>scroll</em> à l&rsquo;endroit où est placé le <code>:focus</code>.</p>
<p>Cependant, si l&rsquo;élément masqué peut lui-même recevoir le <code>:focus</code>, il nous faut pouvoir l&rsquo;afficher de nouveau. <strong>C&rsquo;est généralement le cas pour les liens d&rsquo;évitement</strong>. Lisez <a href="https://www.w3.org/TR/2013/NOTE-WCAG20-TECHS-20130905/G1">la technique G1 des <abbr title="Web Content Accessibility Guidelines">WCAG</abbr></a> pour en savoir plus.</p>
<p>Pour ce genre de cas, <a href="https://github.com/twbs/bootstrap/blob/v4-dev/scss/mixins/_screen-reader.scss">Bootstrap propose une classe supplémentaire</a> pour remettre à zéro nos valeurs de masquage.</p>
<p>C&rsquo;est à mon avis la meilleure façon de faire —&nbsp;et étant donné les changements apportés sur la classe de masquage, cette seconde classe doit être revue elle aussi. Voici ma version&nbsp;:</p>
<pre><code class="language-css"><br />
.sr-only-focusable:focus,<br />
.sr-only-focusable:active {<br />
  clip: auto !important;<br />
  -webkit-clip-path: none !important;<br />
          clip-path: none !important;<br />
  height: auto !important;<br />
  margin: auto !important;<br />
  overflow: visible !important;<br />
  width: auto !important;<br />
  white-space: normal !important;<br />
}<br />
</code></pre>
<h2>Code et traduction</h2>
<p>Vous pouvez retrouver ces classes à plusieurs endroits&nbsp;:</p>
<ul>
<li><a href="http://codepen.io/ffoodd/pen/gwKZyq?editors=1100#">sur CodePen</a>&nbsp;;</li>
<li><a href="https://gist.github.com/ffoodd/000b59f431e3e64e4ce1a24d5bb36034">dans un Gist</a>.</li>
</ul>
<p>Qu&rsquo;en dites-vous&nbsp;?</p>
<h3>Version anglaise</h3>
<p><a href="https://twitter.com/KittyGiraudel">Kitty Giraudel</a> m&rsquo;a fait l&rsquo;honneur de <a href="http://kittygiraudel.com/2016/10/13/css-hide-and-seek/">traduire cet article en anglais et le publier sur son blog</a>. Merci&nbsp;!</p>
<h2>Modifications</h2>
<h3>Les lecteurs d&rsquo;écran sur mobile</h3>
<p>19 octobre 2016</p>
<p>Ayant besoin de tests sur cette version pour vérifier qu&rsquo;elle n&rsquo;introduit pas de régressions, <a href="https://twitter.com/johan_ramon/status/788372720224526336">Johan Ramon m&rsquo;a remonté un bug étrange sur VoiceOver</a>. En creusant un peu avec <a href="https://github.com/PigeardSylvain">Sylvain Pigeard</a>, il nous est apparu que <code>position: static</code> posait problème lors de la prise de focus d&rsquo;un lien ayant la classe <code>.sr-only-focusable</code>.</p>
<p>Nous étions contents, lorsqu&rsquo;en cherchant à avertir l&rsquo;équipe de Bootstrap nous sommes tombés sur <a href="https://github.com/twbs/bootstrap/issues/20732">un ticket ouvert récemment qui implique également TalkBack</a>. <a href="https://twitter.com/patrick_h_lauke">Patrick H. Lauke</a>, en investiguant, a décelé de nombreuses incohérences dans la gestion du focus entre les diverses technologies d&rsquo;assistance sur mobile. Il a ainsi ouvert des tickets un peu partout&nbsp;:</p>
<ul>
<li><a href="https://microsoftaccessibility.uservoice.com/forums/307429-microsoft-accessibility-feedback/suggestions/16717318-focusable-elements-should-fire-focus-event-recei">Narrator</a>, le lecteur d&rsquo;écran intégré à Windows 8, Windows 10 et Windows Phone&nbsp;;</li>
<li><a href="https://bugs.chromium.org/p/chromium/issues/detail?id=657157">TalkBack</a>, le lecteur d&rsquo;écran intégré à Android, interfacé avec Chromium&nbsp;;</li>
<li><a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1000082">Firefox</a>, qui tend à s&rsquo;interfacer le mieux possible avec tous les lecteurs d&rsquo;écran&nbsp;;</li>
<li><a href="https://bugs.webkit.org/show_bug.cgi?id=116046">Webkit</a>, le moteur de rendu de Safari&nbsp;;</li>
<li><a href="https://bugs.webkit.org/show_bug.cgi?id=163658">Webkit</a>, encore.</li>
</ul>
<p>L&rsquo;état des lieux est assez sombre&nbsp;: <strong>les liens d&rsquo;évitement ne marchent globalement pas sur les interfaces tactiles lorsqu&rsquo;on utilise un lecteur d&rsquo;écran</strong>. Ô joie.</p>
<h3>Le référencement naturel</h3>
<p>19 octobre 2016</p>
<p><a href="https://twitter.com/stevefaulkner">Steve Faulkner</a> —&nbsp;du <a href="https://www.paciellogroup.com/blog/">Paciello Group</a>&nbsp;— a posé la question au forum de support pour <em>webmasters</em> de Google&nbsp;: <a href="https://productforums.google.com/forum/#!msg/webmasters/YJcZUhtMIE4/XkOEzVakBAAJ">les contextes supplémentaires pour utilisateurs malvoyants ont-ils un effet négatif sur le positionnement dans les résultats de recherche&nbsp;?</a></p>
<p>Réponse courte&nbsp;: <strong>non</strong> Cependant étant donné que ce texte n&rsquo;apparaît pas de prime abord il est considéré comme du contenu secondaire et a donc un très faible impact sur le positionnement, et c&rsquo;est une excellente chose puisque cela dissuade d&rsquo;en abuser.</p>
<h3>Les débordements inopinés</h3>
<p>18 janvier 2019</p>
<p>De multiples problèmes de débordements ont été observés, notamment sur Chrome, lorsque les éléments masqués sont contenus dans un élément avec <code>overflow: auto;</code>. <a href="https://github.com/Orange-OpenSource/Orange-Boosted-Bootstrap/issues/84">Le problème est résolu dans Boosted</a> en ajoutant <code>margin: -1px;</code>.</p>
