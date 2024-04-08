# MySQL Authorization

Extended authorization supports authorization verification through the integration of MySQL.

## Table Structure and Query Statement

The MySQL authorizer can support any table structure, including joint queries across multiple tables or queries from views. Users need to provide a query SQL template, ensuring the query results include the following fields:

- `permission`: Specifies the operation permission, with possible values `allow` and `deny`.
- `action`: Specifies which operations the current rule applies to, with possible values `publish`, `subscribe`, and `all`.
- `topic`: Specifies the topic that the current rule applies to, which can use topic filters and topic placeholders.
- `qos`: (optional) Specifies the message QoS that the rule applies to, with possible values `0`, `1`, `2`, or a comma-separated string specifying multiple QoS, such as `0,1`. Default is all QoS levels.
- `retain`: (optional) Specifies whether the current rule supports publishing retained messages, with possible values `0`, `1`, default allows retained messages.

Example table structure:

```sql
CREATE TABLE `mqtt_acl` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `permission` varchar(5) NOT NULL,
  `action` varchar(9) NOT NULL,
  `topic` varchar(100) NOT NULL,
  `qos` tinyint(1),
  `retain` tinyint(1),
  INDEX username_idx(username),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

::: tip

When there is a large volume of permission data in the system, ensure the tables used for queries are optimized and use effective indexes to improve data lookup speed with many connections and reduce EMQX load. 

:::

### Query Statement

Configure the following query parameters in EMQX, using the mqtt_acl table and username as the lookup condition to query authorization data.

```sql
SELECT 
  permission, action, topic, qos, retain 
FROM mqtt_acl 
  WHERE username = ${username}
```

## Configure MySQL Authorization

In the deployment, click **Access Control** -> **Authorization** -> **Extended Authorization**, select **MySQL Authorization**, and click **Configure**.

You can complete the related configuration according to the following instructions:

- **Server**: Enter the MySQL server address (host:port).
- **Database**: Enter the MySQL database name.
- **Username** (optional): Enter the username.
- **Password** (optional): Enter the password.
- **Enable TLS**: Configure whether to enable TLS.
- **SQL**: Fill in the query SQL according to the table structure, specific requirements can be found at SQL Table Structure and Query Statement.

::: tip

- If the current deployment is a dedicated edition, a VPC Peering Connection needs to be created, and the server address should be the internal network address.
- If the current deployment is a BYOC edition, a VPC Peering Connection needs to be created in your public cloud console, please refer to the [Creating BYOC Deployment - VPC Peering Connection Configuration](../create/byoc.md#vpc-peering-connection-configuration) section. The server address should be the internal network address.

If you encounter an Init resource failure! please check whether the server address is correct and whether the security group is open. 

:::