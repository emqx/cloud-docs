# Integrate with Azure Event Hubs

[Azure Event Hubs](https://learn.microsoft.com/en-us/azure/event-hubs/) is a Big Data streaming platform and event ingestion service that can receive and process millions of events per second. Event Hubs can process and store events, data, or telemetry produced by distributed software and devices. Data sent to an event hub can be transformed and stored using any real-time analytics provider or batching/storage adapters.

In this article, we will simulate temperature and humidity data and report these data to EMQX Cloud via the MQTT protocol and then use the EMQX Cloud Data Integrations to bridge the data into Azure Event Hubs.

Before you start, you need to complete the following operations:

- A deployment (EMQX Cluster) has been created on EMQX Cloud.
- For Professional Plan users: Please create the [NAT gateway](../vas/nat-gateway.md) to use public IP to connect to resources.
- For BYOC Plan users: Please create the [NAT gateway](../vas/nat-gateway.md) to use a public IP to connect to resources.

## Azure Event Hubs configuration

Azure Event Hubs provides you with a Kafka endpoint. This endpoint enables your Event Hubs namespace to natively understand Apache Kafka message protocol and APIs. Event Hubs supports Apache Kafka versions 1.0 and later. For more information, see [Use Azure Event Hubs from Apache Kafka applications](https://learn.microsoft.com/en-us/azure/event-hubs/azure-event-hubs-kafka-overview)

1. Create an Event Hubs namespace

   In the Azure portal, select Event Hubs under FAVORITES in the left navigational menu, and select Create on the toolbar. On the Create namespace page, take the following steps:

   > Note: Event Hubs for Kafka isn't supported in the basic tier.

   - Select the subscription in which you want to create the namespace.
   - Select the resource group you created.
   - Enter a name for the namespace.
   - Select a location for the namespace.
   - Choose **Standard** for the pricing tier.
   - Select Review + Create at the bottom of the page.

   ![azure_event_hubs_namespace_1](./_assets/azure_event_hubs_namespace_1.png)

2. Create an event hub

   On the namespace page, select + Event hub on the command bar.

   ![azure_event_hubs_1](./_assets/azure_event_hubs_1.png)

   Type a name for your event hub, then select Review + create.

   ![azure_event_hubs_2](./_assets/azure_event_hubs_2.png)

3. Authorizing access to Event Hubs resources using SAS (Shared Access Signatures)

   On the event hubs page, select + Shared Access Signatures on the command bar.Fill in the policy name and corresponding permissions.

   ![azure_event_hubs_sas_1](./_assets/azure_event_hubs_sas_1.png)

   Then you can get the connection string and authentication information for further use.
   ![azure_event_hubs_sas_2](./_assets/azure_event_hubs_sas_2.png)

4. Create a consumer group (Optional)
   On the event hubs page, Click + Consumer group on the command bar.

   ![azure_event_hubs_consumer_group](./_assets/azure_event_hubs_consumer_group.png)

## Deployment Data Integrations Configuration

Go to the `Data Integrations` page，select the Kafka resource as the access method for Azure Event Hubs.

1. Create kafka resources and verify that they are available.

   Click kafka resources, fill in the kafka connection details, enable SSL and then click test. Please check the Azure Event Hubs service if the test fails.

   ![azure_event_hubs_create_resource](./_assets/azure_event_hubs_create_resource.png)

2. Create a new rule

   Put the following SQL statement in the SQL input field. The device reporting message time (up timestamp), client ID, and message body (Payload) will be retrieved from the temp hum/emqx subject in the SQL rule, and the device ambient temperature and humidity will be read from the message body.

   ```sql
   SELECT 
   timestamp as up_timestamp, 
   clientid as client_id, 
   payload.temp as temp,
   payload.hum as hum
   FROM
   "temp_hum/emqx"
   ```

   ![rule sql](./_assets/azure_event_hubs_create_sql.png)

3. Rule SQL Testing

   To see if the rule SQL fulfills our requirements, click SQL test and fill in the test payload, topic, and client information.

   ![rule sql test](./_assets/azure_event_hubs_create_sql_test.png)

4. Add Action to Rule

   Click Next to add a Kafka forwarding action to the rule once the SQL test succeeds. To demonstrate how to bridge the data reported by the device to Azure Event Hubs, we'll utilize the following Kafka topic and message template.

  > Note: It appears that Azure Event Hubs exhibit incompatibility issues when the response action **"Produce Required Acks"** is configured as "none." To resolve this, kindly adjust the "Produce Required Acks" setting to a value other than "none." This modification will enhance connection stability and mitigate the recurring occurrence of connection crashes.

   ```bash
   # kafka topic (Azure Event Hub name)
   emqx-hub
   
   # kafka message template 
   {"up_timestamp": ${up_timestamp}, "client_id": ${client_id}, "temp": ${temp}, "hum": ${hum}}
   ```

   ![action](./_assets/azure_event_hubs_action.png)

1. After successfully binding the action to the rule, click View Details to see the rule sql statement and the bound actions.

   ![monitor](./_assets/azure_event_hubs_rule_engine_detail.png)

2. To see the created rules, go to Data Integrations/View Created Rules. Click the Monitor button to see the detailed match data of the rule.

   ![monitor](./_assets/azure_event_hubs_monitor.png)

## Test

1. Use [MQTTX](https://mqttx.app/) to simulate temperature and humidity data reporting

   You need to replace broker.emqx.io with the created deployment connection address, add client authentication information to the EMQX Dashboard.

   ![MQTTX](./_assets/azure_event_hubs_mqttx.png)

2. View rules monitoring

   Check the rule monitoring and add one to the "Success" number.

   ![ Azure Event Hubs monitor](./_assets/azure_event_hubs_monitor_result.png)

3. View data bridging results

   It is recommended to use the [sample producers and consumers written in python](https://github.com/Azure/azure-event-hubs-for-kafka/tree/master/quickstart/python) to connect to the Kafka endpoint of the event center to view the message consumption results

    ```bash
    python consumer.py <your-consumer-group> <topic.1> <topic.2> ... <topic.n> 
    ```

   ![Azure Event Hubs results](./_assets/azure_event_hubs_result.png)
