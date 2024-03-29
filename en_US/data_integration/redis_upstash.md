# Ingest MQTT Data into Upstash for Redis

Upstash is a cloud-based, serverless data platform that empowers developers to seamlessly integrate Redis databases and Kafka into their applications without the hassle of managing infrastructure. Offering a serverless architecture, Upstash allows users to enjoy the benefits of Redis, a high-performance, in-memory data store, and Kafka, without dealing with the complexities of deployment, scaling, or maintenance.

This page provides an in-depth overview of the functional features of Upstash Data Integration, along with practical guidance for its implementation. It covers essential tasks such as creating Kafka connectors, defining rules, and testing their effectiveness. Additionally, it demonstrates the process of reporting simulated temperature and humidity data to EMQX Platform using the MQTT protocol and storing this data in Upstash through the configured data integration.

## How It Works

Upstash Redis Data Integration is an out-of-the-box feature in EMQX Platform, bridging MQTT-based IoT data and Kafka's powerful data processing capabilities. Through its built-in rule engine component, the integration simplifies the data flow and processing between the two platforms without complex coding.

The diagram below illustrates a typical architecture of data integration between EMQX Platform and Redis:

![EMQX Cloud Integration Redis](./_assets/data_integration_redis.png)

Ingesting MQTT data into Upstash Redis works as follows:

1. **Message publication and reception**: Industrial IoT devices establish successful connections to EMQX Platform deployment through the MQTT protocol and publish real-time MQTT data from machines, sensors, and product lines based on their operational states, readings, or triggered events to EMQX Platform. When EMQX Platform receives these messages, it initiates the matching process within its rules engine.
2. **Message data processing:** When a message arrives, it passes through the rule engine and is then processed by the rule defined in EMQX Platform. The rules, based on predefined criteria, determine which messages need to be routed to Redis. If any rules specify payload transformations, those transformations are applied, such as converting data formats, filtering out specific information, or enriching the payload with additional context.
3. **Data ingestion into Redis**: Once the rules engine has processed the data, it triggers actions to execute preset Redis commands for caching, counting, and other operations on the data.
4. **Data storage and utilization**: By reading data stored in Redis, enterprises can leverage its rich data operation capabilities to implement various use cases. For example, in the logistics field, it's possible to obtain the latest status of devices, as well as carry out GPS geographical location analysis based on data and perform operations like real-time data analysis and sorting. This facilitates functionalities like real-time tracking, route recommendations, and more.

## Features and Benefits

The data integration with Redis offers a range of features and benefits tailored to ensure efficient data transmission, processing, and utilization:

- **High Performance and Scalability**: Supported by EMQX's distributed architecture and Redis's cluster mode, applications can seamlessly scale with increasing data volumes. Even for large datasets, consistent performance and responsiveness are ensured.
- **Real-time Data Streams**: EMQX Platform is built specifically for handling real-time data streams, ensuring efficient and reliable data transmission from devices to Redis. Redis is capable of quickly executing data operations, meeting the needs for real-time data caching and making it an ideal data storage component for EMQX Platform.
- **Real-time Data Analysis**: Redis can be used for real-time data analysis, capable of computing real-time metrics like device connections, message publishing, and specific business indicators. EMQX Platform, on the other hand, can handle real-time message transmission and processing, providing real-time data inputs for data analysis.
- **Geographic Location Analysis**: Redis offers geospatial data structures and commands for storing and querying geographic location information. Combined with EMQX Platform's powerful device connection capabilities, it can be widely applied in various IoT applications like logistics, connected vehicles, smart cities, and more.

## Before You Start

This section introduces the preparatory work needed to create Upstash For Redis Data Integration in EMQX Platform.

### Prerequisites

- Understand [rules](./rules.md).
- Understand [data integration](./introduction.md).

### Set Up Upstash for Redis Database

To begin using Upstash, visit https://upstash.com/ and create an account.

#### Create a Redis Database

1. Once you logged in, you can create a Redis Database by clicking on the **Create Database** button.

2. Type a valid name. Select the region in which you would like your database to be deployed. To optimize performance, it is recommended to choose the region that is closest to your deployment's region.

3. Click **Create**. Now you have a serverless Redis Database.

#### View Details

Enter the database console, now you have the information needed for the next steps.

## Create a Connector

1. Go to your deployment. Click **Data Integration** from the left-navigation menu.

2. If it is the first time for you to create a connector, select **Upstash for Redis** under the **Data Persistence** category. If you have already created connectors, select **New Connector** and then select **Upstash for Redis** under the **Data Persistence** category.

3. **Connector Name**: The system will automatically generate a connector name.

4. Enter the connection information:

   - **Server Host**: The information in **Endpoints** and **Port** on Redis detail page.
   - **Password**: The information in **Password** on Redis detail page.
   - Leave others as default.

5. Advanced Settings (Optional).

6. Click the **Test** button. If the Redis service is accessible, a success prompt will be returned.

7. Click the **New** button to complete the creation.

## Create a Rule

Next, you need to create a rule to specify the data to be written and add corresponding actions in the rule to forward the processed data to Upstash for Redis.

1. Click **New Rule** in the Rules area or click the New Rule icon in the **Actions** column of the connector you just created.

2. Enter the rule matching SQL statement in the **SQL Editor**. In the following rule, we read the time when the message was reported `arrived`, client ID, payload via `temp_hum/emqx` topic. Also, we can read temperature and humidity from this topic.

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

   If you are a beginner user, click **SQL Examples** and **Enable Test** to learn and test the SQL rule.

   :::

3. Click **Next** to add an action.

4. Select the connector you just created from the **Connector** dropdown box.

5. Configure **Redis Command Template**. The "up_timestamp", "client ID", "temperature", and "humidity" data will be read from the topic and saved to Redis:

   ```sql
   HMSET ${client_id} ${up_timestamp} ${temp}
   ```

6. Click the **Confirm** button to complete the rule creation.

7. In the **Successful new rule** pop-up, click **Back to Rules**, thus completing the entire data integration configuration chain.

## Test the Rule

You are recommended to use [MQTTX](https://mqttx.app/) to simulate temperature and humidity data reporting, but you can also use any other client.

1. Use MQTTX to connect to the deployment and send messages to the following Topic.

   - topic: `temp_hum/emqx`

   - client id: `test_client`

   - payload:

     ```json
     {
       "temp": "27.5",
       "hum": "41.8"
     }
     ```

2. View data in Upstash Console. In Data Browser, we select the client enrty, then we can check the messages.

3. View operational data in the console. Click the rule ID in the rule list, and you can see the statistics of the rule and the statistics of all actions under this rule.
