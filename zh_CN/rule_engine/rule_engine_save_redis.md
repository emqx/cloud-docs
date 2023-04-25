# 集成 Redis

::: warning
该功能在基础版中不可用
:::

在本文中我们将模拟温湿度数据并通过 MQTT 协议上报到 EMQX Cloud，然后使用 EMQX Cloud 数据集成将数据转存到 Redis。

在开始之前，您需要完成以下操作：

* 已经在 EMQX Cloud 上创建部署(EMQX 集群)
* 对于专业版部署用户：请先完成 [对等连接的创建](../deployments/vpc_peering.md)，下文提到的 IP 均指资源的内网 IP（专业版部署若开通 NAT 网关也可使用公网 IP 进行连接）
* 对于 BYOC 部署用户：请先对 BYOC 部署所在 VPC 与资源所在 VPC 建立对等连接，下文提到的 IP 均指资源的内网 IP。如需通过公网访问资源，请在您的公有云控制台中为 BYOC 部署所在 VPC 配置 NAT 网关，使用资源的公网 IP 进行连接。

## 1. 创建 Redis 服务

在你的云服务器中，创建一个 Redis 服务。为了方便演示，这里使用 Docker 快速搭建。

1. 获取 Redis 镜像
   ```bash
   docker pull redis:latest
   ```
2. 运行 Redis 容器
   ```bash
   docker run -itd --name redis -p 6379:6379 redis:latest
   ```

## 2. 创建 Redis 单节点模式资源

进入 [EMQX Cloud 控制台](https://cloud.emqx.com/console/)，并点击进入要使用 Redis 的部署。

在部署页面，选择数据集成，点击数据持久化下的 Redis 单节点模式资源进行创建。

![数据集成页](./_assets/data_integrations_redis.png)

在创建资源页面里，按照如下设置：
- Redis 服务器：填写服务器的 IP 地址以及端口

![资源创建页](./_assets/create_redis_resource.png)

完成配置后点击测试连接，提示资源可用后便可点击新建来创建资源。

## 3. 创建规则

成功创建资源后可直接点击对话框中的创建规则或者回到数据集成界面，找到刚创建的资源点击操作下的新建规则。

![规则创建1](./_assets/redis_create_rule_1.png)

我们的目标是：客户端将温湿度消息发送到 temp_hum/emqx 主题时，就会触发引擎。这里需要对 SQL 进行一定的处理：
* 仅针对 'temp_hum/emqx'

根据上面的原则，我们最后得到的 SQL 应该如下：
```sql
SELECT
    timestamp div 1000 as up_timestamp, clientid as client_id, payload as temp_hum
FROM
    "temp_hum/emqx"
```

![规则创建2](./_assets/redis_create_rule_2.png)

## 4. 新建动作

完成规则配置后点击下一步，便可配置和新建动作。在动作中我们从 `temp_hum/emqx` 主题读取消息上报时间 `up_timestamp`、客户端 ID、温湿度消息储存到 Redis 中，命令如下。

```bash
HMSET ${client_id} ${up_timestamp} ${temp_hum}
```

![规则创建3](./_assets/redis_create_rule_3.png)

完成动作创建后可继续添加一个动作或者完成创建回到数据集成界面。

## 5. 测试

1. 使用 [MQTT X](https://mqttx.app/) 模拟温湿度数据上报

   需要将 broker.emqx.io 替换成已创建的部署连接地址，并添加客户端认证信息。

   ![MQTTX](./_assets/mqttx_publish_redis.png)

2. 查看数据转存结果

   ```bash
   docker exec -it redis bash redis-cli
   HGETALL test_client
   ```
   ![timescaladb](./_assets/redis_query_result.png)
