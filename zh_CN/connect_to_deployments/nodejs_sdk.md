# 使用 Node.js 通过 MQTT.js 连接到部署

本文主要介绍如何在 Node.js 项目中使用 `MQTT.js` ，实现客户端与 MQTT 服务器的连接、订阅、收发消息、取消订阅等功能。

## 前置准备

本项目使用 Node.js v16.19.1 进行开发和测试，读者可用如下命令确认 Node.js 的版本。

```shell
node --version

v16.19.1
```

### 获得 MQTT 服务器

- 使用 EMQX 提供的[免费公共 MQTT 服务器](https://www.emqx.com/zh/mqtt/public-mqtt5-broker)（仅支持单向认证），该服务基于 EMQX 的[全托管的 MQTT 消息云服务](https://www.emqx.com/zh/cloud)创建。服务器连接信息如下：

  - 连接地址: **broker.emqx.io**
  - TCP Port: **1883**
  - SSL/TLS Port: **8883**
  - WebSocket 端口: **8083**
  - WebSocket TLS/SSL 端口: **8084**

- 您也可以自己[创建 EMQX Cloud 部署](../create/overview.md)，待部署状态为**运行中**，点击部署卡片进入概览页面便可获取相关连接信息。此外，您还需在部署的 `认证鉴权` > `认证` 页面中设置用户名和密码，用于后续的连接验证。

## 安装依赖

[MQTT.js](https://github.com/mqttjs/MQTT.js) 是一个完全开源的 MQTT 协议的客户端库，使用 JavaScript 编写，可用于 Node.js 和浏览器环境。有关 `MQTT.js` 的更多内容和使用方法，您可以前往查阅 [MQTT.js GitHub 页面](https://github.com/mqttjs/MQTT.js#table-of-contents)。

MQTT.js 支持通过 NPM 或 Yarn 安装。本示例将通过 Yarn 命令安装 MQTT.js。

- 使用 NPM 或 Yarn：

  安装 MQTT.js 依赖

  ```shell
  # 使用 NPM
  npm install mqtt
  # 或使用 Yarn
  yarn add mqtt
  ```


完成后我们在当前目录下新建一个 index.js 文件作为项目的入口文件，在该文件中来实现 MQTT 连接测试的完整逻辑。

## 通过 TCP 端口连接

通过以下代码设置客户端 ID、用户名及密码，客户端 ID 应具有唯一性。

```js
const clientId = "emqx_vue3_" + Math.random().toString(16).substring(2, 8);
const username = "emqx_test";
const password = "emqx_test";
```

通过以下代码建立客户端与 MQTT Broker 的连接。

```js
const client = mqtt.connect("mqtt://broker.emqx.io:1883", {
  clientId,
  username,
  password,
  // ...other options
});
```

## 通过 TCP TLS/SSL 端口连接

启用 TLS/SSL 加密时，连接[参数选项](https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options)与通过 TCP 端口建立连接一致，您只需注意将协议改为 `mqtts`，且匹配正确的端口号即可。

通过以下代码建立客户端与 MQTT Broker 的连接。

```js
const client = mqtt.connect("mqtts://broker.emqx.io:8883", {
  clientId,
  username,
  password,
  // ...other options
});
```

## 通过 WebSocket 端口连接

MQTT-WebSocket 统一使用 `/path` 作为连接路径，连接时需指明，而 EMQX Broker 使用的路径为 `/mqtt`。

因此使用 WebScoket 连接时，除了需要修改端口号以及切换协议为 `ws` 之外，您还需要加上 `/mqtt` 路径。

通过以下代码建立客户端与 MQTT Broker 的连接。

```js
const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt", {
  clientId,
  username,
  password,
  // ...other options
});
```

## 通过 WebSocket TLS/SSL 端口连接

启用 TLS/SSL 加密时，连接[参数选项](https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options)与通过 WebSocket 端口建立连接一致，您只需注意将协议改为 `wss`，且匹配正确的端口号即可。

通过以下代码建立客户端与 MQTT Broker 的连接。

```js
const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt", {
  clientId,
  username,
  password,
  // ...other options
});
```



## 订阅和发布

### 订阅主题

设置将要订阅的主题及对应 [QoS 等级](https://www.emqx.com/zh/blog/introduction-to-mqtt-qos)。

```javascript
const topic = '/nodejs/mqtt'
const qos = 0

client.subscribe(topic, { qos }, (error) => {
  if (error) {
    console.log('subscribe error:', error)
    return
  }
  console.log(`Subscribe to topic '${topic}'`)
})
```

### 取消订阅

通过以下代码取消订阅，此时应指定取消订阅的主题及对应的 QoS 等级。

```js
const topic = '/nodejs/mqtt'
const qos = 0
client.unsubscribe(topic, { qos }, (error) => {
  if (error) {
    console.log('unsubscribe error:', error)
    return
  }
  console.log(`unsubscribed topic: ${topic}`)
})
```

### 发布消息

发布消息时需要告知 MQTT Broker 目标主题及消息内容。

```js
// 设置发布的主题、消息及 QoS
const topic = '/nodejs/mqtt'
const payload = 'nodejs mqtt test'
const qos = 0

client.publish(topic, payload, { qos }, (error) => {
  if (error) {
    console.error(error)
  }
})
```

### 接收消息

通过以下代码指定客户端对消息事件进行监听，并在收到消息后执行回调函数，将接收到的消息及其主题打印到控制台。

```js
client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})
```

### 断开连接

如客户端希望主动断开连接，可以通过如下代码实现：

```js
if (client.connected) {
  try {
    client.end(false, () => {
      console.log('disconnected successfully')
    })
  } catch (error) {
    console.log('disconnect error:', error)
  }
}
```

以上部分仅列出了一些关键代码，项目完整代码请见：[MQTT-Client-Node.js](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Node.js)，您可以进行下载并体验。

## 测试验证

我们在 package.json 文件中的脚本字段中添加一行启动脚本。

```json
"scripts": {
  "start": "node index.js"
}
```

然后就可以简单使用 `npm start` 来运行项目。

```shell
npm start
```

运行后我们可以看到控制的输出信息如下：

![NodeJS MQTT 启动](https://assets.emqx.com/images/9897e6cd56163dfe7139cf6d84361e63.png)

我们看到了客户端已经成功连接到 [MQTT 服务器](https://www.emqx.com/zh/cloud) 并且订阅主题、接收和发布消息成功。此时我们再使用 [MQTT 5.0 客户端工具 - MQTT X](https://mqttx.app/zh) 作为另一个客户端进行消息收发测试。

![MQTT 5.0 客户端工具 - MQTT X](https://assets.emqx.com/images/5c841598f78eed0b186572165832f861.png)

可以看到控制台内打印出了 MQTT X 发送过来的消息。

![控制台接收到 MQTT X 发送的消息](https://assets.emqx.com/images/02d8a35312ca1309f18a628dacca8910.png)

## 更多内容

综上所述，我们实现了在 Node.js 项目中创建 MQTT 连接，模拟了客户端与 MQTT 服务器进行订阅、收发消息、取消订阅以及断开连接的场景。可以在 [MQTT-Client-Node.js 页面](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Node.js)下载完整的示例源码，同时也欢迎前往 [MQTT Client 示例页面](https://github.com/emqx/MQTT-Client-Examples)探索更多其他语言的 Demo 示例。
