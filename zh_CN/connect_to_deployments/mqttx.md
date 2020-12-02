# 使用 MQTT X 连接到部署

[MQTT X](https://mqttx.app/cn) 是 [EMQ](http://emqx.io/cn) 开源的一款优雅的跨平台 MQTT 5.0 桌面客户端，它支持 macOS, Linux, Windows。

[MQTT X](https://mqttx.app/cn) 的 UI 采用了聊天界面形式，简化了页面操作逻辑，用户可以快速创建连接，允许保存多个客户端，方便用户快速测试 `MQTT/MQTTS` 连接，及 `MQTT` 消息的订阅和发布。

在下载和安装前请访问我们的[官网](https://mqttx.app/)或者是 [GitHub](https://github.com/emqx/MQTTX) 来了解并获取到最新的版本信息，使用最新版本有助于提高使用体验。如果你对本项目了解也可以直接 Clone [MQTT X](https://mqttx.app/) 的仓库源码，自行打包和使用。使用过程中，有任何问题都可以到 [GitHub issues](https://github.com/emqx/MQTTX/issues) 来发表问题和看法或者是 Fork 我们的项目，并向我们提交修改后的 PR，我们将会认真查阅和回复。

## 先决条件

* 已在 EMQ X Cloud [创建部署](../deployments/create_deployment.md)，并且部署状态为 **running**

* 安装 MQTT X 客户端

## 连接配置示例

* 通过 MQTT 协议连接到部署

    ![](./_assets/mqttx_mqtt.png)

* 通过 Websocket 协议连接到部署并订阅消息

    ![](./_assets/mqttx_ws.png)

* 通过 MQTT over TLS/SSL 协议连接到部署并订阅消息

    ![](./_assets/mqttx_mqtts.png)

* 通过 Websocket over TLS/SSL 协议连接到部署并订阅消息

    ![](./_assets/mqttx_wss.png)

