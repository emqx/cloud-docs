# Authentication Management API

This API documentation provides various operation information related to username authentication management, including viewing and creating authentication information, updating authentication passwords, and deleting authentication information.

## View User Authentication Information

### URI

GET /authentication/password_based%3Abuilt_in_database/users

### Request Message

None

### Response Message

| Name                | Type             | Description                     |
| :------------------ | :--------------- | :------------------------------ |
| data                | Array of Objects | Authentication data             |
| data[].user_id      | String           | Login username                  |
| data[].is_superuser | Boolean          | Whether the user is a superuser |
| meta                | Object           | Pagination information          |
| meta.count          | Integer          | Total number of users           |
| meta.page           | Integer          | Page number                     |
| meta.limit          | Integer          | Number of data items per page   |
| meta.hasnext        | Boolean          | Whether there is a next page    |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/authentication/password_based%3Abuilt_in_database/users
```

### Response Example

```json
{
  "meta": {
    "count": 1,
    "hasnext": false,
    "limit": 10,
    "page": 1
  },
  "data": [
    {
      "is_superuser": false,
      "user_id": "user1"
    },
    {
      "is_superuser": false,
      "user_id": "user2"
    },
    {
      "is_superuser": false,
      "user_id": "user3"
    }
  ]
}
```

## View Authentication Information for a Specific User

### URI

GET /authentication/password_based%3Abuilt_in_database/users/{user_id}

**Parameters:**

| Parameter | Type   | Description             |
| --------- | ------ | ----------------------- |
| user_id   | String | Authentication username |

### Request Message

None

### Response Message

| Name              | Type    | Description                     |
| :---------------- | :------ | :------------------------------ |
| data              | Object  | Authentication data             |
| data.user_id      | String  | Authentication username         |
| data.is_superuser | Boolean | Whether the user is a superuser |

### Request Example

```bash
curl -u app_id:app_secret -X GET {api}/authentication/password_based%3Abuilt_in_database/users/user1
```

### Response Example

```json
// HTTP status response code
200
// HTTP response body
{
    "data": {
      "is_superuser": false,
      "user_id": "user1"
    }
}

// HTTP status response code
404
// HTTP response body
{
    "code": "NOT_FOUND",
    "message": "User not found"
}
```

## Create User Authentication Information

### URI

POST /authentication/password_based%3Abuilt_in_database/users

### Request Message

| Name     | Type   | Description             |
| :------- | :----- | :---------------------- |
| user_id  | String | Authentication username |
| password | String | Authentication password |

### Response Message

| Name              | Type    | Description                     |
| :---------------- | :------ | :------------------------------ |
| user_id           | String  | Authentication username         |
| data.is_superuser | Boolean | Whether the user is a superuser |

### Request Example

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '{"user_id": "user1", "password": "password"}' {api}/authentication/password_based%3Abuilt_in_database/users
```

### Response Example

```json
// HTTP status response code
201
// HTTP response body
{
  "user_id": "user1",
  "is_superuser": false
}
```

## Batch Create User Authentication Information

### URI

POST /authentication/password_based%3Abuilt_in_database/import_users?type=plain

### Request Message

| Name        | Type   | Description             |
| :---------- | :----- | :---------------------- |
| [].user_id  | String | Authentication username |
| [].password | String | Authentication password |

### Response Message

Status code

### Request Example

```bash
curl -u app_id:app_secret -X POST -H 'Content-Type: application/json' -d '[{"user_id": "api_user1", "password": "password"},{"user_id": "api_user2", "password": "password"}]' {api}/authentication/password_based%3Abuilt_in_database/import_users?type=plain
```

### Response Example

```http
HTTP status response code
204 
```

## Update User Authentication Password

### URI

PUT /authentication/password_based%3Abuilt_in_database/users/{user_id}

**Parameters:**

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| user_id   | String | Username to update |

### Request Message

| Name     | Type   | Description      |
| :------- | :----- | :--------------- |
| password | String | Updated password |

### Response Message

Status code

### Request Example

```bash
curl -u app_id:app_secret -X PUT -H 'Content-Type: application/json' -d '{"password": "new_password"}' {api}/authentication/password_based%3Abuilt_in_database/users/user1
```

### Response Example

```json
// HTTP status response code
204 
// HTTP response body
{
    "is_superuser": false,
    "user_id": "user1"
}
```

## Delete User Authentication Information

### URI

DELETE /authentication/password_based%3Abuilt_in_database/users/{user_id}

**Parameters:**

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| user_id   | String | Username to delete |

### Request Message

None

### Response Message

Status code

### Request Example

```bash
curl -u app_id:app_secret -X DELETE {api}/authentication/password_based%3Abuilt_in_database/users/user1
```

### Response Example

```http
// HTTP status response code
204 
```