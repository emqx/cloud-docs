# MySQL Authentication

Extended authentication supports password authentication through MySQL integration.

## Table Structure and Query Statements

The MySQL authenticator can support any table structure, even joint queries across multiple tables or queries from views. Users need to provide a query SQL template and ensure the query results include the following fields:

- `password_hash`: Required, the plaintext or hashed password field in the database.
- `salt`: Optional, considered as an empty salt (salt = "") if empty or non-existent.
- `is_superuser`: Optional. Indicates whether the current client is a superuser. The default is `false`. **When set to `true`, clients using this username will not be subject to authorization constraints. It is not recommended to set a superuser.**

Example table structure:

```sql
CREATE TABLE `mqtt_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password_hash` varchar(100) DEFAULT NULL,
  `salt` varchar(35) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mqtt_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

::: tip

The above example creates an implicit `UNIQUE` index field (`username`) to aid in queries. When the system has a large number of users, ensure that the table used for queries is optimized and uses effective indexes to speed up data lookups during numerous connections and reduce EMQX load. 

:::

`username` is used as the lookup condition in this table. For example, to add a user with username `emqx_u`, password `public`, salt `slat_foo123`, hashed with `sha256`, and superuser flag `false`:

```sql
mysql> INSERT INTO mqtt_user(username, password_hash, salt, is_superuser) VALUES ('emqx_u', SHA2(concat('public', 'slat_foo123'), 256), 'slat_foo123', 0);
Query OK, 1 row affected (0.01 sec)
```

The corresponding query statement and password hashing method configuration parameters are:

- Password encryption method: `sha256`
- Salt mode: `suffix`
- SQL:

```sql
SELECT password_hash, salt, is_superuser FROM mqtt_user WHERE username = ${username} LIMIT 1
```

## Configure MySQL Authentication

In the deployment, click **Access Control** -> **Authentication** -> **Extended Authentication**,  select **MySQL  Authentication**, and click **Configure**.

You can complete the related configurations as follows:

- **Server**: Enter the MySQL server address (host:port).

  ::: tip

  - If the current deployment is a Dedicated edition, create a [VPC Peering Connection](./vpc_peering.md), and use the internal network address as the server address.
  - If the current deployment is a BYOC edition, create a VPC Peering Connection in your public cloud console. For details, refer to [Create VPC Peering Connections](./byoc_vpc_peering.md). Use the internal network address as the server address.
  - If you see an "Init resource failure!" message, please check if the server address is correct and if the security group is open. 

  :::

- **Database**: Enter the MySQL database name.

- **Username** (Optional): Enter the username.

- **Password** (Optional): Enter the password.

- **Enable TLS**: Configure whether to enable TLS.

- **Connection Pool Size** (Optional): Enter an integer to specify the concurrent connection count from EMQX nodes to the MySQL database; default value: `8`.

- **Query Timeout**: Enter the connection timeout duration; units available: hours, minutes, seconds, milliseconds.

- **Password Hash**: Select the hashing algorithm used to store the password, such as plain, md5, sha, bcrypt, pbkdf2, etc.
  - For algorithms `plain`, `md5`, `sha`, `sha256`, or `sha512`, you also need to configure:
    - **Salt Position**: Specifies how the salt is combined with the password. Except for migrating credentials from external storage to the EMQX built-in database, this option generally does not need to be changed; options: suffix (add salt at the end of the password), prefix (add salt at the beginning of the password), disable (do not use salt). Note: If choosing plain, the salt mode should be set to disable.
  - For the `pkbdf2` algorithm, you also need to configure:
    - **Pseudorandom function**: Specifies the hashing function used to generate the key, such as sha256.
    - **Iteration Count**: Specifies the number of hashes, default value: 4096.
    - **Derived key length** (Optional): Specifies the desired length of the key. If not specified, the key length will be determined by the pseudorandom function.
  
- **SQL**: Fill in the query SQL according to the table structure, specific requirements can be found in [SQL Table Structure and Query Statements](https://docs.emqx.com/en/enterprise/latest/access-control/authn/mysql.html#sql-table-structure-and-query-statements).
