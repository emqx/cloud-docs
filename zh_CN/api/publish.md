# 消息发布 API

本页 API 文档提供了与消息发布相关的操作信息，包括发布消息和批量发布消息。

## 消息发布

### URI

POST /mqtt/publish

### 请求消息

| 名称     | 类型    | 描述                                                                        |
| -------- | ------- | --------------------------------------------------------------------------- |
| topic    | String  | 主题，与 `topics` 至少指定其中之一                                          |
| topics   | String  | 以 `,` 分割的多个主题，使用此字段能够同时订阅多个主题                       |
| clientid | String  | 客户端标识符                                                                |
| payload  | String  | 消息正文                                                                    |
| encoding | String  | 消息正文使用的编码方式，目前仅支持 `plain` 与 `base64` 两种，默认为 `plain` |
| qos      | Integer | QoS 等级，默认为 0                                                          |
| retain   | Boolean | 是否为保留消息，默认为 `false`                                              |

### 响应消息

| 名称 | 类型    | 描述 |
| ---- | ------- | ---- |
| code | Integer | 0    |

### 请求示例

```bash
$ curl -u app_id:app_secret -X POST -d '{"topic": "topic/a","clientid": "emqx_c_1","payload": "Hello EMQX"}' {api}/mqtt/publish
```

### 响应示例

```JSON
{
  "code": 0
}
```

## 批量消息发布

### URI

POST /mqtt/publish_batch

### 请求消息

| 名称        | 类型    | 描述                                                                        |
| ----------- | ------- | --------------------------------------------------------------------------- |
| [].topic    | String  | 主题，与 `topics` 至少指定其中之一                                          |
| [].topics   | String  | 以 `,` 分割的多个主题，使用此字段能够同时订阅多个主题                       |
| [].clientid | String  | 客户端标识符                                                                |
| [].payload  | String  | 消息正文                                                                    |
| [].encoding | String  | 消息正文使用的编码方式，目前仅支持 `plain` 与 `base64` 两种，默认为 `plain` |
| [].qos      | Integer | QoS 等级，默认为 0                                                          |
| [].retain   | Boolean | 是否为保留消息，默认为 `false`                                              |

### 响应消息

| 名称 | 类型    | 描述 |
| ---- | ------- | ---- |
| code | Integer | 0    |

### 请求示例

```bash
$ curl -u app_id:app_secret -X POST -d '[{"topic": "a/b","clientid": "emqx_c_1","payload": "Hello EMQX"},{"topic": "a/b","clientid": "emqx_c_1","qos": 2,"payload": "Hi EMQX"}]' {api}/mqtt/publish_batch
```

### 响应示例

```JSON
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
