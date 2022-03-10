# Bridge device data to Confluent Cloud using the Data Integrations

In this article, we will simulate temperature and humidity data and report these data to EMQX Cloud via the MQTT protocol and then use the EMQX Cloud Data Integrations to bridge the data into Confluent Cloud.

Before you start, you need to complete the following operations:

* Deployments have already been created on EMQX Cloud (EMQX Cluster).
* This feature is available for professional deployment
* There are three types of Confluent Cloud cluster you could choose:
    * For basic and standard cluster, please open the NAT first.
    * For dedicated cluster, please
      complete [Peering Connection Creation](../deployments/vpc_peering.md) first, all IPs mentioned
      below refer to the intranet IP of the resource.

  <div style="position: relative; padding: 30% 45%;">
  <iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://www.youtube.com/embed/jLn0q8xf-1Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>

## Confluent Cloud Configuration

### Create a cluster

* Login to the Confluent Cloud console and create a cluster.
* At this time, we select the dedicated cluster as an example.

  ![cluster](./_assets/confluent_cluster.png)

* Select region/zones (make sure the deployment region matches the region of the Confluent Cloud)

  ![region](./_assets/confluent_region.png)

* Select VPC Peering for the networking so this cluster could be accessed only by vpc peering
  connection.

  ![nat](./_assets/confluent_nat.png)

* Specify a CIDR block for the cluster and click `Conttinue`

* Based on your needs, choose the way to manage the encryption key

  ![security](./_assets/confluent_security.png)

* After binding the card, you are ready to launch the cluster

### Manage the cluster using Confluent Cloud CLI

Now that you have a cluster up and running in Confluent Cloud， you can manage it using the Confluent Cloud CLI. Here are some basic commands that you could use with Confluent Cloud CLI.

#### Install the Confluent Cloud CLI

```bash
curl -L --http1.1 https://cnfl.io/ccloud-cli | sh -s -- -b /usr/local/bin
```

If you already have the CLI installed, you could update it by:

```bash
ccloud update
```

#### Log in to your account

```bash
ccloud login --save
```

#### Select the environment

```bash
ccloud environment use env-v9y0p
```

#### Select the cluster

```bash
ccloud kafka cluster use lkc-djr31
```

#### Use an API key and secret

If you have an existing API key that you'd like to use, add it to the CLI by:

```bash
ccloud api-key store --resource lkc-djr31
Key: <API_KEY>
Secret: <API_SECRET>
```

If you don't have the API key and secret, you can create one by:

```bash
ccloud api-key create --resource lkc-djr31
```

After add them to teh CLI, you could use the API key and secret by:

```bash
ccloud api-key use "API_Key" --resource lkc-djr31
```

#### Create a topic

```bash
ccloud kafka topic create topic-name
```

You could check the topic list by:

```bash
ccloud kafka topic list
```

#### Produce messages to the topic

```bash
ccloud kafka topic produce topic-name
```

#### Consume messages from the topic

```bash
ccloud kafka topic consume -b topic-name
```

### Build VPC Peering Connection with the deployment

After the cluster has been created, we should add peering

* Go to the `Networking` section of the `Cluster settings` page and click on the `Add Peering`
  button.

  ![addPeering](./_assets/confluent_addPeering.png)

* Fill in the vpc information. (You could get the information from `VPC Peering` section of the
  deployment console)

  ![vpc_info](./_assets/confluent_vpc1.png)

  ![vpc_info](./_assets/confluent_vpc2.png)

* When the connection status is `Inactive`, go back to the deployment console to accept the peering request. Fill in the vpc information of the confluent cloud cluster and click `Confirm`. When the vpc status turns to `running`, you successfully create the vpc peering connection.

  ![vpc_info](./_assets/confluent_vpc2.png)

  ![vpc](./_assets/confluent_finish.png)



## Deployment Data Integrations Configuration

Go to the `Data Integrations` page

1. Create kafka resources and verify that they are available.

   On the data integration page, click kafka resources, fill in the kafka connection details, and then click test. Please check the kafka service if the test fails.
   ![create resource](./_assets/kafka_create_resource.png)

2. Click the New button after the test is passed and you will see the Create Resource successfully message.

   ![kafka_created_successfully](./_assets/kafka_created_successfully.png)

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
   ![rule sql](./_assets/kafka_create_sql.png)

4. Rule SQL Testing

   To see if the rule SQL fulfills our requirements, click SQL test and fill in the test payload, topic, and client information.

   ![rule sql](./_assets/kafka_create_sql_test.png)

5. Add Action to Rule

   Click Next to add a Kafka forwarding action to the rule once the SQL test succeeds. To demonstrate how to bridge the data reported by the device to Kafka, we'll utilize the following Kafka topic and message template.

   ```
   # kafka topic
   emqx
   
   # kafka message template 
   {"up_timestamp": ${up_timestamp}, "client_id": ${client_id}, "temp": ${temp}, "hum": ${hum}}
   ```

   ![rule sql](./_assets/kafka_action.png)

6. After successfully binding the action to the rule, click View Details to see the rule sql statement and the bound actions.

   ![monitor](./_assets/kafka_rule_engine_detail.png)

7. To see the created rules, go to Data Integrations/View Created Rules. Click the Monitor button to see the detailed match data of the rule.

   ![monitor](./_assets/kafka_monitor.png)



## Test

1. Use [MQTT X](https://mqttx.app/) to simulate temperature and humidity data reporting

   You need to replace broker.emqx.io with the created deployment [connection address](../deployments/view_deployment.md), add [client authentication information](../deployments/auth.md) to the EMQX Dashboard.
   ![MQTTX](./_assets/mqttx_publish.png)

2. View data bridging results

    ```bash
    # Go to the Kafka instance and view the emqx topic
      
    $ docker exec -it mykafka /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server <broker IP>:9092  --topic emqx --from-beginning
      
    ```
   ![kafka](./_assets/kafka_query_result.png)
