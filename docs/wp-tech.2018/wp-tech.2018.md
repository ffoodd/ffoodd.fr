#Un plan de tests automatisés pour votre *front-end*

##Pourquoi tester ?

**Pour améliorer la qualité**. C’est tout. :)

Tester vos productions (et, bien entendu, corriger les éléments remontés) permet d’**optimiser considérablement l’expérience utilisateur** sur vos sites.
Par conséquent, l’image dégagée par le site — et l’entreprise — en est améliorée. C’est un peu ça, notre boulot. Non ?

Et ça vous permet également de progresser, de **gagner en expertise** dans les domaines que vous surveillez.

Bref, c’est bien. **Testez**, et entrez dans le cycle de **l’amélioration continue**.


##Définitions et concepts

###Test automatisé

Celui-ci n’est pas trop compliqué, mais une nuance doit être précisée : un test automatisé peut être lancé manuellement. Son exécution technique et son produit sont automatisés,
mais son lancement peut demeurer manuel sans être une incongruité.
Note : les *bookmarklets* et extensions navigateurs demeurent du test manuel, puisque plusieurs actions manuelles sont requises en amont du lancement manuel (ouvrir le navigateur, se rendre sur la page qu’on veut tester, etc.).


###*Front-end*

Je n’inclus dans le « *front-end* » que ce qui est finalement servi aux internautes : généralement, un document HTML, disponible via une URL ou un chemin local.
Oui, c’est un appeau à trolls.


###Plan de test

C’est la stratégie adoptée pour déterminer quels sont les tests à effectuer, la qualité ciblée, les intervenants, les outils, le cycle de vie, les livrables, le référentiel, etc.
Tout ceci est intrinsèquement lié aux objectifs du projet et à ses priorités.

Un plan de test efficace ne s’éparpille pas et se focalise sur ses objectifs. Ça peut être :

   * déceler un maximum d’anomalies ;
   * maintenir un niveau d’exigence ;
   * mettre en valeur la qualité du projet ou les processus engageant (communication client, prospect…) ;
   * être réactif sur la prise en compte des problèmes…###

###Budget

La notion de budget est primordiale afin de cibler un périmètre précis à tester, et ne pas devenir un nazi de la qualité. En oubliant de définir un budget raisonnable, 
vous pourriez vite vous retrouver à passer tout votre temps à tenter d’atteindre 100% sur je-ne-sais-pas-top-quel-outil-de-mesure. Et ça, même si le résultat est grandiose,
c’est du gaspillage.

La notion de budget est intimement liée aux indicateurs que vous choisissez de surveiller. Là non plus, on ne choisit pas au hasard !

###Tabous

On ne parlera pas de :
   * tests unitaires ;
   * tests fonctionnels ;
   * *Test Driven Development* ;
   * *linters* ;
   * rédaction des tests : c’est un métier, quand même…
Parce que je n’ai que 40 minutes devant moi !

##Les bons plans

Deux axes principaux permettent de formaliser un bon plan :

 1. **les résultats doivent être intelligibles** : pour les exploiter facilement, mais aussi pour faciliter la communication autour des tests et faciliter leur appropriation par le client / la hiérarchie / les collègues / les juniors ;
     * PS : un test qui ne révèle jamais d’erreur ne sert à rien !
 2. **un (ou plusieurs) référent(s) doivent être désignés** : que ce soit par domaine, pour la qualité générale, ou même un simple rappel récurrent « et les tests, on en est où ? ».
Sans tout ça, vous brassez du vent , et même avec ça, la pérennité de vos tests est loin d’être garantie…

Ok pour la théorie ! On poursuit ?

##Le cambouis

On a pas toute la journée, alors feu !
Les questions quand, comment, pourquoi, où étant riches en gras (et surtout, relatives à vos priorités et projets) j’aborde la chose avec le **quoi**.

Dans chaque domaine, je vous proposerai mon outil fétiche et un ou deux concurrents, et un portrait rapide de comment nous en servir.

Avant tout, quelques précisions. selon les outils, on peut :

   * tester dans le navigateur (via extensions ou *bookmarklets*), en local dans l’IDE ou avec un navigateur décapité, dans les tâches automatisées de construction du code, dans une machine virtuelle ou un conteneur, etc. 
   * tester dès la modification du code, à chaque commit, à chaque fusion de fonctionnalité, à chaque déploiement, perpétuellement en production…
   * générer des flux de données en JSON, des rapports PDF prêt-à-mailer, des fichiers *markdown* versionnés, créer des tickets à la volée (bonjour le spam), lever une alerte ou bloquer un déploiement en cas d’erreur critique, etc.
   * choisir un outil par domaine — ou plusieurs — et croiser les résultats ou changer leur barème, utiliser un outil clé-en-main en SaaS, ou encore écrire (et maintenir) nous-mêmes les tests…
Tout est possible, ces choix dépendent de vous, de votre équipe, de votre projet, etc. L'important dans les plans de tests, c’est de les exécuter et de trouver des choses !


###Qualité de code

    **Validator W3C**

   1. version NU : \url{https://validator.w3.org/nu/}
   2. via Node : \url{https://github.com/zrrrzzt/html-validator}
   3. Apprendre le HTML :trollface:
Et la validation CSS : \url{https://www.npmjs.com/package/w3c-css}
    
  **DOM-stats + Stylestats**

Ces deux outils remontent des métriques uniquement, sans parti-pris.
À vous de définir un budget par métrique. :)

   * \url{https://github.com/johno/dom-stats}
   * \url{https://github.com/t32k/stylestats}

###Accessibilité

    **aXe**

Indispensable. Peut tourner en CLI, en extension navigateur, dans un environnement Node / Gulp / Grunt / WebPack / Angular / ça-peut-durer-longtemps.
Bref, ça marche partout, c’est facile à utiliser, bien documenté… Les concurrents sont loin.
\url{https://www.deque.com/axe/}


    **Tenon (+ AccesMonitor)**

Tenon est un service en ligne, qui fonctionne via API, de très grande qualité. Il est payant, à l’appel API.  
Une des offres est l’inscription libre, puis on peut acheter des appels API par pack de20 pour 10$… modèle intéressant !
\url{https://tenon.io/}

Un (gros) avantage de ce service est une intégration forte à WordPress grâce à l’extension Access Monitor :

   * \url{https://wordpress.org/plugins/access-monitor/}
   * crée par Joe Dolson, un des boss de la team Accessibility de WordPress
   * génère un nouveau CPT pour les rapports 
   * permet de programmer des vérifications hebdomadaires ou mensuelles, ou manuelles.

   **Mentions spéciales**


   1. Asqatasun / Tanaguru : open-source, libre, français, au point sur RGAA v3, propose des outils autour (notamment la vérification des contrastes et la suggestion de couleurs)
   1. a11y.css ! Parce que bon, hein, si vous voulez bien venir aider ;)
   1. Et quelqu'un chez Google s'est amusé à faire un annuaire : \url{https://docs.google.com/spreadsheets/d/10CTezA0iDdaWggaqxuHawj-5u8YXdZeWBJsIkuvJ364/edit#gid=347324347}
   
###Sécurité

    **ZAP Proxy**

C’est l’outil développé par l’OWASP (Open Web Application Security Project), la référence en matière de sécurité. Ce projet est notamment connu pour son top 10 des failles les plus fréquentes.
ZAP Proxy est un robot, initialement utilisable via une interface graphique plutôt *old school*. Il existe plusieurs modes de tests, plus ou moins intrusifs et violents.
Suggestion : n’utilisez pas le mode fou sur une plateforme connectée à un réseau. :) Le degré recommandé est le mode spider en normal.

Un client Node existe : \url{https://www.npmjs.com/package/zaproxy}

Et à vrai dire, je ne lui connais aucun concurrent sérieux !

    **Observatory-CLI**

Celui-ci est un projet porté par Mozilla, qui « se contente » de vérifier la configuration HTTPS et les entêtes de requêtes, les certificats, et tout ce qui est lié.
La version web encapsule d’autres outils, comme SSL Labs, securityheaders.io, HSTS preload, etc.
\url{https://github.com/mozilla/observatory-cli}

###Performance

    **Phantomas** (et Louis)

Phantomas est un collecteur de métriques avec beaucoup de choix. Il ne prend pas partie sur la qualité de vos métriques : c’est à vous de définir vos métriques et le seuil acceptable pour chacune.
C’est un outil pour CLI ou* task runner*, facilement automatisable. Je l’utilise dans un portage, gulp-louis, qui permet de passer en paramètre les budgets (et ça, c’est cool).

Il tourne avec PhantomJS, ce qui peut être lourdingue.
Des outils en ligne tel quel YellowLab Tools se servent de Phantomas. :)

   * \url{https://github.com/macbre/phantomas}
   * \url{https://www.npmjs.com/package/gulp-louis}
   * \url{https://yellowlab.tools/}
    
    **PageSpeed Insights**

Un classique de chez Google, dont je ne suis pas fan (les critères sont biaisés) : cependant le portage en CLI par Addy Osmani le rend particulièrement maniable et tout terrain !
Et vous obtenez un score relatif d’utilisabilité, on ne va pas cracher dessus. :)
\url{https://github.com/addyosmani/psi}


###Compatibilité

À l’heure actuelle, je ne sais pas automatiser ça totalement : je reste donc en mode manuel, avec BrowserSync.
Ça peut paraître moche, mais la navigation synchronisée, c’est déjà de l’automatisation !
\url{https://www.browsersync.io/}

    **Outils de fou mais payants**

   1. SauceLabs : \url{http://saucelabs.com/}
   2. BrowserStack : \url{http://browserstack.com/}
   
    **Et la non-régression visuelle**

Je ne le fais pas encore de façon automatisée ; l'intérêt me paraît limité, pour la plupart des projets qui m'occupent.
Mais c’est possible « facilement », voyez plutôt :


   1. Eagle : \url{http://orange-opensource.github.io/Eagle/}
   2. Wraith : \url{http://bbc-news.github.io/wraith/}
   3. Resemble.js
   4. Jouable avec navigateur *headless* + *screenshot* + *diff* sur images :
       * Ex avec Puppeteer (Chrome) : \url{https://meowni.ca/posts/2017-puppeteer-tests/}
       * Jouable avec Firefox aussi, et pixelMatch : \url{https://github.com/mapbox/pixelmatch}Et il en existe plein d’autres, plus ou moins complexes.

###Référencement naturel

On vérifie le basique (h1, title, description, auteur, liens cassés, etc.), hein : pinger @SEOMix pour de l’expertise.
Grosso-modo ici, on cherche les valeurs dans le HTML : soit elles sont là, soit non…

   1. SEO Checker : \url{https://www.npmjs.com/package/seo-checker}
   2. broken-link-checker : \url{https://www.npmjs.com/package/broken-link-checker}

###Les génériques

   * Dareboost : \url{https://www.dareboost.com/fr/home}
   * LightHouse (peut se lancer en CLI via Node : \url{https://www.npmjs.com/package/lighthouse)}
   * Sonarwhal : \url{https://sonarwhal.com/}
   
PS : mention spéciale à **Opquast**, dont l’objectif premier est la qualité web au sens large. Ergonomie, performances, éco-conception, référencement, web mobile, accessibilité, etc. 
Tout est étudié, les bonnes pratiques affinées sous forme de checklists depuis plus de dix ans ! Et un programme de certification professionnelle existe ;)


##(démo) Exploitation des résultats

Bin oui, on a pas fait tout ça pour rien !
Les outils de tests ont tous un point commun : une **expertise** de ouf et une **documentation** de rigueur.

À chaque déroulement de votre plan de test, prenez un peu de temps pour corriger quelques erreurs. Il faut lire le message, parcourir la documentation correspondante, mettre en place un correctif,
et évidemment tester à nouveau.

**Ne cherchez surtout pas à obtenir du vert partout** : il s’agit de plusieurs métiers à part entière que vous n’acquerrez pas dans l’après-midi.


##Conclusion : vos intérêts
(Et ceux des internautes)

Vous pouvez vraiment mettre en place une stratégie de tests automatisés sur le *front-end* en quelques heures à peine. Puis l’affiner, la fignoler, la personnaliser au fil du temps.

On pense évidemment tous à la qualité de nos projets : tester permet de la vérifier, de la garantir, et de la communiquer.
Mais tester c’est aussi **explorer de nouveaux domaines** et **acquérir de nouvelles compétences**. À titre professionnel, cet aspect devrait vous séduire !

**Et tout ça pour le Graal de nos métiers: un utilisateur satisfait** (et par conséquent, un client :p).

À tester

   * \url{https://www.npmjs.com/package/compat-tester}
   * \url{https://github.com/typicode/husky}
   * \url{https://probot.github.io/}    


