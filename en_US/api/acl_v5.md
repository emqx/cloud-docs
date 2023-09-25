# Access Control Management API

This API documentation provides various operation information related to Access Control (ACL) management, including creating, viewing, updating, and deleting ACL rules.

## Create/Batch Create ACL Rules Based on Client ID

### URI

POST /authorization/sources/built_in_database/rules/clients

### Request Message

| Name          | Type   | Description                |
| ------------- | ------ | -------------------------- |
| clientid      | String | client id                  |
| rules         | Object | Rules to define            |
| [].topic      | String | Topic                      |
| [].action     | String | Action: sub, pub, pubsub   |
| [].permission | String | Allow or deny: allow, deny |

### Response Message

Status code

### Request Example

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '{"clientid": "client1","rules":[{"topic": "t/a","action": "sub","permission": "allow"}]}' {api}/authorization/sources/built_in_database/rules/clients
```

### Response Example

```http
// HTTP status response code
204 
```

## Create/Batch Create ACL Rules Based on Username

### URI

POST /authorization/sources/built_in_database/rules/users

### Request Message

| Name          | Type   | Description                |
| ------------- | ------ | -------------------------- |
| username      | String | username                   |
| rules         | Object | Rules to define            |
| [].topic      | String | Topic                      |
| [].action     | String | Action: sub, pub, pubsub   |
| [].permission | String | Allow or deny: allow, deny |

### Response Message

Status code

### Request Example

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '{"username": "emqx_user","rules":[{"topic": "t/a","action": "sub","permission": "allow"}]}' {api}/authorization/sources/built_in_database/rules/users
```

### Response Example

```http
// HTTP status response code
204 
```

## Create/Batch Create ACL Rules Based on All

### URI

POST /authorization/sources/built_in_database/rules/all

### Request Message

| Name          | Type   | Description                |
| ------------- | ------ | -------------------------- |
| rules         | Object | Rules to define            |
| [].topic      | String | Topic                      |
| [].action     | String | Action: sub, pub, pubsub   |
| [].permission | String | Allow or deny: allow, deny |

### Response Message

Status code

### Request Example

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '{"rules":[{"topic": "t/a","action": "sub","permission": "allow"}]}' {api}/authorization/sources/built_in_database/rules/all
```

### Response Example

```http
// HTTP status response code
204 
```

## View ACL Rules Based on Client ID

### URI

GET /authorization/sources/built_in_database/rules/clients

### Request Message

None

### Response Message

| Name               | Type             | Description                   |
| :----------------- | :--------------- | :---------------------------- |
| clientid           | String           | client id                     |
| rules              | Array of Objects | All authentication data       |
| rules[].topic      | String           | Topic                         |
| rules[].action     | String           | Action                        |
| rules[].permission | String           | Allow or deny                 |
| meta               | Object           | Pagination information        |
| meta.page          | Integer          | Page number                   |
| meta.limit         | Integer          | Number of data items per page |
| meta.count         | Integer          | Total number of data items    |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/authorization/sources/built_in_database/rules/clients
```

### Response Example

```json
{
  "data": [
    {
      "clientid": "client1",
      "rules": [
        {
          "action": "publish",
          "permission": "allow",
          "topic": "test/topic/1"
        },
        {
          "action": "subscribe",
          "permission": "allow",
          "topic": "test/topic/2"
        },
        {
          "action": "all",
          "permission": "deny",
          "topic": "eq test/#"
        }
      ]
    }
  ],
  "meta": {
    // "count": 1  -- The count field is only returned when the like_clientid fuzzy query condition is empty.
    "hasnext": false,
    "limit": 50,
    "page": 1
  }
}
```

## View ACL Rules Based on Username

### URI

GET /authorization/sources/built_in_database/rules/users

### Request Message

None

### Response Message

| Name               | Type             | Description                   |
| :----------------- | :--------------- | :---------------------------- |
| username           | String           | Access control username       |
| rules              | Array of Objects | All authentication data       |
| rules[].topic      | String           | Topic                         |
| rules[].action     | String           | Action                        |
| rules[].permission | String           | Allow or deny                 |
| meta               | Object           | Pagination information        |
| meta.page          | Integer          | Page number                   |
| meta.limit         | Integer          | Number of data items per page |
| meta.count         | Integer          | Total number of data items    |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/authorization/sources/built_in_database/rules/users
```

### Response Example

```json
{
  "data": [
    {
      "rules": [
        {
          "action": "publish",
          "permission": "allow",
          "topic": "t/a"
        }
      ],
      "username": "user1"
    },
    {
      "rules": [
        {
          "action": "publish",
          "permission": "allow",
          "topic": "test/topic/1"
        },
        {
          "action": "subscribe",
          "permission": "allow",
          "topic": "test/topic/2"
        },
        {
          "action": "all",
          "permission": "deny",
          "topic": "eq test/#"
        }
      ],
      "username": "user2"
    }
  ],
  "meta": {
    // "count": 1  -- The count field is only returned when the like_username fuzzy query condition is empty.
    "hasnext": false,
    "limit": 50,
    "page": 1
  }
}
```

## View All ACL Rules

### URI

GET /authorization/sources/built_in_database/rules/all

### Request Message

None

### Response Message

| Name               | Type             | Description                   |
| :----------------- | :--------------- | :---------------------------- |
| rules              | Array of Objects | All authentication data       |
| rules[].topic      | String           | Topic                         |
| rules[].action     | String           | Action                        |
| rules[].permission | String           | Allow or deny                 |
| meta               | Object           | Pagination information        |
| meta.page          | Integer          | Page number                   |
| meta.limit         | Integer          | Number of data items per page |
| meta.count         | Integer          | Total number of data items    |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/authorization/sources/built_in_database/rules/all
```

### Response Example

```json
{
  "rules": [
    {
      "action": "publish",
      "permission": "allow",
      "topic": "test/topic/1"
    },
    {
      "action": "subscribe",
      "permission": "allow",
      "topic": "test/topic/2"
    },
    {
      "action": "all",
      "permission": "deny",
      "topic": "eq test/#"
    }
  ]
}
```

## View ACL Rules for a Specific Client ID

### URI

GET /authorization/sources/built_in_database/rules/clients/{clientid}

**Parameters:**

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| clientid  | String | clientid    |

### Request Message

None

### Response Message

| Name               | Type             | Description             |
| :----------------- | :--------------- | :---------------------- |
| clientid           | String           | client id               |
| rules              | Array of Objects | All authentication data |
| rules[].topic      | String           | Topic                   |
| rules[].action     | String           | Action                  |
| rules[].permission | String           | Allow or deny           |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/authorization/sources/built_in_database/rules/clients/client1
```

### Response Example

```json
{
  "clientid": "client1",
  "rules": [
    {
      "action": "publish",
      "permission": "allow",
      "topic": "test/topic/1"
    },
    {
      "action": "subscribe",
      "permission": "allow",
      "topic": "test/topic/2"
    },
    {
      "action": "all",
      "permission": "deny",
      "topic": "eq test/#"
    }
  ]
}
```

## View ACL Rules for a Specific Username

### URI

GET /authorization/sources/built_in_database/rules/users/{username}

**Parameters:**

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| username  | String | username    |

### Request Message

None

### Response Message

| Name               | Type             | Description             |
| :----------------- | :--------------- | :---------------------- |
| username           | String           | Access control username |
| rules              | Array of Objects | All authentication data |
| rules[].topic      | String           | Topic                   |
| rules[].action     | String           | Action                  |
| rules[].permission | String           | Allow or deny           |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/acl/authorization/sources/built_in_database/rules/users/user1
```

### Response Example

```json
{
  "rules": [
    {
      "action": "publish",
      "permission": "allow",
      "topic": "test/topic/1"
    }
  ],
  "username": "user1"
}
```

## Update ACL Rules for a Specific Client ID

### URI

PUT /authorization/sources/built_in_database/rules/clients/{clientid}

**Parameters:**

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| clientid  | String | clientid    |

### Request Message

| Name               | Type             | Description             |
| :----------------- | :--------------- | :---------------------- |
| clientid           | String           | client id               |
| rules              | Array of Objects | All authentication data |
| rules[].topic      | String           | Topic                   |
| rules[].action     | String           | Action                  |
| rules[].permission | String           | Allow or deny           |

### Response Message

Status code

### Request Example

```bash
curl -u app_id:app_secret -X PUT -H 'Content-Type: application/json' -d '{"clientid": "client1","rules":[{"topic": "t/a","action": "sub","permission": "allow"}]}' {api}/authorization/sources/built_in_database/rules/clients/client1
```

### Response Example

```http
// HTTP status response code
204 
```

## Update ACL Rules for a Specific Username

### URI

PUT /authorization/sources/built_in_database/rules/users/{username}

**Parameters:**

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| username  | String | username    |

### Request Message

| Name               | Type             | Description             |
| :----------------- | :--------------- | :---------------------- |
| username           | String           | Access control username |
| rules              | Array of Objects | All authentication data |
| rules[].topic      | String           | Topic                   |
| rules[].action     | String           | Action                  |
| rules[].permission | String           | Allow or deny           |

### Response Message

Status code

### Request Example

```bash
curl -u app_id:app_secret -X PUT -H 'Content-Type: application/json' -d '{"username": "emqx_user","rules":[{"topic": "t/a","action": "sub","permission": "allow"}]}' {api}/acl/authorization/sources/built_in_database/rules/users/user1
```

### Response Example

```http
// HTTP status response code
204 
```

## Delete ACL Rules for a Specific Client ID

### URI

DELETE /authorization/sources/built_in_database/rules/clients/{clientid}

### Request Message

None

### Response Message

Status code

### Request Example

```bash
curl -u app_id:app_secret -X DELETE {api}/authorization/sources/built_in_database/rules/clients/clientid1
```

### Response Example

```http
// HTTP status response code
204 
```

## Delete ACL Rules for a Specific Username

### URI

DELETE /authorization/sources/built_in_database/rules/users/{username}

### Request Message

None

### Response Message

Status code

### Request Example

```bash
curl -u app_id:app_secret -X DELETE {api}/authorization/sources/built_in_database/rules/users/user1
```

### Response Example

```http
// HTTP status response code
204 
```

## Delete All ACL Rules

### URI

DELETE /authorization/sources/built_in_database/rules/all

### Request Message

None

### Response Message

Status code

### Request Example

```bash
curl -u app_id:app_secret -X DELETE {api}/authorization/sources/built_in_database/rules/all
```

### Response Example

```http
// HTTP status response code
204 
```