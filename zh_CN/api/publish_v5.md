# 消息发布

## 发布消息

### URI

POST /publish

### 请求消息

| 名称     | 类型    | 描述                                                                        |
| -------- | ------- | --------------------------------------------------------------------------- |
| topic    | String  | 发布消息的主题   |
| payload  | String  | 消息正文                                       |
| payload_encoding | String  | 消息正文使用的编码方式，目前仅支持 `plain` 与 `base64` 两种，默认为 `plain` |
| qos      | Integer | QoS 等级，默认为 0                                        |
| retain   | Boolean | 是否为保留消息，默认为 `false`              |

### 响应消息

状态码

### 请求示例

```bash
$ curl -u app_id:app_secret -X POST -d '{"topic": "t/a","qos": 1,"payload": "Hello EMQX"}' {api}/publish
```

### 响应示例

```JSON
// HTTP status response code
200
// HTTP response body
{
  "id": "000600D09A099053F445000014C30000"
}
```

```JSON
// HTTP status response code
202
// HTTP response body
{
  "message": "no_matching_subscribers",
  "reason_code": 16
}
```

TODO: properties 参数是否原来就有？是否要写？respones body 有几种？

## 批量消息发布

### URI

POST /publish/bulk

### 请求消息

| 名称        | 类型    | 描述                                                                        |
| ----------- | ------- | --------------------------------------------------------------------------- |
| [].topic    | String  | 发布消息的主题        |
| [].payload  | String  | 消息正文                                                                    |
| [].payload_encoding | String  | 消息正文使用的编码方式，目前仅支持 `plain` 与 `base64` 两种，默认为 `plain` |
| [].qos      | Integer | QoS 等级，默认为 0                                 |
| [].retain   | Boolean | 是否为保留消息，默认为 `false`                        |

### 响应消息

状态码

### 请求示例

```bash
$ curl -u app_id:app_secret -X POST -d '[{"topic": "t/a","qos": 0,"payload": "Hello EMQX"},{"topic": "t/b","qos": 1,"payload": "Hi EMQX"}]' {api}/publish/bulk
```

### 响应示例

```JSON
// HTTP status response code
200
// HTTP response body
{
  "id": "000600D09A099053F445000014C30000"
}
```

```JSON
// HTTP status response code
202
// HTTP response body
{
  "message": "no_matching_subscribers",
  "reason_code": 16
}
```

TODO: properties 参数是否原来就有？是否要写？respones body 有几种？