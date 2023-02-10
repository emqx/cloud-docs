# Specification limits

## Serverless

EMQX Cloud Serverless is based on shared clusters and thus has placed some restrictions on each Serverless deployment to ensure a stable connection for each tenant. 

| **Limitations** | **Serverless (Beta)**    | **Serverless**                     |
| -------------------- | ----------------------------------------------------- | -------------------------------------- |
| Concurrent maximum session |100                | 1000                |
| Maximum TPS   | 1000                      | 1000                                |
| Maximum TPS per client  | 100                 | 100          |
| Maximum topic subscriptions per client | 10            | 10         |
| Free session minutes | unlimited        | 1 million / month               |
| Free traffic      | unlimited            | 1 GB / month                  |
| MQTT port     | 8883                  | 8883                             |
| Websocket port | 8084                 | 8084                            |
| Maximum piece of retained messages | 1000               | 1000               |
| Maximum shared subscriptions | 100            | 100                         |
| API invoke rate | 10 / sec                     | 10 / sec                  |


## Dedicated

EMQX Cloud Dedicated version is based on independent clusters. The table below is a comparison between EMQX Cloud Dedicated version and other IoT Hubs. 

::: These parameters are verified in strict performance tests. For *Unlimited*, it refers to there being no technical restrictions, the actual performance of EMQX depends on the deployment specification. 

:::

### Connection

| **Limitation Description**         | **Dedicated**                                             | **Cloud IoT Hub**                     |
| -------------------- | ----------------------------------------------------- | -------------------------------------- |
| The maximum number of simultaneous online long connections  | Depends on specifications, choice from 1000-10M+. For more than 50K please send tickets for application.| 10K-500K                                 |
| Number of connections established per second     | 10K                                                   | 200-500                                |
| Number of topics subscribed to by a single client   | Unlimited                                                  | 10-100                                 |
| Single-client subscription requests per second  | Unlimited                                                  | 10-10K                                  |
| Single-client upstream message speed | Unlimited                                                  | QoS0: 30 messages/second；QoS1: 10 messages/second；QoS2: Not supported |
| Single-client message downstream     | Unlimited                                                  | 50-100 messages/second                          |
| Single client throughput bandwidth per second | Unlimited                                                  | 512-1024KB                             |
| Single message length         | Default 1024KB 1-256MB. Adjustable on request.                      | 256KB                                  |
| Maximum offline message storage length| Unlimited                                              | 1 week

### Topic Limitation

| **Limitation Description**              | **Dedicated**          | **Cloud IoT Hub**                              |
| ------------------------- | ------------------ | ----------------------------------------------- |
| Topic number               | Unlimited              | 50 single product.                                     |
| Permissions                      | Customize | Devices can only subscribe to a limited number of their own Topics for message distribution. |
| Subscribe/unsubscribe response time | Immediate             | 5-10 seconds                                          |

