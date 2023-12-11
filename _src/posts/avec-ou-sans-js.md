---
title: "Avec ou sans JS&nbsp;?"
date: "2017-02-03T17:02:05"
modified: "2017-02-06T12:42:12"
permalink: "avec-ou-sans-js/index.html"
excerpt: "<p>Vous est-il déjà arrivé de voir un élément se cacher dès que vous arrivez sur un site&nbsp;? Rassurez-vous, ça n&apos;est pas qu&apos;il ne vous aime pas, non&nbsp;: son concepteur a simplement pensé que sans JavaScript, ce contenu devait être affiché. Et quand JavaScript est activé, il le cache. C&apos;est malin&nbsp;! Mais vous l&rsquo;avez vu. <a href="https://www.ffoodd.fr/avec-ou-sans-js/" aria-hidden="true">Lire la suite de «&nbsp;Avec ou sans JS&nbsp;?&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Vous avez déjà vécu ça, pas vrai&nbsp;?</p>
<h2>L&apos;amélioration progressive</h2>
<p>Quand on cherche à bien faire ces interactions qui affichent et masquent un élément à l&apos;aide de JavaScript, une des fondations est de <strong>s&apos;assurer que le contenu soit accessible sans JavaScript</strong>. Ça fait partie intégrante de l&apos;amélioration progressive, que je synthétise comme suit&nbsp;:</p>
<ol>
<li>le <abbr title="HyperText Markup Language">HTML</abbr> est propre, lisible, cohérent, et permet d&apos;<strong>accéder au contenu sans obstacle</strong>&nbsp;;</li>
<li>le <abbr title="Cascading StyleSheet">CSS</abbr> améliore <strong>l&apos;aspect graphique</strong>, ordonne les éléments visuellement&nbsp;;</li>
<li>le <abbr title="JavaScript">JS</abbr> enrichit le tout d&apos;une couche de <strong>comportements</strong> inexistants en HTML et CSS.</li>
</ol>
<p>Or dans le cas d&apos;un composant qui affiche ou masque un élément, le fonctionnement avant l&apos;exécution du JS est donc d&apos;avoir cet élément affiché par défaut. Ensuite —&nbsp;<strong>et seulement une fois que le JS est fonctionnel</strong>&nbsp;— on va pouvoir le manipuler pour masquer notre élément.</p>
<p>C&apos;est là où le bât blesse. <strong>Le temps que notre JS soit exécuté, nous voyons l&apos;élément affiché</strong> (même si ça ne dure qu&apos;une fraction de seconde).</p>
<h2>La limite du JS</h2>
<p>En l&apos;occurrence, c&apos;est son temps d&apos;exécution —&nbsp;extrêmement dépendant de la machine et du navigateur de l&apos;utilisateur.<br />
Plusieurs pistes existent pour palier ce problème&nbsp;:</p>
<ol>
<li>on peut par exemple <strong>exécuter le plus tôt possible</strong> le test d&apos;activation du JS, qui consiste à transformer une classe <code>no-js</code> posée sur la balise <code>&lt;html&gt;</code>… Mais dans certains cas, ce la ne suffit pas&nbsp;;</li>
<li>on peut également <strong>abdiquer</strong>&nbsp;: après tout, plus aucun référentiel n&apos;exige d&apos;alternative à JS&nbsp;;</li>
<li>on peut aussi se la jouer <em>old school</em> en <strong>dupliquant le contenu masqué</strong> dans une balise <code>&lt;noscript&gt;</code> —&nbsp;mais on ne se sent pas vraiment propre, après ça.</li>
</ol>
<p>Comme le signale Lionel dans les commentaires, conserver la modification des classes dès le <code>&lt;head&gt;</code> reste une étape incontournable pour optimiser ce mécanisme. Un exemple&nbsp;:</p>
<pre class="language-javascript"><code class="language-javascript"><br />
document.documentElement.classList.remove(&#039;no-js&#039;);<br />
document.documentElement.classList.add(&#039;js&#039;);<br />
</code></pre>
<p>Et en bonus, <strong>on peut réfléchir et utiliser CSS</strong>.</p>
<h2>Les styles à la rescousse</h2>
<p>La base du fonctionnement que je propose est l&apos;astuce utilisée par <a href="https://www.nicolas-hoffmann.net/source/">Nicolas Hoffmann</a> sur <a href="https://a11y.nicolas-hoffmann.net/">ses composants jQuery accessibles</a>. <i>Grosso modo</i>, il effectue une transition sur <code>max-height</code> pour la partie animée, et sur <code>visibility</code> avec un délai pour <strong>masquer réellement</strong> le contenu<sup aria-describedby="note-1" id="lien-1" data-note="Il explique tout ça très bien dans la documentation de ses divers composants."><a class="scroll print-hidden" href="https://www.ffoodd.fr/avec-ou-sans-js/#note-1" title="Il explique tout ça très bien dans la documentation de ses divers composants.">[1]</a></sup>.</p>
<p>J&apos;aime beaucoup cette technique, dont le seul inconvénient —&nbsp;à mon avis&nbsp;— est d&apos;animer <code>max-height</code>, ce qui nous oblige à utiliser un <a href="https://www.ffoodd.fr/decouvrez-le-calcul-magique/">chiffre magique</a> pour une hauteur maximum inatteignable.</p>
<h3>L&apos;état de base</h3>
<p>Voici l&apos;état de base de ma navigation&nbsp;:</p>
<pre class="language-css"><code class="language-css">[id=&quot;nav&quot;] {<br />
  transform: translate3d(-100%, 0, 0);<br />
  transition:<br />
    transform 300ms ease-in 50ms,<br />
    visibility 0s linear 300ms;<br />
  visibility: hidden;<br />
  width: 18.75rem;<br />
  will-change: transform, visibility;<br />
}</code></pre>
<p>Elle est décalée vers la gauche de la totalité de sa largeur, afin de <strong>sortir de l&apos;écran</strong>&nbsp;; et est masquée.</p>
<p>Notez que nous avons un délai sur nos deux transitions. Pour le moment, seul celui sur <code>visibility</code> est important, puisqu&apos;il permet de faire coïncider le changement de visibilité avec la durée de la transformation.</p>
<h3>L&apos;ouverture grâce à JS</h3>
<p>Là, c&apos;est tout bête. Le JS ajoute une classe <code>.is-opened</code> à la navigation, je m&apos;en sers pour accrocher mes styles&nbsp;:</p>
<pre class="language-css"><code class="language-css"><br />
.is-opened {<br />
  transform: none;<br />
  transition-delay: 0ms;<br />
  visibility: visible;<br />
}</code></pre>
<p>Et pour ceux qui me connaissent, je désamorce une question&nbsp;: je n&apos;utilise pas <code>:not([aria-hidden])</code>, car cet attribut est ajouté <i>via</i> JS. Ainsi la navigation commencerait à apparaître au chargement, puis serait masquée après l&apos;exécution du script —&nbsp;<strong>exactement le comportement qu&apos;on cherche à corriger</strong>.</p>
<h3>Et si JS est désactivé</h3>
<p>C&apos;est là qu&apos;on rigole&nbsp;! Lisez plutôt, je vous explique ensuite&nbsp;:</p>
<pre class="language-css"><code class="language-css"><br />
@keyframes no-js {<br />
  to {<br />
    transform: none;<br />
    transition-delay: 50ms, 0ms;<br />
    visibility: visible;<br />
  }<br />
}<br />
<br />
.no-js [id=&quot;nav&quot;] {<br />
  animation: 300ms ease-in 300ms forwards no-js;<br />
}</code></pre>
<p>Dans un premier temps, je définis la règle <code>@keyframes</code> pour mon animation. Son seul contenu est <strong>l&apos;état final</strong>&nbsp;: pas de translation, l&apos;élément est visible, et les délais de transition sont ajustés. <a href="http://caniuse.com/#search=keyframes">En terme de support</a> on abandonne donc IE9 et ses aïeux, ainsi qu&apos;Opéra Mini.</p>
<p>Dans un second temps, j&apos;applique cette animation sur la navigation lorsque la balise <code>&lt;html&gt;</code> porte la classe <code>.no-js</code>. C&apos;est sa classe par défaut, qui n&apos;est retirée que si JS est activé.</p>
<p>Pour éviter que l&apos;animation ne se joue pendant le chargement de la page, je lui intime l&apos;ordre de <strong>patienter</strong> 300 millisecondes et de <strong>durer</strong> 300 millisecondes —&nbsp;soit un délai généralement suffisant pour que JS ait magouillé les classes sur <code>&lt;html&gt;</code>.</p>
<p>Et ceux qui ont déjà joué avec les animations le savent, elles reviennent par défaut à l&apos;état initial (soit dans notre cas, le menu masqué). Bien sûr, ça ne va pas&nbsp;: j&apos;ai donc précisé grâce au mot-clé <code>forwards</code> que l&apos;animation devait <strong>conserver son état final</strong>.</p>
<p>Et voilà&nbsp;! <strong>On profite en sus d&apos;une bien jolie animation qui fait entrer notre navigation dans l&apos;écran</strong> au lieu de la fuir. Et une page animée avec JS désactivé, je trouve ça cool. 🙂</p>
<h2>Démonstration</h2>
<p>Si vous êtes curieux de voir ce que ça donne ou de jouer avec, j&rsquo;ai monté un <a href="http://codepen.io/ffoodd/pen/apGqpQ">CodePen de démonstration</a> dans lequel vous pourrez lire le code. </p>
<p>Pour jouer avec le JS désactivé, vous devrez <a href="http://codepen.io/ffoodd/full/apGqpQ/">consulter la vue complète</a><sup aria-describedby="note-2" id="lien-2" data-note="CodePen affiche un bien joli message si vous désactivé JavaScript."><a class="scroll print-hidden" href="https://www.ffoodd.fr/avec-ou-sans-js/#note-2" title="CodePen affiche un bien joli message si vous désactivé JavaScript.">[2]</a></sup>.</p>
