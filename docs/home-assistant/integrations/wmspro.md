---
title: WMS WebControl pro
description: 关于如何通过 WMS WebControl pro 将 WAREMA 设备集成到 Home Assistant 的说明。
ha_category:
  - Button
  - Cover
  - Hub
  - Light
  - Scene
  - Switch
ha_release: '2024.10'
ha_iot_class: Local Polling
ha_codeowners:
  - '@mback2k'
ha_domain: wmspro
ha_config_flow: true
ha_platforms:
  - button
  - cover
  - diagnostics
  - light
  - scene
  - switch
ha_integration_type: hub
related:
  - url: https://www.warema.com/en/smart-home/wms-webcontrol-pro/
    title: Consumer information about WMS WebControl pro
  - url: https://smartbuildings.warema.com/en/control-systems/radio-systems/wms/wms-webcontrolpro/
    title: Technical documentation for WMS WebControl pro
ha_dhcp: true
---
# WMS WebControl pro

**WMS WebControl pro** 集成可让您将 WAREMA 设备集成到 Home Assistant 中。

此集成使用本地 API，该 API 从固件容器版本 11H 开始可用。

有关支持信息，请参阅对应设备章节：[buttons](#buttons)、[covers](#covers)、[lights](#lights)、[scenes](#scenes) 和 [switches](#switches)。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

WMS WebControl pro 也*可能*通过 DHCP 在您的本地网络中被自动发现。

## Buttons

- 所有支持识别动作的设备（例如让遮阳篷晃动一下或让灯闪烁）
  都可以被触发执行该动作。

## Covers

- *Patio awnings* 和 *roller shutters/blinds* 支持打开、关闭、设置到指定位置以及停止。
- 此集成和底层库*可能*已经支持其他单电机遮阳篷或遮挡设备类型。

## Lights

- 调光器（支持亮度控制）和开关已获得完整支持。

## Scenes

- 场景可以激活，但不能修改或监控。
- 场景通过每个房间的虚拟设备访问。

## Switches

- 负载开关（例如连接的加热器）可进行开关控制。
