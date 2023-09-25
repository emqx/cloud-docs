# 访问控制（ACL）管理

本页 API 文档提供了与访问控制 （ACL）管理相关的各种操作信息，包括创建 、查看 、更新和删除 ACL 规则。

## 创建基于 client id 的 ACL 规则

### URI

POST /acl

### 请求消息

| 名称     | 类型   | 描述                   |
| -------- | ------ | ---------------------- |
| clientid | String | clientid               |
| topic    | String | 主题                   |
| action   | String | 动作：sub, pub, pubsub |
| access   | String | 是否允许：allow, deny  |

### 响应消息

| 名称          | 类型    | 描述     |
| :------------ | :------ | :------- |
| code          | Integer | 0        |
| data          | Object  | 规则对象 |
| data.topic    | String  | 主题     |
| data.result   | String  | 结果     |
| data.clientid | String  | clientid |
| data.action   | String  | 动作     |
| data.access   | String  | 是否允许 |

### 请求示例

```bash
$ curl -u app_id:app_secret -X POST -d '{"clientid": "client1","topic": "a/b","action": "sub","access": "allow"}' {api}/acl
```

### 响应示例

```JSON
{
  "data": {
    "topic": "a/b",
    "result": "ok",
    "clientid": "client1",
    "action": "sub",
    "access": "allow"
  },
  "code": 0
}
```

## 创建基于 username 的 ACL 规则

### URI

POST /acl

### 请求消息

| 名称     | 类型   | 描述                   |
| -------- | ------ | ---------------------- |
| username | String | username               |
| topic    | String | 主题                   |
| action   | String | 动作：sub, pub, pubsub |
| access   | String | 是否允许：allow, deny  |

### 响应消息

| 名称          | 类型    | 描述     |
| :------------ | :------ | :------- |
| code          | Integer | 0        |
| data          | Object  | 规则对象 |
| data.topic    | String  | 主题     |
| data.result   | String  | 结果     |
| data.username | String  | username |
| data.action   | String  | 动作     |
| data.access   | String  | 是否允许 |

### 请求示例

```bash
$ curl -u app_id:app_secret -X POST -d '{"username": "user1","topic": "a/b","action": "sub","access": "allow"}' {api}/acl
```

### 响应示例

```JSON
{
  "data": {
    "username": "user1", 
    "topic": "a/b", 
    "result": "ok", 
    "action": "sub", 
    "access": "allow"
  }, 
  "code": 0
}
```

## 创建基于所有的 ACL 规则

### URI

POST /acl

### 请求消息

| 名称   | 类型   | 描述                   |
| ------ | ------ | ---------------------- |
| topic  | String | 主题                   |
| action | String | 动作：sub, pub, pubsub |
| access | String | 是否允许：allow, deny  |

### 响应消息

| 名称        | 类型    | 描述     |
| :---------- | :------ | :------- |
| code        | Integer | 0        |
| data        | Object  | 规则对象 |
| data.topic  | String  | 主题     |
| data.result | String  | 结果     |
| data.all    | String  | $all     |
| data.action | String  | 动作     |
| data.access | String  | 是否允许 |

### 请求示例

```bash
$ curl -u app_id:app_secret -X POST -d '{"topic": "a/b","action": "pub","access": "allow"}' {api}/acl
```

### 响应示例

```JSON
{
  "data": {
    "topic": "a/b",
    "result": "ok",
    "all": "$all",
    "action": "pub",
    "access": "allow"
  },
  "code": 0
}
```

## 批量添加 ACL 规则

### URI

POST /acl

### 请求消息

| 名称         | 类型   | 描述                   |
| ------------ | ------ | ---------------------- |
| [0].clientid | String | clientid               |
| [0].topic    | String | 主题                   |
| [0].action   | String | 动作：sub, pub, pubsub |
| [0].access   | String | 是否允许：allow, deny  |
| [1].username | String | username               |
| [1].topic    | String | 主题                   |
| [1].action   | String | 动作：sub, pub, pubsub |
| [1].access   | String | 是否允许：allow, deny  |
| [2].topic    | String | 主题                   |
| [2].action   | String | 动作：sub, pub, pubsub |
| [2].access   | String | 是否允许：allow, deny  |

### 响应消息

| 名称         | 类型    | 描述                   |
| :----------- | :------ | :--------------------- |
| code         | Integer | 0                      |
| data         | Object  | 规则对象               |
| [0].clientid | String  | clientid               |
| [0].topic    | String  | 主题                   |
| [0].action   | String  | 动作：sub, pub, pubsub |
| [0].access   | String  | 是否允许：allow, deny  |
| [0].result   | String  | 结果                   |
| [1].username | String  | username               |
| [1].topic    | String  | 主题                   |
| [1].action   | String  | 动作：sub, pub, pubsub |
| [1].access   | String  | 是否允许：allow, deny  |
| [1].result   | String  | 结果                   |
| [2].topic    | String  | 主题                   |
| [2].action   | String  | 动作：sub, pub, pubsub |
| [2].access   | String  | 是否允许：allow, deny  |
| [2].all      | String  | $all                   |
| [2].result   | String  | 结果                   |

### 请求示例

```bash
$ curl -u app_id:app_secret -X POST -d '[{"clientid": "emqx_c_1","topic": "topic/A","action": "pub","access": "allow"},{"username": "emqx_u_1","topic": "topic/A","action": "sub","access": "allow"},{"topic": "topic/+","action": "pubsub","access": "deny"}]' {api}/acl
```

### 响应示例

```JSON
{
  "data": [
    {
      "topic": "topic/+",
      "result": "ok",
      "all": "$all",
      "action": "pubsub",
      "access": "deny"
    },
    {
      "username": "emqx_u_1",
      "topic": "topic/A",
      "result": "ok",
      "action": "sub",
      "access": "allow"
    },
    {
      "topic": "topic/A",
      "result": "ok",
      "clientid": "emqx_c_1",
      "action": "pub",
      "access": "allow"
    }
  ],
  "code": 0
}
```

## 查看基于 clientid 所有的 ACL 规则

### URI

GET /acl/clientid

### 请求消息

无

### 响应消息

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| code            | Integer          | 0                  |
| data            | Array of Objects | 所有认证数据       |
| data[].topic    | String           | 主题               |
| data[].clientid | String           | clientid           |
| data[].action   | String           | 动作               |
| data[].access   | String           | 是否允许           |
| meta            | Object           | 分页信息           |
| meta.page       | Integer          | 页码               |
| meta.limit      | Integer          | 每页显示的数据条数 |
| meta.count      | Integer          | 数据总条数         |

### 请求示例

```bash
$ curl -u app_id:app_secret -X GET {api}/acl/clientid
```

### 响应示例

```JSON
{
  "meta": {
    "page": 1,
    "limit": 10,
    "count": 1
  },
  "data": [
    {
      "topic": "topic/A",
      "clientid": "emqx_c_1",
      "action": "pub",
      "access": "allow"
    }
  ],
  "code": 0
}
```

## 查看基于 username 所有的 ACL 规则

### URI

GET /acl/username

### 请求消息

无

### 响应消息

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| code            | Integer          | 0                  |
| data            | Array of Objects | 所有认证数据       |
| data[].topic    | String           | 主题               |
| data[].username | String           | username           |
| data[].action   | String           | 动作               |
| data[].access   | String           | 是否允许           |
| meta            | Object           | 分页信息           |
| meta.page       | Integer          | 页码               |
| meta.limit      | Integer          | 每页显示的数据条数 |
| meta.count      | Integer          | 数据总条数         |

### 请求示例

```bash
$ curl -u app_id:app_secret -X GET {api}/acl/username
```

### 响应示例

```JSON
{
  "meta": {
    "page": 1,
    "limit": 10,
    "count": 1
  },
  "data": [
    {
      "username": "emqx_u_1",
      "topic": "topic/A",
      "action": "sub",
      "access": "allow"
    }
  ],
  "code": 0
}
```

## 查看基于所有的 ACL 规则

### URI

GET /acl/$all

### 请求消息

无

### 响应消息

| 名称          | 类型             | 描述               |
| :------------ | :--------------- | :----------------- |
| code          | Integer          | 0                  |
| data          | Array of Objects | 所有认证数据       |
| data[].topic  | String           | 主题               |
| data[].all    | String           | $all               |
| data[].action | String           | 动作               |
| data[].access | String           | 是否允许           |
| meta          | Object           | 分页信息           |
| meta.page     | Integer          | 页码               |
| meta.limit    | Integer          | 每页显示的数据条数 |
| meta.count    | Integer          | 数据总条数         |

### 请求示例

```bash
$ curl -u app_id:app_secret -X GET {api}/acl/\$all
```

### 响应示例

```JSON
{
  "meta": {
    "page": 1,
    "limit": 10,
    "count": 1
  },
  "data": [
    {
      "topic": "topic/A",
      "all": "$all",
      "action": "sub",
      "access": "allow"
    }
  ],
  "code": 0
}
```

## 查看指定 clientid 的 ACL 规则

### URI

GET /acl/clientid/{clientid}

**参数：**

| 参数     | 类型   | 描述     |
| -------- | ------ | -------- |
| clientid | String | clientid |

### 请求消息

无

### 响应消息

| 名称            | 类型             | 描述         |
| :-------------- | :--------------- | :----------- |
| code            | Integer          | 0            |
| data            | Array of Objects | 所有认证数据 |
| data[].topic    | String           | 主题         |
| data[].clientid | String           | client id    |
| data[].action   | String           | 动作         |
| data[].access   | String           | 是否允许     |

### 请求示例

```bash
$ curl -u app_id:app_secret -X GET {api}/acl/clientid/emqx_c_1
```

### 响应示例

```JSON
{
  "data": [
    {
      "topic": "topic/A",
      "clientid": "emqx_c_1",
      "action": "pub",
      "access": "allow"
    }
  ],
  "code": 0
}
```

## 查看指定 username 的 ACL 规则

### URI

GET /acl/username/{username}

**参数：**

| 参数     | 类型   | 描述     |
| -------- | ------ | -------- |
| username | String | username |

### 请求消息

无

### 响应消息

| 名称            | 类型             | 描述         |
| :-------------- | :--------------- | :----------- |
| code            | Integer          | 0            |
| data            | Array of Objects | 所有认证数据 |
| data[].topic    | String           | 主题         |
| data[].username | String           | username     |
| data[].action   | String           | 动作         |
| data[].access   | String           | 是否允许     |

### 请求示例

```bash
$ curl -u app_id:app_secret -X GET {api}/acl/username/emqx_u_1
```

### 响应示例

```JSON
{
  "data": [
    {
      "topic": "topic/A",
      "username": "emqx_u_1",
      "action": "pub",
      "access": "allow"
    }
  ],
  "code": 0
}
```

## 删除指定 clientid 指定的 ACL 规则

### URI

DELETE /acl/clientid/{clientid}/topic/{topic}

**参数：**

| 参数     | 类型   | 描述                               |
| -------- | ------ | ---------------------------------- |
| clientid | String | clientid                           |
| topic    | String | topic，可能需要使用 UrlEncode 编码 |

### 请求消息

无

### 响应消息

| 名称 | 类型    | 描述 |
| :--- | :------ | :--- |
| code | Integer | 0    |

### 请求示例

```bash
$ curl -u app_id:app_secret -X DELETE {api}/acl/clientid/emqx_c_1/topic/topic%2fA
```

### 响应示例

```JSON
{
  "code": 0
}
```

## 删除指定 username 指定的 ACL 规则

### URI

DELETE /acl/username/{username}/topic/{topic}

**参数：**

| 参数     | 类型   | 描述                               |
| -------- | ------ | ---------------------------------- |
| username | String | username                           |
| topic    | String | topic，可能需要使用 UrlEncode 编码 |

### 请求消息

无

### 响应消息

| 名称 | 类型    | 描述 |
| :--- | :------ | :--- |
| code | Integer | 0    |

### 请求示例

```bash
$ curl -u app_id:app_secret -X DELETE {api}/acl/username/emqx_u_1/topic/topic%2fA
```

### 响应示例

```JSON
{
  "code": 0
}
```

## 删除基于所有的指定的 ACL 规则

### URI

DELETE /acl/$all/topic/{topic}

**参数：**

| 参数  | 类型   | 描述                               |
| ----- | ------ | ---------------------------------- |
| topic | String | topic，可能需要使用 UrlEncode 编码 |

### 请求消息

无

### 响应消息

| 名称 | 类型    | 描述 |
| :--- | :------ | :--- |
| code | Integer | 0    |

### 请求示例

```bash
$ curl -u app_id:app_secret -X DELETE {api}/acl/\$all/topic/topic%2fA
```

### 响应示例

```JSON
{
  "code": 0
}
```
