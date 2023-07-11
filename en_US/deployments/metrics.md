# Metrics

The metrics provide key data status and changes of deployments over a period of time. You can enter the metrics page by clicking on the Metrics in the menu on the deployment overview.

## Serverless

The metric page of serverless deployment provides 5 types of metrics: sessions, subscriptions, messages, packets, and dropped messages. You can view the corresponding charts for each type of metric and detailed information at a certain point in time.


### Sessions
The chart displays the number of concurrent sessions within a specified time period. The number of sessions include offline clients that have enabled [Persistent sessions](https://www.emqx.com/en/blog/mqtt-session).

<img src="./_assets/metric_serverless_1.png" alt="metrics_detail" style="zoom: 33%;" />

### Subscriptions

The chart displays the total number of subscriptions within the selected time period.

<img src="./_assets/metric_serverless_2.png" alt="metrics_detail" style="zoom: 33%;" />


### Messages
The chart display a chart of inbound and outbound messages within the selected time period, showing the number of messages received and sent by the deployment.

- The inbound messages are the messages recieved from the device or application.
- The outbound messages are the messages sent to the device or application.

<img src="./_assets/metric_serverless_3.png" alt="metrics_detail" style="zoom: 33%;" />


### Packets

The packets chart shows the traffic of the messages received and sent by the deployment during the selected time period, including the following three types of data:

- Total packets: Total traffic of packets received and sent.
- Sent packets: The traffic of packets sent to the device or application.
- Recieved packets: The traffic of packets recieved from the device or application.

<img src="./_assets/metric_serverless_4.png" alt="metrics_detail" style="zoom: 33%;" />


### Dropped Messages

The dreopped message chart shows the messages that were discarded during the selected time period, which were discarded during the sending phase. Dropped messages may be due to reasons such as being too large in size, the message queue being full, or expiration. Dropped messages due to not being subscribed **will not be included** in this chart.

<img src="./_assets/metric_serverless_5.png" alt="metrics_detail" style="zoom: 33%;" />


## Dedicated / BYOC

The metric for Dedicated and BYOC deployment provide 5 types of metrics: sessions, subscriptions, message, packets, and dropped messages. You can view charts corresponding to each type of metric, as well as detailed information at a specific time point. For some metrics, the corresponding metric in the API is indicated. If you need to learn and view more metrics, you can retrieve more metric through the [API - Metrics](../api/metrics.md).

::: tip
If there is no corresponding API metric in the table, it means that the metric cannot be retrieved from the API.
:::


### Sessions
The chart displays the number of concurrent sessions within a specified time period. The number of sessions include offline clients that have enabled [Persistent sessions](https://www.emqx.com/en/blog/mqtt-session). The chart provides three metrics:


|Metrics in Metrics API       |   Description                                   |
| ----------------- | :--------------------------------------- |
| - | Concurrent sessions. |
| client.connected | The number of connected sessions at the moment.             |
| client.disconnected | The number of disconnected sessions at the moment.   |


<img src="./_assets/metric_dedicated_1.png" alt="metrics_detail" style="zoom: 33%;" />

### Subscriptions
The chart provides three metrics to display the subscription status within the selected time period.

|Metrics in Metrics API       |   Description                                   |
| ----------------- | :--------------------------------------- |
| - | Total number of subscriptions. |
| client.subscribe | The number of subscription at the moment.             |
| client.unsubscribe | The number of unsubscription at the moment.   |

<img src="./_assets/metric_dedicated_2.png" alt="metrics_detail" style="zoom: 33%;" />

### Messages

The chart provides 2 metrics, showing the number of messages received and sent during the selected time period.

|Metrics in Metrics API       |   Description                                   |
| ----------------- | :--------------------------------------- |
| messages.received | The number of messages recieved from device or application at the moment.             |
| messages.sent | The number of messages sent to device or application at the moment.   |

<img src="./_assets/metric_dedicated_3.png" alt="metrics_detail" style="zoom: 33%;" />



### Packets
The chart provides 2 metrics, showing the traffic of messages received and sent during the selected time period.

| Metrics in Metrics API   | Description                  |
| ------------------ | :--------------------------- |
| bytes.received    | Kilobytes of messages packet reveived from device or application at the moment.      |
| bytes.sent | Kilobytes of messages packet sent to device or application at the moment.  |

<img src="./_assets/metric_dedicated_4.png" alt="metrics_detail" style="zoom: 33%;" />

### Dropped messages

The chart shows the number of dropped messages due to lack of subscription and messages discarded during the sending phase deployed within the selected time period.

- The dropped messages for unsubscribed refers to the absence of a subscription to the topic, and all messages sent to that topic will be discarded.
- The dropped messages in delivery may be due to reasons such as the message being too large in size, the message queue being full, or expiration.

| Metrics in Metrics API   | Description                  |
| ------------------ | :--------------------------- |
| messages.dropped.no_subscribers   | The dropped messages for unsubscribed to topic. |
| delivery.dropped | The dropped messages in delivery. |

<img src="./_assets/metric_dedicated_5.png" alt="metrics_detail" style="zoom: 33%;" />


