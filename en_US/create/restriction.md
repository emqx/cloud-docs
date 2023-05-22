# Quotas and Limits

EMQX Cloud sets default quotas (or limits) for each deployment and the default value of some of the quotas can be adjusted. The following tables show the default value of the quotas in different deployments and whether they can be adjusted. If you need to adjust the quotas, please [contact us](../feature/tickets.md).

## Serverless
| Quotas   | **Default Value**          | **Adjustable**     |
| --------------------| ----------------------- | ------------------|
| Maximum internal authentication entries   | 2000                | NO                 |
| Maximum internal ACL entries     | 2000                | NO                   |
| Maximum message queue length     | 1000                | NO                   |
| Session expiry time（MQTT 3.x）     | 2 hours                | NO                   |
| Maximum retained messages     | 2000                | NO                   |
| Maximum size of a retained message     | 1mb                | NO                   |
| Retained message expiry interval     | Never                | NO                   |
| Client ID maximun length（MQTT 3.x）     | 23                | NO                   |
| Client ID maximun length（MQTT 5.0）     | 256                | NO                   |
| Maximum subscriptions for a single client     | 10                | NO                   |
| TCP connect timeout     | 10s                | NO                   |
| Number of deployments    | 1                | YES                   |
| Number of subaccounts     | 20                | NO                   |


## Dedicated and BYOC

| **Quotas** | **Default Value**          | **Adjustable**           |**Requires Deployment Restart** |
| --------------------| ----------------------- | ------------------|------------------|
| Maximum internal authentication entries      |  Session specification * 2      | NO                  |-|
| Maximum internal ACL entries     | Session specification * 2      | NO                   |-|
| Maximum message queue length     | 1000                | YES                   |NO|
| Session expiry time（MQTT 3.x）     | 2 hours                | NO                   |NO|
| Maximum retained messages    | Session specification * 10    | YES                   |NO|
| Maximum size of a retained message     | 1mb                | YES                   |NO|
| Retained message expiry interval     | Never                | YES                   |NO|
| Client ID maximun length（MQTT 3.x）     | 23                | YES                   |YES|
| Client ID maximun length（MQTT 5.0）     | 256                | YES                   |YES|
| API HTTP QPS     | 100/s                | NO                   |-|
| TCP connect timeout     | 10s                | YES                   |YES|
| Number of deployments     | 3                | YES                   |NO|
| Number of subaccounts    | 20                | NO                   |-|