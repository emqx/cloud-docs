# Topic Subscription

## Subscribe

### URI

POST /mqtt/subscribe

### Request Message

| Name     | Type    | Required | Default | Description                                                                                           |
| -------- | ------- | -------- | ------- | ----------------------------------------------------------------------------------------------------- |
| topic    | String  | Optional |         | Topic, with at least one of the `topics` specified                                                    |
| topics   | String  | Optional |         | Multiple topics separated by `,`. This field is used to subscribe to multiple topics at the same time |
| clientid | String  | Required |         | Client identifier                                                                                     |
| qos      | Integer | Optional | 0       | QoS level                                                                                             |

### Response Message

| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example

```bash
curl -u app_id:app_secret -X POST -d '{"topic": "d","qos": 1,"clientid": "emqx_c_1"}' {api}/mqtt/subscribe
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

| Name     | Type   | Required | Default | Description       |
| -------- | ------ | -------- | ------- | ----------------- |
| topic    | String | Optional |         | Topic             |
| clientid | String | Required |         | Client identifier |

### Response Message

| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example

```bash
curl -u app_id:app_secret -X POST -d '{"topic": "a","clientid": "emqx_c_1"}' {api}/mqtt/unsubscribe
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

| Name        | Type    | Required | Default | Description                                                                                           |
| ----------- | ------- | -------- | ------- | ----------------------------------------------------------------------------------------------------- |
| [].topic    | String  | Optional |         | Topic, with at least one of the `topics` specified                                                    |
| [].topics   | String  | Optional |         | Multiple topics separated by `,`. This field is used to subscribe to multiple topics at the same time |
| [].clientid | String  | Required |         | Client identifier                                                                                     |
| [].qos      | Integer | Optional | 0       | QoS level                                                                                             |

### Response Message

| Name            | Type             | Description                      |
| --------------- | ---------------- | -------------------------------- |
| code            | Integer          | 0                                |
| data            | Array of Objects | All the subscription information |
| data[].clientid | String           | clientid                         |
| data[].topic    | String           | Topic                            |
| data[].code     | Integer          | 0                                |

### Request Example

```bash
curl -u app_id:app_secret -X POST -d '[{"topic": "a", "qos": 1, "clientid": "testtopic/#"}, {"topic": "topic/a", "qos": 1, "clientid": "emqx_c_1"}]' {api}/mqtt/subscribe_batch
```

### Response Example

```JSON
{
    "data": [
        {
            "topic": "a",
            "code": 112,
            "clientid": "testtopic/#"
        },
        {
            "topic": "topic/a",
            "code": 0,
            "clientid": "emqx_c_1"
        }
    ],
    "code": 0
}
```

## Batch unsubscribe

### URI

POST /mqtt/unsubscribe_batch

### Request Message

| Name        | Type    | Description                                                                                   |
| ----------- | ------- | --------------------------------------------------------------------------------------------- |
| [].topic    | String  | Topics, with `topics` specifying at least one of them                                         |
| [].topics   | String  | Multiple topics split by `,`, use this field to subscribe to multiple topics at the same time |
| [].clientid | String  | clientid                                                                                      |
| [].qos      | Integer | QoS Level                                                                                     |

### Response Message

| Name            | Type             | Description         |
| --------------- | ---------------- | ------------------- |
| code            | Integer          | 0                   |
| data            | Array of Objects | All subscriptions   |
| data[].clientid | String           | clientid            |
| data[].topic    | String           | Subscription Topics |
| data[].code     | Integer          | 0                   |

### Request Example

```bash
$ curl -u app_id:app_secret -X POST -d '[{"topic": "a","clientid": "emqx_c_1"}]' {api}/mqtt/unsubscribe_batch
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
