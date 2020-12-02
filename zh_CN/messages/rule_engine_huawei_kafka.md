# 华为云 Kafka 对接 EMQ X Cloud
Kafka 是由 Apache 基金会开发的流处理平台，专为分布式、高吞吐量系统而设计。由于其优良的分布式微服务和發布订阅模式设计，Kafka 被大量组织用于构建消息中心及实时流式处理。

而在物联网生态中，Kafka 已经是物联网中不可或缺的重要枢纽之一。设备产生的海量数据被传入 Kafka 中，方便后续进行存储、转换、处理、查询和分析。

[华为云分布式消息服务 Kafka](https://www.huaweicloud.com/product/dmskafka.html)，是华为云基于开源社区版 Kafka 提供的消息队列服务，向用户提供计算、存储和带宽资源独占式的 Kafka 专享实例。

[EMQ X Cloud](https://cloud.emqx.io) 是由 EMQ X 建立的云上 MQTT 服务。EMQ X 团队在物联网领域耕织多年，EMQ X MQTT 服务器在过去几年中被全球数千家企业用户使用。每一台部署都拥有独立的 VPS、负载均衡、DNS，保证系统安全与稳定。

本篇指南将会连通华为云 Kafka 和 EMQ X Cloud，并通过 EMQ X Cloud 规则引擎将 MQTT 消息转发到 Kafka 主题。

为了实现该功能，我们将会完成以下几个任务：

    1. 购买云资源
    2. 建立华为云 Kafka 与 EMQ X Cloud 部署之间的连接
    3. 创建 Kafka 主题，开通端口，并记录 Kafka 连接地址
    4. 设置规则引擎的筛选条件
    5. 创建一个资源和一个动作
    6. 完成规则引擎创建，并进行测试

### 操作步骤

#### 1. 创建云资源

1.1 创建华为云 Kafka

如果您是初次接触华为云 Kafka，建议您跟随华为云消息队列 Kafka 版[快速入门](https://support.huaweicloud.com/qs-kafka/kafka-qs-0409001.html)的提示进行创建

![](./_assets/buy_huawei_kafka.png)

1.2 创建 EMQ X Cloud 部署

如果您是初次接触 EMQ X Cloud，建议您跟随 EMQ X Cloud [快速入门](../../quick_start/README.md)的提示进行创建

![](./_assets/buy_huawei_kafka_emqx_deployment.png)

#### 2. 建立华为云 Kafka 与 EMQ X Cloud 部署之间的连接

在这一部分，我们需要完成华为云和 EMQ X Cloud 的对等连接。详细步骤可参考 [VPC 对等连接](../../deployments/vpc_peering.md)

2.1 登录 EMQ X Cloud 控制台，进入所需创建部署详情，点击 `+VPC 对等连接` 按钮，记录以下 EMQ X Cloud VPC 对等连接提示

> 注意：暂时不要关闭该页面

   * 部署 VPC ID
   * EMQ X Cloud 账户 ID
   * 部署 VPC 网段

2.2 登录华为云账号，进入控制台 -> 虚拟私有云 VPC

2.3 点击 对等连接 -> 创建对等连接，选择其它账户。填入刚才在 EMQ X Cloud 控制台 记录的信息，点击确定创建对等连接请求

* 对端项目 ID == EMQ X Cloud 账户 ID
* 对端VPC ID == 部署 VPC ID

这里的本端 VPC，选择 Kafka 所在的 VPC。可以在 Kafka 实例 -> 基本信息-> 网络 -> 虚拟私有云 里看到


2.4 在对等连接信息界面，记录下以下 3 个值

* 对等连接 ID
* VPC 网段
* VPC ID

2.5 找到 我的凭证，记录下用户 ID

2.6 回到 EMQ X Cloud 控制台。填写步骤 4 记录的对等连接 ID，VPC 网段，VPC ID 和步骤 5 记录的用户 ID。点击确定，完成对等连接

2.7 在华为云控制台，打开 `虚拟私有云 VPC` -> `路由表`，将步骤 1.1 中的部署 VPC 网段加入到对应 VPC 的路由表中

> 注意：下一跳类型为 对等连接

2.8 在华为云控制台里配置安全组，允许 EMQ X Cloud 网段访问您的 VPC

#### 3. 创建 Kafka 主题，开放端口，并记录 Kafka 连接地址
3.1 在华为云 Kafka 控制台中，点击 Topic 管理 -> 创建 Topic，创建一个名为 testTopic 的主题。

![](./_assets/set_huawei_kafka_topic.png)

3.2 打开 Kafka 安全组中的 9092 端口

![](./_assets/set_huawei_kafka_port.png)

如果你不希望被公网访问，这里源地址可以设置为步骤 2.1 中的 VPC 网段

3.3 记录下 Kafka 实例的 IP 地址

![](./_assets/record_huawei_kafka_ip.png)

#### 4. 设置规则引擎的筛选条件

进入 EMQ X Cloud 控制台，并点击进入要使用桥接 Kafka 的部署。
在部署页面，选择规则引擎，点击创建。

![规则引擎页](./_assets/view_rule_engine.png)

我们的目标是：当主题 greet 收到 msg 为 hello 字符时，就会触发引擎。这里需要对 SQL 进行一定的处理：
- 针对 greet 主题，即 'greet/#'
- 对 payload 中的 msg 进行匹配，当它为 'hello' 字符串再执行规则引擎
- 根据上面的原则，我们最后得到的 SQL 应该如下：

```sql
SELECT
  payload.msg as msg
FROM
  "greet/#"
WHERE
  msg = 'hello'
```

可以点击 SQL 输入框下的 SQL 测试 ，填写数据：
- topic: greet
- payload:
```json
{
"msg":"hello"
}
```

点击测试，查看得到的数据结果，如果设置无误，测试输出框应该得到完整的 JSON 数据，如下：
```json
{
  "msg":"hello"
}
```

> 注意：
> 如果无法通过测试，请检查 SQL 是否合规，测试中的 topic 是否与 SQL 填写的一致。


#### 5. 创建资源和动作
点击添加动作，在选择动作页，选择 `桥接数据到 Kafka`，点击下一步，在配置动作页面，点击创建资源。

![添加动作](./_assets/add_webhook_action01.png)

![添加动作](./_assets/add_kafka_action02.png)


在创建资源页面里，资源类型选择 Kafka，在 Kafka 服务器框里填写服务器的内网 IP 和对应的端口。点击测试，返回 “资源可用” 表示测试成功。

![添加动作](./_assets/add_kafka_action03.png)

> 注意：
>
>如果测试失败，请检查是否完成 [VPC 对等连接](../../deployments/vpc_peering.md)，以及检查 IP 地址是否正确。 

点击确定，返回到配置动作页面，Kafka 主题填写刚刚创建的 testTopic 主题，在消息内容模板里填写 "hello from emqx cloud"，资源 ID 默认，点击确定。

![添加动作](./_assets/add_kafka_action04.png)

创建好的动作会显示在响应动作一栏里，确认信息无误后，点击右下角的确认，完成规则引擎的配置。

![添加动作](./_assets/add_kafka_action05.png)


#### 6. 测试
> 如果您是第一次使用 EMQ X Cloud 可以前往[部署连接指南](../../connect_to_deployments/README.md)，查看 MQTT 客户端连接和测试指南

我们尝试向 greet/a 主题发送下面的数据
```json
{
  "msg":"hello"
}
```

在规则引擎页中，点击监控可以看到动作指标数的成功数变为 1。

![转发成功](./_assets/add_kafka_action06.png)

