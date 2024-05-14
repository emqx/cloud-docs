# 将 MQTT 数据写入到 InfluxDB

InfluxDB 是一个用于存储和分析时间序列数据的数据库，其强大的数据吞吐能力以及稳定的性能表现使其非常适合物联网领域。EMQX Platform 目前支持通过 Sink 的方式连接不同版本的 InfluxDB Cloud、InfluxDB OSS 以及 InfluxDB Enterprise。

本页提供了 EMQX Platform 与 InfluxDB 数据集成的全面介绍，并提供了创建和验证数据集成的实用指导。

## 工作原理

InfluxDB 数据集成是 EMQX Platform 中开箱即用的功能，它结合了 EMQX Platform 的设备接入、消息传输能力与 InfluxDB 的数据存储和分析能力，通过简单的配置即可实现 MQTT 数据的无缝集成。EMQX 通过规则引擎将设备数据转发至 InfluxDB 进行存储和分析，在对数据进行分析之后，InfluxDB 会生成报表、图表等数据分析结果，通过 InfluxDB 的可视化工具展示给用户。

下图展示了储能场景中 EMQX 和 InfluxDB 数据集成的典型架构。

![EMQX Platform InfluxDB 数据集成](./_assets/data_integration_influxdb.jpg)

EMQX Platform 和 InfluxDB 提供了一个可扩展的物联网平台，用于高效地实时收集和分析能耗数据。在此架构中，EMQX Platform 作为物联网平台，负责设备接入、消息传输、数据路由等功能，InfluxDB 作为数据存储和分析平台，负责数据存储、数据分析等功能。具体的工作流程如下：

1. **消息发布与接收**：储能设备通过 MQTT 协议连接成功后定期发布能耗数据，这些数据包括电量、输入输出功率信息。EMQX Platform 接收到消息后将在规则引擎中进行比对。
2. **规则引擎处理消息**：通过内置的规则引擎，可以根据主题匹配处理特定来源的消息。当消息到达时，它会通过规则引擎，规则引擎会匹配对应的规则，并对消息数据进行处理，例如转换数据格式、过滤掉特定信息或使用上下文信息丰富消息。
3. **写入到 InfluxDB**：规则引擎中定义的规则触发将消息写入到 InfluxDB 的操作。数据集成规则提供了 SQL 模板，能够灵活地定义写入的数据格式，将消息中的特定字段写入到 InfluxDB 的对应的表和列中。

储能数据写入到 InfluxDB 后，您可以灵活的使用[行协议](https://docs.influxdata.com/influxdb/v2.3/reference/syntax/line-protocol/)对数据进行分析，例如：

- 连接到可视化工具，例如 Grafana，根据数据生成图表，展示储能数据。
- 连接业务系统，进行储能设备状态监控与告警。

## 特性与优势

InfluxDB 数据集成具有以下特性与优势：

- **高效的数据处理能力**：EMQX Platform 能够处理海量物联网设备连接与消息吞吐，InfluxDB 在数据写入、存储和查询方面具有出色的性能表现，能够满足物联网场景下的数据处理需求，不会导致系统不堪重负。
- **消息转换**：消息可以写入 InfluxDB 之前，通过 EMQX Platform 规则中进行丰富的处理和转换。
- **可扩展性**：EMQX Platform 与 InfluxDB 都具备集群扩展能力，能够随着业务的发展，利用灵活地进行集群水平扩展，满足业务的发展需求。
- **丰富的查询能力**：InfluxDB 提供包括优化的函数、运算符和索引技术，可实现对时间戳数据的高效查询和分析，准确地从 IoT 时间序列数据中提取有价值的见解。
- **高效存储**：InfluxDB 使用高压缩比的编码方式，可以大幅降低存储成本。也可以自定义不同数据的存储时间,避免不必要的数据占用存储空间。

## 准备工作

本节介绍了在 EMQX Platform 中创建 InfluxDB 数据集成之前需要做的准备工作。

### 前置准备

- 了解 [InfluxDB 行协议](https://docs.influxdata.com/influxdb/v2.5/reference/syntax/line-protocol/)。
- 了解[数据集成](./introduction.md)。
- 了解[规则](./rules.md)。

### 网络设置

<!--@include: ./network-setting.md-->

### 安装 InfluxDB

#### 通过 Docker 安装 InfluxDB

1. 通过 Docker 安装并启动 InfluxDB，详细步骤请参考 [Install InfluxDB](https://docs.influxdata.com/influxdb/v2.5/install/)。

```bash
# 启动一个 InfluxDB 容器
docker run --name influxdb -p 8086:8086 influxdb:2.5.1
```

2. 访问服务器所在地址的 8086 端口打开 InfluxDB UI，设置用户名、密码、组织名称、Bucket 名称。

3. 前往 InfluxDB UI **Load Data** -> **API Token**，按照 [Create All-Access tokens](https://docs.influxdata.com/influxdb/v2.5/install/#create-all-access-tokens) 指引创建 Token。

#### 使用 InfluxDB Cloud 创建 InfluxDB 服务

1. 登录 [InfluxDB Cloud](https://cloud2.influxdata.com)。

2. 打开 InfluxDB UI，设置用户名、密码、组织名称、Bucket 名称。

3. 前往 InfluxDB UI **Load Data** -> **API Token**，按照 [Create All-Access tokens](https://docs.influxdata.com/influxdb/v2.5/install/#create-all-access-tokens) 指引创建 Token。

## 创建 InfluxDB 连接器

在创建数据集成的规则之前，您需要先创建一个 InfluxDB 连接器用于访问 InfluxDB 服务器。

1. 在部署菜单中选择 **数据集成**，在数据持久化服务分类下选择 InfluxDB 服务。如果您已经创建了其他的连接器，点击**新建连接器**，然后在数据持久化服务分类下选择 InfluxDB 服务。

2. **连接器名称**：系统将自动生成一个连接器的名称。

3. 输入连接信息：

   - 根据情况选择 InfluxDB 版本，默认为 V2。
   - **服务器地址**：填写服务器的 IP 地址以及端口。如果是 InfluxDB Cloud 需要指定端口为 443，即填入 `{url}:443` 并点击**启用 TLS** 以启用 TLS 连接。
   - 按照[安装 InfluxDB](#安装-InfluxDB) 中的设定完成 **Token**、**组织**及 **Bucket** 设置。注：如选择 InfluxDB v1 版本，请完成**数据库**、**用户名**及**密码**的设定。
   - 如果您想建立加密连接，请点击 **启用 TLS** 切换开关。

4. 点击**测试连接**按钮，如果 InfluxDB 服务能够正常访问，则会返回成功提示。

5. 点击**新建**按钮完成连接器的创建。

## 创建规则

接下来您需要创建一条规则来指定需要写入的数据，并在规则中添加响应动作以将经规则处理的数据转发到 InfluxDB。

1. 点击连接器列表**操作**列下的新建规则图标或在**规则列表**中点击**新建规则**进入**新建规则**步骤页。

2. 在 SQL 编辑器中输入规则，客户端将温湿度消息发送到 `temp_hum/emqx` 主题时，就会触发引擎。这里需要对 SQL 进行一定的处理：

   ```sql
     SELECT
       timestamp,
       payload.location as location,
       payload.temp as temp,
       payload.hum as hum
     FROM "temp_hum/emqx"
   ```

   ::: tip

   如果您初次使用 SQL，可以点击 **SQL 示例**和**启用调试**来学习和测试规则 SQL 的结果。

   :::

3. 点击**下一步**开始创建动作。

4. 从**使用连接器**下拉框中选择您之前创建的连接器。

5. 设定**时间精度**，默认为毫秒。

6. 使用 InfluxDB API Line Protocol 写入 InfluxDB 的数据，支持占位符，参考 [InfluxDB 2.3 Line Protocol](https://docs.influxdata.com/influxdb/v2/reference/syntax/line-protocol/) 及 [InfluxDB 1.8 Line Protocol](https://docs.influxdata.com/influxdb/v1/write_protocols/line_protocol_tutorial/)。

   ```bash
     temp_hum,location=${location} temp=${temp},hum=${hum} ${timestamp}
   ```

   ::: tip

   如希望输入带符号的整型值，请在占位符后添加 `i` 作为类型标识，例如 `${payload.int}i`。参见 [InfluxDB 1.8 写入整型值](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_reference/#write-the-field-value-1-as-an-integer-to-influxdb)。

   对于 InfluxDB 2.x 中支持的无符号整型值，请在占位符后添加 `u` 作为类型标识，例如 `${payload.uint}u`。参见 [InfluxDB 2.6 无符号整型](https://docs.influxdata.com/influxdb/v2.6/reference/syntax/line-protocol/#uinteger)。
   :::

7. 根据需要配置高级设置选项（可选），详情请参考[高级设置](https://docs.emqx.com/zh/enterprise/latest/data-integration/data-bridge-influxdb.html#%E9%AB%98%E7%BA%A7%E8%AE%BE%E7%BD%AE)。

8. 点击**确认**按钮完成动作的配置。

9. 在弹出的**成功创建规则**提示框中点击**返回规则列表**，从而完成了整个数据集成的配置链路。

## 测试规则

推荐使用 [MQTTX](https://mqttx.app/) 模拟温湿度数据上报，同时您也可以使用其他任意客户端完成。

1. 使用 MQTTX 连接到部署，并向以下 Topic 发送消息。

   - topic: `temp_hum/emqx`

   - payload:

     ```json
     {
       "temp": 27.5,
       "hum": 41.8,
       "location": "Prague"
     }
     ```

2. 前往 InfluxDB UI Data Explorer 查看数据是否已经写入 InfluxDB 中。

   如果使用 InfluxDB V1，进入 InfluxDB 容器，查看 InfluxDB 中的数据：

   ```bash
     $ docker exec -it influxdb influx
     $ use db
   ```

   ```bash
     > select * from "temp_hum"
     name: temp_hum
     time                hum  location temp
     ----                ---  -------- ----
     1711093437420000000 41.8 Prague   27.5
     >
   ```

4. 在控制台查看运行数据。在规则列表点击规则 ID，在运行统计页面可以查看到规则的统计以及此规则下所有动作的统计。
