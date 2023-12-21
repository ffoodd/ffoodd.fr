---
date: "2015-12-03T13:36:24"
author_name: "Pascal"
author_url: ""
author_avatar: "https://secure.gravatar.com/avatar/b43b95b000a1aac0c9718a339caf2b41?s=48&d=mm&r=g"
---
Hello,

Quelques remarques :

1.  pour le svg, des `<rect>` devrait alléger
2.  Je vois 2 problèmes à l’utilisation d’une image :
  * les différents contenus n’apparaissent pas forcément au même moment : à quel moment disparaît l’image pour laisser place au vrai contenu ? Cela peut «&nbsp;casser&nbsp;» momentanément la structure…
  * sur du responsive : refaire chaque interface × n breakpoints ? Faire un svg responsive ? Ça peut faire vite beaucoup de boulot non ?
  * Peut-être jouer avec :empty en css pour donner des largeurs et hauteurs aux composants avant que leur contenu soit disponible ?