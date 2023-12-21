---
layout: "base.njk"
title: "Le bien & le mal pour l’intégrateur web"
date: "2012-11-13T14:40:08"
modified: "2013-10-02T10:59:02"
permalink: "le-bien-le-mal-pour-lintegrateur-web/index.html"
excerpt: "Il y a de bonnes & de mauvaises solutions Une bonne idée le jour J peut être une mauvaise idée le D day. Au commencement de ffoodd, je voulais un fond simple mais avec un peu d’impact : j’ai donc choisi le motif très simple mais contrasté que vous avez sous les yeux. À l’époque, […] [Lire la suite de «&nbsp;Le bien & le mal pour l’intégrateur web&nbsp;» →](https://www.ffoodd.fr/le-bien-le-mal-pour-lintegrateur-web/)"
format: "standard"
---
## Il y a de bonnes & de mauvaises solutions

Une bonne idée le _jour J_ peut être une mauvaise idée le _D day_. Au commencement de ffoodd, je voulais un fond simple mais avec un peu d’impact : j’ai donc choisi le motif très simple mais contrasté que vous avez sous les yeux. À l’époque, je rêvais de tester les dégradés radiaux en css – et j’étais persuadé de pouvoir réaliser mon motif à l’aide de cette technique. Ni une, ni deux : je le fais. Je tartine les préfixes navigateurs et la syntaxe non préfixée, et nous voilà partis. **À bien y réfléchir, c’était ma première erreur.**

Comme je suis méticuleux, je vérifie tout ça sur nos navigateurs adorés – et ô joie ! – Firefox freeze en voyant ça. Je me contente alors de retirer la ligne préfixée concernée, et tant pis pour lui : il aura un aplat. **À bien y réfléchir, c’était le premier avertissement.**

## Pardonnez-moi mon père car j’ai péché

Firefox 16 est apparu, apportant des nouveautés dont : le support des dégradés sans préfixe. Firefox a donc compris ma déclaration background-image, et ô miracle ! **Il freeze toujours, une vraie salade.**

Je reprends alors mon code, et me demande : **pourquoi diantre avoir utilisé un dégradé pour faire ça ?**

* Mauvais support navigateur
* Problème de performance évident
* Syntaxe compliquée et instable ( à l’époque )

En tant qu’intégrateur voulant atteindre un objectif, je n’ai pas fait le meilleur choix. J’ai donc repris le travail. J’ai supprimé ce dégradé, créé le motif en **png-8** à **2 couleurs** ( 64 octets ! ) et vu le poids, je l’ai même encodé en **base64**. Et voilà !

## La morale

Désormais ce fond est :

1.  Compatible tous navigateurs jusqu’à IE8
2.  Trois fois plus légers
3.  Beaucoup plus performant

Ça n’est certes pas grand chose, mais cette erreur de parcours témoigne de mon évolution dans ce métier. C’était une mauvaise idée d’appliquer ce motif en css pur, mais 18 mois plus tard, quand j’ai vu ce bout de code, j’ai su trouver **la meilleure solution**.

Je continue [mon amélioration perpétuelle](https://www.ffoodd.fr/css-experienceinherit/ "css { &nbsp; &nbsp;expérience:inherit; }").