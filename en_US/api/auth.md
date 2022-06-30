# Authentication Management

## Check Username Authentication Information

### URI

GET /auth_username

### Request Message

None

### Response Message

| Name            | Type             | Description                             |
| :-------------- | :--------------- | :-------------------------------------- |
| code            | Integer          | 0                                       |
| data            | Array of Objects | All authentication data                 |
| data[].username | String           | Login Username                          |
| meta            | Object           | Paging information                      |
| meta.page       | Integer          | Page number                             |
| meta.limit      | Integer          | Number of data items displayed per page |
| meta.count      | Integer          | Total number of data                    |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/auth_username
```

### Response Example

```JSON
{
  "meta": {
    "page": 1,
    "limit": 10,
    "count": 3
  },
  "data": [
    {
      "username": "api_user2"
    },
    {
      "username": "api_user1"
    },
    {
      "username": "test"
    }
  ],
  "code": 0
}
```

## Check the Authentication Information for the specified username

### URI

GET /auth_username/{username}

#### Parameter

| Name     | Type   | Description |
| :------- | :----- | :---------- |
| username | String | username    |

### Request Message

None

### Response Message

| Name            | Type             | Description                   |
| :-------------- | :--------------- | :---------------------------- |
| code            | Integer          | 0                             |
| data            | Array of Objects | All authentication data       |
| data[].username | String           | Login Username                |
| data[].password | String           | Use sha256 encrypted password |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/auth_username/user1 
```

### Response Example

```JSON
```JSON
{
    "data": {
        "username": "user1"
    },
    "code": 0
}
```

## Create Username Authentication Information

### URI

POST /auth_username

### Request Message

| Name     | Type   | Description            |
| :------- | :----- | :--------------------- |
| username | String | Authenticated username |
| password | String | Authenticated password |

### Response Message

| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example

```bash
curl -u app_id:app_secret -X POST -d '{"username": "user_test", "password": "password"}' {api}/auth_username 
```

```JSON
{
  "code": 0
}
```

### Response Example

```JSON
{
"code": 0
}
```

## Batch Create Username Authentication Information

### URI

POST /auth_username

### Request Message

| Name        | Type   | Description            |
| :---------- | :----- | :--------------------- |
| [].username | String | Authenticated username |
| [].password | String | Authenticated password |

### Response Message

| Name | Type             | Description                                                                                 |
| :--- | :--------------- | :------------------------------------------------------------------------------------------ |
| code | Integer          | 0                                                                                           |
| data | Array of Objects | Create result, key means username, value means request result, ok means create successfully |

### Request Example

```bash
curl -u app_id:app_secret -X POST -d '[{"username": "api_user1", "password": "password"},{"username": "api_user2", "password": "password"}]' {api}/auth_username
```

### Response Example

```JSON
{
  "data": {
    "api_user1": "ok",
    "api_user2": "ok"
  },
  "code": 0
}
```

## Update the Username Authentication Password

### URI

PUT /auth_username/{username}

#### Parameter

| Name     | Type   | Description      |
| :------- | :----- | :--------------- |
| username | String | Updated username |

### Request Message

| Name     | Type   | Description             |
| :------- | :----- | :---------------------- |
| password | String | Authentication password |

### Response Message

| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example

```bash
curl -u app_id:app_secret -X PUT  -d '{"password": "new_password"}' {api}/auth_username/api_user1
```

### Response Example

```JSON
{
  "code": 0
}
```

## Delete Username Authentication Information

### URI

DELETE /auth_username/{username}

#### Parameter

| Name     | Type   | Description      |
| :------- | :----- | :--------------- |
| username | String | Deleted username |

### Request Message

None

### Response Message

| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example

```bash
curl -u app_id:app_secret -X DELETE {api}/auth_username/api_user1
```

### Response Example

```JSON
{
  "code": 0
}
```

## Check Client Authentication Information

### URI

GET /auth_clientid

### Request Message

None

### Response Message

| Name            | Type             | Description                             |
| :-------------- | :--------------- | :-------------------------------------- |
| code            | Integer          | 0                                       |
| data            | Array of Objects | All authentication data                 |
| data[].clientid | String           | Login Clientid                          |
| meta            | Object           | Paging information                      |
| meta.page       | Integer          | Page number                             |
| meta.limit      | Integer          | Number of data items displayed per page |
| meta.count      | Integer          | Total number of data                    |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/auth_clientid
```

### Response Example

```JSON
{
  "meta": {
    "page": 1,
    "limit": 10,
    "count": 3
  },
  "data": [
    {
      "clientid": "api_user2"
    },
    {
      "clientid": "api_user1"
    },
    {
      "clientid": "test"
    }
  ],
  "code": 0
}
```

## Check the Authentication Information for the specified username

### URI

GET /auth_clientid/{clientid}

#### Parameter

| Name     | Type   | Description |
| :------- | :----- | :---------- |
| clientid | String | clientid    |

### Request Message

None

### Response Message

| Name            | Type             | Description             |
| :-------------- | :--------------- | :---------------------- |
| code            | Integer          | 0                       |
| data            | Array of Objects | All authentication data |
| data[].clientid | String           | clientid                |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/auth_clientid/clientid_1
```

### Response Example

```JSON
{
  "data": {
     "clientid": "clientid_1"
  },
  "code": 0
}
```

## Create Client Authentication Information

### URI

POST /auth_clientid

### Request Message

| Name     | Type   | Description            |
| :------- | :----- | :--------------------- |
| clientid | String | Authenticated clientid |
| password | String | Authenticated password |

### Response Message

| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example

```bash
curl -u app_id:app_secret -X POST -d '{"clientid": "test", "password": "password"}' {api}/auth_clientid
```

### Response Example

```JSON
{
"code": 0
}
```

## Batch Create Client Authentication Information

### URI

POST /auth_clientid

### Request Message

| Name        | Type   | Description            |
| :---------- | :----- | :--------------------- |
| [].clientid | String | Authenticated clientid |
| [].password | String | Authenticated password |

### Response Message

| Name | Type             | Description                                                                                 |
| :--- | :--------------- | :------------------------------------------------------------------------------------------ |
| code | Integer          | 0                                                                                           |
| data | Array of Objects | Create result, key means clientid, value means request result, ok means create successfully |

### Request Example

```bash
curl -u app_id:app_secret -X POST -d '[{"clientid": "test1", "password": "password"},{"clientid": "test2", "password": "password"}]' {api}/auth_clientid
```

### Response Example

```JSON
{
  "data": {
    "test1": "ok",
    "test2": "ok"
  },
  "code": 0
}
```

## Update the Client Authentication Password

### URI

PUT /auth_clientid/{clientid}

#### Parameter

| Name     | Type   | Description      |
| :------- | :----- | :--------------- |
| clientid | String | Updated clientid |

### Request Message

| Name     | Type   | Description             |
| :------- | :----- | :---------------------- |
| password | String | Authentication password |

### Response Message

| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example

```bash
curl -u app_id:app_secret -X PUT -d '{"password": "new_password"}' {api}/auth_clientid/test1
```

### Response Example

```JSON
{
  "code": 0
}
```

## Delete Client Authentication Information

### URI

DELETE /auth_clientid/{clientid}

#### Parameter

| Name     | Type   | Description      |
| :------- | :----- | :--------------- |
| clientid | String | Deleted clientid |

### Request Message

None

### Response Message

| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example

```bash
curl -u app_id:app_secret -X DELETE {api}/auth_clientid/test1
```

### Response Example

```JSON
{
  "code": 0
}
```
