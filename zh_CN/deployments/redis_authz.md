# Redis 授权

扩展授权支持通过集成 Redis 进行授权验证。

## 数据结构与查询指令
Redis 授权器支持使用 [Redis hashes](https://redis.io/docs/manual/data-types/#hashes) 存储授权数据，用户需要提供一个查询指令模板，且确保查询结果包含以下字段：

- topic: 用于指定当前规则适用的主题，可以使用主题过滤器和主题占位符。
- action: 用于指定当前规则适用于哪些操作，可选值有 `publish`、`subscribe` 和 `all`。
- qos:（可选）用于指定当前规则适用的消息 QoS，可选值有 `0`、`1`、`2`，也可以使用 Number 数组同时指定多个 QoS。默认为所有 QoS。
retain: （可选）用于指定当前规则是否支持发布保留消息，可选值有 `true`、`false`，默认允许保留消息。

添加用户名为 `emqx_u`，允许订阅 `t/1` 主题的权限数据：
```
HSET mqtt_acl:emqx_u t/1 subscribe
```

由于 Redis 结构限制，使用 `qos` 与 `retain` 字段时，需要将除 `topic` 外的信息放到 JSON 字符串中，例如：

- 添加用户名为 `emqx_u`，允许以 QoS1 和 QoS2 订阅 `t/2` 主题的权限数据：
```
HSET mqtt_acl:emqx_u t/2 '{ "action": "subscribe", "qos": [1, 2] }'
```

- 添加用户名为 `emqx_u`，拒绝向 `t/3` 主题发布保留消息的权限数据：
```
HSET mqtt_acl:emqx_u t/3 '{ "action": "publish", "retain": false }'
```
对应的配置项为：
```
cmd = "HGETALL mqtt_acl:${username}"
```


## 配置 Redis 授权

在部署中点击 **访问控制** -> **授权** -> **扩展授权**，选择 **Redis 授权**，点击**配置授权**。

- **部署模式**：选择 Redis 数据库的部署模式，可选值：`单节点`、`Sentinel` 或 `Cluster`。
- **服务**（列表）：填入 Redis 服务器地址 (host:port) ；当部署模式选为 `Sentinel` 或 `Cluster`，您需在此提供所有相关 Redis 服务器的地址，不同地址之间以 , 分隔，格式为 `host1:port1,host2:port2,...`
- **Sentinel 名字**：指定 Redis Sentinel 配置需要的主服务器名称，仅需在部署模式设置为 `Sentinel` 时设置。
- **数据库**：整数，用于指定 Redis 数据库的 Index。
- **密码**（可选）：填入授权密码。
- **启用 TLS**：配置是否启用 TLS。
- **连接池大小**（可选）：填入一个整数用于指定从 EMQX 节点到 Redis 数据库的并发连接数；默认值：`8`。
- **命令**：Redis 查询命令。

::: tip
* 如果当前部署为专有版，需创建 [VPC 对等连接](../deployments/vpc_peering.md)，服务器地址填写内网地址。
* 如果当前部署为 BYOC 版，需在您的公有云控制台中创建 VPC 对等连接，具体请参考 [创建 BYOC 部署 - VPC 对等连接配置](../create/byoc.md#vpc-对等连接配置) 章节。服务器地址填写内网地址。
* 若提示 Init resource failure! 请检查服务器地址是否无误、安全组是否开启。
:::
