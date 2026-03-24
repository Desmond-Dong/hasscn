---
title: Whirlpool Appliances
description: 关于如何将惠而浦家电与 Home Assistant 集成的说明。
ha_category:
  - Climate
  - Hub
  - Select
ha_release: '2022.10'
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@abmantis'
  - '@mkmer'
ha_domain: whirlpool
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - select
  - sensor
ha_integration_type: hub
ha_quality_scale: silver
---

**Whirlpool Appliances** 集成可让您将 Whirlpool、Maytag、KitchenAid 和 Consul 家电连接到 Home Assistant。

## 支持的设备

以下设备已确认可用，但其他型号也可能同样适用。

空调：

- Whirlpool SPIW309A2WF
- Whirlpool SPIW312A2WF
- Whirlpool SPIW409A2WF

洗衣机：

- Whirlpool WTW6120HW2
- Whirlpool WTW8127LW1
- Maytag MHW8630HW0

烘干机：

- Whirlpool WGD8127LW3

## 前提条件

- 有效的 Whirlpool（或相关品牌）账户凭据。
- 已在 Whirlpool（或相关品牌）官方移动应用中注册家电。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Username:
    description: "The username of your Whirlpool (or related brand) account."
Password:
    description: "The password of your Whirlpool (or related brand) account."
Region:
    description: "The region in which your account is registered."
Brand:
    description: "The brand of the mobile app. It may or may not be the same brand as the appliances."
```

## 支持的功能

此集成会将家电映射为 Home Assistant 中的实体。单个家电可能对应一个或多个实体。

- [Binary Sensor](#binary_sensor)
- [Climate](#climate)
- [Select](#select)
- [Sensor](#sensor)

### Binary Sensor

二进制传感器平台提供以下功能：

- 洗衣机或烘干机门的状态（打开/关闭）

### Climate

`whirlpool` climate 平台可将 Whirlpool 空调系统集成到 Home Assistant 中，让您通过用户界面控制设备。当前室内温度也会显示在温控卡片上。

还支持以下操作：

- [**set_hvac_mode**](/home-assistant/integrations/climate/#action-climateset_hvac_mode) (`off`, `heat`, `cool`, `fan_only`)
- [**target temperature**](/home-assistant/integrations/climate#action-climateset_temperature)
- [**turn on/off**](/home-assistant/integrations/climate#action-climateturn_on)
- [**fan mode**](/home-assistant/integrations/climate#action-climateset_fan_mode) (`low`, `medium`, `high`)
- [**swing mode**](/home-assistant/integrations/climate#action-climateset_swing_mode) (`off`, `horizontal`)

### Select

Select 平台为冰箱提供以下实体：

- **Temperature level**：设置冰箱温度档位。可用选项为 `-4 °C`、`-2 °C`、`0 °C`、`3 °C` 和 `5 °C`。

### Sensor

`whirlpool` sensor 平台可将 Whirlpool 洗衣机和烘干机系统集成到 Home Assistant 中，为每台设备提供机器状态、剩余时间以及 “wash & go” 储液罐填充状态等传感器。

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
