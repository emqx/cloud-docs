# Configure PrivateLink

PrivateLink enables the proprietary network VPC where the EMQX Cloud deployment is located to establish a secure and stable private connection to services on the public cloud. It simplifies the network architecture, enables private access to services, and avoids the potential security risks associated with accessing services over the public network.

In the private connection, the EMQX Cloud deployment VPC acts as the service user and requests the VPC where the user's resources are located in the cloud service provider, i.e., the service provider.

## AWS PrivateLink

<LazyIframeVideo vendor="youtube" src="https://www.youtube.com/embed/vu_3KW4pq9A/?autoplay=1&null" />

### Before you begin

When creating Endpoint Service in AWS, the LB Availability Zone [AZ ID](https://us-east-1.console.aws.amazon.com/ram/home?region=us-east-1#Home) created should be identical to that in the EMQX Cloud deployment. To get the AZ ID in EMQX cloud:

Login to [EMQX Cloud Console](<https://cloud.emqx.com/console>), go to the desired deployment creation details, and click the `+PrivateLink` button to get the deployment availability zone.

![lb](./_assets/deployment_privatelink_details.png)

Before you can configure PrivateLink, you need to complete the following prerequisite steps on the AWS platform.

1. Register an AWS account and enable the PrivateLink service

2. Create an instance and VPC

3. Create a target group for load balancing

    On **Basic configuration**, set the **Target group name**, **Protocol** （TCP） and **Port**.

    ![lb](./_assets/lb_target_group_1.png)

    On **Health checks**, set the **Override** port, and for the rest, you can keep the default setting or set as your business needs.
    ![lb](./_assets/lb_target_group_2.png)

    Then register target group and create instance.
    ![lb](./_assets/lb_target_group_3.png)

4. Create and configure the Load Balancer with the AZ ID you obtained from EMQX Cloud Console.

    Select the type of load balancing as **Network Load Balancer**.
    ![lb](./_assets/lb_type.png)

    Select the schema type as internal to facilitate requests to private IP addresses.
    ![lb](./_assets/lb_1.png)

    Select the TCP protocol, fill in the listening port and the corresponding target group.
    ![lb](./_assets/lb_2.png)

    After creating the load balancer, check whether the listening port status of the target group is healthy.
    ![lb](./_assets/lb_3.png)

5. Create an endpoint service

    Find the Endpoint Services in the left menu bar of your AWS account and click Create. The load balancer type is Network, select the load balancer created in the previous step.
    ![endpoint service](./_assets/endpoint_service_1.png)

    In the additional settings, select the IP address type as IPV4.
    ![endpoint service](./_assets/endpoint_service_2.png)

    Once created, you will get the endpoint service name.
    ![endpoint service](./_assets/endpoint_service_3.png)

    You can refer to [AWS Help](https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html#create-endpoint-service-nlb) to complete the above configuration.

### Enable EMQX Cloud PrivateLink

1. After getting the AWS ARN where the deployment is located in EMQX Cloud console, add it to the allowed principals entry of your AWS Platform-Endpoint Service.

    ![lb](./_assets/endpoint_service_grant.png)

    Once added, click `Allow principals and go to the next step`.

2. Locate the Endpoint service on your AWS platform, copy the service name, fill it to the EMQX Cloud Endpoint service name, and click `Create PrivateLink`.

    ![lb](./_assets/p6.png)

3. Once completed, find the Endpoint Service - Endpoint Connection in your AWS platform and click `Accept Endpoint Connection Request`.

    ![lb](./_assets/accept_enpoint_service.png)

4. Wait for a while and check the status of the PrivateLink in the deployment details, `running` means it has been created successfully. Copy the `Address` for the next data integration-resource configuration.

    ![lb](./_assets/privatelink_status.png)

5. Click the Data Integration menu on the left, find the resource type, fill in the `Server` on the New Resource page with the private connection service connection domain and port, database and user information，click `Test`, and the resource will be available.

    ![lb](./_assets/privatelink_en_resource.png)

### Delete the PrivateLink

To remove the private connection, you need to ensure that the PrivateLink status is `running`.

> - If you need to remove the PrivateLink service from your AWS platform, please remove the PrivateLink from EMQX Cloud console first, otherwise it will cause PrivateLink status of the deployment to be `failed`.
> - Please ensure that there are no associated resources in the deployment before removing the PrivateLink, otherwise it will lead to unpredictable risks.

1. Go to Deployment Details

2. Click on the `Delete button` to the right of the PrivateLink and click on Confirm to complete the deletion.

    ![delete](./_assets/delete_privatelink.png)


## Azure PrivateLink
In the private connection, the EMQX Cloud deployment VPC acts as the service user and requests the VPC where the user's resources are located in the cloud service provider, i.e., the service provider. For more details about Azure PrivateLink, please refer to [this article](https://learn.microsoft.com/en-us/azure/private-link/create-private-link-service-portal?tabs=dynamic-ip)

### Pre-requisies
Before you can configure PrivateLink, you need to complete the following prerequisite steps on the Azure platform:

1.Register an Azure account and enable the PrivateLink service.

2.Create an instance and a VPC.

3.Create load balance.

Select the resource group, region, and network type as Internal.

![azure private](./_assets/azure_privatelink_1.png)

Click Next to configure the frontend IP.

![azure private](./_assets/azure_privatelink_2.png)

Click Next to configure the backend pool, select the NIC for the backend pool configuration, and associate the backend VM server.

![azure private](./_assets/azure_privatelink_3.png)

Select Save, and select Next: Inbound rules, in Inbound rules, select + Add an Inbound nat rule.

![azure private](./_assets/azure_privatelink_4.png)

Then review + create the load balance.

![azure private](./_assets/azure_privatelink_5.png)

### Create a privatelink service
Select the resource group and fill in the name.
![azure private](./_assets/azure_privatelink_6.png)


Select Next: Outbound settings, In the Outbound Settings tab, enter or select the following information.

![azure private](./_assets/azure_privatelink_7.png)

Then review + create the privatelink service.

![azure private](./_assets/azure_privatelink_8.png)



### Enable EMQX Cloud PrivateLink
Go to EMQX Cloud console, click + Privatelink to get Azure Subscription ID.

![azure private](./_assets/azure_privatelink_9.png)

Fill in the Azure subscription ID of EMQX Cloud into your PrivateLink service under Access Security for authorization.

![azure private](./_assets/azure_privatelink_10.png)

After clicking save, return to the overview page and obtain the privatelink service alias.

![azure private](./_assets/azure_privatelink_11.png)

Locate the Endpoint service on your Azure platform, copy the service alias name, fill it to the EMQX Cloud Endpoint service name, and click `Create PrivateLink`.

![azure private](./_assets/azure_privatelink_12.png)

Once completed, find the PrivateLink Service - Private Endpoint Connections in your Azure platform and click `Approve`.

![azure private](./_assets/azure_privatelink_13.png)

Wait for a while and check the status of the PrivateLink in the deployment details, `running` means it has been created successfully. Copy the `Address` for the next data integration-resource configuration.

![azure private](./_assets/azure_privatelink_14.png)

Click the Data Integration menu on the left, find the resource type, fill in the `Server` on the New Resource page with the private connection service connection domain and port, database and user information，click `Test`, and the resource will be available.

![azure private](./_assets/azure_privatelink_15.png)

### Delete the PrivateLink
To remove the private connection, you need to ensure that the PrivateLink status is running.

> If you need to remove the PrivateLink service from your Azure platform, please remove the PrivateLink from EMQX Cloud console first, otherwise it will cause PrivateLink status of the deployment to be failed.Please ensure that there are no associated resources in the deployment before removing the PrivateLink, otherwise it will lead to unpredictable risks.

1. Go to Deployment Details

2. Click on the Delete button to the right of the PrivateLink and click on Confirm to complete the deletion.

![azure private](./_assets/azure_privatelink_16.png)