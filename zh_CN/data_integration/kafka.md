# 将 MQTT 数据传输到 Apache Kafka

[Apache Kafka](https://kafka.apache.org/) 是一个广泛使用的开源分布式事件流处理平台，能够处理应用程序和系统之间数据流的实时传输。然而，Kafka 并不是为边缘物联网通信构建的，Kafka 客户端需要稳定的网络连接和更多的硬件资源。在物联网领域，设备和应用程序生成的数据使用轻量级 MQTT 协议传输。EMQX Cloud 与 Kafka/Confluent 的集成使用户能够无缝地将 MQTT 数据流入或流出 Kafka。MQTT 数据流被引入 Kafka 主题，确保实时处理、存储和分析。EMQX Cloud 目前仅支持将数据转发到 Kafka。

本页详细介绍了 Kafka 数据集成的功能特性，同时提供了实用的 Kafka 数据集成创建指导，演示如何将模拟温湿度数据通过 MQTT 协议上报到 EMQX Cloud 并通过配置的数据集成将数据转存到 Kafka，内容包括创建 Kafka 连接器、创建规则和测试规则。


## 工作原理
Apache Kafka 数据集成是 EMQX Cloud 的开箱即用功能，能够在基于 MQTT 的物联网数据和 Kafka 强大的数据处理能力之间架起桥梁。通过内置的规则引擎组件，集成简化了两个平台之间的数据流和处理过程，无需复杂编码。

将消息数据转发到 Kafka 的基本工作流程如下：

1. **消息发布**：设备通过 MQTT 协议成功连接到 EMQX Cloud 部署，并通过 MQTT 定期发布包含状态数据的消息。当 EMQX Cloud 收到这些消息时，它启动其规则引擎内的匹配过程。
2. **消息数据处理**：通过内置的规则引擎，这些 MQTT 消息可以根据主题匹配规则进行处理。当消息到达并通过规则引擎时，规则引擎将评估针对该消息事先定义好的处理规则。如果任何规则指定消息载荷转换，则应用这些转换，例如转换数据格式、过滤特定信息或使用额外上下文丰富载荷。
3. **发送到 Kafka**：规则引擎中定义的规则触发将消息转发到 Kafka 的动作。使用 Kafka 数据集成，MQTT 主题被映射到预定义的 Kafka 主题，所有处理过的消息和数据被写入 Kafka 主题。

## 特性与优势

与 Apache Kafka 的数据集成为您的业务带来以下特性和优势：

- 载荷转换：在传输过程中，消息载荷可以通过定义的 SQL 规则进行处理。例如，包含一些实时指标（如总消息计数、成功/失败传递计数和消息速率）的载荷可以在消息被输入到 Kafka 之前进行数据提取、过滤、丰富和转换。
- 有效的主题映射：通过配置的 kafka 数据集成，可以将众多物联网业务主题映射到 Kakfa 主题。EMQX 支持将 MQTT 用户属性映射到 Kafka 标头，并采用各种灵活的主题映射方法，包括一对一、一对多、多对多，以及支持 MQTT 主题过滤器（通配符）。
- 灵活的分区选择策略：支持根据 MQTT 主题或客户端将消息转发到同一 Kafka 分区。
- 高吞吐量情况下的处理能力：EMQX Kafka 生产者支持同步和异步写入模式，允许您根据不同场景在实时优先和性能优先的数据写入策略之间灵活平衡。
- 运行时指标：支持查看每个数据桥的运行时指标，如总消息数、成功/失败计数、当前速率等。

这些特性增强了集成能力和灵活性，有助于您建立有效和稳健的物联网平台架构。您日益增长的物联网数据可以在稳定的网络连接下传输，并且可以进一步有效地存储和管理。

## 连接准备
本节介绍了在 EMQX Cloud 中创建 Kafka 数据集成之前需要做的准备工作。

### 前置准备

- 了解[规则](./rules.md)。
- 了解[数据集成](./introduction.md)。

### 安装 Kafka 并创建主题

1. 安装 Kafka。
    ```bash
    # 安装 zookeeper
    docker run -d --restart=always \
        --name zookeeper \
        -p 2181:2181 \
        zookeeper
    
    # 安装 Kafka，开放 9092 端口
    docker run -d  --restart=always --name mykafka \
        -p 9092:9092 \
        -e HOST_IP=localhost \
        -e KAFKA_ADVERTISED_PORT=9092 \
        -e KAFKA_ADVERTISED_HOST_NAME=<服务器 IP> \
        -e KAFKA_BROKER_ID=1 \
        -e KAFKA_LOG_RETENTION_HOURS=12 \
        -e KAFKA_LOG_FLUSH_INTERVAL_MESSAGES=100000 \
        -e KAFKA_ZOOKEEPER_CONNECT=<服务器 IP>:2181 \
        -e ZK=<服务器 IP> \
        wurstmeister/kafka
    ```

2. 创建主题。

    ```bash
    # 进入 Kafka 实例，并创建 emqx 主题
    $ docker exec -it mykafka /opt/kafka/bin/kafka-topics.sh --zookeeper <broker IP>:2181 --replication-factor 1 --partitions 1 --topic emqx --create
    ```
   返回 `Created topic emqx.` 表示创建成功。

## 创建 Kafka 连接器

在创建数据集成的规则之前，您需要先创建一个 Kafka 连接器用于访问 Kafka 服务器。

1. 在部署菜单中选择 **数据集成(Beta)**，在数据转发服务分类下选择 Kafka 服务。如果您已经创建了其他的连接器，点击**新建连接器**，然后在数据转发服务分类下选择 Kafka 服务。
2. 在**创建连接器**页面中配置以下信息：
   - **连接器名称**：系统将自动生成一个连接器的名称，也可以自己命名连接器的名称。在此示例中可以使用 `my_kafkaserver`。
   - **主机列表**：填写主机列表，请确保您的 kafka 服务可以正常通过网络访问。
   - 其他使用默认值，或根据您的业务需求进行配置。
3. 点击**测试连接**按钮，如果 Kafka 服务能够正常访问，则会返回成功提示。
4. 点击**新建**按钮完成配置。


## 创建规则

接下来您需要创建一条规则来指定需要写入的数据，并在规则中添加响应动作以将经规则处理的数据转发到 Kafka。

1. 点击连接器列表**操作**列下的新建规则图标或在**规则列表**中点击**新建规则**进入**新建规则**步骤页。

2. 在 **SQL 编辑器**中输入规则匹配 SQL 语句。以下的 SQL 示例表示从发送到 `temp_hum/emqx` 主题的消息中读取消息上报时间 `up_timestamp`、客户端 ID、消息体 (Payload)，并从消息体中分别读取温度和湿度。

   ```sql
   SELECT 
   timestamp,
   clientid, 
   payload.temp as temp, 
   payload.hum as hum
   
   FROM
   "temp_hum/emqx"
   ```
   我们可以使用 **启用调试** 来模拟数据的输入并测试查看结果。

3. 点击**下一步**开始创建动作。

4. 从**使用连接器**下拉框中选择您之前创建的连接器。

5. 配置以下信息：

   - 动作名称：系统将自动生成一个动作的名称，也可以自己命名动作的名称。

   - Kafka 主题名称：这里填写之前创建的主题 `emqx`。

   - 根据您业务的需要定义 Kafka header。

   - 消息体的设置中，**消息的键** 默认是使用规则中获取的 client ID，您也可以根据业务需要修改。在**消息的值**中，可以填入需要转发的温度和湿度的数值。

     ```
     # kafka 消息的键
     ${client_id}
     
     # kafka 消息的值
     {"temp": ${temp}, "hum": ${hum}}
     ```

6. 点击**确认**按钮完成动作的配置。

7. 在弹出的**成功创建规则**提示框中点击**返回规则列表**，从而完成了整个数据集成的配置链路。

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

2. 查看消息是否转发到了 Kafka。
    ```bash
    # 进入 Kafka 实例，并查看 emqx 主题
    $ docker exec -it mykafka /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server <broker IP>:9092  --topic emqx --from-beginning
    ```

3. 在控制台查看运行数据。在规则列表点击规则 ID，在运行统计页面可以查看到规则的统计以及此规则下所有动作的统计。
