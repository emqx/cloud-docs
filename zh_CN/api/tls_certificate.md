# TLS 证书管理 API

本页 API 文档提供了 TLS 证书管理的各种操作信息，包括添加、查看，更新和删除 TLS 证书信息。

## 查看指定部署下 TLS 证书状态

### URI

GET /deployments/{deployment_id}/tls

::: tip
该方法 60 分钟只能请求 60 次。
:::

### 请求消息

无

### 响应消息

- **200:**

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| tls_type        | String | TLS 证书类型：'one-way'单向 TLS，'two-way'双向 TLS。      |
| expire | String           | 证书过期时间。        |
| status | String           | TLS 证书状态：'running' 运行中，' pending'创建中。        |

- **401:** API Key 认证失败。
- **403:** API Key 没有权限访问。
- **404:** 未找到部署。
- **429:** 请求次数超过限制。

### 请求示例

```bash
curl -u key:secret -X GET {api}/deployments/deployment-ge6a1a75/tls
```


### 响应示例

```JSON
{

  "tls_type": "string",
  "expire": "string",
  "status": "string"

}
```


## 为指定部署创建 TLS 证书

### URI

POST /deployments/{deployment_id}/tls

::: tip
该方法 60 分钟内只能请求 6 次。
:::

### 请求消息

| 名称     | 类型   | 描述       |
| :------- | :----- | :--------- |
| tls_type | String | TLS 证书类型：'one-way'单向 TLS，'two-way'双向 TLS。 |
| cert | String |  公钥证书  |
| key | String | 私钥   |
| cacert | String | 客户端 CA 证书，当证书类型为 'two-way' 需要上传。   |

### 响应消息

- **200:**

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| tls_type        | String | TLS 证书类型：'one-way'单向 TLS，'two-way'双向 TLS。      |
| expire | String           | 证书过期时间。        |
| status | String           | TLS 证书状态：'running' 运行中，' pending'创建中。        |

- **401:** API Key 认证失败。
- **403:** API Key 没有权限访问。
- **404:** 未找到部署。
- **422:** 无效的请求参数。
- **429:** 请求次数超过限制。

### 请求示例

```bash
curl -u key:secret -X POST {api}/deployments/deployment-ge6a1a75/tls
```

### 响应示例

```JSON
{

  "tls_type": "string",
  "expire": "string",
  "status": "string"

}
```


## 为指定部署更新 TLS 证书

### URI

PUT /deployments/{deployment_id}/tls

::: tip
该方法 60 分钟内只能请求 6 次。
:::

### 请求消息

| 名称     | 类型   | 描述       |
| :------- | :----- | :--------- |
| tls_type | String | TLS 证书类型：'one-way'单向 TLS，'two-way'双向 TLS。 |
| cert | String |  公钥证书  |
| key | String | 私钥   |
| cacert | String | 客户端 CA 证书，当证书类型为 'two-way' 需要上传。   |

### 响应消息

- **200:**

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| tls_type        | String | TLS 证书类型：'one-way'单向 TLS，'two-way'双向 TLS。      |
| expire | String           | 证书过期时间。        |
| status | String           | TLS 证书状态：'running' 运行中，' pending'创建中。        |

- **401:** API Key 认证失败。
- **403:** API Key 没有权限访问。
- **404:** 未找到部署。
- **422:** 无效的请求参数。
- **429:** 请求次数超过限制。

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
  "user_id": "user1",
  "is_superuser": false
}
```



## 删除指定部署的 TLS 证书

### URI

DELETE /deployments/{deployment_id}/tls

::: tip
该方法 60 分钟内只能请求 6 次。
:::

### 请求消息

无

### 响应消息

- **204:** 成功。
- **401:** API Key 认证失败。
- **403:** API Key 没有权限访问。
- **404:** 未找到部署。
- **429:** 请求次数超过限制。

### 请求示例

```bash
curl -u app_id:app_secret -X DELETE {api}/authentication/password_based%3Abuilt_in_database/users/user1
```

### 响应示例

```HTTP
// HTTP status response code
204 
```

