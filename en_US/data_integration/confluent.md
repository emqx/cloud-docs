# Stream MQTT Data into Confluent Cloud

Confluent Cloud is a fully-managed events streaming platform based on on Apache Kafka, delivered as a fully managed service. This tutorial introduces how to stream the MQTT data to Confluent Cloud by creating a data integration with Confluent Cloud in EMQX Platform. Through the data integration, clients can report the temperature and humidity data to EMQX Platform using the MQTT protocol and stream the data into Confluent Cloud. This tutorial also demonstrates how to use [MQTTX](https://www.emqx.com/en/products/mqttx) to test the data integration.

This page provides a detailed introduction to the functional features of Confluent Data Integration and offers practical guidance for creating it. The content includes creating Kafka connectors, creating rules, and testing rules. It demonstrates how to report simulated temperature and humidity data to the EMQX Platform via the MQTT protocol and store the data in Confluent through configured data integration.

## How It Works

Confluent data integration is a ready-to-use feature of EMQX, bridging MQTT-based IoT data with Confluent's robust data processing capabilities. Using the built-in rule engine component, the integration simplifies the data flow and processing between the two platforms, eliminating the need for complex coding.

The basic workflow for forwarding message data to Confluent is as follows:

1. **Message Publishing and Receiving**: IoT devices connected to vehicles successfully connect to EMQX via the MQTT protocol and periodically publish messages containing status data. When EMQX receives these messages, it initiates the matching process within its rule engine.
2. **Message Data Processing**: These MQTT messages can be processed according to topic matching rules through the collaborative work of the built-in rule engine and messaging server. When messages arrive and pass through the rule engine, it evaluates the predefined processing rules for that message. If any rule specifies payload transformations, these transformations are applied, such as data format conversion, filtering specific information, or enriching the payload with additional context.
3. **Bridging to Confluent**: The rules defined in the rule engine trigger the action to forward messages to Confluent. Using the Confluent feature, MQTT topics are mapped to predefined Kafka topics in Confluent, and all processed messages and data are written into these topics.

## Features and Advantages

Data integration with Confluent brings the following features and benefits to your business:

- Reliability of Large-Scale Message Transmission: Both EMQX and Confluent Cloud use highly reliable cluster mechanisms to establish stable and reliable message transmission channels, ensuring zero loss of messages from large-scale IoT devices. Both can horizontally scale by adding nodes and dynamically adjust resources to handle sudden large-scale messages, ensuring message transmission availability.
- Powerful Data Processing Capabilities: EMQX's local rule engine and Confluent Cloud both provide reliable streaming data processing capabilities, acting at different stages from IoT data from device to application. They offer real-time data filtering, format conversion, aggregation analysis, etc., based on the scenario, enabling more complex IoT message processing workflows and meeting the needs of data analysis applications.
- Strong Integration Capabilities: Through various Connectors provided by Confluent Cloud, EMQX can easily integrate with other databases, data warehouses, data stream processing systems, etc., building a complete IoT data workflow for agile data analysis applications.
- High Throughput Processing Capability: Supporting both synchronous and asynchronous write modes, you can differentiate data writing strategies between real-time priority and performance priority, and flexibly balance latency and throughput in different scenarios.
- Effective Topic Mapping: Through bridge configuration, numerous IoT business topics can be mapped to Kafka topics. EMQX supports mapping MQTT user properties to Kafka Headers and adopts various flexible topic mapping methods, including one-to-one, one-to-many, many-to-many, and also supports MQTT topic filters (wildcards).

These features enhance integration capabilities and flexibility, helping you establish an effective and robust IoT platform architecture. Your growing IoT data can be transmitted over stable network connections and further effectively stored and managed.

## Before You Start

This section describes the preparatory work needed to configure Confluent data integration on the EMQX Platform console.

### Prerequisites

- Understand [rules](./rules.md).
- Understand [data integration](./introduction.md).

### Set Up Confluent Cloud Clusters

Before creating Confluent data integration, you must create a Confluent cluster in the Confluent Cloud console and use the Confluent Cloud CLI to create topics and API keys.

There are 4 types of clusters. Each of them has different network access. You can check [Confluent Doc](https://docs.confluent.io/cloud/current/networking/overview.html#cloud-networking-support-public) to learn more background knowledge. Different types of clusters require different network environments for deployment.

| Feature            | Basic | Standard | Enterprise | Dedicated |
| ------------------ | ----- | -------- | ---------- | --------- |
| Public networking  | YES   | YES      | NO         | YES       |
| Private networking | NO    | NO       | YES        | YES       |

The following sections demonstrate how to set up a Confluent Cloud cluster in public networking and private networking.

#### Set Up a Cluster in Public Networking

   If you have or want to create Confluent Basic / Standard / Dedicated clusters, you can set up public networking solutions.

1. Create a Cluster

   ① Login to the Confluent Cloud console and create a cluster. In this demo, you can select Basic cluster as an example, and click **Begin Configuration**.

   ② Select region/zones. Considering the latency, it is recommended that the EMQX Platform deployment region matches the region of the Confluent Cloud. Click **Continue**.

   ③ Enter your cluster name and click **Launch cluster**. Now you have a running cluster in the cloud.

2. Create a topic

   ① From the navigation menu, click **Topics**, and then click **Create topic**.
   ② In the **Topic name** field, type `emqx` and then select **Create with defaults**.

3. Create API Key

   ①From the navigation menu, click **API Keys**, and then click **Add key**.

   ②Select scope for API Key. You can select `Global access`, then click **Next**.

   ③Create API Key and download the key for later configuration.

4. Enable NAT Gateway in EMQX Platform

   ① Login to EMQX Platform console, and enter the deployment Overview page.

   ② Click the **NAT Gateway** tab on the lower section of the page, and click **Subscribe Now**. Learn more about [NAT Gateway](../vas/nat-gateway.md).

In the above steps, we have completed the prerequisite settings of public networking.

#### Sep Up a Cluster in Private Networking

If you have or want to create Confluent Enterprise / Didicated clusters, you can set up private networking solutions.

1. Login to the Confluent Cloud console and create a cluster. In this demo, you can select Dedicated cluster as an example, and click **Begin Configuration**.

2. Select region/zones. Make sure the EMQX Platform deployment region matches the region of the Confluent Cloud. Click **Continue**.

3. Select **VPC Peering** for Networking so this cluster can be accessed only by VPC peering
    connection. Specify a CIDR block for the cluster and Click **Continue**.

4. Select the way to manage the encryption key based on your needs and click **Continue**.

5. After binding the card, you are ready to launch the cluster.

#### Manage the Cluster Using Confluent Cloud CLI

Now that you have a cluster up and running in Confluent Cloud, you can manage it using the Confluent Cloud CLI. Here are some basic commands that you could use with Confluent Cloud CLI.

**Install the Confluent Cloud CLI**

```bash
curl -sL --http1.1 https://cnfl.io/cli | sh -s -- -b /usr/local/bin
```

If you already have the CLI installed, you could update it by:

```bash
confluent update
```

**Log in to your account**

```bash
confluent login --save
```

**Select the environment**

```bash
confluent environment use env-xxxxx
```

**Select the cluster**

```bash
confluent kafka cluster use lkc-xxxxx
```

**Use an API key and secret**

If you have an existing API key that you'd like to use, add it to the CLI by:

```bash
confluent api-key store --resource lkc-xxxxx
Key: <API_KEY>
Secret: <API_SECRET>
```

If you don't have the API key and secret, you can create one by:

```bash
confluent api-key create --resource lkc-xxxxx
```

After adding them to the CLI, you could use the API key and secret by:

```bash
confluent api-key use "API_Key" --resource lkc-xxxxx
```

**Create a topic**

```bash
confluent kafka topic create <topic-name>
```

You can check the topic list by:

```bash
confluent kafka topic list
```

**Produce messages to the topic**

```bash
confluent kafka topic produce <topic-name>
```

**Consume messages from the topic**

```bash
confluent kafka topic consume -b <topic-name>
```

##### Establish VPC Peering Connection with EMQX Platform Deployment

After you create the cluster, you need to add peering in Confluent Cloud console.

1. From the navigation menu, click **Cluster settings**, and then click the **Networking** tab. Click the **Add Peering** button.

2. Enter the vpc information. You can get the information from the **VPC Peering Connection** section on the deployment Overview page of your deployment on the EMQX Platform console. Click the **Save** button.

3. Check the VPC Peering Connection status.
   - If the connection status is `Inactive`, go to the Cloud deployment to accept the peering request. Enter the vpc information of the confluent cloud cluster and click **Confirm**.
   - When the vpc status turns to `running`, you successfully create the vpc peering connection.

In the above steps, we have completed the prerequisite settings of private networking.

## Create a Connector

Before creating data integration rules, you need to first create a Confluent connector to access the Kafka server.

1. Go to your deployment. Click **Data Integration** from the left-navigation menu.
2. If it is the first time for you to create a connector, select **Confluent** under the **Data Forward** category. If you have already created connectors, select **New Connector** and then select **Confluent** under the **Data Forward** category.
3. On the **New Connector** page, configure the following options:
   - **Connector Name**: The system will automatically generate a connector name.
   - **Bootstrap Hosts**: Fill in the host list, ensuring your Kafka service can be normally accessed through the network.
   - **Username and Password**: Enter the API key and Secret you created earlier with the Confluent Cloud CLI.
   - Leave other options as default or configure them according to your business needs.
4. Click the **Test** button. If the Confluent service is accessible, a success prompt will be returned.
5. Click the **New** button to complete the creation.

## Create a Rule

Next, you need to new a rule to specify the data to be written and add corresponding actions in the rule to forward the processed data to Confluent.

1. Create a new rule. Enter the following SQL statement in the **SQL** input field. The rule used in this demonstration will read the messages from the `temp_hum/emqx` topic and enrich the JSON object by adding client_id, topic, and timestamp info.

   - `up_timestamp`: the time when the message is reported
   - `client_id`: the ID of the client that publishes the message
   - `temp`: the temperature data in the message payload
   - `Hum`: the humidity data in the message payload

   ```sql
   SELECT 
      timestamp as up_timestamp, 
      clientid as client_id, 
      payload.temp as temp,
      payload.hum as hum
      FROM
      "temp_hum/emqx"
   ```

2. Test the SQL rule by entering the test payload, topic, and client information, and click **SQL Test**. If you see the results like the following, it means the SQL test succeeds.

3. Click **Next** to add an action to the rule. Fill in the following configuration items according to business needs, including:
   - Kafka Topic: Enter testtopic-in. Note: Variables are not supported here.
   - Kafka Headers: Enter metadata or context information related to Kafka messages (optional). The value of the placeholder must be an object. You can choose the encoding type for the header value from the Kafka Header Value Encod Type dropdown list. You can also add more key-value pairs by clicking Add.
   - Message Key: The key of the Kafka message. Enter a string here, which can be a pure string or a string containing placeholders (${var}).
   - Message Value: The value of the Kafka message. Enter a string here, which can be a pure string or a string containing placeholders (${var}).
   - Partition Strategy: Select how the producer distributes messages to Kafka partitions.
   - Compression: Specify whether to use compression algorithms to compress/decompress records in Kafka messages.

4. Advanced Settings (Optional): Refer to [Advanced Configuration](https://docs.emqx.com/en/enterprise/v5.5/data-integration/confluent-sink.html#advanced-configuration).

5. Click the Confrim button to complete the creation. Once created, the page will return to data integration initial page.

Now you have successfully created the rule, and you can see the newly created rule on the Integration -> Rules page, as well as the newly created `action-xxx` on the Actions tab.

## Test the Rule

To test whether the Confluent Producer rule works as you expect, you can use [MQTTX](https://mqttx.app/) to simulate a client publishing MQTT messages to EMQX.

1. Use MQTTX to send a message to topic `temp_hum/emqx`.

   ```bash
   mqttx pub -i emqx_c -t t/1 -m '{"temp":"23.5","hum":"32.6"}'
   ```

2. On the data integration page, click on the `rule_id` to view rule and action statistics. Check the results; there should be one matched message and one new passed message.

3. Please view data in Confluent Console or use the following Confluent command to check if the message has been written to the `emqx` topic:

   ```bash
   confluent kafka topic consume -b emqx
   ```
