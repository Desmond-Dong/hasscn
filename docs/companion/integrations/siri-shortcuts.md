---
title: "Siri 快捷指令"
id: siri-shortcuts
---

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /><br />
使用 iOS 13 或更高版本以及 Home Assistant 伴侣应用，您可以利用 Siri 快捷指令的强大功能，通过点击或语音命令执行 Home Assistant 任务。

## 入门 - 示例快捷指令

例如，如果您想创建一个快捷指令来打开灯（此示例中为 `light.porch`）：

1. 打开快捷指令应用（iOS 默认包含，如果删除了可以从 [App Store](https://apps.apple.com/app/id915249334) 重新安装）
2. 点击右上角的加号图标创建新快捷指令。
3. 点击添加操作并添加一个"字典"项目。
4. 在字典项目中，点击"添加新项目"，点击"文本"，然后添加 `entity_id` 作为键，`light.porch` 作为文本。
5. 点击大加号添加另一个操作，搜索"Home Assistant"并选择"调用服务"。
6. 点击"调用服务并传递数据"中突出显示的"服务"。
7. 滚动可用服务列表并找到 `light.turn_on`。
8. 点击"调用服务并传递数据"行末尾的箭头，在"服务器"字段中选择您希望执行操作的 Home Assistant 服务器。
9. 只要字典操作在 Home Assistant 操作之上，就不需要输入更多详细信息。如果您不想使用字典操作，可以选择"显示更多"并在"服务数据"字段中以 JSON 格式输入操作数据。
10. 点击下一步，输入或录制一个名称/短语，用于"嘿 Siri"来触发快捷指令。

最终的快捷指令应该类似于这样：

<img className="center_image" alt="如上所述的已完成 Siri 快捷指令示例" src="/companion-assets/siri-shortcut-example.jpg" />

## 快捷指令流程

在前面的示例中，我们使用字典操作来定义我们的操作数据，这是一个操作向快捷指令流程中的后续操作提供数据的示例。这些数据可以来自其他应用或 Home Assistant 提供的其他操作，例如渲染文本以获取 Home Assistant 中实体的状态。默认情况下，如果没有提供其他流程或负载数据，空字段将尝试使用设备剪贴板上的数据。

## 操作

### 调用服务

您可以调用 Home Assistant 中设置的任何操作（参见[开发者工具中的操作页面](https://www.home-assistant.io/docs/tools/dev-tools/)）。如[上面的示例](#入门---示例快捷指令)所示。

### 触发事件

在 [Home Assistant 事件总线](https://www.home-assistant.io/docs/configuration/events/)上触发事件

:::tip
必须是有效的 JSON。
:::

### 获取摄像头图像

从摄像头实体获取单帧静止图像，并将其放到剪贴板或在后续操作中使用。

### 执行操作

执行一个[操作](/companion/core/actions)。

### 渲染模板

渲染一个[模板](https://www.home-assistant.io/docs/configuration/templating/)，然后可以在后续操作中使用。

### 发送位置

向 Home Assistant 发送位置。将尝试使用剪贴板内容作为位置，否则将使用当前位置。

### 更新传感器

更新所有传感器。

## 启动快捷指令

快捷指令深度集成到操作系统中。创建后，您有多种方式可以启动它们。

* **Siri / 语音** - 您可以使用 Siri 从 iPhone、iPad、HomePod 或 Apple Watch 启动任何已创建的快捷指令。如果您的快捷指令名为"Bedtime"，命令将是"嘿 Siri，Bedtime。"
* **小组件** - 快捷指令在今日视图中有一个小组件，可以通过从主屏幕或锁屏向右滑动来访问。在小组件屏幕底部，按"编辑"，然后按绿色加号按钮将小组件添加到今日视图。
* **快捷指令应用** - 在"我的快捷指令"标签页上，只需点击您想启动的快捷指令。如果需要，顶部有一个搜索栏可以快速筛选您的快捷指令列表。
* **Apple Watch (watchOS 7)** - 使用 iOS 14 和 watchOS7，您可以从快捷指令 Apple Watch 应用或通过 Siri 表盘上的复杂功能启动快捷指令。
* **Spotlight 搜索** - 在 iOS 设备主屏幕上，从主屏幕中心向下滑动以显示 Spotlight 搜索。在这里您可以输入快捷指令的名称并一键运行。
* **添加到主屏幕** - 编辑任何快捷指令时，按右上角的 (...) 按钮查看选项，然后按"添加到主屏幕"按钮。您可以根据需要自定义名称并提供自定义图标。
* **推送通知** - 快捷指令可以[通过推送通知](#通过-home-assistant-通知执行快捷指令)启动。
* **背面轻点 (iOS 14)** - 在 iOS 设置 > 辅助功能 > 触控 > 背面轻点下，您可以通过双击或三击 iPhone 背面来启动任何快捷指令。

## 通过 Home Assistant 通知执行快捷指令

您可以使用通知从 Home Assistant 触发快捷指令，如下所示：

```yaml
- action: notify.mobile_app_<your_device_id_here>
  data:
    message: "触发快捷指令！"
    data:
      shortcut:
        name: "快捷指令名称"
        # 您可以提供任意数量的键和值
        # 所有值必须是字符串（例如不能是数字、数组、字典等）
        key_for_shortcut: "提供给快捷指令的值"
        another_key: "另一个值"
```

当您点击通知启动 Home Assistant 时，它会将您重定向到快捷指令应用以执行给定的快捷指令。您可以使用上面 `shortcut` 中的以下键自定义此行为：

| 键 | 值 | 说明 |
| --- | ------ | ----- |
| `ignore_result` | 任何字符串，例如 `"ignore"` | 设置后，完成时不会重新打开 Home Assistant 应用。也会阻止以下事件触发。 |

:::note
如果快捷指令不需要任何输入，可能看起来快捷指令应用根本没有启动。检查执行的事件以查看结果。
:::

完成快捷指令后，它会返回 Home Assistant 并触发一个事件。触发的事件是 `ios.shortcut_run`，带有快捷指令的结果，包含以下键：

| 键 | 值 | 描述 |
| -- | -- | -- |
| `status` | `success`、`failure`、`cancelled` | 执行状态 |
| `result` | 可变 | 快捷指令本身提供的结果 |
| `error` | 字典，键为 `error-Code` 和 `errorMessage` | 如果失败，来自快捷指令应用的错误描述 |
| `input` | 可变 | 操作中的 `shortcut` 值 |
| `name` | 可变 | 操作中的 `shortcut.name` 值 |

## 个人自动化

使用快捷指令个人自动化，您可以兼得两者 - 通过使用 iOS 触发器执行 Home Assistant 操作。以下是一些有用的 iOS + Home Assistant 组合示例，供您参考：

* 在 iPhone 上停止或暂停唤醒闹钟后，触发您的 Home Assistant"早晨例程"自动化。
* 在 Apple Watch 上开始锻炼时，使用 Home Assistant 播放您的锻炼播放列表。在 Apple Watch 上完成锻炼时，使用 Home Assistant 打开风扇降温。
* 当您连接或断开 CarPlay，或连接到汽车蓝牙系统时，通过切换 Home Assistant 中的 `input_boolean` 来在 Home Assistant 中获得完美的车辆在场检测。
* 您可以通过创建带有"充电器"触发器 (iOS 17) 的快捷指令个人自动化以及"发送位置" Home Assistant 应用操作，确保任何使用 iOS 应用"电池状态"传感器的 Home Assistant 自动化立即运行。这方面的一个使用示例是在晚上插入手机后立即触发您的睡前例程自动化，而不是等待下一次传感器后台更新。
* 在药瓶盖上贴一个 NFC 贴纸。每次服药时，用 iPhone 扫描 NFC 贴纸。Home Assistant 可以记录您服药的确切时间，增加一个[计数器](https://www.home-assistant.io/integrations/counter/)来帮助您了解何时补充处方，等等。

要在快捷指令应用中创建个人自动化，转到"自动化"标签页，按右上角的"+"按钮，然后点击"创建个人自动化"按钮。如果您在快捷指令应用中没有任何现有自动化，只需点击"创建个人自动化"按钮。iOS 17 上有 21 个触发器可用。有关创建个人自动化的更多信息，请参阅 Apple 的[快捷指令用户指南](https://support.apple.com/guide/shortcuts/apdfbdbd7123/)。

在 iOS 17 中，所有个人自动化触发器类型都可以自动运行，无需任何交互，但"通勤前"触发器除外。