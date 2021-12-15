# 部署概览

在本教程中，您将学习如何查看部署信息、获取连接地址、查看 API 地址等功能，



## 查看部署基本信息

在这里您能查看到如下部署信息：

* 集群状态：运行状态和运行时长
* 连接数：当前连接数和最大连接数
* 消息上下行 TPS：当前每秒钟消息发送和接收条数和上限
* 部署名称：该部署的名称，可以通过点击右侧的编辑按钮进行修改

* 连接地址

  * 专业版部署连接地址：IP

  * 基础版连接地址：以 emqx.cloud 后缀结尾的域名

* 连接端口：

  * 专业版部署端口：默认开启 **1883**(tcp)， **8083**(ws)，您可以通过 [配置 TLS/SSL](./tls_ssl.md) 开启 **8883**(tls)， **8084**(wss)
  * 基础版部署端口：**15xxx**(tcp)， **8083**(ws)， **15xxx**(tls)， **8084**(wss)

![base_info](./_assets/base_info.png)



## [TLS/SSL 配置](./tls_ssl.md)

::: danger
该功能在基础版中不可用
:::

EMQ X Cloud 提供自定义 **单双向 TLS/SSL** 认证，并支持 **自签名证书** 和 **CA 签名证书**。

![base_info](./_assets/tls_info.png)



## [VPC 对等连接配置](./vpc_peering.md)

::: danger
该功能在基础版中不可用
:::

EMQ X Cloud 支持同云服务商、同区域与客户已有 VPC(Virtual Private Cloud) 创建对等连接。 VPC 对等连接是两个 VPC 之间的网络连接，通过此连接，使两个 VPC 中的实例可以彼此通信，就像它们在同一网络中一样。

![base_info](./_assets/vpc_peering_info.png)



## [API 访问](../api/introduction.md)

EMQ X Cloud 提供了 REST API 以实现与外部系统的集成，例如查询客户端信息、发布消息和创建规则等。

