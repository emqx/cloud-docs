# Connect to the Deployment with C SDK

Eclipse Paho C and Eclipse Paho Embedded C are all client libraries in C language (MQTT C Client) under the Eclipse Paho project, and are full-featured MQTT clients written in ANSI C.

Eclipse Paho Embedded C can be used on the desktop operating system, but mainly for embedded environments such as mbed, Arduino and FreeRTOS .

The client has synchronous/asynchronous APIs, which start with MQTTClient and MQTTAsync:

* The synchronous API is designed to be simpler and more useful and some calls will be blocked until the operation is completed, which is easier for programming;
* There is only one calling block API-waitForCompletion in the asynchronous API, which is notified through the callback, and is more suitable for the non-main thread environment.

## Building from source
The continuous integration builds can be found on Travis-CI for Linux and Mac, and AppVeyor for Windows.

### Linux/Mac
```bash
git clone https://github.com/eclipse/paho.mqtt.c.git
cd org.eclipse.paho.mqtt.c.git
make
sudo make install
```

### Windows
```bash
mkdir build.paho

cd build.paho

call "C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\vcvarsall.bat" x64

cmake -G "NMake Makefiles" -DPAHO_WITH_SSL=TRUE -DPAHO_BUILD_DOCUMENTATION=FALSE -DPAHO_BUILD_SAMPLES=TRUE -DCMAKE_BUILD_TYPE=Release -DCMAKE_VERBOSE_MAKEFILE=TRUE ..

nmake
```


## Paho C Usage example
For detailed descriptions of the comparison, download, and usage of the two MQTT client libraries related to the C language, please move to the project homepage to view. This example contains the complete code of the Paho C in C language connecting to the EMQ X Broker, sending and receiving messages:
```c
#include "stdio.h"
#include "stdlib.h"
#include "string.h"

#include "MQTTClient.h"

#define ADDRESS     "tcp://broker.emqx.io:1883"
#define CLIENTID    "emqx_test"
#define TOPIC       "testtopic/1"
#define PAYLOAD     "Hello World!"
#define QOS         1
#define TIMEOUT     10000L

int main(int argc, char* argv[])
{
    MQTTClient client;
    MQTTClient_connectOptions conn_opts = MQTTClient_connectOptions_initializer;
    MQTTClient_message pubmsg = MQTTClient_message_initializer;
    MQTTClient_deliveryToken token;
    int rc;

    MQTTClient_create(&client, ADDRESS, CLIENTID,
        MQTTCLIENT_PERSISTENCE_NONE, NULL);

    // MQTT Connection parameters
    conn_opts.keepAliveInterval = 20;
    conn_opts.cleansession = 1;

    if ((rc = MQTTClient_connect(client, &conn_opts)) != MQTTCLIENT_SUCCESS)
    {
        printf("Failed to connect, return code %d\n", rc);
        exit(-1);
    }

    // Publish message
    pubmsg.payload = PAYLOAD;
    pubmsg.payloadlen = strlen(PAYLOAD);
    pubmsg.qos = QOS;
    pubmsg.retained = 0;
    MQTTClient_publishMessage(client, TOPIC, &pubmsg, &token);
    printf("Waiting for up to %d seconds for publication of %s\n"
            "on topic %s for client with ClientID: %s\n",
            (int)(TIMEOUT/1000), PAYLOAD, TOPIC, CLIENTID);
    rc = MQTTClient_waitForCompletion(client, token, TIMEOUT);
    printf("Message with delivery token %d delivered\n", token);

    // Disconnect
    MQTTClient_disconnect(client, 10000);
    MQTTClient_destroy(&client);
    return rc;
}
```