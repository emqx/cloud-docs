# HTTP Authentication

EMQX supports password authentication through external HTTP services. When a client connects, EMQX constructs an HTTP request using the client information and determines the authentication result based on the content returned by the request, enabling complex authentication and authorization logic.

## How HTTP Authentication Works

The authentication process is similar to an HTTP API call, where EMQX, acting as the requesting client, needs to construct a request in the format required by the "API" and initiate it to the HTTP service. The HTTP service, in turn, must return results according to the "client's" requirements:

- The response content-type must be `application/json`.
- The authentication result is indicated in the body with `result`, which can be `allow`, `deny`, or `ignore`.
- The HTTP response status code should be `200` or `204`. A `4xx/5xx` status code will ignore the body and treat the result as `ignore`, continuing with the authentication chain.

Example response:

```json
HTTP/1.1 200 OK
Headers: Content-Type: application/json
...
Body:
{
    "result": "allow", // Options: "allow" | "deny" | "ignore"
    "is_superuser": true // Options: true | false, defaults to false if null
}
```

## Configure HTTP Authentication

In the deployment, click **Access Control** - **Extended Authentication**, then click **HTTP Configure Authentication** to create a new authentication.

For identity verification, EMQX Cloud will use the current client information to fill and initiate the user-configured authentication query request, querying the client's authentication data on the HTTP server side.

You can complete the related configurations as follows:

- Request Method: Choose the HTTP request method, options: `get`, `post`. 

  ::: tip

  The `POST` method is recommended. Using the `GET` method may expose some sensitive information (such as plain text passwords) through HTTP server logs. Moreover, use HTTPS for untrusted environments. 

  :::

- URL: Enter the URL address of the HTTP service.

- Headers (Optional): HTTP request header configuration. Multiple headers can be added.

- Connection Configuration: Configure concurrent connections, connection timeout, maximum HTTP request numbers, and request timeout duration here.

- TLS Configuration: Configure whether to enable TLS.

- Pool Size (Optional): An integer specifying the number of concurrent connections from EMQX nodes to the external HTTP Server; default value: 8.

- Connection Timeout (Optional): Enter the connection timeout duration, available units: hours, minutes, seconds, milliseconds.

- HTTP Pipeline (Optional): A positive integer specifying the maximum number of HTTP requests that can be made without waiting for a response; default value: 100.

- Request Timeout (Optional): Enter the request timeout duration, available units: hours, minutes, seconds, milliseconds.

- Request Body: Request template. For `POST` requests, it is sent in JSON format in the request body. For `GET` requests, it is encoded as query parameters in the URL. Mapping keys and values can use placeholders.

::: tip

- If the current deployment is a dedicated edition, create a [VPC Peering Connection](./vpc_peering.md), and fill in the internal network address as the server address.
- If the current deployment is a BYOC edition, you need to create a VPC Peering Connection in your public cloud console. For details, refer to the section [Creating BYOC Deployment - VPC Peering Connection Configuration](../create/byoc.md#vpc-peering-connection-configuration). Fill in the internal network address as the server address.
- If you see an "Init resource failure!" message, please check if the server address is correct and if the security group is open. 

:::

### Request Parameter Placeholders

You can use the following placeholders in the authentication request, which EMQX will automatically fill with client information when requested:

- %u: Username
- %c: Client ID
- %a: Client IP address
- %r: Client protocol
- %P: Plain text password
- %p: Client port
