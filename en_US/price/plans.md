# Product Plans

The EMQX Platform provides the following fully-managed product plans:

- **Serverless Plan**: Provide MQTT services on a secure and scalable cluster that is charged based on usage. The service is free for usage within the free quota, supporting up to 1000 concurrent connections.
- **Dedicated Plan**: Deployed in an independent cloud environment, the MQTT cluster service supports advanced features such as real-time data processing, data persistence, message distribution, VPC peering (private network), etc. Highly available and high-performance, it is the best choice for your production environment usage.
- **BYOC (Bring Your Own Cloud):** Seamlessly integrates the EMQX MQTT server with your existing systems. Keep your data secure in your own cloud and manage it with EMQ's expertise.

## Feature List

<table>
  <tr>
      <th></th>
      <th>Serverless</th>
      <th>Dedicated</th>
      <th>BYOC</th>
    </tr>
   <tr>
      <td><strong>Cloud Platform</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">AWS</td>
      <td>-</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Azure</td>
      <td>-</td>
      <td>&#10003</td>
      <td>Coming soon</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">GCP</td>
      <td>-</td>
      <td>&#10003</td>
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
      <td style="text-indent: 2em;">MQTT over TCP</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">MQTT over TLS</td>
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
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">CoAP</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td><strong>Connection</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Max Sessions</td>
      <td>1000</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Maximum TPS</td>
      <td>1000</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Maximum Message Size</td>
      <td>1 MB</td>
      <td>10 MB</td>
      <td>256 MB</td>
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
      <td>&#10003</td>
      <td>Self-configurable</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">NAT Gateway</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>Self-configurable</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Internal Load Balance</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>Self-configurable</td>
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
      <td>Connection: 1,000,000 session minutes / month<br />Traffic: 1 GB / Month<br />Rule actions: 1,000,000 / month </td>
      <td>Traffic：Maximum 1 TB / Month</td>
      <td>&#10007</td>
   </tr>
   <tr>
      <td><strong>Features</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">QoS 0, 1, 2</td>
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
      <td>Contact Us</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">SSL Certificate</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Authentication with Extended Data Sources</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Log</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>Can be integrated independently</td>
   </tr>
   <tr>
      <td><strong>Data Integrations</strong></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">SQL-Based Data Processing</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Republish</td>
      <td>&#10003</td>
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
      <td style="text-indent: 2em;">HTTP Server</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Kafka</td>
      <td>&#10003</td>
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
      <td style="text-indent: 2em;">TDengine</td>
      <td>&#10007</td>
      <td>&#10003</td>
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
      <td>99.99%</td>
      <td>99.99%</td>
   </tr>
    <tr>
      <td style="text-indent: 2em;">Customer Support</td>
      <td>8x5</td>
      <td>24x7</td>
      <td>24x7</td>
   </tr>
    <tr>
      <td style="text-indent: 2em;">Multi-AZ Deployment</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
</table>


## Cloud Providers and Regions

### Serverless
| Cloud Provider | Region           |
| ------ | --------------- |
| AWS/Azure/CGP | North America, Europe, Asia |


### Dedicated


| Cloud Provider | Region                                                                                                                                                                                                                                            |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AWS            | **US:** US East (N. Virginia), US East (Ohio), US West (N. California), US West (Oregon)<br />**EU:** EU (Ireland), EU (Frankfurt)<br />**Aisa:** Asia Pacific (Singapore), Asia Pacific (Mumbai), Asia Pacific (Hong Kong), Asia Pacific (Tokyo) |
| Azure          | **US:** East US, West US 2 <br />**EU:** West Europe, West Central <br />**Asia:** Southeast Asia                                                                                                                                                 |
| Google Cloud   | **US:** us-east1 (South Carolina), us-west1 (Oregon), us-central1(Iowa)<br />**EU:** europe-west3 (Frankfurt), europe-north1 (Finland)<br />**Asia:** asia-south1(Mumbai), asia-southeast1(Singapore), asia-east1(Taiwan)                         |

### BYOC Plan


| Cloud Provider | Region                                                                                                                                                                                                                                            |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AWS            | **US:** US East (N. Virginia), US East (Ohio), US West (N. California), US West (Oregon)<br />**EU:** EU (Ireland), EU (Frankfurt)<br />**Aisa:** Asia Pacific (Singapore), Asia Pacific (Mumbai), Asia Pacific (Hong Kong), Asia Pacific (Tokyo) |
| Google Cloud   | **US:** us-east1 (South Carolina), us-west1 (Oregon), us-central1 (Iowa)<br />**EU:** europe-west3 (Frankfurt), europe-north1 (Finland)<br />**Asia:** asia-south1 (Mumbai), asia-southeast1 (Singapore), asia-east1 (Taiwan)                     |

To deploy your EMQX Cluster in a different region, you can submit a request via a [ticket](../feature/tickets.md) or email to [cloud-support@emqx.io](mailto:cloud-support@emqx.io). EMQX support team will assist you in the process of deploying your instance in the desired region.

## Estimate Your Monthly Usage
EMQ has offered a [Plans & Pricing](https://www.emqx.com/en/pricing) page, where you can estimate your monthly usage and select a plan that best suits your business needs. For BYOC Plan, the cost of cloud infrastructure primarily depends on your contract with the cloud service provider.
