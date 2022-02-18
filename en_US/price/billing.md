# Billing Items

EMQX Cloud is billed by product plan, instance specification, and messaging network traffic. There is no limit to the number of messages, API calls, and rule engine usage. You can choose the product and specification to suit your business, ensuring that costs remain clear and manageable as your business expands.

EMQX Cloud's billing consists of two components.

| Item         | Description                                                  |
| ----------- | ----------------------------------------------------------- |
| Base Fee    | The base cost of the instance is calculated based on the hourly unit price corresponding to the product plan and instance specifications (maximum connections, message TPS) selected at the time of deployment. In practice, this part of the cost is only related to the length of time, and will not change due to changes in usage (number of connections, message TPS).
| Traffic Fee | Each instance specification includes a certain amount of free traffic. The free traffic is valid for the month and will be automatically emptied at the end of the month if there is any remaining traffic. When the device traffic exceeds the amount of free traffic, the excess will be charged. |

When you create a deployment, EMQX Cloud estimates the cost of use based on your instance specification selection, and you can see the estimated price on the confirmation page before you officially deploy.

::: danger
Note: When you create a deployment, EMQX Cloud will estimate the usage cost based on your instance specification selection, and you can see the estimated price on the confirmation page before the deployment.
:::



## Billing Period

EMQX Cloud deployments are charged hourly and on the 1st of each month your credit card will be charged for the previous month's deployment usage. You can go to the [Billing Page](<https://cloud-intl.emqx.com/console/billing/overview>) of the console to see the detailed information.



## Description of Unpaid Bills

EMQX Cloud will charge your credit card on the 1st of each month for the previous month's deployment. When the charge fails, we will retry every 8 hours until the 5th of the month, after which we will do the following if the charge is still unsuccessful:

- Reserve the right to recover money owed on the account.
- Delete all deployments under your account and delete the deployment data, and **the data will not be recovered**.
