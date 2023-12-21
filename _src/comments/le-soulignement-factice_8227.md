---
date: "2015-12-03T17:27:14"
author_name: "Marie Guillaumet"
author_url: "http://marieguillaumet.com/"
author_avatar: "https://secure.gravatar.com/avatar/6381f65810606a24c5f7086d072342f2?s=48&d=mm&r=g"
---
Hello ! J’utilise ta méthode depuis quelques semaines sur un projet perso (qui n’est pas encore en ligne). Cela fonctionne globalement bien, mais je note quelques trucs&nbsp;:

* Pour le moment, j’appelle le test JS qui détecte le mode «&nbsp;contraste élevé&nbsp;» un peu tard (le script est situé en bas du DOM), ce qui fait qu’on voit le souligné des lignes un instant avant qu’il soit remplacé par les jolis soulignés personnalisés. J’ai pas trop envie de remonter mon JS dans le head&nbsp;; aussi, aurais-tu une suggestion pour améliorer ça&nbsp;?
* Je trouve dommage que les liens concernés par ce joli souligné doivent forcément être en display: inline 🙁 Si on pouvait utiliser du inline-block, ça serait vraiment Noël&nbsp;! Mais je comprends bien la contrainte.
* Le fait que les liens concernés aient une couleur d’arrière-plan est un peu gênant quand ils s’affichent par-dessus une image d’arrière-plan, genre texture ou autre. 🙁 Cela ne peut donc fonctionner parfaitement que sur des arrières-plans unis.
* J’ai noté aussi que selon les navigateurs, le souligné peut changer en épaisseur, avec le même font-size et les mêmes paramètres. Sans doute encore quelques tests à faire de mon côté pour trouver le bon paramétrage du dégradé.

Mais bon, l’effet permis par le text-shadow sur les descendantes est vraiment appréciable. Je pense qu’on se rapproche de la vérité 🙂 Encore merci pour ce partage.