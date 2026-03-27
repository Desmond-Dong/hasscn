---
title: Blink
description: 'Blink 集成允许您从 Blink(https://blinkforhome.com/) 摄像头和安防系统查看摄像头图像和移动事件。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Alarm
  - Binary sensor
  - Camera
  - Hub
  - Sensor
  - Switch
ha_release: '0.40'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fronzbot'
ha_domain: blink
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - camera
  - diagnostics
  - sensor
  - switch
ha_dhcp: true
ha_integration_type: hub
---
# Blink

**Blink** 集成允许您从 [Blink](https://blinkforhome.com/) 摄像头和安防系统查看摄像头图像和移动事件。

:::important
此集成不允许在 Home Assistant 中实时查看您的 Blink 摄像头。

:::
## 设置

您需要您的 Blink 登录信息（用户名，通常是您的电子邮件地址，和密码）才能使用此模块。

## 配置

设置此集成的首选方法是使用配置流程。前往配置中的集成页面并点击新集成 -> Blink。当您被提示输入 PIN 时，（目前）有两种可能：

1. 您收到一封电子邮件，要求您允许 Home Assistant 访问 Blink。在这种情况下，将 PIN 字段留空并点击 `Submit`。

2. 您收到一封电子邮件或短信，其中包含 2FA PIN。在这种情况下，请输入 PIN 并点击 `Submit`。

然后您的集成将设置完成。由于设置是异步的，您可能会在传感器完成从 Blink 服务器提取数据之前看到它们。几分钟后（最多），此信息应该会填充完成。

一旦 Home Assistant 启动并且您认证访问，`blink` 集成将创建以下平台（注意：Blink Mini 摄像头目前不支持任何传感器，也不支持电池状态二值传感器）：

- 一个 `alarm_control_panel` 用于布防/撤防整个 Blink 系统（注意，`alarm_arm_home` 未实现，实际上不会做任何事情，尽管它是 GUI 中的一个选项）。
- 每个链接到您的 Blink 同步模块的摄像头都有一个 `camera`。
- 每个摄像头有一个用于温度和 Wi-Fi 强度的 `sensor`。
- 一个用于移动检测、摄像头布防状态和电池状态的 `binary_sensor`。
- 每个摄像头有一个用于启用/禁用移动检测的 `switch`

由于摄像头是电池供电的，轮询必须小心进行，以免过快耗尽电池或用过多的 API 请求冲击 Blink 的服务器。如果需要替代轮询速率，请在 Blink 集成系统选项中禁用"启用更新轮询"选项，并使用 `homeassistant.update_entity` 动作进行轮询。摄像头也可以通过 `trigger_camera` 动作手动更新。需要注意的是，所有特定于摄像头的传感器只有在从摄像头请求新图像时才会轮询。这意味着不建议依赖任何这些传感器来提供及时和准确的数据。

请注意，每个摄像头报告两种不同的状态：一种是 `sensor.blink_<camera_name>_status`，另一种是 `binary_sensor.blink_<camera_name>_motion_enabled`。`motion_enabled` 属性报告 `camera` 是否准备好检测移动 **无论系统是否实际布防**。

## 动作

任何与 Blink 相关的顺序动作调用之间应该至少有 5 秒的延迟，以防止调用被限流和忽略。作用于摄像头的动作需要一个目标参数。

### 动作：录制

`blink.record` 动作允许您触发摄像头录制新的视频片段。

### 动作：触发摄像头

`blink.trigger_camera` 动作允许您触发摄像头拍摄新的静态图像。

### 动作：保存视频

`blink.save_video` 动作允许您将摄像头最后录制的视频保存到本地文件。请注意，在大多数情况下，Home Assistant 需要通过 "`configuration.yaml`" 文件中的 `allowlist_external_dirs` 知道目录是可写的（参见下面的示例）。

| Data attribute | Optional | Description            |
| ---------------------- | -------- | ---------------------- |
| `filename`             | no       | 保存文件的位置。 |

```yaml
homeassistant:
  allowlist_external_dirs:
    - '/tmp'
    - '/path/to/whitelist'
```

### 动作：保存最近的片段


`blink.save_recent_clips` 动作允许您将摄像头最近的视频片段保存到本地文件，文件名格式为 `%Y%m%d_%H%M%S_{name}.mp4`。请注意，在大多数情况下，Home Assistant 需要通过 "`configuration.yaml`" 文件中的 `allowlist_external_dirs` 知道目录是可写的。

| Data attribute | Optional | Description             |
| ---------------------- | -------- | ----------------------- |
| `file_path`            | no       | 保存文件的位置。 |

### 动作：发送 PIN

`blink.send_pin` 动作允许您向 Blink 发送新的 PIN。由于 Blink 的 2FA 实现是新的且在变化，这是为了让集成在用户干预的情况下继续工作。目的是在幕后处理所有这些，但在登录实现确定之前，添加了这个功能。要使用它，请使用您从 Blink 收到的 PIN 作为负载执行动作（对于简单的"允许此设备"电子邮件，您可以将 `pin` 值保持为空）。

| Data attribute | Optional | Description                  |
| ---------------------- | -------- | ---------------------------- |
| `config_entry_id`      | no       | 要发送 PIN 的 Blink 配置。 |
| `pin`                  | no       | 从 Blink 收到的 2FA PIN。 |

### 其他动作

除了上面提到的动作外，还有通用的 `camera`、`alarm_control_panel` 和 `homeassistant` 动作可用。`camera.enable_motion_detection` 和 `camera.disable_motion_detection` 动作分别允许在 Blink 系统内启用和禁用单个摄像头。`alarm_control_panel.alarm_arm_away` 和 `alarm_control_panel.alarm_disarm` 动作分别允许布防和撤防整个系统。`homeassistant.update_entity` 动作将强制更新 Blink 系统。链接到现有同步模块的 Blink Mini 摄像头无法通过 Home Assistant 单独布防/撤防。

## 示例

以下是一些示例，展示如何正确使用 Blink 执行动作：

### 拍摄图片并本地保存

此示例脚本展示如何使用您的摄像头（在 Blink 应用中名为 `My Camera`）拍摄图片（这 **不一定是** Home Assistant 中的友好名称）。拍摄图片后，图像将保存到名为 `/tmp/my_image.jpg` 的本地目录。请注意，此示例使用了 [camera 集成](/home-assistant/integrations/camera#action-snapshot) 中的动作

```yaml
alias: "Blink Snap Picture"
sequence:
  - action: blink.trigger_camera
    target:
      entity_id: camera.blink_my_camera
  - action: camera.snapshot
    target:
      entity_id: camera.blink_my_camera
    data:
      filename: /tmp/my_image.jpg
```

### 离家时布防 Blink

此示例自动化将布防您的 Blink 同步模块，以检测任何已启用移动检测的 Blink 摄像头上的移动。默认情况下，Blink 在所有摄像头上启用移动检测，因此，除非您在应用中更改了任何内容，否则您已经准备好了。如果您想手动为单个摄像头启用移动检测，您可以使用[相应的 camera 动作](/home-assistant/integrations/camera#action-enable_motion_detection)，但请注意，只有在同步模块布防时才会捕获移动。

在此，此示例假设您的 Blink 模块名为 `My Sync Module`，并且您已经为存在检测设置了[设备跟踪器](/home-assistant/integrations/device_tracker)。

```yaml
- alias: "Arm Blink When Away"
  triggers:
    - trigger: state
      entity_id: all
      to: "not_home"
  actions:
    - action: alarm_control_panel.alarm_arm_away
      target:
        entity_id: alarm_control_panel.blink_my_sync_module
```

### 到家时撤防 Blink

与前面的示例类似，此自动化将在到家时撤防 Blink。

```yaml
- alias: "Disarm Blink When Home"
  triggers:
    - trigger: state
      entity_id: all
      to: "home"
  actions:
    - action: alarm_control_panel.alarm_disarm
      target:
        entity_id: alarm_control_panel.blink_my_sync_module
```

### 检测到移动时本地保存最近的视频

当检测到移动时，您可以使用 Blink Home Assistant 集成在本地保存最后录制的视频，而不是依赖 Blink 的服务器保存您的数据。

以下示例假设您的摄像头名称（在 Blink 应用中）为 `My Camera`，您的同步模块名称为 `My Sync Module`。文件将保存到 `/tmp/videos/blink_video_{YYYMMDD_HHmmSS}.mp4`，其中 `{YYYYMMDD_HHmmSS}` 将是通过使用[模板](/home-assistant/docs/configuration/templating/)创建的时间戳。


```yaml
- alias: "Save Blink Video on Motion"
  triggers:
    - trigger: state
      entity_id: binary_sensor.blink_my_camera_motion_detected
      to: "on"
  actions:
    -  action: blink.save_video
       target:
         entity_id: camera.blink_my_camera
       data:
         filename: "/tmp/videos/blink_video_{{ now().strftime('%Y%m%d_%H%M%S') }}.mp4"
```


### 按计划本地保存所有最近的片段

所有最近视频片段的列表在每次刷新 Blink 系统时更新。
视频片段可在下载列表中（每个摄像头）长达一小时，
它们可以在一小时到期时间之前的任何时间下载。
片段下载后将从列表中删除。

以下示例演示每三分钟保存最近的片段。
它假设您的摄像头名称（在 Blink 应用中）为 `My Camera`。
文件将保存到 `/tmp/videos/YYYYMMDD_HHmmSS_MyCamera.mp4`。
下载的视频文件的文件名不可配置。

```yaml
- alias: "Save Recent Clips from My Camera"
  triggers:
    - trigger: time_pattern
      minutes: /3
  actions:
    - action: blink.save_recent_clips
      target:
        entity_id: camera.my_camera
      data:
        file_path: /tmp/videos
```