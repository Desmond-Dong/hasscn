---
title: "推送通知"
---

`mobile_app` 集成内置了通知平台，可用统一方式向用户发送推送通知，无需安装额外的自定义组件。推送通知既可以通过 WebSocket 连接投递，也可以通过云服务投递。

## 启用 websocket 推送通知

你的应用可以通过 WebSocket API 连接到 Home Assistant，并订阅推送通知。要启用此功能，应用需要订阅云推送通知，或在注册信息的 `app_data` 对象中加入 `push_websocket_channel: true`。

要创建 WebSocket 通道，请先创建一个推送通知订阅：

```json
{
  "id": 2,
  "type": "mobile_app/push_notification_channel",
  "webhook_id": "abcdefghkj",
  "support_confirm": true // optional
}
```

所有推送通知都会作为事件通过 WebSocket 连接发送：

```json
{
  "id": 2,
  "type": "event",
  "event": {
    "message": "Hello world",
    "hass_confirm_id": "12345" // if confirm = true
  },
}
```

如果启用了确认机制，你必须再发送一个 WebSocket 命令进行确认：

```json
{
  "id": 3,
  "type": "mobile_app/push_notification_confirm",
  "webhook_id": "abcdefghkj",
  "confirm_id": "12345"
}
```

如果某个注册同时支持云推送通知，并且当前已连接可接收本地推送通知，那么通知会优先通过本地方式发送；若应用未确认该通知，则会回退到云推送。

## 启用云推送通知

要为你的应用启用通知平台，你必须在首次注册时或后续更新现有注册时，在 `app_data` 对象中设置两个键。

| 键 | 类型 | 说明
| --- | ---- | -----------
| `push_token` | string | 用户设备唯一的推送通知令牌，例如 APNS token 或 FCM Instance ID/token。
| `push_url` | string | 你的服务器接收推送通知 HTTP POST 请求的 URL。

设置这些键后，你应提示用户重启 Home Assistant，这样他们才能看到对应的通知目标，其格式为 `notify.mobile_app_<saved_device_name>`。

### 部署服务器组件

通知平台本身并不负责如何真正通知用户。它只是把通知转发到你的外部服务器，由你的服务器实际处理该请求。
这种方式让你能够完全掌控自己的推送通知基础设施。

下一节提供了一个推送通知转发服务器的示例实现，使用 Firebase Cloud Functions 和 Firebase Cloud Messaging。

你的服务器应能接收如下格式的 HTTP POST 负载：

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
`webhook_id` 仅会在 core-2021.11 及以上版本中包含。
:::

如果通知已成功加入发送队列，服务器应返回 `201` 状态码。

### 错误

如果发生错误，你应返回一个说明错误原因的响应，并使用 _不是_ 201 或 429 的状态码。错误响应必须是 JSON 对象，并可包含以下任一键：

| 键 | 类型 | 说明
| --- | ---- | -----------
| `errorMessage` | string | 如果提供，会追加到预设错误消息后。例如 `errorMessage` 为 "Could not communicate with Apple" 时，日志中会显示为 "Internal server error, please try again later: Could not communicate with Apple"。
| `message` | string | 如果提供，会直接以 warning 级别写入日志。

无论使用哪个键，都应尽量清楚地说明出了什么问题，以及用户在可能的情况下该如何修复。

### 速率限制

通知平台还支持向用户暴露速率限制信息。Home Assistant 建议你采用较保守的限流策略，以控制成本，并避免用户给自己发送过多通知。
作为参考，Home Assistant Companion 每 24 小时最多可发送 150 条通知。该限制会在 UTC 午夜对所有用户重置。当然，你也可以按自己的需求设计限流配置。

如果你决定实现速率限制，成功响应应类似如下：

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

| 键 | 类型 | 说明
| --- | ---- | -----------
| `successful` | integer | 用户在当前限流周期内成功发送的推送通知数量。
| `errors` | integer | 用户在当前限流周期内发送失败的推送通知数量。
| `maximum` | integer | 用户在当前限流周期内允许发送的推送通知上限。
| `resetsAt` | ISO8601 timestamp | 用户当前限流周期的重置时间戳，必须使用 UTC 时区。

每次通知成功发送后，这些速率限制信息都会以 warning 级别写入日志。Home Assistant 还会输出距离当前限流周期重置还剩多久。

当用户在当前限流周期内达到通知发送上限后，你应在该周期结束前持续返回 `429` 状态码。响应对象还可以选择包含 `message` 键，用于替代标准错误消息写入 Home Assistant 日志。

通知平台本身不会实施任何速率限制保护。用户仍然可以继续向你的服务器发送通知，因此你应尽早在业务逻辑中用 `429` 状态码拒绝超限请求。

### 服务器实现示例

下面的代码是一个 Firebase Cloud Function，用于将通知转发到 Firebase Cloud Messaging。部署前，你应先创建一个名为 `rateLimits` 的 Firestore 数据库，然后部署以下代码。
同时请确保项目已正确配置 APNS 和 FCM 所需的认证密钥。

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
