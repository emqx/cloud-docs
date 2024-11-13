# VPC Peering Connection

::: tip Note
This feature is only available for Dedicated and Premium deployments.
:::

VPC peering connection is a network connection between two VPCs. Through this connection, the instances in different VPCs can communicate with each other as if they are in the same network.

## Precautions

1. EMQX Platform only supports creating peering connections in **the same region**.
2. EMQX Platform does not accept CIDR in the range of 10.11.1.0/24 ~ 10.64.255.0/24.
3. Peering connections are bound to resources. Please create peering connections before creating resources.

## AWS Cloud VPC Peering Connection

<LazyIframeVideo vendor="youtube" src="https://www.youtube.com/embed/ajnLBS3LLKY/?autoplay=1&null" />

### Create a Peering Connection

1. Log in to the [EMQX Platform console](<https://cloud-intl.emqx.com/console>) and enter your deployment.

1. Click **Network Management** from the left menu. In the **VPC Peering Connection** area, click the **+ VPC Peering Connection** button.

3. Record the following information on the pop-up dialog for future use, and leave the dialog box open.

   - **Region of Deployment**
   - **VPC ID of Deployment**
   - **CIDR of Deployment**
   - **Account ID of EMQX Platform**

   ![create-vpc1](./_assets/aws_vpc_peering.png)

2. Log in to the Amazon Web Services console, and switch to the "Region of Deployment" that is recorded in the previous step. 

5. Go to **Networking & Content Delivery** -> **VPC** -> **Peering Connection**, and click the **Create Peering Connection** button.

   * Select `Another account` for **Account**.
   * Enter the **Account ID** with the `Account ID of EMQX Platform` recorded before.
   * Select `This region(us-east-1)` for **Region**.
   * Enter the **VPC (Accepter)** with the `VPC ID of deployment` recorded before.

   ![aws-vpc-request](./_assets/aws-vpc-request.png)

   After you complete the settings, click **Create Peering Connection**.

3. Once created, you will see a VPC peering entry listed. Record the information in **Requester VPC owner**, **Requester VPC ID** and **VPC Peering Connection** at the bottom of the page for future use.

   ![aws-vpc1](./_assets/aws-vpc1.png)

4. Return to the [EMQX Platform Console](<https://cloud-intl.emqx.com/console>), complete the rest of VPC Peering Connection settings with the information recorded from the AWS console, and click the **Confirm** button.

   * **Peering ID**: enter the information in **VPC Peering Connection** in the AWS console.
   * **VPC ID**: enter the information in **Requester VPC ID** in the AWS console.

   ![create-vpc2](./_assets/aws_vpc_peering_info.png)

5. Return to Amazon Web Services console, go to `Networking & Content Delivery` -> `VPC` -> `Route Tables`, add the `CIDR of deployment` recorded in step 1 to the route table of the corresponding VPC.

   ![route-tables](./_assets/route-tables.png)

6. Go to `Networking & Content Delivery` -> `VPC` -> `Security Groups`,configure the security group bound to the corresponding VPC, edit inbound rules and add a rule.

   ![security-groups](./_assets/security-groups.png)

### Delete a Peering Connection

To delete a peering connection, you need to ensure that the status of peering connection is `running`.

::: tip

Before deleting the peering connection, please make sure that there are no associated resources in the deployment, otherwise there will be unpredictable risks.

:::

1. Go to the VPC Peering Connection area on the Network Management page in your deployment.

   ![vpc-list](./_assets/aws_vpc_peeing_status.png)

2. Click the "delete" icon in the **Actions** column of the peering connection.

   ![vpc-delete](./_assets/aws_vpc_peering_delete.png)

## Azure VPC Peering Connection

### Step 1

1. Log in to [EMQX Platform console](<https://cloud-intl.emqx.com/console>) and enter your deployment.
2. Click **Network Management** from the left menu. In the **VPC Peering Connection** area, click the **+ VPC Peering Connection** button.
3. A pop-up window will appear and ask for information on **Subscription ID**, **Tenant ID**, **Resource Group Name**, and **VNet Name**.

### Step 2

Go to the **Virtual Networks** section in your Microsoft Azure workplace. Find the network you plan to build a VPC peering connection, and copy and paste the **Subscription ID**, **Resource Group Name**, and **VNet Name** into the pop-up window in the EMQX Platform console.

### Step 3

In your Microsoft Azure workplace, go to the **Azure Active Directory** section, and copy and paste the **Tenant ID** into the pop-up window in the EMQX Platform console.

### Step 4

After providing all the required information:

1.  Click on the **Next** button.
2.  Follow the guidelines shown on the page to set up the Vnet.
3.  After doing all the steps, click on the **Validated** button to validate the setting of the connection and then click on **Initiate Peering**.

### Step 5

If all the provided information is correct, after several minutes, when the status of the VPC peering connection turns to "running," the VPC peering connection with your Azure services is created successfully.

## GCP VPC Peering Connection

### Create a Peering Connection

1. Log in to [EMQX Platform console](<https://cloud-intl.emqx.com/console>) and enter your deployment.
   
2. Click **Network Management** from the left menu. In the **VPC Peering Connection** area, click the **+ VPC Peering Connection** button.

1. On the pop-up dialog, enter the following information:
   
    * **Project ID**: GCP Project ID of your peering VPC
    * **VPC Network Name**:  Network Name of your peering VPC
    
      
   
   Record the following information for future use:
    * **VPC Network Name of deployment**
    * **CIDR of deployment**
     * **Project ID of EMQX Platform**
   
    ![gcp_create_peering](./_assets/gcp_vpc_peering.png)
   
2. Log in to your GCP console, create the peering connection.
    1. In the Google Cloud Console, click **VPC network peering**.
    2. Click **CREATE PEERING CONNECTION**, and click **Continue**
    3. In **Name**, enter a name for your peering connection.
    4. In **Your VPC Network**, enter the name of your GCP VPC network.
    5. In **Peered VPC network**, select **In another project**.
    6. In **Project ID**, enter EMQX Platform Project ID. You can find this name in the VPC Peering view in EMQX Platform.
    7. In **VPC network name**, enter your EMQX Platform VPC Network Name. You can find this name in the VPC Peering view in EMQX Platform.
    8. Click **CREATE**.

   ![gcp_peering](./_assets/gcp_peering.png)

3. You will see the status of peering connection is **Active** if succeeded.

   ![gcp_console_peering](./_assets/gcp_console_peering.png)
   and you will see the status of VPC Peering on EMQX Platform is **running**.
   ![gcp_peering_result](./_assets/gcp_vpc_peering_status.png)

4. Create firewall to allow your EMQX Platform deployment to access your GCP network
   1. Click **Firewall**, and Click **CREATE FIREWALL RULE**.
   2. In **Network**, select your GCP network
   3. In **Targets**, select **All instances in the network**, or you can select other option according to your situation.
   4. In **Source IP ranges**, fill in the CIDR of deployment in step 1
   5. Select your Protocols and ports.

### Delete a Peering Connection

To delete a peering connection, you need to ensure that the status of peering connection is `running`.

::: tip

Before deleting the peering connection, please make sure that there is no associated resources in the deployment, otherwise there will be unpredictable risks

:::

1. Go to the VPC Peering Connection area on the Network Management page in your deployment.

   ![vpc-list](./_assets/gcp_vpc_peering_status.png)

2. Click the "delete" icon in the **Actions** column of the peering connection.

   ![vpc-delete](./_assets/gcp_peering_delete.png)

## Confluent Cloud Peering Connection

After the Confluent Cloud cluster has been created, you can add peering by referring to the following steps:

1. Go to the **Networking** section of the **Cluster settings** page and click on the **Add Peering** button.

   ![addPeering](./_assets/confluent_addPeering.png)

2. Enter the vpc information. (You could get the information from `VPC Peering` section of the deployment console).

   ![vpc_info](./_assets/confluent_vpc1.png)

   ![vpc_info](./_assets/aws_vpc_peering.png)

3. When the connection status is `Inactive`, go back to the deployment console to accept the peering request. Fill in the vpc information of the confluent cloud cluster and click `Confirm`. When the vpc status turns to `running`, you successfully create the vpc peering connection.

   ![vpc](./_assets/aws_vpc_peeing_status.png)

### Delete a Peering Connection

To delete a peering connection, you need to ensure that the status of peering connection is `running`.

::: tip

Before deleting the peering connection, please make sure that there are no associated resources in the deployment, otherwise there will be unpredictable risks

:::

1. Go to the VPC Peering Connection area on the Network Management page.

   ![vpc-list](./_assets/aws_vpc_peeing_status.png)

2. Click the "delete" icon in the **Actions** column of the peering connection.

   ![vpc-delete](./_assets/aws_vpc_peering_delete.png)
