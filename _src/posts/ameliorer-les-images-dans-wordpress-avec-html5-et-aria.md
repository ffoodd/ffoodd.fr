---
title: "[caption] avec html5 et aria"
date: "2013-11-12T16:32:51"
modified: "2015-07-03T10:49:36"
permalink: "ameliorer-les-images-dans-wordpress-avec-html5-et-aria/index.html"
excerpt: "<p>Le shortcode [caption], au demeurant très pratique, est cependant très limité&thinsp;:&nbsp;il se contente d’ajouter l&rsquo;image et sa description (&thinsp;un paragraphe&thinsp;) dans une div. Correct pour l’affichage, mais très léger en terme de sémantique et d’accessibilité. Voyons comment améliorer ça ! <a href="https://www.ffoodd.fr/ameliorer-les-images-dans-wordpress-avec-html5-et-aria/" aria-hidden="true">Lire la suite de «&nbsp;[caption] avec html5 et aria&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Pour commencer, il faut comprendre une problématique de base en terme d’accessibilité&thinsp;:&nbsp;la distinction entre <strong>les images décoratives</strong> et <strong>les images porteuses de sens</strong>. Pour comprendre cette distinction et son importance, je vous recommande vivement la lecture d’<a href="https://www.ffoodd.fr/lecture-accessibilite-web/" title="Accessibilité web"><em>&laquo;Accessibilité web&raquo;</em></a> par <a href="http://www.armonyaltinier.fr/" title="Le site d’Armony Altinier (nouvelle fenêtre)" target="_blank">Armony Altinier</a>. Comme souvent lorsque nous parlons d’<strong>accessibilité web</strong>, il s’agit de bon sens&thinsp;:&nbsp;une image porteuse de sens doit être restituée à tous les utilisateurs, tandis qu&rsquo;une image décorative ne doit être montrée qu’aux utilisateurs disposant d’un affichage graphique complet.</p>
<h2>Les limites de WordPress</h2>
<p>Tout le monde n&rsquo;est pas sensible à ces questions, même s’il le faudrait&thinsp;:&nbsp;WordPress ne fait pas exception. Il donne cependant la possibilité à ses utilisateurs de servir des images de façon tout à fait correcte, en proposant de base pour tous les fichiers la capacité d’adjoindre un texte alternatif &mdash; ce qui remplit le critère principal des <a href="http://checklists.opquast.com/fr/" title="Les checklists OpQuast (nouvelle fenêtre)" target="_blank">bonnes pratiques d&rsquo;OpQuast</a> et permet de satisfaire <a href="http://www.accessiweb.org/index.php/accessiweb_2.2_liste_generale.html#images" title="La thématique image sur Accessiweb (nouvelle fenêtre)" target="_blank">la plupart des critères de niveau Bronze d’Accessiweb</a>.</p>
<p>Pour autant WordPress ne va pas plus loin&thinsp;:</p>
<ul>
<li>Dans le cas d’une image décorative, il l’ajoute dans une balise <code>&lt;img /&gt;</code> et conserve l’attribut <code>alt</code> vide s’il n’est pas renseigné. <strong>C’est une bonne façon de procéder</strong>, car l’image n’est pas vocalisée par un lecteur d’écran et n&rsquo;a aucun poids sémantique.</li>
<li>Dans le cas d’une image qui véhicule une information (&thinsp;ce que je suppose être le cas si la légende est renseignée&thinsp;), il encadre cette image d’une <code>&lt;div&gt;</code> et y intègre la description dans un <code>&lt;p&gt;</code> (&thinsp;<i>cf&thinsp;:&nbsp;</i> <a href="http://core.trac.wordpress.org/browser/tags/3.7.1/src/wp-includes/media.php#L614" title="Le code source du shortcode (nouvelle fenêtre)" target="_blank">le code source du <span lang="en">shortcode</span></a>&thinsp;). <strong>C&rsquo;est problématique car il n&rsquo;existe aucun lien sémantique entre l’image et sa description, et le balisage est neutre.</strong></li>
</ul>
<p>Certes, c’est du fignolage. Mais c’est à priori dans les détails que l’on améliore sensiblement la qualité d’un site web.</p>
<h2>Les images porteuses de sens</h2>
<p>Le cas des images véhiculant des informations demande donc quelques efforts&thinsp;:&nbsp;il faut intercepter le <span lang="en">shortcode</span> afin de le ré-interpréter <strong>avant</strong> qu’il ne soit renvoyé côté client. Voici ce à quoi j’ai pu aboutir&thinsp;:&nbsp;</p>
<pre><code class="language-php">  /* == @section Remplace le code généré par [caption] ==================== */<br />
  /**<br />
   * @note : Le contenu est filtré pour remplacer le html généré pour les caption par du html5 sémantique. Astuce trouvée sur Reverie.<br />
   * @author : Zhen Huang<br />
   * @see : http://themefortress.com/reverie/<br />
   * @see : https://github.com/milohuang/reverie/blob/master/lib/clean.php#LC151<br />
   * @note : On y ajoute les microdonnées qui vont bien.<br />
   * @author : Joost Kiens ( @joostkiens )<br />
   * @see : https://gist.github.com/JoostKiens/4477366<br />
   * @note : Et j&#039;y ajoute les roles et attributs Aria nécessaires<br />
   * @see : http://www.kloh.ch/craw2013-html5-aria-et-accessibilite-web-479<br />
   */<br />
  add_filter( &#039;img_caption_shortcode&#039;, &#039;ffeeeedd__caption&#039;, 10, 3 );<br />
  function ffeeeedd__caption( $output, $attr, $content ) {<br />
    if ( is_feed() ) {<br />
      return $output;<br />
    }<br />
    $defaults = array(<br />
      &#039;id&#039; =&gt; &#039;&#039;,<br />
      &#039;align&#039; =&gt; &#039;alignnone&#039;,<br />
      &#039;width&#039; =&gt; &#039;&#039;,<br />
      &#039;caption&#039; =&gt; &#039;&#039;<br />
    );<br />
    $attr = shortcode_atts( $defaults, $attr );<br />
    if ( 1 &gt; (int) $attr[&#039;width&#039;] || empty( $attr[&#039;caption&#039;] ) ) {<br />
      return $content;<br />
    }<br />
    $content = str_replace( &#039;&lt;img&#039;, &#039;&lt;img id=&quot;&#039; . $attr[&#039;id&#039;] . &#039;&quot; itemprop=&quot;contentURL&quot; aria-describedby=&quot;wp-caption--&#039; . $attr[&#039;id&#039;] . &#039;&quot;&#039;, $content );<br />
    $attributes = &#039; class=&quot;wp-caption inbl &#039; . esc_attr( $attr[&#039;align&#039;] ) . &#039;&quot;&#039;;<br />
    $output = &#039;&lt;figure&#039; . $attributes .&#039; role=&quot;group&quot; itemscope itemtype=&quot;http://schema.org/ImageObject&quot;&gt;&#039;;<br />
    $output .= do_shortcode( $content );<br />
    $output .= &#039;&lt;figcaption class=&quot;wp-caption-text pt1 small&quot; id=&quot;wp-caption--&#039; . $attr[&#039;id&#039;] . &#039;&quot; itemprop=&quot;description&quot;&gt;&#039; . $attr[&#039;caption&#039;] . &#039;&lt;/figcaption&gt;&#039;;<br />
    $output .= &#039;&lt;/figure&gt;&#039;;<br />
    return $output;<br />
  }</code></pre>
<h2>L’intervention détaillée</h2>
<p>La structure d’origine est conservée&thinsp;;&nbsp;je détaille ce qui a été fait&thinsp;:</p>
<ul>
<li>Une couche sémantique <abbr title="HyperText Markup Language 5" lang="en">HTML5</abbr> est appliquée en lieu et place du balisage &laquo;neutre&raquo; précédent&thinsp;:&nbsp;<code>figure</code> et <code>figcaption</code>&thinsp;;</li>
<li>Une couche <abbr lang="en" title="Accessible Rich Internet Application">ARIA</abbr> améliore la compréhension de ce balisage parfois défaillant dans les technologies d’assistance, comme me l’a appris <a href="http://www.kloh.ch/craw2013-html5-aria-et-accessibilite-web-479" title="Compte-rendu de l'atelier de J.P. Villain par Luc (nouvelle fenêtre)" target="_blank">le compte-rendu d’un atelier</a> de <a href="https://twitter.com/villainjp" title="Profil Twitter de Jean-Pierre Villain (nouvelle fenêtre)" target="_blank">Jean-Pierre Vilain</a> à la <a href="http://www.telono.com/fr/agence/conference-romande-accessibilite-web-2013/" title="Conférence Romande sur l’Accessibilité Web 2013 (nouvelle fenêtre)" target="_blank">CRAW2013</a> rédigé par <a href="https://twitter.com/klohFR" title="Profil Twitter de Luc Poupard (nouvelle fenêtre)" target="_blank">Luc</a>. Dans notre cas, le <code>role=&quot;group&quot;</code><sup aria-describedby="note-1" id="lien-1" data-note="En savoir plus sur le rôle &laquo;group&raquo;&thinsp;:&nbsp;https://developer.mozilla.org/en-US/docs/Accessibility/ARIA/ARIA_Techniques/Using_the_group_role"><a class="scroll print-hidden" href="https://www.ffoodd.fr/ameliorer-les-images-dans-wordpress-avec-html5-et-aria/#note-1" title="En savoir plus sur le rôle &laquo;group&raquo;&thinsp;:&nbsp;https://developer.mozilla.org/en-US/docs/Accessibility/ARIA/ARIA_Techniques/Using_the_group_role">[1]</a></sup> est appliqué au conteneur <code>&lt;figure&gt;</code>, puis les balises <code>&lt;img /&gt;</code> et <code>&lt;figcaption&gt;</code> sont associées grâce à l’attribut <code>aria-describedby</code><sup aria-describedby="note-2" id="lien-2" data-note="Vous pourrez en apprendre plus sur cet attribut ici&thinsp;:&nbsp;https://developer.mozilla.org/en-US/docs/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute"><a class="scroll print-hidden" href="https://www.ffoodd.fr/ameliorer-les-images-dans-wordpress-avec-html5-et-aria/#note-2" title="Vous pourrez en apprendre plus sur cet attribut ici&thinsp;:&nbsp;https://developer.mozilla.org/en-US/docs/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute">[2]</a></sup>&thinsp;;</li>
<li>Et finalement une dernière couche est ajoutée&thinsp;:&nbsp;les micro-données<sup aria-describedby="note-3" id="lien-3" data-note="Découvrir les micro-données pour enrichir les objets images&thinsp;:&nbsp;http://schema.org/ImageObject"><a class="scroll print-hidden" href="https://www.ffoodd.fr/ameliorer-les-images-dans-wordpress-avec-html5-et-aria/#note-3" title="Découvrir les micro-données pour enrichir les objets images&thinsp;:&nbsp;http://schema.org/ImageObject">[3]</a></sup>, destinées au <abbr lang="en" title="Search Engine Optimisation">SEO</abbr>.</li>
</ul>
<p>Ce code n’est probablement pas parfait, car je ne l’ai pas testé avec un lecteur d’écran&thinsp;:&nbsp;il va falloir que je le fasse. Mais je pense que c’est un premier pas en avant vers une meilleure qualité des sites WordPress que je produis.</p>
<p><strong>Les commentaires, conseils et indications supplémentaires seront grandement appréciés</strong> :)&thinsp;.</p>
<h2>Mises à jour</h2>
<p>Suite à un bref échange avec <a href="https://twitter.com/johan_ramon" title="Johan Ramon sur Twitter (nouvelle fenêtre)" target="_blank">Johan Ramon</a>, je dois préciser un point important&thinsp;:&nbsp;l’alternative textuelle de l’image doit également mentionner la légende attenante, pour les technologies d&rsquo;assistance qui ne prendraient pas en compte l’attribut <code>aria-describedby</code>. Voici les ressources utiles&thinsp;</p>
<ul>
<li><a href="http://www.accessiweb.org/forumhtml5/viewtopic.php?id=39#p810" title="Discussion sur le forum d’AccessiWeb (nouvelle fenêtre)" target="_blank">Discussion sur le critère 1.10 d&rsquo;AccessiWeb 2.2</a></li>
<li><a href="http://blog.atalan.fr/support-des-attributs-aria-par-les-lecteurs-decran/" title="Article sur le blog de la société Atalan (nouvelle fenêtre)" target="_blank">Support des attributs ARIA par les lecteurs d’écran</a></li>
</ul>
<p>Comme souvent, cette dernière contrainte repose entièrement sur le contributeur qui doit être <strong>informé</strong> et <strong>éduqué</strong> à cette responsabilité.</p>
