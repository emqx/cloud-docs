# HTTP Authorization

EMQX supports authorization based on HTTP applications. In this scenario, users need to set up an external HTTP application as a data source, and EMQX will make requests to the HTTP service and determine the authorization result based on the data returned by the HTTP API, thereby implementing complex authorization logic.

## How HTTP Authorization Works

The authorization process resembles an HTTP API call, where EMQX, acting as the request client, needs to construct and send a request to the HTTP service according to the "API" requirements. The HTTP service must return results according to the "client's" requirements:

- The response `content-type` must be `application/json`.
- The authorization result is indicated by `result` in the body, with possible values `allow`, `deny`, `ignore`.
- If the returned HTTP status code is `204`, the authorization result is considered to allow publishing or subscribing.
- Any other HTTP status code apart from `200` and `204` is considered as `ignore`, for example, if the HTTP service is unavailable.

Response example:

```json
HTTP/1.1 200 OK
Headers: Content-Type: application/json
...
Body:
{
    "result": "allow" | "deny" | "ignore" // Default `"ignore"`
}
```

## Configure HTTP Authorization

In the deployment, click **Access Control** -> **Authorization** -> **Extended Authorization**, select **HTTP Authorization**, and click **Configure**.

For identity authorization, EMQX Platform will use the current client information to fill in and initiate the authorization query request configured by the user, querying the client's authorization data on the HTTP server side.

You can complete the related configuration according to the following instructions:

- **Method**: Choose the HTTP request method, options: `get`, `post`. 

  ::: tip 

  The `POST` method is recommended. When using the `GET` method, some sensitive information (such as plaintext passwords) might be exposed through HTTP server logs. Additionally, for untrusted environments, use HTTPS. 

  :::

- **URL**: Enter the URL address of the HTTP service.

- **Headers** (optional): Configuration for HTTP request headers. Multiple headers can be added. Connection Configuration: Configure concurrent connections, connection timeout waiting time, maximum HTTP request count, and request timeout time in this section.

- **Enable TLS**: Configure whether to enable TLS.

- **Connection Pool size** (optional): An integer specifying the concurrent connection count from EMQX nodes to the external HTTP Server; default value: `8.`

- **Connection Timeout** (optional): Enter the connection timeout duration, with units available: hours, minutes, seconds, milliseconds.

- **HTTP Pipelining** (optional): A positive integer specifying the maximum number of HTTP requests that can be sent without waiting for responses; default value: `100`.

- **Request Timeout** (optional): Enter the connection timeout duration, with units available: hours, minutes, seconds, milliseconds.

- **Body**: The request template. `POST` requests are sent in JSON format in the request body. `GET` requests are encoded as query parameters in the URL. Mapping keys and values can use placeholders.

::: tip

- If the current deployment is a dedicated edition, a VPC Peering Connection needs to be created, and the server address should be the internal network address.
- If the current deployment is a BYOC edition, a VPC Peering Connection needs to be created in your public cloud console, please refer to the [Creating BYOC Deployment - VPC Peering Connection Configuration](../create/byoc.md#vpc-peering-connection-configuration) section. The server address should be the internal network address.
- If you encounter an Init resource failure! please check whether the server address is correct and whether the security group is open.

:::

## HTTP Request and Response
When the client initiates a subscribing or publishing operation, the HTTP Authorizer constructs and sends a request based on the configured request template. You need to implement authorization logic in the request template and make sure that the checking results are returned in the required format.

### Request
The request can use JSON format, with the following placeholders in the URL and request body:

- `${clientid}`: The client ID
- `${username}`: The username used by the client on login
- `${peerhost}`: The source IP address of the client
- `${proto_name}`: The protocol name used by the client, e.g. `MQTT`, `CoAP`
- `${mountpoint}`: The mount point of the gateway listener (topic prefix)
- `${action}`: The action being requested, e.g. `publish`, `subscribe`
- `${topic}`: The topic (or topic filter) to be published or subscribed in the current request
- `${qos}`: The QoS of the message to be published or subscribed in the current request
- `${retain}`: Whether the message to be published in the current request is a retained message

### Response
After checking, the authorization service needs to return a response in the following format:

- Response content-type must be application/json.
- If the HTTP Status Code is 200, the authorization result is granted by the HTTP Body. It depends on the value of the result field:
  - allow: Allow Publish or Subscribe.
  - deny: Deny Publish or Subscribe.
  - ignore: Ignore this request, and it will be handed over to the next authorizer.
- If the HTTP Status Code is 204, it means that this Publish or Subscribe request is allowed.
- HTTP Status Codes other than 200 and 204, mean "ignore", for example, this HTTP service is not available.
Example response:

```
HTTP/1.1 200 OK
Headers: Content-Type: application/json
...
Body:
{
    "result": "allow" | "deny" | "ignore" // Default `"ignore"`
}
```

::: tip

It is recommended to use the `POST` method. When using the `GET` method, some sensitive information may be exposed through HTTP server logs.

For untrusted environments, HTTPS should be used.

:::