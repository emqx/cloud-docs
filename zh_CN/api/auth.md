# 认证管理

## 查看用户名认证信息

### URI

GET /auth_username

### 请求消息

无

### 响应消息

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| code            | Integer          | 0                  |
| data            | Array of Objects | 所有认证数据       |
| data[].username | String           | 登录用户名         |
| meta            | Object           | 分页信息           |
| meta.page       | Integer          | 页码               |
| meta.limit      | Integer          | 每页显示的数据条数 |
| meta.count      | Integer          | 数据总条数         |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/auth_username
```

### 响应示例

```JSON
{
  "meta": {
    "page": 1,
    "limit": 10,
    "count": 3
  },
  "data": [
    {
      "username": "api_user2"
    },
    {
      "username": "api_user1"
    },
    {
      "username": "test"
    }
  ],
  "code": 0
}
```

## 查看指定用户名的认证信息

### URI

GET /auth_username/{username}

**参数：**

| 参数     | 类型   | 描述     |
| -------- | ------ | -------- |
| username | String | username |

### 请求消息

无

### 响应消息

| 名称            | 类型    | 描述                     |
| :-------------- | :------ | :----------------------- |
| code            | Integer | 0                        |
| data            | Object  | 所有认证数据             |
| data[].username | String  | username                 |
| data[].password | String  | 使用 sha256 加密后的密码 |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/auth_username/user1
```

### 响应示例

```JSON
{
    "data": {
        "username": "user1"
    },
    "code": 0
}
```

## 创建用户名认证信息

### URI

POST /auth_username

### 请求消息

| 名称     | 类型   | 描述       |
| :------- | :----- | :--------- |
| username | String | 认证用户名 |
| password | String | 认证密码   |

### 响应消息

| 名称 | 类型    | 描述 |
| :--- | :------ | :--- |
| code | Integer | 0    |

### 请求示例

```bash
curl -u app_id:app_secret -X POST -d '{"username": "user_test", "password": "password"}' {api}/auth_username 
```

### 响应示例

```JSON
{
  "code": 0
}
```

## 批量创建用户名认证信息

### URI

POST /auth_username

### 请求消息

| 名称        | 类型   | 描述       |
| :---------- | :----- | :--------- |
| [].username | String | 认证用户名 |
| [].password | String | 认证密码   |

### 响应消息

| 名称 | 类型             | 描述                                                          |
| :--- | :--------------- | :------------------------------------------------------------ |
| code | Integer          | 0                                                             |
| data | Array of Objects | 创建结果，key 为 username，value 为请求结果， ok 表示创建成功 |

### 请求示例

```bash
curl -u app_id:app_secret -X POST -d '[{"username": "api_user1", "password": "password"},{"username": "api_user2", "password": "password"}]' {api}/auth_username
```

### 响应示例

```JSON
{
  "data": {
    "api_user1": "ok",
    "api_user2": "ok"
  },
  "code": 0
}
```

## 更新用户名认证密码

### URI

PUT /auth_username/{username}

**参数：**

| 名称     | 类型   | 描述            |
| -------- | ------ | --------------- |
| username | String | 更新的 username |

### 请求消息

| 名称     | 类型   | 描述     |
| :------- | :----- | :------- |
| password | String | 认证密码 |

### 响应消息

| 名称 | 类型    | 描述 |
| :--- | :------ | :--- |
| code | Integer | 0    |

### 请求示例

```bash
curl -u app_id:app_secret -X PUT  -d '{"password": "new_password"}' {api}/auth_username/api_user1
```

### 响应示例

```JSON
{
  "code": 0
}
```

## 删除用户名认证信息

### URI

DELETE /auth_username/{username}

**参数：**

| 名称     | 类型   | 描述         |
| :------- | :----- | :----------- |
| username | String | 删除的用户名 |

### 请求消息

无

### 响应消息

| 名称 | 类型    | 描述 |
| :--- | :------ | :--- |
| code | Integer | 0    |

### 请求示例

```bash
curl -u app_id:app_secret -X DELETE {api}/auth_username/api_user1
```

### 响应示例

```JSON
{
  "code": 0
}
```

