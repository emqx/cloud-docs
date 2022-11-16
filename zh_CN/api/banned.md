# 黑名单管理

## 查看黑名单

### URI

GET /banned

返回集群下所有黑名单数据，支持分页。

**查询参数:**

| 参数     | 类型      | 描述        |
|--------|---------|-----------|
| _page  | Integer | 页码        |
| _limit | Integer | 每页显示的数据条数 |

### 请求消息

无

### 响应消息

| 名称            | 类型               | 描述        |
|:--------------|:-----------------|:----------|
| code          | Integer          | 0         |
| data          | Array of Objects | 所有黑名单数据   |
| data[].who    | String           | 黑名单的对象    |
| data[].as     | String           | 对象类型      |
| data[].reason | String           | 详细信息      |
| data[].by     | String           | 添加者       |
| data[].at     | Integer          | 添加至黑名单的时间 |
| data[].until  | Integer          | 何时从黑名单中解除 |
| meta          | Object           | 分页信息      |
| meta.page     | Integer          | 页码        |
| meta.limit    | Integer          | 每页显示的数据条数 |
| meta.count    | Integer          | 数据总条数     |

### 请求示例

```bash
$ curl -u app_id:app_secret -X GET {api}/banned
```

### 响应示例

```JSON
{
  "meta": {
    "page": 1,
    "limit": 10,
    "count": 2
  },
  "data": [
    {
      "who": "clientid_test",
      "until": 1668504415,
      "reason": "reason_test",
      "by": "user",
      "at": 1668504115,
      "as": "clientid"
    },
    {
      "who": "user_test",
      "until": 1668504469,
      "reason": "reason_test",
      "by": "admin",
      "at": 1668504169,
      "as": "username"
    }
  ],
  "code": 0
}
```

## 添加黑名单信息

### URI

POST /banned

将对象添加至黑名单。

### 请求消息

| 名称     | 类型      | 是否必须 | 默认值           | 描述                                              |
|:-------|:--------|:-----|:--------------|:------------------------------------------------|
| who    | String  | 必须   |               | 	添加至黑名单的对象，可以是客户端标识符、用户名和 IP 地址                 |
| as     | String  | 必须   |               | 用于区分黑名单对象类型，可以是`clientid`，`username`，`peerhost` |
| reason | String  | 必须   |               | 	详细信息                                           |
| by     | String  | 非必须  | user          | 指示该对象被谁添加至黑名单                                   |
| at     | Integer | 非必须  | 当前系统时间        | 添加至黑名单的时间，单位：秒                                  |
| until  | Integer | 非必须  | 当前系统时间 + 5 分钟 | 何时从黑名单中解除，单位：秒                                  |

### 响应消息

| 名称          | 类型      | 描述        |
|:------------|:--------|:----------|
| code        | Integer | 0         |
| data        | Objects | 黑名单信息     |
| data.who    | String  | 黑名单的对象    |
| data.as     | String  | 对象类型      |
| data.reason | String  | 详细信息      |
| data.by     | String  | 添加者       |
| data.at     | Integer | 添加至黑名单的时间 |
| data.until  | Integer | 何时从黑名单中解除 |

### 请求示例

```bash
$ curl -u app_id:app_secret -X POST {api}/banned -d '{"who":"example","as":"clientid","reason":"example"}'
```

### 响应示例

```JSON
{
  "code": 0,
  "data": {
    "who": "example",
    "until": 1668504415,
    "reason": "example",
    "by": "user",
    "at": 1668504115,
    "as": "clientid"
  }
}
```

## 删除黑名单信息

### URI

DELETE /banned/{as}/{who}

将对象从黑名单中删除

### 请求消息

无

### 响应消息

| 名称      | 类型      | 描述                     |
|:--------|:--------|:-----------------------|
| code    | Integer | 0                      |
| message | String  | 仅在发生错误时返回，用于提供更详细的错误信息 |


### 请求示例

```bash
$ curl -u app_id:app_secret -X DELETE {api}/banned/clientid/example
```

### 响应示例

```JSON
{
  "code": 0
}
```