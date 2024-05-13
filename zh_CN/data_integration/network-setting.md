开始之前，您需要在 EMQX Platform 上创建一个部署（EMQX 群集）并配置网络。

- 对于专有版部署用户： 请先创建 [VPC 对等连接](../deployments/vpc_peering.md)，创建完对等连接之后，可以通过内部网络 IP 登录 Platform Console 访问目标连接器。或者开通 [NAT 网关](../vas/nat-gateway.md)，通过公网 IP 访问目标连接器。
- 对于 BYOC 部署用户： 请在部署 BYOC 的 VPC 和目标连接器所在的 VPC 之间建立对等连接，创建完对等连接之后，可以通过内部网络 IP 访问目标连接器。如果您需要通过公共 IP 地址访问资源，请在公共云控制台中为部署 BYOC 的 VPC 配置 NAT 网关。