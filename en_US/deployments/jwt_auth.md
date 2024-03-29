# JWT Authentication

[JWT](https://jwt.io/) Authentication as the easiest way to authenticate is an authentication mechanism based on tokens. It does not rely on the server to retain the authentication information or session information of the client. The authentication information can be issued in batches with the key.

## Authentication Chain

If default authentication is also enabled, EMQX Cloud will follow [default authentication](./auth_dedicated.md) -> JWT authentication for chain authentication:

- Once authentication is successful, terminate the authentication chain and the client is accessible
- Once authentication fails, terminate the authentication chain and disable client access

![auth_chain](./_assets/jwt_auth_chain.png)

## JWT Authentication Rules

The client carries the JWT using the username or password field (depending on the module configuration) and when initiating a connection, EMQX Cloud uses the configured key and certificate to decrypt it. If it can decrypt it successfully, the authentication is successful. Otherwise, the authentication fails.

With JWT authentication enabled in the default configuration, you can connect with any username and the following password, then it can be verified by the default key field `secret`:

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkVNUVggQ2xvdWQiLCJpYXQiOjE1MTYyMzkwMjJ9.wGxZTwkCZtYPzkS854aQ9WCnP8YGIQ_erFh5RIznhYk
```

> The above JWT token is for testing purposes only and can be generated using the relevant tools according to your business requirements. An online generation tool is available here: <https://www.jsonwebtoken.io/> , which can also be tested in conjunction with a JSON Web Key (JWK) generator: <https://mkjwk.org>.
## Authentication Configuration

1. Click on `Authentication Authentication` - `External Authentication Authorization` in the left menu bar of the EMQX Cloud deployment and select JWT Authentication.

![jwt_auth](./_assets/jwt_auth_en.png)

2. Click `Configure Authentication` to enter the JWT authentication page, fill in the information, and create a new authentication. In this example, the authentication is performed by configuring the JWKs server address.

> EMQX Cloud will authenticate JWTs in a fixed order of **Secret, Pubkey and JWKs Addr**. Fields that are not configured will be ignored.

- Authentication source: The field where the JWT is stored when the client connects, currently supports username or password.
- Key: The key used to issue the JWT. This will be used to verify that the JWT received by EMQX Cloud is legitimate and is applicable to JWTs issued by the HMAC algorithm.
- Public Key File: This will be used to verify that the JWT received by EMQX Cloud is legitimate and is applicable to JWTs issued by RSA or ECDSA algorithms.
- JWKs Server Address: EMQX Cloud will periodically query the latest public key list from the JWKs server and will be used to verify that the received JWT is legitimate, for JWTs issued by RSA or ECDSA algorithms.
- Validate Declaration Fields: Whether you need to validate that the declarations in the JWT Payload match the Declaration Fields List.
- Declaration Field List: Used to verify that the declarations in the JWT Payload are legal. The most common use is to add a key-value pair with the key username and the value %u, where %u is replaced at runtime as a placeholder with the Username used by the client to actually connect. The following two placeholders are currently supported in the declaration field list.
  - %u: will be replaced at runtime with the Username used by the client when connecting.
  - %c: will be replaced at runtime with the Client ID used by the client when connecting.

  ::: tip
  - For Basic Plan users: Please fill in the public address for the server address.
  - For Professional Plan users: Please complete [Peering Connection Creation](../deployments/vpc_peering.md) first, then fill in the internal network address for the server address.
  - For BYOC Plan users: Please [establish a peering connection](../create/byoc.md#vpc-peering-configuration) between the VPC where BYOC is deployed and the VPC where the resources are located, then fill in the internal network address for the server address.
  - If you are prompted with Init resource failure! check whether the server address is correct, and whether the security group is enabled.
  :::

![jwt_auth](./_assets/jwt_auth_info_en.jpeg)
