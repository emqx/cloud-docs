# 使用 MQTT.fx 连接到部署

[MQTT.fx](https://mqttfx.jensd.de/) 是目前主流的跨平台 MQTT 桌面客户端，它支持 macOS, Linux, Windows。

支持 TCP、TLS 协议，**但不支持 WebSocket**。

## 先决条件

* 已在 EMQ X Cloud [创建部署](../deployments/create_deployment.md)，并且部署状态为 **running**

* 安装 MQTT.fx 客户端

## 连接配置示例

1. 打开连接配置

    ![](./_assets/mqttfx_profile.png)

2. 新建连接配置，并填写相关配置

    ![](./_assets/mqttfx_new_profile.png)

3. 连接到部署

    ![](./_assets/mqttfx_connect.png)

