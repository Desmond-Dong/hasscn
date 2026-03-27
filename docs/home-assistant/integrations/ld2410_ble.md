---
title: LD2410 BLE
description: '将来自 Hi-Link(http://www.hlktech.net/) 的 LD2410 BLE 传感器集成到 Home Assistant。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Presence detection
  - Sensor
ha_bluetooth: true
ha_release: 2023.2
ha_iot_class: Local Push
ha_codeowners:
  - '@930913'
ha_domain: ld2410_ble
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: device
---
# LD2410 BLE

将来自 [Hi-Link](http://www.hlktech.net/) 的 LD2410 BLE 传感器集成到 Home Assistant。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

您目前可以通过 USB 使用[桌面软件](https://drive.google.com/drive/folders/1p4dhbEJA3YubyIjIIC7wwVsSo8x29Fq-?usp=sharing)，或通过蓝牙进行移动/静止触发设置。HLKRadarTool 可在 [Google Play](https://play.google.com/store/apps/details?id=com.hlk.hlkradartool) 或 [App Store](https://apps.apple.com/app/id1638651152) 下载。

（如果您重新配置了默认密码或门限数量，此集成可能无法正常工作。）

## 提供的传感器

该集成会提供以下传感器：

- 检测到移动
- 检测到有人
- 移动目标距离和能量*
- 静止目标距离和能量*
- 探测距离*
- 移动/静止门限数量
- 0-8 号门限的移动能量*
- 0-8 号门限的静止能量*

\* 表示该实体默认隐藏，但可在 UI 中启用。

## 购买

:::note
该开发板有多个外观相似的版本。请务必购买 LD2410B 或 LD2410C，因为这两个版本支持蓝牙且已经过测试。C 版本使用 2.54 mm 间距引脚，适用于 Arduino 类设备；B 版本则使用半间距引脚。

:::
您可以在 [AliExpress](https://www.aliexpress.com/item/1005004351593073.html) 购买裸板或开发套件版本。
