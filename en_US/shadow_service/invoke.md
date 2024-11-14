# Communication

## MQTT

The device's messages communicate between the device and the broker by topics, which is no different from regular topic communication, but with the additional storage (data cache) capability. The device or the application can communicate through two topics: the topic for publishing and the topic for subscription.

### Topics and Methods

<table>
   <tr>
      <th>Topic</th>
      <th>Description</th>
   </tr>
   <tr>
      <td>shadow/${shadow_id}</td>
      <td>Topic for publishing. It's unique, for publishing messages from the device or the client to the service.</td>
   </tr>
   <tr>
      <td>shadow/${shadow_id}/reply</td>
      <td>Topic for subscription. It's unique, for the device or the client subscribing messages from the service.</td>
   </tr>
</table>

In addition to the `payload`, the message should also define the `method` that tells the service how the message should be updated.

<table>
   <tr>
      <th>Method</th>
      <th>Description</th>
   </tr>
   <tr>
      <td>PUT</td>
      <td>Use this method in <strong>the topic for publishing</strong>. Corresponding to the PUT method of HTTP, the method is for updating the specified shadow model’s JSON <strong>entirely</strong>. See invocation examples below.</td>
   </tr>
   <tr>
      <td>PATCH</td>
      <td>Use this method in <strong>the topic for publishing</strong>. Corresponding to the PATCH method of HTTP, the method is for updating the specified shadow model’s JSON <strong>partially</strong>. See invocation examples below.</td>
   </tr>
   <tr>
      <td>GET</td>
      <td>Use this method in <strong>the topic for publishing</strong>. Corresponding to the GET method of HTTP, the method is for getting the specified shadow model’s JSON. See invocation examples below.</td>
   </tr>
</table>

**In the case of updating a payload using the PATCH method, it can't add new multi-level objects at once. See invocation examples below.**

### Shadow Model JSON

``` json
{
    "data": {},
    "createAt": 1660201961567,
    "lastTime": 1660204233317,
    "version": 3
}
```
<table>
   <tr>
      <th>Key</th>
      <th>Type</th>
      <th>Description</th>
   </tr>
   <tr>
      <td>data</td>
      <td>Object</td>
      <td>Message payload published through topic or API call.</td>
   </tr>
   <tr>
      <td>createAt</td>
      <td>Number</td>
      <td>Created time</td>
   </tr>
   <tr>
      <td>lastTime</td>
      <td>Number</td>
      <td>Last updated time</td>
   </tr>
   <tr>
      <td>version</td>
      <td>Number</td>
      <td>How many times the JSON payload has been updated.</td>
   </tr>
</table>

### Invocation Examples

#### Entire Update
Update the specified shadow model’s JSON **entirely** by `PUT`.

Original shadow model’s JSON
``` json
{
    "Key01": {
        "a": 100
    }
}
```

Entire update through topic (shadow/${shadow_id})
``` json
{
    "method": "PUT",
    "payload": {
        "Key01": {
            "b": 200,
            "c": 300
        },
        "Key02": {
            "d" : 400
        }
    }
}
```

Shadow model’s JSON updated result
``` json
{
    "Key01": {
        "b": 200,
        "c": 300
    },
    "Key02": {
        "d": 400
    }
}
```

#### Partial Update
Update the specified shadow model’s JSON **partially** by `PATCH`.

Original Shadow model’s JSON
``` json
{
    "Key01": {
        "a": 100
    }
}
```

Partial update through topic (shadow/${shadow_id})
``` json
{
    "method": "PATCH",
    "payload": {
        "Key01": {
            "b": 200,
            "c": 300
        }
    }
}
```

Shadow model’s JSON updated result
``` json
{
    "Key01": {
        "a": 100,
        "b": 200,
        "c": 300
    }
}
```

#### Add New Multi-Level Objects

Because it can't add new multi-level objects at once by partial update, the object should be added one level at a time.

Shadow model’s JSON
``` json
{
    "Key01": {
        "a": 100
    }
}
```

The following ways of directly adding multi-level objects will report errors
``` json
{
    "method": "PATCH",
    "payload": {
        "Key01": {
            "a": 100
        },
        "Key02": {
            "b": 200
        }
    }
}

{
    "method": "PATCH",
    "payload": {
        "Key01": {
            "a": 100,
            "Key02": {
                "b": 200
            }
        }
    }
}
```

Create new multi-level object level by level.

First Step
``` json
{
    "method": "PATCH",
    "payload": {
        "Key01": {
            "a": 100
        },
        "Key02": {}
    }
}
```
Second Step
``` json
{
    "method": "PATCH",
    "payload": {
        "Key01": {
            "a": 100
        },
        "Key02": {
            "b": 200
        }
    } 
}
```

#### Get Shadow Model’s JSON
Get shadow model’s JSON by `GET`

Shadow model’s JSON
``` json
{
    "Key01": {
        "a": 100
    },
    "Key02": {
        "b": 200
    }
}
```

Get the shadow model’s JSON through the topic (shadow/${shadow_id})
``` json
{
    "payload": {},
    "method": "GET"
}
```

Receive the message through the topic for subscription (shadow/${shadow_id}/reply)
``` json
{
    "data": {
        "Key01": {
            "a": 100
        },
        "Key02": {
            "b": 200
        }
    },
    "createAt": 1660201961567,
    "lastTime": 1660204233317,
    "version": 2
}
```

## API Communication

EMQX Cloud provides APIs to get details from shadow services.

Please see the [API - Shadow Services](../api/shadow_service.md) to learn more.
