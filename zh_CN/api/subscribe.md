# 主题订阅

## 订阅

### URI

POST /mqtt/subscribe

### 请求消息

| 名称       | 类型    |  描述        |
| ------    | -----   | --------------------- |
| topic     | String  | 主题，与 `topics` 至少指定其中之一 |
| topics    | String  | 以 `,` 分割的多个主题，使用此字段能够同时订阅多个主题 |
| clientid  | String  | 客户端标识符          |
| qos       | Integer | QoS |

### 响应消息

| 名称            | 类型             | 描述         |
| --------------- | ---------------- | ------------ |
| code            | Integer          | 0            |

### 请求示例

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

### 响应示例

```JSON
{
  "code": 0
}
```

## 取消订阅

### URI

POST /mqtt/unsubscribe

### 请求消息

| 名称      | 类型    | 描述         |
| -------- | ------ | ------------ |
| topic    | String | 主题         |
| clientid | String | 客户端标识符 |

### 响应消息

| 名称 | 类型      | 描述 |
| ---- | ------- | ---- |
| code | Integer | 0    |

### 请求示例

```bash
$ curl -u app_id:app_secret -X POST {api}/mqtt/unsubscribe
```

```JSON
{
  "topic": "a",
  "clientid": "emqx_c_1"
}
```

### 响应示例

```JSON
{
  "code": 0
}
```

## 批量主题订阅

### URI

POST /mqtt/subscribe_batch

### 请求消息

| 名称         | 类型       | 描述                                    |
| ----------- | -------   | ---------------------------------------------  |
| [].topic    | String    | 主题，与 `topics` 至少指定其中之一                  |
| [].topics   | String    | 以 `,` 分割的多个主题，使用此字段能够同时订阅多个主题    |
| [].clientid | String    | clientid                                         |
| [].qos      | Integer   | QoS 等级                                         |

### 响应消息

| 名称             | 类型             | 描述                 |
| --------------- | ---------------- | -------------------- |
| code            | Integer          | 0                    |
| data            | Array of Objects | 所有订阅信息         |
| data[].clientid | String           | clientid         |
| data[].topic    | String           | 订阅主题             |
| data[].code     | Integer          | 0             |

### 请求示例

```bash
$ curl -u app_id:app_secret -X POST {api}/mqtt/subscribe_batch
```

### 响应示例

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

## 批量取消主题订阅

### URI

POST /mqtt/unsubscribe_batch

### 请求消息

| 名称         | 类型     |描述                                           |
| ----------- | -------  | --------------------------------------------------- |
| [].topic    | String   | 主题，与 `topics` 至少指定其中之一                    |
| [].topics   | String   | 以 `,` 分割的多个主题，使用此字段能够同时订阅多个主题 |
| [].clientid | String   | clientid                                          |
| [].qos      | Integer  | QoS 等级                                              |

### 响应消息

| 名称            | 类型             | 描述         |
| --------------- | ---------------- | ------------ |
| code            | Integer          | 0            |
| data            | Array of Objects | 所有订阅信息 |
| data[].clientid | String           | clientid |
| data[].topic    | String           | 订阅主题     |
| data[].code     | Integer          | 0            |

### 请求示例

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

### 响应示例

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

