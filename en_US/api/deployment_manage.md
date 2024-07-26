# Deployment Management API

This page describes how to query deployment status, start deployment, and stop deployment using the API.

## View Status of a Specific Deployment

### URI

GET /deployments/{deployment_id}

::: tip

This method can only be requested 60 times within 60 minutes. {deployment_id} is the deployment ID, not the deployment name. 

:::

### Request Message

None

### Response Messages

- **200:**

| Name           | Type   | Description                                                  |
| -------------- | ------ | ------------------------------------------------------------ |
| connections    | Number | Specification of the number of connections.                  |
| createAt       | String | Deployment creation time.                                    |
| deploymentID   | String | Deployment ID.                                               |
| deploymentName | String | Deployment name.                                             |
| deploymentType | String | Deployment type, where "dedicated" indicates a dedicated version. |
| platform       | String | Cloud service provider.                                      |
| region         | String | Region where the cloud host is located.                      |
| status         | String | Deployment running status: "running" for running, "starting" for being created, "stopped" for stopped. |

- **401:** API Key authentication failed.
- **403:** API Key does not have permission to access.
- **404:** Deployment not found.
- **429:** Request limit exceeded.

### Request Example

```bash
curl -u key:secret -X GET {api}/deployments/w41b11c0
```

### Response Example

```json
{
    "connections": 1000,
    "createAt": "2024-07-22 05:32",
    "deploymentID": "w41b11c0",
    "deploymentName": "deployment-w41b11c0",
    "deploymentType": "dedicated",
    "platform": "Alibaba Cloud",
    "region": "Hangzhou",
    "status": "running"
}
```

## Stop Deployment

### URI

POST /deployments/{deployment_id}/stop

::: tip

This method can only be requested once within 60 minutes. {deployment_id} is the deployment ID, not the deployment name. 

:::

### Request Message

None

### Response Messages

- **201:**

| Name           | Type   | Description                                                |
| -------------- | ------ | ---------------------------------------------------------- |
| deploymentID   | String | Deployment ID.                                             |
| deploymentName | String | Deployment name.                                           |
| operation      | String | Operation type, where "stopping" means stopping operation. |

- **401:** API Key authentication failed.
- **403:** API Key does not have permission to access.
- **404:** Deployment not found.
- **422:** Invalid request parameters.
- **429:** Request limit exceeded.

### Request Example

```bash
curl -u key:secret -X POST {api}/deployments/w41b11c0/stop
```

### Response Example

```json
{
    "deploymentID": "w41b11c0",
    "deploymentName": "deployment-w41b11c0",
    "operation": "stopping"
}
```

## Start Deployment

### URI

POST /deployments/{deployment_id}/start

::: tip

This method can only be requested once within 60 minutes. {deployment_id} is the deployment ID, not the deployment name. 

:::

### Request Message

None

### Response Messages

- **201:**

| Name           | Type   | Description                                                |
| -------------- | ------ | ---------------------------------------------------------- |
| deploymentID   | String | Deployment ID.                                             |
| deploymentName | String | Deployment name.                                           |
| operation      | String | Operation type, where "starting" means starting operation. |

- **401:** API Key authentication failed.
- **403:** API Key does not have permission to access.
- **404:** Deployment not found.
- **422:** Invalid request parameters.
- **429:** Request limit exceeded.

### Request Example

```bash
curl -u key:secret -X POST {api}/deployments/w41b11c0/start
```

### Response Example

```json
{
    "deploymentID": "w41b11c0",
    "deploymentName": "deployment-w41b11c0",
    "operation": "starting"
}
```
