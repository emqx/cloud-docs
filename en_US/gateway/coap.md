# CoAP Gateway

The CoAP Gateway enables lightweight device connection, designed specifically for resource-constrained devices. It is suitable for low-power, low-bandwidth scenarios and supports the CoAP-based publish-subscribe mechanism.

## Operating Modes

The CoAP Gateway supports two operating modes:

- **Connectionless Mode**
  - Complies with the [Publish-Subscribe Broker for CoAP](https://datatracker.ietf.org/doc/html/draft-ietf-core-coap-pubsub-09) protocol.
  - No connection authentication, session management, or heartbeat maintenance is required.
  - Supported functionalities:
    - Message publishing
    - Topic subscription
- **Connection Mode**
  - Introduces connection authentication, session persistence, and heartbeat mechanisms.
  - Clients must establish a connection and obtain a session token (Token). Subsequent communications must include the token in the query string.
  - Supported functionalities:
    - Create connection
    - Close connection
    - Session persistence (optional heartbeat)
    - Authentication

The connection mode can be configured on the CoAP Gateway settings page.

::: tip

Connection mode only adds connection management APIs. Publish, subscribe, and unsubscribe operations remain available but require `ClientId` and `Token` in every request. 

:::

## Basic Settings

Click the **Settings** button in the **Actions** column of the CoAP Gateway to configure its basic settings:

- **Connection Required**: Enable or disable the connection mode. Enabled by default.
  - `true`: Enables connection mode. In this mode, clients require connection authentication, session persistence, and session tokens (Token) for communication. Suitable for scenarios requiring stricter connection management.
  - `false`: Disables connection mode, switching to connectionless mode. In this mode, clients only publish and subscribe to messages without connection management.
- **Notification Message Type**: Determines the notification type of CoAP messages. Default: `qos`.
  - `qos`: Quality of Service (QoS), used to control message delivery reliability.
  - `con`: Confirmable messages, requiring client acknowledgment after sending.
  - `non`: Non-confirmable messages, not requiring acknowledgment, suitable for less critical or discardable messages.
- **Heartbeat**: Configures the heartbeat interval between the CoAP Gateway and clients. Heartbeat messages detect the connection status and ensure it remains active. If the heartbeat times out, the connection may be terminated. Default: `30 seconds`.
- **Subscribe QoS**: Sets the quality of service level for subscribed messages. Default: `coap`.
- **Publish QoS**: Sets the quality of service level for published messages. Default: `coap`.
- **MountPoint**: Configures the CoAP Gateway's mount point. The mount point is a URL path prefix in the CoAP protocol that allows users to define specific URL path structures for data exchange and access by different applications or clients.

After completing the settings, click **Update** to save the configuration.

## Clients

The Clients tab of the CoAP page displays basic information about clients connected to the deployment. In the **Actions** column, you can choose to disconnect a specific client.

### Client Connection Guide

For details, refer to the [CoAP Client Connection Guide](./connection_interface.md).

### Connection Address and Port

The connection address and port information can be found on the deployment overview page.

### Publish-Subscribe

The CoAP Gateway implements publish-subscribe functionality based on the [Publish-Subscribe Broker for CoAP](https://datatracker.ietf.org/doc/html/draft-ietf-core-coap-pubsub-09). Permission management is unified through [Client Authorization](../deployments/authz_overview.md).

### Client Libraries

The following client libraries are recommended for development and testing:

- [libcoap](https://github.com/obgm/libcoap)
- [californium](https://github.com/eclipse/californium)

## Authentication Management

This feature is available only in connection mode. The `ClientId`, `username`, and `password` are provided in the client’s [Create Connection](./connection_interface.md#create-connection) request.

On the gateway page, click the **Authentication** button in the **Actions** column of the CoAP Gateway to open the authentication management page. Here, you can add, edit, or delete authentication information.
