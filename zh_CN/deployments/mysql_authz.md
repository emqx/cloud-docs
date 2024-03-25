# MySQL 授权

扩展授权支持通过集成 MySQL 进行授权验证。

## 表结构与查询语句

MySQL 授权器可以支持任何表结构，甚至是多个表联合查询、或从视图中查询。用户需要提供一个查询 SQL 模板，且确保查询结果包含以下字段：

- permission: 用于指定操作权限，可选值有 `allow` 和 `deny`。
- action: 用于指定当前规则适用于哪些操作，可选值有 `publish`、`subscribe` 和 `all`。
- topic: 用于指定当前规则适用的主题，可以使用主题过滤器和主题占位符。
- qos: (可选)用于指定规则适用的消息 QoS，可选值为 `0`、`1`、`2`，也可以用 , 分隔的字符串指定多个 QoS，例如 `0,1`。默认为全部 QoS。
- retain: （可选）用于指定当前规则是否支持发布保留消息，可选值有 `0`、`1`，默认允许保留消息。

示例表结构：
```SQL
CREATE TABLE `mqtt_acl` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `permission` varchar(5) NOT NULL,
  `action` varchar(9) NOT NULL,
  `topic` varchar(100) NOT NULL,
  `qos` tinyint(1),
  `retain` tinyint(1),
  INDEX username_idx(username),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

::: tip
当系统中有大量权限数据时，请确保查询使用的表已优化并使用有效的索引，以提升大量连接时的数据查找速度、并降低 EMQX 负载。
:::

### 查询语句
在 EMQX 中配置以下查询参数，使用 mqtt_acl 表并以 username 作为查找条件，查询出权限数据。
```SQL
SELECT 
  permission, action, topic, qos, retain 
FROM mqtt_acl 
  WHERE username = ${username}
```


## 配置 MySQL 授权
在部署中点击 **访问控制** -> **授权** -> **扩展授权**，点击 **MySQL 配置授权**，新建授权。

您可按照如下说明完成相关配置：

- 服务：填入 MySQL 服务器地址 (host:port) 。
- 数据库：填入 MySQL 的数据库名称。
- 用户名（可选）：填入用户名称。
- 密码（可选）：填入用户密码。
- TLS 配置：配置是否启用 TLS。
- SQL：根据表结构填入查询 SQL，具体要求见 [SQL 表结构与查询语句](https://docs.emqx.com/zh/enterprise/latest/access-control/authn/mysql.html#sql-%E8%A1%A8%E7%BB%93%E6%9E%84%E4%B8%8E%E6%9F%A5%E8%AF%A2%E8%AF%AD%E5%8F%A5)。

::: tip
* 如果当前部署为专有版，需创建 [VPC 对等连接](https://docs.emqx.com/zh/cloud/latest/deployments/vpc_peering.html)，服务器地址填写内网地址。
* 如果当前部署为 BYOC 版，需在您的公有云控制台中创建 VPC 对等连接，具体请参考 [创建 BYOC 部署 - VPC 对等连接配置](../create/byoc.md#vpc-对等连接配置) 章节。服务器地址填写内网地址。
* 若提示 Init resource failure! 请检查服务器地址是否无误、安全组是否开启。
  :::

