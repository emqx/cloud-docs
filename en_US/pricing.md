# Product Pricing

EMQ X Cloud charges by cluster instances and message traffic instead of the number of messages, and the use of API and rule engine is unlimited. The cost also remains clear and manageable when the business expands massively.



## Billing Items

EMQ X Cloud charges for each deployment based on the deployment specifications (maximum number of connections,  TPS of message), with different hourly rates for different specifications.

EMQ X Cloud will estimate the cost of your deployment before you create it. Please visit the [Pricing Estimation](https://cloud.emqx.io/calculator) page for details.


The specific billing items are shown in the table below:

| Item  | Description                                               |
| -------- | ------------------------------------------------------------ |
| <div style="width: 120px"></div>Basic cost | Based on the deployment specifications (maximum number of connections, TPS of message), the estimated cost of this part will not change in actual use.
| Traffic usage | The basic fee has already included a certain amount of traffic, which is valid in the month when the complimentary traffic is available. If there is any surplus, it will be automatically cleared at the end of the month. After the equipment exceeds the flow, the excess part will be charged at 0.15 USD/GB.
::: tip
There may be differences between estimated and actual costs due to actual usage.
:::



### Billing Cycle

EMQ X Cloud calculates the account consumption in the last hour (hourly bill) and deducts from the balance **every hour**, and then accumulates up to the current month's consumption (monthly bill). You can go to [Billing Page](https://cloud.emqx.io/console/billing/overview)  to view more information.

### Regarding Arrearage

When the balance is insufficient, EMQ X Cloud will send a notification email to the registered mailbox. If payment is not made within seven days after running out of balance, all deployments will be deleted.
<!-- ### 计费示例一 TODO 等待添加 ### 计费示例二 -->