# Authentication and ACL

Authentication is a crucial component of most applications. In EMQX Cloud, authentication refers to controlling client connections to the server through server-side configuration when a client connects to EMQX Cloud.

Access control refers to permission control for MQTT client publishing and subscribing operations. There are slight differences in the authentication and access control settings between EMQX Cloud Serverless and Enterprise versions, and the Enterprise version provides external authentication and access control capabilities.

## Serverless Plan

### [Authentication](./auth_serverless.md)

Set authentication for Serverless Plan. 

### [Access Control](./acl_serverless.md)

Set access control for Serverless Plan.

## Dedicated / BYOC Plan

### [Authentication](./auth_dedicated.md)

Set authentication for Dedicated / BYOC Plan.

### [Access Control](./acl_dedicated.md)

Set access control for Dedicated / BYOC Plan.

### [External Authentication and Access Control](./custom_auth.md)

External authentication and access control help users to use their own services for authentication and authentication, currently supporting the use of MySQL and PostgreSQL as the data source, and also supports connecting to HTTP services for authentication and authentication.