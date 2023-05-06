# 认证和访问控制

认证是大多数应用的重要组成部分，MQTT 协议支持用户名密码认证，启用身份认证能有效阻止非法客户端的连接。EMQX Cloud 中的认证指的是当一个客户端连接到 EMQX  Cloud 的时候，通过服务器端的配置来控制客户端连接服务器的权限。

访问控制是指对 MQTT 客户端的发布和订阅操作进行权限控制。EMQX Cloud 的 Serverless、专有版和 BYOC 在认证和访问控制的设定上略有差别，同时专有版和 BYOC 提供外部认证和访问控制功能。

## [认证 (Serverless)](./auth_serverless.md)

在 Serverless 中设置客户端身份认证

## [访问控制 (Serverless)](./acl_serverless.md)

在 Serverless 中设置访问控制

## [认证 (专有版 / BYOC)](./auth_dedicated.md)

在专有版和 BYOC 中设置客户端身份认证

## [访问控制 (专有版 / BYOC)](./acl_dedicated.md)

在专有版和 BYOC 中设置访问控制

## [外部认证和访问控制 (专有版 / BYOC)](./custom_auth.md)
外部认证与访问控制帮助用户使用自己服务进行认证鉴权，目前支持使用 MySQL， PostgreSQL 作为数据源，也支持连接到 HTTP 服务做认证鉴权。