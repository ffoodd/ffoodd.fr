---
title: "À qui parlent vos CSS&nbsp;?"
date: "2016-03-30T10:07:39"
modified: "2019-06-20T14:31:24"
permalink: "a-qui-parlent-vos-css/index.html"
excerpt: "Les CSS atomiques, _scalable_, tendent à sʼimposer en tant que concept. Leur usage est encore un brin complexe, mais leurs avantages sont nombreux. Pourtant, je ne parviens pas à avoir envie dʼessayer. Alors jʼétale mes réflexions ici. [Lire la suite de «&nbsp;À qui parlent vos CSS&nbsp;?&nbsp;» →](https://www.ffoodd.fr/a-qui-parlent-vos-css/)"
format: "standard"
---
Le dernier article rédigé par [Adam Morse](http://mrmrs.cc/) est amplement diffusé ces derniers jours, vous lʼaurez certainement déjà lu&nbsp;: «&nbsp;[_CSS and Scalability_](http://mrmrs.io/writing/2016/03/24/scalable-css/)&nbsp;» —&nbsp;vous pouvez en lire [une traduction en Français](http://blog.perrien.fr/css-et-evolutivite/) sur le blog de Marc Perrien. Il y prône une méthode de rédaction des CSS dite «&nbsp;atomiques&nbsp;», issue du formidable travail de [Thierry Koblentz](http://cssmojo.com/) de Yahoo sur le projet [Atomic CSS](http://acss.io/).[^1]

[^1]: Filez lire en détail le site en question, il se montre réellement instructif.



## Les CSS atomiques&nbsp;⚛

La métaphore est la même que celle utilisée par [Brad Frost](http://bradfrost.com/) dans [son livre (en cours de rédaction) sur le design atomique](http://atomicdesign.bradfrost.com/). Cependant là où Brad Frost file la métaphore jusquʼà la matière, les CSS atomiques se contentent des atomes et vous laissent vous débrouiller avec le reste.

Pour résumer, **une classe atomique ne dispose que dʼune seule propriété, avec une seule valeur**. Voici un exemple —&nbsp;tiré directement de [la foire aux questions dʼAtomic CSS](http://acss.io/frequently-asked-questions.html#how-is-atomic-css-different-than-using-inline-styles-)&nbsp;— qui devrait être plus clair&nbsp;:

```css
.Fz(large) {
  font-size: 18px;
}
```

Vous démultipliez ce principe pour tous vos styles redondants, et vous obtenez des CSS atomiques. Il sʼagit dʼune optimisation massive des CSS en terme de poids, de spécificité, de portabilité. Les chiffres avancés par Thierry Koblentz sont ahurissants, et les explications données par ses présentations et la foire aux questions sont **très convaincantes**.

Cʼest lʼapproche également défendue par Adam Morse dans son article. Il pousse la réflexion encore plus loin en précisant que si cette conception est menée correctement, alors écrire du CSS devrait être lʼexception et non la règle.

> Writing new css should be the exception, not the rule.

Je trouve ça bien. Et vous&nbsp;? Cette méthode est indubitablement la meilleure **à lʼheure actuelle** pour qui cherche à réduire ses CSS, ainsi que leur coût de production.[^2]

[^2]: Entre autres avantages évidemment, le sujet est bien plus complexe quʼil nʼy paraît



Toutefois je pense que cette technique est à réserver exclusivement aux sites monstrueux, massifs, des balourds. Pour un intégrateur commun, qui travaille sur des sites plus ou moins simples, **je suis persuadé que le jeu nʼen vaut pas la chandelle.** À mon avis, le site dʼAtomic CSS et lʼarticle dʼAdam Morse devraient le préciser&nbsp;: plus le site est petit, plus cette méthode coûte cher. Et je ne parle pas que sur le plan technique.

## Interrogeons la destination des CSS

### À qui sʼadressent les CSS atomiques&nbsp;?

Conceptuellement, cette approche déplace un certain nombre de chose. Pour commencer, elle induit quʼun intervenant ne touche plus les CSS directement.[^3]

[^3]: Je me demande bien comment on gère une refonte graphique dans ce cas : on reprend tout à zéro, ou on repasse sur tout le HTML ?



Cependant afin que la magie opère, la plupart des sélecteurs comprenant des caractères spéciaux vont être échappés. **Cʼest (très) difficile à lire pour un humain.** Pourtant jʼai déjà eu lʼoccasion de lire des CSS écrits de la sorte —&nbsp;notamment dans [debugCSS](https://github.com/yahoo/debugCSS/blob/master/debugCSS.css#L194).[^4]

[^4]: Cʼest une des sources dʼa11y.css, pour ceux qui suivent :p



Je pense que ce procédé est **une technique dʼobfuscation des CSS**. Ces CSS ne sont pas fait pour être lus par un œil humain. Ils sont lʼexpression du système technique qui sous-tend une intégration graphique. Ils sont optimisés pour la machine.

### Et lʼhumain, dans tout ça&nbsp;?

Vous lʼaurez compris, cet aspect me dérange un peu. **Jʼaime rédiger mes CSS en imaginant que quelquʼun les lira**, que ce soit par curiosité —&nbsp;comme le fait Adam Morse.[^5]

[^5]: Pour les feignasses, dans son article militant pour les CSS atomiques Adam Morse sʼappuie sur une habitude quʼil a prise : lire les CSS de certains sites, de bout en bout, pour apprendre des choses. Jʼaime beaucoup cette idée, je lʼai fait parfois. Cependant cela lui a inspiré dʼécrire moins de CSS :/



Il nʼy aura pas de problème particulier à reprendre un projet intégré à lʼaide de CSS atomiques, en revanche je subodore que ça semblera bien terne et froid. Aucun parti-pris, aucune manière personnelle de travailler, probablement **aucun commentaire rigolo dans les sources**.[^6]

[^6]: Probablement très peu de commentaires tout court dʼailleurs, lʼoutil de Yahoo intitulé Atomizer générant les fichiers CSS en fonction de ce quʼil croise dans le HTML… Le CSS nʼest même jamais ouvert.



Bref, aucune identité.

## Dʼoù viennent mes CSS&nbsp;?

Jʼai une opinion, peut-être très mauvaise, sur lʼobjet des CSS&nbsp;: à mon avis, ils équivalent à une charte graphique. On y précise ce qui peut ou ne peut pas être fait, ce qui doit ou ne doit pas être fait.

Et quand je parle de ce qui peut / doit être fait, **je parle du HTML**. Je fais un peu mon _coming-out_, mais oui, mon CSS sert de garde-fous pour le HTML. À dire vrai, un autre article à été largement diffusé il y a quelque temps déjà, à contre-courant de ce système nucléaire. Vous pourrez lire sur le blog dʼEbay [comment leur framework CSS les aide à renforcer lʼaccessibilité](http://www.ebaytechblog.com/2015/11/04/how-our-css-framework-helps-enforce-accessibility/).[^7]

[^7]: Je suis ravi de retrouver parmi les commentaires un article dʼHeydon Pickering sur Smashing Magazine à propos des sélecteurs intelligents. Et également surpris dʼy découvrir que Daniel Eden a poussé sur les CSS de DropBox une fonctionnalité qui ressemble beaucoup à celle dʼa11y.css, via un mixin simple. Je vais lire tout ça en détail !



Et cʼest chouette, je suis content de travailler de la sorte.Je ne suis jamais seul à intervenir, ni sur le HTML ni sur le CSS, et suis pourtant le seul intégrateur de métier dans mon équipe actuelle (comme dans la précédente lors de mon arrivée). Et ce genre de sélecteur qui se rapporte à un composant graphique est nettement plus **compréhensible** par des profils non experts, voire même carrément **attractif**. Et pour cause, en ne nécessitant pas dʼajouter des dizaines de classes précises pour former un composant mais une seule sur le conteneur, les développeurs sont heureux. Ils écrivent le bon HTML —&nbsp;chopé sur un guide de style, par exemple&nbsp;— et hop, ça marche.

Nʼest-ce pas merveilleux&nbsp;?

Ce qui lʼest encore plus, cʼest que si jamais le HTML ne correspond pas (disons, par exemple, quʼil manque lʼattribut `alt` sur une image) et bien les styles ne sʼappliquent pas. Que fait alors la personne qui se trompe, pour peu que vous lʼayez prévenue que ceci pourrait arriver&nbsp;? Elle va lire vos CSS pour comprendre ce quʼil manque.

Par ailleurs je trouve beaucoup plus naturel dʼécrire les styles de cette façon&nbsp;: on décrit quelque chose, après tout CSS est un langage descriptif. De plus **nous pouvons parler facilement de ce sur quoi nous travaillons**, et pouvons même nous référer à un élément commun dans un guide de style ou une documentation quelconque.

Nos CSS ne sont pas censées gonfler lorsquʼon a défini une architecture en amont. On a une somme peu ou prou figée pour nos besoins précis. En cas de refonte graphique la structure ne bouge pas, puisquʼelle est **solidaire** du contenu.

Je n’ai pas une vision mécanique de mes CSS, j’en ai une vision humaine&nbsp;: quelquʼun dʼautre (une personne) va les lire, chercher à les comprendre, les utiliser, les modifier peut-être. **Je communique avec cette personne**, je documente, je commente, jʼinduis des erreurs pour obliger à lire, comprendre et respecter certaines bonnes pratiques.

## Je fais erreur, et après&nbsp;?

Je sais, oui. Peu importe lʼapproche sur mes propos, **il existe des façons de travailler qui ne me font pas écrire mes CSS de manière démodée**. On peut utiliser des outils pour vérifier que le HTML est correct.[^9]

[^9]: Par exemple a11y.css vérifie la présence de lʼalternative sur une image, ce qui permet de se passer dʼun sélecteur contraignant. De nombreux autres outils de bien meilleure qualité le font également.



Donc encore une fois, **je sais que mes propos ne feront pas le poids** comparés aux gains multiples en terme de performance, de vitesse, de maintenabilité, dʼautomatisation. Mais soyons honnêtes, le gain de poids pour un site _lambda_ nʼest pas si énorme[\[10\]](https://www.ffoodd.fr/a-qui-parlent-vos-css/#note-10 "Les chiffres avancés par Thierry Koblentz sont issus de sites très, très gros, pour lesquels les gains sont forcément énormes. Un site vitrine pour la boulangerie du coin aura assez peu à y gagner par rapport à une feuille de styles légère et précise, je pense."). Certes, il reste dommageable pour un utilisateur de télécharger un octet supplémentaire, donc je suis dʼaccord&nbsp;: les CSS atomiques sont une idée absolument géniale, **un gain véritable et très intelligent tant pour lʼutilisateur que pour le matériel**.

Je trouve tout de même un intérêt bien supérieur dans mes échanges avec mes collègues ou camarades de métier. Jʼaime répondre aux questions. Jʼespère quʼun nouvel arrivant parcourant mes styles éprouvera du confort et aura envie dʼécrire de cette façon, tout comme un curieux qui lirait mes sources.

Après tout, «&nbsp;_Code is poetry_&nbsp;».