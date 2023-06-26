# Deployment Prerequisite

Before deploying EMQX Cloud BYOC, please make sure to complete the following preparations:

- Familiarize yourself with the basic concepts of public cloud services and network structures, such as VPC, subnet, ECS, etc.
- Have a public cloud account and an EMQX Cloud account.
- Prepare relevant cloud resources and cloud account permissions.
- Set up the deployment bootstrap environment.
- Prepare an EMQX Cloud BYOC license.
- Prepare a domain name and the corresponding TLS/SSL certificate for EMQX service.

## Account Preparation

EMQX Cloud BYOC will create a deployment in your cloud account. If you do not have a corresponding public cloud account, you can create an account according to the official documentation of the cloud platform you preferred:

- [Create a Google Cloud Platform account](https://cloud.google.com/docs/get-started)

[//]: # (- [Create an AWS account in your organization]&#40;https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_create.html&#41;  )

Currently, BYOC supports the following public clouds and regions. If you need support from other cloud service providers or regions, you can submit a ticket or email ([cloud-support@emqx.io](mailto:cloud-support@emqx.io)) to contact us.

| Cloud Provider    | Region                                       |
|-------------------|----------------------------------------------|
| Google Cloud      | us-east1 (South Carolina), us-west1 (Oregon) |
| AWS (coming soon) |                                              |

In addition, you also need an EMQX Cloud account to complete the deployment. If you have not registered, please go to the [EMQX Cloud account registration page](https://accounts.emqx.com/signup) to register an account.

## Resources and Permissions

EMQX Cloud BYOC needs to create various cloud resources and services in your cloud account. Please make sure that the relevant cloud account has reserved enough resources quota and completed the setting of relevant permissions.

### Resource Quotas

The following table shows the cloud resources and services required for EMQX Cloud BYOC deployment. If the resources in the current account are insufficient, please contact the cloud account administrator to increase the relevant service quotas.

::: tip

Your cloud administrator can quickly view the usage and quotas of resources and services in the cloud quota .
- [Quotas on Google Cloud](https://cloud.google.com/docs/quota_detail/view_manage)

[//]: # (- [AWS service quotas]&#40;https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html&#41;)

:::

:::: tabs

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

### IAM Permissions

To create the cloud resources in your cloud account, your role needs to have the necessary IAM permissions to run commands. You need ask your cloud administrator to assign sufficient permission for creating BYOC deployments and generate the corresponding credential.

:::: tabs

::: tab "Google Cloud"

To create a custom role using the gcloud CLI, you can utilize the provided role definition by following the steps outlined in the [Creating Custom Roles](https://cloud.google.com/iam/docs/creating-custom-roles) documentation. After creating the custom role, you can bind it to a service account. Finally, generate the service account key.

1. Create a YAML file with the following definitions for your custom role. We provide two separate roles: one for creating a BYOC deployment, and another for deleting a BYOC deployment.
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
:::

::::



## Prepare the Startup Environment

To deploy EMQX Cloud BYOC, you need an Ubuntu 20.04 LTS (AMD64) environment that can be connected to the public network. You can:

- (Recommended) Use the Ubuntu 20.04 LTS image to create a virtual machine instance in the cloud account.
- Use a local Ubuntu 20.04 LTS environment.

## Domain Name and Certificate

Prepare a domain name and TLS/SSL certificate for the EMQX service in advance. We support custom one-way TLS/SSL authentication and only support specifying TLS/SSL certificates during deployment. The certificate can be a self-signed certificate or a CA-signed certificate. Please refer to the TLS/SSL Configuration-Certificate Requirements for SSL certificate format requirements.

## BYOC License

Prepare the EMQX Cloud BYOC license. You can contact sales to apply for a BYOC license. Our sales team will determine the license specifications based on the number of devices connected and the number of Pub&Sub transactions per second (TPS).