# Use limitations

EMQX Cloud has fewer usage restrictions than the public cloud IoT Hub platform. The limitations in the table below depend on the number of connections purchased and the hardware performance, and the corresponding parameters have been rigorously tested for performance by EMQ officials.

> The performance of the relevant items depends on the deployment specifications, and the specific data is subject to actual usage scenarios.

## Connected Communications

| **Limitation Description**         | **EMQX**                                             | **Public Cloud IoT Hub**                     |
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

## Topic Limitation

| **Limitation Description**              | **EMQX**          | **Public Cloud IoT Hub**                              |
| ------------------------- | ------------------ | ----------------------------------------------- |
| Topic number               | Unlimited              | 50 single product.                                     |
| Permissions                      | Customize | Devices can only subscribe to a limited number of their own Topics for message distribution. |
| Subscribe/unsubscribe response time | Immediate             | 5-10 seconds                                          |
