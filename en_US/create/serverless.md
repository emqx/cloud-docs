
# Create Serverless Deployment

EMQX Cloud Serverless Plan offers a cost-effective and efficient way for developers or small businesses to test and develop IoT applications. This plan is based on secure and scalable clusters and can be easily deployed in just a few simple steps.

One of the biggest advantages of using Serverless deployment is that the billing for connection scenarios is based on actual usage. For more detailed information on the billing system, please refer to the pricing section in [Pricing and Billing](../price/pricing.md).


## Create a Deployment

1. Log in to [EMQX Cloud console](https://cloud-intl.emqx.com/console/).

2. To initiate a new deployment for your project, navigate to either the Console's homepage or the Deployment List page. Here, click **+ New Deployment**.

3. Select the **Serverless** tab.

   ![create_serverless](./_assets/create_serverless.png)

4. Specify the monthly **Spend Limit** for your Serverless deployment. This feature helps manage usage and prevent incurring charges beyond the complimentary resources. By default, it is set to 0 but can be adjusted after creation.

5. Under **Deployment Name & Project**, provide a name for your deployment and select the appropriate project.

6. Click the **Deploy** button on the right to launch the deployment. This stage will prompt you to review and accept the *EMQX Cloud Services Agreement*. It's important to thoroughly read the agreement and accept its terms to proceed.

7. Upon accepting the terms, the deployment will begin. The deployment's progress can be tracked on the **Projects** page. Once the status updates to **Running**, your deployment is successfully established and is now operational.


## View Deployment

After the deployment is created, it will appear on the Cloud console home page. Click the Serverless deployment card to enter the deployment overview page. On the overview page, you can check the real-time status and connection information for your deployment.

   ![serverless](./_assets/serverless_overview.png)

- **Instance status:** Running status and duration of operation.
- **Sessions:** Current and maximum connection counts.
- **Pub&Sub TPS:** Current messages sent and received per second, as well as the TPS limit.
- **Session minutes**: Total number of session minutes used this month. This value is calculated with a one-hour delay.
- **Traffic:** Usage information for the deployed traffic, including monthly usage and free quota.
- **Deployment name:** A customizable name for the deployment.
- **Address:** The address for the client/terminal device to connect EMQX Cloud.
- **Ports:** `8883` (mqtts) and `8084` (wss) are enabled by default. Check out the [connection guide](../deployments/port_guide_serverless.md) to learn more.
- **Spend Limit**: Maximum spending limit for the current month. For more information, please refer to the [Spend Limit](../deployments/spend_limit.md) page.

::: warning Note
Serverless deployment only supports ports `8883` (mqtts) and `8084` (wss). If your client needs a CA file, you can click [here](https://assets.emqx.com/data/emqxsl-ca.crt) to download.

:::

## Connect to Serverless Deployment Using MQTTX

EMQX Cloud recommends using [MQTTX](https://mqttx.app) to test the connection to the deployment, but you can also use your preferred [SDK or other tools](../connect_to_deployments/overview.md) for connection. Before connecting to the deployment using MQTTX, you first need to obtain the deployment connection address (Host) and port (Port) and user authentication information.

1. Get the connection information. Click **Overview** on the left navigation menu to find the deployment connection address and port. 

2. Add client authentication information. Click on **Access Control** -> **Authentication** in the left menu, click the **Add** button, enter the username and password for the client or device, and then click **Confirm**.

   ![add_users](./_assets/serverless_auth.png)

3. Set up the connection information in [MQTTX](https://mqttx.app/zh/) and connect to the deployment.

   ![mqttx_mqtt](./_assets/mqttx_serverless.png)

4. After a successful connection, you can publish and subscribe to messages.

   ![mqttx_mqtt](./_assets/create_serverless_connect.png)

## Deployment Stopping and Deletion

**Stopped by the system**: If there are no active client connections to the deployment for 30 consecutive days, the deployment will be stopped by the system. If you wish to continue using it, please manually enable it in the console.

**Deleted by the system**: If the deployment is not activated within 30 days after being stopped, it can be deleted.



