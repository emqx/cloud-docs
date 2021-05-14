# Connect to Deployments with Node.js SDK

In this tutorial, you will learn how to use Node.js **MQTT.js** client to connect to EMQ X Cloud deployment.



## Preparation

* Already [Create Deployment](../deployments/create_deployment.md) in EMQ X Cloud , and the deployment status is **running**

* Install Node.js and NPM

* Install dependencies

  ```bash
  npm install
  // or use yarn
  yarn
  ```

* For basic EMQ X Cloud deployment, it provides TLS/SSL connection authentication by default,  and you also need to download [root certificate](https://static.emqx.net/data/cn.emqx.cloud-ca.crt) For TLS/SSL connection.



## Example Code

Get [Sample Source Code](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Node.js)

* View command line help

  ```bash
  node index.js --help
  ```

* Connect to the deployment and subscribe to messages with the MQTT protocol

  ```bash
  node index.js
  or
  node index.js -p mqtt
  ```

* Connect to the deployment and subscribe to messages with the Websocket protocol

  ```bash
  node index.js -p ws
  ```

* Connect to deployment and subscribe to messages with MQTT over TLS/SSL protocol

  ```bash
  node index.js -p mqtts
  ```

* Connect to deployment and subscribe to messages with Websocket over TLS/SSL protocol

  ```bash
  node index.js -p wss
  ```

