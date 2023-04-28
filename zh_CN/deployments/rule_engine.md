# 简介

EMQX Cloud Rule Engine (以下简称数据集成) 用于配置 EMQX 消息流与设备事件的处理、响应规则。数据集成不仅提供了清晰、灵活的「配置式」的业务集成方案，简化了业务开发流程，提升用户易用性，降低业务系统与 EMQX Cloud 的耦合度；也为 EMQX Cloud 的私有功能定制提供了一个更优秀的基础架构。

![rule_engine](../rule_engine/_assets/rule_engine.png)

在 EMQX Cloud 中，使用数据集成会有如下要求和限制：

- 基础版部署
  - 资源仅支持公网访问，因此在创建资源前您需要确保资源具有公网访问能力，同时开放安全组。
  - 资源类型仅开放 Webhook 和 MQTT 桥接。
- 专业版部署
  - 资源仅支持内网访问，因此在创建资源前需先配置 VPC 对等连接，同时开放安全组。
- BYOC 部署
  - 资源仅支持内网访问，因此在创建资源前需先配置 VPC 对等连接，同时开放安全组。


## [规则管理](../rule_engine/rules.md)

数据集成不仅提供了清晰、灵活的“配置式”的业务集成方案，简化了业务开发流程，提升用户易用性，降低业务系统与 EMQX 的耦合度；也为 EMQX 的私有功能定制提供了一个更优秀的基础架构。



## [资源管理](../rule_engine/resources.md)

EMQX Cloud 资源用于数据集成响应动作， 在此之前您需要确保部署状态为**运行中**。



## [规则 SQL 编写](https://docs.emqx.cn/broker/v4.2/rule/rule-engine.html#sql-%E8%AF%AD%E5%8F%A5)

学习和了解规则 SQL 编写

