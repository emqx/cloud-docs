# 在 EMQX Premium 中使用 EMQX Streaming

本页面提供了如何在 Premium 部署中使用 EMQX Streaming 功能的分步指南。

## 前提条件

在开始之前，请确保您已完成以下步骤：

- 已创建 Premium 部署。有关详细说明，请参考 [创建 Premium 部署](../create/premium.md)。
- 已为您的部署启用 VPC 对等连接。有关说明，请参考 [VPC 对等连接](../deployments/vpc_peering.md)。
- 已设置用于发布消息的 MQTT 客户端。
- 已准备好用于消费消息的 Kafka 客户端。

## 启用 EMQX Streaming

EMQX Streaming 功能只能通过提交工单来激活。

1. 进入您的部署，导航到 **Streaming (beta)**。
2. 点击页面上的 **Enable Streaming (beta)** 按钮提交工单。

一旦 EMQX Streaming 被激活，Kafka 端点信息将显示在部署概览页面的 **Streaming 连接信息** 部分。

![streaming_connection_information](./_assets/streaming_connection_information.png)

## 在 EMQX 平台控制台中创建流

用户可以创建两种类型的流：默认流和自由流。默认流与 MQTT 主题过滤器关联，默认创建 16 个分区，用于存储所有匹配的 MQTT 消息。自由流独立于 MQTT 主题运作，具有可自定义的分区数量，为非 MQTT 用例提供了更大的灵活性。

两种类型的流的保留时间都固定为 1 天，且无法修改。

1. 导航到 **Streaming (beta)** -> **Streams**。

2. 在 Streams 页面点击 **New**。在 **New Streams** 弹窗中，完成以下设置：

   - **流名称**：为流提供一个名称，例如 `demo1`。Kafka 客户端的 Kafka 主题必须与流名称匹配。

   - 流类型

     ：选择流类型。

     - **默认流**：默认流与 MQTT 主题过滤器关联，匹配该过滤器的 MQTT 消息将保存到该流中。
     - **自由流**：自由流不与 MQTT 主题过滤器关联，通常用于其他数据处理用途。

   - **MQTT 主题过滤器**：如果选择了 `Default` 类型流，输入一个 MQTT 消息的主题过滤器。匹配该过滤器的 MQTT 消息将保存到相应的默认流中。本示例中，输入 `t1/+`。

   - **分区数量**：如果选择了 `Free` 类型流，请指定分区数量，以便流在扩展性和并行处理方面进行划分。

3. 点击 **Confirm**。

流创建后，它将出现在 **Streams** 列表中。点击流名称，可以查看分区偏移量及其他流的详细信息。

![stream_details](./_assets/stream_details.png)

## 使用 MQTT 客户端发布消息

您可以使用 [MQTTX](https://mqttx.app/) 模拟一个 MQTT 客户端，并将消息发布到 `t1/a` 和 `t1/b` 主题。

![publish_messages](./_assets/publish_messages.png)

## 使用 Kafka CLI 消费消息

请按照以下步骤下载官方 Kafka CLI 工具：

1. 从 [Kafka 下载页面](https://kafka.apache.org/downloads) 下载并安装官方 Kafka CLI 工具。
2. 配置 Kafka CLI 工具以连接 EMQX 平台概览中提供的 Kafka 端点。

### 检索主题信息

使用 Kafka CLI，可以通过 `describe` 命令检索主题信息。确保 `bootstrap-server` 选项设置为 **部署概览** 页面上显示的 Kafka 端点。

示例命令：

```
bash


复制代码
kafka-topics.sh --describe --bootstrap-server <kafka-endpoint>
```

![retrieve_topic](./_assets/retrieve_topic.png)

### 从主题中消费消息

要使用 Kafka CLI 消费消息，请执行以下命令：

```
bash


复制代码
kafka-console-consumer.sh --bootstrap-server <kafka-endpoint> --topic <stream-name> --from-beginning
```

此命令将从指定流的开头开始消费消息。您应看到先前发布的消息被成功消费。

![consume_messages](./_assets/consume_messages.png)

## 在 EMQX 平台控制台中查看已消费的消息

要验证已消费的消息，导航到 EMQX 平台控制台的 **Streaming (beta)** -> **Consumer Groups**。

![consumer_groups](./_assets/consumer_groups.png)

点击 **组 ID** 以查看有关消费者组的详细信息，例如消费者列表及其消费进度。

![consumer_group_detail](./_assets/consumer_group_detail.png)

## 删除流

要删除一个流：

1. 进入 **Streaming (beta)** -> **Streams** 部分。
2. 点击要删除的流旁边的 **删除** 图标。
3. 点击 **Confirm** 确认删除。