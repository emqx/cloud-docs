# Electron 连接 MQTT 示例

在本教程中您将学习在 Electron 项目中连接到 EMQ X Cloud 部署。

## 先决条件

* 已在 EMQ X Cloud [创建部署](../deployments/create_deployment.md)，并且部署状态为 **running**

* 安装 MQTT.js 客户端库

MQTT 客户端库通过命令行安装

```
npm install mqtt --save
```

安装依赖完成后，如需打开控制台进行调试，需要在 `main.js` 文件中修改代码，将 `win.webContents.openDevTools()` 取消注释。

```javascript
// Open the DevTools.
mainWindow.webContents.openDevTools()
```

如此时未使用前端构建工具对前端页面进行打包构建的话，无法直接在 `renderer.js` 中加载到本地已经安装的 `MQTT.js` 模块。除使用构建工具方法外，还提供另外两种解决方法：

1. 可以在 webPreferences 中设置 nodeIntegration 为 true，当有此属性时, webview 中将具有 Node 集成, 并且可以使用像 `require` 和 `process` 这样的 node APIs 去访问低层系统资源。 Node 集成默认是禁用的。
    ```javascript
    const mainWindow = new BrowserWindow({
       width: 800,
       height: 600,
       webPreferences: {
         nodeIntegration: true,
         preload: path.join(__dirname, 'preload.js')
       }
     })
    ```
2. 可以在 `preload.js` 中进行引入 `MQTT.js` 模块操作。当没有 node integration 时，这个脚本仍然有能力去访问所有的 Node APIs, 但是当这个脚本执行执行完成之后，通过 Node 注入的全局对象（global objects）将会被删除。

## 示例代码

* [如何在 Electron 项目中使用 MQTT](https://www.emqx.io/cn/blog/how-to-use-mqtt-in-electron)
* [Electron 项目连接 MQTT 示例源码](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Electron)
