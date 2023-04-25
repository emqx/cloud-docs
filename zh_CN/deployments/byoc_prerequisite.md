# 部署前置准备

在部署 EMQX Cloud BYOC 之前，请确保完成以下准备工作：

- 熟悉公有云服务和网络结构的基本概念，如 VPC、子网、ECS、DNS 等。
- 拥有公有云账号和 EMQX Cloud 账号。
- 准备相关资源和权限。
- 设置部署环境。
- 准备 EMQX Cloud BYOC 许可证。
- 准备用于 EMQX 服务的域名和 TLS/SSL 证书。

## 账号准备

EMQX Cloud BYOC 将在您的云账号中创建部署，如您还没有对应公有云的账号，可按照云平台官方文档创建账号：

- [创建阿里云账号](https://account.aliyun.com/register/qr_register.htm)
  
目前 BYOC 支持以下公有云及区域，如您需要其他云服务商或地区的支持，您可以提 [工单](../feature/tickets.md) 或 邮件（cloud-support@emqx.io）联系我们。

| 平台   | 区域                                 |
| ------ | ------------------------------------ |
| 阿里云 | 北京，上海，深圳，杭州，张家口，成都 |

此外，您还需要 EMQX Cloud 账号完成部署，如尚未注册，请前往 [EMQX Cloud 账号注册页面](https://accounts-zh.emqx.com/signup) 注册账号。

## 资源与权限

EMQX Cloud BYOC 需要在您的云账号中创建多种云资源与服务，请确保相关云账号中已预留足够的资源、并已完成相关权限的设定。

### 资源配额

下表为 EMQX Cloud BYOC 部署所需的云资源与服务。如当前账号中资源不足，请联系云账号管理员增加相关服务配额。

::: tip
在阿里云平台，您可在 [配额中心控制台](https://quotas.console.aliyun.com/products) 中快速查看资源与服务的使用情况和配额。
:::

| 资源与服务           | 部署所需数量 |
|-----------------|--------|
| VPCs            | 1      |
| Subnets         | 4      |
| SLB*            | 1      |
| SLB Listeners   | 5      |
| ECS Instances   | N*+1   |
| ECS Images      | 1      |
| ECS Key Pairs   | 1      |
| Security Groups | 1      |
| RAM Policies    | 1      |
| RAM Users       | 1      |

*SLB：阿里云负载均衡（Server Load Balancer，简称 SLB）

*N：指 EMQX 节点数量

### 阿里云 RAM 权限

使用阿里云主账户创建创建一个新的 RAM 用户，并为其分配足够的权限策略，用于创建 BYOC 部署。您可以使用我们提供的权限策略示例作为参考。

```bash
{
    "Version": "1",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecs:DeleteSecurityGroup",
                "ecs:DescribeSecurityGroupAttribute",
                "ecs:DescribeImages",
                "ecs:DeleteImage",
                "ecs:DescribeInstances",
                "ecs:DeleteInstance",
                "ecs:DescribeInstanceMaintenanceAttributes",
                "ecs:DescribeInstanceRamRole",
                "ecs:DescribeDisks",
                "ecs:DescribeUserData",
                "ecs:DescribeNetworkInterfaces",
                "ecs:ListTagResources",
                "ecs:DescribeSecurityGroups",
                "ecs:DescribeKeyPairs",
                "ecs:RunInstances",
                "ecs:AuthorizeSecurityGroup",
                "ecs:CreateSecurityGroup",
                "ecs:ModifySecurityGroupPolicy",
                "ecs:ImportKeyPair",
                "ecs:DeleteKeyPairs",
                "ecs:DetachKeyPair",
                "ecs:ModifyImageSharePermission",
                "ecs:CreateImage",
                "ecs:StopInstance",
                "ecs:StartInstance",
                "ecs:AttachKeyPair",
                "ecs:CreateInstance",
                "ecs:AuthorizeSecurityGroupEgress",
                "ecs:CreateKeyPair",
                "ecs:DescribeRegions",
                "ecs:DeleteSnapshot",
                "ecs:RevokeSecurityGroup",
                "ecs:RevokeSecurityGroupEgress",
                "ecs:ModifySecurityGroupRule",
                "ecs:ModifySecurityGroupAttribute",
                "ecs:ModifySecurityGroupEgressRule",
                "ecs:AddTags",
                "ecs:RemoveTags",
                "ecs:DescribeTags",
                "ecs:DescribeTagKeys",
                "ecs:DescribeResourceByTags",
                "ecs:TagResources",
                "ecs:UntagResources",
                "ecs:ReplaceSystemDisk"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "vpc:DescribeVpcs",
                "vpc:DescribeVSwitchAttributes",
                "vpc:DeleteVpc",
                "vpc:DeleteVSwitch",
                "vpc:ListTagResources",
                "vpc:DescribeRouteTableList",
                "vpc:CreateVSwitch",
                "vpc:CreateVpc",
                "vpc:DeleteVSwitch",
                "vpc:DescribeVSwitches",
                "vpc:TagResources",
                "vpc:UnTagResources",
                "vpc:DescribeTagKeys",
                "vpc:DescribeTags",
                "vpc:ModifyVpcAttribute",
                "vpc:ModifyVSwitchAttribute"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "vpc:ReleaseEipAddress",
                "vpc:DescribeEipAddresses",
                "vpc:UnassociateEipAddress",
                "vpc:AssociateEipAddress",
                "vpc:AllocateEipAddress"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "slb:DescribeLoadBalancerAttribute",
                "slb:DeleteLoadBalancer",
                "slb:ListTagResources",
                "slb:DescribeLoadBalancerTCPListenerAttribute",
                "slb:AddBackendServers",
                "slb:StartLoadBalancerListener",
                "slb:SetLoadBalancerTCPListenerAttribute",
                "slb:CreateLoadBalancerTCPListener",
                "slb:DeleteLoadBalancerListener",
                "slb:CreateLoadBalancer",
                "slb:RemoveBackendServers",
                "slb:RemoveTags",
                "slb:RemoveVServerGroupBackendServers",
                "slb:AddTags",
                "slb:DescribeTags",
                "slb:SetLoadBalancerName",
                "slb:AddAccessControlListEntry",
                "slb:CreateAccessControlList",
                "slb:DeleteAccessControlList",
                "slb:RemoveAccessControlListEntry",
                "slb:SetAccessControlListAttribute",
                "slb:DescribeAccessControlLists",
                "slb:DescribeAccessControlListAttribute"
            ],
            "Resource": "*"
        }
    ]
}
```

## 准备启动环境 

为了部署 EMQX Cloud BYOC，您需要一个可连接公网的 Ubuntu 20.04 LTS (AMD64) 环境，您可：

- （推荐）在云账号中使用 Ubuntu 20.04 LTS 镜像创建一个虚拟机实例
- 本地 Ubuntu 20.04 LTS 环境

## 域名及证书

提前准备好用于 EMQX 服务的域名和 TLS/SSL 证书。我们支持自定义单向 TLS/SSL 认证，并且只支持在部署时指定 TLS/SSL 证书。证书可以是自签名证书或 CA 签名证书。关于 SSL 证书格式要求，请参考 [TLS/SSL 配置 - 证书要求](../deployments/tls_ssl.md#证书要求)。

## BYOC 许可证

准备 EMQX Cloud BYOC 许可证。您可联系商务申请 BYOC 许可证，我们的销售团队将根据您设备的连接数和消息上下行的每秒事务处理数（TPS）帮您确定许可证规格。

## <!--选择规格-->

<!--我们根据设备连接数和消息上下行 TPS 提供四个集群大小示例以供选择。我们为每个示例推荐了相应的机器规格和节点数量。我们的销售团队会根据您不同的使用场景，为您提供最合适的集群配置。-->





