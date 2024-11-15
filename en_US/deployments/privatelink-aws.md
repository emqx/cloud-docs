# AWS PrivateLink

::: tip Note
This feature is only available for Dedicated and Premium deployments.
:::

This page provides detailed instructions on enabling the PrivateLink feature for EMQX Platform deployments on the Amazon AWS platform. By enabling PrivateLink, your EMQX deployment can access AWS-hosted services through a secure and private connection within your virtual network. This ensures that communication remains isolated from the public internet, improving both security and performance.

In this setup, your EMQX Platform deployment’s Virtual Private Cloud (VPC) acts as the service user, establishing a connection to the service provider’s VPC, where your AWS resources reside.

## Create Endpoint Service Using AWS PrivateLink

This section demonstrates the steps to create an AWS Endpoint Service using AWS PrivateLink, which allows EMQX deployments to securely connect to AWS services. This is crucial for ensuring that your EMQX deployment communicates privately and directly with AWS services via a private connection within the VPC. This process involves setting up the required AWS resources, configuring load balancers, and enabling PrivateLink on the EMQX Platform.

### Obtain AZ ID from EQMX Platform Console

When creating an Endpoint Service in AWS, the Availability Zone ID (AZ ID) of your Load Balancer (LB) must match the AZ ID in your EMQX Platform deployment. To obtain the AZ ID:

1. Go to your deployment in the EMQX Platform Console.
2. Click **Network Management** from the left menu. Navigate to the **PrivateLink** area and click **+PrivateLink**.
3. In the pop-up dialog, you will see the availability zone details for the deployment.

<img src="./_assets/deployment_privatelink_details.png" alt="lb" style="zoom:67%;" />

### Complete Preparatory Steps on the AWS Platform

Before configuring PrivateLink, complete the following steps on the AWS platform.

1. Register an AWS account and enable the PrivateLink service.

2. Create an EC2 instance and VPC.

3. Create a target group for load balancing.

   - On **Basic configuration**, set the **Target group name**, **Protocol** (TCP), and **Port**.

     ![lb](./_assets/lb_target_group_1.png)

   - On **Health checks**, set the **Override** port, and for the rest, you can keep the default setting or set as your business needs.

     ![lb](./_assets/lb_target_group_2.png)

   - Register target group and create instance.

     ![lb](./_assets/lb_target_group_3.png)

4. Create and configure the LB with the AZ ID you obtained from EMQX Platform Console.

   - Select **Network Load Balancer** as the type of load balancing and click **Create**.

     ![lb](./_assets/lb_type.png)

   - Select the schema type as internal to facilitate requests to private IP addresses.

     ![lb](./_assets/lb_1.png)

   - Select the TCP protocol, fill in the listening port and the corresponding target group.

     ![lb](./_assets/lb_2.png)

   - After creating the load balancer, check whether the listening port status of the target group is healthy.

     ![lb](./_assets/lb_3.png)

### Create An Endpoint Service

Follow the instructions below and refer to [AWS Help](https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html#create-endpoint-service-nlb) to complete the configuration.

1. Find the Endpoint Services in the left menu bar of your AWS account and click **Create**. Select the load balancer type as **Network**, and select the load balancer created in the previous step.

   ![endpoint service](./_assets/endpoint_service_1.png)

2. In the additional settings, select the IP address type as IPV4.

   ![endpoint service](./_assets/endpoint_service_2.png)

3. Once created, you will get the endpoint service name.

   ![endpoint service](./_assets/endpoint_service_3.png)

## Enable PrivateLink on EMQX Platform

1. After getting the AWS ARN where the deployment is located in EMQX Platform Console, add it to the allowed principals entry of your AWS Platform-Endpoint Service.

   ![lb](./_assets/endpoint_service_grant.png)

   Once added, click **Allow principals** and go to the next step.

2. In the AWS platform, locate your Endpoint Service, copy the service name, and enter it into the **Enter the name of Endpoint Service** field on the EMQX Platform Console. Then, click **Create PrivateLink**.

   <img src="./_assets/p6.png" alt="lb" style="zoom:67%;" />

3. Once completed, find the Endpoint Service - Endpoint Connection in your AWS platform and click `Accept Endpoint Connection Request`.

   ![lb](./_assets/accept_enpoint_service.png)

4. Wait until the status of the PrivateLink in the deployment overview shows `Running`, indicating a successful connection.

   ![lb](./_assets/privatelink_status.png)

## Delete the PrivateLink

To remove the private connection, you need to ensure that the PrivateLink status is `running`.

> - If you need to remove the PrivateLink service from your AWS platform, please remove the PrivateLink from EMQX Platform console first, otherwise it will cause PrivateLink status of the deployment to be `failed`.
> - Please ensure that there are no associated resources in the deployment before removing the PrivateLink, otherwise it will lead to unpredictable risks.

1. Go to the PrivateLink area on the Network Management page of your deployment.

2. Click the "delete" icon in the **Actions** column of the PrivateLink. Click **Confirm** to complete the deletion.

   ![delete](./_assets/delete_privatelink.png)

