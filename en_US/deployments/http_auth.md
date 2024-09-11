# HTTP Authentication

EMQX supports password authentication through external HTTP services. When a client connects, EMQX constructs an HTTP request using the client information and determines the authentication result based on the content returned by the request, enabling complex authentication and authorization logic.

## How HTTP Authentication Works

The authentication process is similar to an HTTP API call, where EMQX, acting as the requesting client, needs to construct a request in the format required by the "API" and initiate it to the HTTP service. The HTTP service, in turn, must return results according to the "client's" requirements:

- The response content-type must be `application/json`.
- The authentication result is indicated in the body with `result`, which can be `allow`, `deny`, or `ignore`.
- The superuser status can be indicated by the `is_superuser` flag in the body, which can be set to `true` or `false`. **When set to `true`, clients using this username will not be subject to authorization constraints. It is not recommended to set a superuser.**
- The HTTP response status code should be `200` or `204`. A `4xx/5xx` status code will ignore the body and treat the result as `ignore`, continuing with the authentication chain.

Example response:

```json
HTTP/1.1 200 OK
Headers: Content-Type: application/json
...
Body:
{
    "result": "allow", // Options: "allow" | "deny" | "ignore"
    "is_superuser": false // Options: true | false, defaults to false if null
}
```

## Configure HTTP Authentication

In the deployment, click **Access Control** -> **Authentication** -> **Extended Authentication**, select **HTTP  Authentication,** and click **Configure**.

For identity verification, EMQX Platform will use the current client information to fill and initiate the user-configured authentication query request, querying the client's authentication data on the HTTP server side.

You can complete the related configurations as follows:

- **Method**: Choose the HTTP request method, options: `get`, `post`. 

  ::: tip

  The `POST` method is recommended. Using the `GET` method may expose some sensitive information (such as plain text passwords) through HTTP server logs. Moreover, use HTTPS for untrusted environments. 

  :::

- **URL**: Enter the URL address of the HTTP service.

  ::: tip

  - If the current deployment is a Dedicated edition, create a [VPC Peering Connection](./vpc_peering.md), and fill in the internal network address as the server address.
  - If the current deployment is a BYOC edition, create a VPC Peering Connection in your public cloud console. For details, refer to [Create VPC Peering Connections](./byoc_vpc_peering.md). Fill in the internal network address as the server address.
  - If you see an "Init resource failure!" message, please check if the server address is correct and if the security group is open. 

  :::

- **Headers** (Optional): HTTP request header configuration. Multiple headers can be added.

- **Connection Configurations**: Configure concurrent connections, connection timeout, maximum HTTP request numbers, and request timeout duration here.

  - **Enable TLS**: Configure whether to enable TLS.
  - **Connection Pool Size** (Optional): An integer specifying the number of concurrent connections from EMQX nodes to the external HTTP Server; default value: `8`.
  - **Connection Timeout** (Optional): Enter the connection timeout duration, and unit: seconds.
  - **HTTP Pipeline** (Optional): A positive integer specifying the maximum number of HTTP requests that can be made without waiting for a response; default value: `100`.
  - **Request Timeout** (Optional): Enter the request timeout duration, and available units: hours, minutes, seconds, milliseconds.
  - **Body**: Request template. For `POST` requests, it is sent in JSON format in the request body. For `GET` requests, it is encoded as query parameters in the URL. Mapping keys and values can use placeholders. The request body supports the following placeholders:
    - `${clientid}`: Will be replaced with the client ID at runtime. The client ID is usually specified explicitly by the client in the CONNECT packet.
    - `${username}`: Will be replaced with the username at runtime. The username is taken from the Username field in the CONNECT packet.
    - `${password}`: Will be replaced with the password at runtime. The password is taken from the Password field in the CONNECT packet.
    - `${client_attrs.<attribute>}`: A client attribute. `<attribute>` will be replaced by an attribute name set based on predefined configurations at runtime.

