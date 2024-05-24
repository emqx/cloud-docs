# TLS 证书管理 API

本页 API 文档提供了 TLS 证书管理的各种操作信息，包括添加、查看，更新和删除 TLS 证书信息。

## 查看指定部署下 TLS 证书状态

### URI

GET /deployments/{deployment_id}/tls

::: tip
该方法 60 分钟只能请求 60 次。{deployment_id} 为部署 ID， 非部署名称。
:::

### 请求消息

无

### 响应消息

- **200:**

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| tlsType        | String | TLS 证书类型：'one-way'单向 TLS，'two-way'双向 TLS。      |
| expire | String           | 证书过期时间。        |
| status | String           | TLS 证书状态：'running' 运行中，' pending'创建中。        |

- **401:** API Key 认证失败。
- **403:** API Key 没有权限访问。
- **404:** 未找到部署。
- **429:** 请求次数超过限制。

### 请求示例

```bash
curl -u key:secret -X GET {api}/deployments/ge6a1a75/tls
```


### 响应示例

```JSON
{
  "expire": "2034-05-22 02:43:21",
  "status": "running",
  "tlsType": "one-way"
}
```


## 为指定部署创建 TLS 证书

### URI

POST /deployments/{deployment_id}/tls

::: tip
该方法 60 分钟内只能请求 6 次。{deployment_id} 为部署 ID， 非部署名称。
:::

### 请求消息

| 名称     | 类型   | 描述       |
| :------- | :----- | :--------- |
| tlsType | String | TLS 证书类型：'one-way'单向 TLS，'two-way'双向 TLS。 |
| cert | String |  公钥证书  |
| key | String | 私钥   |
| cacert | String | 客户端 CA 证书，当证书类型为 'two-way' 需要上传。   |

### 响应消息

- **200:**

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| tlsType        | String | TLS 证书类型：'one-way'单向 TLS，'two-way'双向 TLS。      |
| expire | String           | 证书过期时间。        |
| status | String           | TLS 证书状态：'running' 运行中，' pending'创建中。        |

- **401:** API Key 认证失败。
- **403:** API Key 没有权限访问。
- **404:** 未找到部署。
- **422:** 无效的请求参数。
- **429:** 请求次数超过限制。

### 请求示例

```bash
curl -u key:secret -X POST -H 'Content-Type: application/json' -d '{"tlsType": "one-way", "cert": "-----BEGIN CERTIFICATE-----\nMII...tH6j7afSg==\n-----END CERTIFICATE-----},"key":"-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA5bdg8Rt5A7...AjQzYRdov4inpzw==\n-----END RSA PRIVATE KEY-----"' {api}/deployments/ge6a1a75/tls
```

### 响应示例

```JSON
{
  "expire": "2034-05-22 02:43:21",
  "status": "pending",
  "tlsType": "one-way"
}
```


## 为指定部署更新 TLS 证书

### URI

PUT /deployments/{deployment_id}/tls

::: tip
该方法 60 分钟内只能请求 6 次。{deployment_id} 为部署 ID， 非部署名称。
:::

### 请求消息

| 名称     | 类型   | 描述       |
| :------- | :----- | :--------- |
| tlsType | String | TLS 证书类型：'one-way'单向 TLS，'two-way'双向 TLS。 |
| cert | String |  公钥证书  |
| key | String | 私钥   |
| cacert | String | 客户端 CA 证书，当证书类型为 'two-way' 需要上传。   |

### 响应消息

- **200:**

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| tlsType        | String | TLS 证书类型：'one-way'单向 TLS，'two-way'双向 TLS。      |
| expire | String           | 证书过期时间。        |
| status | String           | TLS 证书状态：'running' 运行中，' pending'创建中。        |

- **401:** API Key 认证失败。
- **403:** API Key 没有权限访问。
- **404:** 未找到部署。
- **422:** 无效的请求参数。
- **429:** 请求次数超过限制。

### 请求示例

```bash
curl -u key:secret -X PUT -H 'Content-Type: application/json' -d '{"tlsType": "one-way", "cert": "-----BEGIN CERTIFICATE-----\nMII...tH6j7afSg==\n-----END CERTIFICATE-----},"key":"-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA5bdg8Rt5A7...AjQzYRdov4inpzw==\n-----END RSA PRIVATE KEY-----"' {api}/deployments/ge6a1a75/tls
```

### 响应示例

```JSON
{
  "expire": "2034-05-22 02:43:21",
  "status": "pending",
  "tlsType": "one-way"
}
```



## 删除指定部署的 TLS 证书

### URI

DELETE /deployments/{deployment_id}/tls

::: tip
该方法 60 分钟内只能请求 6 次。{deployment_id} 为部署 ID， 非部署名称。
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
curl -u key:secret -X DELETE {api}/deployments/ge6a1a75/tls
```

### 响应示例

```HTTP
// HTTP status response code
204 
```

