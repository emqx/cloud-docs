# Create a Dedicated Deployment

EMQX Dedicated Plan offers independent MQTT service clusters with higher connection and Transactions Per Second (TPS) limits. It also supports more advanced features and complex network architectures. This guide uses the Dedicated Plan as an example to walk you through the steps of creating and utilizing the EMQX Platform.

## Create a Deployment

1. Log in to the [EMQX Platform console](https://cloud-intl.emqx.com/console/).

2. To initiate a new deployment for your project, navigate to either the Console's homepage or the Deployment List page. Here, click **+ New Deployment**.

3. In **Choose Plan**, select **Dedicated**.

   ![create_dedicated](./_assets/create_dedicated.png)

4. Configure the specifications according to your needs.

   - **Cloud Provider & Region**: See [Cloud Service Providers and Regions](../price/plans.md#supported-cloud-service-providers-and-regions) for support.
   - **Tier**: Select the specification from the drop-down box. Each specification limits a different maximum number of connections and TPS. If your requirements are not met, you can [contact us](https://www.emqx.com/contact?product=cloud).
   - **Billing Method**: You can select `Hourly billing` (to pay by the hour) or `Annual prepaid` (an annual billing plan).
   - **Deployment Name & Project**: Provide a name for your deployment and select the appropriate project.

5. Confirm the deployment information in the **Summary** area, and then click the **Deploy** button. This stage will prompt you to review and accept the *EMQX Platform Services Agreement*. It's important to thoroughly read the agreement and accept its terms to proceed.

6. Upon accepting the terms, the deployment will begin. Once the deployment status changes to **Running**, your deployment is successfully created and ready for use.

## View Deployment Information
After the deployment is created, it will appear on the EMQX Platform console home page. Click the Dedicated deployment card to enter the deployment overview page. On the overview page, you can check the real-time status and connection information for your deployment.


![dedicated](./_assets/dedicated_overview.png)

### Basic Information

- **Instance Status:** Running status and deployment creation time.
- **Sessions:** Current and maximum connection counts.
- **Pub&Sub TPS:** Current messages sent and received per second, as well as the TPS limit.
- **Traffic:** Traffic usage information for the deployment, including monthly usage and free quota.

### Connection Information

- **Address**: The IP address.
- **Ports**: `1883` (mqtt), `8083` (ws), `8883` (mqtts), and `8084` (wss) ports are enabled by default.
- **Ports Management**: Allows you to disable or enable an individual port separately.
- **CA Certificate**: Allows you to download a server-side CA-signed certificate file for verification and remindes you of the certificate expiration time.

Check out the [Connection guide](../deployments/port_guide_dedicated.md) to learn more.

## Dedicated Deployment Features

To explore the advanced features of the Dedicated Plan, refer to the following links to the specific sections.

### [REST API](https://docs.emqx.com/en/cloud/latest/api/dedicated)

Provides REST APIs for integration with external systems, such as querying client information, publishing messages, and creating rules.

### [Configure TLS/SSL](../deployments/tls_ssl.md)

EMQX Dedicated deployment provides custom one-way/two-way TLS/SSL configuration and supports self-signed and CA-signed certificates.

### [VPC Peering Connections](../deployments/vpc_peering.md)

VPC peering connection is a network connection between two VPCs. Through this connection, the instances in different VPCs can communicate with each other as if they are in the same network.


### [Configure PrivateLink](../deployments/privatelink.md)
PrivateLink enables the proprietary network VPC where the EMQX Platform deployment is located to establish a secure and stable private connection to services on the public cloud. It simplifies the network architecture, enables private access to services, and avoids the potential security risks associated with accessing services over the public network.

### [Internal Endpoint](../vas/intranet-lb.md)

Internal Endpoint allows you to create an internal load-balancing service that distributes traffic on-demand within an internal network. It can expand the application system's throughput by distributing traffic to different backend servers.


### [NAT Gateway](../vas/nat-gateway.md)

NAT gateway can provide network address translation services to provide Dedicated deployments with the ability to access public network resources without the need for VPC peering connections.

## Connect to the Deployment

You can use any MQTT client tool to connect to the deployment for testing. It is recommended to use [MQTTX to connect to the deployment](../connect_to_deployments/mqttx.md).
