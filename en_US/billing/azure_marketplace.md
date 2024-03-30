# Manage Billing from Azure Marketplace

EMQX Platform supports paying for usage via the Azure Marketplace. You can link an EMQX account to an Azure Billing Account and delete an existing subscription.


## Link an Azure Billing Account to EMQX Platform

1. Sign in to your [Azure account](https://portal.azure.com/#home).

2. Navigate to [Azure Marketplace](https://portal.azure.com/#view/Microsoft_Azure_Marketplace/MarketplaceOffersBlade/selectedMenuItemId/home).

3. Search for "EMQX Platform (Pay as you go)" in the search bar. Alternatively, you can click **Azure Marketplace** at the bottom of the EMQX Platform Sign-in and Sign-up page to go to the target page.

4. On the EMQX Platform product overview page, click **Subscribe**. 

5. You are redirected to the **Basics** tab, where you can fill in the information for **Project details** and **SaaS details**. For more information on how to fill in the information, you can refer to the [Azure Documentation](https://learn.microsoft.com/en-us/marketplace/purchase-saas-offer-in-azure-portal).

   ::: tip

   If you use the service for more than a trial, it is recommended to select `On` for **Recurring billing**.

   ::: 

6. Proceed to the **Tags** tab. You can leave the options blank.

7. Continue to **Review + Subscribe** to go through the offer and plan details.

8. Upon confirmation, select **Subscribe**.

9. During the subscription process, you will be informed of the tips to configure the account on the EMQX Platform website. Click **Configure account now** and open the EMQX Sign-in page.

   - You are automatically redirected to the index page if you are already signed in to an existing EMQX account. A modal will display the status of linking to your Azure Billing Account.
   - If you are not already signed in to an existing EMQX account, you are prompted to sign in to an EMQX account. Upon successful sign-in, you are automatically redirected to the index page. A modal will display the status of linking to your Azure Billing Account.

10. Wait for the system to finish syncing.
    EMQX Platform index page displays a pop-up notifying you of the account syncing status. Additionally, the Payment Method field of the Billing page will change to Azure Marketplace Subscription when the sync is complete.

::: warning
The following situations will cause a failure in account linking.

1. The EMQX account already has been set up a credit card.
2. The EMQX account uses Available Credits.
3. The EMQX account already has been linked to a Marketplace EMQX product.

If you still encounter a problem, please submit a [ticket](../feature/tickets.md) to get help.

:::


## Unlink an Azure Billing Account from EMQX Platform

1. Sign in to your [Azure account](https://portal.azure.com/#home).
2. Navigate to [SaaS](https://portal.azure.com/#view/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.SaaS%2Fresources) management page.
3. Select the **EMQX Platform (Pay as You Go)** subscription that you wish to unlink.
4. You can find all the details about the subscription on the SaaS detail information page.
5. Click the **Cancel subscription** button in the top right of the page. Then confirm the unsubscription.

::: warning
1. Canceling the subscription will stop your running deployments except for the trial deployment. You can keep using the trial deployment until the trial ends.
2. The stopped deployment will be deleted after 3 days.

:::

