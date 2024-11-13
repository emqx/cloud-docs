# Internal Load Balancers

::: warning Note
This feature is not available in the standard deployment.
:::

Intranet load balancing is a service that distributes traffic on demand in the internal network, extending the throughput capacity of applications by distributing traffic to different back-end servers, and eliminating single points of failure in the system to improve the availability of applications.

Before start, you will need to complete the following actions:

* Professional deployments (EMQX clusters) have been created on the EMQX Platform.
* [Create the vpc peer connection](../deployments/vpc_peering.md). All IPs mentioned below refer to the resource's internal IP.

## Enable Internal Endpoint

1. Go to your Dedicated deployment in the EMQX Platform Console.

2. Click **Network Management** from the left menu. Navigate to the **Internal Endpoint** area and click **+Internal Endpoint**.

3. In the pop-up dialog, check to accept the Value Added Service Agreement and click **Buy Now**.

   <img src="./_assets/create_internal_endpoint_dedicated.png" style="zoom:50%;" />

4. After purchasing the service, you can see the creation status on the page. Wait for the creation process to be completed.

   When the status turns to be `Running`, you can connect terminals under the VPC that have completed VPC peering to the deployment via the internal network address. The connection ports are consistent with the public network connection ports: MQTT port is 1883, and the WebSocket port is 8083.

   ![intranet_lb_info](./_assets/intranet_lb_info_dedicated.png)
