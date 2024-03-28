# Data Integration Overview

As a fully managed MQTT message cloud service, EMQX Cloud connects Internet of Things (IoT) devices via the MQTT protocol and delivers messages in real time. Building on this foundation, Data Integration enhances EMQX Cloud's capability of connecting with other cloud resources, enabling seamless integration of devices with other business systems. EMQX Cloud Data Integration not only provides a clear and flexible "configurable" architecture solution but also simplifies the development process. It improves user availability, reduces the coupling between business systems and EMQX Cloud, and provides a better infrastructure for data forwarding.

![data_integration_intro](./_assets/integration_intro_01.png)

## How It Works

In Serverless deployments, as devices or applications establish connections, the MQTT broker routes the messages. Upon arrival, these messages are processed by the Rule Engine, a powerful component that utilizes SQL statements for data manipulation. This processed data is then forwarded to the target service by an "Action". Actions are categorized into two types: "Sink", for sending data to a service, and "Source", for receiving data from a service. Presently, the Data Integration feature of the Serverless deployment primarily operates in "Sink" mode, facilitating the seamless integration of data into various cloud services.

### [Connectors](./connectors.md)

A connector serves as the underlying connection channel for Sink/Source, used to connect to the cloud service products you purchase from the cloud platform. The cloud service products can be message queue services like Kafka or storage services like RDS. 

### [Rules](./rules.md)

Rules describe "where data comes from" and "how to filter and process data." Rules use SQL-like statements to write custom data and can use SQL testing to simulate exported data. To learn and understand how to write rule SQL, refer to [Rule SQL Writing](https://docs.emqx.com/en/enterprise/v4.2/rule/rule-engine.html#sql-%E8%AF%AD%E5%8F%A5).

### [Actions](./rules.md)

Actions determine "where the processed data goes." A rule can correspond to one or more actions, and actions need to be set with defined connectors, which means where the data is sent.

## Work Flow

The following is the basic process for creating data integrations:

![data_integration_intro](./_assets/integration_intro_02.png)

1. Create a connector. You can select the service you need to connect to from the Data Integration initial page in your deployment and configure the connector.
2. Create a rule to process the data collected from the device. The rule can collect and process data the way you want using SQL statements.
3. Attach actions to the rule. The processed data will be forwarded to the cloud service through the configured connector when the rule triggers an action.
4. Test whether the created data integration can run correctly.

## Network Setting Required by Deployments

The data integration function in different deployments requires different levels of data source access and networking.

**Serverless Deployment**

- Data sources only support public network access. Therefore, before creating a data source, you need to ensure the data source has the capability of public network access and open the security group.
- Only supports Kafka and HTTP Server types of data integration.

**Dedicated Deployment**

- It is recommended to access data sources through an internal network. Therefore, before creating, you need to configure [VPC peering](../deployments/vpc_peering.md) first and also open the security group.
- If you need to access it through the public network, you can enable a [NAT gateway](../vas/nat-gateway.md).

**BYOC Deployment**

- It is recommended to access data sources through an internal network to improve network security and performance. Before creating, you need to configure a peering connection between the VPC where the resources are located and the VPC where the BYOC deployment is located in the public cloud console, and also open the relevant security group. For related steps, please refer to the [Create VPC Peering Connections](../deployments/byoc_vpc_peering.md) section.
- If you need to access resources through the public network, please configure a NAT gateway for the VPC where the BYOC deployment is located in your public cloud console.

## Pricing and Usage Limits

EMQX Cloud provides users with a free quota for data integration: up to 1 million rule action executions per month. Should your usage exceed this allocation, a nominal fee of $0.25 is applied for each additional million rule action executions. 

To maintain optimal performance and manageability, EMQX Cloud imposes the following constraints on the creation of connectors, rules, and actions within each deployment:

| Category                    | Maximum Allowed |
| --------------------------- | --------------- |
| Total Connectors            | 2               |
| Total Rules                 | 4               |
| Actions Associated Per Rule | 1               |
