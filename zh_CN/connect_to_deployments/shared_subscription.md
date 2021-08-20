# 共享订阅

共享订阅是在多个订阅者之间实现负载均衡的订阅方式，EMQ X Cloud 采用 random 均衡策略，即在所有订阅者中随机选择一位订阅者获取消息。

## 共享订阅前缀格式

EMQ X Cloud 支持两种格式的共享订阅前缀，分别为带群组的共享订阅（前缀为 `$share/<group-name>/`）和不带群组的共享订阅（前缀为 `$queue/`）。

两种共享订阅格式示例如下。

| 前缀格式 | 示例 | 前缀 | 真实主题名 |
|:----|:----|:----|:----|
| 带群组格式 | $share/abc/t/1 | $share/abc/ | t/1 |
| 不带群组格式 | $queue/t/1 | $queue/ | t/1 |

## 带群组的共享订阅

以 `$share/<group-name>/` 为前缀的共享订阅是带群组的共享订阅。
其中 group-name 可以为任意字符串，属于同一个群组内部的订阅者将以负载均衡接收消息，但 EMQ X 会向不同群组广播消息。

### 示例

* 订阅者 s1，s2，s3 属于群组 g1，订阅 `$share/g1/test` 主题
* 订阅者 s4，s5 属于群组 g2，订阅 `$share/g2/test` 主题
* 订阅者 s6 为普通订阅 订阅 `test` 主题

那么当发送者向 EMQ X Cloud 发送主题为 `test` 的消息msg时（注：发送者发送的主题无需带前缀）：

* 群组 g1 中 s1，s2，s3 只有一个会收到 msg
* 群组 g2 中 s4，s5 只有一个会收到 msg
* 订阅者 s6 可以正常收到 msg

## 不带群组的共享订阅

以 `$queue/` 为前缀的共享订阅是不带群组的共享订阅。
它是 $share 订阅的一种特例，相当与所有订阅者都在一个订阅组里面。

### 示例

* 订阅者 s1，s2，s3 为共享订阅 订阅 `$queue/test` 主题
* 订阅者 s4 为普通订阅 订阅 `test` 主题

那么当发送者向 EMQ X Cloud 发送主题为 `test` 的消息msg时（注：发送者发送的主题无需带前缀）：

* 订阅者 s1，s2，s3 只有一个会收到 msg
* 订阅者 s4 可以正常收到 msg

## 使用 MQTT X 测试共享订阅

使用 MQTT X 模拟客户端订阅。
* s1，s2 订阅主题 `$share/g1/test`，为带群组的共享订阅
* s3 订阅主题 `test` 为普通订阅

![shared_subscription_1](_assets/shared_subscription_1.png)

使用 MQTT X 创建客户端 p1 向主题 `test` 发送3条信息

![shared_subscription_2](_assets/shared_subscription_2.png)

3个订阅者中，s1 接收到msg1，msg2，而 s2 接收到 msg3，s3 接收到所有3条 msg 信息

![shared_subscription_3](_assets/shared_subscription_3.png)