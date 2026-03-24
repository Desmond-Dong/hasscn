---
title: madVR Envy
description: 关于如何将 madVR Envy 集成到 Home Assistant 的说明。
ha_category:
  - Binary Sensor
  - Remote
  - Sensor
ha_release: '2024.8'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@iloveicedgreentea'
ha_domain: madvr
ha_platforms:
  - binary_sensor
  - diagnostics
  - remote
  - sensor
ha_integration_type: device
---

**madVR Envy** 集成可用于自动化和控制 [madVR Envy 设备](https://madvrenvy.com)。

## 支持的设备

此集成支持当前所有 madVR Envy 型号。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Remote

madVR Envy remote 平台会为设备创建一个 [remote](/home-assistant/integrations/remote/) 实体。您可以通过 [remote.send_command](/home-assistant/integrations/remote/) 操作向该实体发送以下命令。

命令结构使用与[官方文档](https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf?r=113a)相同的关键字，并直接将相应命令发送给设备。更多细节和用法请参阅官方文档。

借助这些命令，您可以在 UI 中创建一个数字遥控器。

示例：

```yaml
# Command with parameters
action: remote.send_command
data:
  command: KeyPress, SETTINGS
target:
  entity_id: remote.madvr_envy
```

```yaml
# Single command
action: remote.send_command
data:
  command: Restart
target:
  entity_id: remote.madvr_envy
```

### 单独命令

以下命令可单独发送，不需要参数。

- `PowerOff`
- `Standby`
- `Restart`
- `ReloadSoftware`
- `Bye`
- `ResetTemporary`
- `CloseMenu`
- `GetMaskingRatio`
- `GetMacAddress`
- `ToneMapOn`
- `ToneMapOff`
- `Hotplug`
- `RefreshLicenseInfo`
- `Force1080p60Output`

### 带参数的命令

以下命令带有参数，参数之间用逗号分隔。

- `ActivateProfile (SOURCE | DISPLAY | CUSTOM)`
- `OpenMenu (Info | Settings | Configuration | Profiles | TestPatterns)`
- `KeyPress (MENU | UP | DOWN | LEFT | RIGHT | OK | INPUT | SETTINGS | RED | GREEN | BLUE | YELLOW | POWER)`
- `KeyHold (MENU | UP | DOWN | LEFT | RIGHT | OK | INPUT | SETTINGS | RED | GREEN | BLUE | YELLOW | POWER)`

### Binary sensor

此集成会创建以下二进制传感器：

- `Power state`：当设备开启时为 On。
- `Signal state`：当设备正在接收来自信号源的信号时为 On。
- `HDR flag`：当设备正在接收 HDR 信号时为 On。这对于基于 HDR 标志触发自动化很有用，例如切换投影仪设置。
- `Outgoing HDR flag`：当设备正在输出 HDR 信号时为 On。

这些传感器可用于多种用途，例如根据检测到的宽高比触发遮幅系统。

### Sensor

默认启用以下传感器：

- `Aspect ratio decimal`：以小数表示的宽高比。
- `Incoming bit depth`：输入视频信号的位深。
- `Incoming black levels`：输入视频信号的黑电平设置。
- `Incoming color space`：输入视频信号的色彩空间。
- `Incoming colorimetry`：输入视频信号的色度信息。
- `Incoming frame rate`：输入视频信号的帧率。
- `Incoming resolution`：输入视频信号的分辨率。
- `Masking decimal`：以小数表示的遮幅比例。
- `Outgoing bit depth`：输出视频信号的位深。
- `Outgoing black levels`：输出视频信号的黑电平设置。
- `Outgoing color space`：输出视频信号的色彩空间。
- `Outgoing colorimetry`：输出视频信号的色度信息。
- `Outgoing frame rate`：输出视频信号的帧率。
- `Outgoing resolution`：输出视频信号的分辨率。

默认禁用以下传感器：

- `Aspect ratio integer`：以整数比表示的宽高比。
- `Aspect ratio name`：当前宽高比的名称。
- `Aspect ratio resolution`：当前宽高比对应的分辨率。
- `CPU temperature`：CPU 温度。
- `GPU temperature`：GPU 温度。
- `HDMI temperature`：HDMI 接口温度。
- `Incoming aspect ratio`：输入视频信号的宽高比。
- `Incoming signal type`：输入信号类型（3D 或 2D）。
- `Mainboard temperature`：主板温度。
- `Masking integer`：以整数比表示的遮幅比例。
- `Masking resolution`：当前遮幅设置对应的分辨率。
- `Outgoing signal type`：输出信号类型（3D 或 2D）。

这些传感器默认禁用，因为它们的值通常不常用，但您可以根据需要在 UI 中启用它们。
