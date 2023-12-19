---
date: "2017-02-03T17:55:42"
author_name: "lionelb"
author_url: ""
author_avatar: "https://secure.gravatar.com/avatar/03edc8b4edc19d91202e69c65c5baeff?s=48&d=mm&r=g"
---
Pour le JS qui prend du temps, pourquoi ne pas utiliser un script dans le `head`, qui va juste modifier la `class` ? Ça évite d'avoir a utiliser un durée d'animation qui ne corrigera pas le problème sur les connexion lentes (j'ai testé en utilisant le _network throttling_ de Chrome : on voit le menu à partir d'une connexion 3g).  
`document.documentElement.classList.remove('no-js').add('js')`