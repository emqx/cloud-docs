# Save device data to Timescale Cloud using the Data Integrations

In this article, we will simulate temperature and humidity data and report these data to EMQX Cloud via the MQTT protocol and then use the EMQX Cloud Data Integrations to dump the data into Timescale Cloud.

Before you start, you need to complete the following operations:
* Deployments have already been created on EMQX Cloud (EMQX Cluster).
* For professional deployment users: Please complete [Peering Connection Creation](../deployments/vpc_peering.md) first, all IPs mentioned below refer to the intranet IP of the resource.


  <div style="position: relative; padding: 30% 45%;">
  <iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://www.youtube.com/embed/7EheLmjaHCk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>

## Create a Timescale Cloud service

1. Login the Timescale Cloud and click `Create a new service`

   ![service_1](./_assets/timescale_cloud_1.png)

2. Config the service of your needs and click `Create service`

   ![service_2](./_assets/timescale_cloud_2.png)

3. Install psql 
   
   For macOS:
   ```bash
   brew doctor
   brew update
   brew install libpq
   ```
   
   For Linux:
   ```bash
   sudo apt-get update
   sudo apt-get install postgresql-client
   ```

4. Connect to your database using psql

   ![service_3](./_assets/timescale_cloud_3.png)
   
   Enter the following command in the terminal to build the connection:

   ```bash
   $ psql -x "postgres://{YOUR_USERNAME_HERE}:{YOUR_PASSWORD_HERE}@{YOUR_HOSTNAME_HERE}:{YOUR_PORT_HERE}/{YOUR_DB_HERE}"
   ```

      To create a new table: 
   
      Use the following SQL statement to create `temp_hum` table. This table will be used to save the temperature and humidity data reported by devices.
      
   ```sql
   CREATE TABLE temp_hum (
       up_timestamp   TIMESTAMPTZ       NOT NULL,
       client_id      TEXT              NOT NULL,
       temp           DOUBLE PRECISION  NULL,
       hum            DOUBLE PRECISION  NULL
   );
   
   SELECT create_hypertable('temp_hum', 'up_timestamp');
   ```

4. Insert test data and view it
   ```sql
   INSERT INTO temp_hum(up_timestamp, client_id, temp, hum) values (to_timestamp(1603963414), 'temp_hum-001', 19.1, 55);

   select * from temp_hum;
   ```
   
## Data Integrations Configuration

Go to Deployment Details and click on `Data Integrations` on the left menu bar.

1. Create TimescaleDB Resource
   
   Click on `TimescaleDB` under the Data Persistence.

   ![timescaledb](./_assets/timescaledb.png)
 
   Fill in the timescaledb database information you have just created and click `Test`. If there is an error, you should check if the database configuration is correct. Then click on `New` to create TimescaleDB resource.

   ![create resource](./_assets/timescaledb_create_resource.png)

2. Create Rule

   Choose the TimescaleDB resource under Configured Resources, click on `New Rule` and enter the following rule to match the SQL statement. In the following rule we read the time `up_timestamp` when the message is reported, the client ID, the message body (Payload) from the `temp_hum/emqx` topic and the temperature and humidity from the message body respectively.

   ```sql
   SELECT 
   timestamp div 1000 AS up_timestamp, clientid AS client_id, payload.temp AS temp, payload.hum AS hum
   FROM
   "temp_hum/emqx"
   ```
   ![rule_engine](./_assets/timescaledb_new_rule.png)

3. Create Action

   Click on the `Next` button in the bottom to enter action view. Select the resource created in the first step and enter the following data to insert into the SQL template.

   ```sql
   INSERT INTO temp_hum(up_timestamp, client_id, temp, hum) VALUES (to_timestamp(${up_timestamp}), ${client_id}, ${temp}, ${hum})
   ```
   ![rule_engine](./_assets/timescaledb_new_action.png)
   Click on `Confirm` to create action.

4. View Resource Detail

   Click on the resource to see the detail.

   ![timescale_resource_detail](./_assets/timescaledb_resource_detail.png)


5. Check Rule Monitoring

   Click the monitor icon of rule to see the metrics

   ![view monitor](./_assets/timescaledb_monitor.png)


## Test

1. Use [MQTT X](https://mqttx.app/) to simulate temperature and humidity data reporting

   You need to replace broker.emqx.io with the created deployment [connection address](../deployments/view_deployment.md), and add [client authentication information](../deployments/auth.md) to the EMQX Dashboard.
   
   ![MQTTX](./_assets/mqttx_publish.png)
   
2. View data dump results

   ```sql
   select * from temp_hum order by up_timestamp desc limit 10;
   ```
   ![view](./_assets/timescale_cloud_view.png)
