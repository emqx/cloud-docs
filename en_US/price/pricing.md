# Pricing

We offer a variety of flexible product plans to support the deployment of fully managed MQTT services exclusively for you on the leading clouds providers.

## Serverless price detail

| **List**         | **Free quota**                  | **Price**           |
| -------------------- | -------------------------------------------- | ------------------|
| Session       |  1 million session minutes / month     | $ 2.00 per million session minutes                                |
| Traffic     | 1 GB / month              | $ 0.15 / GB              |



**Session:** The number of concurrent sessions (**including persistent sessions**).<br />
**Session minutes:** 1 session minute stands for 1 session to the deployment in the span of a minute or part thereof.<br />
**Traffic:** Both **inbound and outbound** traffic of deployment are measured.


::: tip Tip
Serverless Beta is free to use. We won't charge any session fee or traffic fee.
:::

## Dedicated price detail

<table>
   <tr>
      <th>Plan</th>
      <th>Specification</th>
      <th>Base Fee</th>
      <th>Free Traffic</th>
      <th>Traffic exceeded</th>
   </tr>
   <tr>
      <td rowspan="3">Standard</td>
      <td>1,000 connections / Up to 1,000 TPS</td>
      <td>from $ 0.18/hr</td>
      <td rowspan="3">100G/month</td>
      <td rowspan="7">$ 0.15/GB</td>
   </tr>
   <tr>
      <td>5,000 connections / Up to 5,000 TPS</td>
      <td>from $ 0.5/hr</td>
   </tr>
   <tr>
      <td>10,000 connections / Up to 5,000 TPS</td>
      <td>from $ 0.88/hr </td>
   </tr>
   <tr>
      <td rowspan="5">Professional</td>
      <td>1,000 connections / Up to 1,000 TPS</td>
      <td>from $ 0.36/hr </td>
      <td rowspan="3">100G/month</td>
   </tr>
   <tr>
      <td>5,000 connections / Up to 10,000 TPS</td>
      <td>from $ 0.99/hr</td>
   </tr>
   <tr>
      <td>10,000 connections / Up to 20,000 TPS</td>
      <td>from $ 1.49/hr</td>
   </tr>
   <tr>
      <td>50,000 connections / Up to 50,000 TPS</td>
      <td>from $ 3.99/hr</td>
      <td rowspan="1">1T/month</td>
   </tr>
   <tr>
      <td>>50,000 connections</td>
      <td colspan="3" align="center">Contact us</td>
   </tr>
</table>

**Connections :** The number of clients connecting to the deployment (including disconnected clients that keep session) at the same time. [Retained sessions](https://www.emqx.com/en/blog/mqtt-session), i.e. when the client disconnects, the session remains until the session times out.<br />
**Traffic :** Traffic, including free traffic, measures all traffic flowing out of the deployment.
   - Traffic over VPC Peering or PrivateLink is not measured.
   - Traffic from messages received by the deployment, such as messages sent to the deployment from the clients, is not measured.
   - If the NAT gateway is enabled, outgoing traffic from deployment will be measured.


::: warning Note
Prices may vary depending on the public cloud platform selected and the deployment region. The actual price is based on the price displayed on the deployment page.
:::

## Feature Details

<table>
  <tr>
      <th></th>
      <th>Serverless</th>
      <th>Standard</th>
      <th>Professional</th>
    </tr>
   <tr>
      <td><strong>Cloud Provider</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">AWS</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Azure</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">GCP</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>Protocols</td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MQTT v3.1, v3.1.1, v5.0</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MQTT over WebSocket</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MQTT-SN</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">CoAP</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">LwM2M</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">JT/T808</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>Connection</td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Max number of connections</td>
      <td>1000</td>
      <td>10,000</td>
      <td>Unlimited</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">VPC peering (private network)</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">NAT Gateway</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Internal Load Balance</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>Features</td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MQTT QoS 0, QoS 1, QoS 2</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Retained Message</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Last Will Message</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Shared Subscription</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Username and Password Authentication</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Client and Topic Access control</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Metrics monitor</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Project Management</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Role Authorization</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Subscription Management</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
    <tr>
      <td style="text-indent: 2em;">Invoice</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Custom TLS certificate</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Authentication through external data sources</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Log</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>Data Integrations</td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">SQL based data process</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Republish</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Bridging</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">WebHook</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Kafka</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">RabbitMQ</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">RocketMQ</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Pulsar</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">GCP Pub/Sub</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Azure Event hubs</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MySQL</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">PostgreSQL</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MongoDB</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Redis</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Cassandra</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">DynamoDB</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">ClickHouse</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">OpenTSDB</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">InfluxDB</td>
      <td>&#10007</td>
      <td>&#10007</td>
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
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">SQL Server</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">DolphinDB</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">TDengine</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>Services</td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Uptime SLA</td>
      <td>-</td>
      <td>99.95%</td>
      <td>99.99%</td>
   </tr>
    <tr>
      <td style="text-indent: 2em;">Customer Support</td>
      <td>-</td>
      <td>8/5</td>
      <td>24/7</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Multi-AZ cluster</td>
      <td>&#10003</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
</table>

## 产品计费

我们提供了多种灵活的产品规格，支持在全球主流的公有云上部署专属于您的全托管 MQTT 服务。

## Serverless 计费

EMQX Cloud Serverless 按照部署实际使用量计费，连接实际产生的连接分钟数以及消息产生的流量进行计费。用户每个月开始都会获得一定的免费额度，且都会优先使用免费额度。当某一项免费额度用完之后，此项就会进入计费。


### 名词解释

**连接分钟：** 1个连接分钟为1个客户端连接一分钟的计量单位，不足一分钟以一分钟计算。<br />
**客户端连接：** 为同时在线客户端（**包含保留会话的离线客户端**）总数。[保留会话](https://www.emqx.com/zh/blog/mqtt-session)，即客户端断开连接时，会话仍然保持并保存离线消息，直到会话超时注销。<br />
**流量：** 流量（包含免费流量）指所有**流入部署和流出部署的公网流量**。

### 计费详情

| **计费项**         | **免费额度**                | **计费**           |
| -------------------- | ----------------------- | ------------------|
| 连接       | 每月 1 百万连接分钟      | ¥ 8.00 每一百万连接分钟                                |
| 流量     | 每月 1 GB           | ¥ 1.5 / GB                                 |


### Serverless 价格计算方式

连接费用 = 连接的客户端 * 客户端连接的时间（以分钟计算，不足一分钟以一分钟计算） / 1,000,000 *  8 <br/>
流量费用 = 部署流入和流出的消息产生的流量（byte）/ 1024 / 1024 / 1024 * 1.5

::: tip Tip
假设一个用户24小时之内，有10个小时客户端连接为120，有10个小时客户端连接为20，有4个小时客户端连接为0，则当天的连接分钟数为：120 * 60 * 10 + 20 * 60 * 10 + 0 = 84,000， 如果在免费额度内，则当天的连接费为0；如果免费额度已经用完，则当天的连接费用为 84,000 / 1,000,000 * 8 = 0.672, 四舍五入的价格为 ¥ 0.67。
流量的计算方式同连接。
:::

EMQX Cloud 累积**24小时**的连接分钟数以及流量，在每天的0点进行结算，计入小时账单并从余额中扣费。您可以前往 [账单页面](<https://cloud.emqx.com/console/billing/overview>) 查看详细扣费信息。

### 消费限额
消费限额可以让 Serverless 部署每个月的消费额度都控制在设定值之内，或者当达到时给予提醒。消费限额在创建部署时设置，在部署创建完成之后也可以进行修改。



- 当消费限额设置为 0，部署**只会消耗免费额度**，即每月 1 百万连接分钟和 1 GB 流量。当免费额度用完，部署将被停止。
- 同时您可以设置消费限额 1 - 10000 的整数，并且可以选择当本月部署的消耗达到限额时的动作。可以选择停止部署，或者提醒并且继续计费。如果您选择后者，我们将以邮件的形式发送提醒，部署则会继续运行和计费。
- 当您设置消费限额大于 0，如果您的账户内没有余额，则需要对余额进行充值。
- 注意：如果部署当月产生了消费，即使没有达到消费限额，然而账户余额用完的情况下，部署仍然会被停止。


::: warning
如果您当前已经创建了一个 Serverless (Beta) 部署，部署将在 2023.4.1 自动转化为正式版，部署连接的上限数量变为 1000 个。部署将消耗免费限额，[查看并了解规则](./pricing.md)。同时部署的每月消费限额会默认设置为 0。即当您在对消费限额做任何改动之前，Serverless 部署都不会收取额外的费用。
:::


## 专有版计费

EMQX Cloud 专有版按产品版本、实例规格与消息传输网络流量计费。不限制消息条数，API调用次数与数据集成的使用。您可根据您的业务情况选择对应的产品和规格，当业务扩张时也确保成本仍然清晰可控。

### 名词解释

**连接数：** 连接数为同时在线客户端（**包含保留会话的离线客户端**）总数。[保留会话](https://www.emqx.com/zh/blog/mqtt-session)，即客户端断开连接时，会话仍然保持并保存离线消息，直到会话超时注销。<br />
**基础费用：** 根据部署时所选择的产品版本和实例规格（最大连接数、消息 TPS）对应的小时单价计算出的实例基础费用。实际使用中该部分费用仅跟时长相关，不会因为用量（连接数、消息 TPS）的变动而变动。<br />
**流量:** 流量（包含免费流量）指所有**流出部署的公网流量** 。
   - 通过 VPC 对等连接或私网连接的流量不计算在流量中。
   - 部署接收到的消息的流量（如客户端发送给部署的消息）不计算在流量中。
   - 如果开通了 NAT 网关，流出部署的即为公网流量，将计算在流量中。

**流量费用:** 各实例规格均包含了一定量的免费流量。赠送的流量当月有效，如有剩余月底自动清空。当设备通信超出赠送的流量后超出部分将收取流量费用。

### 计费详情
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
      <td>10,000 连接 / 最高 5,000 TPS</td>
      <td>￥1.68/小时 起</td>
   </tr>
   <tr>
      <td rowspan="5">专业版</td>
      <td>1,000 连接 / 最高 1,000 TPS</td>
      <td>￥1.28/小时 起</td>
      <td rowspan="3">100G/月</td>
   </tr>
   <tr>
      <td>5,000 连接 / 最高 10,000 TPS</td>
      <td>￥2.18/小时 起</td>
   </tr>
   <tr>
      <td>10,000 连接 / 最高 20,000 TPS</td>
      <td>￥3.99/小时 起</td>
   </tr>
   <tr>
      <td>50,000 连接 / 最高 50,000 TPS</td>
      <td>￥10.99/小时 起</td>
      <td rowspan="1">1T/月</td>
   </tr>
   <tr>
      <td>>50,000 连接</td>
      <td colspan="3" align="center">联系商务</td>
   </tr>
</table>

您还可以在[价格页面](https://www.emqx.com/zh/cloud/pricing)获取到不同产品和规格对应部署每小时价格。

::: warning
根据所选的公有云平台及部署地域的不同，价格可能存在差异。实际价格以部署页面显示价格为准。
:::

### 扣费方式

每小时统计核算一次上小时内专有版部署消费情况（小时账单）并从余额扣费，然后累加到当月消费（月账单），您可以前往 [账单页面](<https://cloud.emqx.com/console/billing/overview>) 查看详细扣费信息。

