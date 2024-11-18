---
layout: "template/post.njk"
title: "Le web en kit"
date: "2015-10-30T10:11:52"
modified: "2015-11-04T11:21:28"
permalink: "le-web-en-kit/index.html"
excerpt: "Le web, cʼest compliqué. Je dirais même plus&nbsp;: cʼest la jungle. De multiples sources, de multiples protocoles dʼéchange de données, de multiple manière dʼaccéder aux contenus. Et aussi plein de gens qui fabriquent des morceaux de web. Ceux-là sont un minimum flemmards —&nbsp;je le sais bien, jʼen fais partie. Alors régulièrement, nous cédons à la facilité et cela produit des perturbations dans La Force. Un exemple&nbsp;? Les sites `-webkit-` _only_. Parlons-en&nbsp;!"
tags: ["posts"]
description: "<abbr lang=\"en\" title=\"Too Long, Didn't Read\">tl;dr</abbr>&nbsp;: jetez un œil <a href=\"http://dabblet.com/gist/08fddf3666c39ebc62ca\">à ce dabblet</a> sur Edge —&nbsp;qui gère <code>-webkit-background-clip: text;</code> sans broncher."
---
Beaucoup de gens qui fabriquent le web se sont plaints de lʼhégémonie dʼIE6.

Pour protester, ils se sont rués sur les nouveaux arrivants&nbsp;: Firefox et Chrome. Puis les produits Apple ont débarqué, apportant avec eux Safari. Cʼétait encore une révolution —&nbsp;et de fait, le nouvel endroit ou aller. Or Safari fonctionne sur la même base que Chrome, à savoir le moteur de rendu Webkit. Et petit à petit, nous nous sommes retrouvés **avec un nouveau monopole**.

Malheureusement, on ne casse pas un monopole avec un monopole. Car tous ces gens qui se sont rués sur les navigateurs WebKit ont produit des morceaux de web qui ne sont pas inter-opérables&nbsp;: on ne pouvait sʼen servir (voire simplement y accéder) autrement **quʼavec un sésame estampillé WebKit**.

## Microsoft et Edge

De façon parfaitement sensée, Microsoft —&nbsp;qui détenait environ 95% des parts de marché des navigateurs web (ce qui lui est reproché)&nbsp;— a voulu faire table rase du passé pour en finir avec la mauvaise réputation de son navigateur vedette.[^1]

[^1]: Jʼaime rappeler aux gens qui pestent après IE quʼil est ma foi fort probable quʼils fissent partie des 95% dʼinternautes qui naviguaient avec. Ça pique.



[**Alors ils font passer Edge pour WebKit.**](https://blogs.windows.com/msedgedev/2015/06/17/building-a-more-interoperable-web-with-microsoft-edge/)

## Le _\-webkit-only_

### Les préfixes vendeurs

Vous commencez à flairer lʼarnaque, pas vrai&nbsp;? Edge interprète désormais les CSS préfixées par `-webkit-`. Bon allez, si ça nʼest que ça cʼest de bonne guerre&nbsp;!

Sauf que… **Non**. Ça ne sʼarrête pas à ça.

### Les propriétés hors spécification

Pendant très longtemps, Chrome et Safari ont implémenté des nouveautés avant de les proposer aux concepteurs des spécifications —&nbsp;notamment des propriétés et valeurs CSS. Ça permet de mettre un peu de pression sur le processus de spécification et de tenir en haleine les développeurs.

Parmi ces nouveautés, la valeur `text` pour la propriété `background-clip`.

Cette propriété fait partie intégrante de [la spécification (en anglais](https://drafts.csswg.org/css-backgrounds-3/#the-background-clip)) depuis longtemps. La valeur `text` a été [proposée en 2008 par WebKit (en anglais)](https://www.webkit.org/blog/164/background-clip-text/), et nʼétait —&nbsp;jusquʼà preuve du contraire&nbsp;— supportée que par les navigateurs basés sur WebKit.

## Edge gère&nbsp;!

Edge lʼinterprète, cette valeur exotique —&nbsp;et sans souci. Jʼai découvert ça inopinément, en me disant que [la solution de repli proposée par Divya Manian (en anglais)](https://nimbupani.com/using-background-clip-for-text-with-css-fallback.html) était robuste. En terme de logique, elle est imparable&nbsp;: lʼarrière-plan est conçu pour ne sʼappliquer que si le clip est interprété, car lʼensemble est préfixé par `-webkit-`. Voyez plutôt&nbsp;:

```css

[class="rainbow"] {
  color: #fff;
  display: inline-block;
  /* -webkit-only: Chrome, Safari, Opera */  
  background: -webkit-linear-gradient(…);
  background: -o-linear-gradient(…);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
```

Mais Edge considère désormais les préfixes `-webkit-` comme des _aliases_, et les mange tout crus. Ça aurait pu être un problème dans ce cas précis, puisque théoriquement la paire `background-clip: text;` nʼest reconnue que par les navigateurs basés sur WebKit. Là encore&nbsp;: **surprise**&nbsp;! Edge lʼapplique sans rechigner.

### Cas isolé&nbsp;?

De nombreuses techniques ont vu le jour et nʼont vécu que pour WebKit. Je mʼinterroge donc&nbsp;: parmi ces techniques que nous pensons réservées à WebKit, **combien dʼautres encore ont atterri dans Edge discrètement&nbsp;?**

## Et Windows Phone, on en parle&nbsp;😄&nbsp;?

Et bien… En quelque sorte&nbsp;! Pour clarifier, précisons que jʼutilise Windows Phone 8.1, qui embarque IE11. Dʼaprès mes lectures sur le blog technique de Edge, ce mécanisme dʼinterprétation des préfixes vendeurs `-webkit-` nʼest inclus que dans Edge —&nbsp;en tout cas, il nʼy est fait aucune mention du cousin IE11.

Figurez-vous que **cʼest pourtant le cas** (je suis sûr que vous nʼavez rien vu venir, avec mes gros sabots&nbsp;😇). Enfin… **Presque**.

### Le cas qui pique

[Une fois nʼest pas coutume](https://www.ffoodd.fr/ie9-sur-wp7-et-font-face-je-taime-moi-non-plus/), Windows Phone et son IE représentent une configuration particulière. En lʼoccurrence, IE11 interprète les valeurs `-webkit-linear-gradient(…)` mais est incapable dʼappliquer la valeur `text` pour la proriété `background-clip`. Oups&nbsp;🙈&nbsp;!

## Captures à lʼappui

Dans un monde merveilleux et homogène, nous «&nbsp;devrions&nbsp;» voir ceci&nbsp;:

![Capture dʼécran de Chrome](/images/2015/10/chrome.png "Un arc-en-ciel incrusté au texte en CSS, visible sur les navigateurs WebKit et Edge" =300x31)

Et, le cas échéant si votre navigateur est allergique aux arc-en-ciels, voici le résultat attendu&nbsp;:

![Capture dʼécran sur Firefox](/images/2015/10/firefox.png "Le texte est simplement blanc sur Firefox et IE, pas dʼarc-en-ciel à lʼhorizon" =300x30)

Jusque là, tout va bien. La mécanique est belle, aucun danger grâce à la solution de repli évoquée précédemment. Maintenant, cassons tout&nbsp;! Voici le rendu sur IE11 **et _UC Browser_** sur Windows Phone 8.1&nbsp;:

![capture dʼécran sur Windows Phone 8.1](/images/2015/10/windowsphone.jpg "Le texte est blanc, mais lʼarrière-plan arc-en-ciel est appliqué" =300x169)

Difficile de garantir quoi que ce soit dans ces conditions. _A priori_ ce problème nʼexiste pas dans les versions antérieures de Windows Phone, et il faut noter que la version bureau dʼIE11 nʼapplique pas lʼarrière-plan&nbsp;!

Si vous voulez tester par vous-mêmes ou compléter mes propos, nʼhésitez pas à dupliquer [mon dabblet](https://dabblet.com/gist/08fddf3666c39ebc62ca).

Et pour ceux qui rigolent dans le fond, sachez que [Windows Phone représente 4% de parts de marché des systèmes dʼexploitation sur mobile en France, entre juillet et septembre 2015 (en anglais)](https://gs.statcounter.com/#mobile_os-FR-monthly-201507-201509-bar). Ce nʼest pas négligeable, si tant est quʼon admette négliger une population.[^2]

[^2]: Je mettrais dʼailleurs ma main a couper quʼen réalité ce chiffre est déjà sous-estimé, à en croire mes yeux de lynx qui officient dans le tramway, le bus ou le TER à Nantes

