# 创建专有版部署


EMQX Platform 专有版提供独立的 MQTT 服务集群，有更高的连接上限和 TPS 上限，并且支持更多高级功能和复杂的网络架构。


## 创建部署

1. 登录账户，进入 EMQX Platform [控制台](https://cloud.emqx.com/console/)。

2. 在控制台首页或者部署管理页面，点击**新建部署**进入创建步骤。

3. 在**选择版本**中选中**专有版**。

   ![select_deployment_type](./_assets/create_dedicated.png)


4. 依据您的需求选择相应规格配置。

   - **云平台和区域**：请查看[云服务商和地区](../price/plans.md#支持云服务商和地区)支持。
   - **规格**：从下拉框中选择。每类规格限制了不同的连接数上限和 TPS 上限。如无法满足您的要求，可以[联系我们](https://www.emqx.com/zh/contact?product=cloud)。
   - **部署名称和项目**：为部署设置名称并选择所属项目。
   - **EMQX 版本**：默认为 v5。如果是商业用户，也可以选择 v4 版本。
5. 确认部署信息后，点击**立即部署**。并同意 EMQX Platform 标准服务条款开始创建。
6. 部署创建需要一定的时间，当部署运行状态为**运行中**后，部署创建完成并可使用。


## 查看部署信息

部署概览页面可获取到部署实时状态和连接信息：

![dedicated](./_assets/dedicated_overview.png)

### 基本信息

- **实例状态**：运行状态和部署创建时间。
- **连接数**：当前连接数和最大连接数。
- **消息上下行 TPS**：部署当前每秒钟消息发送和接收条数，以及 TPS 上限。
- **流量**： 部署本月已经使用的流量以及免费流量额度显示。

### 连接信息

- **连接地址**：客户端连接到部署的地址。
- **连接端口**：默认开启 `1883` (MQTT 端口)、`8083` (WebSocket 端口)、`8883` (MQTT TLS/SSL 端口) 和 `8084` (WebSocket TLS/SSL) 端口。
- **端口管理**: 通过端口管理，可以对某一个端口进行单独关闭和开启。
- **CA 证书文件**：允许您下载一个由服务器端 CA 签署的证书文件用于验证，并提醒您证书的到期时间。

建议查看 [端口连接指引](../deployments/port_guide_dedicated.md)了解协议和端口。

## 部署功能使用

您可以通过以下具体章节了解专有版部署特有功能的使用。

### [REST API](https://docs.emqx.com/zh/cloud/latest/api/dedicated)

提供了 REST API 以实现与外部系统的集成，例如查询客户端信息、发布消息和创建规则等。


### [TLS/SSL 配置](../deployments/tls_ssl.md)

提供**自定义单双向** TLS/SSL 认证，并支持**自签名证书**和 **CA 签名证书**。


### [VPC 对等连接](../deployments/vpc_peering.md)

支持同云服务商、同区域与客户已有 Virtual Private Cloud (VPC) 创建对等连接。 VPC 对等连接是两个 VPC 之间的网络连接，通过此连接，使两个 VPC 中的实例可以彼此通信，就像它们在同一网络中一样。


### [私网连接（PrivateLink）](../deployments/privatelink.md)
提供私网连接（PrivateLink）能够实现专有版部署所在的专有网络 VPC 与公有云上的服务建立安全稳定的私有连接，简化网络架构，实现私网访问服务，避免通过公网访问服务带来的潜在安全风险。


### [内部接入点](../vas/intranet-lb.md)

内部接入点允许您在部署的 VPC 内创建一个内部负载均衡服务，实现安全访问 EMQX 集群。


### [NAT 网关](../vas/nat-gateway.md)

NAT 网关可以提供网络地址转换服务，使 EMQX 集群能够通过公网安全地建立对外连接。


## 连接到部署

您可以使用任何 MQTT 客户端工具连接到部署进行测试，我们推荐使用 [MQTTX 连接到部署](../connect_to_deployments/mqttx.md)。
