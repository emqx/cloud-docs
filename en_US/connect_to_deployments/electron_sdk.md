# Connect to Deployment using Electron via MQTT.js SDK

This article mainly introduces how to use [MQTT](https://www.emqx.com/en/mqtt) in Electron projects, and complete a simple MQTT desktop client, and implement the connection, subscription, unsubscribe, messaging and other functions between the client and [MQTT broker](https://www.emqx.com/en/cloud).

## Pre preparation

### Deploy MQTT Broker

- You can use the [free public MQTT broker](https://www.emqx.com/en/mqtt/public-mqtt5-broker) provided by EMQX. This service was created based on the [EMQX Cloud](https://www.emqx.com/en/cloud). The information about broker access is as follows:
  - Broker: **broker.emqx.io**
  - TCP Port: 1883
  - SSL/TLS Port: 8883
  - WebSocket Port: 8083
  - WebSocket TLS/SSL Port: 8084
- You can also [create your own MQTT broker](../create/overview.md). After the deployment is in running status, you can find connection information on the deployment overview page. And for the username and password required in the later client connection stage, you can navigate to the **Authentication & ACL** -> **Authentication** section for the setting.

### Creating an Electron Application

[Electron](https://www.electronjs.org/) is an open-source software framework developed and maintained by GitHub. It allows for the development of desktop GUI applications using web technologies: it combines the Chromium rendering engine and the Node.js runtime. Electron is the main GUI framework behind several notable open-source projects including Atom, GitHub Desktop, Light Table, Visual Studio Code, and WordPress Desktop.[^1]

A basic Electron includes three files: `package.json` (metadata) `main.js` (code) and `index.html` (graphical user interface). The frame is provided by the Electron executable file (electron.exe on Windows, electron.app on macOS, electron on Linux). Developers are free to add flags, customize icons, rename or edit Electron executable files.

There are many ways to build a new project, but here is a brief list of a few:

- To create manually, do the following in the self-built project directory

  ```shell
  cd your-project

  npm init

  npm i -D electron@latest
  ```

  Also, refer to the following documentation for the steps to build the project.

  Address: [https://www.electronjs.org/docs/tutorial/first-app](https://www.electronjs.org/docs/tutorial/first-app)

- Rapid development with the official template projects `electron-quick-start`.

  Address: [https://github.com/electron/electron-quick-start](https://github.com/electron/electron-quick-start)

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

- Rapid development builds with the template project `electron-react-bolierplate`, which can be developed using `React.js`.

  Address: <https://github.com/electron-react-boilerplate/electron-react-boilerplate>

  ```shell
  git clone --depth 1 --single-branch https://github.com/electron-react-boilerplate/electron-react-boilerplate.git your-project-name
  cd your-project-name
  yarn
  ```

- The rapid development build of the project via `electron-vue` will be coupled with project initialization using the `vue-cli` tool, which can be developed using `Vue.js`.

  Address: <https://github.com/SimulatedGREG/electron-vue>

  ```shell
  # Install vue-cli and scaffold boilerplate
  npm install -g vue-cli
  vue init simulatedgreg/electron-vue my-project
  
  # Install dependencies and run your app
  cd my-project
  yarn # or npm install
  yarn run dev # or npm run dev
  ```

In this article, the official electron quick start project template will be used to initialize the project in order to quickly build the example project.

## Installation dependencies

Installation through the command line

```shell
npm install mqtt --save
```

After the dependencies are installed, if you want to open the console for debugging, you need to modify the code in `main.js` and uncomment `win.webContents.openDevTools()`.

```javascript
// Open the DevTools.
mainWindow.webContents.openDevTools()
```

In this case, the locally installed `MQTT.js` module cannot be loaded directly into `renderer.js` without using the front-end builder to package the front-end page. In addition to using the build tool method, there are two other ways to solve this:

1. `nodeIntegration` can be set to true in `webPreferences`. When this property is present, `webview` will have Node integration in it, and node APIs like `require` and `process` can be used to access low-level system resources. Node integration is disabled by default.

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

2. The MQTT.js module can be imported in preload.js. When there is no node integration, this script still can access all Node APIs. However, when this script execution completes, global objects injected via Node will be removed.

3. The [MQTT.js](https://www.emqx.com/en/blog/mqtt-js-tutorial) module can be imported in main process and connected. In Electron, processes communicate by passing messages through developer-defined "channels" with the [`ipcMain`](https://www.electronjs.org/docs/latest/api/ipc-main) and [`ipcRenderer`](https://www.electronjs.org/docs/latest/api/ipc-renderer) modules. These channels are **arbitrary** (you can name them anything you want) and **bidirectional** (you can use the same channel name for both modules). For usage examples, check out the [IPC tutorial](https://www.electronjs.org/docs/latest/tutorial/ipc).

## Connection

To illustrate more intuitive, the key connection code for the example will be written in the renderer.js file. With the consideration of security, the installed MQTT module will be loaded via the required method of the Node.js API, in the preload.js file (using method 2 above). Also, this method injecting it in the global window object.

> **Note:** [Context isolation (contextIsolation)](https://www.electronjs.org/docs/latest/tutorial/context-isolation) has been enabled by default since Electron 12, Although preload scripts share a `window` global with the renderer they're attached to, you cannot directly attach any variables from the preload script to `window` because of the [`contextIsolation`](https://www.electronjs.org/docs/latest/tutorial/context-isolation) default.

Therefore, we need to set `contextIsolation: false` in webPreferences to close:

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

So that the loaded module can be accessed directly in `renderer.js`:

- Import MQTT module

```javascript
// preload.js
const mqtt = require('mqtt')
window.mqtt = mqtt
```

### Connect over TCP port

Set the client ID, username, and password using the following code, and the client ID should be unique.

```js
const clientId = 'emqx_vue3_' + Math.random().toString(16).substring(2, 8)
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

### Connect over TCP Secure port

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

### Connect over WebSocket port

MQTT WebSocket uniformly uses `/path` as the connection path, which needs to be specified when connecting, while EMQX Broker uses `/mqtt` as the path.

Therefore, when using WebSocket connection, in addition to modifying the port number and switching the protocol to `ws`, you also need to add the `/mqtt` path.

Establish a connection between the client and MQTT Broker using the following code.

```js
const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt', {
  clientId,
  username,
  password,
  // ...other options
})
```

### Connect over WebSocket Secure port

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

## Subscription and Publishing

### Subscribe to Topics

Set the topic to be subscribed to and its corresponding [QoS level](https://www.emqx.com/zh/blog/introduction-to-mqtt-qos)(Optional) and call the MQTT. js `subscribe` method for subscription operations.

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

### Unsubscribe to Topics

When canceling a subscription, it is necessary to pass on topics that no longer require subscription and corresponding QoS (optional).

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

### Publish messages

When publishing a message, it is necessary to inform MQTT Broker of the corresponding topic and message content.

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

### Receive messages

```javascript
// In the onConnect function
client.on('message', (topic, message) => {
  const msg = document.createElement('div')
  msg.setAttribute('class', 'message-body')
  msg.innerText = `${message.toString()}\nOn topic: ${topic}`
  document.getElementById('article').appendChild(msg)
})
```

### Disconnect from MQTT Broker

Active disconnection by the client

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

## Test the Connection

At this point, we test the sending and receiving of messages with a [MQTT 5.0 client tool - MQTTX](https://mqttx.app), also written in Electron.

When using MQTTX to send a message to the client, you can see that the message is received properly:

![electronmessage.png](https://assets.emqx.com/images/bfb62b9f23f6836627d8e129d38b9160.png)

Send a message to MQTTX using the client you wrote yourself, and now you can see that MQTTX is also receiving the message properly:

![mqttx.png](https://assets.emqx.com/images/cc97fe533fcce20765530970d7696f58.png)

## More

So far, we have completed that use Electron to create a simple MQTT desktop client, and simulate the connection, messaging, unsubscribe and disconnect scenarios between the client and MQTT broker. You can download the complete sample source code on the [MQTT Client Electron page](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Electron), and also welcome to explore more demo examples in other languages on the [MQTT Client Example page](https://github.com/emqx/MQTT-Client-Examples).

[^1]: https://en.wikipedia.org/wiki/Electron_(software_framework)
