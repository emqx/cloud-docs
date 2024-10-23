# EMQX Streaming (Beta)

::: tip Note

The EMQX Streaming feature is available only in the EMQX Premium edition. Please note that this feature is currently in beta and is not recommended for production environments.

:::

EMQX Streaming is an innovative feature of the EMQX Platform that allows users to persistently store MQTT messages as data streams and consume them directly using Kafka clients.

This page introduces the EMQX Streaming feature, its key concepts, and its benefits.

## Feature Overview

This section explains what the EMQX Streaming feature is in detail and how it can offer compatibility with the Kafka ecosystem for real-time and historical data processing while simplifying data handling by eliminating the need for a separate Kafka cluster.

### Why EMQX Streaming?

While MQTT excels in real-time message distribution and handling many concurrent connections, it lacks built-in support for massive message storage and on-demand access to historical data. Traditionally, users have integrated MQTT brokers with Kafka to meet these needs, but this approach is expensive, complex, and operationally demanding.

The EMQX Streaming feature addresses these challenges by providing a unified solution within the EMQX Platform.

### What is EMQX Streaming?

Building on the distributed storage capabilities of the Premium edition, the EMQX Streaming feature stores MQTT messages that match specified topic filters as data streams. When an MQTT client publishes a message to a matching topic, the message is ingested and stored in the EMQX Platform’s durable, distributed storage. These stored data streams can be accessible via interfaces commonly used for data streaming, such as Kafka. It allows users to retrieve and replay stored messages through familiar Kafka clients, the operational overhead of managing a separate Kafka cluster.

With Kafka Streaming, you can achieve the following: 

- Reliably store large amounts of MQTT message data.
- Use Kafka clients to replay historical data and subscribe to real-time streams.
- Seamlessly integrate with existing backend applications and big data systems.
- Interface directly with stream processors like Flink for data processing

Additionally, EMQX plans to extend this functionality to MQTT with minor modifications, allowing access to streams through MQTT topics like `$stream/my_stream`.

### Main Concepts

To fully utilize EMQX Streaming, it's important to understand the following key concepts:

#### Stream

A Stream is a fundamental element of EMQX Streaming where MQTT or Kafka messages are stored and managed. EMQX Streaming offers two types of streams:

- **Default (bound) stream**:
  - An MQTT Topic Filter must be bound during creation.
  - The data comes from MQTT clients.
  - Kafka clients can only read the data.
  - The stream’s number of partitions is set to the default.
  - Suitable for scenarios where MQTT messages are aggregated and stored in the cloud.

- **Free stream**:

  - No need to bind an MQTT Topic Filter during creation.

  - The data comes from Kafka clients.

  - Kafka clients can read and write the data.

  - The number of partitions can be configured during creation.

  - Suitable for scenarios where users need Kafka functionality, allowing EMQX to serve as a fully functional Kafka server.

#### Partition

A Partition is a logical segment of a stream, where each partition handles a subset of the stream data. This helps distribute the load and optimize throughput. Users can configure the number of partitions when creating free streams.

#### MQTT Client

An MQTT Client is a device or software component that connects to the EMQX Platform, sending and receiving MQTT messages, which are stored in streams for later access.

#### Kafka Client

A Kafka Client is any software component (producer or consumer) that communicates with EMQX Streaming via the Kafka protocol to read or write data to streams.

#### Kafka Protocol

The Kafka Protocol is a messaging protocol used for producing and consuming messages. EMQX Streaming implements this protocol, allowing Kafka clients to interact with the system as if it were a Kafka broker.

#### Kafka Consumer Group

A Kafka Consumer Group is a mechanism that allows multiple Kafka consumers to cooperate in consuming data from a stream, ensuring that the load is distributed evenly among the group and that each message is processed only once.

## How EMQX Streaming Works

The general workflow of the EMQX Streaming is as follows:

1. **Stream Declaration**: A stream must be declared, usually by binding it to an MQTT topic filter. All MQTT messages that match the filter are saved into the stream.
2. **Stream Data Storage**: Stream data is persisted in EMQX’s storage system, which replicates the data across multiple nodes for fault tolerance and high availability.
3. **Requests Serving**: Kafka clients request data from EMQX streams. Since EMQX understands the Kafka protocol, it can serve these requests directly.
4. **Group Management**: EMQX Streaming supports Kafka consumer group protocols, allowing multiple Kafka consumers to cooperatively consume data while maintaining consumption progress.
5. **Stream Data Retention**: Data in streams is retained for a configurable period, after which outdated data is automatically deleted.

## Key Benefits

The EMQX Streams brings you the following benefits.

- **Enhanced Data Persistence**: MQTT Messages can be saved as data streams for a long time. Streams are also replicated across multiple nodes for fault tolerance and high availability.
- **Kafka Ecosystem Compatibility**: EMQX Streaming implements the Kafka wire protocol, so it is compatible with the vast Kafka ecosystem, including Kafka clients, connectors, Flink, and more. It can also seamlessly work with your current Kafka applications.
- **Unified Experience**: Operate and manage MQTT and Kafka workloads on one EMQX platform through a unified UI and APIs without any complicated integration process.
- **Simplified Operation and Maintenance**: With EMQX Streaming, you no longer need to deploy and manage separate Kafka clusters to handle MQTT data. This significantly reduces operational costs, complexity, and the administrative burden on your team.

## Next Steps

To learn how to implement and configure EMQX Streaming in your EMQX Premium deployment, refer to the guide [Use EMQX Streaming in EMQX Premium](./use_emqx_streaming.md).

