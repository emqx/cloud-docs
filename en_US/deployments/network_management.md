# Network Management

::: tip Note

Network Management is only available for Dedicated or Premium deployments.

:::

The EMQX Platform provides a range of network management options to enable secure, efficient, and reliable connectivity for your Dedicated or Premium deployments. After you create a deployment, you can access the **Network Management** section from the left menu on the deployment overview page.

Network management in the EMQX Platform includes configurations for Virtual Private Cloud (VPC) peering, PrivateLink, NAT gateways, and internal load balancers. These features are essential for controlling network access, optimizing routing, and maintaining network security within and between your EMQX deployments.

Click the following links for specific instructions on using these features.

## [VPC Peering Connection](./vpc_peering.md)

The Virtual Private Clouds (VPC) Peering allows you to create a direct network connection between your EMQX deployment's VPC and your application VPC within the same or different regions. 

## [Configure PrivateLink](./privatelink.md)

PrivateLink provides a way to access EMQX services privately over the AWS or Azure network. By configuring PrivateLink, you can keep your EMQX services isolated from the public internet, allowing your clients to connect to EMQX brokers securely within your private network. 

## [Internal Load Balancers](../vas/intranet-lb.md)

Internal Load Balancers (ILBs) allow you to distribute incoming traffic across multiple EMQX instances within the VPC peering network. Internal load balancers keep your network traffic secure by restricting access to internal network boundaries, preventing external access.

## [NAT Gateway](../vas/nat-gateway.md)

A Network Address Translation (NAT) Gateway enables your EMQX instances to communicate with external services while keeping internal resources private. It allows instances in a private subnet to establish outbound connections with external services over the public network, without exposing their private IP addresses. 