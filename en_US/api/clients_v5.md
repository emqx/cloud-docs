# Clients API

This API documentation provides information on various operations related to managing MQTT clients, including viewing client information, subscribing and unsubscribing clients to topics, and kicking clients.

## View All Clients

### URI

GET /clients

Returns information about all clients in the cluster, with support for pagination.

**Query Parameters:**

| Parameter         | Type    | Description                                                  |
| ----------------- | ------- | ------------------------------------------------------------ |
| _page             | Integer | Page number                                                  |
| _limit            | Integer | Number of data items per page                                |
| clientid          | String  | Client identifier                                            |
| username          | String  | Client username                                              |
| zone              | String  | Client configuration group name                              |
| ip_address        | String  | Client IP address                                            |
| conn_state        | Enum    | Client's current connection state, can be: `connected`, `idle`, `disconnected` |
| clean_start       | Bool    | Whether the client is using a clean session                  |
| proto_name        | Enum    | Client protocol name, can be: `MQTT`, `CoAP`, `MQTT-SN` |
| proto_ver         | Integer | Client protocol version                                      |
| _gte_created_at   | Integer | Client session creation time, less than or equal to          |
| _lte_created_at   | Integer | Client session creation time, greater than or equal to       |
| _gte_connected_at | Integer | Client connection creation time, less than or equal to       |
| _lte_connected_at | Integer | Client connection creation time, greater than or equal to    |
<!-- | _like_clientid    | String  | Client identifier, substring match                           |
| _like_username    | String  | Client username, substring match                             | -->
### Request Message

None

### Response Message

| Name                     | Type             | Description                                                  |
| ------------------------ | ---------------- | ------------------------------------------------------------ |
| data                     | Array of Objects | Information about all clients                                |
| data[].node              | String           | Node to which the client is connected                        |
| data[].clientid          | String           | Client identifier                                            |
| data[].username          | String           | Username used by the client when connecting                  |
| data[].proto_name        | String           | Client protocol name                                         |
| data[].proto_ver         | Integer          | Client protocol version                                      |
| data[].ip_address        | String           | Client's IP address                                          |
| data[].port              | Integer          | Client's port                                                |
| data[].is_bridge         | Boolean          | Indicates whether the client is connected via bridging       |
| data[].connected_at      | String           | Client connection time in the format "YYYY-MM-DD HH:mm:ss"   |
| data[].disconnected_at   | String           | Client disconnection time in the format "YYYY-MM-DD HH:mm:ss", only returned when `connected` is `false` |
| data[].connected         | Boolean          | Whether the client is in a connected state                   |
| data[].zone              | String           | Configuration group used by the client                       |
| data[].keepalive         | Integer          | Keep-alive time in seconds                                   |
| data[].clean_start       | Boolean          | Indicates whether the client is using a clean session        |
| data[].expiry_interval   | Integer          | Session expiry interval in seconds                           |
| data[].created_at        | String           | Session creation time in the format "YYYY-MM-DD HH:mm:ss"    |
| data[].subscriptions_cnt | Integer          | Number of subscriptions established by this client           |
| data[].max_subscriptions | Integer          | Maximum number of subscriptions allowed for this client      |
| data[].inflight          | Integer          | Current length of the inflight queue                         |
| data[].max_inflight      | Integer          | Maximum length of the inflight queue                         |
| data[].mqueue_len        | Integer          | Current length of the message queue                          |
| data[].max_mqueue        | Integer          | Maximum length of the message queue                          |
| data[].mqueue_dropped    | Integer          | Number of messages dropped due to exceeding the queue length |
| data[].awaiting_rel      | Integer          | Number of unconfirmed PUBREC messages                        |
| data[].max_awaiting_rel  | Integer          | Maximum number of unconfirmed PUBREC messages allowed        |
| data[].recv_oct          | Integer          | Number of bytes received by EMQX Broker                      |
| data[].recv_cnt          | Integer          | Number of TCP messages received                              |
| data[].recv_pkt          | Integer          | Number of MQTT messages received                             |
| data[].recv_msg          | Integer          | Number of PUBLISH messages received                          |
| data[].send_oct          | Integer          | Number of bytes sent                                         |
| data[].send_cnt          | Integer          | Number of TCP messages sent                                  |
| data[].send_pkt          | Integer          | Number of MQTT messages sent                                 |
| data[].send_msg          | Integer          | Number of PUBLISH messages sent                              |
| data[].mailbox_len       | Integer          | Size of the process mailbox                                  |
| data[].heap_size         | Integer          | Process heap size in bytes                                   |
| data[].reductions        | Integer          | Erlang reduction count                                       |
| meta                     | Object           | Pagination information                                       |
| meta.page                | Integer          | Page number                                                  |
| meta.limit               | Integer          | Number of data items per page                                |
| meta.count               | Integer          | Total number of data items                                   |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/clients?_page=1&_limit=50
```

### Response Example

```json
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

## View Information for a Specific Client

### URI

GET /clients/{clientid}

Returns information about a specific client.

**Parameters:**

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| clientid  | String | Client ID   |

### Request Message

None

### Response Message

| Name | Type             | Description                  |
| ---- | ---------------- | ---------------------------- |
| data | Array of Objects | Information about the client |

### Request Example

Query a specific client

```bash
curl -u app_id:app_ssecret -X GET {api}/clients/client_1
```

### Response Example

```json
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

## Kick a Client

### URI

DELETE /clients/{clientid}

Kicks a specific client off. Note that kicking a client will terminate both the connection and the session.

### Request Message

None

### Response Message

Status code

### Request Example

```bash
curl -u app_id:app_secret -X DELETE {api}/clients/client_1
```

### Response Example

```http
// HTTP status response code
204 
```

## Subscribe a Client to a Specific Topic

### URI

POST /clients/{client_id}/subscribe

### Request Message

| Name  | Type    | Description                    |
| ----- | ------- | ------------------------------ |
| topic | String  | Topic to subscribe to          |
| qos   | Integer | Quality of Service (QoS) level |
| nl    | Integer | No Local                       |
| rap   | Integer | Retain as Published            |
| rh    | Integer | Retain Handling                |

### Response Message

| Name     | Type    | Description                    |
| -------- | ------- | ------------------------------ |
| clientid | String  | Client ID                      |
| topic    | String  | Subscribed topic               |
| qos      | Integer | Quality of Service (QoS) level |
| node     | String  | Node information               |
| nl       | Integer | No Local                       |
| rap      | Integer | Retain as Published            |
| rh       | Integer | Retain Handling                |

### Request Example

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '{"topic": "t/a","qos": 1}' {api}/clients/client_1/subscribe
```

### Response Example

```json
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

## Unsubscribe a Client from a Specific Topic

### URI

POST /clients/{client_id}/unsubscribe

### Request Message

| Name  | Type   | Description               |
| ----- | ------ | ------------------------- |
| topic | String | Topic to unsubscribe from |

### Response Message

Status code

### Request Example

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '{"topic": "t/a"}' {api}/clients/client_1/unsubscribe'
```

### Response Example

```http
// HTTP status response code
204
```

## Bulk Subscribe Topics for a Client

### URI

POST /clients/{client_id}/subscribe/bulk

### Request Message

| Name     | Type    | Description                     |
| -------- | ------- | ------------------------------- |
| [].topic | String  | Topics to subscribe to          |
| [].qos   | Integer | Quality of Service (QoS) levels |

### Response Message

| Name            | Type             | Description                             |
| --------------- | ---------------- | --------------------------------------- |
| data            | Array of Objects | Subscription information for all topics |
| data[].clientid | String           | Client ID                               |
| data[].topic    | String           | Subscribed topic                        |

### Request Example

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '[{"topic": "t/a", "qos": 1}, {"topic": "t/b", "qos": 0}]' {api}/clients/client_1/subscribe/bulk
```

### Response Example

```json
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

## Bulk Unsubscribe Topics for a Client

### URI

POST /clients/{client_id}/unsubscribe/bulk

### Request Message

| Name     | Type   | Description                |
| -------- | ------ | -------------------------- |
| [].topic | String | Topics to unsubscribe from |

### Response Message

Status code

### Request Example

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '[{"topic": "t/a"},{"topic": "t/b"}]' {api}/clients/client_1/unsubscribe/bulk
```

### Response Example

```http
// HTTP status response code
204 
```

