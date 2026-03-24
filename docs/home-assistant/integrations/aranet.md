---
title: Aranet
description: 关于将 Aranet 设备集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.12
ha_iot_class: Local Push
ha_codeowners:
  - '@aschmitz'
  - '@thecode'
  - '@anrijs'
ha_domain: aranet
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---

将 [Aranet](https://aranet.com/) 设备接入 Home Assistant。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

启用并正确运行 [蓝牙](/home-assistant/integrations/bluetooth) 集成后，Aranet 集成会自动发现设备。

## 支持的设备

- [Aranet2](https://aranet.com/products/aranet2/)
- [Aranet4](https://aranet.com/products/aranet4/)
- [Aranet Radiation](https://aranet.com/products/aranet-radiation-sensor/)
- [Aranet Radon Plus](https://aranet.com/products/aranet-radon-sensor)
- [Aranet Radon One](https://aranet.com/en/home/products/aranet-radon-one-green)

Aranet 集成要求您的设备至少升级到固件版本 1.2.0，并启用“智能家居集成”功能。您可以在 Android 或 iOS 的 Aranet Home 移动应用设置中完成这两项操作。
