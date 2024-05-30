# TLS Certificate Management

The API documentation on this page provides information on various operations of TLS certificate management, including adding, viewing, updating and deleting TLS certificate information.

## Get the status of TLS certificates under the specified deployment

### URI

GET /deployments/{deployment_id}/tls

::: tip
This method can only be requested 60 times in 60 minutes. {deployment_id} is the deployment ID, not the deployment name.
:::

### Request

None

### Response

- **200:**

| Name            | Type             | Description               |
| :-------------- | :--------------- | :----------------- |
| tlsType        | String | TLS type：'one-way'，'two-way'.      |
| expire | String           | Certificate expiration date.        |
| status | String           | TLS certificate status: 'running' running, 'pending' creating.        |

- **401:** API Key authentication failed.
- **403:** API Key no access。
- **404:** Deployment not found。
- **429:** Request exceeds the limit。

### Request Example

```bash
curl -u key:secret -X GET {api}/deployments/ge6a1a75/tls
```


### Response Example

```JSON
{
  "expire": "2034-05-22 02:43:21",
  "status": "running",
  "tlsType": "one-way"
}
```


## Create TLS certificates

### URI

POST /deployments/{deployment_id}/tls

::: tip
This method can only be requested 6 times in 60 minutes. {deployment_id} is the deployment ID, not the deployment name.
:::

### Request

| Name     | Type   | Description       |
| :------- | :----- | :--------- |
| tlsType | String | TLS type：'one-way'，'two-way'。 |
| cert | String |  Public Key Certificates  |
| key | String | Private key   |
| cacert | String | Client CA certificate, need to upload when the certificate type is 'two-way'.   |

### Response

- **200:**

| Name            | Type             | Description               |
| :-------------- | :--------------- | :----------------- |
| tlsType        | String | TLS type：'one-way'，'two-way'.      |
| expire | String           | Certificate expiration date.        |
| status | String           | TLS certificate status: 'running' running, 'pending' creating.        |


- **401:** API Key authentication failed.
- **403:** API Key no access。
- **404:** Deployment not found。
- **422:** Wrong Properties。
- **429:** Request exceeds the limit。


### Request Example

```bash
curl -u key:secret -X POST -H 'Content-Type: application/json' -d '{"tlsType": "one-way", "cert": "-----BEGIN CERTIFICATE-----\nMII...tH6j7afSg==\n-----END CERTIFICATE-----},"key":"-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA5bdg8Rt5A7...AjQzYRdov4inpzw==\n-----END RSA PRIVATE KEY-----"' {api}/deployments/ge6a1a75/tls
```

### Response Example

```JSON
{
  "expire": "2034-05-22 02:43:21",
  "status": "pending",
  "tlsType": "one-way"
}
```


## Update TLS certificates

### URI

PUT /deployments/{deployment_id}/tls

::: tip
This method can only be requested 6 times in 60 minutes. {deployment_id} is the deployment ID, not the deployment name.
:::

### Request

| Name     | Type   | Description       |
| :------- | :----- | :--------- |
| tlsType | String | TLS type：'one-way'，'two-way'。 |
| cert | String |  Public Key Certificates  |
| key | String | Private key   |
| cacert | String | Client CA certificate, need to upload when the certificate type is 'two-way'.   |

### Response

- **200:**

| Name            | Type             | Description               |
| :-------------- | :--------------- | :----------------- |
| tlsType        | String | TLS type：'one-way'，'two-way'.      |
| expire | String           | Certificate expiration date.        |
| status | String           | TLS certificate status: 'running' running, 'pending' creating.        |

- **401:** API Key authentication failed.
- **403:** API Key no access。
- **404:** Deployment not found。
- **422:** Wrong Properties。
- **429:** Request exceeds the limit。

### Request Example

```bash
curl -u key:secret -X PUT -H 'Content-Type: application/json' -d '{"tlsType": "one-way", "cert": "-----BEGIN CERTIFICATE-----\nMII...tH6j7afSg==\n-----END CERTIFICATE-----},"key":"-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA5bdg8Rt5A7...AjQzYRdov4inpzw==\n-----END RSA PRIVATE KEY-----"' {api}/deployments/ge6a1a75/tls
```

### Response Example

```JSON
{
  "expire": "2034-05-22 02:43:21",
  "status": "pending",
  "tlsType": "one-way"
}
```

## Delete TLS certificates

### URI

DELETE /deployments/{deployment_id}/tls

::: tip
This method can only be requested 6 times in 60 minutes. {deployment_id} is the deployment ID, not the deployment name.
:::

### Request

None

### Response

- **401:** API Key authentication failed.
- **403:** API Key no access。
- **404:** Deployment not found。
- **422:** Wrong Properties。
- **429:** Request exceeds the limit。

### Request Example

```bash
curl -u key:secret -X DELETE {api}/deployments/ge6a1a75/tls
```

### Response Example

```HTTP
// HTTP status response code
204 
```