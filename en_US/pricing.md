# Product Pricing

EMQ X Cloud uses prepaid billing pattern based on usage, which can increase cluster capacity at any time and save usage costs.



## Billing items

EMQ X Cloud bills each deployment according to the maximum connection specification and message TPS.

Before creating a deployment, EMQ X Cloud will estimate the use cost based on your deployment selection. The specific price can be viewed on the [Price Estimate](https://cloud.emqx.io/cn/calculator) page

> Note: Due to differences in actual usage, there may be differences between estimated cost and actual cost.

The specific billing items are shown in the table below:

| Item              | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| Basic fee         | It is charged according to the maximum connection number specification and message rate TPS, and the estimated cost of this part will not change in actual use. |
| Traffic usage fee | The basic fee already contains a certain amount of traffic. The excess traffic will be charged at $0.15/GB when the communication of the device exceeds the amount. |

### Billing cycle

**For every hour,** EMQ X Cloud calculates the account consumption within the last hour (hourly bill) and deducts the fee from the balance, and then adds it to the monthly consumption (monthly bill).  You can go to [Bill Page](<https://cloud.emqx.io/console/billing/overview>) to view detailed deduction information

### Arrears notification

In case of arrears, EMQ X Cloud will send a notification email to the registered mailbox, and provide a certain amount of overdraft limit during the period. After the overdraft limit is exhausted, your existing deployment instance will be stopped and deleted, resulting in the following impacts:

> Note: the default overdraft limit is 10 dollars. You can contact your business manager or submit a ticket to increase the limit.

- Reserves the right to recover overdraft
- Empty deployment data, **and the lost data cannot be recovered**.