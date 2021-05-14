# Bridge device data to Kafka using the Rule Engine

In this article, we will simulate temperature and humidity data and report these data to EMQ X Cloud via the MQTT protocol and then use the EMQ X Cloud rules engine to dump the data into Kafka.

Before you start, you need to complete the following operations:
* Deployments have already been created on EMQ X Cloud (EMQ X Cluster).
* For professional deployment users: Please complete [Peering Connection Creation](../deployments/security_features_and_settings/vpc_peering.md) first, all IPs mentioned below refer to the intranet IP of the resource.
* For basic deployment users: No peering connection is required, all IPs below refer to the public IP of the resource.

## Kafka configuration

1. Install Kafka

    ```bash
    # Install zookeeper
    docker run -d --restart=always \
        --name zookeeper -p 2181:2181 zookeeper

    # Install Kafka and open port 9092
    docker run -d  --restart=always --name mykafka \
        -p 9092:9092 \
        -e HOST_IP=localhost \
        -e KAFKA_ADVERTISED_PORT=9092 \
        -e KAFKA_ADVERTISED_HOST_NAME=<server IP> \
        -e KAFKA_BROKER_ID=1 \
        -e KAFKA_LOG_RETENTION_HOURS=12 \
        -e KAFKA_LOG_FLUSH_INTERVAL_MESSAGES=100000 \
        -e KAFKA_ZOOKEEPER_CONNECT=<server IP>:2181 \
        -e ZK=<server IP> \
        wurstmeister/kafka
    ```

2. Create a topic

    ```bash
    # Go to the Kafka instance and create the emqx topic
    $ docker exec -it mykafka /bin/bash
    $ kafka-topics.sh --zookeeper <broker IP>:2181 --replication-factor 1 --partitions 1 --topic emqx --create
    ```
    If `Created topic emqx` is returned, it indicates that the creation was successful.

## EMQ X Cloud rules engine configuration

Go to Deployment Details and click on EMQ X Dashbaord to go to Dashbaord.

1. New Resource

   Click on Rules on the left menu bar → Resources, click on New Resource and drop down to select the Kafka resource type. Fill in the Kafka information you have just created and click Test. If you get an error, instantly check that the database configuration is correct.
   ![create resource](./_assets/kafka_create_resource.png)

2. Rule Testing

   Click on Rules on the left menu bar → Rules, click on Create and enter the following rule to match the SQL statement.  In the following rule we read the time `up_timestamp` when the message is reported, the client ID, the message body (Payload) from the `temp_hum/emqx` topic and the temperature and humidity from the message body respectively.

   ```sql
   SELECT 
   
   timestamp as up_timestamp, clientid as client_id, payload.temp as temp, payload.hum as hum
   
   FROM
   
   "temp_hum/emqx"
   ```
   ![rule sql](./_assets/sql_test.png)

3. Add a response action
   Click on Add Action in the bottom left corner, drop down and select → Data Forwarding → Bridge Data to Kafka, select the resource created in the first step and fill in the following data:

   Kafka topic: emqx
   Message content template:
   
   ```
   {"up_timestamp": ${up_timestamp}, "client_id": ${client_id}, "temp": ${temp}, "hum": ${hum}}
   ```
   ![kafka action](./_assets/kafka_action.png)
   
4. Click on New Rule and return to the list of rules
   ![rule list](./_assets/view_rule_engine_kafka.png)

5. View rules monitoring
   ![monitor](./_assets/view_monitor_kafka.png)

## Test

1. Use [MQTT X](https://mqttx.app/) to simulate temperature and humidity data reporting

   You need to replace broker.emqx.io with the created deployment [connection address](../deployments/view_deployment.md), and add [client authentication information](../deployments/auth_and_acl.md) to the EMQ X Dashboard.
   ![MQTTX](./_assets/mqttx_publish.png)
   
2. View data dump results

    ```bash
    # Go to the Kafka instance and view the emqx topic
    $ docker exec -it mykafka /bin/bash
    $ kafka-console-consumer.sh --bootstrap-server 127.0.0.1:9092  --topic emqx --from-beginning
    ```
   ![kafka](./_assets/kafka_query_result.png)
