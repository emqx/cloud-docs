# Username Quota Limitation

The Username Quota Limitation feature is used to limit the maximum number of sessions for a single MQTT username. When a username exceeds its quota, new session connections will be rejected, and the corresponding CONNACK return code will be sent: "0x97 Quota Exceeded" (MQTT 5.0) or "0x03 Service Unavailable" (MQTT 3.1.1).

## Enable and Configure Username Quota Limitation

1. Go to your deployment and click **Username Quota** from the left navigation menu.
2. Click **** to enable the feature.
3. Configure the following options for the username quota.
   - **Max Sessions Per Username**: Defines the maximum number of MQTT sessions allowed for each username. Note that if the MQTT client logs in using a persistent session, the session will remain on the server even after the client disconnects, until the session expires and is cleared.
   - **Username White List** (optional): You can add username entries by clicking the **Add** button on the right. Usernames in the whitelist are not subject to session limits. For example, clients connecting to a cluster using the MQTT bridge should bypass the quota limitation, you can add the usernames used by the MQTT bridge to the whitelist.

4. Click **Confirm** to complete the settings.

## Manage Username Quota

On the **Usage** tab, you can view the current usernames in the deployment and the number of sessions used for each username. By clicking the **View** button next to the session count, you can see the session list for the selected username.

On the **Configuration** tab, you can edit the configuration of the username quota limits. To delete the module, click **Delete** in the upper right corner.