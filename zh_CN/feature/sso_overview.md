# SSO

## SSO 功能概览
开启 SSO 能力之后，用户可以方便地使用企业账号管理系统登录到 EMQX Cloud 部署控制台。EMQX Cloud 与企业账号进行 SSO 时，EMQX Cloud 是服务提供商（SP），而企业自有的身份管理系统则是身份提供商（IdP）。通过用户SSO，企业员工用户便可以通过企业账号一键登录 EMQX Cloud。

## 基本流程
当管理员在完成 SSO 的相关配置后，企业员工可以通过如下图流程登录。
![sso](./_assets/sso0.png)

1. 使用浏览器登录 EMQX Cloud，EMQX Cloud 将请求在 IdP 处登录并授权。
2. IdP 返回 code 给浏览器并重定向到 EMQX Cloud。
3. EMQX Cloud 通过 IdP 提供的 code 获取 ID Token，并发送给 IdP 验证。
4. IdP 返回 ID Token 给 EMQX Cloud。
5. EMQX Cloud 给浏览器加上授权，并完成登录。


## 配置步骤

为了建立 EMQX Cloud 与企业 IdP 之间的互信关系，需要进行 EMQX Cloud 作为 SP 的 OIDC 配置和企业 IdP 的 OIDC 配置，配置完成后才能进行 SSO 登录。

1. 在企业 IdP 中配置 EMQX Cloud 元数据信息
2. 获得企业 IdP 中生成的元数据信息，在 EMQX Cloud 填入相关信息
3. 完成 SSO 配置
4. 在企业 IdP 中创建用户并授权 EMQX Cloud 应用
5. 在 EMQX Cloud 创建对应子账号
6. 使用专有的 SSO 登录地址完成登录

## 配置示例
以下为您提供了常见的企业IdP（Okta和Azure AD）进行 SSO 的配置示例：

[配置 Okta SSO](./sso_okta.md) <br>
[配置 Azure AD SSO](./sso_azure.md)


