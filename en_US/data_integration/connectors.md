# Connector

Connectors are used to connect EMQX Platform to cloud resources, which are services provided by cloud service providers or services operated by yourself. Connectors are only concerned with the connection to cloud resources, and users can create different connectors for different cloud resources.


## Create a Connector

::: tip Prerequisite

Before creating a connector, make sure the current deployment is running.

:::

1. Go to your deployment, and click **Data Integration** from the left menu to access the Data Integration page.
1. If you are creating a connector for the first time, select the resource you want to connect to on the Data Integration Connectors page, such as **Kafka**. If you have created connectors before, you can create a new one by clicking the New Connector button in the top right corner of the connector list.
2. Fill in the corresponding resource configuration and click the **Test** button. A success prompt will be displayed if the connection is successful, and you can click to view it. If it fails, check the connector configuration.

## View Connector List and Details

The information on the newly created connector will be displayed in the **Connector List**, including the connector's name, type, status, and the number of associated rules. One connector can correspond to multiple rules.

![Connector](./_assets/connector_01.png)

Click on the connector ID to view details. The basic information and configuration information display the default configuration and the content you filled in during configuration.

![Connector](./_assets/connector_02.png)

## Edit a Connector

::: tip Note

This feature is only available for Dedicated and Premium deployments.

:::

1. In the **Actions** column of the connector list, click the edit icon to enter the editing page. 
2. Modify the corresponding configuration and click the **Test** button. A success message will be displayed if the connection is successful, and you can click the **Save** button to update. If it fails, please check the connector configuration.

## Delete a Connector

1. Make sure to clear all rules under the connector before deleting it.
2. In the Connector List, click the delete icon in the **Actions** column to delete a connector.
3. You must enter the connector's ID to confirm the deletion.

