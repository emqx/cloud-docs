<!-- markdownlint-disable MD001 -->

# Serverless connection guide


### What's MQTT over TLS/SSL and WebSocket over TLS/SSL？

Add TLS/SSL encryption to MQTT or WebSocket protocol communication to ensure that the communication is secure from eavesdropping and tampering.

The MQTT over TLS/SSL port is 8883, which corresponds to the 'mqtts', and the WebSocket over TLS/SSL port is 8084, which corresponds to the 'wss'.



### Why does Serverless only support MQTT over TLS/SSL or WebSocket over TLS/SSL?

Serverless is based on the EMQX multi-tenancy architecture, with multiple users sharing an EMQX cluster. MQTT and WebSocket using TLS encryption provide security and reliability of data transmission.


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



