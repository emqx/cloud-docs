# Save device data to InfluxDB 2.0 using the Data Integrations

[InfluxDB](https://www.influxdata.com/) is an open source database for storing and analyzing time-series data, with built-in HTTP API, support for SQL-like statements, and unstructured features that are very friendly for users. Its powerful data throughput and stable performance make it very suitable for the IoT field.

Through the EMQX Cloud Data Integrations, we can customize the template file, and then convert the MQTT message in JSON format to Measurement and write it to InfluxDB.


In this guide, we will complete the creation of an InfluxDB data integration to achieve the following functions:

* Record the temperature and humidity of Prague. When there is a temperature and humidity message sent to the emqx/test topic, the Data Integrations will be triggered to record this data in InfluxDB.


In order to achieve this function, we will complete the following 4 tasks:

1. Login and initialize InfluxDB
2. Create a resource
3. Create a rule and response action
4. Connect to MQTT X to send data
5. View results in the InfluxDB console

::: tip
Before using the Data Integrations, create a deployment first.
For professional deployment users: please complete [Peering Connection](../deployments/vpc_peering.md) first, and ensure that the servers involved in the following are established in the VPC under the peering connection. All the IP mentioned below refer to the intranet IP of the resource
For basic deployment users: There is no need to complete peering connection, and the IP mentioned below refers to the public IP of the resource
:::


  <LazyIframeVideo vendor="youtube" src="https://www.youtube.com/embed/1S09epPWLpc/?autoplay=1&null" />


## 1. Login and initialize InfluxDB

### Log in to the InfluxDB account

![account](./_assets/account.png)


### Create Bucket

After logging in to the InfluxDB's console, go to the `Load Data` page and create a new bucket.

![bucket](./_assets/bucket.png)

Name the bucket and click `Create`.

![create_bucket](./_assets/create_bucket.png)


### Generate Token

Go back to the `Load Data` page and generate a new token. At this time, we will generate a token with full access.

![token.png](./_assets/token.png)

Once the token is created, you could choose to activate/deactivate the token.

![token_done.png](./_assets/token_done.png)



## 2. Create Webhook Resource

Go to [EMQX Cloud Console](https://cloud-intl.emqx.com/console/) and go to the `Data Integrations` page

![rule_engine](./_assets/data_integrations_influxDB_v2.png)

Click on the `WebHook` card to create a new resource. Fill in the request URL as follows:
```
Url: https://us-east-1-1.aws.cloud2.influxdata.com
```

![rule_engine](./_assets/create_influxDB_v2_resource.png)

Click Test button when configuration is complete, then click New button to create a resource when it is available.

## 3. Create Rule

After the resource is successfully created, you can return to the data integration page and find the newly created resource, and click create rule.

![create_resource](./_assets/influxDB_v2_create_rule_1.png)

Our goal is that as long as the emqx/test topic has monitoring information, the engine will be triggered. Certain SQL processing is required here:

* Only target the topic "emqx/test"
* Get the three data we need: location, temperature, humidity

According to the above principles, the SQL we finally get should be as follows:

```
SELECT
    payload.location as location, 
    payload.temp as temp, 
    payload.hum as hum
FROM "emqx/test"
```
You can click **SQL Test** under the SQL input box to fill in the data:

* topic: emqx/test
* payload:
```json
{
  "location": "Prague",
  "temp": 26,
  "hum": 46.4
}
```

Click Test to view the obtained data results. If the settings are correct, the test output box should get the complete JSON data as follows:

```json
{
  "hum": 46.4,
  "location": "Prague", 
  "temp": 26
}
```

![create_resource](./_assets/influxDB_v2_create_rule_2.png)

::: tip Tip
If the test fails, please check whether the SQL is compliant and whether the topic in the test is consistent with the SQL filled in.
:::

## 4. Create Action

After completing the rule configuration, click Next to configure and create an action. Then add the request headers as following:

```
    Method: POST
    Path: path <your_influxdb_path>, example: '/api/v2/write?org=tifidol259%40revutap.com&bucket=emqx&precision=ns'
    Headers:
        Content-Encoding: identity
        Content-Type: text/plain
        Accept: application/json
        Authorization: Token <your_influxdb_token>
        User-Agent: Telegraf
```

Enter the Body as follows:

```
temp_hum,location=${location} temp=${temp},hum=${hum}
```

where:

```
Measurement: temp_hum
Tags: location
Fields: temp, hum
```

![create_resource](./_assets/influxDB_v2_create_rule_3.png)

## 5. Connect to MQTT X to send data

We recommend you to use MQTT X, an elegant cross-platform MQTT 5.0 desktop client to subscribe/publish messages.

>If you are using EMQX Cloud for the first time, you can go to [Deployment Connection Guide](../connect_to_deployments/overview.md) to view the MQTT client connection and test guide

We will be using the MQTT X desktop version in this tutorial.

In the MQTT X console, click on the `add` button and fill in the deployment information to connect to the deployment

![success](./_assets/influx_mqtt.png)

Enter the topic name and payload message to publish the message

![success](./_assets/influx_send.png)

## 6. View results in influxDB console

Go back to the InfluxDB console and go to the `Data Explorer` page

Select the bucket and filter the measurement, fields, then InfluxDB will generate the graphs for you

![humidity](./_assets/influx_hum.png)

![temperature](./_assets/influx_temp.png)

![both](./_assets/influx_graph.png)
