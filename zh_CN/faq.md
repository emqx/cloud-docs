# FAQ

## 产品

### 什么是 EMQ X Cloud？

EMQ X Cloud 是由 EMQ 团队提供的 EMQ X 在线 SaaS 服务。

在过去的几年里，EMQ 为众多客户提供了成熟的 MQTT 物联网消息中间件及物联网平台相关支持服务，这期间我们积攒了丰富的物联网平台设计、运维管理实践经验。在此基础上我们推出物联网平台公有云服务 EMQ X Cloud，提供一站式运维代管、独有隔离环境的 EMQ X 接入平台服务。

EMQ X Cloud 为应用程序及设备提供安全可靠的双向通信能力，在支持大规模集群海量设备连接的基础上同时提供了其他增值能力，如设备管理、规则引擎、数据持久化与 Kafka 数据桥接等，覆盖了各类 IoT 应用场景并保留了私有化定制拓展能力。

### 什么是 EMQ X Cloud 部署?

部署是由 EMQ X Cloud 托管的 EMQ X Enterprise 集群

### 什么是 EMQ X ?

EMQ X (Erlang/Enterprise/Elastic MQTT Broker) 是基于 Erlang/OTP 平台开发的开源物联网 MQTT 消息服务器。

## 部署

### 是否可以延长免费试用部署时长？

可以。

如果您有特殊的使用需求，或者其他使用情况，可以提[工单](contact.md)或发送邮件(cloud@emqx.io)与我们取得联系，我们会在 24 小时之内回复。

### 支持那些协议连接？

EMQ X Cloud 部署仅支持 MQTT over TLS/SSL, Websockets over TLS/SSL 协议连接。

如需其他协议支持，您可以提[工单](contact.md)或发送邮件(cloud@emqx.io)与我们取得联系

### 我如何连接到部署？

可以通过 [MQTTX 客户端](https://mqttx.app)进行连接。

也可以通过 SDK 进行连接，详见：[连接到部署](connect_to_deployments/README.md)

### 是否支持 API 调用?

支持。

EMQ X 提供了 HTTP API 以实现与外部系统的集成，例如查询客户端信息、发布消息和创建规则等。

更多关于 API 的使用方法，可以前往指南 —— [REST API](api.md)

### 如何保证我的部署连接安全？

可以通过配置 TLS/SSL 证书实现加密通信。

配置方法详见[配置 TLS/SSL](deployments/tls_ssl.md)

### 是否支持单向 TLS/SSL 认证?

支持。

配置方法详见[配置 TLS/SSL](deployments/tls_ssl.md)

### 是否支持双向 TLS/SSL 认证?

支持。

配置方法详见[配置 TLS/SSL](deployments/tls_ssl.md)

### 是否支持自定义签名TLS/SSL 认证?

支持。

配置方法详见[配置 TLS/SSL](deployments/tls_ssl.md)

### 如何与我现有系统对接？

您可以使用规则引擎与您现有功能做对接，详情查看[消息存储](messages/README.md)

## 账单
### 如何计费？

EMQ X Cloud 按集群实例规格与消息传输网络流量收费，而非消息条数，不限 API 与规则引擎的使用。

详细的收费规则，可以查看[产品定价](pricing.md)

### 如何充值？

在 EMQ X Cloud 控制台，`财物管理` -> `概览` 的账户余额处点击 `充值` 按钮，输入充值金额。

目前 EMQ X Cloud 支持 `支付宝`、`微信` 进行充值。

### 如何获取到代金券？

如您需要体验独享部署所有功能，您可以提交[工单](contact.md)或发送邮件(cloud@emqx.io)与我们取得联系，我们会依据您的业务需求，发放一定数额代金券

### 是否支持包年包月付费？

支持，详情请提交工单咨询

### 如何获取发票？

打开 [EMQ X 控制台](https://cloud.emqx.io/console)，点击 `财物管理` -> `发票` -> `申请开票`