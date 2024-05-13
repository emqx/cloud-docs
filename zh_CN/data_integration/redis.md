# 将 MQTT 数据写入到 Redis

[Redis](https://redis.io/) 数据集成可以通过执行自定义 Redis 数据操作命令的方式，将 MQTT 消息和客户端事件存储到 Redis 中，借助 Redis 高性能与灵活数据结构，实现诸如消息暂存，发布订阅和消息丢弃行为的计数与统计等业务。

本页详细介绍了 EMQX Platform 与 Redis 的数据集成并提供了实用的规则和创建指导。

## 工作原理

Redis 数据集成是 EMQX Platform 中的一个开箱即用的功能，结合了 EMQX Platform 的设备接入、消息传输能力与 Redis 丰富的数据结构以及强大的键值读写性能。通过内置的[规则引擎](./rules.md)组件，该集成简化了将数据从 EMQX Platform 写入到 Redis 进行数据缓存和操作的过程，无需复杂编码。

下图展示了 EMQX Platform 与 Redis 之间数据集成的典型架构:

![EMQX Platform-Redis 集成](./_assets/data_integration_redis.png)

将 MQTT 数据写入 Redis 的过程如下：

1. **消息发布和接收**：工业物联网设备通过 MQTT 协议成功连接到 EMQX Platform 部署，并根据其运行状态、读数或触发的事件，将实时 MQTT 数据从机器、传感器和生产线发布到 EMQX Platform。EMQX Platform 收到这些消息后，将启动其规则引擎中的匹配过程。
2. **消息数据处理**：当消息到达时，它会经过规则引擎，然后由 EMQX Platform 中定义的规则处理。这些规则基于预定义的标准，确定哪些消息需要路由到 Redis。如果任何规则指定了有效载荷转换，那么将应用这些转换，例如转换数据格式、过滤特定信息或用额外的上下文丰富有效载荷。
3. **数据写入到 Redis**：一旦规则引擎处理了数据，它就会触发动作来执行预设的 Redis 命令，用于缓存、计数和对数据执行其他操作。
4. **数据存储和利用**：通过读取存储在 Redis 中的数据，企业可以利用其丰富的数据操作能力实现各种用例。例如物流领域，可以获取设备最新状态，也可以基于数据实现 GPS 地理位置分析，进行实时数据分析和排序等操作。以实现实时跟踪、路线推荐等功能。

## 特性与优势

在 EMQX Platform 中使用 Redis 数据集成能够为您的业务带来以下特性与优势：

- **高性能和可扩展性**：在 EMQX 的分布式架构和 Redis 的集群模式支持下，应用可随着数据量的增加实现无缝扩展。即使对于大型数据集，也可以确保一致的性能和响应能力。
- **实时数据流**：EMQX 专为处理实时数据流而构建，确保从设备到 Redis 的高效可靠的数据传输。Redis 能够快速执行数据操作，能够满足实时数据暂存，使其成为 EMQX Platform 的理想数据存储组件。
- **实时数据分析**：Redis 可以用于实时数据分析，能够实时计算设备连接、消息发布以及具体的业务指标，而 EMQX Platform 可以用于实时消息传输和处理，可以为数据分析提供实时数据输入。
- **地理位置分析**：Redis 提供了地理位置相关的数据结构和命令，可以用于存储和查询地理位置信息。结合 EMQX Platform 强大的设备接入能力，能够广泛应用在如物流、车联网、智慧城市等各类物联网应用中。

## 准备工作
本节介绍了在 EMQX Platform 中创建 Redis 数据集成之前需要做的准备工作，包括安装 Redis。

### 前置准备

- 了解[数据集成](./introduction.md)。
- 了解[规则](./rules.md)。

### 网络设置

<!--@include: ./network-setting.md-->

### 安装 Redis

EMQX 支持与私有部署的 Redis 或与云上的 Redis 集成。您可以使用 Redis Cloud 或者 Docker 部署一个 Redis 实例。

#### 通过 Docker 安装 Redis

通过 Docker 安装并启动 Redis：

```bash
# 启动一个 Redis 容器
docker run --name redis -p 6379:6379 -d redis

# 进入容器
docker exec -it redis bash

# 在容器中连接到 Redis 服务器
redis-cli

# 验证安装结果
127.0.0.1:6379> set emqx_cloud "Hello World"
OK
127.0.0.1:6379> get emqx_cloud
"Hello World"
```

至此，您已经完成 Redis 的安装并使用 `SET` `GET` 命令验证了安装结果，更多 Redis 命令请参考 [Redis Commands](https://redis.io/commands/)。

#### 使用 Redis Cloud 创建 Redis 服务

1. 登录 [Redis Cloud](https://redis.com/cloud/overview/) 控制台，并创建一个订阅，在这个示例中可以选择 Fixed 版本。
2. 创建一个数据库。
3. 在数据库的配置页面可以查看到连接所需的地址、用户名以及密码。
4. 您可以点击连接按钮，选择 Redis CLI 选项并复制命令，在命令行执行命令，连接服务进行验证。

更多详细信息可以参考：[Redis Cloud 官方文档](https://docs.redis.com/)。
## 创建连接器

在创建数据集成的规则之前，您需要先创建一个 Redis 连接器用于访问 Redis 服务器。

1. 在部署菜单中选择 **数据集成**，在数据持久化服务分类下选择 Redis 服务。如果您已经创建了其他的连接器，点击**新建连接器**，然后在数据持久化服务分类下选择 Redis 服务。

2. **连接器名称**：系统将自动生成一个连接器的名称。

3. 根据业务需求设置 **部署模式**，例如，选择 `single`。

4. 输入连接信息：

   - **服务器地址**：填写服务器的 IP 地址以及端口。
   - **数据库名字**：保持默认值 `0`。
   - **用户名和密码**：使用 Redis Cloud 创建的 Redis 服务需要在数据库的 Configuration 页面复制用户名和密码并输入。
   - 根据您的业务需求配置其他选项。
   - 如果您想建立加密连接，请点击 **启用 TLS** 切换开关。

5. 点击**测试连接**按钮，如果 Redis 服务能够正常访问，则会返回成功提示。

6. 点击**新建**按钮完成连接器的创建。

## 创建规则

接下来您需要创建一条规则来指定需要写入的数据，并在规则中添加响应动作以将经规则处理的数据转发到 Redis。

1. 点击连接器列表**操作**列下的新建规则图标或在**规则列表**中点击**新建规则**进入**新建规则**步骤页。

2. 在 SQL 编辑器中输入规则，客户端将温湿度消息发送到 `temp_hum/emqx` 主题时，就会触发引擎。这里需要对 SQL 进行一定的处理：

   ```sql
    SELECT
      timestamp div 1000 as up_timestamp,
      clientid as client_id,
      payload as temp_hum
    FROM
      "temp_hum/emqx"
   ```

   ::: tip

   如果您初次使用 SQL，可以点击 **SQL 示例**和**启用调试**来学习和测试规则 SQL 的结果。

   :::

3. 点击**下一步**开始创建动作。

4. 从**使用连接器**下拉框中选择您之前创建的连接器。

5. 配置 **Redis 命令模板**：使用 Redis [HSET](https://redis.io/commands/hset/) 命令，我们从 `temp_hum/emqx` 主题读取消息上报时间 `up_timestamp`、客户端 ID、温湿度消息储存到 Redis 中，命令如下:

   ```bash
    HMSET ${client_id} ${up_timestamp} ${temp_hum}
   ```

6. 点击**确认**按钮完成动作的配置。

7. 在弹出的**成功创建规则**提示框中点击**返回规则列表**，从而完成了整个数据集成的配置链路。

## 测试规则

推荐使用 [MQTTX](https://mqttx.app/) 模拟温湿度数据上报，同时您也可以使用其他任意客户端完成。

1. 使用 MQTTX 连接到部署，并向以下 Topic 发送消息。

   - topic: `temp_hum/emqx`

   - client id: `test_client`

   - payload:

     ```json
     {
       "temp": "27.5",
       "hum": "41.8"
     }
     ```

2. 查看数据转存结果。

   - 通过 Docker 安装的 Redis 需要先先进入容器，然后执行 `redis-cli` 连接到 Redis 服务。
   - 通过 Redis Cloud 创建的服务，选择 Redis CLI 连接选项，复制命令，在命令行执行命令连接到 Redis 服务。

   ```bash
   127.0.0.1:6379> HGETALL test_client
   1) "1710921138"
   2) "{\n  \"temp\": 27.5,\n  \"hum\": 41.8\n}"
   ```

3. 在控制台查看运行数据。在规则列表点击规则 ID，在运行统计页面可以查看到规则的统计以及此规则下所有动作的统计。
