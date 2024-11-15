# NAT Gateway

::: warning Note
This feature is not available in the standard deployment.
:::

The Network Address Translation (NAT) gateway provides network address translation services. Before the NAT gateway is activated, some functions of the Dedicated/Premium deployment, such as extended authentication and data integration, cannot access public network resources. Once subscribed, it allows access through public network addresses.

Before you start, make sure you have created a Professional deployment (EMQX clusters) on the EMQX Platform.

## Enable NAT Gateway

1. Go to your Dedicated deployment in the EMQX Platform Console.

2. Click **Network Management** from the left menu. Navigate to the **NAT Gateway** area and click **+NAT Gateway**.

3. In the pop-up dialog, check to accept the Value Added Service Agreement and click **Buy Now**.

   <img src="./_assets/create_nat_dedicated.png" style="zoom:50%;" />

4. After purchasing the service, you can see the creation status on the page. Wait for the creation process to be completed.

   Once the NAT Gateway's status is `Running`, the deployment can access public network resources.

   ![intranet_lb_info](./_assets/gateway_info_dedicated.png)
