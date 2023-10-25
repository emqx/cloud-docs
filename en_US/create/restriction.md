# Quotas and Limits

EMQX Cloud sets default quotas (or limits) for each deployment and the default value of some of the quotas can be adjusted. The following tables show the default value of the quotas in different deployments and whether they can be adjusted. If you need to adjust the quotas, please [contact us](../feature/tickets.md).

## Serverless
| Quotas                                    | **Default Value**          | **Adjustable**     |
|-------------------------------------------| ----------------------- | ------------------|
| Maximum internal authentication entries   | 2000                | NO       |
| Maximum internal ACL entries              | 2000                | NO                   |
| Anonymous access     | No anonymous access      | NO                   |
| Maximum message queue length              | 1000                | NO                   |
| Maximum message size              | 1 MB                | NO                   |
| Session expiry time（MQTT 3.x）             | 2 hours                | NO                   |
| Maximum retained messages                 | 2000                | NO                   |
| Maximum size of a retained message        | 1 MB                | NO                   |
| Retained message expiry interval          | Never                | NO                   |
| Client ID maximum length（MQTT 3.x）        | 23                | NO                   |
| Client ID maximum length（MQTT 5.0）        | 256                | NO                   |
| Maximum subscriptions for a single client | 10                | NO                   |
| TCP connect timeout                       | 10s                | NO                   |
| TLS version          | -                | NO                   |
| TLS encryption algorithm          | -                | NO                   |
| Maximum API QPS          | 100/s                | NO                   |
| Number of deployments                     | 1                | YES                   |
| Number of subaccounts                     | 20                | NO                   |


## Dedicated and BYOC

| **Quotas**                              | **Default Value**          | **Adjustable**           |**Requires Deployment Restart** |
|-----------------------------------------| ----------------------- | ------------------|------------------|
| Maximum internal authentication entries |  Session specification * 2      | YES[\*1]                  |NO|
| Maximum internal ACL entries            | Session specification * 2      | YES[\*2]                   |NO|
| External authentication supported at the same time            | 2      | NO                   |-|
| Anonymous access     | No anonymous access      | YES                   |NO|
| Maximum message queue length            | 1000                | YES[\*3]                   |NO|
| Maximum message size              | 1 MB                | YES[\*4]                   |NO|
| Session expiry time（MQTT 3.x）           | 2 hours                | YES                   |NO|
| Maximum retained messages               | Session specification * 10    | NO                   |-|
| Maximum size of a retained message      | 1 MB                | YES                   |NO|
| Retained message expiry interval        | Never                | YES                   |NO|
| Client ID maximum length（MQTT 3.x）      | 23                | YES                   |YES|
| Client ID maximum length（MQTT 5.0）      | 256                | YES                   |YES|
| Maximum API QPS          | 100/s                | NO                   |-|
| TCP connect timeout                     | 10s                | YES                   |YES|
| TLS version          | -                | YES[\*5]                   |NO|
| TLS encryption algorithm          | -                | YES                |NO|
| Maximum resources that can be created in Data Integration     | 10               | YES                   |NO|
| Maximum rules that can be created in Data Integration     | 50               | YES                   |NO|
| Number of deployments                   | 3                | YES                   |NO|
| Number of subaccounts                   | 20                | NO |-|               

[1] The number can be adjusted to the same as the session specification. It's recommended to use external auth if the credentials are more than 100,000.<br>
[2] The number can be adjusted to the same as the session specification. It's recommended to use external auth if the credentials are more than 100,000.<br>
[3] The number can be adjusted to the same as the session specification.<br>
[4] The maximum size can be adjusted to 256MB. Please note that modifying message size will be subject to bandwidth limitations, resulting in a decrease in TPS.<br>
[5] Support TLS 1.0、1.1、1.2、1.3.