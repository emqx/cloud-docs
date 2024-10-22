# EMQX Streaming (Beta)

::: tip 注意

EMQX Streaming 功能仅在 EMQX Premium 版本中可用。请注意，此功能目前处于测试阶段，不建议在生产环境中使用。

:::

EMQX Streaming 是 EMQX 平台的一个创新功能，允许用户将 MQTT 消息以数据流的形式持久化存储，并通过 Kafka 客户端直接消费这些数据流。

本页面介绍了 EMQX Streaming 功能的关键概念及其优势。

## 功能概述

本节详细解释了 EMQX Streaming 功能，并说明了它如何通过与 Kafka 生态系统兼容来实现实时和历史数据处理，同时通过消除独立 Kafka 集群的需求简化数据处理。

### 为什么选择 EMQX Streaming？

尽管 MQTT 在实时消息分发和处理大量并发连接方面表现出色，但它缺乏内置的大规模消息存储和按需访问历史数据的功能。传统上，用户通过将 MQTT Broker 与 Kafka 集成来满足这些需求，但这种方式成本高、复杂且操作要求较高。

EMQX Streaming 功能通过在 EMQX 平台内提供统一的解决方案来解决这些问题。

### 什么是 EMQX Streaming？

基于 Premium 版本的分布式存储功能，EMQX Streaming 能够将符合指定主题过滤器的 MQTT 消息作为数据流进行存储。当 MQTT 客户端向匹配的主题发布消息时，消息将被捕获并存储在 EMQX 平台的耐久、分布式存储中。这些存储的数据流可以通过常用的数据流接口（如 Kafka）访问，允许用户通过熟悉的 Kafka 客户端检索和回放存储的消息，而无需管理单独的 Kafka 集群带来的运营开销。

通过 Kafka Streaming，您可以实现以下目标：

- 可靠存储大量 MQTT 消息数据。
- 使用 Kafka 客户端回放历史数据并订阅实时数据流。
- 与现有的后端应用程序和大数据系统无缝集成。
- 直接与 Flink 等流处理器接口进行数据处理。

此外，EMQX 计划将该功能扩展至 MQTT，进行少量修改后，可以通过诸如 `$stream/my_stream` 的 MQTT 主题访问数据流。

### 主要概念

要充分利用 EMQX Streaming，您需要了解以下关键概念：

#### 流

**流** 是 EMQX Streaming 中的基本元素，用于存储和管理 MQTT 或 Kafka 消息。EMQX Streaming 提供两种类型的流：

- **默认（绑定）流**：
  - 在创建时必须绑定一个 MQTT 主题过滤器。
  - 数据来自 MQTT 客户端。
  - Kafka 客户端只能读取数据。
  - 流的分区数量为默认值。
  - 适用于将 MQTT 消息聚合并存储在云端的场景。
- **自由流**：
  - 创建时无需绑定 MQTT 主题过滤器。
  - 数据来自 Kafka 客户端。
  - Kafka 客户端可以读取和写入数据。
  - 创建时可以配置分区数量。
  - 适用于仅需要 Kafka 功能的场景，使 EMQX 可作为一个全功能的 Kafka 服务器。

#### 分区

**分区** 是流的一个逻辑段，每个分区处理一部分流数据。这有助于分配负载并优化吞吐量。用户可以在创建自由流时配置分区数量。

#### MQTT 客户端

**MQTT 客户端** 是连接到 EMQX Broker 的设备或软件组件，用于发送和接收 MQTT 消息，这些消息被存储在流中以便日后访问。

#### Kafka 客户端

**Kafka 客户端** 是任何通过 Kafka 协议与 EMQX Streaming 进行通信的软件组件（生产者或消费者），用于读取或写入流中的数据。

#### Kafka 协议

**Kafka 协议** 是一种用于生成和消费消息的消息协议。EMQX Streaming 实现了这一协议，使 Kafka 客户端能够像与 Kafka Broker 通信一样与系统交互。

#### Kafka 消费者组

**Kafka 消费者组** 是一种机制，允许多个 Kafka 消费者协同消费流中的数据，确保负载在组内均匀分配，并且每条消息只被处理一次。

## EMQX Streaming 的工作原理

EMQX Streaming 的一般工作流程如下：

1. **声明流**：通常通过将流与 MQTT 主题过滤器绑定来声明一个流。所有匹配该过滤器的 MQTT 消息将被保存到流中。
2. **流数据存储**：流数据在 EMQX 的存储系统中持久化，并在多个节点之间复制，以确保容错和高可用性。
3. **请求处理**：Kafka 客户端从 EMQX 流中请求数据。由于 EMQX 支持 Kafka 协议，它能够直接响应这些请求。
4. **组管理**：EMQX Streaming 支持 Kafka 消费者组协议，允许多个 Kafka 消费者协同消费数据，并保持消费进度。
5. **流数据保留**：流中的数据保留一段可配置的时间，过期数据将被自动删除。

## 关键优势

EMQX Streaming 为您带来了以下优势：

- **增强的数据持久性**：MQTT 消息可以作为数据流长期保存。流还在多个节点之间复制，以确保容错和高可用性。
- **Kafka 生态系统兼容性**：EMQX Streaming 实现了 Kafka 协议，因此兼容广泛的 Kafka 生态系统，包括 Kafka 客户端、连接器、Flink 等。它还可以无缝集成到现有的 Kafka 应用程序中。
- **统一体验**：通过统一的 UI 和 API，在一个 EMQX 平台上操作和管理 MQTT 和 Kafka 负载，无需复杂的集成过程。
- **简化的运维**：通过 EMQX Streaming，您不再需要部署和管理单独的 Kafka 集群来处理 MQTT 数据。这大大降低了运营成本、复杂性以及团队的管理负担。

## 下一步

要了解如何在您的 EMQX Premium 部署中实施和配置 EMQX Streaming，请参考指南 [在 EMQX 平台 Premium 中使用 EMQX Streaming](./use_emqx_streaming.md)。
