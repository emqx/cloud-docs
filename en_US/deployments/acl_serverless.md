# Access Control

Access control pertains to controlling permissions for publish (PUBLISH) and subscribe (SUBSCRIBE) operations, which can be implemented at three levels:

1. Client ID
2. Username
3. All users: controls permissions for topics without distinguishing between client ID and username.

:::tip TIP

Access control uses a blacklist mode by default. Also, the combination of clientid/username + topic is unique, which means that only the latest record for the same clientid/username + topic is considered valid.

:::


## View Access Control Policy

Click **Authentication & ACL** -> **ACL** on the left navigation menu. You can switch between the three levels to view corresponding access control policy.

![acl](./_assets/acl_serverless.png)

## Add Access Control Policy

For example to add an access control policy for certain clients, you can follow the steps below:

On the **Client ID** tab, click **+ Add**, fill in the **Client ID**, **Topic**, select the action for this target user (**Publish**, **Subscribe**, or **Publish & Subscribe**), then add **Permission** (**Allow** or **Deny**), and then click **Confirm** to complete the addition. 

:::tip TIP

Placeholders like %u (username) and %c (client ID) are allowed in the topic, and EMQX Cloud will automatically fill in the client information when a request is made.

:::

![add_acl](./_assets/add_acl_serverless.png)

The above steps also appy to the **Username** and **All Users** tab. 

## Delete Access Control Policy

To delete access control information, simply click the delete icon on the right-hand side of the access control policy.
