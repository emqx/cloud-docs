# Topic Subscription

## Subscribe

### URI
POST /mqtt/subscribe

### Request Message
| Name     | Type    | Required | Default | Description                                                  |
| -------- | ------- | -------- | ------- | ------------------------------------------------------------ |
| topic    | String  | Optional |         | Topic, with at least one of the `topics` specified    |
| topics   | String  | Optional |         | Multiple topics separated by `,`. This field is used to subscribe to multiple topics at the same time |
| clientid | String  | Required |         | Client identifier                                            |
| qos      | Integer | Optional | 0       | QoS level                                                    |

### Response Message
| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example
```bash
$ curl -u app_id:app_secret -X POST {api}/mqtt/subscribe
```

```JSON
{
  "topic": "d",
  "qos": 1,
  "clientid": "emqx_c_1"
}
```

### Response Example
```JSON
{
"code": 0
}
```

## Unsubscribe
### URI
POST /mqtt/unsubscribe

### Request Message
| Name     | Type    | Required | Default | Description                                                  |
| -------- | ------- | -------- | ------- | ------------------------------------------------------------ |
| topic    | String  | Optional |         | Topic    |
| clientid | String  | Required |         | Client identifier                                            |

### Response Message
| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example
```bash
$ curl -u app_id:app_secret -X POST {api}/mqtt/unsubscribe
```

```JSON
{
  "topic": "a",
  "clientid": "emqx_c_1"
}
```

### Response Example
```JSON
{
"code": 0
}
```

## Batch Subscribe

### URI
POST /mqtt/subscribe_batch

### Request Message
| Name     | Type    | Required | Default | Description                                                  |
| -------- | ------- | -------- | ------- | ------------------------------------------------------------ |
| [].topic    | String  | Optional |         | Topic, with at least one of the `topics` specified    |
| [].topics   | String  | Optional |         | Multiple topics separated by `,`. This field is used to subscribe to multiple topics at the same time |
| [].clientid | String  | Required |         | Client identifier                                            |
| [].qos      | Integer | Optional | 0       | QoS level                                                    |

### Response Message

| Name           | Type             | Description         |
| --------------- | ---------------- | ------------ |
| code            | Integer          | 0            |
| data            | Array of Objects | All the subscription information |
| data[].clientid | String           | clientid |
| data[].topic    | String           | Topic     |
| data[].code     | Integer          | 0            |

### Request Example
```bash
$ curl -u app_id:app_secret -X POST {api}/mqtt/unsubscribe_batch
```

```JSON
[
  {
    "topic": "a",
    "clientid": "emqx_c_1"
  }
]
```

### Response Example
```JSON
{
  "data": [
    {
      "topic": "a",
      "code": 0,
      "clientid": "emqx_c_1"
    }
  ],
  "code": 0
}
```