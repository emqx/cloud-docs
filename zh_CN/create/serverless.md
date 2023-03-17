# 创建 Serverless(Beta) 部署

EMQX Cloud 已经推出了基于共享集群的 MQTT 服务 —— EMQX Cloud Serverless，赋予开发者或微小企业更低成本且高效测试开发物联网应用的能力。简单几步就创建一个 Serverless 部署。

目前一个账号下只能创建一个 Serverless(Beta) 部署。在 2023.4.1 日之前，Serverless 在 Beta测试阶段，部署的最大连接上限为100，并且完全免费使用。


## 创建部署

1. 登录 [EMQX Cloud 控制台](https://cloud.emqx.com/console/)

   ![login_console](./_assets/login.png)

2. 单击新建部署按钮

   ![first_create_deployment](./_assets/first_create_deployment.png)

3. 选择 `Serverless(Beta)`

   ![create_serverless](./_assets/create_serverless.png)

4. 点击立即部署，并同意 EMQX Cloud 标准服务条款和 Serverless 服务使用条款


5. 稍事等待至部署状态为**运行中**

   ![serverless_running](./_assets/serverless_running.png)


## 部署概览页面

部署概览页面可获取到部署最新的状态和连接信息：

   ![serverless](./_assets/serverless_overview.png)

- 部署状态：部署运行状态和创建时间。
- 连接数：当前的连接数和最大连接数。
- 消息上下行 TPS：当前每秒钟消息发送和接收条数和上限。
- 连接分钟数：本月已经使用的总连接分钟数。此数值的统计有1小时的延时。
- 流量：本月已经产生入网和出网的流量。此数值的统计有1小时的延时。
- 部署名称：可自定义的部署的名称。
- 连接地址：域名地址。
- 连接端口：默认开启 8883(mqtts) 和 8084(wss) 端口。

Serverless 仅支持 8883(mqtts) 和 8084(wss) 端口。如果客户端需要 CA 文件，请[在此下载](https://assets.emqx.com/data/emqxsl-ca.crt)。



## 连接到您的免费试用部署

1. 添加客户端认证信息

   单击所需连接的部署进入部署概览页面，点击左侧【认证鉴权】->【认证】菜单，点击添加按钮，输入客户端或设备用户名和密码并点击确认。

   ![add_users](./_assets/serverless_auth.png)

2. 获取免费试用连接信息

   点击概览菜单，您将看到部署连接地址以及连接端口。Serverless(Beta) 默认支持 8883(mqtts), 8084(wss) 端口

3. MQTT X 连接到免费试用部署

   EMQX Cloud 推荐使用 [MQTT X](https://mqttx.app/zh/) 测试连接到部署，您也可以使用熟悉的 [SDK 或其他工具](../connect_to_deployments/overview.md)连接到部署。在使用 MQTT X 连接到部署之前您需要先获取到部署连接地址(Host)和端口(Port)。

* 设置 MQTT X 的连接信息并连接到部署 

    ![mqttx_mqtt](./_assets/mqttx_serverless.png)

* 连接之后即可以发布和订阅消息
   
   ![mqttx_mqtt](./_assets/create_serverless_connect.png)

::: warning
* 若部署持续 30 天没有活跃客户端连接，部署将会被停止。如需继续试用，请在控制台手动启用。
* 如果部署停止之后 30 天没有开启，部署将会被删除。
:::



