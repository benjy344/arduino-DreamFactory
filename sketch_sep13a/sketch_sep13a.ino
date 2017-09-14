#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiServer.h>
#include <WiFiUdp.h>

#include <SPI.h>
 
char ssid[] = "iPhone De Benjy";     // Le SSID de votre réseau (nom)
char pass[] = "password";   // Votre mot de passe réseau
int keyIndex = 0;                // Votre numéro d'index clé de réseau (nécessaire uniquement pour WEP)
 
int status = WL_IDLE_STATUS;
 
WiFiServer server(80);
 
void setup() {
  // Initialisation de série et attendre port à ouvrir:
  Serial.begin(9600);
  while (!Serial) {
    ;// Attendre pour le port série pour vous connecter. Nécessaire pour Leonardo seulement
  }
  Serial.println("demarrage");
 // Vérifier la présence de l'écran:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
   // Ne pas continuer:
    while (true);
  }
 
  String fv = WiFi.firmwareVersion();
  if ( fv != "1.1.0" )
    Serial.print("Please upgrade the firmware");
        Serial.println(fv);
 
  // Tentative de connexion à un réseau Wifi:
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
   // Connexion à réseau WPA / WPA2. Modifiez cette ligne si vous utilisez un réseau ouvert ou WEP:
    status = WiFi.begin(ssid, pass);
 
    // Attendre 5 secondes pour la connexion:
    delay(5000);
  }
  server.begin();
  // you're connected now, so print out the status:
  printWifiStatus();
}
 
 
void loop() {
  // listen for incoming clients
  WiFiClient client = server.available();
  if (client) {
    Serial.println("new client");
    // an http request ends with a blank line
    boolean currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.write(c);
        // if you've gotten to the end of the line (received a newline
        // character) and the line is blank, the http request has ended,
        // so you can send a reply
        if (c == '\n' && currentLineIsBlank) {
          // send a standard http response header
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/html");
          client.println("Connection: close");  // the connection will be closed after completion of the response
    //      client.println("Refresh: 5");  // refresh the page automatically every 5 sec
          client.println();
          client.println("<!DOCTYPE HTML>");
          client.println("<html>");
          // contenu de la page html ***************
          client.println(F("<title>Projet Waterleaks</title>"));
          client.print("<HEAD>");
          client.println("<font size='16' color='RED'><center>Projet Waterleaks</center></font>");//Police titre en vert
          client.print("</HEAD>");
          client.print("<BODY>");
          client.print("<p><h1> ALARMES </h1></p>");
          client.print("<p>  HELLO </p>");
          client.print("</BODY>");
          // fin page html ***************************
          client.println("</html>");
          break;
        }
        if (c == '\n') {
          // you're starting a new line
          currentLineIsBlank = true;
        }
        else if (c != '\r') {
          // you've gotten a character on the current line
          currentLineIsBlank = false;
        }
      }
    }
    // give the web browser time to receive the data
    delay(1);
 
    // close the connection:
    client.stop();
    Serial.println("client disonnected");
  }
}
 
 
void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());
 
  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
 
  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}


