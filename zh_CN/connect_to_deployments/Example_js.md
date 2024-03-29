# 使用 XXX（语言） 连接到部署


本文主要介绍如何在 XXX 项目中使用 MQTT.js ，实现客户端与 MQTT 服务器的连接、订阅、收发消息、取消订阅等功能。【没有相关模块的话就去掉】

【**不用介绍**使用的语言和什么是 MQTT，可以介绍一下 MQTT.js， 例如：[MQTT.js](https://github.com/mqttjs/MQTT.js)是一个完全开源的 MQTT 协议的客户端库，使用 JavaScript 编写，可用于 Node.js 和浏览器环境。有关 `MQTT.js` 的更多内容和使用方法，您可以前往查阅 [MQTT.js GitHub 页面](https://github.com/mqttjs/MQTT.js#table-of-contents)。】

【其他的补充信息比如： 本篇文档使用 vue ，如果 Vue 3中使用，参考XXXX】

## 前置准备

【描述在连接前必须要了解的概念和必须做的环境搭建】

【例如：理解 MQTT over WebSocket（可以添加链接至概念描述章节）】

### MQTT 服务器部署

- 使用 EMQX 提供的 [免费公共 MQTT 服务器](https://www.emqx.com/zh/mqtt/public-mqtt5-broker)，该服务基于 EMQX 的 [全托管 MQTT 消息云服务](https://www.emqx.com/zh/cloud) 创建。服务器连接信息如下：
  - 连接地址: **broker.emqx.io**
  - WebSocket Port: **8083**
  - WebSocket TLS/SSL Port: **8084**

- 您也可以自己[创建 EMQX Cloud 部署](../create/overview.md)，在部署概览页面可以获取部署实时状态和连接信息，请确保部署状态为运行中。使用 WebSocket 测试连接到 MQTT 服务器。如果您是自己创建部署，请设置[认证鉴权](../deployments/auth_overview.md)。在部署控制台`认证鉴权` > `认证` 中设置用户名和密码，用于连接验证。

### XXX【例如 Vue CLI】

【例如：本项目使用 Vue CLI 创建 Vue 项目进行开发和测试 XXXX】

## 安装依赖

【根据不同的项目编写安装MQTT.js的步骤，以及其他安装依赖】

## 通过 Websocket 端口连接

【公共 MQTT 服务器无需设置用户名和密码，如果创建了自己的部署，须描述如何设置用户名和密码。】

通过以下代码建立客户端与 MQTT Broker 的连接。

```
XXXX
```

## 通过 Websocket TLS/SSL 端口连接

【介绍 ws 端口 和 wss 端口的区别，和连接注意事项等，例如：启用 TLS/SSL 加密时，连接[参数选项](https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options)与通过 WebSocket 端口建立连接一致，您只需注意将协议改为 `wss`，且匹配正确的端口号即可。】

通过以下代码建立客户端与 MQTT Broker 的连接。

```
XXXX
```

## 订阅和发布

本节主要介绍了如何在已连接到部署的情况下订阅主题并发布消息。

### 订阅主题

设置将要订阅的主题及对应 [QoS 等级](https://www.emqx.com/zh/blog/introduction-to-mqtt-qos)。

【根据不同的项目补充其他解释信息】

```js
xxxx
```

### 取消订阅

通过以下代码取消订阅，此时应指定取消订阅的主题及对应的 QoS 等级。

【根据不同的项目补充其他解释信息】

```js
xxxx
```

### 发布消息

发布消息时需要告知 MQTT Broker 目标主题及消息内容。

【根据不同的项目补充其他解释信息】

```js
xxxx
```

### 接收消息

通过以下代码指定客户端对消息事件进行监听，并在收到消息后执行回调函数，将接收到的消息及其主题打印到控制台。
【根据不同的项目补充其他解释信息】

```js
xxxx
```

### 断开连接

如客户端希望主动断开连接，可以通过如下代码实现：

```
XXXX
```

以上部分仅列出了一些关键代码，项目完整代码请见：XXXX，您可以进行下载并体验。

## 测试验证
您可以下载我们使用 XXX 编写好的[浏览器应用 Demo](XXX)。了解如何编写和使用创建连接、订阅主题、收发消息、取消订阅、断开连接等功能。

【测试图】



## 更多内容

综上所述，我们实现了在 XXX 项目中创建 MQTT 连接，使用客户端与 MQTT 服务器进行订阅、收发消息、取消订阅以及断开连接的场景。可以在 [这里](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-ESP8266) 下载到示例的源码，同时也可以在 [GitHub](https://github.com/emqx/MQTT-Client-Examples) 上找到更多其他语言的 Demo 示例。


## 常见问题

【例如：是否支持自签名 TLS/SSL 证书？是否支持双向 TLS/SSL 认证？】