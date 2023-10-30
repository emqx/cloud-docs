# Integrate with Confluent Cloud

In this article, we will simulate temperature and humidity data and report these data to EMQX Cloud via the MQTT protocol and then use the EMQX Cloud Data Integrations to bridge the data into Confluent Cloud.

Before you start, you need to complete the following operations:

- A deployment (EMQX Cluster) has been created on EMQX Cloud.
- For Professional Plan users: Please complete [Peering Connection Creation](../deployments/vpc_peering.md) first, all IPs mentioned below refer to the internal network IP of the resource.(Professional Plan with a [NAT gateway](../vas/nat-gateway.md) can also use public IP to connect to resources).
- For BYOC Plan users: Please establish a peering connection between the VPC where BYOC is deployed and the VPC where the resources are located. All IPs mentioned below refer to the internal IP of the resources. If you need to access the resources via public IP addresses, please configure a NAT gateway in your public cloud console for the VPC where BYOC is deployed.

  

## Confluent Cloud Clusters

There are 4 types of clusters. Each of them has different network access. You can check [Confluent Doc](https://docs.confluent.io/cloud/current/networking/overview.html#cloud-networking-support-public) to learn more background knowledge.

![cluster](./_assets/confluent_clusters.png)

| Feature            | Basic          | Standard     | Enterprise  | Dedicated |
|------------------| ---------- | ------------------|----------|----------|
|  Public networking  |  YES    | YES       | NO | YES |
|  Private networkin  | NO    | NO          | YES | YES |

There are some differences in setups between public networking and private networking. We will walk through 2 settings separately.


### Public networking settings
If you have or want to create Confluent Basic / Standard / Dedicated clusters, you can setup public networking solutions.

* Login to the Confluent Cloud console and create a cluster. In this demo, we select Basic cluster as an example.

* Select region/zones (You can choose any providers or regions. It's recommended to choose the same region as EMQX Cloud deployment's regarding the consideration of latency.)

![region](./_assets/public_region.png)

* Specify a cluster name and then selet `Launch cluster`.

* Now you have a running cluster in the cloud.

#### Create a topic

* In the navigation menu, click `Topics`, and in the Topics page, click `Add topic`.


* In the Topic name field, type “emqx”. Click Create with defaults.

![topic](./_assets/public_topic.png)

#### Create API Key

* In the navigation menu, click `API Keys`, and in the API Keys page, click `Add key`.

* Select scope for API Key. We choose "Global access", then click 'Next'.

* Create API Key and download the key for later configuration. 

![key](./_assets/public_key.png)


#### Enable NAT Gateway in EMQX Cloud

* Login to EMQX Cloud console, and enter deployment overview page.

* Click `NAT Gateway` tab in the lower section of the page, and click `Subscribe Now`. Learn more about [NAT Gateway](../vas/nat-gateway.md).

![NAT](./_assets/public_nat.png)


In the above steps, we have completed the prerequisite settings of public networking.


### Private networking settings

If you have or want to create Confluent Enterprise / Didicated clusters, you can setup private networking solutions.

* Login to the Confluent Cloud console and create a cluster. In this demo, we select Dedicated cluster as an example.

* Select region/zones (Make sure the region/zones are the same region as EMQX Cloud deployment's.)

  ![region](./_assets/confluent_region.png)

* Select VPC Peering for the networking so this cluster could be accessed only by vpc peering
  connection.

  ![nat](./_assets/confluent_nat.png)

* Specify a CIDR block for the cluster and click `Continue`

* Based on your needs, choose the way to manage the encryption key

  ![security](./_assets/confluent_security.png)

* After binding the card, you are ready to launch the cluster

#### Manage the cluster using Confluent Cloud CLI

Now that you have a cluster up and running in Confluent Cloud， you can manage it using the Confluent Cloud CLI. Here are some basic commands that you could use with Confluent Cloud CLI.

1. Install the Confluent Cloud CLI

```bash
curl -sL --http1.1 https://cnfl.io/cli | sh -s -- -b /usr/local/bin
```

If you already have the CLI installed, you could update it by:

```bash
confluent update
```

2. Log in to your account

```bash
confluent login --save
```

3. Select the environment

```bash
confluent environment use env-xxxxx
```

4. Select the cluster

```bash
confluent kafka cluster use lkc-xxxxx
```

5. Use an API key and secret

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

After add them to teh CLI, you could use the API key and secret by:

```bash
confluent api-key use "API_Key" --resource lkc-xxxxx
```

6. Create a topic

```bash
confluent kafka topic create <topic-name>
```

You could check the topic list by:

```bash
confluent kafka topic list
```

7. Produce messages to the topic

```bash
confluent kafka topic produce <topic-name>
```

8. Consume messages from the topic

```bash
confluent kafka topic consume -b <topic-name>
```

#### Build VPC Peering Connection with EMQX Cloud deployment

After the cluster has been created, we should add peering

* Go to the `Networking` section of the `Cluster settings` page and click on the `Add Peering`
  button.

  ![addPeering](./_assets/confluent_addPeering.png)

* Fill in the vpc information. (You could get the information from `VPC Peering` section of the
  deployment console)

  ![vpc_info](./_assets/confluent_vpc1.png)

  ![vpc_info](./_assets/../../deployments/_assets/aws_vpc_peering.png)

* When the connection status is `Inactive`, go back to the deployment console to accept the peering request. Fill in the vpc information of the confluent cloud cluster and click `Confirm`. When the vpc status turns to `running`, you successfully create the vpc peering connection.

  ![vpc](./_assets/../../deployments/_assets/aws_vpc_peeing_status.png)


In the above steps, we have completed the prerequisite settings of private networking.



## Data Integrations Configuration

Go to the `Data Integrations` page, Choose Confluent resource tile.
![create resource](./_assets/confluent_tile.png)


1. Fill the Bootstrap Server, and Key / Secret that we created in the above steps. Click `Test` to verify the Confluent server.
   ![create resource](./_assets/confluent_resource.png)

2. Click the New button after the test is passed, and you will see the Create Resource successfully message.


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

   ```bash
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

1. Use [MQTTX](https://mqttx.app/) to simulate temperature and humidity data reporting

   You need to enter the deployment connection address, add client authentication information to the EMQX Dashboard.
   ![MQTTX](./_assets/mqttx_publish.png)

2. View data bridging results by command.

    ```bash
    # Go to the confluent peering server and view the emqx topic
    confluent kafka topic consume -b emqx
    ```

   ![kafka](./_assets/confluent_result.png)

3. View data in Confluent Console.

 ![monitor](./_assets/confluent_result_console.png)
