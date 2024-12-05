# CoAP Client Connection Guide

### Create Connection

Only available in `Connection Mode`.

This interface is used to create a client connection to the CoAP gateway. When the authentication of the CoAP gateway is enabled, the gateway will verify the `clientid`, `username`, and `password` provided by this request to prevent illegal users.

**Request Parameters:**

- Method: `POST`
- URI: `mqtt/connection{?QueryString*}`, the `QueryString` is:
  - `clientid`: required parameter, UTF-8 string. The gateway uses this string as a unique identifier for the connection
  - `username`: optional parameter, UTF-8 string. Used for connection authentication.
  - `password`: optional parameter, UTF-8 string. Used for connection authentication.
- Payload: empty

**Response:**

- Return Code:
  - `2.01`: Connection created successfully. The token string for this connection will be returned in the message body.
  - `4.00`: Bad request. Detailed error information will be returned in the message body.
  - `4.01`: Not authorized. The request format is validated, but authorization failed.
- Payload: When the return code is `2.01`, the message body is `Token`, otherwise it is `ErrorMessage`.
  - `Token`: The token string to be used for subsequent requests.
  - `ErrorMessage`: the error description messages.

Take `libcoap` as an example:

```bash
# Create a connection with clientid=123 and username/password=admin/public
# Returns Token: 3404490787
coap-client -m post -e "" "coap://${your-deployment-connection-address}/mqtt/connection?clientid=123&username=admin&password=public"

3404490787

```

::: tip

Once the connection is successfully created, you can verify it in the client list on the CoAP Gateway page for the corresponding deployment.

:::

### Close Connnection

Only available in `Connection Mode`.

This interface is used to close the CoAP connection.

**Request Parameters:**

- Method: `DELETE`
- URI: `mqtt/connection{?QueryString*}`, the `QueryString` is:
  - `clientid`: required parameter, UTF-8 string. The gateway uses this string as a unique identifier for the connection
  - `token`: required parameter, Using the token string returned by the Create Connection request
- Payload: empty

**Response:**

- Return Code:
  - `2.01`: Close connection successfully.
  - `4.00`: Bad request. Detailed error information will be returned in the message body.
  - `4.01`: Not authorized. The request format is validated, but authorization failed.
- Payload: When the return code is `2.01`, the message body is `Token`, otherwise it is `ErrorMessage`.

For example:

```bash
coap-client -m delete -e "" "coap://${your-deployment-connection-address}/mqtt/connection?clientid=123&token=3404490787"
```

### Heartbeat

Only available in `Connection Mode`.

This interface is used to maintain the connection between the CoAP client and the gateway. When the heartbeat expires, the gateway deletes the session and subscription, and releases all resources for that client.

**Request Parameters:**

- Method: `PUT`
- URI: `mqtt/connection{?QueryString*}`, the `QueryString` is:
  - `clientid`: required parameter, UTF-8 string. The gateway uses this string as a unique identifier for the connection
  - `token`: required parameter, Using the token string returned by the Create Connection request
- Payload: empty

**Response:**

- Return Code:
  - `2.01`: Close connection successfully.
  - `4.00`: Bad request. Detailed error information will be returned in the message body.
  - `4.01`: Not authorized. The request format is validated, but authorization failed.
- Payload: When the return code is `2.01`, the message body is `Token`, otherwise it is `ErrorMessage`.

For example:

```bash
coap-client -m put -e "" "coap://${your-deployment-connection-address}/mqtt/connection?clientid=123&token=3404490787"
```

:::tip

The heartbeat interval is configured in the CoAP Gateway settings under the `heartbeat` option, with a default value of 30 seconds.

:::

### Message Publish

This interface is used by the CoAP client to send messages to the specified topic. Additional identity information needs to be carried if the `Connection Mode` is enabled.

**Request Parameters:**

- Method: `POST`
- URI: `ps/{+topic}{?QueryString*}`
  - `{+topic}` is the topic of publish messages, i.e. the URI is `ps/coap/test` if publish message to `coap/test`.
  - `{?QueryString}` is request parameter:
    - `clientid`: required in `Connection Mode` and optional in `Connectionless Mode`.
    - `token`: `Connection Mode` only, required parameter.
    - `retain` (optional): Whether to publish as a retained message. It is a boolean, default: `false`.
    - `qos`: Message QoS, which identifies the QoS level of the message and affects only how the MQTT client receives the message. Enum with `0`, `1`, `2`.
    - `expiry`: Message expiry interval in seconds, default is 0 which means never expire
- Payload: Message payload

**Response:**

- Return Code:
  - `2.04`: Publish successfully
  - `4.00`: Bad request. Detailed error information will be returned in the message body.
  - `4.01`: Not authorized. The request format is validated, but authorization failed.
- Payload: When the return code is `2.04`, the message body is empty, otherwise it is `ErrorMessage`.

For example, publish a message in `Connectionless Mode`:

```bash
coap-client -m post -e "Hi, this is libcoap" "coap://${your-deployment-connection-address}/ps/coap/test"
```

Or carry `clientid` and `token` in `Connection Mode`:

```bash
coap-client -m post -e "Hi, this is libcoap" "coap://${your-deployment-connection-address}/ps/coap/test?clientid=123&token=3404490787"
```

### Topic Subscribe

This interface is used by the CoAP client to subscribe a topic. Additional identity information needs to be carried if the `Connection Mode` enabled.

**Request Parameters:**

- Method: `GET`
- Options: Set `observer` to `0`
- URI: `ps/{+topic}{?QueryString*}`
  - `{+topic}` is the topic to subscribe, i.e. the URI is `ps/coap/test` if to subscribe `coap/test`.
  - `{?QueryString}` is request parameters:
    - `clientid`: required in `Connection Mode` and optional in `Connectionless Mode`.
    - `token`: `Connection Mode` only, required parameter.
    - `qos`: Subscription QoS to indicate which MessageType (`CON` or `NON`) is used by the gateway to deliver messages to CoAP client. Enumerated with:
      - `0`: Using `NON` message to delivery
      - `1` or `2`: Using `CON` message to delivery
- Payload: empty

**Response:**

- Return Code:
  - `2.05`: Subscribe successfully
  - `4.00`: Bad request. Detailed error information will be returned in the message body.
  - `4.01`: Not authorized. The request format is validated, but authorization failed.
- Payload: When the return code is `2.05`, the message body is empty, otherwise it is `ErrorMessage`.

For example, subscribe to `coap/test` in `Connectionless Mode`:

```bash
coap-client -m get -s 60 -O 6,0x00 -o - -T "obstoken" "coap://${your-deployment-connection-address}/ps/coap/test"
```

Or, carry `clientid` and `token` to subscribe in `Connection Mode`:

```bash
coap-client -m get -s 60 -O 6,0x00 -o - -T "obstoken" "coap://${your-deployment-connection-address}/ps/coap/test?clientid=123&token=3404490787"
```

### Topic Unsubscribe

This interface is used by the CoAP client to unsubscribe from a topic.

In the current implementation, the unsubscribing operation is only available in `Connection Mode`.

**Request Parameters:**

- Method: `GET`
- URI: `ps/{+topic}{?QueryString*}`
  - `{+topic}` is the topic to unsubscribe, i.e. the URI is `ps/coap/test` if subscribe to `coap/test`.
  - `{?QueryString}` is request parameters:
    - `clientid`: required in `Connection Mode` and optional in `Connectionless Mode`.
    - `token`: `Connection Mode` only, required parameter.
- Payload: empty

**Response:**

- Return Code:
  - `2.07`: Unsubscribe successfully
  - `4.00`: Bad request. Detailed error information will be returned in the message body.
  - `4.01`: Not authorized. The request format is validated, but authorization failed.
- Payload: When the return code is `2.07`, the message body is empty, otherwise it is `ErrorMessage`.

For example, unsubscribe to `coap/test` in `Connection Mode`:

```bash
coap-client -m get -O 6,0x01 "coap://${your-deployment-connection-address}/ps/coap/test?clientid=123&token=3404490787"
```

### Short Parameter Names

To reduce message size, the CoAP gateway supports short parameter names. For example, the parameter `clientid=barx` can be written as `c=bar`. Therefore, the supported short parameter names are listed in the following table:

| Parameter Name | Short Name |
| :------------- | :--------- |
| `clientid`     | `c`        |
| `username`     | `u`        |
| `password`     | `p`        |
| `token`        | `t`        |
| `qos`          | `q`        |
| `retain`       | `r`        |