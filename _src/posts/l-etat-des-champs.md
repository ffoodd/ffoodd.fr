---
title: "L&rsquo;état des champs"
date: "2017-12-21T14:09:15"
modified: "2022-12-22T16:55:46"
permalink: "l-etat-des-champs/index.html"
excerpt: "<p>Les champs de formulaire ont toujours été une gageure en terme de styles, qu&rsquo;on parle des listes déroulantes, des cases à cocher, des boutons radios&hellip; Il est désormais plus simple de les personnaliser, mais il demeure quelques écueils tel que l&apos;état invalide d&apos;un champ requis lors du chargement de la page. Oups. <a href="https://www.ffoodd.fr/l-etat-des-champs/" aria-hidden="true">Lire la suite de «&nbsp;L&rsquo;état des champs&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Mais en arrivant sur la page, ledit champ est vide — et par conséquent, invalide.</p>
<h2>Le souci</h2>
<p>Lorsque vous appliquez des styles à un champ invalide (en utilisant la pseudo-classe <code>:invalid</code>), ils seront donc appliqués dès le chargement de la page si ce champ est également affublé de l&rsquo;attribut <code>required</code>. Dommage&nbsp;!</p>
<p>C&rsquo;est ce qui a conduit <a href="https://nota-bene.org/">Stéphane Deschamps</a> à ouvrir <a href="https://github.com/w3c/html/issues/1073">une <span lang="en">issue</span> sur le Github du <abbr title="World Wide Web Consortium">W3C</abbr></a>.</p>
<h3>L&rsquo;état indéterminé</h3>
<p>Quelques échanges plus tard, on évoque l&rsquo;existence de l&rsquo;état indéterminé pour les cases à cocher, boutons radios et barres de progression <a href="https://www.w3.org/TR/html5/disabled-elements.html#selector-indeterminate">dans la spécification <abbr title="HyperText Markup Language">HTML5</abbr></a> qui pourrait porter le statu quo sur l&rsquo;invalidité de notre champ. Cet état est facile à cibler en <abbr title="Cascading StyleSheet">CSS</abbr> à l&rsquo;aide de la pseudo-classe <code>:indeterminate</code>.</p>
<h3>Le brouillon du module 4 des sélecteurs</h3>
<p>Dans <a href="https://drafts.csswg.org/selectors-4/#user-pseudos">le brouillon du module de niveau 4 des sélecteurs <abbr title="Cascading StyleSheet">CSS</abbr></a>, une nouvelle pseudo-classe tente de résoudre ce problème&nbsp;: <code>:user-invalid</code>. Vous noterez par ailleurs que le paragraphe descriptif n&rsquo;est pas à jour puisqu&rsquo;il évoque la première dénomination de ce nouveau sélecteur, à savoir <code>:user-error</code>.</p>
<p>Mais vous l&rsquo;aurez compris, il s&rsquo;agit d&rsquo;un brouillon et ce nouveau sélecteur est très loin d&rsquo;avoir été implémenté où que ce soit.</p>
<h2>Un contournement possible</h2>
<p>Une idée m&rsquo;est venue en lisant un article du calendrier de l&rsquo;avent Digitpaint intitulé <a href="https://advent2017.digitpaint.nl/2/">Fantastic form pseudo selectors</a>, dans lequel le premier exemple implémente un label flottant non pas au <code>:focus</code> sur le champ, mais lors du début de saisie grâce à la pseudo-classe <code>:placeholder-shown</code>. Génie&nbsp;!</p>
<p>Cette pseudo-classe est active uniquement lorsque le <code>placeholder</code> est affiché, autrement dit tant qu&apos;aucune saisie n&rsquo;a été effectuée dans le champ. Et ça, ça ressemble beaucoup à une partie de l&rsquo;énoncé de notre problème du jour. Nous pourrions donc faire en sorte de <strong>distinguer un champ invalide vierge d&apos;un champ invalide ayant été saisi</strong>, avec les sélecteurs suivants&nbsp;:</p>
<pre class="language-css">
<code class="language-css"><br />
input:invalid {<br />
  box-shadow: none;<br />
}<br />
<br />
input:invalid:not(:focus) {<br />
  box-shadow: 0 0 0 2px red;<br />
}<br />
<br />
input:invalid:placeholder-shown {<br />
  box-shadow: none;<br />
}<br />
</code>
</pre>
<p>Et bien a priori, ça fonctionne&nbsp;!<br />
Et bonne nouvelle, <a href="https://caniuse.com/#feat=css-placeholder-shown"><code>:placeholder-shown</code> est décemment supporté</a>. Je vous ai même fait <a href="https://codepen.io/ffoodd/pen/PEzoYO">un petit CodePen pour jouer</a><sup aria-describedby="note-1" id="lien-1" data-note="Amusez-vous à commenter le second sélecteur pour voir le comportement ordinaire."><a class="scroll print-hidden" href="https://www.ffoodd.fr/l-etat-des-champs/#note-1" title="Amusez-vous à commenter le second sélecteur pour voir le comportement ordinaire.">[1]</a></sup>.</p>
<h3>Remarques post-publication</h3>
<ul>
<li><strong>Note</strong>&nbsp;: Merci à <a href="https://vincent-valentin.name/">Vincent</a> qui me fait réfléchir, <a href="https://twitter.com/htmlvv/status/943832913937928192">dans une discussion sur Twitter</a>.</li>
<li><strong>Note</strong>&nbsp;: <a href="https://twitter.com/GaetanBt/status/943842968754061312">Gaëtan me signale</a> que sur Chrome, le placeholder</code> ne peut pas être vide pour que cette astuce fonctionne.</li>
<li><strong>Note</strong>&nbsp;: <a href="https://twitter.com/johan_ramon/status/943844529597272065">Johan me signale</a> que le comportement observé de visu était également vocalisé par les lecteurs d&apos;écran. Là, ça devient vraiment gênant&nbsp;!</li>
</ul>
<h3>Pourquoi pas <code>:not()</code></h3>
<p>Peut-être supposez-vous (à juste titre) qu&apos;au lieu d&apos;utiliser deux sélecteurs différents, nous pourrions styler directement les champs invalides dont le <code>placeholder</code> n&apos;est pas affiché, grâce à <code>input:invalid:not(:placeholder-shown)</code>.</p>
<p>Le fait est que le support de <code>:invalid</code> est <a href="https://caniuse.com/#search=%3Ainvalid">bien meilleur</a> que celui de <code>:placeholder-shown</code>&nbsp;; de plus, vous n&apos;êtes pas sans savoir que <abbr title="Cascading StyleSheet">CSS</abbr> est un langage tolérant à l&apos;erreur. Quand un navigateur rencontre un sélecteur qu&apos;il ne comprend pas, <strong>il ignore l&apos;ensemble du bloc de déclaration concerné</strong> &mdash;&nbsp;et ce pour une bonne raison&nbsp;: être capable d&apos;appliquer les styles suivants.</p>
<p>Ainsi les navigateurs ne comprenant pas <code>:placeholder-shown</code> (Internet Explorer et Edge au premier rang) n&apos;appliqueraient pas nos styles dédiés aux champs invalides. Et ça, a priori, ce n&apos;est pas ce qu&apos;on veut&nbsp;! Alors en utilisant deux sélecteurs, le seul inconvénient est que <strong>les navigateurs ne comprenant pas le second sélecteur conservent leur comportement actuel</strong>.</p>
<p>Et ça, c&apos;est mieux.</p>
<h2>Au final</h2>
<p>Je ne pense pas que ce soit une bonne idée, je tiens à le préciser. Cette combinaison n&apos;a pas vocation à être employée de la sorte, ce n&apos;est qu&apos;un détournement un peu tordu, il est vrai. Mais bon, j&apos;aime les petits défis en <abbr title="Cascading StyleSheet">CSS</abbr>, ne m&apos;en voulez pas&nbsp;!</p>
<h3>Un précédent</h3>
<p>Après de petites recherches sur les internets, j&apos;ai trouvé plusieurs références à cette combinaison de sélecteurs antérieures à cet article, toutes remontant finalement à <a href="https://css-tricks.com/form-validation-ux-html-css/">un article sur la validation des formulaires en <abbr title="Cascading StyleSheet">CSS</abbr></a> rédigé par <a href="https://twitter.com/chriscoyier">Chris Coyier</a> en 2016<sup aria-describedby="note-2" id="lien-2" data-note="Pour la question du support et de la tolérance à l&#039;erreur, Chris Coyier préfère évoquer @supports plutôt que d&#039;accumuler les sélecteurs. Ça ne me paraît pas nécessaire dans le cas présent, mais à réfléchir !"><a class="scroll print-hidden" href="https://www.ffoodd.fr/l-etat-des-champs/#note-2" title="Pour la question du support et de la tolérance à l&#039;erreur, Chris Coyier préfère évoquer @supports plutôt que d&#039;accumuler les sélecteurs. Ça ne me paraît pas nécessaire dans le cas présent, mais à réfléchir !">[2]</a></sup>.</p>
<p>Un véritable <em><abbr title="Cascading StyleSheet">CSS</abbr> trick</em>&nbsp;!</p>
