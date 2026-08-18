# isarabic — Lecture de l'arabe

Application de révision des lettres arabes, alignée sur les 6 fiches du cursus.
Un seul fichier HTML, aucune dépendance, aucune étape de compilation.

---

## Mise en ligne — pas à pas

### 1. Créer le compte et le dépôt

1. Créer un compte sur **github.com** (gratuit).
2. Bouton **New repository**.
   - Nom : `hourouf`
   - Visibilité : **Public** (obligatoire pour l'hébergement gratuit)
   - Ne rien cocher d'autre → **Create repository**

### 2. Installer GitHub Desktop

Télécharger **GitHub Desktop** sur `desktop.github.com`. C'est l'interface graphique de Git :
pas de ligne de commande, tout se fait en cliquant.

1. Se connecter avec le compte GitHub.
2. **File → Clone repository →** choisir `hourouf` → **Clone**.
3. Noter le dossier local créé.

### 3. Déposer les fichiers

Copier dans ce dossier :

```
index.html
data.js
sw.js
manifest.webmanifest
logo.png
icon-192.png
icon-512.png
apple-touch-icon.png
audio/lettres/
audio/syllabes/
audio/mots/
```

Tous ces fichiers vont **à la racine** du dépôt, au même niveau que `index.html`.
Seuls les audios vont dans les sous-dossiers `audio/`.

Dans GitHub Desktop, les fichiers apparaissent à gauche.
Écrire un résumé en bas à gauche (ex. « première version »), puis :

**Commit to main** → **Push origin**

### 4. Activer le site

Sur github.com, dans le dépôt : **Settings → Pages**
- Source : `Deploy from a branch`
- Branch : `main`, dossier `/ (root)` → **Save**

Après une à deux minutes, le site est en ligne à :

```
https://TON-PSEUDO.github.io/hourouf/
```

**Cette adresse ne changera plus jamais.** C'est elle qu'on partage au groupe.

---

## Publier une modification

1. Modifier le fichier sur l'ordinateur.
2. GitHub Desktop → résumé → **Commit to main** → **Push origin**.
3. Une minute plus tard, le site est à jour. **Même adresse, aucun lien à renvoyer.**

En cas d'erreur : **History**, clic droit sur le commit fautif → **Revert**.
Rien n'est jamais définitivement perdu — c'est tout l'intérêt par rapport aux artifacts.

---

## Ajouter les voix de référence

Deux documents :
- **`ENREGISTREMENT.md`** — à envoyer au professeur. Ce qu'il doit prononcer, 56 vocaux.
- **`APRES-SEANCE.md`** — pour toi. Comment traiter et déposer les fichiers reçus.
- **`convertir.ps1`** — script Windows : convertit, renomme et range les 56 vocaux.

Règle critique : le professeur ne doit **jamais prononcer le nom de la lettre**, sinon
le mode Dictée donne la réponse et devient inutile.

Après réception des vocaux :

1. Renommer selon le tableau du script.
2. Déposer dans le bon sous-dossier :
   - `audio/lettres/nun.m4a` — nom + lettre + les 3 voyelles
   - `audio/syllabes/nun-a.m4a` — syllabe isolée (optionnel)
   - `audio/mots/naml.m4a` — mot d'exemple
3. Commit + Push.

Les élèves reçoivent la voix automatiquement, sans rien importer.
Formats acceptés : `.m4a`, `.mp3`, `.opus`, `.ogg`, `.webm`.

L'app cherche dans cet ordre : syllabe isolée → vocal groupé de la lettre → enregistrement local.

---

## Installer sur le téléphone

- **iPhone (Safari)** : bouton Partager → *Sur l'écran d'accueil*
- **Android (Chrome)** : menu ⋮ → *Installer l'application*

L'app fonctionne alors hors ligne, y compris les audios déjà écoutés une fois.

---

## Ce que contient l'app

L'app s'ouvre sur un **accueil** : progression, bouton de reprise, puis un menu en trois groupes.

**S'entraîner**

| Section | Rôle |
|---|---|
| Reconnaître une lettre | Une forme s'affiche seule → nommer la lettre |
| Retrouver la forme | Nom + position → choisir la forme |
| Lire une syllabe | Lettre + voyelle courte (بَ بُ بِ) — nécessite le module Harakat |
| Dictée à l'oreille | Écouter la voix du professeur → identifier |

**Consulter**

| Section | Rôle |
|---|---|
| L'alphabet | Les 28 lettres, leurs 4 formes, audio au toucher. Non verrouillé. |
| Lire des mots | Mots composés uniquement des lettres acquises |
| Les règles | Harakat, chadda, soukoûn, tanwîn, hamza, tā' marbūta, alif madda, solaires/lunaires, non liantes, squelettes |

**Réglages** — fiches suivies, modules, thème clair/sombre, sauvegarde.

**Principes de conception**

- **Verrouillage par fiche.** Une lettre non vue en cours n'apparaît dans aucun exercice : ni en
  question, ni en distracteur, ni dans les mots. Objectif : ne jamais ancrer une prononciation
  non corrigée. À la première ouverture, seule la fiche 1 est active.
- **Exception assumée : la page Alphabet.** Elle montre les 28 lettres et permet d'écouter n'importe
  laquelle. Écouter ne présente aucun risque — seule la production sans correction en présente.
  Les lettres non encore vues y sont signalées.
- **Distracteurs de la même famille de squelette.** Les mauvaises réponses proposées sont celles
  qui se ressemblent le plus (ن ت ث ي ب ensemble), pour travailler la discrimination par les points.
- **Pondération adaptative.** Ce qui est raté revient environ dix fois plus souvent.
- **Test à vide.** Aucune étiquette n'accompagne la forme affichée : c'est l'effort de récupération
  qui grave, pas la relecture.

---

## Sauvegarde

Les statistiques sont stockées dans le navigateur (`localStorage`).
Vider le cache les efface. Réglages → **Exporter** produit un fichier `.json` réimportable.

Les fichiers audio du dépôt, eux, ne sont jamais perdus : ils font partie du site.
