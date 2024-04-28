# JWT 认证

[JWT](https://jwt.io/) 认证是基于 Token 的鉴权机制，不依赖服务端保留客户端的认证信息或者会话信息，在持有密钥的情况下可以批量签发认证信息，是最简便的认证方式。


## JWT 认证原理

客户端使用用户名或密码字段携带 JWT（取决于模块配置），发起连接时 EMQX Platform 使用配置中的密钥、证书进行解密，如果能成功解密则认证成功，否则认证失败。

默认配置下启用 JWT 认证后，你可以通过任意用户名+以下密码进行连接，即通过默认的密钥字段 `secret` 做验证：

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkVNUVggQ2xvdWQiLCJpYXQiOjE1MTYyMzkwMjJ9.wGxZTwkCZtYPzkS854aQ9WCnP8YGIQ_erFh5RIznhYk
```

> 上述 JWT Token 仅做测试使用，可根据自己的业务需求用相关工具生成。此处提供一个在线生成工具：<https://www.jsonwebtoken.io/> ，也可以结合 JSON Web 密钥 (JWK) 生成器：<https://mkjwk.org> 进行测试。

## 认证配置

在部署中点击 **访问控制** -> **客户端认证** -> **扩展认证**，选择 **JWT 认证**，点击**配置认证**。


您可根据如下说明完成相关配置：

如**验证方式**选择 **JWT** 时：

- **JWT 来自于**：指定客户端连接请求中 JWT 的位置；可选值： `password`、 `username`（分别对应于 MQTT 客户端 `CONNECT` 报文中的 `Password` 和 `Username` 字段）

- **加密方式**：指定 JWT 的加密方式，可选值： `hmac-based`、`public-key`；
    - 如选择 `hmac-based`，即 JWT 使用对称密钥生成签名和校验签名（支持 HS256、HS384 和 HS512 算法），还应配置：
      - **Secret**：用于校验签名的密钥，与生成签名时使用的密钥相同。
      - **Secret 使用 Base64 编码**：配置 EMQX 在使用 `Secret` 校验签名时是否需要先对其进行 Base64 解密；可选值：True、False，默认值：False。
    
    - 如选择 `public-key`，即 JWT 使用私钥生成签名，同时需要使用公钥校验签名（支持 RS256、RS384、RS512、ES256、ES384 和 ES512 算法），还应配置：
      - **Public Key**：指定用于校验签名的 PEM 格式的公钥。
    
- **Payload**：添加自定义的 Claims 检查；用户需要在 Claim 和 Expected Value 分别添加键和对应的值，支持使用 `${clientid}` 和 `${username}` 占位符。其中键用于查找 JWT 中对应的 Claim，值则用于与 Claim 的实际值进行比较。

如验证方式选择 **JWTS**：

除上述配置外，还应配置：

- **JWKS Endpoint**：指定 EMQX 查询 JWKS 的服务器端点地址，该端点需要支持 GET 请求，并且返回符合规范的 JWKS。
- **JWKS 刷新间隔**：指定 JWKS 的刷新间隔，也就是 EMQX 查询 JWKS 的间隔。默认值：300 单位为秒（s）。
点击创建完成相关配置。

::: tip
* 如果当前部署为专有版，需创建 [VPC 对等连接](../deployments/vpc_peering.md)，服务器地址填写内网地址。
* 如果当前部署为 BYOC 版，需在您的公有云控制台中创建 VPC 对等连接，具体请参考 [创建 BYOC 部署 - VPC 对等连接配置](../create/byoc.md#vpc-对等连接配置) 章节。服务器地址填写内网地址。
* 若提示 Init resource failure! 请检查服务器地址是否无误、安全组是否开启。
:::

