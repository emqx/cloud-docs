# 专有版 / BYOC 连接指引


## 协议和端口

| **版本**    | **TCP 端口（mqtt）** | **MQTT TLS/SSL 端口（mqtts）** | **WebSocket 端口（ws）** | **WebSocket TLS/SSL 端口（wss）** |
|-----------|------------------|----------------------------|----------------------|-------------------------------|
| 专有版 - 基础版 | 15xxx            | 15xxx                      | 8083                 | 8084                          |
| 专有版 - 专业版 | 1883             | 8883（需要配置后开启 ）             | 8083                 | 8084（需要配置后开启）                 |
| BYOC      | 1883             | 8883                       | 8083                 | 8084                          |


### 什么是 TCP MQTT 和 WebSocket 连接？

标准的 MQTT 是基于TCP/IP协议栈构建的异步通信消息协议，是一种轻量级的发布、订阅信息传输协议。可以在不可靠的网络环境中进行扩展，适用于设备硬件存储空间或网络带宽有限的场景。

WebSocket 协议是基于 TCP 的一种新的网络协议，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输，客户端和服务器之间的数据交换变得更加简单。这里 WebSocket 更准确的是指先使用 WebSocket 建立连接，然后在 WebSocket 通道上使用 MQTT 协议进行通信，即 MQTT over WebSocket。主要是用于浏览器环境的连接。

标准的 MQTT 和 WebSocket 都是不加密的。会有一定的安全风险。


### 如何使用 TCP MQTT 端口和 WebSocket 端口？

您可以直接通过部署概览上的 1883(mqtt) 端口和 8083(ws) 端口进行连接。

您可以在[客户端连接指引](../connect_to_deployments/overview.md)查看客户端开发 SDK Demo 的示例代码测试并连接。


### 什么是 TLS/SSL 的 MQTT 和 WebSocket 连接？

在 MQTT 或 WebSocket 协议通信的基础上，添加 TLS/SSL 加密，确保通信的安全，不易被窃听和篡改。

MQTT TLS/SSL 端口号为 8883，对应协议标识为 mqtts； WebSocket TLS/SSL 端口号为 8084，对应协议标识为 wss。


### 基础版如何使用 TLS/SSL 的 MQTT 和 WebSocket 端口？

如果您使用的是基础版，可以直接通过部署概览上的 15xxx(mqtts) 端口和 8084(wss) 端口进行连接。

基础版使用 EMQX 提供并且维护服务端 CA 的单向 TLS 验证。某些客户端需要提供服务端 CA 进行校验，请[在此下载](https://assets.emqx.com/data/emqxsl-ca.crt)。


### 专业版如何开启 TLS/SSL 的 MQTT 和 WebSocket 端口？

专业版支持自定义单向/双向的 TLS/SSL 验证，如果您使用的是专业版，需要通过[配置 TLS / SSL](../deployments/tls_ssl.md)开启。开启后，通过部署概览上的 8883(mqtts) 端口和 8084(wss) 端口进行连接。

### BYOC 如何使用 TLS/SSL 的 MQTT 和 WebSocket 端口？

BYOC 支持自定义单向 TLS/SSL 验证，可以直接通过部署概览上的 8883(mqtts) 端口和 8084(wss) 端口进行连接。

### 如何编写客户端 TLS/SSL 代码？

您可以查看示例代码（TLS 相关示例代码）来编写客户端的代码。

[Python](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Python3)<br>
[Java](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Java)<br>
[GO](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Go)<br>
[Node.js](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Node.js)<br>
[ESP 32](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-ESP32)<br>
[ESP 8266](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-ESP8266)<br>
[Android](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Android)<br>
[swift](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-swift)<br>
