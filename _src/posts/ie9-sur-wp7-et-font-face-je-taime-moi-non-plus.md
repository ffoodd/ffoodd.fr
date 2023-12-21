---
layout: "base.njk"
title: "IE9 sur WP7 et @font-face : je t’aime, moi non plus."
date: "2013-07-24T17:16:35"
modified: "2013-11-13T12:25:49"
permalink: "ie9-sur-wp7-et-font-face-je-taime-moi-non-plus/index.html"
excerpt: "Cependant, je dois également avouer que certaines choses me surprendront toujours : c’est le cas du support de @font-face sur Windows Phone 7.&nbsp; Un jour, j’ai fait un test Raphaël Goetter a annoncé aujourd’hui la refonte de son site principal, goetter.fr, sur son blog. Étant donné que nous avions discuté quelques jours auparavant de ligatures […] [Lire la suite de «&nbsp;IE9 sur WP7 et @font-face : je t’aime, moi non plus.&nbsp;» →](https://www.ffoodd.fr/ie9-sur-wp7-et-font-face-je-taime-moi-non-plus/)"
format: "standard"
---
**Cependant, je dois également avouer que certaines choses me surprendront toujours : c’est le cas du support de `@font-face` sur Windows Phone 7.**&nbsp;

## Un jour, j’ai fait un test

Raphaël Goetter a annoncé aujourd’hui la refonte de son site principal, [goetter.fr](http://goetter.fr "Le site de Raphaël Goetter (nouvelle fenêtre)"), sur [son blog](http://blog.goetter.fr/post/56263951583/faites-un-site-web-perso "Article sur la refonte de goetter.fr (nouvelle fenêtre)"). Étant donné que nous avions discuté quelques jours auparavant de ligatures [sur Twitter](https://twitter.com/ffoodd_fr/status/357798486227435520 "Discussion au sujet des ligatures sur Twitter (nouvelle fenêtre)"), j’ai lâché un commentaire au sujet de cette nouveauté sur le site de M. Goetter. Cependant sa réponse m’a légèrement surpris, puisque je ne m’attendais pas à ce qu’il doive se séparer de cet ornement sur mobile – pour d’excellentes raisons au demeurant.

Pris de curiosité, j’ai alors décidé d’y jeter un œil sur mon smartphone : un Lumia 800 tournant sur Windows Phone 7.10, et Internet Explorer 9. Outre l’absence de la typographie _«Calendas Plus»_, j’ai constaté que la typographie générée sur [Icomoon](http://icomoon.io/ "Icomoon (nouvelle fenêtre)") pour gérer les icônes était également absente.

Je remonte ce problème ni une ni deux à l’auteur, qui est dans l’impossibilité de tester lui-même. Je décide donc de le faire, en commençant par regarder mon propre site – je ne disposais pas encore de ce téléphone lorsque cette version est apparue : sans appel, [mon logo basé sur `@font-face`](https://www.ffoodd.fr/la-schizophrenie-semantique-dun-logo/) n’apparaît pas non plus.

## Un doute m’habite

Dès lors je sens poindre l’éventualité de l’absence de support de @font-face.. Je fais donc le tour de plusieurs sites réalisés au sein de l’[agence 1-ter-net](http://www.1-ter-net.com "Création de site internet à Nantes (nouvelle fenêtre)") et utilisant `@font-face`. La encore, aucun doute possible : `@font-face` ne fonctionne sur aucun d’entre eux.

Au cas ou, j’emprunte le smartphone d’une collègue, lui aussi sur Windows Phone 7. C’est le drame.

## Google m’a répondu !

Je vous laisse le soin de parcourir les résultats les plus intéressants :

* [Font-Face isn’t working on IE9 inside of Windows Phone 7](http://blogs.msdn.com/b/thebeebs/archive/2011/12/14/font-face-isn-t-working-on-ie9-inside-of-windows-phone-7.aspx "Font-Face isn’t working on IE9 inside of Windows Phone 7 (nouvelle fenêtre)")
* [Supported fonts on IE for Windows Phone 7](http://blogs.msdn.com/b/iemobile/archive/2010/11/10/supported-fonts-on-ie-for-windows-phone-7.aspx "Supported fonts on IE for Windows Phone 7 (nouvelle fenêtre)")
* [The differences between IE9 for desktop and IE9 on WP7](http://www.ubelly.com/2011/11/the-differences-between-ie9-on-the-desktop-and-ie9-on-wp7/ "The differences between IE9 for desktop and IE9 on WP7 (nouvelle fenêtre)")

Sans équivoque : **IE9 sur WP7 supporte `@font-face` mais ne chargera pas de fichiers typographiques externes.** Ça explique également le [faux-positif de Modernizr](https://github.com/Modernizr/Modernizr/issues/538 "Faut-positif de Modernizr (nouvelle fenêtre)") concernant la détection de cette fonctionnalité.

Vous voilà prévenus : **définir un fallback est un minimum** pour se prémunir contre ce problème; cependant le cas des icon-fonts est plus ennuyeux puisqu’on s’appuie souvent sur des caractères unicodes indisponibles dans la plupart des typographies, et un remplacement d’images conditionnel semble compliqué…

Si quelqu’un connait un moyen de cibler uniquement IE9 sur Windows Phone 7, je suis preneur ! De plus, je n’ai aucun moyen de tester IE sur Windows Phone 8 pour le moment, je ne saurais donc préciser si ce problème existe toujours dans les versions les plus récentes.

**Edit :** La nuit portant conseil, l’astuce dans le cas d’une icon-font semble finalement «simple». Il s’agira de les baser sur des caractères unicodes ayant un intérêt ( par exemple, ☎ ). Cependant, cette astuce n’est possible que lorsqu’on a le choix des glyphes utilisés comme support – ce qui, je crois, est le cas dans IcoMoon – et de disposer d’un caractère unicode signifiant.