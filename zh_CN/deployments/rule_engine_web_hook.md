![Webhook](../_assets/deployments/rule_engine/web_hook.jpg)

# 使用 EMQ X Cloud 规则引擎——Webhook

为了方便消息的进一步处理，你可以通过使用规则引擎的 Webhook 动作，将特定的消息推送到指定的 Web 服务器。

这篇指南会完成一个 Webhook 规则引擎的创建，实现下面的功能：

- 当有消息 "hello"，发送到 greet 主题时，会触发规则引擎，发送 "hello emqx！" 到我们的 Web 服务器上。



为了实现这个功能，我们会完成以下 4 个任务：

1. 开启一个简易的 Web 服务器
2. 设置规则引擎的筛选条件
3. 创建一个资源和一个动作
4. 完成规则引擎创建，并进行测试

>注意:
>
>在使用 规则引擎 前，请先创建部署，并完成[对等连接](../deployments/vpc_peering.md)
>
>请确保以下涉及到的服务器都建立在对等连接下的 VPC 中


#### 1. 创建 Web 服务器

首先，我们在自己的服务器上创建一个 Web 服务器。可以使用 nc 命令创建一个简易的 Web 服务器。

```shell
while true; do echo -e "HTTP/1.1 200 OK\n\n $(date)" | nc -l 0.0.0.0 9910; done;
```


#### 2. 设置规则引擎的筛选条件

进入 [EMQ X Cloud 控制台](https://cloud.emqx.io/console/)，并点击进入要使用 Webhook 的部署。

在部署页面，选择规则引擎，点击创建。

![规则引擎页](../_assets/deployments/rule_engine/view_rule_engine.png)

我们的目标是：当有消息 "hello"，发送到 greet 主题时，就会触发引擎。这里需要对 SQL 进行一定的处理：

* 仅针对 'greet/#'
* 对 payload 中的 msg 进行匹配，当它为 'hello' 字符串再执行规则引擎

根据上面的原则，我们最后得到的 SQL 应该如下：

```sql
SELECT
  payload.msg as msg
FROM
  "greet/#"
WHERE
  msg = 'hello'
```


#### 3. 创建资源和动作

![添加动作](../_assets/deployments/rule_engine/add_webhook_action01.png)

点击添加动作，在选择动作页，选择 发送数据到 Web 服务器，点击下一步，在配置动作页面，点击创建资源。

![选择发送到 Web 服务器](../_assets/deployments/rule_engine/add_webhook_action02.png)



在创建资源页面里，资源类型选择 Webhook，在请求 URL 里填写 Web 服务器的 URL 地址，然后点击测试。右上角会返回 “测试资源创建成功” 表示测试成功。

>注意：如果测试失败，请检查是否完成对等连接，详情请看 [VPC 对等连接](../deployments/vpc_peering.md)，并检查 URL 是否正确。



![创建资源](../_assets/deployments/rule_engine/add_webhook_action04.png)

点击确定，返回到配置动作页面，默认选择的是刚才创建的资源，在消息内容模板里填写 "hello emqx"，点击确定。

![配置动作](../_assets/deployments/rule_engine/add_webhook_action05.png)

创建好的动作会显示在响应动作一栏里，确认信息无误后，点击右下角的确认，完成规则引擎的配置。

![完成规则引擎配置](../_assets/deployments/rule_engine/add_webhook_action06.png)



#### 4. 测试

>如果您是第一次使用 EMQ X Cloud 可以前往[部署连接指南](../deployments/connections.md)，查看 MQTT 客户端连接和测试指南

当我们发送 "hello" 到 greet 主题，上面创建的规则就会触发，可以看到 Web 服务器已经收到消息 "hello emqx!"

![Web 服务器收到消息](../_assets/deployments/rule_engine/add_webhook_action07.png)