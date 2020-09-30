# 使用 Node.js SDK 连接到部署

在本教程中您将学习使用 Node.js **MQTT.js** 客户端连接到 EMQ X Cloud 部署。



## 准备工作

* 已在 EMQ X Cloud [创建部署](../deployments/create_deployment.md)，并且部署状态为 **running**

* 安装 Node.js 和 NPM

* 安装依赖

  ```bash
  npm install
  // 或者使用 yarn
  yarn
  ```

* 对于免费试用和共享部署 EMQ X Cloud 默认提供了 TLS/SSL 连接认证，您还需下载 [根证书](https://static.emqx.net/data/cn.emqx.cloud-ca.crt) 用于 TLS/SSL 连接。



## 示例代码

从这里获取[示例源码](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Node.js)

* 查看命令行帮助

  ```bash
  node index.js --help
  ```

* 通过 MQTT 协议连接到部署并订阅消息

  ```bash
  node index.js
  or
  node index.js -p mqtt
  ```

* 通过 Websocket 协议连接到部署并订阅消息

  ```bash
  node index.js -p ws
  ```

* 通过 MQTT over TLS/SSL 协议连接到部署并订阅消息

  ```bash
  node index.js -p mqtts
  ```

* 通过 Websocket over TLS/SSL 协议连接到部署并订阅消息

  ```bash
  node index.js -p wss
  ```

