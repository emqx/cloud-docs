# Schema Registry

::: tip Note
Schema Registry is only available for Dedicated and Premium deployments.
:::

Schema Registry provides a centralized schema for managing and validating topic message data and the ability to serialize and deserialize data over the network. Publishers and subscribers of MQTT topics can use the Schema to ensure data consistency and compatibility. Schema Registry is a key component of the rule engine. It can be adapted to multiple scenarios of device access and rule design, helping to ensure data quality, compliance, application development efficiency and system performance.

## Understand Schema Registry

The Schema defines the structure of the data. It defines the allowed data types, formats, and relationships. A schema is a blueprint for data that describes the structure of a data record, the data types of individual fields, the relationships between fields, and any constraints or rules that apply to the data.

Schemas can be used in a variety of data processing systems, including databases, messaging services, and distributed event and data processing frameworks. They help ensure that data is consistent and accurate, and can be efficiently processed and analyzed by different systems and applications. Data sharing and interoperability between different systems and organizations are facilitated.


Users can define Schema in the Schema Registry, and then use the defined Schema in rules for forwarding client data to different data services through data integration. At the same time, you can also send the data in the application or data service to the client through the Schema to realize two-way data flow.

![schema](./_assets/schema_pic.jpg)

Schema Registry has multiple advantages, including data validation, compatibility checking, version control and iterative evolution. It also simplifies the development and maintenance of data pipelines and reduces the risk of data compatibility issues, data corruption and data loss.

## Create and Manage Schema

In Data Integration, first create a [connector](./connectors.md) or a [rule](rules.md). Schema Registry can be found beside the **Integration** tab.

![schema](./_assets/schema_open.png)

![schema](./_assets/schema_page.png)

The EMQX Platform supports to create schemas in **Avro**, **Protobuf**, **JSON Schema** format. Check the [Schema Documentation](https://docs.emqx.com/en/enterprise/latest/data-integration/schema-registry.html) for details on how to use them.