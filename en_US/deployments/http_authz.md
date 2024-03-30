# HTTP Authorization

EMQX supports authorization based on HTTP applications. In this scenario, users need to set up an external HTTP application as a data source, and EMQX will make requests to the HTTP service and determine the authorization result based on the data returned by the HTTP API, thereby implementing complex authorization logic.

## How HTTP Authorization Works

The authorization process resembles an HTTP API call, where EMQX, acting as the request client, needs to construct and send a request to the HTTP service according to the "API" requirements, and the HTTP service must return results according to the "client's" requirements:

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

In the deployment, click **Access Control** -> **Authorization** -> **Extended Authorization**, then click **HTTP Authorization** to create a new authorization.

For identity authorization, EMQX Platform will use the current client information to fill in and initiate the authorization query request configured by the user, querying the client's authorization data on the HTTP server side.

You can complete the related configuration according to the following instructions:

- **Method**: Choose the HTTP request method, options: `get`, `post`. 

  ::: tip 

  The `POST` method is recommended. When using the `GET` method, some sensitive information (such as plaintext passwords) might be exposed through HTTP server logs. Additionally, for untrusted environments, please use HTTPS. 

  :::

- **URL**: Enter the URL address of the HTTP service.

- **Headers** (optional): Configuration for HTTP request headers. Multiple headers can be added. Connection Configuration: Configure concurrent connections, connection timeout waiting time, maximum HTTP request count, and request timeout time in this section.

- **Enable TLS**: Configure whether to enable TLS.

- **Connection Pool size** (optional): An integer specifying the concurrent connection count from EMQX nodes to the external HTTP Server; default value: `8.`

- **Connection Timeout** (optional): Enter the connection timeout duration, with units available: hours, minutes, seconds, milliseconds.

- **HTTP Pipelining** (optional): A positive integer specifying the maximum number of HTTP requests that can be sent without waiting for responses; default value: `100`.

- **Request Timeout** (optional): Enter the connection timeout duration, with units available: hours, minutes, seconds, milliseconds.

- **Body**: The request template, for `POST` requests, it is sent in JSON format in the request body. For `GET` requests, it is encoded as query parameters in the URL. Mapping keys and values can use placeholders.

::: tip

- If the current deployment is a dedicated edition, a VPC Peering Connection needs to be created, and the server address should be the internal network address.
- If the current deployment is a BYOC edition, a VPC Peering Connection needs to be created in your public cloud console, please refer to the [Creating BYOC Deployment - VPC Peering Connection Configuration](../create/byoc.md#vpc-peering-connection-configuration) section. The server address should be the internal network address.
- If you encounter an Init resource failure! please check whether the server address is correct and whether the security group is open.

:::

### Request Parameter Placeholders

You can use the following placeholders in the authorization request, which EMQX will automatically fill with client information when requesting:

- %u: Username
- %c: Client ID
- %a: Client IP Address
- %r: Client Access Protocol
- %P: Plaintext Password
- %p: Client Port