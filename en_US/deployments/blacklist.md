<!-- markdownlint-disable MD001 -->

# Blaclist

The blacklist is used to prohibit client connections from being matched and is suitable for restricting a small number of clients. The control of the blacklist will expire after the validity period.

::: warning
Blacklist in only available for Dedicated and BYOC deployments.
:::

On EMQX Cloud Console, enter deployment overview page, selet **Authentication & ACL** -> **Blacklist**. Click **+ Add** on the top right to create a blacklist entry.

![blacklist](./_assets/blacklist_new.png)

**Type and Value**

The types of blacklist:

- Clinet ID: Letters, numbers and some special characters (_, -, /, +, #, $, %, @, & and .), up to 256 characters.
- Username:  Letters, numbers and some special characters (_, -, /, +, #, $, %, @, & and .), up to 256 characters.
- Clinet IP: IPv4 address.

Then set the value according to the chosen type.

**Expiration Time**

The maximum expiration time is 1 year, the minimum is 5 minutes, and it cannot be earlier than the current time.

**Note**

Optional.