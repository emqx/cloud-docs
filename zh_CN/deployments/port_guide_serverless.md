# Serverless 连接指引


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


