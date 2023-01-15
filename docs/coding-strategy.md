# Coding Strategy

Here we will describe the coding strategy for the game, and the classes we will use.

## Architecture

Our game will be coded in a client-server architecture. The server will be coded in Python, and will be used to manage the game. The client will be coded in Javascript, and will be used to display the game.

We will have a socket connection between the client and the server, and the server will send the client the information it needs to display the game.

## Classes and attributes

### Board

the Board class has the following attributes:

- board: a list of 13 "Place" objects
<!-- finish enumerating -->

### Place

The place class has the following attributes:

- id
- aumone
- Cout en fidele
- Matrice prètres_sur_lieu

Matrice prètres_sur_lieu : Matrice (nb_joueurs*7) (on met 1 si patriarche, et +1 ds chaque catégorie
   de prètres., derniere case : booleen pour lautel)

### Player

The Player class has the following attributes:

- id
- id_culte
- nb_fideles
- nb_pieces
- Liste prètres dispos : Liste de 6 entiers entre 0 et 3 (sauf patriarche)
- Liste_pretres_totaux : Le nom est explicite
- Liste_pretres gratuits: liste de 16 éléments, les 3 premiers valent 1
- Nb_pretres posés
- Booléen pour savoir si couché ou non
- Nb_autels
- Nb_foules
- Bool Etat_culte
- Les listes de cartes (vides de base)
