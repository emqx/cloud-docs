# Default Authorization

Default authorization is based on a built-in database, offering users a low-cost, plug-and-play authorization method.

## View Authorization Information

Click on **Access Control** -> **Authorization** in the left menu of the deployment to see authorization information. Authorization information can be viewed through three dimensions: **Client ID**, **Username**, and **All Users** (topic) to view the details of authorization entries.

## Add Authorization Information

Select **+ Add** on the Client Authorization page to add new authorization information based on the current category.

### Add Client ID Authorization

Under the **Client ID** tab, create authorization rules for specific client IDs.

- Client ID: The client applicable to this rule
- Topic: Configure the topic corresponding to this rule
- Action: Configure the operation corresponding to this rule. Options: `Publish`, `Subscribe`, `Publish and Subscribe`
- Permission: Whether to allow the current client to perform the requested operation; Options: `Allow`, `Deny`

### Add Username Authorization

Under the **Username** tab, create authorization rules for specific usernames.

- Username: The username applicable to this rule
- Topic: Configure the topic corresponding to this rule
- Action: Configure the operation corresponding to this rule. Options: `Publish`, `Subscribe`, `Publish and Subscribe`
- Permission: Whether to allow the current user to perform the requested operation; Options: `Allow`, `Deny`

### Add Topic Authorization

Under the **All Users** tab, create authorization rules for specific topics.

- Topic: Configure the topic corresponding to this rule
- Action: Configure the operation corresponding to this rule. Options: `Publish`, `Subscribe`, `Publish and Subscribe`
- Permission: Whether to allow the current topic to perform the requested operation; Options: `Allow`, `Deny`

### Placeholders

Placeholders can be used in topics to dynamically replace current client information etc., into the topic during rule matching. Supported placeholders include:

- ${clientid}
- ${username}

Placeholders can only be used to replace an entire field in a topic, e.g., `a/b/${username}/c/d`, but cannot be used to replace a part of a field, e.g., `a/b${username}c/d`.

## Import Authorization Information

You can import authorization information in batch via a CSV file.

1. Click the **Import** button.

2. Download the template. An example template file is shown below:

   ![auth_csv](./_assets/auth_csv.png)

3. Fill in the authorization information and upload the file.

4. Click **Import**.

## Edit Authorization Information

Click the edit icon next to the authorization information to modify the current authorization information.

## Delete Authorization Information

Click the delete icon next to the authorization information to delete it.