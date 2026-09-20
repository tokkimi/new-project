# Haru : analyse d’innovation — 20 septembre 2026

La piste la plus utile est une mémoire personnelle des décisions de soin : montrer ce qui a changé, ce qui a été observé et ce qu’on ne peut pas encore conclure. Un scan, un journal ou une routine personnalisée seuls ne suffisent plus à différencier Haru. La recherche ci-dessous est exploratoire, pas une preuve que cette combinaison serait inédite dans le monde.

## Partir de ce qui existe déjà dans Haru

La version de production possède déjà un profil de peau, un audit, un historique de scans, des réactions produit, des dates d’ouverture, des notes et un laboratoire de routine. `RoutineProtocol` permet déjà un changement à la fois sur 7, 14 ou 28 jours, avec les issues conserver, retirer ou ajuster. Recréer ce laboratoire serait un doublon.

Les manques observés dans ce modèle sont plus précis : aucune photographie figée de la composition complète de la routine au début d’un protocole, pas de journal structuré des changements concurrents, pas d’issue « impossible de conclure », et pas de lien explicite entre chaque conclusion et les observations qui la soutiennent. La durée choisie n’est pas une validation scientifique d’efficacité. Certaines valeurs de confiance de l’audit sont des constantes heuristiques ; elles ne doivent pas être présentées comme des probabilités cliniquement validées.

## Comparaison avec les solutions existantes

| Solution | Fonctionnalités observées dans sa documentation | Conséquence pour Haru |
| --- | --- | --- |
| [SkinSort](https://skinsort.com/routine) | Construction de routines, ordre et fréquence, avertissements de compatibilité. | Une liste de produits avec alertes n’est pas une nouveauté. |
| [Skin Bliss](https://getskinbliss.com/blog/skin-bliss-app-faq/) | Scan, journal, comparaison photo, adaptation de la routine. | Le suivi et la personnalisation sont déjà des attentes de base. |
| [SkinLately](https://skinlately.com/tools/routine-quiz/) | Organisation des changements et fenêtres d’observation, démarche d’un changement à la fois. | Même cette démarche ne peut pas être revendiquée seule comme originale. |

Les sites commerciaux décrivent leurs propres fonctionnalités : cette comparaison ne valide pas leur efficacité et ne remplace pas un essai complet des applications.

## Publications de brevets examinées

| Publication | Sujet des revendications / description examinées | Point à étudier avant une nouvelle fonction |
| --- | --- | --- |
| [US20200202131A1](https://patents.google.com/patent/US20200202131A1/en), famille comprenant US11093749B2 | Analyse vidéo d’interactions avec des produits et restitution d’informations personnalisées sur une routine. | Un coach qui reconnaît automatiquement les gestes et produits en vidéo mérite une analyse détaillée de cette famille. |
| [US20200111577A1](https://patents.google.com/patent/US20200111577A1/en) | Données cutanées, scores normalisés et formulations de produits affinées au fil des retours. | Ne pas confondre personnalisation générale et revendications précises de formulation itérative. |
| [US20250191486A1](https://patents.google.com/patent/US20250191486A1/en) | Selfies et images issues d’un dispositif, programme de soin sur plusieurs jours, instructions transformées en piste audio ou vidéo personnalisée. | Un coach audiovisuel quotidien n’est pas une piste vierge. |

Il s’agit de publications, avec des familles et des revendications dont la portée peut évoluer. Les métadonnées Google Patents ne suffisent pas à établir le statut juridique dans chaque pays. Cette lecture ne démontre ni brevetabilité, ni absence de contrefaçon, ni liberté d’exploitation. Avant d’investir dans une invention technique, faire comparer l’implémentation précise aux revendications en vigueur dans les territoires ciblés, avec un spécialiste.

## Proposition : une décision expliquée à partir de l’historique réel

Le produit doit répondre à une question concrète : « Je garde quoi, et pourquoi ? »

Exemple de parcours proposé, et non de résultat médical : une utilisatrice commence un nouveau sérum, puis change aussi de nettoyant trois jours plus tard. Haru conserve ces deux événements. Lors du bilan, il affiche que les observations ne permettent pas d’attribuer le changement au sérum seul. Il propose de consigner ce qui s’est passé et relie la situation au module pédagogique adapté, plutôt que de produire une fausse certitude ou d’inciter immédiatement à acheter.

Quatre éléments formeraient la prochaine version du laboratoire existant :

1. **Historique fidèle de la routine** : conserver les produits, leur formulation connue, la fréquence et les modifications à chaque date. Une modification ultérieure du catalogue ne doit pas réécrire l’histoire de l’utilisateur.
2. **Observations contextualisées** : noter quelques sensations, l’usage réel et les changements simultanés. Les photos restent facultatives ; des conditions très différentes rendent une comparaison incertaine.
3. **Bilan traçable** : distinguer observation, association possible et données insuffisantes. Ajouter « aucune conclusion » et expliquer quelles informations manquent. Ne pas déduire une causalité ou une allergie d’un simple journal.
4. **Apprentissage au moment utile** : associer une courte explication à une décision de la routine. L’utilisateur comprend et retrouve ce qu’il a déjà essayé, au lieu de répéter les mêmes achats et erreurs.

La différenciation envisagée est la qualité de cette mémoire, sa traçabilité et sa capacité à ne pas conclure. Aucun des documents consultés ne suffit à prouver que la combinaison exacte n’existe pas ; une recherche complémentaire reste nécessaire.

## Mise en œuvre et critères de réussite

Première étape : compléter le laboratoire existant, sans nouveau score de peau. Prévoir un événement de changement versionné, un instantané de routine, des observations datées et une conclusion accompagnée de ses motifs. La migration doit être additive et préserver les anciens protocoles. Les données restent liées à l’utilisateur, exportables et supprimables.

Tester ensuite le parcours avec un petit groupe pendant plusieurs semaines : temps nécessaire pour consigner une observation, compréhension des raisons du bilan, retour au journal sans relance, décisions réellement utiles. Comparer une explication traçable à l’actuel bilan ; vérifier que l’utilisateur sait reconnaître une situation où Haru manque d’informations. Le taux de retour est un indicateur d’usage, pas une preuve d’amélioration cutanée.

À différer : jumeau numérique prédictif, diagnostic photo présenté comme certain, pourcentage de confiance sans calibration, prédiction d’allergie, recommandations automatiques de reprise après une réaction. Ces idées nécessitent des données et validations que le code actuel ne fournit pas.

## Livré dans cette série de changements

Refonte claire, routines illustrées, bannière simplifiée, offres mensuelle et annuelle et espace d’apprentissage. La proposition de mémoire décisionnelle ci-dessus est une analyse et une spécification de suite ; elle n’est pas présentée comme une fonction déjà déployée.
