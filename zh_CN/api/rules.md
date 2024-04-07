# 数据集成 API

此 API 文档提供了与数据集成使用相关的各种操作的信息，包括资源、规则和操作。

:::warning 资源规则创建数量提示
为了确保部署的稳定性，EMQX Cloud 仅推荐一定数量范围内的资源、规则。推荐资源的数量不超过 10 个，规则的数量不超过 50 个，每个规则下的动作不超过 10个。
:::

## 创建资源
资源是资源类型的实例，用于维护相关资源，例如数据库连接。

### URI

POST /resources

### 请求消息

| 名称     | 类型    | 描述                                                  |
| -------- | ------- | ------------------------------------------------------------ |
| type    | String  | 资源类型名。指定要使用哪个资源类型创建资源。 |
| config   | Object  | 资源参数。要跟对应的资源类型的 params 里指定的格式相一致。|
| description | String  | 可选，资源描述。 |


### 相应消息

| 名称 | 类型    | 描述 |
| ---- | ------- | ----------- |
| code | Integer | 0           |
| data | Object | Rule object  |
| data[].id | String | 资源 ID  |
| data[].type | String | 资源所从属的资源类型的名字。 |
| data[].config | Object | 资源的配置。参数以 key-value 形式表示。详情可参看后面的示例。  |
| data[].description | Object | 资源的描述信息。 |

### 请求示例

```bash
$ curl -u app_id:app_secret -X POST -d '{"type": "web_hook","config": {"url": "http://127.0.0.1:9910","headers": {"token":"axfw34y235wrq234t4ersgw4t"},"method": "POST"},"description": "web hook resource-1"}' {api}/resources
```

### 响应示例

```json
{
  "data": {
    "type": "web_hook",
    "id": "resource:b12d3e44",
    "description": "web hook resource-1",
    "config": {
        "url": "http://127.0.0.1:9910",
        "method": "POST",
        "headers": {
            "token": "axfw34y235wrq234t4ersgw4t"
        }
    }
  },
  "code": 0
}
```

## 查看资源

### URI

GET /resources/{resource_id}

#### 参数

| 名称     | 类型   | 描述 |
| :------- | :----- | :---------- |
| resource_id | String | 可选，资源类型 ID。如不指定 resource_id 则以数组形式返回当前所有的资源。|

### 请求消息

无。

### 响应消息

| 名称 | 类型    | 描述 |
| ---- | ------- | ----------- |
| code | Integer | 0           |
| data | Object | 资源对象  |
| data[].id | String | 资源 ID  |
| data[].type | String | 资源所从属的资源类型的名字。  |
| data[].config | Object | 资源的配置。参数以 key-value 形式表示。详情可参看后面的示例。  |
| data[].status | Array | 资源的状态信息。详情请参看 控制台上资源的状态。|
| data[].description | Object | 资源的描述信息。 |

### 请求示例

```bash
$ curl -u app_id:app_secret -X GET {api}/resources
```

### 响应示例

```json
{
    "data": [{
        "type": "web_hook",
        "id": "resource:b12d3e44",
        "description": "web hook resource-1",
        "config": {
            "url": "http://127.0.0.1:9910",
            "method": "POST",
            "headers": {
                "token": "axfw34y235wrq234t4ersgw4t"
            }
        }
    }],
    "code": 0
}
```

## 删除资源

### URI

DELETE /resources/{resource_id}


### 请求消息

无。

### 响应消息

| 名称 | 类型    | 描述 |
| ---- | ------- | ----------- |
| code | Integer | 0           |

### 请求示例

```bash
$ curl -u app_id:app_secret -X DELETE {api}/resources/resource:b12d3e44
```

### 响应示例

```json
{
    "code": 0
}
```


## 查看资源类型
查询规则引擎的资源类型。注意资源类型只能由 emqx 提供，不能添加。

### URI

GET /resource_types/{resource_type_name}

#### Parameter

| 名称     | 类型   | 描述 |
| :------- | :----- | :---------- |
| resource_type_name | String | 可选，资源类型名。如不指定 resource_type_name 则以数组形式返回当前支持的所有资源类型。|

### 请求消息

无。

### 响应消息

| 名称 | 类型    | 描述 |
| ---- | ------- | ----------- |
| code | Integer | 0           |
| data | Object | 资源对象。  |
| data[].title | Object | 资源类型的简述。  |
| data[].params | Object | 资源类型的参数列表。参数以 key-value 形式表示。详情可参看后面的示例。|
| data[].description | Object | 资源类型的描述信息。 |
| data[].provider | String | 资源类型的提供者。 |

### 请求示例

```bash
$ curl -u app_id:app_secret -X GET {api}/resource_types/web_hook
```

### 响应示例

```json
{
    "data": {
        "title": {
            "zh": "WebHook",
            "en": "WebHook"
        },
        "provider": "emqx_web_hook",
        "params": {
            "url": {
                "type": "string",
                "title": {
                    "zh": "请求 URL",
                    "en": "Request URL"
                },
                "required": true,
                "format": "url",
                "description": {
                    "zh": "请求 URL",
                    "en": "Request URL"
                }
            },
            "method": {
                "type": "string",
                "title": {
                    "zh": "请求方法",
                    "en": "Request Method"
                },
                "enum": ["PUT", "POST"],
                "description": {
                    "zh": "请求方法",
                    "en": "Request Method"
                },
                "default": "POST"
            },
            "headers": {
                "type": "object",
                "title": {
                    "zh": "请求头",
                    "en": "Request Header"
                },
                "schema": {},
                "description": {
                    "zh": "请求头",
                    "en": "Request Header"
                },
                "default": {}
            }
        },
        "name": "web_hook",
        "description": {
            "zh": "WebHook",
            "en": "WebHook"
        }
    },
    "code": 0
}
```

## 创建规则
创建规则，返回规则 ID。

### URI

POST /rules

### 请求消息

| 名称     | 类型    | 描述                                                  |
| -------- | ------- | ------------------------------------------------------------ |
| rawsql    | String  | 规则的 SQL 语句。 |
| actions   | Array  | 动作列表。 |
| actions[].name   | String  | 动作名称。 |
| actions[].params   | Object  | 动作参数。参数以 key-value 形式表示。详情可参看添加规则的示例。 |
| description | String  | 可选，规则描述。 |


### 响应消息

| 名称 | 类型    | 描述 |
| ---- | ------- | ----------- |
| code | Integer | 0           |
| data | Object | 规则对象。 |
| data[].id | String | 规则 ID。  |
| data[].rawsql | String | SQL 语句，与请求中的 rawsql 一致。  |
| data[].for | String | Topic 列表，表示哪些 topic 可以匹配到此规则。 |
| data[].metrics | Array | 统计指标。  |
| data[].description | String | 规则的描述信息，与请求中的 description 一致。 |
| data[].created_at | Integer | 创建时间，以微秒为单位的 UNIX 时间戳。|
| data[].actions | Array | 动作列表，每个动作是一个 Object。 |
| data[].actions[].id | String | 动作 ID。 |
| data[].actions[].params | Object | 动作参数，与请求中的 actions.params 一致。 |
| data[].actions[].name | String |  动作名字，与请求中的 actions.name 一致。 |
| data[].actions[].metrics | Array | 统计指标。 |

### 请求示例

```bash
$ curl -u app_id:app_secret -X POST -d '{"rawsql":"select * from \"t/a\"","actions":[{"name":"inspect","params":{"a":1}}],"description":"test-rule"}' {api}/rules
```

### 响应示例

```json
{
    "data": {
        "rawsql": "select * from \"t/a\"",
        "metrics": [{
            "speed_max": 0,
            "speed_last5m": 0.0,
            "speed": 0.0,
            "node": "emqx@127.0.0.1",
            "matched": 0
        }],
        "id": "rule:7fdb2c9e",
        "for": ["t/a"],
        "enabled": true,
        "description": "test-rule",
        "actions": [{
            "params": {
                "a": 1
            },
            "name": "inspect",
            "metrics": [{
                "success": 0,
                "node": "emqx@127.0.0.1",
                "failed": 0
            }],
            "id": "inspect_1582434715354188116"
        }]
    },
    "code": 0
}
```


## 查看规则
获取某个规则的详情，包括规则的 SQL、Topics 列表、动作列表等。还会返回当前规则和动作的统计指标的值。

### URI

GET /rules/{rule_id}

#### Parameter

| 名称     | 类型   | 描述 |
| :------- | :----- | :---------- |
| rule_id | String | 可选，Rule ID。如不指定 rule_id 则以数组形式返回所有已创建的规则。|

### 请求消息

无。


### 响应消息

| 名称 | 类型    | 描述 |
| ---- | ------- | ----------- |
| code | Integer | 0           |
| data | Object | 规则对象。 |
| data[].id | String | 规则 ID。  |
| data[].rawsql | String | SQL 语句，与请求中的 rawsql 一致。  |
| data[].for | String | Topic 列表，表示哪些 topic 可以匹配到此规则。 |
| data[].metrics | Array | 统计指标。  |
| data[].description | String | 规则的描述信息，与请求中的 description 一致。 |
| data[].created_at | Integer | 创建时间，以微秒为单位的 UNIX 时间戳。|
| data[].actions | Array | 动作列表，每个动作是一个 Object。 |
| data[].actions[].id | String | 动作 ID。 |
| data[].actions[].params | Object | 动作参数，与请求中的 actions.params 一致。 |
| data[].actions[].name | String |  动作名字，与请求中的 actions.name 一致。 |
| data[].actions[].metrics | Array | 统计指标。 |

### 请求示例

```bash
$ curl -u app_id:app_secret -X GET {api}/rules
```

### 响应示例

```json
{
    "data": [{
        "rawsql": "select * from \"t/a\"",
        "metrics": [{
            "speed_max": 0,
            "speed_last5m": 0.0,
            "speed": 0.0,
            "node": "emqx@127.0.0.1",
            "matched": 0
        }],
        "id": "rule:7fdb2c9e",
        "for": ["t/a"],
        "enabled": true,
        "description": "test-rule",
        "actions": [{
            "params": {
                "a": 1
            },
            "name": "inspect",
            "metrics": [{
                "success": 0,
                "node": "emqx@127.0.0.1",
                "failed": 0
            }],
            "id": "inspect_1582434715354188116"
        }]
    }],
    "code": 0
}
```

## 更新规则
更新规则，返回规则 ID。

### URI

PUT /rules/{rule_id}

#### Parameter

| 名称     | 类型   | 描述 |
| :------- | :----- | :---------- |
| actions | String | Rule ID.|

### 请求消息

| 名称     | 类型   | 描述             |
| :------- | :----- | :---------------------- |
| rawsql | String | 可选，规则的 SQL 语句。 |
| actions | Array | 可选，动作列表。 |
| actions[].name |String| 可选，动作名称。 |
| actions[].params | Object | 可选，动作参数。参数以 key-value 形式表示。详情可参看添加规则的示例。 |
| description | String | 可选，规则描述。 |


### 响应消息

| 名称 | 类型    | 描述 |
| ---- | ------- | ----------- |
| code | Integer | 0           |
| data | Object | 规则对象。 |
| data[].id | String | 规则 ID。  |
| data[].rawsql | String | SQL 语句，与请求中的 rawsql 一致。  |
| data[].for | String | Topic 列表，表示哪些 topic 可以匹配到此规则。 |
| data[].metrics | Array | 统计指标。  |
| data[].description | String | 规则的描述信息，与请求中的 description 一致。 |
| data[].created_at | Integer | 创建时间，以微秒为单位的 UNIX 时间戳。|
| data[].actions | Array | 动作列表，每个动作是一个 Object。 |
| data[].actions[].id | String | 动作 ID。 |
| data[].actions[].params | Object | 动作参数，与请求中的 actions.params 一致。 |
| data[].actions[].name | String |  动作名字，与请求中的 actions.name 一致。 |
| data[].actions[].metrics | Array | 统计指标。 |

### 请求示例

```bash
$ curl -u app_id:app_secret -X PUT -d '{"rawsql":"select * from \"t/b\""}' {api}/rules/rule:7fdb2c9e
```

### 响应示例

```json
{
    "data": {
        "rawsql": "select * from \"t/b\"",
        "metrics": [{
            "speed_max": 0,
            "speed_last5m": 0.0,
            "speed": 0.0,
            "node": "emqx@127.0.0.1",
            "matched": 0
        }],
        "id": "rule:7fdb2c9e",
        "for": ["t/a"],
        "enabled": true,
        "description": "test-rule",
        "actions": [{
            "params": {
                "a": 1
            },
            "name": "inspect",
            "metrics": [{
                "success": 0,
                "node": "emqx@127.0.0.1",
                "failed": 0
            }],
            "id": "inspect_1582434715354188116"
        }]
    },
    "code": 0
}
```

## 删除规则

### URI

DELETE /rules/{resource_id}


### 请求消息

无。

### 响应消息

| 名称 | 类型    | 描述 |
| ---- | ------- | ----------- |
| code | Integer | 0           |

### 请求示例

```bash
$ curl -u app_id:app_secret -X DELETE {api}/rules/rule:7fdb2c9e
```

### 响应示例

```json
{
    "code": 0
}
```


## 查看动作
查询规则引擎的动作。注意动作只能由 emqx 提供，不能添加。


### URI

GET /actions/{action_name}

#### Parameter

| 名称     | 类型   | 描述 |
| :------- | :----- | :---------- |
| action_name | String | 可选，动作名。如不指定 action_name 则以数组形式返回当前支持的所有动作。|

### 请求消息

无。


### 响应消息

| 名称 | 类型    | 描述 |
| ---- | ------- | ----------- |
| code | Integer | 0           |
| data | Object | 规则对象  |
| data[].types | String |指示当前动作从属于那些资源类型。|
| data[].title | Object | 动作的简述。  |
| data[].params | Object | 动作的参数列表。参数以 key-value 形式表示。详情可参看后面的示例。  |
| data[].description | String | 动作的描述信息。 |
| data[].app | String | 动作的提供者。 |

### 请求示例

```bash
$ curl -u app_id:app_secret -X GET {api}/actions
```

### 响应示例

```json
{
    "data": [{
        "types": [],
        "title": {
            "zh": "空动作 (调试)",
            "en": "Do Nothing (debug)"
        },
        "params": {},
        "name": "do_nothing",
        "for": "$any",
        "description": {
            "zh": "此动作什么都不做，并且不会失败 (用以调试)",
            "en": "This action does nothing and never fails. It's for debug purpose"
        },
        "app": "emqx_rule_engine"
    }, ...],
    "code": 0
}
```

