# Product Plans

As a globally available, fully-managed MQTT service platform, EMQX Cloud can be easily deployed on popular public clouds, providing a tailored solution to meet your specific requirements. To better serve the our users, whether you are individual developers or global industry leaders, EMQX Cloud offers three distinct product plans:

1. **Serverless Plan**: Provide MQTT services on a shared cluster that is charged based on usage. The service is entirely free for usage within the free quota, and support up to 1000 concurrent connections.

2. **Dedicated Plan**: Provide MQTT services on a dedicated EMQX cluster and comes in distinct service plans:

    a. **Dedicated Plan (Standard)**: Ideal for implementing MQTT services that require regular or typical throughput and concurrency scenarios in an independent setting.

    b. **Dedicated Plan (Professional)**: Provide a high-availability cluster that's designed for implementing MQTT services in production environments. It comes packed with advanced features, including real-time data processing, data persistence, message distribution, and VPC peer-to-peer connections (private networks). 

3. **BYOC**: Bring your own cloud. Seamlessly integrate EMQX MQTT server with your existing systems. Keep your data secure in your own cloud and manage it with EMQ's expertise. 

## Feature List

<table>
  <tr>
      <th></th>
      <th>Serverless</th>
      <th>Dedicated Plan (Standard)</th>
      <th>Dedicated Plan (Professional)</th>
    </tr>
   <tr>
      <td><strong>Cloud Platform</strong></td>
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
      <td><strong>Protocols</strong></td>
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
      <td style="text-indent: 2em;">Port: mqtt, ws</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Port: mqtt over TLS, ws over TLS</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">WebSocket</td>
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
      <td><strong>Connection</strong></td>
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
      <td style="text-indent: 2em;">Maximum TPS</td>
      <td>1000</td>
      <td>5000</td>
      <td>Unlimited</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Maximum TPS for a Single Client</td>
      <td>100</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Topic Subscription Limit for a Single Client</td>
      <td>10</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">VPC Peering (Private Network)</td>
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
      <td><strong>Trial/Free Quota</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Trial Deployment</td>
      <td>&#10007</td>
      <td>14 Days</td>
      <td>14 Days</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Free Quota</td>
      <td>Connection: 1,000,000 session minutes / month<br />Traffic: 1 GB / Month</td>
      <td>Traffic：100 GB / Month</td>
      <td>Traffic：Maximum 1 TB / Month</td>
   </tr>
   <tr>
      <td><strong>Features</strong></td>
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
      <td style="text-indent: 2em;">Will Message</td>
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
      <td style="text-indent: 2em;">Metrics Monitoring</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Alarms</td>
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
      <td style="text-indent: 2em;">Invoice</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">SSL Certificate</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Authentication with External Data Sources</td>
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
      <td><strong>Data Integrations</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">SQL-Based Data Processing</td>
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
      <td>&#10007</td>
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
      <td><strong>Value Added Services</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Data Plan</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Shadow Service</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">User-Defined Function</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td><strong>Service Support</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Uptime SLA</td>
      <td>99.9%</td>
      <td>99.95%</td>
      <td>99.99%</td>
   </tr>
    <tr>
      <td style="text-indent: 2em;">Customer Support</td>
      <td>8x5</td>
      <td>8x5</td>
      <td>24x7</td>
   </tr>
    <tr>
      <td style="text-indent: 2em;">Multi-AZ Deployment</td>
      <td>&#10003</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
</table>


## Cloud Providers and Regions

### Serverless
| Cloud Provider | Region           |
| ------ | --------------- |
| AWS | - |


### Dedicated Plan (Standard)
| Cloud Provider | Region                                                       |
| ------ | --------------- |
| AWS | US East (N. Virginia)<br>EU (Frankfurt)<br/>Asia Pacific (Singapore), Asia Pacific (Hong Kong) |


### Dedicated Plan (Professional)

To deploy your EMQX Cloud in a different region, you can submit a request via a [ticket](../feature/tickets.md) or email to [cloud-support@emqx.io](mailto:cloud-support@emqx.io). EMQX Cloud support team will assist you in the process of deploying your instance in the desired region.

| Cloud Provider | Region                                                       |
| ------ | ---------------------- |
| AWS | US East (N. Virginia), US West (N. California), US West (Oregon)<br>EU (Ireland), EU (Frankfurt)<br>Asia Pacific (Singapore), Asia Pacific (Mumbai), Asia Pacific (Hong Kong), Asia Pacific (Tokyo) |
| Azure | East US, Germany West Central, Southeast Asia<br/>europe-west3 (Frankfurt), europe-north1 (Finland)<br>asia-south1 (Mumbai), asia-southeast1 (Singapore), asia-east1 (Taiwan) |
| Google Cloud | us-east1 (South Carolina), us-west1 (Oregon) |

## Estimate Your Monthly Usage
EMQ has offered a [Plans & Pricing](https://www.emqx.com/en/cloud/pricing) page, where you can estimate your monthly usage and select a plan that best suits your business needs.
