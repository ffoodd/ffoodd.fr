---
date: "2013-10-17T11:04:33"
author_name: "Gaël Poupard"
author_url: ""
author_avatar: "https://secure.gravatar.com/avatar/76dde5fd394081aa4261802372fe2e33?s=48&d=mm&r=g"
---
Tu vas rire, mais «&nbsp;ça dépend&nbsp;» : en supposant qu’on parle du contexte dans lequel la destination de ce lien est similaire à celle d’un autre lien à proximité, c’est sur le lien que tu vas devoir mettre aria-hidden (et par héritage il s’appliquera aux contenus du lien). L’idée est que ce sont uniquement les liens similaires que l’on dérobe aux technologies d’assistance, afin de faciliter la navigation.

Attention toutefois, cette logique s’applique différemment dans d’autres contextes : s’il ne s’agit pas d’un lien similaire, une image dans un lien devrait avoir du sens ou disposer d’une alternative textuelle. Si l’image est dispensable, elle peut être ajoutée en CSS (via background) ou encore disposer du rôle «&nbsp;presentation&nbsp;» afin de préciser qu’elle n’a pas d’importance sémantique (et par conséquent, elle a une alternative viable et pertinenente au sein du lien !)..

Je t’invite à lire le livre d’Armony Altinier dont j’ai fait un compte-rendu récemment, car la thématique des images y est très claire. Tu disposes de deux types d’images : celles qui sont porteuses de sens, et doivent donc être rendues à tous les utilisateurs d’une manière ou d’une autre (l’alternative textuelle sera vocalisée par un lecteur d’écran par exemple); et celles qui sont décoratives, et ne doivent donc pas porter de sens (alternative vide ou rendue visuellement en CSS).

Est-ce que ça répond à ta question 😀 ?