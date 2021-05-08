# 使用 Python SDK 连接到部署

在本教程中您将学习使用 Python **paho-mqtt** 客户端连接到 EMQ X Cloud 部署。



## 先决条件

* 已在 EMQ X Cloud [创建部署](../deployments/create_deployment.md)，并且部署状态为 **running**

* Python 3.4+ 版本

* 已安装 **paho-mqtt** MQTT 客户端。如未安装，请运行如下命令完成安装

  ```
  pip3 install -i https://pypi.doubanio.com/simple paho-mqtt
  ```

* 对于基础版 EMQ X Cloud 默认提供了 TLS/SSL 连接认证，您还需下载 [根证书](https://static.emqx.net/data/cn.emqx.cloud-ca.crt) 用于 TLS/SSL 连接。



## 示例代码

* [如何在 Python 中使用 MQTT](https://www.emqx.cn/blog/how-to-use-mqtt-in-python)
* [通过 MQTT 协议连接到部署并发布消息](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_tcp.py)
* [通过 MQTT 协议连接到部署并订阅消息](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/sub_tcp.py)
* [通过 MQTT 协议连接到部署并发布和订阅消息](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_sub_tcp.py)
* [通过 Websocket 协议连接到部署并发布消息](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_ws.py)
* [通过 Websocket 协议连接到部署并订阅消息](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/sub_ws.py)
* [通过 Websocket 协议连接到部署并发布和订阅消息](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_sub_ws.py)
* [通过 MQTT over TLS/SSL 协议连接到部署并发布消息](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_tls.py)
* [通过 MQTT over TLS/SSL 协议连接到部署并订阅消息](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/sub_tls.py)
* [通过 MQTT over TLS/SSL 协议连接到部署并发布和订阅消息](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_sub_tls.py)
* [通过 Websocket over TLS/SSL 协议连接到部署并发布消息](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_wss.py)
* [通过 Websocket over TLS/SSL 协议连接到部署并订阅消息](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/sub_wss.py)
* [通过 Websocket over TLS/SSL 协议连接到部署并发布和订阅消息](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_sub_wss.py)
