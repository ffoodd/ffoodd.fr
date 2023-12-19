---
date: "2017-02-06T12:34:08"
author_name: "Gaël Poupard"
author_url: ""
author_avatar: "https://secure.gravatar.com/avatar/76dde5fd394081aa4261802372fe2e33?s=48&d=mm&r=g"
---
Et pourtant il y a vraisemblablement des conditions dans lesquelles ce délai extrêmement rapide ne suffit pas : c'est la solution que j'utilise depuis des lustres — à l'époque où l'on passait encore par une expression régulière sur `.className` — et ce problème existait…

Par ailleurs pour jouer avec `.classList`, il semble que chaîner `.add()` et `.remove()` ne fonctionne pas : il faut les séparer.

Quant à l'astuce de l'animation, elle reste pertinente dans la mesure où la distinction reste de toute façon plus évidente en partant de l'état masqué. Elle a également le mérite de dispenser un peu d'animation (et donc une potentielle scénarisation et mise en scène) du site quand JS est désactivé. 🙂