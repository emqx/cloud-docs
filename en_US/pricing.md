# Product Pricing

EMQ X Cloud charges based on cluster instance specifications and message transmission network traffic, not the number of messages, and does not limit the use of APIs and rule engine. The cost is still clear and controllable when the business is massively expanded.



## Billing items

EMQ X Cloud charges each deployment according to the deployment specifications (maximum number of connections, message TPS), and different specifications have different hourly unit prices.

Before creating a deployment, EMQ X Cloud will estimate the usage cost based on your deployment options, and the specific price can be viewed on the [Price Estimation](https://cloud.emqx.io/calculator) page


The specific billing items are shown in the table below:

| Item  | Description                                               |
| -------- | ------------------------------------------------------------ |
| <div style="width: 120px"></div>Basic fee | It is determined according to the deployment specifications (maximum number of connections, message TPS), and the estimated cost of this part will not change in actual use. |
| Traffic usage | The basic fee already includes a certain amount of free traffic, and it is valid for the month. If there is any surplus, it will be cleared automatically at the end of the month. After the device communication exceeds the traffic, the excess will be charged at 0.15 USD/GB. |

::: tip Tip
Due to different actual usage conditions, there may be differences between the estimated cost and the actual cost.
:::



### Billing cycle

EMQ X Cloud calculates the account consumption in the last hour (hourly bill) and deducts the balance from the balance **every hour**, and then adds up to the current month's consumption (monthly bill). You can go to [Billing Page](https://cloud.emqx.io/console/billing/overview)  to View detailed billing information.

### Description of arrears

When the balance is insufficient, EMQ X Cloud will send a notification email to the registered mailbox. During this period, a certain amount of overdraft will be provided. After the overdraft is exhausted, your existing deployment instance will be stopped and deleted. The impacts include:

- Reserve the right to recover overdraft arrears
- Clear the deployment running data, **and the lost data cannot be recovered**.

::: tip Tip
The overdraft limit is 10 USD by default. You can contact your business manager or submit a ticket to increase the limit
:::

<!-- ### 计费示例一 TODO 等待添加 ### 计费示例二 -->