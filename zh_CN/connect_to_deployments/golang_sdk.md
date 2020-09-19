# 使用 Go SDK 连接到部署

在本教程中您将学习使用 Go **paho-mqtt** 客户端连接到 EMQ X Cloud 部署。



## 先决条件

* 已在 EMQ X Cloud [创建部署](../deployments/create_deployment.md)，并且部署状态为 **running**

* 建议使用 Go 13+ 版本

* 已安装 **paho-mqtt** MQTT 客户端。如未安装，请运行如下命令完成安装

	```
	go get github.com/eclipse/paho.mqtt.golang 
	go get github.com/gorilla/websocket
	go get golang.org/x/net/proxy
	```

* 对于免费试用和共享部署 EMQ X Cloud 默认提供了 TLS/SSL 连接认证，您还需下载 [根证书](https://static.emqx.net/data/cn.emqx.cloud-ca.crt) 用于 TLS/SSL 连接。



## 示例代码
	
从这里获取[示例源码](https://github.com/emqx/example/tree/master/mqtt-client-Go)

- 通过 MQTT 协议连接到部署并发布消息
	```
	go run main.go --protocol=mqtt --port=1883 --action=pub
	```

- 通过 MQTT 协议连接到部署并订阅消息

	```
	go run main.go --protocol=mqtt --port=1883 --action=sub
	```

- 通过 MQTT 协议连接到部署并发布和订阅消息

	```
	go run main.go --protocol=mqtt --port=1883 --action=pubsub
	```

- 通过 Websocket 协议连接到部署并发布消息

	```
	go run main.go --protocol=ws --port=8083 --action=pub
	```

- 通过 Websocket 协议连接到部署并订阅消息

	```
	go run main.go --protocol=ws --port=8083 --action=sub
	```

- 通过 Websocket 协议连接到部署并发布和订阅消息

	```
	go run main.go --protocol=ws --port=8083 --action=pubsub
	```
	
- 通过 MQTT over TLS/SSL 协议连接到部署并发布消息

	```
	go run main.go --protocol=mqtts --port=8883 --tls=true --action=pub
	```

- 通过 MQTT over TLS/SSL 协议连接到部署并订阅消息

	```
	go run main.go --protocol=mqtts --port=8883 --tls=true --action=sub
	```

- 通过 MQTT over TLS/SSL 协议连接到部署并发布和订阅消息

	```
	go run main.go --protocol=mqtts --port=8883 --tls=true --action=pubsub
	```

- 通过 Websocket over TLS/SSL 协议连接到部署并发布消息

	```
	go run main.go --protocol=wss --port=8084 --tls=true --action=pub
	```

- 通过 Websocket over TLS/SSL 协议连接到部署并订阅消息

	```
	go run main.go --protocol=wss --port=8084 --tls=true --action=sub
	```
	
- 通过 Websocket over TLS/SSL 协议连接到部署并发布和订阅消息

	```
	go run main.go --protocol=wss --port=8084 --tls=true --action=pubsub
	```
