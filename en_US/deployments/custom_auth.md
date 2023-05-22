# External Authentication and Access Control

External authentication and access control help users to use their own services for authentication and authentication, currently supporting the use of MySQL and PostgreSQL as the data source, and also supports connecting to HTTP services for authentication and authentication.

## Principles and rules

After the service is configured, if the client needs to authenticate, EMQX Cloud will use the current client's information to populate the query and perform the user-configured authentication. The authentication is determined by the return.

If built-in authentication is also enabled, EMQX Cloud will chain authentication in the order of default authentication, custom authentication as follows:

- Once the authentication is successful, terminate the authentication chain and allow the client to access
- Once the authentication fails, terminate the authentication chain and prohibit the client from accessing

When multiple authentication methods are enabled at the same time, the system will execute queries in the order of **module enablement** by default. For example, if MySQL authentication is enabled first and PostgreSQL is enabled second, the order is as follows:

- For the same kind of authentication, when the result is returned by MySQL, it will be used to determine whether the authentication is passed or not, and will not query PostgreSQL again.
- For the same kind of authentication, when the result isn't returned by MySQL, it will query PostgreSQL in the enabled order and use the result returned by PostgreSQL to make a judgment.

## View the detailed implementation of external authentication/access control

[HTTP authentication/access control](./http_auth.md)

[MySQL authentication/access control](./mysql_auth.md)

[PostgreSQL authentication/access control](./pgsql_auth.md)