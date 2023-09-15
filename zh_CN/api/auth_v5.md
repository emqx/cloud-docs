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
| data[].is_superuser | Boolean           | 是否是超级用户         |
| meta            | Object           | 分页信息           |
| meta.count      | Integer         |  用户信息              |
| meta.page       | Integer          | 页码               |
| meta.limit      | Integer          | 每页显示的数据条数 |
| meta.hasnext      | Boolean        | 是否有下一页         |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/authentication/password_based%3Abuilt_in_database/users
```


### 响应示例

```JSON
{
  "meta": {
    "count": 1,
    "hasnext": false,
    "limit": 10,
    "page": 1
  },
  "data": [
    {
      "is_superuser": false,
      "user_id": "user1"
    },
    {
      "is_superuser": false,
      "user_id": "user2"
    },
    {
      "is_superuser": false,
      "user_id": "user3"
    }
  ]
}
```


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
| data[].is_superuser | Boolean           | 是否是超级用户         |

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
      "is_superuser": false,
      "user_id": "user1"
    }
}

// HTTP status response code
404
// HTTP response body
{
    "code": "NOT_FOUND",
    "message": "User not found"
}
```


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
| data[].is_superuser | Boolean   | 是否是超级用户         |

### 请求示例

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '{"user_id": "user1", "password": "password"}' {api}/authentication/password_based%3Abuilt_in_database/users
```

### 响应示例

```JSON
// HTTP status response code
201
// HTTP response body
{
  "user_id": "user1"
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
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '[{"username": "api_user1", "password": "password"},{"username": "api_user2", "password": "password"}]' {api}/authentication/password_based%3Abuilt_in_database/import_users?type=plain
```


### 响应示例

```HTTP
HTTP status response code
204 
```


## 更新用户名认证密码

### URI

PUT /authentication/password_based%3Abuilt_in_database/users/{user_id}

**参数：**

| 名称     | 类型   | 描述            |
| -------- | ------ | --------------- |
| user_id | String | 更新的用户名 |

### 请求消息

| 名称     | 类型   | 描述     |
| :------- | :----- | :------- |
| password | String | 更新密码 |

### 响应消息

状态码

### 请求示例

```bash
curl -u app_id:app_secret -X PUT -H 'Content-Type: application/json' -d '{"password": "new_password"}' {api}/authentication/password_based%3Abuilt_in_database/users/user1
```

### 响应示例

``` JSON
// HTTP status response code
204 
// HTTP response body
{
    "is_superuser": false,
    "user_id": "user1"
}
```


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
curl -u app_id:app_secret -X DELETE {api}/authentication/password_based%3Abuilt_in_database/users/user1
```

### 响应示例

```HTTP
// HTTP status response code
204 
```

