# Integrate with Redis

In this article, we will simulate the temperature and humidity
data, and publish these data to EMQX Cloud via the MQTT protocol, and then we will use the EMQX Cloud
Data Integrations to store the data to Redis.

Before you start, you will need to complete the following:

- A deployment (EMQX Cluster) has been created on EMQX Cloud.
- For Professional Plan users: Please complete [Peering Connection Creation](../deployments/vpc_peering.md) first, all IPs mentioned below refer to the internal network IP of the resource.(Professional Plan with a [NAT gateway](../vas/nat-gateway.md) can also use public IP to connect to resources).
- For BYOC Plan users: Please establish a peering connection between the VPC where BYOC is deployed and the VPC where the resources are located. All IPs mentioned below refer to the internal IP of the resources. If you need to access the resources via public IP addresses, please configure a NAT gateway in your public cloud console for the VPC where BYOC is deployed.

## 1. Redis Configuration

1. Pull the newest version of Redis mirror
   ```bash
   docker pull redis:latest
   ```
   
2. Run Redis Container
   ```bash
   docker run -itd --name redis -p 6379:6379 redis:latest
   ```


## 2. Create Redis Single Mode Resource

Go to [EMQX Cloud Console](https://cloud-intl.emqx.com/console/), and click to enter the deployment of Redis to be used.

On the deployment page, select the Data Integrations and click the Redis single mode resource under Data Persistence to create it.

![data_integrations](./_assets/data_integrations_redis.png)

In the Create Resource page, set as follows:
- Redis Server: IP address and port of the server

![create_resource](./_assets/create_redis_resource.png)

Click Test button when configuration is complete, then click New button to create a resource when it is available.

## 3. Create Rule

After the resource is successfully created, you can return to the data integration page and find the newly created resource, and click create rule.

![create_rule_1](./_assets/redis_create_rule_1.png)

Our goal is to trigger the engine when the client sends a temperature and humidity message to the **temp_hum/emqx** topic. Here you need a certain process of SQL:
* Only for 'temp_hum/emqx'
  

Based on the above principles, our final SQL should look like this
```sql
SELECT
    timestamp div 1000 as up_timestamp, clientid as client_id, payload as temp_hum
FROM
    "temp_hum/emqx"
```

![create_rule_2](./_assets/redis_create_rule_2.png)

## 4. Create Action

After completing the rule configuration, click Next to configure and create an action. We read the up_timestamp, client ID, temperature and humidity form the topic and save to Redis.

```bash
HMSET ${client_id} ${up_timestamp} ${temp_hum}
```

![create_rule_3](./_assets/redis_create_rule_3.png)

After an action is created, you can add another action or return it to the data integration screen

## 5. Test

1. Use [MQTTX](https://mqttx.app/) to simulate publishing temperature and humidity data

   You need to replace `broker.emqx.io` with the deployment connection address you have created and add the client-side authentication information in the EMQX Dashboard.

   ![MQTTX](./_assets/mqttx_publish_redis.png)

2. View stored results

      ```bash
   docker exec -it redis bash redis-cli
   HGETALL test_client
   ```

   ![redis](./_assets/redis_query_result.png)
