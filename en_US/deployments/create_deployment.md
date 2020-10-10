# Create a new deployment
In this tutorial, you will learn how to create a new EMQ X Cloud deployment. To learn how to delete an existing EMQ X Cloud deployment, please refer to [Delete Deployment](./delete_deployment.md).

## limitation

* Before creating a deployment, your account balance cannot be less than the total cost of the created deployment for **24** hours. You can go to [Price Estimate](https://cloud.emqx.io/console/deployments/0?oper=new) to view the hourly cost of the selected deployment specification* 24, and you can go to [Payment Overview Page](https ://cloud.emqx.io/console/billing/overview)  to complete the account balance recharge.

  > The deployment specification is 1000 lines, 100 tps, and the hourly price is 2.26 Yuan, then your account balance should be greater than **55** yuan (2.26 * 24)



## Create deployment

1. Log in to your account and navigate to EMQ X Cloud [Console](https://cloud.emqx.io/console/).
2. Click the **New button** in the upper right corner to enter the deployment price estimation page.
3. Choose the deployment of the corresponding specifications according to your needs.
   * Choose cloud platform: EMQ X Cloud temporarily supports Huawei Cloud and Ali Cloud. If you have other cloud service provider requirements, you can submit a [ticket](../contact.md) or email (cloud@emqx.io) )  us.
   * Select region: EMQ X Cloud temporarily supports Huawei Cloud (Guangzhou, Shanghai, Beijing) and Alib Cloud (Shenzhen, Shanghai, Hangzhou, Beijing). If you have other regional requirements, you can submit [Ticket](../contact. md) Or contact us via email (cloud@emqx.io).
   * Select the maximum number of connections: For the maximum number of client connections allowed, you can increase or decrease the maximum number of connections through [Upgrade Deployment Specifications](./upgrade_deployment.md) later.
   * Message uplink and downlink TPS: the sum of the number of messages sent and received per second of deployment. You can increase and decrease the message uplink and downlink TPS through [Upgrade Deployment Specifications](./upgrade_deployment.md) later.
4. Check the deployment information in the **Basic Information** column on the right.
2. Click **Deploy Now** and agree to the EMQ X Cloud Terms of Service. You will be redirected to the console deployment details page.
3. Wait 5 ~ 10 minutes until the deployment running status is **running**.
4. You can go to [Connect to Deployment](../connect_to_deployments/README.md) to see more ways to connect to deployment.

![create_deployment](_assets/create_deployment.png)
