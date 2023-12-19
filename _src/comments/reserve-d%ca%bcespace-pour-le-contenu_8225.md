---
date: "2015-12-03T14:45:05"
author_name: "Gaël Poupard"
author_url: ""
author_avatar: "https://secure.gravatar.com/avatar/76dde5fd394081aa4261802372fe2e33?s=48&d=mm&r=g"
---
Merci Pascal, je vais tenter de comparer avec des rectangles 🙂

Pour tes remarques :

*   lʼeffet dʼapparition est tout simplement absent (dans mon cas) car en réalité le contenu apparaît à la place de lʼimage. Si les masses colorées respectent bien le design du contenu, ça nʼest même pas brusque. On peut cependant envisager toute sorte dʼapparition, par exemple dans une liste on peut considérer que lʼimage dʼattente est le premier item de la liste, et une fois quʼil nʼest plus le seul enfant de la liste, le faire disparaitre de façon plus élégante. Mais pour moi lʼabsence de transition est importante, et on ne sʼembête que rarement à faire disparaitre élégamment un gif de chargement…
*   pour le responsive, tout dépend de comment ton contenu évolue en _responsive_. Lʼimage dʼattente doit respecter cette évolution, donc ça peut effectivement devenir pénible (mais là encore je pense que ça vaudra le coup, quitte à devoir gérer 3 ou 4 SVG et autant de _media queries_ pour les afficher). Mon cas réel nʼest pas très éloigné de la démonstration, avec un bloc très simple qui nʼévolue pas en responsive. Je vais peut-être faire évoluer cette démonstration pour obtenir un POC plus complet.

`:empty` peut effectivement être une piste intéressante, si les éléments sont déjà présents dans le DOM ça peut fonctionner. Dans mon cas le contenu est chargé après le DOM donc je ne pourrais pas tenter ça. Mais là encore ça aura une place certaine dans un POC complet 🙂