---
layout: "template/post.njk"
title: "Navigation, Aria et WordPress"
date: "2013-10-09T13:31:19"
modified: "2013-11-13T12:12:38"
permalink: "navigation-aria-et-wordpress/index.html"
excerpt: "ARIA est une évolution majeure dans le monde de l’accessibilité web, mais bien que candidat à la recommandation au W3C depuis 2011 elle est relativement peu implémentée – notamment dans WordPress."
format: "standard"
tags: "posts"
---
Dans sa version basique, la navigation de WordPress n’a rien de particulier (si ce n’est la multitude de classes générées sur chaque élément 🙁 ). Or ARIA permet d’ajouter une couche sémantique non négligeable et relativement simple à mettre en place, améliorant ainsi l’accessibilité de la navigation.

## Notre objectif

L’implémentation d’ARIA sur une navigation est simple ‐ bien qu’il soit assez compliqué d’en trouver une documentation ou un exemple concret. Voici le résultat attendu sur ffoodd (je vous épargne les classes et identifiants, pour cette fois 😉 ) :

```markup
<nav id="nav" role="navigation">
  <ul role="menubar">
  <li role="menuitem" aria-labelledby="ffoodd">
  <a href="https://www.ffoodd.fr" id="ffoodd">ffoodd</a>
  </li>
  <li role="menuitem" aria-labelledby="travaux">
  <a href="https://www.ffoodd.fr/travaux/" id="travaux">Travaux</a>
  </li>
  </ul> 
</nav>
```

Vous connaissiez sans doute déjà le rôle «&nbsp;navigation&nbsp;», qui identifie la zone majeure du contenu destinée à la navigation. Les autres rôle et attributs sont explicites, et on en saisit facilement l’intérêt sur cet extrait de code. Voyons maintenant comment obtenir ce résultat avec WordPress.

## WordPress et le Walker dédié à la navigation

Ce sympathique walker se nomme **Walker\_Nav\_Menu**. Je l’avais rencontré la première fois en farfouillant dans le code de [Reverie](http://themefortress.com/reverie/ "Reverie - un starter theme pour WordPress (nouvelle fenêtre)"), sans en saisir l’intérêt à l’époque. Puis mes compétences et réflexions évoluant avec le temps, lorsque je le recroisais sur le blog de [Willy Bahuaud](https://twitter.com/willybahuaud "Willy Bahuaud sur Twitter (nouvelle fenêtre)") dans [son article présentant les walkers](http://wabeo.fr/blog/construire-walker-wordpress/ "Construire un walker WordPress (nouvelle fenêtre)"), j’en saisis rapidement l’intérêt et me mit en tête de m’en servir sur mon thème ffeeeedd.

Je vous recommande chaudement de lire l’article de Willy sur le sujet, qui est une entrée en matière extrêmement intéressante.

## Les mains dans le code

Voilà sans plus attendre le code obtenu après quelques recherche :

```php
  /* == @section Amélioration de la navigation ==================== */
  /**
 * @note : Un walker nous permet de amnipuler le html généré pour la navigation afin d’y ajouter les roles aria qui vont bien.
 * @author : Gaël Poupard
 * @see : https://twitter.com/ffoodd_fr
 * @see : http://wabeo.fr/blog/construire-walker-wordpress/
 * @author : Willy Bahuaud
 * @see : http://core.trac.wordpress.org/browser/tags/3.6.1//wp-includes/nav-menu-template.php#L0
 */
  class ffeeeedd__walker extends Walker_Nav_Menu {
  function start_el( &$output, $item, $depth = 1, $args = array(), $id = 0 ) {
  $indent = ( $depth ) ? str_repeat( "\t", $depth ) : ’’;

  $class_names = $value = ’’;

  $classes = empty( $item->classes ) ? array() : (array) $item->classes;
  $classes[] = ’menu-item-’ . $item->ID;

  $class_names = join( ’ ’, apply_filters( ’nav_menu_css_class’, array_filter( $classes ), $item, $args ) );
  $class_names = $class_names ? ’ class="’ . esc_attr( $class_names ) . ’"’ : ’’;

  $id = apply_filters( ’nav_menu_item_id’, ’menu-item-’. $item->ID, $item, $args );
  $id = $id ? ’ id="’ . esc_attr( $id ) . ’"’ : ’’;

  $output .= $indent . ’<li’ . $id . $value . $class_names .’ role="menuitem" aria-labelledby="item-’ . sanitize_html_class( apply_filters( ’the_title’, $item->title, $item->ID ) ) . ’">’;

  $atts = array();
  $atts[’title’] = ! empty( $item->attr_title ) ? $item->attr_title : ’’;
  $atts[’target’] = ! empty( $item->target ) ? $item->target : ’’;
  $atts[’rel’] = ! empty( $item->xfn ) ? $item->xfn : ’’;
  $atts[’href’] = ! empty( $item->url ) ? $item->url : ’’;

  $atts = apply_filters( ’nav_menu_link_attributes’, $atts, $item, $args );

  $attributes = ’’;
  foreach ( $atts as $attr => $value ) {
    if ( ! empty( $value ) ) {
    $value = ( ’href’ === $attr ) ? esc_url( $value ) : esc_attr( $value );
    $attributes .= ’ ’ . $attr . ’="’ . $value . ’"’;
    }
  }

  $item_output = $args->before;
  $item_output .= ’<a’. $attributes .’ id="item-’ . sanitize_html_class( apply_filters( ’the_title’, $item->title, $item->ID ) ) . ’">’;
  $item_output .= $args->link_before . apply_filters( ’the_title’, $item->title, $item->ID ) . $args->link_after;
  $item_output .= ’</a>’;
  $item_output .= $args->after;

  $output .= apply_filters( ’walker_nav_menu_start_el’, $item_output, $item, $depth, $args );
  }
  }
```

Le walker manipule chaque niveau de rendu de la navigation, ce qui nous permet d’ajouter les rôles très facilement. La seule intervention astucieuse consiste à récupérer l’intitulé de l’item afin de l’utiliser comme label pour la navigation.

Et voilà ! Simple, non ?

## Les évolutions à venir

Bien qu’intéressante, cette astuce n’est pas parfaite. En effet la spécification ARIA prévoit des états pour les éléments, afin d’expliciter les interactions.

Dans notre cas, il va falloir appliquer l’attribut booléen **aria-selected** sur les items de navigation, en passant sa valeur de true à false selon l’item actif.

Bien qu’ayant déjà appliqué ce comportement sur des boîtes à onglets notamment, j’aimerais parvenir à le faire sur ma navigation sans passer par du javascript. J’ai cherché des pistes pour utiliser le walker (qui à priori devrait être capable de repérer l’item actif) mais sans résultat pour le moment, donc **n’hésitez pas à commenter l’article ou à me contacter par mail si vous avez la moindre piste à me suggérer** (voire même la solution, hein :D).

De plus, un comportement (en javascript à priori) est également à prévoir pour les sous-menu, qui pourront s’avérer plus complexes à gérer ‐ bien qu’ARIA soit très complète sur ce sujet.