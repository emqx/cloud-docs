# 专有版 / BYOC 连接指引

本页为您介绍了连接到专有版和 BYOC 部署所使用的协议和端口并提供了连接问题的排查指南。

## 连接协议和端口 Q&A

以下表格列出了连接专有版和 BYOC 部署所使用的协议和端口。

| **版本**        | **TCP 端口（mqtt）** | **MQTT TLS/SSL 端口（mqtts）** | **WebSocket 端口（ws）** | **WebSocket TLS/SSL 端口（wss）** |
| --------------- | -------------------- | ------------------------------ | ------------------------ | --------------------------------- |
| 专有版 | 1883                 | 8883（需要配置后开启 ）        | 8083                     | 8084（需要配置后开启）            |
| BYOC            | 1883                 | 8883                           | 8083                     | 8084                              |

### 什么是 TCP MQTT 和 WebSocket 连接？

标准的 MQTT 是基于TCP/IP 协议栈构建的异步通信消息协议，是一种轻量级的发布、订阅信息传输协议。可以在不可靠的网络环境中进行扩展，适用于设备硬件存储空间或网络带宽有限的场景。

WebSocket 协议是基于 TCP 的一种新的网络协议，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输，客户端和服务器之间的数据交换变得更加简单。这里 WebSocket 更准确的是指先使用 WebSocket 建立连接，然后在 WebSocket 通道上使用 MQTT 协议进行通信，即 MQTT over WebSocket。主要是用于浏览器环境的连接。

标准的 MQTT 和 WebSocket 都是不加密的。会有一定的安全风险。


### 如何使用 TCP MQTT 端口和 WebSocket 端口？

您可以直接通过部署概览上的 1883(mqtt) 端口和 8083(ws) 端口进行连接。

您可以在[客户端连接指引](../connect_to_deployments/overview.md)查看客户端开发 SDK Demo 的示例代码测试并连接。


### 什么是 TLS/SSL 的 MQTT 和 WebSocket 连接？

在 MQTT 或 WebSocket 协议通信的基础上，添加 TLS/SSL 加密，确保通信的安全，不易被窃听和篡改。

MQTT TLS/SSL 端口号为 8883，对应协议标识为 mqtts； WebSocket TLS/SSL 端口号为 8084，对应协议标识为 wss。


### 专有版如何开启 TLS/SSL 的 MQTT 和 WebSocket 端口？

专有版支持自定义单向/双向的 TLS/SSL 验证，需要通过[配置 TLS / SSL](../deployments/tls_ssl.md)开启。开启后，通过部署概览上的 8883(mqtts) 端口和 8084(wss) 端口进行连接。

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


## 连接问题排查指南
如果您在连接到部署时遇到问题，请按照以下指南中的步骤，根据您的部署类型（专业版或基础版）进行排查和自我诊断。

### 专有版部署

当您遇到无法连接到 EMQX Cloud 专业版部署的问题时，可以通过以下步骤进行自我诊断和排查：


1. **核对连接地址**。确保您使用的是 EMQX Cloud 专业版部署提供的**正确 IP 地址**进行连接。请注意，专业版部署支持直接使用 IP 地址进行连接，以及可以通过配置自定义 TLS/SSL 来加密连接。如果您需要域名作为连接地址，可以将 EMQX Cloud 专业版部署提供的连接IP地址指向您自己的域名。


2. **确认连接端口**。专业版部署默认开启 1883 (MQTT) 和 8083 (WebSocket) 端口，您可以通过配置 TLS/SSL 来开启安全的 8883 (MQTTS) 和 8084 (WSS) 端口。不同端口的作用如下：
   - MQTT 和 WebSocket 端口：这些端口支持明文传输，数据在传输过程中没有加密，适用于不要求数据加密的场景，如内部网络通信或开发环境。
   - MQTTS 和 WSS 端口：这些端口支持安全传输，使用 TLS/SSL 加密数据传输，提供更高的安全性，适用于需要加密通信的场景，如生产环境或敏感数据传输。


3. **测试网络连通性**。使用 `telnet` 命令来测试您的服务器与 EMQX Cloud 专业版部署之间的网络连通性。例如，您可以运行以下命令来测试连接到专业版部署的 MQTT 端口： telnet <专业版部署的IP地址> 1883；

   或者，如果您启用了 TLS/SSL，测试连接到 MQTTS 端口：telnet <专业版部署的IP地址> 8883。

   请将 `<专业版部署的IP地址>` 替换为您的实际部署地址。


4. **验证认证信息**。EMQX Cloud 专业版部署同样不支持匿名认证。请确认您已在 EMQX Cloud 控制台中正确配置了 MQTT 客户端的用户名和密码，并在客户端连接时进行了正确的配置。


5. **使用 MQTTX 客户端进行测试**。我们建议使用 MQTTX 作为 MQTT 客户端测试工具，它是一个免费且易于使用的跨平台 MQTT 5.0 客户端。您可以通过它来验证是否是客户端代码的问题导致无法连接。详细的使用说明，请参见：[MQTTX 使用文档](../connect_to_deployments/mqttx.md)。


### 通过工单获得我们的帮助
如果以上步骤都确认无误但问题仍然存在，请通过工单系统提交帮助请求，并提供以下详细信息，以便我们更快地为您解决问题：

  \- 部署的名称和 ID（可在控制台的"部署管理"页面找到）

  \- 部署类型（例如 Serverless、基础版、专业版等）

  \- 客户端的具体类型和版本号

  \- 客户端连接示例代码（请提供您使用的编程语言，例如 Python、JavaScript 等，以及相关的连接代码，确保敏感信息已经脱敏）

  \- 客户端的错误日志或具体的报错信息（请尽可能提供详细的错误描述或截图）

