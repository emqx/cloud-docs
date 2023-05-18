# Connect via Eclipse Paho Java

In this tutorial, you will learn how to use [**Eclipse Paho Java Client**](https://github.com/eclipse/paho.mqtt.java) to implement the connection, subscription, messaging, unsubscription, and other functions between the client and MQTT broker..

Eclipse Paho Java is an open-source MQTT client library that can be used to implement MQTT communication protocol in Java applications. It offers multiple APIs for simplifying the implementation and usage of MQTT protocol and supports various MQTT versions. Using it, one can easily create MQTT clients, send or receive messages, and handle operations such as connecting, subscribing, and unsubscribing. Eclipse Paho Java also offers advanced features like auto-reconnect and SSL secure connectivity. It is a powerful and easy-to-use MQTT client library that can help Java developers quickly implement the MQTT communication protocol.

## Prerequisites

### Deploy MQTT Broker

- You can use the [free public MQTT broker](https://www.emqx.com/en/mqtt/public-mqtt5-broker) provided by EMQX. This service was created based on the [EMQX Cloud](https://www.emqx.com/en/cloud). The information about broker access is as follows:

    + Broker: **broker.emqx.io**
    + TCP Port: **1883**
    + TLS/SSL Port: **8883**
    + WebSocket Port: **8083**
    + WebSocket TLS/SSL Port: **8084**

- You can [create a deployment](https://docs.emqx.com/en/cloud/latest/create/overview.html) as well. Find connection information in the deployment overview. Make sure the deployment is running. At the same time, you can use WebSocket to test the connection to the MQTT server. If you are creating your own deployment, check [Authentication](https://docs.emqx.com/en/cloud/latest/deployments/auth_overview.html) and set the username and password in `Authentication & ACL` > `Authentication` for verification.

### Install Maven
The project use Maven as the build tool, please [install Maven](https://maven.apache.org/install.html) first.

## Create project

1. Create a Maven project with `Intellij IDEA`, refer to [Creating a Maven project](https://www.jetbrains.com/idea/guide/tutorials/working-with-maven/creating-a-project/)
2. Craet package `io.emqx.mqtt` under `src/main/java`

### Add MQTT dependency

Add the dependency definition to the `pom.xml`

```xml
<dependency>
    <groupId>org.eclipse.paho</groupId>
    <artifactId>org.eclipse.paho.client.mqttv3</artifactId>
    <version>1.2.5</version>
</dependency>
```

Run

```shell
mvn install
```

## Connect over TCP Port

> You can view the information of connection on Deployment Overview. Please note that the port is not 1883 if your choose a Basic package, make sure you get the right port. And you must add the authentication on Authentication & ACL in advance.

### Connect Options

Create `MqttSample.java`, setup the broker, port, topic and authentication.

```Java
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

### Connect

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

## Connect over SSL/TLS Port

> You can view the information of connection on Deployment Overview. Please note that the port is not 8883 if your choose a Basic package, make sure you get the right port. And you must add the authentication on Authentication & ACL in advance.

This section introduces how to connect to a deployment with SSL/TLS one-way authentication. If you need to use two-way authentication, you can refer to [here](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Java/src/main/java/io/emqx/mqtt/MqttSample.java).

### Connect Options

Create `MqttSample.java`, setup the broker, port, topic, authentication and CA certificate.

```Java
String topic = "test/topic";
String content = "Hello World";
int qos = 2;
String broker = "ssl://broker.emqx.io:8883";
String clientId = MqttClient.generateClientId();
// persistence
MemoryPersistence persistence = new MemoryPersistence();
// MQTT connect options
MqttConnectOptions connOpts = new MqttConnectOptions();
// authentication
connOpts.setUserName("emqx_user");
connOpts.setPassword("emqx_password".toCharArray());
// CA certificate
try {
    String caCrtFile = MqttSample.class.getResource("").getPath() + "./broker.emqx.io-ca.crt";
    connOpts.setSocketFactory(SSLUtils.getSingleSocketFactory(caCrtFile));
} catch (Exception e) {
    throw new RuntimeException(e);
}
```

The content of `SSLUtils.java` as bellow：

```Java
public class SSLUtils {
    // one-way ssl/tls
    public static SSLSocketFactory getSingleSocketFactory(final String caCrtFile) throws Exception {
        Security.addProvider(new BouncyCastleProvider());
        X509Certificate caCert = null;

        FileInputStream caCrtFileInputStream = new FileInputStream(caCrtFile);

        BufferedInputStream bis = new BufferedInputStream(caCrtFileInputStream);
        CertificateFactory cf = CertificateFactory.getInstance("X.509");

        while (bis.available() > 0) {
            caCert = (X509Certificate) cf.generateCertificate(bis);
        }
        KeyStore caKs = KeyStore.getInstance(KeyStore.getDefaultType());
        caKs.load(null, null);
        caKs.setCertificateEntry("cert-certificate", caCert);
        TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        tmf.init(caKs);
        SSLContext sslContext = SSLContext.getInstance("TLSv1.2");
        sslContext.init(null, tmf.getTrustManagers(), null);
        return sslContext.getSocketFactory();
    }
}
```

### Connect

```Java
MqttClient client = new MqttClient(broker, clientId, persistence);
// callback
client.setCallback(new SampleCallback()); // The callback class SampleCallback.java is the same as the SampleCallback.java used when connecting over TCP Port.
// Connect
System.out.println("Connecting to broker: " + broker);
client.connect(connOpts);
System.out.println("Connected to broker: " + broker);
```

## Publish and Subscribe

This section introduces how to subscribe to topics and publish messages after you successfully connect to the MQTT broker.

### Subscribe to Topics

Set the topic for subscription and the [QoS Level](https://www.emqx.com/en/blog/introduction-to-mqtt-qos) of the topic.

```Java
// subscribe topic
client.subscribe(topic, qos);
System.out.println("Subscribed to topic: " + topic);
```

### Unsubscribe to Topics

Use the following codes to unsubscribe to topics. You need to define the topic for unsubscription and the QoS level.

```Java
client.unsubscribe(topic);
```

### Publish Messages

Inform MQTT Broker about the topic and payload when publishing messages.

```Java
MqttMessage message = new MqttMessage(content.getBytes());
message.setQos(qos);
client.publish(topic, message);
System.out.println("Message published");
```

### Receive Messages

The following code specifies that the client listens for message events and executes a callback function after receiving a message, printing the received message and its topic to the console.

```Java
client.setCallback(new SampleCallback());
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

### Disconnect from MQTT Broker

If the client wants to disconnect actively, use the following code:

```Java
client.disconnect();
```

## The full code

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

        // ssl/tls config
        try {
            // broker = "ssl://broker.emqx.io:8883";

            // one-way ssl/tls
            // String caCrtFile = MqttSample.class.getResource("").getPath() + "./broker.emqx.io-ca.crt";
            // connOpts.setSocketFactory(SSLUtils.getSingleSocketFactory(caCrtFile));

            // two-way ssl/tls
            // String caCrtFile = MqttSample.class.getResource("").getPath() + "./server-ca.crt";
            // String crtFile = MqttSample.class.getResource("").getPath() + "./client.crt";
            // String keyFile = MqttSample.class.getResource("").getPath() + "./client.key";
            // connOpts.setSocketFactory(SSLUtils.getSocketFactory(caCrtFile, crtFile, keyFile, ""));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        
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

`SSLUtils.class`
```Java
public class SSLUtils {
    // one-way ssl/tls
    public static SSLSocketFactory getSingleSocketFactory(final String caCrtFile) throws Exception {
        Security.addProvider(new BouncyCastleProvider());
        X509Certificate caCert = null;

        FileInputStream caCrtFileInputStream = new FileInputStream(caCrtFile);

        BufferedInputStream bis = new BufferedInputStream(caCrtFileInputStream);
        CertificateFactory cf = CertificateFactory.getInstance("X.509");

        while (bis.available() > 0) {
            caCert = (X509Certificate) cf.generateCertificate(bis);
        }
        KeyStore caKs = KeyStore.getInstance(KeyStore.getDefaultType());
        caKs.load(null, null);
        caKs.setCertificateEntry("cert-certificate", caCert);
        TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        tmf.init(caKs);
        SSLContext sslContext = SSLContext.getInstance("TLSv1.2");
        sslContext.init(null, tmf.getTrustManagers(), null);
        return sslContext.getSocketFactory();
    }

    // two-way ssl/tls
    public static SSLSocketFactory getSocketFactory(final String caCrtFile,
                                                    final String crtFile, final String keyFile, final String password)
            throws Exception {
        Security.addProvider(new BouncyCastleProvider());

        // load CA certificate
        X509Certificate caCert = null;

        FileInputStream fis = new FileInputStream(caCrtFile);
        BufferedInputStream bis = new BufferedInputStream(fis);
        CertificateFactory cf = CertificateFactory.getInstance("X.509");

        while (bis.available() > 0) {
            caCert = (X509Certificate) cf.generateCertificate(bis);
        }

        // load client certificate
        bis = new BufferedInputStream(new FileInputStream(crtFile));
        X509Certificate cert = null;
        while (bis.available() > 0) {
            cert = (X509Certificate) cf.generateCertificate(bis);
        }

        // load client private key
        PEMParser pemParser = new PEMParser(new FileReader(keyFile));
        Object object = pemParser.readObject();
        JcaPEMKeyConverter converter = new JcaPEMKeyConverter().setProvider("BC");
        KeyPair key = converter.getKeyPair((PEMKeyPair) object);
        pemParser.close();

        // CA certificate is used to authenticate server
        KeyStore caKs = KeyStore.getInstance(KeyStore.getDefaultType());
        caKs.load(null, null);
        caKs.setCertificateEntry("ca-certificate", caCert);
        TrustManagerFactory tmf = TrustManagerFactory.getInstance("X509");
        tmf.init(caKs);

        // client key and certificates are sent to server, so it can authenticate
        KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());
        ks.load(null, null);
        ks.setCertificateEntry("certificate", cert);
        ks.setKeyEntry("private-key", key.getPrivate(), password.toCharArray(),
                new java.security.cert.Certificate[]{cert});
        KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory
                .getDefaultAlgorithm());
        kmf.init(ks, password.toCharArray());

        // finally, create SSL socket factory
        SSLContext context = SSLContext.getInstance("TLSv1.2");
        context.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);

        return context.getSocketFactory();
    }
}
```

## Test

Run with the command:

```shell
mvn compile exec:java -Dexec.mainClass="io.emqx.mqtt.MqttSample"
```

The console output:

```
Connecting to broker: tcp://broker.emqx.io:1883
Connected to broker: tcp://broker.emqx.io:1883
Subscribed to topic: test/topic
Message published
deliveryComplete
Received message: 
  topic：test/topic
  Qos：2
  payload：Hello World
Disconnected
```

That's the whole process of connecting, subscribing, publishing, and receiving the message.

## More

The above shows you how to connect to EMQX Cloud using the paho.mqtt.java client library, You can see the source code on [GitHub](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Java). You can also find more examples of other language on [GitHub](https://github.com/emqx/MQTT-Client-Examples).
