# NAT 网关

::: warning
该功能为专有版功能，购买该服务前需要创建专有版部署。
:::

NAT 网关可以提供网络地址转换服务。未开通 NAT 网关之前，专有版部署的一些功能，如扩展认证，数据集成等无法访问公网资源。开通了之后，就可以通过公网地址进行访问。



## 服务开通

您可以在顶部菜单栏 - **增值服务**中选择 NAT 网关卡片或者部署概览底部标签栏选择开通 NAT 网关服务。


## 服务使用

完成 NAT 网关增值服务购买后，您可在相应部署概览处看到 NAT 网关创建状态，等待创建完成。当 NAT 网关的状态为 running 后，该部署便可访问公网资源。

## 测试

### 未开启 NAT 网关访问公网资源

![no_nat_gateway_access_resource](./_assets/no_nat_gateway_access_resource.png)

### 开启 NAT 网关后访问公网资源

![nat_gateway_access_resource](./_assets/nat_gateway_access_resource.png)