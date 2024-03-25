# Authorization

Authorization refers to controlling the permissions for MQTT client's publish and subscribe operations. The basic principle of EMQX's authorization mechanism is that when a client attempts to publish or subscribe, EMQX retrieves the client's permission data from the data source according to a specific process or user-defined query statements. It then matches the permissions with the operation to be performed, allowing or denying the operation based on the match results.

A single piece of client permission data consists of the following parts:

| **Permission** | **Client**                    | **Action**                          | **Action Details**          |
| -------------- | ----------------------------- | ----------------------------------- | --------------------------- |
| Allow/Deny     | Client ID/Username/IP Address | Publish/Subscribe/Publish Subscribe | Topic/QoS/Retained Messages |

## [Default Authorization](./default_auth.md)

EMQX Cloud provides a default authentication method, which will authorize based on rules stored in the built-in database.

## [Extended Authorization](./custom_auth.md)

In addition to the default authorization based on the built-in database, it also supports authorization authentication through integration with various backend databases, including MySQL, PostgreSQL, Redis, and HTTP.

- [Authorize with HTTP](./http_auth.md)
- [Authorize with MySQL](./mysql_auth.md)
- [Authorize with PostgreSQL](./pgsql_auth.md)
- [Authorize with Redis](./redis_auth.md)

## Authorization Support by Version

| **Version**       | **Default Authorization** | **Extended Authorization** |
| ----------------- | ------------------------- | -------------------------- |
| Serverless        | ✓                         | ✗                          |
| Dedicated Edition | ✓                         | ✓                          |
| BYOC              | ✓                         | ✓                          |