前端能够与一个嵌入 Home Assistant 前端的外部应用建立一个 message bus。该系统是 [external authentication](frontend/external-authentication.md) 的泛化，使未来更容易添加更多命令，而无需在应用或前端两端进行大量接线工作。

## 消息交换

与 external auth 类似，消息交换是通过外部应用提供一个 JavaScript 方法来实现的。

消息以序列化 JSON 对象的形式传递给外部应用。将被调用的函数接受单个参数：一个字符串。外部应用必须处理该消息并相应地处理它（或忽略它）。

在 Android 上，实现方式取决于 WebView 的功能：

**V2（推荐）**：使用 [`WebViewFeature.WEB_MESSAGE_LISTENER`][web-message-listener] 进行安全的来源验证。前端使用注入的 V2 对象发送消息：

```ts
window.externalAppV2.postMessage(message: string)
```

**V1（备选）**：当 WebView 不支持 [`WebViewFeature.WEB_MESSAGE_LISTENER`][web-message-listener] 时使用。你的应用需要定义：

```ts
window.externalApp.externalBus(message: string)
```

在 iOS 上，你的应用需要定义以下方法：

```ts
window.webkit.messageHandlers.externalBus.postMessage(message: string);
```

要将消息发送到前端，请将消息序列化为 JSON，并从外部应用调用以下函数：

```ts
window.externalBus(message: string)
```

## 消息格式

消息描述了一个发送方希望接收方执行或知晓的操作或信息。如果它是一个操作，发送方将期望收到包含该操作结果的响应。对命令的响应可以是成功或失败。

### Action 和 info 消息格式

包含或提供信息的消息格式是相同的。它包含一个标识符、一个类型和一个可选的 payload（取决于类型）。

结果消息会在响应中重用标识符，以指示该响应对应于哪个操作。

消息的基本格式如下：

```ts
{
  id: number;
  type: string;
  payload?: unknown;
}
```

一条示例消息：

```json
{
  "id": 5,
  "type": "config/get"
}
```

### 结果消息格式

如果该消息是一个操作，发送方将期望收到包含结果的响应。响应要么是成功，要么是失败。

结果的类型取决于它所响应的消息类型。例如，如果它响应的消息类型是 `config/get`，则结果应为一个描述配置的对象。

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

消息按方向组织：从 frontend 到 app，以及从 app 到 frontend。

### 从 frontend 到 app 的消息

这些消息从 Home Assistant 前端发送到外部应用。

#### 期望响应的消息

##### `config/get`

查询外部应用的外部配置。外部配置用于自定义前端的体验。

Payload：无

期望响应：

```ts
{
  hasSettingsScreen?: boolean;
  hasSidebar?: boolean;
  canWriteTag?: boolean;
  hasExoPlayer?: boolean;
  canCommissionMatter?: boolean;
  canImportThreadCredentials?: boolean;
  canTransferThreadCredentialsToKeychain?: boolean;
  hasAssist?: boolean;
  hasBarCodeScanner?: number;
  canSetupImprov?: boolean;
  appVersion?: string;
  hasEntityAddTo?: boolean;
  hasAssistSettings?: boolean;
}
```

* `hasSettingsScreen`：如果外部应用在收到 `config_screen/show` 时会显示配置屏幕，则设为 true
* `hasSidebar`：如果外部应用有 sidebar，则设为 true
* `canWriteTag`：如果外部应用可以写入 NFC tag（即设备有 NFC 硬件），则设为 true
* `hasExoPlayer`：如果应用支持通过 ExoPlayer 进行 HLS 视频播放，则设为 true
* `canCommissionMatter`：如果应用可以 commission Matter 设备，则设为 true
* `canImportThreadCredentials`：如果应用可以导入 Thread 凭据，则设为 true
* `canTransferThreadCredentialsToKeychain`：如果应用可以将 Thread 凭据转移到 keychain（仅限 Apple），则设为 true
* `hasAssist`：如果应用有原生的 Assist 界面（取代前端实现），则设为 true
* `hasBarCodeScanner`：如果应用有条码扫描能力，则设为 `1`，否则设为 `0`
* `canSetupImprov`：如果应用可以设置 Improv Wi-Fi 设备，则设为 true
* `appVersion`：原生应用的版本字符串
* `hasEntityAddTo`：如果应用支持将实体添加到平台特定的位置（例如 homescreen widget），则设为 true
* `hasAssistSettings`：如果应用有 Assist 设置屏幕，则设为 true

##### `entity/add_to/get_actions`

获取将实体添加到设备（例如 homescreen、watch face）的可用操作。

Payload：

```ts
{
  entity_id: string;
}
```

期望响应：

```ts
{
  actions: Array<{
    enabled: boolean;
    name: string;
    details?: string;
    mdi_icon: string;
    app_payload: string;
  }>;
}
```

* `enabled`：该操作当前是否可用
* `name`：操作的显示名称
* `details`：关于该操作的可选附加信息
* `mdi_icon`：操作的 Material Design Icon 标识符（例如，"mdi:car"）
* `app_payload`：要发送回 `entity/add_to` 以执行该操作的不透明字符串

#### 不期望响应的消息

##### `assist/settings`

打开 Assist 设置屏幕。

Payload：无

##### `assist/show`

显示原生的 Assist 界面。

Payload（可选）：

```ts
{
  pipeline_id: "preferred" | "last_used" | string;
  start_listening: boolean;
}
```

* `pipeline_id`：要使用的 pipeline，或 "preferred"/"last\_used" 用于自动选择
* `start_listening`：是否立即开始监听

##### `bar_code/close`

关闭条码扫描器。

Payload：无

##### `bar_code/notify`

在条码扫描器中显示通知消息。

Payload：

```ts
{
  message: string;
}
```

##### `bar_code/scan`

开始扫描条码。

Payload：

```ts
{
  title: string;
  description: string;
  alternative_option_label?: string;
}
```

* `title`：在扫描器 UI 中显示的标题（必填）
* `description`：在扫描器 UI 中显示的说明文本（必填）
* `alternative_option_label`：替代操作按钮的可选标签；如果未包含，则应隐藏替代操作按钮

##### `config_screen/show`

显示外部应用的配置屏幕。

Payload：无

##### `connection-status`

通知外部应用前端是否与 Home Assistant 已连接。

Payload：

```ts
{
  event: "connected" | "auth-invalid" | "disconnected";
}
```

##### `entity/add_to`

将实体添加到平台特定的位置（例如 homescreen widget）。

Payload：

```ts
{
  entity_id: string;
  app_payload: string;
}
```

* `entity_id`：要添加的实体
* `app_payload`：从 `entity/add_to/get_actions` 接收的不透明字符串

##### `exoplayer/play_hls`

播放 HLS 视频流。

Payload：

```ts
{
  url: string;
  muted: boolean;
}
```

* `url`：HLS 流 URL
* `muted`：是否以静音方式开始播放

##### `exoplayer/resize`

调整 HLS 视频播放器的大小。

Payload：

```ts
{
  left: number;
  top: number;
  right: number;
  bottom: number;
}
```

* `left`：播放器左坐标
* `top`：播放器上坐标
* `right`：播放器右坐标
* `bottom`：播放器下坐标

##### `exoplayer/stop`

停止 HLS 视频播放。

Payload：无

##### `focus_element`

聚焦前端中的特定元素。

Payload：

```ts
{
  element_id: string;
}
```

* `element_id`：要聚焦元素的 ID

##### `haptic`

通知外部应用触发 haptic 反馈。

Payload：

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

##### `improv/configure_device`

配置已发现的 Improv Wi-Fi 设备。

Payload：

```ts
{
  name: string;
}
```

* `name`：要配置的设备的名称

##### `improv/scan`

开始扫描 Improv Wi-Fi 设备。

Payload：无

##### `matter/commission`

开始 Matter 设备的 commissioning 流程。

Payload（可选）：

```ts
{
  mac_extended_address: string | null;
  extended_pan_id: string | null;
  border_agent_id: string | null;
  active_operational_dataset: string | null;
}
```

所有 payload 属性描述的是 commissioning Matter over Thread 设备时应该使用的首选 Thread 网络。

* `mac_extended_address`：MAC extended address
* `extended_pan_id`：extended PAN ID
* `border_agent_id`：border agent ID
* `active_operational_dataset`：active operational dataset（TLV）

##### `sidebar/show`

显示 sidebar。

Payload：无

##### `tag/write`

通知外部应用打开写入 tag 的 UI。

Payload：

```ts
{
  tag: string;
  name: string | null;
}
```

* `tag`：要写入的 tag ID
* `name`：用户输入的 tag 名称，如果未设置名称则为 `null`

##### `theme-update`

通知应用 theme 已被更新。应用应刷新其状态栏和导航栏颜色。

Payload：无

##### `thread/import_credentials`

从设备导入 Thread 网络凭据。凭据应通过 [WebSocket API](/developers/api/websocket.md) 发送。

Payload：无

##### `thread/store_in_platform_keychain`

将 Thread 凭据存储到平台 keychain 中。

Payload：

```ts
{
  mac_extended_address: string | null;
  border_agent_id: string | null;
  active_operational_dataset: string;
  extended_pan_id: string;
}
```

* `mac_extended_address`：MAC extended address
* `border_agent_id`：border agent ID
* `active_operational_dataset`：active operational dataset（TLV）
* `extended_pan_id`：extended PAN ID

### 从 app 到 frontend 的消息

这些消息从外部应用发送到 Home Assistant 前端。

#### 期望响应的消息

本节中的所有命令都会从前端收到一条结果消息：

```ts
{
  id: number;
  type: "result";
  success: boolean;
  result: null;
  error?: { code: string; message: string };
}
```

##### `automation/editor/show`

打开 automation editor 以创建新的自动化。config 可用于使用特定的 triggers、conditions 和 actions 预填充编辑器。

Payload（可选）：

```ts
{
  config?: {
    alias?: string;
    description?: string;
    triggers?: Trigger | Trigger[];
    conditions?: Condition | Condition[];
    actions?: Action | Action[];
    mode?: "single" | "restart" | "queued" | "parallel";
    max?: number;
  };
}
```

* `config.alias`：自动化的预填充名称
* `config.description`：预填充的描述
* `config.triggers`：一个或多个用于预填充的 trigger
* `config.conditions`：一个或多个用于预填充的 condition
* `config.actions`：一个或多个用于预填充的 action
* `config.mode`：自动化的执行模式
* `config.max`：并发运行的最大数量（仅适用于 `queued` 和 `parallel` 模式）

##### `bar_code/aborted`

通知条码扫描已中止。

Payload：

```ts
{
  reason: "canceled" | "alternative_options";
}
```

##### `bar_code/scan_result`

将条码扫描器结果发送到前端。

Payload：

```ts
{
  rawValue: string;
  format:
    | "aztec"
    | "code_128"
    | "code_39"
    | "code_93"
    | "codabar"
    | "data_matrix"
    | "ean_13"
    | "ean_8"
    | "itf"
    | "pdf417"
    | "qr_code"
    | "upc_a"
    | "upc_e"
    | "unknown";
}
```

* `rawValue`：从 barcode 数据解码出的字符串
* `format`：条码格式，如 [Barcode Detection API](https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API#supported_barcode_formats) 中所定义

##### `improv/device_setup_done`

通知 Improv Wi-Fi 设备设置已完成。

Payload：无

##### `improv/discovered_device`

通知已发现 Improv Wi-Fi 设备。

Payload：

```ts
{
  name: string;
}
```

##### `kiosk_mode/set`

启用或禁用 kiosk mode。

Payload：

```ts
{
  enable: boolean;
}
```

##### `navigate`

导航到前端中的特定路径。

Payload：

```ts
{
  path: string;
  options?: {
    replace?: boolean;
    data?: any;
  };
}
```

* `path`：要导航到的绝对路径（例如，`/config/voice-assistants/assistants`）。该路径直接传递给 `history.pushState` 或 `history.replaceState`，因此它必须以 `/` 开头
* `options.replace`：如果为 true，则替换当前的浏览器历史记录条目，而不是推入新条目。
* `options.data`：要存储在浏览器历史状态中的可选数据，可通过 `history.state` 访问

##### `notifications/show`

显示 notifications panel。

Payload：无

##### `restart`

请求前端重启。

Payload：无

##### `sidebar/show`

显示 sidebar。如果当前有 dialog 打开，则返回带有 `not_allowed` code 的错误响应。

Payload：无

##### `sidebar/toggle`

切换 sidebar 的打开/关闭。如果当前有 dialog 打开，则返回带有 `not_allowed` code 的错误响应。

Payload：无

[web-message-listener]: https://developer.android.com/reference/androidx/webkit/WebViewCompat.WebMessageListener
