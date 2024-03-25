# Clients

The Clients page lists the identity information and connection status of each client. Click on **Monitor** -> **Clients** in the left-side menu of the deployment to enter the Clients page.

## Client List

In the client list, users can view the list of clients currently connected to the server or whose sessions have not yet expired, along with basic information about the clients. The list displays each client's ID and Username, the client's IP address, the Keepalive set for the connection, Clean Start, and the session Expiry Interval(s).

By default, the page filter condition fields only display the Client ID and Username. Clicking the arrow button to the right of the search bar reveals all available filter condition fields. You can use the Client ID and Username for fuzzy searching to filter the connection list, or you can filter the list by connection Status or connection time range, or precisely enter the connecting client's IP Address to filter clients by the target IP Address. Clicking the refresh button resets all filter conditions and reloads the connection list.

![clients](https://chat.openai.com/g/g-aAzkOrn2h-ruan-jian-wen-dang-xie-zuo-zhu-shou/c/_assets/clients_list.png)

## Client Details

On the Clients page, selecting a client and clicking the client ID takes you to the client details page. In addition to the basic connection information already displayed on the list page, the client details page provides some more detailed information for users to view.

**Information** displays details such as the protocol version used for the connection, whether to clear the session after the connection ends, and if the status is disconnected, the last time the connection was disconnected. To the right of the connection information, the session information for the connection is shown, including session expiration interval, session creation time, process stack, number of subscriptions, message queue length, inflight window length, and QoS2 message receive queue length.

**Metrics** displays statistical metrics for the current connection in three categories: message count, packets, and traffic sent and received, available for users to view as needed.

**Subscriptions** shows the topics currently subscribed to by the connection. Users can click the add subscription button for relatively simple subscription operations or click the unsubscribe button in the subscription list to cancel a subscription to a particular topic.

![clients](https://chat.openai.com/g/g-aAzkOrn2h-ruan-jian-wen-dang-xie-zuo-zhu-shou/c/_assets/clients_detail.png)