# 连接 MQTT.fx

本文将以 MQTT.fx 作为 MQTT 客户端测试工具，接入 MQTT 云服务 - EMQX Platform 部署。

[MQTT.fx](http://www.mqttfx.jensd.de/) 是目前最为流行的 MQTT 桌面客户端工具，[MQTT.fx](http://www.mqttfx.jensd.de/) 1.0 Major 版本由 [Jens Deters](https://www.jensd.de/wordpress/) 使用 [JavaFX](https://en.wikipedia.org/wiki/JavaFX) 技术开发，即为 Java 虚拟机应用。遗憾的是 [MQTT.fx](http://www.mqttfx.jensd.de/) 目前已经停止维护，并转为由 Softblade 公司资助开发另发行了其商业版本 [MQTT.fx® 5.0](https://softblade.de/en/mqtt-fx/)，采用收费许可证方式经营该软件。本文中的 [MQTT.fx](http://www.mqttfx.jensd.de/) 不经特殊说明即特指 1.0 版本。

支持 TCP、TLS 协议，**但不支持 WebSocket**。

## 前提条件

> 1. [安装](http://www.mqttfx.jensd.de/index.php/download) MQTT.fx 客户端
> 2. 已在 EMQX Platform 创建部署，并且部署状态为 **运行中**

## 连接配置

### 连接信息

部署概览页面可获取到连接地址和端口信息

### 认证信息

EMQX Platform 所有部署均开启了用户认证，因此使用 MQTT.fx 进行测试连接时，**需要填写用户名和密码字段**。

> 在 **访问控制** -> **客户端认证** 中设置用户名和密码，可逐一添加，也可批量导入认证信息。

## 连接

1. 打开连接配置

   ![打开 MQTT.fx 连接配置](./_assets/mqttfx_profile.png)

2. 新建连接配置，并填写相关配置

   ![MQTT.fx 连接配置](./_assets/mqttfx_new_profile.png)

3. 连接到部署

   ![MQTT.fx 连接按钮](./_assets/mqttfx_connect.png)

## 更多内容

更多订阅、发布等功能请参考：[使用 MQTT.fx 接入 EMQX Platform](https://www.emqx.com/zh/blog/connecting-to-emqx-cloud-with-mqttfx)
