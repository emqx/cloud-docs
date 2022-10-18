# Connect to the Deployment with Vue.js

This article mainly introduces how to use `MQTT.js` in the Vue project, and implement the connection, subscription, messaging, unsubscribing and other functions between the client and MQTT broker.

[Vue.js](https://vuejs.org) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.

[MQTT](https://www.emqx.com/en/mqtt) is a kind of **lightweight IoT messaging protocol** based on the publish/subscribe model. This protocol provides one-to-many message distribution and decoupling of applications. It has several advantages which are low transmission consumption and protocol data exchange, minimized network traffic, three different service quality levels of message which can meet different delivery needs.

## Preconditions

> 1. The deployment has been created. You can view connection-related information under [Deployment Overview](../deployments/view_deployment.md). Please make sure that the deployment status is running. At the same time, you can use WebSocket to test the connection to the MQTT server.
> 2. Set the user name and password in `Authentication & ACL` > `Authentication` for connection verification.

This project uses [Vue CLI](https://cli.vuejs.org/guide/creating-a-project.html#vue-create) to create a Vue project for development and testing. You can confirm the Vue CLI by using the following command (this example version is **v4.x**) and create a new project, or you can [create a Vue project by referencing Vue.js](https://vuejs.org/v2/guide/installation.html).

```shell
# check Vue CLI version
vue --version

# create project
vue create vue-mqtt-test
```

## Install dependencies

[MQTT.js](https://github.com/mqttjs/MQTT.js) is a client library of the MQTT protocol, written in JavaScript and used in Node.js and browser environments. It is currently the most widely used [MQTT client library](https://www.emqx.com/en/blog/introduction-to-the-commonly-used-mqtt-client-library) in the JavaScript ecosystem.

The following method 2 and 3 are more suitable for the project that directly introduces Vue.js, This example uses the **yarn command**.

1. Installed from the command line, either using npm or yarn (one or the other)

   ```shell
   npm install mqtt --save
   # or yarn
   yarn add mqtt
   ```

2. Import via CDN

   ```html
   <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
   ```

3. Download locally, then import using relative paths

   ```html
   <script src="/your/path/to/mqtt.min.js"></script>
   ```

## Connection

> Please find the relevant address and port information in the [Deployment Overview](../deployments/view_deployment.md) of the Console. Please note that if it is the basic edition, the port is not 1883 or 8883, please confirm the port.

### Connection settings

This article will use the [free public MQTT broker](https://www.emqx.com/en/mqtt/public-mqtt5-broker) provided by EMQX. This service was created based on the [EMQX Cloud](https://www.emqx.com/en/cloud). The information about broker access is as follows:

- Broker: **broker.emqx.io**
- TCP Port: **1883**
- WebSocket Port: **8083**
- WebSocket Secure Port: **8084**

### The key code of connection

```html
<script>
  import mqtt from "mqtt";

  export default {
    data() {
      return {
        connection: {
          protocol: "ws",
          host: "broker.emqx.io",
          // ws: 8083; wss: 8084
          port: 8083,
          endpoint: "/mqtt",
          // for more options, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
          clean: true,
          connectTimeout: 30 * 1000, // ms
          reconnectPeriod: 4000, // ms
          clientId: "emqx_vue_" + Math.random().toString(16).substring(2, 8),
          // auth
          username: "emqx_test",
          password: "emqx_test",
        },
        subscription: {
          topic: "topic/mqttx",
          qos: 0,
        },
        publish: {
          topic: "topic/browser",
          qos: 0,
          payload: '{ "msg": "Hello, I am browser." }',
        },
        receiveNews: "",
        qosList: [0, 1, 2],
        client: {
          connected: false,
        },
        subscribeSuccess: false,
        connecting: false,
        retryTimes: 0,
      };
    },

    methods: {
      initData() {
        this.client = {
          connected: false,
        };
        this.retryTimes = 0;
        this.connecting = false;
        this.subscribeSuccess = false;
      },
      handleOnReConnect() {
        this.retryTimes += 1;
        if (this.retryTimes > 5) {
          try {
            this.client.end();
            this.initData();
            this.$message.error(
              "Connection maxReconnectTimes limit, stop retry"
            );
          } catch (error) {
            this.$message.error(error.toString());
          }
        }
      },
      createConnection() {
        try {
          this.connecting = true;
          const { protocol, host, port, endpoint, ...options } =
            this.connection;
          const connectUrl = `${protocol}://${host}:${port}${endpoint}`;
          this.client = mqtt.connect(connectUrl, options);
          if (this.client.on) {
            this.client.on("connect", () => {
              this.connecting = false;
              console.log("Connection succeeded!");
            });
            this.client.on("reconnect", this.handleOnReConnect);
            this.client.on("error", (error) => {
              console.log("Connection failed", error);
            });
            this.client.on("message", (topic, message) => {
              this.receiveNews = this.receiveNews.concat(message);
              console.log(`Received message ${message} from topic ${topic}`);
            });
          }
        } catch (error) {
          this.connecting = false;
          console.log("mqtt.connect error", error);
        }
      },
    },
  };
</script>
```

### Subscribe topic

```js
doSubscribe() {
  const { topic, qos } = this.subscription
  this.client.subscribe(topic, { qos }, (error, res) => {
    if (error) {
      console.log('Subscribe to topics error', error)
      return
    }
    this.subscribeSuccess = true
    console.log('Subscribe to topics res', res)
  })
},
```

### Unsubscribe

```js
doUnSubscribe() {
  const { topic } = this.subscription
  this.client.unsubscribe(topic, error => {
    if (error) {
      console.log('Unsubscribe error', error)
    }
  })
}
```

### Publish messages

```js
doPublish() {
  const { topic, qos, payload } = this.publish
  this.client.publish(topic, payload, { qos }, error => {
    if (error) {
      console.log('Publish error', error)
    }
  })
}
```

### Disconnect

```js
destroyConnection() {
  if (this.client.connected) {
    try {
      this.client.end(false, () => {
        this.initData()
        console.log('Successfully disconnected!')
      })
    } catch (error) {
      console.log('Disconnect failed', error.toString())
    }
  }
}
```

The complete code for this project: [https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Vue.js](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Vue.js).

## Test

We use Vue to write the following simple browser application. This application has: create connection, subscribe topic, messaging, unsubscribe, disconnect and other functions.

![vueui.png](https://assets.emqx.com/images/b6563b0eb66eb51a2a02776889016a18.png)

Use [MQTT 5.0 client tool - MQTT X](https://mqttx.app/) as another client to test messaging.

![vuemqttx.png](https://assets.emqx.com/images/2013cbab1bdffcae69b817bfebb4a33f.png)

If you unsubscribe on the browser-side, before MQTT X sends the second message, the browser will not receive the subsequent messages from MQTT X.

## More

In summary, we have implemented the creation of an MQTT connection in a Vue project, simulated subscribing, sending and receiving messages, unsubscribing, and disconnecting between the client and MQTT broker. You can download the source code of the example [here](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Vue.js), and you can also find more demo examples in other languages on [GitHub](https://github.com/emqx/MQTT-Client-Examples).
