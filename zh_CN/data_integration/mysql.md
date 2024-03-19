# 将 MQTT 数据写入到 MySQL

[MySQL](https://www.mysql.com/) 是一个广泛使用的关系数据库，具备高度的可靠性和稳定性，能够快速安装和配置使用。MySQL 数据集成能够将 MQTT 消息高效地存储至 MySQL 数据库中，同时也支持通过事件触发实时更新或删除 MySQL 中的数据。借助 MySQl 数据集成，用户能够轻松实现消息存储、设备在线状态更新以及设备行为记录等功能，实现灵活的物联网数据存储与设备管理功能。

本页详细介绍了 EMQX Cloud 与 MySQL 的数据集成并提供了实用的规则和创建指导。

## 工作原理

MySQL 数据集成是 EMQX Cloud 中开箱即用的功能，通过简单的配置即可实现复杂的业务开发。在一个典型的物联网应用中，EMQX Cloud 作为物联网平台，负责接入设备，进行消息传输，MySQL 作为数据存储平台，负责设备状态与元数据的存储，以及消息数据存储和数据分析等。

![EMQX Cloud MySQL 数据集成](./_assets/data_integration_mysql.jpg)

EMQX Cloud 通过规则引擎将设备事件和数据转发至 MySQL，应用读取 MySQL 中数据即可感知设备状态，获取设备上下线记录，以及分析设备数据。其具体的工作流程如下：

- **设备连接到 EMQX Cloud**：物联网设备通过 MQTT 协议连接成功后将触发上线事件，事件包含设备 ID、来源 IP 地址以及其他属性等信息。
- **设备消息发布和接收**：设备通过特定的主题发布遥测和状态数据，EMQX Cloud 接收到消息后将在规则引擎中进行比对。
- **规则引擎处理消息**：通过内置的规则引擎，可以根据主题匹配处理特定来源的消息和事件。规则引擎会匹配对应的规则，并对消息和事件进行处理，例如转换数据格式、过滤掉特定信息或使用上下文信息丰富消息。
- **写入到 MySQL**：规则触发将消息写入到 MySQL 的操作。借助 SQL 模板，用户可以从规则处理结果中提取数据构造 SQL 发送给 MySQL 执行，实现将消息特定字段写入或更新到数据库对应表和列中。

事件和消息数据写入到 MySQL 后，您可以连接到 MySQL 读取数据，进行灵活的应用开发，例如：

- 连接到可视化工具，例如 Grafana，根据数据生成图表，展示数据变化。
- 连接到设备管理系统，查看设备列表与状态，并检测设备异常行为，及时排除潜在的问题。

## 特性与优势

在 EMQX Cloud 中使用 MySQL 数据集成能够为您的业务带来以下特性与优势：

- **灵活的事件处理**：通过 EMQX Cloud 规则引擎，MySQL 可以处理设备全生命周期事件，极大的方便开发实现物联网应用所需的各类管理与监控业务。您可以通过通过分析事件数据，及时发现设备故障、异常行为或趋势变化，以便采取适当的措施。
- **消息转换**：消息可以写入 MySQL 之前，通过 EMQX Cloud 规则进行丰富的处理和转换，方便后续的存储和使用。
- **灵活数据操作**：通过 EMQX Cloud 提供的 SQL 模板，可以方便地将特定字段的数据写入或更新到 MySQL 数据库的对应表和列中，实现数据的灵活存储和管理。
- **整合业务流程**：通过数据集成可以将设备数据与 MySQL 丰富的生态应用结合，方便的与例如 ERP 与 CRM 或其他自定义业务系统进行集成，以实现更高级的业务流程和自动化操作。
- **运行时指标**：支持查看每个规则的运行时指标，例如消息总数、成功/失败计数、当前速率等。

通过灵活的事件处理、丰富的消息转换、灵活的数据操作以及实时监控与分析能力，您可以构建高效、可靠和可扩展的物联网应用，并在业务决策和优化方面受益。

## 连接准备

本节介绍了在 EMQX Cloud 中创建 MySQL 数据集成之前需要做的准备工作，包括安装 MySQL 和创建数据表。

### 前置准备

- 了解[数据集成](./introduction.md)。
- 了解[规则](./rules.md)。

### 安装 MySQL

1. 通过 Docker 安装并启动 MySQL：

```bash
# 启动一个 MySQL 容器并设置密码为 public
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=public -d mysql

# 进入容器
docker exec -it mysql bash

# 在容器中连接到 MySQL 服务器，需要输入预设的密码
mysql -u root -p

# 创建并选择数据库
CREATE DATABASE emqx_data CHARACTER SET utf8mb4;
use emqx_data;
```

2. 温湿度表创建，使用以下 SQL 语句将创建 temp_hum 表，该表将用于存放设备上报的温度和湿度数据：

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

## 创建 MySQL 连接器

在创建数据集成的规则之前，您需要先创建一个 MySQL 连接器用于访问 MySQL 服务器。

1. 在部署菜单中选择 **数据集成**，在数据持久化服务分类下选择 MySQL 服务。如果您已经创建了其他的连接器，点击**新建连接器**，然后在数据持久化服务分类下选择 MySQL 服务。
2. **连接器名称**：系统将自动生成一个连接器的名称。
3. 输入连接信息：

   - **服务器地址**：填写服务器的 IP 地址以及端口。
   - **数据库名字**：填写 `emqx_data`。
   - **用户名**：填写 `root`。
   - **密码**：填写 `public`。
   - 如果您想建立加密连接，请点击 **启用 TLS** 切换开关。

4. 根据需要配置高级设置选项（可选），详情请参考[高级设置](https://docs.emqx.com/zh/enterprise/latest/data-integration/data-bridge-mysql.html#%E9%AB%98%E7%BA%A7%E8%AE%BE%E7%BD%AE)。。
5. 点击**测试连接**按钮，如果 MySQL 服务能够正常访问，则会返回成功提示。
6. 点击**新建**按钮完成连接器的创建。

## 创建规则

接下来您需要创建一条规则来指定需要写入的数据，并在规则中添加响应动作以将经规则处理的数据转发到 MySQL。

1. 点击连接器列表**操作**列下的新建规则图标或在**规则列表**中点击**新建规则**进入**新建规则**步骤页。

2. 在 SQL 编辑器中输入规则，在下面规则中我们从 `temp_hum/emqx` 主题读取消息上报时间 `up_timestamp`、客户端 ID、消息体(Payload)，并从消息体中分别读取温度和湿度：

   ```sql
    SELECT
      timestamp as up_timestamp,
      clientid as client_id,
      payload.temp as temp,
      payload.hum as hum
      FROM
    "temp_hum/emqx"
   ```

   ::: tip

   如果您初次使用 SQL，可以点击 **SQL 示例** 和**启用调试**来学习和测试规则 SQL 的结果。

   :::

3. 点击**下一步**开始创建动作，为规则在被触发的情况下指定一个动作。通过这个动作，EMQX Cloud 会将经规则处理的数据发送到 MySQL。

4. 从**使用连接器**下拉框中选择您之前创建的连接器。

5. 配置 SQL 模板，使用如下 SQL 完成数据插入，此处为预处理 SQL，字段不应当包含引号，SQL 末尾不要带分号 `;`：

   ```sql
    INSERT INTO temp_hum (up_timestamp, client_id, temp, hum)
    VALUES (
        FROM_UNIXTIME(${up_timestamp}/1000),
        ${client_id},
        ${temp},
        ${hum}
    )
   ```

6. 根据需要配置高级设置选项（可选），详情请参考[高级设置](https://docs.emqx.com/zh/enterprise/latest/data-integration/data-bridge-mysql.html#%E9%AB%98%E7%BA%A7%E8%AE%BE%E7%BD%AE)。

7. 点击**确认**按钮完成动作的配置。

8. 在弹出的**成功创建规则**提示框中点击**返回规则列表**，从而完成了整个数据集成的配置链路。

## 测试规则

推荐使用 [MQTTX](https://mqttx.app/) 模拟温湿度数据上报，同时您也可以使用其他任意客户端完成。

1. 使用 MQTTX 连接到部署，并向以下 Topic 发送消息。

   - topic: `temp_hum/emqx`

   - payload:

     ```json
     {
       "temp": "27.5",
       "hum": "41.8"
     }
     ```

2. 查看数据转存结果

```bash
mysql> SELECT * FROM temp_hum ORDER BY up_timestamp DESC LIMIT 10;
+----+---------------------+-------------+------+------+
| id | up_timestamp        | client_id   | temp | hum  |
+----+---------------------+-------------+------+------+
| 26 | 2024-03-20 08:44:55 | test_client | 27.5 | 41.8 |
+----+---------------------+-------------+------+------+
1 row in set (0.00 sec)
```

3. 在控制台查看运行数据。在规则列表点击规则 ID，在运行统计页面可以查看到规则的统计以及此规则下所有动作的统计。
