---
title: Philips Hue BLE
description: 'Hue BLE 集成允许您使用 Home Assistant 控制飞利浦 Hue 蓝牙灯。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Light
ha_release: 2025.12
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@flip-dots'
ha_domain: hue_ble
ha_platforms:
  - light
ha_bluetooth: true
ha_integration_type: device
ha_quality_scale: bronze
---
# Philips Hue BLE

**Hue BLE** 集成允许您使用 Home Assistant 控制飞利浦 Hue 蓝牙灯。

## 前提条件

在尝试将灯连接到 Home Assistant 之前，您必须将灯置于配对模式，有两种方法可以实现这一点。

### Alexa/Google 配对模式

Hue 应用程序可以使用配对语音助手功能将灯置于配对模式。这允许您继续使用 Hue 应用程序和 Home Assistant 控制灯。

1. 在飞利浦 Hue 应用程序（[Android](https://play.google.com/store/apps/details?id=com.philips.lighting.hue2)、[iOS](https://apps.apple.com/us/app/philips-hue/id1055281310)）中，转到 **设置** > **语音助手** > **Amazon Alexa** 或 **Google Home** > **使其可被发现**。
2. 一旦灯处于配对模式，您可以将其连接到 Home Assistant。 
3. 要查看发现的灯，在 Home Assistant 中，转到 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。它们显示在 **已发现** 部分。

### 恢复出厂设置

[恢复出厂设置](https://www.philips-hue.com/en-us/support/article/how-to-factory-reset-philips-hue-lights/000004) Hue 灯会自动将其置于配对模式。可以直接连接到 Home Assistant，而无需使用 Hue 应用程序。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的型号

此集成已测试适用于以下型号：

| 型号 | 产品名称                                     |
|--------------|--------------------------------------------------|
| LCA006       | Hue White and Color 1100                         |
| LCA011       | Hue White and Color ambiance 1100                |
| LCL009       | Hue Solo Lightstrip                              |
| LCX029       | Hue Festavia globe bulb string lights            |
| LWA031       | Hue White 1600                                   |
| LTO002       | Hue White ambiance filament globe bulb           |
| Unknown      | Hue White and Color Ambiance Go portable accent light  |

**Philips Hue BLE** 集成也被设计用于其他型号。如果您有不同的型号并且它可以工作，请告诉我们。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.


## 已知限制

如果您对 Hue 灯进行[恢复出厂设置](https://www.philips-hue.com/en-us/support/article/how-to-factory-reset-philips-hue-lights/000004)，即使它之前已连接到 Home Assistant 或被忽略，它也会被发现为新设备。这是因为 Hue 灯的蓝牙地址是随机生成的，如果灯恢复出厂设置，它会更改。

使用 Zigbee 连接的 Hue 灯仍然可以被此集成发现和控制，即使它们连接到另一个 Zigbee 网络或绑定到 Zigbee 开关。这意味着您可以同时使用 Zigbee 和蓝牙。这可以通过将灯配对到 Zigbee 中心或开关，然后使用 Hue 应用程序通过灯侧面的二维码通过蓝牙连接到灯，然后使用上述 Alexa/Google 配对步骤来完成。

此集成需要活动的蓝牙连接来控制灯，并非所有蓝牙适配器都能提供。有关哪些适配器可以提供活动连接的更多信息，请参阅 [蓝牙文档](https://www.home-assistant.io/integrations/bluetooth/)。

如果与灯的连接丢失很长时间，集成将不会重新尝试连接到灯，必须执行重启或重新加载集成才能使灯再次可用。

如果您有多个蓝牙适配器/代理，只有设置期间用于配对到灯的适配器/代理才能控制灯。如果此适配器/代理变得不可用，您将无法使用不同的适配器/代理来控制灯，而无需重新设置。Home Assistant 自动使用信号最强的适配器/代理，如果由于某种原因这不是灯设置的适配器/代理，它将无法连接。可以通过使其他代理不可用并重新设置灯来将灯配对到多个代理，直到所有所需的代理都配对到灯，这需要使用 Alexa/Google 配对模式设置。