# EMQ X Cloud 设备管理/物联网平台集成指南

## 前言

本文档提供 EMQ X Cloud 集成用户自己的设备管理系统或物联网平台，进行设备认证、设备行为和状态管理、消息数据集成管理的指导方案。包含内容如下：

- **设备认证信息管理:** 平台通过 REST API 进行认证信息增、删、查、改，API 使用参考[管理认证数据](https://docs.emqx.cn/cn/cloud/latest/api.html#管理认证数据)。
- **设备在线状态查看:** 
  - 平台通过 REST API 获取在线设备列表，查询设备是否在线，API 使用参考[客户端](https://docs.emqx.cn/cn/cloud/latest/api.html#客户端)。
  - 平台通过规则引擎在设备上线、下线时改写私有数据库中设备的状态或发送到自建服务（Web 服务）。
- **设备离线告警:** 设备离线时通知平台，判断是否需要告警。
- **设备上下线历史记录:** 
  - 平台通过规则引擎在设备上线、下线时将上下线信息写入私有数据库或发送到自建服务（Web 服务）。
- **设备发布订阅 ACL 权限管理:** 平台通过 REST API 对 ACL 权限进行增、删、查、改，API 使用参考[发布订阅 ACL](https://docs.emqx.cn/cn/cloud/latest/api.html#发布订阅-acl)。
- **在线设备踢下线:** 平台将在线设备踢下线。
- **代理订阅:** 平台通过 REST API 为**在线设备**订阅或取消订阅主题，API 使用参考[主题订阅](https://docs.emqx.cn/cn/cloud/latest/api.html#主题订阅)。
- **向设备发布消息:** 平台通过 REST API 或 MQTT 接入向指定主题发布消息，支持批量操作，API 使用参考[消息发布](https://docs.emqx.cn/cn/cloud/latest/api.html#消息发布)。
- **获取设备消息进行桥接/存储:** 通过规则引擎，将设备事件（上下线、订阅/取消订阅、消息发布）以及消息数据存储至私有数据库（主流关系/非关系，各类时序数据库）、消息队列 Kafka 以及自建 Web 服务。
- **消息收发、连接数等业务统计:** 通过 REST API 获取相关统计信息，API 使用参考[统计指标](https://docs.emqx.cn/cn/cloud/latest/api.html#统计指标)。

​            ![img](https://static.emqx.net/images/a912409d8db446e61567c4749946023c.png)            

​																				图 1 EMQ X Cloud 集群架构示意图

在 EMQ X Cloud 上，用户仅需数分钟即可创建高可用、独享实例的 EMQ X 集群，立即开始原型设计与应用开发而无需关注后续的运维工作。产品上线后，集群可进行不停机扩容以应对业务增长带来的容量扩张，保证可用性的同时最大化节省使用成本。

与其它大部分公有 IoT Hub 云平台不同的是，EMQ X Cloud 提供独有隔离环境的 MQTT 5.0 服务器集群，拥有显著的成本优势及更少的使用限制，在消息量较多的情况下 EMQ X Cloud 仍能保持较低的使用成本。通过对等网络等功能，可以实现对接用户在私有网络中部署的大数据分析、消息存储以及其他业务系统。



## 设备认证信息管理

平台通过 REST API 进行认证信息增、删、查、改，将平台端的操作运用在 EMQ X Cloud 端。

​            ![img](https://static.emqx.net/images/54741111f28d67400944f8b436e5e145.png)            



## 设备在线状态查看

获取设备在线状态，EMQ X Cloud 本身可以查询在线状态，也可以在平台私有数据库内记录在线状态。

- 平台通过 REST API 获取在线设备列表，查询设备是否在线。

​            ![img](https://static.emqx.net/images/54741111f28d67400944f8b436e5e145.png)            

- 平台通过规则引擎在设备上线、下线时改写私有数据库中设备的状态或发送到自建服务（Web 服务）。

​            ![img](https://static.emqx.net/images/45f8093affa14ad31e2482eb7b706e29.png)            

## 设备离线告警

见下方 设备上下线历史记录。



## 设备上下线历史记录

平台通过规则引擎在设备上线、下线时将上下线信息写入私有数据库或发送到自建服务（Web 服务）。

接收到设备下线通知后，平台可以做离线告警相关业务。

​            ![img](https://static.emqx.net/images/45f8093affa14ad31e2482eb7b706e29.png)            



## 设备发布订阅 ACL 权限管理

能够针对设备或主题设置 ACL 权限，提升系统安全性。

平台通过 REST API 对 ACL 权限进行增、删、查、改。

​            ![img](https://static.emqx.net/images/1a9342cf4189088082abd5807b43ed98.png)            



## 在线设备踢下线

对于异常设备或者需要强制离线的设备，平台可以使用 REST  API 将在线设备踢下线。

​            ![img](https://static.emqx.net/images/5da6e976718b1a21b9468c777a11624c.png)            



## 代理订阅

平台通过 REST API 为**在线设备**订阅或取消订阅主题，无需设备主动发起订阅，无需升级、烧录设备的软件数据。

​            ![img](https://static.emqx.net/images/5da6e976718b1a21b9468c777a11624c.png)            



## 向设备发布消息

平台通过 REST API 或 MQTT 接入向指定主题发布消息，支持批量操作。

​            ![img](https://static.emqx.net/images/cc5cdfaafcd34bd7771cbeb5048537ac.png)            



## 获取设备消息进行桥接/存储

通过规则引擎，将设备事件（上下线、订阅/取消订阅、消息发布）以及消息数据存储至私有数据库（主流关系/非关系，各类时序数据库）、消息队列 Kafka 以及自建 Web 服务。



​            ![img](https://static.emqx.net/images/a58e488c3f168e6df2a39cdca75d79f6.png)            



## 消息收发、连接数等业务统计

通过 REST API 获取相关统计信息，包括在线设备、订阅主题、主题、消息收发等数量，以及消息收发条数等统计指标。

​            ![img](https://static.emqx.net/images/a40b740cad9c6980b17366b2635129d2.png)            



## 接入示例代码

您可以前往 [连接到部署](./connect_to_deployments/introduction.md)了解更多 MQTT 客户端库接入 EMQ X Cloud 示例。



## 其他功能

集成细节以及其他集成功能需求您可以提[工单](./contact.md)或发送邮件（cloud@emqx.io）咨询
