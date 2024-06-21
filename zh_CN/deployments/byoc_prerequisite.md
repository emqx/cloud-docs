# 部署前置准备

在部署 EMQX Platform BYOC 之前，请确保完成以下准备工作：

- 熟悉公有云服务和网络结构的基本概念，如 VPC、子网、ECS、DNS 等。
- 拥有公有云账号和 EMQX Platform 账号。
- 准备相关资源和权限。
- 准备启动环境。
- 准备 EMQX Platform BYOC 许可证。
- 准备用于 EMQX 服务的域名和 TLS/SSL 证书。

## 账号准备

EMQX Platform BYOC 将在您的云账号中创建部署，如您还没有对应公有云的账号，可按照云平台官方文档创建账号：

- [创建阿里云账号](https://account.aliyun.com/register/qr_register.htm)
- [创建亚马逊云科技账号](https://www.amazonaws.cn/about-aws/china/faqs/signup-process/)
  
目前 BYOC 支持以下公有云及区域，如您需要其他云服务商或地区的支持，您可以通过 [工单](../feature/tickets.md) 或 邮件(<cloud-support@emqx.io>) 与我们联系。

| 平台     | 区域                 |
|--------|--------------------|
| 阿里云    | 北京，上海，深圳，杭州，张家口，成都 |
| 亚马逊云科技 | 宁夏，北京              |

此外，您还需要 EMQX Platform 账号完成部署，如尚未注册，请前往 [EMQX Platform 账号注册页面](https://accounts-zh.emqx.com/signup) 注册账号。

## 域名及证书

提前准备好用于 EMQX 服务的域名和 TLS/SSL 证书，我们支持自定义单向 TLS/SSL 认证。

::: warning 注意

1. 根据政策要求，域名必须完成 ICP 备案，并且备案的云服务商需要与部署 BYOC 的平台保持一致。
2. BYOC 部署仅接受 CA 签名证书。关于 TLS/SSL 证书格式要求，请参考 [在 BYOC 中配置 TLS/SSL](../deployments/byoc_ssl.md)。
:::

## 资源与权限

EMQX Platform BYOC 需要在您的云账号中创建多种云资源与服务，请确保相关云账号中已预留足够的资源、并已完成相关权限的设定。

### 资源配额

下表为 EMQX Platform BYOC 部署所需的云资源与服务（以阿里云为例）。如当前账号中资源不足，请联系云账号管理员增加相关服务配额。

::: tip
在阿里云，您可在 [配额中心控制台](https://quotas.console.aliyun.com/products) 中快速查看资源与服务的使用情况和配额。
在亚马逊云，您可在 [Service Quotas 控制面板](https://console.amazonaws.cn/servicequotas/home) 中快速查看资源与服务的使用情况和配额。
:::

:::: tabs
::: tab "阿里云"

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

:::
::: tab "亚马逊云科技"

| 资源与服务                        | 部署所需数量 |
|------------------------------|----------------------------------|
| VPCs                         | 1                                |
| Subnets                      | 3                                |
| Security groups              | 1                                |
| Route tables*                | 3                                |
| Load balancers               | 1                                |
| LB listeners                 | 6                                |
| Target groups                | 6                                |
| Internet gateways            | 1                                |
| Key pairs                    | 1                                |
| EC2 instances                | N*+1                             |
| Amazon Machine Images (AMIs) | 1                                |
| IAM policies                 | 1                                |

*Route tables: 包含了一个未使用的默认路由表。

*N: 指 EMQX 节点数量
:::
::::

### 云平台账号权限

您的云平台账号需要具备必要的身份和访问管理（IAM）权限，以便使用您的云账户凭证通过命令行来创建云资源。因此，您需要向您的云管理员请求分配足够的权限并生成相应的凭证，以便创建 BYOC 部署。

:::: tabs
::: tab "阿里云"

使用阿里云主账户创建一个新的 RAM 用户，并为其分配足够的权限策略，用于创建 BYOC 部署。您可以使用我们提供的权限策略示例作为参考。

```json
{
  "Version": "1",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecs:AddTags",
        "ecs:AttachKeyPair",
        "ecs:AuthorizeSecurityGroup",
        "ecs:AuthorizeSecurityGroupEgress",
        "ecs:CreateInstance",
        "ecs:CreateImage",
        "ecs:CreateKeyPair",
        "ecs:CreateSecurityGroup",
        "ecs:DescribeDisks",
        "ecs:DescribeImages",
        "ecs:DescribeInstances",
        "ecs:DescribeInstanceMaintenanceAttributes",
        "ecs:DescribeInstanceRamRole",
        "ecs:DescribeInstanceAttribute",
        "ecs:DescribeKeyPairs",
        "ecs:DescribeNetworkInterfaces",
        "ecs:DescribeRegions",
        "ecs:DescribeSecurityGroups",
        "ecs:DescribeSecurityGroupAttribute",
        "ecs:DescribeUserData",
        "ecs:DeleteKeyPairs",
        "ecs:DeleteSecurityGroup",
        "ecs:DetachKeyPair",
        "ecs:ImportKeyPair",
        "ecs:ListTagResources",
        "ecs:ModifyImageSharePermission",
        "ecs:ModifySecurityGroupPolicy",
        "ecs:RunInstances",
        "ecs:TagResources"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecs:StartInstance",
        "ecs:StopInstance",
        "ecs:DeleteImage",
        "ecs:DeleteInstance",
        "ecs:DeleteSnapshot"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "ecs:tag/used-by": [
            "emqx-cloud"
          ]
        }
      }
    },
    {
      "Effect": "Allow",
      "Action": [
        "vpc:AllocateEipAddress",
        "vpc:AssociateEipAddress",
        "vpc:CreateVpc",
        "vpc:CreateVSwitch",
        "vpc:DescribeEipAddresses",
        "vpc:DescribeRouteTableList",
        "vpc:DescribeVpcs",
        "vpc:DescribeVSwitches",
        "vpc:DescribeVSwitchAttributes",
        "vpc:DeleteVpc",
        "vpc:DeleteVSwitch",
        "vpc:ListTagResources",
        "vpc:ReleaseEipAddress",
        "vpc:TagResources",
        "vpc:UnassociateEipAddress"
      ],
      "Resource": "*"
    },{
      "Effect": "Allow",
      "Action": [
        "slb:AddAccessControlListEntry",
        "slb:AddBackendServers",
        "slb:CreateAccessControlList",
        "slb:CreateLoadBalancer",
        "slb:CreateLoadBalancerTCPListener",
        "slb:DescribeAccessControlListAttribute",
        "slb:DescribeLoadBalancerAttribute",
        "slb:DescribeLoadBalancerTCPListenerAttribute",
        "slb:StartLoadBalancerListener",
        "slb:SetLoadBalancerTCPListenerAttribute",
        "slb:ListTagResources",
        "slb:TagResources"
      ],
      "Resource": "*"
    }
  ]
}
```

在创建部署之后，如果您需要对部署进行删除操作，可以分配单独的权限策略。策略参考示例如下：

```json
{
  "Version": "1",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecs:DescribeDisks",
        "ecs:DescribeInstanceMaintenanceAttributes",
        "ecs:DescribeInstanceRamRole",
        "ecs:DescribeImages",
        "ecs:DescribeInstances",
        "ecs:DescribeKeyPairs",
        "ecs:DescribeNetworkInterfaces",
        "ecs:DescribeUserData",
        "ecs:DescribeSecurityGroups",
        "ecs:DescribeSecurityGroupAttribute",
        "ecs:ListTagResources"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecs:DeleteKeyPairs",
        "ecs:DeleteImage",
        "ecs:DeleteInstance",
        "ecs:DeleteSecurityGroup"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "ecs:tag/used-by": [
            "emqx-cloud"
          ]
        }
      }
    },
    {
      "Effect": "Allow",
      "Action": [
        "vpc:DescribeRouteTableList",
        "vpc:DescribeVpcs",
        "vpc:DescribeVSwitchAttributes",
        "vpc:ListTagResources"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "vpc:DeleteVpc",
        "vpc:DeleteVSwitch"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "acs:ResourceTag/used-by": [
            "emqx-cloud"
          ]
        }
      }
    },
    {
      "Effect": "Allow",
      "Action": [
        "slb:DescribeLoadBalancerAttribute",
        "slb:DescribeAccessControlListAttribute",
        "slb:ListTagResources"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "slb:DeleteLoadBalancer",
        "slb:DeleteLoadBalancerListener",
        "slb:DeleteAccessControlList"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "slb:tag/used-by": [
            "emqx-cloud"
          ]
        }
      }
    }
  ]
}
```

在创建部署之后，如果您需要对部署进行停止和启动操作，可以分配单独的权限策略。策略参考示例如下：

```json
{
  "Version": "1",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecs:DescribeInstances"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecs:StartInstance",
        "ecs:StopInstance"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "ecs:tag/used-by": [
            "emqx-cloud"
          ]
        }
      }
    }
  ]
}
```

:::
::: tab "亚马逊云科技"

使用亚马逊云科技主账户，根据以下给出的策略定义[创建一个新的自定义策略](https://docs.amazonaws.cn/IAM/latest/UserGuide/access_policies_create-console.html)。 将这个[策略附加到一个 IAM 用户或用户组](https://docs.amazonaws.cn/IAM/latest/UserGuide/id_groups_manage_attach-policy.html)上，使其拥有足够的权限，然后[生成这个用户的访问密钥](https://docs.amazonaws.cn/IAM/latest/UserGuide/id_credentials_access-keys.html)用于创建 BYOC 部署。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "ec2:AssociateRouteTable",
        "ec2:AttachInternetGateway",
        "ec2:AuthorizeSecurityGroupIngress",
        "ec2:CreateInternetGateway",
        "ec2:CreateImage",
        "ec2:CreateKeyPair",
        "ec2:CreateRoute",
        "ec2:CreateRouteTable",
        "ec2:CreateSecurityGroup",
        "ec2:CreateSubnet",
        "ec2:CreateTags",
        "ec2:CreateVpc",
        "ec2:DescribeInstances",
        "ec2:DescribeInstanceAttribute",
        "ec2:DescribeInstanceCreditSpecifications",
        "ec2:DescribeInstanceTypes",
        "ec2:DescribeInternetGateways",
        "ec2:DescribeImages",
        "ec2:DescribeRegions",
        "ec2:DescribeRouteTables",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeSecurityGroupRules",
        "ec2:DescribeKeyPairs",
        "ec2:DescribeSubnets",
        "ec2:DescribeTags",
        "ec2:DescribeVolumes",
        "ec2:DescribeVpcs",
        "ec2:DescribeVpcAttribute",
        "ec2:DeleteSecurityGroup",
        "ec2:DeleteKeyPair",
        "ec2:ImportKeyPair",
        "ec2:RunInstances",
        "ec2:ModifyImageAttribute",
        "ec2:ModifySubnetAttribute",
        "ec2:ModifyVpcAttribute",
        "elasticloadbalancing:AddTags",
        "elasticloadbalancing:CreateListener",
        "elasticloadbalancing:CreateLoadBalancer",
        "elasticloadbalancing:CreateTargetGroup",
        "elasticloadbalancing:DescribeListeners",
        "elasticloadbalancing:DescribeLoadBalancers",
        "elasticloadbalancing:DescribeLoadBalancerAttributes",
        "elasticloadbalancing:DescribeTags",
        "elasticloadbalancing:DescribeTargetGroups",
        "elasticloadbalancing:DescribeTargetGroupAttributes",
        "elasticloadbalancing:DescribeTargetHealth",
        "elasticloadbalancing:ModifyLoadBalancerAttributes",
        "elasticloadbalancing:ModifyTargetGroupAttributes",
        "elasticloadbalancing:RegisterTargets"
      ],
      "Resource": "*"
    },
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": [
        "ec2:StopInstances",
        "ec2:TerminateInstances"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:ResourceTag/used-by": "emqx-cloud"
        }
      }
    }
  ]
}
```

在创建部署之后，如果您需要对部署进行删除操作，可以分配单独的权限策略。策略参考示例如下：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeInstanceAttribute",
        "ec2:DescribeInstanceTypes",
        "ec2:DescribeInstanceCreditSpecifications",
        "ec2:DescribeInternetGateways",
        "ec2:DescribeImages",
        "ec2:DescribeKeyPairs",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DescribeRouteTables",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeSubnets",
        "ec2:DescribeTags",
        "ec2:DescribeVolumes",
        "ec2:DescribeVpcs",
        "ec2:DescribeVpcAttribute",
        "ec2:DetachInternetGateway",
        "ec2:DisassociateRouteTable",
        "ec2:ModifyInstanceAttribute",
        "elasticloadbalancing:DescribeLoadBalancers",
        "elasticloadbalancing:DescribeLoadBalancerAttributes",
        "elasticloadbalancing:DescribeTags",
        "elasticloadbalancing:DescribeTargetGroups",
        "elasticloadbalancing:DescribeTargetGroupAttributes"
      ],
      "Resource": "*"
    },
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": [
        "ec2:DeleteInternetGateway",
        "ec2:DeleteKeyPair",
        "ec2:DeleteVpc",
        "ec2:DeleteRouteTable",
        "ec2:DeleteSubnet",
        "ec2:DeregisterImage",
        "ec2:TerminateInstances",
        "elasticloadbalancing:DeleteLoadBalancer",
        "elasticloadbalancing:DeleteListener",
        "elasticloadbalancing:DeleteTargetGroup"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:ResourceTag/used-by": "emqx-cloud"
        }
      }
    }
  ]
}
```

在创建部署之后，如果您需要对部署进行停止和启动操作，可以分配单独的权限策略。策略参考示例如下：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances"
      ],
      "Resource": "*"
    },
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": [
        "ec2:StartInstances",
        "ec2:StopInstances"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:ResourceTag/used-by": "emqx-cloud"
        }
      }
    }
  ]
}
```

:::
::::

## 准备启动环境

为了部署 EMQX Platform BYOC，您需要一个可连接公网的 Ubuntu 20.04 LTS (AMD64) 环境，您可以使用以下两种方式之一：

- （推荐）在云账号中使用 Ubuntu 20.04 LTS 镜像创建一个虚拟机实例，且实例的内存需要至少 1 GiB。
- 使用本地 Ubuntu 20.04 LTS 环境。

## BYOC 许可证

准备 EMQX Platform [BYOC 许可证](./byoc_license.md)。您可联系商务申请 BYOC 许可证，我们的销售团队将根据您设备的连接数和消息上下行的每秒事务处理数（TPS）帮您确定许可证规格。

<!--## 选择规格-->

<!--我们根据设备连接数和消息上下行 TPS 提供四个集群大小示例以供选择。我们为每个示例推荐了相应的机器规格和节点数量。我们的销售团队会根据您不同的使用场景，为您提供最合适的集群配置。-->
