# 停止和删除部署


## Serverless 停止和删除部署

### 停止部署

1. 进入控制台，点击您所需要停止的部署，您将进入部署概览页面

2. 点击停止按钮，并在弹出框中输入部署名称

3. 点击确认，完成部署停止

::: warning
停止部署后，设备将不能连接到部署，您的数据和连接地址将会被保留。
:::


### 删除部署

1. 进入控制台，点击您所需要删除的部署，您将进入部署概览页面

2. 点击删除按钮，并在弹出框中输入部署名称

3. 点击确认，完成部署删除


::: warning
删除部署后，设备将不能连接到部署，部署所有数据和配置将会被删除。
:::


## 专有版停止和删除部署


### 停止部署
::: warning
停止部署后您将不能连接到部署，您的数据和连接地址将会被保留，同时我们将收取数据保留费用。
:::
   
停止部署之前，您需要确保部署运行状态为**运行中**。

1. 进入控制台，点击您所需要停止的部署，您将进入部署详情页面

2. 点击停止按钮，并在弹出框中输入部署名称

3. 点击确认，完成部署停止

![delete_deployment](./_assets/stop_deployment.png)


### 删除部署
::: warning
删除部署后您将不能连接到部署，部署所有数据和配置将会被删除, 同时我们将停止部署计费。
:::

删除部署之前，您需要确保部署运行状态为**运行中**。

1. 进入控制台，点击您所需要删除的部署，您将进入部署详情页面

2. 点击删除按钮，并在弹出框中输入部署名称

3. 点击确认，完成部署删除

![delete_deployment](./_assets/delete_deployment.png)


## BYOC 停止和删除部署


### 停止部署
暂不支持通过 UI 的方式停止部署。如您需要暂时停止 EMQX MQTT 服务以节约成本，可在您的公有云控制台中停止相关的虚拟机实例。


### 删除部署
::: warning
删除部署后您将不能连接到部署，部署所有数据和配置将会被删除。
:::

::: tip
删除部署之前，您需要确保部署运行状态为**运行中**。

删除部署之前，应确保已删除部署在 VPC 中创建的所有资源，包括但不限于子网、网关、安全组、自定义路由表、网络ACL、DHCP 选项集以及云企业网，否则可能导致删除失败。
:::

进入控制台，点击您所需要删除的部署，进入部署详情页面。点击 **删除** 按钮，弹出 **删除部署指引**，如下图所示：

![byoc_delete_deployment](./_assets/byoc_delete_deployment.png)

准备一个可访问互联网的 Ubuntu 20.04 (AMD64) LTS 环境，根据网页 **删除部署指引** 中生成的操作步骤和命令执行删除。

::: tip
请依次复制网页 **删除部署指引** 中的命令并将其粘贴到您的 Ubuntu 命令行界面中。此命令包含您在设置页面中提供的值，以及系统预置的信息。
:::

操作步骤如下：
1. 在 Ubuntu 命令行界面，使用以下命令下载工具包，并保存到您的 Ubuntu 目录中。
```bash
wget https://cloudassets.emqx.com/cn/byoc-deployments/1.1/delete-aliyun-byoc-deployment.tar.gz
```

2. 在 Ubuntu 命令行界面，解压下载的工具包文件。
```bash
tar -zxf delete-aliyun-byoc-deployment.tar.gz && cd delete-aliyun-byoc-deployment
```

3. 导航到解压的目录下，根据以下命令，并修改对应参数的值，执行命令进行部署的删除。
```bash
./byoc delete \
      --platform aliyun \
      --accessKey <Your Access Key> \
      --secretKey <Your Secret Key> \
      --byocEndpoint https://cloud.emqx.com \
      --byocKey abcdXXXXXXXXXX111
```
在执行`./byoc delete`命令前，请填充您的参数后执行。参数释义如下：

`--accessKey` 您的公有云账号的 AccessKey ID。阿里云平台可以在 [工作台 RAM 访问控制](https://ram.console.aliyun.com/manage/ak) 中查看您的 AccessKey ID。

`--secretKey` 您的公有云账号的 AccessKey Secret。请使用与 AccessKey ID 对应的 AccessKey Secret。

`--byocKey` 此次 BYOC 删除部署的认证密钥，用于 EMQX Cloud API 的安全认证。由 EMQX Cloud 控制台生成，请勿修改。

该命令执行后，提示确认需要删除的云资源，输入“yes“回车后继续。

```bash
Do you really want to destroy all resources?
  Terraform will destroy all your managed infrastructure, as shown above.
  There is no undo. Only 'yes' will be accepted to confirm.

  Enter a value: 
```
最终，命令行输出以下内容时，说明部署删除成功。
```bash
Delete the deployment successfully!
```





