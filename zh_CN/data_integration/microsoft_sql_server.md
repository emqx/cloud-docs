# 将 MQTT 数据写入到 Microsoft SQL Server

[SQL Server](https://www.microsoft.com/en-us/sql-server/) 是领先的关系型商业数据库解决方案之一，被广泛应用于各种规模和类型的企业和组织中。EMQX Platform 支持与 SQL Server 集成，使您能够将 MQTT 消息和客户端事件保存到 SQL Server 以便于构建复杂的数据管道和分析流程实现数据管理和分析，或进行设备连接管理并与其他 ERP, CRM，BI 企业系统的集成。

本页提供了 EMQX Platform 与 Microsoft SQL Server 的数据集成的全面介绍，并提供了创建和验证数据集成的实用指导。

## 工作原理

Microsoft SQL Server 数据集成是 EMQX Platform 的开箱即用功能，结合了 EMQX Platform 的设备接入、消息传输能力与 Microsoft SQL Server 强大的数据存储能力。通过内置的[规则引擎](./rules.md)组件，您可以将 MQTT 消息和客户端事件存储到 Microsoft SQL Server 中，也可以通过事件触发对 Microsoft SQL Server 中数据的更新或删除操作，从而实现对诸如设备在线状态、上下线历史等的记录。该集成简化了从 EMQX Platform 到 Microsoft SQL Server 的数据摄取过程，无需复杂的编码。

下图展示了 EMQX 和 SQL Server 之间的数据集成的典型架构:

![EMQX Platform SQL Server 数据集成](./_assets/data_integration_sql_server.png)

将 MQTT 数据摄取到 Microsoft SQL Server 的工作流程如下：

1. **消息发布和接收**：工业物联网设备通过 MQTT 协议成功连接到 EMQX Platform，并根据其运行状态、读数或触发的事件，从机器、传感器和生产线发布实时 MQTT 数据到 EMQX Platform。当 EMQX Platform 接收到这些消息时，它将在其规则引擎中启动匹配过程。
2. **消息数据处理**：当消息到达时，它会通过规则引擎进行处理，然后由 EMQX Platform 中定义的规则处理。规则根据预定义的标准确定哪些消息需要路由到 Microsoft SQL Server。如果任何规则指定了载荷转换，那么这些转换将被应用，例如转换数据格式、过滤出特定信息，或用额外的上下文丰富载荷。
3. **数据写入到 Microsoft SQL Server**：规则触发将消息写入 Microsoft SQL Server 的操作。借助 SQL 模板，用户可以从规则处理结果中提取数据来构造 SQL 并发送到 Microsoft SQL Server 执行，从而将消息的特定字段写入或更新到数据库的相应表和列中。
4. **数据存储和利用**：数据现存储在 Microsoft SQL Server 中，企业可以利用其查询能力应用于各种用例。

## 特性与优势

与 Microsoft SQL Server 的数据集成提供了一系列特性和优势，确保了数据传输、存储和利用的高效性：

- **实时数据流**：EMQX Platform 专为处理实时数据流而构建，确保了从源系统到 Microsoft SQL Server 的数据传输的高效性和可靠性。它使组织能够实时捕获和分析数据，非常适合需要立即洞察和行动的用例。
- **高性能和可扩展性**：EMQX Platform 和 Microsoft SQL Server 都具有扩展性和可靠性的特点，适用于处理大规模的物联网数据，并在需求增长时进行不停机的水平和垂直扩展，确保物联网应用程序的连续性和可靠性。
- **数据转换的灵活性**：EMQX Platform 提供了强大的基于 SQL 的规则引擎，允许组织在将数据存储到 Microsoft SQL Server 之前进行预处理。它支持各种数据转换机制，如过滤、路由、聚合和丰富，使组织能够根据他们的需求塑造数据。
- **高级分析**：Microsoft SQL Server 提供了强大的分析能力，例如通过 Analysis Services 构建多维数据模型，以支持复杂的数据分析和数据挖掘，通过 Reporting Services 创建和发布报告，向利益相关者展示物联网数据的洞察和分析结果。

## 准备工作

本节介绍了在 EMQX Platform 中创建 Microsoft SQL Server 数据集成之前需要做的准备工作。

### 前置准备

- 了解[数据集成](./introduction.md)。
- 了解[规则](./rules.md)。

### 网络设置

<!--@include: ./network-setting.md-->

### 安装并连接到 Microsoft SQL Server

本节描述如何使用 Docker 镜像在 Linux/MacOS 安装启动 Microsoft SQL Server 2019 以及如何使用 `sqlcmd` 连接到 Microsoft SQL Server。关于其他 Microsoft SQL Server 的安装方式，请参阅微软提供的 [Microsoft SQL Server 安装指南](https://learn.microsoft.com/zh-cn/sql/database-engine/install-windows/install-sql-server?view=sql-server-ver16)。

1. 通过 Docker 安装并启动 Microsoft SQL Server。

   Microsoft SQL Server 要求使用复杂密码，请参阅[使用复杂密码](https://learn.microsoft.com/zh-cn/sql/relational-databases/security/password-policy?view=sql-server-ver16#password-complexity)。
   使用环境变量 `ACCEPT_EULA=Y` 启动 Docker 容器代表您同意 Microsoft 的 EULA 条款，详情请参阅 [MICROSOFT 软件许可条款 MICROSOFT SQL SERVER 2019 STANDARD(ZH_CN)](https://www.microsoft.com/en-us/Useterms/Retail/SQLServerStandard/2019/Useterms_Retail_SQLServerStandard_2019_ChineseSimplified.htm)。

   ```bash
   # 启动一个 Microsoft SQL Server 容器并设置密码为 `mqtt_public1`
   $ docker run --name sqlserver -p 1433:1433 -e ACCEPT_EULA=Y -e MSSQL_SA_PASSWORD=mqtt_public1 -d mcr.microsoft.com/mssql/server:2019-CU19-ubuntu-20.04
   ```

2. 进入 Docker 容器。

   ```bash
   $ docker exec -it sqlserver bash
   ```

3. 在容器中连接到 Microsoft SQL Server 服务器，需要输入预设的密码。输入密码时字符不会回显。请输入密码后直接键入 `Enter`。

   ```bash
   $ /opt/mssql-tools/bin/sqlcmd -S 127.0.0.1 -U sa
   $ Password:
   1>
   ```

   ::: tip

   Microsoft 提供的 Microsoft SQL Server 容器内已安装 `mssql-tools`，但可执行文件并不在 `$PATH` 中，因此您需要指定可执行文件路径。在上述连接示例中，可执行文件路径为 `opt`。

   关于更多 `mssql-tools` 的使用，请阅读 [sqlcmd 实用工具](https://learn.microsoft.com/zh-cn/sql/tools/sqlcmd/sqlcmd-utility?view=sql-server-ver16)。

   :::

至此 Microsoft SQL Server 2019 实例已经完成部署并可以连接。

### 创建数据库和数据表

本节描述如何在 Microsoft SQL Server 中创建数据库与数据表。

1. 使用已创建的连接在 Microsoft SQL Server 中创建数据库 `emqx`。

   ```bash
    ...
    Password:
    1> USE master
    2> GO
    Changed database context to 'master'.
    1> CREATE DATABASE emqx;
    2> GO
   ```

2. 使用 SQL 语句在此数据库中创建温湿度表。

   使用以下 SQL 语句将创建 temp_hum 表，该表将用于存放设备上报的温度和湿度数据。

   ```sql
    CREATE TABLE temp_hum(
      client_id VARCHAR(64) NULL,
      temp NVARCHAR(100) NULL,
      hum NVARCHAR(100) NULL,
      up_timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    GO;
   ```

### 配置 ODBC 驱动

通过 EMQX Platform [工单](../feature/tickets.md)服务提供您的 SQL Server 版本，后台将为您的部署安装 ODBC 驱动。

## 创建 Microsoft SQL Server 连接器

在创建数据集成的规则之前，您需要先创建一个 Microsoft SQL Server 连接器用于访问 Microsoft SQL Server 服务器。

1. 在部署菜单中选择 **数据集成**，在数据持久化服务分类下选择 Microsoft SQL Server 服务。如果您已经创建了其他的连接器，点击**新建连接器**，然后在数据持久化服务分类下选择 Microsoft SQL Server 服务。

2. **连接器名称**：系统将自动生成一个连接器的名称。

3. 输入连接信息：

   - **服务器地址**：填写服务器的 IP 地址以及端口。
   - **数据库名字**： `emqx`
   - **用户名**： `sa`
   - **密码**： `mqtt_public1`
   - **SQL Server Driver 名称**： `ODBC Driver 17 for SQL Server`，在[配置 ODBC 驱动](#配置-odbc-驱动)的步骤中，后台安装 ODBC 驱动时指定的名称。

4. 点击**测试连接**按钮，如果 Microsoft SQL Server 服务能够正常访问，则会返回成功提示。

5. 点击**新建**按钮完成连接器的创建。

## 创建规则

接下来您需要创建一条规则来指定需要写入的数据，并在规则中添加响应动作以将经规则处理的数据转发到 Microsoft SQL Server。

1. 点击连接器列表**操作**列下的新建规则图标或在**规则列表**中点击**新建规则**进入**新建规则**步骤页。

2. 在 SQL 编辑器中输入规则，客户端将温湿度消息发送到 `temp_hum/emqx` 主题时，就会触发引擎。这里需要对 SQL 进行一定的处理：

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

   如果您初次使用 SQL，可以点击 **SQL 示例**和**启用调试**来学习和测试规则 SQL 的结果。

   :::

3. 点击**下一步**开始创建动作。

4. 从**使用连接器**下拉框中选择您之前创建的连接器。

5. 配置 SQL 模板，使用如下 SQL 完成数据插入，此处为预处理 SQL，字段不应当包含引号，SQL 末尾不要带分号 `;`：

   ```sql
    INSERT INTO temp_hum(client_id, temp, hum)
    VALUES (
      ${client_id},
      ${temp},
      ${hum}
    )
   ```

   如果在模板中使用未定义的占位符变量，您可以切换**未定义变量作为 NULL** 开关（位于 **SQL 模板** 上方）来定义规则引擎的行为：

   - **关闭**（默认）：规则引擎可以将字符串 `undefined` 插入数据库。

   - **启用**：允许规则引擎在变量未定义时将 `NULL` 插入数据库。

   ::: tip

   如果可能，应始终启用此选项；关闭该选项仅用于确保向后兼容性。

   :::

6. 根据需要配置高级设置选项（可选）。

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

2. 查看消息是否转发到了 Microsoft SQL Server。

   ```bash
    1> SELECT * FROM temp_hum ORDER BY up_timestamp;
    2> GO
    client_id                                                        temp         hum          up_timestamp
    ---------------------------------------------------------------- ------------ ------------ -----------------------
    test_client                                                             27.50        41.80 2024-03-25 05:49:21.237
   ```

3. 在控制台查看运行数据。在规则列表点击规则 ID，在运行统计页面可以查看到规则的统计以及此规则下所有动作的统计。
