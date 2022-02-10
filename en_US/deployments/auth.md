# Authentication & ACL
Authentication is a significant part of most applications. The MQTT protocol supports username and password authentication. Enabling authentication is an effective way to prevent illegal clients from connecting. Authentication in EMQX Cloud means that when a client connects to the EMQX Cloud, the configuration on the server-side controls the client's permission to connect to the server.

EMQX Cloud authentication support includes two levels:
1. The MQTT protocol itself specifies the username and password in the CONNECT message.
2. At the transport level, TLS guarantees client-to-server authentication using client certificates and ensures that the server validates the server certificate to the client.

## Authentication

### Check Authentication Information
Go to the menu on the left and click on the `Authentication` under `Authentication & ACL` to view the authentication information.

### Add Authentication Information
Enter the username and password in the input box at the top of the page, and click the `Add` button to complete the addition of authentication information

![auth](./_assets/auth_info.png)

### Batch Add Authentication Information
Certification information can be imported in bulk through CSV files.

1. Download the template
2. Fill in the authentication information and submit the file

   The sample template file is shown below:

   ![auth](./_assets/auth_ex.png)

3. Click `import` button

   ![auth](./_assets/import_auth.png)

### Edit Authentication Information

Click the `edit` button to the right of the authentication information to change the password of the username.

![auth](./_assets/edit_auth.png)


### Delete Authentication Information
Click the `delete` button to the right of the authentication information to delete the authentication information.

![auth](./_assets/delete_auth.png)





