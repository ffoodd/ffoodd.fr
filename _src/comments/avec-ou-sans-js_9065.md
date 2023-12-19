---
date: "2017-02-06T12:00:34"
author_name: "lionelb"
author_url: ""
author_avatar: "https://secure.gravatar.com/avatar/03edc8b4edc19d91202e69c65c5baeff?s=48&d=mm&r=g"
---
Je comprend pas en quoi ça décale le problème, j’ai plutôt l’impression que ça le résous et de manière plus robuste que d’avoir recours à une durée d’animation arbitraire qui ne prend pas en compte la connexion / la puissance du _device_.  
De plus ca répond à ton postulat de départ :

> C’est là où le bât blesse. Le temps que notre JS soit exécuté, nous voyons l’élément affiché (même si ça ne dure qu’une fraction de seconde).

Le document n’a peut-être pas fini d’être parsé, le js n’a peut être même pas commencé à être téléchargé, la classe js sera déjà en place.