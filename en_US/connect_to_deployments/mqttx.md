# Use MQTTX to Test Connection

This article will introduce using MQTTX as an MQTT client testing tool to connect the deployment of EMQX Platform.

[MQTTX](https://mqttx.app) is a cross-platform MQTT 5.0 client tool open sourced by [EMQ](https://emqx.com/en), which can run on macOS, Linux and Windows, and supports formatting MQTT payload.

[MQTTX](https://mqttx.app) simplifies the operation logic of the page with the help of chatting software. The user can quickly create a connection to save and establish multiple connection clients at the same time. It is convenient for the user to quickly test the connection of `MQTT/TCP`、`MQTT/TLS`, and `MQTT/WebSocket` Publish / Subscribe functions and other features.

## Preconditions

> 1. [Install](https://www.emqx.com/en/downloads/MQTTX) MQTTX client tool
> 2. Already Create Deployment in EMQX Platform, and the deployment status is **running**

Before downloading and installing, please visit our [website](https://mqttx.app/) or [GitHub](https://github.com/emqx/MQTTX) to get the latest version information. The latest version helps to improve the using experience. If you are familiar with this project, you can also directly clone [MQTTX](https://github.com/emqx/MQTTX) repository source code, package and use it yourself. During using, if you have any questions, you can go to [GitHub issues](https://github.com/emqx/MQTTX/issues) to post questions and opinions or Fork our project, and submit a revised PR to us, We will carefully review and reply.

## Connection Configuration

### Broker Information

Get the connection address and port in the Deployment Overview (the following **xxxxx represents a random port**, the specific port information **please refer to the information on the deployment overview page**).

- Dedicated plan address: IP; port: 1883(mqtt), 8083(ws) is enabled by default, you can enable port 8883(mqtts) and 8084(wss) by configuring TLS/SSL
- BYOC plan address: the domain name specified at deployment time; port: 1883 (mqtt), 8083 (ws), 8883 (mqtts), 8884 (wss)

### Authentication

All deployments of EMQX Platform have user authentication enabled, so when using MQTTX to test the connection, **you need to fill in the Username and Password fields**.

> Set the Username and Password in `Access Control` > `Authentication`, which can be added one by one, or can be imported at once

### Protocol

- Connect to deployment with MQTT protocol

![MQTTX uses MQTT protocol](./_assets/mqttx_mqtt.png)

- Connect to the deployment with the WebSocket protocol

![MQTTX uses WS protocol](./_assets/mqttx_ws.png)

- Connect to deployment with MQTT over TLS/SSL protocol

![MQTTX uses MQTTS protocol](./_assets/mqttx_mqtts.png)

- Connect to deployment with WebSocket over TLS/SSL protocol

![MQTTX uses WSS protocol](./_assets/mqttx_wss.png)

### Name & Client ID

The name is an identification of this connection, the client ID has been filled in by default, and you can click the refresh icon on the right to refresh. After filling in the appeal information correctly, click the connect button in the upper right corner to connect to the EMQX Platform deployment.

### More

- For more subscription, publishing and other functions, please refer to: [MQTTX Guideline](https://www.emqx.com/en/blog/mqtt-x-guideline)
- [MQTTX Script Function Tutorial](https://www.emqx.com/en/blog/mqttx-script-function-tutorial)
- [MQTTX - an elegant cross-platform MQTT 5.0 desktop client](https://www.emqx.com/en/blog/mqtt-x-elegant-cross-platform-mqtt5-desktop-client)
