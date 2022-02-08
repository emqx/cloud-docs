# 指标

## 统计指标

### URI

GET /metrics

### 请求消息

无

### 响应消息

| 名称            | 类型              | 描述                 |
| -------------- | ---------------- | ------------------ |
| code           | Integer          | 0                   |
| data           | Array of Objects | 各节点上的统计指标列表  |
| data[].node    | String           | 节点名称               |
| data[].metrics | Object           | 监控指标数据，详细说明见下表 metrics: |

**metrics：**

| 名称                            | 类型    | 描述                                                  |
| ------------------------------- | ------- | --------------|
| actions.failure                 | Integer | 规则引擎 action 成功失败次数   |
| actions.success                 | Integer | 规则引擎 action 执行失败次数       |
| bytes.received                  | Integer | EMQ X 接收的字节数    |
| bytes.sent                      | Integer | EMQ X 在此连接上发送的字节数   |
| client.authenticate             | Integer | 客户端认证次数   |
| client.auth.anonymous           | Integer | 匿名登录的客户端数量 |
| client.connect                  | Integer | 客户端连接次数     |
| client.connack                  | Integer | 发送 CONNACK 报文的次数   |
| client.connected                | Integer | 客户端成功连接次数   |
| client.disconnected             | Integer | 客户端断开连接次数  |
| client.check_acl                | Integer | ACL 规则检查次数   |
| client.subscribe                | Integer | 客户端订阅次数     |
| client.unsubscribe              | Integer | 客户端取消订阅次数  |
| delivery.dropped.too_large      | Integer | 发送时由于长度超过限制而被丢弃的消息数量  |
| delivery.dropped.queue_full     | Integer | 发送时由于消息队列满而被丢弃的 QoS 不为 0 的消息数量 |
| delivery.dropped.qos0_msg       | Integer | 发送时由于消息队列满而被丢弃的 QoS 为 0 的消息数量  |
| delivery.dropped.expired        | Integer | 发送时由于消息过期而被丢弃的消息数量    |
| delivery.dropped.no_local       | Integer | 发送时由于 `No Local` 订阅选项而被丢弃的消息数量   |
| delivery.dropped                | Integer | 发送时丢弃的消息总数  |
| messages.delayed                | Integer | EMQ X 存储的延迟发布的消息数量  |
| messages.delivered              | Integer | EMQ X 内部转发到订阅进程的消息数量 |
| messages.dropped                | Integer | EMQ X 内部转发到订阅进程前丢弃的消息总数 |
| messages.dropped.expired        | Integer | 接收时由于消息过期而被丢弃的消息数量  |
| messages.dropped.no_subscribers | Integer | 由于没有订阅者而被丢弃的消息数量 |
| messages.forward                | Integer | 向其他节点转发的消息数量  |
| messages.publish                | Integer | 除系统消息外发布的消息数量  |
| messages.qos0.received          | Integer | 接收来自客户端的 QoS 0 消息数量  |
| messages.qos1.received          | Integer | 接收来自客户端的 QoS 1 消息数量  |
| messages.qos2.received          | Integer | 接收来自客户端的 QoS 2 消息数量  |
| messages.qos0.sent              | Integer | 发送给客户端的 QoS 0 消息数量  |
| messages.qos1.sent              | Integer | 发送给客户端的 QoS 1 消息数量  |
| messages.qos2.sent              | Integer | 发送给客户端的 QoS 2 消息数量 |
| messages.received               | Integer | 接收来自客户端的消息数量，等于 `messages.qos0.received`，`messages.qos1.received` 与 `messages.qos2.received` 之和 |
| messages.sent                   | Integer | 发送给客户端的消息数量，等于 `messages.qos0.sent`，`messages.qos1.sent` 与 `messages.qos2.sent` 之和 |
| messages.retained               | Integer | EMQ X 存储的保留消息数量 |
| messages.acked                  | Integer | 接收的 PUBACK 和 PUBREC 报文数量 |
| packets.received                | Integer | 接收的报文数量 |
| packets.sent                    | Integer | 发送的报文数量 |
| packets.connect.received        | Integer | 接收的 CONNECT 报文数量  |
| packets.connack.auth_error      | Integer | 接收的认证失败的 CONNECT 报文数量  |
| packets.connack.error           | Integer | 接收的未成功连接的 CONNECT 报文数量 |
| packets.connack.sent            | Integer | 发送的 CONNACK 报文数量  |
| packets.publish.received        | Integer | 接收的 PUBLISH 报文数量 |
| packets.publish.sent            | Integer | 发送的 PUBLISH 报文数量 |
| packets.publish.inuse           | Integer | 接收的报文标识符已被占用的 PUBLISH 报文数量  |
| packets.publish.auth_error      | Integer | 接收的未通过 ACL 检查的 PUBLISH 报文数量  |
| packets.publish.error           | Integer | 接收的无法被发布的 PUBLISH 报文数量 |
| packets.publish.dropped         | Integer | 超出接收限制而被丢弃的消息数量  |
| packets.puback.received         | Integer | 接收的 PUBACK 报文数量  |
| packets.puback.sent             | Integer | 发送的 PUBACK 报文数量  |
| packets.puback.inuse            | Integer | 接收的报文标识符已被占用的 PUBACK 报文数量  |
| packets.puback.missed           | Integer | 接收的未知报文标识符 PUBACK 报文数量 |
| packets.pubrec.received         | Integer | 接收的 PUBREC 报文数量  |
| packets.pubrec.sent             | Integer | 发送的 PUBREC 报文数量 |
| packets.pubrec.inuse            | Integer | 接收的报文标识符已被占用的 PUBREC 报文数量  |
| packets.pubrec.missed           | Integer | 接收的未知报文标识符 PUBREC 报文数量 |
| packets.pubrel.received         | Integer | 接收的 PUBREL 报文数量  |
| packets.pubrel.sent             | Integer | 发送的 PUBREL 报文数量 |
| packets.pubrel.missed           | Integer | 接收的未知报文标识符 PUBREL 报文数量  |
| packets.pubcomp.received        | Integer | 接收的 PUBCOMP 报文数量  |
| packets.pubcomp.sent            | Integer | 发送的 PUBCOMP 报文数量 |
| packets.pubcomp.inuse           | Integer | 接收的报文标识符已被占用的 PUBCOMP 报文数量        |
| packets.pubcomp.missed          | Integer | 发送的 PUBCOMP 报文数量                         |
| packets.subscribe.received      | Integer | 接收的 SUBSCRIBE 报文数量                       |
| packets.subscribe.error         | Integer | 接收的订阅失败的 SUBSCRIBE 报文数量               |
| packets.subscribe.auth_error    | Integer | 接收的未通过 ACL 检查的 SUBACK 报文数量           |
| packets.suback.sent             | Integer | 发送的 SUBACK 报文数量                          |
| packets.unsubscribe.received    | Integer | 接收的 UNSUBSCRIBE 报文数量                     |
| packets.unsubscribe.error       | Integer | 接收的取消订阅失败的 UNSUBSCRIBE 报文数           |
| packets.unsuback.sent           | Integer | 发送的 UNSUBACK 报文数量                        |
| packets.pingreq.received        | Integer | 接收的 PINGREQ 报文数量                         |
| packets.pingresp.sent           | Integer | 发送的 PUBRESP 报文数量                         |
| packets.disconnect.received     | Integer | 接收的 DISCONNECT 报文数量                      |
| packets.disconnect.sent         | Integer | 发送的 DISCONNECT 报文数量                      |
| packets.auth.received           | Integer | 接收的 AUTH 报文数量                            |
| packets.auth.sent               | Integer | 发送的 AUTH 报文数量                            |
| rules.matched                   | Integer | 规则的匹配次数                                  |
| session.created                 | Integer | 创建的会话数量                                               |
| session.discarded               | Integer | 由于 `Clean Session` 或 `Clean Start` 为 `true` 而被丢弃的会话数量 |
| session.resumed                 | Integer | 由于 `Clean Session` 或 `Clean Start` 为 `false` 而恢复的会话数量 |
| session.takeovered              | Integer | 由于 `Clean Session` 或 `Clean Start` 为 `false` 而被接管的会话数量 |
| session.terminated              | Integer | 终结的会话数量                                               |

### 请求示例

```bash
$ curl -u app_id:app_secret -X GET {api}/metrics
```

### 响应示例

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
