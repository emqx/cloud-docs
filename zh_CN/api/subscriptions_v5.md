# 订阅管理 API

## 获取所有订阅信息

返回部署下所有订阅信息，支持分页。

### URI

GET /subscriptions

### 请求消息

查询参数:

| 名称         | 类型    | 描述                  |
| ------------ | ------- | --------------------- |
| _page        | Integer | 页码                  |
| _limit       | Integer | 每页显示的数据条数    |
| clientid     | String  | 客户端标识符          |
| qos          | Integer | 可取值为：`0`,`1`,`2` |
| share        | String  | 共享订阅的组名称      |
| _match_topic | String  | 主题，匹配查询        |

### 响应消息

| 名称            | 类型             | 描述               |
| --------------- | ---------------- | ------------------ |
| data            | Array of Objects | 所有订阅信息       |
| data[].node     | String           | 节点名称           |
| data[].clientid | String           | 客户端标识符       |
| data[].topic    | String           | 订阅主题           |
| data[].qos      | Integer          | QoS 等级           |
| nl      | Integer | No Local                                                   |
| rap      | Integer | Retain as Published                                    |
| rh      | Integer | Retain Handling                                        |
| meta            | Object           | 分页信息           |
| meta.page       | Integer          | 页码               |
| meta.limit      | Integer          | 每页显示的数据条数 |
| meta.count      | Integer          | 数据总条数         |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/subscriptions
```

### 响应示例

```JSON
// HTTP status response code
200
// HTTP response body
{
  "meta": {
    "page": 1,
    "limit": 100,
    "hasnext": false,
    "count": 2
  },
  "data": [
    {
      "topic": "t/a",
      "qos": 0,
      "node": "emqx@10.12.50.91",
      "clientid": "client_1",
      "nl": 0,
      "rap": 0,
      "rh": 0,
    },
    {
      "topic": "t/b",
      "qos": 1,
      "node": "emqx@10.12.50.91",
      "clientid": "client_2",
      "nl": 0,
      "rap": 0,
      "rh": 0,
    }
  ]
}
```


## 获取指定客户端所有订阅信息

### URI

GET /clients/{client_id}/subscriptions

### 请求消息


### 响应消息

| 名称            | 类型             | 描述         |
| --------------- | ---------------- | ------------ |
| data            | Array of Objects | 所有订阅信息 |
| data[].node     | String           | 节点名称     |
| data[].clientid | String           | 客户端标识符 |
| data[].topic    | String           | 订阅主题     |
| data[].qos      | Integer          | QoS 等级     |
| nl      | Integer | No Local                                                   |
| rap      | Integer | Retain as Published                                    |
| rh      | Integer | Retain Handling                                        |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/clients/client_1/subscriptions
```

### 响应示例

```JSON
{
  "data": [
    {
      "topic": "t/a",
      "qos": 0,
      "node": "emqx@10.12.50.36",
      "clientid": "client_1",
      "nl": 0,
      "rap": 0,
      "rh": 0,
    },
    {
      "topic": "t/b",
      "qos": 1,
      "node": "emqx@10.12.50.36",
      "clientid": "client_1",
      "nl": 0,
      "rap": 0,
      "rh": 0,
    }
  ]
}
```
