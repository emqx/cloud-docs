# Redis Authentication

As one method of password authentication, EMQX Platform supports password authentication through the integration of Redis. EMQX supports three Redis deployment modes: Single Node, Redis Sentinel, and Redis Cluster. This section will introduce how to perform related configurations.

## Data Structure and Query Command

The Redis authenticator supports using [Redis hashes](https://redis.io/docs/manual/data-types/#hashes) to store authentication data. Users need to provide a query command template, ensuring the query result includes the following fields:

- `password_hash`: Required, the plaintext or hashed password field in the database.
- `salt`: Optional, considered as no salt (salt = "") if empty or non-existent.
- `is_superuser`: Optional. Indicates whether the current client is a superuser. The default is `false`. **When set to `true`, clients using this username will not be subject to authorization constraints. It is not recommended to set a superuser.**

For example, to add a user with the username `emqx_u`, password `public`, salt `slat_foo123`, hashed with `sha256`, and superuser flag `false`:

```bash
>redis-cli
127.0.0.1:6379> HSET mqtt_user:emqx_u is_superuser 1 salt slat_foo123 password_hash 44edc2d57cde8d79c98145003e105b90a14f1460b79186ea9cfe83942fc5abb5
(integer) 0
```

The corresponding configuration parameters are:

- Password encryption method: `sha256`
- Salt mode: `suffix`
- Query Command: `HMGET mqtt_user:${username} password_hash salt is_superuser`

### Encryption Rules

Most external authentications in the EMQX Platform can enable a hashing method, where only the password's ciphertext is saved in the data source to ensure data security. When enabling the hashing method, users can specify a salt for each client and configure a salting rule, with the password in the database being the ciphertext processed according to the salting rule and hashing method.

> For reference: Salting Rules and Hashing Methods.

```
bashCopy code
## No salt, plaintext
plain

## No salt, only hashed
sha256

## Salt prefix: Encrypt the string concatenated by salt + password using sha256
salt,sha256

## Salt suffix: Encrypt the string concatenated by password + salt using sha256
sha256,salt

## pbkdf2 with macfun iterations dklen
## macfun: md4, md5, ripemd160, sha, sha224, sha256, sha384, sha512
pbkdf2, sha256, 1000, 20
```

## Configurate Redis Authentication

In the deployment, click **Access Control** - **Extended Authentication**, select **Redis Authentication**, and click **Configure**.

- **Redis Mode**: Choose the deployment mode of the Redis database, available options: `Single`, `Sentinel`, `Cluster`.

- **Server**: Enter the Redis server address (host:port); when the deployment mode is set to Sentinel or Cluster, you need to provide addresses for all related Redis servers, separated by commas, in the format host1:port1,host2:port2,...

  ::: tip

  - If the current deployment is a Dedicated edition, create a [VPC Peering Connection](./vpc_peering.md), and use the internal network address as the server address.
  - If the current deployment is a BYOC edition, create a VPC Peering Connection in your public cloud console. For details, refer to [Create VPC Peering Connections](./byoc_vpc_peering.md). Use the internal network address as the server address.
  - If you see an "Init resource failure!" message, please check if the server address is correct and if the security group is open. 

  :::

- **Sentinel Name**: Only required when the deployment mode is set to `Sentinel`. Specify the master server name needed for Redis Sentinel configuration.

- **Database**: An integer specifying the Redis database Index.

- **Password** (optional): Enter the authentication password.

- **Enable TLS**: Configure whether to enable TLS.

- **Connection Pool size** (optional): Enter an integer to specify the concurrent connection count from EMQX nodes to the Redis database; default value: `8`.

- **Password Hash**: Choose the hashing algorithm used to store passwords, such as plain, md5, sha, bcrypt, pbkdf2, etc.
  - When selecting `plain`, `md5`, `sha`, `sha256`, or `sha512` algorithms, you also need to configure:
    - **Salting Position**: Specifies the combination method of salt and password. Generally, this option does not need to be changed except for migrating access credentials from external storage to EMQX's built-in database; available values: suffix (add salt at the end of the password), prefix (add salt at the beginning of the password), disable (do not enable). Note: If selecting plain, the salting method should be set to disable.
  - When selecting the `pkbdf2` algorithm, you also need to configure:
    - **Pseudorandom function**: Specify the hash function used to generate the key, such as `sha256`, etc.
    - **Iteration Count**: Specify the number of hashing iterations, default value: `4096`.
    - **Derived key length** (optional): Specify the desired key length. If not specified, the key length will be determined by the pseudo-random function.
  
- **CMD**: Redis query command. The command supports to contain the following placeholders:

  - `${clientid}`: Will be replaced with the client ID at runtime. The client ID is usually specified explicitly by the client in the CONNECT packet.
  - `${username}`: Will be replaced with the username at runtime. The username is taken from the Username field in the CONNECT packet.
  - `${password}`: Will be replaced with the password at runtime. The password is taken from the Password field in the CONNECT packet.
  - `${client_attrs.<attribute>}`: A client attribute. `<attribute>` will be replaced by an attribute name set based on predefined configurations at runtime.

