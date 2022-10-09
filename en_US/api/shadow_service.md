# Shadow Service

You can create the IoT application based on the Shadow Service APIs.

## API List

| URL                        | Method   | Description                      |
| -------------------------- | ------ | ------------------------- |
| /shadows                   | POST   | Create a shadow model              |
| /shadows                   | GET    | Get the list of shadow models          |
| /shadows/${shadow_id}      | GET    | Get the specified shadow model’s properties     |
| /shadows/${shadow_id}      | PUT    | Update the specified shadow model’s properties      |
| /shadows/${shadow_id}      | DELETE | Delete the specified shadow model         |
| /shadows/${shadow_id}/json | GET    | Get the specified shadow model’s JSON     |
| /shadows/${shadow_id}/json | PUT    | Update the specified shadow model’s JSON entirely |
| /shadows/${shadow_id}/json | PATCH  | Update the specified shadow model’s JSON partially |

## Get the list of shadow models

### URL

GET /shadows

### Request

| Params   | Type    | Description        |
| ------ | ------- | ------------------ |
| _page  | Integer | Page number              |
| _limit | Integer | Number of items displayed each page |

### Response

| Key                | Type             | Description                    |
| ------------------- | ---------------- | ----------------------- |
| items               | Array of Objects | Objects of shadow models        |
| items[].description | String           | Description of shadow models          |
| items[].updatedAt   | String           | Update time of shadow models (UTC) |
| items[].shadowID    | String           | ID of shadow models             |
| items[].createdAt   | String           | Create time of shadow models (UTC) |
| items[].shadowName  | String           | Name of shadow models            |
| meta                | Object           | Object of pagination              |
| meta.page           | Integer          | Page Number                    |
| meta.limit          | Integer          | Number of items displayed each page      |
| meta.count          | Integer          | Item Number              |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/shadows/?_page=1&_limit=10
```

### Response Example

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

## Get the specified shadow model’s properties

### URL

GET /shadows/${shadow_id}

### Request

[none]

### Response

| Key        | Type   | Description                    |
| ----------- | ------ | ----------------------- |
| description | String | Description of shadow models            |
| updatedAt   | String | Update time of shadow models (UTC) |
| shadowID    | String | ID of shadow models             |
| createdAt   | String | Create time of shadow models (UTC)  |
| shadowName  | String | Name of shadow models            |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/shadows/${shadow_id}
```

### Response Example

```json
{
  "description": "123", 
  "updatedAt": "2022-06-10 03:20", 
  "shadowID": "test_shadow", 
  "createdAt": "2022-06-10 03:20", 
  "shadowName": "test"
}
```

## Get the specified shadow model’s JSON

### URL

GET /shadows/${shadow_id}/json

### Request

[none]

### Response

| Key      | Type    | Description                           |
| --------- | ------- | ------------------------------ |
| createdAt | Integer | Timestamp of shadow service JSON created (UTC) |
| lastTime  | Integer | Timestamp of shadow service JSON published (UTC) |
| version   | Integer | Version of shadow service JSON              |
| data      | String  | Payload                      |

### Response Format Example
| Key         | Type    | Description |
| ------------ | ------- | ---- |
| data[].color | String  | color |
| data[].state | Integer | state |
| data[].power | Integer | electricity capacity |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/shadows/${shadow_id}/json
```

### Response Example

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

## Create a shadow model

### URL

POST /shadows

### Request

| Params        | Type   | Description         |
| ----------- | ------ | ------------ |
| description | String | Description of shadow models |
| shadowID    | String | ID of shadow models  |
| shadowName  | String | Name of shadow models |

::: tip Tip
ID of shadow models is optional, the system will automatically generate one.
:::

### Response

| Key        | Type   | Description                    |
| ----------- | ------ | ----------------------- |
| description | String | Description of shadow models            |
| updatedAt   | String | Update time of shadow models (UTC) |
| shadowID    | String | ID of shadow models             |
| createdAt   | String | Create time of shadow models (UTC)  |
| shadowName  | String | Name of shadow models            |

### Request Example

```bash
curl -u app_id:app_secret -X POST -d '{"description": "123","shadowID": "test_shadow","shadowName": "test"}' {api}/shadows
```

### Response Example

```json
{
  "description": "123", 
  "updatedAt": "2022-06-10 03:39", 
  "shadowID": "test_shadow", 
  "createdAt": "2022-06-10 03:39", 
  "shadowName": "test"
}
```

## Update the specified shadow model’s properties

### URL

PUT /shadows/${shadow_id}

### Request


| Params        | Type   | Description         |
| ----------- | ------ | ------------ |
| description | String | Description of shadow models |
| shadowName  | String | Name of shadow models |

::: tip Tip
The ID of shadow model can't be modified once it's created.
:::

### Response

| Key        | Type   | Description                    |
| ----------- | ------ | ----------------------- |
| description | String | Description of shadow models            |
| updatedAt   | String | Update time of shadow models (UTC) |
| shadowID    | String | ID of shadow models             |
| createdAt   | String | Create time of shadow models (UTC)  |
| shadowName  | String | Name of shadow models            |

### Request Example

```bash
curl -u app_id:app_secret -X PUT -d '{"description": "","shadowName": "test"}' {api}/shadows/${shadow_id}
```

### Response Example

```json
{
  "description": "", 
  "updatedAt": "2022-06-10 03:39", 
  "shadowID": "test_shadow", 
  "createdAt": "2022-06-10 03:39", 
  "shadowName": "test"
}
```

## Update the specified shadow model’s JSON entirely

### URL

PUT /shadows/${shadow_id}/json

### Request

| Params | Type   | Description     |
| ---- | ------ | -------- |
| data | String | Payload|

### Request Format Example
| Params         | Type    | Description |
| ------------ | ------- | ---- |
| data[].color | String  | color |
| data[].state | Integer | state |
| data[].power | Integer | electricity capacity |

### Response

| Key      | Type    | Description                           |
| --------- | ------- | ------------------------------ |
| createdAt | Integer | Timestamp of shadow service JSON created (UTC) |
| lastTime  | Integer | Timestamp of shadow service JSON published (UTC) |
| version   | Integer | Version of shadow service JSON              |
| data      | String  | Payload                      |

### Request Example

```bash
curl -u app_id:app_secret -X PUT -d '{"color": "blue","state": 1,"power": 0}' {api}/shadows/${shadow_id}/json
```

### Response Example

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

## Update the specified shadow model’s JSON partially

### URL

PATCH /shadows/${shadow_id}/json

### Request

| Params | Type   | Description     |
| ---- | ------ | -------- |
| data | String | Payload|

### Request Format Example
| Params         | Type    | Description |
| ------------ | ------- | ---- |
| data[].specs | Integer | specification |

### Response

| Key      | Type    | Description                           |
| --------- | ------- | ------------------------------ |
| createdAt | Integer | Timestamp of shadow service JSON created (UTC) |
| lastTime  | Integer | Timestamp of shadow service JSON published (UTC) |
| version   | Integer | Version of shadow service JSON              |
| data      | String  | Payload                      |

### Request Example

```bash
curl -u app_id:app_secret -X PATCH -d '{"specs": 2}' {api}/shadows/${shadow_id}/json
```

### Response Example

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

## Update a multi-level object level by level
### URL

PATCH /shadows/${shadow_id}/json

### Request

| Params | Type   | Description     |
| ---- | ------ | -------- |
| data | String | Payload|

### Response

| Key      | Type    | Description                           |
| --------- | ------- | ------------------------------ |
| createdAt | Integer | Timestamp of shadow service JSON created (UTC) |
| lastTime  | Integer | Timestamp of shadow service JSON published (UTC) |
| version   | Integer | Version of shadow service JSON              |
| data      | String  | Payload                      |

### Request Example

::: tip Tip
If you need to update a multi-level object incrementally, please update **level by level**. Do not add a multi-level object directly, it will return an error.
:::

```bash
# Wrong Request Example
curl -u app_id:app_secret -X PATCH -d '{"key": {"a":100}}' {api}/shadows/${shadow_id}/json
```

```bash
# Good Request Example
curl -u app_id:app_secret -X PATCH -d '{"key": {}}' {api}/shadows/${shadow_id}/json

curl -u app_id:app_secret -X PATCH -d '{"key": {"a":100}}' {api}/shadows/${shadow_id}/json
```

### Response Example

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

## Delete the specified shadow model

### URL

DELETE /shadows/${shadow_id}

### Request

[none]

### Response

[none]

### Request Example

```bash
curl -u app_id:app_secret -X DELETE {api}/shadows/${shadow_id}
```
