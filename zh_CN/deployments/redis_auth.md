# Redis 认证

作为密码认证方式的一种，EMQX Platform 支持通过集成 Redis 进行密码认证。EMQX 支持三种 Redis 部署模式：单节点、Redis Sentinel、Redis Cluster，本节将介绍如何进行相关配置。

## 数据结构与查询指令
Redis 认证器支持使用 [Redis hashes](https://redis.io/docs/manual/data-types/#hashes) 存储认证数据，用户需要提供一个查询指令模板，且确保查询结果包含以下字段：

- `password_hash`: 必需，数据库中的明文或散列密码字段
- `salt`: 可选，为空或不存在时视为空盐（salt = ""）
- `is_superuser`: 可选，标记当前客户端是否为超级用户。默认为 `false`，**设置为 `true` 时，使用此用户名的客户端将不受到授权规格约束。不建议设置超级用户。**

例如，我们希望添加一位名用户名为 `emqx_u`、密码为 `public`、盐值为 `slat_foo123`、散列方式为 `sha256` 且超级用户标志为 `false` 的用户：

```bash
>redis-cli
127.0.0.1:6379> HSET mqtt_user:emqx_u is_superuser 1 salt slat_foo123 password_hash 44edc2d57cde8d79c98145003e105b90a14f1460b79186ea9cfe83942fc5abb5
(integer) 0
```

对应的配置参数为：

- 密码加密方式：`sha256`
- 加盐方式：`suffix`
- 命令：`HMGET mqtt_user:${username} password_hash salt is_superuser`

### 加密规则

外部认证均可以启用哈希方法，数据源中仅保存密码密文，保证数据安全。启用哈希方法时，用户可以为每个客户端都指定一个 salt（盐）并配置加盐规则，数据库中存储的密码是按照加盐规则与哈希方法处理后的密文。

> 可参考：[加盐规则与哈希方法](https://www.emqx.io/docs/zh/v4.3/advanced/auth.html#%E5%AF%86%E7%A0%81%E5%8A%A0%E7%9B%90%E8%A7%84%E5%88%99%E4%B8%8E%E5%93%88%E5%B8%8C%E6%96%B9%E6%B3%95)。

```bash
## 不加盐，明文
plain

## 不加盐，仅做哈希处理
sha256

 ## salt 前缀：使用 sha256 加密 salt + 密码 拼接的字符串
salt,sha256

## salt 后缀：使用 sha256 加密 密码 + salt 拼接的字符串
sha256,salt

## pbkdf2 with macfun iterations dklen
## macfun: md4, md5, ripemd160, sha, sha224, sha256, sha384, sha512
pbkdf2, sha256, 1000, 20
```


## Redis 配置

在部署中点击 **访问控制** -> **扩展认证**，选择 **Redis 认证**，点击**配置认证**。

- **部署模式**：选择 Redis 数据库的部署模式，可选值：`单节点`、`Sentinel` 或 `Cluster`。

- **服务**（列表）：填入 Redis 服务器地址 (host:port) ；当部署模式选为 `Sentinel` 或 `Cluster`，您需在此提供所有相关 Redis 服务器的地址，不同地址之间以 , 分隔，格式为 `host1:port1,host2:port2,...`。

    ::: tip

    * 如果当前部署为专有版，需创建 [VPC 对等连接](./vpc_peering.md)，服务器地址填写内网地址。
    * 如果当前部署为 BYOC 版，需在您的公有云控制台中创建 VPC 对等连接，具体请参考 [创建 VPC 对等连接](./bypc_vpc_peering.md)。服务器地址填写内网地址。
    * 若提示 Init resource failure! 请检查服务器地址是否无误、安全组是否开启。
      :::

- **Sentinel 名字**：指定 Redis Sentinel 配置需要的主服务器名称，仅需在部署模式设置为 `Sentinel` 时设置。

- **数据库**：整数，用于指定 Redis 数据库的 Index。

- **密码**（可选）：填入认证密码。

- **启用 TLS**：配置是否启用 TLS。

- **连接池大小**（可选）：填入一个整数用于指定从 EMQX 节点到 Redis 数据库的并发连接数；默认值：`8`。

- **密码加密方式**：选择存储密码时使用的散列算法，如 `plain`、`md5`、`sha`、`bcrypt`、`pbkdf2` 等。
    - 选择 `plain`、`md5`、`sha`、`sha256` 或 `sha512` 算法，还需配置：
        - 加盐方式：用于指定盐和密码的组合方式，除需将访问凭据从外部存储迁移到 EMQX 内置数据库中外，一般不需要更改此选项；可选值：suffix（在密码尾部加盐）、prefix（在密码头部加盐）、disable（不启用）。注意：如选择 `plain`，加盐方式应设为 `disable`。
    - 选择 `pkbdf2` 算法，还需配置：
        - **伪随机函数**：指定生成密钥使用的散列函数，如 `sha256` 等。
        - **迭代次数**：指定散列次数，默认值：`4096`。
        - **密钥长度**（可选）：指定希望得到的密钥长度。如不指定，密钥长度将由伪随机函数确定。
    
- **命令**：Redis 查询命令。支持以下占位符：
    - `${clientid}`: 将在运行时被替换为客户端 ID。客户端 ID 一般由客户端在 `CONNECT` 报文中显式指定。
    - `${username}`: 将在运行时被替换为用户名。用户名来自 `CONNECT` 报文中的 `Username` 字段。
    - `${password}`: 将在运行时被替换为密码。密码来自 `CONNECT` 报文中的 `Password` 字段。
