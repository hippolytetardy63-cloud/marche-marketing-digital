# Marche du charge de marketing digital

Tableau de bord des offres d'emploi du charge de marketing digital (code
ROME M1718), d'apres l'API France Travail, mis a jour tous les deux jours.

Le site : https://hippolytetardy63-cloud.github.io/marche-marketing-digital/

Publie automatiquement depuis un depot de travail prive. Ne pas modifier
ici : chaque releve remplace le contenu de ce depot. Les scripts et les
donnees datees ne sont pas ici : ils sont joints au rendu (zip).

---

# Marché de mon métier — carnet de bord

**Auteur :** Hippolyte Tardy
**Formation :** M2 Marketing Opérationnel & Digital — IAE Clermont Auvergne (UCA), 2026-2027
**Cours :** Séminaires métiers — CM 1 du 22/09/2026
**Statut :** en alternance
**Dernière mise à jour :** 21/10/2026

> Un métier ne se raconte pas, il se compte.

---

## 1. Le métier ciblé

### Intitulé principal

**Chargé / Chargée de marketing digital** — code ROME **M1718**

C'est le code pivot de ce travail : c'est lui qui sert de requête à l'API France Travail, et c'est autour de lui que MétierScope regroupe la quasi-totalité des autres métiers de ma liste.

### Variantes du même métier (même code M1718)

Ce sont les intitulés sous lesquels le marché publie ce poste. À rechercher en mots-clés en plus du code ROME, car les annonces ne nomment pas toutes le poste pareil.

- Chargé de marketing opérationnel
- Chef de projet digital / Chef de projet marketing digital
- Traffic manager
- CRM manager
- Growth marketer
- Responsable acquisition

### Métiers voisins (codes distincts, relevés séparément depuis le 21/10/2026)

| Intitulé | Code ROME | Statut dans ma recherche |
|---|---|---|
| Chef / Cheffe de produit | **M1703** | Cible secondaire — c'est le code réel du « Product Marketing Manager » |
| Chargé / Chargée de communication | **E1112** | Cible secondaire — pour les postes marketing + communication |
| Responsable marketing | M1705 | Horizon à 3-5 ans, pas une cible à la sortie |
| Directeur / Directrice du marketing | M1711 | Horizon de carrière |
| Directeur / Directrice de la communication | E1109 | Horizon de carrière |
| Directeur / Directrice marketing digital | M1717 | Horizon de carrière |

### Corrections apportées à ma liste de départ

Vérification faite sur MétierScope (candidat.francetravail.fr/metierscope), le 22/09/2026. Trois codes sur cinq ne désignaient pas le métier que j'avais écrit à côté :

| Ce que j'avais écrit | Le code que j'avais mis | Ce que ce code désigne réellement | Code corrigé |
|---|---|---|---|
| Chargé de marketing opérationnel | M1718 | Chargé de marketing digital | ✅ M1718 (variante du même métier) |
| Chef de projet digital | M1718 | Chargé de marketing digital | ✅ M1718 (variante du même métier) |
| Chargé de marketing et communication | E1109 | **Directeur de la communication** | ➡️ **E1112** (Chargé de communication) |
| Web Analyst | E1210 | **Web designer** | ➡️ retiré du périmètre (voir ci-dessous) |
| Product Marketing Manager (PMM) | M1711 | **Directeur du marketing** | ➡️ **M1703** (Chef de produit) |

**Web Analyst retiré des cibles.** Le code que j'avais noté désignait le Web designer, et le métier lui-même relève de la famille informatique, pas du marketing : ce n'est pas un poste que je vise. L'analyse de données web reste en revanche une **compétence** à compter dans les offres M1718 — elle est traitée comme telle dans mes questions au marché (§3, question 3).

Deux enseignements à garder pour la suite :

1. L'écriture correcte est **ROME** (Répertoire Opérationnel des Métiers et des Emplois), pas « ROM ».
2. Le piège récurrent : le référentiel distingue le niveau *chargé* du niveau *directeur*. Extraire E1109 ou M1711 aujourd'hui me ramènerait des offres de direction que je ne peux pas viser à la sortie du master — et fausserait complètement mes chiffres de salaire.

---

## 2. Mon périmètre de recherche

| Critère | Valeur |
|---|---|
| **Zone 1** | Clermont-Ferrand + 20 km |
| **Zone 2** | Lyon + 20 km *(élargi le 21/10/2026, voir §6)* |
| **Télétravail** | ~~Zone 3 : 100 % à distance~~ abandonnée le 21/10/2026 (voir §6) — le télétravail partiel reste un **critère bonus** |
| **Contrat** | CDI exclusivement |
| **Disponibilité** | Immédiate |
| **Salaire visé** | ~2 500 € brut/mois |
| **Plancher** | 2 100 € brut/mois — en dessous, je ne donne pas suite |

Points de repère pour lire ces chiffres :

- **2 433 € brut médian à un an** : c'est l'insertion des diplômés de l'IAE (deck de rentrée). Mon objectif de 2 500 € est donc pile au niveau de la médiane de ma promo — cohérent, ni naïf ni timide. L'extraction dira si le marché de M1718 se situe au-dessus ou en dessous.
- **Lyon + 5 km** était un périmètre très serré : il revenait à Lyon intra-muros, et excluait Villeurbanne-est, Écully ou la Part-Dieu périphérique. Il est passé à 20 km le 21/10/2026.
- **Codes départements pour l'API** : Puy-de-Dôme = **63**, Rhône = **69**.

---

## 3. Mes questions au marché

Le tri est volontaire : toutes mes questions ne se répondent pas avec la même source. C'est le principe de la matinée — *avec la donnée, le marché ; avec les professionnels, le métier*.

### A. Ce que les offres d'emploi peuvent répondre (extraction France Travail)

1. **Combien d'offres, et où ?** Volume total en France, part du 63, part du 69, part du remote. Y a-t-il assez de volume à Clermont pour y rester, ou Lyon est-il le vrai marché ? ✅ **Répondu au 21/10/2026** (API France Travail, M1718, offres distinctes du 22/09 au 21/10) : **0 offre dans le Puy-de-Dôme**, 14 dans le Rhône dont 12 à Lyon, aucune entièrement à distance. Lyon est le vrai marché pour M1718 ; Clermont n'apparaît qu'avec les métiers voisins (M1703, E1112). Détail et décisions en §6.
2. **Quels salaires sont affichés, et combien d'offres n'en affichent aucun ?** Fourchette en CDI, écart Clermont / Lyon / national, position de mon plancher de 2 100 € et de ma cible de 2 500 € dans cette distribution. ✅ **Répondu au 21/10/2026** (API France Travail, M1718, CDI distincts du 22/09 au 21/10) :
   - 98 CDI, dont **51 affichent un salaire** (52 %) ; 46 restent comparables une fois écartés 2 temps partiels et 3 saisies incohérentes du recruteur (un annuel de 35 millions, un annuel coché « mensuel »).
   - **Médiane des salaires affichés : 2 688 € brut/mois**, la moitié des salaires affichés entre 2 244 € et 3 469 €. Ce sont des salaires *affichés* (ce que le recruteur annonce), pas des salaires signés.
   - **78 % des salaires affichés atteignent au moins mon plancher** de 2 100 €, **63 % au moins ma cible** de 2 500 € (et la médiane de ma promo, 2 433 €).
   - **L'expérience pèse plus que le lieu** : médiane affichée de 2 171 € pour un débutant, 2 604 € sous 3 ans, 3 542 € au-delà. Hors Île-de-France, la médiane affichée est de 2 573 € — ma cible est le prix du marché en province. Le Rhône (4 offres) et le Puy-de-Dôme (aucune) sont trop peu fournis pour conclure.
   - Limite : les offres qui affichent un salaire ne ressemblent pas forcément à celles qui le taisent. Le bloc « Les salaires » de la page Le marché refait ce calcul à chaque relevé.
3. **Quelles compétences et quels outils reviennent le plus ?** Comptage des mentions (HubSpot, GA4, Meta Ads, SQL, Salesforce, Looker Studio, Canva, Python, « IA générative »…) — et surtout : **lesquels la maquette du M2 ne me donne pas ?** Cette liste-là devient mon plan de travail de l'année.
4. **Quelle part des offres est réellement en CDI ?** Mon critère est exclusif : je dois savoir s'il m'ampute de 20 % ou de 80 % du marché.
5. **Comment le métier bouge ?** Quels mots apparaissent (IA, automation, GEO, growth) et lesquels reculent. ✅ **Première réponse au 21/10/2026**, après un mois de relevés automatiques (API France Travail, M1718, France entière) :
   - le marché se contracte : **123 offres le 23/09, 87 le 21/10** (−29 %) ;
   - l'**IA** passe de 17 % à 28 % des offres, l'**automatisation** de 13 % à 21 % ; growth et GEO montent aussi, mais sur très peu d'offres ;
   - la hausse vient surtout des **offres récentes** : 38 % des nouvelles offres du 21/10 parlent d'IA, contre 21 % des plus anciennes ;
   - **pas encore une preuve** : en nombre, l'IA ne passe que de 21 à 24 offres, et les fourchettes de confiance se recouvrent encore. Rien ne recule nettement.

   Le tableau « Les mots qui montent » (page Le marché) refait ce calcul à chaque relevé et dira quand l'écart sortira de la marge du hasard.

   **Source emploi citée** : Apec, *L'intelligence artificielle en commercial-marketing*, 24 mars 2026 (offres cadres sur apec.fr, 2022-2025). Les offres de marketing citant l'IA y progressent de +33 %, mais ne pèsent que 2 % des offres de la fonction en 2025. Même direction que mes relevés, mesure différente : à comparer en tendance, pas en valeur. Détail et confrontation : page Le marché, « Ce qu'en dit l'APEC ».

### B. Ce qu'il faut demander aux professionnels

À poser à Clément Dos Santos (24/09), Samir Aouiche et Marjorie Charbonnier — ces questions n'ont pas de réponse dans un fichier CSV :

6. Quels sont les défis et les difficultés réelles du poste ?
7. À quoi ressemble une journée ou une semaine type ?
8. Ce que les annonces demandent est-il ce qu'on fait vraiment une fois en poste ?

**Trois questions tirées de mes chiffres**, pour Samir Aouiche (17/12) et Marjorie Charbonnier (17/02). Chiffres du relevé du 11/11/2026 (90 offres, requête M1718, France Travail) ; le site les recalcule à chaque relevé.

9. **Le salaire.** Les 60 salaires affichés exploitables donnent une médiane de 2 729 € brut/mois, et 2 292 € pour un débutant accepté ; ma cible de 2 500 € est atteinte par 67 % des offres qui affichent un salaire. Pourtant 81 % des offres n'en affichent aucun. *Pour un premier poste de chargé de marketing digital chez vous, quelle fourchette proposeriez-vous, et qu'est-ce qui la fait varier ?*
10. **Le marché caché.** Sur 7 690 entreprises du Puy-de-Dôme (3 salariés et plus), seules 4 ont publié une offre M1718 ; il y a 0 offre dans le département et 7 dans le Rhône. *Dans votre entreprise ou votre réseau, les postes marketing se pourvoient-ils par annonce, par candidature spontanée ou par cooptation ? Une candidature spontanée a-t-elle une chance d'aboutir ?*
11. **Les outils.** Les annonces demandent le marketing automation (9 % des offres), SQL (7 %) et Jira (6 %), qu'aucun cours du M2 ne couvre ; l'IA générative est citée par 16 %. *Sur ces outils, lequel attendez-vous d'un junior dès le premier jour, et lequel s'apprend en poste ?* (Complète la question 8 : ce que les annonces demandent est-il ce qu'on fait vraiment ?)

Les réponses obtenues se notent ici, sous chaque question, après chaque entretien (point C8).

---

## 4. Méthode de travail

Règle appliquée à chaque étape avec l'agent IA : **une chose à la fois**. Pas de prompt qui fait tout d'un coup. On demande, on vérifie que c'est fait et juste, puis on passe à la suivante. Si une étape rate, on la reprend avant d'aller plus loin.

Et : je dois pouvoir expliquer chaque maillon de la chaîne. « C'est l'IA qui l'a écrit » n'est pas une explication devant un jury ou un recruteur.

---

## 5. Les canaux de données

### Canal principal — API France Travail « Offres d'emploi v2 »

Officielle, gratuite, documentée, légale. Chaque offre revient avec intitulé, contrat, salaire affiché, compétences, lieu, date.

- **Limites** : 150 offres maximum par appel, 1 150 par requête. Le total réel se lit dans l'en-tête de la réponse.
- **Identifiants** : dans `.env`, jamais versionné (ajouté au `.gitignore`).
- **Paramètres de ma requête** : une extraction France entière par code ROME — `M1718`, puis `M1703` et `E1112` séparément. Les codes sont écrits dans `data/metiers.json`. Le tri par contrat (CDI) et par département (63, 69) se fait ensuite, sur les fichiers, plutôt que dans la requête : on garde ainsi le dénominateur national.

### Canaux à brancher ensuite

Adzuna (statistiques de salaire), Arbeitnow (sans clé), Jooble, Remotive (remote), La Bonne Alternance. Même format de CSV partout, pour que tout se recoupe.

### Ce que je n'automatise pas

LinkedIn, l'APEC et Indeed interdisent le scraping dans leurs conditions d'utilisation. Je les consulte à la main, je ne les aspire pas.

---

## 6. Points ouverts

- [x] **Arbitrer le remote** une fois le volume mesuré. **Tranché le 21/10/2026 : le 100 % à distance est abandonné comme zone de recherche.**
  Sur les 214 offres distinctes avec texte d'annonce vues du 22/09 au 21/10 (API France Travail, M1718, France entière), **aucune** n'est entièrement à distance ; 35 (16 %) proposent du télétravail partiel, le plus souvent **2 jours par semaine**. Le télétravail partiel devient un critère bonus. À Lyon, 2 offres sur 14 le proposent : depuis Clermont, cela ferait 3 jours sur place par semaine.
- [x] **Élargir Lyon à 15-20 km** si le volume à 5 km est trop faible. **Tranché le 21/10/2026 : Lyon + 20 km.**
  Même source, même période : 14 offres distinctes dans le Rhône, dont 12 dans Lyon même ; passer à 20 km n'ajoute qu'**une** offre (Saint-Genis-Laval). Élargir ne coûte rien, mais ce n'est pas le rayon qui limite le volume : environ **6 offres en un mois** correspondent vraiment à ma cible (CDI, niveau chargé, 3 ans d'expérience au plus).
- [ ] **Clermont : 0 offre M1718 dans le Puy-de-Dôme en un mois**, et une seule dans les départements voisins. Les vrais leviers de volume sont ailleurs : extraire les codes voisins **M1703** et **E1112** (§1), brancher d'autres canaux autorisés (§5), et passer par le réseau pour le marché caché, que France Travail ne voit pas.
  - [x] **Codes voisins relevés depuis le 21/10/2026.** Premier relevé : M1703 314 offres en France, E1112 237. Ce sont les seuls à faire apparaître le Puy-de-Dôme : **4 CDI** (assistant chef de produit et chargé de communication à Clermont, chargé de communication à Ambert, head of product à Riom), et **22 CDI** au total dans mes deux départements, tous métiers confondus. À lire avec prudence : M1703 mélange chefs de produit marketing et industriels, E1112 est dominé par l'alternance. Page Le marché, partie « Et les métiers voisins ? ».
  - [ ] Brancher d'autres canaux autorisés (§5).
  - [ ] Le réseau, pour le marché caché.

---

## 7. Respect des données personnelles

Travail encadré par le RGPD et la doctrine CNIL sur la prospection B2B :

- Les dirigeants d'entreprise issus de Sirene, Pappers ou du BODACC sont des **données publiques**.
- Le contact nominatif d'un salarié (mail, téléphone) est une **donnée personnelle**.
- La prospection B2B est admise quand la finalité est claire — ici, **une candidature** —, qu'elle est en lien avec la fonction de la personne, et que celle-ci peut s'y opposer.
- Aucun fichier constitué pour être revendu. Aucun contact hors du cadre professionnel de la personne.

---

## 8. Livrable et échéances

**Je suis en alternance.** La mise en ligne sur GitHub est imposée aux étudiants sans alternance ; elle ne l'est pas pour moi. Le site peut donc rester en local — un dossier avec `index.html` à la racine, ses pages, ses données et ses scripts, rendu zippé. GitHub reste ouvert comme choix personnel, pour ceux qui veulent tracer et montrer leur travail.

Cette règle porte sur la **forme du rendu**, pas sur le contenu : le travail d'analyse du marché est le même dans les deux cas.

| Date | Livrable |
|---|---|
| **22/09/2026, 13h15** | Par mail : capture de la v0 en local (ou adresse du dépôt si GitHub) |
| **24/09/2026** | Clément Dos Santos — arriver avec 3 questions tirées de mes chiffres |
| **19/11/2026, 13h00** | Le site zippé (ou son adresse en ligne si GitHub) |

---

## 9. Structure du dossier

```
.
├── README.md                    ← ce fichier : le cadrage
├── CLAUDE.md                    ← consignes pour l'agent IA
├── requirements.txt             ← bibliothèques Python nécessaires
├── .env                         ← identifiants France Travail (jamais versionné)
├── .env.example                 ← modèle sans valeurs, lui versionné
├── .gitignore
│
├── ouvrir-le-site.bat           ← double-clic : lance le site et son serveur
├── ouvrir-le-site.command       ← la même chose sur Mac
│
├── index.html                   ← tableau de bord, page d'accueil
├── metier.html                  ← le métier, les codes ROME
├── marche.html                  ← géographie, contrats, salaires, offres, évolution
├── acteurs.html                 ← qui recrute, marché caché, professionnels
├── profil.html                  ← mon CV et l'écart avec le marché
├── methode.html                 ← canaux, limites, chaîne technique, RGPD
│
├── assets/
│   ├── style.css                ← feuille de style commune aux 6 pages
│   ├── site.js                  ← menu latéral et tous les blocs affichés
│   ├── donnees.js               ← GÉNÉRÉ — jamais modifié à la main
│   ├── carte_france.js          ← GÉNÉRÉ une fois — fond de carte IGN
│   ├── cv-hippolyte-tardy.pdf
│   └── cv-apercu.jpg            ← GÉNÉRÉ depuis le PDF
│
├── data/
│   ├── brut/                    ← ce que la collecte récupère, jamais modifié
│   │   ├── offres_M1718_<date>.json       ← réponse de l'API, telle quelle
│   │   └── offres_M1718_<date>.meta.json  ← requête, date, canal, total
│   ├── traite/                  ← ce que la mise en forme en tire
│   │   ├── offres_M1718_<date>.csv        ← une ligne par offre, jamais écrasé
│   │   └── serie.json           ← GÉNÉRÉ — un point par relevé, pour la courbe
│   ├── profil.json              ← mes outils maîtrisés, saisis à la main
│   └── metiers.json             ← codes ROME suivis : M1718 principal, M1703 et E1112 voisins
│
├── scripts/
│   ├── collecte/                ← récupérer les données
│   │   ├── test_connexion.py    ← vérifie que les identifiants répondent
│   │   └── extraction_offres.py ← API → data/brut/
│   ├── traitement/              ← mettre en forme, produire le site
│   │   ├── mise_en_forme.py     ← data/brut/ → data/traite/
│   │   ├── generer_site.py      ← data/traite/ → assets/donnees.js
│   │   ├── generer_carte.py     ← GeoJSON → carte (lancé une seule fois)
│   │   └── apercu_cv.py         ← CV PDF → image (quand le CV change)
│   └── outils/
│       ├── serveur_local.py     ← sert le site + bouton « mettre à jour »
│       ├── audit.py             ← sécurité, reproductibilité, cohérence
│       ├── preparer_rendu.py    ← fabrique le zip du rendu dans rendu/
│       └── preparer_site_public.py ← extrait le site seul pour sa version en ligne
│
└── contexte/
    └── cm1-seance.md            ← contenu de la séance CM 1
```

### Ouvrir le site

**En ligne :** https://hippolytetardy63-cloud.github.io/marche-marketing-digital/
— mis à jour tout seul après chaque relevé. Cette version publique ne
contient que le site (pas les scripts ni les données brutes) et aucune
coordonnée personnelle ; le dépôt de travail reste privé.

**Sur le Mac :**

Double-cliquer sur `index.html` suffit : tout s'affiche, sans rien installer.

Double-cliquer sur `ouvrir-le-site.command` (Mac) lance en plus un petit
serveur local, ce qui active le bouton « Mettre à jour les données » en haut
du tableau de bord. Garder la fenêtre Terminal ouverte pendant la
consultation. Sous Windows, `ouvrir-le-site.bat` joue le même rôle. Le site est servi sur http://localhost:8766/ : le port 8765
d'origine est occupé sur le Mac par un autre outil.

### Mettre le site à jour

Sur Mac, les commandes passent par l'environnement du projet :
`python3 -m venv ~/.venvs/trouver-du-taff` la première fois (hors du dossier :
Google Drive ne sait pas synchroniser un venv), puis
`~/.venvs/trouver-du-taff/bin/python` à la place
de `python` ci-dessous.

```bash
pip install -r requirements.txt      # la première fois seulement
python scripts/collecte/extraction_offres.py  # réponse brute du jour → data/brut/
python scripts/traitement/mise_en_forme.py    # brut → CSV daté dans data/traite/
python scripts/traitement/generer_site.py     # régénère les chiffres du site
```

**Pourquoi trois étapes.** La collecte et la mise en forme sont séparées
(remarque du professeur) : le brut est gardé tel que l'API l'a renvoyé, et
la mise en forme peut être corrigée puis rejouée sur tout l'historique sans
rappeler l'API. Le brut est conservé depuis le 21/10/2026 ; les relevés
antérieurs n'existent qu'en CSV. Les blocs `contact` et `agence` de l'API
sont retirés du brut (noms de recruteurs possibles, voir §7).

Le dernier script inscrit une empreinte dans les pages, pour que le navigateur
ne serve pas une copie périmée depuis son cache.

Ces commandes tournent aussi toutes seules, **sur GitHub Actions, sans
Claude et sans que le Mac soit allumé** : le relevé tous les deux jours vers
8 h, l'audit le lundi et le jeudi vers 9 h (heure d'été). Le mode d'emploi
est dans `automatisations/README.md`. Double-cliquer sur
`ouvrir-le-site.command` récupère d'abord les derniers relevés de GitHub.

### Vérifier que tout va bien

```bash
python scripts/outils/audit.py
```

Sécurité du dépôt, failles connues des bibliothèques, reproductibilité de la
génération, cohérence du site, intégrité des données. À lancer avant un rendu.

### Préparer le rendu

```bash
python scripts/outils/audit.py           # d'abord : tout doit être vert
python scripts/outils/preparer_rendu.py  # puis : rendu/marche-metier-hippolyte-tardy_<date>.zip
```

Le zip est fabriqué depuis git (`git archive`) : il ne contient que des
fichiers enregistrés, donc jamais `.env`. Le script refuse de partir si une
modification n'est pas commitée, et vérifie le contenu avant de rendre la
main. Une fois décompressé, un double-clic sur `index.html` suffit.
