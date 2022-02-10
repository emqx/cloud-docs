# Get Started with EMQX Cloud

Welcome to EMQX Cloud! EMQX Cloud is the first fully hosted MQTT 5.0 public cloud service in the world. With the support of EMQX Cloud,
you can create an EMQX cluster on the cloud and use all the features of EMQX Enterprise Edition. This allows you to spend more time on business
connections and less time for EMQX operation, maintenance, and management. This tutorial will guide you through the process of creating and connecting
to EMQX Cloud deployment. Before starting, let's review some core concepts and phrases:

* Deployment: EMQX Enterprise cluster hosted on EMQX Cloud
* Basic Plan: Single node version of EMQX Enterprise
* Professional Plan: An EMQX Enterprise Edition cluster with separate networks, instances, and load balancing
  
  <div style="position: relative; padding: 30% 45%;">
  <iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://www.youtube.com/embed/nOmIomoFn28" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>


If you have not yet created an account for EMQX Cloud, the following steps will guide you through the creation of your account. You can also skip this step to view the console quick guide.

## Register Guide

### [Register an account](https://www.emqx.com/en/signup?continue=https://www.emqx.com/en/cloud)

Start at the EMQX Cloud sign up page

1. Enter your personal information:
   
   * Email
   * Password
   * Country / Region

![login](./_assets/sign_up.png)

2. Click `Sign Up` to register to create your account.
   EMQX Cloud will automatically send a confirmation email to the email address you provided.
3. Click on the link in the confirmation email to verify your new account. The link will verify your account
   and redirect you to the login page.
4. Now you are ready to log in to EMQX Cloud.

### [Login to the account](https://www.emqx.com/en/signin?continue=https://www.emqx.com/en/cloud)

If you've already registered an account, you could log in by the following steps:

1. Go to EMQX Cloud login page.
2. Enter your email and password.
3. Click `Sign in` to direct to the EMQX Cloud page.

![login](./_assets/log_in.png)



### [Forget Password](https://www.emqx.com/en/forgot-password?continue=https://www.emqx.com/en/cloud)

If you forget your password, you could click on `Forget your password` and enter your email address, we will send a verification email to your mailbox.

You can click Get back Password in the verification email to create a new password, 
then you will be redirected to the login page. Enter the new password, and select `Sign in`.
![login](./_assets/forget_password.png)


## Console Guide

You can follow these steps shown below to quickly complete the EMQX Cloud Console Guide.


1. Visit EMQX Cloud [console](https://cloud-intl.emqx.com/console/) and create a free trial deployment
   
   ![console](./_assets/free_trial.png)


2. Visit Authentication & ACL page to add authentication information

   ![authentication](./_assets/auth.png)


3. Click the menu on the left to get the deployment connection information and ports

   ![authentication](./_assets/detail.png)
    

4. Use the MQTT client or SDK that you are familiar with to [connect to the deployment](../connect_to_deployments/overview.md) 
   ![authentication](./_assets/mqttx_connect.png)
   
