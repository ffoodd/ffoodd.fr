---
date: "2015-12-04T08:50:13"
author_name: "Gaël Poupard"
author_url: ""
author_avatar: "https://secure.gravatar.com/avatar/76dde5fd394081aa4261802372fe2e33?s=48&d=mm&r=g"
---
Coucou Marie, merci pour ce commentaire 😄

Effectivement rien nʼest parfait, sinon cet effet serait ultra-répandu&nbsp;! Jʼessaie de répondre point par point&nbsp;:

* Le test JS a besoin de vérifier la valeur calculée par le navigateur, cʼest donc intrinsèquement lent puisquʼil nous faut le DOM prêt, ajouter et styler un élément puis le supprimer. En terme de performance, ça nʼest clairement pas terrible. En revanche je nʼai jamais noté ce délai, malgré des pages parfois très lourdes et blindées de scripts… As-tu essayé avec le test injecté _via_ Modernizr&nbsp;? La seule solution que je vois —&nbsp;autre que lʼexécuter dans le `<head>`&nbsp;— serait de renverser lʼeffet&nbsp;: lʼappliquer par défaut et ne remettre `text-decoration` que si le test est positif. Le seul effet de bord que je devine serait que les soulignements pourraient apparaître avec un léger décalage en mode de contrastes élevés. Pourquoi pas&nbsp;? Mon premier contre-argument est que ça me semble aller à lʼencontre de lʼamélioration progressive, mais je suppose que ça se discute.
* Le display, je ne perds pas espoir&nbsp;! Je pense malheureusement quʼil sʼagira dʼun second _mixin_, mais je continue à jouer avec. Jʼavais bon espoir en fouillant du côté des `repeating-linear-gradient` mais cʼest beaucoup plus fin à gérer.
* En réalité la couleur dʼarrière-plan nʼest pas impérative —&nbsp;mais comme lʼombre portée a nécessairement une couleur, mettre un arrière-plan transparent serait probablement beaucoup plus moche. Selon ton arrière-plan, ça peut se tenter&nbsp;😉 On peut envisager de choisir une ombre semi-transparente, mais lʼeffet sur les descendantes sʼen ressentira forcément.
* Concernant lʼépaisseur je lʼavais noté quand je travaillais en `em`, et le passage en `rem` a grandement amélioré les choses. Et je tʼavoue ne pas y avoir accordé plus dʼimportance que ça, chercher à obtenir la même épaisseur sur tous les navigateurs me semble une perte de temps. Du moment que le rendu soit agréable à lʼœil chez tout le monde, ça me va&nbsp;😇

Voilà, assez peu de solutions concrètes jʼen ai peur mais il sʼagit bien dʼun artifice cosmétique. Je mʼen sers tel quel car je ne me heurte pas aux problèmes que tu évoques, mais je pense en effet que ces derniers peuvent être rédhibitoires.

Me demande en sus si je ne vais pas y ajouter (en prévision) le support de `text-decoration-skip`.