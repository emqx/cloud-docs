# Connect to Deployment using Node.js via MQTT.js SDK

This article mainly introduces how to use [MQTT](https://www.emqx.com/en/mqtt) in the Node.js project to realize the functions of connecting, subscribing, unsubscribing, sending and receiving messages between the client and the [MQTT broker](https://www.emqx.com/en/cloud).

## Pre preparation

This project uses Node.js v16.19.1 for development and testing. Readers can confirm the version of Node.js with the following command.

```shell
node --version

v16.19.1
```

### Deploy MQTT Broker

- You can use the [free public MQTT broker](https://www.emqx.com/en/mqtt/public-mqtt5-broker) provided by EMQX. This service was created based on the [EMQX Cloud](https://www.emqx.com/en/cloud). The information about broker access is as follows:
  - Address: **broker.emqx.io**
  - TCP Port: **1883**
  - SSL/TLS Port: **8883**
  - WebSocket Port: **8083**
  - WebSocket over TLS/SSL Port: **8084**
- You can also [create your own MQTT broker](../create/overview.md). After the deployment is in running status, you can find connection information on the deployment overview page. And for the username and password required in the later client connection stage, you can navigate to the **Authentication & ACL** -> **Authentication** section for the setting.

## Install Dependencies

[MQTT.js](https://github.com/mqttjs/MQTT.js) is a fully open-source client-side library for the MQTT protocol, written in JavaScript and available for Node.js and browsers. For more information and usage of `MQTT.js`, please refer to the [MQTT.js GitHub](https://github.com/mqttjs/MQTT.js#table-of-contents).

MQTT.js can be installed via NPM or Yarn, or can be imported through CDN or relative path. This example will install MQTT.js through Yarn command.

- Using NPM or Yarn：

  Install MQTT.js

  ```shell
  # NPM
  npm install mqtt
  # or Yarn
  yarn add mqtt
  ```

## Connect over TCP port

You can set a client ID, username, and password with the following code. The client ID should be unique.

```js
const clientId = 'emqx_nodejs_' + Math.random().toString(16).substring(2, 8)
const username = 'emqx_test'
const password = 'emqx_test'
```

Establish a connection between the client and MQTT Broker using the following code.

```js
const client = mqtt.connect('mqtt://broker.emqx.io:1883', {
  clientId,
  username,
  password,
  // ...other options
})
```

## Connect over TCP Secure port

If TLS/SSL encryption is enabled, the connection [parameter options](https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options) are consistent with establishing a connection through the TCP port. You only need to pay attention to changing the protocol to `mqtts` and matching the correct port number.

Establish a connection between the client and MQTT Broker using the following code.

```js
const client = mqtt.connect('mqtts://broker.emqx.io:8883', {
  clientId,
  username,
  password,
  // ...other options
})
```

## Connect over WebSocket Port

MQTT WebSocket uniformly uses `/path` as the connection path, which needs to be specified when connecting, while EMQX Broker uses `/mqtt` as the path.

Therefore, when using WebScoket connection, in addition to modifying the port number and switching the protocol to `ws`, you also need to add the `/mqtt` path.

Establish a connection between the client and MQTT Broker using the following code.

```js
const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt', {
  clientId,
  username,
  password,
  // ...other options
})
```

## Connect over WebSocket Secure Port

If TLS/SSL encryption is enabled, the connection [parameter option](https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options) is consistent with establishing a connection through the WebSocket port. You only need to pay attention to changing the protocol to 'wss' and matching the correct port number

Establish a connection between the client and MQTT Broker using the following code.

```js
const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt', {
  clientId,
  username,
  password,
  // ...other options
})
```

## Subscribe and Publish

### Subscribe to Topics

Specify a topic and the corresponding [QoS level](https://www.emqx.com/zh/blog/introduction-to-mqtt-qos) to be subscribed.

```javascript
const topic = '/nodejs/mqtt'
const qos = 0

client.subscribe(topic, { qos }, (error) => {
  if (error) {
    console.log('subscribe error:', error)
    return
  }
  console.log(`Subscribe to topic '${topic}'`)
})
```

### Unsubscribe to Topics

You can unsubscribe using the following code, specifying the topic and corresponding QoS level to be unsubscribed.

```javascript
const topic = '/nodejs/mqtt'
const qos = 0
client.unsubscribe(topic, { qos }, (error) => {
  if (error) {
    console.log('unsubscribe error:', error)
    return
  }
  console.log(`unsubscribed topic: ${topic}`)
})
```

### Publish Messages

When publishing a message, the MQTT broker must be provided with information about the target topic and message content.

```javascript
const topic = '/nodejs/mqtt'
const payload = 'nodejs mqtt test'
const qos = 0

client.publish(topic, payload, { qos }, (error) => {
  if (error) {
    console.error(error)
  }
})
```

### Receive Messages

The following code listens for message events and prints the received message and topic to the console when a message is received.

```javascript
client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})
```

### Disconnect from MQTT Broker

To disconnect the client from the broker, use the following code:

```javascript
if (client.connected) {
  try {
    client.end(false, () => {
      console.log('disconnected successfully')
    })
  } catch (error) {
    console.log('disconnect error:', error)
  }
}
```

The above section only shows some key code snippets, for the full project code, please refer to [MQTT-Client-Node.js](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Node.js). You can download and try it out yourself.

## Test the Connection

We add a line of startup script to the script field in the package.json file.

```json
"scripts": {
  "start": "node index.js"
}
```

Then we can simply use `npm start` to run the project.

```shell
npm start
```

After running, we can see the output information of the console as follows:

![NodeJS MQTT Start](https://assets.emqx.com/images/9897e6cd56163dfe7139cf6d84361e63.png)

We see that the client has successfully connected to the [MQTT broker](https://www.emqx.io) and subscribed to the topic, received and published messages successfully. At this point, we will use [MQTT 5.0 Client Tool - MQTT X](https://mqttx.app) as another client for the message publishing and receiving test.

![MQTT 5.0 Client Tool - MQTT X](https://assets.emqx.com/images/5c841598f78eed0b186572165832f861.png)

We can see that the message sent by MQTT X is printed in the console.

![MQTT messages](https://assets.emqx.com/images/02d8a35312ca1309f18a628dacca8910.png)

## More

In conclusion, we have implemented creating MQTT connections in a Node.js project and simulated scenarios of subscribing, publishing messages, unsubscribing, and disconnecting between clients and MQTT servers. You can download the complete example source code on the [MQTT-Client-Node.js page](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Node.js), and we also welcome you to explore more demo examples in other languages on the [MQTT Client example page](https://github.com/emqx/MQTT-Client-Examples).
