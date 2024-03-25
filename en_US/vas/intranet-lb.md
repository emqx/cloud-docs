# Internal Load Balancers

::: warning Note

This feature is exclusive to the Dedicated Edition. You need to create a Dedicated Edition deployment before purchasing this service. 

:::

Internal Load Balancing is a service that distributes traffic on-demand within an internal network, expanding the application system's throughput by distributing traffic to different backend servers. It can also eliminate single points of failure in the system, enhancing the application system's availability. Once internal load balancing is enabled, your other service applications can connect to the EMQX deployment via an internal network address.

Before you begin, you need to complete the creation of [VPC Peering](https://chat.openai.com/g/g-aAzkOrn2h-ruan-jian-wen-dang-xie-zuo-zhu-shou/deployments/vpc_peering.md). The IP addresses mentioned below refer to the resource's internal network IP.

## Activate the Service

You can activate the Internal Load Balancing service by selecting the Internal Load Balancing card in the top menu bar under **Value-Added Services (VAS)** or choosing to open it from the tag bar at the bottom of the deployment overview.

## Use the Service

After purchasing the Internal Load Balancing value-added service, you can see the creation status of internal load balancing in the corresponding deployment overview, waiting for it to be completed.

![intranet_lb_info](./_assets/intranet_lb_info.png)

When the status of the internal load balancer is running, you can connect terminals under the VPC that has completed VPC peering to the deployment via the internal network address. The connection ports are consistent with the public network connection ports: MQTT port is 1883, and the WebSocket port is 8083.
