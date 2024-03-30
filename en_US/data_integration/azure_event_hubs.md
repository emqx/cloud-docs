# Stream MQTT Data into Azure Event Hubs

[Azure Event Hubs](https://azure.microsoft.com/en-us/products/event-hubs) is a managed event streaming platform by Microsoft for real-time data ingestion. EMQX Platform's integration with Azure Event Hub provides users with reliable data transport and processing capabilities, especially in high-throughput scenarios. This integration allows Azure Event Hubs to act as a conduit for data between EMQX Platform and various Azure cloud services, including Azure Blob Storage, Azure Stream Analytics, and applications deployed on Azure virtual machines. Currently, EMQX Platform supports integration with Azure Event Hub through SASL/PLAIN authentication and endpoints compatible with the Apache Kafka protocol.

This page offers a comprehensive overview of Azure Event Hubs Data Integration functionality and provides practical guidance on its implementation. It covers the creation of Azure Event Hubs connectors, setting up rules, and testing them. Additionally, it demonstrates how to transmit simulated temperature and humidity data to EMQX Platform via the MQTT protocol and store this data in Azure Event Hubs through configured data integration.

## How It Works

Azure Event Hubs data integration is an out-of-the-box feature of EMQX designed to help users seamlessly integrate MQTT data streams with Azure Event Hubs and leverage its rich services and capabilities for IoT application development.

EMQX forwards MQTT data to Azure Event Hubs through the rule engine and Sink. The complete process is as follows:

1. **IoT Devices Publish Messages**: Devices publish telemetry and status data through specific topics, triggering the rule engine.
2. **Rule Engine Processes Messages**: Using the built-in rule engine, MQTT messages from specific sources are processed based on topic matching. The rule engine matches corresponding rules and processes messages, such as converting data formats, filtering specific information, or enriching messages with contextual information.
3. **Bridging to Azure Event Hubs**: The rule triggers the action of forwarding messages to Azure Event Hubs, allowing easy configuration of data properties, ordering keys, and mapping of MQTT topics to Azure Event Hubs headers. This provides richer context information and order assurance for data integration, enabling flexible IoT data processing.

After MQTT message data is written to Azure Event Hubs, you can perform flexible application development, such as:

- Real-time Data Processing and Analysis: Utilize powerful Azure Event Hubs data processing and analysis tools and its own streaming capabilities to perform real-time processing and analysis of message data, obtaining valuable insights and decision support.
- Event-Driven Functionality: Trigger Azure event handling to achieve dynamic and flexible function triggering and processing.
- Data Storage and Sharing: Transmit message data to Azure Event Hubs storage services for secure storage and management of large volumes of data. This allows you to share and analyze this data with other Azure services to meet various business needs.

## Features and Advantages

The data integration between EMQX Platform and Azure Event Hubs can bring the following functions and advantages to your business:

**High-Performance Massive Message Throughput**: EMQX supports connections with a massive number of MQTT clients, with millions of messages per second continuously ingested into Azure Event Hubs. This enables extremely low message transmission and storage latency, and message volume control can be achieved by configuring retention time on Azure Event Hubs.

**Flexible Data Mapping**: Through the configured Azure Event Hubs, flexible mapping can be achieved between MQTT topics and Azure Event Hubs event centers. It also supports mapping MQTT user properties to Azure Event Hubs headers, providing richer context information and order assurance for data integration.

**Elastic Scaling Support**: Both EMQX and Azure Event Hubs support elastic scaling and can expand according to the application specifications, easily scaling IoT data sizes from several MBs to several TBs.

**Rich Ecosystem**: By adopting the standard MQTT protocol with the support for various mainstream IoT transmission protocols, EMQX can achieve the connection with various IoT devices. Combined with the support of Azure Event Hubs in Azure Functions, various programming language SDKs, and the Kafka ecosystem, it facilitates seamless IoT data access and processing from devices to the cloud.

These functionalities enhance integration capabilities and flexibility, helping users quickly implement the connection of massive IoT device data with Azure. They enable users to more conveniently harness the data analysis and intelligence capabilities brought by cloud computing, building powerful data-driven applications.

## Before You Start

This section introduces the preparatory work needed to create Kafka Data Integration in EMQX Platform.

### Prerequisites

- Understand [rules](./rules.md).
- Understand [data integration](./introduction.md).

### Set Up Azure Event Hub

Azure Event Hubs provides you with a Kafka endpoint. This endpoint enables your Event Hubs namespace to natively understand Apache Kafka message protocol and APIs. Event Hubs supports Apache Kafka versions 1.0 and later. For more information, see [Use Azure Event Hubs from Apache Kafka applications](https://learn.microsoft.com/en-us/azure/event-hubs/azure-event-hubs-kafka-overview).

1. Create an Event Hubs namespace

    In the Azure portal, select Event Hubs under FAVORITES in the left navigational menu, and select Create on the toolbar. On the Create namespace page, take the following steps:

    ::: tip
    Note: Event Hubs for Kafka isn't supported in the basic tier.
    :::

    - Select the **subscription** in which you want to create the namespace.
    - Select the **resource group** you created.
    - Enter a name for the namespace.
    - Select a location for the namespace.
    - Choose **Standard** for the pricing tier.
    - Select Review + Create at the bottom of the page.

    Then on the Network tab, select **Private Network**. Then please create a private endpoint.

2. Create a private endpoint

    Please follow the following steps to create a private endpoint so that the EMQX cluster can access your Event hubs via private network.

    **Step 1**: On the Basics page, select the corresponding **subscription**, **resource group**, and instance details.
    **Step 2**: On the Resource page, keep the default configuration.
    **Step 3**:On the **Virtual Network** page, select the network and subnet that are peered with EMQX Platform VPC, and select static IP in the private IP configuration.
    **Step 4**: On the DNS page, select yes to integrate **private DNS zone**. After the creation is complete, you can see that the status of the private endpoint is "succeeded" in the network tab of this namespace.
    **Step 6**: Click on the private endpoint, record the **FQDN** and **IP addresses**, and send it to us through a supprot ticket, and the devops team will add resolution for you.

3. Create an Event hub

    On the **namespace** page, select + Event hub on the command bar. Type a name for your Event hub, then select Review + create.

4. Authorizing access to Event Hubs resources using SAS (Shared Access Signatures)

    On the event hubs page, select + **Shared Access Signatures** on the command bar.Fill in the policy name and corresponding permissions. Afterwards, you can obtain the **Connection string-primary key**, which serves as the Kafka password for further use.

5. Create a **consumer group** (Optional) On the event hubs page, Click + Consumer group on the command bar.

## Create a Kafka Connector

Before creating data integration rules, you need to first create a Azure Event Hubs connector to access server.

1. Go to your deployment. Click **Data Integration** from the left-navigation menu. 
2. If it is the first time for you to create a connector, select **Azure Event Hubs** under the **Data Forward** category. If you have already created connectors, select **New Connector** and then select **Azure Event Hubs** under the **Data Forward** category.
3. On the **New Connector** page, configure the following options:
   - **Connector Name**: The system will automatically generate a connector name.
   - **Bootstrap Hosts**: Enter the hostname of your namespace. The default port is 9093. Set other fields as per your actual setup.
   - **Connection String**: Enter the connection string for your namespace, which can be found in the "Connection string - primary key" of the namespace's Shared access policies.
   - **Enable TLS**: TLS is enabled by default when connecting to Azure Event Hub.
4. Click the **Test** button. If the Azure Event Hubs service is accessible, a success prompt will be returned.
5. Click the **New** button to complete the creation.

## Create Rules

Next, you need to create a rule to specify the data to be written and add corresponding actions in the rule to forward the processed data to Azure Event Hubs.

1. Click **New Rule** in Rules area or click the New Rule icon in the **Actions** column of the connector you just created.

2. Enter the rule matching SQL statement in the **SQL editor**. The following SQL example reads the message reporting time `up_timestamp`, client ID, and message body (Payload) from messages sent to the `temp_hum/emqx` topic, extracting temperature and humidity.

   ```sql
    SELECT 
    timestamp as up_timestamp, 
    clientid as client_id, 
    payload.temp as temp,
    payload.hum as hum
    FROM
    "temp_hum/emqx"
   ```

   You can use **Enable Test** to simulate data input and test the results.

3. Click **Next** to add an action.

4. Select the connector you just created from the **Connector** dropdown box.

5. Configure the following information:

    - **Event Hub Name**: Enter the name of the Event Hub to be used. Note: Variables are not supported here.
    - **Azure Event Hub Headers**: Enter a placeholder to be used as headers that will be added to the messages when being published to Azure Event Hub.
    - **Azure Event Hub Header value encode mode**: Select the value encode mode for the header; optional values are none or json.
    - **Extra Azure Event Hub headers**: You can click Add to provide more key-value pairs for Azure Event Hubs headers.
    - **Message Key**: Event hub message key. Insert a string here, either a plain string or a string containing placeholders (${var}).
    - **Message Value**: Event hub message value. Insert a string here, either a plain string or a string containing placeholders (${var}). You can modify it as needed. In the Message Value, you can enter the temperature and humidity values to be forwarded.

     ```bash
     # Message value
     {"temp": ${temp}, "hum": ${hum}}
     ```

    - **Message Timestamp**: Specify the type of timestamp to be used.
  
6. Advanced settings (optional): Set the **Max Batch Bytes**, **Required Acks**, and **Partition Strategy** as your business needs.

7. Click the **Confirm** button to complete the rule creation.
8. In the **Successful new rule** pop-up, click **Back to Rules**, thus completing the entire data integration configuration chain.

## Test Rules

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

2. Check whether messages are written into the configured Event Hub using any Kafka-compatible consumer. It is recommended to use the [sample](https://github.com/Azure/azure-event-hubs-for-kafka/tree/master/quickstart/python) producers and consumers written in python to connect to the Kafka endpoint of the event center to view the message consumption results.

    ```bash
    python consumer.py <your-consumer-group> <topic.1> <topic.2> ... <topic.n>
    ```

    For more information about using the Kafka CLI, see [Use the Kafka CLI to Send and Receive Messages to/from Azure Event Hubs for Apache Kafka Ecosystem](https://github.com/Azure/azure-event-hubs-for-kafka/tree/master/quickstart/kafka-cli).

3. View operational data in the EMQX Platform console. Click the rule ID in the rule list, and you can see the statistics of the rule and the statistics of all actions under this rule.
