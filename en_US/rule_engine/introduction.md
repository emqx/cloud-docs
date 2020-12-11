# Introduction

The main usage scenarios of message storage include storing the operation record in various databases such as Redis, MySQL, PostgreSQL, MongoDB, and Cassandra. The operation record includes the client's online and offline status, subscribing to topic information, message content, and sending a message receipt after the message arrives.

Users can also subscribe to related topics to achieve similar functions, but EMQ X Cloud has built-in support for the persistence of this function; compared with the former, the latter has higher execution efficiency and can greatly reduce the developer’s Workload.

The message storage function of EMQ X Cloud relies on the rule engine. If you don't know what a rule engine is, you can refer to the guide-[Rule Engine](../deployments/dashboard/rule_engine/introduction.md).

Usage restrictions:

To ensure that you can use EMQ X Cloud message storage normally, EMQ X Cloud has the following restrictions:

- For free trial deployment and shared deployment: Access to resources such as databases only supports public network access. Therefore, before creating resources, you need to ensure that the resources have public network access capabilities and open security groups.
- For dedicated deployment: Access to resources such as databases only supports intranet access. Therefore,  you need to configure VPC peering connections and open security groups before creating resources.