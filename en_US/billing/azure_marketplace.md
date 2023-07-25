# Manage Billing from Azure Marketplace

EMQX Cloud supports paying for usage via the Azure Marketplace. You can link an EMQX account to an Azure Billing Account, as well as delete an existing subscription.


## Link an Azure Billing Account to EMQX Cloud

1. Sign in to your [Azure account](https://portal.azure.com/#home).
2. Navigate to [Azure Marketplace](https://portal.azure.com/#view/Microsoft_Azure_Marketplace/MarketplaceOffersBlade/selectedMenuItemId/home).
3. Search for "EMQX Cloud (Pay as you go)" in the search bar. Alternatively, you can click **Azure Marketplace** at the bottom of the EMQX Cloud Sign in and Sign up page to go to the target page.
4. On the EMQX Cloud product overview page, click **Subscribe**.
5. On the Basics info page, fill in the info in “Project details“ and “SaaS details“. If you use the service more than a trial, it’s recommended to select “On“ in recurring billing. Then, click the **Next: Tags** button at the bottom.
6. On the Tags info page, you can leave the optional blank, and click **Next Review + subscribe**.
7. On the Review + Subscribe page, check the summary and click **Subscribe**.
8. In the last subscription progress, you will be informed of the tips to configure the account on the EMQX Cloud website. Click **Configure account now** and open the EMQX Sign in page.

- If you are already signed in to an existing EMQX account, you are automatically redirected to the index page. A modal will display the status of linking to your Azure Billing Account.
- If you are not already signed in to an existing EMQX account, you are prompted to sign in to an EMQX account. Upon successful sign-in, you are automatically redirected to the index page. A modal will display the status of linking to your Azure Billing Account.
8. Wait for system to finish syncing.
	EMQX Cloud index page displays a pop-up notifying you that account syncing status. Additionally, the Payment Method field of the Billing page will change to Azure Marketplace Subscription when the sync is complete.

::: warning
The following situations will cause a failure on account linking.

1. The EMQX account already has been set up a credit card.
2. The EMQX account uses Available Credits.
3. The EMQX account already has been linked to a Marketplace EMQX Cloud product.

If you still encounter a problem, please submit a [ticket](../feature/tickets.md) to get help.

:::


## Unlink an Azure Billing Account from EMQX Cloud

1. Sign in to your [Azure account](https://portal.azure.com/#home).
2. Navigate to [SaaS](https://portal.azure.com/#view/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.SaaS%2Fresources) management page.
3. Select the **EMQX Cloud (Pay as You Go)** subscription that you wish to unlink.
4. On the SaaS detail information page, you can find all the details about the subscription.
5. Click **Cancel subscription** button in the top right of the page. Then confirm the unsubscription.

::: warning
1. Cancelling subscription will stop your running deployments except the trial deployment. You can keep using the trial deployment until the trial ends.
2. The stopped deployment will be deleted after 3 days.
:::



