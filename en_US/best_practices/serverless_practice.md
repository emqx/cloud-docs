# Serverless Deployment Usage and Management Practices

This page introduces the practices and considerations for free quotas and paid usage when using the Serverless deployments of EMQX Cloud.

## Free Quota for Serverless Deployments

When creating a Serverless deployment in the EMQX Cloud console, keep the monthly spend limit at the default value of 0. This allows you to create a free deployment with 1 million session minutes and 1 GB of traffic per month. You can refer to the [Create Serverless Deployment](../create/serverless.md) for specific steps.

### Frequently Asked Questions

**Q: Where can I see the usage of my quota?** <br> A: You can view statistics on session minutes and traffic usage on the deployment overview page. Usage statistics are updated every hour, meaning that the displayed consumption figures may be delayed by one hour.

**Q: What happens if I exceed the free quota for the month?** <br> A: If you exceed the free quota for the month (either for session minutes or traffic), your deployment will be stopped. It will remain stopped until the start of the next month when new free quotas become available. Note that deployments will not automatically restart; you will need to manually restart them from the console.

**Q: If my deployment is stopped due to exceeding the free quota, how can I continue using it?** <br> A: If your deployment is stopped due to exceeding the free quota for the month and you wish to continue using it, you need to adjust the Serverless monthly spend limit on the Deployment Overview page by clicking the edit icon next to **Spend Limit** and setting the maximum monthly spend limit to a value greater than 0. If your account does not have a payment method , you will need to add a payment method to the account. After adding the payment, you can restart the deployment from the Deployment Overview page.

## Manage Paid Usage of Serverless Deployments

If the free quota for each month does not meet your usage needs, you can [set spend limit](../deployments/spend_limit.md) based on your actual requirements. For example, if you set a spend limit of 50 dollars, during usage in the current month, the free quota will be consumed first. Once the free quota is used up, the system will settle the charges hourly and put the consumption cost to the monthly bill. When your consumption reaches 50 dollars for the current month, you can choose to stop the deployment or receive a reminder and continue usage based on your selection.

### Frequently Asked Questions

**Q: How can I prevent my deployment from stopping when using it with paid usage?** <br> A: If your business volume is substantial and you want to prevent the deployment from stopping, it's recommended to set a higher spend limit or choose `Remind me and keep billing` when you edit the Serverless spend limit. Ensure that your account is set with a payment method.

**Q: Can I modify the spend limit?** <br> A: You can modify the spend limit at any time, either by increasing or decreasing it. Please note that if your deployment's consumption for the current month has already exceeded the modified target limit, modifying the limit will result in the suspension of the deployment.

**Q: When will I receive an email notice?** <br> A: When your usage for the month reaches 75% of the free quota, the email associated with your account will receive a reminder. When your usage reaches the set spend limit, the email associated with your account will receive another reminder. Please ensure to check your email for these notifications.
