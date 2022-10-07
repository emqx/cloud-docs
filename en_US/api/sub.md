# Subscription

## Get All Subscription Information

Return all subscription information under the cluster, support paging.

### URI

GET /subscriptions

### Request Message

| Name         | Type   | Description                     |
| ------------ | ------ | ------------------------------- |
| clientid     | String | Client identifier               |
| topic        | String | congruent query                 |
| qos          | Enum   | Possible values are `0`,`1`,`2` |
| share        | String | Shared subscription group name  |
| _match_topic | String | Topic Match query               |

### Response Message

| 名称            | 类型             | 描述                                  |
| --------------- | ---------------- | ------------------------------------- |
| code            | Integer          | 0                                     |
| data            | Array of Objects | All subscription information          |
| data[].node     | String           | Node name                             |
| data[].clientid | String           | Client identification                 |
| data[].topic    | String           | Topic                                 |
| data[].qos      | Integer          | QoS level                             |
| meta            | Object           | Paging information                    |
| meta.page       | Integer          | Page number                           |
| meta.limit      | Integer          | The number of data displayed per page |
| meta.count      | Integer          | Total number of data                  |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/subscriptions
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
      "topic": "topic/a",
      "qos": 0,
      "node": "emqx@10.12.50.91",
      "clientid": "emqx_c_1"
    }
  ],
  "code": 0
}
```

## Get All Subscription Information for the Specified Client

### URI

GET /subscriptions/{clientid}

### Request Message

| Name         | Type    | Description                         |
| ------------ | ------- | ----------------------------------- |
| _page        | Integer | Page number                         |
| _limit       | Integer | The number of data display per page |
| clientid     | String  | Client identifier                   |
| qos          | Enum    | Possible values are  `0`,`1`,`2`    |
| share        | String  | Shared subscription group name      |
| _match_topic | String  | Topic Match query                   |

### Response Message

| 名称            | 类型             | 描述                         |
| --------------- | ---------------- | ---------------------------- |
| code            | Integer          | 0                            |
| data            | Array of Objects | All subscription information |
| data[].node     | String           | Node name                    |
| data[].clientid | String           | Client identification        |
| data[].topic    | String           | Topic                        |

### Request Message

```bash
curl -u app_id:app_secret -X GET {api}/subscriptions
```

### Response Message

```JSON
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
