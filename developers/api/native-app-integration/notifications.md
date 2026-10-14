`mobile_app` 集成内置了一个 notify platform，允许以一种通用方式向用户发送 push notifications，而无需安装外部自定义组件。Push notifications 可以通过 websocket 连接或通过云服务交付。

## 启用 websocket push notifications

你的应用可以通过 WebSocket API 连接到 Home Assistant 来订阅 push notifications。要启用此功能，你的应用需要订阅 cloud push notifications，或者在注册时将 `push_websocket_channel: true` 添加到 `app_data` 对象中。

要创建 websocket channel，请创建 push notification 订阅：

```json
{
  "id": 2,
  "type": "mobile_app/push_notification_channel",
  "webhook_id": "abcdefghkj",
  "support_confirm": true // 可选
}
```

所有 push notifications 都会作为 websocket 连接上的 event 交付：

```json
{
  "id": 2,
  "type": "event",
  "event": {
    "message": "Hello world",
    "hass_confirm_id": "12345" // 如果 confirm = true
  },
}
```

如果启用了确认，你必须发送一个 websocket 命令来确认：

```json
{
  "id": 3,
  "type": "mobile_app/push_notification_confirm",
  "webhook_id": "abcdefghkj",
  "confirm_id": "12345"
}
```

如果注册支持 cloud push notifications 且已连接以接收本地 push notifications，则 notifications 会先本地交付，如果应用未确认该 notification，则回退到 cloud。

## 启用 cloud push notifications

要为你的应用启用 notify platform，你必须在初始注册期间或后来更新现有注册时，在 `app_data` 对象中设置两个 key。

| Key | Type | Description |
| --- | ---- | ----------- |
| `push_token` | string | 对用户的设备唯一的 push notification token。例如，这可以是 APNS token 或 FCM Instance ID/token。 |
| `push_url` | string | 你的服务器上的 URL，push notifications 将通过 HTTP POST 发送到该 URL。 |

你应该建议用户在设置这些 key 后重启 Home Assistant，以便他们能看到 notify target。它将以 `notify.mobile_app_<saved_device_name>` 的格式出现。

### 部署服务端组件

Notify platform 并不关心如何通知你的用户。它只是将一条 notification 转发到你的外部服务器，你应该在那里实际处理该请求。

这种方法允许你完全控制自己的 push notification 基础设施。

请参阅本文档的下一节，了解一个使用 Firebase Cloud Functions 和 Firebase Cloud Messaging 的 push notification forwarder 的示例服务器实现。

你的服务器应该接受像这样的 HTTP POST payload：

```json
{
  "message": "Hello World",
  "title": "Test message sent via mobile_app.notify",
  "push_token": "my-secure-token",
  "registration_info": {
    "app_id": "io.home-assistant.iOS",
    "app_version": "1.0.0",
    "os_version": "12.2",
    "webhook_id": "webhook_id_from_registration"
  },
  "data": {
    "key": "value"
  }
}
```

:::info
`webhook_id` 仅在 core-2021.11 或更高版本中提供。
:::

假设 notification 已成功排队交付，它应该以 201 状态码响应。

### 错误

如果发生错误，你应当以 *非* 201 或 429 的状态码返回对出错情况的描述。错误响应必须是 JSON 对象，可以包含以下 key 之一：

| Key | Type | Description |
| --- | ---- | ----------- |
| `errorMessage` | string | 如果提供，它将附加到预设的错误消息后面。例如，如果 `errorMessage` 为"Could not communicate with Apple"，它将以"Internal server error, please try again later: Could not communicate with Apple"的形式输出到日志中 |
| `message` | string | 如果提供，它将以 warning 日志级别直接输出到日志中。 |

无论使用哪个 key，你都应该尽可能详细地描述出了什么问题，以及如果可能的话，用户如何修复它。

### 速率限制

Notify platform 还支持向用户公开速率限制。Home Assistant 建议你实现保守的速率限制，以保持成本较低，同时避免用户收到过多 notifications。

仅供参考，Home Assistant Companion 每 24 小时最多可发送 150 条 notifications。速率限制会在 UTC 午夜对所有用户重置。当然，你可以自由使用任何配置来实现自己的速率限制。

如果你选择实现速率限制，你成功的服务器响应应如下所示：

```json
{
  "rateLimits": {
    "successful": 1,
    "errors": 5,
    "maximum": 150,
    "resetsAt": "2019-04-08T00:00:00.000Z"
  }
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
| `successful` | integer | 用户在速率限制期间成功发送的 push notifications 数量。 |
| `errors` | integer | 用户在速率限制期间发送失败的 push notifications 数量。 |
| `maximum` | integer | 用户在速率限制期间最多可以发送的 push notifications 数量。 |
| `resetsAt` | ISO8601 timestamp | 用户的速率限制期间过期的时间戳。必须以 UTC 时区提供。 |

每次成功发送 notification 后，速率限制都会以 warning 日志级别输出到日志中。Home Assistant 还会输出距离速率限制期间重置的剩余确切时间。

一旦用户在速率限制期间达到最多发送的 notifications 数量，你应该开始以 429 状态码响应，直到速率限制期间过期。响应对象可以选择包含 key `message`，它将输出到 Home Assistant 日志中，而不是标准的错误消息。

Notify platform 本身不实现任何速率限制保护。用户将持续向你发送 notifications，因此你应该在逻辑的尽可能早的阶段以 429 状态码拒绝他们。

### 示例服务器实现

以下代码是一个 Firebase Cloud Function，它将 notifications 转发给 Firebase Cloud Messaging。要部署此代码，你应该创建一个名为 `rateLimits` 的 Firestore 数据库。然后，你可以部署以下代码。

此外，请确保你已经使用正确的 APNS 和 FCM 认证密钥正确配置了你的项目。

```javascript
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

var db = admin.firestore();

const MAX_NOTIFICATIONS_PER_DAY = 150;

exports.sendPushNotification = functions.https.onRequest(async (req, res) => {
  console.log('Received payload', req.body);
  var today = getToday();
  var token = req.body.push_token;
  var ref = db.collection('rateLimits').doc(today).collection('tokens').doc(token);

  var payload = {
    notification: {
      body: req.body.message,
    },
    token: token,
  };

  if(req.body.title) {
    payload.notification.title = req.body.title;
  }

  if(req.body.data) {
    if(req.body.data.android) {
      payload.android = req.body.data.android;
    }
    if(req.body.data.apns) {
      payload.apns = req.body.data.apns;
    }
    if(req.body.data.data) {
      payload.data = req.body.data.data;
    }
    if(req.body.data.webpush) {
      payload.webpush = req.body.data.webpush;
    }
  }

  console.log('Notification payload', JSON.stringify(payload));

  var docExists = false;
  var docData = {
    deliveredCount: 0,
    errorCount: 0,
    totalCount: 0,
  };

  try {
    let currentDoc = await ref.get();
    docExists = currentDoc.exists;
    if(currentDoc.exists) {
      docData = currentDoc.data();
    }
  } catch(err) {
    console.error('Error getting document!', err);
    return handleError(res, 'getDoc', err);
  }

  if(docData.deliveredCount > MAX_NOTIFICATIONS_PER_DAY) {
    return res.status(429).send({
      errorType: 'RateLimited',
      message: 'The given target has reached the maximum number of notifications allowed per day. Please try again later.',
      target: token,
      rateLimits: getRateLimitsObject(docData),
    });
  }

  docData.totalCount = docData.totalCount + 1;

  var messageId;
  try {
    messageId = await admin.messaging().send(payload);
    docData.deliveredCount = docData.deliveredCount + 1;
  } catch(err) {
    docData.errorCount = docData.errorCount + 1;
    await setRateLimitDoc(ref, docExists, docData, res);
    return handleError(res, 'sendNotification', err);
  }

  console.log('Successfully sent message:', messageId);

  await setRateLimitDoc(ref, docExists, docData, res);

  return res.status(201).send({
    messageId: messageId,
    sentPayload: payload,
    target: token,
    rateLimits: getRateLimitsObject(docData),
  });

});

async function setRateLimitDoc(ref, docExists, docData, res) {
  try {
    if(docExists) {
      console.log('Updating existing doc!');
      await ref.update(docData);
    } else {
      console.log('Creating new doc!');
      await ref.set(docData);
    }
  } catch(err) {
    if(docExists) {
      console.error('Error updating document!', err);
    } else {
      console.error('Error creating document!', err);
    }
    return handleError(res, 'setDocument', err);
  }
  return true;
}

function handleError(res, step, incomingError) {
  if (!incomingError) return null;
  console.error('InternalError during', step, incomingError);
  return res.status(500).send({
    errorType: 'InternalError',
    errorStep: step,
    message: incomingError.message,
  });
}

function getToday() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return yyyy + mm + dd;
}

function getRateLimitsObject(doc) {
  var d = new Date();
  return {
    successful: (doc.deliveredCount || 0),
    errors: (doc.errorCount || 0),
    total: (doc.totalCount || 0),
    maximum: MAX_NOTIFICATIONS_PER_DAY,
    remaining: (MAX_NOTIFICATIONS_PER_DAY - doc.deliveredCount),
    resetsAt: new Date(d.getFullYear(), d.getMonth(), d.getDate()+1)
  };
}
```
