# Dedicated, Premium and BYOC Connection Guide

This page introduces the protocols and ports used for connecting to the Dedicated, Premium and BYOC deployments and provides a troubleshooting guide for connection issues.

## Protocols and Ports Q&A

The following table lists the protocols and ports used for connecting to the Dedicated and BYOC deployments.

| **Plans**                | **TCP port(mqtt)** | **MQTT over TLS/SSL port (mqtts)** | **WebSocket port(ws)** | **WebSocket over TLS/SSL port(wss)** |
| ------------------------ | ------------------ | ---------------------------------- | ---------------------- | ------------------------------------ |
| Decicated / Premium | 1883               | 8883 (Need TLS/SSL configuration)  | 8083                   | 8084 (Need TLS/SSL configuration)    |
| BYOC                     | 1883               | 8883                               | 8083                   | 8084                                 |


### What are MQTT over TCP and WebSocket?

The standard MQTT is a lightweight publish and subscribe messaging protocol for asynchronous data communication. It is built on the TCP/IP stack and can scale in unreliable network environments. Therefore, it is suitable for scenarios where device hardware storage space or network bandwidth is limited. 

WebSocket protocol is a new network protocol based on TCP, which enables the creation of a persistent connection between a browser and a server through a single handshake. Since there is no need for repeated handshakes between the browser and server, bi-directional data exchange between the two becomes much simpler. Specifically, WebSocket in MQTT refers to establishing a connection using WebSocket first and then communicating over the WebSocket channel using the MQTT protocol, i.e. MQTT over WebSocket, which is mainly used for connections in the browser environment.

Both standard MQTT over TCP and WebSocket are unencrypted, so there can be safety risks.


The MQTT over TCP port is 1883, which corresponds to the `mqtt`. The WebSocket port is 8083, which corresponds to the `ws`.


### How to Use MQTT over TCP and WebSocket Ports?

You can view the sample code for testing and connecting by using SDK Demos at [Client Connection Guidelines](../connect_to_deployments/overview.md).


### What are MQTT over TLS/SSL and WebSocket over TLS/SSL？

MQTT over TLS/SSL and WebSocket over TLS/SSL means to add TLS/SSL encryption to MQTT or WebSocket protocol communication. In this way, the communication is secured from eavesdropping and tampering.

The MQTT over TLS/SSL port is 8883, which corresponds to the 'mqtts'. The WebSocket over TLS/SSL port is 8084, which corresponds to the 'wss'.


### How to Use MQTT over TLS/SSL and WebSocket over TLS/SSL Ports in a Dedicated Plan?

The Dedicated plan supports customized one-way/two-way TLS/SSL. You need to enable it via [Configure TLS/SSL](../deployments/tls_ssl.md). Then, you can connect directly through port 8883 (mqtts) and port 8084 (wss) on the deployment overview.

### How to Use MQTT over TLS/SSL and WebSocket over TLS/SSL Ports in a BYOC Deployment?

The BYOC deployment supports customized one-way TLS/SSL certificates which are configured during the creation of the deployment. You can connect directly through port 8883 (mqtts) and port 8084 (wss) on the deployment overview.


### How to Write Client's Code for TLS/SSL Connection?

You can check sample code (TLS-related sample code) to write client's code.

[Python](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Python3)<br>
[Java](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Java)<br>
[GO](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Go)<br>
[Node.js](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Node.js)<br>
[ESP 32](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-ESP32)<br>
[ESP 8266](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-ESP8266)<br>
[Android](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Android)<br>
[swift](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-swift)<br>

## Connection Troubleshooting Guide

If you encounter problems when connecting to a deployment, follow the steps in this guide based on your deployment plan for troubleshooting and self-diagnosis.

### Dedicated / Premium Plan

If you encounter problems connecting to the Dedicated / Premium plan, self-diagnose and troubleshoot using the following steps:

1. **Check the connection address**. Ensure you are using the **correct IP address** provided by the Dedicated plan for connection. Note that the Dedicated plan supports direct connection using IP addresses and encrypted connection through custom TLS/SSL configuration. If you need a domain name as the connection address, you can point the Dedicated plan's connection IP address to your own domain name.

2. **Confirm the connection port**. The Dedicated plan by default opens the 1883 (MQTT) and 8083 (WebSocket) ports. You can open the secure 8883 (MQTTS) and 8084 (WSS) ports through TLS/SSL configuration. The roles of different ports are as follows:

   - MQTT and WebSocket ports: These ports support plaintext transmission without encryption during transmission, suitable for scenarios where data encryption is not required, such as internal network communication or development environments.
   - MQTTS and WSS ports: These ports support secure transmission using TLS/SSL encryption, providing higher security, and are suitable for scenarios requiring encrypted communication, such as production environments or sensitive data transmission.

3. **Test network connectivity**. Use the `telnet` command to test the network connectivity between your server and the Dedicated plan. 

   For example, you can run the following command to test connection to the Dedicated plan's MQTT port: telnet <Dedicated Edition deployment's IP address> 1883; or if you enabled TLS/SSL, test connection to the MQTTS port: telnet <Dedicated Edition deployment's IP address> 8883.

   Replace `<Dedicated Edition deployment's IP address>` with your actual deployment address.

4. **Verify authentication information**. EMQX Dedicated plan does not support anonymous authentication. Please ensure that you have correctly configured the MQTT client's username and password in the EMQX Platform console and have made the correct configuration during the client connection.

5. **Test using the MQTTX client**. We recommend using MQTTX as a MQTT client testing tool. It's a free and easy-to-use cross-platform MQTT 5.0 client. You can use it to verify if the inability to connect is due to issues with the client code. For detailed instructions, see: [MQTTX Documentation](../connect_to_deployments/mqttx.md).

### Get Help via Support Ticket

If all the above steps are correct but the issue persists, please submit a support ticket through our ticket system. Provide the following detailed information to expedite issue resolution:

- Deployment name and ID (found on the "Deployment Management" page in the console)
- Deployment type (e.g., Serverless Plan, Dedicated, etc.)
- Specific client type and version
- Client connection example code (provide your programming language, e.g., Python, JavaScript, and the relevant connection code with sensitive information redacted)
- Client error logs or specific error messages (please provide detailed error descriptions or screenshots, if possible)
