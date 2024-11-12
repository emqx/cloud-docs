# Development Related Questions

## Which protocol connections are supported?

EMQX deployment supports MQTT over TLS/SSL and WebSockets over TLS/SSL protocol connections.

If you need other protocol support, you can submit a ticket or send an email (cloud-support@emqx.io) to us.

## How to bind a domain name？

When you create a **Dedicated deployment**, you will be given an MQTT connection address, which is displayed as a domain in the deployment. You may already have your own domain and would like to be able to link to it.


### Steps

1. Let's assume you have the top-level domain abc.com and want to access the MQTT service as mqtt.abc.com, and your deployment on EMQX Platform has a connection address of xxx.emqx.cloud.

2. Point the CNAME record from mqtt.abc.com to xxx.emqx.cloud in your domain settings panel.

3. Once the DNS resolution has taken effect, you can connect to the MQTT service via mqtt.abc.com.

:::tip
**Serverless deployments do not support using CNAME to bind custom domains.** It is recommended to use the default domain connection address provided by EMQX Cloud to ensure the correct allocation and management of connections.
:::

## How to set up NAT gateway configuration?

NAT is only supported for the **Dedicated or Premium plan**. You can enable the [NAT gateway](../vas/nat-gateway.md) service in your deployment.

## Will cluster scaling affect device connectivity?

It will cause an interruption to the connectivity for a few seconds.

## How do I connect my own services to the MQTT service via local network when I have built a VPC peer-to-peer connection?

If you need an internal network connection to the professional deployment, you can purchase [Internal Load Balancers](../vas/intranet-lb.md) to achieve that. It's a value-added service provided by us.

## Is API supported？

Yes. An HTTP API is provided for integration with external systems, such as querying client information, posting messages, and creating rules.

Find more here [REST API](../api/api_overview.md)。

## What kind of TLS/SSL authentication is supported?

Support [one-way](../deployments/tls_ssl.md), [two-way](../deployments/tls_ssl.md), and [custom signature](../deployments/tls_ssl.md) for configuration.

## How to integrate with other systems?

You can use data integrations to integrate with other applications. Check [Data Integrations](../data_integration/introduction.md) for more details.

## The authentication data of the device is stored in my own database. Can I do the authentication of MQTT connections through my own database?
EMQX Cloud Dedicated supports authentication from the user's own database, see the document [External Authentication and Access Control](../deployments/custom_auth.md).


## How long can device logs be kept in the console?

EMQX Cloud does not keep device communication logs, only deployment event logs, which are kept for 7 days by default.

## How long can device events be stored?

Device event data can be permanently integrated into third-party storage through [event topics](../rule_engine/rule_engine_events.md).

## Is it possible to use offline messages?
In general, MQTT clients will not receive messages if they are offline only when they are connected to the message server. However, if the client has a fixed ClientID, clean_session is false, and the QoS settings meet the server's configuration requirements, the server can keep a certain amount of offline messages for the client when the client is offline and send them to the client when the client connects again.

Offline messages are useful when the network connection is not very stable, or when there are certain requirements on QoS.

## How long are offline messages held?
The default is 2 hours for MQTT v3 protocols, and for MQTT v5 protocols it is set according to the value of session_expiry_interval in the client. After the expiration time, the messages in the queue will be lost.

## How to do offline message staging?
Given the instability of message staging, we recommend storing offline messages. We recommend storing offline messages on a disk. Here we need to use the professional version of the Data Integration Service, which can save offline messages to a database like Redis. After the device comes online and consumes the message, the corresponding offline message will also be deleted.

## How to calculate sessions?
The definition for session: The number of sessions is calculated by adding the number of connected clients and the disconnected clients with sessions retained in the broker. Connected clients are those that connect to the broker after `CONNECT`, including those that are not disconnected within the `keepAlive` span. Disconnected clients that keep a session are clients that are offline but have `CleanSession` set to false, and such clients are counted in the session count. When a device `DISCONNECT` goes offline, or if it has not communicated for more than the keepAlive span, the device will go offline and will not be counted in the number of sessions.

## TPS definition
TPS, or Transactions Per Second, is used to measure the number of messages processed per second in a deployment.The following MQTT messages and HTTP messages will be counted into TPS.

| Type     | Flow direction   | Description             |
| -------- | ------ | ---------------------- |
| MQTT PUBLISH | Sent from device or Apps | Sending messages from devices or applications to the deployment, and the deployment receives the messages.   |
| MQTT PUBLISH | Sent from deployment | Sending messages from the deployment to the subscriber (device or application service), and the subscriber receives the messages. |
| MQTT RETAINED | Sending from devices or services, or sending from the deployment. | Publish or recieve retained messages |
| HTTP PUBLISH | Sent from Apps | Sending messages by API: POST /mqtt/publish and POST /mqtt/publish_batch |

The following MQTT messages **will not** be counted into TPS.

| Type  | Description              |
| -------- | ---------------------- |
| MQTT CONNECT | Client requests a connection to a server   |
| MQTT CONNACK | Acknowledge connection request   |
| MQTT PUBACK | Publish acknowledgment |
| MQTT PUBREC | Assured publish received (part 1) |
| MQTT PUBREL | Publish Release (assured delivery part 2) |
| MQTT PUBCOMP | Publish Complete (assured delivery part 3) |
| MQTT SUBSCRIBE | Client Subscribe request |
| MQTT SUBACK | Subscribe Acknowledgment |
| MQTT UNSUBSCRIBE | Client Unsubscribe request |
| MQTT UNSUBACK | Unsubscribe Acknowledgment |
| MQTT PINGREQ | PING Request |
| MQTT PINGRESP | PING Response |
| MQTT DISCONNECT | Client is Disconnecting |

## Why are there differencies in traffic statistics?
If there are differencies between the traffic statistics in the deployment overview and the total message package traffic calculated in metrics, it is mainly because the message package traffic statistics only account for MQTT protocol (including MQTT and WS) application layer client message publishing, connections, and subscription traffic. They do not include traffic generated by data integration, TLS processing, or the TCP layer. Therefore, the significant difference is caused by the traffic generated from TLS and data integration.