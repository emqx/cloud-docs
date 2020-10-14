# FAQ

## Product

### What's EMQ X Cloud？

EMQ X Cloud is an online SaaS service of EMQ X provided by the EMQ team.

In the past few years, EMQ has provided mature MQTT IoT messaging middleware and IoT platform related support services to many customers. During this period, we have accumulated a wealth of practical experience in IoT platform design, operation and maintenance management. Based on that, we launched the IoT platform public cloud service EMQ X Cloud, providing one-stop operation and maintenance management, and EMQ X access platform service with a unique isolation environment.

EMQ X Cloud provides safe and reliable two-way communication capabilities for applications and devices, and provides other value-added capabilities on the basis of supporting large-scale clusters and massive device connection, such as device management, rule engine, data persistence, and Kafka data bridging. It covers various IoT application scenarios and retains customization and expansion capabilities.

### What is EMQ X Cloud deployment?

The deployment is an EMQ X Enterprise cluster hosted by EMQ X Cloud

### What's EMQ X?

EMQ X (Erlang/Enterprise/Elastic MQTT Broker) is an open source IoT MQTT message server developed on the Erlang/OTP platform.

## Deployment

### Can I extend the free trial deployment time?

Yes.

If you have special usage requirements, or other usage conditions, you can submit a [ticket](contact.md) or send an email (cloud@emqx.io) to us, and we will reply within 24 hours.

### Which protocol connections are supported?

EMQ X Cloud deployment only supports MQTT over TLS/SSL, Websockets over TLS/SSL protocol connections.

If you need other protocol support, you can submit a [ticket](contact.md) or send an email(cloud@emqx.io) to us.

### How do I connect to the deployment?

You can connect through [MQTTX client](https://mqttx.app).

You can also connect through the SDK, for details, see [Connect to Deployment](connect_to_deployments/README.md).

### Does it support API calls?

Yes.

EMQ X provides HTTP API to achieve integration with external systems, such as querying client information, publishing messages, and creating rules.

For more information about how to use the API, you can refer to the guide-[REST API](api.md)

### How can I ensure the security of my deployment connection?

Encrypted communication can be realized by configuring TLS/SSL certificate.

For the configuration method, please refer to [configure TLS/SSL](deployments/tls_ssl.md)

### Does it support one-way TLS/SSL authentication?

Yes.

For the configuration method, please refer to [configure TLS/SSL](deployments/tls_ssl.md)

### Does it support mutual TLS/SSL authentication?

Yes.

For the configuration method, please refer to [configure TLS/SSL](deployments/tls_ssl.md)

### Does it support custom signed TLS/SSL authentication?

Yes.

For the configuration method, please refer to [configure TLS/SSL](deployments/tls_ssl.md)

### How to connect with my existing system?

You can use the rule engine to connect with your existing functions. For details, see [Message Storage](messages/README.md)

## Bill
### How to bill?

EMQ X Cloud charges based on the cluster instance specifications and message transmission network traffic, not the number of messages, and does not limit the use of API and rule engines.

For detailed billing rules, you can view [Product Pricing](pricing.md)

### How to payment?

In the EMQ X Cloud console, click the `Payment` button at the account balance of `Billing` -> `Overview`, and complete the monthly bill payment.

Currently, EMQ X Cloud supports `PayPal` to complete the monthly bill payment.

### How to get the voucher?

If you need to experience all the functions of the standard deployment, you can submit a [ticket](contact.md) or email (cloud@emqx.io) to get in touch with us, and we will issue a certain amount of vouchers based on your business needs

### Does it support annual and monthly payment?

It is not supported at present.

Please pay attention to the update of EMQ x cloud.
