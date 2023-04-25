# 集成阿里云 RDS MySQL

::: warning
该功能在基础版中不可用
:::

在本文中我们将模拟温湿度数据并通过 MQTT 协议上报到 EMQX Cloud，然后使用 EMQX Cloud 数据集成将数据转存到阿里云 RDS MySQL。

在开始之前，您需要完成以下操作：

- 已经在 EMQX Cloud 上创建部署(EMQX 集群)。
- 对于专业版部署用户：请先完成 [对等连接的创建](../deployments/vpc_peering.md)，下文提到的 IP 均指资源的内网 IP。(专业版部署若开通 [NAT 网关](../vas/nat-gateway.md)也可使用公网 IP 进行连接）
- 对于 BYOC 部署用户：请先对 BYOC 部署所在 VPC 与资源所在 VPC 建立对等连接，下文提到的 IP 均指资源的内网 IP。如需通过公网访问资源，请在您的公有云控制台中为 BYOC 部署所在 VPC 配置 NAT 网关，使用资源的公网 IP 进行连接。

## 购买阿里云 RDS MySQL

### 1. 创建阿里云 RDS MySQL

如果您是初次接触阿里云 RDS MySQL，建议您跟随阿里云 RDS MySQL [快速入门](https://help.aliyun.com/document_detail/96036.html)进行创建。

为了方便测试，这里我们选择的配置如下：

- 商品类型：按量付费
- 数据库版本：MySQL8.0
- 系列：高可用版（一主一备）
- 存储类型：本地 SSD 盘
- 实例规格：通用规格
- 网络类型：专有网络
- 规格：1 核 1G

> 需要特别注意的是：网络类型一定要选专有网络，并选择与 EMQX Cloud 建立了对等连接的 VPC

### 2. 将 EMQX Cloud VPC 所在网段加入白名单

在 RDS MySQL 实例页面中，找到 `数据安全性` -> `白名单设置`

将 EMQX Cloud 的 VPC 网段加入 RDS MySQL 的白名单中

![VPC 网段](./_assets/aliyun_mysql_vpc_info.png)

### 3. 开启阿里云 SSL

在 RDS MySQL 实例页面中，找到 `数据安全性` -> `SSL`

开通 SSL，下载 CA 证书

## RDS MySQL 配置

1. 温湿度表创建

   使用以下 SQL 语句将创建 `temp_hum` 表，该表将用于存放设备上报的温度和湿度数据。

   ```sql
   CREATE TABLE `temp_hum` (
     `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
     `up_timestamp` timestamp NULL DEFAULT NULL,
     `client_id` varchar(32) DEFAULT NULL,
     `temp` float unsigned DEFAULT NULL,
     `hum` float unsigned DEFAULT NULL,
     PRIMARY KEY (`id`),
     KEY `up_timestamp_client_id` (`up_timestamp`,`client_id`)
   ) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
   ```

2. 设置允许 EMQX 集群 IP 段访问数据库(可选)

   - 对于专业版部署，获取部署网段可以前往部署详情 → 查看对等连接信息，复制部署 VPC 网段。
   - 对于 BYOC 部署，您可以在公有云控制台中查看对等连接信息，复制部署 VPC 网段。

   ```sql
   # 专业版 / BYOC
   GRANT ALL PRIVILEGES ON *.* TO root@'10.13.89.%' IDENTIFIED BY '-abc12345' WITH GRANT OPTION;

   # 基础版
   GRANT ALL PRIVILEGES ON *.* TO root@'%' IDENTIFIED BY '-abc12345' WITH GRANT OPTION;
   ```

3. 插入测试数据，并查看数据

   ```sql
   INSERT INTO temp_hum(up_timestamp, client_id, temp, hum) VALUES (FROM_UNIXTIME(1603963414), 'temp_hum-001', 19.1, 55);
   
   SELECT * FROM temp_hum;
   ```

## 数据集成配置

1. 创建 MySQL 资源

   点击左侧菜单栏`数据集成`，在数据持久化下找到 MySQL，点击新建资源。填入刚才创建好的 MySQL 数据库信息，并开启 SSL 链接到阿里云，上传 `.pem` 格式的 CA 文件，点击测试，如果出现错误应及时检查数据库配置是否正确。

   ![rds_mysql_create_resource](./_assets/rds_mysql_create_resource.png)

   其中, `服务器地圵`可以在下图的位置找到

   ![阿里云 RDS MySQL 连接地址](./_assets/aliyun_mysql_address.png)

2. 创建规则

   资源创建后点击新建规则，然后输入如下规则匹配 SQL 语句。在下面规则中我们从 `temp_hum/emqx` 主题读取消息上报时间 `up_timestamp`、客户端 ID、消息体(Payload)，并从消息体中分别读取温度和湿度。

   ```sql
   SELECT
   timestamp as up_timestamp, clientid as client_id, payload.temp as temp, payload.hum as hum
   FROM
   "temp_hum/emqx"
   ```

   我们可以使用 `SQL 测试` 来测试查看结果

   ![rds_mysql_create_rule](./_assets/rds_mysql_create_rule.png)

3. 添加响应动作

   点击下一步来到动作界面，选择第一步创建好的资源，动作类型选择`数据持久化 - 保存数据到 MySQL`，并输入以下数据插入 SQL 模板，点击确认。

   ```sql
   insert into temp_hum(up_timestamp, client_id, temp, hum) values (FROM_UNIXTIME(${up_timestamp}/1000), ${client_id}, ${temp}, ${hum})
   ```

   ![rds_mysql_create_action](./_assets/rds_mysql_create_action.png)

4. 查看资源详情

   动作创建完以后，返回列表点击资源可以查看详情

   ![rds_mysql_resource_detail](./_assets/rds_mysql_resource_detail.png)

5. 查看规则详情
   
   资源详情界面点击规则可以查看规则监控信息和规则详情

   ![rds_mysql_rule_detail](./_assets/rds_mysql_rule_detail.png)

## 测试

1. 使用 [MQTT X](https://mqttx.app/) 模拟温湿度数据上报

   需要将 broker.emqx.io 替换成已创建的部署连接地址，并添加客户端认证信息。

    - topic: `temp_hum/emqx`
    - payload:

      ```json
      {
        "temp": "27.5",
        "hum": "41.8"
      }
      ```

   ![MQTTX](./_assets/rdsmysql_mqttx_publish.png)

2. 查看数据转存结果

   ```sql
   select * from temp_hum order by up_timestamp desc limit 10;
   ```

   ![mysql](./_assets/rdsmysql_query_result.png)
