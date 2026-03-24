---
title: Frontier Silicon
description: 关于如何将 Frontier Silicon 网络收音机集成到 Home Assistant 的说明。
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_release: '0.40'
ha_domain: frontier_silicon
ha_platforms:
  - media_player
ha_integration_type: device
ha_codeowners:
  - '@wlcrs'
ha_ssdp: true
ha_config_flow: true
---

这种集成为基于 [Frontier Silicon 芯片组] 的网络收音机提供支持。提供基于这些芯片的产品的一些制造商包括：Hama、Medion、Slivercrest、Auna、Technisat、Revo、Pinnel 等。这些设备通常由 OKTIV 或 UNDOK 应用程序控制。

## 支持的型号

许多不同品牌的无线电制造商都使用 Frontier Silicon。

支持的设备包括但不限于：

- 哈马：[IR50]、[IR110]、[DIR3110]、[DIR355BT]
- 麦迪恩：[麦迪恩收音机]
- Silvercrest：[SIRD 14 C2（存档网站）]
- Teufel：[Radio 3sixty (2019)]
- 罗伯茨：[罗伯茨 Stream 94i]
- TechniSat：[DIGITRADIO 10 IR]，以及其他一些型号
- 部分型号来自：Auna、Revo、Pinell、Como Audio

该集成是使用 [Roberts Stream 94i] 开发和测试的。

如果您的设备受 OKTIV 或 UNDOK 应用程序支持，那么该集成也支持它。

## 先决条件

该集成支持自动发现您的网络广播。如果您需要手动设置设备，请提供设备的 IP 地址。某些型号使用单独的端口 (2244) 进行 API 访问，这可以通过访问 `http://[host]:[port]/device` 进行验证。

Frontier Silicon 设备的默认 PIN 为 1234。您可以在以下位置设置设备的 PIN 码（取决于制造商）：
*MENU 按钮 > 主菜单 > 系统设置 > 网络 > NetRemote PIN 设置*


:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

如果您的设备（友好名称）名为 *badezimmer*，则自动化示例可能如下所示：

```yaml
# Example configuration.yaml automation
alias: "Bathroom Motion Detected"
triggers:
  - trigger: state
    entity_id: binary_sensor.motion_sensor_166d0001171111
    from: "off"
    to: "on"
actions:
  - action: media_player.turn_on
    target:
      entity_id: "media_player.badezimmer"
```

## 截图：

概述 DAB+ (Badezimmer) 和 Spotify (Küche)：
<p class='img'>
<img src='/home-assistant/images/screenshots/frontier_silicon_overview.png' />
</p>

信息对话框概述：
<p class='img'>
<img src='/home-assistant/images/screenshots/frontier_silicon_info_dialog.png' />
</p>

## 注意事项和限制

:::warning
某些较旧的设备可能需要设置会话来处理请求。这是由底层库自动检测到的。始终有一个用户（会话）控制设备，这意味着一旦 Home Assistant 连接到设备，所有其他会话都将失效。

这使得这些旧设备几乎不可能使用 [UNDOK]，因为 Home Assistant 集成每 30 秒轮询一次设备状态或通过创建新会话发出命令。在这种情况下，如果您想使用 UNDOK，则必须禁用集成。


:::
[前沿硅芯片组]：https://www.frontiersmart.com/solution/solutions-for-digital-radio/
[Medion 收音机]：https://www.medion.com/de/shop/internetradios
[IR50]：https://support.hama.com/00054840/hama-internetradio-ir50-wifi
[IR110]：https://www.hama.com/00054823/hama-ir110ms-internet-radio-multiroom-app-control-black
[DIR3110]：https://www.hama.com/00054824/hama-dir3110ms-digital-radio-fm-dab-dab+-internet-radio-app-multiroom-white
[MD 87466]：https://www.conrad.com/p/medion-p83302-md-87466-internet-kitchen-radio-dab-fm-aux-internet-radio-dlna-compatible-white-1434428
[广播 3sixty (2019)]：https://teufel.de/radio-3sixty-2019-105437000
[SIRD 14 C2（存档网站）]：https://web.archive.org/web/20191011141311/https://www.silvercrest-multiroom.de/produkte/stereo-internet-radio/
[罗伯茨流 94i]：https://www.robertsradio.com/en-gb/stream-94i
[DIGITRADIO 10 IR]：https://www.technisat.com/en_XX/DIGITRADIO-10-IR/352-10774-22920/
