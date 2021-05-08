# Product Pricing

We offer a variety of flexible product specifications to support the deployment of fully managed MQTT services exclusively for you on the world's leading public clouds.

## Product Editions

EMQ X Cloud is available in three editions: Basic, Professional, and Signature.

![edition](./_assets/pricing.png)

- Basic Edition: Suitable for learning and experiencing the MQTT protocol or EMQ X Broker product, and developing lightweight IoT applications. The Basic Edition offers a 30-day free trial.
- Professional Edition: For building mission-critical IoT applications, this edition provides advanced features such as data persistence, message distribution, VPC peer-to-peer connectivity, and more. The Professional Edition is available for a 14-day free trial.
- Unlimited Edition: Suitable for building enterprise-class IoT platforms, this edition provides support for multi-territory and exclusive hardware deployments and adds device management, device shadowing, and thing modeling features.



## Billing Items

EMQ X Cloud is billed by product version, instance specification, and messaging network traffic. There is no limit to the number of messages, API calls, and rules engine usage. You can choose the product and specification to suit your business, ensuring that costs remain clear and manageable as your business expands.

EMQ X Cloud's billing consists of two components.

| Item         | Description                                                  |
| :----------- | :----------------------------------------------------------- |
| Base Fee    | The base cost of the instance is calculated based on the hourly unit price corresponding to the product version and instance specifications (maximum connections, message TPS) selected at the time of deployment. In practice, this part of the cost is only related to the length of time, and will not change due to changes in usage (number of connections, message TPS).
| Traffic Fee | Each instance specification includes a certain amount of free traffic. The free traffic is valid for the month and will be automatically emptied at the end of the month if there is any remaining traffic. When the device traffic exceeds the amount of free traffic, the excess will be charged. |

::: danger
When you create a deployment, EMQ X Cloud will estimate the usage cost based on your instance specification selection, and you can see the estimated price on the confirmation page before the deployment.
:::

### Billing Period
EMQ X Cloud calculates the account consumption in the last hour (hourly billing) and debits the balance once an hour, then adds up to the current month's consumption (monthly billing), you can go to the billing page in the console to see the detailed debit information

### Description of outstanding charges
EMQ X Cloud will send a notification email to the registered email address when the balance is insufficient, during which a certain amount of overdraft will be provided, and when the overdraft limit is exhausted, your existing deployment instance will be stopped and deleted, resulting in the following impacts.

- Retain the right to recover the overdraft balance
- The deployment will be cleared of operational data. **Lost data cannot be recovered**.

::: danger
Note: The default overdraft limit is $10. You can increase the limit by contacting your business manager or submitting a work order.
:::

**Price Details**

| Version      | Specifications                          | Base Charge     | Free Traffic  | Overage Unit Price |
| :----------- | :-------------------------------------- | :-------------- | :------------ | :----------------- |
| Basic        | 1,000 connections / up to 1,000 TPS     | from $ 0.19/hr  | 100G/month    | $ 0.15/GB          |
|              | 5,000 connections / up to 5,000 TPS     | from $ 0.55/hr  | 100G/month    | $ 0.15/GB          |
|              | 1,0000 connections / up to 5,000 TPS    | from $ 1.02/hr  | 100G/month    | $ 0.15/GB          |
| Professional | 5,000 connections / up to 10,000 TPS    | from $ 1.02/hr  | 100G/month    | $ 0.15/GB          |
|              | 10,000 connections / up to 20,000 TPS   | from $ 1.79/hr  | 100G/month    | $ 0.15/GB          |
|              | 50,000 connections / up to 50,000 TPS   | from $ 4.28/hr  | 1T/month      | $ 0.15/GB          |
|              | 100,000 connections / up to 100,000 TPS | from $ 7.99 /hr | 1T/month      | $ 0.15/GB          |
|              | > 100,000 connections                   | from $ 7.99 /hr | Contact sales |                    |
| Unlimited    | Unlimited                               | Contact sales   |               |                    |

::: danger
Note: Prices may vary depending on the public cloud platform selected and the deployment region. The actual price is based on the price displayed on the deployment page.
:::

## Functional Details

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
      <td style="text-indent: 2em;">support MQTT v3.1, v3.1.1, v5.0 protocal version</td>
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
