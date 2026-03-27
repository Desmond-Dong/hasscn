---
title: Philips TV
description: 'Philips TV 集成允许您控制支持 jointSPACE(http://jointspace.sourceforge.net/) JSON-API 的 Philips 电视。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Light
  - Media player
  - Remote
ha_iot_class: Local Polling
ha_release: 0.34
ha_codeowners:
  - '@elupus'
ha_domain: philips_js
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - light
  - media_player
  - remote
  - switch
ha_integration_type: device
ha_zeroconf: true
---
# Philips TV

**Philips TV** 集成允许您控制支持 [jointSPACE](http://jointspace.sourceforge.net/) JSON-API 的 Philips 电视。


## 前提条件

在添加集成之前，值得检查此集成是否适用于您的电视。由于电视之间存在差异，您可能需要尝试不同的地址：

- 某些电视使用 `https://` 和端口 1926，其他电视使用 `http://` 和端口 1925。

### 检查此集成是否可用

1. 检查您的电视是否响应以下组合之一：
    - `http://IP_ADDRESS_OF_TV:1925/system`
    - `https://IP_ADDRESS_OF_TV:1926/system`
2. 如果您收到响应，则此集成可用。
   - 在响应中，您还应该能够看到电视使用的 API 版本（`"api_version":{"Major":6...`）。
3. 对于较旧的电视，请按照[此处](http://jointspace.sourceforge.net/download.html)的说明激活 API 并查看您的型号是否受支持。
   - 请注意，并非所有列出的启用 jointSPACE 的设备都会在端口 1925 上运行 JSON 接口。
   - 这至少适用于 2011 年之前的某些型号。
   - 此外，请注意 API 版本 6 需要通过电视上显示的 PIN 码进行身份验证。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 功能

| Feature            | 1                | 5   | 6 (Android)        | 6 (Saphi)        |
| ------------------ | ---------------- | --- | ------------------ | ---------------- |
| Power On           | WOL / IR Blaster | ?   | Yes (if always on) | WOL / IR Blaster |
| Volume Detect      | Yes              | ?   | Yes (not over CEC) | Yes              |
| Volume Up/Down     | Yes              | ?   | Yes                | Yes              |
| Volume Set         | Yes              | ?   | Yes                | Yes              |
| Source Select      | Yes              | ?   | Yes                | No               |
| Source Detect      | Yes              | ?   | No                 | No               |
| Channel Select     | Yes              | ?   | Yes                | Yes              |
| Channel Detect     | Yes              | ?   | Yes                | No               |
| Channel Favorites  | No               | ?   | Yes                | Yes              |
| Application Select | No               | ?   | Yes                | No               |
| Application Detect | No               | ?   | Yes                | No               |
| Browse URL         | No               | No  | No                 | No               |
| Send Key           | No               | No  | No                 | Yes              |
| Ambilight Control  | Yes              | ?   | Yes                | ?                |
| Ambilight Styles   | No               | ?   | Yes                | Yes              |
| Ambilight Measure  | No               | No  | No                 | No               |


### 开启设备

Philips 电视并不总是支持通过 API 开机。您可以通过红外发射器开机，或者在某些型号上使用局域网唤醒 (WOL)。为了从实体触发此命令，集成暴露了一个 `设备触发器`，可以设置为当 `media_player` 被要求开机时执行。

### 遥控器

集成提供了一个遥控器实体，用于直接向电视发送遥控按键。以下命令列表可用于 `remote.send_command` 动作。

| Command          | Comment                                   |
| ---------------- | ----------------------------------------- |
| Standby          |                                           |
| CursorUp         |                                           |
| CursorDown       |                                           |
| CursorLeft       |                                           |
| CursorRight      |                                           |
| Confirm          |                                           |
| Back             |                                           |
| Exit             |                                           |
| WatchTV          |                                           |
| Home             |                                           |
| Source           |                                           |
| List             |                                           |
| Find             |                                           |
| Options          |                                           |
| Adjust           |                                           |
| RedColour        |                                           |
| GreenColour      |                                           |
| YellowColour     |                                           |
| BlueColour       |                                           |
| Play             |                                           |
| PlayPause        | Mapped to same as Play on Android devices |
| Pause            |                                           |
| FastForward      |                                           |
| Stop             |                                           |
| Rewind           |                                           |
| Record           |                                           |
| ChannelStepUp    |                                           |
| ChannelStepDown  |                                           |
| Digit0           |                                           |
| Digit1           |                                           |
| Digit2           |                                           |
| Digit3           |                                           |
| Digit4           |                                           |
| Digit5           |                                           |
| Digit6           |                                           |
| Digit7           |                                           |
| Digit8           |                                           |
| Digit9           |                                           |
| Dot              |                                           |
| VolumeUp         |                                           |
| VolumeDown       |                                           |
| Mute             |                                           |
| Teletext         |                                           |
| Subtitle         |                                           |
| ClosedCaption    |                                           |
| TvGuide          |                                           |
| Info             |                                           |
| AmbilightOnOff   |                                           |
| Viewmode         |                                           |
| 3dFormat         |                                           |
| Multiview        |                                           |
| PictureStyle     |                                           |
| 3dDepth          |                                           |
| SoundStyle       |                                           |
| SurroundMode     |                                           |
| HeadphonesVolume |                                           |
| 2PlayerGaming    |                                           |
| Setup            |                                           |
| WhiteColour      |                                           |
| PowerOn          |                                           |
| PowerOff         | Mapped to same as Standby on Android      |
| Online           |                                           |
| SmartTV          |                                           |
| PhilipsMenu      |                                           |

### Ambilight

集成暴露一个灯光实体来控制电视上 ambilight 的模式。它允许设置固定的背景颜色或将电视切换到电视支持的某种休闲模式。

当灯光实体打开时，它正在控制 ambilight，当它关闭时，电视以其标准的基于视频的方式控制 ambilight。

限制：
 - 集成不暴露当前 ambilight 测量值，因为这会使 Home Assistant 中的事件总线过载。
 - 不支持控制电视的标准（非专家）样式。

#### Ambilight+Hue

某些电视允许您将处理后的 ambilight 颜色数据同步到您的 Philips Hue 网桥。这将使您的 Hue 灯与电视 ambilight 同步，无需购买 Hue Play HDMI Sync Box。
当您的电视支持此功能时，集成会暴露一个"Ambilight+Hue"开关实体，使您能够切换此功能。


## Binary sensor

某些较新的操作系统版本通过 API 支持实时电视录制功能。
对于这些电视，此集成支持两个实体：

- 有新录制可用
- 录制进行中
