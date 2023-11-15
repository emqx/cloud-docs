# 客户端 API

本页 API 文档提供了与管理 MQTT 客户端相关的各种操作信息，包括查看客户端信息、为客户端订阅和取消订阅主题，以及断开客户端连接。

## 查看所有客户端

### URI

GET /clients

返回集群下所有客户端的信息，支持分页。

**查询参数:**

| 参数              | 类型    | 描述                                                             |
| ----------------- | ------- | ---------------------------------------------------------------- |
| _page             | Integer | 页码                                                             |
| _limit            | Integer | 每页显示的数据条数                                               |
| clientid          | String  | 客户端标识符                                                     |
| username          | String  | 客户端用户名                                                     |
| zone              | String  | 客户端配置组名称                                                 |
| ip_address        | String  | 客户端 IP 地址                                                   |
| conn_state        | Enum    | 客户端当前连接状态， 可取值有：`connected`,`idle`,`disconnected` |
| clean_start       | Bool    | 客户端是否使用了全新的会话                                       |
| proto_name        | Enum    | 客户端协议名称， 可取值有：`MQTT`,`CoAP`,`LwM2M`,`MQTT-SN`       |
| proto_ver         | Integer | 客户端协议版本                                                   |
| _gte_created_at   | Integer | 客户端会话创建时间，小于等于查找                                 |
| _lte_created_at   | Integer | 客户端会话创建时间，大于等于查找                                 |
| _gte_connected_at | Integer | 客户端连接创建时间，小于等于查找                                 |
| _lte_connected_at | Integer | 客户端连接创建时间，大于等于查找                                 |
<!-- | _like_clientid    | String  | 客户端标识符，子串方式模糊查找                                   |
| _like_username    | String  | 客户端用户名，子串方式模糊查找                                   | -->

### 请求消息

无

### 响应消息

| 名称                     | 类型             | 描述                                                                                            |
| ------------------------ | ---------------- | ----------------------------------------------------------------------------------------------- | 
| data                     | Array of Objects | 所有客户端的信息                                                                                |
| data[].node              | String           | 客户端所连接的节点名称                                                                          |
| data[].clientid          | String           | 客户端标识符                                                                                    |
| data[].username          | String           | 客户端连接时使用的用户名                                                                        |
| data[].proto_name        | String           | 客户端协议名称                                                                                  |
| data[].proto_ver         | Integer          | 客户端使用的协议版本                                                                            |
| data[].ip_address        | String           | 客户端的 IP 地址                                                                                |
| data[].port              | Integer          | 客户端的端口                                                                                    |
| data[].is_bridge         | Boolean          | 指示客户端是否通过桥接方式连接                                                                  |
| data[].connected_at      | String           | 客户端连接时间，格式为 "YYYY-MM-DD HH:mm:ss"                                                    |
| data[].disconnected_at   | String           | 客户端离线时间，格式为 "YYYY-MM-DD HH:mm:ss"， 此字段仅在 `connected` 为 `false` 时有效并被返回 |
| data[].connected         | Boolean          | 客户端是否处于连接状态                                                                          |
| data[].zone              | String           | 指示客户端使用的配置组                                                                          |
| data[].keepalive         | Integer          | 保持连接时间，单位：秒                                                                          |
| data[].clean_start       | Boolean          | 指示客户端是否使用了全新的会话                                                                  |
| data[].expiry_interval   | Integer          | 会话过期间隔，单位：秒                                                                          |
| data[].created_at        | String           | 会话创建时间，格式为 "YYYY-MM-DD HH:mm:ss"                                                      |
| data[].subscriptions_cnt | Integer          | 此客户端已建立的订阅数量                                                                        |
| data[].max_subscriptions | Integer          | 此客户端允许建立的最大订阅数量                                                                  |
| data[].inflight          | Integer          | 飞行队列当前长度                                                                                |
| data[].max_inflight      | Integer          | 飞行队列最大长度                                                                                |
| data[].mqueue_len        | Integer          | 消息队列当前长度                                                                                |
| data[].max_mqueue        | Integer          | 消息队列最大长度                                                                                |
| data[].mqueue_dropped    | Integer          | 消息队列因超出长度而丢弃的消息数量                                                              |
| data[].awaiting_rel      | Integer          | 未确认的 PUBREC 报文数量                                                                        |
| data[].max_awaiting_rel  | Integer          | 允许存在未确认的 PUBREC 报文的最大数量                                                          |
| data[].recv_oct          | Integer          | EMQX Broker（下同）接收的字节数量                                                               |
| data[].recv_cnt          | Integer          | 接收的 TCP 报文数量                                                                             |
| data[].recv_pkt          | Integer          | 接收的 MQTT 报文数量                                                                            |
| data[].recv_msg          | Integer          | 接收的 PUBLISH 报文数量                                                                         |
| data[].send_oct          | Integer          | 发送的字节数量                                                                                  |
| data[].send_cnt          | Integer          | 发送的 TCP 报文数量                                                                             |
| data[].send_pkt          | Integer          | 发送的 MQTT 报文数量                                                                            |
| data[].send_msg          | Integer          | 发送的 PUBLISH 报文数量                                                                         |
| data[].mailbox_len       | Integer          | 进程邮箱大小                                                                                    |
| data[].heap_size         | Integer          | 进程堆栈大小，单位：字节                                                                        |
| data[].reductions        | Integer          | Erlang reduction                                                                                |
| meta                     | Object           | 分页信息                                                                                        |
| meta.page                | Integer          | 页码                                                                                            |
| meta.limit               | Integer          | 每页显示的数据条数                                                                              |
| meta.count               | Integer          | 数据总条数                                                                                      |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/clients?_page=1&_limit=50
```

### 响应示例

```JSON
{
  "meta": {
    "page": 1,
    "limit": 50,
    "hasnext": false,
    "count": 1
  },
  "data": [
    {
        "peersni": "qe92461d.dev-ala.cn-hangzhou.mqttce.com",
        "reductions": 10276,
        "expiry_interval": 0,
        "clean_start": true,
        "send_msg.dropped.expired": 0,
        "recv_msg.qos0": 3,
        "mqueue_dropped": 0,
        "recv_cnt": 9,
        "send_cnt": 3,
        "keepalive": 60,
        "recv_oct": 257,
        "heap_size": 987,
        "recv_pkt": 6,
        "recv_msg.dropped.await_pubrel_timeout": 0,
        "proto_ver": 5,
        "inflight_max": 32,
        "send_msg.dropped": 0,
        "created_at": "2023-09-15T09:36:20.871+00:00",
        "awaiting_rel_max": 100,
        "inflight_cnt": 0,
        "ip_address": "115.236.21.86",
        "mqueue_len": 0,
        "send_msg.qos2": 0,
        "send_pkt": 3,
        "subscriptions_cnt": 0,
        "send_msg.dropped.too_large": 0,
        "recv_msg": 3,
        "send_msg.dropped.queue_full": 0,
        "send_msg": 0,
        "node": "emqxsl-dev@10.66.128.31",
        "awaiting_rel_cnt": 0,
        "listener": "tcp:default",
        "connected": true,
        "username": "aip_user2",
        "recv_msg.qos1": 0,
        "proto_name": "MQTT",
        "port": 13312,
        "send_msg.qos1": 0,
        "is_persistent": false,
        "enable_authn": true,
        "mailbox_len": 0,
        "subscriptions_max": 10,
        "recv_msg.qos2": 0,
        "connected_at": "2023-09-15T09:36:20.871+00:00",
        "tenant_id_from": "peersni",
        "is_bridge": false,
        "clientid": "mqttx_07cb8109",
        "send_oct": 25,
        "send_msg.qos0": 0,
        "mqueue_max": 1000,
        "cn": null,
        "recv_msg.dropped": 0,
        "dn": null
    }
  ]
}
```


## 查看指定客户端的信息

### URI

GET /clients/{clientid}

返回指定客户端的信息

**参数:**

| 参数     | 类型   | 描述     |
| -------- | ------ | -------- |
| clientid | String | clientid |

### 请求信息

无

### 响应信息

| 名称 | 类型             | 描述                                    |
| ---- | ---------------- | --------------------------------------- |
| data | Array of Objects | 客户端的信息，详细请参见 `GET /clients` |

### 请求示例

查询指定客户端

```bash
curl -u app_id:app_ssecret -X GET {api}/clients/client_1
```


### 响应示例

```JSON
// HTTP status response code
200
// HTTP response body
{
    "peersni": "qe92461d.dev-ala.cn-hangzhou.mqttce.com",
    "reductions": 21041,
    "expiry_interval": 0,
    "clean_start": true,
    "send_msg.dropped.expired": 0,
    "recv_msg.qos0": 5,
    "mqueue_dropped": 0,
    "recv_cnt": 18,
    "send_cnt": 10,
    "keepalive": 60,
    "recv_oct": 361,
    "heap_size": 987,
    "recv_pkt": 15,
    "recv_msg.dropped.await_pubrel_timeout": 0,
    "proto_ver": 5,
    "inflight_max": 32,
    "send_msg.dropped": 0,
    "created_at": "2023-09-15T09:36:20.871+00:00",
    "awaiting_rel_max": 100,
    "inflight_cnt": 0,
    "ip_address": "115.236.21.86",
    "mqueue_len": 0,
    "send_msg.qos2": 0,
    "send_pkt": 10,
    "subscriptions_cnt": 0,
    "send_msg.dropped.too_large": 0,
    "recv_msg": 5,
    "send_msg.dropped.queue_full": 0,
    "send_msg": 0,
    "node": "emqxsl-dev@10.66.128.31",
    "awaiting_rel_cnt": 0,
    "listener": "tcp:default",
    "connected": true,
    "username": "aip_user2",
    "recv_msg.qos1": 0,
    "proto_name": "MQTT",
    "port": 13312,
    "send_msg.qos1": 0,
    "is_persistent": false,
    "enable_authn": true,
    "mailbox_len": 0,
    "subscriptions_max": 10,
    "recv_msg.qos2": 0,
    "connected_at": "2023-09-15T09:36:20.871+00:00",
    "tenant_id_from": "peersni",
    "is_bridge": false,
    "clientid": "mqttx_07cb8109",
    "send_oct": 39,
    "send_msg.qos0": 0,
    "mqueue_max": 1000,
    "cn": null,
    "recv_msg.dropped": 0,
    "dn": null
}
```

## 踢除客户端

### URI

DELETE /clients/{clientid}

踢除指定客户端。注意踢除客户端操作会将连接与会话一并终结。


### 请求信息

无

### 响应消息

状态码

### 请求示例

```bash
curl -u app_id:app_secret -X DELETE {api}/clients/client_1
```

### 响应示例

```HTTP
// HTTP status response code
204 
```

## 指定客户端订阅主题

### URI

POST /clients/{client_id}/subscribe

### 请求消息

| 名称     | 类型    | 描述                                                  |
| -------- | ------- | ----------------------------------------------------- |
| topic    | String  | 需要订阅的主题                |
| qos      | Integer | QoS                                                   |
| nl      | Integer | No Local                                                   |
| rap      | Integer | Retain as Published                                    |
| rh      | Integer | Retain Handling                                        |

### 响应消息

| 名称 | 类型    | 描述 |
| ---- | ------- | ---- |
| clientid | String | Clientid   |
| topic | String |  订阅的主题   |
| qos | Integer | QoS   |
| node | String | 节点信息   |
| nl      | Integer | No Local                                                   |
| rap      | Integer | Retain as Published                                    |
| rh      | Integer | Retain Handling                                        |

### 请求示例

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '{"topic": "t/a","qos": 1}' {api}/clients/client_1/subscribe
```

### 响应示例

```JSON
// HTTP status response code
200
// HTTP response body
{
  "clientid": "client_1",
  "topic": "t/a",
  "qos": 1,
  "nl": 0,
  "node": "emqxsl-dev@10.66.128.31",
  "qos": 0,
  "rap": 0,
  "rh": 0,
}
```

## 指定客户端取消订阅主题

### URI

POST /clients/{client_id}/unsubscribe

### 请求消息

| 名称     | 类型    | 描述                                                  |
| -------- | ------- | ----------------------------------------------------- |
| topic    | String  | 需要取消订阅的主题             |

### 响应消息

状态码

### 请求示例

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '{"topic": "t/a"}' {api}/clients/client_1/unsubscribe'
```

### 响应示例

```HTTP
// HTTP status response code
204
```


## 指定客户端批量订阅主题

### URI

POST /clients/{client_id}/subscribe/bulk

### 请求消息

| 名称        | 类型    | 描述                                                  |
| ----------- | ------- | ----------------------------------------------------- |
| [].topic    | String  | 需要订阅的主题                   |
| [].qos      | Integer | QoS 等级                                              |

### 响应消息

| 名称            | 类型             | 描述         |
| --------------- | ---------------- | ------------ |
| data            | Array of Objects | 所有订阅信息 |
| data[].clientid | String           | clientid     |
| data[].topic    | String           | 订阅主题     |

### 请求示例

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '[{"topic": "t/a", "qos": 1}, {"topic": "t/b", "qos": 0}]' {api}/clients/client_1/subscribe/bulk
```


### 响应示例

```JSON
// HTTP status response code
200
// HTTP response body
{
    "data": [
        {
            "topic": "t/a",
            "clientid": "client_1",
            "nl": 0,
            "node": "emqxsl-dev@10.66.128.31",
            "qos": 1,
            "rap": 0,
            "rh": 0,
        },
        {
            "topic": "t/b",
            "clientid": "client_1",
            "nl": 0,
            "node": "emqxsl-dev@10.66.128.31",
            "qos": 0,
            "rap": 0,
            "rh": 0,
        }
    ]
}
```


## 指定客户端批量取消订阅主题

### URI

POST /clients/{client_id}/unsubscribe/bulk

### 请求消息

| 名称        | 类型    | 描述                                                  |
| ----------- | ------- | ----------------------------------------------------- |
| [].topic    | String  | 需要取消订阅的主题                   |

### 响应消息

状态码

### 请求示例

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '[{"topic": "t/a"},{"topic": "t/b"}]' {api}/clients/client_1/unsubscribe/bulk
```

### 响应示例

```HTTP
// HTTP status response code
204 
```

