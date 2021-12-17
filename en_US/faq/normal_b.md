# Ordinary Development Questions


## Which protocol connections are supported?
EMQ X Cloud deployment supports MQTT over TLS/SSL, Websockets over TLS/SSL protocol connections.

If you need other protocol support, you can submit a ticket or send an email (cloud@emqx.io) to us.


## How can I scale deployment?

**Professional Plan** deployments can be scaled smoothly without disrupting business. You can contact us by submitting a ticket or email (cloud@emqx.io) for more information.

## How to bind a domain name？

When you create a deployment in EMQ X Cloud, you will be given an MQTT connection address, which is displayed as an IP in the Professional deployment and as a second-level domain ending in emqx.cloud in the Standard deployment.

You may already have your own domain name and would like to be able to bind to your own domain.

> Note: mqtts and wss ports will not be available on Standard after the domain is bound.

### Steps
1. Let's assume you have the top-level domain abc.com and want to access the mqtt service as mqtt.abc.com, and your deployment on EMQ X Cloud has a connection address of 123.123.123.123.

2. Point the A record from mqtt.abc.com to 123.123.123.123 in your domain setting panel.

> Note: If you choose Standard Plan, you will need to point the CNAME record from mqtt.abc.com to 123.123.123.123

3. Once the DNS resolution has taken effect, you can connect to the mqtt service via mqtt.abc.com.

## How to set up NAT gateway configuration?
NAT is only supported for **Professional plan**, please submit a ticket to get in touch with us.


## Will cluster scaling affect the device connectivity?
It will cause the interruption to the connectivity on seconds.

## How do I connect my own services to the MQTT service via local network when I have built a VPC peer-to-peer connection?
If you need an intranet connection to deploy to mqtt, you will need to submit a ticket and contact us to open SLB.

## Is API supported？
Yes. An HTTP API is provided for integration with external systems, such as querying client information, posting messages and creating rules.

Find more here [REST API](../api/api_overview.md)。

## What kind of TLS/SSL authentication is supported?
Support [one-way](../deployments/tls_ssl.md),[two-way](../deployments/tls_ssl.md),和 [custom signature](../deployments/tls_ssl.md) for configuration.


## How to integrate with other systems?
You can use Rule Engine to integrate with other applications. Check [Rule Engine](../rule_engine/introduction.md) for more details.

## The authentication data of the device is stored in my own database. Can I do the authentication of MQTT connections through my own database?
It is not yet supported to get data directly from your own database. You can import data from csv files together. Or you can submit a ticket or send an email (cloud@emqx.io) to us.


## How long can device logs be kept in the console?
EMQ X Cloud does not keep device communication logs, only deployment event logs, which are kept for 7 days by default.


## How long can device events be stored in the console?
Device event data can be saved permanently.



