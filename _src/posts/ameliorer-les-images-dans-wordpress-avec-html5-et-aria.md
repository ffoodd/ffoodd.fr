---
title: "\[caption\] avec html5 et aria"
date: "2013-11-12T16:32:51"
modified: "2015-07-03T10:49:36"
permalink: "ameliorer-les-images-dans-wordpress-avec-html5-et-aria/index.html"
description: [""]
excerpt: "Le shortcode \[caption\], au demeurant très pratique, est cependant très limité : il se contente d’ajouter l’image et sa description ( un paragraphe ) dans une div. Correct pour l’affichage, mais très léger en terme de sémantique et d’accessibilité. Voyons comment améliorer ça ! [Lire la suite de « \[caption\] avec html5 et aria » →](https://www.ffoodd.fr/ameliorer-les-images-dans-wordpress-avec-html5-et-aria/)"
format: "standard"
alternate: [""]
---
Pour commencer, il faut comprendre une problématique de base en terme d’accessibilité :&nbsp;la distinction entre **les images décoratives** et **les images porteuses de sens**. Pour comprendre cette distinction et son importance, je vous recommande vivement la lecture d’[_«Accessibilité web»_](https://www.ffoodd.fr/lecture-accessibilite-web/ "Accessibilité web") par [Armony Altinier](http://www.armonyaltinier.fr/ "Le site d’Armony Altinier (nouvelle fenêtre)"). Comme souvent lorsque nous parlons d’**accessibilité web**, il s’agit de bon sens :&nbsp;une image porteuse de sens doit être restituée à tous les utilisateurs, tandis qu’une image décorative ne doit être montrée qu’aux utilisateurs disposant d’un affichage graphique complet.

## Les limites de WordPress

Tout le monde n’est pas sensible à ces questions, même s’il le faudrait :&nbsp;WordPress ne fait pas exception. Il donne cependant la possibilité à ses utilisateurs de servir des images de façon tout à fait correcte, en proposant de base pour tous les fichiers la capacité d’adjoindre un texte alternatif — ce qui remplit le critère principal des [bonnes pratiques d’OpQuast](http://checklists.opquast.com/fr/ "Les checklists OpQuast (nouvelle fenêtre)") et permet de satisfaire [la plupart des critères de niveau Bronze d’Accessiweb](http://www.accessiweb.org/index.php/accessiweb_2.2_liste_generale.html#images "La thématique image sur Accessiweb (nouvelle fenêtre)").

Pour autant WordPress ne va pas plus loin :

* Dans le cas d’une image décorative, il l’ajoute dans une balise `<img />` et conserve l’attribut `alt` vide s’il n’est pas renseigné. **C’est une bonne façon de procéder**, car l’image n’est pas vocalisée par un lecteur d’écran et n’a aucun poids sémantique.
* Dans le cas d’une image qui véhicule une information ( ce que je suppose être le cas si la légende est renseignée ), il encadre cette image d’une `<div>` et y intègre la description dans un `<p>` ( _cf :_&nbsp; [le code source du shortcode](http://core.trac.wordpress.org/browser/tags/3.7.1/src/wp-includes/media.php#L614 "Le code source du shortcode (nouvelle fenêtre)") ). **C’est problématique car il n’existe aucun lien sémantique entre l’image et sa description, et le balisage est neutre.**

Certes, c’est du fignolage. Mais c’est à priori dans les détails que l’on améliore sensiblement la qualité d’un site web.

## Les images porteuses de sens

Le cas des images véhiculant des informations demande donc quelques efforts :&nbsp;il faut intercepter le shortcode afin de le ré-interpréter **avant** qu’il ne soit renvoyé côté client. Voici ce à quoi j’ai pu aboutir :&nbsp;

```php
  /* == @section Remplace le code généré par [caption] ==================== */
  /**
 * @note : Le contenu est filtré pour remplacer le html généré pour les caption par du html5 sémantique. Astuce trouvée sur Reverie.
 * @author : Zhen Huang
 * @see : http://themefortress.com/reverie/
 * @see : https://github.com/milohuang/reverie/blob/master/lib/clean.php#LC151
 * @note : On y ajoute les microdonnées qui vont bien.
 * @author : Joost Kiens ( @joostkiens )
 * @see : https://gist.github.com/JoostKiens/4477366
 * @note : Et j'y ajoute les roles et attributs Aria nécessaires
 * @see : http://www.kloh.ch/craw2013-html5-aria-et-accessibilite-web-479
 */
  add_filter( 'img_caption_shortcode', 'ffeeeedd__caption', 10, 3 );
  function ffeeeedd__caption( $output, $attr, $content ) {
  if ( is_feed() ) {
  return $output;
  }
  $defaults = array(
  'id' => '',
  'align' => 'alignnone',
  'width' => '',
  'caption' => ''
  );
  $attr = shortcode_atts( $defaults, $attr );
  if ( 1 > (int) $attr['width'] || empty( $attr['caption'] ) ) {
  return $content;
  }
  $content = str_replace( '<img', '<img id="' . $attr['id'] . '" itemprop="contentURL" aria-describedby="wp-caption--' . $attr['id'] . '"', $content );
  $attributes = ' class="wp-caption inbl ' . esc_attr( $attr['align'] ) . '"';
  $output = '<figure' . $attributes .' role="group" itemscope itemtype="http://schema.org/ImageObject">';
  $output .= do_shortcode( $content );
  $output .= '<figcaption class="wp-caption-text pt1 small" id="wp-caption--' . $attr['id'] . '" itemprop="description">' . $attr['caption'] . '</figcaption>';
  $output .= '</figure>';
  return $output;
  }
```

## L’intervention détaillée

La structure d’origine est conservée ;&nbsp;je détaille ce qui a été fait :

* Une couche sémantique HTML5 est appliquée en lieu et place du balisage «neutre» précédent :&nbsp;`figure` et `figcaption` ;
* Une couche ARIA améliore la compréhension de ce balisage parfois défaillant dans les technologies d’assistance, comme me l’a appris [le compte-rendu d’un atelier](http://www.kloh.ch/craw2013-html5-aria-et-accessibilite-web-479 "Compte-rendu de l'atelier de J.P. Villain par Luc (nouvelle fenêtre)") de [Jean-Pierre Vilain](https://twitter.com/villainjp "Profil Twitter de Jean-Pierre Villain (nouvelle fenêtre)") à la [CRAW2013](http://www.telono.com/fr/agence/conference-romande-accessibilite-web-2013/ "Conférence Romande sur l’Accessibilité Web 2013 (nouvelle fenêtre)") rédigé par [Luc](https://twitter.com/klohFR "Profil Twitter de Luc Poupard (nouvelle fenêtre)"). Dans notre cas, le `role="group"`[\[1\]](https://www.ffoodd.fr/ameliorer-les-images-dans-wordpress-avec-html5-et-aria/#note-1 "En savoir plus sur le rôle «group» :&nbsp;https://developer.mozilla.org/en-US/docs/Accessibility/ARIA/ARIA_Techniques/Using_the_group_role") est appliqué au conteneur `<figure>`, puis les balises `<img />` et `<figcaption>` sont associées grâce à l’attribut `aria-describedby`[\[2\]](https://www.ffoodd.fr/ameliorer-les-images-dans-wordpress-avec-html5-et-aria/#note-2 "Vous pourrez en apprendre plus sur cet attribut ici :&nbsp;https://developer.mozilla.org/en-US/docs/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute") ;
* Et finalement une dernière couche est ajoutée :&nbsp;les micro-données[\[3\]](https://www.ffoodd.fr/ameliorer-les-images-dans-wordpress-avec-html5-et-aria/#note-3 "Découvrir les micro-données pour enrichir les objets images :&nbsp;http://schema.org/ImageObject"), destinées au SEO.

Ce code n’est probablement pas parfait, car je ne l’ai pas testé avec un lecteur d’écran :&nbsp;il va falloir que je le fasse. Mais je pense que c’est un premier pas en avant vers une meilleure qualité des sites WordPress que je produis.

**Les commentaires, conseils et indications supplémentaires seront grandement appréciés** :) .

## Mises à jour

Suite à un bref échange avec [Johan Ramon](https://twitter.com/johan_ramon "Johan Ramon sur Twitter (nouvelle fenêtre)"), je dois préciser un point important :&nbsp;l’alternative textuelle de l’image doit également mentionner la légende attenante, pour les technologies d’assistance qui ne prendraient pas en compte l’attribut `aria-describedby`. Voici les ressources utiles 

* [Discussion sur le critère 1.10 d’AccessiWeb 2.2](http://www.accessiweb.org/forumhtml5/viewtopic.php?id=39#p810 "Discussion sur le forum d’AccessiWeb (nouvelle fenêtre)")
* [Support des attributs ARIA par les lecteurs d’écran](http://blog.atalan.fr/support-des-attributs-aria-par-les-lecteurs-decran/ "Article sur le blog de la société Atalan (nouvelle fenêtre)")

Comme souvent, cette dernière contrainte repose entièrement sur le contributeur qui doit être **informé** et **éduqué** à cette responsabilité.