# REST API

EMQX Cloud API follows the REST architecture. You can access the functions of EMQX programmatically.

## API Overview

| API         | Description                                     |
| ----------- | ----------------------------------------------- |
| [Authentication management](./auth.md)          | Manage the creation, deletion and update of authentication information.                                         |
| [ACL management](./acl.md)         | Manage the creation, deletion and update of ACL information.                                      |
| [Client management](./client.md)         | View the online client information and kick off the client.                                 |
| [Blacklist management](./banned.md)    | Manage the creation, deletion and get of blacklist information         |
| [Message Subscription](./sub.md)        | Check subscribed message.                     |
| [Topic Subscription](./topic.md)        | Subscribe, unsubscribe, batch subscribe, batch unsubscribe.                      |
| [Message Publish](./topic.md)        | Publish, batch publish.                      |
| [Metrics](./metrics.md)        | Check metrics.                     |

## How to Use API

### Construct Request

The request address consists of the following parts:

{API}/{resource-path}?{query-string}

You can get the API access address in the API access section under the deployment details page.

![api](./_assets/api.png)

### Authentication

HTTP API uses [Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) method, ID and password must be filled in AppID and AppSecret respectively. You can add and remove AppID/AppSecret by creating new application in the API access under the deployment details page.

## Response code

### HTTP status codes

The EMQX Broker interface always returns 200 OK when the call is successful, and the response content is returned in JSON format.

The possible status codes are as follows:

| Status Code | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| 200         | Success, and the returned JSON data will provide more information. |
| 400         | Invalid client request, such as wrong request body or parameters. |
| 401         | Client authentication failed , maybe because of invalid authentication credentials. |
| 404         | The requested path cannot be found or the requested object does not exist. |
| 500         | An internal error occurred while the server was processing the request. |

### Result codes

The response message body of the EMQX Broker interface is in JSON format, which always contains the returned `code`.

The possible result codes are as follows:

| Return Code | Description                                     |
| ----------- | ----------------------------------------------- |
| 0           | Success.                                        |
| 101         | RPC error.                                      |
| 102         | Unknown mistake.                                |
| 103         | Wrong user name or password.                    |
| 104         | Empty username or password.                     |
| 105         | User does not exist.                            |
| 106         | Administrator account cannot be deleted.        |
| 107         | Missing key request parameters.                 |
| 108         | Request parameter error.                        |
| 109         | Request parameters are not in legal JSON format.|
| 110         | Plug-in is enabled.                             |
| 111         | Plugin is closed.                               |
| 112         | Client is offline.                              |
| 113         | User already exists.                            |
| 114         | Old password is wrong.                          |
| 115         | Illegal subject.                                |
