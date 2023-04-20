# 部署前提条件

在部署 EMQX Cloud BYOC 前，您需要完成一些前期准备工作。本章介绍 EMQX Cloud BYOC 支持的公有云和区域、预备知识以及云资源规划等内容。

## 预备知识

完成此部署需要对公有云服务和网络结构有基本了解，如 VPC、子网、ECS 等概念。

## 支持的公有云和区域
| 平台  | 区域                 |
|-----|--------------------|
| 阿里云 | 北京，上海，深圳，杭州，张家口，成都 |

> 如您需要其他云服务商或地区的支持，您可以提 [工单](../feature/tickets.md) 或邮件(cloud-support@emqx.io)与我们取得联系。

## 账号准备

### 公有云账号

EMQX Cloud BYOC 将 MQTT 集群部署在您的云账号中，如果您还没有对应公有云的账号，请创建。
- [创建阿里云账号](https://account.aliyun.com/register/qr_register.htm)

### EMQX Cloud 账号

您必须拥有 EMQX Cloud 账号才能创建部署。如果没有，请在 https://accounts-zh.emqx.com/signup 创建。

## 依赖的资源与服务

EMQX Cloud BYOC 部署需要在您的云账号中创建多种云资源与服务。查看以下信息并确保您的账号配置正确。否则，部署可能会失败。

### 资源配额

下面的表格展示了部署所需要的云资源与服务。如果您的账号中现有部署已使用这些资源并且此部署可能导致超过默认配额，则您可能需要云账号管理员增加以下资源的服务配额。在 [配额中心控制台](https://quotas.console.aliyun.com/products) 中，可以快速查看资源与服务的使用情况和配额。

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

*SLB: 阿里云负载均衡（Server Load Balancer，简称SLB）

*N: 指 EMQX 节点数量

### 阿里云 RAM 权限

在部署之前，请使用阿里云主账号创建一个新的策略，并为 RAM 用户授权，该用户的访问密钥将用于启动部署。以下策略提供了部署的足够的权限。
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
            "ecs:ModifySecurityGroupEgressRule"
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
            "vpc:DescribeVSwitches"
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
            "slb:RemoveVServerGroupBackendServers"
        ],
        "Resource": "*"
    }
    ]
}
```

## 许可证

您需要提前准备 EMQX Cloud BYOC 许可证。如需申请，请联系商务。

## 域名及证书

您需要提前准备 EMQX 服务的域名及域名对应的 TLS/SSL 证书。

EMQX Cloud BYOC 支持 **自定义单向** TLS/SSL 认证，目前仅支持通过部署时指定 TLS/SSL 证书。TLS/SSL 证书支持 **自签名证书** 和 **CA 签名证书**。SSL 证书格式要求请参考专有版中 [TLS/SSL 配置 - 证书要求](../deployments/tls_ssl.md#证书要求)。


## 准备启动环境 

您需要一个可连接公网的 Ubuntu 20.04 LTS (AMD64) 环境。我们建议在您云账号中使用 Ubuntu 20.04 LTS 镜像创建一个虚拟机实例。如果您手边已经有 Ubuntu 20.04 LTS 环境，也可以直接使用。

## 选择规格

我们根据设备连接数和消息上下行 TPS 提供四个集群大小示例以供选择。我们为每个示例推荐了相应的机器规格和节点数量。我们的销售团队会根据您不同的使用场景，为您提供最合适的集群配置。