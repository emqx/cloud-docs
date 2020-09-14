# 资源

EMQ X Cloud 资源用于规则引擎响应动作， 在此之前您需要确保部署状态为 `running`

> 注意事项：
>
> 1. 如需使用 EMQ X Cloud 资源, 需先创建 [VPC 对等连接](./vpc_peering.md)
> 2. 所有资源必须是**内网资源**



### 创建资源

1. 登录 [EMQ X Cloud 控制台](https://cloud.emqx.io/console/)

2. 点击所需连接的部署，您将进入部署详情页面

3. 点击部署详情页面中的 dashboard 地址，您将进入到 dashboard

4. 点击 dashboard 左侧菜单`规则引擎` → `资源`，在资源列表页面点击资源`创建`按钮

   ![resource-add](../../../_assets/deployments/dashboard/rule_engine/resource-add.png)

5. 选择相应资源类型，并填写相应资源配置信息

   ![resource-config](../../../_assets/deployments/dashboard/rule_engine/resource-config.png)

6. 点击测试，如果没有报错则点击确认，否则请仔细检查资源配置信息



### 查看资源状态

1. 登录 [EMQ X Cloud 控制台](https://cloud.emqx.io/console/)

2. 点击所需连接的部署，您将进入部署详情页面

3. 点击部署详情页面中的 dashboard 地址，您将进入到 dashboard

4. 点击 dashboard 左侧菜单`规则引擎` → `资源`，在资源列表页面点击资源状态图标

   ![resource-status](../../../_assets/deployments/dashboard/rule_engine/resource-status.png)



### 删除资源

1. 登录 [EMQ X Cloud 控制台](https://cloud.emqx.io/console/)

2. 点击所需连接的部署，您将进入部署详情页面

3. 点击部署详情页面中的 dashboard 地址，您将进入到 dashboard

4. 点击 dashboard 左侧菜单`规则引擎` → `资源`，在资源列表页面点击资源`删除`按钮

   ![resource-delete](../../../_assets/deployments/dashboard/rule_engine/resource-delete.png)
