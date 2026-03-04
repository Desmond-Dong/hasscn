---
title: "概览"
id: "android-auto"
---

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

Home Assistant 提供 Android Auto (AA) 和 Android Automotive OS (AAOS) 体验。这允许您在驾驶时安全地与各种实体交互。它还允许您导航到任何具有关联位置的 `zone`、`person`、`sensor` 或 `device_tracker`*。

\* 被认为在家 (`home`) 的设备追踪器实体不会显示在导航屏幕中。

### 设置

要在车辆中使用应用，您需要登录手机（如果使用 AA）或车辆（如果使用 AAOS）。登录后，您就可以使用车辆主屏幕上的 Home Assistant 图标了。

### 支持的可操作域

- `alarm_control_panel` 如果不需要代码，将允许 `arm_away` 和 `disarm`，否则无操作
- `button`
- `cover`
- `fan`
- `input_boolean`
- `input_button`
- `light`
- `lock`
- `scene`
- `script`
- `switch`

:::note
显示的实体数量取决于车辆设定的限制。
:::

### 收藏

如果您想快速访问特定实体，可以选择它们在应用中显示。停车时，转到[设置](https://my.home-assistant.io/redirect/config/) > **伴侣应用** > **Android Auto 收藏**（或 **驾驶收藏**）并选择您想查看的实体。

:::tip
使用 Home Assistant 2025.12 或更高版本时，您还可以通过打开实体的**更多信息**（点击实体或通过溢出菜单访问）将实体设置为收藏。在**更多信息**中，选择**添加到**并选择添加驾驶收藏。您必须在希望收藏出现的设备上执行此操作。

<img alt="Home Assistant 更多信息对话框添加到菜单" src="/companion-assets/android/add_to_android_auto_favorite.png" width='450' />
:::

添加收藏后，下次在车辆中启动 Home Assistant 应用时，将显示您收藏的实体。您可以在那里切换实体、导航到实体、查看所有实体以及更换服务器。

除了添加上述支持的域之外，您还可以将 `binary_sensor` 和 `sensor` 实体添加到收藏中，以便在驾驶界面中查看它们的状态。

:::info
如果您是从 AAOS 车辆上的 Google Play 商店安装的应用，则目前无法设置您收藏的实体。在此期间，您可以自由使用 AA 应用。
:::

### 通知

默认情况下，Home Assistant 通知不会显示在 AA 界面中。要在 AA 中显示 Home Assistant 通知，请在通知数据中添加 [`car_ui: true`](../notifications/basic.md#android-auto-visibility)。通知现在将显示在您的手机上以及 AA 中。从 AA 打开通知将打开 Home Assistant 的驾驶界面。

AA 中的通知与您的手机共享设置，并且不支持所有通知功能。例如，要让通知在 AA 中显示在当前屏幕之上，通知渠道也需要设置为在手机上弹出。为获得最佳体验，建议为应在 AA 中可见的通知使用特定的[渠道](../notifications/basic.md#notification-channels)。示例：

```yaml
  - alias: 发送门未锁警报
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "门未锁"
          message: "大家都离开了家，但门仍然未锁"
          data:
            car_ui: true
            notification_icon: "mdi:door-open"
            channel: "门未锁"
            importance: high
```

### 传感器

AA 和 AAOS 可用的传感器在主[传感器](../core/sensors.md#android-sensors)页面上有描述。以下传感器列表是 AA 和 AAOS 特有的：

*  [Android Auto 连接](../core/sensors.md#android-auto)
*  [汽车传感器](../core/sensors.md#car-sensors)

只有在车辆停放时才能启用或禁用传感器。如何更改启用的传感器取决于您安装应用的方式：

 - 从 Play Store 安装
   1. 在另一台设备上，转到[**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) > **设备**，然后选择您的车辆。
   2. 选择您想更改的传感器，点击齿轮图标，然后打开或关闭**启用**。 
   3. 在车辆中启动应用以更新传感器。
   4. 如果您启用了任何需要特殊权限的传感器，应用将发布通知以完成启用。点击通知打开应用，再次启用传感器并授予任何请求的权限。
 - 从汽车制造商商店安装
   1. 点击屏幕右上角的**原生模式**。
   2. 转到**设置** > **伴侣应用** > **管理传感器**，然后启用或禁用您的传感器。