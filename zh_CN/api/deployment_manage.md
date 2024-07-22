# 部署管理 API

本页介绍了如何通过 API 查询部署状态、启动部署和停止部署。

## 查看指定部署的状态

### URI

GET /deployments/{deployment_id}

::: tip
该方法 60 分钟内只能请求 60 次。{deployment_id} 为部署 ID， 非部署名称。
:::

### 请求消息

无

### 响应消息

- **200:**

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| connections     | Number | 连接数规格。      |
| createAt | String           | 部署创建时间。        |
| deploymentID | String    | 部署 ID。        |
| deploymentName | String    | 部署名称。        |
| deploymentType | String    | 部署类型，“dedicated” 为专有版。       |
| platform | String    | 云服务商。        |
| region | String    | 云主机所在地区。        |
| status | String    | 部署运行状态： "running" 为运行中， “starting” 为创建过程中， “stopped” 为停止状态。 |

- **401:** API Key 认证失败。
- **403:** API Key 没有权限访问。
- **404:** 未找到部署。
- **429:** 请求次数超过限制。

### 请求示例

```bash
curl -u key:secret -X GET {api}/deployments/w41b11c0
```


### 响应示例

```JSON
{
    "connections": 1000,
    "createAt": "2024-07-22 05:32",
    "deploymentID": "w41b11c0",
    "deploymentName": "deployment-w41b11c0",
    "deploymentType": "dedicated",
    "platform": "阿里云",
    "region": "杭州",
    "status": "running"
}
```


## 停止部署

### URI

POST /deployments/{deployment_id}/stop

::: tip
该方法 60 分钟内只能请求 1 次。{deployment_id} 为部署 ID， 非部署名称。
:::

### 请求消息
无

### 响应消息

- **201:**

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| deploymentID   | String | 部署 ID。      |
| deploymentName | String | 部署名称。        |
| operation | String   | 操作类型，“stopping” 为停止操作。       |

- **401:** API Key 认证失败。
- **403:** API Key 没有权限访问。
- **404:** 未找到部署。
- **422:** 无效的请求参数。
- **429:** 请求次数超过限制。

### 请求示例

```bash
curl -u key:secret -X POST {api}/deployments/w41b11c0/stop
```

### 响应示例

```JSON
{
    "deploymentID": "w41b11c0",
    "deploymentName": "deployment-w41b11c0",
    "operation": "stopping"
}
```


## 启动部署

### URI

POST /deployments/{deployment_id}/start

::: tip
该方法 60 分钟内只能请求 1 次。{deployment_id} 为部署 ID， 非部署名称。
:::

### 请求消息

无

### 响应消息

- **201:**

| 名称            | 类型             | 描述               |
| :-------------- | :--------------- | :----------------- |
| deploymentID   | String | 部署 ID。      |
| deploymentName | String | 部署名称。        |
| operation | String   | 操作类型，“starting” 为开启操作。       |

- **401:** API Key 认证失败。
- **403:** API Key 没有权限访问。
- **404:** 未找到部署。
- **422:** 无效的请求参数。
- **429:** 请求次数超过限制。

### 请求示例

```bash
curl -u key:secret -X POST {api}/deployments/w41b11c0/start
```

### 响应示例

```JSON
{
    "deploymentID": "w41b11c0",
    "deploymentName": "deployment-w41b11c0",
    "operation": "starting"
}
```
