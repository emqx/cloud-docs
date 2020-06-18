# 监控和告警

EMQ X Cloud 提供完整的监控和告警方案 

要查看部署的监控和告警，请导航至 [EMQ X Cloud 控制台](https://cloud.emqx.io/console/)

### 监控

可在控制台 -> 部署中，选择要查看部署，在指标页查看相关的消息。

![metrics](../_assets/deployments/view_metrics.png)



#### EMQX 数量指标

在 Stats 模块里，提供最近一段时间内的 EMQX 数量指标。从左到右分别为：

1. 连接数量
2. 留存数量
3. 订阅数量
4. 订阅分享数量
5. 主题数量

![metrics_stats](../_assets/deployments/metrics_stats.png)


#### EMQX 增长指标

指标页面还提供了 Messages、Client、Packets、Delivery 四种增长指标视图。

把鼠标移动到图表上，可以查看每个图表，某个时间点的详细信息。

![metrics_line_detail](../_assets/deployments/metrics_line_detail.png)

### 告警

可在控制台 -> 部署中，选择要查看部署，在告警页面查看相关的消息，每条告警信息包含：时间，级别，以及告警类型

![main](../_assets/deployments/view_alert.png)

EMQ X Cloud 提供以下 5 种告警提示

| 告警类型              | 告警服务          | 告警级别  | 触发条件                                |
| ------------------- | ---------------- | -------- | ------------------------------------- |
| connections-high    | load_balancer    | warning  | 部署连接数是否大于购买规格 90%             |
| traffic-high        | load_balancer    | warning  | 上小时流量费与前 5 小时平均值做对比，超过1GB |
| cpu-high            | instance         | warning  | 实例 cpu 负载使用率大于 75%               |
| memory-high         | instance         | warning  | 实例 memory 使用率大于 75%               |
| filesystem-high     | instance         | warning  | 实例 disk 使用率大于 75%                 |
