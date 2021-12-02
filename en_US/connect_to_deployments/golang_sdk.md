# Connect to the deployment using the go SDK

This paper mainly introduces how to use the `paho.mqtt.golang` Library in go project to realize the functions of connecting, subscribing, sending, and receiving messages between an mqtt client and an mqtt server.

[Go](https://go.dev/) it's Google Developed a programming language with strong static type, compilation type, parallel style, and garbage collection function. `paho.mqtt.golang` is an mqtt library, which provides a simple API for connecting to the mqtt server and sending and receiving messages in the go project.

## Preconditions

The deployment has been created. You can view the connection-related information under the deployment overview. At the same time, you can use "Online Test" to test the connection to the mqtt server first.

The project uses go version 1.15.13 for development and testing. The following commands can be used to confirm the go version.

``` bash
➜ ~ go version
go version go1.15.13 darwin/amd64
```

## Install mqtt client

### Project initialization

1. Create a new folder `go_client`, enter the folder and run the following command

    ``` bash
    ➜ ~ go mod init go-client
    go: creating new go.mod: module go-mqtt
    ```

2. Use the `go get <Library>` command to install `paho.mqtt.golang`

    ``` bash
    ➜ ~ go get github.com/eclipse/paho.mqtt.golang
    go: downloading github.com/eclipse/paho.mqtt.golang v1.3.5
    go: github.com/eclipse/paho.mqtt.golang upgrade => v1.3.5
    ```

3. Create the `main.go` file and import the `paho.mqtt.golang` client

    ``` go
    package main
    
    import (
        mqtt "github.com/eclipse/paho.mqtt.golang"
    )
    
    func main(){
    }
    ```

## Connect
You can view the information of connection on  [Deployment Overview](../deployments/view_deployment.md). Please note that the port is not 1883 or 8883  if your edition is not dedicated, make sure you get the right port. And you must add the authentication on [Authentication & ACL](../deployments/auth_and_acl.md).

### Connection settings

Set the mqtt broker connection address, port, topic, username, and password.

``` go
const broker = "broker.emqx.io" // MQTT Broker address
const port = 1883
const topic = "t/1"
const username = "emqx"
const password = "public"
```

### Writing mqtt connection functions

We write a function to create and return an mqtt client.

``` go
func createMqttClient() mqtt.Client {
    connectAddress := fmt.Sprintf("tcp://%s:%d", broker, port)
    client_id := fmt.Sprintf("go-client-%d", rand.Int())

    fmt.Println("connect address: ", connectAddress)
    opts := mqtt.NewClientOptions()
    opts.AddBroker(connectAddress)
    opts.SetUsername(username)
    opts.SetPassword(password)
    opts.SetClientID(client_id)
    opts.SetKeepAlive(60)
    client := mqtt.NewClient(opts)
    token := client.Connect()
    // if connection failed, exit
    if token.WaitTimeout(3*time.Second) && token.Error() != nil {
        log.Fatal(token.Error())
    }
    return client
}
```

## Publish and subscribe

### Release news

Defines a publish function for publishing messages.

In this function, we define an unconditional loop to publish a message every 1s. Count the number of published messages through `msgCount`.
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

### Subscription message

Define subscription function to subscribe to messages. This function prints the topic and payload of the message on the console.

``` go
func subscribe(client mqtt.Client) {
    qos := 0
    client.Subscribe(topic, byte(qos), func(client mqtt.Client, msg mqtt.Message) {
        fmt.Printf("Received `%s` from `%s` topic", msg.Payload(), msg.Topic())
    })
}
```

## Complete code

``` go
package main

import (
        "fmt"
        "log"
        "math/rand"
        "time"

        mqtt "github.com/eclipse/paho.mqtt.golang"
)

const broker = ""
const port = 1883
const topic = "t/1"
const username = ""
const password = ""

func main() {
        client := createMqttClient()
        go subscribe(client)        // we use goroutine to run the subscription function
        time.Sleep(time.Second * 1) // pause 1s to wait for the subscription function to be ready
        publish(client)
}

func createMqttClient() mqtt.Client {
        connectAddress := fmt.Sprintf("tcp://%s:%d", broker, port)
        client_id := fmt.Sprintf("go-client-%d", rand.Int())

        fmt.Println("connect address: ", connectAddress)
        opts := mqtt.NewClientOptions()
        opts.AddBroker(connectAddress)
        opts.SetUsername(username)
        opts.SetPassword(password)
        opts.SetClientID(client_id)
        opts.SetKeepAlive(60)
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
```

## Test verification

Execution procedure

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

## Next step

The above shows you how to use the 'paho.mqtt.golang' client to connect to EMQ X Cloud, which can be found in [here](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Go) Download to the sample source code

Also available in [GitHub](https://github.com/emqx/MQTT-Client-Examples) Find more demo examples for other languages on.
