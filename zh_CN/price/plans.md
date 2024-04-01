# 版本介绍

EMQX Cloud 提供 3 个全托管版本产品，支持在全球主流的公有云上部署专属于您的全托管 MQTT 服务，从独立的开发者到全球化的行业领导者，都能找到合适的方案。

1. **Serverless**：安全、可伸缩的 MQTT 服务，按使用量计费，免费额度以内使用完全免费。最高支持 1000 同时在线连接。
2. **专有版**：部署在独立云环境中的 MQTT 集群服务，支持实时数据处理、数据持久化、消息分发、VPC 对等连接（私有网络）等高级功能。高可用，高性能，是您在生产环境使用的最佳选择。
3. **BYOC**：Bring Your Own Cloud。在您自己的云上部署 EMQX 集群，并交由 EMQX 团队托管。所有数据都将保存在您自己的数据中心，满足公司业务数据私有化的场景需求。

## 各版本功能对比表

<table>
  <tr>
      <th></th>
      <th>Serverless</th>
      <th>专有版</th>
      <th>BYOC</th>
    </tr>
   <tr>
      <td><strong>公有云平台</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">阿里云</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">华为云</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10007</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">腾讯云</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10007</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">亚马逊云科技</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td><strong>协议支持</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">MQTT v3.1, v3.1.1, v5.0</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">MQTT over TCP</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">MQTT over TLS/SSL</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">MQTT over WebSocket</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">MQTT-SN</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">CoAP</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">JT/T808</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td><strong>连接</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">最大连接数</td>
      <td>1000</td>
      <td>无限制</td>
      <td>无限制</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">最大 TPS 上限</td>
      <td>1000</td>
      <td>无限制</td>
      <td>无限制</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">单客户端 TPS 上限</td>
      <td>100</td>
      <td>无限制</td>
      <td>无限制</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">单客户端订阅主题限制</td>
      <td>10</td>
      <td>无限制</td>
      <td>无限制</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">VPC 对等连接（私有网络）</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>可在云平台自行配置</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">私网连接（阿里云）</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>可在云平台自行配置</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">NAT 网关</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>可在云平台自行配置</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">内网 LB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>可在云平台自行配置</td>
   </tr>
   <tr>
      <td><strong>试用/免费额度</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">部署试用</td>
      <td>&#10007</td>
      <td>14 天</td>
      <td>联系商务</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">免费额度</td>
      <td>连接：1百万连接分钟/月<br />流量：1GB/月<br />数据集成：1百万规则动作/月</td>
      <td>流量：最高 1 TB/月</td>
      <td>&#10007</td>
   </tr>
   <tr>
      <td><strong>功能特性</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">QoS 0,1,2</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">消息保留</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">遗嘱消息</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">共享订阅</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">用户名与密码认证</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">客户端&主题访问控制</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">指标监控</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">告警</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">项目管理</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">角色权限管理</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">发票管理</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>联系商务</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">企业 SSL 证书</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">扩展数据源认证与授权</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">日志</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td><strong>数据集成</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">基于 SQL 的数据处理</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">消息重发布</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">消息桥接</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">HTTP Server</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">Kafka</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">RabbitMQ</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">RocketMQ</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">Pulsar</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">MySQL</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">PostgreSQL</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">MongoDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">Redis</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">Cassandra</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">DynamoDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">ClickHouse</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">OpenTSDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">InfluxDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">TimescaleDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">Oracle DB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">SQL Server</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">TDengine</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td><strong>增值服务</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">流量包</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10007</td>
   </tr>
   <tr>
      <td><strong>服务支持</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">SLA 等级</td>
      <td>99.9%</td>
      <td>99.99%</td>
      <td>99.99%</td>
   </tr>
    <tr>
      <td style="text-indent: 1em;">客户支持</td>
      <td>8 x 5</td>
      <td>24 x 7</td>
      <td>24 x 7</td>
   </tr>
    <tr>
      <td style="text-indent: 1em;">多可用区部署</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
</table>

## 支持云服务商和地区

### Serverless
| 平台   | 区域                   |
| ------ | --------------- |
| 阿里云 | - |


### 专有版

| 平台   | 区域                   |
| ------ | ---------------------- |
| 阿里云 | 北京，上海，深圳，杭州，张家口，成都 |
| 华为云 | 华南-广州，华东-上海，华北-北京       |
| 腾讯云 | 广州，上海，北京 |
| 亚马逊云科技 | 宁夏，北京 |

### BYOC
| 平台     | 区域                 |
|--------|--------------------|
| 阿里云    | 北京，上海，深圳，杭州，张家口，成都 |
| 亚马逊云科技 | 宁夏，北京              |

> 如您需要其他云服务商或地区的支持，您可以通过 [工单](../feature/tickets.md) 或 邮件(cloud-support@emqx.io) 与我们联系。

## 预估部署费用
在创建部署之前，您可以前往 [价格方案](https://www.emqx.com/zh/pricing) 页面，依据实际业务需求预估创建部署所需费用。在 BYOC 部署模式下，云基础设施的费用主要取决于您和云服务提供商的合约。
