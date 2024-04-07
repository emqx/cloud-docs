# 使用 Paho Python 连接到部署

本文主要介绍如何在 Python 项目中使用 **paho-mqtt** 客户端库 ，实现客户端与 MQTT 服务器的连接、订阅、取消订阅、收发消息等功能。

[paho-mqtt](https://www.eclipse.org/paho/clients/python/) 是目前 Python 中使用较多的 MQTT 客户端库，
它在 Python 2.7.9+ 或 3.6+ 上为客户端类提供了对 MQTT v5.0，v3.1 和 v3.1.1 的支持。它还提供了一些帮助程序功能，使将消息发布到 MQTT 服务器变得非常简单。

## 前置准备

### 获得 MQTT 服务器

- 使用 EMQX 提供的[免费公共 MQTT 服务器](https://www.emqx.com/zh/mqtt/public-mqtt5-broker)（仅支持单向认证），该服务基于 EMQX 的[全托管的 MQTT 消息云服务](https://www.emqx.com/zh/cloud)创建。服务器连接信息如下：

    - 连接地址: **broker.emqx.io**
    - TCP Port: **1883**
    - SSL/TLS Port: **8883**
    - WebSocket 端口: **8083**
    - WebSocket TLS/SSL 端口: **8084**

- 您也可以自己[创建部署](../create/overview.md)，在部署概览下可以查看到连接相关的信息，请确保部署状态为运行中。使用 TCP 端口或 SSL/TLS 端口  测试连接到 MQTT 服务器。如果您是自己创建部署，请设置[认证鉴权](../deployments/auth_overview.md)，在部署控制台**访问控制** > **认证**中设置用户名和密码，用于连接验证。

### 检查 Python 版本
本项目使用 Python 3.8 进行开发测试，可用如下命令确认 Python 的版本。

```
➜  ~ python3 --version             
Python 3.8.6
```

## 安装 MQTT 客户端
1. Pip 是 Python 包管理工具，该工具提供了对 Python 包的查找、下载、安装、卸载的功能，使用以下命令安装 paho-mqtt。

```bash
pip install paho-mqtt
```

2. 导入 Paho MQTT 客户端

```python
from paho.mqtt import client as mqtt_client
```

## 通过 TCP 端口连接

> 请在控制台的部署概览找到相关的地址以及端口信息，需要注意如果是基础版，端口不是 1883 端口，请确认好端口

- 设置 MQTT Broker 连接地址，端口以及 topic，同时我们调用 Python `random.randint` 函数随机生成 MQTT 客户端 id。

```python
broker = 'broker.emqx.io'
port = 1883
topic = 'python/mqtt'
client_id = f'python-mqtt-{random.randint(0, 1000)}'
# 如果 broker 需要鉴权，设置用户名密码
username = 'emqx'
password = '**********'
```

- 编写连接回调函数 `on_connect`，该函数将在客户端连接后被调用，在该函数中可以依据 `rc` 来判断客户端是否连接成功。

```python
def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    # Set Connecting Client ID
    client = mqtt_client.Client(client_id)
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client
```

## 通过 SSL/TLS 端口连接

> 请在控制台的部署概览找到相关的地址以及端口信息，需要注意如果是基础版，端口不是 8883 端口，请确认好端口

本节介绍了如何通过 SSL/TLS 单向认证方式连接到部署。若您需使用双向认证方式，可以参考[这里](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_sub_two_way_tls.py)。

- 设置 MQTT Broker 连接地址，端口以及 topic，同时我们调用 Python `random.randint` 函数随机生成 MQTT 客户端 id。

```python
broker = 'broker.emqx.io'
port = 8883
topic = 'python/mqtt'
client_id = f'python-mqtt-{random.randint(0, 1000)}'
# 如果 broker 需要鉴权，设置用户名密码
username = 'emqx'
password = '**********'
```

- 设置 CA 证书，如果您使用 Serverless 或者基础版部署，您可以在部署概览中下载 CA 证书文件。如果您使用专业版部署，请参考[专业版 TLS/SSL 配置](../deployments/tls_ssl.md)进行证书配置。
- 编写连接回调函数 `on_connect`，该函数将在客户端连接后被调用，在该函数中可以依据 `rc` 来判断客户端是否连接成功。

```python
def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)
    # Set Connecting Client ID
    client = mqtt_client.Client(client_id)
    # Set CA certificate
    client.tls_set(ca_certs='./server-ca.crt')
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client
```

## 订阅和发布

本节主要介绍了如何在已连接到部署的情况下订阅主题并发布消息。

### 订阅主题

- 设置将要订阅的主题及对应 [QoS 等级](https://www.emqx.com/zh/blog/introduction-to-mqtt-qos)。
- 编写消息回调函数 `on_message`，该函数将在客户端从 MQTT Broker 收到消息后被调用，在该函数中我们将打印出订阅的 topic 名称以及接收到的消息内容。

```python
def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

    client.subscribe(topic=topic, qos=0)
    client.on_message = on_message
```

### 取消订阅

通过以下代码取消订阅，此时应指定取消订阅的主题。

```python
def unsubscribe(client: mqtt_client):
    client.on_message = None
    client.unsubscribe(topic)
```

### 发布消息
- 发布消息时需要告知 MQTT Broker 目标主题及消息内容。
- 首先定义一个 while 循环语句，在循环中我们将设置每秒调用 MQTT 客户端 `publish` 函数向 `python/mqtt` 主题发送消息。

```python
def publish(client):
    msg_count = 0
    while True:
        time.sleep(1)
        msg = f"messages: {msg_count}"
        result = client.publish(topic, msg)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
        msg_count += 1
```

### 接收消息

通过以下代码指定客户端对消息事件进行监听，并在收到消息后执行回调函数，将接收到的消息及其主题打印到控制台。

```python
def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
        
client.on_message = on_message
```

### 断开连接

如客户端希望主动断开连接，可以通过如下代码实现：

```python
def disconnect(client: mqtt_client):
    client.loop_stop()
    client.disconnect()
```

以上部分仅列出了一些关键代码，项目完整代码请见[这里](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Python3/)，您可以进行下载并体验。

## 完整代码

**消息发布代码**

```python
# python 3.8

import random
import time

from paho.mqtt import client as mqtt_client


broker = 'broker.emqx.io'
port = 1883
topic = "python/mqtt"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 1000)}'
username = 'emqx'
password = '**********'


def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    # client.tls_set(ca_certs='./server-ca.crt')
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def publish(client):
    msg_count = 0
    while True:
        time.sleep(1)
        msg = f"messages: {msg_count}"
        result = client.publish(topic, msg)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
        msg_count += 1


def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)


if __name__ == '__main__':
    run()
```

**消息订阅代码**

```python
# python3.8

import random

from paho.mqtt import client as mqtt_client


broker = 'broker.emqx.io'
port = 1883
topic = "python/mqtt"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 100)}'
username = 'emqx'
password = '**********'


def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    # client.tls_set(ca_certs='./server-ca.crt')
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

    client.subscribe(topic)
    client.on_message = on_message


def run():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()


if __name__ == '__main__':
    run()
```

## 测试验证

运行代码，控制台输出如下

### 消息发布

![python_pub](./_assets/python_pub.png)

### 消息订阅

![python_sub](./_assets/python_sub.png)

## 更多内容

以上为您演示了如何使用 paho-mqtt 客户端库连接到 EMQX Cloud，可以在 [这里](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Python3/) 下载到示例的源码。
同时也可以在 [GitHub](https://github.com/emqx/MQTT-Client-Examples) 上找到更多其他语言的 Demo 示例。