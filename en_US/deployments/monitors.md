# Monitors

In the monitors, you can see the deployment metrics, client details, and information about subscriptions.

## Deployment metrics

* Concurrent sessons
* Total TPS
	- The Total TPS contains the total rate of messages received and sent per second
* Total messages sent
* Total messages recieved
* [Retained messages](https://www.emqx.com/en/blog/mqtt5-features-retain-message)
* Topics
	- The number of topics is the total number of topics currently subscribed to by all clients
* Subscriptions
	- The number of subscriptions is the total number of topics currently subscribed to in each client
* [Shared subscriptions](https://www.emqx.com/en/blog/introduction-to-mqtt5-protocol-shared-subscription)

::: tip
The number of subscriptions is calculated per client, while topics are unique subscriptions and the same topic may be subscribed by different clients.
:::

![monitor](./_assets/monitor.png)


## Clients

The clients list includes the following information:

* Client ID
* Username
* IP Address
* Keepalive
* Protocol
* Connect status
* Connected At
* Actions

![client](./_assets/client.png)

## Subscriptions

The subscription list includes the client's subscribed topic details.

* Client ID
* Topic
* QoS

![Subscriptions](./_assets/subscription.png)
