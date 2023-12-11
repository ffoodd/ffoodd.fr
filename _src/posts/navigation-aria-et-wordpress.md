---
title: "Navigation, Aria et WordPress"
date: "2013-10-09T13:31:19"
modified: "2013-11-13T12:12:38"
permalink: "navigation-aria-et-wordpress/index.html"
excerpt: "<p>ARIA est une évolution majeure dans le monde de l&rsquo;accessibilité web, mais bien que candidat à la recommandation au W3C depuis 2011 elle est relativement peu implémentée &#8211; notamment dans WordPress. <a href="https://www.ffoodd.fr/navigation-aria-et-wordpress/" aria-hidden="true">Lire la suite de «&nbsp;Navigation, Aria et WordPress&nbsp;» <span class="meta-nav">&rarr;</span></a></p>
"
format: "standard"
---
<p>Dans sa version basique, la navigation de WordPress n&rsquo;a rien de particulier (si ce n&rsquo;est la multitude de classes générées sur chaque élément 🙁 ). Or <abbr lang="en" title="Accessible Rich Internet Application">ARIA</abbr> permet d&rsquo;ajouter une couche sémantique non négligeable et relativement simple à mettre en place, améliorant ainsi l&rsquo;accessibilité de la navigation.</p>
<h2>Notre objectif</h2>
<p>L&rsquo;implémentation d&rsquo;ARIA sur une navigation est simple ‐ bien qu&rsquo;il soit assez compliqué d&rsquo;en trouver une documentation ou un exemple concret. Voici le résultat attendu sur ffoodd (je vous épargne les classes et identifiants, pour cette fois 😉 ) :</p>
<pre><code class="language-markup">&lt;nav id=&quot;nav&quot; role=&quot;navigation&quot;&gt;<br />
  &lt;ul role=&quot;menubar&quot;&gt;<br />
    &lt;li role=&quot;menuitem&quot; aria-labelledby=&quot;ffoodd&quot;&gt;<br />
      &lt;a href=&quot;https://www.ffoodd.fr&quot; id=&quot;ffoodd&quot;&gt;ffoodd&lt;/a&gt;<br />
    &lt;/li&gt;<br />
    &lt;li role=&quot;menuitem&quot; aria-labelledby=&quot;travaux&quot;&gt;<br />
      &lt;a href=&quot;https://www.ffoodd.fr/travaux/&quot; id=&quot;travaux&quot;&gt;Travaux&lt;/a&gt;<br />
    &lt;/li&gt;<br />
  &lt;/ul&gt; <br />
&lt;/nav&gt;<br />
</code></pre>
<p>Vous connaissiez sans doute déjà le rôle « navigation », qui identifie la zone majeure du contenu destinée à la navigation. Les autres rôle et attributs sont explicites, et on en saisit facilement l&rsquo;intérêt sur cet extrait de code. Voyons maintenant comment obtenir ce résultat avec WordPress.</p>
<h2>WordPress et le Walker dédié à la navigation</h2>
<p>Ce sympathique walker se nomme <strong>Walker_Nav_Menu</strong>. Je l&rsquo;avais rencontré la première fois en farfouillant dans le code de <a title="Reverie - un starter theme pour WordPress (nouvelle fenêtre)" href="http://themefortress.com/reverie/" target="_blank">Reverie</a>, sans en saisir l&rsquo;intérêt à l&rsquo;époque. Puis mes compétences et réflexions évoluant avec le temps, lorsque je le recroisais sur le blog de <a title="Willy Bahuaud sur Twitter (nouvelle fenêtre)" href="https://twitter.com/willybahuaud" target="_blank">Willy Bahuaud</a> dans <a title="Construire un walker WordPress (nouvelle fenêtre)" href="http://wabeo.fr/blog/construire-walker-wordpress/" target="_blank">son article présentant les walkers</a>, j&rsquo;en saisis rapidement l&rsquo;intérêt et me mit en tête de m&rsquo;en servir sur mon thème ffeeeedd.</p>
<p>Je vous recommande chaudement de lire l&rsquo;article de Willy sur le sujet, qui est une entrée en matière extrêmement intéressante.</p>
<h2>Les mains dans le code</h2>
<p>Voilà sans plus attendre le code obtenu après quelques recherche :</p>
<pre><code class="language-php">  /* == @section Amélioration de la navigation ==================== */<br />
  /**<br />
   * @note : Un walker nous permet de amnipuler le html généré pour la navigation afin d&#039;y ajouter les roles aria qui vont bien.<br />
   * @author : Gaël Poupard<br />
   * @see : https://twitter.com/ffoodd_fr<br />
   * @see : http://wabeo.fr/blog/construire-walker-wordpress/<br />
   * @author : Willy Bahuaud<br />
   * @see : http://core.trac.wordpress.org/browser/tags/3.6.1//wp-includes/nav-menu-template.php#L0<br />
   */<br />
  class ffeeeedd__walker extends Walker_Nav_Menu {<br />
    function start_el( &amp;$output, $item, $depth = 1, $args = array(), $id = 0 ) {<br />
      $indent = ( $depth ) ? str_repeat( &quot;\t&quot;, $depth ) : &#039;&#039;;<br />
<br />
      $class_names = $value = &#039;&#039;;<br />
<br />
      $classes = empty( $item-&gt;classes ) ? array() : (array) $item-&gt;classes;<br />
      $classes[] = &#039;menu-item-&#039; . $item-&gt;ID;<br />
<br />
      $class_names = join( &#039; &#039;, apply_filters( &#039;nav_menu_css_class&#039;, array_filter( $classes ), $item, $args ) );<br />
      $class_names = $class_names ? &#039; class=&quot;&#039; . esc_attr( $class_names ) . &#039;&quot;&#039; : &#039;&#039;;<br />
<br />
      $id = apply_filters( &#039;nav_menu_item_id&#039;, &#039;menu-item-&#039;. $item-&gt;ID, $item, $args );<br />
      $id = $id ? &#039; id=&quot;&#039; . esc_attr( $id ) . &#039;&quot;&#039; : &#039;&#039;;<br />
<br />
      $output .= $indent . &#039;&lt;li&#039; . $id . $value . $class_names .&#039; role=&quot;menuitem&quot; aria-labelledby=&quot;item-&#039; . sanitize_html_class( apply_filters( &#039;the_title&#039;, $item-&gt;title, $item-&gt;ID ) ) . &#039;&quot;&gt;&#039;;<br />
<br />
      $atts = array();<br />
      $atts[&#039;title&#039;] = ! empty( $item-&gt;attr_title ) ? $item-&gt;attr_title : &#039;&#039;;<br />
      $atts[&#039;target&#039;] = ! empty( $item-&gt;target ) ? $item-&gt;target : &#039;&#039;;<br />
      $atts[&#039;rel&#039;] = ! empty( $item-&gt;xfn ) ? $item-&gt;xfn : &#039;&#039;;<br />
      $atts[&#039;href&#039;] = ! empty( $item-&gt;url ) ? $item-&gt;url : &#039;&#039;;<br />
<br />
      $atts = apply_filters( &#039;nav_menu_link_attributes&#039;, $atts, $item, $args );<br />
<br />
      $attributes = &#039;&#039;;<br />
      foreach ( $atts as $attr =&gt; $value ) {<br />
        if ( ! empty( $value ) ) {<br />
          $value = ( &#039;href&#039; === $attr ) ? esc_url( $value ) : esc_attr( $value );<br />
          $attributes .= &#039; &#039; . $attr . &#039;=&quot;&#039; . $value . &#039;&quot;&#039;;<br />
        }<br />
      }<br />
<br />
      $item_output = $args-&gt;before;<br />
      $item_output .= &#039;&lt;a&#039;. $attributes .&#039; id=&quot;item-&#039; . sanitize_html_class( apply_filters( &#039;the_title&#039;, $item-&gt;title, $item-&gt;ID ) ) . &#039;&quot;&gt;&#039;;<br />
      $item_output .= $args-&gt;link_before . apply_filters( &#039;the_title&#039;, $item-&gt;title, $item-&gt;ID ) . $args-&gt;link_after;<br />
      $item_output .= &#039;&lt;/a&gt;&#039;;<br />
      $item_output .= $args-&gt;after;<br />
<br />
      $output .= apply_filters( &#039;walker_nav_menu_start_el&#039;, $item_output, $item, $depth, $args );<br />
    }<br />
  }</code></pre>
<p>Le walker manipule chaque niveau de rendu de la navigation, ce qui nous permet d&rsquo;ajouter les rôles très facilement. La seule intervention astucieuse consiste à récupérer l&rsquo;intitulé de l&rsquo;item afin de l&rsquo;utiliser comme label pour la navigation.</p>
<p>Et voilà ! Simple, non ?</p>
<h2>Les évolutions à venir</h2>
<p>Bien qu&rsquo;intéressante, cette astuce n&rsquo;est pas parfaite. En effet la spécification ARIA prévoit des états pour les éléments, afin d&rsquo;expliciter les interactions.</p>
<p>Dans notre cas, il va falloir appliquer l&rsquo;attribut booléen <strong>aria-selected</strong> sur les items de navigation, en passant sa valeur de true à false selon l&rsquo;item actif.</p>
<p>Bien qu&rsquo;ayant déjà appliqué ce comportement sur des boîtes à onglets notamment, j&rsquo;aimerais parvenir à le faire sur ma navigation sans passer par du javascript. J&rsquo;ai cherché des pistes pour utiliser le walker (qui à priori devrait être capable de repérer l&rsquo;item actif) mais sans résultat pour le moment, donc <strong>n&rsquo;hésitez pas à commenter l&rsquo;article ou à me contacter par mail si vous avez la moindre piste à me suggérer</strong> (voire même la solution, hein :D).</p>
<p>De plus, un comportement (en javascript à priori) est également à prévoir pour les sous-menu, qui pourront s&rsquo;avérer plus complexes à gérer &dash; bien qu&rsquo;ARIA soit très complète sur ce sujet.</p>
