# PostgreSQL 授权

扩展授权支持通过集成 PostgreSQL 进行授权验证。

## 表结构与查询语句

PostgreSQL 授权器可以支持任何表结构，甚至是多个表联合查询、或从视图中查询。用户需要提供一个查询 SQL 模板，且确保查询结果包含以下字段：

- permission: 用于指定操作权限，可选值有 `allow` 和 `deny`。
- action: 用于指定当前规则适用于哪些操作，可选值有 `publish`、`subscribe` 和 `all`。
- topic: 用于指定当前规则适用的主题，可以使用主题过滤器和主题占位符。
- qos: (可选)用于指定规则适用的消息 QoS，可选值为 `0`、`1`、`2`，也可以用 , 分隔的字符串指定多个 QoS，例如 `0,1`。默认为全部 QoS。
- retain: （可选）用于指定当前规则是否支持发布保留消息，可选值有 `0`、`1`，默认允许保留消息。

示例表结构：
```SQL
CREATE TABLE mqtt_acl(
  id serial PRIMARY KEY,
  username text NOT NULL,
  permission text NOT NULL,
  action text NOT NULL,
  topic text NOT NULL,
  qos tinyint,
  retain tinyint
);
CREATE INDEX mqtt_acl_username_idx ON mqtt_acl(username);
```

::: tip
上面的示例创建了一个索引，当系统中有大量权限数据时，请确保查询使用的表已优化并使用有效的索引，以提升大量连接时的数据查找速度并降低 EMQX 负载。
:::

添加用户名为 `emqx_u`、禁止发布到 `t/1` 主题的规则示例：
```SQL
postgres=# INSERT INTO mqtt_acl(username, permission, action, topic) VALUES ('emqx_u', 'deny', 'publish', 't/1');
INSERT 0 1
```

对应的配置参数为：
```
query = "SELECT permission, action, topic, qos, retain FROM mqtt_acl WHERE username = ${username}"
```

## 配置 PostgreSQL 授权
在部署中点击 **访问控制** -> **授权** -> **扩展授权**，点击 **PostgreSQL 配置授权**，新建授权。

您可按照如下说明完成相关配置：

- 服务：填入 PostgreSQL 服务器地址 (host:port) 。
- 数据库：填入 PostgreSQL 的数据库名称。
- 用户名（可选）：填入用户名称。
- 密码（可选）：填入用户密码。
- TLS 配置：配置是否启用 TLS。
- 连接池大小（可选）：填入一个整数用于指定从 EMQX 节点到 PostgreSQL 数据库的并发连接数；默认值：8。
- SQL：根据表结构填入查询 SQL，具体要求见 [SQL 表结构与查询语句](https://docs.emqx.com/zh/enterprise/latest/access-control/authn/mysql.html#sql-%E8%A1%A8%E7%BB%93%E6%9E%84%E4%B8%8E%E6%9F%A5%E8%AF%A2%E8%AF%AD%E5%8F%A5)。

::: tip
* 如果当前部署为专有版，需创建 [VPC 对等连接](../deployments/vpc_peering.md)，服务器地址填写内网地址。
* 如果当前部署为 BYOC 版，需在您的公有云控制台中创建 VPC 对等连接，具体请参考 [创建 BYOC 部署 - VPC 对等连接配置](../create/byoc.md#vpc-对等连接配置) 章节。服务器地址填写内网地址。
* 若提示 Init resource failure! 请检查服务器地址是否无误、安全组是否开启。
  :::
