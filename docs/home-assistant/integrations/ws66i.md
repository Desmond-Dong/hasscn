---
title: Soundavo WS66i 6-Zone Amplifier
description: 关于如何将 WS66i 6区域家庭音频控制器集成到 Home Assistant 的说明。
ha_category:
  - Media player
ha_release: 2022.6
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@ssaenger'
ha_domain: ws66i
ha_platforms:
  - media_player
ha_integration_type: device
---

**Soundavo WS66i 6-Zone Amplifier** 集成可让您通过本地网络控制 [Soundavo 全宅音频功放](https://www.soundavo.com/products/ws-66i)。这款功放是 [Monoprice](https://www.monoprice.com/product?p_id=10761) 所售型号的升级版，新增了 2 个内置无线流媒体模块和一个用于局域网控制的以太网端口。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 配置说明

当系统提示连接设备时，请输入 WS66i 功放的 IP 地址并提交。系统会检测已连接功放的数量，并将每个分区显示为一个实体。

- 1 台功放：分区 11..16
- 2 台功放：分区 11..16、21..26
- 3 台功放：分区 11..16、21..26、31..36

检测完成后，您可以将它们添加到某个区域。

## 输入源管理

您可以在集成卡片中选择 **CONFIGURE** 按钮来配置输入源名称。
