# Ordinary Development Questions

## Which protocol connections are supported?

EMQX Cloud deployment supports MQTT over TLS/SSL and WebSockets over TLS/SSL protocol connections.

If you need other protocol support, you can submit a ticket or send an email (cloud@emqx.io) to us.

## How can I scale deployment?

**Professional Plan** deployments can be scaled smoothly without disrupting business. You can contact us by submitting a ticket or emailing cloud@emqx.io for more information.

## How to bind a domain name？

When you create a deployment in EMQX Cloud, you will be given an MQTT connection address, which is displayed as an IP in the Professional deployment and as a second-level domain ending in emqx.cloud in the Standard deployment.

You may already have your own domain name and would like to be able to bind to your own domain.

> Note: mqtts and wss ports will not be available on Standard after the domain is bound.

### Steps

1. Let's assume you have the top-level domain abc.com and want to access the MQTT service as mqtt.abc.com, and your deployment on EMQX Cloud has a connection address of 123.123.123.123.

2. Point the A record from mqtt.abc.com to 123.123.123.123 in your domain setting panel.

    > Note: If you choose Standard Plan, you will need to point the CNAME record from mqtt.abc.com to 123.123.123.123

3. Once the DNS resolution has taken effect, you can connect to the MQTT service via mqtt.abc.com.

## How to set up NAT gateway configuration?

NAT is only supported for **Professional plan**. You can enable NAT gateway in Valued-Added Service.

## Will cluster scaling affect device connectivity?

It will cause an interruption to the connectivity for a few seconds.

## How do I connect my own services to the MQTT service via local network when I have built a VPC peer-to-peer connection?

If you need an internal network connection to deploy to MQTT, you will need to submit a ticket and contact us to open SLB.

## Is API supported？

Yes. An HTTP API is provided for integration with external systems, such as querying client information, posting messages, and creating rules.

Find more here [REST API](../api/api_overview.md)。

## What kind of TLS/SSL authentication is supported?

Support [one-way](../deployments/tls_ssl.md), [two-way](../deployments/tls_ssl.md), and [custom signature](../deployments/tls_ssl.md) for configuration.

## How to integrate with other systems?

You can use data integrations to integrate with other applications. Check [Data Integrations](../rule_engine/introduction.md) for more details.

## The authentication data of the device is stored in my own database. Can I do the authentication of MQTT connections through my own database?

It is not yet supported to get data directly from your own database. You can import data from csv files together. Or you can submit a ticket or send an email (cloud@emqx.io) to us.

## How long can device logs be kept in the console?

EMQX Cloud does not keep device communication logs, only deployment event logs, which are kept for 7 days by default.

## How long can device events be stored in the console?

Device event data can be saved permanently.
