## Check All the Clients

### URI

GET /clients

Returns information for all clients under the cluster, with support for paging.

**Parameters:**

| Name              | Type    | Required | Description                                                                                           |
| ----------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------- |
| clientid          | String  | False    | Client identifier                                                                                     |
| username          | String  | False    | Client username                                                                                       |
| zone              | String  | False    | Client configuration group name                                                                       |
| ip_address        | String  | False    | Client IP address                                                                                     |
| conn_state        | Enum    | False    | The current connection status of the client, the possible values are`connected`,`idle`,`disconnected` |
| clean_start       | Bool    | False    | Whether the client uses a new session                                                                 |
| proto_name        | Enum    | False    | Client protocol name, the possible values are`MQTT`,`CoAP`,`LwM2M`,`MQTT-SN`                          |
| proto_ver         | Integer | False    | Client protocol version                                                                               |
| _like_clientid    | String  | False    | Fuzzy search of client identifier by substring method                                                 |
| _like_username    | String  | False    | Client user name, fuzzy search by substring                                                           |
| _gte_created_at   | Integer | False    | Search client session creation time by  less than or equal method                                     |
| _lte_created_at   | Integer | False    | Search client session creation time by  greater than or equal method                                  |
| _gte_connected_at | Integer | False    | Search client connection creation time by  less than or equal method                                  |
| _lte_connected_at | Integer | False    | Search client connection creation time by  greater than or equal method                               |

### Request Message

None.

### Response Message
| Name                      | Type             | Description                                                                                                                    |
| ------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| code                      | Integer          | 0                                                                                                                              |
| data                      | Array of Objects | Information for all clients                                                                                                    |
| data[0].node              | String           | Name of the node to which the client is connected                                                                              |
| data[0].clientid          | String           | Client identifier                                                                                                              |
| data[0].username          | String           | User name of client when connecting                                                                                            |
| data[0].proto_name        | String           | Client protocol name                                                                                                           |
| data[0].proto_ver         | Integer          | Protocol version used by the client                                                                                            |
| data[0].ip_address        | String           | Client's IP address                                                                                                            |
| data[0].port              | Integer          | Client port                                                                                                                    |
| data[0].is_bridge         | Boolean          | Indicates whether the client is connected via bridge                                                                           |
| data[0].connected_at      | String           | Client connection time, in the format of "YYYY-MM-DD HH:mm:ss"                                                                 |
| data[0].disconnected_at   | String           | Client offline time, in the format of "YYYY-MM-DD HH:mm:ss"， This field is only valid and returned when `connected` is`false` |
| data[0].connected         | Boolean          | Whether the client is connected                                                                                                |
| data[0].zone              | String           | Indicate the configuration group used by the client                                                                            |
| data[0].keepalive         | Integer          | keepalive time, with the unit of second                                                                                        |
| data[0].clean_start       | Boolean          | Indicate whether the client is using a brand new session                                                                       |
| data[0].expiry_interval   | Integer          | Session expiration interval, with the unit of second                                                                           |
| data[0].created_at        | String           | Session creation time, in the format "YYYY-MM-DD HH:mm:ss"                                                                     |
| data[0].subscriptions_cnt | Integer          | Number of subscriptions established by this client                                                                             |
| data[0].max_subscriptions | Integer          | Maximum number of subscriptions allowed by this client                                                                         |
| data[0].inflight          | Integer          | Current length of inflight                                                                                                     |
| data[0].max_inflight      | Integer          | Maximum length of inflight                                                                                                     |
| data[0].mqueue_len        | Integer          | Current length of message queue                                                                                                |
| data[0].max_mqueue        | Integer          | Maximum length of message queue                                                                                                |
| data[0].mqueue_dropped    | Integer          | Number of messages dropped by the message queue due to exceeding the length                                                    |
| data[0].awaiting_rel      | Integer          | Number of awaiting PUBREC packet                                                                                               |
| data[0].max_awaiting_rel  | Integer          | Maximum allowed number of awaiting PUBREC packet                                                                               |
| data[0].recv_oct          | Integer          | Number of bytes received by EMQX Broker (the same below)                                                                       |
| data[0].recv_cnt          | Integer          | Number of TCP packets received                                                                                                 |
| data[0].recv_pkt          | Integer          | Number of MQTT packets received                                                                                                |
| data[0].recv_msg          | Integer          | Number of PUBLISH packets received                                                                                             |
| data[0].send_oct          | Integer          | Number of bytes sent                                                                                                           |
| data[0].send_cnt          | Integer          | Number of TCP packets sent                                                                                                     |
| data[0].send_pkt          | Integer          | Number of MQTT packets sent                                                                                                    |
| data[0].send_msg          | Integer          | Number of PUBLISH packets sent                                                                                                 |
| data[0].mailbox_len       | Integer          | Process mailbox size                                                                                                           |
| data[0].heap_size         | Integer          | Process heap size with the unit of byte                                                                                        |
| data[0].reductions        | Integer          | Erlang reduction                                                                                                               |
| meta                      | Object           | Paging information                                                                                                             |
| meta.page                 | Integer          | Page number                                                                                                                    |
| meta.limit                | Integer          | Number of data displayed per page                                                                                              |
| meta.count                | Integer          | Total number of data                                                                                                           |

### Request Example

```bash
$ curl -u app_id:app_secret -X GET {api}/clients?_page=1&_limit=10   
```

### Response Example

```JSON
{
  "meta": {
    "page": 1,
    "limit": 10000,
    "hasnext": false,
    "count": 1
  },
  "data": [
    {
      "recv_cnt": 45,
      "send_pkt": 44,
      "clean_start": true,
      "expiry_interval": 0,
      "proto_ver": 4,
      "recv_msg": 0,
      "connected_at": "2021-03-18 02:15:57",
      "recv_oct": 164,
      "is_bridge": false,
      "connected": true,
      "max_awaiting_rel": 100,
      "heap_size": 610,
      "mqueue_dropped": 0,
      "recv_pkt": 2,
      "ip_address": "127.0.0.1",
      "max_subscriptions": 0,
      "created_at": "2021-03-18 02:15:57",
      "awaiting_rel": 0,
      "mountpoint": "undefined",
      "node": "emqx@10.12.50.91",
      "proto_name": "MQTT",
      "mailbox_len": 0,
      "send_msg": 2,
      "clientid": "emqx_c_1",
      "mqueue_len": 0,
      "inflight": 0,
      "max_mqueue": 1000,
      "subscriptions_cnt": 4,
      "keepalive": 60,
      "reductions": 35471,
      "zone": "external",
      "send_cnt": 44,
      "username": "test",
      "send_oct": 159,
      "port": 3107,
      "max_inflight": 32
    }
  ],
  "code": 0
}
```

## Check Information for the Specified Client

### URI
GET /clients/{clientid}

Return information for the specified client.

**Parameter:**

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| clientid | String | clientid    |
### Request Message
None.
### Response Message
| Name | Type             | Description                                   |
| ---- | ---------------- | --------------------------------------------- |
| code | Integer          | 0                                             |
| data | Array of Objects | Client information，see detail `GET /clients` |
### Request Example
Check specified client
```bash
$ curl -u app_id:app_ssecret -X GET {api}/clients/emqx_c_1
```
### Response Example
```JSON
{
  "data": [
    {
      "recv_cnt": 49,
      "send_pkt": 48,
      "clean_start": true,
      "expiry_interval": 0,
      "proto_ver": 4,
      "recv_msg": 0,
      "connected_at": "2021-03-18 02:15:57",
      "recv_oct": 172,
      "is_bridge": false,
      "connected": true,
      "max_awaiting_rel": 100,
      "heap_size": 610,
      "mqueue_dropped": 0,
      "recv_pkt": 2,
      "ip_address": "127.0.0.1",
      "max_subscriptions": 0,
      "created_at": "2021-03-18 02:15:57",
      "awaiting_rel": 0,
      "mountpoint": "undefined",
      "node": "emqx@10.12.50.91",
      "proto_name": "MQTT",
      "mailbox_len": 0,
      "send_msg": 2,
      "clientid": "emqx_c_1",
      "mqueue_len": 0,
      "inflight": 0,
      "max_mqueue": 1000,
      "subscriptions_cnt": 4,
      "keepalive": 60,
      "reductions": 38501,
      "zone": "external",
      "send_cnt": 48,
      "username": "test",
      "send_oct": 167,
      "port": 3107,
      "max_inflight": 32
    }
  ],
  "code": 0
}
```

## Kick off Client

### URI

DELETE /clients/{clientid}
Kick off the specified client. Note that kicking the client terminates the connection and the session.

Parameter:

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| clientid | String | clientid    |

### Request Message

None.
### Respond Message

| Name | Type    | Description |
| ---- | ------- | ----------- |
| code | Integer | 0           |

### Request Example

```bash
$ curl -u app_id:app_secret -X DELETE {api}/clients/emqx_c_1
```

### Response Example

```JSON
{
  "code": 0
}
```
