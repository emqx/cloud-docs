# EMQX Streaming (Beta)

::: tip 注意

EMQX Streaming 功能仅在 EMQX 旗舰版中可用。请注意，此功能目前处于测试阶段，不建议在生产环境中使用。

:::

EMQX Streaming 是 EMQX 平台的一个创新功能，允许用户将 MQTT 消息以数据流的形式持久化存储，并通过 Kafka 客户端直接消费这些数据流。

本页介绍了 EMQX Streaming 功能的关键概念及其优势。

## 功能概述

本节详细介绍了 EMQX Streaming 功能，阐述其如何在无需单独部署 Kafka 集群的情况下，简化数据处理流程，并实现与 Kafka 生态系统的兼容性，支持实时和历史数据处理。

### 为什么选择 EMQX Streaming？

尽管 MQTT 在实时消息分发和处理大量并发连接方面表现出色，但它缺乏内置的大规模消息存储和按需访问历史数据的功能。传统做法是用户通过将 MQTT Broker 与 Kafka 集成来满足这些需求，但这种方式成本高、复杂且操作要求较高。

EMQX Streaming 功能通过在 EMQX 平台内提供统一的解决方案来解决这些问题。

### 什么是 EMQX Streaming？

基于旗舰版的分布式存储功能，EMQX Streaming 能够将符合指定主题过滤器的 MQTT 消息作为数据流进行存储。当 MQTT 客户端向匹配的主题发布消息时，消息将被捕获并存储在 EMQX 平台的持久化、分布式存储中。这些存储的数据流可以通过常用的数据流接口（如 Kafka）访问，允许用户通过熟悉的 Kafka 客户端检索和回放存储的消息，而无需管理单独的 Kafka 集群带来的运营开销。

通过 EMQX Streaming，您可以实现以下目标：

- 可靠存储大量 MQTT 消息数据。
- 使用 Kafka 客户端回放历史数据并订阅实时数据流。
- 与现有的后端应用程序和大数据系统无缝集成。
- 直接与 Flink 等流处理器接口进行数据处理。

### 主要概念

要充分利用 EMQX Streaming，您需要了解以下关键概念：

#### Stream

Stream 是 EMQX Streaming 中的基本元素，用于存储和管理 MQTT 或 Kafka 消息。EMQX Streaming 提供两种类型的 stream：

- **Default Stream**：
  - 在创建时必须绑定一个 MQTT 主题过滤器。
  - 数据来自 MQTT 客户端。
  - Kafka 客户端只能读取数据。
  - 流的分区数量为默认值。
  - 适用于将 MQTT 消息聚合并存储在云端的场景。
- **Free Stream**：
  - 创建时无需绑定 MQTT 主题过滤器。
  - 数据来自 Kafka 客户端。
  - Kafka 客户端可以读取和写入数据。
  - 创建时可以配置分区数量。
  - 适用于用户需要 Kafka 功能的场景，使 EMQX 可作为一个全功能的 Kafka 服务器。

#### 分区

分区是流的一个逻辑段，每个分区处理一部分流数据。这有助于分配 payload 并优化吞吐量。用户可以在创建 free stream 时配置分区数量。

#### MQTT 客户端

MQTT 客户端是连接到 EMQX Platform 部署的设备或软件组件，用于发送和接收 MQTT 消息，这些消息被存储在 stream 中以便日后访问。

#### Kafka 客户端

Kafka 客户端是任何通过 Kafka 协议与 EMQX Streaming 进行通信的软件组件（生产者或消费者），用于读取或写入流中的数据。

#### Kafka 协议

Kafka 协议是一种用于生成和消费消息的消息协议。EMQX Streaming 实现了这一协议，使 Kafka 客户端能够像与 Kafka Broker 通信一样与系统交互。

#### Kafka 消费者组

Kafka 消费者组是一种机制，允许多个 Kafka 消费者协同消费流中的数据，确保 payload 在组内均匀分配，并且每条消息只被处理一次。

## EMQX Streaming 的工作原理

EMQX Streaming 的一般工作流程如下：

1. **声明 stream**：通常通过将 stream 与 MQTT 主题过滤器绑定来声明一个 stream。所有匹配该过滤器的 MQTT 消息将被保存到 stream 中。
2. **流数据存储**：流数据在 EMQX 的存储系统中持久化，并在多个节点之间复制，以确保容错和高可用性。
3. **请求处理**：Kafka 客户端从 EMQX Stream 中请求数据。由于 EMQX 支持 Kafka 协议，它能够直接响应这些请求。
4. **组管理**：EMQX Streaming 支持 Kafka 消费者组协议，允许多个 Kafka 消费者协同消费数据，并保持消费进度。
5. **流数据保留**：Stream 中的数据保留一段可配置的时间，过期数据将被自动删除。

## 关键优势

EMQX Streaming 为您带来了以下优势：

- **增强的数据持久性**：MQTT 消息可以作为数据流长期保存。数据流还在多个节点之间复制，以确保容错和高可用性。
- **Kafka 生态系统兼容性**：EMQX Streaming 实现了 Kafka 协议，因此兼容广泛的 Kafka 生态系统，包括 Kafka 客户端、连接器、Flink 等。它还可以无缝集成到现有的 Kafka 应用程序中。
- **统一体验**：通过统一的 UI 和 API，在一个 EMQX 平台上操作和管理 MQTT 和 Kafka 负载，无需复杂的集成过程。
- **简化的运维**：通过 EMQX Streaming，您不再需要部署和管理单独的 Kafka 集群来处理 MQTT 数据。这大大降低了运营成本、复杂性以及团队的管理负担。

## 下一步

要了解如何在您的 EMQX Premium 部署中实施和配置 EMQX Streaming，请参考[在 EMQX 旗舰版中使用 EMQX Streaming](./use_emqx_streaming.md)。
