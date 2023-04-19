# Shared subscription

Shared subscription is a subscription method that achieves load balancing among multiple subscribers,
EMQX Cloud adopts a random balance strategy, select randomly among all subscribers.

## Shared subscription prefixes formats

EMQX Cloud supports shared subscription prefixes in two formats:
shared subscription with groups (prefixed with `$share/<group-name>/`) and shared subscription without group (prefixed with `$queue/`).

Examples of two shared subscription prefixes formats are as follows.

| prefixes formats | Example | Prefix | Real topic name |
|:----|:----|:----|:----|
| Shared subscription with groups | $share/abc/t/1 | $share/abc/ | t/1 |
| Shared subscription without group | $queue/t/1 | $queue/ | t/1 |

## Shared subscription with groups

Shared subscriptions prefixed with `$share/<group-name>/` are shared subscriptions with groups.
group-name can be any string. Subscribers who belong to the same group will receive messages with load balancing, but EMQX Cloud will broadcast messages to different groups.

### Example

* subscribers s1, s2, and s3 belong to group g1, subscribe topic `$share/g1/test`
* subscribers s4 and s5 belong to group g2, subscribe topic `$share/g2/test`
* subscriber s6 subscribe topic `test`

Then when publisher publishes a message with topic `test` to the EMQX Cloud (tip: this topic does not need to be prefixed).

* Only one of s1, s2, s3 will receive msg
* Only one of s4, s5 will receive msg
* s6 will receive msg

## Shared subscription without group

Shared subscriptions prefixed with `$queue/` are shared subscriptions without groups. 
It is a special case of $share subscription, which is quite similar to all subscribers in a subscription group.

### Example

* subscribers s1, s2, and s3 subscribe topic `$queue/test`
* subscriber s4 subscribe topic `test` 

Then when publisher publishes a message with topic `test` to the EMQX Cloud (tip: this topic does not need to be prefixed).

* Only one of s1, s2, s3 will receive msg
* s4 will receive msg

## Test shared subscription using MQTT X

Simulate client subscriptions using MQTT X.

* s1, s2 subscribe topic `$share/g1/test`
* s3 subscribe topic `test`

![shared_subscription_1](./_assets/shared_subscription_1.png)

Create client P1 using MQTT X to send 3 messages to the topic `test`

![shared_subscription_2](./_assets/shared_subscription_2.png)

s1 receive msg1, msg2, s2 receive msg3 and s3 receive all messages

![shared_subscription_3](./_assets/shared_subscription_3.png)