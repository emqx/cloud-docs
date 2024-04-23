# 使用 Eclipse Paho Java 连接到部署

在本教程中您将学习在 Java 中使用 [**Eclipse Paho Java Client**](https://github.com/eclipse/paho.mqtt.java)， 实现客户端与 MQTT 服务器的连接、订阅、收发消息、取消订阅等功能。 

Eclipse Paho Java 是一个开源的 MQTT 客户端库，可用于在 Java 应用程序中实现 MQTT 通信协议的功能。它提供多个 API，简化 MQTT 协议的实现和使用，并支持多种 MQTT 版本。使用它，可以轻松创建 MQTT 客户端，发送或接收消息，处理连接、订阅和取消订阅等操作。Eclipse Paho Java 还提供一些高级功能，如自动重连和 SSL 安全连接等。它是一个功能强大且易于使用的 MQTT 客户端库，可帮助 Java 开发人员快速实现 MQTT 通信协议的功能。

## 前置准备

### 获得 MQTT 服务器

- 使用 EMQX 提供的[免费公共 MQTT 服务器](https://www.emqx.com/zh/mqtt/public-mqtt5-broker)（仅支持单向认证），该服务基于 EMQX 的[全托管的 MQTT 消息云服务](https://www.emqx.com/zh)创建。服务器连接信息如下：

    - 连接地址: **broker.emqx.io**
    - TCP Port: **1883**
    - SSL/TLS Port: **8883**
    - WebSocket 端口: **8083**
    - WebSocket TLS/SSL 端口: **8084**

- 您也可以自己[创建部署](../create/overview.md)，在部署概览下可以查看到连接相关的信息，请确保部署状态为运行中。使用 TCP 端口或 SSL/TLS 端口  测试连接到 MQTT 服务器。如果您是自己创建部署，请设置[客户端认证](../deployments/auth_overview.md)，在部署控制台**访问控制**->**认证** 中设置用户名和密码，用于连接验证。

### 安装 Maven
本项目使用 Maven 进行项目的构建，请[安装 Maven](https://maven.apache.org/install.html)。

## 初始化项目

1. 使用 `Intellij IDEA` 新建一个 Maven 项目，参考 [Creating a Maven project](https://www.jetbrains.com/idea/guide/tutorials/working-with-maven/creating-a-project/)
2. 在 `src/main/java` 下创建包: `io.emqx.mqtt`

### 安装 MQTT 依赖

添加依赖到 `pom.xml`

```xml
<dependency>
    <groupId>org.eclipse.paho</groupId>
    <artifactId>org.eclipse.paho.client.mqttv3</artifactId>
    <version>1.2.5</version>
</dependency>
```

然后运行

```shell
mvn install
```

## 通过 TCP 端口连接

> 示例代码将使用公共 MQTT 服务器来连接，公共 MQTT 服务器无需设置用户名和密码。如果您创建了部署，请在部署控制台找到相应的连接地址，并参考 [默认认证](../deployments/default_auth.md)设置用户名和密码。

### 连接设置

创建 `MqttSample.java`，设置 MQTT Broker 连接地址，端口，topic 以及认证信息。

```Java
String topic = "test/topic";
String content = "Hello World";
int qos = 2;
String broker = "tcp://broker.emqx.io:1883";
String clientId = MqttClient.generateClientId();
// 持久化
MemoryPersistence persistence = new MemoryPersistence();
// MQTT 连接选项
MqttConnectOptions connOpts = new MqttConnectOptions();
// 设置认证信息
connOpts.setUserName("emqx_user");
connOpts.setPassword("emqx_password".toCharArray());
```

### 开始连接

```Java
MqttClient client = new MqttClient(broker, clientId, persistence);
// 设置回调
client.setCallback(new SampleCallback());
// 建立连接
System.out.println("Connecting to broker: " + broker);
client.connect(connOpts);
System.out.println("Connected to broker: " + broker);
```

回调类 `SampleCallback.java` 文件内容如下：

```Java
package io.emqx.mqtt;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class SampleCallback implements MqttCallback {
    // 连接丢失
    public void connectionLost(Throwable cause) {
        System.out.println("connection lost：" + cause.getMessage());
    }

    //  收到消息
    public void messageArrived(String topic, MqttMessage message) {
        System.out.println("Received message: \n  topic：" + topic + "\n  Qos：" + message.getQos() + "\n  payload：" + new String(message.getPayload()));
    }

    // 消息传递成功
    public void deliveryComplete(IMqttDeliveryToken token) {
        System.out.println("deliveryComplete");
    }
}
```

## 通过 SSL/TLS 端口连接

> 示例代码将使用公共 MQTT 服务器来连接，公共 MQTT 服务器无需设置用户名和密码。如果您创建了部署，请在部署控制台找到相应的连接地址，并参考 [默认认证](../deployments/default_auth.md)设置用户名和密码。

本节介绍了如何通过 SSL/TLS 单向认证方式连接到部署。若您需使用双向认证方式，可以参考[这里](https://github.com/emqx/MQTT-Client-Examples/blob/master/mqtt-client-Java/src/main/java/io/emqx/mqtt/MqttTwoWayTlsSample.java)。

### 连接设置

创建 `MqttSample.java`，设置 MQTT Broker 连接地址，端口，topic，认证信息以及CA证书。

```Java
String topic = "test/topic";
String content = "Hello World";
int qos = 2;
String broker = "ssl://broker.emqx.io:8883";
String clientId = MqttClient.generateClientId();
// 持久化
MemoryPersistence persistence = new MemoryPersistence();
// MQTT 连接选项
MqttConnectOptions connOpts = new MqttConnectOptions();
// 设置认证信息
connOpts.setUserName("emqx_user");
connOpts.setPassword("emqx_password".toCharArray());
// 设置CA证书
try {
    String caCrtFile = MqttSample.class.getResource("").getPath() + "./broker.emqx.io-ca.crt";
    connOpts.setSocketFactory(SSLUtils.getSingleSocketFactory(caCrtFile));
} catch (Exception e) {
    throw new RuntimeException(e);
}
```

SSL工具类 `SSLUtils.java` 文件内容如下：

```Java
public class SSLUtils {
    // 单向认证
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

### 开始连接

```Java
MqttClient client = new MqttClient(broker, clientId, persistence);
// 设置回调
client.setCallback(new SampleCallback()); // 回调类 SampleCallback.java 与通过 TCP 端口连接中的 SampleCallback.java 相同
// 建立连接
System.out.println("Connecting to broker: " + broker);
client.connect(connOpts);
System.out.println("Connected to broker: " + broker);
```

## 订阅和发布

本节主要介绍了如何在已连接到部署的情况下订阅主题并发布消息。

### 订阅主题

设置将要订阅的主题及对应 [QoS 等级](https://www.emqx.com/zh/blog/introduction-to-mqtt-qos)。

```Java
// 订阅 topic
client.subscribe(topic, qos);
System.out.println("Subscribed to topic: " + topic);
```

### 取消订阅

通过以下代码取消订阅，此时应指定取消订阅的主题。

```Java
client.unsubscribe(topic);
```

### 发布消息

发布消息时需要告知 MQTT Broker 目标主题及消息内容。
```Java
// 发布消息
MqttMessage message = new MqttMessage(content.getBytes());
message.setQos(qos);
client.publish(topic, message);
System.out.println("Message published");
```

### 接收消息

通过以下代码指定客户端对消息事件进行监听，并在收到消息后执行回调函数，将接收到的消息及其主题打印到控制台。

```Java
client.setCallback(new SampleCallback());
```

回调类 `SampleCallback.java` 文件内容如下：

```Java
package io.emqx.mqtt;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class SampleCallback implements MqttCallback {
    // 连接丢失
    public void connectionLost(Throwable cause) {
        System.out.println("connection lost：" + cause.getMessage());
    }

    //  收到消息
    public void messageArrived(String topic, MqttMessage message) {
        System.out.println("Received message: \n  topic：" + topic + "\n  Qos：" + message.getQos() + "\n  payload：" + new String(message.getPayload()));
    }

    // 消息传递成功
    public void deliveryComplete(IMqttDeliveryToken token) {
        System.out.println("deliveryComplete");
    }
}
```

### 断开连接

如客户端希望主动断开连接，可以通过如下代码实现：

```Java
client.disconnect();
```

## 完整代码

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
        //  持久化
        MemoryPersistence persistence = new MemoryPersistence();
        // MQTT 连接选项
        MqttConnectOptions connOpts = new MqttConnectOptions();
        // 设置认证信息
        connOpts.setUserName("emqx_user");
        connOpts.setPassword("emqx_password".toCharArray());

        // ssl/tls 配置
        try {
            // broker = "ssl://broker.emqx.io:8883";

            // 单向ssl/tls
            // String caCrtFile = MqttSample.class.getResource("").getPath() + "./broker.emqx.io-ca.crt";
            // connOpts.setSocketFactory(SSLUtils.getSingleSocketFactory(caCrtFile));

            // 双向ssl/tls
            // String caCrtFile = MqttSample.class.getResource("").getPath() + "./server-ca.crt";
            // String crtFile = MqttSample.class.getResource("").getPath() + "./client.crt";
            // String keyFile = MqttSample.class.getResource("").getPath() + "./client.key";
            // connOpts.setSocketFactory(SSLUtils.getSocketFactory(caCrtFile, crtFile, keyFile, ""));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        
        try {
            MqttClient client = new MqttClient(broker, clientId, persistence);
            // 设置回调
            client.setCallback(new SampleCallback());
            // 建立连接
            System.out.println("Connecting to broker: " + broker);
            client.connect(connOpts);
            System.out.println("Connected to broker: " + broker);
            // 订阅 topic
            client.subscribe(topic, qos);
            System.out.println("Subscribed to topic: " + topic);
            // 发布消息
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
    // 连接丢失
    public void connectionLost(Throwable cause) {
        System.out.println("connection lost：" + cause.getMessage());
    }

    //  收到消息
    public void messageArrived(String topic, MqttMessage message) {
        System.out.println("Received message: \n  topic：" + topic + "\n  Qos：" + message.getQos() + "\n  payload：" + new String(message.getPayload()));
    }

    // 消息传递成功
    public void deliveryComplete(IMqttDeliveryToken token) {
        System.out.println("deliveryComplete");
    }
}
```

`SSLUtils.class`
```Java
public class SSLUtils {
    // 单向认证
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
    
    // 双向认证
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

## 测试验证

使用以下命令运行代码

```shell
mvn compile exec:java -Dexec.mainClass="io.emqx.mqtt.MqttSample"
```

控制台输出如下：

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

我们可以看到已经成功连接，成功订阅，发布，并且收到发布的消息。

## 更多内容

以上为您演示了如何使用 paho.mqtt.java 客户端库连接到 EMQX Platform，可以在 [这里](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Java) 下载到示例的源码。
同时也可以在 [GitHub](https://github.com/emqx/MQTT-Client-Examples) 上找到更多起他语言的 Demo 示例。
