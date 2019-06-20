#include <VirtualWire.h>

byte sourceID = 0x6D;
byte desID = 0x00;
byte lastMessage[8];

void setup() {
  Serial.begin(9600);
  Serial.println("setup");

  // Initialise the IO and ISR
  vw_set_ptt_inverted(true); // Required for DR3100
  vw_setup(2000);  // Bits per sec
}

void loop() {
  F12();
}


void F01() {
  delay(500);
  vw_send(lastMessage, sizeof(lastMessage));
  vw_wait_tx();
}

void F06() {

}

void F12() {
  byte msg[] = {0x01, 0x05, 0xEC, sourceID, desID, 0x06, 0x04, 0};
  msg[7] = lrc(msg);
  for (int i = 0; i < sizeof(msg); i++)
  {
      Serial.print(msg[i], HEX);
      Serial.print(" ");
  }
}

byte lrc(byte bytes[]){
  byte lrc = 0;
  for(int i=0; i < sizeof(bytes)-1; i++){
    lrc ^=bytes[i];
  }
  return lrc;
}
