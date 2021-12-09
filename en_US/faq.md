# FAQ

## Product

### What's EMQ X Cloud？

EMQ X Cloud is an MQTT messaging middleware product for the IoT domain from EMQ. As the world's first fully managed MQTT 5.0 public cloud service, EMQ X Cloud provides a one-stop O&M colocation and a unique isolated environment for MQTT messaging services. In the era of the Internet of Everything, EMQ X Cloud can help you quickly build industry applications for the IoT domain and easily realize the collection, transmission, computation, and persistence of IoT data.
### What is EMQ X Cloud deployment?

The deployment is an EMQ X Enterprise cluster hosted by EMQ X Cloud

### What's EMQ X?

EMQ X (Erlang/Enterprise/Elastic MQTT Broker) is an open source IoT MQTT message server developed on the Erlang/OTP platform.

## Deployment

### Can I extend the free trial deployment time?

Yes.

If you have special usage requirements, or other usage conditions, you can submit a [ticket](feature/tickets.md) or send an email (cloud@emqx.io) to us, and we will reply within 24 hours.

### Which protocol connections are supported?

EMQ X Cloud deployment only supports MQTT over TLS/SSL, Websockets over TLS/SSL protocol connections.

If you need other protocol support, you can submit a [ticket](feature/tickets.md) or send an email(cloud@emqx.io) to us.

### How do I connect to the deployment?

You can connect through [MQTTX client](https://mqttx.app).

You can also connect through the SDK, for details, see [Connect to Deployment](connect_to_deployments/introduction.md).

### Does it support API calls?

Yes.

EMQ X provides HTTP API to achieve integration with external systems, such as querying client information, publishing messages, and creating rules.

For more information about how to use the API, you can refer to the guide-[REST API](./api/api_overview.md)

### How can I ensure the security of my deployment connection?

Encrypted communication can be realized by configuring TLS/SSL certificate.

For the configuration method, please refer to [configure TLS/SSL](deployments/./tls_ssl.md)

### Does it support one-way TLS/SSL authentication?

Yes.

For the configuration method, please refer to [configure TLS/SSL](deployments/./tls_ssl.md)

### Does it support mutual TLS/SSL authentication?

Yes.

For the configuration method, please refer to [configure TLS/SSL](deployments/./tls_ssl.md)

### Does it support custom signed TLS/SSL authentication?

Yes.

For the configuration method, please refer to [configure TLS/SSL](deployments/./tls_ssl.md)

### How to connect with my existing system?

You can use the rule engine to connect with your existing functions. For details, see [Rule Engine](rule_engine/introduction.md)

## Billing

### How to bill?

EMQ X Cloud charges based on the cluster instance specifications and message transmission network traffic, not the number of messages, and does not limit the use of API and rule engines.

For detailed billing rules, you can view [Product Pricing](pricing.md)

### How to pay?

EMQ X Cloud supports credit card payment, for more payment options please contact us.

### How to get the credits?

If you need to experience all the functions of the Standard Deployment, you can submit a [ticket](contact.md) or email (cloud@emqx.io) to get in touch with us, and we will issue a certain amount of creditss based on your business needs


Please pay attention to the update of EMQ x cloud.
