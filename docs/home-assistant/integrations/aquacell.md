---
title: AquaCell
description: 'AquaCell 是由 Culligan(https://culliganinternational.com) 制造的软水设备。AquaCell(https://www.aquacell-waterontharder.nl/) 集成可让您在 Home Assistant 中监控 AquaCell 设备。'
ha_category:
  - Sensor
ha_release: 2024.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Jordi1990'
ha_domain: aquacell
ha_platforms:
  - sensor
ha_integration_type: device
---
# AquaCell

AquaCell 是由 [Culligan](https://culliganinternational.com) 制造的软水设备。[AquaCell](https://www.aquacell-waterontharder.nl/) 集成可让您在 Home Assistant 中监控 AquaCell 设备。
您需要 **AquaCell** 应用中使用的 AquaCell 账户信息。

此集成还支持其他 [Culligan 品牌](https://culliganinternational.com/brands) 的软水设备，例如 [Harvey](https://www.harveywatersofteners.co.uk/) 和 [TwinTec](https://www.twintec.com/)（由 Harvey 制造）的软水设备。

## 支持的设备

此集成仅适用于配备 **i-Lid**，并通过 "Mijn AquaCell" 或 "myHarvey" 移动应用完成配置的设备型号。
这些型号也可以通过所需的弯曲盐块来识别。

- [AquaCell](https://www.aquacell-waterontharder.nl/aquacell)
- [HarveyArc Water Softener](https://www.harveywatersofteners.co.uk/products/water-softeners/harveyarc-water-softener)
- [TwinTec Cobalt](https://www.twintec.com/our-products/tt-cobalt/)

您可以在 [Apple App Store](https://apps.apple.com/app/id1632415201) 或 [Google Play](https://play.google.com/store/apps/details?id=com.aquacell.sws) 下载 Mijn AquaCell 应用。

您可以在 [Apple App Store](https://apps.apple.com/app/id1551338436) 或 [Google Play](https://play.google.com/store/apps/details?id=com.harvey.sws) 下载 myHarvey 应用。

## 前提条件

在将设备集成到 Home Assistant 之前，您需要先使用官方应用完成初始设置。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
电子邮件地址:
  description: 用于登录监控软水设备的移动应用的电子邮件地址。
  required: true
  type: string
密码:
  description: 用于登录监控软水设备的移动应用的密码。
  required: true
  type: string
```

## 传感器

此集成为软水设备提供以下传感器信息：

- 剩余盐量百分比。
- 盐量降至 0% 前的预计剩余时间。
- i-Lid 电池电量。
- Wi-Fi 信号强度。
- 上次更新时间（设备上次向云端上报数据的时间）。

## 用例

此集成提供的传感器可用于监控软水设备的盐量。您可以基于这些信息创建自动化，比如在盐量偏低、需要补充时发送通知。

您还可以查看盐量传感器的历史曲线，更直观地了解长期使用情况。

## 示例

以下示例展示了如何在 Home Assistant 自动化中使用此集成。

### 当盐即将用完时发送通知

以下示例会在任意一侧盐量即将耗尽时，向您的移动设备发送通知。

```yaml
automation:
  - alias: "当盐量不足时通知"
    triggers:
      - trigger: numeric_state
        entity_id:
          - sensor.my_softener_salt_left_side_percentage
          - sensor.my_softener_salt_right_side_percentage
        below: 10

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "软化器盐即将用完"
          message: > 
            请在软化器中放入新的盐块。
```

## 数据更新

设备更新频率较低，此集成每天从云端轮询一次新数据。

## 已知限制

此集成没有已知的限制。

## 故障排除

此集成没有常见问题。

## 移除集成

此集成遵循标准集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
