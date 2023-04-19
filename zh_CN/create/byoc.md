# 创建 BYOC 部署

EMQX Cloud BYOC 部署会在您自己的云基础设施中部署 EMQX 企业版集群，确保数据只在您的环境中，安全可控。下面介绍如何创建和使用 BYOC 部署。

## 前提条件

创建 BYOC 部署需要您提前准备好对应的公有云账号、云资源规划和 EMQX Cloud BYOC 产品许可证等。详细信息，请参考 [BYOC 部署前提条件](../deployments/byoc_prerequisite.md)。

## 准备部署

1. 登录账户，进入 EMQX Cloud [控制台](https://cloud.emqx.com/console/)。

2. 在控制台首页或者部署列表页面都可以在指定项目下创建，点击新建部署进入创建步骤。

3. 点击 BYOC 面板上的 `前往部署`。

4. 依据您的需求选择相应规格配置。

   - 选择云平台：支持部署在阿里云，如您有其他云服务提供商需求，您可以提交 [工单](../feature/tickets.md) 或通过邮件（cloud-support@emqx.io）和我们联系。
   - 选择区域：支持阿里云（深圳，上海，杭州，北京，张家口，成都），如您有其他区域需求，您可以提交 [工单](../feature/tickets.md) 或通过邮件（cloud-support@emqx.io）和我们联系。
   - 部署名称：定义这个部署的名称，以便于在控制台中快速查找。
   - VPC 网段：在您的云账号中创建 VPC 时使用。您可以选择 10.0.0.0/8、172.16.0.0/12 或 192.168.0.0/16 三个 RFC 标准私网网段作为 VPC 的私网地址范围。
   - 集群规模：每个规模限制了不同的连接数上限和 TPS 上限，并提供了对应的机型推荐。后续也可以通过升降部署规格实现增加和减少最大连接数和 TPS 上限。
   - Agent 节点实例规格：根据 `集群规模` 的选择，自动生成了对应云服务提供商的实例规格。BYOC Agent 节点用于管理 EMQX 节点，包括收集运行状态、采集日志和数据备份等。
   - EMQX 节点实例规格：根据 `集群规模` 的选择，自动生成了对应云服务提供商的实例规格。EMQX 节点上运行 EMQX 企业版，负责提供 MQTT 消息服务。
   - EMQX 节点实例数量：根据 `集群规模` 的选择，自动生成了推荐的实例数量。您可以修改 EMQX 节点的数量，最少 2 个节点，最多 5 个节点。

5. 点击 **下一步** 进入`高级配置`，依据您的需求添加云资源标签。它可以用于标记和描述云资源，以便您更好地在云账号中组织和管理这些资源。您可以为此次部署中的 EMQX 资源打上至多 10 个标签。

6. 点击 **下一步** 进入确认页面。检查配置无误后，点击 **前往部署**，查看部署指南。

7. 根据部署指南上的提示，下载并执行部署。


## 执行部署

> 在执行部署前，请确保您已满足 [BYOC 部署前提条件](../deployments/byoc_prerequisite.md)。

准备一个可访问互联网的 Ubuntu 20.04 (AMD64) LTS 环境，根据 [准备部署](#准备部署) 中生成的操作步骤进行操作。请依次复制文本框中的命令并将其粘贴到您的 Ubuntu 终端中。此命令包含您在设置页面中提供的值，以及系统预置的信息。

在执行`./byoc create`命令前，请填充您的参数后执行。参数释义如下：

`--accessKey` 您的公有云账号的 AccessKey ID。阿里云平台可以在 [工作台 RAM 访问控制](https://ram.console.aliyun.com/manage/ak) 中查看您的 AccessKey ID。

`--secretKey` 您的公有云账号的 AccessKey Secret。请使用与 AccessKey ID 对应的 AccessKey Secret。

`--domain` 指定部署中 MQTT 服务的域名。您的 MQTT 设备将使用该域名访问到您的 MQTT 服务。

`--sslCertPath` 域名 SSL 证书文件所在的绝对路径。请将证书文件提前复制到您的 Ubuntu 环境目录中。

`--emqxLicPath` EMQX Cloud BYOC 许可证文件所在的绝对路径。请将许可证文件提前复制到您的 Ubuntu 环境目录中。

`--byocEndpoint` EMQX Cloud 访问地址。此为系统参数，请勿修改。

`--byocKey` 此次 BYOC 部署的认证密钥，用于 EMQX Cloud API 的安全认证。由 EMQX Cloud 控制台生成，请勿修改。

示例：

```bash
./byoc create \
    --accessKey LTAI5t7XXXXXXXXXXXX6A3923 \
    --secretKey g3qQyYeqXXXXXXXXXXXXXLhXuXqN1d \
    --domain myexample.mqttce.com \
    --sslCertPath ～/mqttce.pem \
    --emqxLicPath ~/byoc.lic \
    --byocEndpoint https://cloud.emqx.com \
    --byocKey aaabbbccc
```

该命令执行后，等待数分钟，出现以下文字，提示确认需要创建的云资源，输入“yes“回车后继续。

```bash
Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: 
```

当显示以下内容时，您需要根据提示，在您的 DNS 服务中添加一条域名解析记录，将部署的公网 IP 与您的域名进行绑定。当解析记录生效时，会显示 `HTTPS listener is ready`。
```bash
Apply complete! Resources: 30 added, 0 changed, 0 destroyed.

Outputs:
cloud_register_data = <sensitive>
jwt_token = <sensitive>
lb_address = "120.55.12.49"
vpc_id = "vpc-bp1wllXXXXXXXXX5j8i0"
*****************************
You need add a record to your DNS service provider.
IP address: 120.55.12.49
Domain: myexample.mqttce.com
*****************************
Checking if https://myexample.mqttce.com is resolved to the 120.55.12.49 of the load balancer
HTTPS listener is ready
```

最后输出以下内容说明该部署执行成功。
```bash
The deployment is successful! Here is the service information:
--------------------------------------------------------
EMQX service connection address: <Your Custom Domain>
You can log in to the EMQX Cloud Console(https://cloud.emqx.com/console)
to manage your deployment.
--------------------------------------------------------
Thank you for choosing our service. Happy IoT!
```

## 部署概览

完成部署后，回到`部署指南`页面，点击“完成部署”，将会跳转到我们的控制台页面，点击 BYOC 部署卡片进入概览页面，可获取到部署实时状态和连接信息：

   ![byoc](./_assets/byoc_deployment_console.png)

* 实例状态：运行状态和创建时间
* 连接数：当前连接数和最大连接数
* 消息上下行 TPS：部署当前每秒钟消息发送和接收条数，以及 TPS 上限。
* 部署名称：部署名称也是云资源的前缀，方便在公有云控制台中快速查找。
* 部署规格：显示当前部署的最大连接数、最大消息上下行和计费模式。
* 连接地址：部署时用户指定的域名。
* 连接端口：默认开启 1883(mqtt)、8083(ws)、8883(mqtts) 和 8084(wss) 端口。如需自定义端口，您可以提交 [工单](../feature/tickets.md) 或通过邮件（cloud-support@emqx.io）和我们联系。


### TLS/SSL 配置

BYOC 提供 **自定义单向** TLS/SSL 认证，目前仅支持通过部署时指定 SSL 证书。SSL 证书支持 **自签名证书** 和 **CA 签名证书**。SSL 证书格式要求请参考专有版中 [TLS/SSL 配置 - 证书要求](../deployments/tls_ssl.md#证书要求)。


### VPC 对等连接配置

VPC 对等连接是两个 VPC 之间的网络连接，通过此连接，使两个 VPC 中的实例可以彼此通信，就像它们在同一网络中一样。该功能由云服务商提供，支持在同云服务商、同区域内，BYOC 部署所在的 VPC(Virtual Private Cloud) 与客户其他 VPC(Virtual Private Cloud) 创建对等连接。 请参考各公有云 VPC 对等连接文档进行配置：
- [阿里云 VPC 对等连接](https://help.aliyun.com/document_detail/418507.html)


### 私网连接 PrivateLink 配置
私网连接（PrivateLink）能够实现 BYOC 部署所在的 VPC 与公有云上的服务建立安全稳定的私有连接，简化网络架构，实现私网访问服务，避免通过公网访问服务带来的潜在安全风险。请参考各公有云 VPC 私网连接文档进行配置：
- [阿里云私网连接 PrivateLink](https://help.aliyun.com/product/120462.html)


### [API 访问](../api/introduction.md)

提供了 REST API 以实现与外部系统的集成，例如查询客户端信息、发布消息和创建规则等。


## 连接到部署

您可以使用任何 MQTT 客户端工具连接到部署进行测试，我们推荐使用 [MQTT X 连接到部署](../connect_to_deployments/mqttx.md)。

