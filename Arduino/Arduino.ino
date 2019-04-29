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

void setup() {
  Serial.begin(9600);
  pinMode(BUTTON, INPUT);
  pinMode(GLED, OUTPUT);
  pinMode(RLED, OUTPUT);
  pinMode(YLED, OUTPUT);

  // check voor WiFi module
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    // stop
    while (true) {
      error();
    }
  }

  //check de firmware
  String fv = WiFi.firmwareVersion();
  if (fv < "1.0.0") {
    Serial.println("Please upgrade the firmware");
  }


  // print de naam (SSID)
  Serial.print("Creating access point named: ");
  Serial.println(ssid);

  status = WiFi.beginAP(ssid, pass);

  if (status != WL_AP_LISTENING) {
    Serial.println("Creating access point failed");
    // don't continue
    while (true) {
      error();
    }
  }

  // wacht 10 seconden
  delay(10000);
  server.begin();
  printWiFiStatus();
}


void loop() {
  switch (state) {
    case 1:
      error();
    default:
      break;
  }

  while (client.available()) {
    char c = client.read();
    Serial.write(c);
  }
  if (status != WiFi.status()) {
    status = WiFi.status();
  }

  if (digitalRead(BUTTON) == HIGH) {
    httpRequest(20);
  }

  if (LEDStatus == 1) {
    digitalWrite(RLED, LOW);
  } else {
    digitalWrite(RLED, HIGH);
  }

}

void httpRequest(int temp) {
  client.stop();
  digitalWrite(YLED, HIGH);
  if (client.connect(api, 3000)) {
    Serial.println("connecting to API");
    sendData(1);
    client.print("GET /arduino?temp=");
    client.print(String(temp));
    client.println(" HTTP/1.1");
    client.println("Host: example.org");
    client.println("User-Agent: ArduinoWiFi/1.1");
    client.println("Connection: close");
    client.println();

    // note the time that the connection was made:
    if (client.read() == "ok") {
      client.println();
      digitalWrite(YLED, LOW);
    }
  }

} else {
  // if you couldn't make a connection:
  Serial.println("connection failed");
}
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
  // print de SSID van het netwerk
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print WiFi shield IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
}
