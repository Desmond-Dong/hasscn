---
title: "操作"
id: "actions"
---

<img src="/companion-assets/apple.svg" alt="Apple" style="height: 1em; vertical-align: middle;" /> 专属

操作是一个通用系统，允许您轻松将 Home Assistant 自动化系统集成到 iOS、[Apple Watch](/companion/apple-watch/index) 和 CarPlay 的多个区域。

## 创建操作

您可以在应用内部或 Home Assistant 的 `configuration.yaml` 中创建操作。

### 在应用中创建操作

操作是在 iOS 版 Companion 应用的 [配置](https://my.home-assistant.io/redirect/config/) 页面的 Companion App 部分中的"操作"部分创建的。每个操作都有必填字段，具体取决于您的设备：

- `Name`：操作的名称，将在应用触发的 [Home Assistant 事件](https://www.home-assistant.io/docs/configuration/events/) 中返回。
- `Server`：如果您连接了多个 Home Assistant 服务器，请选择操作应发送到的服务器。
- `Text`：在手机和手表上显示的描述性文本。最好保持相对简短，因为每个操作按钮的空间有限。
- `Text Color`*：上述文本的颜色。
- `Background Color`*：为操作创建的按钮的背景颜色。**(需要启用 `use_custom_colors`)**
- `Icon`：在操作按钮的文本左侧显示的图标。
- `Icon Color`：操作按钮上图标的颜色。
- `Show in CarPlay`：布尔值，用于在 CarPlay 中显示或隐藏操作。
- `Show in Watch`：布尔值，用于在 Apple Watch 中显示或隐藏操作。
- `Use custom colors`**：布尔值，用于在小部件和 Apple Watch 中启用自定义颜色。最初提供的是平铺卡片 UI，启用此选项后可以更改背景和文本颜色。（iOS App v2024.7.1 起可用）

\* 需要 `use_custom_colors` 为 **true**

** iOS App v2024.7.1 起可用

对于三个颜色字段，通过点击每个字段中的颜色选择器圆圈来选择颜色。

### 在 Home Assistant 中创建操作

您可以在 Home Assistant 的 `configuration.yaml` 中定义操作。这需要至少 Home Assistant 0.115 和版本 2020.6。以下是示例条目。

```yaml
ios:
  actions:
    - name: Fred
      background_color: "#000000" # 需要 `use_custom_colors`
      label:
        text: "Hello, World"
        color: "#ff0000" # 需要 `use_custom_colors`
      icon:
        icon: earth
        color: "#ffffff"
      show_in_carplay: false
      show_in_watch: true
      use_custom_colors: true
```

颜色应为十六进制格式，图标应来自 [mdi](https://materialdesignicons.com/) 图标集。

保存这些更改后，您需要重启 Home Assistant，然后在 Companion 应用中，进入 [配置](https://my.home-assistant.io/redirect/config/) 的 Companion App 部分的"操作"部分。它应该会自动同步，但您也可以下拉刷新来同步。

当多个服务器连接到应用时，无需在 `configuration.yaml` 中指定 `server` 值，应用会在导入时自动检测操作的来源。

## 使用操作

填写完所有操作数据（文本、名称等）后，点击 **创建自动化** 按钮。

*或者：*

当按下操作按钮时，Home Assistant 的事件总线上会触发 `ios.action_fired` 事件。事件数据由与操作相关的属性组成的 JSON 格式字典组成。

| 属性    | 值                                                                                                                                                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context`    | 与触发事件的用户和事件 ID 相关的子字典                                                                                                                                               |
| `data`       | 包含有关操作及其来源的关键信息的子字典                                                                                                                                                       |
| `event_type` | 始终为 `ios.action_fired`                                                                                                                                                                                                         |
| `origin`     | 始终为 `REMOTE`                                                                                                                                                                                                                   |
| `time_fired` | 操作触发的时间，格式为 [ISO 时间戳](https://en.wikipedia.org/wiki/ISO_8601)，例如拉普兰（东欧时间，UTC+2）圣诞节午夜的格式为 `2019-12-25T00:00.000000+02:00`。 |

`data` 中包含的属性有：

| 属性 | 值 |
| ------ | ------ |
| `actionID` | 操作的唯一标识符。 |
| `actionName` | 在 iOS 中创建操作时在 `Name` 字段中给出的操作名称，或在 Android 中使用 `action` 字段时给出的名称。 |
| `sourceDeviceID` | 在您设备的 [配置](https://my.home-assistant.io/redirect/config/) 的 Companion App 部分中设置的设备 ID。 |
| `sourceDeviceName` | 触发操作的设备名称。这是在 iOS 的设置应用 > 通用 > 关于本机中设置的设备名称，或在 Android 中是在设置 > 关于手机中设置的。 |
| `sourceDevicePermanentID` | 触发操作的设备的唯一标识符 |
| `triggerSource` | 操作从 iOS 的哪个部分触发。可能是：`widget`（今日屏幕）、`appShortcut`（通过 3D Touch 访问的快捷操作）或 `watch`（从 Apple Watch 触发）。从 Apple 的 CarPlay 触发时，来源将是 `carPlay`。 |

`context` 中包含的属性有：

| 属性   | 值                                                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | 事件的一次性唯一 ID。                                                                                                                     |
| `parent_id` | 始终为 `null`。                                                                                                                                          |
| `user_id`   | 用于授权 Companion 应用与 Home Assistant 连接的 [用户 ID](https://www.home-assistant.io/docs/authentication/#user-accounts)。 |

操作可用于触发 Home Assistant 中的自动化。示例 `configuration.yaml` 条目可能如下：

示例

```yaml
automation:
  - alias: "操作关闭灯光"
    initial_state: true
    trigger:
      - platform: event
        event_type: ios.action_fired
        event_data:
          actionName: "睡觉时间"
    action:
      - action: light.turn_off
        entity_id: group.all_lights
```

请注意，位于 `data` 和 `context` 中的属性分别通过自动化中的 `event_data` 和 `event_context` 访问。

您可以使用 Home Assistant 开发者工具中的事件页面，通过订阅 `ios.action_fired` 并从您的设备触发操作来显示特定事件包含的所有信息。

## Apple Watch

[Apple Watch 应用](/companion/apple-watch/index) 提供对您创建的操作的访问。在操作页面创建操作后，打开 Home Assistant 手表应用，操作列表应该会同步。在 Apple Watch 上触发的操作带有[略有不同的负载](/companion/apple-watch/actions)。

## 主屏幕快捷操作

[主屏幕快捷操作](https://support.apple.com/guide/iphone/keep-apps-handy-iph414564dba/ios#iph1ffcbd691) 提供了访问您的操作的便捷快捷方式。要访问它，请在主屏幕上长按 Home Assistant Companion 应用图标。

## 今日视图小部件

**(iOS App v2024.8 起已停用，请改用 iOS 小部件)**

[今日视图小部件](https://support.apple.com/en-gb/HT207122) 是另一个可以触发操作的途径。要将 Home Assistant 小部件添加到您的今日视图：

1.  在主屏幕或锁屏界面上向右滑动。
2.  滑动到最底部，点击编辑按钮。
3.  在"更多小部件"列表中找到"Home Assistant - 操作"小部件，然后点击绿色 + 按钮添加它。
4.  按您的喜好重新排列，然后点击完成。