# Connect to Deployments with Java SDK

In this tutorial, you will learn how to use [**Eclipse Paho Java Client**](https://github.com/eclipse/paho.mqtt.java) to connect to EMQ X Cloud deployment.

## Prerequisites
You have aleady created deployment, You can see the connection information on [Deployment Overview](../deployments/view_deployment.md), and you can connect to the MQTT broker with Websocket.

## Getting Started

### Dependency
Add the dependency definition to the `pom.xml`
```xml
<dependency>
    <groupId>org.eclipse.paho</groupId>
    <artifactId>org.eclipse.paho.client.mqttv3</artifactId>
    <version>1.2.5</version>
</dependency>
```
Run

```bash
mvn install
```
### Connect
You can view the information of connection on  [Deployment Overview](../deployments/view_deployment.md). Please note that the port is not 1883 or 8883  if your edition is not dedicated, make sure you get the right port. And you must add the authentication on [Authentication & ACL](../deployments/auth_and_acl.md).

#### Connect Options
Setup the broker, port, topic and authentication.

```java
String topic = "test/topic";
String content = "Hello World";
int qos = 2;
String broker = "tcp://broker.emqx.io:1883";
String clientId = MqttClient.generateClientId();
// persistence
MemoryPersistence persistence = new MemoryPersistence();
// MQTT connect options
MqttConnectOptions connOpts = new MqttConnectOptions();
// authentication
connOpts.setUserName("emqx_user");
connOpts.setPassword("emqx_password".toCharArray());
```

#### Concect

```Java
MqttClient client = new MqttClient(broker, clientId, persistence);
// callback
client.setCallback(new SampleCallback());

System.out.println("Connecting to broker: " + broker);
client.connect(connOpts);
System.out.println("Connected to broker: " + broker);
```

The content of `SampleCallback.java` as bellow：

```Java
package io.emqx.mqtt;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class SampleCallback implements MqttCallback {
    
    public void connectionLost(Throwable cause) {
        System.out.println("connection lost：" + cause.getMessage());
    }

    
    public void messageArrived(String topic, MqttMessage message) {
        System.out.println("Received message: \n  topic：" + topic + "\n  Qos：" + message.getQos() + "\n  payload：" + new String(message.getPayload()));
    }

    
    public void deliveryComplete(IMqttDeliveryToken token) {
        System.out.println("deliveryComplete");
    }


}
```

### Subscribe

```Java
client.subscribe(topic, qos);
System.out.println("Subscribed to topic: " + topic);
```

### Publish

```Java
MqttMessage message = new MqttMessage(content.getBytes());
message.setQos(qos);
client.publish(topic, message);
System.out.println("Message published");
```

### Source code
`MqttSample.java`

```Java
package io.emqx.mqtt;

import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;


public class MqttSample {
    public static void main(String[] args) {
        String topic = "test/topic";
        String content = "Hello World";
        int qos = 2;
        String broker = "tcp://broker.emqx.io:1883";
        String clientId = MqttClient.generateClientId();
        // persistence
        MemoryPersistence persistence = new MemoryPersistence();
        // connect options
        MqttConnectOptions connOpts = new MqttConnectOptions();
        // authentication 
        connOpts.setUserName("emqx_user");
        connOpts.setPassword("emqx_password".toCharArray());
        
        try {
            MqttClient client = new MqttClient(broker, clientId, persistence);
            // callback
            client.setCallback(new SampleCallback());

            System.out.println("Connecting to broker: " + broker);
            client.connect(connOpts);
            System.out.println("Connected to broker: " + broker);

            client.subscribe(topic, qos);
            System.out.println("Subscribed to topic: " + topic);
            
            MqttMessage message = new MqttMessage(content.getBytes());
            message.setQos(qos);
            client.publish(topic, message);
            System.out.println("Message published");
            client.disconnect();
            System.out.println("Disconnected");
            client.close();
            System.exit(0);
        } catch (MqttException me) {
            System.out.println("reason " + me.getReasonCode());
            System.out.println("msg " + me.getMessage());
            System.out.println("loc " + me.getLocalizedMessage());
            System.out.println("cause " + me.getCause());
            System.out.println("excep " + me);
            me.printStackTrace();
        }
    }
}
```

`SampleCallback.java`

```Java
package io.emqx.mqtt;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class SampleCallback implements MqttCallback {
    
    public void connectionLost(Throwable cause) {
        System.out.println("connection lost：" + cause.getMessage());
    }

    public void messageArrived(String topic, MqttMessage message) {
        System.out.println("Received message: \n  topic：" + topic + "\n  Qos：" + message.getQos() + "\n  payload：" + new String(message.getPayload()));
    }

    public void deliveryComplete(IMqttDeliveryToken token) {
        System.out.println("deliveryComplete");
    }


}
```

### Test

Run with the command:

```bash
$ mvn compile exec:java -Dexec.mainClass="io.emqx.mqtt.MqttSample"
```

The console output:
```
Connecting to broker: tcp://broker.emqx.io:1883
Connected to broker: tcp://broker.emqx.io:1883
Subscribed to topic: test/topic
Message published
Received message: 
  topic：test/topic
  Qos：1
  payload：Hello World
deliveryComplete
Disconnected
```

We can see that we have connected, subscribed and published, and received the published message.

## Next
The above shows you how to connect to EMQ X Cloud using the paho.mqtt.java client library, You can see the source code on [GitHub](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Java). You can also find more examples of other language on [GitHub](https://github.com/emqx/MQTT-Client-Examples).