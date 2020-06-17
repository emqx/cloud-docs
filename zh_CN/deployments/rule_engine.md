# 规则引擎
EMQ X Cloud 规则引擎用于配置 EMQ X 消息流与设备事件的处理、响应规则。规则引擎不仅提供了清晰、灵活的 "配置式" 的业务集成方案，简化了业务开发流程，提升用户易用性，降低业务系统与 EMQ X 的耦合度。

> 注意: 如果您刚接触 EMQ X 规则引擎，您可以前往 [EMQ X 规则引擎](<https://docs.emqx.io/broker/latest/cn/rule/rule-engine.html>) 了解更多规则引擎使用方法。



## 创建您的第一条规则引擎

在创建规则引擎之前您需要确保部署状态为 `running `

1. 登录 [EMQ X Cloud 控制台](https://cloud.emqx.io/console/)

2. 点击所需连接的部署，您将进入部署详情页面

3. 点击规则引擎， 您将跳转到 规则引擎 页面

4. 点击左侧创建按钮

   ![deployment_connections](../_assets/deployments/start_rule_engine.png)

5. 新建一条测试 SQL，点击测试按钮

   ![deployment_connections](../_assets/deployments/test_rule_engine_sql.png)

6. 添加动作

   > 注意： 添加动作之前，您需要保证已添加 [VPC 对等连接](), 并已经[创建资源](./)

   ![deployment_connections](../_assets/deployments/add_action.png)



