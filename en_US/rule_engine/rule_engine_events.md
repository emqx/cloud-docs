# Event Topics

The Rule of Data Integrations provides several event topics available for FROM clause.

| Event topic name             | Explanation          |
| ---------------------------- | -------------------- |
| $events/client_connected     | Client connect       |
| $events/client_disconnected  | Client disconnect    |
| $events/message_delivered    | Message delivery     |
| $events/message_acked        | Message acknowledged |
| $events/message_dropped      | Message dropped      |
| $events/session_subscribed   | Subscribe            |
| $events/session_unsubscribed | Unsubscribe          |

This article will introduce the useage of event topics, and the meaning of each field from three aspects: client connect and disconnect events, message events, topic subscribe and unsubscribe events.

## Client connect and disconnect events

### Client connect

The topic of client connect is `$events/client_connected`, click on Rules on the left menu bar → Rules, click on Create and enter the following rule to match the SQL statement.

   ```sql
    SELECT
        *
    FROM
        "$events/client_connected"
   ```

You can test the SQL, view the return field after firing this rule.
![client_connected](./_assets/rule_engine_event_client_connected.png)

The fields are explained as follows.

| field           | Explanation                             |
| --------------- | --------------------------------------- |
| clean_start     | MQTT clean_start                        |
| clientid        | Client ID                               |
| connected_at    | Terminal connection completion time (s) |
| event           | Event type, fixed at "client.connected" |
| expiry_interval | MQTT Session Expiration time            |
| is_bridge       | Whether it is MQTT bridge connection    |
| keepalive       | MQTT keepalive interval                 |
| mountpoint      | Mountpoint for bridging messages        |
| node            | Node name of the trigger event          |
| peername        | IPAddress and Port of terminal          |
| proto_name      | Protocol name                           |
| proto_ver       | Protocol version                        |
| sockname        | IPAddress and Port listened by emqx     |
| timestamp       | Event trigger time (ms)                 |
| username        | Current MQTT username                   |


### Client disconnect

The topic of client disconnect is `$events/client_disconnected`, click on Rules on the left menu bar → Rules, click on Create and enter the following rule to match the SQL statement.

   ```sql
    SELECT
        *
    FROM
        "$events/client_disconnected"
   ```  

You can test the SQL, view the return field after firing this rule.
![client_disconnected](./_assets/rule_engine_event_client_disconnected.png)

The fields are explained as follows.

| field           | Explanation                                |
| --------------- | ------------------------------------------ |
| clientid        | Client ID                                  |
| disconnected_at | Terminal disconnection completion time (s) |
| event           | Event type, fixed at "client.disconnected" |
| node            | Node name of the trigger event             |
| peername        | IPAddress and Port of terminal             |
| sockname        | IPAddress and Port listened by emqx        |
| timestamp       | Event trigger time (ms)                    |
| username        | Current MQTT username                      |
| peername        | IPAddress and Port of terminal             |
| reason          | Reason for disconnection of terminal       |

Here are some common reasons for client disconnections.

| types                    | reason                                                                                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| normal                   | MQTT client disconnects normally                                                                                                                                                                                                     |
| kicked                   | Using the REST API to kick out clients                                                                                                                                                                                               |
| keepalive_timeout        | MQTT keepalive timeout                                                                                                                                                                                                               |
| not_authorized           | Authentication fails, or Pub/Sub without permission will actively disconnect the client when acl_nomatch = disconnect                                                                                                                |
| tcp_closed               | The TCP connection is actively closed by the client                                                                                                                                                                                  |
| receive_maximum_exceeded | When a client sends a qos2 message, a large number of messages pile up on the MQTT Broker because it does not reply to the PUBREL in time. When the number of message pileups reaches the upper limit, EMQX will actively disconnect |
| internal_error           | Malformed packet parsing error                                                                                                                                                                                                       |
| einval                   | EMQX wants to send a message to the client, but the Socket has been disconnected                                                                                                                                                     |
| function_clause          | MQTT packet format error                                                                                                                                                                                                             |
| etimedout                | TCP send timeout (no TCP ACK response received)                                                                                                                                                                                      |
| proto_unexpected_c       | MQTT connection request received repeatedly when there is already an MQTT connection                                                                                                                                                 |
| idle_timeout             | 15s after the TCP connection is established, the connect message has not been received                                                                                                                                               |
| others                   | Please refer to [MQTT Reason Code and ACK](https://www.emqx.com/en/blog/mqtt5-new-features-reason-code-and-ack)                                                                                                                      |

## Message events

### Message delivery

The topic of client disconnect is `$events/message_delivered`, click on Rules on the left menu bar → Rules, click on Create and enter the following rule to match the SQL statement.

   ```sql
    SELECT
        *
    FROM
        "$events/message_delivered"
   ```  

You can test the SQL, view the return field after firing this rule.
![message_delivered](./_assets/rule_engine_event_message_delivered.png)

The fields are explained as follows.

| field               | Explanation                                   |
| ------------------- | --------------------------------------------- |
| clientid            | Client ID                                     |
| event               | Event type, fixed at "message.delivered"      |
| flags               | MQTT Message flags                            |
| from_clientid       | Message source client ID                      |
| from_username       | Message source username                       |
| id                  | MQTT message ID                               |
| node                | Node name of the trigger event                |
| payload             | MQTT payload                                  |
| peerhost            | Client IPAddress                              |
| publish_received_at | Time when PUBLISH message reaches Broker (ms) |
| qos                 | Enumeration of message QoS 0,1,2              |
| timestamp           | Event trigger time (ms)                       |
| topic               | MQTT topic                                    |
| username            | Current MQTT username                         |


### Message acknowledged

The topic of client disconnect is `$events/message_acked`, click on Rules on the left menu bar → Rules, click on Create and enter the following rule to match the SQL statement.

   ```sql
    SELECT
        *
    FROM
        "$events/message_acked"
   ```  

You can test the SQL, view the return field after firing this rule.
![client_acked](./_assets/rule_engine_event_client_acked.png)

The fields are explained as follows.

| field               | Explanation                                   |
| ------------------- | --------------------------------------------- |
| clientid            | Client ID                                     |
| event               | Event type, fixed at "message.acked"          |
| flags               | MQTT message flags                            |
| from_clientid       | Message source client ID                      |
| from_username       | Message source username                       |
| id                  | MQTT message ID                               |
| node                | Node name of the trigger event                |
| payload             | MQTT payload                                  |
| peerhost            | Client IPAddress                              |
| publish_received_at | Time when PUBLISH message reaches Broker (ms) |
| qos                 | Enumeration of message QoS 0,1,2              |
| timestamp           | Event trigger time (ms)                       |
| topic               | MQTT topic                                    |
| username            | Current MQTT username                         |


### Message dropped

The topic of client disconnect is `$events/message_dropped`, click on Rules on the left menu bar → Rules, click on Create and enter the following rule to match the SQL statement.

   ```sql
    SELECT
        *
    FROM
        "$events/message_dropped"
   ```  

You can test the SQL, view the return field after firing this rule.
![client_dropped](./_assets/rule_engine_event_client_dropped.png)

The fields are explained as follows.

| field               | Explanation                                   |
| ------------------- | --------------------------------------------- |
| clientid            | Client ID                                     |
| event               | Event type, fixed at "message.dropped"        |
| flags               | MQTT message flags                            |
| id                  | MQTT message ID                               |
| node                | Node name of the trigger event                |
| payload             | MQTT payload                                  |
| peerhost            | Client IPAddress                              |
| publish_received_at | Time when PUBLISH message reaches Broker (ms) |
| qos                 | Enumeration of message QoS 0,1,2              |
| reason              | Reason for message dropped                    |
| timestamp           | Event trigger time (ms)                       |
| topic               | MQTT topic                                    |
| username            | Current MQTT username                         |

## Topic subscribe and unsubscribe events

### Subscribe

The topic of client disconnect is `$events/session_subscribed`, click on Rules on the left menu bar → Rules, click on Create and enter the following rule to match the SQL statement.

   ```sql
    SELECT
        *
    FROM
        "$events/session_subscribed"
   ```  

You can test the SQL, view the return field after firing this rule.
![session_subscribed](./_assets/rule_engine_event_session_subscribed.png)

The fields are explained as follows.

| field     | Explanation                               |
| --------- | ----------------------------------------- |
| clientid  | Client ID                                 |
| event     | Event type, fixed at "session.subscribed" |
| node      | Node name of the trigger event            |
| peerhost  | Client IPAddress                          |
| qos       | Enumeration of message QoS 0,1,2          |
| timestamp | Event trigger time (ms)                   |
| topic     | MQTT topic                                |
| username  | Current MQTT username                     |

### Unsubscribe

The topic of client disconnect is `$events/session_unsubscribed`, click on Rules on the left menu bar → Rules, click on Create and enter the following rule to match the SQL statement.

   ```sql
    SELECT
        *
    FROM
        "$events/session_unsubscribed"
   ```  

You can test the SQL, view the return field after firing this rule.
![session_unsubscribed](./_assets/rule_engine_event_session_unsubscribed.png)

The fields are explained as follows.

| field     | Explanation                                 |
| --------- | ------------------------------------------- |
| clientid  | Client ID                                   |
| event     | Event type, fixed at "session.unsubscribed" |
| node      | Node name of the trigger event              |
| peerhost  | Client IPAddress                            |
| qos       | Enumeration of message QoS 0,1,2            |
| timestamp | Event trigger time (ms)                     |
| topic     | MQTT topic                                  |
| username  | Current MQTT username                       |
