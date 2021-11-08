# Logs

EMQ X Cloud provides real-time online viewing of EMQ X logs



## View Deployment Logs

Click on the log page to jump to the deployment logs page, where you can view the deployment logs related messages

![view_log](./_assets/logs.png)



## Deployment Logs Analysis

| LOG                                                                                                               | Level    | reason                                                             | Solution                                             |
| ----------------------------------------------------------------------------------------------------------------- | -------  | ------------------------------------------------------------------ | ----------------------------------------------- |
| Client xxx (Username: 'xxx') login failed for not_authorized                                                      | warning  | Client connections with failed authentication                      | Check whether the client authentication configuration                              |
| Cannot publish message to xxx due to Not authorized.                                                              | warning  | Client connections with failed ACL                                 | Check whether the deployment ACL configuration                            |
| Parse failed for function_clause, [{emqx_frame,parse_utf8_string                                                  | warning  | Client connections with non-standard mqtt protocol                 | Check whether the MQTT protocol used by the client connection is a standard MQTT protocol |
| Dropped msg due to queue is full: Message(Id=xxx, QoS=1, Topic=xxx                                                | warning  | QoS 1 messages are discarded because the client is offline for a long time or the topic is not subscribed    | Check whether the topic to publish the message is subscribed and whether the subscribed client is online |
| Cannot publish messages to /acp_player/heartbeat due to Quota exceeded.                                           | warning  | The deployment has exceeded 1000 msg/sec message publishing rate   | Adjust the client transmission rate in time                             |
| Take action <<"data_to_mysql_xxx">> failed, continue next action, reason: {error,{data_to_mysql,disconnected}     | error    | The deployment rule engine MySQL resource exception                | Check the MySQL resources in the deployment rule engine                           |
| cluster_call error found, ResL: [{{emqx_web_hook_actions,on_resource_create}                                      | error    | The deployment rule engine Webhook resource exception              | Check the Webhook resources in the deployment rule engine                             |
| HTTP request failed with status code: 401                                                                         | error    | The deployment rule engine Webhook resource has many errors with a status of 401    | Check the authentication of WebHook resource configuration in the deployment rule engine |
| cluster_call error found, ResL: [{{emqx_bridge_kafka_actions,on_resource_create},{error,connect_kafka_server_fail | error    | The deployment rule engine Kafka resource exception                | Check the Kafka resources in the deployment rule engine |
| cluster_call error found, ResL: [{{emqx_bridge_kafka_actions,on_resource_create},{error,connect_kafka_server_fail | error    | The deployment rule engine SQL Template Configuration Error        | Check SQL configuration in the rules of the deployment rule engine  |