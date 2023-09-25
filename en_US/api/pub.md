# Message Publishing API

This API documentation provides information on various operations related to message publishing, including publishing single messages and publishing messages in batches.

## Publish Message

### URI

POST /mqtt/publish

### Request Message

| Name     | Type    | Description                                                  |
| -------- | ------- | ------------------------------------------------------------ |
| topic    | String  | Topic, specify at least one of `topic` and `topics`          |
| topics   | String  | Multiple topics separated by `,`, using this field can subscribe to multiple topics simultaneously |
| clientid | String  | Client identifier                                            |
| payload  | String  | Message body                                                 |
| encoding | String  | Encoding method used for the message body, currently only supports `plain` and `base64`, default is `plain` |
| qos      | Integer | QoS level, default is 0                                      |
| retain   | Boolean | Whether it's a retained message, default is `false`          |

### Response Message

| Name | Type    | Description |
| ---- | ------- | ----------- |
| code | Integer | 0           |

### Request Example

```bash
$ curl -u app_id:app_secret -X POST -d '{"topic": "topic/a","clientid": "emqx_c_1","payload": "Hello EMQX"}' {api}/mqtt/publish
```

### Response Example

```json
{
  "code": 0
}
```

## Batch Message Publishing

### URI

POST /mqtt/publish_batch

### Request Message

| Name        | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| [].topic    | String  | Topic, specify at least one of `topic` and `topics`          |
| [].topics   | String  | Multiple topics separated by `,`, using this field can subscribe to multiple topics simultaneously |
| [].clientid | String  | Client identifier                                            |
| [].payload  | String  | Message body                                                 |
| [].encoding | String  | Encoding method used for the message body, currently only supports `plain` and `base64`, default is `plain` |
| [].qos      | Integer | QoS level, default is 0                                      |
| [].retain   | Boolean | Whether it's a retained message, default is `false`          |

### Response Message

| Name | Type    | Description |
| ---- | ------- | ----------- |
| code | Integer | 0           |

### Request Example

```bash
$ curl -u app_id:app_secret -X POST -d '[{"topic": "a/b","clientid": "emqx_c_1","payload": "Hello EMQX"},{"topic": "a/b","clientid": "emqx_c_1","qos": 2,"payload": "Hi EMQX"}]' {api}/mqtt/publish_batch
```

### Response Example

```json
{
    "data": [
        {
            "topic": "a/b",
            "code": 0
        },
        {
            "topic": "a/b",
            "code": 0
        }
    ],
    "code": 0
}
```
