# Redis Authentication

As one method of password authentication, EMQX Cloud supports password authentication through the integration of Redis. EMQX supports three Redis deployment modes: Single Node, Redis Sentinel, and Redis Cluster. This section will introduce how to perform related configurations.

## Data Structure and Query Command

The Redis authenticator supports using [Redis hashes](https://redis.io/docs/manual/data-types/#hashes) to store authentication data. Users need to provide a query command template, ensuring the query result includes the following fields:

- `password_hash`: Required, the plaintext or hashed password field in the database.
- `salt`: Optional, considered as no salt (salt = "") if empty or non-existent.
- `is_superuser`: Optional, marks whether the current client is a superuser, with a default of false.

### Encryption Rules

Most external authentications in EMQX Cloud can enable a hashing method, where only the password's ciphertext is saved in the data source to ensure data security. When enabling the hashing method, users can specify a salt for each client and configure a salting rule, with the password in the database being the ciphertext processed according to the salting rule and hashing method.

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

In the deployment, click **Access Control** - **Extended Authentication**, click **Redis Configuration Authentication** and create a new authentication.

- Deployment Mode: Choose the deployment mode of the Redis database, available options: Single Node, Sentinel, Cluster.
- Service(s): Enter the Redis server address (host:port); when the deployment mode is set to Sentinel or Cluster, you need to provide addresses for all related Redis servers, separated by commas, in the format host1:port1,host2:port2,...
- Sentinel Name: Specify the master server name needed for Redis Sentinel configuration, only required when the deployment mode is set to Sentinel.
- Database: An integer specifying the Redis database Index.
- Password (optional): Enter the authentication password.
- TLS Configuration: Configure whether to enable TLS.
- Pool size (optional): Enter an integer to specify the concurrent connection count from EMQX nodes to the Redis database; default value: 8.
- Password Encryption Method: Choose the hashing algorithm used to store passwords, such as plain, md5, sha, bcrypt, pbkdf2, etc.
- When selecting plain, md5, sha, sha256, or sha512 algorithms, you need to configure:
  - Salting Method: Specifies the combination method of salt and password. Generally, this option does not need to be changed except for migrating access credentials from external storage to EMQX's built-in database; available values: suffix (add salt at the end of the password), prefix (add salt at the beginning of the password), disable (do not enable). Note: If selecting plain, the salting method should be set to disable.
- When selecting the bcrypt algorithm, you need to configure:
  - Salt Rounds: Specify the computational rounds needed for hashing (2^Salt Rounds), also known as the cost factor. Default value: 10, available values: 4–31; the higher the number, the higher the security of the encryption, thus it is recommended to use a larger value. However, the user verification time will also increase, and you can configure it according to your business needs.
- When selecting the pkbdf2 algorithm, you need to configure:
  - Pseudo-Random Function: Specify the hash function used to generate the key, such as sha256, etc.
  - Iteration Count: Specify the number of hashing iterations, default value: 4096.
  - Key Length (optional): Specify the desired key length. If not specified, the key length will be determined by the pseudo-random function.
- Command: Redis query command

::: tip

- If the current deployment is a dedicated edition, create a [VPC Peering Connection](./vpc_peering.md), and fill in the internal network address as the server address.
- If the current deployment is a BYOC edition, you need to create a VPC Peering Connection in your public cloud console, refer to the [Create BYOC Deployment - VPC Peering Connection Configuration](../create/byoc.md#vpc-peering-connection-configuration) section. The server address should be the internal network address.

If you encounter an Init resource failure! please check whether the server address is correct and whether the security group is open. 

:::
