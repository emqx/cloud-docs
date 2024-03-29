# 使用 React 通过 MQTT.js 连接到部署

本文主要介绍如何在 React 框架搭建的 Web 应用程序中使用 `MQTT.js` ，实现客户端与 MQTT 服务器的连接、订阅、收发消息、取消订阅等功能。

## 前置准备

### 获得 MQTT 服务器

- 使用 EMQX 提供的[免费公共 MQTT 服务器](https://www.emqx.com/zh/mqtt/public-mqtt5-broker)（仅支持单向认证），该服务基于 EMQX 的[全托管的 MQTT 消息云服务](https://www.emqx.com/zh/cloud)创建。服务器连接信息如下：

  - 连接地址: **broker.emqx.io**
  - WebSocket 端口: **8083**
  - WebSocket TLS/SSL 端口: **8084**

- 您也可以自己[创建 EMQX Platform 部署](../create/overview.md)，待部署状态为**运行中**，点击部署卡片进入概览页面便可获取相关连接信息。此外，您还需在部署的**访问控制** -> **认证**页面中设置用户名和密码，用于后续的连接验证。

### 创建 React 应用

参考链接：[https://zh-hans.reactjs.org/docs/getting-started.html](https://zh-hans.reactjs.org/docs/getting-started.html)

- 使用 Create React App 创建新的 React 应用

  ```shell
  npx create-react-app react-mqtt-test
  ```

  如需使用 TypeScript 只需要在命令行后加入 --template typescript 参数即可

  ```shell
  npx create-react-app react-mqtt-test --template typescript
  ```

  然后添加 React 项目中需要的 TypeScript 的类型库

  ```shell
  npm install --save typescript @types/node @types/react @types/react-dom @types/jest
  # or
  yarn add typescript @types/node @types/react @types/react-dom @types/jest
  ```

  使用 TypeScript 将不作为本文示例中的使用重点介绍，如需使用，可参考该创建示例和完整的代码示例后自行添加 TypeScript 特性。

- 使用 CDN 链接引入 React

  ```html
  <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
  ```

## 安装依赖

[MQTT.js](https://github.com/mqttjs/MQTT.js) 是一个完全开源的 MQTT 协议的客户端库，使用 JavaScript 编写，可用于 Node.js 和浏览器环境。有关 `MQTT.js` 的更多内容和使用方法，您可以前往查阅 [MQTT.js GitHub 页面](https://github.com/mqttjs/MQTT.js#table-of-contents)。

MQTT.js 支持通过 NPM 或 Yarn 安装，通过 CDN 或相对路径引入。本示例将通过 Yarn 命令安装 MQTT.js，直接引入文件的方法更适用于通过 CDN 使用 Vue 的项目。

1. 通过命令行安装，可以使用 npm 或 yarn 命令（二者选一）

   ```shell
   npm install mqtt --save
   # or
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

## 通过 WebSocket 端口连接

通过以下代码设置客户端 ID、用户名及密码，客户端 ID 应具有唯一性。

```js
const clientId = "emqx_react_" + Math.random().toString(16).substring(2, 8);
const username = "emqx_test";
const password = "emqx_test";
```

通过以下代码建立客户端与 MQTT Broker 的连接。

```js
const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt", {
  clientId,
  username,
  password,
  // ...other options
});
```

## 通过 WebSocket TLS/SSL 端口连接

启用 TLS/SSL 加密时，连接[参数选项](https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options)与通过 WebSocket 端口建立连接一致，您只需注意将协议改为 `wss`，且匹配正确的端口号即可。

通过以下代码建立客户端与 MQTT Broker 的连接。

```js
const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt", {
  clientId,
  username,
  password,
  // ...other options
});
```

## 订阅和发布

### 订阅主题

设置将要订阅的主题及对应 [QoS 等级](https://www.emqx.com/zh/blog/introduction-to-mqtt-qos)。

```javascript
const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        console.log(`Subscribe to topics: ${topic}`)
        setIsSub(true)
      })
    }
  }
```

### 取消订阅

通过以下代码取消订阅，此时应指定取消订阅的主题及对应的 QoS 等级。

```javascript
const mqttUnSub = (subscription) => {
  if (client) {
    const { topic, qos } = subscription
    client.unsubscribe(topic, { qos }, (error) => {
      if (error) {
        console.log('Unsubscribe error', error)
        return
      }
      console.log(`unsubscribed topic: ${topic}`)
      setIsSub(false)
    })
  }
}
```

### 发布消息

```javascript
const mqttPublish = (context) => {
  if (client) {
    // 发布的主题、消息及 QoS
    const { topic, qos, payload } = context;
    client.publish(topic, payload, { qos }, (error) => {
      if (error) {
        console.log("Publish error: ", error);
      }
    });
  }
};
```

### 接收消息

通过以下代码指定客户端对消息事件进行监听，并在收到消息后执行回调函数，将接收到的消息及其主题打印到控制台。

```js
client.on("message", (topic: string, message) => {
  console.log(`received message: ${message} from topic: ${topic}`);
});
```

### 断开连接

如客户端希望主动断开连接，可以通过如下代码实现：

```javascript
const mqttDisconnect = () => {
  if (client.connected) {
    try {
      client.end(false, () => {
        setConnectStatus('Connect')
        console.log('disconnected successfully')
      })
    } catch (error) {
      console.log('disconnect error:', error)
    }
  }
}
```

以上部分仅列出了一些关键代码，项目完整代码请见：[MQTT Client - React](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-React)，您可以进行下载并体验。

## 测试验证

我们使用 React 编写了如下简单的浏览器应用，该应用具备：创建连接、订阅主题、收发消息、取消订阅、断开连接等功能。

![reactmqttpage.png](https://assets.emqx.com/images/d1c51195c056f3b4afb267edaeb217f0.png)

使用 [MQTT 5.0 客户端工具 - MQTTX](https://mqttx.app/zh) 作为另一个客户端进行消息收发测试。

![reactmqttx.png](https://assets.emqx.com/images/621ba9544ea69f9ee7b24203846d0409.png)

可以看到 MQTTX 可以正常接收来自浏览器端发送的消息，同样，使用 MQTTX 向该主题发送一条消息时，也可以看到浏览器端可以正常接收到该消息。

![reactmqtttest.png](https://assets.emqx.com/images/da008ae3544a83a3efa78266190ea364.png)

## 常见问题

1. 是否支持自签名 TLS/SSL 证书？是否支持双向 TLS/SSL 认证？

   由于浏览器的限制，均暂不支持。参考 MQTT.js issue: [如何在浏览器环境中使用双向认证？](https://github.com/mqttjs/MQTT.js/issues/1515)和 [Node.js 中双向认证可用，但在浏览器中不支持](https://github.com/mqttjs/mqtt.js/issues/741)。

## 更多内容

综上所述，我们实现了在 React 项目中创建 MQTT 连接，模拟了客户端与 MQTT 服务器进行订阅、收发消息、取消订阅以及断开连接的场景。

本文使用的 React 版本为 v18.2.0，因此将使用 Hook Component 特性来作为示例代码演示，如有需求也可参考完整的示例代码中的 `ClassMqtt` 组件来使用 Class Component 特性来进行项目构建。

可以在 [MQTT Client - React 页面](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-React)下载完整的示例源码，同时也欢迎前往 [MQTT Client 示例页面](https://github.com/emqx/MQTT-Client-Examples)探索更多其他语言的 Demo 示例。
