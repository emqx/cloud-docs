# JWT Authentication

[JWT](https://jwt.io/) authentication is a token-based authorization mechanism that does not rely on the server retaining client authentication or session information. With the possession of keys, authentication information can be issued in bulk, making it the most straightforward method of authentication.

## How JWT Authentication Works

Clients carry the JWT in either the username or password fields (depending on the module configuration) when initiating a connection. EMQX Platform uses the key or certificate configured to decrypt the JWT. If the decryption is successful, authentication is considered successful; otherwise, it fails.

With the default configuration, once JWT authentication is enabled, connections can be made using any username and the following password, which verifies against the default key field `secret`:

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkVNUVggQ2xvdWQiLCJpYXQiOjE1MTYyMzkwMjJ9.wGxZTwkCZtYPzkS854aQ9WCnP8YGIQ_erFh5RIznhYk
```

> The above JWT Token is for testing purposes only and can be generated according to your business needs using relevant tools. Here is an online generation tool: https://www.jsonwebtoken.io/, and you can also test with a JSON Web Key (JWK) generator: [https://mkjwk.org](https://mkjwk.org/).

## Configure JWT Authentication

In the deployment, click **Access Control** - **Extended Authentication**, then click **JWT Configure Authentication** to create a new authentication.

You can complete the related configurations as follows:

When choosing **JWT** as the **Authentication Method**:

- **JWT From**: Specify the location of the JWT in the client connection request; options: password, username (corresponding to the `Password` and `Username` fields in the MQTT client `CONNECT` packet, respectively)
- **Algorithm**: Specify the JWT encryption method, options: `hmac-based`, `public-key`;
  - If selecting `hmac-based`, i.e., JWT uses a symmetric key for generating and verifying signatures (supports HS256, HS384, and HS512 algorithms), you should also configure:
    - **Secret**: The key used to verify the signature, the same key used for generating the signature.
    - **Secret Base64 Encode**: Configure whether EMQX needs to decode the `Secret` using Base64 before verifying the signature; options: True, False, default: False.
  - If selecting `public-key`, i.e., JWT uses a private key for generating signatures, and a public key is needed for verification (supports RS256, RS384, RS512, ES256, ES384, and ES512 algorithms), you should also configure:
    - **Public Key**: Specify the PEM-formatted public key used for verifying the signature.
- **Payload**: Add custom Claims checks; users need to add keys and corresponding values to Claim and Expected Value, respectively, supporting `${clientid}` and `${username}` placeholders. Keys are used to find the corresponding Claim in the JWT, and values are used to compare with the actual value of the Claim.

If selecting JWTS as the authentication method:

In addition to the above configurations, you should also configure:

- **JWKS Endpoint**: Specify the server endpoint address for EMQX to query JWKS. The endpoint should support GET requests and return a JWKS that conforms to standards.
- **JWKS Refresh Interval**: Specify the refresh interval for JWKS, i.e., the interval at which EMQX queries JWKS. Default value: 300 seconds (s). Click **Create** to complete the related configurations.

::: tip

- If the current deployment is a dedicated edition, create a [VPC Peering Connection](./vpc_peering.md), and use the internal network address as the server address.
- If the current deployment is a BYOC edition, you need to create a VPC Peering Connection in your public cloud console. For details, refer to the section [Create BYOC Deployment - VPC Peering Connection Configuration](../create/byoc.md#vpc-peering-connection-configuration). Use the internal network address as the server address.
- If you see an "Init resource failure!" message, please check if the server address is correct and if the security group is open. 

:::
