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
