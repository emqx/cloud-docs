<!-- markdownlint-disable MD001 -->

# Serverless Connection Guide

This page explains the connection methods for Serverless deployment and provides troubleshooting guidelines for connection issues.

## Serverless Connection Q&A

### What are MQTT over TCP and WebSocket?

Standard MQTT is an asynchronous communication message protocol built on the TCP/IP protocol stack and can scale in unreliable network environments. Therefore, it is suitable for scenarios where device hardware storage space or network bandwidth is limited. 

WebSocket is a new network protocol based on TCP, allowing browsers and servers to establish a persistent connection with just one handshake. It facilitates bidirectional data transmission, simplifying data exchange between clients and servers. WebSocket, in this context, specifically refers to using WebSocket for initial connection establishment, followed by MQTT protocol communication over the WebSocket channel, known as MQTT over WebSocket. It is primarily used for browser-based connections.

Both standard MQTT over TCP and WebSocket are unencrypted, so there can be safety risks.


### What are MQTT over TLS/SSL and WebSocket over TLS/SSL？

MQTT over TLS/SSL and WebSocket over TLS/SSL means to add TLS/SSL encryption to MQTT or WebSocket protocol communication. In this way, the communication is secured from eavesdropping and tampering.

MQTT TLS/SSL uses port 8883, corresponding to the mqtts protocol, while WebSocket TLS/SSL uses port 8084, corresponding to the wss protocol.

### Why Does Serverless Only Support MQTT over TLS/SSL or WebSocket over TLS/SSL?

Serverless is based on the EMQX multi-tenancy architecture, where multiple users share a single EMQX cluster. MQTT and WebSocket using TLS encryption provide security and reliability of data transmission.


### How to Write Client's Code for TLS/SSL Connection?

You can refer to sample code (TLS-related sample code) to write client-side code.

[Python](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Python3)<br>
[Java](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Java)<br>
[GO](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Go)<br>
[Node.js](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Node.js)<br>
[ESP 32](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-ESP32)<br>
[ESP 8266](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-ESP8266)<br>
[Android](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Android)<br>
[swift](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-swift)<br>

**CA file**

Serverless uses one-way TLS. EMQX provides and maintains server-side CA. Some clients may need a server-side CA for verification, please [download here](https://assets.emqx.com/data/emqxsl-ca.crt).

## Connection Troubleshooting Guide

If you are unable to connect to Serverless deployment, follow these steps for troubleshooting:

1. **Check Connection Address**. Ensure that you are using the **correct domain** provided by EMQX Cloud Serverless for the connection. Note that redirecting EMQX Cloud's domain to your own domain via CNAME is not supported. If your use case requires non-encrypted TCP port connections, consider using EMQX Cloud Dedicated - Professional plan.
2. **Confirm Connection Ports**. EMQX Cloud Serverless only supports connections via MQTT over TLS (port 8883) and WebSocket over TLS (port 8084). Connections to ports 1883 and 8083 are not supported. If your use case requires non-encrypted TCP port connections, consider using our EMQX Cloud Dedicated - Professional plan.
3. **Test Network Connectivity**. Use the `telnet` command to test network connectivity between your server and EMQX Cloud Serverless, e.g., `telnet broker.emqx.io 8883`. (Replace with your actual deployment address.)
4. **Verify Authentication Information**. EMQX Cloud does **not support anonymous authentication**. Ensure that you have set the MQTT client's username and password in the EMQX Cloud console and configured them correctly during client connection.
5. **Check SNI (Server Name Indication) Configuration**. Correct SNI information must be provided during client connection. Incorrect or missing SNI information will result in connection rejection by EMQX Cloud with error code -5.
6. **Test with MQTTX Client**. We recommend using MQTTX as an MQTT client testing tool. It is a free and easy-to-use cross-platform MQTT 5.0 client. You can use it to verify if the client code is causing connection issues. For detailed usage instructions, refer to: [MQTTX User Guide](https://chat.openai.com/connect_to_deployments/mqttx.md).

### Get Help via Support Ticket

If all the above steps are correct but the issue persists, please submit a support ticket through our ticket system. Provide the following detailed information to expedite issue resolution:

- Deployment name and ID (found on the "Deployment Management" page in the console)
- Deployment type (e.g., Serverless, Standard, Professional, etc.)
- Specific client type and version
- Client connection example code (provide your programming language, e.g., Python, JavaScript, and the relevant connection code with sensitive information redacted)
- Client error logs or specific error messages (please provide detailed error descriptions or screenshots, if possible)

