# Dedicated connection guide


## Ports overview

| **Plans**  | **TCP port(mqtt)**   | **MQTT over TLS/SSL port (mqtts)**   |**WebSocket port(ws)**   | **WebSocket over TLS/SSL port(wss)**   |
| -------------- | ----------------------- | ------------------|------------------|------------------|
| Standard     | 15xxx      | 15xxx         |8083      | 8084         |
| Professional     | 1883     | 8883 (Need TLS/SSL configuration)  | 8083    | 8084 (Need TLS/SSL configuration)       |


### What are MQTT over TCP and WebSocket?

The standard MQTT is an asynchronous communication messaging protocol built on the TCP/IP stack and is a lightweight publish and subscribe messaging protocol. It can scale in unreliable network environments and is suitable for scenarios where device hardware storage space or network bandwidth is limited. webSocket protocol is a new network protocol based on TCP, where the browser and server only need to complete one handshake, and a persistent connection can be created directly between the two and bi-directional data transfer, and data exchange between the client and server becomes more The exchange of data between client and server becomes much simpler. Both standard MQTT and WebSocket are unencrypted.


The MQTT over TCP port is 1883, which corresponds to the 'mqtt', and the WebSocket port is 8083, which corresponds to the 'ws'.


### How do I use the MQTT over TCP port and the WebSocket port?

You can view the sample code for testing and connecting by using SDK Demos at [Client Connection Guidelines](../connect_to_deployments/overview.md).


### What's MQTT over TLS/SSL and WebSocket over TLS/SSL？

Add TLS/SSL encryption to MQTT or WebSocket protocol communication to ensure that the communication is secure from eavesdropping and tampering.

The MQTT over TLS/SSL port is 8883, which corresponds to the 'mqtts', and the WebSocket over TLS/SSL port is 8084, which corresponds to the 'wss'.


### How do I use the MQTT over TLS/SSL port and the WebSocket over TLS/SSL port of a standard deployment?

For standard deployment, you can connect directly through port 15xxx (mqtts) and port 8084 (wss) on the deployment overview.

Standard deployment uses one-way TLS. EMQX provides and maintains server-side CA. Some clients may need a server-side CA for verification, please [download here](https://assets.emqx.com/data/emqxsl-ca.crt).


### How do I use the MQTT over TLS/SSL port and the WebSocket over TLS/SSL port of a professional deployment?

Professional deployment supports customized one-way/two-way TLS/SSL. You need to enable it via [Configure TLS/SSL](../deployments/tls_ssl.md).


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
