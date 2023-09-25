# 影子服务管理 API

对于您自己的应用开发，可以使用 API 来获取影子服务的相关信息。

## API 列表

| URL                        | 方法   | 说明                      |
| -------------------------- | ------ | ------------------------- |
| /shadows                   | POST   | 新建影子模型              |
| /shadows                   | GET    | 获取影子模型列表          |
| /shadows/${shadow_id}      | GET    | 获取指定影子模型信息      |
| /shadows/${shadow_id}      | PUT    | 更新指定影子模型信息      |
| /shadows/${shadow_id}      | DELETE | 删除指定影子模型          |
| /shadows/${shadow_id}/json | GET    | 获取指定影子模型 JSON     |
| /shadows/${shadow_id}/json | PUT    | 全量更新指定影子模型 JSON |
| /shadows/${shadow_id}/json | PATCH  | 增量更新指定影子模型 JSON |

## 获取影子模型列表

### URL

GET /shadows

### 请求消息

| 名称   | 类型    | 描述               |
| ------ | ------- | ------------------ |
| _page  | Integer | 页码               |
| _limit | Integer | 每页显示的数据条数 |

### 响应消息

| 名称                | 类型             | 描述                    |
| ------------------- | ---------------- | ----------------------- |
| items               | Array of Objects | 所有影子模型信息        |
| items[].description | String           | 影子模型描述            |
| items[].updatedAt   | String           | 影子模型更新时间（UTC） |
| items[].shadowID    | String           | 影子模型 ID             |
| items[].createdAt   | String           | 影子模型创建时间（UTC） |
| items[].shadowName  | String           | 影子模型名称            |
| meta                | Object           | 分页信息                |
| meta.page           | Integer          | 页码                    |
| meta.limit          | Integer          | 每页显示的数据条数      |
| meta.count          | Integer          | 数据总条数              |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/shadows/?_page=1&_limit=10
```

### 响应示例

```json
{
  "items": [
    {
      "description": "123", 
      "updatedAt": "2022-06-10 03:20", 
      "shadowID": "test_shadow", 
      "createdAt": "2022-06-10 03:20", 
      "shadowName": "test"
    }
  ], 
  "meta": {
    "limit": 10, 
    "page": 1, 
    "count": 1
  }
}
```

## 获取指定影子模型信息

### URL

GET /shadows/${shadow_id}

### 请求消息

无

### 响应消息

| 名称        | 类型   | 描述                    |
| ----------- | ------ | ----------------------- |
| description | String | 影子模型描述            |
| updatedAt   | String | 影子模型更新时间（UTC） |
| shadowID    | String | 影子模型 ID             |
| createdAt   | String | 影子模型创建时间（UTC） |
| shadowName  | String | 影子模型名称            |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/shadows/${shadow_id}
```

### 响应示例

```json
{
  "description": "123", 
  "updatedAt": "2022-06-10 03:20", 
  "shadowID": "test_shadow", 
  "createdAt": "2022-06-10 03:20", 
  "shadowName": "test"
}
```

## 获取指定影子模型 JSON

### URL

GET /shadows/${shadow_id}/json

### 请求消息

无

### 响应消息

| 名称      | 类型    | 描述                           |
| --------- | ------- | ------------------------------ |
| createdAt | Integer | JSON 创建时间毫秒时间戳（UTC） |
| lastTime  | Integer | JSON 更新时间毫秒时间戳（UTC） |
| version   | Integer | JSON 修改的版本号              |
| data      | String  | 消息正文                       |

### 响应消息示例格式
| 名称         | 类型    | 描述 |
| ------------ | ------- | ---- |
| data[].color | String  | 颜色 |
| data[].state | Integer | 状态 |
| data[].power | Integer | 电量 |

### 请求示例

```bash
curl -u app_id:app_secret -X GET {api}/shadows/${shadow_id}/json
```

### 响应示例

```json
{
  "data": {
    "color": "blue", 
    "power": 0, 
    "state": 1
  }, 
  "createAt": 1660618831979, 
  "lastTime": 1660631951790, 
  "version": 1
}
```

## 创建影子模型

### URL

POST /shadows

### 请求消息

::: tip
影子模型 ID 为非必填，系统会自动生成，同时也支持用户自定义。
:::

| 名称        | 类型   | 描述         |
| ----------- | ------ | ------------ |
| description | String | 影子模型描述 |
| shadowID    | String | 影子模型 ID  |
| shadowName  | String | 影子模型名称 |

### 响应消息

| 名称        | 类型   | 描述                    |
| ----------- | ------ | ----------------------- |
| description | String | 影子模型描述            |
| updatedAt   | String | 影子模型更新时间（UTC） |
| shadowID    | String | 影子模型 ID             |
| createdAt   | String | 影子模型创建时间（UTC） |
| shadowName  | String | 影子模型名称            |

### 请求示例

```bash
curl -u app_id:app_secret -X POST -d '{"description": "123","shadowID": "test_shadow","shadowName": "test"}' {api}/shadows
```

### 响应示例

```json
{
  "description": "123", 
  "updatedAt": "2022-06-10 03:39", 
  "shadowID": "test_shadow", 
  "createdAt": "2022-06-10 03:39", 
  "shadowName": "test"
}
```

## 更新指定影子模型信息

### URL

PUT /shadows/${shadow_id}

### 请求消息

::: tip
影子模型一旦创建，就无法对 ID 进行修改
:::

| 名称        | 类型   | 描述         |
| ----------- | ------ | ------------ |
| description | String | 影子模型描述 |
| shadowName  | String | 影子模型名称 |

### 响应消息

| 名称        | 类型   | 描述                    |
| ----------- | ------ | ----------------------- |
| description | String | 影子模型描述            |
| updatedAt   | String | 影子模型更新时间（UTC） |
| shadowID    | String | 影子模型 ID             |
| createdAt   | String | 影子模型创建时间（UTC） |
| shadowName  | String | 影子模型名称            |

### 请求示例

```bash
curl -u app_id:app_secret -X PUT -d '{"description": "","shadowName": "test"}' {api}/shadows/${shadow_id}
```

### 响应示例

```json
{
  "description": "", 
  "updatedAt": "2022-06-10 03:39", 
  "shadowID": "test_shadow", 
  "createdAt": "2022-06-10 03:39", 
  "shadowName": "test"
}
```

## 全量更新指定影子模型 JSON

### URL

PUT /shadows/${shadow_id}/json

### 请求消息

| 名称 | 类型   | 描述     |
| ---- | ------ | -------- |
| data | String | 消息正文 |

### 请求消息示例格式
| 名称         | 类型    | 描述 |
| ------------ | ------- | ---- |
| data[].color | String  | 颜色 |
| data[].state | Integer | 状态 |
| data[].power | Integer | 电量 |

### 响应消息

| 名称      | 类型    | 描述                           |
| --------- | ------- | ------------------------------ |
| createdAt | Integer | JSON 创建时间毫秒时间戳（UTC） |
| lastTime  | Integer | JSON 更新时间毫秒时间戳（UTC） |
| version   | Integer | JSON 修改的版本号              |
| data      | String  | 消息正文                       |

### 请求示例

```bash
curl -u app_id:app_secret -X PUT -d '{"color": "blue","state": 1,"power": 0}' {api}/shadows/${shadow_id}/json
```

### 响应示例

```json
{
  "data": {
    "color": "blue", 
    "power": 0, 
    "state": 1
  }, 
  "createAt": 1660618831979, 
  "lastTime": 1660631951770, 
  "version": 9
}
```

## 增量更新指定影子模型 JSON

### URL

PATCH /shadows/${shadow_id}/json

### 请求消息

| 名称 | 类型   | 描述     |
| ---- | ------ | -------- |
| data | String | 消息正文 |

### 请求消息示例格式
| 名称         | 类型    | 描述 |
| ------------ | ------- | ---- |
| data[].specs | Integer | 规格 |

### 响应消息

| 名称      | 类型    | 描述                           |
| --------- | ------- | ------------------------------ |
| createdAt | Integer | JSON 创建时间毫秒时间戳（UTC） |
| lastTime  | Integer | JSON 更新时间毫秒时间戳（UTC） |
| version   | Integer | JSON 修改的版本号              |
| data      | String  | 消息正文                       |

### 请求示例

```bash
curl -u app_id:app_secret -X PATCH -d '{"specs": 2}' {api}/shadows/${shadow_id}/json
```

### 响应示例

```json
{
  "data": {
    "color": "blue", 
    "power": 0, 
    "specs": 2, 
    "state": 1
  }, 
  "createAt": 1660618831979, 
  "lastTime": 1660631880990, 
  "version": 10
}
```

## 增量更新指定影子模型 JSON 多层对象
### URL

PATCH /shadows/${shadow_id}/json

### 请求消息

| 名称 | 类型   | 描述     |
| ---- | ------ | -------- |
| data | String | 消息正文 |

### 响应消息

| 名称      | 类型    | 描述                           |
| --------- | ------- | ------------------------------ |
| createdAt | Integer | JSON 创建时间毫秒时间戳（UTC） |
| lastTime  | Integer | JSON 更新时间毫秒时间戳（UTC） |
| version   | Integer | JSON 修改的版本号              |
| data      | String  | 消息正文                       |

### 请求示例

::: tip
如果需要增量更新多层新对象，请**逐层**添加，不可直接添加多层新对象，会失败并返回 500 状态码。
:::

```bash
# 错误请求示例
curl -u app_id:app_secret -X PATCH -d '{"key": {"a":100}}' {api}/shadows/${shadow_id}/json
```

```bash
# 正确请求示例
curl -u app_id:app_secret -X PATCH -d '{"key": {}}' {api}/shadows/${shadow_id}/json

curl -u app_id:app_secret -X PATCH -d '{"key": {"a":100}}' {api}/shadows/${shadow_id}/json
```

### 响应示例

```json
{
  "data": {
    "color": "blue",
    "key": {},
    "power": 0,
    "specs": 2,
    "state": 1
  },
  "createAt": 1662087412285,
  "lastTime": 1662106829205,
  "version": 12
}
```

```json
{
    "data": {
        "color": "blue",
        "key": {
            "a": 100
        },
        "power": 0,
        "specs": 2,
        "state": 1
    },
    "createAt": 1662087412285,
    "lastTime": 1662106900812,
    "version": 13
}
```

## 删除指定影子模型

### URL

DELETE /shadows/${shadow_id}

### 请求消息

无

### 响应消息

无

### 请求示例

```bash
curl -u app_id:app_secret -X DELETE {api}/shadows/${shadow_id}
```
