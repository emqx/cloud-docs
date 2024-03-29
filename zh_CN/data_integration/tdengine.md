# 将 MQTT 数据写入到 TDengine

[TDengine](https://tdengine.com/) 是一款专为物联网、工业互联网等场景设计并优化的大数据平台，其核心模块是高性能、集群开源、云原生、极简的时序数据库。EMQX Cloud 支持与 TDengine 集成，能够实现大量设备和数据采集器的海量数据传输、存储、分析和分发，对业务运行状态进行实时监测、预警，提供实时的商业洞察。

本页详细介绍了 EMQX Cloud 与 TDengine 的数据集成并提供了实用的规则和动作创建指导。

## 工作原理

TDengine 数据集成是 EMQX Cloud 的开箱即用功能，通过内置的[规则引擎](./rules.md)组件和动作将设备数据转发到 TDengine。通过 TDengine 动作，MQTT 消息和客户端事件可以存储在 TDengine 中。此外，数据更新或在 TDengine 中的删除操作可以由事件触发，从而实现对设备在线状态和历史上下线事件的记录。该集成简化了从 EMQX Cloud 到 TDengine 的数据摄取过程，无需复杂编码。

下图展示了 EMQX Cloud 和 TDengine 数据集成在工业物联网中的典型架构:

![EMQX Cloud-TDengine 集成](./_assets/data_integration_tdengine.jpg)

以工业能耗管理场景为例，工作流程如下：

1. **消息发布和接收**：工业设备通过 MQTT 协议成功连接到 EMQX Cloud，并定期使用 MQTT 协议发布能耗数据。这些数据包括生产线标识符和能耗值。当 EMQX Cloud 接收到这些消息时，它将在其规则引擎中启动匹配过程。
2. **规则引擎处理消息**：内置的规则引擎根据主题匹配处理来自特定来源的消息。当消息到达时，它通过规则引擎进行匹配，规则引擎将处理消息数据。这可能包括转换数据格式、过滤特定信息或用上下文信息丰富消息。
3. **数据写入到 TDengine**：规则引擎中定义的规则触发动作将消息写入 TDengine。TDengine 数据桥提供 SQL 模板，允许灵活定义数据格式，将特定消息字段写入 TDengine 中相应的表和列。

将能耗数据写入 TDengine 后，您可以使用标准 SQL 和强大的时间序列扩展实时分析您的数据，无缝集成众多第三方批分析、实时分析、报表工具、AI/ML 工具、可视化工具。例如：

- 连接到如 Grafana 等可视化工具以生成图表并显示能耗数据。
- 连接到 ERP 或 Power BI 等应用系统进行生产分析和生产计划调整。
- 连接到业务系统以进行实时能源使用分析，促进以数据驱动的能源管理。

## 特性与优势

TDengine 数据集成为您的业务带来了以下功能和优势：

- **高性能海量物联网数据**：EMQX Cloud 可以高效处理大量物联网设备连接和消息吞吐量，TDengine 充分利用了时序数据特点，在数据写入、存储、查询方面表现优异，满足物联网场景下的数据处理需求，不会对系统造成过大压力。
- **消息转换**：消息可以在 EMQX Cloud 规则中进行丰富的处理和转换，然后写入 TDengine。
- **集群和可扩展性**：EMQX Cloud 和 TDengine 支持集群能力并基于云原生构建，能充分利用云平台的存储、计算、网络资源的弹性能力，随着业务增长灵活地水平扩展以满足不断扩大的需求。
- **高级查询能力**：TDengine 为时戳数据的高效查询和分析提供了优化的功能、操作符和索引技术，使得能够从物联网时间序列数据中提取精确的洞察。

## 准备工作

本节介绍了在 EMQX Cloud 中创建 TDengine 数据集成之前需要做的准备工作，包括如何安装 TDengine 服务器并创建数据表。

### 前置准备

- 了解 [规则](./rules.md)。
- 了解[数据集成](./data-bridges.md)。

### 安装 TDengine

#### 通过 Docker 安装并启动 TDengine：

```bash
# 启动一个 TDengine 容器
docker run --name TDengine -p 6041:6041 tdengine/tdengine

# 进入容器
docker exec -it TDengine bash

# 在容器中连接到 TDengine 服务器
taos

# 创建并选择数据库

CREATE DATABASE mqtt;

use mqtt;
```

我们将在 TDengine 中创建表：

数据表 `t_mqtt_msg`，用于存储每条消息的发布者客户端 ID、主题、Payload 以及发布时间：

```sql
CREATE TABLE t_mqtt_msg (
  ts timestamp,
  msgid NCHAR(64),
  mqtt_topic NCHAR(255),
  qos TINYINT,
  payload BINARY(1024),
  arrived timestamp
);
```

## 创建连接器

在创建 TDengine 动作之前，您需要创建一个 TDengine 连接器，以便 EMQX Cloud 与 TDengine 服务建立连接。

1. 在部署菜单中选择 **数据集成**，在数据持久化分类下选择 TDengine。如果您已经创建了其他的连接器，点击**新建连接器**，然后在数据持久化分类下选择 TDengine。

2. **连接器名称**：系统将自动生成一个连接器的名称。

3. 填写连接相关配置：

   - **连接器名称**：应为大写和小写字母及数字的组合，例如：`my_opentsdb`。
   - **主机列表**：填写 `127.0.0.1:6041`。
   - **用户名**：填写 `root`。
   - **密码**：填写 `taosdata`。
   - 根据业务需求配置高级设置（可选）。

4. 点击**测试连接**按钮，如果 TDengine 能够正常访问，则会返回**连接器可用**提示。

5. 点击**新建**按钮完成连接器的创建。

接下来，您可以基于此连接器创建数据桥接规则。

## 创建规则

本节演示了如何创建 TDengine 数据集成的规则来指定需要持久化至 TDengine 的数据并为规则添加触发的动作。

1. 点击连接器列表**操作**列下的新建规则图标或在**规则列表**中点击**新建规则**进入**新建规则**步骤页。

2. 在 SQL 编辑器中输入规则，客户端将温湿度消息发送到 `temp_hum/emqx` 主题时，就会触发引擎。这里需要对 SQL 进行一定的处理：

   ```sql
    SELECT
      *,
      now_timestamp('millisecond')  as ts
    FROM
      "temp_hum/emqx"
   ```

   ::: tip

   如果您初次使用 SQL，可以点击 **SQL 示例**和**启用调试**来学习和测试规则 SQL 的结果。

   :::

3. 点击**下一步**开始创建动作。

4. 从**使用连接器**下拉框中选择您之前创建的连接器。

5. **数据库名字**：填写 `mqtt`。

6. 配置 SQL 模板，可使用如下 SQL 完成数据插入，并支持通过 CSV 文件批量设置，详细请参考[批量设置](#批量设置)。

```sql
INSERT INTO t_mqtt_msg(ts, msgid, mqtt_topic, qos, payload, arrived)
    VALUES (${ts}, '${id}', '${topic}', ${qos}, '${payload}', ${timestamp})
```

7. 高级配置（可选），根据情况配置同步/异步模式，队列与批量等参数。

8. 点击**确认**按钮完成动作的配置。
9. 在弹出的**成功创建规则**提示框中点击**返回规则列表**，从而完成了整个数据集成的配置链路。

## 测试规则

推荐使用 [MQTTX](https://mqttx.app/) 模拟温湿度数据上报，同时您也可以使用其他任意客户端完成。

1. 使用 MQTTX 连接到 EMQX Cloud 部署，并向以下 Topic 发送消息。

   - topic: `temp_hum/emqx`

   - client id: `test_client`

   - payload:

     ```json
     {
       "temp": "27.5",
       "hum": "41.8"
     }
     ```

2. 查看 TDengine 规则的动作统计，命中、动作成功次数均 +1。

3. 前往 TDengine 查看数据是否已经写入表中。

`t_mqtt_msg` 表：

```bash
taos> select * from t_mqtt_msg;
           ts            |             msgid              |           mqtt_topic           | qos  |            payload             |         arrived         |
==============================================================================================================================================================
 2024-03-29 06:57:37.300 | 000614C727B230AE67180100069... | temp_hum/emqx                            |    1 | {
  "temp": "27.5",
  "hum"... | 2024-03-29 06:57:37.300 |
Query OK, 1 row(s) in set (0.002968s)
```

### 批量设置

在 TDengine 中，一条数据可能包含数百个数据点，这使得编写 SQL 语句变得具有挑战性。为了解决这个问题，EMQX Cloud 提供了批量设置 SQL 的功能。

当编辑 SQL 模板时，您可以使用批量设置功能，从 CSV 文件中导入要进行插入操作的字段。

1. 点击 **SQL 模板**下方的**批量设置**按钮，打开**导入批量设置**弹窗。

2. 根据指引，先下载批量设置模板文件，然后在模板文件中填入 Fields 键值对，默认的模板文件内容如下：

   | Field      | Value             | Char Value | Remarks (Optional) |
   | ---------- | ----------------- | ---------- | ------------------ |
   | ts         | now               | FALSE      | Example Remark     |
   | msgid      | ${id}             | TRUE       |                    |
   | mqtt_topic | ${topic}          | TRUE       |                    |
   | qos        | ${qos}            | FALSE      |                    |
   | temp       | ${payload.temp}   | FALSE      |                    |
   | hum        | ${payload.hum}    | FALSE      |                    |
   | status     | ${payload.status} | FALSE      |                    |

   - **Field**: 字段键，支持常量或 ${var} 格式的占位符。
   - **Value**: 字段值，支持常量或 ${var} 格式的占位符。虽然 SQL 中要求字符类型需要通过引号包裹，但在模板文件中无需包裹引号，而是通过 `Char Value` 列来指定字段是否为字符类型。
   - **Char Value**: 用于指定字段是否为字符类型，以便在导入生成 SQL 时为字段添加引号。如果字段是字符类型，则填写 `TRUE` 或 `1`，否则填写 `FALSE` 或 `0`。
   - **Remarks**: 仅用于 CSV 文件内字段的备注，无法导入到 EMQX Cloud 中。

   注意，批量设置 CSV 文件中数据不能超过 2048 行。

3. 将填好的模板文件保存并上传到**导入批量设置**弹窗中，点击**导入**完成批量设置。
4. 导入完成后，您可以在 **SQL 模板** 中对 SQL 进行进一步的调整，例如设置表名称，美化 SQL 等。
