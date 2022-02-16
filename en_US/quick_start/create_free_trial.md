# Create a free trial deployment

For first-time EMQX Cloud customers, we have an opportunity for you to create a free trial deployment of up to **14** days in length. The free trial deployment is an ideal way for you to learn and explore the features of EMQX Cloud. Before creating a free trial deployment, you need to understand that the free trial has the following restrictions.

* Free trial up to 14 days.

  > To extend your free trial, you can submit a [ticket](../feature/tickets.md) or contact us by email to get in touch with us.

* Maximum 1000 client connections for the basic plan, maximum 5000 client connections for professional plan

* 100 GB free traffic per month.

* Use all EMQX features such as rule engine, monitoring management, etc.

* Support for MQTT, WebSockets, MQTT over TLS/SSL, WebSockets over TLS protocol connections.

  > For additional protocol support, you can submit a [ticket](../feature/tickets.md) or send email (cloud@emqx.io) to get in touch with us.

* The basic plan does not support custom [TLS/SSL](../deployments/./tls_ssl.md) and [VPC Peering](../deployments/vpc_peering.md).

* Deployment has active client connections within 7 days.

  > If the deployment has no active connections for 7 days we will temporarily stop your free trial deployment. You can start your free trial deployment again by logging into the EMQX Cloud console.



## Start creating a free trial deployment

1. Login to [EMQX Cloud Console](https://www.emqx.com/en/signin?continue=https://cloud-intl.emqx.com/console/)

   ![log_in](./_assets/log_in.png)

2. Click the `Create Deployment` button

   ![console](./_assets/console.png)

3. Select `create free trial` under basic plan

   ![free_trial](./_assets/select_trial.png)

4. Review the EMQX Cloud Standard Terms of Service and Free Trial Declaration Terms.

   ![freetrial_term](./_assets/freetrial_terms.png)
   
5. Wait for 5 ~ 10 minutes until the deployment status is **running**

   ![free_trial_running](./_assets/running.png)



## Connect to your free trial deployment

Before connecting to your free trial deployment, you need to wait for the deployment status changed from **pending** to **running**

1. Get free trial connection information. 
   
    Click the free trial deployment to be connected, and you will enter the deployment details page. The corresponding ports of the protocol are as follows:
    | Protocol            | Port  |
    | ------------------- | ----- |
    | MQTT                | 11xxx |
    | MQTT over TLS       | 11xxx |
    | WebSockets          | 8083  |
    | WebSockets over TLS | 8084  |
    
    ![connections](./_assets/detail.png)
        
    
2. Add client authentication information.
   
    Click the EMQX Dashboard button on the deployment details page, you will enter the EMQX Dashboard, and click the **Users & ACL** menu on the left

    ![add_users](./_assets/auth.png)

3. Connect to free trial deployment with MQTT X
   EMQX Cloud recommends using [MQTT X](https://mqttx.app/) to test the connection.

   - MQTT connection

     ![mqttx_mqtts](./_assets/mqttx_connect.png)

   - WebSockets connection
     
     ![mqttx_ws](./_assets/mqttx_ws.png)

4. [Use SDK or other tools to connect to the free trial deployments](../connect_to_deployments/overview.md)