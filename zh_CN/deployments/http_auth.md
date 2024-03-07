# HTTP 认证

EMQX 支持通过外部 HTTP 服务进行密码认证。客户端连接时，EMQX 将使用客户端信息构造 HTTP 请求，并根据请求返回的内容判断认证结果，从而实现复杂的认证鉴权逻辑。



## HTTP 认证原理

认证过程类似一个 HTTP API 调用，EMQX 作为请求客户端需要按照 "API" 要求的格式构造并向 HTTP 服务发起请求，而 HTTP 服务需要按照 "客户端" 的要求返回结果：

- 响应编码格式 `content-type` 必须是 `application/json`。
- 认证结果通过 body 中的 `result` 标示，可选 `allow`、`deny`、`ignore`。
- HTTP 响应状态码 `Status Code` 应当为 `200` 或 `204`，返回 `4xx/5xx` 状态码时将忽略 body 并判定结果为 `ignore`，继续执行认证链。

响应示例：
```json
HTTP/1.1 200 OK
Headers: Content-Type: application/json
...
Body:
{
    "result": "allow", // 可选 "allow" | "deny" | "ignore"
    "is_superuser": true // 可选 true | false，该项为空时默认为 false
}
```

## 认证配置

在部署中点击 **访问控制** - **扩展认证**，点击 **HTTP 配置认证**，新建认证。


进行身份认证时，EMQX Cloud 将使用当前客户端信息填充并发起用户配置的认证查询请求，查询出该客户端在 HTTP 服务器端的认证数据。

您可根据如下说明完成相关配置：


- 请求方式：选择 HTTP 请求方式，可选值： `get` 、 `post`,
::: tip
推荐使用 `POST` 方法。 使用 `GET` 方法时，一些敏感信息（如纯文本密码）可能通过 HTTP 服务器日志记录暴露。此外，对于不受信任的环境，请使用 HTTPS。
:::
- URL：输入 HTTP 服务的 URL 地址。
- Headers（可选）：HTTP 请求头配置。可以添加多个请求头。
连接配置：在此部分进行并发连接、连接超时等待时间、最大 HTTP 请求数以及请求超时时间。
- TLS 配置：配置是否启用 TLS。
- Pool size（可选）：整数，指定从 EMQX 节点到外部 HTTP Server 的并发连接数；默认值：8。
- 连接超时（可选）：填入连接超时等待时长，可选单位：小时、分钟、秒、毫秒。
- HTTP 管道（可选）：正整数，指定无需等待响应可发出的最大 HTTP 请求数；默认值：100。
- 请求超时（可选）：填入连接超时等待时长，可选单位：小时、分钟、秒、毫秒。
- 请求体：请求模板，对于 `POST` 请求，它以 JSON 形式在请求体中发送。对于 `GET` 请求，它被编码为 URL 中的查询参数（Query String）。映射键和值可以使用占位符。


::: tip
* 如果当前部署为专有版，需创建 [VPC 对等连接](https://docs.emqx.com/zh/cloud/latest/deployments/vpc_peering.html)，服务器地址填写内网地址。
* 如果当前部署为 BYOC 版，需在您的公有云控制台中创建 VPC 对等连接，具体请参考 [创建 BYOC 部署 - VPC 对等连接配置](../create/byoc.md#vpc-对等连接配置) 章节。服务器地址填写内网地址。
* 若提示 Init resource failure! 请检查服务器地址是否无误、安全组是否开启。
:::


### 请求参数占位符

你可以在认证请求中使用以下占位符，请求时 EMQX 将自动填充为客户端信息：

 - %u：用户名
 - %c：Client ID
 - %a：客户端 IP 地址
 - %r：客户端接入协议
 - %P：明文密码
 - %p：客户端端口

