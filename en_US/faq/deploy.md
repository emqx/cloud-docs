# Deployment Related Question

## Can I extend the free trial deployment?

Yes.

If you have special requirements or other conditions, you can submit a ticket or send an email (cloud-support@emqx.io) to us, and we will reply within 24 hours.

## How to connect to the deployment?

You can connect via client such as [MQTT X](https://mqttx.app). You can also connect via the SDK, see [Connect to Deployments](../connect_to_deployments/overview.md) for more information.

## What are the common causes for connection failure?

1. Check that the deployment is in a running state and that the system will automatically stop for deployments that are not actively connected.
2. Check that the connection address and port are correct. If it is a Standard instance, the port numbers are not 1883 and 8883.
3. Authentication is required. You need to set a username and password in `Authentication` > `Authentication` and connect via the correct username and password.

## My deployment has been deleted by mistake, can I recover it?

You need to double check the right deployment name before deleting a deployment. Deployments cannot be recovered after they have been deleted.

## How can I get the messages sent by the client in deployment console?

Messages sent from the client cannot be viewed directly in the deployment console and need to be persisted using data integrations for forwarding, while EMQX Cloud does not store client messages.
