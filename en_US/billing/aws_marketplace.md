# Manage Billing from AWS Marketplace

EMQX Platform supports paying for usage via the AWS Marketplace. You can link an EMQX account to an AWS Billing Account and delete an existing subscription.


## Link an AWS Billing Account to EMQX Platform

1. Sign in to your [AWS account](https://aws.amazon.com/cn/console/).
2. Navigate to [AWS Marketplace](https://aws.amazon.com/marketplace).
3. Search for "EMQX Platform (Pay as you go)" in the search bar. Alternatively, you can click **AWS Marketplace** at the bottom of the EMQX Platform Sign in and Sign up page to go to the target page.
4. On the EMQX Platform product overview page, click **View purchase options**.
5. On the Subscribe to EMQX Platform (Pay As You Go) page, click **Subscribe**.
6. In the green banner displayed at the top of the page, click the **Set Up Your Account** button to redirect to EMQX Platform website. 
7. Set up EMQX account.

	- You are automatically redirected to the index page if you are already signed in to an existing EMQX account. A modal will display the status of linking to your AWS Billing Account.
	- If you are not already signed in to an existing EMQX account, you are prompted to sign in to an EMQX account. Upon successful sign-in, you are automatically redirected to the index page. A modal will display the status of linking to your AWS Billing Account.
8. Wait for AWS to finish syncing.
	EMQX Platform index page displays a pop-up notifying you of the account syncing status. Additionally, the Payment Method field of the Billing page will change to AWS Marketplace Subscription when the sync is complete.

::: warning
The following situations will cause a failure in account linking.

1. The EMQX account already has been set up a credit card.
2. The EMQX account uses Available Credits.
3. The EMQX account already has been linked to a Marketplace EMQX product.

If you still encounter a problem, please submit a [ticket](../feature/tickets.md) to get help.

:::


## Unlink an AWS Billing Account from EMQX Platform

1. Sign in to your [AWS account](https://aws.amazon.com/cn/console/).
2. Navigate to [AWS Marketplace](https://aws.amazon.com/marketplace).
3. Navigate to the Manage Subscriptions page.
4. Select the **EMQX Platform (Pay as You Go)** subscription that you wish to unlink.
5. Click the **Actions** button in the Agreement section. A dropdown with available actions is displayed.
6. In the dropdown, click **Cancel Subscription**.
7. A modal asking you if you are sure you want to cancel your subscription displays. If you wish to cancel your subscription, type "EMQX Platform (Pay as you go)" in the input box. Then click **Yes, cancel subscription**. Upon successful cancellation of your subscription, a green banner displays at the top of the Manage Subscriptions page.

::: warning
1. Cancelling subscription will stop your running deployments except the trial deployment. You can keep using the trial deployment until the trial ends.
2. The stopped deployment will be deleted after 3 days.
:::



