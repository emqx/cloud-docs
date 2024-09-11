# Cluster Linking

::: tip

The Cluster Linking feature is only available in the Premium deployments.

:::

Cluster Linking is a feature that connects multiple, separate EMQX clusters, facilitating communication between clients on different, often geographically dispersed clusters. Compared to traditional MQTT bridging, Cluster Linking is more efficient, reliable, and scalable. It minimizes bandwidth requirements and tolerates network interruptions.

This page introduces the Cluster Linking feature and how to use and configure it in Premium deployments.

## Introduction

A single deployment can serve thousands of geographically distributed MQTT clients effectively. However, when clients are spread globally, issues with high latency and poor network connectivity arise. Creating multiple deployments in different regions can mitigate these problems by serving clients locally, but it introduces a new challenge: enabling seamless communication between clients connected to different deployments.

The traditional solution involves adding an MQTT bridge to each deployment, which forwards all messages between deployments. This approach leads to excessive bandwidth usage and can increase message latency, as many forwarded messages might not be relevant to clients on the other side of the bridge.

Cluster Linking addresses these issues by forwarding only relevant messages between clusters. This optimization reduces bandwidth usage and ensures efficient communication, even during network interruptions.

## Quick Start Guide

This section demonstrates how to create cluster linking between two Premium deployments in different regions.

### Prerequisites

1. Create two deployments in different regions. For more information on how to create Premium deployments, see [Create a Premium Deployment](../create/premium.md). For example, you can create two deployments with names as `deployment-us` and `deployment-eu`.
2. Set up [NAT Gateway](../vas/nat-gateway.md), [VPC Peering Connection](../deployments/vpc_peering.md), or [PrivateLink](../deployments/privatelink.md) between your deployments. To ensure secure and efficient inter-cluster connectivity, the clusters should communicate with each other exclusively through private network connections.

### Create Cluster Linking

1. Enter one of your Premium deployments, for example, `deployment-us`.
2. Select **Cluster Linking** from the left navigation menu.
3. Click **New** at the upper right corner. On the **New Cluster Linking** page, configure the following options:
   - **Cluster Name**: Enter the deployment ID of the Premium deployment that you want to link to. In this demonstration, it is the deployment ID of the `deployment-eu`. You can find the deployment ID information on the deployment **Settings** page.
   - **Server Address**: The MQTT host and port of the deployment to be linked. You can find the address and host information on the **Overview** page of the deployment. The format is: `<address>:<host>.`
   - **Client ID Prefix**:
   - **Username**:
   - **Password**:
   - **Topics**:
   - **Enable TLS**:
   - Leave other settings as default.
4. Click **Confirm**.

## Verify Cluster Linking

