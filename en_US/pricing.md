# Product Pricing

We offer a variety of flexible product specifications to support the deployment of fully managed MQTT services exclusively for you on the world's leading public clouds.

## Product Plans

EMQ X Cloud is available in three plans: Basic, Professional, and Unlimited.

![plan](./_assets/pricing.png)

- Basic: Suitable for learning and experiencing the MQTT protocol or EMQ X Broker product, and developing lightweight IoT applications. The Basic plan offers a 30-day free trial.
- Professional: For building mission-critical IoT applications, this plan provides advanced features such as data persistence, message distribution, VPC peer-to-peer connectivity, and more. The Professional plan is available for a 14-day free trial.
- Unlimited: Suitable for building enterprise-class IoT platforms, this plan provides support for multi-territory and exclusive hardware deployments and adds device management, device shadowing, and thing modeling features.



## Billing Items

EMQ X Cloud is billed by product plan, instance specification, and messaging network traffic. There is no limit to the number of messages, API calls, and rule engine usage. You can choose the product and specification to suit your business, ensuring that costs remain clear and manageable as your business expands.

EMQ X Cloud's billing consists of two components.

| Item         | Description                                                  |
| ----------- | ----------------------------------------------------------- |
| Base Fee    | The base cost of the instance is calculated based on the hourly unit price corresponding to the product plan and instance specifications (maximum connections, message TPS) selected at the time of deployment. In practice, this part of the cost is only related to the length of time, and will not change due to changes in usage (number of connections, message TPS).
| Traffic Fee | Each instance specification includes a certain amount of free traffic. The free traffic is valid for the month and will be automatically emptied at the end of the month if there is any remaining traffic. When the device traffic exceeds the amount of free traffic, the excess will be charged. |

When you create a deployment, EMQ X Cloud estimates the cost of use based on your instance specification selection, and you can see the estimated price on the confirmation page before you officially deploy.

::: danger
Note: When you create a deployment, EMQ X Cloud will estimate the usage cost based on your instance specification selection, and you can see the estimated price on the confirmation page before the deployment.
:::



### Billing Period

EMQ X Cloud deployments are charged hourly and on the 1st of each month your credit card will be charged for the previous month's deployment usage. You can go to the [Billing Page](<https://cloud-intl.emqx.com/console/billing/overview>) of the console to see the detailed information.



### Description of Unpaid Bills

EMQ X Cloud will charge your credit card on the 1st of each month for the previous month's deployment. When the charge fails, we will retry every 8 hours until the 5th of the month, after which we will do the following if the charge is still unsuccessful:

- Reserve the right to recover money owed on the account.
- Delete all deployments under your account and delete the deployment data, and **the data will not be recovered**.



**Price Details**

<table>
   <tr>
      <th>Plan</th>
      <th>Specification</th>
      <th>Base Fee</th>
      <th>Free Traffic</th>
      <th>Overage Unit Price</th>
   </tr>
   <tr>
      <td rowspan="3">Basic</td>
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
      <td>1,0000 connections / Up to 5,000 TPS</td>
      <td>from $ 0.88/hr </td>
   </tr>
   <tr>
      <td rowspan="5">Professional</td>
      <td>5,000 connections / Up to 10,000 TPS</td>
      <td>from $ 0.99/hr </td>
      <td rowspan="2">100G/month</td>
   </tr>
   <tr>
      <td>10,000 connections / Up to 20,000 TPS</td>
      <td>from $ 1.49/hr</td>
   </tr>
   <tr>
      <td>50,000 connections / Up to 50,000 TPS</td>
      <td>from $ 3.99/hr</td>
      <td rowspan="2">1T/month</td>
   </tr>
   <tr>
      <td>100,000 connections / Up to 100,000 TPS</td>
      <td>from $ 7.19/hr</td>
   </tr>
   <tr>
      <td>>100,000 connections</td>
      <td>from $ 7.19/hr</td>
      <td colspan="2" align="center">Contact sales</td>
   </tr>
   <tr>
      <td>Unlimited</td>
      <td>Unlimited</td>
      <td colspan="3" align="center">Contact sales</td>
   </tr>
</table>


::: danger
Note: Prices may vary depending on the public cloud platform selected and the deployment region. The actual price is based on the price displayed on the deployment page.
:::

## Feature Details

<table>
  <tr>
      <th></th>
      <th>Basic</th>
      <th>Professional</th>
      <th>Unlimited</th>
    </tr>
   <tr>
      <td>Fully MQTT support</td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">support MQTT v3.1, v3.1.1, v5.0 protocol version</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">support MQTT over WebSocket</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>MQTT QoS level</td>
      <td>QoS 0, 1, 2</td>
      <td>QoS 0, 1, 2</td>
      <td>QoS 0, 1, 2</td>
   </tr>
   <tr>
      <td>Enterprise SSL Certificate</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>MQTT username and password authentication certification</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>Client and topic level ACL settings</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>Message distribution</td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Message republish</td>
      <td>&#10003</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td style="text-indent: 2em;">Message bridging</td>
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
      <td>Data persistence</td>
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
      <td>Architecture Design Consulting</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>Project Integration Consulting</td>
      <td>&#10007</td>
      <td>&#10003</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>Device management</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>Device shadowing</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>Edge device management</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>Cluster</td>
      <td>&#10007</td>
      <td>Single region cluster</td>
      <td>Multi-region clusters</td>
   </tr>
   <tr>
      <td>Maximum number of connections</td>
      <td>10,000</td>
      <td>100,000</td>
      <td>Unlimited</td>
   </tr>
   <tr>
      <td>Support bare metal servers</td>
      <td>&#10007</td>
      <td>&#10007</td>
      <td>&#10003</td>
   </tr>
   <tr>
      <td>VPC Peering Connections</td>
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
      <td>Client support</td>
      <td>8/5</td>
      <td>24/7</td>
      <td>24/7</td>
   </tr>
</table>