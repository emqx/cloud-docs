# 部署日志

EMQ X Cloud 提供实时在线查看 EMQ X 日志功能



## 查看部署日志

点击日志页面将跳转到部署日志页面，在这里可以查看部署日志相关消息。点击右上角选择不同节点，查看不同节点日志信息。

![view_log](./_assets/logs.png)



## 常见日志分析

### 客户端认证失败(warning)

* 日志
```
[Channel] Client xxx (Username: 'xxx') login failed for not_authorized
```

* 处理
```
检查客户端认证配置是否正确
```

### 客户端 ACL 认证失败(warning)

* 日志
```
[Channel] Cannot publish message to xxx due to Not authorized.
```

* 处理
```
检查部署访问控制配置是否正确
```

### 部署非标准 MQTT 协议连接(warning)

* 日志
```
[MQTT] Parse failed for function_clause[{emqx_frame,parse_packet,[{mqtt_packet_header,4,false,3,true}
```

* 处理
```
检查客户端连接使用的 MQTT 协议是否为标准 MQTT 协议
```

### 部署消息丢弃告警(warning)

* 日志
```
Dropped msg due to queue is full: Message(Id=xxx, QoS=1, Topic=xxx)
```

* 处理
```
客户端设置 clean session 为 False 或客户端设置自动重连。
```

### 部署 TPS 超过限制告警(warning)

* 日志
```
[Channel] Cannot publish messages to /acp_player/heartbeat due to Quota exceeded.
```

* 处理
```
及时调整客户端发送速率，使发送速率小于部署限制的 TPS
```

### 规则引擎 MySQL 资源异常(error)

* 日志
```
Initiate 'mysql:resource:7aba6137' failed {{shutdown,{failed_to_start_child,worker_sup,{shutdown,{failed_to_start_child,{worker,1},timeout}}}},{child,undefined,{pool_sup,'mysql:resource:7aba6137'}
```

* 处理
```
检查部署规则引擎中 MySQL 资源
```


### 规则引擎 Webhook 资源异常(error)

* 日志
```
cluster_call error found, ResL: [{{emqx_web_hook_actions,on_resource_create},{error,{error,check_http_connectivity_failed}
```

* 处理
```
检查部署规则引擎中 Webhook 资源
```

### 规则引擎 Webhook 状态异常(error)

* 日志
```
[WebHook Action] HTTP request failed with status code: 401
```

* 处理
```
检查部署规则引擎中 Webhook 资源配置的认证是否正确可用
```

### 规则引擎 Kafka 资源异常(error)

* 日志
```
cluster_call error found, ResL: [{{emqx_bridge_kafka_actions,on_resource_create},{error,connect_kafka_server_fail,[{
```

* 处理
```
部署规则引擎 Kafka 资源异常
```

### 规则引擎 SQL 模板配置错误(error)

* 日志
```
[RuleEngine MySql] insert failed reason: {1406,<<"22001">>, <<"Data too long for column 'topic' at row 1">>}
```

* 处理
```
检查部署规则引擎中规则的 SQL 编写是否正确
```

### 规则引擎响应动作失败(error)

* 日志
```
[RuleEngine MySql] Take action <<"data_to_mysql_1634029957602201470">> failed, continue next action, reason: {error,{data_to_xxx,
```

* 处理
```
检查部署规则引擎中规则的 action 编写是否正确
```