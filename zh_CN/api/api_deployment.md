# 部署 API

本节介绍 EMQX 部署 API 的功能以及如何创建和管理用于安全访问 API 的部署 API key。

## API 功能

部署 API 管理部署层面的功能，例如用于客户端监控、消息发布，认证授权等。

| API                                                          | 适用部署        | 描述                                                         |
| ------------------------------------------------------------ | --------------- | ------------------------------------------------------------ |
| [Serverless 部署 API](./serverless.md)                       | Serverless 部署 | 管理 Serverless 部署中客户端、订阅和发布的相关操作。         |
| [专有版 部署 API](https://docs.emqx.com/zh/cloud/latest/api/dedicated) | v5 专有版部署   | 管理专有版 (v5) 部署中的各项操作。如果需要访问和管理专有版(v4) 部署 API，请查看 [v4 API](https://docs.emqx.com/zh/cloud/v4/api/dedicated.html)。 |


## 创建和管理部署 API Key

部署 API Key 授予对指定部署层面 API 的访问管理。如需创建和管理部署 API Key，您需要先登录 EMQX Platform [创建部署](../create/overview.md)。部署创建完成之后，前往部署详情页面，可在**部署 API Key** 中创建和管理。

![deployment_key](/Users/emqx/Documents/Cloud/cloud-docs/zh_CN/api/_assets/deployment_key.png)
