# 产品定价

我们提供了多种灵活的产品规格，支持在全球主流的公有云上部署专属于您的全托管 MQTT 服务。

## 产品版本

EMQ X Cloud 分为基础版、专业版和旗舰版三个版本。

![edition](./_assets/product_edition.png)

- 基础版：适用于 MQTT 协议或 EMQ X Broker 产品的学习和体验，及轻量级物联网应用的开发。基础版提供 30 天免费试用。
- 专业版：适用于构建关键任务的物联网应用，本版本提供了数据持久化，消息分发，VPC 对等连接等高级功能。专业版提供 14 天免费试用。
- 旗舰版：适用于企业级物联网平台的构建，提供多地域及独享硬件部署的支持，并增加了设备管理、设备影子、物模型等功能。



## 计费项目

EMQ X Cloud 按产品版本、实例规格与消息传输网络流量计费。不限制消息条数，API调用次数与规则引擎的使用。您可根据您的业务情况选择对应的产品和规格，当业务扩张时也确保成本仍然清晰可控。

EMQ X Cloud 的计费由两部分组成：

| 项目     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| 基础费用 | 根据部署时所选择的产品版本和实例规格（最大连接数、消息 TPS）对应的小时单价计算出的实例基础费用。实际使用中该部分费用仅跟时长相关，不会因为用量（连接数、消息 TPS）的变动而变动。 |
| 流量使用 | 各实例规格均包含了一定量的免费流量。赠送的流量当月有效，如有剩余月底自动清空。当设备通信超出赠送的流量后超出部分将收取流量费用。 |

创建部署时 EMQ X Cloud 会根据您的实例规格选择情况估算使用成本，在正式部署前您可以在确认页面查看到预估价格。

::: danger
注意: 由于实际使用情况不同，估计成本与实际成本之间可能存在差异。
:::



### 计费周期

EMQ X Cloud **每小时**统计核算一次上小时内账户消费情况（小时账单）并从余额扣费，然后累加到当月消费（月账单），您可以前往 [账单页面](<https://cloud.emqx.com/console/billing/overview>) 查看详细扣费信息



### 欠费说明

余额不足时 EMQ X Cloud 将发送通知邮件到注册邮箱，期间提供一定数额透支额度，透支额度耗尽后将停止并删除您现有部署实例，造成的影响包括：

- 保留追回透支欠款的权利
- 清空部署运行数据，**丢失的数据无法恢复**。

::: danger
注意: 透支额度默认为 10 元，您可以联系所属商务经理或者提交工单来提升额度
:::

## 价格详情

<table>
   <tr>
      <th>版本</th>
      <th>规格</th>
      <th>基础费用</th>
      <th>赠送流量</th>
      <th>超出流量单价</th>
   </tr>
   <tr>
      <td rowspan="3">基础版</td>
      <td>1,000 连接 / 最高 1,000 TPS</td>
      <td>¥0.68/小时 起</td>
      <td rowspan="3">100G/月</td>
      <td rowspan="7">￥1.5/GB</td>
   </tr>
   <tr>
      <td>5,000 连接 / 最高 5,000 TPS</td>
      <td>￥1.28/小时 起</td>
   </tr>
   <tr>
      <td>1,0000 连接 / 最高 5,000 TPS</td>
      <td>￥1.68/小时 起</td>
   </tr>
   <tr>
      <td rowspan="5">专业版</td>
      <td>5,000 连接 / 最高 10,000 TPS</td>
      <td>￥2.18/小时 起</td>
      <td rowspan="2">100G/月</td>
   </tr>
   <tr>
      <td>10,000 连接 / 最高 20,000 TPS</td>
      <td>￥3.99/小时 起</td>
   </tr>
   <tr>
      <td>50,000 连接 / 最高 50,000 TPS</td>
      <td>￥10.99/小时 起</td>
      <td rowspan="2">1T/月</td>
   </tr>
   <tr>
      <td>100,000 连接 / 最高 100,000 TPS</td>
      <td>￥19.99/小时 起</td>
   </tr>
   <tr>
      <td>>100,000 连接</td>
      <td>￥19.99/小时 起</td>
      <td colspan="2" align="center">联系商务</td>
   </tr>
   <tr>
      <td>旗舰版</td>
      <td>无限制</td>
      <td colspan="3" align="center">联系商务</td>
   </tr>
</table>


::: danger
注意：根据所选的公有云平台及部署地域的不同，价格可能存在差异。实际价格以部署页面显示价格为准。
:::

## 功能详情

<table>
  <tr>
      <th></th>
      <th>基础版</th>
      <th>专业版</th>
      <th>旗舰版</th>
    </tr>
   <tr>
      <td>完整 MQTT 支持</td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">支持 MQTT v3.1, v3.1.1, v5.0 协议版本</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">支持 MQTT over WebSocket</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>MQTT QoS 级别</td>
      <td>QoS 0, 1, 2</td>
      <td>QoS 0, 1, 2</td>
      <td>QoS 0, 1, 2</td>
   </tr>
   <tr>
      <td>企业 SSL 证书</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>MQTT 用户名与密码认证</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>客户端和主题级别的 ACL 设置</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>消息分发</td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">消息重发布</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">消息桥接</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Webhook</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Kafka</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">RabbitMQ</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">RocketMQ</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Pulsar</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>数据持久化</td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MySQL</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">PostgreSQL</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MongoDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Redis</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Cassandra</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">DynamoDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">ClickHouse</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">OpenTSDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">InfluxDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">TimescaleDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Oracle DB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">SQL Server</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">DolphinDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">TDengine</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>架构设计咨询</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>项目集成咨询</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>设备管理</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>设备影子</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>边缘设备管理</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>集群</td>
      <td>&#10007</td>
      <td>单地域集群</td>
      <td>多地域集群</td>
   </tr>
   <tr>
      <td>最大连接数</td>
      <td>10,000</td>
      <td>100,000</td>
      <td>无限制</td>
   </tr>
   <tr>
      <td>支持裸金属服务器</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>VPC 对等连接</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>SLA</td>
      <td>99%</td>
      <td>99.99%</td>
      <td>99.99%</td>
   </tr>
   <tr>
      <td>客户支持</td>
      <td>8/5</td>
      <td>24/7</td>
      <td>24/7</td>
   </tr>
</table>
