# 认证管理

## 查看用户名认证信息

### URI

GET /authentication/password_based%3Abuilt_in_database/users

### 请求消息

无

### 响应消息

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| data            | Array of Objects | 认证数据       |
| data[].user_id | String           | 登录用户名         |
| meta            | Object           | 分页信息           |
| meta.page       | Integer          | 页码               |
| meta.limit      | Integer          | 每页显示的数据条数 |
| meta.hasnext      | boolean        | 是否有下一页         |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/authentication/password_based%3Abuilt_in_database/users
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
      "user_id": "api_user2"
    },
    {
      "user_id": "api_user1"
    },
    {
      "user_id": "test"
    }
  ]
}
```

TODO：查询支持的参数，响应字段确认。

## 查看指定用户名的认证信息

### URI

GET /authentication/password_based%3Abuilt_in_database/users/{user_id}

**参数：**

| 参数     | 类型   | 描述     |
| -------- | ------ | -------- |
| user_id | String | 认证用户名 |

### 请求消息

无

### 响应消息

| 名称            | 类型    | 描述                     |
| :-------------- | :------ | :----------------------- |
| data            | Object  | 认证数据             |
| data[].user_id | String  | 认证用户名                 |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/authentication/password_based%3Abuilt_in_database/users/user1
```

### 响应示例

```JSON
// HTTP status response code
200
// HTTP response body
{
    "data": {
        "username": "user1"
    }
}
```

TODO：查询支持的参数，响应字段确认。

## 创建用户名认证信息

### URI

POST /authentication/password_based%3Abuilt_in_database/users

### 请求消息

| 名称     | 类型   | 描述       |
| :------- | :----- | :--------- |
| user_id | String | 认证用户名 |
| password | String | 认证密码   |

### 响应消息

| 名称 | 类型    | 描述 |
| :--- | :------ | :--- |
| user_id | String | 认证用户名    |

### 请求示例

```bash
curl -u app_id:app_secret -X POST -d '{"user_id": "user_test", "password": "password"}' {api}/authentication/password_based%3Abuilt_in_database/users
```

### 响应示例

```JSON
// HTTP status response code
201
// HTTP response body
{
  "user_id": "user_test"
}
```

## 批量创建用户名认证信息

### URI

POST /authentication/password_based%3Abuilt_in_database/import_users?type=plain

### 请求消息

| 名称        | 类型   | 描述       |
| :---------- | :----- | :--------- |
| [].user_id | String | 认证用户名 |
| [].password | String | 认证密码   |

### 响应消息

状态码

### 请求示例

```bash
curl -u app_id:app_secret -X POST -d '[{"username": "api_user1", "password": "password"},{"username": "api_user2", "password": "password"}]' {api}/authentication/password_based%3Abuilt_in_database/import_users?type=plain
```

### 响应示例

```HTTP
HTTP status response code
204 
```

TODO：查询支持的参数，响应字段确认。

## 更新用户名认证密码

### URI

PUT /authentication/password_based%3Abuilt_in_database/users/{user_id}

**参数：**

| 名称     | 类型   | 描述            |
| -------- | ------ | --------------- |
| user_id | String | 更新的 user id |

### 请求消息

| 名称     | 类型   | 描述     |
| :------- | :----- | :------- |
| password | String | 认证密码 |

### 响应消息

状态码

### 请求示例

```bash
curl -u app_id:app_secret -X PUT  -d '{"password": "new_password"}' {api}/authentication/password_based%3Abuilt_in_database/users/api_user1
```

### 响应示例

```HTTP
// HTTP status response code
204 
```

TODO：响应字段确认。

## 删除用户名认证信息

### URI

DELETE /authentication/password_based%3Abuilt_in_database/users/{user_id}

**参数：**

| 名称     | 类型   | 描述         |
| :------- | :----- | :----------- |
| user_id | String | 需要删除的用户名 |

### 请求消息

无

### 响应消息

状态码

### 请求示例

```bash
curl -u app_id:app_secret -X DELETE {api}/authentication/password_based%3Abuilt_in_database/users/api_user1
```

### 响应示例

```HTTP
// HTTP status response code
204 
```

