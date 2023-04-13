<!-- markdownlint-disable MD001 -->

# Serverless 连接指引


### 什么是 TCP MQTT 和 WebSocket 连接？

标准的 MQTT 是基于TCP/IP协议栈构建的异步通信消息协议，是一种轻量级的发布、订阅信息传输协议。可以在不可靠的网络环境中进行扩展，适用于设备硬件存储空间或网络带宽有限的场景。

WebSocket协议是基于TCP的一种新的网络协议，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输，客户端和服务器之间的数据交换变得更加简单。这里 WebSocket 更准确的是指先使用 WebSocket 建立连接，然后在 WebSocket 通道上使用 MQTT 协议进行通信，即 MQTT over WebSocket。主要是用于浏览器环境的连接。

标准的 MQTT 和 WebSocket 都是不加密的。会有一定的安全风险。

### 什么是 TLS/SSL 的 MQTT 和 WebSocket 连接？

在 MQTT 或 WebSocket 协议通信的基础上，添加 TLS/SSL 加密，确保通信的安全，不易被窃听和篡改。MQTT TLS/SSL 端口号为 8883，对应 mqtts 协议； WebSocket TLS/SSL 端口号为 8084，对应 wss 协议。


### Serverless 为什么只支持 TLS/SSL 的 MQTT 和 WebSocket 连接？

Serverless 基于 EMQX 多租户架构，多个用户共享一个 EMQX 集群。使用 TLS 加密的 MQTT 和 WebSocket 连接可以提供对数据的安全保障和传输的可靠性。


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

**CA 文件**

Serverless 使用 EMQX 提供并且维护服务端 CA 的单向 TLS 验证。某些客户端需要提供服务端 CA 进行校验，请[在此下载](https://assets.emqx.com/data/emqxsl-ca.crt)。


