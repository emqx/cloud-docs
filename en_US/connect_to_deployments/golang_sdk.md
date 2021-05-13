# Connect to deployments with  Go SDK 

In this tutorial, you will learn to use Go **paho-mqtt** client to connect to EMQ X Cloud deployment.

## precondition

* Already [Create Deployment](../deployments/create_deployment.md) in EMQ X Cloud , and the deployment status is **running**

* It is recommended to use Go 13+ version

* **Paho-mqtt** MQTT client has been installed. If not installed, please run the following command to complete the installation

	```
	go get github.com/eclipse/paho.mqtt.golang 
	go get github.com/gorilla/websocket
	go get golang.org/x/net/proxy
	```

* For basic EMQ X Cloud deployment, it provides TLS/SSL connection authentication by default, and you also need to download [root certificate](https://static.emqx.net/data/cn.emqx.cloud-ca.crt) for TLS/SSL connection.

## Example Code

Get [Sample Source Code](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Go)

- Connect to deployment and publish messages with MQTT protocol
	```
	go run main.go --protocol=mqtt --port=1883 --action=pub
	```

- Connect to the deployment and subscribe messages with MQTT protocol

	```
	go run main.go --protocol=mqtt --port=1883 --action=sub
	```

- Connect to deployment, publish and subscribe messages with MQTT protocol

	```
	go run main.go --protocol=mqtt --port=1883 --action=pubsub
	```

- Connect to the deployment and publish messages with Websocket protocol

	```
	go run main.go --protocol=ws --port=8083 --action=pub
	```

- Connect to the deployment and subscribe to messages with Websocket protocol

	```
	go run main.go --protocol=ws --port=8083 --action=sub
	```

- Connect to deployment, publish and subscribe to messages with Websocket protocol

	```
	go run main.go --protocol=ws --port=8083 --action=pubsub
	```
	
- Connect to deployment and publish messages with MQTT over TLS/SSL protocol

	```
	go run main.go --protocol=mqtts --port=8883 --tls=true --action=pub
	```

- Connect to deployment and subscribe to messages with MQTT over TLS/SSL protocol

	```
	go run main.go --protocol=mqtts --port=8883 --tls=true --action=sub
	```

- Connect to deployment, publish and subscribe to messages with MQTT over TLS/SSL protocol

	```
	go run main.go --protocol=mqtts --port=8883 --tls=true --action=pubsub
	```

- Connect to deployment and publish messages with Websocket over TLS/SSL protocol

	```
	go run main.go --protocol=wss --port=8084 --tls=true --action=pub
	```

- Connect to deployment and subscribe to messages with Websocket over TLS/SSL protocol

	```
	go run main.go --protocol=wss --port=8084 --tls=true --action=sub
	```
	
- Connect to deployment,publish and subscribe to messages with Websocket over TLS/SSL protocol

	```
	go run main.go --protocol=wss --port=8084 --tls=true --action=pubsub
	```

- [How to use MQTT in Golang](https://www.emqx.io/blog/how-to-use-mqtt-in-golang)