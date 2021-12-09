# 使用 Java SDK 连接到部署

在本教程中您将学习在 Java 中使用 [**Eclipse Paho Java Client**](https://github.com/eclipse/paho.mqtt.java) 客户端连接到 EMQ X Cloud 部署。

## 前提条件

> 1. 已经创建了部署，在[部署概览](../deployments/view_deployment.md)下可以查看到连接相关的信息，请确保部署状态为运行中。同时你可以使用 WebSocket 测试连接到 MQTT 服务器。
> 2. 在 `认证鉴权` > `认证` 中设置用户名和密码，用于连接验证。


本项目构建工具使用 Maven

## Eclipse Paho Java Client 使用

### 初始化项目
1. 使用 `Intellij IDEA` 新建一个 Maven 项目，参考 [Creating a Maven project](https://www.jetbrains.com/idea/guide/tutorials/working-with-maven/creating-a-project/)
2. 在 `src/main/java` 下创建包: `io.emqx.mqtt`

### 安装依赖
添加依赖到 `pom.xml`
```xml
<dependency>
    <groupId>org.eclipse.paho</groupId>
    <artifactId>org.eclipse.paho.client.mqttv3</artifactId>
    <version>1.2.5</version>
</dependency>
```
然后运行

```bash
mvn install
```
### 连接
> 请在控制台的 [部署概览](../deployments/view_deployment.md) 找到相关的地址以及端口信息，需要注意如果是基础版，端口不是 1883 或 8883 端口，请确认好端口。并且在[认证鉴权](../deployments/auth.md) 中添加认证信息。

#### 连接设置
创建 `MqttSample.java`，设置 MQTT Broker 连接地址，端口，topic 以及认证信息。

```java
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

#### 连接

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

### 订阅

```Java
// 订阅 topic
client.subscribe(topic, qos);
System.out.println("Subscribed to topic: " + topic);
```

### 发布

```Java
// 发布消息
MqttMessage message = new MqttMessage(content.getBytes());
message.setQos(qos);
client.publish(topic, message);
System.out.println("Message published");
```

### 完整代码
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

### 测试验证

使用以下命令运行代码

```bash
$ mvn compile exec:java -Dexec.mainClass="io.emqx.mqtt.MqttSample"
```

控制台输出如下：
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
我们可以看到已经成功连接，成功订阅，发布，并且收到发布的消息。

## 更多内容
以上为您演示了如何使用 paho.mqtt.java 客户端库连接到 EMQ X Cloud，可以在 [这里](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-Java) 下载到示例的源码。同时也可以在 [GitHub](https://github.com/emqx/MQTT-Client-Examples) 上找到更多起他语言的 Demo 示例。