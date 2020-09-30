# WebSocket 连接 MQTT 示例

在本教程中您将学习在 Web 项目中使用 WebSocket 连接到 EMQ X Cloud 部署。

## 先决条件

* 已在 EMQ X Cloud [创建部署](../deployments/create_deployment.md)，并且部署状态为 **running**

* 安装 MQTT.js 客户端库

如果读者机器上装有 Node.js 运行环境，可直接使用 npm 命令安装 MQTT.js。

### 在当前目录安装
```
npm install mqtt --save
```

### CDN 引用
或免安装直接使用 CDN 地址
```html
<script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>

<script>
    // 将在全局初始化一个 mqtt 变量
    console.log(mqtt)
</script>
```

## 示例代码

* [使用 WebSocket 连接 MQTT 服务器](https://www.emqx.io/cn/blog/connect-to-mqtt-broker-with-websocket)
* [示例源码](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-WebSocket)