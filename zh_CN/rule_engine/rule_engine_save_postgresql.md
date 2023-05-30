# 集成 PostgreSQL

::: warning
该功能在基础版中不可用
:::

在本文中我们将模拟温湿度数据并通过 MQTT 协议上报到 EMQX Cloud，然后使用 EMQX Cloud 数据集成将数据转存到 PostgreSQL。

在开始之前，您需要完成以下操作：

* 已经在 EMQX Cloud 上创建部署(EMQX 集群)。
* 对于专业版部署用户：请先完成 [对等连接的创建](../deployments/vpc_peering.md)，下文提到的 IP 均指资源的内网 IP。(专业版部署若开通 [NAT 网关](../vas/nat-gateway.md)也可使用公网 IP 进行连接）
* 对于 BYOC 部署用户：请首先为 BYOC 部署所在的 VPC 与资源所在的 VPC 之间建立对等连接。注：下文提到的 IP 均指资源的内网 IP。如需通过公网地址访问资源，请首先在您的公有云控制台中为 BYOC 部署所在 VPC 配置 NAT 网关。

## PostgreSQL 配置

1. PostgreSQL 安装

   ```bash
   docker run -d --name postgresql -p 5432:5432 -e POSTGRES_PASSWORD=public postgres:13
   ```

2. 数据库创建

   ```bash
   docker exec -it postgresql psql -U postgres
   CREATE database emqx;
   \c emqx
   ```

3. 温湿度表创建

   使用以下 SQL 语句将创建 `temp_hum` 表，该表将用于存放设备上报的温度和湿度数据。

   ```sql
   CREATE TABLE temp_hum (
       up_timestamp   TIMESTAMPTZ       NOT NULL,
       client_id      TEXT              NOT NULL,
       temp           DOUBLE PRECISION  NULL,
       hum            DOUBLE PRECISION  NULL
   );

   ```

4. 插入测试数据，并查看数据

   ```sql
   INSERT INTO temp_hum(up_timestamp, client_id, temp, hum) values (to_timestamp(1603963414), 'temp_hum-001', 19.1, 55);
   
   select * from temp_hum;
   ```

## EMQX Cloud 数据集成配置

1. 资源创建

   点击左侧菜单栏`数据集成`，找到数据持久化--PostgreSQL

   ![数据集成](./_assets/postgresql_data_integration.png)

   点击新建资源，下拉选择 PostgreSQL 资源类型。填入刚才创建好的 PostgreSQL 数据库信息，并点击测试如果出现错误应及时检查数据库配置是否正确。

   ![资源创建](./_assets/postgresql_resource.png)

2. 规则测试

   点击左侧左侧菜单栏`数据集成`，找到规则面板，点击创建，然后输入如下规则匹配 SQL 语句。在下面规则中我们从 `temp_hum/emqx` 主题读取消息上报时间 `up_timestamp`、客户端 ID、消息体(Payload)，并从消息体中分别读取温度和湿度。

   ```sql
   SELECT 
   
   timestamp div 1000 as up_timestamp, clientid as client_id, payload.temp as temp, payload.hum as hum
   
   FROM
   
   "temp_hum/emqx"
   ```

   ![规则测试](./_assets/postgresql_rule_1.png)
   ![规则测试](./_assets/postgresql_rule_2.png)


3. 添加响应动作

   点击左下角添加动作，下拉选择 → 数据持久化 → 保存数据到 PostgreSQL 选择第一步创建好的资源，并输入以下数据插入 SQL 模板。

   ```sql
   insert into temp_hum(up_timestamp, client_id, temp, hum) values (to_timestamp(${up_timestamp}), ${client_id}, ${temp}, ${hum})
   ```

   ![响应动作](./_assets/postgresql_action.png)

4. 点击创建规则，并返回规则列表

   ![规则列表](./_assets/postgresql_rule_list.png)

5. 查看规则监控

   ![查看监控](./_assets/postgresql_monitor.png)

## 测试

1. 使用 [MQTTX](https://mqttx.app/) 模拟温湿度数据上报

   需要将 broker.emqx.io 替换成已创建的部署连接地址，并添加客户端认证信息。

   ![MQTTX](./_assets/postgresql_mqttx.png)

2. 查看数据转存结果

   ```sql
   select * from temp_hum order by up_timestamp desc limit 10;
   ```

   ![PostgreSQL](./_assets/postgresql_db_result.png)
