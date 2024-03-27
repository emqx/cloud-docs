# Ingest MQTT Data into Cassandra

[Apache Cassandra](https://cassandra.apache.org/_/index.html) is a popular open-source, distributed NoSQL database management system designed to handle large datasets and build high-throughput applications. EMQX Cloud's integration with Apache Cassandra provides the ability to store messages and events in the Cassandra database, enabling functionalities such as time-series data storage, device registration and management, as well as real-time data analysis.

This page provides a comprehensive introduction to the data integration between EMQX Cloud and Cassandra with practical instructions on creating and validating the data integration.

:::tip
The current implementation only supports Cassandra v3.x, not yet compatible with v4.x.
:::

## How It Works

Cassandra data integration is an out-of-the-box feature in EMQX Cloud that combines EMQX Cloud's device connectivity and message transmission capabilities with Cassendra's powerful data storage capabilities. With a built-in [rule engine](./rules.md) component, the integration simplifies the process of ingesting data from EMQX Cloud to Cassandra for storage and management, eliminating the need for complex coding.

The diagram below illustrates a typical architecture of data integration between EMQX and Cassandra:

![EMQX Cloud Integration Cassandra](./assets/emqx-integration-cassandra.png)

Ingesting MQTT data into Cassandra works as follows:

1. **Message publication and reception**: IoT devices, whether they are part of connected vehicles, IIoT systems, or energy management platforms, establish successful connections to EMQX Cloud through the MQTT protocol and publish MQTT messages to specific topics. When EMQX Cloud receives these messages, it initiates the matching process within its rules engine.
2. **Message data processing:** When a message arrives, it passes through the rule engine and is then processed by the rule defined in EMQX Cloud. The rules, based on predefined criteria, determine which messages need to be routed to Cassandra. If any rules specify payload transformations, those transformations are applied, such as converting data formats, filtering out specific information, or enriching the payload with additional context.
3. **Data ingestion into Cassandra**: Once the rule engine identifies a message for Cassandra storage, it triggers an action of forwarding the messages to Cassandra. Processed data will be seamlessly written into the collection of the Cassandra database.
4. **Data storage and utilization**: With the data now stored in Cassandra, businesses can harness its querying power for various use cases. For instance, in the realm of connected vehicles, this stored data can inform fleet management systems about vehicle health, optimize route planning based on real-time metrics, or track assets. Similarly, in IIoT settings, the data might be used to monitor machinery health, forecast maintenance, or optimize production schedules.

## Features and Benefits

The data integration with Cassandra offers a range of features and benefits tailored to ensure efficient data transmission, storage, and utilization:

- **Large-Scale Time-Series Data Storage**: EMQX Cloud can handle massive device connections and message transmissions. Leveraging Cassandra's high scalability and distributed storage features, it can achieve storage and management of large-scale datasets, including time-series data, and supports time-range based queries and aggregation operations.
- **Real-time Data Streaming**: EMQX Cloud is built for handling real-time data streams, ensuring efficient and reliable data transmission from source systems to Cassandra. It enables organizations to capture and analyze data in real-time, making it ideal for use cases requiring immediate insights and actions.
- **High Availability Assurance**: Both EMQX and Cassandra provide clustering capabilities. When used in combination, device connections and data can be distributed across multiple servers. In case of a node failure, the system can automatically switch to other available nodes, thus ensuring high scalability and fault tolerance.
- **Flexibility in Data Transformation:** EMQX Cloud provides a powerful SQL-based Rule Engine, allowing organizations to pre-process data before storing it in Cassandra. It supports various data transformation mechanisms, such as filtering, routing, aggregation, and enrichment, enabling organizations to shape the data according to their needs.
- **Flexible Data Model**: Cassandra uses a column-based data model, supporting flexible data schemas and dynamic addition of columns. This is suitable for storing and managing structured device events and message data, and can easily store various MQTT message data.

## Before You Start

This section describes the preparations you need to complete before you start to create a TimescaleDB data bridge, including how to install a Cassandra server and create keyspace and table.

### Prerequisites

- Understand [rules](./rules.md).
- Understand [data integration](./introduction.md).

### Install Cassandra Server

Start the simple Cassandra service via docker:

```bash
docker run --name cassa --rm -p 9042:9042 cassandra:3.11.14
```

### Create Keyspace and Table

You need to create keyspace and tables before you create the data bridge for Cassandra.

1. Create a Keyspace named `mqtt`:

```bash
docker exec -it cassa cqlsh "-e CREATE KEYSPACE mqtt WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1}"
```

2. Create a table in Cassandra: `temp_hum`:

```bash
docker exec -it cassa cqlsh "-e \
    CREATE TABLE mqtt.temp_hum( \
        msgid text, \
        temp text, \
        hum text, \
        arrived timestamp, \
        PRIMARY KEY(msgid));"
```

## Create a Cassandra Connector

Before creating data integration rules, you need to first create a Cassandra connector to access the Cassandra server.

1. Go to your deployment. Click **Data Integration** from the left-navigation menu.

2. If it is the first time for you to create a connector, select **Microsoft SQL server** under the **Data Persistence** category. If you have already created connectors, select **New Connector** and then select **Microsoft SQL server** under the **Data Persistence** category.

3. Enter the connection information:

   - **Servers**: IP address and port of the server.
   - **Keyspace**: `mqtt` as the Keyspace.
   - leave others as default.
   - If you want to establish an encrypted connection, click the **Enable TLS** toggle switch.

4. Advanced Settings (Optional).

5. Click the **Test** button. If the Cassandra service is accessible, a success prompt will be returned.

6. Click the **New** button to complete the creation.

## Create Rules

Next, you need to create a rule to specify the data to be written and add corresponding actions in the rule to forward the processed data to Cassandra.

1. Click **New Rule** in Rules area or click the New Rule icon in the **Actions** column of the connector you just created.

2. Enter the rule matching SQL statement in the **SQL Editor**. In the following rule, we read the time when the message was reported `up_timestamp`, client ID, payload via `temp_hum/emqx` topic. Also, we can read temperature and humidity from this topic.

   ```sql
     SELECT
       id as msgid,
       payload.temp as temp,
       payload.hum as hum,
       timestamp as arrived
     FROM
       "temp_hum/emqx"
   ```

   ::: tip

   If you are a beginner user, click **SQL Examples** and **Enable Test** to learn and test the SQL rule.

   :::

3. Click **Next** to add an action.

4. Select the connector you just created from the **Connector** dropdown box.

5. Configure the **CQL template** to save `msgid`, `temp`, `hum` and `arrived` to Cassandra. This template will be executed via Cassandra Query Language, and the sample code is as follows:

   ```sql
     INSERT INTO temp_hum(msgid, temp, hum, arrived)
     VALUES (
       ${msgid},
       ${temp},
       ${hum},
       ${arrived}
     )
   ```

6. Advanced settings (optional).

7. Click the **Confirm** button to complete the rule creation.

8. In the **Successful new rule** pop-up, click **Back to Rules**, thus completing the entire data integration configuration chain.

## Test the Rule

You are recommended to use [MQTTX](https://mqttx.app/) to simulate temperature and humidity data reporting, but you can also use any other client.

1. Use MQTTX to connect to the deployment and send messages to the following Topic.

   - topic: `temp_hum/emqx`

   - payload:

     ```json
     {
       "temp": "27.5",
       "hum": "41.8"
     }
     ```

2. Check whether messages are stored into Cassandra with the following command:

   ```bash
    $ docker exec -it cassa cqlsh "-e SELECT * FROM mqtt.temp_hum;"

    msgid                            | arrived                         | hum  | temp
    ----------------------------------+---------------------------------+------+------
    00061488D7FBFE8F2C770000467D0011 | 2024-03-26 04:37:11.987000+0000 | 41.8 | 27.5

    (1 rows)
   ```

3. View operational data in the console. Click the rule ID in the rule list, and you can see the statistics of the rule and the statistics of all actions under this rule.
