# Overview

The EMQ X Cloud Rule Engine (abbreviated as the Rule Engine) is used to configure the rules for handling and responding to EMQ X message flows and device events. The rule engine not only provides a clear and flexible "configurable" business integration solution, but also simplifies the business development process, improves user usability, and reduces the coupling degree between the business system and EMQ X Cloud. It also provides a superior infrastructure for customization of EMQ X Cloud's proprietary capabilities.

![rule_engine](../rule_engine/_assets/rule_engine.png)

In EMQ X Cloud, using the rule engine has the following requirements and restrictions:

- Basic Deployment
    - The resource only supports public access, so you need to ensure that the resource has public access and open security groups before creating the resource.
    - Only Webhook and MQTT bridges are open for the resource type.
- Professional Deployment
    - The resource only supports intranet access, so you need to configure VPC peering before creating the resource and open the security group.

Translated with www.DeepL.com/Translator (free version)
## [Rule Management](../rule_engine/rule.md)

The rule engine not only provides a clear and flexible "configurable" business integration solution, simplifies the business development process, improves user usability, and reduces the coupling degree between the business system and EMQ X, but also provides a superior infrastructure for EMQ X's proprietary functionality customization.

## [Resource Management](../rule_engine/resource.md)

EMQ X Cloud resources are used for rule engine response actions, before which you need to ensure that the deployment status is running.

## [Write Rules Using SQL](https://docs.emqx.io/en/broker/v4.3/rule/rule-engine.html#sql-statement)

Learn and understand how to use SQL to write rules.