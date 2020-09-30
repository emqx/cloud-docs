# Vue 连接 MQTT 示例

在本教程中您将学习在 Vue 项目中连接到 EMQ X Cloud 部署。

## 先决条件

* 已在 EMQ X Cloud [创建部署](../deployments/create_deployment.md)，并且部署状态为 **running**

* 安装 Node.js 和 NPM

* 安装 MQTT.js 客户端库

安装 MQTT 客户端库，可以选用以下方法。

> 以下 2，3 方法更适用于通过直接引用 Vue.js 创建的 Vue 项目。

1. 通过命令行安装，可以使用 npm 或 yarn 命令（二者选一）
    ```
    npm install mqtt --save
    ```
    ```
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

## 示例代码

* [如何在 Vue 项目中使用 MQTT](https://www.emqx.io/cn/blog/how-to-use-mqtt-in-vue)
* [Vue 项目连接 MQTT 示例源码](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Vue.js)
