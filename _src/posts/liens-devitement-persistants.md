---
title: "Liens d&rsquo;évitement persistants"
date: "2013-10-16T15:56:40"
modified: "2013-11-13T12:09:49"
permalink: "liens-devitement-persistants/index.html"
excerpt: "<p>Paris Web a été pour moi l&rsquo;occasion de rencontrer des professionnels aguerris et d&rsquo;en apercevoir les expériences cumulées. Et une conférence m&rsquo;a particulièrement appris : <em>&laquo;Accessibiliser avec subtilité&raquo;</em> de <a href="https://twitter.com/johan_ramon" title="Profil Twitter de Johan Ramon (nouvelle fenêtre)" target="_blank">Johan Ramon </a> de la <a href="http://www.atalan.fr/" target="_blank" title="LE site de la société Atalan (nouvelle fenêtre)"> société Atalan</a>. <a href="https://www.ffoodd.fr/liens-devitement-persistants/" aria-hidden="true">Lire la suite de «&nbsp;Liens d&rsquo;évitement persistants&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Parmi ces techniques, certaines m&rsquo;étaient inconnues : une ignorance qui ne nuisait pas directement à l&rsquo;accessibilité mais bel et bien au confort d&rsquo;utilisation du site pour les personnes concernées. Voici donc deux techniques que j&rsquo;ai mises en place suite à cette lecture passionnante.</p>
<h2>Les liens similaires</h2>
<p>Il devient rapidement ennuyeux de parcourir une liste de liens (avec un lecteur d&rsquo;écrans <b>et/ou</b> en tabulant) lorsque plusieurs liens consécutifs ont la même destination. Malheureusement, c&rsquo;est le cas très souvent sur WordPress dans les boucles d&rsquo;articles.</p>
<p>Et bien voici une bonne nouvelle : il est très simple de corriger ça, de façon totalement transparente pour tout le monde :</p>
<ul>
<li><b>tabindex à -1 :</b> pour la navigation au clavier, cet attribut permet de retirer un lien tabulable de l&rsquo;index de tabulation. En l&rsquo;appliquant judicieusement dans votre liste d&rsquo;articles, vous ne laissez ainsi qu&rsquo;un seul lien &#8211; et arrêtez de polluer la navigation au clavier.</li>
<li><b>aria-hidden à true :</b> cet attribut permet de taire un élément dans les lecteurs d&rsquo;écrans. La logique est la même que précédemment, à ceci près qu&rsquo;on prendra soin de laisser le lien dont la vocalisation sera la plus pertinente : dans le cas d&rsquo;une boucle WordPress, le lien présent dans les titres est idéal.</li>
</ul>
<p>En appliquant cette technique correctement, on divise par deux ou trois le nombre de liens à parcourir dans une liste d&rsquo;articles. Vos utilisateurs vous remercieront 🙂 .</p>
<h2>Les liens d&rsquo;évitement</h2>
<p>Je ne reviendrais pas sur les bases de cette technique, qui est plus que documentée sur le web<sup aria-describedby="note-1" id="lien-1" data-note="Un article de Jean-Pierre Villain sur Alsacréations - il date de 2006 et est toujours (presque) d&#039;actualités : http://www.alsacreations.com/tuto/lire/572-Les-liens-d-evitement.htm"><a class="scroll print-hidden" href="https://www.ffoodd.fr/liens-devitement-persistants/#note-1" title="Un article de Jean-Pierre Villain sur Alsacréations - il date de 2006 et est toujours (presque) d&#039;actualités : http://www.alsacreations.com/tuto/lire/572-Les-liens-d-evitement.htm">[1]</a></sup> ! Seules les améliorations suggérées par Johan Ramon m&rsquo;intéressent ici :</p>
<ul>
<li>La persistance des liens d&rsquo;évitement après leur première prise de focus</li>
<li>La mise en avant visuelle de la zone ciblée par le lien d&rsquo;évitement</li>
</ul>
<p>Concernant le second point, je ne l&rsquo;ai pas encore implémenté sur ffoodd.fr pour la seule raison que je dois trouver un signifiant visuel cohérent avec mon design, mais ça ne saurait tarder 🙂 .</p>
<p>Cependant la persistance des liens m&rsquo;a particulièrement intéressé, car c&rsquo;est un point que je trouve réellement bénéfique pour le confort d&rsquo;utilisation. Même si je ne me sers de la tabulation que pour tester mes intégrations, il m&rsquo;a toujours semblé désagréable de « perdre » ces liens. </p>
<h2>La persistance des liens d&rsquo;évitement</h2>
<p>En recherchant plus d&rsquo;informations sur cette technique, je suis tombé sur le blog de la société Atalan pour laquelle travaille Johan &#8211; et sur <a href="http://blog.atalan.fr/des-liens-devitement-astucieux/" title="Article sur les liens d'évitement astucieux (nouvelle fenêtre)" target="_blank">un article dédié au sujet</a>. Des ressources très intéressantes sont données, cependant toutes sont basées sur jQuery pour ajouter une classe aux liens après leur première prise de focus. <b>Dommage, je n&rsquo;utilise pas jQuery sur ffoodd.fr.</b></p>
<p>Voici donc le bout de code correspondant, en vanilla javascript : </p>
<pre><code class="language-javascript"><br />
/* Lien d&#039;évitement &gt; Persistance de l&#039;affichage<br />
 * @see : http://blog.atalan.fr/des-liens-devitement-astucieux/<br />
*/<br />
[].forEach.call(document.querySelectorAll(&quot;.skip&quot;), function(el) {<br />
  el.addEventListener(&quot;focus&quot;, function() {<br />
    el.classList.add(&quot;show&quot;);<br />
  });<br />
});<br />
</code>
</pre>
<p>Et voilà ! Pour faire simple, je cible les liens disposant de la classe « skip » pour leur ajouter la classe « show » au focus. Et le <abbr title="Cascading StyleSheet" lang="en">CSS</abbr> fait le reste.</p>
<p>À noter que « dans certains cas rares » Chrome et IE ne transportent pas le focus sur la cible du lien d&rsquo;évitement lorsqu&rsquo;il a été activé. Un petit script vient facilement s&rsquo;assurer que le focus est bien transporté :</p>
<pre><code class="language-javascript"><br />
/* Correction du bug des ancres sous Chrome<br />
 * @see : http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/<br />
 * @see : http://blog.atalan.fr/des-liens-devitement-astucieux/<br />
*/<br />
window.addEventListener(&quot;hashchange&quot;, function(event) {<br />
    var element = document.getElementById(location.hash.substring(1));<br />
    if (element) {<br />
        if (!/^(?:a|select|input|button)$/i.test(element.tagName)) {<br />
            element.tabIndex = -1;<br />
        }<br />
        element.focus();<br />
    }<br />
}, false);<br />
</code>
</pre>
<h2>La qualité de l&rsquo;expérience</h2>
<p>Ce sont certes des détails, mais ces détails améliorent le confort de navigation et rendent un site agréable : l&rsquo;internaute appréciera cette expérience, et reviendra (pour peu que vos contenus soient à la hauteur). </p>
