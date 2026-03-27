---
title: EZVIZ
description: 'EZVIZ 集成通过 ezvizlife.com API 与设备交互。 它还会使用摄像头的本地 IP 地址公开 RTSP 视频流（因此运行 Home Assistant 的设备必须能够访问摄像头的本地 IP）。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: 0.107
ha_category:
  - Camera
  - Update
ha_iot_class: Cloud Polling
ha_domain: ezviz
ha_codeowners:
  - '@RenierM26'
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - camera
  - image
  - light
  - number
  - select
  - sensor
  - siren
  - switch
  - update
ha_integration_type: integration
related:
  - docs: /dashboards/picture-glance/#creating-a-card-to-control-the-camera
    title: Controlling the camera from the dashboard
---
# EZVIZ

**EZVIZ** 集成通过 ezvizlife.com API 与设备交互。
它还会使用摄像头的本地 IP 地址公开 RTSP 视频流（因此运行 Home Assistant 的设备必须能够访问摄像头的本地 IP）。

由于该 API 没有官方文档，集成实际上是从 EZVIZ 手机应用所使用的 API 获取数据的，[接口托管在这里](https://apiieu.ezvizlife.com)。

每台摄像头的密码通常写在二维码附近，可能位于设备底部或用户手册中。它通常被称为摄像头的“verification code”。

您还需要启用摄像头上的本地 RTSP 服务器。操作步骤如下：

- 打开 EZVIZ 手机应用
- 选择个人资料图标
- 前往 **Settings** > **LAN Live View** > **Start Scanning**
- 选择您的摄像头
- 选择右上角的齿轮图标 > **Local Server Settings** > **enable RTSP**

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

现在，您的摄像头会在集成选项中显示为“已发现的设备”。请为每台摄像头完成设置，以便在 Home Assistant 中查看视频流。

如果您需要访问高分辨率或低分辨率视频流，也可以更改摄像头选项。不过一般来说，无需修改这些选项即可正常工作。

### 集成实体选项

`Request Timeout (seconds)`：

- 此选项决定 Home Assistant 在放弃之前等待 EZVIZ API 返回数据的时长。超时时间以秒为单位。如果 API 响应时间超过该值，Home Assistant 会停止等待并认为请求失败。您可以根据网络状况和 EZVIZ API 的响应速度调整此值。对于较慢的连接，可能需要更高的超时时间。
- 示例：如果将 **Request Timeout** 设为 30 秒（默认值），Home Assistant 会等待 EZVIZ API 最多 30 秒，然后才超时。
- 请注意，此选项仅适用于主 EZVIZ 云实体。

`Arguments passed to ffmpeg for cameras`：

- 此选项允许您定义从 EZVIZ 摄像头抓取视频时传递给 ffmpeg 的附加参数。虽然摄像头分辨率和编解码器设置通常是在 "Ezviz Studio" 桌面应用中配置的，但您可以通过此选项选择要抓取的主码流或子码流。
- 要选择合适的码流或子码流，请在 `Arguments passed to ffmpeg for cameras` 字段中指定对应的通道路径。该通道路径用于标识摄像头的具体码流或子码流。
- 示例：如果您希望使用子码流，可以指定通道路径 `/Streaming/Channels/102`。如果您更倾向于使用主码流，则使用 `/Streaming/Channels/101`。您也可以根据摄像头能力和资源需求配置多个主码流/子码流选项。
- 如果该值无效或未指定，摄像头通常会默认使用主码流。
- 请注意，此选项仅适用于摄像头实体。

### 动作 `ezviz.alarm_sound`

如果您的 EZVIZ 摄像头支持警告音，您可以使用此动作设置其强度。

| 数据属性 | 说明 |
| -------- | ---- |
| `entity_id` | 指向摄像头 `entity_id` 的字符串或字符串列表。使用 `entity_id: all` 可作用于全部 |
| `level` | 将声音级别设为 0 表示柔和，1 表示强烈，2 表示禁用 |

### 动作 `ezviz.ptz`

如果您的 EZVIZ 摄像头支持 <abbr title="pan, tilt, and zoom">PTZ</abbr>，您就可以控制摄像头进行平移或俯仰。

| 数据属性 | 说明 |
| -------- | ---- |
| `entity_id` | 指向摄像头 `entity_id` 的字符串或字符串列表。使用 `entity_id: all` 可作用于全部 |
| `direction` | 移动方向。允许值：`up`、`down`、`left`、`right` |
| `speed` | （可选）摄像头移动速度。允许值为 1 到 9 的整数。默认值：5 |

### 动作 `ezviz.set_alarm_detection_sensibility`

如果您的 EZVIZ 摄像头支持移动侦测，您可以使用此动作设置灵敏度级别。

| 数据属性 | 说明 |
| -------- | ---- |
| `entity_id` | 指向摄像头 `entity_id` 的字符串或字符串列表。使用 `entity_id: all` 可作用于全部 |
| `level` | 灵敏度级别。对于类型 0（普通摄像头）为 1-6；对于类型 3（PIR 传感器摄像头）为 1-100 |
| `type_value` | 侦测类型。可选值：0 - 摄像头，3 - PIR 传感器摄像头 |

### 动作 `ezviz.sound_alarm`

如果您的 EZVIZ 摄像头内置警报器，您可以使用此动作让它发出警报声。

| 数据属性 | 说明 |
| -------- | ---- |
| `entity_id` | 指向摄像头 `entity_id` 的字符串或字符串列表。使用 `entity_id: all` 可作用于全部 |
| `enable` | 设为 1 以触发警报声，设为 0 以停止警报器 |

### 动作 `ezviz.wake_device`

如果您的摄像头启用了“sleep”模式，您可以使用此动作将其唤醒。这对电池摄像头特别有用。

| 数据属性 | 说明 |
| -------- | ---- |
| `entity_id` | 指向摄像头 `entity_id` 的字符串或字符串列表。使用 `entity_id: all` 可作用于全部 |

要启用或禁用移动侦测，请使用 Home Assistant 内建动作。

### 动作 `camera.enable_motion_detection`

| 数据属性 | 说明 |
| -------- | ---- |
| `entity_id` | 指向摄像头 `entity_id` 的字符串或字符串列表。使用 `entity_id: all` 可作用于全部 |

### 动作 `camera.disable_motion_detection`

| 数据属性 | 说明 |
| -------- | ---- |
| `entity_id` | 指向摄像头 `entity_id` 的字符串或字符串列表。使用 `entity_id: all` 可作用于全部 |

### Alarm control panel 实体

EZVIZ 平台中的 Alarm control panel 实体允许您管理和控制所有 EZVIZ 设备的布防状态。借助此实体，您可以选择三种状态：**Arm Away**、**Arm Sleep** 和 **Disarm**。

### OTA 更新

触发设备 OTA 固件更新流程，升级到最新稳定版本。

### 移动侦测灵敏度

您可以通过 "Detection sensitivity" Number 实体调整移动侦测灵敏度。需要注意的是，此实体会从设备中获取信息；如果您的电池供电摄像头处于休眠模式，该实体将不会更新，因为这是为了节省电池电量并防止过度耗电而设计的机制。

### 警报器

Siren 实体允许您激活设备上的报警功能。在大多数摄像头中，报警功能会包含闪光灯和/或声音警报器，用于震慑潜在入侵者。
触发后，警报器会在 60 秒后自动关闭（这是 EZVIZ 的行为，并非由集成控制）。您也可以使用该实体手动将其关闭。

### PTZ

在受支持的 <abbr title="pan, tilt, and zoom">PTZ</abbr> 摄像头上，可使用 <abbr title="pan, tilt, and zoom">PTZ</abbr> 上/下/左/右按钮执行平移和俯仰控制。

### 警告音

如果您的摄像头支持移动侦测警告音，您可以使用此实体选择警告音级别。

### 电池工作模式

对于电池供电的摄像头，您可以使用此实体选择电池工作模式，以优化电池消耗。

| Battery work mode | 说明 |
| ----------------- | ---- |
| Plugged in | 摄像头会持续录制。摄像头应保持接电 |
| High performance | 单个视频片段更长，但更耗电 |
| Power save | 单个视频片段更短，更省电 |
| Super power saving | 休眠模式开启。主动实时查看可以唤醒摄像头 |
| Custom | 摄像头会使用应用中设置的计划 |

### Light 实体

对于摄像头与灯光组合设备，会额外添加一个灯光实体。您可以将其打开、关闭，并调整亮度。

### Image 实体

Image 实体表示摄像头最近一次检测到的事件，并在 Home Assistant 中以图像形式呈现该事件。

## 故障排除

- `authentication failed`：身份验证要求使用禁用了双重验证的 EZVIZ 账户。Google、Facebook、TikTok 或其他基于 OAuth 的账户无法使用。
