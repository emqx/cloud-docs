# Deployment Prerequisites

Before deploying EMQX Cloud Bring Your Own Cloud (BYOC), make sure to complete the following preparations:

- Familiarize yourself with the basic concepts of public cloud services and network structures, such as VPC, subnet, ECS, etc.
- Have a public cloud account and an EMQX Cloud account.
- Prepare relevant cloud resources and cloud account permissions.
- Set up the deployment bootstrap environment.
- Prepare a domain name and the corresponding TLS/SSL certificate for EMQX service.
- Prepare an EMQX Cloud BYOC license.

## Account Preparation

The EMQX Cloud BYOC deployment will be created in your cloud account. If you do not have a corresponding public cloud account, you can create an account according to the official documentation of the cloud platform you preferred, for example:

- [Create an AWS account in your organization](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_create.html)
- [Create a Google Cloud Platform account](https://cloud.google.com/docs/get-started)

Currently, BYOC supports the following public clouds and regions. If you need support from other cloud service providers or regions, you can submit a ticket or send an [email](mailto:cloud-support@emqx.io) to contact us.

| Cloud Provider | Region                                                                                                                                                                                                                                            |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AWS            | **US:** US East (N. Virginia), US East (Ohio), US West (N. California), US West (Oregon)<br />**EU:** EU (Ireland), EU (Frankfurt)<br />**Aisa:** Asia Pacific (Singapore), Asia Pacific (Mumbai), Asia Pacific (Hong Kong), Asia Pacific (Tokyo) |
| Google Cloud   | **US:** us-east1 (South Carolina), us-west1 (Oregon), us-central1 (Iowa)<br />**EU:** europe-west3 (Frankfurt), europe-north1 (Finland)<br />**Asia:** asia-south1 (Mumbai), asia-southeast1 (Singapore), asia-east1 (Taiwan)                     |


In addition, you also need an EMQX Cloud account to complete the deployment. If you have not registered, please go to the [EMQX Cloud account registration page](https://accounts.emqx.com/signup) to register an account.

## Resources and Permissions

EMQX Cloud BYOC deployment requires you to create various cloud resources and services in your cloud account. Make sure that the relevant cloud account has reserved enough resources quota and completed the setting of relevant permissions.

### Resource Quotas

The following table shows the cloud resources and services required for EMQX Cloud BYOC deployment. If the resources in the current account are insufficient, please contact the cloud account administrator to increase the relevant service quotas.

::: tip

Your cloud administrator can quickly view the usage and quotas of resources and services in the cloud quota.
- [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html)
- [Quotas on Google Cloud](https://cloud.google.com/docs/quota_detail/view_manage)


:::

:::: tabs
::: tab "AWS"

| Resources and Services       | Required Quantity for Deployment |
|------------------------------|----------------------------------|
| VPC                          | 1                                |
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

*Route tables: Include a default routing table which is not used.

*N: Refers to the number of EMQX nodes.
:::
::: tab "Google Cloud"

| Resources and Services | Required Quantity for Deployment |
|------------------------|----------------------------------|
| VPC networks           | 1                                |
| Subnets                | 4                                |
| Firewall rules         | 3                                |
| Network Load Balancer  | 2                                |
| IP addresses           | 2                                |
| VM instances           | N*+1                             |
| VM images              | 1                                |
| IAM roles              | 2                                |
| IAM service account    | 1                                |

*N: Refers to the number of EMQX nodes.
:::

::::

::: warning Notice
If you're using Google Cloud, it's important to verify the presence of the default network in your GCP account. If it's not already in place, please create it. During the deployment process, packer will be used as the system image packaging tool. This requires the creation of necessary resources for packaging within the default network of the Virtual Private Cloud (VPC).

If the default network cannot be created due to security policies, you can submit a ticket or send an [email](mailto:cloud-support@emqx.io) to contact us.
:::

### IAM Permissions

Your role needs to have the necessary Identity and Access Management (IAM) permissions to run commands to create the cloud resources in your cloud account. You need to ask your cloud administrator to assign sufficient permissions for creating BYOC deployments and generate the corresponding credentials.

:::: tabs
::: tab "AWS"

To create a custom policy, you can utilize the provided policy definition by following the steps in the [Creating policies using the JSON editor](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html#access_policies_create-json-editor) documentation. After creating the custom policy, you can attach it to an IAM user or a group of users. Finally, generate the access key for the IAM user by following the steps in the [Managing access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) documentation.

Here is the policy definition in JSON (**for creating deployment**):
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
Here is the policy definition in JSON (**for deleting deployment**):
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
Here is the policy definition in JSON (**for stopping and starting deployment**):
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
::: tab "Google Cloud"

To create a custom role using the gcloud CLI, you can utilize the provided role definition by following the steps outlined in the [Creating Custom Roles](https://cloud.google.com/iam/docs/creating-custom-roles) documentation. After creating the custom role, you can bind it to a service account. Finally, generate the service account key.

1. Create a YAML file with the following definitions for your custom role. You need two separate roles: one for creating a BYOC deployment, and another for deleting a BYOC deployment.
```yaml
title: "EMQX Cloud BYOC creation"
description: "The minimum role definition for creating an EMQX Cloud BYOC deployment"
stage: "GA"
includedPermissions:
- compute.firewalls.get
- compute.targetPools.get
- compute.images.get
- compute.disks.create
- compute.disks.delete
- compute.disks.get
- compute.instances.setMetadata
- compute.instances.setLabels
- compute.subnetworks.useExternalIp
- compute.subnetworks.get
- compute.instances.setServiceAccount
- compute.addresses.create
- compute.instances.create
- compute.addresses.get
- compute.networks.create
- compute.httpHealthChecks.get
- compute.firewalls.create
- compute.networks.updatePolicy
- compute.images.create
- compute.images.setLabels
- compute.addresses.use
- compute.subnetworks.create
- compute.instances.getSerialPortOutput
- compute.httpHealthChecks.create
- compute.disks.useReadOnly
- compute.forwardingRules.get
- compute.machineTypes.get
- compute.targetPools.create
- compute.zones.get
- compute.regionOperations.get
- compute.images.useReadOnly
- compute.instances.use
- compute.instances.get
- compute.targetPools.use
- compute.forwardingRules.create
- compute.httpHealthChecks.useReadOnly
- compute.instances.delete
- compute.globalOperations.get
- compute.subnetworks.use
- compute.networks.get
- compute.zoneOperations.get
- compute.forwardingRules.setLabels
```
```yaml
title: "EMQX Cloud BYOC deleting"
description: "The minimum role definition for deleting an EMQX Cloud BYOC deployment"
stage: "GA"
includedPermissions:
- compute.firewalls.get
- compute.zoneOperations.get
- compute.instances.delete
- compute.targetPools.delete
- compute.networks.delete
- compute.regionOperations.get
- compute.firewalls.delete
- compute.networks.updatePolicy
- compute.forwardingRules.get
- compute.globalOperations.get
- compute.networks.get
- compute.httpHealthChecks.get
- compute.subnetworks.get
- compute.httpHealthChecks.delete
- compute.targetPools.get
- compute.addresses.delete
- compute.subnetworks.delete
- compute.disks.get
- compute.addresses.get
- compute.instances.get
- compute.forwardingRules.delete
- compute.images.delete
- compute.images.get
```
2. Use the following commands to create the role using the YAML file:
```bash
gcloud iam roles create CreateEmqxCloudByocRole --project=<project-id> --file=<yaml-file-path>
```
3. (Optional) If you don't have a service account, you can create one with the following command:
```bash
gcloud iam service-accounts create <service-account-name> --project=<project-id>
```
4. Bind the role to the service account using the following command:
```bash
gcloud projects add-iam-policy-binding <project-id> --member=serviceAccount:<service-account-name>@<project-id>.iam.gserviceaccount.com --role=projects/<project-id>/roles/CreateEmqxCloudByocRole
```
5. Generate a service account key in JSON format with the following command:
```bash
gcloud iam service-accounts keys create <json-file> --iam-account=<service-account-name>@<project-id>.iam.gserviceaccount.com
```
Please note that you should replace `<project-id>`, `<yaml-file-path>`, `<service-account-name>`, and `<json-file>` with the actual values or placeholders specific to your use case.


If you want to set the permissions to **start and stop** the deployment separately, please define the following definitions.

```yaml
title: "EMQX Cloud BYOC operation"
description: "The minimum role definition for stopping or starting an EMQX Cloud BYOC deployment"
stage: "GA"
includedPermissions:
- compute.instances.get
- compute.instances.start
- compute.instances.stop
```
:::

::::

## Prepare the Startup Environment

To deploy EMQX Cloud BYOC, you need an Ubuntu 20.04 LTS (AMD64) environment that can be connected to the public network. Either of the following ways works:

- (Recommended) Use the Ubuntu 20.04 LTS image to create a virtual machine instance in the cloud account. The memory of the instance must be more than 1 GiB.
- Use a local Ubuntu 20.04 LTS environment.

## Domain Name and Certificate

Prepare a domain name and TLS/SSL certificate for the EMQX service in advance. EMQX Cloud BYOC supports custom one-way TLS/SSL authentication and only supports specifying TLS/SSL certificates during the deployment.

::: warning
The certificate needs to be a CA-signed certificate. Please refer to the [TLS/SSL Configuration for BYOC Plan](../deployments/byoc_ssl.md) for TLS/SSL certificate format requirements.
:::


## BYOC License

Prepare the EMQX Cloud BYOC license. You can contact sales to apply for a BYOC license. Our sales team will determine the license specifications based on the number of devices connected and the number of Pub&Sub transactions per second (TPS).