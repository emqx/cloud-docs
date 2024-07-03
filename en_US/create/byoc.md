# Create a BYOC Deployment

EMQX Platform Bring Your Own Cloud (BYOC) plan supports creating deployments in your own cloud infrastructure to ensure that data is kept in your environment. This deployment improves data security and control while avoiding risks such as data leakage. In addition, EMQX BYOC deployment can provide better performance and scalability to meet the needs of different scenarios. This page describes how to create and use a BYOC deployment.

## Prerequisites

Before you create a BYOC deployment, you must prepare an account corresponding to the public cloud, plan cloud resources, and apply for an EMQX BYOC product license. For more information, see [Deployment Prerequisites](../deployments/byoc_prerequisite.md).

## Create a Deployment

1. Log in to your account and enter the [EMQX Platform Console](https://cloud-intl.emqx.com/console/).

2. To initiate a new deployment for your project, navigate to either the Console's homepage or the Deployment List page. Here, click **+ New Deployment**.

3. In **Choose Plan**, select **BYOC**.

4. Configure the settings for the BYOC plan according to your needs.

   ![BYOCSpecification](./_assets/byoc_specification.png)

   **Cloud Provider & Region Configuration**:

   - **Choose Cloud Platform**: Select **AWS** or **Google Cloud**.

     If you want to deploy on other cloud platforms, you can contact us through a [ticket](../feature/tickets.md) or [email](<mailto:cloud-support@emqx.io>).

   - **Choose Region**: Select the region to be deployed.

     If you want to deploy in other regions, you can contact us through a [ticket](../feature/tickets.md) or [email](<mailto:cloud-support@emqx.io>).

   **Configuration (for EMQX Cluster)**:
   ::: tip
   The maximum number of sessions must match the number specified in the EMQX BYOC license you request. After the deployment is complete, if you need to modify the sessions limit, you can contact us through a [ticket](../feature/tickets.md).
   :::

   - **Sessions Limit**: Specify the maximum number of concurrent sessions for MQTT devices connected at any given time.

   - **Pub&Sub TPS**: Specify the maximum number of transactions per second (TPS) for the messages sent and received.

   - **EMQX Node Instance Type**: Automatically selected based on the **sessions limit** and **Pub&Sub TPS**; You can also modify the instance type based on your actual business needs.

   - **EMQX Node Quantity**: Automatically filled based on the **sessions limit** and **Pub&Sub TPS**; You can also modify the number of nodes (2-5 nodes) based on your actual business needs.

   - **VPC CIDR Block**: Select the private IP address range used to create the Virtual Private Cloud (VPC).

   **Deployment Name & Project**:

   - **Deployment Name**: Enter a deployment name that has business meaning.
   - **Project**: Select the appropriate project.

   **Tags (Optional)**: Add cloud resource tags according to your needs for resource management, with up to 10 tags supported.

5. Click the **New Deploy** button on the right to launch the deployment. This stage will prompt you to review and accept the *EMQX Platform Services Agreement*. It's important to thoroughly read the agreement and accept its terms to proceed.

6. Accept the terms and it will redirect you to the deployment overview page. 

Next, you can start the deployment by following the steps in the [Run Deployment](#run-deployment) section.

## Run Deployment

On the deployment overview page, the deployment status should be **Waiting for Deployment**. At this point, the **Connection Information** will not display any deployment details. Click the **Start Deployment** button, and a **Deployment Guide** sidebar will pop up to guide you through the deployment process. You can also follow the steps below to complete the deployment.

The instructions below shows how to complete the deployment in an Ubuntu 20.04 (AMD64) environment with a public network connection. Before you start, copy your TLS/SSL certificates and BYOC license files required for deployment to your Ubuntu environment directory.

:::: tabs
::: tab "AWS"

1. Open the prepared Ubuntu 20.04 (AMD64) environment. This Ubuntu environment should be able to access the internet.

2. In the Ubuntu command line interface, use the command below to download the toolkit and save it to your Ubuntu directory.

   ```bash
   wget https://cloudassets.emqx.com/en/byoc-deployments/5.1.0/create-aws-byoc-deployment.tar.gz
   ```

3. Use the command line below to unzip the downloaded toolkit and navigate to the unzipped folder directory.

   ```bash
   tar -zxf create-aws-byoc-deployment.tar.gz && cd create-aws-byoc-deployment
   ```

4. Populate the actual parameters for the fields in the `./byoc create` command:

   ```bash
   ./byoc create \
         --platform aws \
         --accessKey <Your AccessKey> \
         --secretKey <Your SecretKey> \
         --domain <Your Domain> \
         --sslCertPath <Your Domain SSL Absolute Cert Path>  \
         --sslKeyPath <Your Domain SSL Absolute Key Path> \
         --byocEndpoint https://cloud-intl.emqx.com \
         --byocKey abcdXXXXXXXXXX111
   ```

   - `--accessKey`: Enter your access key ID for your AWS IAM user.
   - `--secretKey`: Enter your access key secret for your AWS IAM user.
   - `--domain`: Enter the domain name (like your.domain.com) of the MQTT service in the deployment through which subsequent clients will access the MQTT service.
   - `--sslCertPath`: Specify the absolute path where the TLS/SSL certificate is located, supporting only **CA-signed certificates**. For SSL certificate format requirements, refer to [TLS/SSL Configuration for BYOC Plan](../deployments/byoc_ssl.md). Note: BYOC provides custom one-way TLS/SSL authentication.
   - `--sslKeyPath`: Specify the absolute path where the TLS/SSL certificate key is located, supporting only **CA-signed certificates**. For requirements on the format of the SSL certificate key, refer to [TLS/SSL Configuration for BYOC Plan](../deployments/byoc_ssl.md).

   Do not modify the following three values that are automatically filled in when the deployment guide is generated in the console.
   
   - `--platform` specifies the cloud provider.
   - `--byocEndpoint` is the EMQX Platform access address.
   - `--byocKey` is the authentication key for BYOC deployment. The generated byocKey is valid for one hour, and should be executed as soon as possible after generating the script command.
5. Execute the `./byoc create` command and wait for a few minutes. The system prompts you to confirm the cloud resource that needs to be created. Enter `yes` to continue.

   ```bash
   Do you want to perform these actions?
     Terraform will perform the actions described above.
     Only 'yes' will be accepted to approve.
   
     Enter a value: 
   ```

:::
::: tab "Google Cloud"

1. Open the prepared Ubuntu 20.04 (AMD64) environment. This Ubuntu environment should be able to access the internet.

2. In the Ubuntu command line interface, use the command below to download the toolkit and save it to your Ubuntu directory.
	
	```bash
	wget https://cloudassets.emqx.com/en/byoc-deployments/5.1.0/create-gcp-byoc-deployment.tar.gz
	```

3. Use the command line below to unzip the downloaded toolkit and navigate to the unzipped folder directory.

   ```bash
   tar -zxf create-gcp-byoc-deployment.tar.gz && cd create-gcp-byoc-deployment
   ```

4. Populate the actual parameters for the fields in the `./byoc create` command:

   ```bash
   ./byoc create \
         --platform gcp \
         --projectID <Your Project ID> \
         --authJSONPath <The absolute path of your Service Account JSON file> \
         --domain <Your Domain> \
         --sslCertPath <Your Domain SSL Absolute Cert Path>  \
         --sslKeyPath <Your Domain SSL Absolute Key Path> \
         --byocEndpoint https://cloud-intl.emqx.com \
         --byocKey abcdXXXXXXXXXX111
   ```

   - `--projectID`: Enter your Google Cloud project ID. You can find it in the project selector at the top bar of Google Cloud Console.
   - `--authJSONPath`: Enter the path to the JSON file for your [Google Cloud service account key](https://cloud.google.com/iam/docs/keys-create-delete#creating).
   - `--domain`: Enter the domain name (like your.domain.com) of the MQTT service in the deployment through which subsequent clients will access the MQTT service.
   - `--sslCertPath`: Specify the absolute path where the TLS/SSL certificate is located, supporting only **CA-signed certificates**. For SSL certificate format requirements, refer to [TLS/SSL Configuration for BYOC Plan](../deployments/byoc_ssl.md). Note: BYOC provides custom one-way TLS/SSL authentication.
   - `--sslKeyPath`: Specify the absolute path where the TLS/SSL certificate key is located, supporting only **CA-signed certificates**. For requirements on the format of the SSL certificate key, refer to [TLS/SSL Configuration for BYOC Plan](../deployments/byoc_ssl.md).

   Do not modify the following three values that are automatically filled in when the deployment guide is generated in the console.

   - `--platform` specifies the cloud provider.
   - `--byocEndpoint` is the EMQX Platform access address.
   - `--byocKey` is the authentication key for BYOC deployment. The generated byocKey is valid for one hour, and should be executed as soon as possible after generating the script command. 

5. Execute the `./byoc create` command and wait for a few minutes. The system prompts you to confirm the cloud resource that needs to be created. Enter `yes` to continue.

   ```bash
   Do you want to perform these actions?
     Terraform will perform the actions described above.
     Only 'yes' will be accepted to approve.
   
     Enter a value: 
   ```
:::
::::

## Add DNS Record

When the deployment resources is created, the system returns the following information. Based on the returned IP address, you can add a domain name resolution record to the DNS service to bind the deployed public IP address to your domain name. For basic concepts such as DNS and domain name resolution, refer to [DNS Concepts](https://developers.cloudflare.com/dns/concepts/).

```bash
Apply complete! Resources: 45 added, 0 changed, 0 destroyed.

Outputs:

cloud_register_data = <sensitive>
jwt_token = <sensitive>
lb_address = "<Your Deployment IP>"
password = "<EMQX Dashboard Password>"
username = "<EMQX Dashboard Username>"
vpc_id = "vpc-bp1n1dwiv2srgkgle4rlu"
*****************************
You need add a record to your DNS service provider.
IP address: 112.124.9.12
Domain: <Your Custom Domain>
*****************************
Checking if <Your Custom Domain> is resolved to the 112.124.9.12 of the load balancer
```

You can choose DNS resolution services provided by your cloud platforms or other managed DNS providers. Taking Cloud DNS of Google Cloud Platform as an example, you can follow the instruction: [Add, modify, and delete records | Cloud DNS | Google Cloud](https://cloud.google.com/dns/docs/records). 

When the DNS record takes effect, the system returns `HTTPS listener is ready`.

```bash
HTTPS listener is ready
```

## Complete Deployment
After the domain name resolution is completed, the Ubuntu command line interface will output the following to indicate that the deployment is successful.
```bash
Deployment successful! Here is the service information:
--------------------------------------------------------
EMQX service connection address: <Your Custom Doamin>
EMQX Dashboard address: https://<Your Custom Doamin>:18084
EMQX Dashboard username: <EMQX Dashboard Username>
EMQX Dashboard password: <EMQX Dashboard Password>
You can log in to the EMQX Platform Console(https://cloud.emqx.com/console) to manage your deployment.
--------------------------------------------------------
Thank you for choosing our service. Happy IoT!
```

Please securely save the EMQX Dashboard username and password, as it will be used for logging into the management console and for cluster management. This information will not be displayed again in the future.

## View Deployment Information

Return and refresh the deployment overview page to obtain real-time status and connection information:

   ![byoc](./_assets/byoc_deployment_console.png)

**Real-time Status:**

- **Deployment Name**: The name of the deployment, which also serves as the prefix for cloud resources, making it easier to quickly locate in the public cloud console.
- **Instance Status**: Running status and creation time.
- **Sessions**: Current number of connections and the maximum allowed.
- **Pub&Sub TPS**: The current number of messages sent and received per second in the deployment, along with the TPS limit.

**Connection Information:**

- **Address**: The domain name specified by the user during deployment.
- **Connection Ports**: By default, ports 1883 (mqtt), 8883 (mqtts), 8083 (ws), and 8084 (wss) are opened for MQTT protocol access; 18084 (https) and 8443 (https) are used for Dashboard login and REST API access, respectively.

If you wish to customize the ports, please contact us via [support ticket](../feature/tickets.md) or email (cloud-support@emqx.io).

**License Information:**

Includes basic license information and expiration date. For more details about the license, refer to [BYOC License](../deployments/byoc_license.md).

## Advanced Network Settings


### VPC Peering Configuration

A Virtual Private Cloud (VPC) peering is a network connection between two VPCs that allows two VPCs in different networks to communicate with each other. This feature is provided by a cloud service provider and supports peering connections between the VPC where the BYOC is deployed and other VPCs in the same cloud service provider. To configure the VPC peering, refer to the VPC Peering documentation for each public cloud: [Working with VPC Peering - Amazon Web Service](https://docs.aws.amazon.com/vpc/latest/peering/working-with-vpc-peering.html) and [VPC Network Peering - Google Cloud](https://cloud.google.com/vpc/docs/vpc-peering).
### NAT Gateway Configuration

The NAT gateway provided by the public cloud platform can provide network address translation services and provide BYOC deployments with the ability to access public network resources without the need for VPC peering connections. You can add NAT gateways in the VPC where BYOC is deployed. For more information, refer to the public cloud NAT gateway documentation: [NAT Gateways - Amazon Web Service](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html) and [Cloud NAT - Google Cloud](https://cloud.google.com/nat/docs/overview).
## Connect to the Deployment

You can connect to the deployment using any MQTT client tool for testing, for example, the recommended [MQTTX](../connect_to_deployments/mqttx.md).