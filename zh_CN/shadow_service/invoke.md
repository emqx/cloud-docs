# 服务调用和通信

## MQTT 通信

设备通过 topic 和 broker 之间做 MQTT 的通信，这和其他常规的 topic 通信没有区别，影子服务额外 提供了存储（数据缓存）能力。设备端或者应用端可通过影子服务包含的两个 topic 进行通信，即用于设备端的数据上报的发布主题，以及用于设备端做数据接收的订阅主题。

### 主题和方法

<table>
   <tr>
      <th>Topic</th>
      <th>说明</th>
   </tr>
   <tr>
      <td>shadow/${shadow_id}</td>
      <td>发布主题全局唯一，用于设备端/客户端发布更新消息，或者获取最新的影子模型。</td>
   </tr>
   <tr>
      <td>shadow/${shadow_id}/reply</td>
      <td>订阅主题全局唯一，用于设备端/客户端接收最新的消息。</td>
   </tr>
</table>

主题中除了 `payload` 存放消息之外，还需定义 `method` 来告知服务应该如何更新消息。
<table>
   <tr>
      <th>method类型</th>
      <th>说明</th>
   </tr>
   <tr>
      <td>PUT</td>
      <td>请在<strong>发布主题</strong>中使用该方法，对应 HTTP 的 PUT 方法，用于<strong>全量更新</strong> 影子模型 data 的数据，用法请见调用示例。</td>
   </tr>
   <tr>
      <td>PATCH</td>
      <td>请在<strong>发布主题</strong>中使用该方法，对应 HTTP 的 PATCH 方法，用于<strong>增量更新</strong> 影子模型 data 的数据，用法请见调用示例。</td>
   </tr>
   <tr>
      <td>GET</td>
      <td>请在<strong>发布主题</strong>中使用该方法，对应 HTTP 的 GET 方法，用于在<strong>订阅主题</strong>中获得最新的 影子模型 JSON 数据。</td>
   </tr>
</table>

**在使用 PATCH 方法更新 paylaod 的情况下，不能新增多层级对象，请见调用示例。**

影子服务 JSON

<table>
   <tr>
      <th>字段</th>
      <th>类型</th>
      <th>说明</th>
   </tr>
   <tr>
      <td>data</td>
      <td>Object</td>
      <td>主题或者 API 发布的消息主体</td>
   </tr>
   <tr>
      <td>createAt</td>
      <td>Number</td>
      <td>JSON 创建时间</td>
   </tr>
   <tr>
      <td>lastTime</td>
      <td>Number</td>
      <td>最新一次更新的时间</td>
   </tr>
   <tr>
      <td>version</td>
      <td>Number</td>
      <td>该影子模型更新的次数</td>
   </tr>
</table>

``` json
{
    "data": {},
    "createAt": 1660201961567,
    "lastTime": 1660204233317,
    "version": 3
}
```

### 调用示例

#### 全量（全局）更新
使用全量更新的方法更新影子模型数据，使用 `PUT` 方法以及 `payload` 存放消息

影子模型 data
``` json
{
    "Key01": {
        "a": 100
    }
}
```

发布主题（shadow/${shadow_id}）全量更新
``` json
{
    "method": "PUT",
    "payload": {
        "Key01": {
            "b": 200,
            "c": 300
        },
        "Key02": {
            "d" : 400
        }
    }
}
```

影子模型 data 将更新为
``` json
{
    "Key01": {
        "b": 200,
        "c": 300
    },
    "Key02": {
        "d": 400
    }
}
```

#### 增量（局部）更新
使用增量更新的方法更新影子模型数据，使用 `PATCH` 方法以及 `payload` 存放消息

影子模型 data
``` json
{
    "Key01": {
        "a": 100
    }
}
```

发布主题（shadow/${shadow_id}）增量更新
``` json
{
    "method": "PATCH",
    "payload": {
        "Key01": {
            "b": 200,
            "c": 300
        }
    }
}
```

影子模型 data 将更新为
``` json
{
    "Key01": {
        "a": 100,
        "b": 200,
        "c": 300
    }
}
```

#### 增量更新新增多层对象的方法

由于增量更新的方法不支持一步新增多层对象，因而需要一层一层进行添加。

影子模型 data
``` json
{
    "Key01": {
        "a": 100
    }
}
```

以下直接添加多层新对象的方式都会报错
``` json
{
    "method": "PATCH",
    "payload": {
        "Key01": {
            "a": 100
        },
        "Key02": {
            "b": 200
        }
    }
}

{
    "method": "PATCH",
    "payload": {
        "Key01": {
            "a": 100,
            "Key02": {
                "b": 200
            }
        }
    }
}
```

如果需要多层新对象，请逐层添加，或者使用全量更新方法来添加

第一步
``` json
//第一步
{
    "method": "PATCH",
    "payload": {
        "Key01": {
            "a": 100
        },
        "Key02": {}
    }
}
```

第二步
``` json
{
    "method": "PATCH",
    "payload": {
        "Key01": {
            "a": 100
        },
        "Key02": {
            "b": 200
        }
    } 
}
```

#### 获取模型数据
使用 GET 方法获取影子模型数据

影子模型 data
``` json
{
    "Key01": {
        "a": 100
    },
    "Key02": {
        "b": 200
    }
}
```

发布主题（shadow/${shadow_id}）获取数据
``` json
{
    "payload": {},
    "method": "GET"
}
```

在订阅主题（shadow/${shadow_id}/reply）将接收到影子模型 JSON
``` json
{
    "data": {
        "Key01": {
            "a": 100
        },
        "Key02": {
            "b": 200
        }
    },
    "createAt": 1660201961567,
    "lastTime": 1660204233317,
    "version": 2
}
```

## [API 通信](../api/shadow_service.md)
