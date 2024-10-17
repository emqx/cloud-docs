# Product Plans

As a globally available, fully-managed MQTT service platform, the EMQX Platform can be easily deployed on popular public clouds. The following product plans are available to offer you a tailored solution to meet your specific requirements:

## Serverless Plan

The Serverless Plan provides MQTT services on a secure, scalable cluster with pay-as-you-go pricing, making it a flexible and cost-effective solution for starting with MQTT. Key features include:

- **Usage-Based Billing**: Pay only for what you use, with a generous free quota offering up to 1 million session minutes.
- **Automatic Scaling**: Seamlessly scales with your application’s demands.
- **Quick Start**: Ideal for developers and small projects.

## Dedicated Plan

The Dedicated Plan is designed for businesses that require enhanced performance and security with isolated resources:

- **Capacity-Based Billing**: Hourly billing based on reserved resource allocation, ensuring resources are exclusively dedicated to your deployment.
- **High Performance**: Provides a dedicated environment with guaranteed resources.
- **Advanced Features**: Offers advanced enterprise features such as Single Sign-On (SSO), real-time data processing, data integration, private network, etc.
- **Customizable Deployment**: Flexible deployment options across AWS, Azure, and GCP.

## Premium Plan

The Premium Plan offers all the advantages of the Dedicated Plan, along with additional features to support complex enterprise applications:

**Durable Sessions:** Enhanced storage capacity for persistent client sessions.

**Event History**: Records and stores client events for monitoring and analysis.

**Cluster Linking**: Facilitates cross-regional communication through cluster bridging.

**EMQX Streaming (coming soon)**: Direct support for Kafka protocol, allowing Kafka clients to consume MQTT messages seamlessly.

## BYOC (Bring Your Own Cloud) Plan

The BYOC Plan allows businesses to integrate the EMQX Platform with their existing cloud infrastructure. It keeps your data secure in your own cloud and manages it with EMQ’s expertise.

**Full Control:** Deploy the EMQX Platform in your own cloud environment for full data control.

**Security Compliance**: Maintain compliance with internal security policies by managing data within your cloud.

**Customization**: Tailor the MQTT infrastructure to meet specific business requirements.

## Feature List

This section provides a detailed comparison of features across different service plans, covering aspects like cloud platform compatibility, supported protocols, connection limits, features, data integrations, and service support.

<table>
  <tr>
      <th></th>
      <th>Serverless</th>
      <th>Dedicated</th>
      <th>Premium</th>
      <th>BYOC</th>
    </tr>
   <tr>
      <td><strong>Cloud Platform</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">AWS</td>
      <td>-</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Azure</td>
      <td>-</td>
      <td>&#10003</td>
      <td>Coming soon</td>
      <td>Coming soon</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">GCP</td>
      <td>-</td>
      <td>&#10003</td>
      <td>Coming soon</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td><strong>Protocols</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MQTT v3.1, v3.1.1, v5.0</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MQTT over TCP</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MQTT over TLS</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MQTT over WebSocket</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MQTT-SN</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">CoAP</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td><strong>Connection</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Max Sessions</td>
      <td>1000</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Maximum Deployment TPS </td>
      <td>1000</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
   </tr>
  <tr>
      <td style="text-indent: 2em;">Maximum Single-Client Subscription TPS</td>
      <td>1000</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
   </tr> 
   <tr>
      <td style="text-indent: 2em;">Maximum Single-Client Publishing TPS </td>
      <td>10</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Maximum Message Size</td>
      <td>1 MB</td>
      <td>1 MB</td>
      <td>100 KB</td>
      <td>256 MB</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Topic Subscription Limit for a Single Client</td>
      <td>10</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">VPC Peering (Private Network)</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>Self-configurable</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">NAT Gateway</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>Self-configurable</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Internal Load Balance</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>Self-configurable</td>
   </tr>
   <tr>
      <td><strong>Trial/Free Quota</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Trial Deployment</td>
      <td>&#10007</td>
      <td>14 Days</td>
      <td>14 Days</td>
      <td>14 Days</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Free Quota</td>
      <td>Connection: 1,000,000 session minutes / month<br />Traffic: 1 GB / Month<br />Rule actions: 1,000,000 / month </td>
      <td>Traffic：Maximum 1 TB / Month</td>
      <td>&#10007</td>
      <td>&#10007</td>
   </tr>
   <tr>
      <td><strong>Features</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">QoS 0, 1, 2</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Retained Message</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Will Message</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Shared Subscription</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Username and Password Authentication</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Client and Topic Access Control</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Metrics Monitoring</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Alarms</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Project Management</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Role Authorization</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Invoice</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>Contact Us</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">SSL Certificate</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Authentication with Extended Data Sources</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Log</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>Can be integrated independently</td>
   </tr>
    <tr>
      <td style="text-indent: 2em;">Durable Session</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10007</td>
   </tr>
  <tr>
      <td style="text-indent: 2em;">Event History</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10007</td>
   </tr>
  <tr>
      <td style="text-indent: 2em;">Cluster Linking</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10007</td>
   </tr>
  <tr>
      <td style="text-indent: 2em;">EMQX Streaming</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10007</td>
   </tr>
   <tr>
      <td><strong>Data Integrations</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">SQL-Based Data Processing</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Republish</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Bridging</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">HTTP Server</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Kafka</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">RabbitMQ</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">RocketMQ</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Pulsar</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MySQL</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">PostgreSQL</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MongoDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Redis</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Cassandra</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">DynamoDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">ClickHouse</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">OpenTSDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">InfluxDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">TimescaleDB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Oracle DB</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">SQL Server</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">TDengine</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td><strong>Service Support</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Uptime SLA</td>
      <td>99.9%</td>
      <td>99.99%</td>
      <td>99.99%</td>
      <td>99.99%</td>
   </tr>
    <tr>
      <td style="text-indent: 2em;">Customer Support</td>
      <td>8x5</td>
      <td>24x7</td>
      <td>24x7</td>
      <td>24x7</td>
   </tr>
    <tr>
      <td style="text-indent: 2em;">Multi-AZ Deployment</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
</table>




## Cloud Providers and Regions

The following sections outline the available cloud providers and their supported regions across different service plans, with options for deployment in major regions across North America, Europe, and Asia.

### Serverless
| Cloud Provider | Region                              |
| -------------- | ----------------------------------- |
| AWS/Azure/CGP  | North America, Europe, Asia-Pacific |


### Dedicated Plan


| Cloud Provider | Region                                                       |
| -------------- | ------------------------------------------------------------ |
| AWS            | **US:** N. Virginia, Ohio, N. California, Oregon<br />**EU:** Ireland, London, Frankfurt<br />**Aisa:** Singapore, Mumbai, Hong Kong, Tokyo, Sydney |
| Azure          | **US:** East US, West US 2, West US 3<br />**EU:** West Europe, Germany West Central, North Europe <br />**Asia:** Southeast Asia |
| Google Cloud   | **US:** South Carolina, Oregon, Iowa<br />**EU:** Frankfurt, Finland<br />**Asia:** Mumbai, Singapore, Taiwan, Tokyo |

### Premium Plan


| Cloud Provider | Region                                     |
| -------------- | ------------------------------------------ |
| AWS            | **US:** N. Virginia<br />**EU:** Frankfurt |

### BYOC Plan


| Cloud Provider | Region                                                       |
| -------------- | ------------------------------------------------------------ |
| AWS            | **US:** N. Virginia, Ohio, N. California, Oregon<br />**EU:** Ireland, London, Frankfurt<br />**Aisa:** Singapore, Mumbai, Hong Kong, Tokyo, Sydney |
| Google Cloud   | **US:** South Carolina, Oregon, Iowa<br />**EU:** Frankfurt, Finland<br />**Asia:** Mumbai, Singapore, Taiwan, Tokyo |

To deploy your EMQX Cluster in a different region, you can submit a request via a [ticket](../feature/tickets.md) or email to [cloud-support@emqx.io](mailto:cloud-support@emqx.io). The EMQX support team will assist you in deploying your instance in the desired region.

## Estimate Your Monthly Usage
To help you find the best plan for your business needs, EMQ provides a [Plans & Pricing](https://www.emqx.com/en/pricing) page where you can estimate your monthly usage. For the BYOC Plan, the cost of cloud infrastructure is determined by your agreement with your chosen cloud service provider.
