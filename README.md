Arduino DreamFactory
===================

A FlappyBird game with **Arduino** and **socket.io** 

----------

First Project : Web Server with ESP8266
---------------------------------------

**Objectif**

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


#### <i class="icon-file"></i> 3/Difficultés rencontrées

Une des difficultés rencontrée sur ce projet fut la connexion avec la carte WiFi. En effet, il fallait se concentrer sur la programmation de la carte WiFi directement et non celle de la carte Arduino.

Second Project : Interaction between Website and Arduino
---------------------------------------

**Objectif**
Lier un site Web à la carte Arduino et gérer des interactions bidirectionnelles.

*Source : http://blog.ricardofilipe.com/post/getting-started-arduino-johhny-five*

> **Besoin matériels :**
>- Carte Arduino Uno et cable USB de liaison
>- Jumpers Mâle/Mâle et Mâle/Femelle
>- Breadboard
>- Bouton
>- Potentiomètres

>**Besoin logiciel :**
>- Node.js
>- Packages Johnny-Five, Express, Socket.io

#### <i class="icon-file"></i> 1/ Préparation de la carte

Il faut tout d'abord reset la carte Arduino avec **Arduino IDE** <kbd>File > Examples > Firmata > StandardFirmata</kdb>

#### <i class="icon-file"></i> 2/ Installation des modules

Ici, nous utilisons les modules 
- Johnny-Five, pour gérer les interactions avec la carte
- Express, pour gérer le serveur
- Socket.io, pour gérer les interactions entre le serveur et la carte

Ces modules sont à installer via npm.


#### <i class="icon-file"></i> 3/ Mise en place du code

3 fichiers sont nécessaires : 
Le fichier **server.js**, qui lance le serveur (avec Express) et écoute les évènements lancées par les capteurs de la carte Arduino (bouton et potentiomètre). Une fois l'évènement capté, on utilise socket.io pour relancer un évènement personnalisé vers le client.

Le fichier **index.html** qui contient la page Web en elle même.

Le fichier **control.js**, appelé par le front, qui écoute les évènements lancés par socket.io depuis le serveur.

#### <i class="icon-file"></i> 4/ Contrôle d'une LED via le site

La première étape fut de pouvoir interagir avec la carte depuis le site Web. Pour cela, nous avons créé une page avec une checkbox qui permet d'allumer ou d'éteindre la LED branchée à la carte Arduino.
Quand la checkbox change d'état, socket.io déclenche un évènement depuis **control.js**. Quand l'évènement est détecté côté serveur, une fonction Johnny-Five permet de changer l'état de la LED.

#### <i class="icon-file"></i> 5/ Intégration à Flappy Bird

Pour cela, nous avons téléchargé un Flappy Bird en ligne. 
*Source : https://github.com/nebez/floppybird*

Nous avons rajouté l'écouteur d'évènement socket.io correspondant au clic sur le bouton, qui exécute la fonction permettant a l'oiseau de voler en callback.

**Dans server.js :** 
```javascript
button = new five.Button(2)
```
*2 correspond au connecteur de la carte Arduino sur lequel est branché le bouton*

```javascript
button.on("press", function() { 
	 client.emit('btnIsPressed'); 
});
```
  Détection de la pression du bouton et envoi d'un évènement custom *btnIsPressed* au client.
 
**Dans control.js :**
```javascript
socket.on('btnIsPressed', function() { fly(); })
```
Détection de l'evènement custom et éxécution de la fonction pour faire voler l'oiseau.