Arduino DreamFactory
===================


A FlappyBird game with **Arduino** and **socket.io** 

----------


Objectif
-------------

Create a web page witch interact with an Arduino card.

> **Besoin matériels :**
>- Carte Arduino Uno et cable USB de liaison
>- Jumpers Mâle/Mâle et Mâle/Femelle
>- Breadboard
>- Micro-contrôleur WiFi ESP8266
>
>**Besoin logiciel :**
>- Arduino IDE


#### <i class="icon-file"></i> 1/ Installation du support pour la carte WiFi (modèle ESP8266)

Tout d’abord, il faut installer le support pour le **micro-contrôleur WiFi** sur l’**IDE Arduino**
On peut l’installer via une URL dans le gestionnaire de carte supplémentaires dans les préférences, ou via le menu <kbd>Outil > Type de carte > Gestionnaire de carte puis ESP8622 > Installer</kbd>
Après un redémarrage de l’IDE, nous avons accès au module via <kbd>Outil > Type de carte > Generic ESP8266 Module</kbd>

#### <i class="icon-file"></i> 2/Montage des composants

Ici, nous utiliserons la carte Arduino pour faire office de batterie. De plus, elle nous permettra d'accéder au contrôleur WiFi en la branchant à l’ordinateur via USB.

