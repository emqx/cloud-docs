# 将 MQTT 数据传输到 RocketMQ

通过 [RocketMQ](https://rocketmq.apache.org/) 数据集成可以将 MQTT 消息和客户端事件转发到 RocketMQ 中。例如，可以通过事件触发转发消息到 RocketMQ 中，从而实现对诸如设备在线状态、上下线历史等的记录。

本页详细介绍了 EMQX Platform 与 RocketMQ 的数据集成并提供了实用的规则和动作创建指导。

## 工作原理

RocketMQ 数据集成是 EMQX Platform 中的一个开箱即用功能，它结合了 EMQX Platform 的设备接入以及实时数据捕获和传输能力与 RocketMQ 强大的消息队列处理能力。通过内置的[规则引擎](./rules.md)组件，该集成简化了将数据从 EMQX Platform 引入到 RocketMQ 进行存储和管理的过程，无需复杂编码。

下图展示了 EMQX Platform 与 RocketMQ 之间数据集成的典型架构:

![EMQX Platform-RocketMQ 集成](./_assets/data_integration_rocketmq.jpg)

将 MQTT 数据引入 RocketMQ 的过程如下：

1. **消息发布和接收**：工业物联网设备通过 MQTT 协议成功连接到 EMQX Platform，并向 EMQX Platform 发布实时 MQTT 数据。EMQX Platform 收到这些消息后，将启动其规则引擎中的匹配过程。
2. **消息数据处理**：当消息到达时，它会经过规则引擎，然后由 EMQX Platform 中定义的规则处理。这些规则基于预定义的标准，确定哪些消息需要路由到 RocketMQ。如果任何规则指定了有效载荷转换，那么将应用这些转换，例如转换数据格式、过滤特定信息或用额外的上下文丰富有效载荷。
3. **数据传入到 RocketMQ**：一旦规则处理了消息，它就会触发一个动作，将消息转发到 RocketMQ。处理后的数据将无缝写入 RocketMQ。
4. **数据存储和利用**：现在数据存储在 RocketMQ 中，企业可以利用其查询能力应用于各种用例。例如，在金融行业，RocketMQ 可以用作可靠的高性能消息队列来存储和管理来自支付终端、交易系统的数据，并将消息连接到数据分析和监管平台，实现风险管理、欺诈检测和预防、监管合规等要求。

## 特性与优势

RocketMQ 数据集成为您的业务带来了以下功能和优势：

- **可靠的物联网数据消息传递**：EMQX Platform 能够可靠地批处理并发送 MQTT 消息到 RocketMQ，实现物联网设备与 RocketMQ 及应用系统的集成。
- **MQTT 消息转换**：使用规则引擎，EMQX Platform 可以过滤和转换 MQTT 消息。消息在发送到 RocketMQ 之前，可以进行数据提取、过滤、丰富和转换。
- **云原生弹性扩展**：EMQX Platform 与 RocketMQ 都是基于云原生构建的应用，提供了友好的 K8s 支持以及云原生生态集成，能够无限弹性扩缩以适应业务的快速发展。
- **灵活的主题映射**：RocketMQ 数据集成支持将 MQTT 主题灵活映射到 RocketMQ 主题，允许轻松配置 RocketMQ 消息中的键（Key）和值（Value）。
- **高吞吐量场景下的处理能力**：RocketMQ 数据集成支持同步和异步写入模式，允许根据不同场景灵活平衡延迟和吞吐量。

## 准备工作

本节介绍了在 EMQX Platform 中创建 RocketMQ 数据集成之前需要做的准备工作，包括如何设置 RocketMQ 服务器。

### 前置准备

- 了解[数据集成](./introduction.md)。
- 了解[规则](./rules.md)。

### 安装 RocketMQ

1. 准备一份 docker-compose 文件 `rocketmq.yaml` 来部署 RocketMQ。

```yaml
version: '3.3'

services:
  mqnamesrv:
    image: apache/rocketmq:4.9.4
    container_name: rocketmq_namesrv
    ports:
      - 9876:9876
    volumes:
      - ./rocketmq/logs:/opt/logs
      - ./rocketmq/store:/opt/store
    command: ./mqnamesrv

  mqbroker:
    image: apache/rocketmq:4.9.4
    container_name: rocketmq_broker
    ports:
      - 10909:10909
      - 10911:10911
    volumes:
      - ./rocketmq/logs:/opt/logs
      - ./rocketmq/store:/opt/store
      - ./rocketmq/conf/broker.conf:/etc/rocketmq/broker.conf
    environment:
      NAMESRV_ADDR: 'rocketmq_namesrv:9876'
      JAVA_OPTS: ' -Duser.home=/opt'
      JAVA_OPT_EXT: '-server -Xms1024m -Xmx1024m -Xmn1024m'
    command: ./mqbroker -c /etc/rocketmq/broker.conf
    depends_on:
      - mqnamesrv
```

2. 准备运行 RocketMQ 所需的文件夹和配置文件。

```bash
mkdir rocketmq
mkdir rocketmq/logs
mkdir rocketmq/store
mkdir rocketmq/conf
```

3. 将下面的内容存入到 `rocketmq/conf/broker.conf` 文件中。

```bash
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=0

brokerIP1=这里需要填写你的真实 IP 地址

defaultTopicQueueNums=4
autoCreateTopicEnable=true
autoCreateSubscriptionGroup=true

listenPort=10911
deleteWhen=04

fileReservedTime=120
mapedFileSizeCommitLog=1073741824
mapedFileSizeConsumeQueue=300000
diskMaxUsedSpaceRatio=100
maxMessageSize=65536

brokerRole=ASYNC_MASTER

flushDiskType=ASYNC_FLUSH

```

4. 启动 RocketMQ。

```bash
docker-compose -f rocketmq.yaml up
```

5. 启动一个 RocketMQ 的消费者。

```bash
docker run --rm -e NAMESRV_ADDR=host.docker.internal:9876 apache/rocketmq:4.9.4 ./tools.sh org.apache.rocketmq.example.quickstart.Consumer
```

::: tip 注意

如果是在 Linux 中，需要将 `host.docker.internal` 替换成您的真实 IP 地址。

:::

## 创建连接器

在创建数据集成的规则之前，您需要先创建一个 RocketMQ 连接器用于访问 RocketMQ 服务。

1. 在部署菜单中选择 **数据集成**，在数据转发分类下选择 RocketMQ。如果您已经创建了其他的连接器，点击**新建连接器**，然后在数据转发服务分类下选择 RocketMQ。

2. **连接器名称**：系统将自动生成一个连接器的名称。

3. 填写连接相关配置：

   - **服务器列表**：输入 你想要连接的 RocketMQ 服务器地址（例如，localhost），如果 RocketMQ 服务器在远程运行，则填写实际服务器地址。主机名具有以下形式：Host[:Port]。如果未指定 [:Port]，则使用 RocketMQ 默认端口 9876。
   - **AccessKey**: RocketMQ 服务器的 accessKey。
   - **SecretKey**: RocketMQ 服务器的 secretKey。
   - **安全令牌**: RocketMQ 服务器安全令牌
   - 根据业务需求配置高级设置（可选）。

4. 点击**测试连接**按钮，如果 RocketMQ 能够正常访问，则会返回**连接器可用**提示。

5. 点击**新建**按钮完成连接器的创建。

接下来，您可以基于此连接器创建数据桥接规则。

## 创建规则

本节演示了如何创建 RocketMQ 数据集成的规则来指定需要转发至 RocketMQ 的数据并为规则添加触发的动作。

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

5. 完成消息从 EMQX Platform 到发布到 RocketMQ 的配置：

   - **RocketMQ 主题**: 输入 `emqx`
   - **消息模板**: 模板, 默认为空，为空时将会将整个消息转发给 RocketMQ。
     模板可以是任意带有占位符的合法字符串,列如本次使用以下内容作为消息模板

   ```
   {"up_timestamp": ${up_timestamp}, "client_id": ${client_id}, "temp": ${temp}, "hum": ${hum}}
   ```

6. 展开**高级设置**，根据情况配置同步/异步模式，队列与批量等参数高级设置选项（可选）

7. 点击**确认**按钮完成动作的配置。
8. 在弹出的**成功创建规则**提示框中点击**返回规则列表**，从而完成了整个数据集成的配置链路。

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

2. 在 RocketMQ 的消费者窗口，我们将看到下面的输出:
   ```bash
   ConsumeMessageThread_please_rename_unique_group_name_4_1 Receive New Messages: [MessageExt [brokerName=broker-a, queueId=0, storeSize=208, queueOffset=0, sysFlag=0, bornTimestamp=1711354009076, bornHost=/121.43.165.169:48850, storeTimestamp=1711354009085, storeHost=/118.178.124.161:10911, msgId=76B27CA100002A9F000000000000058D, commitLogOffset=1421, bodyCRC=1137462344, reconsumeTimes=0, preparedTransactionOffset=0, toString()=Message{topic='TopicTest', flag=0, properties={MIN_OFFSET=0, MAX_OFFSET=1, CONSUME_START_TIME=1711354066863, CLUSTER=DefaultCluster}, body=[123, 34, 117, 112, 95, 116, 105, 109, 101, 115, 116, 97, 109, 112, 34, 58, 49, 55, 49, 49, 51, 53, 52, 48, 48, 57, 48, 53, 54, 44, 34, 116, 101, 109, 112, 34, 58, 34, 50, 55, 46, 53, 34, 44, 34, 104, 117, 109, 34, 58, 34, 52, 49, 46, 56, 34, 44, 34, 99, 108, 105, 101, 110, 116, 95, 105, 100, 34, 58, 34, 109, 113, 116, 116, 120, 95, 97, 50, 97, 99, 102, 100, 49, 57, 34, 125], transactionId='null'}]]
   ```
