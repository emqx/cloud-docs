# EMQX Platform Device Management/IoT Platform Integration Guide

## Introduction

This document provides a guide plan for EMQX Platform to integrate the user's own device management system or IoT platform for device authentication, device action and status management, and message data integration management. The contents are as follows:

- **Device authentication information management:** The platform uses REST API to add, delete, check, and modify authentication information. For API usage, refer to [Authentication Management](./api/auth.md).
- **View online status of device:**
  - The platform obtains a list of online devices through the REST API to check whether the device is online. For API usage, please refer to [Client Management](./api/client.md).
  - The platform uses data integrations to rewrite the status of the device in the private database or send it to a self-built service (Web service) when the device is online or offline.
- **Device offline alarm:** Notify the platform when the device is offline to determine whether an alarm is needed.
- **Device online and offline history:**
  - The platform uses data integrations to write the online and offline information into a private database or send it to a self-built service (Web service) when the device is online or offline.
- **Device publish and subscribe to ACL permission management:** The platform uses the REST API to add, delete, check and modify ACL permissions. For API usage, refer to [Access Control (ACL) Management](./api/acl.md).
- **Kick online device offline:** The platform kicked off online devices.
- **Proxy subscription:** The platform uses the REST API to subscribe or unsubscribe to topics for **online devices**. For API usage, please refer to [Topic subscription](./api/topic.md).
- **Publish a message to the device:** The platform publishes messages to specified topics through REST API or MQTT access and supports batch operations. For API usage, refer to [Message Publish](./api/pub.md).
- **Get device messages for bridging/storing:** Through data integrations, device events (online and offline, subscription/unsubscription, message publishing) and message data are stored in private databases (mainstream relational/non-relational, various time series databases), Kafka message queues, and self-built web services.
- **Business (such as message sending and receiving, connections) statistics:** Get relevant statistics through REST API. For API usage, please refer to [Metrics](./api/metrics.md).

  ![img](./_assets/product_description_en.png)

Figure 1 Schematic diagram of EMQX Platform cluster architecture

On EMQX Platform, users can create a highly available EMQX cluster with dedicated instances in just a few minutes, and immediately start prototype design and application development without paying attention to subsequent operation and maintenance work. After the product is online, the cluster can be expanded without stopping to cope with the capacity expansion caused by business growth, ensuring availability while maximizing cost savings.

Unlike most other public IoT Hub cloud platforms, EMQX Platform provides MQTT 5.0 server clusters with a unique isolated environment, which has significant cost advantages and fewer usage restrictions. In the case of a large number of messages, EMQX Platform can still maintain a low cost of use. Through functions such as peer-to-peer networks, it is possible to connect to big data analysis, message storage, and other business systems deployed by users in the private network.

## Device Authentication Information Management

The platform uses REST API to add, delete, check, and modify authentication information and applies platform-side operations on EMQX Platform.

   ![img](./_assets/http_rest_api.png)

## View Device Online Status

To obtain the online status of the device, EMQX Platform itself can query the online status, or record the online status in the platform's private database.

- The platform obtains the list of online devices through the REST API and queries whether the device is online.

  ![img](./_assets/http_rest_api.png)

- The platform uses data integrations to rewrite the status of the device in the private database or send it to a self-built service (Web service) when the device is online or offline.

  ![img](./_assets/http_rest_api_rule_engine.png)

## Device Offline Alarm

See the device's online and offline history below.

## Device Online and Offline History

The platform uses data integrations to write the online and offline information into a private database or send it to a self-built service (Web service) when the device is online or offline.

After receiving the device offline notification, the platform can perform offline alarm-related services.

  ![img](./_assets/http_rest_api_rule_engine.png)

## Publish and Subscribe ACL Permission Management through Device

It can set ACL permissions according to devices or topics to improve system security.

The platform uses REST API to add, delete, check, and modify ACL permissions.

  ![img](./_assets/http_rest_api.png)

## Kick Online Devices Offline

For abnormal devices or devices that need to be forced offline, the platform can use REST API to kick online devices offline.

  ![img](./_assets/http_rest_api.png)

## Proxy Subscription

The platform subscribes or unsubscribes to topics for **online devices** through the REST API, without the device actively initiating subscriptions, or upgrading or burning device software data.

  ![img](./_assets/http_rest_api.png)

## Publish a Message to the Device

The platform publishes messages to specified topics through REST API or MQTT access and supports batch operations.

  ![img](./_assets/http_rest_api_mqtt_client.png)

## Get Device Messages for Bridging/Storing

Through the data integrations, device events (online and offline, subscription/unsubscription, message publishing) and message data are stored in private databases (mainstream relational/non-relational, various time series databases), Kafka message queues, and self-built web services.

  ![img](./_assets/http_rest_api_rule_engine.png)

## Business Statistics (Message Sending and Receiving, Connections)

It obtains relevant statistical information through the REST API, including the number of online devices, subscription topics, topics, messages sent and received, and statistical indicators such as the number of messages sent and received.

  ![img](./_assets/http_rest_api.png)

## Access Example Code

You can go to [Connect to Deployment](./connect_to_deployments/overview.md) to learn more examples of MQTT client library accessing EMQX Platform.

## Other Functions

For integration details and other integration function requirements, you can submit a [ticket](./feature/tickets.md) or send an email (cloud-support@emqx.io) for consultation.
