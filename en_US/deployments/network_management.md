# Network Management

::: tip Note

Network Management is only available for Dedicated deployments.

:::

The EMQX Platform provides a range of network management options to enable secure, efficient, and reliable connectivity for your Dedicated or Premium deployments. Once a deployment is created, you can access the **Network Management** section from the left menu on the deployment overview page.

This section includes essential features for managing network access, optimizing routing, and maintaining network security within your EMQX deployments. For detailed instructions on configuring and using each feature, click the following links:

- **[VPC Peering Connection](./vpc_peering.md)**: Establishing secure, direct network connections between your EMQX VPC and your application’s VPC within the same or different regions.
- **[PrivateLink](./privatelink.md)**: Connecting to EMQX services securely over a private AWS or Azure network.
- **[Internal Endpoints](../vas/intranet-lb.md)**: Distributing incoming traffic across multiple EMQX instances within the VPC peering network.
- **[NAT Gateway](../vas/nat-gateway.md)**: Enabling your EMQX instances to communicate with external services while keeping internal resources private.