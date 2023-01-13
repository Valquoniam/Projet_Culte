# Some pseudo-code

**Nb de joueurs de 3 à 5.**

Plateau : 13 Cases, avec :

- 1 pile micracle en haut à gauche (3*11 cartes)
- 1 pile intrigue en bas à droite (3*11 cartes) - ATTENTION : Pas jouable tt le temps
- 1 pile Privilège 33 cartes - ATTENTION : sous liste de 3 cartes utilisables à chaque tour

Conditions de win :

- Double invok (on aura un compteur)
- 4 foules de fanat (" " ")
- 5 autels (quand on aura fait les effets de lieu)
- 3 miracles (quand on aura fait les effets de lieu)

## 0 - Setup

Chaque joueur a à disposition  :

- 9 fidèles - init=2
- 3*5 prètres (d'influence 1 à 5) - init = 1.1 , 2.1 , 3.1
- 1 patriarche (on verra apres aussi)
- Un culte (on le fera a la fin ca c relou)
- Un entier 'piece de monnaie" - init=5

## 1 - Phase intention

- Tant que tous les joueurs ne sont pas ds l'état "a passé":

  - les joueurs posent tout à tour un prètre ou passent. (poser = ajouter un truc ds la matrice de jeu)
  - Actualiser la case pour que les autres voient l'avancement
  - Si on a nb_pretres_posés > 3 (sauf cartes), on paye un fidèle pour en mettre

### 1.1 - Phase d'achat - vente de cartes après avoir passé

- C de la bite on verra apres (tkt ça va aller)

### 1.2 - Foules de fanatique

- On joue les foules apres avoir passé

## 2 - Résolution

- Tant que les 13 lieux ont pas été check, on fait pour chaque lieu:
Si pretres >0:
  - on demande à chaque joueur si il veut jouer qq chose (phase 2 du dvlpt)
  - Celui avec sum_pretres le plus haut gagne le lieu et les autres ont l'aumone : monnaie +=monnaie + aumone[nb lieu]
  - Pour le winner : cf. event_win[nb_lieu]
- Check si qqun a rempli les conditions de win
- Finito si oui
- Joueur qui start = winner du plus haut lieu
