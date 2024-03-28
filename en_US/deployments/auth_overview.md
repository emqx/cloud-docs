# Authentication

Authentication is an important component of most applications. The MQTT protocol supports username and password authentication, and enabling identity verification can effectively prevent illegal client connections. In EMQX Platform, authentication refers to controlling the client's permissions to connect to the server through server-side configuration when a client connects to EMQX Platform. To provide better security, EMQX supports multiple authentication mechanisms.

| **Version**              | **Password Authentication** | **Extended (Password) Authentication** | **JWT Authentication** | **X.509 Certificate Authentication** |
| ------------------------ | --------------------------- | -------------------------------------- | ---------------------- | ------------------------------------ |
| Serverless               | ✓                           | ✗                                      | ✗                      | ✓                                    |
| Dedicated - Standard     | ✓                           | ✗                                      | ✗                      | ✓                                    |
| Dedicated - Professional | ✓                           | ✓                                      | ✓                      | ✓                                    |

## [Password Authentication (Default)](./default_auth.md)

Password authentication is the simplest and most widely used authentication method. When using password authentication, clients need to provide credentials that can prove their identity, such as username, client ID, and corresponding password, or certain fields in TLS certificates (e.g., certificate common name). These credentials are stored in advance in a specific data source (database), and passwords are usually stored in a hashed form with a salt.

EMQX supports identity verification through passwords. After enabling password authentication, when clients attempt to connect, they need to provide identity credential information as required. EMQX will initiate a query in the database and match the returned password with the information provided by the client. If the match is successful, EMQX will accept the client's connection request.

## [Extended Password Authentication](./custom_auth.md)

In addition to the simple and convenient built-in database, EMQX also supports password authentication through integration with various backend databases, including MySQL, PostgreSQL, Redis, and HTTP.

- [Password Authentication Using HTTP](./http_auth.md)
- [Password Authentication Using MySQL](./mysql_auth.md)
- [Password Authentication Using PostgreSQL](./pgsql_auth.md)
- [Password Authentication Using Redis](./redis_auth.md)

## [JWT Authentication](./jwt_auth.md)

[JSON Web Token (JWT)](https://jwt.io/) is a Token-based authentication mechanism that does not require the server to retain client authentication information or session information. Clients can carry Tokens in the password or username, and EMQX verifies the JWT signature with a pre-configured secret key or public key.

Furthermore, if a JWKS endpoint is configured, EMQX also supports verifying the JWT signature with a list of public keys queried from the JWKS endpoint, allowing for the bulk issuance of authentication information to clients.

## [X.509 Certificate Authentication](./tls_ssl.md)

EMQX supports client authentication using X.509 certificate authentication. By using X.509 certificate authentication in EMQX, clients and servers can establish a secure connection through TLS/SSL, ensuring the authenticity of the communication parties and the integrity of the transmitted data. EMQX supports both one-way and two-way authentication: in one-way authentication, only the server is authenticated by the client; in two-way authentication, the client and server mutually verify each other's certificates. This flexibility caters to different levels of security requirements and deployment scenarios.