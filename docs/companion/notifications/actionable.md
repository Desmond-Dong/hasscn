---
title: "可操作通知"
id: "actionable-notifications"
---

可操作通知是一种独特的通知类型，它允许用户在通知中添加按钮，点击后可以向 Home Assistant 发送[事件](https://www.home-assistant.io/docs/configuration/events/)。然后可以在自动化中使用此事件，允许您执行各种操作。这些通知可以发送到 iOS 或 Android。

可操作通知的一些实用示例：

-   当您外出或睡觉时，家中检测到移动时发送通知。通知旁边显示"响起警报"操作按钮，点击后将响起防盗警报。
-   有人按响前门门铃。您收到一条带有访客[实时摄像头画面](dynamic-content.md)的通知，以及锁定或解锁前门的操作按钮。
-   车库门打开时收到通知，带有打开或关闭车库的操作按钮。

![可操作通知允许用户向 Home Assistant 发送命令。](/companion-assets/ios/actions.png)

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 如果您将多个服务器连接到 iOS 或 mac 应用，通知操作将在发送通知的服务器上触发。


:::caution 版本兼容性
iOS 和 macOS 上基于类别的通知已弃用。请参阅[迁移指南](#migrating-from-categories)了解如何转换现有通知。
:::

:::info Apple Watch
watchOS 上的操作需要安装 Watch 应用。您可以在系统 Watch 应用中安装它。
:::

## 构建可操作通知

您可以在操作中包含 `actions` 数组。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 允许 3 个通知操作。  
<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 允许约 10 个通知操作。更多操作会导致通知操作的系统界面出现滚动问题。

```yaml
action: notify.mobile_app_<your_device_id_here>
data:
  message: "家里发生了一些事情！"
  data:
    actions:
      - action: "ALARM" # 您为事件发送的键
        title: "响起警报" # 按钮标题
      - action: "URI" # 如果您计划使用 URI，必须设置为 URI
        title: "打开网址"
        uri: "https://google.com" # 选择操作时打开的 URL，也可以是 lovelace 视图/仪表板      
```

每个操作可以包含以下键：

| 键 | 含义 | 备注 |
| --- | --- | --- |
| `action` | **必需**。在事件中传回的标识符 | 当设置为 `REPLY` 时，系统会提示您输入要随事件发送的文本。 |
| `title` | **必需**。通知中显示的按钮标题 | |
| `uri` | **可选**。点击时打开的 URL | <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 需要将 `action` 设置为 `URI` 才能使用此键。请参阅[下面的说明](#uri-values)。 |
| `behavior` | **可选**。设置为 `textInput` 以提示输入文本并随事件返回。当将操作设置为 `REPLY` 时也会发生这种情况。 | 使用此键可以让您使用 `action` 键来区分操作。 |

### <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 专属选项

以下所有键都是可选的。

| 键 | 含义 | 备注 |
| --- | --- | --- |
| _无_ | 目前没有 Android 特定的键。 | |

### <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> iOS 专属选项

以下所有键都是可选的。

| 键 | 含义 | 备注 |
| --- | --- | --- |
| `activationMode` | 设置为 `foreground` 以在点击时启动应用。默认为 `background`，仅触发事件。 | 当提供 `uri` 时，此选项会自动设置为 `foreground`。 |
| `authenticationRequired` | 设置为 `true` 以要求输入密码才能使用该操作。 | |
| `destructive` | 设置为 `true` 以将操作标题显示为红色，表示破坏性操作。 | |
| `textInputButtonTitle` | 用于提示输入文本的操作的文本输入按钮标题。 | |
| `textInputPlaceholder` | 用于提示输入文本的操作的文本输入占位符。 | |
| `icon` | 用于通知的图标。 | 需要版本 2021.10。请参阅下面的说明。 |

#### 图标值

:::note 版本兼容性
这需要 iOS 应用版本 2021.10 或更高版本（iOS 15 或更高版本），或 macOS 应用的未来版本（macOS 12 或更高版本）。
:::

通知操作的图标仅允许来自 [SF Symbols 库](https://developer.apple.com/sf-symbols/)，这与 Home Assistant 中来自 [Material Design Icons 库](https://materialdesignicons.com/)的其他图标不同。这是由于 Apple 对这些操作的限制。

您必须在目录中的图标名称前加上 `sfsymbols:` 前缀（类似于在其他地方加上 `mdi:` 前缀），因为我们希望将来扩展此功能以支持 MDI。例如：

```yaml
action:
  - action: notify.mobile_app_<your_device_id_here>
    data:
      message: "家里发生了一些事情！"
      data:
        actions:
          - action: "ALARM"
            title: "响起警报"
            icon: "sfsymbols:bell"
          - action: "SILENCE"
            title: "静音警报"
            icon: "sfsymbols:bell.slash"
```

### URI 值

要导航到前端页面，请使用格式 `/lovelace/test`，其中 `test` 替换为定义视图中的 [`path`](https://www.home-assistant.io/dashboards/views/#path)。如果您计划使用仪表板，格式为 `/lovelace-dashboard/view`，其中 `/lovelace-dashboard/` 替换为您定义的 [`dashboard`](https://www.home-assistant.io/dashboards/dashboards) URL，`view` 替换为该仪表板中定义的 [`path`](https://www.home-assistant.io/dashboards/views/#path)。例如：

```yaml
- action: "URI"
  title: "打开摄像头"
  uri: "/lovelace/cameras"
```

#### <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 专属

如果您想打开应用程序，需要将操作设置为 `URI`。格式为 `app://<package>`，其中 `<package>` 替换为您希望打开的包（例如：`app://com.twitter.android`）。如果设备没有安装该应用程序，则 Home Assistant 应用程序将打开默认页面。

```yaml
- action: "URI"
  title: "打开 X"
  # 您想要打开的应用程序包名
  uri: "app://com.twitter.android"
```

将操作设置为 `URI`，您还可以触发任何实体的更多信息面板。格式为 `entityId:<entity_ID>`，其中 `<entity_id>` 替换为您希望查看的实体 ID。例如：`entityId:sun.sun`

```yaml
- action: "URI"
  title: "查看太阳"
  uri: "entityId:sun.sun"
```


您还可以在使用格式 `settings://notification_history` 时打开通知历史记录

```yaml
- action: "URI"
  title: "通知历史"
  uri: "settings://notification_history"
```

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

您还可以使用 [intent scheme URI](https://developer.chrome.com/docs/multidevice/android/intents/#syntax) 在已安装的应用程序中启动操作。

```yaml
- action: "URI"
  title: "Intent Scheme"
  uri: "intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end"
```

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

您可以通过使用 `deep-link://<deep_link>` 向应用发送特定的[深层链接](https://developer.android.com/training/app-links#deep-links)，其中 `<deep_link>` 是您希望发送的实际深层链接。

例如，拨打电话：

```yaml
- action: "URI"
  title: "拨打必胜客"
  uri: "deep-link://tel:2125551212"
```

#### <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> iOS 专属

您还可以使用启动应用程序的 URL。例如，拨打电话：

```yaml
- action: "CALL"
  title: "拨打必胜客"
  uri: "tel:2125551212"
```

或在默认浏览器中启动页面：

```yaml
- action: "OPEN"
  title: "打开 Safari"
  uri: "https://example.com"
```

## 构建通知操作脚本

在构建可操作通知时，有一些重要事项需要注意：

1. 您的脚本或自动化可能会多次运行
2. 通知的操作在所有通知之间共享

为避免问题，您可以为每次脚本运行创建唯一的操作。通过结合上下文和变量，这可以相当简单：

```yaml
# 在自动化操作或脚本序列中
- alias: "为操作设置变量"
  variables:
    # 在操作中包含 id 允许我们识别此脚本运行
    # 而不会意外触发其他通知操作
    action_open: "{{ 'OPEN_' ~ context.id }}"
    action_close: "{{ 'CLOSE_' ~ context.id }}"
- alias: "询问是否关闭或打开百叶窗"
  action: notify.mobile_app_<your_device>
  data:
    message: "百叶窗处于半开状态。您想调整吗？"
    data:
      actions:
        - action: "{{ action_open }}"
          title: 打开
        - action: "{{ action_close }}"
          title: 关闭
- alias: "等待响应"
  wait_for_trigger:
    - platform: event
      event_type: mobile_app_notification_action
      event_data:
        # 等待特定操作可以避免意外继续
        # 另一个脚本/自动化的通知操作
        action: "{{ action_open }}"
    - platform: event
      event_type: mobile_app_notification_action
      event_data:
        action: "{{ action_close }}"
- alias: "执行操作"
  choose:
    - conditions: "{{ wait.trigger.event.data.action == action_open }}"
      sequence:
        - action: cover.open_cover
          target:
            entity_id: cover.some_cover
    - conditions: "{{ wait.trigger.event.data.action == action_close }}"
      sequence:
        - action: cover.close_cover
          target:
            entity_id: cover.some_cover
```

上面的示例发送通知，等待响应，然后执行所请求的操作。 

当执行通知操作时，`mobile_app_notification_action` 事件会触发，包含以下数据：

```javascript
{
    "event_type": "mobile_app_notification_action",
    "data": {
        "action": "OPEN_<context_id_here>",
        // 将会出现：
        // - 当使用 `REPLY` 作为操作标识符时
        // - 当 `behavior` 设置为 `textInput` 时
        "reply_text": "用户的回复",
        // 仅限 iOS，如果在通知中发送，将被包含
        "action_data": {
          "entity_id": "light.test",
          "my_custom_data": "foo_bar"
        },
        // Android 用户还可以在此响应中看到随通知发送的所有数据字段，如 "tag"
        "tag": "TEST"
    },
    "origin": "REMOTE",
    "time_fired": "2020-02-02T04:45:05.550251+00:00",
    "context": {
        "id": "abc123",
        "parent_id": null,
        "user_id": "123abc"
    }
}
```

## 进一步考虑

### 阻塞行为
上面的示例将等待，直到执行通知操作。这可能会导致意外行为，具体取决于脚本的[自动化模式](https://www.home-assistant.io/docs/automation/modes/)。对于"single"模式，如果之前的通知操作尚未执行，这将导致脚本不会再次执行的情况。对于"queue"和"parallel"模式，如果一定数量的通知尚未执行，则会发生这种情况。对于"restart"模式，这意味着一旦脚本再次触发，脚本的旧实例的通知操作将不会触发相应的操作。根据使用情况，有几种选择：

-   您可以使用[超时](https://www.home-assistant.io/docs/scripts/#wait-timeout)来允许脚本的新执行。但是，这会导致手机上出现悬空通知。 
-   可以[清除通知](/companion/notifications/basic#clearing)，这可以与超时和并行执行模式结合使用以获得良好的结果。 
-   在 Android 中，您可以监听通知关闭时触发的[通知清除事件](/companion/notifications/cleared)，并进行相应处理。这可以通过添加以下行来实现
  ```
        - platform: event
          event_type: mobile_app_notification_cleared
          event_data:
            action_1_key: '{{ action_open }}'
  ```
  和 
  ```
      - conditions: "{{ wait.trigger.event.event_type == 'mobile_app_notification_cleared' }}"
        sequence:
            - action: persistent_notification.create
              data:
                title: 应用通知结果
                message: 通知已关闭
  ```
  请记住，当 Home Assistant 应用崩溃或关闭时，事件不会被触发，因此仍应考虑超时。

### 通用触发器
您还可以创建为任何通知操作触发的自动化。例如，如果您想在各种通知中包含 `SILENCE` 操作，但只在一个地方处理它：

```yaml
automation:
  - alias: "静音警报"
    trigger:
      - platform: event
        event_type: mobile_app_notification_action
        event_data:
          action: "SILENCE"
    action:
      ...
```

## 从类别迁移

从 iOS 版本 2021.5 开始，操作在内联通知中指定。要迁移，请执行以下操作：

1. 将 `actions` 数组添加到每个通知。例如：

```yaml
# 原始
action:
  - action: notify.mobile_app_<your_device_id_here>
    data:
      message: "家里发生了一些事情！"
      data:
        push:
          category: "ALARM"
        url:
          _: "/lovelace/cameras" # 如果点击通知本身
          ALARM: "/lovelace/alarm" # 如果点击 'ALARM' 操作
# 替换
action:
  - action: notify.mobile_app_<your_device_id_here>
    data:
      message: "家里发生了一些事情！"
      data:
        url: "/lovelace/cameras" # 如果未选择任何操作则启动
        actions:
          # 为了兼容性，可以使用 YAML 定义的操作
          # 例如，您可以使用 `identifier` 而不是 `action`
          - action: "ALARM"
            title: "响起警报"
            destructive: true
            uri: "/lovelace/alarm"
          - action: "SILENCE"
            title: "静音警报"
```

2. 将事件触发器转换为新值

```yaml
# 原始
automation:
  - alias: "响起警报 iOS"
    trigger:
      - platform: event
        event_type: ios.notification_action_fired
        event_data:
          actionName: "ALARM"
    action:
      ...
# 替换
automation:
  - alias: "响起警报 iOS"
    trigger:
      - platform: event
        event_type: mobile_app_notification_action
        event_data:
          action: "ALARM"
    action:
      ...
```

以上是迁移所需的最低限度。您还可以像前面的示例那样重写自动化以使用 `wait_for_trigger`，尽管这需要更多工作且并非严格必要。

## 不同设备的兼容性

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />专属

### iOS 13 及更高版本

* 所有设备都支持通过从右向左滑动并按"查看"在锁屏上展开通知，或长按展开，但在支持 3D Touch 的设备上，您可能仍需要施加一些力量才能完成。如果您不在锁屏上，也可以下拉通知以展开它。

### iOS 13 之前

*   对于支持 3D Touch 的设备 - 用力按压通知将展开它，在下方显示操作按钮。支持的设备包括 iPhone 6S、iPhone 6S Plus、iPhone 7、iPhone 7 Plus、iPhone 8、iPhone 8 Plus、iPhone X、iPhone XS 和 iPhone XS Max。如果不在锁屏上，您也可以下拉通知以展开它。

*   对于不支持"3D Touch"的设备（如 iPhone 6 及以下、iPhone SE、iPhone XR 和 iPad），您需要在通知上从左向右滑动，然后点击"查看"按钮。这将展开通知并在下方显示相关操作按钮。如果不在锁屏上，您需要下拉通知以展开它。