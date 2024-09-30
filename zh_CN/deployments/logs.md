# 部署日志

EMQX Platform 提供实时在线查看 EMQX 日志功能。


## 查看部署日志

日志分析重构了对于日志的解析和搜索能力，提供了 EMQX 两个节点 [emqx-node-1]
、[emqx-node-2] 多个级别的日志信息，可从 ClientID，ClientIP，Username，Topic，资源以及规则 ID 多维度进行查找分析，还可以根据不同错误类型进行过滤筛选。

**数据集成**：数据集成相关的错误。对应的服务没在运行或其它原因造成的错误。例如存储到 MySQL 时，MySQL 没在运行，未授权、或表错误等。

**客户端**：客户端相关的错误，包含错误的认证信息，错误的访问控制信息，以及其它原因造成无法连接等。

**消息**：消息相关的错误，例如编码问题、消息失弃等。

**模块**：emqx 模块相关的错误, 例如自定义认证因无法连接到对应服务而产生的错误。

**EMQX 内部错误**：Erlang 及无法分类到上述情况的错误。

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

### 数据集成 MySQL 资源异常(error)

* 日志
```
Initiate 'mysql:resource:7aba6137' failed {{shutdown,{failed_to_start_child,worker_sup,{shutdown,{failed_to_start_child,{worker,1},timeout}}}},{child,undefined,{pool_sup,'mysql:resource:7aba6137'}
```

* 处理
```
检查部署数据集成中 MySQL 资源
```


### 数据集成 Webhook 资源异常(error)

* 日志
```
cluster_call error found, ResL: [{{emqx_web_hook_actions,on_resource_create},{error,{error,check_http_connectivity_failed}
```

* 处理
```
检查部署数据集成中 Webhook 资源
```

### 数据集成 Webhook 状态异常(error)

* 日志
```
[WebHook Action] HTTP request failed with status code: 401
```

* 处理
```
检查部署数据集成中 Webhook 资源配置的认证是否正确可用
```

### 数据集成 Kafka 资源异常(error)

* 日志
```
cluster_call error found, ResL: [{{emqx_bridge_kafka_actions,on_resource_create},{error,connect_kafka_server_fail,[{
```

* 处理
```
检查部署数据集成中 Kafka 资源是否可用
```

### 数据集成 SQL 模板配置错误(error)

* 日志
```
[RuleEngine MySql] insert failed reason: {1406,<<"22001">>, <<"Data too long for column 'topic' at row 1">>}
```

* 处理
```
检查部署数据集成中规则的 SQL 编写是否正确
```

### 数据集成响应动作失败(error)

* 日志
```
[RuleEngine MySql] Take action <<"data_to_mysql_1634029957602201470">> failed, continue next action, reason: {error,{data_to_xxx,
```

* 处理
```
检查部署数据集成中规则的 action 编写是否正确
```