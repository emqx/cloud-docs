# Metrics

## Statistical Metrics

### URI
GET /metrics

### Request Message
None

### Response Message:
| Name            | Type             | Description                                |
| :-------------- | :--------------- | :----------------------------------------- |
| code            | Integer          | 0                                          |
| data            | Array of Objects | List of statistical metrics on each node   |
| data[0].node    | String           | Node name                                  |
| data[0].metrics | Object           | Monitoring metrics data, see metrics below |

**metrics：**

| Name                            | Type    | Description                                                  |
| ------------------------------- | ------- | ------------------------------------------------------------ |
| actions.failure                 | Integer | Number of failure executions of the rule engine action       |
| actions.success                 | Integer | Number of successful executions of the rule engine action    |
| bytes.received                  | Integer | Number of bytes received by EMQX Broker                     |
| bytes.sent                      | Integer | Number of bytes sent by EMQX Broker on this connection      |
| client.authenticate             | Integer | Number of client authentications                             |
| client.auth.anonymous           | Integer | Number of clients who log in anonymously                     |
| client.connect                  | Integer | Number of client connections                                 |
| client.connack                  | Integer | Number of CONNACK packet sent                                |
| client.connected                | Integer | Number of successful client connections                      |
| client.disconnected             | Integer | Number of client disconnects                                 |
| client.check_acl                | Integer | Number of ACL rule checks                                    |
| client.subscribe                | Integer | Number of client subscriptions                               |
| client.unsubscribe              | Integer | Number of client unsubscriptions                             |
| delivery.dropped.too_large      | Integer | The number of messages that were dropped because the length exceeded the limit when sending |
| delivery.dropped.queue_full     | Integer | Number of messages with a non-zero QoS that were dropped because the message queue was full when sending |
| delivery.dropped.qos0_msg       | Integer | Number of messages with QoS 0 that were dropped because the message queue was full when sending |
| delivery.dropped.expired        | Integer | Number of messages dropped due to message expiration on sending |
| delivery.dropped.no_local       | Integer | Number of messages that were dropped due to the No Local subscription option when sending |
| delivery.dropped                | Integer | Total number of discarded messages when sending              |
| messages.delayed                | Integer | Number of delay- published messages stored by EMQX Broker   |
| messages.delivered              | Integer | Number of messages forwarded to the subscription process internally by EMQX Broker |
| messages.dropped                | Integer | Total number of messages dropped by EMQX Broker before forwarding to the subscription process |
| messages.dropped.expired        | Integer | Number of messages dropped due to message expiration when receiving |
| messages.dropped.no_subscribers | Integer | Number of messages dropped due to no subscribers             |
| messages.forward                | Integer | Number of messages forwarded to other nodes                  |
| messages.publish                | Integer | Number of messages published in addition to system messages  |
| messages.qos0.received          | Integer | Number of QoS 0 messages received from clients               |
| messages.qos2.received          | Integer | Number of QoS 1 messages received from clients               |
| messages.qos1.received          | Integer | Number of QoS 2 messages received from clients               |
| messages.qos0.sent              | Integer | Number of QoS 0 messages sent to clients                     |
| messages.qos1.sent              | Integer | Number of QoS 1 messages sent to clients                     |
| messages.qos2.sent              | Integer | Number of QoS 2 messages sent to clients                     |
| messages.received               | Integer | Number of messages received from the client, equal to the sum of `messages.qos0.received`，`messages.qos1.received` and `messages.qos2.received` |
| messages.sent                   | Integer | Number of messages sent to the client, equal to the sum of `messages.qos0.sent`，`messages.qos1.sent` and `messages.qos2.sent` |
| messages.retained               | Integer | Number of retained messages stored by EMQX Broker           |
| messages.acked                  | Integer | Number of received PUBACK and PUBREC packet                  |
| packets.received                | Integer | Number of received packet                                    |
| packets.sent                    | Integer | Number of sent packet                                        |
| packets.connect.received        | Integer | Number of received CONNECT packet                            |
| packets.connack.auth_error      | Integer | Number of received CONNECT packet with failed authentication |
| packets.connack.error           | Integer | Number of received CONNECT packet with unsuccessful connections |
| packets.connack.sent            | Integer | Number of sent CONNACK packet                                |
| packets.publish.received        | Integer | Number of received PUBLISH packet                            |
| packets.publish.sent            | Integer | Number of sent PUBLISH packet                                |
| packets.publish.inuse           | Integer | Number of received PUBLISH packet with occupied identifiers  |
| packets.publish.auth_error      | Integer | Number of received PUBLISH packets with failed the ACL check |
| packets.publish.error           | Integer | Number of received PUBLISH packet that cannot be published   |
| packets.publish.dropped         | Integer | Number of messages discarded due to the receiving limit      |
| packets.puback.received         | Integer | Number of received PUBACK packet                             |
| packets.puback.sent             | Integer | Number of sent PUBACK packet                                 |
| packets.puback.inuse            | Integer | Number of received PUBACK packet with occupied identifiers   |
| packets.puback.missed           | Integer | Number of received packet with identifiers.                  |
| packets.pubrec.received         | Integer | Number of received PUBREC packet                             |
| packets.pubrec.sent             | Integer | Number of sent PUBREC packet                                 |
| packets.pubrec.inuse            | Integer | Number of received PUBREC packet with occupied identifiers   |
| packets.pubrec.missed           | Integer | Number of received PUBREC packet with unknown identifiers    |
| packets.pubrel.received         | Integer | Number of received PUBREL packet                             |
| packets.pubrel.sent             | Integer | Number of sent PUBREL packet                                 |
| packets.pubrel.missed           | Integer | Number of received PUBREC packet with unknown identifiers    |
| packets.pubcomp.received        | Integer | Number of received PUBCOMP packet                            |
| packets.pubcomp.sent            | Integer | Number of sent PUBCOMP packet                                |
| packets.pubcomp.inuse           | Integer | Number of received PUBCOMP packet with occupied identifiers  |
| packets.pubcomp.missed          | Integer | Number of missed PUBCOMP packet                              |
| packets.subscribe.received      | Integer | Number of received SUBSCRIBE packet                          |
| packets.subscribe.error         | Integer | Number of received SUBSCRIBE packet with failed subscriptions |
| packets.subscribe.auth_error    | Integer | Number of received SUBACK packet with failed ACL check       |
| packets.suback.sent             | Integer | Number of sent SUBACK packet                                 |
| packets.unsubscribe.received    | Integer | Number of received UNSUBSCRIBE packet                        |
| packets.unsubscribe.error       | Integer | Number of received UNSUBSCRIBE packet with failed unsubscriptions |
| packets.unsuback.sent           | Integer | Number of sent UNSUBACK packet                               |
| packets.pingreq.received        | Integer | Number of received PINGREQ packet                            |
| packets.pingresp.sent           | Integer | Number of sent PUBRESP packet                                |
| packets.disconnect.received     | Integer | Number of received DISCONNECT packet                         |
| packets.disconnect.sent         | Integer | Number of sent DISCONNECT packet                             |
| packets.auth.received           | Integer | Number of received AUTH packet                               |
| packets.auth.sent               | Integer | Number of sent AUTH packet                                   |
| rules.matched                   | Integer | Number of rule matched                                       |
| session.created                 | Integer | Number of sessions created                                   |
| session.discarded               | Integer | Number of sessions dropped because `Clean Session` or `Clean Start` is `true` |
| session.resumed                 | Integer | Number of sessions resumed because `Clean Session` or `Clean Start` is false |
| session.takeovered              | Integer | Number of sessions takeovered because `Clean Session` or `Clean Start` is false |
| session.terminated              | Integer | Number of terminated sessions                                |

### Request Example

```bash
$ curl -i --basic -u j11c5ff1:qc47fd11fccf1644 -X GET "https://lacd0b7b.test-cn.emqx.cloud:8443/api/metrics"
```
```JSON
{
"data": [
{
"node": "emqx@10.12.50.91",
"metrics": {
"actions.error": 0,
"messages.qos1.received": 0,
"client.disconnected": 9,
"client.subscribe": 15,
"packets.pingreq.received": 0,
"packets.publish.dropped": 0,
"delivery.dropped": 0,
"packets.pubrel.received": 0,
"actions.retry": 0,
"packets.pubcomp.missed": 0,
"delivery.dropped.qos0_msg": 0,
"delivery.dropped.queue_full": 0,
"client.connack": 11,
"messages.delayed": 0,
"packets.sent": 311,
"actions.success": 0,
"messages.retained": 5,
"packets.pubcomp.inuse": 0,
"session.resumed": 0,
"messages.qos0.sent": 5,
"session.terminated": 9,
"bytes.sent": 824,
"packets.connect.received": 11,
"packets.pubrec.received": 0,
"client.authenticate": 11,
"packets.pubrec.missed": 0,
"packets.unsuback.sent": 1,
"packets.pubrel.sent": 0,
"messages.delivered": 5,
"messages.qos2.received": 0,
"messages.received": 4,
"messages.qos1.sent": 0,
"packets.subscribe.received": 15,
"messages.dropped": 0,
"client.acl.ignore": 17,
"packets.connack.error": 1,
"packets.auth.received": 0,
"session.takeovered": 0,
"client.auth.anonymous": 0,
"packets.auth.sent": 0,
"packets.unsubscribe.received": 1,
"delivery.dropped.no_local": 0,
"messages.acked": 0,
"packets.pingresp.sent": 279,
"messages.qos0.received": 4,
"delivery.dropped.too_large": 0,
"actions.exception": 0,
"actions.taken": 0,
"packets.disconnect.sent": 0,
"packets.disconnect.received": 7,
"packets.pubrec.inuse": 0,
"client.connected": 10,
"client.acl.deny": 0,
"packets.publish.error": 0,
"messages.sent": 5,
"messages.publish": 4,
"client.unsubscribe": 1,
"packets.pubrel.missed": 0,
"packets.received": 38,
"bytes.received": 1448,
"packets.subscribe.error": 0,
"messages.qos2.sent": 0,
"client.auth.failure": 1,
"packets.publish.auth_error": 0,
"client.auth.success": 10,
"delivery.dropped.expired": 0,
"rules.matched": 0,
"client.acl.allow": 0,
"packets.unsubscribe.error": 0,
"client.connect": 11,
"packets.pubcomp.sent": 0,
"packets.puback.received": 0,
"packets.pubcomp.received": 0,
"session.created": 10,
"packets.connack.sent": 11,
"packets.puback.missed": 0,
"messages.dropped.expired": 0,
"messages.dropped.no_subscribers": 0,
"packets.publish.sent": 5,
"packets.suback.sent": 15,
"packets.pubrec.sent": 0,
"packets.puback.sent": 0,
"packets.publish.inuse": 0,
"packets.connack.auth_error": 0,
"messages.forward": 2,
"session.discarded": 0,
"packets.puback.inuse": 0,
"packets.publish.received": 4,
"client.check_acl": 17,
"client.auth.ignore": 0,
"packets.subscribe.auth_error": 0
}
},
{
"node": "emqx@10.12.50.36",
"metrics": {
"actions.error": 0,
"messages.qos1.received": 0,
"client.disconnected": 3,
"client.subscribe": 2,
"packets.pingreq.received": 0,
"packets.publish.dropped": 0,
"delivery.dropped": 0,
"packets.pubrel.received": 0,
"actions.retry": 0,
"packets.pubcomp.missed": 0,
"delivery.dropped.qos0_msg": 0,
"delivery.dropped.queue_full": 0,
"client.connack": 3,
"messages.delayed": 0,
"packets.sent": 55,
"actions.success": 0,
"messages.retained": 5,
"packets.pubcomp.inuse": 0,
"session.resumed": 0,
"messages.qos0.sent": 2,
"session.terminated": 3,
"bytes.sent": 188,
"packets.connect.received": 3,
"packets.pubrec.received": 0,
"client.authenticate": 3,
"packets.pubrec.missed": 0,
"packets.unsuback.sent": 0,
"packets.pubrel.sent": 0,
"messages.delivered": 2,
"messages.qos2.received": 0,
"messages.received": 2,
"messages.qos1.sent": 0,
"packets.subscribe.received": 2,
"messages.dropped": 1,
"client.acl.ignore": 2,
"packets.connack.error": 0,
"packets.auth.received": 0,
"session.takeovered": 0,
"client.auth.anonymous": 0,
"packets.auth.sent": 0,
"packets.unsubscribe.received": 0,
"delivery.dropped.no_local": 0,
"messages.acked": 0,
"packets.pingresp.sent": 48,
"messages.qos0.received": 2,
"delivery.dropped.too_large": 0,
"actions.exception": 0,
"actions.taken": 0,
"packets.disconnect.sent": 0,
"packets.disconnect.received": 2,
"packets.pubrec.inuse": 0,
"client.connected": 3,
"client.acl.deny": 0,
"packets.publish.error": 0,
"messages.sent": 2,
"messages.publish": 2,
"client.unsubscribe": 0,
"packets.pubrel.missed": 0,
"packets.received": 7,
"bytes.received": 249,
"packets.subscribe.error": 0,
"messages.qos2.sent": 0,
"client.auth.failure": 0,
"packets.publish.auth_error": 0,
"client.auth.success": 3,
"delivery.dropped.expired": 0,
"rules.matched": 0,
"client.acl.allow": 0,
"packets.unsubscribe.error": 0,
"client.connect": 3,
"packets.pubcomp.sent": 0,
"packets.puback.received": 0,
"packets.pubcomp.received": 0,
"session.created": 3,
"packets.connack.sent": 3,
"packets.puback.missed": 0,
"messages.dropped.expired": 0,
"messages.dropped.no_subscribers": 1,
"packets.publish.sent": 2,
"packets.suback.sent": 2,
"packets.pubrec.sent": 0,
"packets.puback.sent": 0,
"packets.publish.inuse": 0,
"packets.connack.auth_error": 0,
"messages.forward": 1,
"session.discarded": 0,
"packets.puback.inuse": 0,
"packets.publish.received": 0,
"client.check_acl": 2,
"client.auth.ignore": 0,
"packets.subscribe.auth_error": 0
}
}
],
"code": 0
}
```
