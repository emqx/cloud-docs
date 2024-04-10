# 使用 Paho Go 连接到部署

本文主要介绍如何在 Go 项目中，使用 `paho.mqtt.golang` 库实现一个 MQTT 客戶端与 MQTT 服务器的连接、订阅、收发消息等功能。

[Go](https://go.dev/) 是 Google 开发的一种静态强类型、编译型、并发型，并具有垃圾回收功能的编程语言。而 `paho.mqtt.golang` 是一个 MQTT 库，它提供了一个简单的 API，用于在 Go 项目中连接到 MQTT 服务器，并发送和接收消息。

## 前置准备

### MQTT 服务器部署

- 使用 EMQX 提供的 [免费公共 MQTT 服务器](https://www.emqx.com/zh/mqtt/public-mqtt5-broker)，该服务基于 EMQX 的 [全托管 MQTT 云服务](https://www.emqx.com/zh) 创建。服务器接入信息如下：
    - 连接地址: broker.emqx.io
    - TCP Port: 1883
    - SSL/TLS Port: 8883
- 您也可以自己[创建部署](https://github.com/emqx/cloud-docs/blob/master/zh_CN/create/overview.md)，在部署概览下可以查看到连接相关的信息，请确保部署状态为运行中。使用 TCP 端口或 SSL/TLS 端口 测试连接到 MQTT 服务器。如果您是自己创建部署，请设置[客户端认证](../deployments/auth_overview.md)，在部署控制台**访问控制**->**认证** 中设置用户名和密码，用于连接验证。

## 安装依赖

本项目使用 Go 1.15.13 版本进行开发测试，可用如下命令确认 Go 版本。

``` bash
➜ ~ go version
go version go1.15.13 darwin/amd64
```

1.  创建一个新的文件夹 `go-mqtt`, 进入文件夹, 运行以下命令

    ``` bash
    ➜ ~ go mod init go-mqtt
    go: creating new go.mod: module go-mqtt
    ```

2.  使用 `go get <库>` 命令安装 `paho.mqtt.golang`

    ``` bash
    ➜ ~ go get github.com/eclipse/paho.mqtt.golang
    go: downloading github.com/eclipse/paho.mqtt.golang v1.3.5
    go: github.com/eclipse/paho.mqtt.golang upgrade => v1.3.5
    ```
3.  创建 `main.go` 文件, 并导入 `paho.mqtt.golang` 客戶端

    ``` go
    package main
    
    import (
        mqtt "github.com/eclipse/paho.mqtt.golang"
    )
    
    func main(){
    }
    ```

## 通过 TCP 端口连接

本节介绍如何通过 TCP 端口连接到部署。

1. 连接设置

    示例代码将使用公共 MQTT 服务器来连接，公共 MQTT 服务器无需设置用户名和密码。如果您创建了部署，请在部署控制台找到相应的连接地址，并参考 [默认认证](../deployments/default_auth.md)设置用户名和密码。
    
    ``` go
    const protocol = "tcp"
    const broker = "broker.emqx.io" // MQTT Broker 连接地址
    const port = 1883
    const topic = "t/1"
    const username = "emqx"
    const password = "******"
    ```
    
2. 连接关键代码

    我们编写一个函数, 用于创建并返回 MQTT 客户端。

    ``` go
    func createMqttClient() mqtt.Client {
        connectAddress := fmt.Sprintf("%s://%s:%d", protocol,broker, port)
        rand.Seed(time.Now().UnixNano())
	    clientID := fmt.Sprintf("go-client-%d", rand.Int())
    
        fmt.Println("connect address: ", connectAddress)
        opts := mqtt.NewClientOptions()
        opts.AddBroker(connectAddress)
        opts.SetUsername(username)
        opts.SetPassword(password)
        opts.SetClientID(clientID)
        opts.SetKeepAlive(time.Second * 60)
        client := mqtt.NewClient(opts)
        token := client.Connect()
        // 如果连接失败，则终止程序
        if token.WaitTimeout(3*time.Second) && token.Error() != nil {
            log.Fatal(token.Error())
        }
        return client
    }
    ```

## 通过 SSL/TLS 端口连接
本节介绍如何通过 SSL/TLS 协议连接到部署。

1. 连接设置

    使用 SSL/TLS 协议连接需要配置端口为 8883，连接协议类型为 "ssl"。

    ``` go
    const protocol = "ssl"
    const port = 8883
    ```

2. 连接关键代码

    若需要配置服务器证书，可以通过 `loadTLSConfig()` 函数加载证书；若不需要，则直接使用 TCP 协议相同的连接方式即可。

    ``` go
    func createMqttClient() mqtt.Client {
        connectAddress := fmt.Sprintf("%s://%s:%d", protocol, broker, port)
        rand.Seed(time.Now().UnixNano())
	    clientID := fmt.Sprintf("go-client-%d", rand.Int())
    
        fmt.Println("connect address: ", connectAddress)
        opts := mqtt.NewClientOptions()
        opts.AddBroker(connectAddress)
        opts.SetUsername(username)
        opts.SetPassword(password)
        opts.SetClientID(clientID)
        opts.SetKeepAlive(time.Second * 60)
    
        // Optional: 设置CA证书
        // opts.SetTLSConfig(loadTLSConfig("caFilePath"))
    
        client := mqtt.NewClient(opts)
        token := client.Connect()
        if token.WaitTimeout(3*time.Second) && token.Error() != nil {
            log.Fatal(token.Error())
        }
        return client
    }
    
    func loadTLSConfig(caFile string) *tls.Config {
        // load tls config
        var tlsConfig tls.Config
        tlsConfig.InsecureSkipVerify = false
        if caFile != "" {
            certpool := x509.NewCertPool()
            ca, err := ioutil.ReadFile(caFile)
            if err != nil {
                log.Fatal(err.Error())
            }
            certpool.AppendCertsFromPEM(ca)
            tlsConfig.RootCAs = certpool
        }
        return &tlsConfig
    }
    ```

## 发布和订阅

本节主要介绍如何在已连接到部署的情况下订阅主题并发布消息。

### 发布消息

定义发布函数，用于发布消息。

在这个函数里，我们定义了一个无条件的循环，每隔 1s 发布一条消息。通过 msgCount 来统计发布的消息数量。

``` go
func publish(client mqtt.Client) {
    qos := 0
    msgCount := 0
    for {
        payload := fmt.Sprintf("message: %d!", msgCount)
        if token := client.Publish(topic, byte(qos), false, payload); token.Wait() && token.Error() != nil {
            fmt.Printf("publish failed, topic: %s, payload: %s\n", topic, payload)
        } else {
            fmt.Printf("publish success, topic: %s, payload: %s\n", topic, payload)
        }
        msgCount++
        time.Sleep(time.Second * 1)
    }
}
```

### 订阅主题

定义订阅函数，用于订阅主题。该方法将在控制台打印消息的 Topic 和 Payload。

``` go
func subscribe(client mqtt.Client) {
    qos := 0
    client.Subscribe(topic, byte(qos), func(client mqtt.Client, msg mqtt.Message) {
        fmt.Printf("Received `%s` from `%s` topic", msg.Payload(), msg.Topic())
    })
}
```

### 取消订阅

通过以下代码取消订阅，此时应指定取消订阅的主题。

``` go
client.Unsubscribe(topic)
```

### 断开连接

如客户端希望主动断开连接，可以通过如下代码实现。

``` go
// 参数指定断连前等待时长
client.Disconnect(250)
```

### 完整代码

``` go
package main

import (
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

const protocol = "tcp"
const broker = ""
const port = 1883
const topic = "t/1"
const username = ""
const password = ""

func main() {
	client := createMqttClient()
	go subscribe(client)        // 在主函数里, 我们用另起一个 go 协程来订阅消息
	time.Sleep(time.Second * 1) // 暂停一秒等待 subscribe 完成
	publish(client)
}

func createMqttClient() mqtt.Client {
	connectAddress := fmt.Sprintf("%s://%s:%d", protocol, broker, port)
	rand.Seed(time.Now().UnixNano())
	clientID := fmt.Sprintf("go-client-%d", rand.Int())

	fmt.Println("connect address: ", connectAddress)
	opts := mqtt.NewClientOptions()
	opts.AddBroker(connectAddress)
	opts.SetUsername(username)
	opts.SetPassword(password)
	opts.SetClientID(clientID)
	opts.SetKeepAlive(time.Second * 60)

	// Optional: 设置CA证书
	// opts.SetTLSConfig(loadTLSConfig("caFilePath"))

	client := mqtt.NewClient(opts)
	token := client.Connect()
	if token.WaitTimeout(3*time.Second) && token.Error() != nil {
		log.Fatal(token.Error())
	}
	return client
}

func publish(client mqtt.Client) {
	qos := 0
	msgCount := 0
	for {
		payload := fmt.Sprintf("message: %d!", msgCount)
		if token := client.Publish(topic, byte(qos), false, payload); token.Wait() && token.Error() != nil {
			fmt.Printf("publish failed, topic: %s, payload: %s\n", topic, payload)
		} else {
			fmt.Printf("publish success, topic: %s, payload: %s\n", topic, payload)
		}
		msgCount++
		time.Sleep(time.Second * 1)
	}
}

func subscribe(client mqtt.Client) {
	qos := 0
	client.Subscribe(topic, byte(qos), func(client mqtt.Client, msg mqtt.Message) {
		fmt.Printf("Received `%s` from `%s` topic\n", msg.Payload(), msg.Topic())
	})
}

func loadTLSConfig(caFile string) *tls.Config {
	// load tls config
	var tlsConfig tls.Config
	tlsConfig.InsecureSkipVerify = false
	if caFile != "" {
		certpool := x509.NewCertPool()
		ca, err := ioutil.ReadFile(caFile)
		if err != nil {
			log.Fatal(err.Error())
		}
		certpool.AppendCertsFromPEM(ca)
		tlsConfig.RootCAs = certpool
	}
	return &tlsConfig
}
```

## 测试验证

执行程序

``` bash
➜ ~ go run main.go
connect address:  tcp://***.***.***.***:1883
publish success, topic: t/1, payload: message: 0!
Received `message: 0!` from `t/1` topic
publish success, topic: t/1, payload: message: 1!
Received `message: 1!` from `t/1` topic
publish success, topic: t/1, payload: message: 2!
Received `message: 2!` from `t/1` topic
publish success, topic: t/1, payload: message: 3!
Received `message: 3!` from `t/1` topic
publish success, topic: t/1, payload: message: 4!
Received `message: 4!` from `t/1` topic
publish success, topic: t/1, payload: message: 5!
Received `message: 5!` from `t/1` topic
publish success, topic: t/1, payload: message: 6!
```

![go pubsub](./_assets/go_pubsub.png)

## 更多内容

综上所述，我们实现了在 Go 项目中创建 MQTT 连接，使用客户端与 MQTT 服务器进行订阅、收发消息、取消订阅以及断开连接的场景。可以在 [这里](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Go) 下载到示例的源码，同时也可以在 [GitHub](https://github.com/emqx/MQTT-Client-Examples) 上找到更多其他语言的 Demo 示例。