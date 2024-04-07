# 使用 ESP32 + MicroPython 连接

本文主要介绍如何在 ESP32 等微控制器中通过 MicroPython 的 umqtt 模块，实现与 MQTT 服务器的连接、订阅、收发消息等功能。

[MicroPython](https://micropython.org/) 是 Python3 编程语言的精简高效实现，用 C 编写，经过优化以在微控制器上运行。MicroPython 包含了精选的核心 Python 标准库，也提供了 bluetooth、machine 这类特定的库，以便在 ESP32、Raspberry Pi Pico 这些不同的硬件平台中使用通用的 API 控制硬件底层。

[umqtt](https://github.com/micropython/micropython-lib/tree/master/micropython/umqtt.simple) 是一个用于 MicroPython 的简单 MQTT 客户端，支持消息回调，并且为接收消息提供了阻塞和非阻塞的两种实现。但目前它仅支持 MQTT v3.1.1，并且尚不支持 QoS 2。

## 前置准备

### 1. MQTT 服务器部署

您可以直接使用 EMQX 提供的 [免费公共 MQTT 服务器](https://www.emqx.com/zh/mqtt/public-mqtt5-broker)，该服务基于 EMQX 的 [MQTT 物联网云平台](https://www.emqx.com/zh/cloud) 创建。服务器接入信息如下：

- 连接地址: **broker.emqx.io**
- TCP 端口: **1883**
- TLS/SSL 端口: **8883**

您也可以自行 [创建部署](../create/overview.md)，创建完成后您可以在部署概览中查看连接相关的信息，包括连接地址、端口等。

在确认部署处于运行状态后，您还需要在部署控制台 **访问控制** > [**认证**](../deployments/default_auth.md) 中添加客户端将在连接时使用的用户名和密码，以允许该客户端接入 EMQX。

### 2. 安装 MicroPython 固件

如何在 ESP32、ESP8266、Raspberry Pi Pico 这些硬件平台上安装 MicroPython 不是本文的重点，但它是必要的。如果您还没有安装 MicroPython，那么可以先参考这里：

[如何在 ESP32 中安装 MicroPython？](https://docs.micropython.org/en/latest/esp32/tutorial/intro.html#)

[如何在 ESP8266 中安装 MicroPython？](https://docs.micropython.org/en/latest/esp8266/tutorial/intro.html#intro)

[如何在 Raspberry Pi Pico 中安装 MicroPython？](https://www.raspberrypi.com/documentation/microcontrollers/micropython.html#drag-and-drop-micropython)

## 连接

### 接入网络

首先，您需要让设备接入 WiFi 网络，这样才能连接到外部的 MQTT Server。

您可以创建一个 `wifi.py` 文件然后添加以下代码，然后将 "NAME OF YOUR WIFI NETWORK" 和 "PASSWORD OF YOUR WIFI NETWORK" 替换成自己的 WiFi 网络名称和密码：

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

您可以在 `main.py` 文件中导入这个模块并运行 `wifi.connect()`，以便让设备在每次启动后自动连接到网络：

```
import wifi

wifi.connect()
```

> `main.py` 需要自行创建。

### 连接参数

接下来，您需要初始化一些连接信息，分别是 MQTT 服务器地址、端口以及连接时使用的 Client ID、用户名和密码。最后，还有一个您稍后发布和订阅将要使用的主题：

```python
SERVER = "xxxx.ala.cn-hangzhou.emqxsl.cn"
PORT = 8883
CLIENT_ID = 'micropython-client-{id}'.format(id = random.getrandbits(8))
USERNAME = 'emqx'
PASSWORD = 'public'
TOPIC = "raspberry/mqtt"
```

> 如果连接的 MQTT Server 没有启用认证，那么您可以无需设置用户名和密码。

### 使用 TCP 连接

使用前面初始化的连接参数发起连接：

```python
from umqtt.simple import MQTTClient

def connect():
    client = MQTTClient(CLIENT_ID, SERVER, PORT, USERNAME, PASSWORD)
    client.connect()
    print('Connected to MQTT Broker "{server}"'.format(server = SERVER))
    return client
```

### 使用 SSL/TLS 连接

为了校验服务端证书是否合法，您需要为客户端指定信任的 CA 证书，如果您使用的是免费公共 MQTT 服务器，CA 证书可以从 [此处](https://www.emqx.com/zh/mqtt/public-mqtt5-broker) 下载。如果您选择创建自己的部署，那么 CA 证书需要在部署概览页面中下载。

MicroPython 目前仅支持 PEM 格式的证书，所以您不需要对下载得到的证书进行格式转换。以下代码表示，您将 `cadata` 设置为读取到的 CA 证书文件内容，表示信任该 CA 证书，将 `cert_reqs` 设置为 `ssl.CERT_REQUIRED`，表示客户端将要求服务端在握手时发送证书。

```
with open('emqxsl-ca.crt', 'rb') as f:
    cadata = f.read()
ssl_params = dict()
ssl_params["cert_reqs"] = ssl.CERT_REQUIRED
ssl_params["cadata"] = cadata
```

如果您部署的是 EMQX Serverless，那么还需要通过 `server_hostname` 选项将 SNI 设置为您的连接地址，这一步是非常必要的，因为 Serverless 需要根据 SNI 来区分租户，而 MicroPython 默认不会发送 SNI，这将导致您连接失败：

```
ssl_params["server_hostname"] = SERVER
```

完整的连接代码如下：

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

> 如果想要使用 `cert_reqs`、`cadata` 参数， 您必须使用 MicroPython 1.20.0 及以上版本。而如果未指定这些参数，客户端将不具备验证服务端身份的能力，这将引入一定的中间人攻击的风险。


### 设置回调并订阅主题

接下来，您还需要实现 `on_message` 回调函数，它将在消息到达时被调用，您可以在这里实现消息的处理代码。在本示例中我们仅仅打印了消息的主题和内容。

您最好在订阅主题前将客户端的回调设置为 `on_message` 函数，以免错过消息：

```python
def on_message(topic, msg):
    print("Received '{payload}' from topic '{topic}'\n".format(
        payload = msg.decode(), topic = topic.decode()))

def subscribe(client):
    client.set_callback(on_message)
    client.subscribe(TOPIC)
```

### 循环发布和接收

在本示例中，我们使用同一个客户端来进行循环的消息发布和接收。以下代码的主要作用就是不断构造新的消息内容并发布，然后调用 `wait_msg()` 阻塞地等待从 MQTT 服务端转发的消息。一旦消息到达，就会触发 `on_message` 回调打印消息内容，回调完成后客户端将等待一秒然后进入下一次循环：

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

### 主函数

在主函数中，我们首先调用 `wifi.connect()` 让设备接入网络，然后依次调用前面实现的连接、订阅和循环发布函数：

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

**WiFi 连接代码：**

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

## 测试验证

运行代码，控制台输出如下：

```
Waiting for connection...
Waiting for connection...
Connected on 192.168.0.145
Connected to MQTT Broker "xxxx.ala.cn-hangzhou.emqxsl.cn"
Send '{"msg": 0}' to topic 'raspberry/mqtt'
Received '{"msg": 0}' from topic 'raspberry/mqtt'

Send '{"msg": 1}' to topic 'raspberry/mqtt'
Received '{"msg": 1}' from topic 'raspberry/mqtt'

Send '{"msg": 2}' to topic 'raspberry/mqtt'
Received '{"msg": 2}' from topic 'raspberry/mqtt'
```

## 更多内容

现在，您已经可以在 ESP32 中通过 MicroPython 的 `umqtt` 模块成功连接到 EMQX Platform。您可以在 [这里](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Micropython) 下载完整的示例代码。同时也可以在 [GitHub](https://github.com/emqx/MQTT-Client-Examples) 上找到更多其他语言的 Demo 示例。
