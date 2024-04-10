# Connect to Deployment via XXX


This page mainly introduces how to use MQTT.js in XXX project to implement the connection, subscription, messaging, unsubscription, and other functions between the client and MQTT broker. <!--Elaborate the functions according to needs.-->

<!--Do not introduce the language or MQTT. You can introduce the MQTT.js, for example, [MQTT.js](https://github.com/mqttjs/MQTT.js) is a fully open-source client library for the MQTT protocol, written in JavaScript, and can be used in both Node.js and browser environments. For more information and usage methods of `MQTT.js`, you can visit the [MQTT.js GitHub page](https://github.com/mqttjs/MQTT.js#table-of-contents).-->

<!--Other information, such as version limitations-->

## Prerequisites

<!--Describe the concepts that must be known and environments that must be established, for example： Understand MQTT over WebSocket（may add links to concept description sections).-->

### Deploy MQTT Broker

- You can use the [free public MQTT broker](https://www.emqx.com/en/mqtt/public-mqtt5-broker) provided by EMQX. This service was created based on the [EMQX Platform](https://www.emqx.com/en). The information about broker access is as follows:
  - Broker: **broker.emqx.io**
  - WebSocket Port: **8083**
  - WebSocket TLS/SSL Port: **8084**

- You can [create a deployment](https://docs.emqx.com/en/cloud/latest/create/overview.html) as well. Find connection information in the deployment overview. Make sure the deployment is running. At the same time, you can use WebSocket to test the connection to the MQTT server. If you are creating your own deployment, check [Authentication](https://docs.emqx.com/en/cloud/latest/deployments/auth_overview.html) and set the username and password in `Authentication & ACL` > `Authentication` for verification.

### <!--Other Prerequisites e.g. Vue CLI-->

<!--For example, This project uses [Vue CLI](https://cli.vuejs.org/guide/creating-a-project.html#vue-create) to create a Vue project for development and testing. -->

## Installation Dependency

<!--Describe the steps for how to install or import MQTT.js based on different projects and other dependencies if any.-->

## Connect over WebSocket

<!--There is no need to set username and password if you use the public MQTT broker. If you create your own deployment, you need to describe how to set the username and password.-->

Use the following code to establish a connection between the client and MQTT Broker.

```
XXXX
```

## Connect over WeSocket TLS/SSL

<!--Introduce the differences between the ws port and the wss port, and the connection precautions. For example, when enabling TLS/SSL encryption, the connection [parameter options](https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options) are consistent with establishing a connection through the WebSocket port. You only need to pay attention to changing the protocol to `wss` and matching the correct port number.-->

Use the following code to establish a connection between the client and MQTT Broker.

```
XXXX
```

## Publish and Subscribe

This section introduces how to subscribe to topics and publish messages after you successfully connect to the MQTT broker.

### Subscribe to Topics

Set the topic for subscription and the [QoS Level](https://www.emqx.com/en/blog/introduction-to-mqtt-qos) of the topic.

<!--Add other information as needed according to projects.-->

```js
xxxx
```

### Unsubscribe to Topics

Use the following codes to unsubscribe to topics. You need to define the topic for unsubscription and the QoS level.

<!--Add other information as needed according to projects.-->

```js
xxxx
```

### Publish Messages

Inform MQTT Broker about the topic and payload when publishing messages.

<!--Add other information as needed according to projects.-->

```js
xxxx
```

### Receive Messages

The following code specifies that the client listens for message events and executes a callback function after receiving a message, printing the received message and its topic to the console.
<!--Add other information as needed according to projects.-->

```js
xxxx
```

### Disconnect from MQTT Broker

If the client wants to disconnect actively, use the following code:

```
XXXX
```

The above section only lists some key codes. For the complete code of the project, please refer to: XXXX. You can download and experience it.

## Test Connection

<!--Describe the testing procedure using testing tools and add screenshots.-->

<!--You can download the [browser application demo](XXX) using XXX. Learn how to write and use functions such as creating connections, subscribing to topics, sending and receiving messages, unsubscribing, and disconnecting.-->


## More Information

<!--In summary, you have implemented the creation of an MQTT connection in XXX project, and simulated subscribing, sending and receiving messages, unsubscribing, and disconnecting between the client and MQTT broker. You can download the source code of the example [here](), and you can also find more demo examples in other languages on [GitHub](https://github.com/emqx/MQTT-Client-Examples).-->

## FAQ

<!-- For example, How to use self-signed certificates? How to use two-way TLS/SSL authentication?-->
