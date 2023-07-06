<!-- markdownlint-disable MD001 -->

# 部署指标

指标提供了一段时间范围内的部署的关键数据的状态和变化。可以在部署详情页，通过左侧的`指标`进入页面查看。

## Serverless 指标
Serverless 指标页面提供了连接数、流入流出消息、报文流量、订阅数、丢弃消息 5 种指标，可以查看每类指标对应的展示图表，某个时间点的详细信息。


#### 连接数
<img src="./_assets/metric_serverless_1.png" alt="metrics_detail" style="zoom: 33%;" />

展示了在选择时间段内，连接到部署的客户端的数量。这里连接的客户端数也包含了保留会话的离线客户端。[保留会话](https://www.emqx.com/zh/blog/mqtt-session)，即客户端断开连接时，会话仍然保持并保存离线消息，直到会话超时注销。


#### 订阅数
<img src="./_assets/metric_serverless_2.png" alt="metrics_detail" style="zoom: 33%;" />

展示在选择时间段内，部署的总订阅数。

#### 流入流出消息
<img src="./_assets/metric_serverless_3.png" alt="metrics_detail" style="zoom: 33%;" />

展示在选择时间段内，部署接收到的消息数以及发送出去的消息数。
- 部署接收到的消息为从设备或应用端发送到部署的消息数。
- 部署发送的消息为从部署发送到设备或应用端的消息。


#### 报文流量
<img src="./_assets/metric_serverless_4.png" alt="metrics_detail" style="zoom: 33%;" />

展示在选择时间段内，部署接收到的消息以及发送出去的消息报文流量。
- 接收和发送消息的报文总量。
- 接收报文流量为从设备或应用端发送到部署的消息的报文总量。
- 发送报文流量为从部署发送到设备或应用端的消息的报文总量。


#### 丢弃消息
<img src="./_assets/metric_serverless_5.png" alt="metrics_detail" style="zoom: 33%;" />

展示在选择时间段内，部署在发送阶段丢弃的消息。部署在发送阶段丢弃的消息可能是因为消息过大，消息队列满了，过期了等原因。因为没有订阅而丢弃的消息**不会**统计在这个指标中。



## 专有版 / BYOC 指标

专有版和 BYOC 提供了**连接数**、**流入流出消息**、**报文流量**、**订阅数**、**丢弃消息** 5 种指标，可以查看每类指标对应的展示图表，某个时间点的详细信息。对于有一些指标，标明了 API 中对应的指标名称，如果您需要了解和查看更多的指标，可以通过 [API - 指标](../api/metrics.md) 获取更多的指标信息。


#### 连接数

<img src="./_assets/metrics_dedicated_1.png" alt="metrics_detail" style="zoom: 33%;" />

展示了在选择时间段内，连接到部署的客户端的数量。这里连接的客户端数也包含了保留会话的离线客户端。[保留会话](https://www.emqx.com/zh/blog/mqtt-session)，即客户端断开连接时，会话仍然保持并保存离线消息，直到会话超时注销。图表提供 3 种指标：

|指标名称            | 描述                                     |
| ----------------- | :--------------------------------------- |
|    | 连接数 |
| client.connected |当前时刻新增的客户端数              |
| client.disconnected     | 当前时刻断开的客户端数      |


#### 订阅数
<img src="./_assets/metrics_dedicated_2.png" alt="metrics_detail" style="zoom: 33%;" />

展示在选择时间段内，部署的订阅数情况。提供 3 种指标：

|指标名称            | 描述                                     |
| ----------------- | :--------------------------------------- |
|  | 总订阅数|
| client.subscribe | 当前时刻新增订阅的数量  |
| client.unsubscribe    | 当前时刻取消订阅的数量  |



#### 流入流出消息
<img src="./_assets/metrics_dedicated_3.png" alt="metrics_detail" style="zoom: 33%;" />

展示在选择时间段内，部署接收到的消息数以及发送出去的消息数。提供 2 种指标：

|指标名称            | 描述                                     |
| ----------------- | :--------------------------------------- |
| messages.received | 部署接收到的消息为从设备或应用端发送到部署的消息数   |
| messages.sent     | 部署发送的消息为从部署发送到设备或应用端的消息   |



#### 报文流量
<img src="./_assets/metrics_dedicated_4.png" alt="metrics_detail" style="zoom: 33%;" />

展示在选择时间段内，部署接收到的消息以及发送出去的消息报文流量。提供 2 种指标：


|指标名称            | 描述                                     |
| ----------------- | :--------------------------------------- |
| bytes.received | 接收报文流量为从设备或应用端发送到部署的消息的报文总量（in KiB）  |
| bytes.sent     | 发送报文流量为从部署发送到设备或应用端的消息的报文总量（in KiB）  |




#### 丢弃消息
<img src="./_assets/metrics_dedicated_5.png" alt="metrics_detail" style="zoom: 33%;" />

展示在选择时间段内，因没有订阅而丢弃的消息数和部署在发送阶段丢弃的消息。
- 因没有订阅而丢弃的消息是指没有对应的主题的订阅，发送到该主题的消息都会被丢弃。
- 部署在发送阶段丢弃的消息可能是因为消息过大，消息队列满了，过期了等原因。

|指标名称            | 描述                                     |
| ----------------- | :--------------------------------------- |
| messages.dropped.no_subscribers | 没有订阅而丢弃的消息数  |
| delivery.dropped    | 部署在发送阶段丢弃的消息数 |

::: tip
表格中没有指标名称的指标表明不能从指标 API 中获取。
:::



