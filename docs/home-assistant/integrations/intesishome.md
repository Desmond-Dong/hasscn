---
title: IntesisHome
description: 关于如何将 IntesisHome 空调设备与 Home Assistant 集成的说明。
ha_category:
  - Climate
ha_release: 0.104
ha_iot_class: Cloud Push
ha_codeowners:
  - '@jnimmo'
ha_domain: intesishome
ha_platforms:
  - climate
ha_integration_type: integration
ha_quality_scale: legacy
---

**IntesisHome** 集成可让您控制 [IntesisHome](https://www.intesishome.com)、[Airconwithme](https://airconwithme.com) 和 [anywAIR](https://www.fujitsugeneral.com.au/anywair) 设备。IntesisHome 为包括 Panasonic、Daikin、Fujitsu、Toshiba、LG 等品牌在内的空调提供集成支持。

注意：IntesisHome 产品线与 IntesisBox 是分开的。此平台不支持 IntesisBox 设备（这类设备可通过 WMP 协议在本地控制）。

## 配置

要进行设置，请将以下信息添加到您的 `configuration.yaml` 文件中：

```yaml
climate:
  - platform: intesishome
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

```yaml
username:
  description: "您在 [IntesisHome.com](https://accloud.intesis.com) / [Airconwithme](https://airconwithme.com) 上使用的用户名"
  required: true
  type: string
password:
  description: 您的 IntesisHome 密码
  required: true
  type: string
device:
  description: "`IntesisHome`、`airconwithme` 或 `anywair`。"
  required: false
  default: IntesisHome
  type: string
```

此集成会与 IntesisHome API 建立 TCP 连接，以接收温度和状态更新，并发送命令。
默认情况下，该集成会使用 IntesisHome 网站或应用中的设备友好名称作为名称。
如果网络连接中断，设备会在 5 分钟后标记为不可用。

### 支持的操作

可用操作：

- `climate.set_temperature`
- `climate.set_fan_mode`
- `climate.set_operation_mode`
- `climate.set_swing_mode`
- `climate.turn_on`
- `climate.turn_off`
