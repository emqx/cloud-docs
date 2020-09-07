# VPC 对等连接

> 该功能在免费试用和共享部署中不可用

VPC 对等连接是两个VPC 之间的网络连接，通过此连接，使两个VPC 中的实例可以彼此通信，就像它们在同一网络中一样。

### 注意事项

1. EMQ X Cloud 只支持**同一区域**创建对等连接
2. EMQ X Cloud 不支持 100.0.0.0/8，101.0.0.0/8 网段，请合理规划您的 VPC 网段
3. 对等连接与资源相互绑定，创建资源前请先创建对等连接



### AWS Cloud VPC Peering

#### 创建对等连接

1. 登录 [EMQ X Cloud 控制台](<https://cloud.emqx.io/console>)，进入到部署的详情页面，点击 `+ VPC Peering Connection` 按钮，在弹出的对话框中，记录下 `Region of deployment`，`VPC ID of deployment`，`CIDR of deployment`，`Account ID of EMQ X Cloud`，这些信息后面将会用到，先不要关闭该对话框

   ![create-vpc1](../_assets/deployments/vpc-aws/create-vpc1.png)

2. 登录到 Amazon Web Services 控制台，切换到步骤 1 中记录的 `Region of deployment` 所在区域，进入到 `Networking & Content Delivery` -> `VPC` -> `Peering Connection`，点击 `Create Peering Connection` 按钮

   * Select `Another account` of `Account`，`Account ID` 填入步骤 1 记录的 `Account ID of EMQ X Cloud`
   * Select `This region(us-east-1)` of `Region`
   * VPC (Accepter) 填入步骤 1 记录的 `VPC ID of deployment`

   ![aws-vpc-request](../_assets/deployments/vpc-aws/aws-vpc-request.png)

   所有信息填写好后，点击 `Create Peering Connection` 按钮

3. 创建完成后显示如下，记录下 `Requester VPC owner`，`Requester VPC ID`，`VPC Peering Connection`，这些信息后面需要用到

   ![aws-vpc1](../_assets/deployments/vpc-aws/aws-vpc1.png)

4. 回到 [EMQ X Cloud 控制台](<https://cloud.emqx.io/console>)，填写步骤 3 中记录的信息，点击 `Confirm` 按钮，完成对等连接的创建

   * Peering ID 填入记录的 `VPC Peering Connection`
   * Account ID 填入记录的 `Requester VPC owner`
   * VPC ID 填入记录的 `Requester VPC ID`

   ![create-vpc2](../_assets/deployments/vpc-aws/create-vpc2.png)

5. 回到 Amazon Web Services 控制台，进入到 `Networking & Content Delivery` -> `VPC` -> `Route Tables`，将步骤 1 中记录的 `CIDR of deployment` 加入到对应 VPC 的路由表中

   ![route-tables](../_assets/deployments/vpc-aws/route-tables.png)

6. 进入到 `Networking & Content Delivery` -> `VPC` -> `Security Groups`，配置对应 VPC 绑定的安全组，edit inbound rules and add a rule

   ![security-groups](../_assets/deployments/vpc-aws/security-groups.png)



#### 删除对等连接

删除对等连接，您需要确保对等连接状态为 `running`

> 注意: 删除对等连接前，请确保部署不存在任何关联的资源，否则将导致不可预估的风险

1. 进入部署详情

   ![vpc-list](../_assets/deployments/vpc-aws/vpc-list.png)

2. 点击对等连接右侧 `删除按钮`

   ![vpc-delete](../_assets/deployments/vpc-aws/vpc-delete.png)

   



