# Android Kotlin 连接 MQTT 示例

在本教程中您将学习使用 Android Kotlin MQTT 客户端连接到 EMQ X Cloud 部署。

## 先决条件
* 已在 EMQ X Cloud [创建部署](../deployments/create_deployment.md)，并且部署状态为 **running**

* 安装 MQTT 客户端依赖

* 配置 AndroidManifest.xml

### 添加依赖

打开项目的 build.gradle，添加 Eclipse Paho Java Client 和 Eclipse Paho Android Service 依赖到 dependencies 部分。

```
dependencies {
    implementation 'org.eclipse.paho:org.eclipse.paho.client.mqttv3:1.2.4'
    implementation 'org.eclipse.paho:org.eclipse.paho.android.service:1.1.1' 
}
```

### 配置 AndroidManifest.xml
Android Service 是 Eclipse 开发的基于 Android 平台的一个后台服务，我们需要将它注册到AndroidManifest.xml 文件，同时，我们需要注册权限。

```
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<application>
   ...
   <service android:name="org.eclipse.paho.android.service.MqttService" />
</application>
```

## 示例代码

* [Android 使用 Kotlin 连接 MQTT](https://www.emqx.io/cn/blog/android-connects-mqtt-using-kotlin)
