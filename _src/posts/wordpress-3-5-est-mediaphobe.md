---
title: "WordPress 3.5 est médiaphobe"
date: "2013-01-16T11:23:48"
modified: "2013-10-02T10:58:00"
permalink: "wordpress-3-5-est-mediaphobe/index.html"
description: [""]
excerpt: "Sauf que Dès ma première utilisation de cette nouvelle mouture je suis tombé sur un problème assez gênant : dans la fenêtre modale servant à insérer des médias depuis l’éditeur, l’ajout d’un fichier me retourne une erreur en indiquant « Une erreur est survenue lors du téléchargement.Veuillez réessayer plus tard. » Malgré ça, ledit fichier a été \[…\] [Lire la suite de « WordPress 3.5 est médiaphobe » →](https://www.ffoodd.fr/wordpress-3-5-est-mediaphobe/)"
format: "standard"
alternate: [""]
---
## Sauf que

Dès ma première utilisation de cette nouvelle mouture je suis tombé sur un problème assez gênant : dans la fenêtre modale servant à insérer des médias depuis l’éditeur, l’ajout d’un fichier me retourne une erreur en indiquant

> «&nbsp;Une erreur est survenue lors du téléchargement.  
> Veuillez réessayer plus tard.&nbsp;»

Malgré ça, ledit fichier a été ajouté à la bibliothèque des médias. De plus, impossible de parcourir la bibliothèque et d’insérer un fichier depuis cette même fenêtre modale ! Après une recherche rapide, il s’avère que [je ne suis pas le premier à rencontrer ce problème](http://wordpress.org/search/bug+3.5+media+insert "Wordpress 3.5 media insert bug").

Or ce bug – connu depuis la bêta – peut avoir diverses origines :

1.  Le serveur utilise _mod\_pagespeed_
2.  Un plugin interfère avec les scripts de l’administration
3.  Le thème retire la version de jQuery inclue, et en utilise une autre
4.  Une erreur a pu se glisser dans certains fichiers, à vérifier via la console js du navigateur
5.  Un mode DEBUG de WordPress «&nbsp;abusif&nbsp;»
6.  La concaténation des fichiers de l’administration trop agressive ou mal effectuée

Miam ! Vous l’aurez compris, beaucoup de ces causes potentielles tournent autour des fichiers javascript ( et la technologie Ajax utilisée dans ce cas ). Une multitude de parades ont été proposées sur le web, fonctionnant dans certains cas :

* Repasser au thème TwentyTwelve
* Désactiver les plugins un par un
* Désactiver _mod\_pagespeed_ ou un système de concaténation quelconque du js de l’administration

Ces solutions ont – dans beaucoup de cas – suffit à résoudre le bug, ou au moins à en identifier l’origine afin de le corriger. **Pas dans mon cas.**

## .htaccess

**Après diverses pérégrinations dans les tréfonds de WordPress, j’ai finalement trouvé la solution à mon cas : le .htaccess.**

Pour une raison ou pour une autre, appliquer le .htaccess que j’ai l’habitude d’appliquer en production a suffit. C’est donc un patch insignifiant, sauf que WordPress ne dispose pas – et ne crée pas – de .htaccess par lui-même. C’est une habitude que j’ai acquise pour des questions d’environnement serveur, de **performances**, de **qualité web** et de types de fichiers à servir, mais qui n’est pas connue de tout le monde.

À titre personnel, le .htaccess de base dont je me sers est un amalgame :

* du .htaccess disponible dans le [html5 Boilerplate](http://html5boilerplate.com/ "HTML5 Boilerplate")
* du .htaccess dédié à WordPress proposé par [seo-mix](http://www.seomix.fr/guide-htaccess-performances-et-temps-de-chargement/ "le .htaccess expliqué sur seo-mix")

Je suppose qu’il s’agit d’un entête http ou d’un type MIME incorrect qui nuit à la bonne compréhension du fichier par le serveur, sans toutefois en être sûr. Étant donné que j’avais jusqu’à présent l’habitude d’ajouter le .htaccess à la fin du développement, je me contenterais désormais de l’ajouter **dès le début du projet**.

**De plus, il s’agit d’une bonne pratique nécessaire à la [qualité d’un site web](https://www.ffoodd.fr/tag/qualite-web/ "Qualité web") : il est donc indispensable de disposer d’un fichier .htaccess efficace.**