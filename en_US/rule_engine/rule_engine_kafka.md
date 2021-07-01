# Bridge device data to Kafka using the Rule Engine

In this article, we will simulate temperature and humidity data and report these data to EMQ X Cloud via the MQTT protocol and then use the EMQ X Cloud rules engine to dump the data into Kafka.

Before you start, you need to complete the following operations:
* Deployments have already been created on EMQ X Cloud (EMQ X Cluster).
* For professional deployment users: Please complete [Peering Connection Creation](../deployments/vpc_peering.md) first, all IPs mentioned below refer to the intranet IP of the resource.
* For basic deployment users: No peering connection is required, all IPs below refer to the public IP of the resource.

## Kafka configuration

1. Install Kafka

    ```bash
    # Install zookeeper
    docker run -d --restart=always \
        --name zookeeper \
        -p 2181:2181 \
        zookeeper

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
    # Create the "emqx" topic in the Kafka instance
   
    $ docker exec -it mykafka /opt/kafka/bin/kafka-topics.sh --zookeeper <broker IP>:2181 --replication-factor 1 --partitions 1 --topic emqx --create
  
    ```
   
    If the topic is successfuly created, the message pf `Created topic emqx` will be returned.

## EMQ X Cloud rule engine configuration

Go to the `Rule Engine` page

1. Create a new resource

   Click on the `+ New`  button in the `Resources` section and select `Kafka` as the resource type. Fill in the Kafka information you have just created and click Test. If you get an error, instantly check that the database configuration is correct.
   ![create resource](./_assets/kafka_create_resource.png)

2. Create a new rule

   Click on the `+ New`  button in the `Rules` section. Enter the following rule to match the SQL statement.  In the following rule we read the time `up_timestamp` when the message is reported, the client ID, the message body (Payload) from the `temp_hum/emqx` topic and the temperature and humidity from the message body respectively.

   ```sql
   SELECT 
   
   timestamp as up_timestamp, clientid as client_id, payload.temp as temp, payload.hum as hum
   
   FROM
   
   "temp_hum/emqx"
   ```
   ![rule sql](./_assets/sql_test.png)

3. Create a response action 
   
   Click on the `Add Action` toward the bottom of the page and select action type as `Data Forwarding` and `Bridge Data to Kafka`. Select the resource created in the first step and fill in the following data:

   Kafka topic: emqx
   Message content template:
   
   ```
   {"up_timestamp": ${up_timestamp}, "client_id": ${client_id}, "temp": ${temp}, "hum": ${hum}}
   ```
   ![kafka action](./_assets/kafka_action.png)

5. View rules monitoring
   
   Go back to the `Rule Engine` page to monitor the rule
   ![monitor](./_assets/view_monitor_kafka.png)

## Test

1. Use [MQTT X](https://mqttx.app/) to simulate temperature and humidity data reporting

   You need to replace broker.emqx.io with the created deployment [connection address](../deployments/view_deployment.md), and add [client authentication information](../deployments/auth_and_acl.md) to the EMQ X Dashboard.
   ![MQTTX](./_assets/mqttx_publish.png)
   
2. View data dump results

    ```bash
    # Go to the Kafka instance and view the emqx topic
   
    $ docker exec -it mykafka /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server <broker IP>:9092  --topic emqx --from-beginning

    ```
   ![kafka](./_assets/kafka_query_result.png)
