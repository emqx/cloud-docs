# Get Started

This section guides you through a quick experience of the various functions and features of the EMQX Platform product, starting from creating an account. If you already have an account, you can skip this step and directly check [Create Deployment](../create/overview.md).

## EMQX Platform Trial

You can explore and try EMQX Platform products through our Serverless free quota or the Dedicated plan's 14-day free trial.

Free Tier for Serverless Plan includes:

- **1 million** session minutes per month
- **1 GB** of traffic per month
- **1 million** rule actions per month

14 Days Free Trial for the Dedicated Plan includes:

* 1000 sessions
* 14 days free trial
* 100 GB free traffic
* Data integration, monitoring management, and other proprietary features
* Supports MQTT, and WebSockets protocol connections.

Free trial deployment precautions:

- If there are no client connections for 5 consecutive days during the trial period, the trial deployment will be stopped, but your deployment instance will be retained. If you want to continue the trial, please manually enable it in the Platform Console.
- After the trial expires, if your account has an available credits, the deployment will continue to run and charges will automatically be applied on an hourly basis.
- After the trial expires, if your account has no available balance, the deployment will be preserved for 3 days. After 3 days, the trial deployment will be automatically deleted.

## Create and Log into an EMQX Platform Account

### [Sign Up](https://accounts.emqx.com/signup?continue=https://www.emqx.com/cn/cloud)

1. Enter the required information such as name, email, password, and mobile number. According to regulatory requirements, registration requires mobile verification for real-name authentication.
2. Click **Start free trial**, and EMQX Platform will automatically send a confirmation email to the email address you provided.
4. To verify your new account, click the link in the confirmation email, which will verify your account and return you to the login page.

### [Sign In](https://accounts.emqx.com/signin?continue=https%3A%2F%2Fcloud-intl.emqx.com%2Fconsole%2Fdeployments%2F0%3Foper%3Dnew)

Enter your email and password, then click **Sign In** to be redirected to the EMQX Platform console.

### [Password Recovery](https://accounts.emqx.com/forgot-password?continue=https%3A%2F%2Fwww.emqx.com%2Fcn%2Fcloud)

If you forget your password, you can click **Forgot your password?** on the login page, and we will send a verification email to your mailbox. You can click on the reset password in the verification email to create a new password and log in.

## Create a Deployment

Log into the [EMQX Platform Console](https://cloud.emqx.com/console/), where you can view the summary information of the current deployment, manage projects and users, etc. This section guides you through the quick process of creating a deployment.

1. On the start page, click **New Deployment** to go to the New Deployment page.

2. Select the **Serverless** plan. Leave all the deployment settings at their default values.

   For detailed descriptions of deployment settings, refer to [Create a Deployment](../create/overview.md). 

   Confirm your deployment information in the **Summary** area on the right and click the **Deploy** button at the bottom. This stage will prompt you to review and accept the *EMQX Platform Services Agreement*. It's important to thoroughly read the agreement and accept its terms to proceed.

   ![create_deployment](./_assets/create_deployment.png)

You have now completed the deployment creation process and need to wait for the deployment to be created. After the deployment status appears to **Running**, you can access the deployment overview page by clicking the deployment card just created.  

![serverless_overview](./_assets/serverless_overview.png)

## Configure Authentication

To ensure the security of your data, before officially connecting various clients/applications, you should also add authentication information for this deployment in **Access Control**. Go to the deployment's **Access Control** -> **Authentication** page [to add authentication information](../deployments/default_auth.md).

![add_users](./_assets/auth.png)

::: tip

Keep this user information safe. When using MQTTX to verify client connections, you will be required to provide the **username** and **password** established at this stage.

:::

## Use MQTTX to Verify Connection

EMQX Platform recommends using [MQTTX](https://mqttx.app) to test the connection to your deployment, but you can also use familiar [SDKs or other tools](../connect_to_deployments/overview.md) to connect to your deployment. Before using MQTTX to connect to your deployment, you need to obtain the deployment's authentication information.

Next, we will introduce how to test the connection using [MQTTX](https://mqttx.app). For detailed content, refer to [Testing Connection with MQTTX](../connect_to_deployments/mqttx.md).
