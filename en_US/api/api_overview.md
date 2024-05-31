# API Function and Management

The EMQX Platform APIs are categorized into two types, Platform API and Deployment API, both of which follow RESTful. The Platform API is used to control and manage the platform-level functionality, while the Deployment API is used to manage the deployment-level functionalities. This chapter introduces how to access and use the Platform API and Deployment API.

## Invoke API

The [Platform API](./api_platform.md) and [Deployment API](./api_deployment) pages provide information on how to get API access addresses. Please access the API via HTTPS and ensure all data sent over the network is encrypted using TLS.


## Authentication

HTTP API uses [Basic authentication](https://datatracker.ietf.org/doc/html/rfc7617), which means the id and password must be Key and Secret (for Platform API), or App ID and App Secret (for Deployment API). Therefore, you must [create a Platform API key](./api_platform.md#create-and-manage-platform-api-key) or a [Deployment API key](./api_deployment.md#create-and-manage-deployment-api-key). All secrets are displayed only once at the creation and must be kept safely.

## HTTP Status Codes

The following HTTP status codes apply to both Platform and Deployment APIs. The interface returns 200 on a successful call, and the response is returned in JSON format.

Status Code list：


| Status Code | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| 200         | Success, and the returned JSON data will provide more information. |
| 400         | Invalid client request, such as wrong request body or parameters. |
| 401         | Client authentication failed , maybe because of invalid authentication credentials. |
| 404         | The requested path cannot be found or the requested object does not exist. |
| 422         | Wrong properties.                                            |
| 500         | An internal error occurred while the server was processing the request. |
