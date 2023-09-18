# 访问控制（ACL）管理

## 创建/批量创建基于 client id 的 ACL 规则

### URI

POST /authorization/sources/built_in_database/rules/clients

### 请求消息

| 名称     | 类型   | 描述                   |
| -------- | ------ | ---------------------- |
| clientid | String | client id                  |
| rules | Object | 需要定义的规则                   |
| [].topic    | String | 主题                   |
| [].action   | String | 动作：sub, pub, pubsub |
| [].permission   | String | 是否允许：allow, deny  |

### 响应消息

状态码

### 请求示例

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '{"clientid": "client1","rules":[{"topic": "t/a","action": "sub","permission": "allow"}]}' {api}/authorization/sources/built_in_database/rules/clients
```

### 响应示例

```HTTP
// HTTP status response code
204 
```


## 创建/批量创建基于 username 的 ACL 规则

### URI

POST /authorization/sources/built_in_database/rules/users

### 请求消息

| 名称     | 类型   | 描述                   |
| -------- | ------ | ---------------------- |
| username | String | username                  |
| rules | Object | 需要定义的规则                   |
| [].topic    | String | 主题                   |
| [].action   | String | 动作：sub, pub, pubsub |
| [].permission   | String | 是否允许：allow, deny  |

### 响应消息

状态码

### 请求示例

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '{"username": "emqx_user","rules":[{"topic": "t/a","action": "sub","permission": "allow"}]}' {api}/authorization/sources/built_in_database/rules/users
```

### 响应示例

```HTTP
// HTTP status response code
204 
```


## 创建/批量创建基于所有的 ACL 规则

### URI

POST /authorization/sources/built_in_database/rules/all

### 请求消息

| 名称     | 类型   | 描述                   |
| -------- | ------ | ---------------------- |
| rules | Object | 需要定义的规则                   |
| [].topic    | String | 主题                   |
| [].action   | String | 动作：sub, pub, pubsub |
| [].permission   | String | 是否允许：allow, deny  |

### 响应消息

状态码

### 请求示例

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '{"rules":[{"topic": "t/a","action": "sub","permission": "allow"}]}' {api}/authorization/sources/built_in_database/rules/all
```

### 响应示例

```HTTP
// HTTP status response code
204 
```


## 查看基于 client id 所有的 ACL 规则

### URI

GET /authorization/sources/built_in_database/rules/clients

### 请求消息

无

### 响应消息

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| clientid       | String | client id       |
| rules            | Array of Objects | 所有认证数据       |
| rules[].topic    | String           | 主题               |
| rules[].action   | String           | 动作               |
| rules[].permission   | String      | 是否允许           |
| meta            | Object           | 分页信息           |
| meta.page       | Integer          | 页码               |
| meta.limit      | Integer          | 每页显示的数据条数 |
| meta.count      | Integer          | 数据总条数         |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/authorization/sources/built_in_database/rules/clients
```

### 响应示例

```JSON
{
  "data": [
    {
      "clientid": "client1",
      "rules": [
        {
          "action": "publish",
          "permission": "allow",
          "topic": "test/topic/1"
        },
        {
          "action": "subscribe",
          "permission": "allow",
          "topic": "test/topic/2"
        },
        {
          "action": "all",
          "permission": "deny",
          "topic": "eq test/#"
        }
      ]
    }
  ],
  "meta": {
    // "count": 1  -- 当模糊查询条件 `like_clientid` 为空时，才会返回 count 字段。
    "hasnext": false,
    "limit": 50,
    "page": 1
  }
}
```


## 查看基于 username 所有的 ACL 规则

### URI

GET /authorization/sources/built_in_database/rules/users

### 请求消息

无

### 响应消息

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| username       | String | 访问控制用户名       |
| rules            | Array of Objects | 所有认证数据       |
| rules[].topic    | String           | 主题               |
| rules[].action   | String           | 动作               |
| rules[].permission | String           | 是否允许           |
| meta            | Object           | 分页信息           |
| meta.page       | Integer          | 页码               |
| meta.limit      | Integer          | 每页显示的数据条数 |
| meta.count      | Integer          | 数据总条数         |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/authorization/sources/built_in_database/rules/users
```

### 响应示例

```JSON
{
  "data": [
    {
      "rules": [
        {
          "action": "publish",
          "permission": "allow",
          "topic": "t/a"
        }
      ],
      "username": "user1"
    },
    {
      "rules": [
        {
          "action": "publish",
          "permission": "allow",
          "topic": "test/topic/1"
        },
        {
          "action": "subscribe",
          "permission": "allow",
          "topic": "test/topic/2"
        },
        {
          "action": "all",
          "permission": "deny",
          "topic": "eq test/#"
        }
      ],
      "username": "user2"
    }
  ],
  "meta": {
    // "count": 1  -- 当模糊查询条件 `like_username`为空时，才会返回 count 字段。
    "hasnext": false,
    "limit": 50,
    "page": 1
  }
}
```


## 查看基于所有的 ACL 规则

### URI

GET /authorization/sources/built_in_database/rules/all

### 请求消息

无

### 响应消息

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| rules            | Array of Objects | 所有认证数据       |
| rules[].topic    | String           | 主题               |
| rules[].action   | String           | 动作               |
| rules[].permission   | String           | 是否允许           |
| meta            | Object           | 分页信息           |
| meta.page       | Integer          | 页码               |
| meta.limit      | Integer          | 每页显示的数据条数 |
| meta.count      | Integer          | 数据总条数         |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/authorization/sources/built_in_database/rules/all
```

### 响应示例

```JSON
{
  "rules": [
    {
      "action": "publish",
      "permission": "allow",
      "topic": "test/topic/1"
    },
    {
      "action": "subscribe",
      "permission": "allow",
      "topic": "test/topic/2"
    },
    {
      "action": "all",
      "permission": "deny",
      "topic": "eq test/#"
    }
  ]
}
```

## 查看指定 client id 的 ACL 规则

### URI

GET /authorization/sources/built_in_database/rules/clients/{clientid}

**参数：**

| 参数     | 类型   | 描述     |
| -------- | ------ | -------- |
| clientid | String | clientid |

### 请求消息

无

### 响应消息

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| clientid       | String | client id       |
| rules            | Array of Objects | 所有认证数据       |
| rules[].topic    | String           | 主题               |
| rules[].action   | String           | 动作               |
| rules[].permission   | String      | 是否允许           |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/authorization/sources/built_in_database/rules/clients/client1
```

### 响应示例

```JSON
{
  "clientid": "client1",
  "rules": [
    {
      "action": "publish",
      "permission": "allow",
      "topic": "test/topic/1"
    },
    {
      "action": "subscribe",
      "permission": "allow",
      "topic": "test/topic/2"
    },
    {
      "action": "all",
      "permission": "deny",
      "topic": "eq test/#"
    }
  ]
}
```

## 查看指定 username 的 ACL 规则

### URI

GET /authorization/sources/built_in_database/rules/users/{username}

**参数：**

| 参数     | 类型   | 描述     |
| -------- | ------ | -------- |
| username | String | username |

### 请求消息

无

### 响应消息

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| username       | String | 访问控制用户名       |
| rules            | Array of Objects | 所有认证数据       |
| rules[].topic    | String           | 主题               |
| rules[].action   | String           | 动作               |
| rules[].permission   | String           | 是否允许           |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/acl/authorization/sources/built_in_database/rules/users/user1
```

### 响应示例

```JSON
{
  "rules": [
    {
      "action": "publish",
      "permission": "allow",
      "topic": "test/topic/1"
    }
  ],
  "username": "user1"
}
```


## 更新指定 client id 的 ACL 规则

### URI

PUT /authorization/sources/built_in_database/rules/clients/{clientid}

**参数：**

| 参数     | 类型   | 描述     |
| -------- | ------ | -------- |
| clientid | String | clientid |

### 请求消息

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| clientid       | String | client id       |
| rules            | Array of Objects | 所有认证数据       |
| rules[].topic    | String           | 主题               |
| rules[].action   | String           | 动作               |
| rules[].permission   | String      | 是否允许           |

### 响应消息

状态码

### 请求示例

```bash
curl -u app_id:app_secret -X PUT -H 'Content-Type: application/json' -d '{"clientid": "client1","rules":[{"topic": "t/a","action": "sub","permission": "allow"}]}' {api}/authorization/sources/built_in_database/rules/clients/client1
```

### 响应示例

```HTTP
// HTTP status response code
204 
```

## 更新指定 username 的 ACL 规则

### URI

PUT /authorization/sources/built_in_database/rules/users/{username}

**参数：**

| 参数     | 类型   | 描述     |
| -------- | ------ | -------- |
| username | String | username |

### 请求消息

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| username       | String | 访问控制用户名       |
| rules            | Array of Objects | 所有认证数据       |
| rules[].topic    | String           | 主题               |
| rules[].action   | String           | 动作               |
| rules[].permission   | String           | 是否允许           |

### 响应消息

状态码

### 请求示例

```bash
curl -u app_id:app_secret -X PUT -H 'Content-Type: application/json' -d '{"username": "emqx_user","rules":[{"topic": "t/a","action": "sub","permission": "allow"}]}' {api}/acl/authorization/sources/built_in_database/rules/users/user1
```

### 响应示例

```HTTP
// HTTP status response code
204 
```


## 删除指定 clientid 指定的 ACL 规则

### URI

DELETE /authorization/sources/built_in_database/rules/clients/{clientid}


### 请求消息

无

### 响应消息

状态码

### 请求示例

```bash
curl -u app_id:app_secret -X DELETE {api}/authorization/sources/built_in_database/rules/clients/clientid1
```

### 响应示例

```HTTP
// HTTP status response code
204 
```

## 删除指定 username 指定的 ACL 规则

### URI

DELETE /authorization/sources/built_in_database/rules/users/{username}


### 请求消息

无

### 响应消息

状态码

### 请求示例

```bash
curl -u app_id:app_secret -X DELETE {api}/authorization/sources/built_in_database/rules/users/user1
```

### 响应示例

```HTTP
// HTTP status response code
204 
```

## 删除指定的所有 ACL 规则

### URI

DELETE /authorization/sources/built_in_database/rules/all


### 请求消息

无

### 响应消息

状态码

### 请求示例
```bash
curl -u app_id:app_secret -X DELETE {api}/authorization/sources/built_in_database/rules/all
```

### 响应示例

```HTTP
// HTTP status response code
204 
```
