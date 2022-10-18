# 使用 Vue.js 连接到部署

本文主要介绍如何在 Vue 项目中使用 `MQTT.js` ，实现客户端与 MQTT 服务器的连接、订阅、收发消息、取消订阅等功能。

[Vue.js](https://cn.vuejs.org) 是一款由尤雨溪及其团队开发的渐进式 Javascript 前端框架。该框架具备数据双向绑定、组件化、响应式和轻量等特点，搭配其脚手架 Vue CLI 使得开发者更加容易上手，大大减少了学习成本。同时其配备一个专用的状态管理模式 Vuex ，在这里可以集中管理所有组件的状态。

[MQTT](https://www.emqx.com/zh/mqtt) 是一种基于发布/订阅模式的 **轻量级物联网消息传输协议**。该协议提供了一对多的消息分发和应用程序的解耦，具备很小的传输消耗和协议数据交换、最大限度减少网络流量和三种不同消息服务质量等级，满足不同投递需求的优势。

## 前提条件

> 1. 已经创建了部署，在 [部署概览](../deployments/view_deployment.md) 下可以查看到连接相关的信息，请确保部署状态为运行中。同时你可以使用 WebSocket 测试连接到 MQTT 服务器。
> 2. 在 `认证鉴权` > `认证` 中设置用户名和密码，用于连接验证。

本项目使用 [Vue CLI](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create) 创建 Vue 项目进行开发和测试，可通过以下命令确认 Vue CLI 的版本（本示例版本为 **v4.x**）并创建一个新项目，也可以 [通过引用 Vue.js 创建 Vue 项目](https://cn.vuejs.org/v2/guide/installation.html)。

```shell
# 检查 Vue CLI 版本
vue --version

# 创建项目
vue create vue-mqtt-test
```

## 安装依赖

[MQTT.js](https://github.com/mqttjs/MQTT.js) 是一个 MQTT 协议的客户端库，使用 JavaScript 编写，用于 Node.js 和 浏览器环境中。是 JavaScript 生态中目前使用最为广泛的 [MQTT 客户端库](https://www.emqx.com/zh/blog/introduction-to-the-commonly-used-mqtt-client-library)。

以下 2、3 方法更适用于通过直接引用 Vue.js 创建的 Vue 项目，本示例使用 **yarn 命令**。

1. 通过命令行安装，可以使用 npm 或 yarn 命令（二者选一）

   ```shell
   npm install mqtt --save
   # 或者 yarn
   yarn add mqtt
   ```

2. 通过 CDN 引入

   ```html
   <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
   ```

3. 下载到本地，然后使用相对路径引入

   ```html
   <script src="/your/path/to/mqtt.min.js"></script>
   ```

## 连接

> 请在控制台的 [部署概览](../deployments/view_deployment.md) 找到相关的地址以及端口信息，需要注意如果是基础版，端口不是 1883 或 8883 端口，请确认好端口。

### 连接设置

本文将使用 EMQX 提供的 [免费公共 MQTT 服务器](https://www.emqx.com/zh/mqtt/public-mqtt5-broker)，该服务基于 EMQX 的 [MQTT 物联网云平台](https://www.emqx.com/zh/cloud) 创建。服务器接入信息如下：

- Broker: **broker.emqx.io**（国内可以使用 broker-cn.emqx.io）
- TCP 端口: **1883**
- WebSocket 端口: **8083**
- WebSocket Secure 端口: **8084**

### 连接关键代码

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

### 订阅主题

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

### 取消订阅

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

### 消息发布

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

### 断开连接

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

项目完整代码请见：[https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Vue.js](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Vue.js)。

## 测试验证

我们使用 Vue 编写了如下简单的浏览器应用，该应用具备：创建连接、订阅主题、收发消息、取消订阅、断开连接等功能。

![vueui.png](https://assets.emqx.com/images/b6563b0eb66eb51a2a02776889016a18.png)

使用 [MQTT 5.0 客户端工具 - MQTT X](https://mqttx.app/zh) 作为另一个客户端进行消息收发测试。

![vuemqttx.png](https://assets.emqx.com/images/2013cbab1bdffcae69b817bfebb4a33f.png)

在 MQTT X 发送第二条消息之前，在浏览器端进行取消订阅操作，浏览器端将不会收到 MQTT X 发送的后续消息。

## 更多内容

综上所述，我们实现了在 Vue 项目中创建 MQTT 连接，模拟了客户端与 MQTT 服务器进行订阅、收发消息、取消订阅以及断开连接的场景。可以在 [这里](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Vue.js) 下载到示例的源码，同时也可以在 [GitHub](https://github.com/emqx/MQTT-Client-Examples) 上找到更多其他语言的 Demo 示例。
