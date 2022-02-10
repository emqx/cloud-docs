# 使用 EMQX Cloud 规则引擎转发数据到 WebHook

在本文中我们将模拟温湿度数据并通过 MQTT 协议上报到 EMQX Cloud，然后使用 EMQX Cloud 规则引擎将数据转存到 WebHook。

在开始之前，您需要完成以下操作：
* 已经在 EMQX Cloud 上创建部署(EMQX 集群)。
* 对于独享部署用户：请先完成 [对等连接的创建](../deployments/vpc_peering.md)，下文提到的 IP 均指资源的内网 IP。
* 对于基础版用户：无需完成对等连接，下文提到的 IP 均指资源的公网 IP。

## 创建 Web 服务器

1. 创建一个简易的 Web 服务器。

   ```python
   from http.server import HTTPServer, BaseHTTPRequestHandler
   
   class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
       def do_GET(self):
         self.send_response(200)
         self.end_headers()
         self.wfile.write(b'Hello, world!')
      
       def do_POST(self):
           content_length = int(self.headers['Content-Length'])
           body = self.rfile.read(content_length)
           print("Received POST request with body: " + str(body))
           self.send_response(201)
           self.end_headers()
   
   httpd = HTTPServer(('0.0.0.0', 8080), SimpleHTTPRequestHandler)
   httpd.serve_forever()
   ```


## EMQX Cloud 规则引擎配置

1. 资源创建

   点击左侧菜单栏`规则引擎`，找到资源面板，点击新建资源，下拉选择 WebHook 资源类型。填入 URL，并点击测试如果出现错误应及时检查数据库配置是否正确。

   ![创建资源](./_assets/webhook_create_resource.png)

2. 规则测试

   点击左侧左侧菜单栏`规则引擎`，找到规则面板，点击创建，然后输入如下规则匹配 SQL 语句。在下面规则中我们从 `temp_hum/emqx` 主题读取消息上报时间 `up_timestamp`、客户端 ID、消息体(Payload)，并从消息体中分别读取温度和湿度。
   
   ```sql
   SELECT 
   
   timestamp as up_timestamp, clientid as client_id, payload.temp as temp, payload.hum as hum
   
   FROM
   
   "temp_hum/emqx"
   ```
   ![规则引擎](./_assets/sql_test.png)

3. 添加响应动作

   点击左下角添加动作，下拉选择 → 数据转发 → 发送数据到 Web 服务，选择第一步创建好的资源，并填写以下数据：
   
   消息内容模板: 
   ```
   {"up_timestamp": ${up_timestamp}, "client_id": ${client_id}, "temp": ${temp}, "hum": ${hum}}
   ```
   ![添加动作](./_assets/webhook_action.png)

4. 点击创建规则，并返回规则列表

   ![规则列表](./_assets/view_rule_engine_webhook.png)

5. 查看规则监控

   ![查看监控](./_assets/view_monitor_webhook.png)


## 测试

1. 使用 [MQTT X](https://mqttx.app/) 模拟温湿度数据上报

   需要将 broker.emqx.io 替换成已创建的部署[连接地址](../deployments/view_deployment.md)，并添加[客户端认证信息](../deployments/auth.md)。

   ![MQTTX](./_assets/mqttx_publish.png)
   
2. 查看数据转存结果
    
   ![result](./_assets/webhook_query_result.png)

