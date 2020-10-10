# Connect to deployments with Python SDK

In this tutorial, you will learn how to use the Python **paho-mqtt** client to connect to EMQ X Cloud deployment.



## Precondition

* Already [Create Deployment](../deployments/create_deployment.md) in EMQ X Cloud, and the deployment status is **running**

* Python 3.4+ version

* **Paho-mqtt** MQTT client has been installed. If not installed, please run the following command to complete the installation

  ```
  pip3 install -i https://pypi.doubanio.com/simple paho-mqtt
  ```

* For free trial and shared deployment EMQ X Cloud, it provides TLS/SSL connection certification by default, and you also need to download [root certificate](https://static.emqx.net/data/cn.emqx.cloud-ca.crt) for TLS/SSL connection.



## Sample code

* [How to use MQTT in Python](https://www.emqx.io/cn/blog/how-to-use-mqtt-in-python)
* [Connect to deployments and publish messages with MQTT protocol](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_tcp.py)
* [Connect to deployments and subscribe to messages with MQTT protocol](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/sub_tcp.py)
* [Connect to deployments, publish and subscribe to messages with MQTT protocol and ](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_sub_tcp.py)
* [Connect to the deployments and publish messages with the Websocket protocol](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_ws.py)
* [Connect to deployments and subscribe to messages with Websocket protocol ](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/sub_ws.py)
* [Connect to deployments, publish and subscribe to messages with Websocket protocol](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_sub_ws.py)
* [Connect to deployments and publish messages with MQTT over TLS/SSL protocol](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_tls.py)
* [Connect to deployments and subscribe to messages with MQTT over TLS/SSL protocol](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/sub_tls.py)
* [Connect to deployments, publish and subscribe to messages with MQTT over TLS/SSL protocol](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_sub_tls.py)
* [Connect to deployments and publish messages with Websocket over TLS/SSL protocol](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_wss.py)
* [Connect to deployments and subscribe to messages with Websocket over TLS/SSL protocol](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/sub_wss.py)
* [Connect to deployments and publish and subscribe to messages with Websocket over TLS/SSL protocol](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Python3/pub_sub_wss.py)
