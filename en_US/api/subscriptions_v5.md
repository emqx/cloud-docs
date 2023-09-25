# Subscription Information API

This API documentation provides information on operations related to viewing MQTT client subscription information, including retrieving all subscription information and retrieving all subscription information for a specific client.

## Get All Subscription Information

Retrieve all subscription information within the deployment, with support for pagination.

### URI

GET /subscriptions

### Request Message

Query Parameters:

| Name         | Type    | Description                         |
| ------------ | ------- | ----------------------------------- |
| _page        | Integer | Page number                         |
| _limit       | Integer | Number of data entries per page     |
| clientid     | String  | Client identifier                   |
| qos          | Integer | Can take values: `0`, `1`, `2`      |
| share        | String  | Group name for shared subscriptions |
| _match_topic | String  | Topic for matching query            |

### Response Message

| Name            | Type             | Description                     |
| --------------- | ---------------- | ------------------------------- |
| data            | Array of Objects | All subscription information    |
| data[].node     | String           | Node name                       |
| data[].clientid | String           | Client identifier               |
| data[].topic    | String           | Subscribed topic                |
| data[].qos      | Integer          | QoS level                       |
| nl              | Integer          | No Local                        |
| rap             | Integer          | Retain as Published             |
| rh              | Integer          | Retain Handling                 |
| meta            | Object           | Pagination information          |
| meta.page       | Integer          | Page number                     |
| meta.limit      | Integer          | Number of data entries per page |
| meta.count      | Integer          | Total data entries              |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/subscriptions
```

### Response Example

```json
// HTTP status response code
200
// HTTP response body
{
  "meta": {
    "page": 1,
    "limit": 100,
    "hasnext": false,
    "count": 2
  },
  "data": [
    {
      "topic": "t/a",
      "qos": 0,
      "node": "emqx@10.12.50.91",
      "clientid": "client_1",
      "nl": 0,
      "rap": 0,
      "rh": 0,
    },
    {
      "topic": "t/b",
      "qos": 1,
      "node": "emqx@10.12.50.91",
      "clientid": "client_2",
      "nl": 0,
      "rap": 0,
      "rh": 0,
    }
  ]
}
```

## Get All Subscriptions for a Specific Client

### URI

GET /clients/{client_id}/subscriptions

### Request Message

### Response Message

| Name            | Type             | Description                  |
| --------------- | ---------------- | ---------------------------- |
| data            | Array of Objects | All subscription information |
| data[].node     | String           | Node name                    |
| data[].clientid | String           | Client identifier            |
| data[].topic    | String           | Subscribed topic             |
| data[].qos      | Integer          | QoS level                    |
| nl              | Integer          | No Local                     |
| rap             | Integer          | Retain as Published          |
| rh              | Integer          | Retain Handling              |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/clients/client_1/subscriptions
```

### Response Example

```json
{
  "data": [
    {
      "topic": "t/a",
      "qos": 0,
      "node": "emqx@10.12.50.36",
      "clientid": "client_1",
      "nl": 0,
      "rap": 0,
      "rh": 0,
    },
    {
      "topic": "t/b",
      "qos": 1,
      "node": "emqx@10.12.50.36",
      "clientid": "client_1",
      "nl": 0,
      "rap": 0,
      "rh": 0,
    }
  ]
}
```

