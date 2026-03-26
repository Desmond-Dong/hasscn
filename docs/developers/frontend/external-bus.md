---
title: "外部总线"
---

前端可以与嵌入 Home Assistant 前端的外部应用建立一个消息总线。这个系统是对[外部身份验证](/developers/frontend/external-authentication)的泛化，使得未来在应用端或前端侧都无需复杂布线即可更轻松地添加更多命令。

## 消息交换

与 external auth 一样，消息交换通过外部应用提供一个 JavaScript 方法来实现。

消息以序列化后的 JSON 对象形式传递给外部应用。将被调用的函数接收一个参数：字符串。外部应用需要处理该消息并据此执行操作（或忽略它）。

在 Android 上，你的应用需要定义以下方法：

```ts
window.externalApp.externalBus(message: string)
```

在 iOS 上，你的应用需要定义以下方法：

```ts
window.webkit.messageHandlers.externalBus.postMessage(message: string);
```

要向前端发送消息，请将消息序列化为 JSON，并从外部应用调用以下函数：

```ts
window.externalBus(message: string)
```

## 消息格式

消息描述了发送方希望接收方执行的动作或了解的信息。如果它是一个动作，发送方会期待收到一个包含该动作结果的响应。对命令的响应可以是成功，也可以是失败。

### 动作与信息消息格式

包含动作或提供信息的消息格式是相同的。它包含一个标识符、一个类型，以及一个可选的 payload（取决于类型）。

结果消息会在响应中复用该标识符，以表明该响应对应哪个动作。

消息的基本格式如下：

```ts
{
  id: number;
  type: string;
  payload?: unknown;
}
```

示例消息：

```json
{
  "id": 5,
  "type": "config/get"
}
```

### 结果消息格式

如果消息是一个动作，发送方会期待收到一个结果响应。响应可能是成功，也可能是失败。

结果的类型取决于它所响应的消息类型。例如，如果它响应的是 `config/get`，那么结果应是一个描述配置的对象。

消息格式：

```ts
interface SuccessResult {
  id: number;
  type: "result";
  success: true;
  result: unknown;
}

interface ErrorResult {
  id: number;
  type: "result";
  success: false;
  error: {
    code: string;
    message: string;
  };
}
```

## 支持的消息

### 获取外部配置

可用于：Home Assistant 0.92
类型：`config/get`
方向：frontend 到 external app。
需要响应：是

向外部应用查询外部配置。外部配置用于自定义前端中的体验。

期望的响应 payload：

```ts
{
  hasSettingsScreen: boolean;
  canWriteTag: boolean;
}
```

- `hasSettingsScreen` 为 true 时，表示外部应用在收到 `config_screen/show` 命令时会显示一个配置页面。此时，侧边栏中会新增一个选项来触发该配置页面。
- `canWriteTag` 为 true 时，表示外部应用能够写入 tag，因此可以支持 `tag/write` 命令。

### 显示配置页面 `config_screen/show`

可用于：Home Assistant 0.92
类型：`config_screen/show`
方向：frontend 到 external app。
需要响应：否

显示外部应用的配置页面。

### 连接状态更新 `connection-status`

可用于：Home Assistant 0.92
类型：`connection-status`
方向：frontend 到 external app。
需要响应：否

在前端连接到 Home Assistant 时通知外部应用。

载荷结构：

```ts
{
  event: "connected" | "auth-invalid" | "disconnected";
}
```

### 触发触觉反馈 `haptic`

可用于：Home Assistant 0.92
类型：`haptic`
方向：frontend 到 external app。
需要响应：否

通知外部应用触发触觉反馈。

载荷结构：

```ts
{
  hapticType:
    | "success"
    | "warning"
    | "failure"
    | "light"
    | "medium"
    | "heavy"
    | "selection";

}
```

### 写入 tag `tag/write`

可用于：Home Assistant 0.115
类型：`tag/write`
方向：frontend 到 external app
需要响应：是

通知外部应用打开用于写入 tag 的 UI。Name 是用户输入的 tag 名称。如果未设置名称，则 name 为 `null`。

```ts
{
  tag: string;
  name: string | null;
}
```

当前期望的响应 payload 是一个空对象。之后我们可能会添加更多内容：

```ts
{}
```
