# 使用 Electron 通过 MQTT.js 连接到部署

本文主要介绍如何在 Electron 项目中使用 [MQTT](https://www.emqx.com/zh/mqtt)，完成一个简单的 MQTT 桌面客户端并实现客户端与 MQTT 服务器的连接、订阅、取消订阅、收发消息等功能。

## 前置准备

### 获得 MQTT 服务器

- 使用 EMQX 提供的[免费公共 MQTT 服务器](https://www.emqx.com/zh/mqtt/public-mqtt5-broker)（仅支持单向认证），该服务基于 EMQX 的[全托管的 MQTT 消息云服务](https://www.emqx.com/zh/cloud)创建。服务器连接信息如下：

  - 连接地址: **broker.emqx.io**
  - TCP 端口: **1883**
  - TCP SSL/TLS 端口：**8883**
  - WebSocket 端口: **8083**
  - WebSocket TLS/SSL 端口: **8084**

- 您也可以自己[创建 EMQX Cloud 部署](../create/overview.md)，待部署状态为**运行中**，点击部署卡片进入概览页面便可获取相关连接信息。此外，您还需在部署的 `认证鉴权` > `认证` 页面中设置用户名和密码，用于后续的连接验证。

### 创建 Electron 应用

[Electron](https://www.electronjs.org/) 是由 GitHub 开发的一个开源框架。它允许使用 `Node.js`（作为后端）和 [Chromium](https://zh.wikipedia.org/wiki/Chromium)（作为前端）完成桌面 GUI 应用程序的开发。Electron 现已被多个开源 Web 应用程序应用于跨平台的桌面端软件开发，著名项目包括 GitHub 的 Atom，微软的 Visual Studio Code，Slack 的桌面应用等。[^1]

一个基础的 Electron 包含三个文件：`package.json`（元数据）、`main.js`（代码）和 `index.html`（图形用户界面）。框架由 Electron 可执行文件（Windows 中为 electron.exe、macOS 中为 electron.app、Linux 中为 electron）提供。开发者可以自行添加标志、自定义图标、重命名或编辑 Electron 可执行文件。

新建项目的方式有很多种，以下简单列举几种：

- 手动创建，在自建项目目录下执行以下操作

  ```shell
  cd your-project

  npm init

  npm i -D electron@latest
  ```

  并参考以下文档中的步骤进行项目搭建。

  地址：<https://www.electronjs.org/docs/tutorial/first-app>

- 通过官方提供的 `electron-quick-start` 模版项目进行快速开发

  地址：<https://github.com/electron/electron-quick-start>

  ```shell
    # Clone this repository
    git clone https://github.com/electron/electron-quick-start
    # Go into the repository
    cd electron-quick-start
    # Install dependencies
    npm install
    # Run the app
    npm start
  ```

- 通过 `electron-react-bolierplate` 的模板项目进行快速开发构建，该模版可使用 `React.js` 进行开发

  地址：<https://github.com/electron-react-boilerplate/electron-react-boilerplate>

  ```shell
  git clone --depth 1 --single-branch https://github.com/electron-react-boilerplate/electron-react-boilerplate.git your-project-name
  cd your-project-name
  yarn
  ```

- 通过 `electron-vue` 进行项目的快速开发构建，将配合使用 `vue-cli` 工具进行项目初始化，该方法可使用 `Vue.js` 进行开发

  地址：<https://github.com/SimulatedGREG/electron-vue>

  ```shell
  # Install vue-cli and scaffold boilerplate
  npm install -g vue-cli
  vue init simulatedgreg/electron-vue my-project
  
  # Install dependencies and run your app
  cd my-project
  yarn # or npm install
  yarn run dev # or npm run dev
  ```

本文为方便快速搭建示例项目，将使用官方提供的 electron quick start 项目模板进行项目初始化构建。

## 安装依赖

通过命令行安装

```shell
npm install mqtt --save
```

安装依赖完成后，如需打开控制台进行调试，需要在 `main.js` 文件中修改代码，将 `win.webContents.openDevTools()` 取消注释。

```javascript
// Open the DevTools.
mainWindow.webContents.openDevTools()
```

如此时未使用前端构建工具对前端页面进行打包构建的话，无法直接在 `renderer.js` 中加载到本地已经安装的 `MQTT.js` 模块。除使用构建工具方法外，还提供另外三种解决方法：

1. 可以在 webPreferences 中设置 nodeIntegration 为 true，当有此属性时, `webview` 中将具有 Node 集成, 并且可以使用像 `require` 和 `process` 这样的 node APIs 去访问低层系统资源。 Node 集成默认是禁用的。

   ```javascript
   const mainWindow = new BrowserWindow({
     width: 800,
     height: 600,
     webPreferences: {
       nodeIntegration: true,
       preload: path.join(__dirname, 'preload.js'),
     },
   })
   ```

2. 可以在 `preload.js` 中进行引入 `MQTT.js` 模块操作。当没有 node integration 时，这个脚本仍然有能力去访问所有的 Node APIs, 但是当这个脚本执行执行完成之后，通过 Node 注入的全局对象（global objects）将会被删除。

3. 可以在 main 主进程中引入 `MQTT.js` 并进行连接操作，使用 Electron 的 IPC 机制来实现不同的进程间相互通信。在 Electron 中，主进程使用 [`ipcMain`](https://www.electronjs.org/zh/docs/latest/api/ipc-main)，渲染进程使用 [`ipcRenderer`](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer) 模块，通过开发人员定义的“通道”传递消息来进行通信。 这些通道是 **任意** （您可以随意命名它们）和 **双向** （您可以在两个模块中使用相同的通道名称）的。欲了解用法示例，请查看[进程间通信（IPC）教程](https://www.electronjs.org/zh/docs/latest/tutorial/ipc)。

## 连接

为更直观表达，示例的关键连接代码将在 `renderer.js` 文件中编写，考虑到安全问题，将使用上文中如何引入 `MQTT.js` 里的方法 2，在 `preload.js` 文件中通过 Node.js API 的 `require` 方法加载已安装的 MQTT 模块，并挂载到全局的 `window` 对象中。

> **注意：** 自 Electron 12 以来，默认开启了[上下文隔离（contextIsolation）](https://www.electronjs.org/docs/latest/tutorial/context-isolation)，虽然预加载脚本与其附着的渲染器共享同一个全局的 `window` 对象，但是并不能从中直接附加任何变动到 `window` 上。

因此我们需要先在 webPreferences 中设置 `contextIsolation: false` 来关闭：

```js
const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false; // Version 12.0.0 above are enabled by default
    }
  })
```

这样在 `renderer.js` 中，便可以直接访问已加载的模块：

- 引入 MQTT 模块

```javascript
// preload.js
const mqtt = require('mqtt')
window.mqtt = mqtt
```

### 通过 TCP 端口连接

通过以下代码设置客户端 ID、用户名及密码，客户端 ID 应具有唯一性。

```js
const clientId = "emqx_vue3_" + Math.random().toString(16).substring(2, 8);
const username = "emqx_test";
const password = "emqx_test";
```

通过以下代码建立客户端与 MQTT Broker 的连接。

```js
const client = mqtt.connect("mqtt://broker.emqx.io:1883", {
  clientId,
  username,
  password,
  // ...other options
});
```

### 通过 TCP TLS/SSL 端口连接

启用 TLS/SSL 加密时，连接[参数选项](https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options)与通过 TCP 端口建立连接一致，您只需注意将协议改为 `mqtts`，且匹配正确的端口号即可。

通过以下代码建立客户端与 MQTT Broker 的连接。

```js
const client = mqtt.connect("mqtts://broker.emqx.io:8883", {
  clientId,
  username,
  password,
  // ...other options
});
```

### 通过 WebSocket 端口连接

MQTT-WebSocket 统一使用 `/path` 作为连接路径，连接时需指明，而 EMQX Broker 使用的路径为 `/mqtt`。

因此使用 WebScoket 连接时，除了需要修改端口号以及切换协议为 `ws` 之外，您还需要加上 `/mqtt` 路径。

通过以下代码建立客户端与 MQTT Broker 的连接。

```js
const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt", {
  clientId,
  username,
  password,
  // ...other options
});
```

### 通过 WebSocket TLS/SSL 端口连接

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

设置将要订阅的主题及对应 [QoS 等级](https://www.emqx.com/zh/blog/introduction-to-mqtt-qos)（可选），并调用 MQTT.js `subscribe` 方法进行订阅操作。

<https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback>

```javascript
function onSub() {
  if (client.connected) {
    const { topic, qos } = subscriber
    client.subscribe(
      topic.value,
      { qos: parseInt(qos.value, 10) },
      (error, res) => {
        if (error) {
          console.error('Subscribe error: ', error)
        } else {
          console.log('Subscribed: ', res)
        }
      }
    )
  }
}
```

### 取消订阅

取消订阅的时候，需要传递不再需要订阅的主题和对应的 QoS（可选）。

<https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback>

```javascript
function onUnsub() {
  if (client.connected) {
    const { topic } = subscriber
    client.unsubscribe(topic.value, (error) => {
      if (error) {
        console.error('Unsubscribe error: ', error)
      } else {
        console.log('Unsubscribed: ', topic.value)
      }
    })
  }
}
```

### 消息发布

发布消息时需要告知 MQTT Broker 对应的主题及消息内容。

<https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback>

```javascript
function onSend() {
  if (client.connected) {
    const { topic, qos, payload } = publisher
    client.publish(topic.value, payload.value, {
      qos: parseInt(qos.value, 10),
      retain: false,
    })
  }
}
```

### 接收消息

```javascript
// 在 onConnect 函数中
client.on('message', (topic, message) => {
  const msg = document.createElement('div')
  msg.className = 'message-body'
  msg.setAttribute('class', 'message-body')
  msg.innerText = `${message.toString()}\nOn topic: ${topic}`
  document.getElementById('article').appendChild(msg)
})
```

### 断开连接

客户端主动断开连接

<https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback>

```javascript
function onDisconnect() {
  if (client.connected) {
    client.end()
    client.on('close', () => {
      connectBtn.innerText = 'Connect'
      console.log(options.clientId + ' disconnected')
    })
  }
}
```

## 测试验证

此时我们配合一款同样使用 Electron 编写的 [MQTT 5.0 客户端工具 - MQTTX](https://mqttx.app/zh) 进行消息的收发测试。

使用 MQTTX 向客户端发送一条消息时，可以看到能正常接收到消息：

![electronmessage.png](https://assets.emqx.com/images/bfb62b9f23f6836627d8e129d38b9160.png)

使用自己编写的客户端向 MQTTX 发送一条消息，此时可以看到 MQTTX 也能正常接收到消息：

![mqttx.png](https://assets.emqx.com/images/cc97fe533fcce20765530970d7696f58.png)

## 更多内容

至此， 我们就完成了使用 Electron 创建一个简单的 MQTT 桌面客户端的过程，并模拟了客户端与 MQTT 服务器进行订阅、收发消息、取消订阅以及断开连接的场景。可以在 [MQTT-Client-Electron 页面](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Electron)下载完整的示例源码，同时也欢迎前往 [MQTT Client 示例页面](https://github.com/emqx/MQTT-Client-Examples)探索更多其他语言的 Demo 示例。

[^1]: https://zh.wikipedia.org/wiki/Electron
