# 创建 Serverless 部署

EMQX Cloud 已经推出了基于共享集群的 MQTT 服务 —— EMQX Cloud Serverless，赋予开发者或微小企业更低成本且高效测试开发物联网应用的能力。简单几步就创建一个 Serverless 部署。

Serverless 部署最大的优势在于连接场景只按照实际的使用量进行计费，Serverless 详细的计费方式请查看[定价计费](../price/pricing.md)部分。


## 创建部署

1. 登录 [EMQX Cloud 控制台](https://cloud.emqx.com/console/)


2. 在控制台首页或者部署列表页面都可以在指定项目下创建，点击新建部署进入创建步骤。


3. 点击 Serverless 面板上的 `免费开启`

   ![create_serverless](./_assets/create_serverless.png)

4. 在配置步骤，您可以设置改 Serverless 部署的本月最大消费限额，默认值为 0，即为只使用免费额度。这里设置为 0，消费限额在部署创建之后也可以进行修改。

   ![create_serverless](./_assets/create_serverless_spendlimit.png)

5. 点击立即部署，并同意 EMQX Cloud 标准服务条款和 Serverless 服务使用条款


6. 稍事等待至部署状态为**运行中**即可使用。


## 部署概览页面

部署概览页面可获取到部署实时状态和连接信息：

   ![serverless](./_assets/serverless_overview.png)

- 实例状态：部署实例运行状态和创建时间。
- 连接数：当前的连接数和最大连接数。
- 消息上下行 TPS：部署当前每秒钟消息发送和接收条数，以及 TPS 上限。
- 连接分钟数：本月已经使用的总连接分钟数。此数值的统计有 1 小时的延时。
- 流量：本月已经产生入网和出网的流量。此数值的统计有 1 小时的延时。
- 部署名称：部署名称可自定义。
- 连接地址：客户端/终端设备的连接地址。
- 连接端口：默认开启 8883 (mqtts) 和 8084 (wss) 端口。
- 消费限额：部署当月最高消费限制设置，具体可查看[消费限额设置](../deployment/spend_limit.md)


::: warning
Serverless 仅支持 8883 (mqtts) 和 8084 (wss) 端口。如果客户端需要 CA 文件，请[在此下载](https://assets.emqx.com/data/emqxsl-ca.crt)。
:::



## 连接 Serverless 部署

1. 添加客户端认证信息

   单击所需连接的部署进入部署概览页面，点击左侧【认证鉴权】->【认证】菜单，点击添加按钮，输入客户端或设备用户名和密码并点击确认。

   ![add_users](./_assets/serverless_auth.png)

2. 获取免费试用连接信息

   点击概览菜单，您将看到部署连接地址以及连接端口。Serverless 默认支持 8883(mqtts), 8084(wss) 端口。

3. MQTT X 连接到免费试用部署

   EMQX Cloud 推荐使用 [MQTT X](https://mqttx.app/zh/) 测试连接到部署，您也可以使用熟悉的 [SDK 或其他工具](../connect_to_deployments/overview.md)连接到部署。在使用 MQTT X 连接到部署之前您需要先获取到部署连接地址(Host)和端口(Port)。

* 设置 MQTT X 的连接信息并连接到部署 

    ![mqttx_mqtt](./_assets/mqttx_serverless.png)

* 连接之后即可以发布和订阅消息
   
   ![mqttx_mqtt](./_assets/create_serverless_connect.png)


::: warning
* 若部署持续 30 天没有活跃客户端连接，部署将会被停止。如需继续试用，请在控制台手动启用。
* 如果部署停止之后 30 天未开启，部署将会被删除。
:::



