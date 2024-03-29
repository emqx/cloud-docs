# Stream MQTT Data into Upstash for Kafka

Upstash is a cloud-based, serverless data platform designed to streamline the integration of Redis databases and Kafka into applications, eliminating the need for managing infrastructure. With its serverless architecture, Upstash enables developers to leverage the capabilities of Redis, a high-performance, in-memory data store, and Kafka, without the complexities of deployment, scaling, or maintenance.

This page provides an in-depth overview of the functional features of Upstash Data Integration, along with practical guidance for its implementation. It covers essential tasks such as creating Kafka connectors, defining rules, and testing their effectiveness. Additionally, it demonstrates the process of reporting simulated temperature and humidity data to EMQX Platform using the MQTT protocol and storing this data in Upstash through the configured data integration.

## How It Works

Upstash Kafka Data Integration is an out-of-the-box feature in EMQX Platform, bridging MQTT-based IoT data and Kafka's powerful data processing capabilities. Through its built-in rule engine component, the integration simplifies the data flow and processing between the two platforms without complex coding.

The basic workflow for forwarding message data to Kafka is as follows:

1. **Message Publishing**: Devices successfully connect to the EMQX Platform deployment via the MQTT protocol and periodically publish messages containing status data. When EMQX Platform receives these messages, it initiates the matching process in its rule engine.
2. **Message Data Processing**: These MQTT messages can be processed based on topic-matching rules through the built-in rule engine. When a message arrives and passes through the rule engine, the engine evaluates predefined processing rules for that message. If any rules specify payload transformations, these transformations are applied, such as data format conversion, filtering specific information, or enriching the payload with additional context.
3. **Sending to Upstash for Kafka**: Rules defined in the rule engine trigger the action of forwarding messages to Kafka. Using Kafka Data Integration, MQTT topics are mapped to predefined Kafka topics, and all processed messages and data are written into Kafka topics.

## Features and Advantages

Data integration with Upstash Kafka brings the following features and advantages to your business:

- **Payload Transformation**: During transmission, message payloads can be processed through defined SQL rules. For example, payloads containing real-time metrics like total message count, successful/failed delivery count, and message rate can undergo data extraction, filtering, enrichment, and transformation before being input into Kafka.
- **Effective Topic Mapping**: Through configured Kafka data integration, numerous IoT business topics can be mapped to Kafka topics. EMQX supports mapping MQTT user properties to Kafka headers and employs various flexible topic mapping methods, including one-to-one, one-to-many, many-to-many, and support for MQTT topic filters (wildcards).
- **Flexible Partition Selection Strategy**: Supports forwarding messages to the same Kafka partition based on MQTT topics or clients.
- **Processing Capability under High Throughput**: EMQX Kafka producers support synchronous and asynchronous write modes, allowing you to flexibly balance between real-time priority and performance priority data write strategies.
- **Runtime Metrics**: Supports viewing runtime metrics for each data bridge, such as total message count, success/failure count, current rate, etc.

These features enhance integration capabilities and flexibility, helping you build an effective and robust IoT platform architecture. Your growing IoT data can be transmitted under stable network connections and further effectively stored and managed.

## Before You Start

This section introduces the preparatory work needed to create Kafka Data Integration in EMQX Platform.

### Prerequisites

- Understand [rules](./rules.md).
- Understand [data integration](./introduction.md).

### Set Up Upstash for Kafka Clusters

To begin using Upstash, visit https://upstash.com/ and create an account.

#### Create a Kafka Cluster

1. Once you logged in, you can create a Kafka cluster by clicking on the Create Cluster button.

2. Type a valid name. Select the region in which you would like your cluster to be deployed. To optimize performance, it is recommended to choose the region that is closest to your EMQX Platform deployment's region.

3. Select the cluster type. Currently there are two options, choose single replica for testing/development, multi replica for production use cases.

4. Click Create Cluster. Now you have a serverless Kafka cluster.

#### Create a topic

1. Enter the Cluster console, click Topics, and then click Create Topic.
2. In the Topic name field, type emqx. Leave remains as default, then select Create.

#### Create Credentials

1. From the navigation menu, click Credentials, and then click New Credentials.

2. You can define topic and permission for the credential. In this tutorial, we leave the configuration as defalut and click Create.

In the above steps, we have completed the prerequisite settings of Upstash side.

## Create a Kafka Connector

Before creating data integration rules, you need to first create a Kafka connector to access the Kafka server.

1. Go to your deployment. Click **Data Integration** from the left-navigation menu.
2. If it is the first time for you to create a connector, select **Kafka** under the **Data Forward** category. If you have already created connectors, select **New Connector** and then select **Kafka** under the **Data Forward** category.
3. On the **New Connector** page, configure the following options:
   - **Connector Name**: The system will automatically generate a connector name, or you can name it yourself. In this example, you can use `my_kafkaserver`.
   - **Bootstrap Hosts**: Fill in the host list, ensuring your Kafka service can be normally accessed through the network.
   - Enter the **username** and **password** generated in Create Credentials in Username and Password fields.
   - Use default values for other settings, or configure them according to your business needs.
4. Click the **Test** button. If the Kafka service is accessible, a success prompt will be returned.
5. Click the **New** button to complete the creation.

## Create a Rule

Next, you need to create a rule to specify the data to be written and add corresponding actions in the rule to forward the processed data to Kafka.

1. Click **New Rule** in Rules area or click the New Rule icon in the **Actions** column of the connector you just created.

2. Enter the rule matching SQL statement in the **SQL editor**. The following SQL example reads the message reporting time `up_timestamp`, client ID, and message body (Payload) from messages sent to the `temp_hum/emqx` topic, extracting temperature and humidity.

   ```sql
   SELECT 
   timestamp,
   clientid, 
   payload.temp as temp, 
   payload.hum as hum
   
   FROM
   "temp_hum/emqx"
   ```

   You can use **Enable Test** to simulate data input and test the results.

3. Click **Next** to add an action.

4. Select the connector you just created from the **Connector** dropdown box.

5. Configure the following information:

   - **Action Name**: The system will automatically generate an action name, or you can name it yourself.

   - **Kafka Topic Name**: Fill in the previously created topic `emqx`.

   - **Kafka Headers**: Define Kafka header according to your business needs.

   - In the message body settings, the **Message Key** defaults to the client ID obtained from the rule, but you can modify it as needed. In the **Message Value**, you can enter the temperature and humidity values to be forwarded.

     ```bash
     # Kafka message value
     {"temp": ${temp}, "hum": ${hum}}
     ```

   - Use default values for other settings, or configure them according to your business needs.

6. Click the **Confirm** button to complete the rule creation.

7. In the **Successful new rule** pop-up, click **Back to Rules**, thus completing the entire data integration configuration chain.

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

2. View data in Upstash Console. In Topic, we select 'emqx', click Messages, then we can check the messages.

3. View operational data in the console. Click the rule ID in the rule list, and you can see the statistics of the rule and the statistics of all actions under this rule.
