# API 功能和管理

EMQX Platform API 分为平台层面和部署层面 2 种 API，皆遵循 RESTful 定义。平台 API 用于对 EMQX Platform 的控制和管理，而部署 API 用于对部署层面功能的管理。本章节介绍了如何访问和使用平台 API 和 部署 API。

## 调用 API

您可以在[平台 API](./api_platform.md) 和[部署 API](./api_deployment.md) 页面中获取到 API 访问地址。请通过 HTTPS 访问 API，确保所有通过网络发送的数据都使用 TLS 加密。

## 认证鉴权
HTTP API 使用 [Basic 认证](https://zh.m.wikipedia.org/zh-hans/HTTP%E5%9F%BA%E6%9C%AC%E8%AE%A4%E8%AF%81) 方式，id 和 password 须分别填写 Key 和 Secret（平台 API），或 App ID 和 App Secret（部署 API）。 因此，您需要[创建平台 API key](./api_platform.md#创建和管理平台-api-key) 和[部署 API key](./api_deployment.md#创建和管理部署-api-key)。所有的 Secret 只在创建时显示一次，请妥善保管到安全的地方。

## HTTP 状态码 (status codes)

以下 HTTP 状态码同时适用于平台和部署 2 种 API。

接口在调用成功时返回 200，响应内容则以 JSON 格式返回。

可能的状态码如下：

| 状态码 | 描述                                                     |
| :----- | :------------------------------------------------------- |
| 200    | 成功，返回的 JSON 数据将提供更多信息                     |
| 400    | 请求无效，例如请求体或参数错误                     |
| 401    | 未通过服务端认证，使用无效的身份验证凭据可能会发生 |
| 404    | 找不到请求的路径或者请求的对象不存在                     |
| 422    | 字段错误                   |
| 500    | 服务端处理请求时发生内部错误                             |

