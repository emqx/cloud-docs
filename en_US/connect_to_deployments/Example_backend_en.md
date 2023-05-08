# Connect to Deployment via XXX SDK


This page mainly introduces how to use Paho XXX in XXX project to implement the connection, subscription, messaging, unsubscription, and other functions between the client and MQTT broker. <!--Elaborate the functions according to needs.-->

<!--Do not introduce the language or MQTT. You can introduce, for example, Paho XXX.-->

<!--Other information, such as other frameworks, tools or version limitations-->


This page demonstrates how to connect XXX client to MQTT Broker via the TCP port and SSL/TLS port respectively. For Serverless deployments, see the demonstration on TLS/SSL port connection.

## Prerequisites

<!--Describe the concepts that must be known and environments that must be established.-->

### Deploy MQTT Broker

- You can use the [free public MQTT broker](https://www.emqx.com/en/mqtt/public-mqtt5-broker) provided by EMQX. This service was created based on the [EMQX Cloud](https://www.emqx.com/en/cloud). The information about broker access is as follows:

  + Broker: **broker.emqx.io**
  + TCP Port: **1883**
  + TLS/SSL Port: **8883**

- You can [create a deployment](https://docs.emqx.com/en/cloud/latest/create/overview.html) as well. Find connection information in the deployment overview. Make sure the deployment is running. At the same time, you can use WebSocket to test the connection to the MQTT server. If you are creating your own deployment, check [Authentication](https://docs.emqx.com/en/cloud/latest/deployments/auth_overview.html) and set the username and password in `Authentication & ACL` > `Authentication` for verification.

### <!--XXX e.g. Maven-->

<!--This project uses Maven to build....You needs to install Maven...-->

## Installation Dependency

<!--Describe the steps for how to install or import MQTT.js based on different projects and other dependencies if any.-->

## Connect over TCP Port

This section introduces how to connect XXX to the MQTT Broker over TCP port.


1. Import libraries XXX. <!--optional-->

   ```
   XXXX
   ```

2. <!--Describe how to set the username and password-->
   <!--There is no need to set user name and password if you use the public MQTT broker. If you create your own deployment, you need to demonstrade how to set the username and password.-->

   ```
   XXXX
   ```

3. <!--Describe how to connect to the MQTT Broker / write MQTT code XXX-->
   <!--Add other information as needed according to projects.-->

   ```
   XXXX
   ```


## Connect over SSL/TLS Port

This section introduces how to connect XXX to the MQTT Broker over SSL/TLS port.


1. Import libraries XXX. <!--optional-->

   ```
   XXXX
   ```

2. <!--Describe how to set the username and password-->
   <!--There is no need to set user name and password if you use the public MQTT broker. If you create your own deployment, you need to demonstrade how to set the username and password.-->

   ```
   XXXX
   ```

3. <!--Set server-side certificate (optional)-->
   <!--Describe how to upload certificates, or how to set the certificate, for example,
   `client.tls_set(ca_certs='./broker.emqx.io-ca.crt')`-->

   ```
   XXXX
   ```

4. <!--Describe how to connect to the MQTT Broker / write MQTT code XXX-->
   <!--Add other information as needed according to projects.-->

   ```
   XXXX
   ```

## Publish and Subscribe

This section introduces how to subscribe to topics and publish messages after you successfully connect to the MQTT broker.

### Subscribe to Topics

Set the topic for subscription and the [QoS Level](https://www.emqx.com/en/blog/introduction-to-mqtt-qos) of the topic.

<!--Add other information as needed according to projects.-->

```js
xxxx
```

### Unsubscribe to Topics

Use the following codes to unsubscribe to topics. You need to define the topic for unsubscription and the QoS level.

<!--Add other information as needed according to projects.-->

```js
xxxx
```

### Publish Messages

Inform MQTT Broker about the topic and payload when publishing messages.

<!--Add other information as needed according to projects.-->

```js
xxxx
```

### Receive Messages

The following code specifies that the client listens for message events and executes a callback function after receiving a message, printing the received message and its topic to the console.
<!--Add other information as needed according to projects.-->

```js
xxxx
```

### Disconnect from MQTT Broker

If the client wants to disconnect actively, use the following code:

```
XXXX
```

The above section only lists some key codes. For the complete code of the project, please refer to: XXXX. You can download and experience it.

## Test Connection

<!--Describe the testing procedure using testing tools and add screenshots.-->


## More Information

<!--In summary, you have implemented the creation of an MQTT connection in XXX project, and simulated subscribing, sending and receiving messages, unsubscribing, and disconnecting between the client and MQTT broker. You can download the source code of the example [here](), and you can also find more demo examples in other languages on [GitHub](https://github.com/emqx/MQTT-Client-Examples).-->

## FAQ

<!-- For example, How to use self-signed certificates? How to use two-way TLS/SSL authentication?-->
