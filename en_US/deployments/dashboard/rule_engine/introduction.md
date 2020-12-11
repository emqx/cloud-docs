# Introduction

EMQ X Cloud Rule Engine (hereinafter referred to as rule engine) is used to configure EMQ X message stream and device event processing and response rules. The rule engine not only provides a clear and flexible "configurable" business integration solution, simplifies the business development process, improves ease of use,  but also reduces the coupling between the business system and EMQ X, and provides a better infrastructure for private function customization of EMQ X .

In EMQ X Cloud, the rules engine has the following requirements:

- For Free Trial Deployment and Shared Deployment: access to resources such as databases only supports public network access. Therefore, before creating resources, you need to ensure that the resources have public network access capabilities and open security groups.
- For Dedicated Deployment: Access to resources such as databases only supports intranet access, so you need to configure VPC peering connections and open security groups before creating resources.

![rule_engine](./_assets/rule_engine.jpg)


## [Rule](./rule.md)
EMQ X Broker Rule Engine (Hereinafter referred to as rule engine) is used to configure EMQ X Broker message flow and device event processing and response rules.

## [Resource](./resource.md)
EMQ X Cloud resources are used for rule engine response actions.