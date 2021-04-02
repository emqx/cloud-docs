# Authentication Management

## Check Username Authentication Information

### URI

GET /auth_username

### Request Message

None

### Response Message

| Name                 | Type             | Description                             |
| :------------------- | :--------------- | :-------------------------------------- |
| code                 | Integer          | 0                                       |
| data                 | Array of Objects | All authentication data                 |
| data[].username        | String           | Login Username                          |
| meta                 | Object           | Paging information                                |
| meta.page            | Integer          | Page number                             |
| meta.limit           | Integer          | Number of data items displayed per page |
| meta.count           | Integer          | Total number of data                    |

### Request Example
```bash
$ curl -u app_id:app_secret -X GET {api}/auth_username
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
| Name                | Type             | Description                             |
| :------------------- | :--------------- | :-------------------------------------- |
| username                 | String          | username                                      |

### Request Message
None

### Response Message
| Name                 | Type             | Description                             |
| :------------------- | :--------------- | :-------------------------------------- |
| code                 | Integer          | 0                                       |
| data                 | Array of Objects | All authentication data                 |
| data[].username        | String           | Login Username                          |
| data[].password        | String           | Use sha256 encrypted password                        |

### Request Example
```bash 
$ curl -u app_id:app_secret -X GET {api}/auth_username/user1
```

### Response Example
```JSON
{
  "data": {
    "password": "7\\�ce8268d18e3ba8f5ffba3786b95f3f323e6d7f499ce9cb92f0fc9f54eb8e0316",
    "clientid": "user1"
  },
  "code": 0
}
```

## Create Username Authentication Information
### URI
POST /auth_username
### Request Message
| Name                 | Type             | Description                             |
| :------------------- | :--------------- | :-------------------------------------- |
| username                 | String          | Authenticated username                                      |
| password                 | String | Authenticated password                 |

### Response Message
| Name                 | Type             | Description                             |
| :------------------- | :--------------- | :-------------------------------------- |
| code  | Integer          | 0                                      |

### Request Example
```bash 
$ curl -u app_id:app_secret -X POST {api}/auth_username
```
```JSON
{
  "username": "user_test",
  "password": "password"
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
| Name                 | Type             | Description                             |
| :------------------- | :--------------- | :-------------------------------------- |
| [].username                 | String          | Authenticated username                                      |
| [].password                 | String | Authenticated password                 |

### Response Message
| Name                 | Type             | Description                             |
| :------------------- | :--------------- | :-------------------------------------- |
| code  | Integer          | 0                                      |
| data  | Array of Objects         | Create result, key means username, value means request result, ok means create successfully                                      |


### Request Example
```bash 
$ curl -u app_id:app_secret -X POST {api}/auth_username
```
```JSON
[
  {
    "username": "api_user1",
    "password": "password"
  },
  {
    "username": "api_user2",
    "password": "password"
  }
]
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
| Name                 | Type             | Description                             |
| :------------------- | :--------------- | :-------------------------------------- |
| username                 | String          | Updated username                                      |

### Request Message
| Name                 | Type             | Description                             |
| :------------------- | :--------------- | :-------------------------------------- |
| password                 | String          | Authentication password                                      |

### Response Message
| Name                 | Type             | Description                             |
| :------------------- | :--------------- | :-------------------------------------- |
| code  | Integer          | 0                                      |


### Request Example
```bash 
$ curl -u app_id:app_secret -X PUT {api}/auth_username/api_user1
```
```JSON
{
  "password": "password"
}
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
| Name                 | Type             | Description                             |
| :------------------- | :--------------- | :-------------------------------------- |
| username                 | String          | Deleted username                                      |

### Request Message
None
### Response Message
| Name                 | Type             | Description                             |
| :------------------- | :--------------- | :-------------------------------------- |
| code  | Integer          | 0                                      |


### Request Example
```bash 
$ curl -u app_id:app_secret -X DELETE {api}/auth_username/api_user1
```

### Response Example
```JSON
{
  "code": 0
}
```
