---
title: Arcam FMJ Receivers
description: 关于将 Arcam FMJ 接收器集成到 Home Assistant 的说明。
ha_category:
  - Media player
ha_release: 0.96
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@elupus'
ha_domain: arcam_fmj
ha_ssdp: true
ha_platforms:
  - media_player
ha_integration_type: device
---

**Arcam FMJ Receivers** 集成允许您从 Home Assistant 控制 [Arcam 接收器和处理器](https://www.arcam.co.uk/range/fmj.htm)。

支持的设备：

- AV 40
- AV 41
- AV 860
- AVR 5
- AVR 10
- AVR 11
- AVR 20
- AVR 21
- AVR 30
- AVR 31
- AVR 380
- AVR 390
- AVR 450
- AVR 550
- AVR 750
- AVR 850
- AVR 860
- SA 10
- SA 20
- SA 30
- SR 250
- ST 60

此集成也可能适用于 [JBL](https://www.jblsynthesis.com/products/electronics/) 和 [AudioControl](https://www.audiocontrol.com/home-audio/) 接收器和处理器，因为它们与 Arcam 共享相同的固件。

- SDP-55/58


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 电源状态

Arcam 接收器在待机时会关闭其网络端口，集成将尝试每 5 秒重新连接到接收器。这意味着无法通过内置网络连接打开第一个区域。

注意：某些新型号提供配置设备在待机模式下保持网络端口活动的能力。这可以在 **HDMI 设置** > **HDMI Bypass & IP** 下找到。启用 **HDMI & IP On** 将允许从 Home Assistant 进行完全的电源控制。

完整电源控制的另外两个选择是：红外或串口网关。

### 红外命令

使用红外发射器发送命令，使用以下离散代码打开设备：

- 区域 1：协议：RC5 设备：16 功能：123
- 区域 2：协议：RC5 设备：23 功能：123

有时打开需要发送两个红外代码。您可以使用 [irgen](https://github.com/elupus/irgen) 工具生成原始、broadlink 或其他红外格式字符串：

```bash
irgen -i rc5 -d 16 0 123 -o broadlink_base64 -r 2
```

要触发此红外命令，请在事件 `arcam.turn_on` 上添加自动化，过滤 `media_player` 区域实体的 `entity_id`。这可以通过设备自动化或使用普通自动化手动添加。

### 串口到网络网关

使用网络到串口网关连接到接收器的串口。串口始终可用，可以打开设备。这也是最可靠的通信方式。