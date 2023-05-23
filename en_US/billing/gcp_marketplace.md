# Billing from Google Cloud Marketplace

EMQX Cloud supports paying for usage via the Google Cloud Marketplace. You can link an EMQX account to an GCP Billing Account, as well as delete an existing subscription.


## Link a GCP Billing Account to EMQX Cloud
1. Sign in to your to [GCP account](https://console.cloud.google.com/).
2. Navigate to [GCP Marketplace](https://cloud.google.com/marketplace).
3. Search for EMQX Cloud in the search bar. Or in EMQX login page and registration page, click "Or subscription on Google Cloud Marketplace" to go to the target page.
4. On the EMQX Cloud(Pay as You Go) page, review the Overview and click **SUBSCRIBE**.
5. On the EMQX Cloud Self Serve subscription page, complete the steps to subscribe.<br>
	a. Select your GCP billing account from the dropdown in the Purchase details section.<br>
	b. Review and accept the Terms.<br>
	c. Click **SUBSCRIBE**.
6. In the modal, click **GO TO PRODUCT PAGE**.
7. Return to the product page, click **MANAGE ON PROVIDER** to redirect to EMQX Cloud website.
7. Set up EMQX account.

	If you are already signed in to an existing EMQX account, you are automatically redirected to the index page. A modal will display the status of linking to your GCP Billing Account.

	If you are not already signed in to an existing EMQX account, you are prompted to sign in to an EMQX account. Upon successful sign-in, you are automatically redirected to the index page. A modal will display the status of linking to your GCP Billing Account.
8. Wait for GCP to finish syncing.
	EMQX Cloud index page displays a pop-up notifying you that account syncing status. Additionally, the Payment Method field of the Billing page will change to GCP Marketplace Subscription when the sync is complete.
	
::: warning
The following situation will course a failure of link.
1. The EMQX account already has been set up a credit card.
2. The EMQX account uses Available Credits.
3. The EMQX account already has been linked to a Marketplace EMQX Cloud product.
4. If you still encounter a problem, please submit a [ticket](../feature/ticketss.md) to get help.
:::


## Unlink a GCP Billing Account from EMQX Cloud
1. Sign in to your to [GCP account](https://console.cloud.google.com/).
2. Navigate to [GCP Marketplace](https://cloud.google.com/marketplace).
3. Navigate to Your Orders page.
4. Click the vertical ellipses for the EMQX Cloud(Pay as You Go) subscription that you wish to unlink. A dropdown with available actions displays.
5. Click the **Cancel Order** button from the dropdown.
6. A modal asking you if you are sure you want to cancel your order displays. If you wish to cancel your order, confirm the order number in the input box. Then click **CANCEL ORDER**.

::: warning
1. Cancelling subscription will stop your running deployments except the trial deployment. You can keep using the trial deployment until the trial ends.
2. The stopped deployment will be deleted after 3 days.
:::



