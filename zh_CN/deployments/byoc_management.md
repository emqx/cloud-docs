# 管理 BYOC 部署

为满足企业用户的数据合规性和保障数据安全，BYOC 部署仅支持在 Platform 控制台上管理基础的运维和安全功能，包括：

- [许可证](./byoc_license.md)
- [API Key](../api/api_deployment.md)
- [TLS/SSL 配置](./byoc_ssl.md)
- [指标](./metrics.md)
- [告警](./alerts.md)

其他功能需要在 EMQX 管理控制台上管理，常用功能包括：

- [客户端认证](https://docs.emqx.com/zh/enterprise/latest/access-control/authn/authn.html)
- [客户端授权](https://docs.emqx.com/zh/enterprise/latest/access-control/authz/authz.html)
- [黑名单](https://docs.emqx.com/zh/enterprise/latest/access-control/blacklist.html)
- [客户端列表](https://docs.emqx.com/zh/enterprise/latest/dashboard/connections/connections.html)
- [主题与订阅列表](https://docs.emqx.com/zh/enterprise/latest/dashboard/subscriptions/overview.html)
- [保留消息](https://docs.emqx.com/zh/enterprise/latest/dashboard/retained.html)
- [数据集成](https://docs.emqx.com/zh/enterprise/latest/data-integration/data-bridges.html)

## EMQX 管理控制台打开方式

在 BYOC 部署概览页面，点击**连接信息**卡片下方的 **EMQX 管理控制台**按钮进入控制台，使用[完成部署](../create/byoc.md#完成部署)时提供的用户名和密码进行登录认证。

如果您忘记了用户名和密码，请通过[工单](../feature/tickets.md)联系我们重新生成。
