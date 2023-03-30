# Connect to the Deployment with ESP32

This article mainly introduces how to use `PubSubClient` in the ESP32 project, and implement the connection, subscription, messaging, unsubscribing and other functions between the client and MQTT broker.

[ESP32](https://www.espressif.com/en/products/socs/esp32) is an upgraded version of ESP8266. In addition to the Wi-Fi module, this module also includes a Bluetooth 4.0 module. The dual-core CPU operates at a frequency of 80 to 240 MHz. It contains two Wi-Fi and Bluetooth modules and various input and output pins. ESP32 is an ideal choice for IoT projects

[MQTT](https://www.emqx.com/en/mqtt) is a kind of **lightweight IoT messaging protocol** based on the publish/subscribe model. This protocol provides one-to-many message distribution and decoupling of applications. It has several advantages which are low transmission consumption and protocol data exchange, minimized network traffic, three different service quality levels of message which can meet different delivery needs.

## Preconditions

> 1.  The deployment has been created. You can view connection-related information under Deployment Overview. Please make sure that the deployment status is running. At the same time, you can use WebSocket to test the connection to the MQTT server.
> 2.  Set the user name and password in `Authentication & ACL` > `Authentication` for connection verification.

This article uses the [Arduino IDE](https://www.arduino.cc/en/software) as the code editor and uploader. The open-source Arduino Software (IDE) makes it easy to write code and upload it to the board. This software can be used with any Arduino board.

## Install dependencies

1. Install ESP32 development board
   Click Tools -> Development Board -> Development Board Management -> Search ESP32 -> Install
2. Install PubSub client
   Project -> Load library -> Library manager... -> Search PubSubClient -> Install PubSubClient by Nick O’Leary

## Connection

> Please find the relevant address and port information in the Deployment Overview of the Console. Please note that if it is the basic edition, the port is not 1883 or 8883, please confirm the port.

### Connection settings

This article will use the [free public MQTT broker](https://www.emqx.com/en/mqtt/public-mqtt5-broker) provided by EMQX. This service was created based on the [EMQX Cloud](https://www.emqx.com/en/cloud). The information about broker access is as follows:

- Broker: **broker.emqx.io**
- TCP Port: **1883**
- WebSocket Port: **8083**

### First, we will import the WiFi and PubSubClient libraries.

```c
#include <WiFi.h>
#include <PubSubClient.h>
```

### Set the Wi-Fi name and password, as well as the MQTT server connection address and port, and set the topic to "esp32/test".

```c
// WiFi
const char *ssid = "mousse"; // Enter your WiFi name
const char *password = "qweqweqwe";  // Enter WiFi password

// MQTT Broker
const char *mqtt_broker = "broker.emqx.io";
const char *topic = "esp32/test";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
const int mqtt_port = 1883;
```

### Open a serial connection to output the results of the program and connect to the Wi-Fi network.

```c
// Set software serial baud to 115200;
Serial.begin(115200);
// connecting to a WiFi network
WiFi.begin(ssid, password);
while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
}
```

### Use PubSubClient to connect to the Public MQTT broker.

```c
client.setServer(mqtt_broker, mqtt_port);
client.setCallback(callback);
while (!client.connected()) {
    String client_id = "esp32-client-";
    client_id += String(WiFi.macAddress());
    Serial.printf("The client %s connects to the public mqtt broker\n", client_id.c_str());
    if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
        Serial.println("Public emqx mqtt broker connected");
    } else {
        Serial.print("failed with state ");
        Serial.print(client.state());
        delay(2000);
    }
}
```

### After the MQTT server is successfully connected, ESP32 will publish messages to the MQTT server of esp/test and subscribe to the topic messages of esp/test.

```c
// publish and subscribe
client.publish(topic, "Hi EMQX I'm ESP32 ^^");
client.subscribe(topic);
```

### Set the callback function to print the topic name to the serial port and print the message received from the esp32/test topic.

```c
void callback(char *topic, byte *payload, unsigned int length) {
    Serial.print("Message arrived in topic: ");
    Serial.println(topic);
    Serial.print("Message:");
    for (int i = 0; i < length; i++) {
        Serial.print((char) payload[i]);
    }
    Serial.println();
    Serial.println("-----------------------");
}
```

### The full code

```c
#include <WiFi.h>
#include <PubSubClient.h>

// WiFi
const char *ssid = "mousse"; // Enter your WiFi name
const char *password = "qweqweqwe";  // Enter WiFi password

// MQTT Broker
const char *mqtt_broker = "broker.emqx.io";
const char *topic = "esp32/test";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
 // Set software serial baud to 115200;
 Serial.begin(115200);
 // connecting to a WiFi network
 WiFi.begin(ssid, password);
 while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.println("Connecting to WiFi..");
 }
 Serial.println("Connected to the WiFi network");
 //connecting to a mqtt broker
 client.setServer(mqtt_broker, mqtt_port);
 client.setCallback(callback);
 while (!client.connected()) {
     String client_id = "esp32-client-";
     client_id += String(WiFi.macAddress());
     Serial.printf("The client %s connects to the public mqtt broker\n", client_id.c_str());
     if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
         Serial.println("Public emqx mqtt broker connected");
     } else {
         Serial.print("failed with state ");
         Serial.print(client.state());
         delay(2000);
     }
 }
 // publish and subscribe
 client.publish(topic, "Hi EMQX I'm ESP32 ^^");
 client.subscribe(topic);
}

void callback(char *topic, byte *payload, unsigned int length) {
 Serial.print("Message arrived in topic: ");
 Serial.println(topic);
 Serial.print("Message:");
 for (int i = 0; i < length; i++) {
     Serial.print((char) payload[i]);
 }
 Serial.println();
 Serial.println("-----------------------");
}

void loop() {
 client.loop();
}
```

## Test

1. Open the serial monitor, select 115200 baud rate, and check the ESP32 connection status.
   ![esp32_connection](./_assets/esp32_connection.png)
2. Establish the connection between MQTT X client and MQTT broker, and send messages to ESP32
   ![esp32_mqttx](./_assets/esp32_mqttx.png)

## More

In summary, we have implemented the creation of an MQTT connection in a ESP32 project, simulated subscribing, sending and receiving messages, unsubscribing, and disconnecting between the client and MQTT broker. You can download the source code of the example [here](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-ESP32), and you can also find more demo examples in other languages on [GitHub](https://github.com/emqx/MQTT-Client-Examples).
