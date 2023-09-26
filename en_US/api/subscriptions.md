# Subscription Information API

This API documentation provides information on operations related to viewing MQTT client subscription information, including retrieving all subscription information and retrieving all subscription information for a specific client.

## Get All Subscription Information

Retrieve all subscription information within the cluster, with support for pagination.

### URI

GET /subscriptions

### Request Message

Query Parameters:

| Name         | Type    | Description                         |
| ------------ | ------- | ----------------------------------- |
| _page        | Integer | Page number                         |
| _limit       | Integer | Number of data entries per page     |
| clientid     | String  | Client identifier                   |
| qos          | Integer | Can take values: `0`, `1`, `2`      |
| share        | String  | Group name for shared subscriptions |
| _match_topic | String  | Topic for matching query            |

### Response Message

| Name            | Type             | Description                     |
| --------------- | ---------------- | ------------------------------- |
| code            | Integer          | 0                               |
| data            | Array of Objects | All subscription information    |
| data[].node     | String           | Node name                       |
| data[].clientid | String           | Client identifier               |
| data[].topic    | String           | Subscribed topic                |
| data[].qos      | Integer          | QoS level                       |
| meta            | Object           | Pagination information          |
| meta.page       | Integer          | Page number                     |
| meta.limit      | Integer          | Number of data entries per page |
| meta.count      | Integer          | Total data entries              |

### Request Example

```bash
$ curl -u app_id:app_secret -X GET {api}/subscriptions
```

### Response Example

```json
{
  "meta": {
    "page": 1,
    "limit": 10000,
    "hasnext": false,
    "count": 1
  },
  "data": [
    {
      "topic": "topic/a",
      "qos": 0,
      "node": "emqx@10.12.50.91",
      "clientid": "emqx_c_1"
    }
  ],
  "code": 0
}
```

## Get All Subscriptions for a Specific Client

### URI

GET /subscriptions/{clientid}

### Request Message

Query Parameters:

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| clientid | String | clientid    |

### Response Message

| Name            | Type             | Description                  |
| --------------- | ---------------- | ---------------------------- |
| code            | Integer          | 0                            |
| data            | Array of Objects | All subscription information |
| data[].node     | String           | Node name                    |
| data[].clientid | String           | Client identifier            |
| data[].topic    | String           | Subscribed topic             |
| data[].qos      | Integer          | QoS level                    |

### Request Example

```bash
$ curl -u app_id:app_secret -X GET {api}/subscriptions/{clientid}
```

### Response Example

```json
{
  "data": [
    {
      "topic": "testtopic/#",
      "qos": 0,
      "node": "emqx@10.12.50.36",
      "clientid": "emqx_c_1"
    },
    {
      "topic": "topic/a",
      "qos": 0,
      "node": "emqx@10.12.50.36",
      "clientid": "emqx_c_1"
    }
  ],
  "code": 0
}
```