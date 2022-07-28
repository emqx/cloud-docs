# JWT 认证

[JWT](https://jwt.io/) 认证是基于 Token 的鉴权机制，不依赖服务端保留客户端的认证信息或者会话信息，在持有密钥的情况下可以批量签发认证信息，是最简便的认证方式。

## 认证链

若同时启用默认认证模块，EMQX Cloud Cloud 将按照[默认认证](https://docs.emqx.com/zh/cloud/latest/deployments/auth.html#%E8%AE%A4%E8%AF%81) -> JWT 认证的顺序进行链式认证：

* 一旦认证成功，终止认证链并允许客户端接入
* 一旦认证失败，终止认证链并禁止客户端接入

![auth_chain](./_assets/../_assets/jwt_auth_chain.png)

## JWT 认证原理

客户端使用用户名或密码字段携带 JWT（取决于模块配置），发起连接时 EMQX Cloud 使用配置中的密钥、证书进行解密，如果能成功解密则认证成功，否则认证失败。

默认配置下启用 JWT 认证后，你可以通过任意用户名+以下密码进行连接：

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkVNUVggQ2xvdWQiLCJpYXQiOjE1MTYyMzkwMjJ9.JHtutBSV4FfPfYYZyj6yn4K76clOQ-zkS6-_7VjnfK8
```

> 上述 JWT Token 仅做测试使用，可根据自己的业务需求用相关工具生成。此处提供一个在线生成工具：<https://www.jsonwebtoken.io/>。

## 认证配置

1. 在 EMQX Cloud Cloud 部署左侧菜单栏点击 `认证鉴权` - `外部认证授权`，选择 JWT 认证。

    ![jwt_auth](./_assets/../_assets/jwt_auth.png)

2. 点击`配置认证`，进入 JWT 认证页面，填写信息，新建认证。

    EMQX Cloud Cloud 会按照 Secret、Pubkey 和 JWKs Addr 的固定顺序验证 JWT，没有配置的字段将被忽略。

   * 认证来源：客户端连接时存放 JWT 的字段，目前支持选择 username 或 password。
   * 密钥：签发 JWT 时使用的密钥。这里将用于验证 EMQX Cloud 收到的 JWT 是否合法，适用于 HMAC 算法签发的 JWT。
   * 公钥文件：将用于验证 EMQX Cloud 收到的 JWT 是否合法，适用于 RSA 或 ECDSA 算法签发的 JWT。
   * JWKS 服务器地址：EMQX Cloud 将从 JWKS 服务器定期查询最新的公钥列表，并用于验证收到的 JWT 是否合法，适用于 RSA 或 ECDSA 算法签发的 JWT。
   * 验证声明字段：是否需要验证 JWT Payload 中的声明与“声明字段列表”一致。
   * 声明字段列表：用于验证 JWT Payload 中的声明是否合法。最常见的用法是，添加一个键为 username 值为 %u 的键值对，%u 作为占位符将在运行时被替换为客户端实际连接时使用的 Username，替换后的值将被用于与 JWT Payload 的同键声明的值比较，以起到 JWT 与 Username 一一对应的效果。声明字段列表中目前支持以下两种占位符：
      * %u：将在运行时被替换为客户端连接时使用的 Username。
      * %c：将在运行时被替换为客户端连接时使用的 Client ID。

    ::: tip
      * 如果当前部署为基础版，服务器地址请填写公网地址
      * 如果当前部署为专业版，需创建 [VPC 对等连接](https://docs.emqx.com/zh/cloud/latest/deployments/vpc_peering.html)，服务器地址请填写内网地址
      * 若提示 Init resource failure! 需检查服务器地址是否无误、安全组是否开启
    :::

    ![jwt_auth](./_assets/../_assets/jwt_auth_info.png)
