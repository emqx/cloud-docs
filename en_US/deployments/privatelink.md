# Configure PrivateLink

The PrivateLink feature within EMQX Platform facilitates a secure and stable private connection between the Virtual Private Cloud (VPC) that hosts the EMQX Platform deployment and services within the public cloud. This integration streamlines network architecture, offers private service accessibility, and mitigates potential security concerns linked to using services over the public network.

Within the private connection, the EMQX Platform deployment VPC acts as the service user, sending requests to the VPC where the user's resources are located in the cloud service provider, that is, the service provider's VPC.

You can configure the PrivateLink on the EMQX Platform Console. The configurations differ for deployments on different platforms and require you to create the private link services on cloud platforms. Refer to the following pages on the configuration instructions for deployments on specific platforms.

- [AWS PrivateLink](./privatelink-aws.md)
- [Azure PrivateLink](./privatelink-azure.md)

