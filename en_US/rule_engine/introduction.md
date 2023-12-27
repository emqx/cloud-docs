# Data Integration Overview

The EMQX Cloud Data Integration is used to configure the rules for handling and responding to EMQX message flows and device events. The Data Integrations not only provides a clear and flexible "configurable" architecture solution, but also simplifies the development process, improves user usability, and reduces the coupling degree between the business system and EMQX Cloud. It also provides a superior infrastructure for customization of EMQX Cloud's proprietary capabilities.

::: warning Note
This feature is not available for the Serverless plan
:::

![integration_intro_01](./_assets/integration_intro_01.png)

In EMQX Cloud, using Data Integration has the following requirements:

- Standard Deployment
  - The resource only supports public access, so you need to ensure that the resource has public access and open security groups before creating the resource.
  - Only Webhook and MQTT bridges are open for the resource creation.
- Professional Deployment
  - The resource technically only supports internal network access, so you need to configure [VPC peering](../deployments/vpc_peering.md) before creating the resource and open the security group.
  - If public access is needed in a professional environment, [NAT Gateway](../vas/nat-gateway.md) can offer the abilities.
- BYOC Deployment
  - It is recommended to access resources through an internal network to enhance network security and performance. Before creating resources, you need to configure a peering connection between the VPC where the resources are located and the VPC where the BYOC deployment is located in the cloud platform console. Additionally, you should open relevant security groups. For detailed steps, please refer to the [Create BYOC Deployment - VPC Peering Configuration](../create/byoc.md#vpc-peering-configuration) section.
  - If you need to access resources through the public network, please configure a NAT gateway for the VPC where the BYOC deployment is located in your cloud platform console.

::: tip
Serverless deployments don't support Data Integrations.
:::

## General Flow

The primary dimension of Data Integrations is the resource. A resource is a service provided by the cloud provider. It should already be set in the system architecture. Then choose the specific resource from the browse page.

After the resource is settled, you need to create a rule to handle the data collected from the device. The rule can collect and process data in the way you want by using a SQL clause.

When a rule is tested and created, action needs to be attached to the rule. It will send the data to the target resource.

![integration_intro_02](./_assets/integration_intro_02.png)

## [Resource](https://docs.emqx.com/en/cloud/latest/rule_engine/resources.html#resource-browse-page)

The resource is a cloud service offering that you have purchased from the cloud platform, either a message queue service like Kafka or an RDS storage service.

## [Rule](https://docs.emqx.com/en/cloud/latest/rule_engine/rules.html#create-rules)

The rules describe "where the data comes from" and "how to filter and process the data". The rules use SQL-like statements to customize the written data and can use SQL tests to simulate the exported data.

## [Action](https://docs.emqx.com/en/cloud/latest/rule_engine/introduction.html#action)

Actions solve the problem of "where to send the processed data". A rule can correspond to one or more actions, and the defined resources need to be set in the action, that is, to which service the data will be sent.

## [Write Rules Using SQL](https://docs.emqx.com/en/enterprise/v4.2/rule/rule-engine.html#sql-statement)

Learn and understand how to use SQL to write rules.
