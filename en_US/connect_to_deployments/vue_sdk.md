# Connect to Deployment using Vue.js via MQTT.js SDK

This article mainly introduces how to use MQTT.js in a web application built on the Vue 3 framework, and implement the connection, subscription, messaging, unsubscribing and other functions between the client and MQTT broker.

This article demonstrates the code using Vue 3. If you are using Vue 2, please refer to [Vue 2 MQTT Connection Demo](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Vue.js).

## Prerequisites

### Deploy MQTT Broker

- You can use the [free public MQTT broker](https://www.emqx.com/en/mqtt/public-mqtt5-broker) provided by EMQX. This service was created based on the [EMQX Platform](https://www.emqx.com/en/cloud). The information about broker access is as follows:

  - Address: **broker.emqx.io**
  - WebSocket Port: **8083**
  - WebSocket over TLS/SSL Port: **8084**

- You can also [create your own MQTT broker](../create/overview.md). After the deployment is in running status, you can find connection information on the deployment overview page. And for the username and password required in the later client connection stage, you can navigate to the **Access Control** -> **[Authentication](../deployments/deafult_auth.md)** for the setting.

### Creating a Vue Application

To create a Vue application, you can refer to the [Creating a Vue Application](https://vuejs.org/guide/quick-start.html#creating-a-vue-application) section in the Vue documentation. Note that this example uses Node 16.16.0.

## Install Dependencies

[MQTT.js](https://github.com/mqttjs/MQTT.js) is a fully open-source client-side library for the MQTT protocol, written in JavaScript and available for Node.js and browsers. For more information and usage of `MQTT.js`, please refer to the [MQTT.js GitHub](https://github.com/mqttjs/MQTT.js#table-of-contents).

MQTT.js can be installed via NPM or Yarn, or can be imported through CDN or relative path. This example will install MQTT.js through NPM command. Directly importing files is more suitable for projects that use Vue through CDN.

- Using NPM or Yarn：

  Install MQTT.js

  ```shell
  # NPM
  npm install mqtt
  # or Yarn
  yarn add mqtt
  ```

  After successful installation, you still need to import MQTT.js. For more details, You can refer to [Vite Support](https://github.com/mqttjs/MQTT.js/issues/1269).

  ```js
  import * as mqtt from "mqtt/dist/mqtt.min";
  ```

- Using MQTT.js from CDN:

  ```html
  <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
  ```

- Download and place it in a project, then import it using a relative path:

  ```html
  <script src="/your/path/to/mqtt.min.js"></script>
  ```

## Connect over WebSocket Port

You can set a client ID, username, and password with the following code. The client ID should be unique.

```js
const clientId = "emqx_vue3_" + Math.random().toString(16).substring(2, 8);
const username = "emqx_test";
const password = "emqx_test";
```

You can establish a connection between the client and the MQTT broker using the following code:

```js
const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt", {
  clientId,
  username,
  password,
  // ...other options
});
```

## Connect over WebSocket Secure Port

If TLS/SSL encryption is enabled, the connection [parameter options](https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options) are the same as for establishing a connection via the WebSocket port, you just need to be careful to change the protocol to `wss` and match the correct port number.

You can establish a connection between the client and the MQTT broker using the following code:

```js
const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt", {
  clientId,
  username,
  password,
  // ...other options
});
```

## Subscribe and Publish

### Subscribe to Topics

Specify a topic and the corresponding [QoS level](https://www.emqx.com/zh/blog/introduction-to-mqtt-qos) to be subscribed.

```js
// Topic & QoS
const subscription = ref({
  topic: "topic/mqttx",
  qos: 0 as mqtt.QoS,
});

const doSubscribe = () => {
  const { topic, qos } = subscription.value;
  client.subscribe(
    topic,
    { qos },
    (error: Error, granted: mqtt.ISubscriptionGrant[]) => {
      if (error) {
        console.log("subscribe error:", error);
        return;
      }
      console.log("subscribe successfully:", granted);
    }
  );
};
```

### Unsubscribe to Topics

You can unsubscribe using the following code, specifying the topic and corresponding QoS level to be unsubscribed.

```js
const doUnSubscribe = () => {
  const { topic, qos } = subscription.value;
  client.unsubscribe(topic, { qos }, (error) => {
    if (error) {
      console.log("unsubscribe error:", error);
      return;
    }
    console.log(`unsubscribed topic: ${topic}`);
  });
};
```

### Publish Messages

When publishing a message, the MQTT broker must be provided with information about the target topic and message content.

```js
const publish = ref({
  topic: "topic/browser",
  payload: '{ "msg": "Hello, I am browser." }',
  qos: 0 as mqtt.QoS,
});

const doPublish = () => {
  const { topic, qos, payload } = publish.value;
  client.publish(topic, payload, { qos }, (error) => {
    if (error) {
      console.log("publish error:", error);
      return;
    }
    console.log(`published message: ${payload}`);
  });
};
```

### Receive Messages

The following code listens for message events and prints the received message and topic to the console when a message is received.

```js
client.on("message", (topic: string, message) => {
  console.log(`received message: ${message} from topic: ${topic}`);
});
```

### Disconnect from MQTT Broker

To disconnect the client from the broker, use the following code:

```js
const destroyConnection = () => {
  if (client.connected) {
    try {
      client.end(false, () => {
        console.log("disconnected successfully");
      });
    } catch (error) {
      console.log("disconnect error:", error);
    }
  }
};
```

The above section only shows some key code snippets, for the full project code, please refer to [MQTT Client - Vue3](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Vue3.js). You can download and try it out yourself.

## Test the Connection

We have created a simple MQTT client using Vue 3 that includes functions such as creating a connection, subscribing to a topic, sending and receiving messages, unsubscribing, and disconnecting. You can check out the full code at [MQTT Client Vue3](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Vue3.js).

![vueui.png](https://assets.emqx.com/images/b6563b0eb66eb51a2a02776889016a18.png)

Use [MQTT 5.0 client tool - MQTTX](https://mqttx.app/) as another client to test messaging.

![vuemqttx.png](https://assets.emqx.com/images/2013cbab1bdffcae69b817bfebb4a33f.png)

If you unsubscribe on the browser-side, before MQTTX sends the second message, the browser will not receive the subsequent messages from MQTTX.

## FAQ

1. How to use self-signed certificates? How to use two-way TLS/SSL authentication?

   Due to the browser limitations, it is not supported temporarily. For more details, please refer to the MQTT.js issue: [How to use TLS/SSL two-way authentication connections in browser?](https://github.com/mqttjs/MQTT.js/issues/1515) and [Two-way authentication is available in Node.js, but not supported in browsers](https://github.com/mqttjs/mqtt.js/issues/741).

## More

In conclusion, we have implemented creating MQTT connections in a Vue 3 project and simulated scenarios of subscribing, publishing messages, unsubscribing, and disconnecting between clients and MQTT servers. You can download the complete example source code on the [MQTT Client - Vue3 page](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Vue3.js), and we also welcome you to explore more demo examples in other languages on the [MQTT Client example page](https://github.com/emqx/MQTT-Client-Examples).
