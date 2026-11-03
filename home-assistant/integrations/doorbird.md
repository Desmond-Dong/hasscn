# DoorBird

**DoorBird** 集成允许您将 [DoorBird](https://www.doorbird.com/) 设备集成到 Home Assistant 中。

目前 Home Assistant 支持以下设备类型：

* [摄像头](#camera) - 查看实时和历史基于事件的图像。
* [按钮](#button) - 启用继电器控制和摄像头低光/夜视（IR）以及重置收藏夹。
* [事件](#event) - 监控门铃响铃和运动事件。

## 设置

建议在您的 DoorBird 应用程序/门户网站上为 Home Assistant 创建一个新的专用账户。本文档中的说明专门针对 DoorBird iOS/Android 应用程序。不过，大多数操作也可以使用基于 Web 的 [DoorBird - WebAdmin](https://webadmin.doorbird.com) 门户并在您的 DoorBird 管理员账户上登录来完成。

要为 Home Assistant 设置新账户，请打开 DoorBird 应用程序，选择 **设置**（齿轮图标）> **管理** > **登录**（使用您的 DoorBird 应用程序管理详细信息）。在 **用户** 部分下，选择 **添加**。此新用户账户需要启用特定权限（取决于您想要的功能）。权限可以在 **权限** 下找到。建议使用以下权限（或根据您的要求进行修改：

* "始终观看"（实时查看）
* "历史记录"（上次运动）
* "运动"（上次运动）
* "API 操作员"（至少需要启用此项）

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 事件

可以为每个配置的 DoorBird 设备独立定义事件。这些事件将在设备上注册，并可以通过 DoorBird 应用程序附加到计划中。

对于新安装，`doorbell` 和 `motion` 事件将自动创建和配置。如果您不需要任何其他事件，可以跳过配置计划。
有关如何配置计划的详细信息，请参阅下面的[计划](#schedules)部分。

事件名称将以 `doorbird_devicename` 为前缀。例如，设备 'Driveway Gate' 的示例事件 `doorbell` 在 Home Assistant 中将显示为 `doorbird_devicename_doorbell`。这是为了防止与其他事件冲突。

有关如何在自动化中使用事件名称的详细信息，请参阅下面的[自动化示例](#automation-example)部分。

:::important
在通过 DoorBird 应用程序定义计划之前，Home Assistant 不会接收到 `doorbell` 和 `motion` 以外的事件。

:::

### 清除已注册的事件

可以通过按 `Reset favorites` 按钮从 DoorBird 设备清除事件。

请注意，清除设备事件将需要重新执行上述配置步骤。这也可能影响您可能与 DoorBird 设备一起使用的其他第三方应用程序。它不会以任何方式破坏官方移动应用程序，因此移动推送通知仍然可以正常工作。

### 事件数据

每个事件将包含触发事件的 DoorBird 设备的实时图像和视频 URL。这些 URL 可以在事件数据中找到，在自动化操作中很有用。例如，您可以在通知中使用 `html5_viewer_url` 直接链接到触发自动化的设备的实时视图。

`event_data` 上可用的键：

* `timestamp`
* `live_video_url`
* `live_image_url`
* `rtsp_live_video_url`
* `html5_viewer_url`

:::note
事件上的 URL 将基于用于连接到 DoorBird 设备的配置。从网络外部连接的能力取决于您的配置。

:::

## 计划

一旦事件在 DoorBird 设备上注册，必须使用 Android 或 iOS 上的官方 DoorBird 应用程序或 [DoorBird - WebAdmin](https://webadmin.doorbird.com) 门户将其附加到计划中。目前，有适用于门铃、运动、继电器和 RFID 事件的计划（在支持的 DoorBird 设备上）。基本上，您可以通过配置操作/事件（通过启用计划）从 DoorBird 设备启用对 Home Assistant DoorBird API 的 HTTP(S) 调用。

可以通过导航到 DoorBird 应用程序（Android 或 iOS）的以下区域找到计划：

**设置**（齿轮图标）> **管理** > **登录**（使用您的应用程序管理详细信息）>（在 **专家设置** 下）门铃计划。

* `推送通知`
* `触发继电器（"继电器 1" 或 "继电器 2"）`
* `HTTP(S) 调用（按钮、运动/移动、RFID）`

点击左上角的下拉按钮，选择您特定的"操作计划"（如上所列）。根据您的选择，您可能需要点击中间的标题才能看到子类别菜单。

在所需的事件上，您应该能够指定时间块，用于确定您希望何时将事件发送到 Home Assistant。如果您希望事件始终发送，可以使用右上角的方块填充整个计划。在蓝色的时间块期间，事件将被发送到 Home Assistant。

注意：请记住为每个注册的事件类型完成上述计划分配步骤。如果您正在为注册的 RFID 标签配置 HTTP 调用计划，请注意您必须为每个 RFID 标签启用/配置计划。

## 自动化示例

下面的示例自动化显示了如何在有人按下 DoorBird 呼叫按钮时打开灯：

```yaml
- alias: "Doorbird Ring"
  triggers:
    - trigger: state
      entity_id: event.doorbird_driveway_gate_somebody_pressed_the_button
  actions:
    - action: light.turn_on
      target:
        entity_id: light.side_entry_porch
```

您还可以基于 DoorBird RFID 扫描器成功触发（按 RFID 标签配置）和运动事件创建自动化操作。

## 摄像头

`doorbird` 实现允许您在 Home Assistant 中查看来自 [DoorBird](https://www.doorbird.com/) 设备的实时视频、最后一次门铃响铃图像和最后一次运动传感器图像。

## 按钮

`doorbird` 按钮平台允许您为连接的继电器供电，并触发 [DoorBird](https://www.doorbird.com/) 视频门铃设备上的低光/黑暗红外（IR）阵列。

## 事件

将为每个在[计划](#schedules)中配置了 HTTP(S) 调用的门铃或运动事件创建一个事件实体。
