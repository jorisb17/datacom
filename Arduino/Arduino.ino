#include <SPI.h>
#include <WiFiNINA.h>
#include "arduino_secrets.h"

//****************IO-Setup***************
char GLED = 2;
char YLED = 3;
char RLED = 4;
char BUTTON = 7;
//***************************************

char ssid[] = SECRET_SSID;        //Netwerk SSID
char pass[] = SECRET_PASS;    //Netwerk wachtwoord

int status = WL_IDLE_STATUS;
WiFiServer server(80);
WiFiClient client;
IPAddress api(192, 168, 4, 2);
int LEDStatus = 0;

int state = 0;

void error();
void printWiFiStatus();

void setup() {
  Serial.begin(9600);
  pinMode(BUTTON, INPUT);
  pinMode(GLED, OUTPUT);
  pinMode(RLED, OUTPUT);
  pinMode(YLED, OUTPUT);

  // check voor WiFi module
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communicatie met wifi module mislukt");
    while (true) {
      error();
    }
  }

  //check de firmware
  String fv = WiFi.firmwareVersion();
  if (fv < "1.0.0") {
    Serial.println("Upgrade firmware");
    while (true) {
      error();
    }
  }


  // print de naam (SSID)
  Serial.print("Aanmaken acces point: ");
  Serial.println(ssid);

  status = WiFi.beginAP(ssid, pass);

  if (status != WL_AP_LISTENING) {
    Serial.println("Niet gelukt om acces point aan te maken");
    while (true) {
      error();
    }
  }

  // wacht 10 seconden
  delay(5000);
  server.begin();
  printWiFiStatus();
}

int adres = 0;
void loop() {
  switch (state) {
    case 12:
      error();
    default:
      break;
  }
  digitalWrite(RLED, HIGH);
  while (client.available()) {
    char c = client.read();
    Serial.write(c);
    adres = c;
  }
  if (status != WiFi.status()) {
    status = WiFi.status();
  }
  if(digitalRead(BUTTON) == HIGH){
    httpRequest(20);
    delay(500);
  }
}

void httpRequest(int temp) {
  client.stop();
  digitalWrite(YLED, HIGH);
  if (client.connect(api, 3000)) {
    Serial.println("connecting to API");
    client.print("GET /arduino?temp=");
    client.print(String(temp));
    client.println(" HTTP/1.1");
    client.println("Host: 192.168.4.2");
    client.println("User-Agent: ArduinoWiFi/1.1");
    client.println("Connection: close");
    client.println();
  } else {
    // if you couldn't make a connection:
    Serial.println("connection failed");
  }
  digitalWrite(YLED, LOW);
}

void error() {
  digitalWrite(RLED, HIGH);
  delay(500);
  digitalWrite(RLED, LOW);
  delay(500);
}

void sendData(char sendData) {
  if (sendData == 1) {
    digitalWrite(YLED, HIGH);
  }
  digitalWrite(YLED, LOW);
}

void receiveData(char receive) {
  if (receive == 1) {
    digitalWrite(GLED, HIGH);
  }
  digitalWrite(GLED, LOW);
}


void printWiFiStatus() {
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
}
