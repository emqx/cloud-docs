# 认证和访问控制

认证是大多数应用的重要组成部分，MQTT 协议支持用户名密码认证，启用身份认证能有效阻止非法客户端的连接。EMQX Cloud 中的认证指的是当一个客户端连接到 EMQX  Cloud 的时候，通过服务器端的配置来控制客户端连接服务器的权限。

访问控制是指对 MQTT 客户端的发布和订阅操作进行权限控制。EMQX Cloud Serverless 和 专有版在认证和访问控制的设定上略有差别，并且专有版提供外部认证和访问控制的功能。

## [认证 (Serverless)](./auth_serverless.md)

设置 Serverless 认证

## [访问控制 (Serverless)](./acl_serverless.md)

设置 Serverless 访问控制

## [认证 (专有版)](./auth_dedicated.md)

设置 Serverless 认证

## [访问控制 (专有版)](./acl_dedicated.md)

设置 Serverless 访问控制

## [外部认证和访问控制](./custom_auth.md)
外部认证与访问控制帮助用户使用自己服务进行认证鉴权，目前支持使用 MySQL， PostgreSQL 作为数据源，也支持连接到 HTTP 服务做认证鉴权。