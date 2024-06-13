# MySQL 认证

扩展认证支持通过集成 MySQL 进行密码认证。

## 表结构与查询语句

MySQL 认证器可以支持任何表结构，甚至是多个表联合查询、或从视图中查询。用户需要提供一个查询 SQL 模板，且确保查询结果包含以下字段：

- `password_hash`: 必需，数据库中的明文或散列密码字段。
- `salt`: 可选，为空或不存在时视为空盐（salt = ""）。
- `is_superuser`: 可选，标记当前客户端是否为超级用户。默认为 `false`，**设置为 `true` 时，使用此用户名的客户端将不受到授权规格约束。不建议设置超级用户。**

示例表结构：
```SQL
CREATE TABLE `mqtt_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password_hash` varchar(100) DEFAULT NULL,
  `salt` varchar(35) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mqtt_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

::: tip
上面的示例创建了一个有助于查询的隐式 `UNIQUE` 索引字段（ `username` ）。当系统中有大量用户时，请确保查询使用的表已优化并使用有效的索引，以提升大量连接时的数据查找速度并降低 EMQX 负载。
:::

在此表中使用 `username` 作为查找条件。
例如，我们希望添加一名用户名为 `emqx_u`、密码为 `public`、盐值为 `slat_foo123`、散列方式为 `sha256` 且超级用户标志为 `false` 的用户：
```SQL
mysql> INSERT INTO mqtt_user(username, password_hash, salt, is_superuser) VALUES ('emqx_u', SHA2(concat('public', 'slat_foo123'), 256), 'slat_foo123', 0);
Query OK, 1 row affected (0,01 sec)
```
对应的查询语句和密码散列方法配置参数为：

- 密码加密方式：`sha256`
- 加盐方式：`suffix`
- SQL:
```SQL
SELECT password_hash, salt, is_superuser FROM mqtt_user WHERE username = ${username} LIMIT 1
```

## MySQL 配置
在部署中点击 **访问控制** -> **客户端认证** -> **扩展认证**，点击 **MySQL 配置认证**，新建认证。

您可按照如下说明完成相关配置：

- **服务**：填入 MySQL 服务器地址 (host:port) 。

  ::: tip

  * 如果当前部署为专有版，需创建 [VPC 对等连接](./vpc_peering.md)，服务器地址填写内网地址。
  * 如果当前部署为 BYOC 版，需在您的公有云控制台中创建 VPC 对等连接，具体请参考 [创建 VPC 对等连接](./bypc_vpc_peering.md)。服务器地址填写内网地址。
  * 若提示 Init resource failure! 请检查服务器地址是否无误、安全组是否开启。
    :::

- **数据库**：填入 MySQL 的数据库名称。

- **用户名**（可选）：填入用户名称。

- **密码**（可选）：填入用户密码。

- **启用 TLS**：配置是否启用 TLS。

- **连接池大小**（可选）：填入一个整数用于指定从 EMQX 节点到 MySQL 数据库的并发连接数；默认值：`8`。

- **查询超时**：填入连接超时等待时长，可选单位：小时、分钟、秒、毫秒。

- **密码加密方式**：选择存储密码时使用的散列算法，如 `plain`、`md5`、`sha`、`bcrypt`、`pbkdf2` 等。
  - 选择 `plain`、`md5`、`sha`、`sha256` 或 `sha512` 算法，还需配置：
    - **加盐方式**：用于指定盐和密码的组合方式，除需将访问凭据从外部存储迁移到 EMQX 内置数据库中外，一般不需要更改此选项；可选值：suffix（在密码尾部加盐）、prefix（在密码头部加盐）、disable（不启用）。注意：如选择 `plain`，加盐方式应设为 `disable`。
  - 选择 `pkbdf2` 算法，还需配置：
    - **伪随机函数**：指定生成密钥使用的散列函数，如 `sha256` 等。
    - **迭代次数**：指定散列次数，默认值：`4096`。
    - **密钥长度**（可选）：指定希望得到的密钥长度。如不指定，密钥长度将由伪随机函数确定。
  
- **SQL**：根据表结构填入查询 SQL，具体要求见 [SQL 表结构与查询语句](https://docs.emqx.com/zh/enterprise/latest/access-control/authn/mysql.html#sql-%E8%A1%A8%E7%BB%93%E6%9E%84%E4%B8%8E%E6%9F%A5%E8%AF%A2%E8%AF%AD%E5%8F%A5)。
