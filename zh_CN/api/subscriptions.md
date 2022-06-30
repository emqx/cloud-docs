# 订阅信息

## 获取所有订阅信息

返回集群下所有订阅信息，支持分页机制。

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
| code            | Integer          | 0                  |
| data            | Array of Objects | 所有订阅信息       |
| data[].node     | String           | 节点名称           |
| data[].clientid | String           | 客户端标识符       |
| data[].topic    | String           | 订阅主题           |
| data[].qos      | Integer          | QoS 等级           |
| meta            | Object           | 分页信息           |
| meta.page       | Integer          | 页码               |
| meta.limit      | Integer          | 每页显示的数据条数 |
| meta.count      | Integer          | 数据总条数         |

### 请求示例

```bash
$ curl -u app_id:app_secret -X GET {api}/subscriptions
```

### 响应示例

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

## 获取指定客户端所有订阅信息

### URI

GET /subscriptions/{clientid}

### 请求消息

查询参数:

| 名称     | 类型   | 描述     |
| -------- | ------ | -------- |
| clientid | String | clientid |

### 响应消息

| 名称            | 类型             | 描述         |
| --------------- | ---------------- | ------------ |
| code            | Integer          | 0            |
| data            | Array of Objects | 所有订阅信息 |
| data[].node     | String           | 节点名称     |
| data[].clientid | String           | 客户端标识符 |
| data[].topic    | String           | 订阅主题     |
| data[].qos      | Integer          | QoS 等级     |

### 请求示例

```bash
$ curl -u app_id:app_secret -X GET {api}/subscriptions/{clientid}
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

