# Message Publish

## Message Publish

### URI
POST /mqtt/publish

### Request Message
| Name     | Type    | Required | Default | Description                                                  |
| -------- | ------- | -------- | ------- | ------------------------------------------------------------ |
| topic    | String  | Optional |         | For topic and topics, with at least one of them specified    |
| topics   | String  | Optional |         | Multiple topics separated by `,`. This field is used to publish messages to multiple topics at the same time |
| clientid | String  | Required |         | Client identifier                                            |
| payload  | String  | Required |         | Message body                                                 |
| encoding | String  | Optional | plain   | The encoding used in the message body. Currently only `plain` and `base64` are supported. Default is `plain` |
| qos      | Integer | Optional | 0       | QoS level                                                    |
| retain   | Boolean | Optional | false   | Whether it is a retained message, default is `false`                            |

### Response Message

| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example
```bash
$ curl -u app_id:app_secret -X POST {api}/mqtt/publish
```
```JSON
{
  "topic": "topic/a",
  "clientid": "emqx_c_1",
  "payload": "Hello EMQ X"
}
```

### Response Example
```JSON
{
  "code": 0
}
```

## Batch Message Publish

### URI
POST /mqtt/publish_batch

### Request Message
| Name     | Type    | Required | Default | Description                                                  |
| -------- | ------- | -------- | ------- | ------------------------------------------------------------ |
| [].]opic    | String  | Optional |         | For topic and topics, with at least one of them specified    |
| [].topics   | String  | Optional |         | Multiple topics separated by `,`. This field is used to publish messages to multiple topics at the same time |
| [].clientid | String  | Required |         | Client identifier                                            |
| [].payload  | String  | Required |         | Message body                                                 |
| [].encoding | String  | Optional | plain   | The encoding used in the message body. Currently only `plain` and `base64` are supported. Default is `plain`|
| [].qos      | Integer | Optional | 0       | QoS level                                                    |
| [].retain   | Boolean | Optional | false   | Whether it is a retained message, default is `false`                           |

### Response Message

| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example
```bash
$ curl -u app_id:app_secret -X POST {api}/mqtt/publish_batch
```
```JSON
[
  {
    "topic": "a/b",
    "clientid": "emqx_c_1",
    "payload": "Hello EMQX"
  },
  {
    "topic": "a/b",
    "clientid": "emqx_c_1",
    "qos": 2,
    "payload": "Hi EMQX"
  }
]
```

### Response Example
```JSON
{
  "code": 0
}
```