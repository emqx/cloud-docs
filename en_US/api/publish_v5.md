# Message Publishing API

This API documentation provides operations related to message publishing, including single message publishing and bulk message publishing.

## Publish a Message

### URI

POST /publish

### Request Message

| Name             | Type    | Description                                                  |
| ---------------- | ------- | ------------------------------------------------------------ |
| topic            | String  | The topic to which the message will be published.            |
| payload          | String  | The message body.                                            |
| payload_encoding | String  | The encoding method used for the message body, currently only supports `plain` and `base64`, with `plain` as the default. |
| qos              | Integer | Quality of Service (QoS) level, with 0 as the default.       |
| retain           | Boolean | Whether the message should be retained, with `false` as the default. |

### Response Message

| Name | Type   | Description |
| :--- | :----- | :---------- |
| id   | String | Identifier  |

### Request Example

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '{"topic": "t/a","qos": 1,"payload": "Hello EMQX"}' {api}/publish
```

### Response Example

```json
// HTTP status response code
200
// HTTP response body
{
  "id": "000600D09A099053F445000014C30000"
}
```

```json
// HTTP status response code
202
// HTTP response body
{
  "message": "no_matching_subscribers",
  "reason_code": 16
}
```

## Bulk Publish Messages

### URI

POST /publish/bulk

### Request Message

| Name                | Type    | Description                                                  |
| ------------------- | ------- | ------------------------------------------------------------ |
| [].topic            | String  | The topic to which the message will be published.            |
| [].payload          | String  | The message body.                                            |
| [].payload_encoding | String  | The encoding method used for the message body, currently only supports `plain` and `base64`, with `plain` as the default. |
| [].qos              | Integer | Quality of Service (QoS) level, with 0 as the default.       |
| [].retain           | Boolean | Whether the message should be retained, with `false` as the default. |

### Response Message

| Name | Type   | Description |
| :--- | :----- | :---------- |
| id   | String | Identifier  |

### Request Example

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '[{"topic": "t/a","qos": 0,"payload": "Hello EMQX"},{"topic": "t/b","qos": 1,"payload": "Hi EMQX"}]' {api}/publish/bulk
```

### Response Example

```json
// HTTP status response code
200
// HTTP response body
[
    {
        "id": "00060563A10558877ACA0C006CFA0000"
    },
    {
        "id": "00060563A10558BF7ACA0C006CFA0001"
    }
]
```

```json
// HTTP status response code
202
// HTTP response body
{
  "message": "no_matching_subscribers",
  "reason_code": 16
}
```

