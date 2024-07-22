# Extended Authorization

Extended Authorization enables users to authorize using their own services, supporting external databases such as MySQL and Redis as data sources, or connecting to an HTTP service for authorization authentication.

## Extended Authorization Data Sources

[Authorize with HTTP](./http_authz.md)

[Authorize with MySQL](./mysql_authz.md)

[Authorize with PostgreSQL](./pgsql_authz.md)

[Authorize with Redis](./redis_authz.md)

::: tip

A maximum of 2 extended authorization data sources can be created. 

:::

## Authorization Order

After adding extended authorization data sources, users can sort the authorization data sources. On the extended authorization page, click **Authorization Order** to enter the sorting page. The deployment will authorize in the order from left to right, with the default authorization chain order being default authorization -> extended authorization.

- Actions are matched with permissions, allowing or denying client operations based on permissions
- If actions do not match with permissions, the check is passed to the next authorization checker Custom authorization chain: Authorization data source icons can be dragged and arranged left and right to sequence the authorization order.

## Enable Authorization Whitelist Mode

When the whitelist mode is enabled, all users are prohibited from subscribing and publishing by default. Clients need to be granted authorization to perform subscription and publishing actions.

Follow the steps in [Enable Authorization Whitelist Mode](./default_authz.md#enable-authorization-whitelist-mode) to set up default authorization. After adding an extended authorization data source, go to the extended authorization page and click **Authorization Order** to enter the sorting page. Ensure that "Default Authorization" is positioned at the far right in the authorization order to enable whitelist mode.