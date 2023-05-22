## Connect with ESP32 + MicroPython

This article will mainly introduce how to use module `umqtt` of MicroPython in microcontrollers such as ESP32 to realize functions such as connecting, subscribing, and message sending and receiving with the MQTT server.

[MicroPython](https://micropython.org/) is a lean and efficient implementation of the Python3 programming language, written in C, optimized to run on microcontrollers. MicroPython includes a selection of core Python standard libraries, and also provides specific libraries such as bluetooth and machine to use common APIs to control the underlying hardware in different hardware platforms such as ESP32 and Raspberry Pi Pico.

[umqtt](https://github.com/micropython/micropython-lib/tree/master/micropython/umqtt.simple) is a simple MQTT client for MicroPython that supports message callbacks and provides two implementations of blocking and non-blocking for receiving messages. But currently it only supports MQTT v3.1.1 and does not support QoS 2 yet.

## Prerequisites

### 1. Deploy MQTT Broker

You can directly use the [Free Public MQTT Server](https://www.emqx.com/en/mqtt/public-mqtt5-broker) provided by EMQX, which is based on EMQX's [MQTT IoT Cloud Platform](https://www.emqx.com/en/cloud) created. The server access information is as follows:

- Connection Address: **broker.emqx.io**
- TCP Port: **1883**
- TLS/SSL Port: **8883**

You can also [create a deployment](../create/overview.md) by yourself. After the creation is complete, you can view the connection-related information in the deployment overview, including connect address, port, etc.

After confirming that the deployment is running, you also need to add the username and password that the client will use when connecting in `Authentication & ACL` > [`Authentication`](../deployments/auth_overview.md). This will allow the client to access EMQX.

### 2. Install MicroPython Firmware

How to install MicroPython on hardware platforms such as ESP32, ESP8266, and Raspberry Pi Pico is not the focus of this article, but it is necessary. If you have not installed MicroPython, you can refer to here first:

[How to install MicroPython on ESP32?](https://docs.micropython.org/en/latest/esp32/tutorial/intro.html#)

[How to install MicroPython on ESP8266?](https://docs.micropython.org/en/latest/esp8266/tutorial/intro.html#intro)

[How to install MicroPython on Raspberry Pi Pico?](https://www.raspberrypi.com/documentation/microcontrollers/micropython.html#drag-and-drop-micropython)

## Connect

### Access Network

First, you need to connect the device to the WiFi network, so as to connect to the external MQTT Server.

You can create a `wifi.py` file and add the following code, then replace "NAME OF YOUR WIFI NETWORK" and "PASSWORD OF YOUR WIFI NETWORK" with your own WiFi network name and password:

```
import network
import time

def connect():
	ssid = 'NAME OF YOUR WIFI NETWORK'
	password = 'PASSWORD OF YOUR WIFI NETWORK'
	wlan = network.WLAN(network.STA_IF)
	wlan.active(True)
	wlan.connect(ssid, password)
	while wlan.isconnected() == False:
		print('Waiting for connection...')
		time.sleep(1)
	print('Connected on {ip}'.format(ip = wlan.ifconfig()[0]))
```

You can import this module in our `main.py` file and run `wifi.connect()` to have the device automatically connect to the network after each boot:

```
import wifi

wifi.connect()
```

> `main.py` needs to be created by yourself.

### Connection Parameters

Next, you need to initialize some connection information, which are the MQTT server address, port, and the client ID, username, and password used for connection. Finally, there is a topic that you will use later on for publish and subscribe:

```
SERVER = "xxxx.ala.cn-hangzhou.emqxsl.cn"
PORT = 8883
CLIENT_ID = 'micropython-client-{id}'.format(id = random.getrandbits(8))
USERNAME = 'emqx'
PASSWORD = 'public'
TOPIC = "raspberry/mqtt"
```

> If the connected MQTT Server does not enable authentication, you do not need to set the username and password.

### Connect with TCP

Using the previously initialized connection parameters to connect:

```python
from umqtt.simple import MQTTClient

def connect():
    client = MQTTClient(CLIENT_ID, SERVER, PORT, USERNAME, PASSWORD)
    client.connect()
    print('Connected to MQTT Broker "{server}"'.format(server = SERVER))
    return client
```

### Connect with SSL/TLS

To verify the legality of the server certificate, you need to specify a trusted CA certificate for the client. If you are using a free public MQTT server, you can download the CA certificate from [here](https://www.emqx.com/en/mqtt/public-mqtt5-broker). If you choose to create your own deployment, the CA certificate needs to be downloaded from the deployment overview page.

MicroPython currently only supports PEM format certificates, so you don't need to convert the downloaded certificate format. The following code sets `cadata` as the content of the CA certificate file you've read, indicating trust in this CA certificate. Set `cert_reqs` to `ssl.CERT_REQUIRED` to require the server to send certificates during the handshake.

```
with open('emqxsl-ca.crt', 'rb') as f:
    cadata = f.read()
ssl_params = dict()
ssl_params["cert_reqs"] = ssl.CERT_REQUIRED
ssl_params["cadata"] = cadata
```

If you deploy an EMQX Cloud Serverless instance, you also need to set the SNI (Server Name Indication) to your connection address using the `server_hostname` option. This step is essential because Serverless needs to differentiate tenants based on SNI. By default, MicroPython will not send SNI, which will cause our connection to fail:

```
ssl_params["server_hostname"] = SERVER
```

The complete connection code is as follows:

```python
def connect():
  	with open('emqxsl-ca.crt', 'rb') as f:
        cadata = f.read()
    ssl_params = dict()
    ssl_params["cert_reqs"] = ssl.CERT_REQUIRED
    ssl_params["cadata"] = cadata
    ssl_params["server_hostname"] = SERVER
    client = MQTTClient(CLIENT_ID, SERVER, PORT, USERNAME, PASSWORD, ssl = True, ssl_params = ssl_params)
    client.connect()
    print('Connected to MQTT Broker "{server}"'.format(server = SERVER))
    return client
```

> If you want to use the `cert_reqs` and `cadata` parameters, you must use MicroPython version 1.20.0 or above. If these parameters are not specified, the client will not have the ability to verify the server's identity, which introduces a certain risk of man-in-the-middle attacks.

## Set a callback and subscribe to a topic

Next, you need to implement the `on_message` callback function, which will be called when a message arrives. You can implement your message handling code here. In this example, we simply print the topic and content of the message.

It is recommended to set the client's callback to the `on_message` function before subscribing to any topics to avoid missing messages:

```python
def on_message(topic, msg):
    print("Received '{payload}' from topic '{topic}'\n".format(
        payload = msg.decode(), topic = topic.decode()))

def subscribe(client):
    client.set_callback(on_message)
    client.subscribe(TOPIC)
```

## Cyclically Publish and Receive

In this example, we will use the same client for cyclic message publishing and receiving. The main function of the following code is to continuously construct and publish new message content, and then call `wait_msg()` to block and wait for the message forwarded from the MQTT server.

Once the message arrives, the `on_message` callback will be triggered to print the message content. After the callback finishes the client will wait a second before entering the next loop:

```
def loop_publish(client):
    msg_count = 0
    while True:
        msg_dict = {
            'msg': msg_count
        }
        msg = json.dumps(msg_dict)
        result = client.publish(TOPIC, msg)
        print("Send '{msg}' to topic '{topic}'".format(msg = msg, topic = TOPIC))
        client.wait_msg()
        msg_count += 1
        time.sleep(1)
```

## Main Function

In the main function, we first call `wifi.connect()` to connect the device to the network, and then call the connection, subscription, and cyclic publishing functions implemented earlier in sequence:

```
def run():
    wifi.connect()
    client = connect()
    subscribe(client)
    loop_publish(client)

if __name__ == "__main__":
    run()
```

## Full Code

**The code of connecting to WiFi:**

```python
import network
import time

def connect():
	ssid = 'NAME OF YOUR WIFI NETWORK'
	password = 'PASSWORD OF YOUR WIFI NETWORK'
	wlan = network.WLAN(network.STA_IF)
	wlan.active(True)
	wlan.connect(ssid, password)
	while wlan.isconnected() == False:
		print('Waiting for connection...')
		time.sleep(1)
	print('Connected on {ip}'.format(ip=wlan.ifconfig()[0]))
```

**The code of MQTT client:**

```
def run():
    wifi.connect()
    client = connect()
    subscribe(client)
    loop_publish(client)

if __name__ == "__main__":
    run()
```

## 完整代码

** WiFi 连接代码：**

```python
import network
import time

def connect():
	ssid = 'NAME OF YOUR WIFI NETWORK'
	password = 'PASSWORD OF YOUR WIFI NETWORK'
	wlan = network.WLAN(network.STA_IF)
	wlan.active(True)
	wlan.connect(ssid, password)
	while wlan.isconnected() == False:
		print('Waiting for connection...')
		time.sleep(1)
	print('Connected on {ip}'.format(ip=wlan.ifconfig()[0]))
```

**MQTT 客户端代码：**

```python
import json
import random
import ssl
import time
import wifi

from umqtt.simple import MQTTClient

SERVER = "broker.emqx.io"
PORT = 8883
CLIENT_ID = 'micropython-client-{id}'.format(id=random.getrandbits(8))
USERNAME = 'emqx'
PASSWORD = 'public'
TOPIC = "raspberry/mqtt"

def on_message(topic, msg):
    print("Received '{payload}' from topic '{topic}'\n".format(
        payload = msg.decode(), topic = topic.decode()))

def connect():
    with open('broker.emqx.io-ca.crt', 'rb') as f:
        cadata = f.read()
    ssl_params = dict()
    ssl_params["cert_reqs"] = ssl.CERT_REQUIRED
    ssl_params["cadata"] = cadata
    ssl_params["server_hostname"] = SERVER
    client = MQTTClient(CLIENT_ID, SERVER, PORT, USERNAME, PASSWORD, ssl = True, ssl_params = ssl_params)
    client.connect()
    print('Connected to MQTT Broker "{server}"'.format(server = SERVER))
    return client

def subscribe(client):
    client.set_callback(on_message)
    client.subscribe(TOPIC)

def loop_publish(client):
    msg_count = 0
    while True:
        msg_dict = {
            'msg': msg_count
        }
        msg = json.dumps(msg_dict)
        result = client.publish(TOPIC, msg)
        print("Send '{msg}' to topic '{topic}'".format(msg = msg, topic = TOPIC))
        client.wait_msg()
        msg_count += 1
        time.sleep(1)

def run():
    wifi.connect()
    client = connect()
    subscribe(client)
    loop_publish(client)

if __name__ == "__main__":
    run()
```

### Test

Run the code, the console output is as follows:

```
Connected on 192.168.0.32
Connected to MQTT Broker "broker.emqx.io"
Send '{"msg": 0}' to topic 'raspberry/mqtt'
Received '{"msg": 0}' from topic 'raspberry/mqtt'

Send '{"msg": 1}' to topic 'raspberry/mqtt'
Received '{"msg": 1}' from topic 'raspberry/mqtt'

Send '{"msg": 2}' to topic 'raspberry/mqtt'
Received '{"msg": 2}' from topic 'raspberry/mqtt'
```

## More

Now, you can successfully connect to EMQX Cloud on ESP32 using MicroPython's umqtt module. You can download the sample code at [here](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Micropython). At the same time, you can also find more demo examples in other languages on [GitHub](https://github.com/emqx/MQTT-Client-Examples).
