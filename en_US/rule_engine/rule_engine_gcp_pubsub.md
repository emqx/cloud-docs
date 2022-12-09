# Bridge device data to GCP Pub/Sub using the Data Integrations

In this article, we will simulate temperature and humidity data and report these data to EMQX Cloud via the MQTT protocol and then use the EMQX Cloud Data Integrations to forward the data into [GCP Pub/Sub](https://cloud.google.com/pubsub).

Before you start, you need to complete the following operations:

* Deployments have already been created on EMQX Cloud (EMQX Cluster).
* For Professional deployment (AWS, Azure) users: Please complete [NAT gateway](../vas/nat-gateway.md) first, all IPs mentioned below refer to the public IP of the resource.
  
> Professional deployment on the GCP platform uses the internal network by default, and there is no need to enable NAT gateway.

## GCP Pub/Sub configuration

If you are using GCP Pub/Sub for the first time, you can refer to the [help documentation](https://cloud.google.com/pubsub/docs/quickstarts) for a quick start.

### Create a topic

   Enter the GCP Pub/Sub console, click Create Topic, and enter the Topic ID to successfully create a Topic.

   ![gcp_pubsub_create_topic](./_assets/gcp_pubsub_create_topic.png)

   Click on the Topic ID to view the Topic details.

   ![gcp_pubsub_topic_details](./_assets/gcp_pubsub_topic_details.png)

   Click Subscriptions to view the subscribed topic details and message forwarding results.

   ![gcp_pubsub_topic_sub](./_assets/gcp_pubsub_topic_sub.png)

## Deployment Data Integrations Configuration

Go to the `Data Integrations` page

1. Create a GCP Pub/Sub resource and verify that it’s available.

   On the data integration page, click GCP Pub/Sub resources.
   ![gcp_pubsub_resource](./_assets/data_integration_gcp_pubsub.png)

   Fill in the Service Account JSON and other details, and then click test. Please check the GCP Pub/Sub service if the test fails.

   > *Service Account JSON* : Go to the GCP console, select the appropriate project - IAM & Admin - Service Accounts - Email, enter the email details page, click KEYS, and generate a JSON file for identity authentication.

   ![gcp_pubsub_resource](./_assets/gcp_pubsub_resource.png)

2. Click the New button after the test is passed and you will see the Create Resource successfully message.

   ![gcp_pubsub_resource_details](./_assets/gcp_pubsub_resource_details.png)

3. Create a new rule

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

   ![gcp_pubsub_rule_1](./_assets/gcp_pubsub_rule_1.png)

4. Rule SQL Testing

   To see if the rule SQL fulfills our requirements, click SQL test and fill in the test payload, topic, and client information.

   ![gcp_pubsub_rule_2](./_assets/gcp_pubsub_rule_2.png)

5. Add Action to Rule

   Click Next to add a GCP Pub/Sub forwarding action to the rule once the SQL test succeeds. To demonstrate how to forword the data reported by the device to GCP Pub/Sub, we'll utilize the following GCP Pub/Sub topic and message template.

   ```bash
   # GCP Pub/Sub message template 
   {"up_timestamp": ${up_timestamp}, "client_id": ${client_id}, "temp": ${temp}, "hum": ${hum}}
   ```

   ![gcp_pubsub_action](./_assets/gcp_pubsub_action.png)

6. After successfully binding the action to the rule, click View Details to see the rule sql statement and the bound actions.

   ![gcp_pubsub_monitor_rule](./_assets/gcp_pubsub_monitor_rule.png)

7. To see the created rules, go to Data Integrations/View Created Rules. Click the Monitor button to see the detailed match data of the rule.

   ![gcp_pubsub_monitor_resource](./_assets/gcp_pubsub_monitor_resource.png)

## Test

1. Use [MQTT X](https://mqttx.app/) to simulate temperature and humidity data reporting

   You need to replace broker.emqx.io with the created deployment [connection address](../deployments/view_deployment.md), add [client authentication information](../deployments/auth.md) to the EMQX Dashboard.

   ![gcp_pubsub_mqttx](./_assets/gcp_pubsub_mqttx.png)

2. View rules monitoring

   Check the rule monitoring and add one to the "Success" number.

   ![gcp_pubsub_monitor_result](./_assets/gcp_pubsub_monitor_result.png)

3. View data bridging results

   Go to the GCP Pub/Sub instance and view the forwarding result.

   ![gcp_pubsub_result](./_assets/gcp_pubsub_result.png)
