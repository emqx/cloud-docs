<!-- markdownlint-disable MD001 -->

# Serverless connection guide

### What are MQTT over TCP and WebSocket?

The standard MQTT is a lightweight publish and subscribe messaging protocol for asynchronous data communication. It is built on the TCP/IP stack and can scale in unreliable network environments. Therefore, it is suitable for scenarios where device hardware storage space or network bandwidth is limited. 

WebSocket protocol is a new network protocol based on TCP, which enables the creation of a persistent connection between a browser and a server through a single handshake. Since there is no need for repeated handshakes between the browser and server, bi-directional data exchange between the two becomes much simpler. Specifically, WebSocket in MQTT refers to establishing a connection using WebSocket first and then communicating over the WebSocket channel using the MQTT protocol, i.e. MQTT over WebSocket, which is mainly used for connections in the browser environment.

Both standard MQTT over TCP and WebSocket are unencrypted, so there can be safety risks.


### What's MQTT over TLS/SSL and WebSocket over TLS/SSL？

MQTT over TLS/SSL and WebSocket over TLS/SSL means to add TLS/SSL encryption to MQTT or WebSocket protocol communication. In this way, the communication is secured from eavesdropping and tampering.

The MQTT over TLS/SSL port is 8883, which corresponds to the 'mqtts', and the WebSocket over TLS/SSL port is 8084, which corresponds to the 'wss'.



### Why does Serverless only support MQTT over TLS/SSL or WebSocket over TLS/SSL?

Serverless is based on the EMQX multi-tenancy architecture, with multiple users sharing one EMQX cluster. MQTT and WebSocket using TLS encryption provide security and reliability of data transmission.


### How to write client-side code for TLS/SSL connection?

You can ckeck sample code (TLS-related sample code) to write client-side code.

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



