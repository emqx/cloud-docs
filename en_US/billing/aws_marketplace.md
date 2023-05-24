# Billing from AWS Marketplace

EMQX Cloud supports paying for usage via the AWS Marketplace. You can link an EMQX account to an AWS Billing Account, as well as delete an existing subscription.


## Link an AWS Billing Account to EMQX Cloud

1. Sign in to your to [AWS account](https://aws.amazon.com/cn/console/).
2. Navigate to [AWS Marketplace](https://aws.amazon.com/marketplace).
3. Search for EMQX Cloud (Pay as you go) in the search bar. Or in EMQX login page and registration page, click "Or subscription on AWS Marketplace" to go to the target page.
4. On the EMQX Cloud product overview page, click **View purchase options**.
5. On the EMQX Cloud (Pay As You Go) page, click **Subscribe**.
6. In the green banner displays at the top of the Manage Subscriptions page, click **Set Up Your Account** button to redirect to EMQX Cloud website. 
7. Set up EMQX account.

	If you are already signed in to an existing EMQX account, you are automatically redirected to the index page. A modal will display the status of linking to your AWS Billing Account.

	If you are not already signed in to an existing EMQX account, you are prompted to sign in to an EMQX account. Upon successful sign-in, you are automatically redirected to the index page. A modal will display the status of linking to your AWS Billing Account.
8. Wait for AWS to finish syncing.
	EMQX Cloud index page displays a pop-up notifying you that account syncing status. Additionally, the Payment Method field of the Billing page will change to AWS Marketplace Subscription when the sync is complete.

::: warning
The following situation will course a failure of link.
1. The EMQX account already has been set up a credit card.
2. The EMQX account uses Available Credits.
3. The EMQX account already has been linked to a Marketplace EMQX Cloud product.
4. If you still encounter a problem, please submit a [ticket](../feature/tickets.md) to get help.
:::


## Unlink an AWS Billing Account from EMQX Cloud

1. Sign in to your to [AWS account](https://aws.amazon.com/cn/console/).
2. Navigate to [AWS Marketplace](https://aws.amazon.com/marketplace).
3. Navigate to the Manage Subscriptions page.
4. Select the EMQX Cloud (Pay as You Go) subscription that you wish to unlink.
5. Click the **Actions** button in the Agreement section.A dropdown with available actions is displayed.
6. In the dropdown, click **Cancel Subscription**.
7. A modal asking you if you are sure you want to cancel your subscription displays. If you wish to cancel your subscription, type "EMQX Cloud (Pay as you go)" in the input box. Then click **Yes, cancel subscription**. Upon successful cancellation of your subscription, a green banner displays at the top of the Manage Subscriptions page.

::: warning
1. Cancelling subscription will stop your running deployments except the trial deployment. You can keep using the trial deployment until the trial ends.
2. The stopped deployment will be deleted after 3 days.
:::



