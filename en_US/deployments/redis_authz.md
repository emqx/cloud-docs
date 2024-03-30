# Redis Authorization

Extended authorization supports authorization verification through the integration of Redis.

## Data Structure and Query Command

The Redis authorizer supports using [Redis hashes](https://redis.io/docs/manual/data-types/#hashes) to store authorization data. Users need to provide a query command template, ensuring the query results include the following fields:

- `topic`: Specifies the topic that the current rule applies to, which can use topic filters and topic placeholders.
- `action`: Specifies which operations the current rule applies to, with possible values `publish`, `subscribe`, and `all`.
- `qos`: (optional) Specifies the message QoS that the rule applies to, with possible values `0`, `1`, `2`, or can specify multiple QoS using a Number array. Default is all QoS levels. retain: (optional) Specifies whether the current rule supports publishing retained messages, with possible values `true`, `false`, default allows retained messages.

Adding permission data for the user `emqx_u`, allowing subscription to the topic `t/1`:

```
HSET mqtt_acl:emqx_u t/1 subscribe
```

Due to Redis structure limitations, when using `qos` and `retain` fields, you need to put information other than `topic` into a JSON string, for example:

- Adding permission data for the user `emqx_u`, allowing subscription to the topic `t/2` with QoS1 and QoS2:

```json
HSET mqtt_acl:emqx_u t/2 '{ "action": "subscribe", "qos": [1, 2] }'
```

- Adding permission data for the user `emqx_u`, denying publishing retained messages to the topic `t/3`:

```json
HSET mqtt_acl:emqx_u t/3 '{ "action": "publish", "retain": false }'
```

The corresponding configuration item is:

```bash
cmd = "HGETALL mqtt_acl:${username}"
```

## Configure Redis Authorization

In the deployment, click **Access Control** -> **Authorization** -> **Extended Authorization**, then click **Redis Authorization** to create a new authorization.

- **Redis Mode**: Choose the deployment mode of the Redis database, options: `Singl`, `Sentinel`, `Cluster`.
- **Server**: Enter the Redis server address (host:port); when the deployment mode is selected as Sentinel or Cluster, you need to provide addresses for all related Redis servers, separated by commas, in the format host1:port1,host2:port2,...
- **Sentinel Name**: Only required when the deployment mode is set to `Sentinel`. Specify the master server name needed for Redis Sentinel configuration, 
- **Database**: An integer specifying the Redis database Index.
- **Password** (optional): Enter the authorization password.
- **Enable TLS**: Configure whether to enable TLS.
- **Connection Pool Size** (optional): Enter an integer to specify the concurrent connection count from EMQX nodes to the Redis database; default value: `8`.
- **CMD**: Redis query command.

::: tip

- If the current deployment is a dedicated edition, a VPC Peering Connection needs to be created, and the server address should be the internal network address.
- If the current deployment is a BYOC edition, a VPC Peering Connection needs to be created in your public cloud console, please refer to the [Creating BYOC Deployment - VPC Peering Connection Configuration](../create/byoc.md#vpc-peering-connection-configuration) section. The server address should be the internal network address.
- If you encounter an Init resource failure! please check whether the server address is correct and whether the security group is open. 

:::