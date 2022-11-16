# Blacklist Management

## Check Blacklist Information

### URI

GET /banned

Get the blacklist

**Query String Parameters:**

| Name   | Type    | Description                       |
|--------|---------|-----------------------------------|
| _page  | Integer | Page number                       |
| _limit | Integer | Number of data displayed per page |

### Request Message

None

### Response Message

| Name          | Type             | Description                                        |
|:--------------|:-----------------|:---------------------------------------------------|
| code          | Integer          | 0                                                  |
| data          | Array of Objects | Blacklist data                                     |
| data[].who    | String           | Objects added to the blacklist                     |
| data[].as     | String           | Used to distinguish the types of blacklist objects |
| data[].reason | String           | Detailed information                               |
| data[].by     | String           | Indicate which object was added to the blacklist   |
| data[].at     | Integer          | Time added to blacklist, unit: second              |
| data[].until  | Integer          | When to remove from blacklist, unit: second        |
| meta          | Object           | Paging information                                 |
| meta.page     | Integer          | Page number                                        |
| meta.limit    | Integer          | Number of data displayed per page                  |
| meta.count    | Integer          | Total number of data                               |

### Request Example

```bash
$ curl -u app_id:app_secret -X GET {api}/banned
```

### Response Example

```JSON
{
  "meta": {
    "page": 1,
    "limit": 10,
    "count": 2
  },
  "data": [
    {
      "who": "clientid_test",
      "until": 1668504415,
      "reason": "reason_test",
      "by": "user",
      "at": 1668504115,
      "as": "clientid"
    },
    {
      "who": "user_test",
      "until": 1668504469,
      "reason": "reason_test",
      "by": "admin",
      "at": 1668504169,
      "as": "username"
    }
  ],
  "code": 0
}
```

## create blacklist information

### URI

POST /banned

Add object to blacklist

### Request Message

| Name   | Type    | Required | Default                        | Description                                                                                       |
|:-------|:--------|:---------|:-------------------------------|:--------------------------------------------------------------------------------------------------|
| who    | String  | Required |                                | Objects added to the blacklist, which can be client identifiers, usernames, and IP addresses      |
| as     | String  | Required |                                | Used to distinguish the types of blacklist objects, which can be `clientid`，`username`，`peerhost` |
| reason | String  | Required |                                | Detailed information                                                                              |
| by     | String  | Optional | user                           | Indicate which object was added to the blacklist                                                  |
| at     | Integer | Optional | Current system time            | Time added to blacklist, unit: second                                                             |
| until  | Integer | Optional | Current system time+ 5 minutes | When to remove from blacklist, unit: second                                                       |

### Response Message

| Name        | Type    | Description                                        |
|:------------|:--------|:---------------------------------------------------|
| code        | Integer | 0                                                  |
| data        | Objects | Blacklist information                              |
| data.who    | String  | Objects added to the blacklist                     |
| data.as     | String  | Used to distinguish the types of blacklist objects |
| data.reason | String  | Detailed information                               |
| data.by     | String  | Indicate which object was added to the blacklist   |
| data.at     | Integer | Time added to blacklist, unit: second              |
| data.until  | Integer | When to remove from blacklist, unit: second        |

### Request Example

```bash
$ curl -u app_id:app_secret -X POST {api}/banned -d '{"who":"example","as":"clientid","reason":"example"}'
```

### Response Example

```JSON
{
  "code": 0,
  "data": {
    "who": "example",
    "until": 1668504415,
    "reason": "example",
    "by": "user",
    "at": 1668504115,
    "as": "clientid"
  }
}
```

## Delete blacklist information

### URI

DELETE /banned/{as}/{who}

Delete object from blacklist

### Request Message

None

### Response Message

| Name    | Type    | Description                                                                 |
|:--------|:--------|:----------------------------------------------------------------------------|
| code    | Integer | 0                                                                           |
| message | String  | Return only when an error occurs to provide more detailed error information |

### Request Example

```bash
$ curl -u app_id:app_secret -X DELETE {api}/banned/clientid/example
```

### Response Example

```JSON
{
  "code": 0
}
```