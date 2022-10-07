# Access Control(ACL) Management

## Create ACL Rule Based on clientid

### URI

POST /acl

### Request Message

| Name     | Type   | Description              |
| :------- | :----- | :----------------------- |
| clientid | String | clientid                 |
| topic    | String | Topic                    |
| action   | String | Action: sub, pub, pubsub |
| access   | String | If allowed: allow, deny  |

### Response Message

| Name          | Type    | Description |
| :------------ | :------ | :---------- |
| code          | Integer | 0           |
| data          | Object  | Rule Object |
| data.topic    | String  | Topic       |
| data.result   | String  | Result      |
| data.clientid | String  | clientid    |
| data.action   | String  | Action      |
| data.access   | String  | If allowed  |

### Request Example

``` bash
curl -u app_id:app_secret -X POST -d '{"clientid": "client1","topic": "a/b","action": "sub","access": "allow"}' {api}/acl
```

### Response Example

```JSON
{
  "data": {
    "topic": "a/b",
    "result": "ok",
    "clientid": "client1",
    "action": "sub",
    "access": "allow"
  },
  "code": 0
}
```

## Create ACL Rule Based on username

### URI

POST /acl

### Request Message

| Name     | Type   | Description              |
| :------- | :----- | :----------------------- |
| username | String | username                 |
| topic    | String | Topic                    |
| action   | String | Action: sub, pub, pubsub |
| access   | String | If allowed: allow, deny  |

### Response Message

| Name          | Type    | Description |
| :------------ | :------ | :---------- |
| code          | Integer | 0           |
| data          | Object  | Rule Object |
| data.topic    | String  | Topic       |
| data.result   | String  | Result      |
| data.username | String  | username    |
| data.action   | String  | Action      |
| data.access   | String  | If allowed  |

### Request Example

```bash
curl -u app_id:app_secret -X POST -d '{"username": "user1","topic": "a/b","action": "sub","access": "allow"}' {api}/acl
```

### Response Example

```JSON
{
  "data": {
    "username": "user1", 
    "topic": "a/b", 
    "result": "ok", 
    "action": "sub", 
    "access": "allow"
  }, 
  "code": 0
}
```

## Create ACL Rule Based on Everything

### URI

POST /acl

### Request Message

| Name   | Type   | Description              |
| :----- | :----- | :----------------------- |
| topic  | String | Topic                    |
| action | String | Action: sub, pub, pubsub |
| access | String | If allowed: allow, deny  |

### Response Message

| Name        | Type    | Description |
| :---------- | :------ | :---------- |
| code        | Integer | 0           |
| data        | Object  | Rule Object |
| data.topic  | String  | Topic       |
| data.result | String  | Result      |
| data.all    | String  | $all        |
| data.action | String  | Action      |
| data.access | String  | If allowed  |

### Request Example

```bash
curl -u app_id:app_secret -X POST -d '{"topic": "a/b","action": "pub","access": "allow"}' {api}/acl
```

### Response Example

```JSON
{
  "data": {
    "topic": "a/b",
    "result": "ok",
    "all": "$all",
    "action": "pub",
    "access": "allow"
  },
  "code": 0
}
```

## Batch Add ACL Rule

### URI

POST /acl

### Request Message

| Name         | Type   | Description              |
| :----------- | :----- | :----------------------- |
| [0].clientid | String | [0].clientid             |
| [0].topic    | String | Topic                    |
| [0].action   | String | Action: sub, pub, pubsub |
| [0].access   | String | If allowed: allow, deny  |
| [1].username | String | username                 |
| [1].topic    | String | Topic                    |
| [1].action   | String | Action: sub, pub, pubsub |
| [1].access   | String | If allowed: allow, deny  |
| [2].topic    | String | Topic                    |
| [2].action   | String | Action: sub, pub, pubsub |
| [2].access   | String | If allowed: allow, deny  |

### Response Message

| Name         | Type    | Description              |
| :----------- | :------ | :----------------------- |
| code         | Integer | 0                        |
| data         | Object  | Rule Object              |
| [0].clientid | String  | clientid                 |
| [0].topic    | String  | Topic                    |
| [0].action   | String  | Action: sub, pub, pubsub |
| [0].access   | String  | If allowed: allow, deny  |
| [0].result   | String  | Result                   |
| [1].username | String  | username                 |
| [1].topic    | String  | Topic                    |
| [1].action   | String  | Action: sub, pub, pubsub |
| [1].access   | String  | If allowed: allow, deny  |
| [1].result   | String  | Result                   |
| [2].topic    | String  | Topic                    |
| [2].action   | String  | Action: sub, pub, pubsub |
| [2].access   | String  | If allowed: allow, deny  |
| [2].all      | String  | $All                     |
| [2].result   | String  | Result                   |

### Request Example

```bash
curl -u app_id:app_secret -X POST -d '[{"clientid": "emqx_c_1","topic": "topic/A","action": "pub","access": "allow"},{"username": "emqx_u_1","topic": "topic/A","action": "sub","access": "allow"},{"topic": "topic/+","action": "pubsub","access": "deny"}]' {api}/acl
```

### Response Example

```JSON
{
  "data": [
    {
      "topic": "topic/+",
      "result": "ok",
      "all": "$all",
      "action": "pubsub",
      "access": "deny"
    },
    {
      "username": "emqx_u_1",
      "topic": "topic/A",
      "result": "ok",
      "action": "sub",
      "access": "allow"
    },
    {
      "topic": "topic/A",
      "result": "ok",
      "clientid": "emqx_c_1",
      "action": "pub",
      "access": "allow"
    }
  ],
  "code": 0
}
```

## Check ACL Rules Based on client id

### URI

GET /acl/clientid

### Request Message

None.

### Response Message

| Name            | Type             | Description                             |
| :-------------- | :--------------- | :-------------------------------------- |
| code            | Integer          | 0                                       |
| data            | Array of Objects | All the authentication information      |
| data[].topic    | String           | Topic                                   |
| data[].result   | String           | Result                                  |
| data[].clientid | String           | clientid                                |
| data[].action   | String           | Action                                  |
| data[].access   | String           | If allowed                              |
| meta            | Object           | Paging information                      |
| meta.page       | Integer          | Page number                             |
| meta.limit      | Integer          | Number of data items displayed per page |
| meta.count      | Integer          | Total number of data                    |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/acl/clientid
```

### Response Example

```JSON
{
  "meta": {
    "page": 1,
    "limit": 10,
    "count": 1
  },
  "data": [
    {
      "topic": "topic/A",
      "clientid": "emqx_c_1",
      "action": "pub",
      "access": "allow"
    }
  ],
  "code": 0
}
```

## Check ACL Rules Based on username

### URI

GET /acl/username

### Request Message

None.

### Response Message

| Name            | Type             | Description                             |
| :-------------- | :--------------- | :-------------------------------------- |
| code            | Integer          | 0                                       |
| data            | Array of Objects | All the authentication information      |
| data[].topic    | String           | Topic                                   |
| data[].result   | String           | Result                                  |
| data[].username | String           | username                                |
| data[].action   | String           | Action                                  |
| data[].access   | String           | If allowed                              |
| meta            | Object           | Paging information                      |
| meta.page       | Integer          | Page number                             |
| meta.limit      | Integer          | Number of data items displayed per page |
| meta.count      | Integer          | Total number of data                    |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/acl/username
```

### Response Example

```JSON
{
  "meta": {
    "page": 1,
    "limit": 10,
    "count": 1
  },
  "data": [
    {
      "username": "emqx_u_1",
      "topic": "topic/A",
      "action": "sub",
      "access": "allow"
    }
  ],
  "code": 0
}
```

## Check ACL Rules Based on All

### URI

GET /acl/$all

### Request Message

None.

### Response Message

| Name          | Type             | Description                             |
| :------------ | :--------------- | :-------------------------------------- |
| code          | Integer          | 0                                       |
| data          | Array of Objects | All the authentication information      |
| data[].topic  | String           | Topic                                   |
| data[].result | String           | Result                                  |
| data[].all    | String           | $all                                    |
| data[].action | String           | Action                                  |
| data[].access | String           | If allowed                              |
| meta          | Object           | Paging information                      |
| meta.page     | Integer          | Page number                             |
| meta.limit    | Integer          | Number of data items displayed per page |
| meta.count    | Integer          | Total number of data                    |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/acl/\$all
```

### Response Example

```JSON
{
  "meta": {
    "page": 1,
    "limit": 10,
    "count": 1
  },
  "data": [
    {
      "topic": "topic/A",
      "all": "$all",
      "action": "sub",
      "access": "allow"
    }
  ],
  "code": 0
}
```

## Check ACL Rules for Specified Client Id

### URI

GET /acl/clientid/{clientid}

#### Parameter

| Name     | Type   | Description |
| :------- | :----- | :---------- |
| clientid | String | clientid    |

### Request Message

None.

### Response Message

| Name            | Type             | Description                        |
| :-------------- | :--------------- | :--------------------------------- |
| code            | Integer          | 0                                  |
| data            | Array of Objects | All the authentication information |
| data[].topic    | String           | Topic                              |
| data[].clientid | String           | clientid                           |
| data[].action   | String           | Action                             |
| data[].access   | String           | If allowed                         |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/acl/clientid/emqx_c_1
```

### Response Example

```JSON
{
  "data": [
    {
      "topic": "topic/A",
      "clientid": "emqx_c_1",
      "action": "pub",
      "access": "allow"
    }
  ],
  "code": 0
}
```

## Check ACL Rules for Specified Username

### URI

GET /acl/username/{username}

#### Parameter

| Name     | Type   | Description |
| :------- | :----- | :---------- |
| username | String | username    |

### Request Message

None.

### Response Message

| Name            | Type             | Description                        |
| :-------------- | :--------------- | :--------------------------------- |
| code            | Integer          | 0                                  |
| data            | Array of Objects | All the authentication information |
| data[].topic    | String           | Topic                              |
| data[].username | String           | username                           |
| data[].action   | String           | Action                             |
| data[].access   | String           | If allowed                         |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/acl/username/emqx_u_1
```

### Response Example

```JSON
{
  "data": [
    {
      "topic": "topic/A",
      "username": "emqx_u_1",
      "action": "pub",
      "access": "allow"
    }
  ],
  "code": 0
}
```

## Delete the ACL Rule Specified by the Specified client id

### URI

DELETE /acl/clientid/{clientid}/topic/{topic}

#### Parameter

| Name     | Type   | Description                               |
| :------- | :----- | :---------------------------------------- |
| clientid | String | clientid                                  |
| topic    | String | topic, may need to use UrlEncode encoding |

### Request Message

None.

### Response Message

| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example

```bash
curl -u app_id:app_secret -X DELETE {api}/acl/clientid/emqx_c_1/topic/topic%2fA
```

### Response Example

```JSON
{
  "code": 0
}
```

## Delete the ACL Rule Specified by the Specified username

### URI

DELETE /acl/username/{username}/topic/{topic}

#### Parameter

| Name     | Type   | Description                               |
| :------- | :----- | :---------------------------------------- |
| username | String | username                                  |
| topic    | String | topic, may need to use UrlEncode encoding |

### Request Message

None.

### Response Message

| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example

```bash
curl -u app_id:app_secret -X DELETE {api}/acl/username/emqx_u_1/topic/topic%2uA
```

### Response Example

```JSON
{
  "code": 0
}
```

## Delete based on All Specified ACL Rules

### URI

DELETE /acl/$all/topic/{topic}

#### Parameter

| Name  | Type   | Description                               |
| :---- | :----- | :---------------------------------------- |
| topic | String | topic, may need to use UrlEncode encoding |

### Request Message

None.

### Response Message

| Name | Type    | Description |
| :--- | :------ | :---------- |
| code | Integer | 0           |

### Request Example

```bash
curl -u app_id:app_secret -X DELETE {api}/acl/all/\$all/topic/topic%2uA
```

### Response Example

```JSON
{
  "code": 0
}
```
