# 资源

EMQ X Cloud 资源用于规则引擎响应动作， 在此之前您需要确保部署状态为 `running`



### 注意事项

1. 如需使用 EMQ X Cloud 资源, 需先创建 [VPC 对等连接](./vpc_peering.md)
2. 所有资源必须是**内网资源**



### 创建资源

1. 登录 [EMQ X Cloud 控制台](https://cloud.emqx.io/console/)

2. 进入部署详情页面

3. 点击创建，选择相应资源类型，并填写相应资源配置信息

   ![deployment_connections](../_assets/deployments/add_resources.png)

4. 点击测试，如果没有报错则点击确认，否则请仔细检查资源配置信息

5. 点击确认，您将返回资源列表

   ![deployment_connections](../_assets/deployments/resources_list.png)



### 删除资源

1. 登录 [EMQ X Cloud 控制台](https://cloud.emqx.io/console/)
2. 进入部署资源页面
3. 点击所需删除资源右侧删除按钮，即可删除



### 查看资源状态

1. 登录 [EMQ X Cloud 控制台](https://cloud.emqx.io/console/)

2. 进入部署资源页面

3. 点击资源状态图标

   ![deployment_connections](../_assets/deployments/view_resource.png)

