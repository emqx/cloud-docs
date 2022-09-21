# 部署概览

在本教程中，您将学习如何查看部署信息、获取连接地址、查看 API 地址等功能，



## 查看部署基本信息

部署概览页面可获取到连接地址和连接端口（以下 xxxxx 表示随机端口，具体端口信息以部署概览页面信息为准）：

* 集群状态：运行状态和运行时长
* 连接数：当前连接数和最大连接数
* 消息上下行 TPS：当前每秒钟消息发送和接收条数和上限
* 部署名称：该部署的名称，可以通过点击右侧的编辑按钮进行修改

* 连接地址

  * 专业版部署连接地址：IP

  * 基础版连接地址：以 emqx.cloud 后缀结尾的域名

* 连接端口：

  * 专业版部署端口：默认开启 1883(mqtt)、8083(ws)，您可以通过配置 TLS/SSL 开启 8883(mqtts) 和 8084(wss) 端口。
  * 基础版部署端口：**15xxx**(mqtt)， **8083**(ws)， **15xxx**(mqtts)， **8084**(wss)

![base_info](./_assets/base_info.png)



## [TLS/SSL 配置](./tls_ssl.md)

::: warning
该功能在基础版中不可用
:::

EMQX Cloud 提供自定义 **单双向 TLS/SSL** 认证，并支持 **自签名证书** 和 **CA 签名证书**。

![base_info](./_assets/tls_info.png)



## [VPC 对等连接配置](./vpc_peering.md)

::: warning
该功能在基础版中不可用
:::

EMQX Cloud 支持同云服务商、同区域与客户已有 VPC(Virtual Private Cloud) 创建对等连接。 VPC 对等连接是两个 VPC 之间的网络连接，通过此连接，使两个 VPC 中的实例可以彼此通信，就像它们在同一网络中一样。

![base_info](./_assets/vpc_peering_info.png)



## [API 访问](../api/introduction.md)

EMQX Cloud 提供了 REST API 以实现与外部系统的集成，例如查询客户端信息、发布消息和创建规则等。

