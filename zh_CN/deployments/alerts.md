# 部署告警

EMQ X Cloud 提供完善的告警提醒、告警集成，允许用户以及运维人员根据这些告警及时做出相应的处理。EMQ X Cloud 提供如下告警事件：

![alert_integrations](./_assets/alerts_info.png)



## 告警事件

在这里您可以查看到部署产生的告警信息，EMQ X Cloud 提供如下告警事件：

| 类型                      | 级别     | 信息                                                   | 解决                                            |
| ------------------------ | -------  | ----------------------------------------------------- | ----------------------------------------------- |
| 连接数过高                 | warning  | 部署连接数过高：{当前连接数}                              | 升级部署规格                                      |
| 流量使用过高                | warning | 过去24小时内部署流量过高：{过去24小时流量总数}               | 检查设备流量是否正常，正常则需升级部署规格             |
| 证书过期告警                | warning | 部署证书将在 {num} 天后过期，请及时更新!                    | 及时更新部署证书                                  |
| 客户端认证失败              | warning | 部署出现大量认证失败的客户端连接                            | 检查客户端认证配置是否正确                          |
| 客户端 ACL 认证失败         | warning | 部署出现大量 ACL 认证失败的客户端消息发布                    | 检查部署访问控制配置是否正确                         |
| 部署非标准 MQTT 协议连接     | warning | 部署出现大量非标准 MQTT 协议的客户端连接                    | 检查客户端连接使用的 MQTT 协议是否为标准 MQTT 协议     |
| 部署 QoS 1 消息丢弃告警      | warning | 部署由于客户端长期离线或主题未被订阅导致大量 QoS 1 消息丢弃    | 客户端设置 clean session 为 False 或客户端设置自动重连 |
| 部署 TPS 超过限制告警        | warning | 部署超过限制请及时调整客户端发送速率，否则您将无法发送新的消息   | 及时调整客户端发送速率，使发送速率小于部署限制的 TPS |
| vpc 对等连接异常            | error   | Vpc 对等连接状态异常：{状态}                               | 检查部署对等账户对等连接账户                         |
| 规则引擎 xxx 资源异常        | error   | 部署规则引擎 xxx 资源异常                                | 检查部署规则引擎中 xxx 资源配置是否正确                |


![alert_integrations](./_assets/alert_events.png)



## 告警集成

EMQ X Cloud 目前提供 邮箱和 PagerDuty 事件告警集成。如您需要其他告警集成方式，可以向我们提工单或发送邮件。



### 发送至邮箱

您可以在告警集成，发送至邮箱中添加接受告警信息的邮箱，当部署产生告警时会第一时间向邮箱发送告警提醒。

![email_alert](./_assets/email_alert.png)



### PagerDuty 集成
将告警信息发送到 PagerDuty 的事件，并且 PagerDuty 指定通知方法。

1. 在 PagerDuty 创建告警服务
  ![pagerduty_service](./_assets/pagerduty_service.png)

2. 添加 api v2 集成，并复制集成秘钥
  ![pagerduty_service](./_assets/pagerduty_integrations_api.png)

3. 在 EMQ X Cloud 上填写集成秘钥
  ![pagerduty_alerts](./_assets/pagerduty_alerts.png)