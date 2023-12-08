# Data Integration API

This API documentation provides information on various operations related to Data Integration usage, including resource, rules and actions.

:::warning Tips for resource and rule maximum quantity
To ensure the stability of the deployment, EMQX Cloud recommends a certain range of resources and rules. The recommended number of resources is no more than 10, the number of rules is no more than 50, and the number of actions under each rule is no more than 10.
:::

## Create Resource
A resource is an instance of a resource type and is used to maintain related resources such as database connections.

### URI

POST /resources

### Request Message

| Name     | Type    | Description                                                  |
| -------- | ------- | ------------------------------------------------------------ |
| type    | String  | Resource type name that specify which resource type to use to create the resource |
| config   | Object  | Resource parameters that should conform to the format specified in the params of the corresponding resource type.|
| description | String  | Optional, resource description. |


### Response Message

| Name | Type    | Description |
| ---- | ------- | ----------- |
| code | Integer | 0           |
| data | Object | Rule object  |
| data[].id | String | Resource ID  |
| data[].type | String | The name of the resource type to which the resource belongs  |
| data[].config | Object | Configuration of resources, and parameters are expressed in key-value form.For details, please refer to the following examples  |
| data[].description | Object | A description of the resource. |

### Request Example

```bash
$ curl -u app_id:app_secret -X POST -d '{"type": "web_hook","config": {"url": "http://127.0.0.1:9910","headers": {"token":"axfw34y235wrq234t4ersgw4t"},"method": "POST"},"description": "web hook resource-1"}' {api}/resources
```

### Response Example

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

## View Resource

### URI

GET /resources/{resource_id}

#### Parameter

| Name     | Type   | Description |
| :------- | :----- | :---------- |
| resource_id | String | Optional, the resource ID. If not specified then returns all the currently supported resource in an array.|

### Request Message

None.

### Response Message

| Name | Type    | Description |
| ---- | ------- | ----------- |
| code | Integer | 0           |
| data | Object | Resource object.  |
| data[].id | String | Resource ID.  |
| data[].type | String | The name of the resource type to which the resource belongs  |
| data[].config | Object | Configuration of resources, and parameters are expressed in key-value form.For details, please refer to the following examples.  |
| data[].status | Array | Status information for the resource. See the status of resources on Console for details. |
| data[].description | Object | A description of the resource. |

### Request Example

```bash
$ curl -u app_id:app_secret -X GET {api}/resources
```

### Response Example

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

## Delete Resource

### URI

DELETE /resources/{resource_id}


### Request Message

None.

### Response Message

| Name | Type    | Description |
| ---- | ------- | ----------- |
| code | Integer | 0           |

### Request Example

```bash
$ curl -u app_id:app_secret -X DELETE {api}/resources/resource:b12d3e44
```

### Response Example

```json
{
    "code": 0
}
```


## View Resource Type
Query the rule engine's resource type. Note that resource types can only be provided by emqx and cannot be added.

### URI

GET /resource_types/{resource_type_name}

#### Parameter

| Name     | Type   | Description |
| :------- | :----- | :---------- |
| resource_type_name | String | Optional, the resource type name. If not specified then returns all the currently supported resource types in an array.|

### Request Message

None.

### Response Message

| Name | Type    | Description |
| ---- | ------- | ----------- |
| code | Integer | 0           |
| data | Object | Rule object  |
| data[].title | Object | A brief description of resource types.  |
| data[].params | Object | A list of parameters for the resource type expressed in key-value form. For details, please refer to the following examples.  |
| data[].description | Object | A brief description of resource types. |
| data[].provider | String | Provider of resource type. |

### Request Example

```bash
$ curl -u app_id:app_secret -X GET {api}/resource_types/web_hook
```

### Response Example

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

## Create Rule
Create a rule and return the rule ID.

### URI

POST /rules

### Request Message

| Name     | Type    | Description                                                  |
| -------- | ------- | ------------------------------------------------------------ |
| rawsql    | String  | SQL statements of rules |
| actions   | Array  | Action list |
| actions[].name   | String  | Action name |
| actions[].params   | Object  | Action parameters, that is expressed in key-value form. For details, please refer to the example of adding rules. |
| description | String  | Optional, rule description |


### Response Message

| Name | Type    | Description |
| ---- | ------- | ----------- |
| code | Integer | 0           |
| data | Object | Rule object  |
| data[].id | String | Rule ID  |
| data[].rawsql | String | SQL statement, consistent with rawsql in the request.  |
| data[].for | String | Topic list, indicates which topics can be matched by this rule.  |
| data[].metrics | Array | Metrics.  |
| data[].description | String | The description of the rule, consistent with the description in the request. |
| data[].created_at | Integer | UNIX timestamp in microseconds. |
| data[].actions | Array | Action list, and each action is an Object. |
| data[].actions[].id | String | Action ID. |
| data[].actions[].params | Object | Action parameters, consistent with actions.params in the request. |
| data[].actions[].name | String | Action name, consistent with actions.name in the request. |
| data[].actions[].metrics | Array | Metrics. |

### Request Example

```bash
$ curl -u app_id:app_secret -X POST -d '{"rawsql":"select * from \"t/a\"","actions":[{"name":"inspect","params":{"a":1}}],"description":"test-rule"}' {api}/rules
```

### Response Example

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


## View Rule
Get the details of a rule, including the rule's SQL, Topics list, action list, etc. It also returns the value of the metrics for the current rule and action.

### URI

GET /rules/{rule_id}

#### Parameter

| Name     | Type   | Description |
| :------- | :----- | :---------- |
| rule_id | String | Optional, Rule ID. If rule_id is not specified then returns all created rules in an array.|

### Request Message

None.


### Response Message

| Name | Type    | Description |
| ---- | ------- | ----------- |
| code | Integer | 0           |
| data | Object | Rule object  |
| data[].id | String | Rule ID  |
| data[].rawsql | String | SQL statement, consistent with rawsql in the request.  |
| data[].for | String | Topic list, indicates which topics can be matched by this rule.  |
| data[].metrics | Array | Metrics.  |
| data[].description | String | The description of the rule, consistent with the description in the request. |
| data[].created_at | Integer | UNIX timestamp in microseconds. |
| data[].actions | Array | Action list, and each action is an Object. |
| data[].actions[].id | String | Action ID. |
| data[].actions[].params | Object | Action parameters, consistent with actions.params in the request. |
| data[].actions[].name | String | Action name, consistent with actions.name in the request. |
| data[].actions[].metrics | Array | Metrics. |

### Request Example

```bash
$ curl -u app_id:app_secret -X GET {api}/rules
```

### Response Example

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

## Update Rule
Update the rule and return the rule ID.

### URI

PUT /rules/{rule_id}

#### Parameter

| Name     | Type   | Description |
| :------- | :----- | :---------- |
| actions | String | Rule ID.|

### Request Message

| Name     | Type   | Description             |
| :------- | :----- | :---------------------- |
| rawsql | String | Optional, SQL statement of the rule. |
| actions | Array | Optional, action list. |
| actions[].name | String | Optional, action name. |
| actions[].params | Object | Optional, action parameters, that is expressed in key-value form.For details, please refer to the example of adding rules. |
| description | String | Optional, rule description. |


### Response Message

| Name | Type    | Description |
| ---- | ------- | ----------- |
| code | Integer | 0           |
| data | Object | Rule object  |
| data[].id | String | Rule ID  |
| data[].rawsql | String | SQL statement, consistent with rawsql in the request.  |
| data[].for | String | Topic list, indicates which topics can be matched by this rule.  |
| data[].metrics | Array | Metrics.  |
| data[].description | String | The description of the rule, consistent with the description in the request. |
| data[].created_at | Integer | UNIX timestamp in microseconds. |
| data[].actions | Array | Action list, and each action is an Object. |
| data[].actions[].id | String | Action ID. |
| data[].actions[].params | Object | Action parameters, consistent with actions.params in the request. |
| data[].actions[].name | String | Action name, consistent with actions.name in the request. |
| data[].actions[].metrics | Array | Metrics. |

### Request Example

```bash
$ curl -u app_id:app_secret -X PUT -d '{"rawsql":"select * from \"t/b\""}' {api}/rules/rule:7fdb2c9e
```

### Response Example

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

## Delete Rule

### URI

DELETE /rules/{resource_id}


### Request Message

None.

### Response Message

| Name | Type    | Description |
| ---- | ------- | ----------- |
| code | Integer | 0           |

### Request Example

```bash
$ curl -u app_id:app_secret -X DELETE {api}/rules/rule:7fdb2c9e
```

### Response Example

```json
{
    "code": 0
}
```


## View Action
Query the actions of the rule engine. Note that actions can only be provided by emqx and cannot be added.

### URI

GET /actions/{action_name}

#### Parameter

| Name     | Type   | Description |
| :------- | :----- | :---------- |
| action_name | String | Optional, the action name. If you do not specify action_name then return all currently supported actions in an array.|

### Request Message

None.


### Response Message

| Name | Type    | Description |
| ---- | ------- | ----------- |
| code | Integer | 0           |
| data | Object | Rule object  |
| data[].types | String |Indicate which resource types the current action belongs to.|
| data[].title | Object | A brief description of the action.  |
| data[].params | Object | A list of parameters for the action that are expressed in key-value form. For details, please refer to the following examples.  |
| data[].description | String | A brief description of the action. |
| data[].app | String | Action Provider. |

### Request Example

```bash
$ curl -u app_id:app_secret -X GET {api}/actions
```

### Response Example

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

