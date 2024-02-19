# Integrate with Azure Event Hubs

[Azure Event Hubs](https://learn.microsoft.com/en-us/azure/event-hubs/) is a Big Data streaming platform and event ingestion service that can receive and process millions of events per second. Event Hubs can process and store events, data, or telemetry produced by distributed software and devices. Data sent to an event hub can be transformed and stored using any real-time analytics provider or batching/storage adapters.

In this article, we will simulate temperature and humidity data and report these data to EMQX Cloud via the MQTT protocol and then use the EMQX Cloud Data Integrations to bridge the data into Azure Event Hubs.

Before you start, you need to complete the following operations:

- Create a deployment (EMQX Cluster) on EMQX Cloud.
- For Professional Plan deployment users, you must complete the creation of VPC peering connections first. The IP mentioned in this tutorial refers to the resources' private IP. (If [NAT gateway service](../vas/nat-gateway.md) is enabled, public IP can also be used for the connection.)
- For BYOC Plan users, you must establish a peering connection between the VPC where BYOC is deployed and the VPC where the resources are located. All IPs mentioned below refer to the internal IP of the resources. If you need to access the resources via public IP addresses, please configure a NAT gateway in your public cloud console for the VPC where BYOC is deployed.

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

   On the Network tab, select Private Network. Then please create a private endpoint.
   ![azure_event_hubs_namespace_2](./_assets/azure_event_hubs_namespace_2.png)

2. Create a private endpoint

   Please follow the following steps to create a private endpoint so that the EMQX cluster can access your Event hubs via private network.

   **Step 1**: On the Basics page, select the corresponding subscription, resource group, and instance details.
   ![azure_event_hubs_endpoint_1](./_assets/azure_event_hubs_endpoint_1.png)

   **Step 2**: On the Resource page, keep the default configuration.
   ![azure_event_hubs_endpoint_2](./_assets/azure_event_hubs_endpoint_2.png)

   **Step 3**:On the Virtual Network page, select the network and subnet that are peered with EMQX Cloud VPC, and select static IP in the private IP configuration.
   ![azure_event_hubs_endpoint_3](./_assets/azure_event_hubs_endpoint_3.png)

   **Step 4**: On the DNS page, select yes to integrate private DNS zone.
   ![azure_event_hubs_endpoint_4](./_assets/azure_event_hubs_endpoint_4.png)

   **Step 5**: After the creation is complete, you can see that the status of the private endpoint is "succeeded" in the network tab of this namespace.
   ![azure_event_hubs_endpoint_5](./_assets/azure_event_hubs_endpoint_5.png)

   **Step 6**: Click on the private endpoint, record the "FQDN" and "IP addresses", and send it to us through a [supprot ticket](https://docs.emqx.com/en/cloud/latest/feature/tickets.html), and the devops team will add resolution for you.
   ![azure_event_hubs_endpoint_6](./_assets/azure_event_hubs_endpoint_6.png)

3. Create an Event hub

   On the namespace page, select + Event hub on the command bar.

   ![azure_event_hubs_1](./_assets/azure_event_hubs_1.png)

   Type a name for your Event hub, then select Review + create.

   ![azure_event_hubs_2](./_assets/azure_event_hubs_2.png)

4. Authorizing access to Event Hubs resources using SAS (Shared Access Signatures)

   On the event hubs page, select + Shared Access Signatures on the command bar.Fill in the policy name and corresponding permissions.

   ![azure_event_hubs_sas_1](./_assets/azure_event_hubs_sas_1.png)

   Afterwards, you can obtain the `Connection string-primary key`, which serves as the Kafka password for further use.
   ![azure_event_hubs_sas_2](./_assets/azure_event_hubs_sas_2.png)

5. Create a consumer group (Optional)
   On the event hubs page, Click + Consumer group on the command bar.

   ![azure_event_hubs_consumer_group](./_assets/azure_event_hubs_consumer_group.png)

## Deployment Data Integrations Configuration

Go to the `Data Integrations` page，select the Kafka resource as the access method for Azure Event Hubs.

1. Create kafka resources and verify that they are available.

   To configure Kafka resources, follow these steps:

   - Click on "Kafka Resources" to access the Kafka connection details.
   - Fill in the required Kafka connection information:
     - Kafka Server: `<NamespaceName>.servicebus.windows.net:9093`
     - Kafka Username: `$ConnectionString`
     - Kafka Password: `Endpoint=sb://<NamespaceName>.servicebus.windows.net/;SharedAccessKeyName=<KeyName>;SharedAccessKey=<KeyValue>;EntityPath=<EventHubName>`
   - Ensure that SSL is enabled.
  
   After filling in the details, click on the "Test" button.

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
