# Prometheus 监控

EMQX Platform 提供了 Prometheus API ，您可以轻松调用 API 来监控 EMQX Platform 的关键指标。
在本文中我们将介绍如何配置 Prometheus 服务，从 EMQX Platform API 读取关键指标，以及如何使用 Grafana 模版查看指标。

::: warning 注意
该功能仅适用于**专有版部署**。
:::

## API 配置

在 EMQX Platform 部署控制台的**概览**页面找到**部署 API Key**，获取到 API 地址，点击**新建应用**，获取 APP ID 和 APP Secret。

![cloud_prometheus_api](./_assets/prometheus_api.png)


### 集群指标 URI

GET /deployment_metrics

返回供 Prometheus 采集的集群指标。

**查询参数:**

无

#### 请求消息

无

#### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/deployment_metrics
```

#### 响应示例

```prometheus
# HELP deployment_emqx_connections_count The current number of connections for the current cluster, including active connections
# TYPE deployment_emqx_connections_count gauge
deployment_emqx_connections_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_messages_rate The current rate of messages sent and received per second for the current cluster
# TYPE deployment_emqx_messages_rate gauge
deployment_emqx_messages_rate{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_messages_receive_rate The current rate of message receiving
# TYPE deployment_emqx_messages_receive_rate gauge
deployment_emqx_messages_receive_rate{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_messages_send_rate The current rate of messages sent per second for the current cluster
# TYPE deployment_emqx_messages_send_rate gauge
deployment_emqx_messages_send_rate{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_authentication_failure Number of failed authentications
# TYPE deployment_emqx_metrics_authentication_failure counter
deployment_emqx_metrics_authentication_failure{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 1
# HELP deployment_emqx_metrics_authentication_success Number of successful authentications
# TYPE deployment_emqx_metrics_authentication_success counter
deployment_emqx_metrics_authentication_success{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 8
# HELP deployment_emqx_metrics_authentication_success_anonymous Number of successful anonymous authentications
# TYPE deployment_emqx_metrics_authentication_success_anonymous counter
deployment_emqx_metrics_authentication_success_anonymous{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_authorization_allow Number of successful authorizations
# TYPE deployment_emqx_metrics_authorization_allow counter
deployment_emqx_metrics_authorization_allow{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_authorization_cache_hit Number of cache hits during authorization
# TYPE deployment_emqx_metrics_authorization_cache_hit counter
deployment_emqx_metrics_authorization_cache_hit{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_authorization_cache_miss Number of cache misses during authorization
# TYPE deployment_emqx_metrics_authorization_cache_miss counter
deployment_emqx_metrics_authorization_cache_miss{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_authorization_deny Number of authorization denies
# TYPE deployment_emqx_metrics_authorization_deny counter
deployment_emqx_metrics_authorization_deny{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_authorization_matched_allow Number of successful authorization matches
# TYPE deployment_emqx_metrics_authorization_matched_allow counter
deployment_emqx_metrics_authorization_matched_allow{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_authorization_matched_deny Number of authorization deny matches
# TYPE deployment_emqx_metrics_authorization_matched_deny counter
deployment_emqx_metrics_authorization_matched_deny{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_authorization_nomatch Number of authorization no match
# TYPE deployment_emqx_metrics_authorization_nomatch counter
deployment_emqx_metrics_authorization_nomatch{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_authorization_superuser Number of superuser authorizations
# TYPE deployment_emqx_metrics_authorization_superuser counter
deployment_emqx_metrics_authorization_superuser{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_bytes_received Number of received bytes
# TYPE deployment_emqx_metrics_bytes_received counter
deployment_emqx_metrics_bytes_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 330
# HELP deployment_emqx_metrics_bytes_sent Number of sent bytes
# TYPE deployment_emqx_metrics_bytes_sent counter
deployment_emqx_metrics_bytes_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 196
# HELP deployment_emqx_metrics_channels_count sessions.count
# TYPE deployment_emqx_metrics_channels_count gauge
deployment_emqx_metrics_channels_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_channels_max session.max
# TYPE deployment_emqx_metrics_channels_max gauge
deployment_emqx_metrics_channels_max{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 2
# HELP deployment_emqx_metrics_client_auth_anonymous Number of client's final anonymous login
# TYPE deployment_emqx_metrics_client_auth_anonymous counter
deployment_emqx_metrics_client_auth_anonymous{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_client_authenticate client.authenticate hook trigger times
# TYPE deployment_emqx_metrics_client_authenticate counter
deployment_emqx_metrics_client_authenticate{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 9
# HELP deployment_emqx_metrics_client_authorize client.authorize hook trigger times
# TYPE deployment_emqx_metrics_client_authorize counter
deployment_emqx_metrics_client_authorize{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_client_connack client.connack hook trigger times
# TYPE deployment_emqx_metrics_client_connack counter
deployment_emqx_metrics_client_connack{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 9
# HELP deployment_emqx_metrics_client_connect client.connect hook trigger times
# TYPE deployment_emqx_metrics_client_connect counter
deployment_emqx_metrics_client_connect{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 9
# HELP deployment_emqx_metrics_client_connected client.connected hook trigger times
# TYPE deployment_emqx_metrics_client_connected counter
deployment_emqx_metrics_client_connected{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 8
# HELP deployment_emqx_metrics_client_disconnected client.disconnected hook trigger times
# TYPE deployment_emqx_metrics_client_disconnected counter
deployment_emqx_metrics_client_disconnected{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 8
# HELP deployment_emqx_metrics_client_subscribe client.subscribe hook trigger times
# TYPE deployment_emqx_metrics_client_subscribe counter
deployment_emqx_metrics_client_subscribe{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_client_unsubscribe client.unsubscribe hook trigger times
# TYPE deployment_emqx_metrics_client_unsubscribe counter
deployment_emqx_metrics_client_unsubscribe{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_cluster_nodes_running Number of running nodes in the cluster
# TYPE deployment_emqx_metrics_cluster_nodes_running gauge
deployment_emqx_metrics_cluster_nodes_running{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 2
# HELP deployment_emqx_metrics_cluster_nodes_stopped Number of stopped nodes in the cluster
# TYPE deployment_emqx_metrics_cluster_nodes_stopped gauge
deployment_emqx_metrics_cluster_nodes_stopped{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_cluster_sessions_count Number of sessions in the cluster
# TYPE deployment_emqx_metrics_cluster_sessions_count gauge
deployment_emqx_metrics_cluster_sessions_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_cluster_sessions_max Historical maximum number of sessions in the cluster
# TYPE deployment_emqx_metrics_cluster_sessions_max gauge
deployment_emqx_metrics_cluster_sessions_max{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 1
# HELP deployment_emqx_metrics_connections_count Current connections
# TYPE deployment_emqx_metrics_connections_count gauge
deployment_emqx_metrics_connections_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_connections_max Historical maximum number of connections
# TYPE deployment_emqx_metrics_connections_max gauge
deployment_emqx_metrics_connections_max{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 2
# HELP deployment_emqx_metrics_delayed_count Number of delayed messages
# TYPE deployment_emqx_metrics_delayed_count gauge
deployment_emqx_metrics_delayed_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_delayed_max Historical maximum number of delayed messages
# TYPE deployment_emqx_metrics_delayed_max gauge
deployment_emqx_metrics_delayed_max{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_delivery_dropped Total number of messages that were dropped when sent
# TYPE deployment_emqx_metrics_delivery_dropped counter
deployment_emqx_metrics_delivery_dropped{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_delivery_dropped_expired Number of messages that were dropped due to message expiration when sending
# TYPE deployment_emqx_metrics_delivery_dropped_expired counter
deployment_emqx_metrics_delivery_dropped_expired{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_delivery_dropped_no_local Number of messages that were dropped due to the No Local subscription option when sending
# TYPE deployment_emqx_metrics_delivery_dropped_no_local counter
deployment_emqx_metrics_delivery_dropped_no_local{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_delivery_dropped_qos0_msg Number of messages with QoS of 0 that were dropped because the message queue was full when sending
# TYPE deployment_emqx_metrics_delivery_dropped_qos0_msg counter
deployment_emqx_metrics_delivery_dropped_qos0_msg{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_delivery_dropped_queue_full Number of messages with a non-zero QoS that were dropped because the message queue was full when sending
# TYPE deployment_emqx_metrics_delivery_dropped_queue_full counter
deployment_emqx_metrics_delivery_dropped_queue_full{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_delivery_dropped_too_large Number of messages that were dropped because the length exceeded the limit when sending
# TYPE deployment_emqx_metrics_delivery_dropped_too_large counter
deployment_emqx_metrics_delivery_dropped_too_large{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_live_connections_count Number of live connections
# TYPE deployment_emqx_metrics_live_connections_count gauge
deployment_emqx_metrics_live_connections_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_live_connections_max Historical maximum number of live connections
# TYPE deployment_emqx_metrics_live_connections_max gauge
deployment_emqx_metrics_live_connections_max{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 2
# HELP deployment_emqx_metrics_messages_acked Number of acked messages
# TYPE deployment_emqx_metrics_messages_acked counter
deployment_emqx_metrics_messages_acked{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_delayed Number of delay-published messages stored by EMQX Broker
# TYPE deployment_emqx_metrics_messages_delayed counter
deployment_emqx_metrics_messages_delayed{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_delivered Number of messages forwarded to the subscription process internally by EMQX Broker
# TYPE deployment_emqx_metrics_messages_delivered counter
deployment_emqx_metrics_messages_delivered{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_dropped Total number of messages dropped by EMQX Broker before forwarding to the subscription process
# TYPE deployment_emqx_metrics_messages_dropped counter
deployment_emqx_metrics_messages_dropped{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_dropped_expired Number of messages that were dropped due to message expiration when receiving
# TYPE deployment_emqx_metrics_messages_dropped_expired counter
deployment_emqx_metrics_messages_dropped_expired{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_dropped_no_subscribers Number of messages dropped due to no subscribers
# TYPE deployment_emqx_metrics_messages_dropped_no_subscribers counter
deployment_emqx_metrics_messages_dropped_no_subscribers{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_forward Number of messages forwarded to other nodes
# TYPE deployment_emqx_metrics_messages_forward counter
deployment_emqx_metrics_messages_forward{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_publish Number of messages published in addition to system messages
# TYPE deployment_emqx_metrics_messages_publish counter
deployment_emqx_metrics_messages_publish{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_qos0_received Number of QoS 0 messages received from clients
# TYPE deployment_emqx_metrics_messages_qos0_received counter
deployment_emqx_metrics_messages_qos0_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_qos0_sent Number of QoS 0 messages sent to clients
# TYPE deployment_emqx_metrics_messages_qos0_sent counter
deployment_emqx_metrics_messages_qos0_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_qos1_received Number of QoS 2 messages received from clients
# TYPE deployment_emqx_metrics_messages_qos1_received counter
deployment_emqx_metrics_messages_qos1_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_qos1_sent Number of QoS 1 messages sent to clients
# TYPE deployment_emqx_metrics_messages_qos1_sent counter
deployment_emqx_metrics_messages_qos1_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_qos2_received Number of QoS 1 messages received from clients
# TYPE deployment_emqx_metrics_messages_qos2_received counter
deployment_emqx_metrics_messages_qos2_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_qos2_sent Number of QoS 2 messages sent to clients
# TYPE deployment_emqx_metrics_messages_qos2_sent counter
deployment_emqx_metrics_messages_qos2_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_received Number of messages received from the client, which is equal to the sum of messages.qos0.received,messages.qos1.received, and messages.qos2.received
# TYPE deployment_emqx_metrics_messages_received counter
deployment_emqx_metrics_messages_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_retained Number of retained messages stored by EMQX Broker
# TYPE deployment_emqx_metrics_messages_retained counter
deployment_emqx_metrics_messages_retained{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_messages_sent The number of messages sent to the client, which is equal to the sum of messages.qos0.sent,messages.qos1.sent, and messages.qos2.sent
# TYPE deployment_emqx_metrics_messages_sent counter
deployment_emqx_metrics_messages_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_auth_received Number of received AUTH packets
# TYPE deployment_emqx_metrics_packets_auth_received counter
deployment_emqx_metrics_packets_auth_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_auth_sent Number of sent AUTH packets
# TYPE deployment_emqx_metrics_packets_auth_sent counter
deployment_emqx_metrics_packets_auth_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_connack_auth_error Number of sent CONNACK messages with reason codes 0x86 and 0x87
# TYPE deployment_emqx_metrics_packets_connack_auth_error counter
deployment_emqx_metrics_packets_connack_auth_error{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 1
# HELP deployment_emqx_metrics_packets_connack_error Number of sent CONNACK packets where reason code is not 0x00. The value of this indicator is greater than or equal to the value of packets.connack.auth_error
# TYPE deployment_emqx_metrics_packets_connack_error counter
deployment_emqx_metrics_packets_connack_error{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 1
# HELP deployment_emqx_metrics_packets_connack_sent Number of sent CONNACK packets
# TYPE deployment_emqx_metrics_packets_connack_sent counter
deployment_emqx_metrics_packets_connack_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 9
# HELP deployment_emqx_metrics_packets_connect Number of sent CONNECT packets
# TYPE deployment_emqx_metrics_packets_connect counter
deployment_emqx_metrics_packets_connect{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 9
# HELP deployment_emqx_metrics_packets_disconnect_received Number of received DISCONNECT packets
# TYPE deployment_emqx_metrics_packets_disconnect_received counter
deployment_emqx_metrics_packets_disconnect_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 4
# HELP deployment_emqx_metrics_packets_disconnect_sent Number of sent DISCONNECT packets
# TYPE deployment_emqx_metrics_packets_disconnect_sent counter
deployment_emqx_metrics_packets_disconnect_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_pingreq_received Number of received PINGREQ packets
# TYPE deployment_emqx_metrics_packets_pingreq_received counter
deployment_emqx_metrics_packets_pingreq_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_pingresp_sent Number of sent PUBRESP packets
# TYPE deployment_emqx_metrics_packets_pingresp_sent counter
deployment_emqx_metrics_packets_pingresp_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_puback_inuse Number of received PUBACK messages with occupied identifiers
# TYPE deployment_emqx_metrics_packets_puback_inuse counter
deployment_emqx_metrics_packets_puback_inuse{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_puback_missed Number of received PUBACK packets with unknown identifiers
# TYPE deployment_emqx_metrics_packets_puback_missed counter
deployment_emqx_metrics_packets_puback_missed{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_puback_received Number of received PUBACK packets
# TYPE deployment_emqx_metrics_packets_puback_received counter
deployment_emqx_metrics_packets_puback_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_puback_sent Number of sent PUBACK packets
# TYPE deployment_emqx_metrics_packets_puback_sent counter
deployment_emqx_metrics_packets_puback_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_pubcomp_inuse Number of received PUBCOMP messages with occupied identifiers
# TYPE deployment_emqx_metrics_packets_pubcomp_inuse counter
deployment_emqx_metrics_packets_pubcomp_inuse{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_pubcomp_missed Number of missed PUBCOMP packets
# TYPE deployment_emqx_metrics_packets_pubcomp_missed counter
deployment_emqx_metrics_packets_pubcomp_missed{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_pubcomp_received Number of received PUBCOMP packets
# TYPE deployment_emqx_metrics_packets_pubcomp_received counter
deployment_emqx_metrics_packets_pubcomp_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_pubcomp_sent Number of sent PUBCOMP packets
# TYPE deployment_emqx_metrics_packets_pubcomp_sent counter
deployment_emqx_metrics_packets_pubcomp_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_publish_auth_error Number of received PUBLISH packets that failed the ACL check
# TYPE deployment_emqx_metrics_packets_publish_auth_error counter
deployment_emqx_metrics_packets_publish_auth_error{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_publish_dropped Number of PUBLISH packets that were discarded due to the receiving limit
# TYPE deployment_emqx_metrics_packets_publish_dropped counter
deployment_emqx_metrics_packets_publish_dropped{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_publish_error Number of received PUBLISH packets that cannot be published
# TYPE deployment_emqx_metrics_packets_publish_error counter
deployment_emqx_metrics_packets_publish_error{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_publish_inuse Number of received PUBLISH packets with occupied packet identifiers
# TYPE deployment_emqx_metrics_packets_publish_inuse counter
deployment_emqx_metrics_packets_publish_inuse{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_publish_received Number of received PUBLISH packets
# TYPE deployment_emqx_metrics_packets_publish_received counter
deployment_emqx_metrics_packets_publish_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_publish_sent Number of sent PUBLISH packets
# TYPE deployment_emqx_metrics_packets_publish_sent counter
deployment_emqx_metrics_packets_publish_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_pubrec_inuse Number of received PUBREC messages with occupied identifiers
# TYPE deployment_emqx_metrics_packets_pubrec_inuse counter
deployment_emqx_metrics_packets_pubrec_inuse{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_pubrec_missed Number of received PUBREC packets with unknown identifiers
# TYPE deployment_emqx_metrics_packets_pubrec_missed counter
deployment_emqx_metrics_packets_pubrec_missed{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_pubrec_received Number of received PUBREC packets
# TYPE deployment_emqx_metrics_packets_pubrec_received counter
deployment_emqx_metrics_packets_pubrec_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_pubrec_sent Number of sent PUBREC packets
# TYPE deployment_emqx_metrics_packets_pubrec_sent counter
deployment_emqx_metrics_packets_pubrec_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_pubrel_missed Number of received PUBREL packets with unknown identifiers
# TYPE deployment_emqx_metrics_packets_pubrel_missed counter
deployment_emqx_metrics_packets_pubrel_missed{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_pubrel_received Number of received PUBREL packets
# TYPE deployment_emqx_metrics_packets_pubrel_received counter
deployment_emqx_metrics_packets_pubrel_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_pubrel_sent Number of sent PUBREL packets
# TYPE deployment_emqx_metrics_packets_pubrel_sent counter
deployment_emqx_metrics_packets_pubrel_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_received Number of received packets
# TYPE deployment_emqx_metrics_packets_received counter
deployment_emqx_metrics_packets_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 13
# HELP deployment_emqx_metrics_packets_sent Number of sent packets
# TYPE deployment_emqx_metrics_packets_sent counter
deployment_emqx_metrics_packets_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 9
# HELP deployment_emqx_metrics_packets_suback_sent Number of sent SUBACK packets
# TYPE deployment_emqx_metrics_packets_suback_sent counter
deployment_emqx_metrics_packets_suback_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_subscribe_auth_error Number of received SUBACK packets that failed the ACL check
# TYPE deployment_emqx_metrics_packets_subscribe_auth_error counter
deployment_emqx_metrics_packets_subscribe_auth_error{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_subscribe_error Number of received SUBSCRIBE packets with failed subscriptions
# TYPE deployment_emqx_metrics_packets_subscribe_error counter
deployment_emqx_metrics_packets_subscribe_error{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_subscribe_received Number of received SUBSCRIBE packets
# TYPE deployment_emqx_metrics_packets_subscribe_received counter
deployment_emqx_metrics_packets_subscribe_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_unsuback_sent Number of sent UNSUBACK packets
# TYPE deployment_emqx_metrics_packets_unsuback_sent counter
deployment_emqx_metrics_packets_unsuback_sent{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_unsubscribe_error Number of received UNSUBSCRIBE packets with failed unsubscriptions
# TYPE deployment_emqx_metrics_packets_unsubscribe_error counter
deployment_emqx_metrics_packets_unsubscribe_error{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_packets_unsubscribe_received Number of received UNSUBSCRIBE packets
# TYPE deployment_emqx_metrics_packets_unsubscribe_received counter
deployment_emqx_metrics_packets_unsubscribe_received{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_retained_count Number of currently retained messages
# TYPE deployment_emqx_metrics_retained_count gauge
deployment_emqx_metrics_retained_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_retained_max Historical maximum number of retained messages
# TYPE deployment_emqx_metrics_retained_max gauge
deployment_emqx_metrics_retained_max{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_session_created session.created hook trigger times
# TYPE deployment_emqx_metrics_session_created counter
deployment_emqx_metrics_session_created{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 8
# HELP deployment_emqx_metrics_session_discarded session.discarded hook trigger times
# TYPE deployment_emqx_metrics_session_discarded counter
deployment_emqx_metrics_session_discarded{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_session_resumed session.resumed hook trigger times
# TYPE deployment_emqx_metrics_session_resumed counter
deployment_emqx_metrics_session_resumed{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_session_takenover session.takenover hook trigger times
# TYPE deployment_emqx_metrics_session_takenover counter
deployment_emqx_metrics_session_takenover{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_session_terminated session.terminated hook trigger times
# TYPE deployment_emqx_metrics_session_terminated counter
deployment_emqx_metrics_session_terminated{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 8
# HELP deployment_emqx_metrics_sessions_count Number of current sessions
# TYPE deployment_emqx_metrics_sessions_count gauge
deployment_emqx_metrics_sessions_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_sessions_max Historical maximum number of sessions
# TYPE deployment_emqx_metrics_sessions_max gauge
deployment_emqx_metrics_sessions_max{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 2
# HELP deployment_emqx_metrics_suboptions_count subscriptions.count
# TYPE deployment_emqx_metrics_suboptions_count gauge
deployment_emqx_metrics_suboptions_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_suboptions_max subscriptions.max
# TYPE deployment_emqx_metrics_suboptions_max gauge
deployment_emqx_metrics_suboptions_max{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_subscribers_count Number of current subscribers
# TYPE deployment_emqx_metrics_subscribers_count gauge
deployment_emqx_metrics_subscribers_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_subscribers_max Historical maximum number of subscribers
# TYPE deployment_emqx_metrics_subscribers_max gauge
deployment_emqx_metrics_subscribers_max{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_subscriptions_count Number of current subscriptions, including shared subscriptions
# TYPE deployment_emqx_metrics_subscriptions_count gauge
deployment_emqx_metrics_subscriptions_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_subscriptions_max Historical maximum number of subscriptions
# TYPE deployment_emqx_metrics_subscriptions_max gauge
deployment_emqx_metrics_subscriptions_max{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_subscriptions_shared_count Number of current shared subscriptions
# TYPE deployment_emqx_metrics_subscriptions_shared_count gauge
deployment_emqx_metrics_subscriptions_shared_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_subscriptions_shared_max Historical maximum number of shared subscriptions
# TYPE deployment_emqx_metrics_subscriptions_shared_max gauge
deployment_emqx_metrics_subscriptions_shared_max{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_topics_count Number of current topics
# TYPE deployment_emqx_metrics_topics_count gauge
deployment_emqx_metrics_topics_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_metrics_topics_max Historical maximum number of topics
# TYPE deployment_emqx_metrics_topics_max gauge
deployment_emqx_metrics_topics_max{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_sessions_count The current number of sessions for the current cluster, including active and inactive sessions
# TYPE deployment_emqx_sessions_count gauge
deployment_emqx_sessions_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_subscriptions_count The current number of subscriptions for the current cluster
# TYPE deployment_emqx_subscriptions_count gauge
deployment_emqx_subscriptions_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
# HELP deployment_emqx_topics_count The current number of topics for the current cluster
# TYPE deployment_emqx_topics_count gauge
deployment_emqx_topics_count{deployment_id="b9110d11",deployment_type="dedicated",platform="aliyun_en"} 0
```


### 数据集成指标 URI

GET /deployment_metrics/data_integration

返回供 Prometheus 采集的数据集成指标。

**查询参数:**

无

#### 请求消息

无

#### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/deployment_metrics/data_integration
```

#### 响应示例

```prometheus
# HELP deployment_emqx_resource_status The current status of a specific resource
# TYPE deployment_emqx_resource_status gauge
deployment_emqx_resource_status{deployment_id="gde1d4ab",deployment_type="dedicated",platform="aliyun_en",resource_id="http:connector-fe4fb3d3"} 1
# HELP deployment_emqx_rule_action_execution_count The execution count of a specific rule action
# TYPE deployment_emqx_rule_action_execution_count gauge
deployment_emqx_rule_action_execution_count{deployment_id="gde1d4ab",deployment_type="dedicated",execution_status="failed",platform="aliyun_en",rule_id="rule-3394ce25"} 0
deployment_emqx_rule_action_execution_count{deployment_id="gde1d4ab",deployment_type="dedicated",execution_status="success",platform="aliyun_en",rule_id="rule-3394ce25"} 0
deployment_emqx_rule_action_execution_count{deployment_id="gde1d4ab",deployment_type="dedicated",execution_status="taken",platform="aliyun_en",rule_id="rule-3394ce25"} 0
# HELP deployment_emqx_rule_matched_count The matching count of a specific rule
# TYPE deployment_emqx_rule_matched_count gauge
deployment_emqx_rule_matched_count{deployment_id="gde1d4ab",deployment_type="dedicated",match_status="exception",platform="aliyun_en",rule_id="rule-3394ce25"} 0
deployment_emqx_rule_matched_count{deployment_id="gde1d4ab",deployment_type="dedicated",match_status="failed",platform="aliyun_en",rule_id="rule-3394ce25"} 0
deployment_emqx_rule_matched_count{deployment_id="gde1d4ab",deployment_type="dedicated",match_status="matched",platform="aliyun_en",rule_id="rule-3394ce25"} 0
deployment_emqx_rule_matched_count{deployment_id="gde1d4ab",deployment_type="dedicated",match_status="no_result",platform="aliyun_en",rule_id="rule-3394ce25"} 0
deployment_emqx_rule_matched_count{deployment_id="gde1d4ab",deployment_type="dedicated",match_status="passed",platform="aliyun_en",rule_id="rule-3394ce25"} 0
# HELP deployment_emqx_rule_status The current status of a specific rule
# TYPE deployment_emqx_rule_status gauge
deployment_emqx_rule_status{deployment_id="gde1d4ab",deployment_type="dedicated",platform="aliyun_en",rule_id="rule-3394ce25"} 1
```


## Prometheus 配置

1. 安装 Prometheus：

    ```bash
    wget -c https://github.com/prometheus/prometheus/releases/download/v2.35.0-rc0/prometheus-2.35.0-rc0.linux-amd64.tar.gz
    tar xvfz prometheus-*.tar.gz
    ```

2. 修改配置文件。

    找到您的 Prometheus 服务指定的监控目录，按如下示例修改配置文件 prometheus.yml 的 `scrape_configs` section：

    ```bash
    scrape_configs:
      - job_name: 'emqx'
        scheme: 'https'
        static_configs:
          - targets: [ 'xxxx:8443' ]
        metrics_path: "/api/emqx_prometheus"
        params:
          type: [ "prometheus" ]
        basic_auth:
          username: 'APP ID'
          password: 'APP Secret'
    ```

3. 启动并检查服务状态。

    启动 Prometheus：

   ```bash
    ./prometheus --config.file=prometheus.yml
   ```

    通过本地 IP + 对应端⼝，如：x.x.x.x:9090 访问您的 Prometheus 服务，检查 Status - Targets 以确认新的 scrape_config 文件已被读取。如果状态显示异常，您可能需要检查配置文件，重新启动 Prometheus 服务。

   ![Prometheus_service](./_assets/prometheus_service.png)

## Grafana 配置

1. 安装并启动 Grafana：

   ```bash
    wget https://dl.grafana.com/enterprise/release/grafana-enterprise-8.4.6.linux-amd64.tar.gz
    tar -zxvf grafana-enterprise-8.4.6.linux-amd64.tar.gz
    ./bin/grafana-server
   ```

2. 配置 Grafana。

    通过本地 IP + 对应端⼝，如：x.x.x.x:3000， 访问 Grafana 的 Dashbroad。初始 ID 和密码都是 admin，初次登录请修改密码，登录进⼊后需添加 Data sources - Prometheus。

    ![Grafana](./_assets/grafana_data_sources.png)

3. 导⼊ Grafana 数据模板。

    EMQX Platform 提供了 Grafana 的 Dashboard 的模板文件。这些模板包含了所有 EMQX Platform 监控数据的展示。用户可直接导入到 Grafana 中，生成显示 EMQX 监控状态的图表。

    模板文件位于：[grafana_template.json](https://github.com/emqx/emqx-cloud-grafana)，可通过 "Upload JSON file" 的方式上传本地的 grafana_template.json ⽂件，或者通过 "Import via panel json" 手动编写。

    ![Grafana](./_assets/grafana_template.png)

## 指标详解

完成整套系统搭建并运行一段时间后，EMQX Platform Prometheus 收集到的数据将展示在 Grafana 上，包括客户端数、订阅数、主题数、消息数、报文数等业务信息历史统计，可以查看每种指标对应的展示图表，某个时间点的详细信息。

![Grafana](./_assets/emqx_grafana_metrics.png)

Prometheus 跟踪您的 EMQX Platform 部署的以下指标数据。

| 指标名                               | 指标类型 | 指标说明                            |
| ------------------------------------ | -------- | ----------------------------------- |
| deployment_emqx_connections_count                  | gauge    | 集群连接数                        |
| deployment_emqx_sessions_count                 | gauge    | 总 session 数量                        |
| deployment_emqx_messages_rate                    | gauge    | 消息总速率                        |
| deployment_emqx_messages_send_rate   | gauge    | 消息发送速率                        |
| deployment_emqx_messages_receive_rate          | gauge    | 消息接收速率                           |
| deployment_emqx_metrics_bytes_received         | gauge    | 接收消息字节数                           |
| deployment_emqx_metrics_bytes_sent             | gauge    | 发送消息字节数                      |
| deployment_emqx_metrics_retained_count                    | gauge    | 保留消息数量                          |
| deployment_emqx_metrics_messages_received        | counter    | 接收消息数量                  |
| deployment_emqx_metrics_messages_qos0_received      | counter    | 接收到的 QoS=0 消息的数量                      |
| deployment_emqx_metrics_messages_qos1_received      | counter    | 接收到的 QoS=1 消息的数量                  |
| deployment_emqx_metrics_messages_qos2_received      | counter    | 接收到的 QoS=2 消息的数量                      |
| deployment_emqx_metrics_messages_dropped            | counter    | 部署在接收阶段丢弃的消息数量                  |
| deployment_emqx_metrics_messages_dropped_expired    | counter    | 因为过期而丢弃的消息数量                        |
| deployment_emqx_metrics_messages_dropped_no_subscribers     | counter    | 因为没有订阅者而丢弃的消息数量                |
| deployment_emqx_metrics_messages_sent                | counter    | 发送消息数量                |
| deployment_emqx_metrics_messages_qos0_sent           | counter    | 发送的 QoS=0 消息的数量                      |
| deployment_emqx_metrics_messages_qos1_sent           | counter    | 发送的 QoS=1 消息的数量                          |
| deployment_emqx_metrics_messages_qos2_sent           | counter  | 发送的 QoS=2 消息的数量                            |
| deployment_emqx_metrics_delivery_dropped              | counter  | 部署在投递阶段丢弃的消息数量                          |
| deployment_emqx_metrics_delivery_dropped_too_large    | counter  | 因为过大而被丢弃的消息数量                        |
| deployment_emqx_metrics_delivery_dropped_queue_full   | counter  | 因为队列满了而被丢弃的消息数量                            |
| deployment_emqx_metrics_delivery_dropped_no_local     | counter  | 因为No local 而被丢弃的消息数量                            |
| deployment_emqx_metrics_delivery_dropped_expired      | counter  | 因为过期而被丢弃的消息数量                      |
| deployment_emqx_metrics_topics_count                    | gauge    | 主题数量                          |
| deployment_emqx_metrics_subscriptions_count            | gauge    | 订阅数量                  |
| deployment_emqx_metrics_subscriptions_shared_count     | gauge    | 共享订阅数量                      |
| deployment_emqx_metrics_subscribers_count    | gauge  | 订阅者数量                   |
| deployment_emqx_metrics_authentication_success       | counter  | 认证成功数量                   |
| deployment_emqx_metrics_authentication_failure           | counter  | 认证失败数量               |
| deployment_emqx_metrics_client_authorize      | counter  | 客户端鉴权数量                     |
| deployment_emqx_metrics_authorization_allow         | counter  | 客户端鉴权成功数量                     |
| deployment_emqx_metrics_authorization_deny    | counter  |  客户端鉴权拒接数量      |
| deployment_emqx_metrics_authorization_matched_allow    | counter  | 客户端鉴权成功匹配数量                  |
| deployment_emqx_metrics_authorization_matched_deny      | counter  | 客户端鉴权拒绝匹配数量                        |
| deployment_emqx_metrics_authorization_nomatch                | counter  | 客户端鉴权不匹配数量                        |
| deployment_emqx_metrics_packets_received             | counter  | 已接收报文数                  |
| deployment_emqx_metrics_packets_sent         | counter  | 已发送报文数                  |
| deployment_emqx_metrics_packets_connect_received           | counter  | 已接收 CONNET 报文数  |
| deployment_emqx_metrics_packets_connack_sent             | counter  | 已发送 CONNACK 报文数                  |
| deployment_emqx_metrics_packets_disconnect_received         | counter  | 已接收 DISCONNET 报文数                  |
| deployment_emqx_metrics_packets_disconnect_sent           | counter  | 已发送 DISCONNET 报文数  |
| deployment_emqx_metrics_packets_publish_received            | counter  | 已接收 PUB 报文数  |
| deployment_emqx_metrics_packets_publish_sent            | counter  | 已发送 PUB 报文数                     |
| deployment_emqx_metrics_packets_subscribe_received        | counter  | 已接收 SUB 报文数                     |
| deployment_emqx_metrics_packets_unsubscribe_received           | counter  | 已接收 UNSUB 报文数     |
| deployment_emqx_metrics_packets_pingreq_received           | counter  | 已接收 PING 报文数                    |
| deployment_emqx_metrics_packets_pingresp_sent         | counter  | 已发送 PING 报文数                    |
| deployment_emqx_metrics_packets_auth_received      | counter  | 已接收 AUTH 报文数      |
| deployment_emqx_metrics_packets_auth_sent            | counter  | 已发送 AUTH 报文数                 |
| deployment_emqx_rule_status        | gauge  | 规则状态                |
| deployment_emqx_rule_matched_rate          | gauge  | 匹配规则速率 |
| deployment_emqx_rule_matched_count           | gauge  | 匹配规则数量 |
| deployment_emqx_rule_action_execution_count             | gauge  | 执行规则数量                 |
