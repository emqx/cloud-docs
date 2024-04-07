# 将 MQTT 数据写入到 GreptimeDB

[GreptimeDB](https://github.com/GreptimeTeam/greptimedb) 是一个开源、分布式、云原生时序数据库，融合时序数据处理和分析能力。GreptimeDB 专为云而生，充分利用云的优势，如弹性、可扩展性和高可用性。EMQX Platform 目前支持与不同版本的 GreptimeDB, GreptimeCloud 以及 GreptimeDB 企业版的数据集成。

本页详细介绍了 EMQX Platform 与 GreptimeDB 的数据集成并提供了实用的规则和动作创建指导。

## 工作原理

GreptimeDB 数据集成是 EMQX Platform 开箱即用的功能，它结合了 EMQX Platform 的实时数据捕获和传输能力以及 GreptimeDB 的数据存储和分析能力。

下图展示了 EMQX Platform 和 GreptimeDB 之间的数据集成的典型架构：

![EMQX Platform-GreptimeDB 集成](./_assets/data_integration_greptimedb.jpg)

通过内置的[规则引擎](./rules.md)组件，集成简化了从 EMQX Platform 到 GreptimeDB 的数据摄取过程，无需复杂编码。工作流程如下：

1. **消息发布和接收**：工业设备通过 MQTT 协议成功连接到 EMQX Platform，并定期使用 MQTT 协议发布能耗数据。这些数据包括生产线标识符和能耗值。当 EMQX Platform 接收到这些消息时，它将在其规则引擎中启动匹配过程。
2. **规则引擎处理消息**：内置的规则引擎根据主题匹配处理来自特定来源的消息。当消息到达时，它通过规则引擎进行匹配，规则引擎将处理消息数据。这可能包括转换数据格式、过滤特定信息或用上下文信息丰富消息。
3. **数据写入到 GreptimeDB**：规则引擎中定义的规则触发操作将消息写入 GreptimeDB。GreptimeDB 动作提供 Line Protocol 模板，允许灵活定义数据格式，将特定消息字段写入 GreptimeDB 中相应的表和列。

将能耗数据写入 GreptimeDB 后，您可以灵活使用 SQL 语句或 Prometheus 查询语言来分析数据。例如：

- 连接到如 Grafana 等可视化工具以生成图表并显示能耗数据。
- 连接到 ERP 等应用系统进行生产分析和生产计划调整。
- 连接到业务系统以进行实时能源使用分析，促进以数据驱动的能源管理。

## 特性与优势

与 GreptimeDB 的数据集成为您的业务带来以下特性和优势：

- **易于上手使用**：EMQX Platform 与 GreptimeDB 在开发、部署方面均提供了用户友好的使用体验。EMQX Platform 提供了标准的 MQTT 协议以及开箱即用的各类认证、授权和集成功能，GreptimeDB 提供了 Time-Series Table，schemaless 等友好设计。两者的集成能够加快业务的整合与开发过程。
- **高效数据处理**：EMQX Platform 能够高效处理大量物联网设备连接和消息吞吐量。GreptimeDB 在数据写入、存储和查询方面表现出色，满足物联网场景下的数据处理需求，不会对系统造成过大压力。
- **消息转换**：消息可以在写入 GreptimeDB 之前在 EMQX Platform 规则中进行丰富的处理和转换。
- **高效存储和可扩展性**：EMQX Platform 和 GreptimeDB 都具有集群扩展能力，允许随着业务增长灵活地水平扩展以满足不断扩大的需求。
- **高级查询能力**：GreptimeDB 为时戳数据的高效查询和分析提供了优化的功能、操作符和索引技术，使得能够从物联网时间序列数据中提取精确的洞察。

## 准备工作

本节介绍了在 EMQX Platform 中创建 GreptimeDB 数据集成之前需要做的准备工作，包括如何设置 GreptimeDB 服务器。

### 前置准备

- 了解 [规则](./rules.md)。
- 了解[数据集成](./introduction.md)。

### 安装 GreptimeDB

1. 通过 Docker 安装并启动 GreptimeDB，详细步骤请参考[下载安装 GreptimeDB](https://greptime.cn/download)。

   ```bash
   # 启动一个 GreptimeDB 容器
   docker run -p 4000-4004:4000-4004 \
   -p 4242:4242 -v "$(pwd)/greptimedb:/tmp/greptimedb" \
   --name greptime --rm \
   greptime/greptimedb standalone start \
   --http-addr 0.0.0.0:4000 \
   --rpc-addr 0.0.0.0:4001 \
   --mysql-addr 0.0.0.0:4002 \
   --user-provider=static_user_provider:cmd:greptime_user=greptime_pwd
   ```

2. `user-provider` 参数指定了 GreptimeDB 的用户鉴权账户，你还可以通过文件的方式指定，参考[鉴权](https://docs.greptime.cn/user-guide/clients/authentication#authentication)文档。

3. GreptimeDB 正常启动后，你可以通过 [http://{host}:4000/dashboard](http://{host}:4000/dashboard) 访问 GreptimeDB Dashboard，其中 username 和 password 分别输入 `greptime_user` 和 `greptime_pwd`。

## 创建连接器

在创建 GreptimeDB 动作之前，您需要创建一个 GreptimeDB 连接器，以便 EMQX Platform 与 GreptimeDB 服务建立连接。

1. 在部署菜单中选择 **数据集成**，在数据持久化分类下选择 GreptimeDB。如果您已经创建了其他的连接器，点击**新建连接器**，然后在数据持久化分类下选择 GreptimeDB。

2. **连接器名称**：系统将自动生成一个连接器的名称。

3. 填写连接相关配置：

   - **服务器地址**：输入 `{host}:4001`。如果是 GreptimeCloud 需要指定端口为 443，即输入 `{url}:443` 。
   - **数据库**：输入数据库名称 `public`，如果 GreptiemCloud，请输入 service 名称。
   - **用户名**和**密码**：设置成 `greptime_user` 和 `greptime_pwd`。
   - **启用 TLS**: 如果您想建立一个加密连接，单击切换按钮。
   - 根据业务需求配置高级设置（可选）。

4. 点击**测试连接**按钮，如果 GreptimeDB 能够正常访问，则会返回**连接器可用**提示。

5. 点击**新建**按钮完成连接器的创建。

接下来，您可以基于此连接器创建数据桥接规则。

## 创建规则

本节演示了如何创建 GreptimeDB 数据集成的规则来指定需要持久化至 GreptimeDB 的数据并为规则添加触发的动作。

1. 点击连接器列表**操作**列下的新建规则图标或在**规则列表**中点击**新建规则**进入**新建规则**步骤页。

2. 在 SQL 编辑器中输入规则，客户端将温湿度消息发送到 `temp_hum/emqx` 主题时，就会触发引擎。这里需要对 SQL 进行一定的处理：

   ```sql
    SELECT
     timestamp, clientid, payload
    FROM
      "temp_hum/emqx"
   ```

   ::: tip

   如果您初次使用 SQL，可以点击 **SQL 示例**和**启用调试**来学习和测试规则 SQL 的结果。

   :::

3. 点击**下一步**开始创建动作。

4. 从**使用连接器**下拉框中选择您之前创建的连接器。

5. **写语法**：配置数据格式，通过一段语句指定数据点的测量、标签集、字段集和时间戳，键值均支持变量，可按照[行协议](https://docs.influxdata.com/influxdb/v2.3/reference/syntax/line-protocol/)进行设置。<!--定义数据格式为 JSON 或 Line Protocol， -->GreptimeDB 使用和 InfluxDB 兼容的数据格式。本教程示例语法：

   ```sql
    myMeasurement,tag1=${clientid} fieldKey=${payload}
   ```

   <!--对于 **JSON** 格式，需设置数据的 **Measurement**，**Fields**，**Timestamp** 与 **Tags**，键值均支持变量，可以使用[行协议](https://docs.influxdata.com/influxdb/v2.3/reference/syntax/line-protocol/)进行设置。-->

   <!--对于 **Line Protocol** 格式，请通过一段语句指定数据点的 Measurement、Fields、Timestamp 与 Tags，键值均支持变量，可按照[行协议](https://docs.influxdata.com/influxdb/v2.3/reference/syntax/line-protocol/)进行设置。-->

   ::: tip

   - 如希望输入带符号的整型值，请在占位符后添加 `i` 作为类型标识，例如 `${payload.int}i`。
   - 对于无符号整型值，请在占位符后添加 `u` 作为类型标识，例如 `${payload.uint}u`。

   :::

6. 选择**时间精度**：使用默认值`毫秒`。

7. 高级配置（可选），根据情况配置同步/异步模式，队列与批量等参数。

8. 点击**确认**按钮完成动作的配置。
9. 在弹出的**成功创建规则**提示框中点击**返回规则列表**，从而完成了整个数据集成的配置链路。

## 测试规则

推荐使用 [MQTTX](https://mqttx.app/) 模拟温湿度数据上报，同时您也可以使用其他任意客户端完成。

1. 使用 MQTTX 连接到 EMQX Platform 部署，并向以下 Topic 发送消息。

   - topic: `temp_hum/emqx`

   - client id: `test_client`

   - payload:

     ```json
     {
       "temp": "27.5",
       "hum": "41.8"
     }
     ```

2. 查看 GreptimeDB 规则的动作统计，命中、动作成功次数均 +1。

3. 前往 GreptimeDB dashboard 查看数据是否已经写入 GreptimeDB 中。
