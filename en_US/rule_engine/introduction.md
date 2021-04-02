# Overview

The EMQ X Cloud Rule Engine (abbreviated as the Rule Engine) is used to configure the rules for handling and responding to EMQ X message flows and device events. The rule engine not only provides a clear and flexible "configurable" business integration solution, but also simplifies the business development process, improves user usability, and reduces the coupling degree between the business system and EMQ X Cloud. It also provides a superior infrastructure for customization of EMQ X Cloud's proprietary capabilities.

![rule_engine](../rule_engine/_assets/rule_engine.png)

In EMQ X Cloud, using the rule engine has the following requirements:

- For free trial deployments and shared deployments: Access to resources such as databases only supports public network access, so you need to ensure that resources have public network access capability and that security groups are open before creating resources.
- For dedicated deployments: Access to resources such as databases only supports Intranet access, so you need to configure a VPC peering connection and open security groups before creating resources.

## [Rule Management](./rule.md)

The rule engine not only provides a clear and flexible "configurable" business integration solution, simplifies the business development process, improves user usability, and reduces the coupling degree between the business system and EMQ X, but also provides a superior infrastructure for EMQ X's proprietary functionality customization.

## [Resource Management](./resource.md)

EMQ X Cloud resources are used for rule engine response actions, before which you need to ensure that the deployment status is running.

## [Write Rules Using SQL](https://docs.emqx.io/en/broker/v4.3/rule/rule-engine.html#sql-statement)

Learn and understand how to use SQL to write rules.