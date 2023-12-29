# Data Integration (Beta) Overview

::: tip 

This section introduces the Data Integration (Beta) feature for Serverless deployments. If your deployment is a Dedicated version, refer to [Data Integration (Dedicated)](../rule_engine/introduction.md). 

:::

As a fully managed MQTT message cloud service, EMQX Cloud connects Internet of Things (IoT) devices via the MQTT protocol and delivers messages in real time. Building on this foundation, Data Integration enhances EMQX Cloud's capability of connecting with other cloud resources, enabling seamless integration of devices with other business systems. EMQX Cloud Data Integration not only provides a clear and flexible "configurable" architecture solution but also simplifies the development process. It improves user availability, reduces the coupling between business systems and EMQX Cloud, and provides a better infrastructure for data forwarding.

![data_integration_intro](./_assets/integration_intro_01.png)

## How It Works

EMQX Cloud Data Integration is an out-of-the-box feature. Devices connect to Cloud Serverless deployments via the MQTT protocol and send message streams and device events. With the built-in rules, the received message data is processed by pre-defined rules, and then the rules trigger an action to forward the processed data to cloud resources through configured connectors. You can easily create connectors and rules, and add actions to the rules on the Data Integration page of your deployment without any coding work.

### [Connectors](./connectors.md)

Connectors help to connect to the cloud service products you purchase from the cloud platform, which can be message queue services like Kafka or storage services like RDS. A "connector" is equivalent to the "resource" of the data integration for the Dedicated version, providing a way to connect to a cloud service.

### [Rules](./rules.md)

Rules describe "where data comes from" and "how to filter and process data." Rules use SQL-like statements to write custom data and can use SQL testing to simulate exported data. To learn and understand how to write rule SQL, refer to [Rule SQL Writing](https://docs.emqx.com/en/enterprise/v4.2/rule/rule-engine.html#sql-%E8%AF%AD%E5%8F%A5).

### [Actions](./rules.md)

Actions determine "where the processed data goes." A rule can correspond to one or more actions, and actions need to be set with defined connectors, which means where the data is sent.

## Creation Process

The following is the basic process for creating data integrations:

![data_integration_intro](./_assets/integration_intro_02.png)

1. Create a connector. You can select the service you need to connect to from the Data Integration initial page in your deployment and configure the connector.
2. Create a rule to process the data collected from the device. The rule can collect and process data the way you want using SQL statements.
3. Attach actions to the rule. The processed data will be forwarded to the cloud service through the configured connector when the rule triggers an action.
4. Test whether the created data integration can run correctly.


## Data Integration Beta Statements

The data integration feature has been set for a Beta testing period, ending on February 29, 2024. During the Beta period, data integration is free to use and will not be billed. After the trial period ends, a free quota for data integration will be provided: 1 million rule actions per month. Any usage beyond the free quota will be charged at $0.25 per million rule actions.

During the Beta period, the limits on the number of connectors, rules, and actions that can be created for data integration are as follows:

| Quota Name                                       | Amount |
| ------------------------------------------------ | ------ |
| Number of Connectors that can be Created         | 2      |
| Number of Rules that Can Be Created              | 4      |
| Number of Associated Actions Under a Single Rule | 1      |
