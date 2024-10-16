# 版本介绍

作为一个全球可用的、完全托管的 MQTT 服务平台，EMQX Platform 可以轻松部署在各大公有云上。为了满足您的特定需求，EMQX Platform 提供以下产品版本，为您提供量身定制的解决方案：

## Serverless

Serveless 版本通过安全、可扩展的集群提供 MQTT 服务，采用按需计费模式，是启动 MQTT 的灵活且经济高效的解决方案。主要功能包括：

- **按使用量计费**：只需为实际使用付费，提供高达 100 万连接分钟的免费配额。
- **自动扩展**：根据应用需求无缝扩展。
- **快速启动**：非常适合开发者和小型项目。

## 专有版

专有版为需要增强性能和安全性并使用独立资源的企业设计：

- **按容量计费**：基于预留资源的小时计费，确保资源专用于您的部署。
- **高性能**：提供资源保障的专用环境。
- **高级功能**：提供企业级高级功能，如单点登录（SSO）、实时数据处理、数据集成、私有网络等。
- **可定制部署**：灵活部署选项，支持阿里云、华为云和腾讯云等平台。

## 旗舰版

旗舰版在专有版的基础上，增加了额外功能，支持复杂的企业应用：

- **持久会话**：为持久化客户端会话提供增强的存储能力。
- **历史事件**：记录并存储客户端事件，用于监控和分析。
- **集群连接**：通过集群桥接实现跨区域通信。
- **Kafka 流处理（即将推出）**：直接支持 Kafka 协议，使 Kafka 客户端无缝消费 MQTT 消息。

## BYOC (Bring Your Own Cloud)

BYOC 版本允许企业将 EMQX Platform 集成到现有的云基础设施中，确保您的数据在自己的云环境中保持安全，并由 EMQ 的专业技术团队进行管理。

- **完全控制**：在您自己的云环境中部署 EMQX Platform，实现对数据的全面控制。
- **安全合规**：通过在您自己的云中管理数据，确保符合内部安全政策。
- **定制化**：根据特定业务需求定制 MQTT 基础设施。

## 各版本功能对比

本节详细比较了不同产品版本的功能，涵盖了云平台兼容性、支持的协议、连接限制、功能、数据集成和服务支持等方面。

<table>
  <tr>
      <th></th>
      <th>Serverless</th>
      <th>专有版</th>
      <th>旗舰版</th>
      <th>BYOC</th>
    </tr>
   <tr>
      <td><strong>公有云平台</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">阿里云</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">华为云</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>即将推出</td>
      <td>即将推出</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">腾讯云</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>即将推出</td>
      <td>即将推出</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">亚马逊云科技</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>即将推出</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td><strong>协议支持</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">MQTT v3.1, v3.1.1, v5.0</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">MQTT over TCP</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">MQTT over TLS/SSL</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">MQTT over WebSocket</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">MQTT-SN</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">CoAP</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">JT/T808</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td><strong>连接</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">最大连接数</td>
      <td>1000</td>
      <td>无限制</td>
      <td>无限制</td>
      <td>无限制</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">部署最大 TPS 上限</td>
      <td>1000</td>
      <td>无限制</td>
      <td>无限制</td>
      <td>无限制</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">单个客户端最大订阅 TPS</td>
      <td>1000</td>
      <td>无限制</td>
      <td>无限制</td>
      <td>无限制</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">单个客户端最大发布 TPS</td>
      <td>10</td>
      <td>无限制</td>
      <td>无限制</td>
      <td>无限制</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">单客户端订阅主题限制</td>
      <td>10</td>
      <td>无限制</td>
      <td>无限制</td>
      <td>无限制</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">最大消息大小</td>
      <td>1 MB</td>
      <td>1 MB</td>
      <td>100 KB</td>
      <td>256 MB</td>
   </tr>
    <tr>
      <td style="text-indent: 2em;">单个客户端主题订阅限制</td>
      <td>10</td>
      <td>无限制</td>
      <td>无限制</td>
      <td>无限制</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">VPC 对等连接（私有网络）</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>可在云平台自行配置</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">私网连接（阿里云）</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>可在云平台自行配置</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">NAT 网关</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>可在云平台自行配置</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">内网 LB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>可在云平台自行配置</td>
   </tr>
   <tr>
      <td><strong>试用/免费额度</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">部署试用</td>
      <td>&#10007</td>
      <td>14 天</td>
      <td>14 天</td>
      <td>14 天</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">免费额度</td>
      <td>连接：1百万连接分钟/月<br />流量：1GB/月<br />数据集成：1百万规则动作/月</td>
      <td>流量：最高 1 TB/月</td>
      <td>&#10007</td>
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
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">消息保留</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">遗嘱消息</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">共享订阅</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">用户名与密码认证</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">客户端&主题访问控制</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">指标监控</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">告警</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">项目管理</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">角色权限管理</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">发票管理</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>联系商务</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">企业 SSL 证书</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">扩展数据源认证与授权</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">日志</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>可自行集成</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">持久会话</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10007</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">历史事件</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10007</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">集群连接</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10007</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Kafka 流处理</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>即将推出</td>
      <td>&#10007</td>
   </tr>
   <tr>
      <td><strong>数据集成</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">基于 SQL 的数据处理</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">消息重发布</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">消息桥接</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">HTTP Server</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">Kafka</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">RabbitMQ</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">RocketMQ</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">Pulsar</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">MySQL</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">PostgreSQL</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">MongoDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">Redis</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">Cassandra</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">DynamoDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">ClickHouse</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">OpenTSDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">InfluxDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">TimescaleDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">Oracle DB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">SQL Server</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">TDengine</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td><strong>增值服务</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">流量包</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>-</td>
      <td>&#10007</td>
   </tr>
   <tr>
      <td><strong>服务支持</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 1em;">SLA 等级</td>
      <td>99.9%</td>
      <td>99.99%</td>
      <td>99.99%</td>
      <td>99.99%</td>
   </tr>
    <tr>
      <td style="text-indent: 1em;">客户支持</td>
      <td>8 x 5</td>
      <td>24 x 7</td>
      <td>24 x 7</td>
      <td>24 x 7</td>
   </tr>
    <tr>
      <td style="text-indent: 1em;">多可用区部署</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
</table>



## 支持的云服务提供商和地区

以下小节概述了不同产品版本下可用的云服务提供商及其支持的地区，并提供了在国内的主要部署区域选项。

### Serverless
| 平台   | 区域 |
| ------ | ---- |
| 阿里云 | -    |


### 专有版

| 平台         | 区域                                 |
| ------------ | ------------------------------------ |
| 阿里云       | 北京，上海，深圳，杭州，张家口，成都 |
| 华为云       | 华南-广州，华东-上海，华北-北京      |
| 腾讯云       | 广州，上海，北京                     |
| 亚马逊云科技 | 宁夏，北京                           |

### 旗舰版

| 平台   | 区域 |
| ------ | ---- |
| 阿里云 | 杭州 |

### BYOC

| 平台         | 区域                                 |
| ------------ | ------------------------------------ |
| 阿里云       | 北京，上海，深圳，杭州，张家口，成都 |
| 亚马逊云科技 | 宁夏，北京                           |


> 如您需要其他云服务商或地区的支持，您可以通过[工单](../feature/tickets.md)或 邮件 (cloud-support@emqx.io) 与我们联系。

## 预估部署费用
在创建部署之前，您可以前往[价格方案](https://www.emqx.com/zh/pricing)页面，依据实际业务需求预估创建部署所需费用。在 BYOC 部署模式下，云基础设施的费用主要取决于您和云服务提供商的合约。
