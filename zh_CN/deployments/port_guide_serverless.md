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


### 无法连接问题排查指南

1. **核对连接地址**，确保您使用的是 EMQX Cloud Serverless 提供的**正确域名**进行连接。请注意，不支持通过 CNAME 将 EMQX Cloud 的域名指向您自己的域名，如果您的应用场景需要使用非加密的 TCP 端口连接，请使用我们的专业版部署。


2. **确认连接端口**，EMQX Cloud Serverless 仅支持通过 MQTT over TLS (端口 8883) 和 Websocket over TLS (端口 8084) 进行连接，请注意，不支持通过 1883 和 8083 端口连接到部署。如果您的应用场景需要使用非加密的 TCP 端口连接，请使用我们的专业版部署。
 

3. **测试网络连通性**，使用 `telnet` 命令来测试您的服务器与 EMQX Cloud Serverless之间的网络连通性，例如：`telnet broker.emqx.io 8883`。（请替换为您的实际部署地址）
 

4. **验证认证信息**， EMQX Cloud **不支持匿名认证**。请确认您已经在 EMQX Cloud 控制台中设置了 MQTT 客户端的用户名和密码，并在客户端连接时进行了正确的配置。
 

5. **检查 SNI (Server Name Indication) 配**置，客户端连接时必须提供正确的 SNI 信息。如果 SNI 配置错误或未在连接请求中包含 SNI 信息，EMQX Cloud 将拒绝连接，并返回错误代码 -5。
 

6. **使用 MQTTX 客户端进行测试**，我们推荐使用 MQTTX 作为 MQTT 客户端测试工具，它是一个免费且易于使用的跨平台 MQTT 5.0 客户端。您可以通过它来验证是否是客户端代码的问题导致无法连接。详细的使用说明，请参见：[MQTTX 使用文档](../connect_to_deployments/mqttx.md)。

### 通过工单获得我们的帮助
如果以上步骤都确认无误但问题仍然存在，请通过工单系统提交帮助请求，并提供以下详细信息，以便我们更快地为您解决问题：

  \- 部署的名称和 ID（可在控制台的"部署管理"页面找到）

  \- 部署类型（例如 Serverless、标准版、专业版等）

  \- 客户端的具体类型和版本号

  \- 客户端连接示例代码（请提供您使用的编程语言，例如 Python、JavaScript 等，以及相关的连接代码，确保敏感信息已经脱敏）

  \- 客户端的错误日志或具体的报错信息（请尽可能提供详细的错误描述或截图）
