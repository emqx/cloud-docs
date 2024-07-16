# Access Control

Access control pertains to controlling permissions for publish (PUBLISH) and subscribe (SUBSCRIBE) operations, which can be implemented at three levels:

1. Client ID
2. Username
3. All users: controls permissions for topics without distinguishing between client ID and username.

:::tip TIP

- Access control uses a blacklist mode by default, and the ACL matching order is: All Users -> User/Client. The mode can be switched to whitelist, see [ACL Whitelist Mode](#acl-whitelist-mode).
- The combination of clientid/username + topic is unique, which means that only the latest record for the same clientid/username + topic is considered valid.

:::


## Add ACL Information

Fill in the client id, topic, allow/deny, pub/sub/pubsub, and then click `Add`.

You can use the following placeholders in your topic and EMQX Cloud will be automatically populated with client information when requested.

- %u：Username
- %c：Client ID
  

![auth](./_assets/add_acl.png)

Same process for `Username` and `All Users`.

## Batch Add ACL Information

ACL information can be imported in bulk through CSV files.

> `All Users` are not supported

1. Download the template

2. Fill in the ACL information and submit the file

   The sample template file for `username` is shown below:

   ![acl](./_assets/username.png)

   The sample template file for `clientid` is shown below:

   ![acl](./_assets/clientid.png)

3. Click `import` button

   ![acl](./_assets/import_auth.png)

## Delete ACL Information

Click the `delete` button to the right of the ACL information to delete the ACL information.

## ACL Whitelist Mode

When the whitelist mode is enabled, all users are prohibited from subscribing and publishing by default. Clients need to be granted authorization to perform subscription and publishing actions.

- **For Default Access Control**: Click **Authentication & ACL** -> **ACL** in the left menu of the deployment. In the **All Users** tab, add an authorization entry. Enter `#` in the **Topic** field, select `pubsub` for **Action**, and select `Deny` for **Allowed**, to enable the whitelist mode.
- **For External Access Control**: If you need to switch to the whitelist mode for external access control, please submit a [ticket](../feature/tickets.md) to contact us.
